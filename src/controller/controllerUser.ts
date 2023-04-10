/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Request, Response } from 'express';
import User from '../models/User';
import {
  formatedQuery,
  isValidObjectId,
  obtainCEP,
  verifyCPF,
  verifyDate,
  verifyEmail,
} from '../utils/utils';
import bcrypt from 'bcrypt';
import { createSendToken } from './authController';

// OK
const createUser = async (req: Request, res: Response) => {
  // Check if we don't already have a user registered with that email
  if (!(await User.exists({ email: req.body.email }))) {
    if (req.body.cep.length != 8) {
      return res.status(400).json({
        message: 'Error, this CEP is invalid',
      });
    }
    // Base URL for ViaCEP query
    const urlCEP = `http://viacep.com.br/ws/${req.body.cep}/json/`;
    // Obtain the Full CEP from ViaCEP
    const fullCEP = await obtainCEP(urlCEP);
    // Checking Minimum age, CEP code obtained correctly, valid CPF and validate the email
    const flagAge = verifyDate(req.body.birth) >= 18;
    const flagCEP = Object.keys(fullCEP).length != 1;
    const flagCPF = verifyCPF(req.body.cpf);
    const flagEmail = verifyEmail(req.body.email);

    // If the four criteria were validated, we can try to create a user
    if (flagAge && flagCEP && flagCPF && flagEmail) {
      try {
        const criptoPassword = await bcrypt.hash(req.body.password, 14);
        const createdUser = await User.create({
          name: req.body.name,
          cpf: req.body.cpf,
          birth: req.body.birth,
          email: req.body.email,
          password: criptoPassword,
          cep: req.body.cep,
          qualifed: req.body.qualifed,
          patio: fullCEP.logradouro,
          complement: fullCEP.complemento,
          neighborhood: fullCEP.bairro,
          locality: fullCEP.localidade,
          uf: fullCEP.uf,
        });
        return res.status(201).json({
          message: 'New registered user',
          // TODO: Verifiy how show all these attributes, hidding __v and password, and don't writing hard like this
          createdUser: {
            id: createdUser.id,
            name: createdUser.name,
            cpf: createdUser.cpf,
            birth: createdUser.birth,
            email: createdUser.email,
            cep: createdUser.cep,
            qualifed: createdUser.qualifed,
            patio: createdUser.patio,
            complement: createdUser.complement,
            neighborhood: createdUser.neighborhood,
            locality: createdUser.locality,
            uf: createdUser.uf,
          },
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        return res.status(400).json({
          message: 'Error creating a user',
          error: err.message,
        });
      }
    } else {
      return res.status(400).json({
        message:
          'Error unable to register new user, required: Age greater than or equal to 18 years old, valid CPF, valid CEP code and valid email',
      });
    }
  } else {
    return res.status(400).json({
      message: 'Already existing email',
    });
  }
};

// OK
const loginUser = async (req: Request, res: Response) => {
  // Checks if the fields were passed: Email and Password
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({
      message: 'Email and Password credentials not provided',
    });
  }
  // Checks that this user exists in the database and that the password is correct
  const user = await User.findOne({ email: req.body.email }).select(
    '+password'
  );

  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return res.status(400).json({
      message: 'Email not found or invalid password',
    });
  } else {
    // If the password is correct, it generates a valid token and allows Login
    const token = createSendToken(user.id, user.email, res);
    return res.status(200).json({
      status: res.status,
      message: 'User logged in',
      token,
    });
  }
};

// OK
const getUsers = async (req: Request, res: Response) => {
  // Pagination default if the user does not select any limit of items per page (limit) or beginning (offset)
  let limit = 10;
  let offset = 0;
  /* We check if we are receiving any queries to fetch items, if so
  let's use it for search, otherwise we search without any filter (all records)
  This function discards the offset and limit, if passed in the query */
  const search = formatedQuery(req.query);

  try {
    // Checks if the user typed any limits or offsets in the query
    if (req.query.limit) {
      limit = +req.query.limit;
    }
    if (req.query.offset) {
      offset = +req.query.offset;
    }
    const users = await User.find(search, '-__v -password')
      .skip(offset)
      .limit(limit);
    const currentUrl = req.baseUrl;
    const total = await User.countDocuments({});

    const next = offset + limit;
    const nextUrl =
      next < total
        ? `http://localhost:3000${currentUrl}/user?limit=${limit}&offset=${next}`
        : 'none';

    const previous = offset - limit > 0 ? offset - limit : null;
    const previousUrl =
      previous != null
        ? `http://localhost:3000${currentUrl}/user?limit=${limit}&offset=${previous}`
        : 'none';

    return res.status(200).json({
      message: 'Query performed successfully',
      status: res.status,
      users,
      total,
      limit,
      offset,
      nextUrl,
      previousUrl,
    });
  } catch (err) {
    return res.status(400).json({
      message: 'Database query error',
      status: res.status,
      err,
    });
  }
};

// OK
const getUser = async (req: Request, res: Response) => {
  // Checks if we have an ID parameter being passed by the URL
  if (isValidObjectId(req.params.id)) {
    try {
      const user = await User.findById(req.params.id);

      if (user == null) {
        return res.status(400).json({
          message: 'Error, no user found with that ID',
          status: res.status,
        });
      } else {
        return res.status(200).json({
          message: 'Query performed successfully',
          status: res.status,
          user,
        });
      }
    } catch (err) {
      return res.status(400).json({
        message: 'Error in query',
        status: res.status,
        body: err,
      });
    }
  } else {
    return res.status(404).json({
      message: 'Invalid ID of the user, try again with a valid ID',
      status: res.status,
    });
  }
};

// OK
const deleteUser = async (req: Request, res: Response) => {
  // Checks if we have an ID parameter being passed by the URL
  if (isValidObjectId(req.params.id)) {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id);

      if (deletedUser == null) {
        return res.status(404).json({
          message: 'Error, no user was found with that ID',
          status: res.status,
        });
      } else {
        return res.status(204).json({});
      }
    } catch (err) {
      return res.status(400).json({
        message: 'Error in deleting database record',
        status: res.status,
        err,
      });
    }
  } else {
    return res.status(400).json({
      message: 'Invalid ID, try again with a valid ID',
      status: res.status,
    });
  }
};

// OK
const updateUser = async (req: Request, res: Response) => {
  const user = await User.findOne({ email: req.body.email });
  /* checks if whoever owns that email is the person who wants to update their data,
   to prevent them from trying to update their data and put an email already in use */

  if (user == null || user!.id == req.params.id) {
    if (req.body.cep.length != 8) {
      return res.status(400).json({
        message: 'Error, this CEP is invalid',
      });
    }
    // Base URL for ViaCEP query
    const urlCEP = `http://viacep.com.br/ws/${req.body.cep}/json/`;
    // Obtain the Full CEP from ViaCEP
    const fullCEP = await obtainCEP(urlCEP);
    // Checking Minimum age, CEP code obtained correctly, valid CPF and validate the email
    const flagAge = verifyDate(req.body.birth) >= 18;
    const flagCEP = Object.keys(fullCEP).length != 1;
    const flagCPF = verifyCPF(req.body.cpf);
    const flagEmail = verifyEmail(req.body.email);

    // If the four criteria were validated, we can try to update a user
    if (flagAge && flagCEP && flagCPF && flagEmail) {
      try {
        const criptoPassword = await bcrypt.hash(req.body.password, 14);
        const updatedUser = await User.findByIdAndUpdate(
          { _id: req.params.id },
          {
            name: req.body.name,
            cpf: req.body.cpf,
            birth: req.body.birth,
            email: req.body.email,
            password: criptoPassword,
            cep: req.body.cep,
            qualifed: req.body.qualifed,
            patio: fullCEP.logradouro,
            complement: fullCEP.complemento,
            neighborhood: fullCEP.bairro,
            locality: fullCEP.localidade,
            uf: fullCEP.uf,
          }
        );
        if (updatedUser != null) {
          return res.status(201).json({
            message: 'Updated user',
            // TODO: Verifiy how show all these attributes, hidding __v and password, and don't writing hard like this
            updatedUser: {
              id: req.params.id,
              name: req.body.name,
              cpf: req.body.cpf,
              birth: req.body.birth,
              email: req.body.email,
              cep: req.body.name,
              qualifed: req.body.qualifed,
              patio: fullCEP.patio,
              complement: fullCEP.complement,
              neighborhood: fullCEP.neighborhood,
              locality: fullCEP.locality,
              uf: fullCEP.uf,
            },
          });
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        return res.status(400).json({
          message: 'Error creating a user',
          error: err.message,
        });
      }
    } else {
      return res.status(400).json({
        message:
          'Error unable to register new user, required: Age greater than or equal to 18 years old, valid CPF, valid CEP code and valid email',
      });
    }
  } else {
    return res.status(400).json({
      message: 'Error, there is another user with that email',
    });
  }
};
export { createUser, loginUser, getUsers, getUser, deleteUser, updateUser };

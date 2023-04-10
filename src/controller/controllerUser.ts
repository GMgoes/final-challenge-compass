import { Request, Response } from 'express';
import User from '../models/User';
import { obtainCEP, verifyCPF, verifyDate, verifyEmail } from '../utils/utils';
import bcrypt from 'bcrypt';
import { createSendToken } from './authController';

// OK
const createUser = async (req: Request, res: Response) => {
  // Check if we don't already have a user registered with that email
  if (!(await User.exists({ email: req.body.email }))) {
    // Base URL for ViaCEP query
    if (req.body.cep.length != 8) {
      return res.status(400).json({
        message: 'Error, this CEP is invalid',
      });
    }
    const urlCEP = `http://viacep.com.br/ws/${req.body.cep}/json/`;
    // Obtain the Full CEP from ViaCEP
    const fullCEP = await obtainCEP(urlCEP);
    // Checking Minimum age, zip code obtained correctly, valid CPF and validate the email
    const flagAge = verifyDate(req.body.birth) >= 18;
    const flagCEP = Object.keys(fullCEP).length != 1;
    const flagCPF = verifyCPF(req.body.cpf);
    const flagEmail = verifyEmail(req.body.email);

    // Expected structure of the object answered by AXIOS (If the query is successful)
    const expectedResponse = {
      cep: '',
      logradouro: '',
      complemento: '',
      bairro: '',
      localidade: '',
      uf: '',
      ibge: '',
      gia: '',
      ddd: '',
      siafi: '',
    };

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
          patio: expectedResponse.logradouro,
          complement: expectedResponse.complemento,
          neighborhood: expectedResponse.bairro,
          locality: expectedResponse.localidade,
          uf: expectedResponse.uf,
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
          'Error unable to register new user, required: Age greater than or equal to 18 years old, valid CPF, valid zip code and valid email',
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

export { createUser, loginUser };

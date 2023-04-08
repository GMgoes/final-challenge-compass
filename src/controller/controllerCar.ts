import { Request, Response } from 'express';
import Car from '../models/Car';
import { isValidObjectId } from '../utils/utils';
// TODO: - JEST - Verify the query in accessories - Verify pagination
const getCars = async (req: Request, res: Response) => {
  // Default de paginação caso o usuário não selecione nenhum limite de itens por página (limit) ou começo (offset)
  let limit = 10;
  let offset = 0;
  /* Verificamos se estamos recebendo alguma query para buscar itens, se sim
  vamos utilizá-la para busca, senão buscamos sem nenhum filtro (todos os registros) 
  TODO: Verificar como pode buscar por mais de uma query, por enquanto está estático com apenas um item*/
  const property = Object.keys(req.query);
  const search =
    Object.keys(req.query).length > 2
      ? { [property[2]]: req.query[property[2]] }
      : {};

  try {
    if (req.query.limit) {
      limit = +req.query.limit;
    }
    if (req.query.offset) {
      offset = +req.query.offset;
    }
    const cars = await Car.find(search).skip(offset).limit(limit);
    const currentUrl = req.baseUrl;
    const total = await Car.countDocuments({});

    const next = offset + limit;
    const nextUrl =
      next < total
        ? `http://localhost:3000${currentUrl}/car?limit=${limit}&offset=${next}`
        : 'none';

    const previous = offset - limit > 0 ? offset - limit : null;
    const previousUrl =
      previous != null
        ? `http://localhost:3000${currentUrl}/car?limit=${limit}&offset=${previous}`
        : 'none';

    return res.status(200).json({
      message: 'Consulta efetuado com sucesso',
      status: res.status,
      cars,
      total,
      limit,
      offset,
      nextUrl,
      previousUrl,
    });
  } catch (err) {
    return res.status(400).json({
      message: 'Erro na consulta do banco de dados',
      status: res.status,
      err,
    });
  }
};

// TODO: - JEST - Verify repeated acessories
const createCar = async (req: Request, res: Response) => {
  /* É verificado a quantidade de propriedades passadas no body
    se o ano de fabricação é válido e se o número de acessórios é maior do que 0. */
  if (
    Object.keys(req.body).length >= 6 &&
    parseInt(req.body.year) >= 1950 &&
    parseInt(req.body.year) <= 2023 &&
    req.body.accessories.length > 0
  ) {
    try {
      const createdCar = await Car.create({
        model: req.body.model,
        color: req.body.color,
        year: req.body.year,
        value_per_day: req.body.value_per_day,
        accessories: req.body.accessories,
        number_of_passengers: req.body.number_of_passengers,
      });
      return res.status(201).json({
        message: 'Registro de carro criado',
        status: res.status,
        body: createdCar,
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      return res.status(400).json({
        message: 'Erro ao cadastrar o novo carro',
        status: res.status,
        err,
      });
    }
  } else {
    /* Caso quantidade de propriedades passadas por parâmetro seja incoerente com o necessário
    se o ano de fabricação é inválido e se o número de acessórios é igual à 0 */
    return res.status(400).json({
      message: 'Entradas inválidas',
    });
  }
};

// TODO: - JEST - OK - Verify "The same rules as for registering a car apply here"
const updateCar = async (req: Request, res: Response) => {
  // Verifica se foi passado um ID válido
  if (isValidObjectId(req.params.id)) {
    try {
      const car = await Car.findOneAndUpdate(
        { _id: req.params.id },
        {
          model: req.body.model,
          color: req.body.color,
          year: req.body.year,
          value_per_day: req.body.value_per_day,
          accessories: req.body.accessories,
          number_of_passengers: req.body.number_of_passengers,
        }
      );
      if (car == null) {
        return res.status(404).json({
          message: 'Erro, não foi encontrado nenhum carro com esse ID',
          status: res.status,
        });
      } else {
        return res.status(200).json({
          message: 'Atualizado dados do carro',
          status: res.status,
          car,
        });
      }
    } catch (err) {
      return res.status(400).json({
        message: 'Erro ao atualizar dados do carro',
        status: res.status,
        err,
      });
    }
  } else {
    return res.status(400).json({
      message: 'ID inválido, tente novamente com um ID válido',
      status: res.status,
    });
  }
};

// TODO: - JEST - OK
const getCar = async (req: Request, res: Response) => {
  /// Verifica se foi passado um ID válido
  if (isValidObjectId(req.params.id)) {
    try {
      const car = await Car.findById(req.params.id);

      if (car == null) {
        return res.status(400).json({
          message: 'Erro, não foi encontrado nenhum carro com esse ID',
          status: res.status,
        });
      } else {
        return res.status(200).json({
          message: 'Consulta efetuado com sucesso',
          status: res.status,
          car,
        });
      }
    } catch (err) {
      return res.status(400).json({
        message: 'Erro na consulta',
        status: res.status,
        body: err,
      });
    }
  } else {
    return res.status(404).json({
      message: 'ID inválido, tente novamente com um ID válido',
      status: res.status,
    });
  }
};

// TODO: - JEST - OK
const deleteCar = async (req: Request, res: Response) => {
  // Verifica se temos um parametro ID sendo passado pela URL
  if (isValidObjectId(req.params.id)) {
    try {
      const deletedCar = await Car.findByIdAndDelete(req.params.id);

      if (deletedCar == null) {
        return res.status(404).json({
          message: 'Erro, não foi encontrado nenhum carro com esse ID',
          status: res.status,
        });
      } else {
        return res.status(204).json({});
      }
    } catch (err) {
      return res.status(400).json({
        message: 'Erro em deletar registro do banco de dados',
        status: res.status,
        err,
      });
    }
  } else {
    return res.status(400).json({
      message: 'ID inválido, tente novamente com um ID válido',
      status: res.status,
    });
  }
};

export { getCars, createCar, updateCar, getCar, deleteCar };

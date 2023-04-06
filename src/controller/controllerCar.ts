import { Request, Response } from 'express';
import Car from '../models/Car';
import { isValidObjectId } from '../utils/utils';
// TODO: - JEST - Verify the query in accessories - Verify pagination
const getCars = async (req: Request, res: Response) => {
  /* Verificamos se estamos recebendo alguma query, se sim
  vamos utilizá-la para busca, senão buscamos sem nenhum filtro (todos os registros) */
  const property = Object.keys(req.query)[0];
  const search = Object.keys(req.query)[0]
    ? { [property]: req.query[property] }
    : {};

  try {
    const cars = await Car.find(search);

    res.status(200).json({
      message: 'Consulta efetuado com sucesso',
      status: res.status,
      cars,
    });
  } catch (err) {
    res.status(400).json({
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
      res.status(201).json({
        message: 'Registro de carro criado',
        status: res.status,
        body: createdCar,
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      res.status(400).json({
        message: 'Erro ao cadastrar o novo carro',
        status: res.status,
        err,
      });
    }
  } else {
    /* Caso quantidade de propriedades passadas por parâmetro seja incoerente com o necessário
    se o ano de fabricação é inválido e se o número de acessórios é igual à 0 */
    res.status(400).json({
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
        res.status(404).json({
          message: 'Erro, não foi encontrado nenhum carro com esse ID',
          status: res.status,
        });
      } else {
        res.status(200).json({
          message: 'Atualizado dados do carro',
          status: res.status,
          car,
        });
      }
    } catch (err) {
      res.status(400).json({
        message: 'Erro ao atualizar dados do carro',
        status: res.status,
        err,
      });
    }
  } else {
    res.status(400).json({
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
        res.status(400).json({
          message: 'Erro, não foi encontrado nenhum carro com esse ID',
          status: res.status,
        });
      } else {
        res.status(200).json({
          message: 'Consulta efetuado com sucesso',
          status: res.status,
          car,
        });
      }
    } catch (err) {
      res.status(400).json({
        message: 'Erro na consulta',
        status: res.status,
        body: err,
      });
    }
  } else {
    res.status(404).json({
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
        res.status(404).json({
          message: 'Erro, não foi encontrado nenhum carro com esse ID',
          status: res.status,
        });
      } else {
        res.status(204).json({});
      }
    } catch (err) {
      res.status(400).json({
        message: 'Erro em deletar registro do banco de dados',
        status: res.status,
        err,
      });
    }
  } else {
    res.status(400).json({
      message: 'ID inválido, tente novamente com um ID válido',
      status: res.status,
    });
  }
};

export { getCars, createCar, updateCar, getCar, deleteCar };

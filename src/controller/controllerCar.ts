import { Request, Response } from 'express';
import Car from '../models/Car';

// TODO: - Necessário melhoria, sanitização e implementação da pesquisa por query (se for o caso) - JEST
const getCars = async (_: Request, res: Response) => {
  try {
    // Realizado consulta no banco de dados para obter os carros
    const body = await Car.find({});

    res.status(200).json({
      // Respostas se tudo ocorrer bem durante a consulta
      message: 'Consulta efetuado com sucesso',
      body,
    });
  } catch (err) {
    // Respostas se der algum erro na consulta do banco de dados
    res.status(400).json({
      message: 'Erro na consulta do banco de dados',
      body: err,
    });
  }
};

// TODO: - Necessário melhoria e sanitização - JEST
const createCar = async (req: Request, res: Response) => {
  // É verificado a quantidade de propriedades passadas por parâmetro
  if (Object.keys(req.body).length < Object.keys(Car.schema.obj).length) {
    try {
      // Criado um documento do tipo Carro no BD
      await Car.create(req.body);
      // Respostas se tudo ocorrer bem durante a criação do registro
      res.status(200).json({
        message: 'Registro de carro criado',
        body: req.body,
      });
    } catch (err) {
      // Resposta se as propriedades não atenderem as propriedades exigidas do Schema
      res.status(400).json({
        message: 'Propriedades incoerentes',
      });
    }
  } else {
    // Quantidade de parametros diferentes do adequado
    res.status(400).json({
      message: 'Quantidade de propriedades incoerentes',
    });
  }
};

// TODO: - Necessário melhoria e sanitização - JEST
const updateCar = async (req: Request, res: Response) => {
  // Verifica se foi passado um ID por paramêtro, validar a questão do body como pode ser feito (Proteger e Sanitizar)
  if (req.params.id) {
    try {
      const body = await Car.findOneAndUpdate(
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
      res.status(200).json({
        // Respostas se tudo ocorrer bem durante a atualização dos dados
        message: 'Atualizado dados do carro',
        body,
      });
    } catch (err) {
      res.status(400).json({
        // Respostas se ocorrer alguma falha durante a atualização dos dados
        message: 'Erro ao atualizar dados do carro',
      });
    }
  }
};

// OK - Necessário sanitização - JEST
const getCar = async (req: Request, res: Response) => {
  // Verifica se temos um parametro ID sendo passado pela URL
  if (req.params.id) {
    try {
      // Realizado consulta no banco de dados para obter o carro por ID
      const body = await Car.findById(req.params.id);
      res.status(200).json({
        // Respostas se tudo ocorrer bem durante a consulta
        message: 'Consulta efetuado com sucesso',
        body,
      });
    } catch (err) {
      // Respostas se der algum erro na consulta do banco de dados
      res.status(400).json({
        message: 'Erro na consulta do banco de dados',
        body: err,
      });
    }
  }
};

// OK - Necessário sanitização - JEST
const deleteCar = async (req: Request, res: Response) => {
  // Verifica se temos um parametro ID sendo passado pela URL
  if (req.params.id) {
    try {
      // Encontra e deleta por ID
      const body = await Car.findByIdAndDelete(req.params.id);
      res.status(200).json({
        // Respostas se tudo ocorrer bem durante a remoção do carro
        message: 'Carro deletado com sucesso',
        body,
      });
    } catch (err) {
      // Respostas se der algum erro na hora de deletar do banco de dados
      res.status(400).json({
        message: 'Erro em deletar registro do banco de dados',
        body: err,
      });
    }
  }
};

export { getCars, createCar, updateCar, getCar, deleteCar };

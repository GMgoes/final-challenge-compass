import { Request, Response } from 'express';
import Reserve from '../models/Reserves';
import Car from '../models/Car';
import { calculateTotal, isValidObjectId } from '../utils/utils';

// TODO: - JEST - Verify reservers in same period
const createReserve = async (req: Request, res: Response) => {
  if (Object.keys(req.body).length >= 3) {
    try {
      if (!isValidObjectId(req.body.id_car)) {
        return res.status(400).json({
          message: 'ID inválido, tente novamente com um ID válido',
        });
      } else {
        const car = await Car.findById(req.body.id_car);
        if (car == null) {
          return res.status(400).json({
            message: 'Erro, não foi encontrado nenhum carro com esse ID',
          });
        } else {
          const value_total = calculateTotal(
            req.body.end_date,
            req.body.start_date,
            car.value_per_day
          );
          const createdReserve = await Reserve.create({
            start_date: req.body.start_date,
            end_date: req.body.end_date,
            id_car: req.body.id_car,
            id_user: req.body.id_user,
            final_value: value_total,
          });

          if (createdReserve == null) {
            return res.status(400).json({
              message: 'Erro no cadastro',
              status: res.status,
            });
          } else {
            return res.status(201).json({
              message: 'Nova reserva cadastrada',
              status: res.status,
            });
          }
        }
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      return res.status(400).json({
        message: 'Erro ao cadastrar a nova reserva',
        status: res.status,
        err,
      });
    }
  } else {
    return res.status(400).json({
      message: 'Entradas inválidas',
    });
  }
};

// TODO: - JEST - Optimaze - Verify pagination
const getReserves = async (req: Request, res: Response) => {
  /* Verificamos se estamos recebendo alguma query, se sim
  vamos utilizá-la para busca, senão buscamos sem nenhum filtro (todos os registros) */
  const property = Object.keys(req.query)[0];
  const search = Object.keys(req.query)[0]
    ? { [property]: req.query[property] }
    : {};

  try {
    const reserves = await Reserve.find(search);

    return res.status(200).json({
      message: 'Consulta efetuado com sucesso',
      status: res.status,
      reserves,
    });
  } catch (err) {
    return res.status(400).json({
      message: 'Erro na consulta do banco de dados',
      status: res.status,
      err,
    });
  }
};
// TODO: - JEST
const getReserve = async (req: Request, res: Response) => {
  if (isValidObjectId(req.params.id)) {
    try {
      const reserve = await Reserve.findById(req.params.id);

      if (reserve == null) {
        return res.status(400).json({
          message: 'Erro, não foi encontrado nenhum carro com esse ID',
          status: res.status,
        });
      } else {
        return res.status(200).json({
          message: 'Consulta efetuado com sucesso',
          status: res.status,
          reserve,
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
// TODO: - JEST
const deleteReserve = async (req: Request, res: Response) => {
  // Verifica se temos um parametro ID sendo passado pela URL
  if (isValidObjectId(req.params.id)) {
    try {
      const deletedReserve = await Reserve.findByIdAndDelete(req.params.id);

      if (deletedReserve == null) {
        return res.status(404).json({
          message: 'Erro, não foi encontrado nenhuma reserva com esse ID',
          status: res.status,
        });
      } else {
        return res.status(400);
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

// TODO: - JEST - OK - Verify "The same rules as for registering a reserve apply here"
const updateReserve = async (req: Request, res: Response) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({
        message: 'ID inválido, tente novamente com um ID válido',
      });
    } else {
      const car = await Car.findById(req.body.id_car);
      if (car == null) {
        return res.status(400).json({
          message:
            'Erro, não foi encontrado nenhuma reserva para esse ID de carro',
        });
      } else {
        const value_total = calculateTotal(
          req.body.end_date,
          req.body.start_date,
          car.value_per_day
        );
        const updatedReserve = await Reserve.findByIdAndUpdate(
          {
            _id: req.params.id,
          },
          {
            start_date: req.body.start_date,
            end_date: req.body.end_date,
            id_car: req.body.id_car,
            id_user: req.body.id_user,
            final_value: value_total,
          }
        );

        if (updatedReserve == null) {
          return res.status(400).json({
            message: 'Erro na atualização ',
            status: res.status,
          });
        } else {
          return res.status(201).json({
            message: 'Reserva atualizada',
            status: res.status,
          });
        }
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return res.status(400).json({
      message: 'Erro ao cadastrar a nova reserva',
      status: res.status,
      err,
    });
  }
};

export { createReserve, getReserves, getReserve, deleteReserve, updateReserve };

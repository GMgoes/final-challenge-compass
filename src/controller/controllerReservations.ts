import { Request, Response } from 'express';
import Reserve from '../models/Reserves';
import Car from '../models/Car';
import jwt from 'jsonwebtoken';
import { calculateTotal, formatedQuery, isValidObjectId } from '../utils/utils';
import User from '../models/User';

// TODO: Verify Reserves in same date
const createReserve = async (req: Request, res: Response) => {
  // Checks if the fields were passed in the request body
  if (Object.keys(req.body).length >= 3) {
    try {
      if (!isValidObjectId(req.body.id_car)) {
        return res.status(400).json({
          message: 'Invalid ID, try again with a valid ID',
        });
      } else {
        // Checks if the car ID entered is a car that is actually registered
        const car = await Car.findById(req.body.id_car);
        if (car == null) {
          return res.status(400).json({
            message: 'Error, no car found with that ID',
          });
        } else {
          let token;
          if (req.headers.cookie) {
            token = req.headers.cookie.split('=')[1];
            // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-non-null-assertion
            const decoded: any = jwt.verify(token, process.env.SECRET!);
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const currentUser = await User.findById(decoded.id!);
            // Checks if the logged-in user who is creating the reservation has a license to drive
            if (currentUser?.qualifed == 'yes') {
              const value_total = calculateTotal(
                req.body.end_date,
                req.body.start_date,
                car.value_per_day
              );
              // Checks that the user entered the dates consistently (The final day of the reservation being later than the entry day)
              if (value_total < 0) {
                return res.status(400).json({
                  message: 'End date must be later than start date',
                  status: res.status,
                });
              } else {
                const createdReserve = await Reserve.create({
                  start_date: req.body.start_date,
                  end_date: req.body.end_date,
                  id_car: req.body.id_car,
                  id_user: decoded.id,
                  final_value: value_total,
                });

                if (createdReserve == null) {
                  return res.status(400).json({
                    message: 'Registration error',
                    status: res.status,
                  });
                } else {
                  return res.status(201).json({
                    message: 'New reservation registered',
                    status: res.status,
                    createdReserve,
                  });
                }
              }
            } else {
              return res.status(400).json({
                message: 'Unable to create a reservation, user not eligible',
                status: res.status,
              });
            }
          } else {
            return res.status(400).json({
              message: 'Error, user has been logged out',
              status: res.status,
            });
          }
        }
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      return res.status(400).json({
        message: 'Error when registering the new reservation',
        status: res.status,
        err,
      });
    }
  } else {
    return res.status(400).json({
      message: 'Invalid entries',
    });
  }
};

// OK
const getReserves = async (req: Request, res: Response) => {
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
    const reserves = await Reserve.find(search, '-__v')
      .skip(offset)
      .limit(limit);
    const currentUrl = req.baseUrl;
    const total = await Reserve.countDocuments({});

    const next = offset + limit;
    const nextUrl =
      next < total
        ? `http://localhost:3000${currentUrl}/reserve?limit=${limit}&offset=${next}`
        : 'none';

    const previous = offset - limit > 0 ? offset - limit : null;
    const previousUrl =
      previous != null
        ? `http://localhost:3000${currentUrl}/reserve?limit=${limit}&offset=${previous}`
        : 'none';

    return res.status(200).json({
      message: 'Query performed successfully',
      status: res.status,
      reserves,
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
const getReserve = async (req: Request, res: Response) => {
  // Checks if we have an ID parameter being passed by the URL
  if (isValidObjectId(req.params.id)) {
    try {
      const reserve = await Reserve.findById(req.params.id);

      if (reserve == null) {
        return res.status(400).json({
          message: 'Error, no car found with that ID',
          status: res.status,
        });
      } else {
        return res.status(200).json({
          message: 'Query performed successfully',
          status: res.status,
          reserve,
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
      message: 'Invalid ID, try again with a valid ID',
      status: res.status,
    });
  }
};
// OK
const deleteReserve = async (req: Request, res: Response) => {
  // Checks if we have an ID parameter being passed by the URL
  if (isValidObjectId(req.params.id)) {
    try {
      const deletedReserve = await Reserve.findByIdAndDelete(req.params.id);

      if (deletedReserve == null) {
        return res.status(404).json({
          message: 'Error, no booking was found with that ID',
          status: res.status,
        });
      } else {
        return res.status(400).json({});
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

// TODO: Verify exception in update Reserve Date
const updateReserve = async (req: Request, res: Response) => {
  try {
    // Checks if we have an ID parameter being passed by the URL
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({
        message: 'Invalid ID, try again with a valid ID',
      });
    } else {
      const car = await Car.findById(req.params.id);
      if (car == null) {
        return res.status(400).json({
          message: 'Error, no reservation found for this car ID',
        });
      } else {
        let token;
        if (req.headers.cookie) {
          token = req.headers.cookie.split('=')[1];
          // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-non-null-assertion
          const decoded: any = jwt.verify(token, process.env.SECRET!);
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          const currentUser = await User.findById(decoded.id!);
          // Checks if the user who is logged in and trying to create the reservation has a driving license
          if (currentUser?.qualifed == 'yes') {
            const value_total = calculateTotal(
              req.body.end_date,
              req.body.start_date,
              car.value_per_day
            );
            // Checks that the user entered the dates consistently (The final day of the reservation being later than the entry day)
            if (value_total < 0) {
              return res.status(400).json({
                message: 'End date must be later than start date',
                status: res.status,
              });
            } else {
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
                  message: 'Update error',
                  status: res.status,
                });
              } else {
                return res.status(201).json({
                  message: 'Updated reservation',
                  status: res.status,
                });
              }
            }
          } else {
            return res.status(400).json({
              message: 'Unable to create a reservation, user not eligible',
              status: res.status,
            });
          }
        } else {
          return res.status(400).json({
            message: 'Error, user has been logged out',
            status: res.status,
          });
        }
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return res.status(400).json({
      message: 'Error when registering the new reservation',
      status: res.status,
      err,
    });
  }
};

export { createReserve, getReserves, getReserve, deleteReserve, updateReserve };

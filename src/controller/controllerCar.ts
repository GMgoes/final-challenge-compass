import { Request, Response } from 'express';
import Car from '../models/Car';
import {
  formatedQuery,
  isValidObjectId,
  verifyAccessoryExists,
  verifyDuplicateAccessories,
} from '../utils/utils';
// OK
const getCars = async (req: Request, res: Response) => {
  // Pagination default if the user does not select any limit of items per page (limit) or beginning (offset)
  let limit = 10;
  let offset = 0;
  /* We check if we are receiving any queries to fetch items, if so
  let's use it for search, otherwise we search without any filter (all records)
  This function discards the offset and limit, if passed in the query */
  const search = formatedQuery(req.query);
  try {
    // We check if the user wants to insert some pagination through the query
    if (req.query.limit) {
      limit = +req.query.limit;
    }
    if (req.query.offset) {
      offset = +req.query.offset;
    }
    const cars = await Car.find(search, '-__v').skip(offset).limit(limit);
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
      message: 'Query performed successfully',
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
      message: 'Database query error',
      status: res.status,
      err,
    });
  }
};

// OK
const createCar = async (req: Request, res: Response) => {
  /* The amount of properties passed in the body is checked
    if the year of manufacture is valid, if the number of accessories is greater than 0
    and if there are duplicate accessories.*/
  if (
    Object.keys(req.body).length >= 6 &&
    parseInt(req.body.year) >= 1950 &&
    parseInt(req.body.year) <= 2023 &&
    req.body.accessories.length > 0 &&
    verifyDuplicateAccessories(req.body.accessories) == false
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
        message: 'Car registration created',
        status: res.status,
        body: createdCar,
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      return res.status(400).json({
        message: 'Error registering new car',
        status: res.status,
        err,
      });
    }
  } else {
    /* If the number of properties passed per parameter is inconsistent with what is required
    if the year of manufacture is invalid, if the number of accessories is equal to 0 or if you have repeated accessories */
    return res.status(400).json({
      message: 'Invalid entries',
    });
  }
};

// OK
const updateCar = async (req: Request, res: Response) => {
  /* The amount of properties passed in the body is checked
    if the year of manufacture is valid, if the number of accessories is greater than 0
    and if there are duplicate accessories.*/
  if (
    isValidObjectId(req.params.id) &&
    Object.keys(req.body).length >= 6 &&
    parseInt(req.body.year) >= 1950 &&
    parseInt(req.body.year) <= 2023 &&
    req.body.accessories.length > 0 &&
    verifyDuplicateAccessories(req.body.accessories) == false
  ) {
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
      const carUpdated = await Car.findById(req.params.id);
      if (car == null) {
        return res.status(404).json({
          message: 'Error, no car found with that ID',
          status: res.status,
        });
      } else {
        return res.status(200).json({
          message: 'Updated car data',
          status: res.status,
          car: carUpdated,
        });
      }
    } catch (err) {
      return res.status(400).json({
        message: 'Error updating car data',
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
const getCar = async (req: Request, res: Response) => {
  /// Checks if a valid ID was passed
  if (isValidObjectId(req.params.id)) {
    try {
      const car = await Car.findById(req.params.id, '-__v');

      if (car == null) {
        return res.status(400).json({
          message: 'Error, no car found with that ID',
          status: res.status,
        });
      } else {
        return res.status(200).json({
          message: 'Query performed successfully',
          status: res.status,
          car,
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      return res.status(400).json({
        message: 'Query error',
        status: res.status,
        body: err.message,
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
const deleteCar = async (req: Request, res: Response) => {
  // Checks if we have an ID parameter being passed by the URL
  if (isValidObjectId(req.params.id)) {
    try {
      // Checks if there is a car with that ID
      const deletedCar = await Car.findByIdAndDelete(req.params.id);

      if (deletedCar == null) {
        return res.status(404).json({
          message: 'Error, no car found with that ID',
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
const updateAccessories = async (req: Request, res: Response) => {
  // We separate the original URL by the / character
  const url = req.originalUrl.split('/');
  // We get the id of the item to be updated and the id of the description object
  const id = url[4];
  const accessoryId = parseInt(url[6]);
  // We also get the new object passed by the request body
  const newAcessory = req.body.description;
  // We check if there is a car with that ID
  const car = await Car.findById({ _id: id });

  if (car != null) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const accessories = car!.accessories;
    // We checked if with this new description object we would have an array with duplicates
    const operation = verifyAccessoryExists(accessories, newAcessory);

    /* In case it is not a duplicate and the place the user wants to insert is an id greater than the size of the vector,
    then we take it and insert it at the end of the vector */
    if (accessoryId < accessories.length || !accessoryId) {
      // Check if it's a duplicate, and if not, then we update the location on the ID that the user entered and overwrite the object that was inside
      if (!operation) {
        accessories[accessoryId] = { description: newAcessory };
      }
      // If it is a duplicate and the accessory being passed in the request body is the same accessory that is there, then we delete it
      if (operation && accessories[accessoryId]['description'] == newAcessory) {
        accessories.splice(accessoryId, 1);
      }
    } else {
      // Here we add it to the end of the list in case it is not a duplicate
      if (!operation) {
        accessories.push({ description: newAcessory });
      } else {
        return res.status(400).json({
          message: 'Cannot add this item again, it is already in the list',
          status: res.status,
        });
      }
    }
    await Car.findOneAndUpdate(
      { _id: id },
      {
        accessories: accessories,
      }
    );
    const updatedCar = await Car.findById({ _id: id });
    return res.status(200).json({
      message: 'Updated car',
      status: res.status,
      car: updatedCar,
    });
  } else {
    return res.status(404).json({
      message: 'No car found with that ID',
      status: res.status,
    });
  }
};

export { getCars, createCar, updateCar, getCar, deleteCar, updateAccessories };

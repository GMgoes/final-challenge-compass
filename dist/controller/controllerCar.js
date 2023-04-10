"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAccessories = exports.deleteCar = exports.getCar = exports.updateCar = exports.createCar = exports.getCars = void 0;
const Car_1 = __importDefault(require("../models/Car"));
const utils_1 = require("../utils/utils");
// OK
const getCars = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Pagination default if the user does not select any limit of items per page (limit) or beginning (offset)
    let limit = 10;
    let offset = 0;
    /* We check if we are receiving any queries to fetch items, if so
    let's use it for search, otherwise we search without any filter (all records)
    This function discards the offset and limit, if passed in the query */
    const search = (0, utils_1.formatedQuery)(req.query);
    try {
        // We check if the user wants to insert some pagination through the query
        if (req.query.limit) {
            limit = +req.query.limit;
        }
        if (req.query.offset) {
            offset = +req.query.offset;
        }
        const cars = yield Car_1.default.find(search, '-__v').skip(offset).limit(limit);
        const currentUrl = req.baseUrl;
        const total = yield Car_1.default.countDocuments({});
        const next = offset + limit;
        const nextUrl = next < total
            ? `http://localhost:3000${currentUrl}/car?limit=${limit}&offset=${next}`
            : 'none';
        const previous = offset - limit > 0 ? offset - limit : null;
        const previousUrl = previous != null
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
    }
    catch (err) {
        return res.status(400).json({
            message: 'Database query error',
            status: res.status,
            err,
        });
    }
});
exports.getCars = getCars;
// OK
const createCar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /* The amount of properties passed in the body is checked
      if the year of manufacture is valid, if the number of accessories is greater than 0
      and if there are duplicate accessories.*/
    if (Object.keys(req.body).length >= 6 &&
        parseInt(req.body.year) >= 1950 &&
        parseInt(req.body.year) <= 2023 &&
        req.body.accessories.length > 0 &&
        (0, utils_1.verifyDuplicateAccessories)(req.body.accessories) == false) {
        try {
            const createdCar = yield Car_1.default.create({
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
        }
        catch (err) {
            return res.status(400).json({
                message: 'Error registering new car',
                status: res.status,
                err,
            });
        }
    }
    else {
        /* If the number of properties passed per parameter is inconsistent with what is required
        if the year of manufacture is invalid, if the number of accessories is equal to 0 or if you have repeated accessories */
        return res.status(400).json({
            message: 'Invalid entries',
        });
    }
});
exports.createCar = createCar;
// OK
const updateCar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /* The amount of properties passed in the body is checked
      if the year of manufacture is valid, if the number of accessories is greater than 0
      and if there are duplicate accessories.*/
    if ((0, utils_1.isValidObjectId)(req.params.id) &&
        Object.keys(req.body).length >= 6 &&
        parseInt(req.body.year) >= 1950 &&
        parseInt(req.body.year) <= 2023 &&
        req.body.accessories.length > 0 &&
        (0, utils_1.verifyDuplicateAccessories)(req.body.accessories) == false) {
        try {
            const car = yield Car_1.default.findOneAndUpdate({ _id: req.params.id }, {
                model: req.body.model,
                color: req.body.color,
                year: req.body.year,
                value_per_day: req.body.value_per_day,
                accessories: req.body.accessories,
                number_of_passengers: req.body.number_of_passengers,
            });
            const carUpdated = yield Car_1.default.findById(req.params.id);
            if (car == null) {
                return res.status(404).json({
                    message: 'Error, no car found with that ID',
                    status: res.status,
                });
            }
            else {
                return res.status(200).json({
                    message: 'Updated car data',
                    status: res.status,
                    car: carUpdated,
                });
            }
        }
        catch (err) {
            return res.status(400).json({
                message: 'Error updating car data',
                status: res.status,
                err,
            });
        }
    }
    else {
        return res.status(400).json({
            message: 'Invalid ID, try again with a valid ID',
            status: res.status,
        });
    }
});
exports.updateCar = updateCar;
// OK
const getCar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /// Checks if a valid ID was passed
    if ((0, utils_1.isValidObjectId)(req.params.id)) {
        try {
            const car = yield Car_1.default.findById(req.params.id, '-__v');
            if (car == null) {
                return res.status(400).json({
                    message: 'Error, no car found with that ID',
                    status: res.status,
                });
            }
            else {
                return res.status(200).json({
                    message: 'Query performed successfully',
                    status: res.status,
                    car,
                });
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }
        catch (err) {
            return res.status(400).json({
                message: 'Query error',
                status: res.status,
                body: err.message,
            });
        }
    }
    else {
        return res.status(404).json({
            message: 'Invalid ID, try again with a valid ID',
            status: res.status,
        });
    }
});
exports.getCar = getCar;
// OK
const deleteCar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Checks if we have an ID parameter being passed by the URL
    if ((0, utils_1.isValidObjectId)(req.params.id)) {
        try {
            // Checks if there is a car with that ID
            const deletedCar = yield Car_1.default.findByIdAndDelete(req.params.id);
            if (deletedCar == null) {
                return res.status(404).json({
                    message: 'Error, no car found with that ID',
                    status: res.status,
                });
            }
            else {
                return res.status(204).json({});
            }
        }
        catch (err) {
            return res.status(400).json({
                message: 'Error in deleting database record',
                status: res.status,
                err,
            });
        }
    }
    else {
        return res.status(400).json({
            message: 'Invalid ID, try again with a valid ID',
            status: res.status,
        });
    }
});
exports.deleteCar = deleteCar;
// OK
const updateAccessories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // We separate the original URL by the / character
    const url = req.originalUrl.split('/');
    // We get the id of the item to be updated and the id of the description object
    const id = url[4];
    const accessoryId = parseInt(url[6]);
    // We also get the new object passed by the request body
    const newAcessory = req.body.description;
    // We check if there is a car with that ID
    const car = yield Car_1.default.findById({ _id: id });
    if (car != null) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const accessories = car.accessories;
        // We checked if with this new description object we would have an array with duplicates
        const operation = (0, utils_1.verifyAccessoryExists)(accessories, newAcessory);
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
        }
        else {
            // Here we add it to the end of the list in case it is not a duplicate
            if (!operation) {
                accessories.push({ description: newAcessory });
            }
            else {
                return res.status(400).json({
                    message: 'Cannot add this item again, it is already in the list',
                    status: res.status,
                });
            }
        }
        yield Car_1.default.findOneAndUpdate({ _id: id }, {
            accessories: accessories,
        });
        const updatedCar = yield Car_1.default.findById({ _id: id });
        return res.status(200).json({
            message: 'Updated car',
            status: res.status,
            car: updatedCar,
        });
    }
    else {
        return res.status(404).json({
            message: 'No car found with that ID',
            status: res.status,
        });
    }
});
exports.updateAccessories = updateAccessories;

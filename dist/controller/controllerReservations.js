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
exports.updateReserve = exports.deleteReserve = exports.getReserve = exports.getReserves = exports.createReserve = void 0;
const Reserves_1 = __importDefault(require("../models/Reserves"));
const Car_1 = __importDefault(require("../models/Car"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const utils_1 = require("../utils/utils");
const User_1 = __importDefault(require("../models/User"));
// TODO: Verify Reserves in same date
const createReserve = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Checks if the fields were passed in the request body
    if (Object.keys(req.body).length >= 3) {
        try {
            if (!(0, utils_1.isValidObjectId)(req.body.id_car)) {
                return res.status(400).json({
                    message: 'Invalid ID, try again with a valid ID',
                });
            }
            else {
                // Checks if the car ID entered is a car that is actually registered
                const car = yield Car_1.default.findById(req.body.id_car);
                if (car == null) {
                    return res.status(400).json({
                        message: 'Error, no car found with that ID',
                    });
                }
                else {
                    let token;
                    if (req.headers.cookie) {
                        token = req.headers.cookie.split('=')[1];
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-non-null-assertion
                        const decoded = jsonwebtoken_1.default.verify(token, process.env.SECRET);
                        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                        const currentUser = yield User_1.default.findById(decoded.id);
                        // Checks if the logged-in user who is creating the reservation has a license to drive
                        if ((currentUser === null || currentUser === void 0 ? void 0 : currentUser.qualifed) == 'yes') {
                            const value_total = (0, utils_1.calculateTotal)(req.body.end_date, req.body.start_date, car.value_per_day);
                            // Checks that the user entered the dates consistently (The final day of the reservation being later than the entry day)
                            if (value_total < 0) {
                                return res.status(400).json({
                                    message: 'End date must be later than start date',
                                    status: res.status,
                                });
                            }
                            else {
                                const createdReserve = yield Reserves_1.default.create({
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
                                }
                                else {
                                    return res.status(201).json({
                                        message: 'New reservation registered',
                                        status: res.status,
                                        createdReserve,
                                    });
                                }
                            }
                        }
                        else {
                            return res.status(400).json({
                                message: 'Unable to create a reservation, user not eligible',
                                status: res.status,
                            });
                        }
                    }
                    else {
                        return res.status(400).json({
                            message: 'Error, user has been logged out',
                            status: res.status,
                        });
                    }
                }
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }
        catch (err) {
            return res.status(400).json({
                message: 'Error when registering the new reservation',
                status: res.status,
                err,
            });
        }
    }
    else {
        return res.status(400).json({
            message: 'Invalid entries',
        });
    }
});
exports.createReserve = createReserve;
// OK
const getReserves = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Pagination default if the user does not select any limit of items per page (limit) or beginning (offset)
    let limit = 10;
    let offset = 0;
    /* We check if we are receiving any queries to fetch items, if so
    let's use it for search, otherwise we search without any filter (all records)
    This function discards the offset and limit, if passed in the query */
    const search = (0, utils_1.formatedQuery)(req.query);
    try {
        // Checks if the user typed any limits or offsets in the query
        if (req.query.limit) {
            limit = +req.query.limit;
        }
        if (req.query.offset) {
            offset = +req.query.offset;
        }
        const reserves = yield Reserves_1.default.find(search, '-__v')
            .skip(offset)
            .limit(limit);
        const currentUrl = req.baseUrl;
        const total = yield Reserves_1.default.countDocuments({});
        const next = offset + limit;
        const nextUrl = next < total
            ? `http://localhost:3000${currentUrl}/reserve?limit=${limit}&offset=${next}`
            : 'none';
        const previous = offset - limit > 0 ? offset - limit : null;
        const previousUrl = previous != null
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
    }
    catch (err) {
        return res.status(400).json({
            message: 'Database query error',
            status: res.status,
            err,
        });
    }
});
exports.getReserves = getReserves;
// OK
const getReserve = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Checks if we have an ID parameter being passed by the URL
    if ((0, utils_1.isValidObjectId)(req.params.id)) {
        try {
            const reserve = yield Reserves_1.default.findById(req.params.id);
            if (reserve == null) {
                return res.status(400).json({
                    message: 'Error, no reservation found with that ID',
                    status: res.status,
                });
            }
            else {
                return res.status(200).json({
                    message: 'Query performed successfully',
                    status: res.status,
                    reserve,
                });
            }
        }
        catch (err) {
            return res.status(400).json({
                message: 'Error in query',
                status: res.status,
                body: err,
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
exports.getReserve = getReserve;
// OK
const deleteReserve = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Checks if we have an ID parameter being passed by the URL
    if ((0, utils_1.isValidObjectId)(req.params.id)) {
        try {
            const deletedReserve = yield Reserves_1.default.findByIdAndDelete(req.params.id);
            if (deletedReserve == null) {
                return res.status(404).json({
                    message: 'Error, no reservation was found with that ID',
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
exports.deleteReserve = deleteReserve;
// TODO: Verify exception in update Reserve Date
const updateReserve = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Checks if we have an ID parameter being passed by the URL
        if (!(0, utils_1.isValidObjectId)(req.params.id)) {
            return res.status(400).json({
                message: 'Invalid ID of reservation, try again with a valid ID',
            });
        }
        else {
            if (!(0, utils_1.isValidObjectId)(req.body.id_car)) {
                return res.status(400).json({
                    message: 'Invalid ID of a car, try again with a valid ID',
                });
            }
            const car = yield Car_1.default.findById(req.body.id_car);
            if (car == null) {
                return res.status(400).json({
                    message: 'Error, no reservation found for this car ID',
                });
            }
            else {
                let token;
                if (req.headers.cookie) {
                    token = req.headers.cookie.split('=')[1];
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-non-null-assertion
                    const decoded = jsonwebtoken_1.default.verify(token, process.env.SECRET);
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    const currentUser = yield User_1.default.findById(decoded.id);
                    // Checks if the user who is logged in and trying to create the reservation has a driving license
                    if ((currentUser === null || currentUser === void 0 ? void 0 : currentUser.qualifed) == 'yes') {
                        const value_total = (0, utils_1.calculateTotal)(req.body.end_date, req.body.start_date, car.value_per_day);
                        // Checks that the user entered the dates consistently (The final day of the reservation being later than the entry day)
                        if (value_total < 0) {
                            return res.status(400).json({
                                message: 'End date must be later than start date',
                                status: res.status,
                            });
                        }
                        else {
                            const updatedReserve = yield Reserves_1.default.findByIdAndUpdate({
                                _id: req.params.id,
                            }, {
                                start_date: req.body.start_date,
                                end_date: req.body.end_date,
                                id_car: req.body.id_car,
                                id_user: req.body.id_user,
                                final_value: value_total,
                            });
                            if (updatedReserve == null) {
                                return res.status(400).json({
                                    message: 'Update error',
                                    status: res.status,
                                });
                            }
                            else {
                                const updated = yield Reserves_1.default.findById(req.params.id);
                                return res.status(201).json({
                                    message: 'Updated reservation',
                                    status: res.status,
                                    updatedReserve: updated,
                                });
                            }
                        }
                    }
                    else {
                        return res.status(400).json({
                            message: 'Unable to create a reservation, user not eligible',
                            status: res.status,
                        });
                    }
                }
                else {
                    return res.status(400).json({
                        message: 'Error, user has been logged out',
                        status: res.status,
                    });
                }
            }
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (err) {
        return res.status(400).json({
            message: 'Error when registering the new reservation',
            status: res.status,
            err,
        });
    }
});
exports.updateReserve = updateReserve;

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
exports.updateUser = exports.deleteUser = exports.getUser = exports.getUsers = exports.loginUser = exports.createUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const utils_1 = require("../utils/utils");
const bcrypt_1 = __importDefault(require("bcrypt"));
const authController_1 = require("./authController");
// OK
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if we don't already have a user registered with that email
    if (!(yield User_1.default.exists({ email: req.body.email }))) {
        if (req.body.cep.length != 8) {
            return res.status(400).json({
                message: 'Error, this CEP is invalid',
            });
        }
        // Base URL for ViaCEP query
        const urlCEP = `http://viacep.com.br/ws/${req.body.cep}/json/`;
        // Obtain the Full CEP from ViaCEP
        const fullCEP = yield (0, utils_1.obtainCEP)(urlCEP);
        // Checking Minimum age, CEP code obtained correctly, valid CPF and validate the email
        const flagAge = (0, utils_1.verifyDate)(req.body.birth) >= 18;
        const flagCEP = Object.keys(fullCEP).length != 1;
        const flagCPF = (0, utils_1.verifyCPF)(req.body.cpf);
        const flagEmail = (0, utils_1.verifyEmail)(req.body.email);
        // If the four criteria were validated, we can try to create a user
        if (flagAge && flagCEP && flagCPF && flagEmail) {
            try {
                const criptoPassword = yield bcrypt_1.default.hash(req.body.password, 14);
                const createdUser = yield User_1.default.create({
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
            }
            catch (err) {
                return res.status(400).json({
                    message: 'Error creating a user',
                    error: err.message,
                });
            }
        }
        else {
            return res.status(400).json({
                message: 'Error unable to register new user, required: Age greater than or equal to 18 years old, valid CPF, valid CEP code and valid email',
            });
        }
    }
    else {
        return res.status(400).json({
            message: 'Already existing email',
        });
    }
});
exports.createUser = createUser;
// OK
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Checks if the fields were passed: Email and Password
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({
            message: 'Email and Password credentials not provided',
        });
    }
    // Checks that this user exists in the database and that the password is correct
    const user = yield User_1.default.findOne({ email: req.body.email }).select('+password');
    if (!user || !(yield bcrypt_1.default.compare(req.body.password, user.password))) {
        return res.status(400).json({
            message: 'Email not found or invalid password',
        });
    }
    else {
        // If the password is correct, it generates a valid token and allows Login
        const token = (0, authController_1.createSendToken)(user.id, user.email, res);
        return res.status(200).json({
            status: res.status,
            message: 'User logged in',
            token,
        });
    }
});
exports.loginUser = loginUser;
// OK
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const users = yield User_1.default.find(search, '-__v -password')
            .skip(offset)
            .limit(limit);
        const currentUrl = req.baseUrl;
        const total = yield User_1.default.countDocuments({});
        const next = offset + limit;
        const nextUrl = next < total
            ? `http://localhost:3000${currentUrl}/user?limit=${limit}&offset=${next}`
            : 'none';
        const previous = offset - limit > 0 ? offset - limit : null;
        const previousUrl = previous != null
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
    }
    catch (err) {
        return res.status(400).json({
            message: 'Database query error',
            status: res.status,
            err,
        });
    }
});
exports.getUsers = getUsers;
// OK
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Checks if we have an ID parameter being passed by the URL
    if ((0, utils_1.isValidObjectId)(req.params.id)) {
        try {
            const user = yield User_1.default.findById(req.params.id);
            if (user == null) {
                return res.status(400).json({
                    message: 'Error, no user found with that ID',
                    status: res.status,
                });
            }
            else {
                return res.status(200).json({
                    message: 'Query performed successfully',
                    status: res.status,
                    user,
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
            message: 'Invalid ID of the user, try again with a valid ID',
            status: res.status,
        });
    }
});
exports.getUser = getUser;
// OK
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Checks if we have an ID parameter being passed by the URL
    if ((0, utils_1.isValidObjectId)(req.params.id)) {
        try {
            const deletedUser = yield User_1.default.findByIdAndDelete(req.params.id);
            if (deletedUser == null) {
                return res.status(404).json({
                    message: 'Error, no user was found with that ID',
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
exports.deleteUser = deleteUser;
// OK
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findOne({ email: req.body.email });
    /* checks if whoever owns that email is the person who wants to update their data,
     to prevent them from trying to update their data and put an email already in use */
    if (user == null || user.id == req.params.id) {
        if (req.body.cep.length != 8) {
            return res.status(400).json({
                message: 'Error, this CEP is invalid',
            });
        }
        // Base URL for ViaCEP query
        const urlCEP = `http://viacep.com.br/ws/${req.body.cep}/json/`;
        // Obtain the Full CEP from ViaCEP
        const fullCEP = yield (0, utils_1.obtainCEP)(urlCEP);
        // Checking Minimum age, CEP code obtained correctly, valid CPF and validate the email
        const flagAge = (0, utils_1.verifyDate)(req.body.birth) >= 18;
        const flagCEP = Object.keys(fullCEP).length != 1;
        const flagCPF = (0, utils_1.verifyCPF)(req.body.cpf);
        const flagEmail = (0, utils_1.verifyEmail)(req.body.email);
        // If the four criteria were validated, we can try to update a user
        if (flagAge && flagCEP && flagCPF && flagEmail) {
            try {
                const criptoPassword = yield bcrypt_1.default.hash(req.body.password, 14);
                const updatedUser = yield User_1.default.findByIdAndUpdate({ _id: req.params.id }, {
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
            }
            catch (err) {
                return res.status(400).json({
                    message: 'Error creating a user',
                    error: err.message,
                });
            }
        }
        else {
            return res.status(400).json({
                message: 'Error unable to register new user, required: Age greater than or equal to 18 years old, valid CPF, valid CEP code and valid email',
            });
        }
    }
    else {
        return res.status(400).json({
            message: 'Error, there is another user with that email',
        });
    }
});
exports.updateUser = updateUser;

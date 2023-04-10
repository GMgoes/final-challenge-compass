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
exports.logout = exports.protect = exports.createSendToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const utils_1 = require("../utils/utils");
// OK
const createSendToken = (id, email, res) => {
    const token = (0, utils_1.signToken)(id, email);
    const cookieOptions = {
        // Cookie that save JWT is valid for 12 hours
        expires: new Date(Date.now() + 43200000),
        httpOnly: true,
    };
    res.cookie('JWT', token, cookieOptions);
    return token;
};
exports.createSendToken = createSendToken;
// OK
const protect = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token;
    // We check if we have the cookie with the JWT stored in the headers of our request, which means that the user is logged in
    if (req.headers.cookie) {
        token = req.headers.cookie.split('=')[1];
    }
    if (!token) {
        return res.status(401).json({
            status: res.status,
            message: 'You are not logged in',
        });
    }
    // Decode the stored token and verify that it is valid and that it belongs to a user
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const decoded = jsonwebtoken_1.default.verify(token, process.env.SECRET);
    const currentUser = yield User_1.default.findById(decoded.id);
    if (!currentUser) {
        return res.status(401).json({
            status: res.status,
            message: 'This token is no longer valid',
        });
    }
    res.locals.user = currentUser;
    next();
});
exports.protect = protect;
// OK
const logout = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    // We delete the JWT token in the browser header
    res.clearCookie('JWT');
    return res.status(401).json({
        status: res.status,
        message: 'User Logged out',
    });
});
exports.logout = logout;

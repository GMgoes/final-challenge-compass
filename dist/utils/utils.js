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
exports.verifyAccessoryExists = exports.verifyEmail = exports.formatedQuery = exports.verifyDuplicateAccessories = exports.verifyDigit = exports.formatCPF = exports.signToken = exports.calculateTotal = exports.isValidObjectId = exports.verifyCPF = exports.obtainCEP = exports.verifyDate = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const axios_1 = __importDefault(require("axios"));
const mongoose_1 = __importDefault(require("mongoose"));
const moment_1 = __importDefault(require("moment"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
/* Function to check the age of the person,
returns the age difference from date of birth until now */
const verifyDate = function (datePassed) {
    const dateToVerify = Date.parse(datePassed);
    const today = new Date();
    const diferenceMs = Date.parse(today.toLocaleDateString()) - dateToVerify;
    const diferenceYears = Math.trunc(diferenceMs / (1000 * 60 * 60 * 24 * 365));
    return diferenceYears;
};
exports.verifyDate = verifyDate;
/* Function to obtain information about regions according to the zip code entered,
 returns the object passed by ViaCEP */
const obtainCEP = function (urlCEP) {
    return __awaiter(this, void 0, void 0, function* () {
        const responseObject = yield axios_1.default.get(urlCEP).then((response) => {
            return response.data;
        });
        return responseObject;
    });
};
exports.obtainCEP = obtainCEP;
// Function to check if a CPF is valid, returns true or false
const verifyCPF = function (cpfToVerify) {
    if (formatCPF(cpfToVerify)[9] == verifyDigit(10, cpfToVerify) &&
        formatCPF(cpfToVerify)[10] == verifyDigit(11, cpfToVerify) &&
        formatCPF(cpfToVerify).length == 11) {
        return true;
    }
    else {
        return false;
    }
};
exports.verifyCPF = verifyCPF;
// Function that returns the formatted CPF (Without semicolons so far)
function formatCPF(cpf) {
    let format = cpf.replaceAll('-', ' ');
    format = format.replaceAll('.', ' ');
    format = format.replaceAll(' ', '');
    const vectorCPF = [];
    for (let i = 0; i < format.length; i++) {
        vectorCPF[i] = parseInt(format[i]);
    }
    return vectorCPF;
}
exports.formatCPF = formatCPF;
// Function that dynamically checks the CPF's calculable digits (10th and 11th digit), returns true or false
function verifyDigit(weight, cpfToVerify) {
    const vector = formatCPF(cpfToVerify);
    const length = weight - 1;
    let sum = 0, rest = 0, digit = 0;
    for (let i = 0; i < length; i++) {
        sum = sum + vector[i] * weight;
        weight--;
    }
    rest = sum % 11;
    if (rest < 2) {
        digit = 0;
    }
    else {
        digit = 11 - rest;
    }
    return digit;
}
exports.verifyDigit = verifyDigit;
// Function that validates if a passed ID (String) is an ObjectID according to MongoDB definitions
function isValidObjectId(id) {
    const ObjectId = mongoose_1.default.Types.ObjectId;
    if (ObjectId.isValid(id)) {
        if (String(new ObjectId(id)) === id)
            return true;
        return false;
    }
    return false;
}
exports.isValidObjectId = isValidObjectId;
// Function that checks the total price of the reservation, based on the days passed by parameter and the daily price
function calculateTotal(dateFinal, dateStart, valueDay) {
    // TODO: Check why it can't be done that way
    /* const startDate = Date.parse(dateStart);
    const endDate = Date.parse(dateFinal);
    const diferenceMs = endDate - startDate;
    const diferenceDays = Math.trunc(diferenceMs / (1000 * 60 * 60 * 24));*/
    const diferenceMs = (0, moment_1.default)(dateFinal, 'DD/MM/YYYY').diff((0, moment_1.default)(dateStart, 'DD/MM/YYYY'));
    const days = moment_1.default.duration(diferenceMs).asDays();
    const valueTotal = valueDay * days;
    return valueTotal;
}
exports.calculateTotal = calculateTotal;
// Function to create a token, the user ID goes in the payload
function signToken(id, email) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return jsonwebtoken_1.default.sign({ id, email }, process.env.SECRET, {
        // Valid for 12 hours
        expiresIn: 43200,
    });
}
exports.signToken = signToken;
// Function that converts the elements of an object to a String array (Used to validate if we HAVE repeated accessories in the request)
function verifyDuplicateAccessories(accessoriesArray) {
    const array = [];
    accessoriesArray.forEach((element) => {
        array.push(element['description']);
    });
    return hasDuplicates(array);
}
exports.verifyDuplicateAccessories = verifyDuplicateAccessories;
// Function that validates if an array has duplicates
function hasDuplicates(array) {
    return new Set(array).size !== array.length;
}
// Function that removes the limit and offset (if any) and returns an empty object or with a query (if any)
function formatedQuery(reqQuery) {
    const newQuery = {};
    const array = Object.keys(reqQuery);
    array.forEach((element) => {
        if (element != 'offset' && element != 'limit') {
            newQuery[element] = reqQuery[element];
        }
    });
    return newQuery;
}
exports.formatedQuery = formatedQuery;
// Function that checks if the entered email is valid
function verifyEmail(email) {
    return (email.split(' ').length == 1 &&
        email.indexOf('@') != -1 &&
        email.indexOf('@') < email.length &&
        email.indexOf('@') != 0 &&
        email.lastIndexOf('.') > email.indexOf('@') &&
        email.lastIndexOf('.') < email.length);
}
exports.verifyEmail = verifyEmail;
// TODO: Check for a way to unify the functions: verify AccessoryExists and verify Duplicate Accessories perform very similar functions
// Function that validates if WE HAVE repeated strings after inserting a new element
function verifyAccessoryExists(accessories, newAcessory) {
    let flag = 0;
    accessories.forEach((element) => {
        if (element['description'] == newAcessory) {
            flag++;
        }
    });
    return flag > 0 ? true : false;
}
exports.verifyAccessoryExists = verifyAccessoryExists;

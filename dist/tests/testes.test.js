"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const utils_1 = require("../utils/utils");
const axios_1 = __importDefault(require("axios"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
jest.mock('axios');
// Valid CPF generated in 4devs - 395.512.200-05
describe('Function that validates CPF', () => {
    // Must return true
    test('Informing valid CPF with special characters (period and hyphen)', () => {
        const cpf = '395.512.200-05';
        const expected = true;
        const result = (0, utils_1.verifyCPF)(cpf);
        expect(result).toBe(expected);
    });
    // Must return true
    test('Informing valid CPF without characters (Only numbers)', () => {
        const cpf = '39551220005';
        const expected = true;
        const result = (0, utils_1.verifyCPF)(cpf);
        expect(result).toBe(expected);
    });
    // Must return false
    test('Informing invalid CPF with special characters (Dot and Hyphen)', () => {
        const cpf = '395.512.200-04';
        const expected = false;
        const result = (0, utils_1.verifyCPF)(cpf);
        expect(result).toBe(expected);
    });
    // Must return false
    test('Informing invalid CPF with special characters (Dot and Hyphen)', () => {
        const cpf = '39551220004';
        const expected = false;
        const result = (0, utils_1.verifyCPF)(cpf);
        expect(result).toBe(expected);
    });
    // Must return false
    test('Informing invalid CPF with more than 11 digits with special characters (Period and Hyphen', () => {
        const cpf = '395.512.200-055';
        const expected = false;
        const result = (0, utils_1.verifyCPF)(cpf);
        expect(result).toBe(expected);
    });
});
describe('Function that formats CPF', () => {
    // The length of the returned string must be smaller than the one entered
    test('Informing CPF with special characters (Dot and Hyphen)', () => {
        const cpf = '395.512.200-05';
        const result = (0, utils_1.formatCPF)(cpf).length;
        expect(result).toBeLessThan(cpf.length);
    });
    // The length of the returned string must be the same as the one entered
    test('Informing CPF without special characters (Only numbers)', () => {
        const cpf = '39551220005';
        const result = (0, utils_1.formatCPF)(cpf).length;
        expect(result).toEqual(cpf.length);
    });
    // The length of the returned string must be the same as the one entered
    test('Informing CPF with other special characters, other than dots and hyphens', () => {
        const cpf = '395*512*200@05';
        const result = (0, utils_1.formatCPF)(cpf).length;
        expect(result).toEqual(cpf.length);
    });
});
describe('Function that gets the CEP from viaCEP', () => {
    test('Informing a valid CEP code with eight digits', () => {
        const mockedAxios = axios_1.default;
        const response = {
            data: {
                cep: '79400-000',
                logradouro: '',
                complemento: '',
                bairro: '',
                localidade: 'Coxim',
                uf: 'MS',
                ibge: '5003306',
                gia: '',
                ddd: '67',
                siafi: '9065',
            },
        };
        mockedAxios.get.mockResolvedValue({
            data: {
                cep: '79400-000',
                logradouro: '',
                complemento: '',
                bairro: '',
                localidade: 'Coxim',
                uf: 'MS',
                ibge: '5003306',
                gia: '',
                ddd: '67',
                siafi: '9065',
            },
        });
        return (0, utils_1.obtainCEP)('79400000').then((data) => expect(data).toEqual(response.data));
    });
    test('Informing a zip code with a different quantity of eight digits', () => {
        const mockedAxios = axios_1.default;
        const response = { data: {} };
        mockedAxios.get.mockResolvedValue({ data: {} });
        return (0, utils_1.obtainCEP)('79400000').then((data) => expect(data).toEqual(response.data));
    });
    test('Reporting an invalid zip code', () => {
        jest.mock('axios');
        const mockedAxios = axios_1.default;
        const response = {
            data: {
                erro: true,
            },
        };
        mockedAxios.get.mockResolvedValue({
            data: {
                erro: true,
            },
        });
        return (0, utils_1.obtainCEP)('79424422').then((data) => expect(data).toEqual(response.data));
    });
});
describe('Function that validates the requested digit of the CPF', () => {
    test('Informing CPF and asked to verify that the 10th digit is correct', () => {
        const cpf = '39551220005';
        const weight = 10;
        const expected = +cpf[9];
        const digit = (0, utils_1.verifyDigit)(weight, cpf);
        expect(digit).toBe(expected);
    });
    test('Informing CPF with unfeasible digits for verification', () => {
        const cpf = '3@5&1220005';
        const weight = 10;
        const expected = NaN;
        const digit = (0, utils_1.verifyDigit)(weight, cpf);
        expect(digit).toBe(expected);
    });
});
describe('function that validates if a string is a valid ObjectId', () => {
    test('Entering a valid string generated by MongoDB', () => {
        const id = '507f191e810c19729de860ea';
        const expected = true;
        const result = (0, utils_1.isValidObjectId)(id);
        expect(result).toBe(expected);
    });
    test('Informing a randomly generated invalid string (Special Characters)', () => {
        const id = 'C+gOQ,di6h-:{4]}h-KmiYZ,I&&aOgfq';
        const expected = false;
        const result = (0, utils_1.isValidObjectId)(id);
        expect(result).toBe(expected);
    });
    test('Reporting an empty invalid string', () => {
        const id = '';
        const expected = false;
        const result = (0, utils_1.isValidObjectId)(id);
        expect(result).toBe(expected);
    });
});
describe('Function that validates the calculation of a reservation', () => {
    test('Entering a valid period', () => {
        const dateStart = '05/04/2023';
        const dateFinal = '10/04/2023';
        const valuePerDay = 25;
        const expected = 125;
        const result = (0, utils_1.calculateTotal)(dateFinal, dateStart, valuePerDay);
        expect(result).toBe(expected);
    });
});
describe('Function that creates a JWT', () => {
    test('Checking if a JWT contains the payload as expected', () => __awaiter(void 0, void 0, void 0, function* () {
        const id = '507f191e810c19729de860ea';
        const email = 'ggoes269@gmail.com';
        const result = yield (0, utils_1.signToken)(id, email);
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-explicit-any
        const verifyToken = yield jsonwebtoken_1.default.verify(result, process.env.SECRET);
        expect(verifyToken.id).toBe(id);
        expect(verifyToken.email).toBe(email);
    }));
    test('Checking if a JWT contains payload different than expected (Email changed', () => __awaiter(void 0, void 0, void 0, function* () {
        const id = '507f191e810c19729de860ea';
        const email = 'ggoes269@gmail.com';
        const result = yield (0, utils_1.signToken)(id, email);
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-explicit-any
        const verifyToken = yield jsonwebtoken_1.default.verify(result, process.env.SECRET);
        expect(verifyToken.id).toBe(id);
        expect(verifyToken.email).not.toBe('ggoes269@gm');
    }));
});

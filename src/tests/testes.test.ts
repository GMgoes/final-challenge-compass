import {
  verifyCPF,
  formatCPF,
  obtainCEP,
  verifyDigit,
  isValidObjectId,
  calculateTotal,
  signToken,
} from '../utils/utils';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

jest.mock('axios');
// CPF Válido gerado no 4devs - 395.512.200-05
describe('Função que valida CPF', () => {
  // Deve retornar true para um CPF válido com pontuações (Ponto e Hifen)
  test('Informando CPF válido com caracteres especiais (Ponto e Hifen)', () => {
    const cpf = '395.512.200-05';
    const expected = true;

    const result = verifyCPF(cpf);
    expect(result).toBe(expected);
  });
  // Deve retornar true para um CPF válido sem pontuações
  test('Informando CPF válido sem caracteres (Somente números)', () => {
    const cpf = '39551220005';
    const expected = true;

    const result = verifyCPF(cpf);
    expect(result).toBe(expected);
  });
  // Deve retornar false para um CPF inválido com pontuações (Ponto e Hifen)
  test('Informando CPF inválido com caracteres especiais (Ponto e Hifen)', () => {
    const cpf = '395.512.200-04';
    const expected = false;

    const result = verifyCPF(cpf);
    expect(result).toBe(expected);
  });
  // Deve retornar false para um CPF inválido sem pontuações
  test('Informando CPF inválido sem caracteres (Somente números)', () => {
    const cpf = '39551220004';
    const expected = false;

    const result = verifyCPF(cpf);
    expect(result).toBe(expected);
  });
  // Deve retornar false para um CPF inválido por conta da quantidade de dígitos, com pontuações (Ponto e Hifen)
  test('Informando CPF inválido com mais de 11 dígitos com caracteres especiais (Ponto e Hifen)', () => {
    const cpf = '395.512.200-055';
    const expected = false;

    const result = verifyCPF(cpf);
    expect(result).toBe(expected);
  });
});

describe('Função que formata CPF', () => {
  // O tamanho da string retornada deve ser menor que a inserida
  test('Informando CPF com caracteres especiais (Ponto e Hifen)', () => {
    const cpf = '395.512.200-05';

    const result = formatCPF(cpf).length;

    expect(result).toBeLessThan(cpf.length);
  });
  // O tamanho da string retornada deve ser igual que a inserida
  test('Informando CPF sem caracteres especiais (Somente números)', () => {
    const cpf = '39551220005';

    const result = formatCPF(cpf).length;

    expect(result).toEqual(cpf.length);
  });
  // O tamanho da string retornada deve ser igual que a inserida
  test('Informando CPF com outros caracteres especiais, sem ser ponto e hífen', () => {
    const cpf = '395*512*200@05';

    const result = formatCPF(cpf).length;

    expect(result).toEqual(cpf.length);
  });
});

describe('Função que obtem o CEP', () => {
  test('Informando um CEP válido com oito digitos', () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;
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
    return obtainCEP('79400000').then((data) =>
      expect(data).toEqual(response.data)
    );
  });
  test('Informando um CEP com quantidade diferente de oito digitos', () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    const response = { data: {} };
    mockedAxios.get.mockResolvedValue({ data: {} });
    return obtainCEP('79400000').then((data) =>
      expect(data).toEqual(response.data)
    );
  });
  test('Informando um CEP inválido', () => {
    jest.mock('axios');
    const mockedAxios = axios as jest.Mocked<typeof axios>;
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
    return obtainCEP('79424422').then((data) =>
      expect(data).toEqual(response.data)
    );
  });
});

describe('Função que valida o digito solicitado do CPF', () => {
  test('Informando CPF e solicitado para verificar se o 10° digito está correto', () => {
    const cpf = '39551220005';
    const weight = 10;
    const expected = +cpf[9];

    const digit = verifyDigit(weight, cpf);

    expect(digit).toBe(expected);
  });
  test('Informando CPF com digitos inviáveis para a verificação', () => {
    const cpf = '3@5&1220005';
    const weight = 10;
    const expected = NaN;
    const digit = verifyDigit(weight, cpf);

    expect(digit).toBe(expected);
  });
});

describe('Função que valida se uma string é um ObjectId válido', () => {
  test('Informando uma string válida gerada pelo MongoDB', () => {
    const id = '507f191e810c19729de860ea';
    const expected = true;

    const result = isValidObjectId(id);
    expect(result).toBe(expected);
  });
  test('Informando uma string inválida gerada aleatoriamente (Caracteres especiais)', () => {
    const id = 'C+gOQ,di6h-:{4]}h-KmiYZ,I&&aOgfq';
    const expected = false;

    const result = isValidObjectId(id);
    expect(result).toBe(expected);
  });
  test('Informando uma string inválida vazia', () => {
    const id = '';
    const expected = false;

    const result = isValidObjectId(id);
    expect(result).toBe(expected);
  });
});

describe('Função que valida o calculo de uma reserva', () => {
  test('Informando um período válido', () => {
    const dateStart = '05/04/2023';
    const dateFinal = '10/04/2023';
    const valuePerDay = 25;
    const expected = 125;

    const result = calculateTotal(dateFinal, dateStart, valuePerDay);
    expect(result).toBe(expected);
  });
});

describe('Função que cria um JWT', () => {
  test('Verificando se um JWT contém o payload conforme o esperado', async () => {
    const id = '507f191e810c19729de860ea';
    const email = 'ggoes269@gmail.com';

    const result = await signToken(id, email);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const verifyToken: any = await jwt.verify(result, process.env.SECRET!);

    expect(verifyToken.id).toBe(id);
    expect(verifyToken.email).toBe(email);
  });
  test('Verificando se um JWT contém o payload diferente do esperado (Email alterado)', async () => {
    const id = '507f191e810c19729de860ea';
    const email = 'ggoes269@gmail.com';

    const result = await signToken(id, email);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const verifyToken: any = await jwt.verify(result, process.env.SECRET!);

    expect(verifyToken.id).toBe(id);
    expect(verifyToken.email).not.toBe('ggoes269@gm');
  });
});

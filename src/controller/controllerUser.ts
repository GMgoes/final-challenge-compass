import { Request, Response } from 'express';
import User from '../models/User';
import { obtainCEP, verifyCPF, verifyDate } from '../utils/utils';
import bcrypt from 'bcrypt';

// TODO: - JEST - Need a valid Email - Need to check
const createUser = async (req: Request, res: Response) => {
  // URL Base para consulta ViaCEP
  const urlCEP = `http://viacep.com.br/ws/${req.body.cep}/json/`;
  const fullCEP = await obtainCEP(urlCEP);

  // Verificando Idade mínima, CEP obtido corretamente e CPF válido
  const flagAge = verifyDate(req.body.birth) >= 18;
  const flagCEP = Object.keys(fullCEP).length != 1;
  const flagCPF = verifyCPF(req.body.cpf);

  // Estrutura esperada do objeto respondido pelo AXIOS (Se a consulta tiver sucesso)
  const expectedResponse = {
    cep: '',
    logradouro: '',
    complemento: '',
    bairro: '',
    localidade: '',
    uf: '',
    ibge: '',
    gia: '',
    ddd: '',
    siafi: '',
  };

  // Se os três critérios foram validados, podemos tentar criar um usuário
  if (flagAge && flagCEP && flagCPF) {
    try {
      const criptoPassword = await bcrypt.hash(req.body.password, 14);
      const createdUser = await User.create({
        name: req.body.name,
        cpf: req.body.cpf,
        birth: req.body.birth,
        email: req.body.email,
        password: criptoPassword,
        cep: req.body.cep,
        qualifed: req.body.qualifed,
        patio: expectedResponse.logradouro,
        complement: expectedResponse.complemento,
        neighborhood: expectedResponse.bairro,
        locality: expectedResponse.localidade,
        uf: expectedResponse.uf,
      });
      res.status(201).json({
        message: 'Novo usuário cadastrado',
        createdUser,
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      res.status(400).json({
        message: 'Erro na criação de um usuário',
        error: err.message,
      });
    }
  }
};

// TODO: - JEST - Need to check
const loginUser = async (req: Request, res: Response) => {
  if (!req.body.email || !req.body.password) {
    res.status(400).json({
      message: 'Não foi informado as credenciais Email e Senha',
    });
  }

  const user = await User.findOne({ email: req.body.email }).select(
    '+password'
  );

  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    res.status(400).json({
      message: 'Email não encontrado ou senha invalido',
    });
  }

  res.status(200).json({
    status: 'success',
    message: 'User logged in',
  });
};

export { createUser, loginUser };

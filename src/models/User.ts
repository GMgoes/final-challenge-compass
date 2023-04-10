import mongoose from 'mongoose';
const { Schema } = mongoose;

const schema = new Schema({
  name: {
    type: String,
    required: [true, 'Name field is required'],
    trim: true,
  },
  cpf: {
    type: String,
    required: [true, 'CPF field is required'],
    unique: true,
    trim: true,
  },
  birth: {
    type: String,
    required: [true, 'Birth field is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email field is required'],
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Password field is required'],
    trim: true,
    select: false,
  },
  cep: {
    type: String,
    required: [true, 'CEP field is required'],
    trim: true,
  },
  qualifed: {
    type: String,
    required: [true, 'Qualifed field is required'],
    enum: {
      values: ['yes', 'no'],
      message: 'A resposta deve ser: yes or no',
    },
  },
  patio: {
    type: String,
  },
  complement: {
    type: String,
  },
  neighborhood: {
    type: String,
  },
  locality: {
    type: String,
  },
  uf: {
    type: String,
  },
});

const User = mongoose.model('User', schema);
export default User;

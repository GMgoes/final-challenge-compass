import mongoose from 'mongoose';
const { Schema } = mongoose;

const schema = new Schema({
  start_date: {
    type: String,
  },
  end_date: {
    type: String,
  },
  id_car: {
    type: String,
  },
  id_user: {
    type: Number,
  },
});

const Reserve = mongoose.model('Reserve', schema);
export default Reserve;

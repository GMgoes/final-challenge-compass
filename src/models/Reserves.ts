import mongoose from 'mongoose';
const { Schema } = mongoose;

const schema = new Schema({
  start_date: {
    type: String,
    required: [true, 'Model is required'],
  },
  end_date: {
    type: String,
    required: [true, 'Color is required'],
  },
  id_car: {
    type: String,
    required: [true, 'Year is required'],
  },
  id_user: {
    type: Number,
    required: [true, 'Value per day is required'],
  },
});

const Reserve = mongoose.model('Reserve', schema);
export default Reserve;

import mongoose from 'mongoose';
const { Schema } = mongoose;

const schema = new Schema({
  model: {
    type: String,
    required: [true, 'Model is required'],
  },
  color: {
    type: String,
    required: [true, 'Color is required'],
  },
  year: {
    type: String,
    required: [true, 'Year is required'],
  },
  value_per_day: {
    type: Number,
    required: [true, 'Value per day is required'],
  },
  accessories: {
    type: [{ type: String }],
    required: [true, 'Accessories is required'],
  },
  number_of_passengers: {
    type: Number,
    required: [true, 'Number of passengers is required'],
  },
});

const Car = mongoose.model('Car', schema);
export default Car;

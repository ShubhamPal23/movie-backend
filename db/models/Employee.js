import { Schema, model } from 'mongoose';

const EmployeeSchema = new Schema({
  name: String,
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email address format'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long'],
  },
});

const EmployeeModel = model("employees", EmployeeSchema);
export default EmployeeModel;

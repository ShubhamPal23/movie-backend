import EmployeeModel from "../db/models/Employee.js";
import { hashing } from "../utils/encrypt.js";
import jwt from 'jsonwebtoken';

export const controller = {
  async login(req, res) {
    const { email, password } = req.body;
    try {
      const user = await EmployeeModel.findOne({ email }).exec();
      if (!user) {
        return res.status(400).json({ message: "Invalid email or password" });
      }

      // Compare hashed passwords
      const isPasswordValid = hashing.matchPassword(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid email or password" });
      }

      res.status(200).json({ message: "Welcome " + user.name, name: user.name });
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  async register(req, res) {
    const { name, email, password } = req.body;

    try {
      // Hash the password before saving
      const hashedPassword = hashing.passwordHash(password);
      const newUser = new EmployeeModel({ name, email, password: hashedPassword });
      await newUser.save();

      res.status(201).json({ message: "User created successfully", name: newUser.name });
    } catch (error) {
      console.error("Error during registration:", error);
      if (error.code === 11000) {
        return res.status(400).json({ message: "Email already exists" });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  },

  profile(req, res) {
    const userName = req.params.username;
    res.json({ message: userName + " Hello!" });
  },

  changePassword(req, res) {
    res.json({ message: "Change Password feature coming soon!" });
  },
};

import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
try {
const {
fullName,
username,
age,
address,
mobile,
email,
password,
} = req.body;


const existingUser = await User.findOne({
  where: { username },
});

if (existingUser) {
  return res.status(400).json({
    success: false,
    message: "Username already exists",
  });
}

const hashedPassword = await bcrypt.hash(
  password,
  10
);

const user = await User.create({
  fullName,
  username,
  age,
  address,
  mobile,
  email,
  password: hashedPassword,
});

const safeUser = {
  id: user.id,
  fullName: user.fullName,
  username: user.username,
  age: user.age,
  address: user.address,
  mobile: user.mobile,
  email: user.email,
  profilePic: user.profilePic,
  role: user.role,
};

res.status(201).json({
  success: true,
  message: "User Registered Successfully",
  user: safeUser,
});


} catch (error) {
console.error(error);

res.status(500).json({
  success: false,
  message: "Server Error",
});


}
};

export const login = async (req, res) => {
try {
const { username, password } = req.body;


const user = await User.findOne({
  where: { username },
});

if (!user) {
  return res.status(400).json({
    success: false,
    message: "Invalid Credentials",
  });
}

const match = await bcrypt.compare(
  password,
  user.password
);

if (!match) {
  return res.status(400).json({
    success: false,
    message: "Invalid Credentials",
  });
}

const token = jwt.sign(
  {
    id: user.id,
    role: user.role,
  },
  process.env.JWT_SECRET,
  {
    expiresIn: "7d",
  }
);

const safeUser = {
  id: user.id,
  fullName: user.fullName,
  username: user.username,
  age: user.age,
  address: user.address,
  mobile: user.mobile,
  email: user.email,
  profilePic: user.profilePic,
  role: user.role,
};

res.status(200).json({
  success: true,
  token,
  user: safeUser,
});


} catch (error) {
console.error(error);


res.status(500).json({
  success: false,
  message: "Server Error",
});


}
};

export const checkUsername = async (
req,
res
) => {
try {
const { username } = req.params;


const user = await User.findOne({
  where: { username },
});

if (user) {
  return res.json({
    available: false,
    suggestions: [
      `${username}123`,
      `${username}2026`,
      `${username}_official`,
    ],
  });
}

res.json({
  available: true,
});


} catch (error) {
res.status(500).json({
message: "Server Error",
});
}
};

import { hash, genSalt } from "bcrypt";
import prisma from "../lib/prisma.js";
import { validationResult } from "express-validator";

export const signUp = async (req, res) => {
  const { displayName, email, password, confirmPassword } = req.body;
  const results = validationResult(req);
  if (!results.isEmpty()) {
    return res.status(400).json({ message: results.array() });
  }

  try {
    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Password does not match",
      });
    }

    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);
    const pathFile = `/${req.file.path}`;
    const user = await prisma.user.create({
      data: {
        displayName,
        email,
        profilePic: pathFile,
        password: hashedPassword,
      },
    });
    req.login(user, (err) => {
      if (err) {
        return res.status(400).json({
          message: "User created but failed to login",
        });
      }
      const { password, ...userData } = user;
      res.status(201).json({
        message: "User created successfully",
        statusCode: 201,
        data: userData,
      });
    });
  } catch (err) {
    return res.status(500).json({
      statusCode:500,
      message:"Internal Server Error!"
    })
  }
};

export const signIn = (req, res) => {
  res.json({
    message: "User logged in successfully",
    statusCode: 200,
    data: req.user,
  });
};

export const logout = (req, res) => {
  req.session.destroy();
  res.json({
    statusCode: 200,
    message: "User logged out successfully",
  });
};

export const status = async (req, res) => {
  if (req.isAuthenticated()) {
    const user = await prisma.user.findFirst({
      where: {
        id: req.user.id,
      },
      include: {
        message: true,
      },
    });
    const { password, ...userData } = user;
    return res.json({
      statusCode: 200,
      message: "User is authenticated",
      data: userData,
    });
  }
  res.status(400).json({
    statusCode: 400,
    message: "You are not authenticated",
  });
};

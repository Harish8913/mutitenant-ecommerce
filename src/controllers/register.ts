import { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";
import bcrypt from "bcrypt";

type user = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  mobileNo: string;
  countryCode: string;
  roleId: number;
};

export const registerUser = async (
  req: Request<{}, {}, user>,
  res: Response,
) => {
  try {
    const { body } = req;
    const existingUser = await prisma.user.findUnique({
      where: { email: body.email },
    });

    // If User exists
    if (existingUser) {
      return res.status(400).json({ message: "User already exist" });
    }

    // If User doesn't exists
    const { password, ...userData } = body;
    const hash = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: { passwordHash: hash, ...userData },
      select: {
        userId: true,
        firstName: true,
        lastName: true,
        email: true,
        mobileNo: true,
        countryCode: true,
        roleId: true,
      },
    });

    return res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

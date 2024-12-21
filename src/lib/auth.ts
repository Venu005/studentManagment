import { SignJWT } from "jose";

import prisma from "./db";
import { compare, hash } from "bcryptjs";
import { cookies } from "next/headers";

const secret = process.env.JWT_SECRET;
const key = new TextEncoder().encode(secret);
async function createToken(teacherId: string) {
  const token = await new SignJWT({ teacherId })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("24h")
    .sign(key);

  return token;
}

export async function signup(name: string, email: string, password: string) {
  const alreadyExists = await prisma.teacher.findUnique({
    where: {
      email,
    },
  });
  if (alreadyExists) {
    throw new Error("Teacher already exists");
  }
  const hashedPassword = await hash(password, 10);
  const teacher = await prisma.teacher.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });
  const token = await createToken(teacher.id);
  const cookie = await cookies();
  cookie.set("token", token, {
    httpOnly: true,
  });
  return {
    teacher: {
      id: teacher.id,
      name: teacher.name,
      email: teacher.email,
    },
    token,
  };
}

export async function login(email: string, password: string) {
  const teacher = await prisma.teacher.findUnique({
    where: {
      email,
    },
  });

  if (!teacher) {
    throw new Error("No teacher found");
  }
  const isValid = await compare(password, teacher.password);
  if (!isValid) {
    throw new Error("Incorrect password");
  }

  // set token
  const token = await createToken(teacher.id);
  const cookie = await cookies();
  cookie.set("token", token, {
    httpOnly: true,
  });

  return {
    teacher: {
      id: teacher.id,
      name: teacher.name,
      email: teacher.email,
    },
    token,
  };
}

export async function logout() {
  const cookie = await cookies();
  cookie.set("token", "", {
    httpOnly: true,
  });
  return {
    success: true,
  };
}

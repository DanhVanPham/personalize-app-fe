import bcrypt from "bcryptjs";
import { prisma } from "./prisma.server";
import type { RegisterForm, LoginForm } from "./types.server";
import { createUser } from "./user.server";

export async function register(user: RegisterForm) {
  const exists = await prisma.user.count({ where: { email: user.email } });
  if (exists) {
    throw new Error(`User already exists with that email`);
  }

  const newUser = await createUser(user);
  if (!newUser) {
    throw new Error(`Something went wrong trying to create a new user.`);
  }
}

export async function login({ email, password }: LoginForm) {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user || !(await bcrypt.compare(password, user.password)))
    throw new Error("Username or password is not correct!");

  return { id: user.id, email };
}

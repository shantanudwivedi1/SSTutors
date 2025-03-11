import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function getUserById(id: string) {
  try {
    const user = await db.user.findUnique({
      where: { id },
      include: {
        tutor: true,
        student: true,
      },
    });

    return user;
  } catch (error) {
    console.error("Error getting user by ID:", error);
    return null;
  }
}

export async function getUserByEmail(email: string) {
  try {
    const user = await db.user.findUnique({
      where: { email },
    });

    return user;
  } catch (error) {
    console.error("Error getting user by email:", error);
    return null;
  }
}

interface RegisterUserParams {
  name: string;
  email: string;
  password: string;
  role: "STUDENT" | "TUTOR";
}

export async function registerUser({
  name,
  email,
  password,
  role,
}: RegisterUserParams) {
  try {
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return { error: "Email already in use" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await db.user.create({
      data: {
        name,
        email,
        hashedPassword,
        role,
      },
    });

    // Create associated profile based on role
    if (role === "STUDENT") {
      await db.student.create({
        data: {
          userId: user.id,
        },
      });
    } else if (role === "TUTOR") {
      await db.tutor.create({
        data: {
          userId: user.id,
        },
      });
    }

    return { success: "User registered successfully", user };
  } catch (error) {
    console.error("Error registering user:", error);
    return { error: "Error registering user" };
  }
} 
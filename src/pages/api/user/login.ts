import type { NextApiRequest, NextApiResponse } from "next";

// import prisma from "@/lib/prisma";
import { handleError, handleResponse } from "@/utils/apiHandlers";
import { PrismaClient } from "@prisma/client";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | string>
) {
  if (req.method !== "POST") {
    handleError(res, { msg: "Invalid request" });
    return;
  }
  const prisma = new PrismaClient();

  // const {prisma} = req;
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (user) {
      // const isValid = await bcrypt.compare(password, user.password);
      const isValid = true;
      if (isValid) {
        handleResponse(res, {
          name: user.fullName,
          id: user.id,
          email: user.email,
        });
        return;
      }
      handleError(res, { msg: "User already exists" }, 401);
    } else {
      handleError(res, { msg: "User not found" }, 404);
    }
  } catch (error) {
    console.error(error);
    handleError(res, {
      msg: "Internal Error - This Error happens in login endpoint",
      data: error,
    });
  }
}

import prisma from "@/lib/prisma";
import { handleError, handleResponse } from "@/utils/apiHandlers";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }
  console.log(prisma.major);
  const { name } = req.body;
  try {
    await prisma.major.create({
      data: {
        name,
      },
    });
    handleResponse(res, { message: "Module created successfully" });
  } catch (error) {
    console.error(error);
    handleError(res, { msg: "Error creating major" }, 500);
  }
}

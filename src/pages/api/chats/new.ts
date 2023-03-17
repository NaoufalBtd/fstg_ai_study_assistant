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
  const { title, userId, moduleId } = req.body;
  try {
    if (!userId) throw new Error("The user id should be valid");
    if (!moduleId) throw new Error("The module id should be valid");

    const createdChat = await prisma.chat.create({
      data: {
        moduleId: parseInt(moduleId),
        title,
        userId: parseInt(userId),
      },
    });
    handleResponse(res, createdChat);
  } catch (error) {
    console.error(error);
    handleError(res, { msg: "Error creating module" }, 500);
  }
}

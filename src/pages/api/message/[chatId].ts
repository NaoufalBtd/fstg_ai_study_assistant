import prisma from "@/lib/prisma";
import { handleError, handleResponse } from "@/utils/apiHandlers";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  const { chatId } = req.query;

  try {
    if (typeof chatId !== "string") throw new Error("ChatId is not a string");
    const messages = await prisma.message.findMany({
      where: {
        chatId: parseInt(chatId),
      },
      select: {
        id: true,
        content: true,
        createdAt: true,
        sender: true,
      },
    });
    handleResponse(res, { messages });
  } catch (error) {
    console.error(error);
    handleError(res, { msg: "Error In Getting Messages" }, 500);
  }
}

import prisma from "@/lib/prisma";
import { handleError, handleResponse } from "@/utils/apiHandlers";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "DELETE") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }
  const { chatId } = req.query;
  try {
    if (typeof chatId !== "string") throw new Error("Invalid Api Path");
    await prisma.message.deleteMany({
      where: {
        chatId: parseInt(chatId),
      },
    });
    await prisma.chat.delete({
      where: {
        chatId: parseInt(chatId),
      },
    });
    handleResponse(res, { message: "Chat deleted successfully" });
  } catch (error) {
    console.error(error);
    handleError(res, { msg: "Error creating module" }, 500);
  }
}

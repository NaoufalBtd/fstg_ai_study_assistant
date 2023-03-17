import aiAnswer from "@/helpers/aiAnswer";
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

  const { content, userId, moduleId } = req.body;
  let chatId = req.body.chatId;
  try {
    if (!chatId) {
      const chat = await prisma.chat.create({
        data: {
          userId,
          moduleId,
          title: "",
        },
      });
      chatId = chat.id;
    }
    const userMsg = await prisma.message.create({
      data: {
        content,
        sender: "USER",
        chatId,
      },
    });
    const botAnswer = await aiAnswer(content);
    const botMsg = await prisma.message.create({
      data: {
        content: botAnswer,
        sender: "BOT",
        chatId,
      },
    });
    handleResponse(res, { userMsg, botMsg });
  } catch (error) {
    console.error(error);
    handleError(res, { msg: "Error creating module" }, 500);
  }
}

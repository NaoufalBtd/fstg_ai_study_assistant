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
  const { id, chatId, userId } = req.body;
  try {
    await prisma.message.update({
      where: {
        id,
      },
      data: {
        isSaved: true,
      },
    });
    handleResponse(res, { message: "Module created successfully" });
  } catch (error) {
    console.error(error);
    handleError(res, { msg: "Error creating module" }, 500);
  }
}

import prisma from "@/lib/prisma";
import { handleError, handleResponse } from "@/utils/apiHandlers";
import { capitalize } from "@/utils/textFormat";
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
    await prisma.chat.create({
      data: {
        title: capitalize(title),
        userId: userId,
        moduleId: moduleId,
      },
    });
    handleResponse(res, { message: "Chat created successfully" });
  } catch (error) {
    console.error(error);
    handleError(res, { msg: "Error creating module" }, 500);
  }
}

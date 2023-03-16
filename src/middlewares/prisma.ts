import { PrismaClient } from "@prisma/client";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

const withPrisma =
  (handler: NextApiHandler) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      // Initialize a new instance of the Prisma client for each request
      const prisma = new PrismaClient();

      req.prisma = prisma;

      // Call the handler function with the Prisma client instance
      await handler(req, res);

      // Clean up the Prisma client instance at the end of the request
      await prisma.$disconnect();
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Something went wrong." });
    }
  };

export default withPrisma;

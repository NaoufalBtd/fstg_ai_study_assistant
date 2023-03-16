import prisma from "@/lib/prisma";
import { handleError, handleResponse } from "@/utils/apiHandlers";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const modules = [
      { name: "Web Development", slug: "web" },
      { name: "linux", slug: "linux" },
      { name: "DBMS", slug: "dbms" },
      { name: "IHM", slug: "ihm" },
      { name: "networking", slug: "networking" },
      { name: "UML/Agile Method", slug: "uml" },
    ];
    for (let m of modules) {
      await prisma.module.create({
        data: {
          name: m.name,
          slug: m.slug.toLowerCase(),
        },
      });
    }
    handleResponse(res, { message: "Module created successfully" });
  } catch (error) {
    console.error(error);
    handleError(res, { msg: "Error creating module" }, 500);
  }
}

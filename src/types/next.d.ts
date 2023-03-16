import "next";
import { PrismaClient } from "prisma";
declare module "next" {
  export interface NextApiRequest extends IncomingMessage {
    prisma: PrismaClient;
    /**
     * Object of `query` values from url
     */
    query: Partial<{
      [key: string]: string | string[];
    }>;
    /**
     * Object of `cookies` from header
     */
    cookies: Partial<{
      [key: string]: string;
    }>;
    body: any;
    env: Env;
    preview?: boolean;
    /**
     * Preview data set on the request, if any
     * */
    previewData?: PreviewData;
  }
}

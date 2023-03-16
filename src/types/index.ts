import { Message as DbMessage } from "@prisma/client";

export interface Message
  extends Pick<
    DbMessage,
    "id" | "content" | "isSaved" | "sender" | "createdAt"
  > {}

export type Chat = {
  id: string;
  title: string;
};

export type CourseModule = {
  id: string;
  name: string;
  description?: string;
};

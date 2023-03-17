import prisma from "@/lib/prisma";
import useChatRoomStore from "@/stores/messagesStore";
import { GetServerSideProps, PreviewData } from "next";
import { getSession } from "next-auth/react";
import { ParsedUrlQuery } from "querystring";
import { useEffect } from "react";
import ChatTemplate from "../../components/templates/ChatTemplate";

interface Props {
  courseModule?:
    | {
        id: string;
        name: string;
      }
    | undefined;
  chats?:
    | {
        id: string;
        title: string;
      }[]
    | undefined;
}

const Chat: React.FC<Props> = ({ chats, courseModule }) => {
  const { setCourseModule } = useChatRoomStore();

  useEffect(() => {
    setCourseModule(courseModule, chats);
  }, []);

  return <ChatTemplate />;
};

//get server side rendering
export const getServerSideProps: GetServerSideProps<
  Props,
  ParsedUrlQuery,
  PreviewData
> = async (ctx) => {
  const { req, res } = ctx;
  const { moduleName } = ctx.params;
  console.log("moduleName", moduleName);
  let chats, courseModule;
  const session = await getSession({ req });

  if (!session || !session.user) {
    res.writeHead(302, {
      Location: "/login",
    });
    res.end();
    return { props: {} };
  }
  try {
    if (!session.user.id) throw new Error("No user session found");
    courseModule = await prisma.module.findFirst({
      where: {
        slug: moduleName,
      },
      select: {
        id: true,
        name: true,
      },
    });
    if (!courseModule) throw new Error("No course module found");
    if (!session.user) throw new Error("No user session found");
    chats = await prisma.chat.findMany({
      where: {
        moduleId: courseModule.id,
        userId: parseInt(session.user.id),
      },
      select: {
        id: true,
        title: true,
      },
    });
  } catch (err) {
    return { props: {} };
  }
  return {
    props: {
      chats: chats,
      courseModule: courseModule,
    },
  };
};

export default Chat;

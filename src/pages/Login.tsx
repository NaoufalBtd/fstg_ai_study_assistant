import LoginTemplate from "@/components/templates/LoginTemplate";
import useUserStore from "@/stores/userStore";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import { toast } from "react-hot-toast";

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
  const { setUser } = useUserStore();
  const { data: session, status } = useSession();
  const router = useRouter();
  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      const signInRes = await signIn("credentials", {
        email: data.get("email"),
        password: data.get("password"),
      });
    } catch (error) {
      toast("Invalid credentials", {});
    }
  };

  if (status === "loading") return <div>loading...</div>;
  if (status === "authenticated" && session?.user) {
    setUser(session.user);
    router.push("/");
  }

  return <LoginTemplate />;
};

export default Login;

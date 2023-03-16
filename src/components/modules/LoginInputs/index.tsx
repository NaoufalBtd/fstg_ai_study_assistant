import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

import { LoginInputsView } from "./LoginInputsView";

export default function LoginInputs(props: IProps) {
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      await signIn("credentials", {
        email: data.get("email"),
        password: data.get("password"),
        callbackUrl: "/",
      });
    } catch (error) {
      toast("Cannot login");
    }
  }
  return <LoginInputsView handleSubmit={handleSubmit} />;
}

interface IProps {}

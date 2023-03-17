import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  export interface Session {
    user?: {
      id: string | undefined;
      name?: string | undefined;
      email?: string | undefined;
      image?: string | undefined;
    };
    accessToken?: string | undefined;
  }
}

declare module "next-auth/jwt" {
  export interface JWT extends DefaultJWT {
    id: string | undefined;
    accessToken: string | undefined;
  }
}

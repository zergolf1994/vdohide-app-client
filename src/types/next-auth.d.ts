import { UserRole } from "@/models/user.model";
import { User } from "next-auth";
import { JWT } from "next-auth/jwt";

export type ExtendedUser = User & {
  role?: UserRole;
  sessionId?: string;
};

declare module "next-auth/jwt" {
  interface JWT {
    role?: UserRole;
    sessionId?: string;
  }
}

declare module "next-auth" {
  interface User {
    role?: UserRole;
    sessionId?: string;
  }

  interface Session {
    user: ExtendedUser;
    sessionId?: string;
  }
}
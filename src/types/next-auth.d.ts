// D:\foodly\src\types\next-auth.d.ts

import "next-auth"; // Ky import është vetëm për tipat, nuk sjell kod në runtime

declare module "next-auth" {
  interface Session {
    user: {
      role?: string | null;
    } & DefaultSession["user"];
  }

  interface User {
    role?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string | null;
  }
}

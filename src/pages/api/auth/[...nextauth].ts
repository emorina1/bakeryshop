import NextAuth from "next-auth";
import { authOptions } from "@/lib/authOptions"; // ose rruga ku e ke authOptions.ts

export default NextAuth(authOptions);

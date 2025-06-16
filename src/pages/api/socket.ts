import { Server } from "socket.io";
import type { NextApiRequest } from "next";
import type { NextApiResponseWithSocket } from "@/src/types/socket";

export default function handler(req: NextApiRequest, res: NextApiResponseWithSocket) {
  if (!res.socket.server.io) {
    console.log("🔌 New Socket.IO server...");
    const io = new Server(res.socket.server as any, {
      path: "/api/socket",
      addTrailingSlash: false,
    });

    res.socket.server.io = io;

    io.on("connection", (socket) => {
      console.log("🟢 Client connected");

      socket.emit("notification", {
        title: "Mirësevjen!",
        message: "Kjo është një njoftim i parë.",
      });

      socket.on("disconnect", () => {
        console.log("🔴 Client disconnected");
      });
    });
  }
  res.end();
}

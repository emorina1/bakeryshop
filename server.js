const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const socketio = require("socket.io");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  const io = socketio(server);

  io.on("connection", (socket) => {
    console.log("🔌 Client connected:", socket.id);

    // Dërgo njoftim testues pas 5 sekondash
    setTimeout(() => {
      socket.emit("notification", {
        title: "Event i ri!",
        message: "Është shtuar një event i ri në sistem.",
      });
    }, 5000);
  });

  const PORT = process.env.PORT || 3000;
  server.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});

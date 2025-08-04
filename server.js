import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";
import robot from "@hurdlegroup/robotjs";
import {
  keyEventHandler,
  mouseActionHandler,
  mouseEventHandler,
  positionEventHandler,
  slingEventHandler,
  profileCreatedEventHandler,
} from "./server/utils/event-handler.js";
import {
    GET_DEVICE_INFO,
} from "./server/utils/index.js";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

let DEVICE_INFO = {}
GET_DEVICE_INFO().then((info) => {
  DEVICE_INFO = {
    ipAddress: info.IP_ADDRESS[0],
    model: info.DEVICE_MODEL,
    userName: info.COMPUTER_NAME,
  };

  console.log(
    "********************* DEVICE INFO *******************************"
  );
  console.log("IP Address ", info.IP_ADDRESS);
  console.log("Computer Name ", info.COMPUTER_NAME);
  console.log("Device Model ", info.DEVICE_MODEL);
  console.log(
    "****************************************************************"
  );
});

// Speed up the mouse.
robot.setMouseDelay(1);
const screenSize = robot.getScreenSize();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    // Handle key events
    console.log("A user connected");

    // send device size
    socket.emit("screen_size", screenSize);
    io.emit("screen_size", screenSize);

    /// emit device info
    io.emit("device_info", DEVICE_INFO);

    socket.on("slingEvent", async (data) => {
      //console.log("sling event received ........... ", data);
      // console.log("sling event ", data);
      await slingEventHandler(io, data);
    });
 
    socket.on("profileCreatedEvent", async (data) => {
           await profileCreatedEventHandler(io, data);
    });

    socket.on("mouseEvent", (data) => {
      mouseEventHandler(data);
    });

    socket.on("keyEvent", (data) => {
      keyEventHandler(data);
    });

    socket.on("mouseAction", (data) => {
      mouseActionHandler(data);
    });

    socket.on("positionEvent", (data) => {
      //socket.on('mouseAction', (data) => {
      positionEventHandler(data);
    });
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});

import { Server } from "socket.io";
// import robot from "robotjs";
import {  } from "../../app/_mock/index.js";
import robot from "@hurdlegroup/robotjs";
import { saveToExcel } from "./writeexcel.js";
import { captureScreen, saveImage } from "./index.js";

import { sendPhotobooth } from "../email/config.js";

const screenSize = robot.getScreenSize();
//const height = (screenSize.height / 2) - 10;

let transforms = ["rotateZ(10deg)", "rotateZ(-10deg)", "rotateZ(0deg)"];
let transformIndex = 0;
function getRandomTransform(min, max) {
  return transforms[transformIndex];
}

export async function profileCreatedEventHandler(io, data) {
  const { name, profilePicture, email } = data;
  let filePath = await saveImage(profilePicture, name);
  // console.log("profile_data", data);
  console.log("profile_data filepath", filePath);

  // send photobooth email
  if (email != "") {
    console.log("Sending photobooth email to ", email);
    sendPhotobooth({ fullName: name, email, filePath })
      .then((response) => {
        console.log("Email sent successfully:", response);
      })
      .catch((error) => {
        console.error("Error sending email:", error);
      });
  }
  return "server acknowledgement here .....";
}
export async function slingEventHandler(io, data) {
  const { event, user, profilePicture } = data;
  await saveToExcel({
    "User Name": user.name,
    Email: user.email,
    "Phone Number": user.phoneNumber,
    message: user.message,
  });
  // console.log("data ", data);

  const transform = getRandomTransform();

  if (event === "sling") {
    //console.log("sling event received ........... ", data);
    // console.log("type ", typeof 5);
    let filePath = await saveImage(profilePicture, user.name);
    //console.log("filePath ", filePath);
    const mouse = robot.getMousePos();
    io.emit("sling_received", {
      //user,
      name: user.name,
      message: user.message,
      profilePicture: filePath,
      position: { x: mouse.x, y: mouse.y },
      transform: transform,
    });

    ///wait 2 secs before capturing screen
    // setTimeout(() => captureScreen(user.name), 2000);
  }
}

export function mouseEventHandler(data) {
  const mousePosition = robot.getMousePos();

  //const {event, dx, dy} = data;
  console.log("event: ", data);
  const { event } = data;

  if (event === "toggle") {
    console.log(event, "----- occured ----");
    const { toggle } = data;
    robot.mouseToggle(toggle);
  }

  if (event === "drag") {
    const { dx, dy } = data;
    console.log(event, "----- occured ----");
    robot.dragMouse(mousePosition.x + dx, mousePosition.y + dy);
  }

  if (event === "move") {
    const { dx, dy } = data;
    console.log(event, "----- occured ----");
    console.log(`dx: ${dx}; dy: ${dy}`);

    robot.moveMouse(mousePosition.x + dx, mousePosition.y + dy);
  }
}

export function keyEventHandler(data) {
  const { event, key } = data;
  robot.keyTap(key);
}

export function positionEventHandler(data) {
  const height = screenSize.height;
  const width = screenSize.width;

  const { position } = data;
  console.log("position ", position);

  switch (position) {
    case "center": {
      robot.moveMouse(width / 2, height / 2);
      break;
    }
    case "centerTop": {
      robot.moveMouse(width / 2, 10);
      break;
    }
    case "centerBottom": {
      robot.moveMouse(width / 2, height - 10);
      break;
    }
    case "topLeft": {
      robot.moveMouse(10, 10);
      break;
    }
    case "topRight": {
      robot.moveMouse(width - 10, 0);
      break;
    }
    case "bottomLeft": {
      robot.moveMouse(10, height - 10);
      break;
    }
    case "bottomRight": {
      robot.moveMouse(width - 10, height - 10);
      break;
    }
  }
}
export function mouseActionHandler(data) {
  const { action } = data;
  console.log("action ", action);

  switch (action) {
    case "leftClick": {
      robot.mouseClick("left");
      break;
    }

    case "rightClick": {
      robot.mouseClick("right");
      break;
    }
  }
}

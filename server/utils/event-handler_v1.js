import {Server} from "socket.io";
// import robot from "robotjs";
import robot from "@hurdlegroup/robotjs";
import {saveToExcel} from "./writeexcel.js";
import {captureScreen, saveImage} from "./index.js";


export async function slingEventHandler(io, data) {
    const {event, user, profilePicture} = data;
    await saveToExcel({
        "User Name": user.name,
        Email: user.email,
        "Phone Number": user.phoneNumber,
        message: user.message,
    });
    console.log("data ", data);

    if (event === "sling") {
        //console.log("sling event received ........... ", data);
        // console.log("type ", typeof 5);
        let filePath = await saveImage(profilePicture, user.name);
        //console.log("filePath ", filePath);
        const mouse = robot.getMousePos();
        io.emit("sling_received", {
            user,
            profilePicture: filePath,
            position: {x: mouse.x, y: mouse.y},
        });

        ///wait 2 secs before capturing screen
        setTimeout(() => captureScreen(user.name), 2000);
    }
}

export function mouseEventHandler(data) {
    const mousePosition = robot.getMousePos();

    //const {event, dx, dy} = data;
    console.log("event: ", data);
    const {event} = data;
    if (event === "initial") {
        const {dx, dy} = data;
        console.log("initial event received ........... ", data);
        robot.moveMouse(0, 0);
    }

    if (event === "reset") {
        const {dx, dy} = data;
        robot.moveMouse(dx, dy);
    }

    if (event === "toggle") {
        console.log(event, "----- occured ----");
        const {toggle} = data;
        robot.mouseToggle(toggle);
    }

    if (event === "drag") {
        const {dx, dy} = data;
        console.log(event, "----- occured ----");
        robot.dragMouse(mousePosition.x + dx, mousePosition.y + dy);
    }

    if (event === "move") {
        const {dx, dy} = data;
        console.log(event, "----- occured ----");
        console.log(`dx: ${dx}; dy: ${dy}`);

        robot.moveMouse(mousePosition.x + dx, mousePosition.y + dy);
    }
}

export function keyEventHandler(data) {
    const {event, key} = data;
    robot.keyTap(key);
}


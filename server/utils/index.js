import { networkInterfaces } from "os";
import http from "http";
import path from "path";
import os from "os";
import cp from "child_process";
import * as dateFn from "date-fns";
import si from "systeminformation";
import { stat, mkdir, writeFile } from "fs/promises";
// import robot from "robotjs";
import robot from "@hurdlegroup/robotjs";

/**************************  save image ************************************ */
export async function saveImage(base64String, name) {
  const relativeUploadDir = `/assets/uploads/${dateFn.format(
    Date.now(),
    "dd-MM-y"
  )}`;
  const uploadDir = path.join(
    process.cwd(),
    // "frontend",
    "public",
    relativeUploadDir
  );
  // const relativeUploadDir = `/assets/uploads/${dateFn.format(Date.now(), "dd-MM-y")}`;
  //  const uploadDir = path.join(process.cwd(), "public", relativeUploadDir);

  try {
    await stat(uploadDir);
  } catch (e) {
    if (e.code === "ENOENT") {
      await mkdir(uploadDir, { recursive: true });
    } else {
      console.error(
        "Error while trying to create directory when uploading a file\n",
        e
      );
    }
  }

  const uniqueSuffix = `${name}-${Math.round(Math.random() * 1e9)}`;

  const filename = `${uniqueSuffix}.png`;
  // Extract the Base64 data (remove the data URI prefix)
  const matches = base64String.match(/^data:(.+);base64,(.+)$/);
  if (!matches || matches.length !== 3) {
    throw new Error("Invalid Base64 string");
  }

  const mimeType = matches[1]; // e.g., 'image/png'
  const base64Data = matches[2]; // The actual Base64 data
  const extension = mimeType.split("/")[1]; // Extract file extension, e.g., 'png'

  // Decode the Base64 string into binary data
  const imageBuffer = Buffer.from(base64Data, "base64");


  // const image = Buffer.from(imageBuffer, "base64");
  // const base64data = imageBuffer.replace(/^data:image\/png;base64,/, "");

  let filePath = `${uploadDir}\\${filename}`;
  // writeFile(filePath, image, (err) => {
  writeFile(filePath, imageBuffer, (err) => {
    callback({ message: err ? "failure" : "success" });
  });

  console.log("filePath ", `${relativeUploadDir}/${filename}`);
  return `${relativeUploadDir}/${filename}`;
}

/************************************get IP Address ************************************************ */
export function getIpAddress() {
  const nets = networkInterfaces();
  const results = Object.create(null); // Or just '{}', an empty object

  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
      // 'IPv4' is in Node <= 17, from 18 it's a number 4 or 6
      const familyV4Value = typeof net.family === "string" ? "IPv4" : 4;
      if (net.family === familyV4Value && !net.internal) {
        if (!results[name]) {
          results[name] = [];
        }
        results[name].push(net.address);
      }
    }
  }

  // console.log("results ", results);
  // console.log("results ", results["Wi-Fi"] ?? [""]);
  return results["Wi-Fi"] ?? [""];
}

getIpAddress();

/// ************************ get host name ******************************

///this does not always get the computer name
// function getHostName() {
//     const computerName = os.hostname()
//     console.log(`${computerName}`);
// }
// getHostName();

export function getComputerName() {
  switch (process.platform) {
    case "win32":
      return process.env.COMPUTERNAME;
    case "darwin":
      return cp.execSync("scutil --get ComputerName").toString().trim();
    case "linux":
      const prettyname = cp.execSync("hostnamectl --pretty").toString().trim();
      return prettyname === "" ? os.hostname() : prettyname;
    default:
      return os.hostname();
  }
}

/******************************** get Computer model */

export async function getDeviceModel() {
  const systemInfo = await si.system();

  // console.log(systemInfo.model);
  return systemInfo.model;
}

// promises style - new since version 3
// si.cpu()
// .then(data => console.log(data))
// .catch(error => console.error(error));

export async function captureScreen(name) {
  //var picture = robot.screen.capture(0, 0, 170, 320);
  var picture = robot.captureScreen(0, 0, 170, 320);
  // saveImage(picture.image, name);
  // console.log("captured screen ", picture)
  // try {
  //   const bufferedImage = await sharp(picture.image).toBuffer();
  //   if (bufferedImage != null) {
  //     await saveImage(bufferedImage, name);
  //   }
  // } catch (error) {
  //   console.log("error ", error);
  // }
}

export async function GET_DEVICE_INFO() {
  const IP_ADDRESS = await getIpAddress();
  const COMPUTER_NAME = await getComputerName();
  const DEVICE_MODEL = await getDeviceModel();

  return { IP_ADDRESS, COMPUTER_NAME, DEVICE_MODEL };
}

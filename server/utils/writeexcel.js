import xlsx from "xlsx";
const { utils, writeFile, readFile } = xlsx;
import * as dateFn from "date-fns";
import fs from "fs";
import { stat, mkdir } from "fs/promises";
import path from "path";

let initialData = [];
const SHEET_NAME = "Sheet 1";

//create directory if it does not exist
export async function saveToExcel(userData) {
  ///check if directory exists
  const relativeUploadDir = `${dateFn.format(Date.now(), "dd-MM-y")}.xlsx`;
  const uploadDir = path.join(process.cwd(), "data");
  // const relativeUploadDir = `/assets/uploads/${dateFn.format(Date.now(), "dd-MM-y")}`;
  //  const uploadDir = join(process.cwd(), "public", relativeUploadDir);

  try {
    await stat(uploadDir);
  } catch (e) {
    if (e.code === "ENOENT") {
      await mkdir(uploadDir, { recursive: true });
    } else {
      console.error(
        "Error while trying to create directory when creating data directory\n",
        e
      );
    }
  }
  ///check if file exist

  let filePath = path.join(uploadDir, relativeUploadDir);
  if (fs.existsSync(filePath)) {
    console.log("file exists");
    // Reading our test file
    const file = readFile(filePath);

    ///read existing data
    initialData = utils.sheet_to_json(file.Sheets[SHEET_NAME]);
    console.log("previous ", initialData);
  }

  const data = [
    {
      Index: "1",
      UserId: "88F7B33d2bcf9f5",
      FirstName: "Shelby",
      LastName: "Terrell",
      Sex: "Male",
      Email: "elijah57@example.net",
      Phone: "001-084-906-7849x73518",
      Dateofbirth: "1945-10-26",
      JobTitle: "Games developer",
    },
    {
      Index: "2",
      UserId: "f90cD3E76f1A9b9",
      FirstName: "Phillip",
      LastName: "Summers",
      Sex: "Female",
      Email: "bethany14@example.com",
      Phone: "214.112.6044x4913",
      Dateofbirth: "1910-03-24",
      JobTitle: "Phytotherapist",
    },
    {
      Index: "3",
      UserId: "DbeAb8CcdfeFC2c",
      FirstName: "Kristine",
      LastName: "Travis",
      Sex: "Male",
      Email: "bthompson@example.com",
      Phone: "277.609.7938",
      Dateofbirth: "1992-07-02",
      JobTitle: "Homeopath",
    },
    {
      Index: "4",
      UserId: "A31Bee3c201ef58",
      FirstName: "Yesenia",
      LastName: "Martinez",
      Sex: "Male",
      Email: "kaitlinkaiser@example.com",
      Phone: "584.094.6111",
      Dateofbirth: "2017-08-03",
      JobTitle: "Market researcher",
    },
    {
      Index: "5",
      UserId: "1bA7A3dc874da3c",
      FirstName: "Lori",
      LastName: "Todd",
      Sex: "Male",
      Email: "buchananmanuel@example.net",
      Phone: "689-207-3558x7233",
      Dateofbirth: "1938-12-01",
      JobTitle: "Veterinary surgeon",
    },
    {
      Index: "6",
      UserId: "bfDD7CDEF5D865B",
      FirstName: "Erin",
      LastName: "Day",
      Sex: "Male",
      Email: "tconner@example.org",
      Phone: "001-171-649-9856x5553",
      Dateofbirth: "2015-10-28",
      JobTitle: "Waste management officer",
    },
    {
      Index: "7",
      UserId: "bE9EEf34cB72AF7",
      FirstName: "Katherine",
      LastName: "Buck",
      Sex: "Female",
      Email: "conniecowan@example.com",
      Phone: "+1-773-151-6685x49162",
      Dateofbirth: "1989-01-22",
      JobTitle: "Intelligence analyst",
    },
    {
      Index: "8",
      UserId: "2EFC6A4e77FaEaC",
      FirstName: "Ricardo",
      LastName: "Hinton",
      Sex: "Male",
      Email: "wyattbishop@example.com",
      Phone: "001-447-699-7998x88612",
      Dateofbirth: "1924-03-26",
      JobTitle: "Hydrogeologist",
    },
    {
      Index: "9",
      UserId: "baDcC4DeefD8dEB",
      FirstName: "Dave",
      LastName: "Farrell",
      Sex: "Male",
      Email: "nmccann@example.net",
      Phone: "603-428-2429x27392",
      Dateofbirth: "2018-10-06",
      JobTitle: "Lawyer",
    },
    {
      Index: "10",
      UserId: "8e4FB470FE19bF0",
      FirstName: "Isaiah",
      LastName: "Downs",
      Sex: "Male",
      Email: "virginiaterrell@example.org",
      Phone: "+1-511-372-1544x8206",
      Dateofbirth: "1964-09-20",
      JobTitle: "Engineer, site",
    },
  ];

  console.log("previous ", initialData);
  ///join existing data with new data
  const workSheet = utils.json_to_sheet([...initialData, userData]);
  const workBook = utils.book_new();
  utils.book_append_sheet(workBook, workSheet, SHEET_NAME);
  //writeFile(workBook, "sample.xlsx");
  writeFile(workBook, filePath);
}


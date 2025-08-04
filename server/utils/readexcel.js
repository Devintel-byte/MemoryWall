
// Requiring the module 
import xlsx from 'xlsx';
 const { readFile, utils } =  xlsx;
  
// Reading our test file 
const file = readFile('./dob.xlsx') 
  
let data = [] 
  
const sheets = file.SheetNames 
  
for(let i = 0; i < sheets.length; i++) 
{ 
   const temp = utils.sheet_to_json( 
        file.Sheets[file.SheetNames[i]]) 
   temp.forEach((res) => { 
      data.push(res) 
   }) 
} 
  
// Printing data 
console.log(data)

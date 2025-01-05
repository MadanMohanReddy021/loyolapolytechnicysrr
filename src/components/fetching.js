import fetch from 'node-fetch'; 
import puppeteer from "puppeteer";
import mysql from 'mysql';
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'fetcher'
});

connection.connect(err => {
  if (err) {
    console.error('MySQL connection error:', err.stack);
    return;
  }
  console.log('MySQL connected as id ' + connection.threadId);
});

(async () => {
  // Launch Puppeteer
  const browser = await puppeteer.launch({ headless: 'false' }); // Use false to see the browser in action
  const page = await browser.newPage();

  // Navigate to the target website
  
  const dic = [];
  var i;
  for(i=1;i<=120;i++){
    var j=String(i);
    var k=i;
    if(j.length==1){
k=`00${i}`;
    }
    else if(j.length==2){
      k=`0${i}`;
    }
const details={
  
  pin:`22029-cm-${k}`,
  sem:'4SEM'
};
dic.push(details);
  }
  
  for (const value of dic) {
    // Navigate to the page for each entry
    await page.goto('https://sbtet.ap.gov.in/APSBTET/results.do');
    
    // Fill the form fields
    await page.type('#aadhar1', value.pin); // Replace '#pin' with the correct selector
    await page.type('#grade2', value.sem); // Replace '#semester' with the correct selector
    
    // Submit the form
    await page.click('.btn.btn-primary'); // Replace with the correct submit button selector

    // Wait for the navigation after form submission
    await page.waitForNavigation();

    // Handle the resulting page
    console.log("Form submitted. Now handling the results...");
var pin,branch,sem,name,arr=[];
    // Extract data from the resulting table rows
 // const res=await page.$$eval('#d');
  //const res = await page.$$eval('#d', (elements) => elements.length > 0); // Check if any element exists

  const res = await page.$$eval('#d', (elements) => elements.length > 0); // Check if any element exists

  if (res) {
    // Now check for the #msg element
    const msgElement = await page.$('#msg');
    if (msgElement) {
      pin = value.pin;
      arr = { 'message': 'not registered' };
      branch='';
  sem=value.sem;
      name='';
    } else {
      // Proceed with the usual result extraction logic
      const resultText = await page.$$eval('#altrowstable1 tbody tr', (rows) => {
        return rows.map(row => {
          const headers = Array.from(row.querySelectorAll('th')).map(header => header.innerHTML.trim());
          const cells = Array.from(row.querySelectorAll('td')).map(cell => cell.innerHTML.trim());
          return { headers, cells };
        });
      });
  console.log(resultText);
      pin = String(resultText[0].cells[0]);
      name = String(resultText[1].cells[0]);
      branch = String(resultText[2].cells[0]);
      sem = String(value.sem);
  
      resultText.forEach((value, index) => {
        if (index >= 4) {
          const dic = {
            subcode: value.headers[0],
            marks: value.cells
          };
          arr.push(dic);
        }
      });
    }
  }
  
    const student = {
      pin: pin,
      name: name,
      course: branch,
      semester: sem,
      marks: arr
    };
  
    // Convert marks into a JSON string
    const marksJson = JSON.stringify(student.marks);
    console.log(marksJson);
    console.log(typeof pin);
    console.log(typeof marksJson);
  

    // Prepare the SQL query with placeholders for values
    const query = `
      INSERT INTO student (pinnumber, name, branch, semester, marks)
      VALUES (?, ?, ?, ?, ?)
    `;

    // Insert data using a prepared statement with placeholders
    // connection.query(query, [pin, name, branch, sem, marksJson], (err, results) => {
    //   if (err) {
    //     console.error('Error inserting data:', err);
    //     return;
    //   }
    //   console.log('Data inserted successfully:', results);
    // });
  }

  // Close the connection and browser after operations
  connection.end();
  await browser.close();
})();

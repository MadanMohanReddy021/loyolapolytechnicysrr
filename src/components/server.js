import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
const app = express();
import bodyParser from 'body-parser';
import multer from 'multer';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import puppeteer from "puppeteer";
// MySQL Database connection
const db = mysql.createConnection({
  host: 'dpg-ctsvjpt2ng1s73c4hj60-a',     
  user: 'madan',  
  password: 'Z1nZOolhskYB6k1Rum1xHxXMHFms5R9y',  
  database: 'loyola'      
});


db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

app.use(cors());  


app.get('/images', (req, res) => {
  const query = 'SELECT * FROM images'; 
  

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error retrieving images from MySQL:', err);
      return res.status(500).send('Error retrieving images.');
    }

    if (results.length === 0) {
      return res.status(404).send('No images found.');
    }

    
    const images = results.map(image => ({
      imageUrl: `http://localhost:5000/image/${image.id}`,  
      caption: image.caption
    }));

    
    res.json(images);
  });
});

// Route to get an individual image by ID
app.get('/image/:id', (req, res) => {
  const imageId = req.params.id;  // Get the image ID from the URL parameter

  const query = 'SELECT 	imageData, caption FROM images WHERE id = ?';
  db.query(query, [imageId], (err, results) => {
    if (err) {
      console.error('Error retrieving image from MySQL:', err);
      return res.status(500).send('Error retrieving image.');
    }

    if (results.length === 0) {
      return res.status(404).send('Image not found.');
    }

    const image = results[0];

    // Set the content type and send the image data
    res.contentType(image.caption);
    res.send(image.imageData);
  });
});
app.get('/api/notifications', (req, res) => {
  const query = 'SELECT id,notify FROM notifications';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching data from database', err);
      return res.status(500).json({ error: 'Failed to fetch data' });
    }
    console.log(results);
    res.json(results); 
  });
});
app.delete('/api/notifications/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM notifications WHERE id = ?';

  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error deleting notification', err);
      return res.status(500).json({ error: 'Failed to delete notification' });
    }
    console.log('Notification deleted successfully');
    res.status(200).json({ message: 'Notification deleted' });
  });
});

app.use(bodyParser.json());
app.post('/api/insert-row', (req, res) => {
  const { notify } = req.body;
console.log(notify);
  if (!notify) {
    return res.status(400).json({ error: 'Notify field is required' });
  }

  // SQL query to insert data into the notifications table
  const query = 'INSERT INTO notifications (notify) VALUES (?)';

  db.query(query, [notify], (err, results) => {
    if (err) {
      console.error('Error inserting data: ', err);
      return res.status(500).json({ error: 'Database error' });
    }

    return res.status(200).json({ message: 'Row inserted successfully', data: results });
  });
});
const storage = multer.memoryStorage(); // Store image in memory as binary data
const upload = multer({ storage });
app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file || !req.body.caption) {
    return res.status(400).json({ message: 'Please provide both an image and a caption' });
  }

  const imageData = req.file.buffer; // The binary data of the image
  const caption = req.body.caption;  // The caption for the image

  // Insert the image and caption into the MySQL database
  const query = 'INSERT INTO images (caption, imageData) VALUES (?, ?)';
  db.query(query, [caption, imageData], (err, result) => {
    if (err) {
      console.error('Error inserting data into database:', err);
      return res.status(500).json({ message: 'Error uploading image' });
    }
    res.json({ message: 'Image uploaded successfully', imageId: result.insertId });
  });
});
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  // Check if the user exists
  db.query('SELECT * FROM users WHERE username = ? and password=?', [username,password], async (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Server error' });
    }
    console.log(results);
    if (results.length === 0) {
      console.log(results);
      return res.status(400).json({ message: 'Invalid credentials' });
    
    }

    const user = results[0];

  
    
    // Generate a JWT token
    const token = jwt.sign({ userId: user.username }, 'your_jwt_secret', { expiresIn: '1h' });

    res.json({ message: 'Login successful', token });
  });
});
//************************************* ******************************************************************************************************************************************************************
//fetching the marks for the students
//*********************************************************************************************************************************************************************************************************
//
app.post('/api/marks', async (req, res) => {
  const { start, end,sem } = req.body; 
  console.log(start,end);
  const Sem=sem;
  const startpin=parseInt((start.slice(-3)),10);
  const endpin=parseInt((end.slice(-3)),10);
  const basepin=start.slice(0,9);
  try {
    
    const dic = [];
    for (let i = startpin; i <= endpin; i++) {
      let k = i.toString().padStart(3, '0');
      dic.push({
        pin: `${basepin}${k}`,
        sem: Sem,
      });
      console.log(dic);
    }
    console.log(dic);
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    
    const results = [];

    for (const value of dic) {
      await page.goto('https://sbtet.ap.gov.in/APSBTET/results.do');
      await page.type('#aadhar1', value.pin);
      await page.type('#grade2', value.sem);
      await page.click('.btn.btn-primary');
      await page.waitForNavigation();

      let pin, branch, sem, name, arr = [];

      const res = await page.$$eval('#d', (elements) => elements.length > 0);

      if (res) {
        const msgElement = await page.$('#msg');
        if (msgElement) {
          pin = value.pin;
          arr = [{ message: 'not registered' }];
          branch = '';
          sem = value.sem;
          name = '';
        } else {
          const resultText = await page.$$eval('#altrowstable1 tbody tr', (rows) => {
            return rows.map(row => {
              const headers = Array.from(row.querySelectorAll('th')).map(header => header.innerHTML.trim());
              const cells = Array.from(row.querySelectorAll('td')).map(cell => cell.innerHTML.trim());
              return { headers, cells };
            });
          });

          pin = String(resultText[0].cells[0]);
          name = String(resultText[1].cells[0]);
          branch = String(resultText[2].cells[0]);
          sem = String(value.sem);

          resultText.forEach((value, index) => {
            if (index >= 4) {
              const dic = {
                subcode: value.headers[0],
                marks: value.cells,
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
        marks: arr,
      };

      // Store results to be sent back to the API
      results.push(student);

      // Insert data into the database
      const marksJson = JSON.stringify(student.marks);
      const query = `
        INSERT INTO student (pinnumber, name, branch, semester, marks)
        VALUES (?, ?, ?, ?, ?)
      `;
      db.query(query, [pin, name, branch, sem, marksJson], (err, results) => {
        if (err) {
          console.error('Error inserting data:', err);
        } else {
          console.log('Data inserted successfully:', results);
        }
      });
    }

    // Send the results as a response to the API call
    res.status(200).json(results);

    await browser.close();
  } catch (error) {
    console.error('Error during scraping:', error);
    res.status(500).json({ error: 'Failed to scrape results' });
  }
});
//*****************************************************************************************************************************************************************************
// ***************************************************************** end of all apis*******************************************************************************************
//*****************************************************************************************************************************************************************************
     





// *******************************************************************************************************************************************************************************
//***************************************************************** get marks ****************************************************************************************************
 //******************************************************************************************************************************************************************************* 
 app.get('/api/students', (req, res) => {
  db.query("SELECT * FROM student where name!=''", (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Error fetching data' });
    } else {
      res.json(results); // Send data as JSON response
    }
  });
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

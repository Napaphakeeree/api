const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3001;  // Express port

let temperature = null; // สร้างตัวแปรข้อมูลอุณหภูมิ

// Middleware แปลงข้อมูล JSON
app.use(bodyParser.json());

app.use(cors({
  origin: 'http://20.2.139.23'
}));

// API POST สำหรับ ESP32 ให้ส่งข้อมูลเข้ามา
app.post("/updateTemperature", (req, res) => {
  const temp = req.body.temperature;
  if (temp !== undefined) {
    temperature = temp;
    console.log(`Received temperature: ${temperature}`);
    res.status(200).send("Data received");
  } else {
    console.log("Temperature data is missing");
    res.status(400).send("Temperature data is missing");
  }
});

// API สำหรับ React web ให้ดึงข้อมูลจาก Express ไปใช้
app.get("/getTemperature", (req, res) => {
  if (temperature !== null) {
    res.json({ temperature: temperature });
  } else {
    res.status(404).send("Temperature data not available");
  }
});
// เปิดใช้งาน Express พร้อมแสดงข้อความ
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3001;

// ข้อมูลที่ใช้ใน Dashboard
let totalStudents = null;
let behaviorAvg = null;
let peoplePerHour = [];
let peoplePerDay = [];
let behaviorPercent = [];

// Middleware
app.use(bodyParser.json());
app.use(cors({ origin: "*" }));

// API POST สำหรับอัปเดตข้อมูล
app.post("/updateRoomData", (req, res) => {
    const { students, behaviorLevel, hourlyData, dailyData, behaviorData } = req.body;

    if (students === undefined || behaviorLevel === undefined || !hourlyData || !dailyData || !behaviorData) {
        return res.status(400).json({ error: "Missing required data" });
    }

    if (behaviorLevel < 1 || behaviorLevel > 5) {
        return res.status(400).json({ error: "Behavior level must be between 1 and 5" });
    }

    totalStudents = students;
    behaviorAvg = behaviorLevel;
    peoplePerHour = hourlyData;
    peoplePerDay = dailyData;
    behaviorPercent = behaviorData;

    console.log(`Updated Room Data:
        - Total Students: ${totalStudents}
        - Behavior Avg: ${behaviorAvg}
        - People Per Hour: ${peoplePerHour}
        - People Per Day: ${peoplePerDay}
        - Behavior Percent: ${behaviorPercent}`);

    res.status(200).json({ message: "Room data updated successfully" });
});

// API GET สำหรับดึงข้อมูลไปใช้ใน Dashboard
app.get("/getRoomData", (req, res) => {
    if (totalStudents === null || behaviorAvg === null || peoplePerHour.length === 0) {
        return res.status(404).json({ error: "Room data not available" });
    }

    res.json({
        totalStudents,
        behaviorAvg,
        peoplePerHour,
        peoplePerDay,
        behaviorPercent
    });
});

// เปิดใช้งานเซิร์ฟเวอร์
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

const express = require('express');
const router = express.Router();
const fs = require('fs');
const db = require('../db');
const upload = require('../storage');
const path = require('path');

router.get("/courses", (req, res) => {
    const { college_id } = req.query;
    if (!college_id) {
        res.status(400).json({ error: "college_id is required" });
        return;
    }

    const sql = "SELECT * FROM course WHERE college_id = ?";
    db.query(sql, [college_id], (err, results) => {
        if (err) {
        console.error("Error fetching courses:", err);
        res.status(500).json({ error: "Failed to fetch courses" });
        return;
        }
        res.json(results);
    });
});

router.post("/courses", (req, res) => {
    const { course_id, course_name, college_id } = req.body;

    if (!course_id || !course_name || !college_id) {
        res.status(400).json({ error: "course_id, course_name, and college_id are required" });
        return;
    }

    const sql = "INSERT INTO course (course_id, course_name, college_id) VALUES (?, ?, ?)";
    db.query(sql, [course_id, course_name, college_id], (err, result) => {
        if (err) {
        console.error("Error adding course:", err);
        res.status(500).json({ error: "Failed to add course" });
        return;
        }
        res.json({ message: "Course added successfully", courseId: result.insertId });
    });
});

router.put("/courses/:course_id", (req, res) => {
    const { course_id } = req.params;
    const { course_name, college_id } = req.body;

    if (!course_name || !college_id) {
        res.status(400).json({ error: "course_name and college_id are required" });
        return;
    }

    const sql = "UPDATE course SET course_name = ?, college_id = ? WHERE course_id = ?";
    db.query(sql, [course_name, college_id, course_id], (err, result) => {
        if (err) {
        console.error("Error updating course:", err);
        res.status(500).json({ error: "Failed to update course" });
        return;
        }
        res.json({ message: "Course updated successfully" });
    });
});


router.delete("/courses/:course_id", (req, res) => {
    const { course_id } = req.params;

    const sql = "DELETE FROM course WHERE course_id = ?";
    db.query(sql, [course_id], (err, result) => {
        if (err) {
        console.error("Error deleting course:", err);
        res.status(500).json({ error: "Failed to delete course" });
        return;
        }
        res.json({ message: "Course deleted successfully" });
    });
});
  

module.exports = router;
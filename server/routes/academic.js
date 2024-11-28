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
    const { course_id, course_name, college_id, is_graduate } = req.body;

    if (!course_id || !course_name || !college_id) {
        res.status(400).json({ error: "course_id, course_name, and college_id are required" });
        return;
    }

    const sql = "INSERT INTO course (course_id, course_name, college_id, is_graduate) VALUES (?, ?, ?, ?)";
    db.query(sql, [course_id, course_name, college_id, is_graduate], (err, result) => {
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
    const { course_name, college_id, is_graduate } = req.body;

    if (!course_name || !college_id) {
        res.status(400).json({ error: "course_name and college_id are required" });
        return;
    }

    const sql = "UPDATE course SET course_name = ?, college_id = ?, is_graduate =? WHERE course_id = ?";
    db.query(sql, [course_name, college_id,is_graduate, course_id], (err, result) => {
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

router.get("/calendar/:type", (req, res) => {
    const { type } = req.params;

    const sql = "SELECT * FROM academic_calendar WHERE type = ?";
    db.query(sql, [type], (err, results) => {
        if (err) {
        console.error("Error fetching calendar:", err);
        res.status(500).json({ error: "Failed to fetch calendar" });
        return;
        }
        res.json(results);
    });
});

router.put("/calendar", (req, res) => {
    const rows = req.body; // Expect an array of rows
    const sql = "UPDATE academic_calendar SET start_date = ?, end_date = ? WHERE id = ?";

    db.beginTransaction((err) => {
        if (err) {
            console.error("Transaction error:", err);
            return res.status(500).json({ error: "Transaction failed" });
        }

        let completed = 0;
        for (let i = 0; i < rows.length; i++) {
            const { id, start_date, end_date } = rows[i];
            db.query(sql, [start_date, end_date, id], (err) => {
                if (err) {
                    console.error("Query error:", err);
                    return db.rollback(() => {
                        res.status(500).json({ error: "Failed to update rows" });
                    });
                }

                completed++;
                if (completed === rows.length) {
                    db.commit((err) => {
                        if (err) {
                            console.error("Commit error:", err);
                            return db.rollback(() => {
                                res.status(500).json({ error: "Commit failed" });
                            });
                        }
                        res.json({ message: "All rows updated successfully" });
                    });
                }
            });
        }
    });
});

module.exports = router;
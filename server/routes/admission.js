const express = require('express');
const router = express.Router();
const fs = require('fs');
const db = require('../db');
const upload = require('../storage');
const path = require('path');

router.get("/information/:id", (req, res) => {
    const { id } = req.params;
    db.query("SELECT * FROM admission WHERE id = ?", [id], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Database error" });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: "Admission not found" });
        }
        res.json(results[0]);
    });
});

router.put("/information/:id", (req, res) => {
    const { id } = req.params;
    const { description, requirements, qualifications, process, email } = req.body;
    db.query(
        "UPDATE admission SET description = ?, requirements = ?, qualifications = ?, process = ?, email = ? WHERE id = ?",
        [description, requirements, qualifications, process, email, id],
        (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: "Database error" });
            }
            res.json({ message: "Admission updated successfully" });
        }
    );
});

router.patch("/information/:id/status", (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    db.query("UPDATE admission SET status = ? WHERE id = ?", [status, id], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Database error" });
        }
        res.json({ message: "Status updated successfully" });
    });
});
module.exports = router;
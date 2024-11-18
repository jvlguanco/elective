const express = require('express');
const router = express.Router();
const fs = require('fs');
const db = require('../db');
const upload = require('../storage');
const path = require('path');

router.get("/bid-items", (req, res) => {
    db.query("SELECT * FROM bid_items", (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Error fetching bid items");
        }
        res.json(results);
    });
});

router.post("/bid-items", upload.single("file"), (req, res) => {
    const { title } = req.body;
    const file = req.file ? req.file.path : null;

    if (!title || !file) {
        return res.status(400).send("Title and file are required");
    }

    const sql = "INSERT INTO bid_items (title, file) VALUES (?, ?)";
    db.query(sql, [title, file], (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Error creating bid item");
        }
        res.send({ message: "Bid item created successfully" });
    })
});

router.put("/bid-items/:id", upload.single("file"), (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    const newFile = req.file ? req.file.path : null;

    const sqlGetOld = "SELECT file FROM bid_items WHERE id = ?";
    db.query(sqlGetOld, [id], (err, results) => {
        if (err || results.length === 0) {
            console.error(err);
            return res.status(404).send("Bid item not found");
        }

        const oldFile = results[0].file;
        const sqlUpdate = newFile
            ? "UPDATE bid_items SET title = ?, file = ? WHERE id = ?"
            : "UPDATE bid_items SET title = ? WHERE id = ?";

        const params = newFile ? [title, newFile, id] : [title, id];

        db.query(sqlUpdate, params, (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send("Error updating bid item");
            }

            if (newFile && oldFile) {
                fs.unlink(path.join(__dirname, "../", oldFile), (err) => {
                    if (err) console.error("Error deleting old file:", err);
                });
            }

            res.send({ message: "Bid item updated successfully" });
        });
    });
});

router.delete("/bid-items/:id", (req, res) => {
    const { id } = req.params;

    const sqlGetOld = "SELECT file FROM bid_items WHERE id = ?";
    db.query(sqlGetOld, [id], (err, results) => {
        if (err || results.length === 0) {
            console.error(err);
            return res.status(404).send("Bid item not found");
        }

        const oldFile = results[0].file;

        const sqlDelete = "DELETE FROM bid_items WHERE id = ?";
        db.query(sqlDelete, [id], (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send("Error deleting bid item");
            }

            fs.unlink(path.join(__dirname, "../", oldFile), (err) => {
                if (err) console.error("Error deleting file:", err);
            });

            res.send({ message: "Bid item deleted successfully" });
        });
    });
});

module.exports = router;
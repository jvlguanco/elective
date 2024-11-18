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

router.get("/consolidated-updates", (req, res) => {
    db.query("SELECT * FROM consolidated_updates", (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Error fetching consolidated updates");
        }
        res.json(results);
    });
});

router.post("/consolidated-updates", upload.single("file"), (req, res) => {
    const { title } = req.body;
    const file = req.file ? req.file.path : null;

    if (!title || !file) {
        return res.status(400).send("Title and file are required");
    }

    const sql = "INSERT INTO consolidated_updates (title, file) VALUES (?, ?)";
    db.query(sql, [title, file], (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Error creating consolidated update");
        }
        res.send({ message: "Consolidated update created successfully" });
    });
});

router.put("/consolidated-updates/:id", upload.single("file"), (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    const newFile = req.file ? req.file.path : null;

    const sqlGetOld = "SELECT file FROM consolidated_updates WHERE id = ?";
    db.query(sqlGetOld, [id], (err, results) => {
        if (err || results.length === 0) {
            console.error(err);
            return res.status(404).send("Consolidated update not found");
        }

        const oldFile = results[0].file;
        const sqlUpdate = newFile
            ? "UPDATE consolidated_updates SET title = ?, file = ? WHERE id = ?"
            : "UPDATE consolidated_updates SET title = ? WHERE id = ?";

        const params = newFile ? [title, newFile, id] : [title, id];

        db.query(sqlUpdate, params, (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send("Error updating consolidated update");
            }

            if (newFile && oldFile) {
                fs.unlink(path.join(__dirname, "../", oldFile), (err) => {
                    if (err) console.error("Error deleting old file:", err);
                });
            }

            res.send({ message: "Consolidated update updated successfully" });
        });
    });
});

router.delete("/consolidated-updates/:id", (req, res) => {
    const { id } = req.params;

    const sqlGetOld = "SELECT file FROM consolidated_updates WHERE id = ?";
    db.query(sqlGetOld, [id], (err, results) => {
        if (err || results.length === 0) {
            console.error(err);
            return res.status(404).send("Consolidated update not found");
        }

        const oldFile = results[0].file;

        const sqlDelete = "DELETE FROM consolidated_updates WHERE id = ?";
        db.query(sqlDelete, [id], (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send("Error deleting consolidated update");
            }

            fs.unlink(path.join(__dirname, "../", oldFile), (err) => {
                if (err) console.error("Error deleting file:", err);
            });

            res.send({ message: "Consolidated update deleted successfully" });
        });
    });
});

router.get("/procurement", (req, res) => {
    db.query("SELECT * FROM procurement", (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Error fetching procurement plans");
        }
        res.json(results);
    });
});

router.post("/procurement", upload.single("file"), (req, res) => {
    const { title } = req.body;
    const file = req.file ? req.file.path : null;

    if (!title || !file) {
        return res.status(400).send("Title and file are required");
    }

    const sql = "INSERT INTO procurement (title, file) VALUES (?, ?)";
    db.query(sql, [title, file], (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Error creating procurement plan");
        }
        res.send({ message: "Procurement plan created successfully" });
    });
});

router.put("/procurement/:id", upload.single("file"), (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    const newFile = req.file ? req.file.path : null;

    const sqlGetOld = "SELECT file FROM procurement WHERE id = ?";
    db.query(sqlGetOld, [id], (err, results) => {
        if (err || results.length === 0) {
            console.error(err);
            return res.status(404).send("Procurement plan not found");
        }

        const oldFile = results[0].file;
        const sqlUpdate = newFile
            ? "UPDATE procurement SET title = ?, file = ? WHERE id = ?"
            : "UPDATE procurement SET title = ? WHERE id = ?";

        const params = newFile ? [title, newFile, id] : [title, id];

        db.query(sqlUpdate, params, (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send("Error updating procurement plan");
            }

            if (newFile && oldFile) {
                fs.unlink(path.join(__dirname, "../", oldFile), (err) => {
                    if (err) console.error("Error deleting old file:", err);
                });
            }

            res.send({ message: "Procurement plan updated successfully" });
        });
    });
});

router.delete("/procurement/:id", (req, res) => {
    const { id } = req.params;

    const sqlGetOld = "SELECT file FROM procurement WHERE id = ?";
    db.query(sqlGetOld, [id], (err, results) => {
        if (err || results.length === 0) {
            console.error(err);
            return res.status(404).send("Procurement plan not found");
        }

        const oldFile = results[0].file;

        const sqlDelete = "DELETE FROM procurement WHERE id = ?";
        db.query(sqlDelete, [id], (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send("Error deleting procurement plan");
            }

            fs.unlink(path.join(__dirname, "../", oldFile), (err) => {
                if (err) console.error("Error deleting file:", err);
            });

            res.send({ message: "Procurement plan deleted successfully" });
        });
    });
});

router.get("/project-monitoring", (req, res) => {
    db.query("SELECT * FROM project", (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Error fetching projects");
        }
        res.json(results);
    });
});

router.post("/project-monitoring", upload.single("file"), (req, res) => {
    const { title } = req.body;
    const file = req.file ? req.file.path : null;

    if (!title || !file) {
        return res.status(400).send("Title and file are required");
    }

    const sql = "INSERT INTO project (title, file) VALUES (?, ?)";
    db.query(sql, [title, file], (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Error creating project");
        }
        res.send({ message: "Project created successfully" });
    });
});

router.put("/project-monitoring/:id", upload.single("file"), (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    const newFile = req.file ? req.file.path : null;

    const sqlGetOld = "SELECT file FROM project WHERE id = ?";
    db.query(sqlGetOld, [id], (err, results) => {
        if (err || results.length === 0) {
            console.error(err);
            return res.status(404).send("Project not found");
        }

        const oldFile = results[0].file;
        const sqlUpdate = newFile
            ? "UPDATE project SET title = ?, file = ? WHERE id = ?"
            : "UPDATE project SET title = ? WHERE id = ?";

        const params = newFile ? [title, newFile, id] : [title, id];

        db.query(sqlUpdate, params, (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send("Error updating project");
            }

            if (newFile && oldFile) {
                fs.unlink(path.join(__dirname, "../", oldFile), (err) => {
                    if (err) console.error("Error deleting old file:", err);
                });
            }

            res.send({ message: "Project updated successfully" });
        });
    });
});

router.delete("/project-monitoring/:id", (req, res) => {
    const { id } = req.params;

    const sqlGetOld = "SELECT file FROM project WHERE id = ?";
    db.query(sqlGetOld, [id], (err, results) => {
        if (err || results.length === 0) {
            console.error(err);
            return res.status(404).send("Project not found");
        }

        const oldFile = results[0].file;

        const sqlDelete = "DELETE FROM project WHERE id = ?";
        db.query(sqlDelete, [id], (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send("Error deleting project");
            }

            fs.unlink(path.join(__dirname, "../", oldFile), (err) => {
                if (err) console.error("Error deleting file:", err);
            });

            res.send({ message: "Project deleted successfully" });
        });
    });
});

router.get("/competitive-bidding", (req, res) => {
    const sql = "SELECT * FROM competitive_bidding";
    db.query(sql, (err, results) => {
        if (err) {
            return sendError(res, "Error fetching bids");
        }
        res.json(results);
    });
});

router.post("/competitive-bidding", (req, res) => {
    const { title, budget, date } = req.body;

    if (!title || !budget || !date) {
        return res.status(400).send("Title, budget, and date are required");
    }

    const sql = "INSERT INTO competitive_bidding (title, budget, date) VALUES (?, ?, ?)";
    db.query(sql, [title, parseFloat(budget), date], (err) => {
        if (err) {
            return sendError(res, "Error creating bid");
        }
        res.send({ message: "Bid created successfully" });
    });
});

router.put("/competitive-bidding/:id", (req, res) => {
    const { id } = req.params;
    const { title, budget, date } = req.body;

    if (!title || !budget || !date) {
        return res.status(400).send("Title, budget, and date are required");
    }

    const sql = "UPDATE competitive_bidding SET title = ?, budget = ?, date = ? WHERE id = ?";
    db.query(sql, [title, parseFloat(budget), date, id], (err) => {
        if (err) {
            return sendError(res, "Error updating bid");
        }
        res.send({ message: "Bid updated successfully" });
    });
});

router.delete("/competitive-bidding/:id", (req, res) => {
    const { id } = req.params;

    const sqlDelete = "DELETE FROM competitive_bidding WHERE id = ?";
    db.query(sqlDelete, [id], (err, results) => {
        if (err) {
            return sendError(res, "Error deleting bid");
        }
        if (results.affectedRows === 0) {
            return res.status(404).send("Bid not found");
        }
        res.send({ message: "Bid deleted successfully" });
    });
});

module.exports = router;
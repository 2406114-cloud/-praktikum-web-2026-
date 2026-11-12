
// ==========================================
// FILE: server.js
// Backend Node.js Express & MySQL
// Modul 7 - Praktikum Pemrograman Web
// ==========================================

// 1. Import Library
const express = require('express');
const mysql = require('mysql2');

const app = express();
const PORT = 3000;

// 2. Middleware
app.use(express.json());
app.use(express.static('public'));

// 3. Koneksi ke Database MySQL Laragon
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_kampus'
});

// Mengecek koneksi database
db.connect((err) => {
    if (err) {
        console.error('Koneksi database gagal:', err.message);
        return;
    }

    console.log('Terhubung ke database MySQL Laragon');
});

// ==========================================
// 4. READ: Mengambil seluruh data mahasiswa
// HTTP METHOD: GET
// ==========================================

app.get('/api/mahasiswa', (req, res) => {
    const sql = 'SELECT * FROM mahasiswa ORDER BY id DESC';

    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.json(results);
    });
});

// ==========================================
// 5. CREATE: Menambahkan mahasiswa baru
// HTTP METHOD: POST
// ==========================================

app.post('/api/mahasiswa', (req, res) => {
    const { nim, nama, jurusan, email } = req.body;

    const sql = `
        INSERT INTO mahasiswa (nim, nama, jurusan, email)
        VALUES (?, ?, ?, ?)
    `;

    db.query(sql, [nim, nama, jurusan, email], (err, result) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.json({
            success: true,
            message: 'Data mahasiswa berhasil disimpan!'
        });
    });
});

// ==========================================
// 6. UPDATE: Memperbarui data mahasiswa
// HTTP METHOD: PUT
// ==========================================

app.put('/api/mahasiswa/:id', (req, res) => {
    const { id } = req.params;
    const { nim, nama, jurusan, email } = req.body;

    const sql = `
        UPDATE mahasiswa
        SET nim = ?, nama = ?, jurusan = ?, email = ?
        WHERE id = ?
    `;

    db.query(sql, [nim, nama, jurusan, email, id], (err, result) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.json({
            success: true,
            message: 'Data mahasiswa berhasil diperbarui!'
        });
    });
});

// ==========================================
// 7. DELETE: Menghapus data mahasiswa
// HTTP METHOD: DELETE
// ==========================================

app.delete('/api/mahasiswa/:id', (req, res) => {
    const { id } = req.params;

    const sql = 'DELETE FROM mahasiswa WHERE id = ?';

    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.json({
            success: true,
            message: 'Data mahasiswa berhasil dihapus!'
        });
    });
});

// ==========================================
// 8. Menjalankan Server
// ==========================================

app.listen(PORT, () => {
    console.log(`Server CRUD aktif di http://localhost:${PORT}`);
});

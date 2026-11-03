const express = require('express');//Import express module menggunakan require
const app = express();//simpan object express ke dalam variabel app
const PORT = 3001;//“nomor pintu” server, sehingga alamatnya http://localhost:3000.

app.use(express.json());//middleware untuk parsing request body menjadi JSON
let mahasiswa = [];//initialisasi array mahasiswa dengan satu objek mahasiswa

app.get('/api/mahasiswa', (req, res) => {//route untuk mendapatkan semua data mahasiswa
  res.status(200).json(mahasiswa);
});

// [POST] Menambahkan Mahasiswa Baru
app.post('/api/mahasiswa', (req, res) => {//route untuk menambahkan mahasiswa baru
    //atau dalam kata lain app.post ini akan menangani request POST ke endpoint /api/mahasiswa
  const { nama, birthPlace, birthDate, activeAddress } = req.body;//objek berisi data yang dikirim client (hasil express.json()).
  //destructure req.body untuk mendapatkan nama, birthPlace, birthDate, dan activeAddress dari request body
  if (!nama && !birthPlace && !birthDate && !activeAddress) {
    return res.status(400).json({ message: "Data tidak lengkap" });
  }
  const newMahasiswa = { id: mahasiswa.length + 1, nama, birthPlace, birthDate, activeAddress };
  mahasiswa.push(newMahasiswa);
  res.status(201).json(newMahasiswa);
});

// [PUT] Memperbarui Data Mahasiswa
app.put('/api/mahasiswa/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { nama, birthPlace, birthDate, activeAddress } = req.body;
  const mahasiswaIndex = mahasiswa.findIndex(m => m.id === id);
  
  if (mahasiswaIndex === -1) {
    return res.status(404).json({ message: "HTTP Status Code 404 Not Found." });
  }
  
  mahasiswa[mahasiswaIndex] = { id, nama, birthPlace, birthDate, activeAddress };
  res.status(200).json(mahasiswa[mahasiswaIndex]);
});

// [DELETE] Menghapus Mahasiswa
app.delete('/api/mahasiswa/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const mahasiswaIndex = mahasiswa.findIndex(m => m.id === id);
  
  if (mahasiswaIndex === -1) {
    return res.status(404).json({ message: "Mahasiswa tidak ditemukan" });
  }
  
  mahasiswa.splice(mahasiswaIndex, 1);
  res.status(200).json({ message: "Mahasewa berhasil dihapus" });
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});

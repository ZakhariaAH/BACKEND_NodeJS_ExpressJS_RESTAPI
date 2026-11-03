const express = require('express');//Import express module menggunakan require
const app = express();//simpan object express ke dalam variabel app
const PORT = 3000;//“nomor pintu” server, sehingga alamatnya http://localhost:3000.

app.use(express.json());//middleware untuk parsing request body menjadi JSON
let books = [ { id: 1, title: "Laskar Pelangi", author: "Andrea Hirata", year: 2005 } ];//initialisasi array books dengan satu objek buku

app.get('/api/books', (req, res) => {
  res.status(200).json(books);
});

// [POST] Menambahkan Buku Baru
app.post('/api/books', (req, res) => {//route untuk menambahkan buku baru
    //atau dalam kata lain app.post ini akan menangani request POST ke endpoint /api/books
  const { title, author, year } = req.body;//objek berisi data yang dikirim client (hasil express.json()).
  //destructure req.body untuk mendapatkan title, author, dan year dari request body
  if (!title || !author || !year) {
    return res.status(400).json({ message: "Data tidak lengkap" });
  }
  const newBook = { id: books.length + 1, title, author, year };
  books.push(newBook);
  res.status(201).json(newBook);
});

// [PUT] Memperbarui Data Buku
app.put('/api/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { title, author, year } = req.body;
  const bookIndex = books.findIndex(b => b.id === id);
  
  if (bookIndex === -1) {
    return res.status(404).json({ message: "Buku tidak ditemukan" });
  }
  
  books[bookIndex] = { id, title, author, year };
  res.status(200).json(books[bookIndex]);
});

// [DELETE] Menghapus Buku
app.delete('/api/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const bookIndex = books.findIndex(b => b.id === id);
  
  if (bookIndex === -1) {
    return res.status(404).json({ message: "Buku tidak ditemukan" });
  }
  
  books.splice(bookIndex, 1);
  res.status(200).json({ message: "Buku berhasil dihapus" });
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});

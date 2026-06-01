# PilahinAI
## Deskripsi Singkat Proyek

PilahinAI adalah sebuah aplikasi Klasifikasi Jenis Sampah Berbasis Gambar dengan Fitur Edukasi Pengolahan Limbah Ramah Lingkungan berbasis Artificial Intelligence.

Aplikasi ini menggunakan model Machine Learning untuk mendeteksi jenis sampah seperti:
- Plastik
- Kertas
- Logam
- Organik
- Kaca
- Residu
- B3
- Recyclable atau dapat di daur ulang
- Kardus

Selain melakukan klasifikasi gambar sampah, PilahinAI juga menyediakan fitur:
- History atau Riwayat hasil klasifikasi
- Feedback pengguna
- Informasi edukatif pengolahan limbah ramah lingkungan
- Beberapa artikel edukasi singkat

## Petunjuk Setup Environtment

### 1. Clone Repository
- Buat Folder kosong lalu beri nama **`PilahinAI`**, buka lewat VisualStudioCode.
- Lalu pada terminal di root utama ketik perintah **`git clone https://github.com/shintayl9/pilahinai.git .`**
- Perhatikan pada perintah, ada spasi lalu tanda titik di akhir, berfungsi agar hasil cloning masuk ke folder kosong yang sudah dibuat sebelumnya.
### 2. Install Dependency Root Project
- Setelah cloning berhasil, ketik perintah **`npm install`**
- Perintah tersebut akan menginstall semua dependency yang diperlukan untuk menjalankan aplikasi PilahinAI.
### 3. Install Dependency Back-End
- Buat new terminal di VSCode, lalu masuk ke folder back-end dengan mengetik perintah **`cd back-end`**
- Setelah berhasil masuk folder back-end, ketik perintah **`npm install`**
### 4. Install Dependency Front-End
- Buat new terminal di VSCode, lalu masuk ke folder front-end dengan mengetik perintah **`cd front-end`**
- Setelah berhasil masuk folder front-end, ketik perintah **`npm install`**
### 5. Membuat Folder Kosong Uploads
- Di dalam folder `back-end` klik kanan lalu New Folder, beri nama `uploads`
- Folder tersebut berfungsi untuk menyimpan gambar sementara pada saat loading, sebelum akhirnya tersimpan di database.
### 6. Membuat File Environtment
- Di dalam folder `back-end` klik kanan lalu New File, beri nama `.env`
- Isi file tersebut mengikuti contoh isi `.env.example` yang tersedia dan sesuaikan konfigurasi database dengan perangkat masing-masing.
### 7. Setup Database
- Pastikan di laptop sudah terinstall `PostgreSQL`, karena databasenya menggunakan `PostgreSQL`. Jika belum, maka install terlebih dahulu.
- Setelah berhasil install, cari di search windows bernama `pgAdmin 4`, setelah itu create database bernama `pilahinAI`.
- Lalu masuk ke terminal database yang sudah dibuat tersebut, buat tabel histories dengan mengetikkan perintah berikut:
    ```sql
    CREATE TABLE histories (
        id SERIAL PRIMARY KEY,
        session_id VARCHAR(255) NOT NULL,
        image VARCHAR(255),
        category VARCHAR(100),
        confidence VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        image_preview TEXT
    );

- Buat kembali tabel untuk feedback dengan mengetikkan perintah berikut:
    ```sql
    CREATE TABLE feedbacks (
        id SERIAL PRIMARY KEY,
        feedback TEXT,
        rating VARCHAR(20),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        history_id INTEGER,

        CONSTRAINT fk_feedback_history
        FOREIGN KEY (history_id)
        REFERENCES histories(id)
        ON DELETE CASCADE
    );

- Pastikan kedua tabel telah berhasil dibuat, cek dengan mengetikkan perintah berikut:
    ```sql
    SELECT table_name
    FROM information_schema.tables
    WHERE table_schema = 'public';

- Output yang diharapkan:
    ```
    table_name
    ------------
    histories
    feedbacks
    (2 rows)

- Cek struktur tabel, apakah sudah sesuai dengan yang diharapkan. Cek dengan perintah berikut:
    ```sql
    SELECT column_name, data_type
    FROM information_schema.columns
    WHERE table_name = 'histories';

- Lalu untuk cek tabel feedbacks:
    ```sql
    SELECT column_name, data_type
    FROM information_schema.columns
    WHERE table_name = 'feedbacks';

### 8. Setup Repository Machine Learning
- Setelah berhasil setup database, langkah selanjutnya adalah setup repository machine learning.
- Pastikan di perangkat masing-masing telah terinstall `Python` terlebih dahulu.
- Buat Folder kosong kembali di windows lalu beri nama `PilahinAI-AI` atau sesuai keinginan, klik New Window di VSCode lalu buka folder kosong yang baru dibuat.
- Cloning repository Machine Learning dengan perintah:
    ```bash
    git clone https://github.com/anakayam45/backend-pilahin-AI.git .
- Perhatikan pada perintah, ada spasi lalu tanda titik di akhir, berfungsi agar hasil cloning masuk ke folder kosong yang sudah dibuat.
- Install dependency yang dibutuhkan dengan perintah berikut:
    ```bash
    pip install -r requirements.txt
- Setelah berhasil, ketik perintah berikut:
    ```bash
    pip install flask-cors

## Cara Menjalankan Aplikasi
### 1. Menjalankan Back-End
- Masuk ke folder back-end sebelumnya yang `cd back-end`, lalu jalankan server dengan mengetik perintah berikut:
    ```bash
    npm run dev
- Pastikan Back-End berjalan pada `http://localhost:5000` dan `PostgreSQL connected`
### 2. Menjalankan Front-End
- Masuk ke folder front-end sebelumnya yang `cd front-end`, lalu jalankan server dengan mengetik perintah berikut:
    ```bash
    npm run dev
- Pastikan Front-End berjalan pada `http://localhost:5173/` dan copy link tersebut di browser untuk melihat web yang sudah dibuat.
### 3. Menjalankan Machine Learning
- Masuk ke folder Machine Learning sebelumnya yang `PilahinAI-AI`, lalu jalankan server dengan mengetik perintah berikut:
    ```bash
    python app.py
- Pastikan server berjalan di port 5001 dan bertuliskan `===== Model loaded successfully =====`, yang artinya server berhasil dijalankan.
### 🚀 Aplikasi siap dijalankan di `http://localhost:5173/` yang sudah dibuka di browser tadi yaa!.
### Lalu coba upload foto sampah yang ada di sekitar, kira-kira masuk sampah jenis apa ya?🤔

---
## Tautan Model Machine Learning (ML) `Link Google Drive`
- [Model Machine Learning](https://drive.google.com/drive/folders/1HnERhKYk4vyeFMq_yKjiq--DyF_Afpqv)
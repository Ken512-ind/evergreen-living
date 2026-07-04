Evergreen Living

Evergreen Living adalah aplikasi web yang menyediakan informasi tanaman
hias indoor dan tanaman herbal. Pengguna dapat melihat daftar tanaman,
detail tanaman, serta melakukan autentikasi. Admin memiliki akses untuk
mengelola data tanaman melalui dashboard.

Fitur

Pengguna

-   Melihat daftar tanaman indoor.
-   Melihat daftar tanaman herbal.
-   Melihat detail tanaman.
-   Login dan Register.
-   Responsive pada desktop dan mobile.

Admin

-   Login Admin.
-   Dashboard Admin.
-   Menambah tanaman.
-   Mengubah data tanaman.
-   Menghapus tanaman.
-   Upload gambar tanaman.

Teknologi

Frontend

-   React
-   Vite
-   React Router
-   Axios
-   Framer Motion

Backend

-   Node.js
-   Express.js
-   Sequelize
-   MySQL
-   JWT Authentication
-   Multer

Deployment

-   Ubuntu VPS
-   Nginx
-   PM2
-   Let’s Encrypt SSL

Struktur Project

    client/
    server/

Instalasi

Clone Repository

    git clone https://github.com/Ken512-ind/evergreen-living.git

Frontend

    cd client
    npm install
    npm run dev

Backend

    cd server
    npm install
    npm start

Environment

Frontend

    VITE_API_URL=https://evergreen-livingid.cloud

Backend

    DB_HOST=
    DB_USER=
    DB_PASSWORD=
    DB_NAME=
    JWT_SECRET=
    PORT=5000

Deployment

-   Ubuntu VPS
-   PM2 sebagai Process Manager
-   Nginx sebagai Reverse Proxy
-   HTTPS menggunakan Let’s Encrypt
-   Domain custom

Website

https://evergreen-livingid.cloud

Repository

https://github.com/Ken512-ind/evergreen-living

Tim Pengembang

Kelompok 2

-   Hafidz Nurhasan

Lisensi

Project ini dibuat untuk memenuhi tugas mata kuliah Pemrograman Web &
Praktikum Universitas Muhammadiyah Kuningan.

# 🚀 Laravel 12 + React 19 + Inertia + Reverb Dashboard

![Laravel](https://img.shields.io/badge/Laravel-12.x-red)
![React](https://img.shields.io/badge/React-19-blue)
![Inertia.js](https://img.shields.io/badge/Inertia-2.x-purple)
![TypeScript](https://img.shields.io/badge/TypeScript-Enabled-3178c6?logo=typescript)
![WebSocket Ready](https://img.shields.io/badge/WebSocket-Ready-brightgreen)
![Role Based Access](https://img.shields.io/badge/Role--Permission-Custom-orange)
![License](https://img.shields.io/badge/license-MIT-green)

---

## 🇮🇩 Tentang Proyek

Ini adalah proyek starter kit yang dirancang untuk mempermudah pengembangan aplikasi dengan menyediakan kerangka kerja yang siap digunakan. Berbasis **Laravel 12**, **React 19**, dan **Inertia.js**, yang dilengkapi dengan:

### ✨ Fitur

- 🔒 **Autentikasi bawaan Laravel**
- 🤵 **Manajemen Users**
- 🧠 **Manajemen role dan permission**
- 📈 **Dashboard real-time** dengan **Laravel Reverb + Echo**
- 🖼️ **UI modern** menggunakan **Shadcn/UI**
- 📢 **Toast notification** interaktif
- ⚙️ **Dukungan TypeScript + Vite**

- **Database**:
    - [MySQL](https://www.mysql.com/) atau [PostgreSQL](https://www.postgresql.org/)

---

## ⚙️ Cara Instalasi

### 1. Clone Proyek

```bash
git clone https://github.com/suterlan/laravel-react-starter.git
cd nama-proyek
```

### 2. Setup Laravel Backend

```bash
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed

#install reverb
php artisan reverb:install
```

### 3. Setup Frontend (React)

```bash
npm install
```

### 4. Jalankan Aplikasi

```bash
# Jalankan Laravel
php artisan serve

# Jalankan Vite (React + Inertia)
npm run dev

# Jalankan Queue
php artisan queue:work

# Jalankan WebSocket server (Laravel Reverb)
php artisan reverb:start
```

---

## 🔑 Login

Gunakan akun yang sudah di-_seed_ atau daftarkan akun baru. Role akan menentukan tampilan dan akses dashboard.

---

## 🔐 Role Based Access

This app uses a **custom role and permission system**. Role access is defined in route groups and via middleware for frontend route handling.

---

## 📄 License

This project is open-source and available under the **MIT License**.

---

## 🙌 Kontribusi

Pull request dan masukan sangat diterima!

---

> Made with ❤️ using Laravel, React, Inertia & Reverb.

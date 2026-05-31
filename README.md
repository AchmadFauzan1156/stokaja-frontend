<div align="center">

# 🛒 StokAja! — Frontend

**Aplikasi mobile-first POS & inventaris untuk pelanggan StokAja!**

Dibangun dengan Next.js 16, React 19, dan Tailwind CSS 4. Terintegrasi penuh dengan backend API StokAja melalui REST API dan Socket.io untuk fitur chat real-time.

[![Next.js](https://img.shields.io/badge/Next.js-16.2.6-000000?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19.2.4-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![Socket.io](https://img.shields.io/badge/Socket.io_Client-4.8.3-010101?style=flat-square&logo=socket.io&logoColor=white)](https://socket.io)

</div>

---

## Daftar Isi

- [Fitur](#fitur)
- [Tech Stack](#tech-stack)
- [Arsitektur & Struktur Proyek](#arsitektur--struktur-proyek)
- [Prasyarat](#prasyarat)
- [Instalasi & Menjalankan Lokal](#instalasi--menjalankan-lokal)
- [Environment Variables](#environment-variables)
- [Halaman & Routing](#halaman--routing)
- [Integrasi Backend](#integrasi-backend)
- [Deployment](#deployment)

---

## Fitur

### 🔐 Autentikasi
- Login & Register dengan validasi form
- Auto-refresh token (access token expired → otomatis gunakan refresh token)
- Logout dengan disconnect Socket.io
- Reset password via email

### 🏠 Beranda & Katalog
- Daftar produk dari API dengan pencarian & filter kategori
- Kategori chip horizontal (scrollable) yang diambil langsung dari API
- Foto profil & nama user di header (reaktif — update langsung dari semua halaman)

### 🛒 Keranjang & Checkout
- Tambah produk ke keranjang dengan catatan
- Atur jumlah beli (tidak melebihi stok)
- Checklist/uncheck item, toggle semua
- Checkout ke backend (metode bayar dari API, alamat pengiriman)
- Halaman sukses checkout

### 📦 Riwayat Pesanan
- Tab "Riwayat" (selesai) & "Dalam Proses" (pending/diproses/dikirim)
- Detail pesanan lengkap (tanggal, status, produk, total)

### 👤 Profil
- Edit nama & **upload foto profil ke Cloudinary** (preview lokal → upload saat simpan)
- Ubah email & password (validasi password lama)
- Kelola multi-alamat (tambah, edit, hapus)
- Logout

### 💬 Live Chat
- Chat real-time dengan admin via Socket.io
- Riwayat pesan dari API (`GET /chat/history`)
- Pemisah tanggal otomatis
- Deteksi pengirim (user vs admin) berdasarkan ID

---

## Tech Stack

| Kategori | Teknologi |
|---|---|
| **Framework** | Next.js 16.2.6 (App Router, Turbopack) |
| **UI Library** | React 19.2.4 |
| **Styling** | Tailwind CSS 4 |
| **Fonts** | Google Fonts (Squada One, Signika) |
| **Real-time** | Socket.io Client 4.8.3 |
| **State Management** | React Context API (AuthContext, CartContext) |
| **HTTP Client** | Native Fetch API (dengan wrapper `apiFetch`) |
| **Image Optimization** | Next.js Image (Cloudinary remote patterns) |

---

## Arsitektur & Struktur Proyek

```
stokaja-frontend/
├── public/                     # Static assets
│   ├── Profile.jpg             # Default profile picture
│   ├── Logo.svg                # Logo aplikasi
│   ├── Packet.svg              # Ikon paket
│   └── *.svg                   # Icon navbar (Home, Cart, Chat, History)
├── src/
│   ├── app/                    # Next.js App Router (halaman)
│   │   ├── layout.js           # Root layout (providers: Auth, Cart, Toast)
│   │   ├── page.js             # Redirect → SplashScreen
│   │   ├── LoginPage/
│   │   ├── RegisterPage/
│   │   ├── ResetPassword/
│   │   ├── SplashScreen/
│   │   ├── home/               # Beranda (katalog produk)
│   │   ├── cart/               # Keranjang belanja
│   │   ├── checkout/           # Halaman checkout
│   │   ├── checkout-success/
│   │   ├── chat/               # Live chat
│   │   ├── history/            # Riwayat pesanan
│   │   ├── history-detail/     # Detail pesanan
│   │   ├── profile/            # Profil user
│   │   ├── profile-email/      # Ubah email
│   │   ├── profile-password/   # Ubah password
│   │   ├── profile-address/    # Daftar alamat
│   │   └── profile-address-edit/  # Tambah/edit alamat
│   ├── components/             # Komponen UI reusable
│   │   ├── Button.jsx
│   │   ├── CategoryChips.jsx   # Filter kategori (API-driven)
│   │   ├── ChatBubble.jsx
│   │   ├── ChatDate.jsx
│   │   ├── ChatHeader.jsx
│   │   ├── ChatInput.jsx
│   │   ├── ChatRoom.jsx        # Komponen utama chat
│   │   ├── Checkbox.jsx
│   │   ├── CheckoutCard.jsx
│   │   ├── HistoryCard.jsx     # Kartu riwayat (status + total)
│   │   ├── LoadingSpinner.jsx
│   │   ├── Navbar.jsx          # Bottom navigation
│   │   ├── ProductBuyCard.jsx
│   │   ├── ProductCard.jsx
│   │   ├── ProductDetail.jsx
│   │   ├── ProfilePicture.jsx  # Avatar circle component
│   │   ├── SearchBar.jsx
│   │   ├── TextBox.jsx
│   │   └── Toast.jsx           # Toast notification (Context)
│   ├── context/                # React Context providers
│   │   ├── AuthContext.jsx     # State: user, login, register, logout, refreshProfile
│   │   └── CartContext.jsx     # State: cartItems, addToCart, totalPrice, clearCart
│   └── lib/                    # Utility modules
│       ├── api.js              # HTTP client (auto token, refresh, FormData support)
│       ├── mappers.js          # Data translation layer (Backend ↔ Frontend)
│       └── socket.js           # Socket.io connection manager
├── next.config.mjs             # Konfigurasi Next.js (Cloudinary image domains)
├── .env.local                  # Environment variables (gitignored)
└── package.json
```

---

## Prasyarat

- **Node.js** versi 18+ — [Download](https://nodejs.org)
- **npm** versi 9+
- **Backend StokAja** yang sudah berjalan (lokal atau Railway)

---

## Instalasi & Menjalankan Lokal

**1. Clone repositori**

```bash
git clone "Repo"
cd stokaja-frontend
```

**2. Install dependencies**

```bash
npm install
```

**3. Buat file `.env.local`**

```bash
cp .env.local.example .env.local
```

Edit sesuai panduan di bagian [Environment Variables](#environment-variables).

**4. Jalankan development server**

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

---

## Environment Variables

Buat file `.env.local` di root proyek:

```env
# URL backend API (Railway production)
NEXT_PUBLIC_API_URL=https://stokaja-backend-production.up.railway.app/api/v1

# URL Socket.io (sama dengan backend, tanpa /api/v1)
NEXT_PUBLIC_SOCKET_URL=https://stokaja-backend-production.up.railway.app
```

**Untuk development lokal (jika menjalankan backend di komputer sendiri):**

```env
NEXT_PUBLIC_API_URL=http://localhost:5001/api/v1
NEXT_PUBLIC_SOCKET_URL=http://localhost:5001
```

| Variable | Deskripsi |
|---|---|
| `NEXT_PUBLIC_API_URL` | Base URL backend API (termasuk `/api/v1`) |
| `NEXT_PUBLIC_SOCKET_URL` | URL server Socket.io (tanpa path) |

> ⚠️ Setelah mengubah `.env.local`, Anda **harus restart** dev server (`Ctrl+C` → `npm run dev`) agar perubahan terbaca.

---

## Halaman & Routing

| Route | Halaman | Deskripsi |
|---|---|---|
| `/` | Splash Screen | Redirect otomatis ke `/home` atau `/LoginPage` |
| `/LoginPage` | Login | Form email & password |
| `/RegisterPage` | Register | Form registrasi akun baru |
| `/ResetPassword` | Reset Password | Kirim email reset password |
| `/home` | Beranda | Katalog produk, search, filter kategori |
| `/cart` | Keranjang | Daftar item, atur qty, checklist |
| `/checkout` | Checkout | Pilih metode bayar, alamat, konfirmasi |
| `/checkout-success` | Sukses | Konfirmasi pesanan berhasil |
| `/chat` | Live Chat | Chat real-time dengan admin |
| `/history` | Riwayat | Tab Riwayat & Dalam Proses |
| `/history-detail?id=` | Detail Pesanan | Tanggal, status, produk, total |
| `/profile` | Profil | Edit nama, foto, navigasi ke sub-halaman |
| `/profile-email` | Ubah Email | Form ganti email |
| `/profile-password` | Ubah Password | Form ganti password (validasi lama) |
| `/profile-address` | Alamat | Daftar alamat tersimpan |
| `/profile-address-edit?id=` | Edit Alamat | Tambah/edit/hapus alamat |

---

## Integrasi Backend

### Data Flow Architecture

```
Frontend (React)  →  lib/api.js  →  Backend API (Express)  →  MongoDB
                                                             →  Cloudinary
     ↕                                      ↕
lib/mappers.js                        lib/socket.js
(field translation)                 (real-time chat)
```

### API Client (`lib/api.js`)

Semua komunikasi HTTP ke backend menggunakan wrapper `apiFetch` yang menyediakan:

- **Auto-attach token** — Setiap request otomatis menambahkan `Authorization: Bearer <token>`
- **Auto-refresh** — Jika response 401, otomatis coba refresh token dan retry request
- **FormData support** — Jika body adalah `FormData`, `Content-Type` tidak di-set (browser set otomatis dengan boundary)
- **File download** — Response PDF/Excel otomatis dikembalikan sebagai blob

### Data Mapper (`lib/mappers.js`)

Karena backend menggunakan field Bahasa Indonesia dan frontend menggunakan Bahasa Inggris, file `mappers.js` bertindak sebagai **Single Source of Truth** untuk translasi:

| Fungsi | Deskripsi |
|---|---|
| `mapProduct()` / `mapProducts()` | `nama` → `name`, `harga` → `price`, `stok` → `stock`, dll |
| `mapCategory()` / `mapCategories()` | `nama` → `name`, `aktif` → `active` |
| `mapUser()` | `namaLengkap` → `fullName`, `alamat` → `addresses` |
| `mapTransaction()` / `mapTransactions()` | `statusPesanan` → `status`, `totalHarga` → `total` |
| `mapMessage()` / `mapMessages()` | `isiPesan` → `message`, `pengirim` → `sender` |
| `unmapCheckout()` | Frontend checkout → Backend `isiKeranjang` format |
| `unmapProfileUpdate()` | `fullName` → `namaLengkap`, `oldPassword` → `passwordLama` |

### Socket.io (`lib/socket.js`)

- Autentikasi via JWT token saat handshake
- Auto-reconnect (maks 5 percobaan)
- `getSocket()` — Singleton pattern, hanya 1 koneksi aktif
- `disconnectSocket()` — Dipanggil saat logout

---

## Deployment

### Vercel (Recommended)

```bash
npm run build   # Build production bundle
npm start       # Start production server
```

Atau deploy langsung via [Vercel](https://vercel.com):

1. Push kode ke GitHub
2. Import project di Vercel
3. Set Environment Variables (`NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_SOCKET_URL`)
4. Deploy otomatis

### Konfigurasi Penting

**`next.config.mjs`** sudah dikonfigurasi untuk mengizinkan gambar dari Cloudinary:

```js
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
  },
};
```

---


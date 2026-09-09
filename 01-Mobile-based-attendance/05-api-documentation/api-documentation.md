# Dokumentasi API Sistem Presensi

## 1. Pendahuluan
Dokumentasi ini menjelaskan spesifikasi API yang digunakan pada Sistem Presensi sebagai penghubung antara aplikasi mobile berbasis Flutter dengan backend PHP dan database MySQL.
API menyediakan layanan untuk proses registrasi pengguna, login, pengambilan jadwal, pencatatan presensi, pengajuan izin, pengambilan riwayat presensi, pengambilan riwayat izin, serta pembaruan profil pengguna.

### 1.2 Base URL

```text
http://<alamat-server>
```

Contoh struktur endpoint:

```text
http://<alamat-server>/PUI/aplikasipresensi/login.php
```

## 2. Ringkasan Endpoint

| No     | Endpoint                                  | Method | Deskripsi                           | 
| ------ | ----------------------------------------- | ------ | ----------------------------------- |
| API-01 | /PUI/aplikasipresensi/register.php      | POST   | Mendaftarkan pengguna baru          | 
| API-02 | /PUI/aplikasipresensi/login.php         | POST   | Melakukan login pengguna            |
| API-03 | /PUI/aplikasipresensi/get_jadwal.php    | GET    | Mengambil daftar jadwal kegiatan    | 
| API-04 | /PUI/aplikasipresensi/presensi.php      | POST   | Mencatat presensi pengguna          |
| API-05 | /PUI/aplikasipresensi/get_riwayat.php   | GET    | Mengambil riwayat presensi pengguna | 
| API-06 | /PUI/aplikasipresensi/izin.php          | POST   | Mengajukan izin ketidakhadiran      | 
| API-07 | /PUI/aplikasipresensi/get_izin.php      | GET    | Mengambil riwayat pengajuan izin    | 
| API-08 | /PUI/aplikasipresensi/update_profil.php | POST   | Memperbarui profil pengguna         | 

## 3. Detail Spesifikasi API
## 3.1 API Registrasi
### 3.1.1 Ringkasan Endpoint
| Endpoint                             | Method | Deskripsi                  | 
| ------------------------------------ | ------ | -------------------------- | 
| /PUI/aplikasipresensi/register.php | POST   | Mendaftarkan pengguna baru | 

### 3.1.2 Detail Spesifikasi
POST /PUI/aplikasipresensi/register.php

Endpoint ini digunakan untuk melakukan pendaftaran akun pengguna baru. Data pengguna akan divalidasi sebelum disimpan ke database.

### A. Headers
| Key          | Value                               | Wajib | Deskripsi                |
| ------------ | ----------------------------------- | ----- | ------------------------ |
| Content-Type | `application/x-www-form-urlencoded` | Ya    | Format data yang dikirim |

### B. Request Body
| Field      | Tipe Data | Wajib | Deskripsi         | Aturan Validasi                   |
| ---------- | --------- | ----- | ----------------- | --------------------------------- |
| nama     | String    | Ya    | Nama pengguna     | Tidak boleh kosong                |
| email    | String    | Ya    | Email pengguna    | Harus memiliki format email valid |
| password | String    | Ya    | Password pengguna | Tidak boleh kosong                |
| no_hp    | String    | Ya    | Nomor telepon     | Tidak boleh kosong                |
| alamat   | String    | Ya    | Alamat pengguna   | Tidak boleh kosong                |
### Contoh Request
```text
nama=Ahmad
email=ahmad@gmail.com
password=Password123
no_hp=08123456789
alamat=Yogyakarta
```

### C. Responses
**Sukses — HTTP 201 Created**

```json
{
  "status": "success",
  "message": "Registrasi berhasil!"
}
```

**Gagal — HTTP 400 Bad Request**

```json
{
  "status": "error",
  "message": "Semua field wajib diisi!"
}
```

**Gagal — HTTP 409 Conflict**

Terjadi apabila email sudah terdaftar.

```text
Email sudah terdaftar.
```

**Gagal — HTTP 500 Internal Server Error**
Terjadi apabila terdapat masalah koneksi atau proses database.

---

## 3.2 API Login
### 3.2.1 Ringkasan Endpoint

| Endpoint                          | Method | Deskripsi                      | 
| --------------------------------- | ------ | ------------------------------ | 
| /PUI/aplikasipresensi/login.php | POST   | Melakukan autentikasi pengguna | 

### 3.2.2 Detail Spesifikasi
POST /PUI/aplikasipresensi/login.php

Endpoint digunakan untuk memverifikasi email dan password pengguna.

### A. Headers

| Key          | Value                               |
| ------------ | ----------------------------------- |
| Content-Type | `application/x-www-form-urlencoded` | 

### B. Request Body

| Field      | Tipe Data | Wajib | Deskripsi         |
| ---------- | --------- | ----- | ----------------- |
| email    | String    | Ya    | Email pengguna    |
| password | String    | Ya    | Password pengguna |

### Contoh Request

```text
email=ahmad@gmail.com
password=Password123
```

### C. Responses
**Sukses — HTTP 200 OK**

```json
{
  "status": "success",
  "message": "Login berhasil",
  "user_id": 1,
  "nama": "Ahmad",
  "email": "ahmad@gmail.com",
  "no_hp": "08123456789",
  "alamat": "Yogyakarta"
}
```

**Gagal — HTTP 400 Bad Request**
Terjadi apabila email atau password tidak diisi.

**Gagal — HTTP 401 Unauthorized**
Terjadi apabila email tidak terdaftar atau password salah.

**Gagal — HTTP 405 Method Not Allowed**
Terjadi apabila request menggunakan method selain POST.

**Gagal — HTTP 500 Internal Server Error**
Terjadi apabila terdapat masalah koneksi atau proses database.

---

## 3.3 API Menampilkan Jadwal

### 3.3.1 Ringkasan Endpoint
| Endpoint                               | Method | Deskripsi                        | Otorisasi |
| -------------------------------------- | ------ | -------------------------------- | --------- |
| /PUI/aplikasipresensi/get_jadwal.php | GET    | Mengambil daftar jadwal kegiatan | Tidak     |

### 3.3.2 Detail Spesifikasi
GET /PUI/aplikasipresensi/get_jadwal.php 

Endpoint digunakan oleh aplikasi untuk mengambil data jadwal kegiatan.

### A. Query Parameter
| Parameter | Tipe Data | Wajib | Deskripsi                                    |
| --------- | --------- | ----- | -------------------------------------------- |
| `user_id` | Integer   | Ya    | ID pengguna untuk menentukan status presensi |

### Contoh Request

```text
GET /PUI/aplikasipresensi/get_jadwal.php?user_id=1
```

### B. Response
**Sukses**

```json
[
  {
    "jadwal_id": 1,
    "judul_kegiatan": "Pengajian Rutin",
    "deskripsi": "Pengajian rutin mingguan",
    "tanggal": "2026-09-10",
    "waktu_mulai": "18:30:00",
    "waktu_selesai": "20:00:00",
    "lokasi_kegiatan": "Masjid Mulyo Abadi",
    "latitude": -7.7304704,
    "longitude": 110.3628933,
    "created_at": "2026-09-01 10:00:00",
    "updated_at": "2026-09-01 10:00:00",
    "is_user_present": false
  }
]
```

Apabila tidak terdapat data:

```json
[]
```

### C. Catatan
Field `is_user_present` digunakan untuk menunjukkan apakah pengguna tersebut telah memiliki data presensi pada jadwal terkait.

Nilai:

```text
true  = sudah memiliki data presensi
false = belum memiliki data presensi
```

---

## 3.4 API Pencatatan Presensi
### 3.4.1 Ringkasan Endpoint

| Endpoint                             | Method | Deskripsi                       | Otorisasi |
| ------------------------------------ | ------ | ------------------------------- | --------- |
| /PUI/aplikasipresensi/presensi.php | POST   | Mencatat data presensi pengguna | Tidak     |

### 3.4.2 Detail Spesifikasi

POST /PUI/aplikasipresensi/presensi.php

Endpoint digunakan untuk menyimpan data presensi pengguna ke database.

### A. Headers

| Key          | Value              | Wajib |
| ------------ | ------------------ | ----- |
| Content-Type | `application/json` | Ya    |

### B. Request Body

| Field            | Tipe Data       | Wajib | Deskripsi                 |
| ---------------- | --------------- | ----- | ------------------------- |
| `user_id`        | Integer         | Ya    | ID pengguna               |
| `jadwal_id`      | Integer         | Ya    | ID jadwal                 |
| `waktu_presensi` | DateTime/String | Ya    | Waktu presensi            |
| `latitude`       | Float           | Ya    | Latitude lokasi pengguna  |
| `longitude`      | Float           | Ya    | Longitude lokasi pengguna |
| `status`         | String          | Ya    | Status presensi           |

Nilai `status` yang diperbolehkan:

```text
hadir
tidak hadir
```

### Contoh Request

```json
{
  "user_id": 1,
  "jadwal_id": 10,
  "waktu_presensi": "2026-09-10 18:45:00",
  "latitude": -7.7305000,
  "longitude": 110.3629000,
  "status": "hadir"
}
```

### C. Responses
**Sukses — HTTP 200 OK**

```json
{
  "success": true,
  "message": "Presensi berhasil dicatat."
}
```

**Gagal — HTTP 400 Bad Request**

Terjadi apabila:

* JSON tidak valid
* Field wajib tidak lengkap
* Status tidak sesuai dengan nilai yang diperbolehkan

**Gagal — HTTP 409 Conflict**

Terjadi apabila pengguna sudah memiliki presensi pada jadwal yang sama.

**Gagal — HTTP 405 Method Not Allowed**

Terjadi apabila request bukan menggunakan POST.

**Gagal — HTTP 500 Internal Server Error**

Terjadi apabila terdapat masalah pada proses database.

**Catatan:** Validasi lokasi/geofencing dan waktu presensi dilakukan pada sisi aplikasi Flutter. Endpoint PHP ini berfungsi untuk menerima dan menyimpan data presensi serta mencegah duplikasi presensi.

---

## 3.5 API Riwayat Presensi

### 3.5.1 Ringkasan Endpoint

| Endpoint                                | Method | Deskripsi                           | Otorisasi |
| --------------------------------------- | ------ | ----------------------------------- | --------- |
| /PUI/aplikasipresensi/get_riwayat.php | GET    | Mengambil riwayat presensi pengguna | Tidak     |

### 3.5.2 Detail Spesifikasi
GET /PUI/aplikasipresensi/get_riwayat.php

Endpoint digunakan untuk mengambil seluruh riwayat presensi berdasarkan `user_id`.

### A. Query Parameter

| Parameter | Tipe Data | Wajib | Deskripsi   |
| --------- | --------- | ----- | ----------- |
| `user_id` | Integer   | Ya    | ID pengguna |

### Contoh Request

```text
GET /PUI/aplikasipresensi/get_riwayat.php?user_id=1
```

### B. Response

```json
[
  {
    "presensi_id": 10,
    "user_id": 1,
    "jadwal_id": 5,
    "waktu_presensi": "2026-09-10 18:45:00",
    "status": "hadir",
    "judul_kegiatan": "Pengajian Rutin",
    "tanggal": "2026-09-10",
    "waktu_mulai": "18:30:00",
    "waktu_selesai": "20:00:00",
    "lokasi_kegiatan": "Masjid Mulyo Abadi"
  }
]
```

Apabila tidak terdapat data:

```json
[]
```

### C. Catatan

Endpoint juga melakukan pencatatan otomatis terhadap jadwal yang telah berakhir dan belum memiliki data presensi pengguna sebagai status:

```text
tidak hadir
```

---

## 3.6 API Pengajuan Izin
### 3.6.1 Ringkasan Endpoint

| Endpoint                         | Method | Deskripsi                      | 
| -------------------------------- | ------ | ------------------------------ | 
| /PUI/aplikasipresensi/izin.php | POST   | Mengajukan izin ketidakhadiran | 

### 3.6.2 Detail Spesifikasi

POST /PUI/aplikasipresensi/izin.php

Endpoint digunakan untuk mengirim pengajuan izin ketidakhadiran beserta bukti izin.

### A. Headers

| Key          | Value                 | Wajib |
| ------------ | --------------------- | ----- |
| Content-Type | `multipart/form-data` | Ya    |

### B. Request Body

| Field         | Tipe Data | Wajib | Deskripsi             |
| ------------- | --------- | ----- | --------------------- |
| user_id     | Integer   | Ya    | ID pengguna           |
| jadwal_id   | Integer   | Ya    | ID jadwal             |
| alasan_izin | String    | Ya    | Alasan pengajuan izin |
| bukti_izin  | File      | Ya    | File bukti izin       |

### Contoh Request

```text
user_id=1
jadwal_id=10
alasan_izin=Sakit
bukti_izin=bukti_sakit.jpg
```

### C. Responses

**Sukses**

```json
{
  "success": true,
  "message": "Izin berhasil diajukan",
  "bukti_izin": "uploads/bukti_izin/1725960000_bukti_sakit.jpg"
}
```

**Gagal**

```json
{
  "success": false,
  "message": "Data tidak lengkap"
}
```

Kemungkinan pesan error lainnya:

```text
Metode tidak diizinkan
File bukti izin tidak ditemukan
Gagal mengunggah file
```

### D. Status Pengajuan

Pengajuan izin disimpan dengan status awal:

```text
menunggu
```

Status selanjutnya dapat menjadi:

```text
disetujui
ditolak
```

## 3.7 API Riwayat Izin
### 3.7.1 Ringkasan Endpoint

| Endpoint                             | Method | Deskripsi                        | 
| ------------------------------------ | ------ | -------------------------------- | 
| /PUI/aplikasipresensi/get_izin.php | GET    | Mengambil riwayat pengajuan izin | 

### 3.7.2 Detail Spesifikasi

GET /PUI/aplikasipresensi/get_izin.php

Endpoint digunakan untuk mengambil data pengajuan izin berdasarkan pengguna.

### A. Query Parameter

| Parameter | Tipe Data | Wajib | Deskripsi   |
| --------- | --------- | ----- | ----------- |
| user_id | Integer   | Ya    | ID pengguna |

### Contoh Request

```text
GET /PUI/aplikasipresensi/get_izin.php?user_id=1
```

### B. Response

```json
[
  {
    "presensi_id": 15,
    "user_id": 1,
    "jadwal_id": 10,
    "judul_kegiatan": "Pengajian Rutin",
    "tanggal": "10-09-2026",
    "waktu_mulai": "18:30:00",
    "waktu_selesai": "20:00:00",
    "lokasi_kegiatan": "Masjid Mulyo Abadi",
    "alasan_izin": "Sakit",
    "status_izin": "Menunggu",
    "status": "Izin",
    "waktu_presensi": "2026-09-10 17:00:00"
  }
]
```

Apabila tidak terdapat data:

```json
[]
```

### C. Status Izin

Status pengajuan yang dapat ditampilkan:

```text
Menunggu
Disetujui
Ditolak
```

---

## 3.8 API Update Profil
### 3.8.1 Ringkasan Endpoint

| Endpoint                                  | Method | Deskripsi                        | 
| ----------------------------------------- | ------ | -------------------------------- | 
| /PUI/aplikasipresensi/update_profil.php | POST   | Memperbarui data profil pengguna | 

### 3.8.2 Detail Spesifikasi
POST /PUI/aplikasipresensi/update_profil.php

Endpoint digunakan untuk memperbarui informasi profil pengguna.

### A. Headers

| Key          | Value                               | Wajib |
| ------------ | ----------------------------------- | ----- |
| Content-Type | `application/x-www-form-urlencoded` | Ya    |

### B. Request Body

| Field     | Tipe Data | Wajib | Deskripsi       |
| --------- | --------- | ----- | --------------- |
| user_id | Integer   | Ya    | ID pengguna     |
| nama    | String    | Ya    | Nama pengguna   |
| email   | String    | Ya    | Email pengguna  |
| no_hp   | String    | Tidak | Nomor telepon   |
| alamat  | String    | Tidak | Alamat pengguna |

### Contoh Request

```text
user_id=1
nama=Ahmad
email=ahmad@gmail.com
no_hp=08123456789
alamat=Yogyakarta
```

### C. Responses
**Sukses — HTTP 200 OK**

```json
{
  "status": "success",
  "message": "Profil berhasil diperbarui!"
}
```

Apabila tidak terdapat perubahan:

```json
{
  "status": "success",
  "message": "Profil diperbarui, tetapi tidak ada perubahan data."
}
```

**Gagal — HTTP 400 Bad Request**

Terjadi apabila `user_id`, `nama`, atau `email` tidak diisi.

**Gagal — HTTP 405 Method Not Allowed**

Terjadi apabila method bukan POST.

**Gagal — HTTP 500 Internal Server Error**

Terjadi apabila terdapat masalah database.

 **Catatan:** Meskipun field `email` diterima oleh endpoint, implementasi saat ini tidak mengubah nilai email pada query `UPDATE`. Data yang diperbarui adalah `nama`, `no_hp`, dan `alamat`.

---


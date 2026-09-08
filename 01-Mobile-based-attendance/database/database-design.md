# Database Design

## 2. Entity / Table Description

| Table       | Description                                                                                             |
| ----------- | ------------------------------------------------------------------------------------------------------- |
| users     | Menyimpan data akun yang digunakan untuk autentikasi admin pada sistem.                              |
| penggunas | Menyimpan informasi participant seperti nama, email, nomor handphone, dan alamat.                          |
| jadwals   | Menyimpan informasi kegiatan, termasuk jadwal dan lokasi kegiatan yang digunakan dalam proses presensi. |
| presensis | Menyimpan data presensi participant, termasuk waktu presensi, lokasi pengguna, dan status kehadiran.       |


## 2. Table Structure

### 2.1 users

Tabel `users` digunakan untuk menyimpan data akun pengguna yang berkaitan dengan proses autentikasi sistem.

| Field               | Data Type           | Key    | Description                                          |
| ------------------- | ------------------- | ------ | ---------------------------------------------------- |
| id                | bigint(20) unsigned | PK     | Identitas unik akun pengguna.                        |
| name              | varchar(255)        | -      | Nama pengguna.                                       |
| email             | varchar(255)        | Unique | Email yang digunakan untuk akun pengguna.            |
| email_verified_at | timestamp           | -      | Waktu ketika email pengguna berhasil diverifikasi.   |
| password          | varchar(255)        | -      | Password akun pengguna yang disimpan dalam database. |
| remember_token    | varchar(100)        | -      | Token untuk mempertahankan sesi login pengguna.      |
| created_at        | timestamp           | -      | Waktu data akun dibuat.                              |
| updated_at        | timestamp           | -      | Waktu terakhir data akun diperbarui.                 |


### 2.2 `penggunas`

Tabel `penggunas` digunakan untuk menyimpan informasi pengguna yang digunakan dalam sistem presensi.

| Field        | Data Type        | Key    | Description                              |
| ------------ | ---------------- | ------ | ---------------------------------------- |
| user_id    | int(10) unsigned | PK     | Identitas unik pengguna.                 |
| nama       | varchar(100)     | -      | Nama pengguna.                           |
| email      | varchar(100)     | Unique | Email pengguna.                          |
| password   | varchar(100)     | -      | Password pengguna.                       |
| no_hp      | varchar(20)      | -      | Nomor handphone pengguna.                |
| alamat    | text             | -      | Alamat pengguna.                         |
| created_at | timestamp        | -      | Waktu data pengguna dibuat.              |
| updated_at | timestamp        | -      | Waktu terakhir data pengguna diperbarui. |

---

### 2.3 jadwals

Tabel jadwals digunakan untuk menyimpan informasi kegiatan yang dapat diikuti oleh Participant.

| Field             | Data Type        | Key | Description                            |
| ----------------- | ---------------- | --- | -------------------------------------- |
| jadwal_id       | int(10) unsigned | PK  | Identitas unik jadwal kegiatan.        |
| judul_kegiatan  | varchar(100)     | -   | Judul atau nama kegiatan.              |
| deskripsi       | text             | -   | Deskripsi kegiatan.                    |
| tanggal         | date             | -   | Tanggal pelaksanaan kegiatan.          |
| waktu_mulai     | time             | -   | Waktu mulai kegiatan.                  |
| waktu_selesai   | time             | -   | Waktu selesai kegiatan.                |
| lokasi_kegiatan | varchar(100)     | -   | Nama atau informasi lokasi kegiatan.   |
| latitude        | decimal(10,6)    | -   | Koordinat latitude lokasi kegiatan.    |
| longitude       | decimal(10,6)    | -   | Koordinat longitude lokasi kegiatan.   |
| created_at      | timestamp        | -   | Waktu data jadwal dibuat.              |
| updated_at      | timestamp        | -   | Waktu terakhir data jadwal diperbarui. |


### 2.4 presensis

Tabel presensis digunakan untuk menyimpan data presensi Participant pada kegiatan tertentu.

| Field            | Data Type                                | Key | Description                                             |
| ---------------- | ---------------------------------------- | --- | ------------------------------------------------------- |
| presensi_id    | int(10) unsigned                         | PK  | Identitas unik data presensi.                           |
| user_id        | int(10) unsigned                         | FK  | Identitas pengguna yang melakukan presensi.             |
| jadwal_id      | int(10) unsigned                         | FK  | Identitas jadwal kegiatan yang terkait dengan presensi. |
| waktu_presensi | timestamp                                | -   | Waktu ketika presensi dilakukan.                        |
| latitude       | decimal(10,7)                            | -   | Koordinat latitude pengguna saat melakukan presensi.    |
| longitude      | decimal(10,7)                            | -   | Koordinat longitude pengguna saat melakukan presensi.   |
| status         | enum('hadir', 'izin', 'tidak hadir')     | -   | Status kehadiran pengguna.                              |
| status_izin    | enum('menunggu', 'disetujui', 'ditolak') | -   | Status pengajuan izin pengguna.                         |
| alasan_izin    | text                                     | -   | Alasan pengajuan izin.                                  |
| bukti_izin     | varchar(255)                             | -   | Lokasi atau nama file bukti izin.                       |
| created_at     | timestamp                                | -   | Waktu data presensi dibuat.                             |
| updated_at     | timestamp                                | -   | Waktu terakhir data presensi diperbarui.                |


## 4. Relationship

Hubungan antar tabel dalam database digunakan untuk menghubungkan data pengguna, jadwal kegiatan, dan presensi.

| Relationship              | Description                                                         |
| ------------------------- | ------------------------------------------------------------------- |
| `penggunas` → `presensis` | Data presensi terhubung dengan pengguna melalui `user_id`.          |
| `jadwals` → `presensis`   | Data presensi terhubung dengan jadwal kegiatan melalui `jadwal_id`. |


## 5. Data Flow in Database

Secara umum, alur data pada database dalam proses presensi adalah:

```text
Participant
     │
     ▼
Data Participant
(penggunas)
     │
     │ user_id
     ▼
Presensi
(presensis)
     ▲
     │ jadwal_id
     │
Data Jadwal
(jadwals)
```

Pada proses presensi, sistem menghubungkan identitas pengguna dengan jadwal kegiatan. Data lokasi pengguna saat presensi juga disimpan pada tabel presensis untuk mendukung proses validasi lokasi.

---




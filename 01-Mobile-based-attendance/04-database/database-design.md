# Database Design

## 1. Entity / Table Description

| Table       | Description                                                                                             |
| ----------- | ------------------------------------------------------------------------------------------------------- |
| users     | Menyimpan data akun yang digunakan untuk autentikasi admin pada sistem.                              |
| penggunas | Menyimpan informasi participant seperti nama, email, nomor handphone, dan alamat.                          |
| jadwals   | Menyimpan informasi kegiatan, termasuk jadwal dan lokasi kegiatan yang digunakan dalam proses presensi. |
| presensis | Menyimpan data presensi participant, termasuk waktu presensi, lokasi participant, dan status kehadiran.       |


## 2. Table Structure

### 2.1 users

Tabel `users` digunakan untuk menyimpan data akun admin yang berkaitan dengan proses autentikasi sistem.

| Field               | Data Type           | Key    | Description                                          |
| ------------------- | ------------------- | ------ | ---------------------------------------------------- |
| name              | varchar(255)        | -      | Nama admin.                                       |
| email             | varchar(255)        | PK | Email yang digunakan untuk akun admin.            |
| password          | varchar(255)        | -      | Password akun admin yang disimpan dalam database. |


### 2.2 `penggunas`

Tabel `penggunas` digunakan untuk menyimpan informasi participant yang digunakan dalam sistem presensi.

| Field        | Data Type        | Key    | Description                              |
| ------------ | ---------------- | ------ | ---------------------------------------- |
| user_id    | int(10) unsigned | PK     | Identitas unik participant.                 |
| nama       | varchar(100)     | -      | Nama participant.                           |
| email      | varchar(100)     | Unique | Email participant.                          |
| password   | varchar(100)     | -      | Password participant.                       |
| no_hp      | varchar(20)      | -      | Nomor handphone participant.                |
| alamat    | text             | -      | Alamat participant.                         |
| created_at | timestamp        | -      | Waktu data participant dibuat.              |
| updated_at | timestamp        | -      | Waktu terakhir data participant diperbarui. |

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
| user_id        | int(10) unsigned                         | FK  | Identitas participant yang melakukan presensi.             |
| jadwal_id      | int(10) unsigned                         | FK  | Identitas jadwal kegiatan yang terkait dengan presensi. |
| waktu_presensi | timestamp                                | -   | Waktu ketika presensi dilakukan.                        |
| latitude       | decimal(10,7)                            | -   | Koordinat latitude participant saat melakukan presensi.    |
| longitude      | decimal(10,7)                            | -   | Koordinat longitude participant saat melakukan presensi.   |
| status         | enum('hadir', 'izin', 'tidak hadir')     | -   | Status kehadiran participant.                              |
| status_izin    | enum('menunggu', 'disetujui', 'ditolak') | -   | Status pengajuan izin participant.                         |
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


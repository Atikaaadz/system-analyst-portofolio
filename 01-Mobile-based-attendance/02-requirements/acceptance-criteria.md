# Acceptance Criteria

## 1. Participant

### US-01 — Registration

| ID      | Given                                          | When                                                                    | Then                                                          |
| ------- | ---------------------------------------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------- |
| AC-01.1 | Participant belum memiliki akun                | Participant mengisi data registrasi yang valid dan mengirimkan formulir | Sistem membuat akun Participant                               |
| AC-01.2 | Data registrasi tidak valid atau tidak lengkap | Participant mengirimkan formulir                                        | Sistem menolak registrasi dan menampilkan informasi kesalahan |

### US-02 — Login

| ID      | Given                               | When                                         | Then                                                 |
| ------- | ----------------------------------- | -------------------------------------------- | ---------------------------------------------------- |
| AC-02.1 | Participant memiliki akun terdaftar | Participant memasukkan field yang benar | Sistem mengizinkan Participant masuk ke sistem       |
| AC-02.2 | Participant memiliki akun terdaftar | Participant memasukkan field yang salah | Sistem menolak login dan menampilkan pesan kesalahan |
| AC-02.3 | Participant tidak memiliki akun terdaftar | Participant memasukkan field | Sistem menolak login dan menampilkan pesan kesalahan |

### US-03 — Logout

| ID      | Given                    | When                       | Then                                                                |
| ------- | ------------------------ | -------------------------- | ------------------------------------------------------------------- |
| AC-03.1 | Participant sedang login | Participant memilih logout | Sistem mengakhiri sesi dan mengarahkan Participant ke halaman login |

### US-04 — Kelola Profil

| ID      | Given                                         | When                                                     | Then                                            |
| ------- | --------------------------------------------- | -------------------------------------------------------- | ----------------------------------------------- |
| AC-04.1 | Participant sedang login                      | Participant membuka halaman profil                       | Sistem menampilkan informasi profil Participant |
| AC-04.2 | Participant sedang berada pada halaman profil | Participant mengubah data profil dan menyimpan perubahan | Sistem memperbarui informasi profil             |

### US-05 — Lihat Jadwal

| ID      | Given                    | When                            | Then                                             |
| ------- | ------------------------ | ------------------------------- | ------------------------------------------------ |
| AC-05.1 | Participant sedang login | Participant membuka menu jadwal | Sistem menampilkan jadwal kegiatan yang tersedia |

### US-06 — Presensi

| ID      | Given                                                    | When                           | Then                                                                 |
| ------- | -------------------------------------------------------- | ------------------------------ | -------------------------------------------------------------------- |
| AC-06.1 | Participant memiliki jadwal kegiatan yang tersedia       | Participant melakukan presensi | Sistem memproses permintaan presensi                                 |
| AC-06.2 | Participant memenuhi ketentuan presensi dan lokasi valid | Participant melakukan presensi | Sistem mencatat kehadiran Participant                                |
| AC-06.3 | Participant berada di luar lokasi yang diperbolehkan     | Participant melakukan presensi | Sistem menolak presensi                                              |
| AC-06.4 | Lokasi perangkat tidak dapat diperoleh                   | Participant melakukan presensi | Sistem menolak proses presensi dan menampilkan informasi yang sesuai |

### US-07 — Riwayat kehadiran dan izin

| ID      | Given                    | When                                  | Then                                                  |
| ------- | ------------------------ | ------------------------------------- | ----------------------------------------------------- |
| AC-07.1 | Participant sedang login | Participant membuka riwayat kehadiran dan izin | Sistem menampilkan data riwayat kehadiran dan izin Participant |

### US-08 — Ajukan Izin

| ID      | Given                                                                      | When                                            | Then                                                       |
| ------- | -------------------------------------------------------------------------- | ----------------------------------------------- | ---------------------------------------------------------- |
| AC-08.1 | Participant sedang login dan memiliki kegiatan yang dapat diajukan izinnya | Participant mengisi dan mengirim pengajuan izin | Sistem menyimpan pengajuan izin                            |
| AC-08.2 | Data pengajuan izin tidak lengkap                                          | Participant mengirim pengajuan                  | Sistem meminta Participant melengkapi data yang diperlukan |

## 2. Admin

### US-09 — Login

| ID      | Given                                  | When                                   | Then                                                 |
| ------- | -------------------------------------- | -------------------------------------- | ---------------------------------------------------- |
| AC-09.1 | Admin memiliki akun terdaftar          | Admin memasukkan kredensial yang benar | Sistem mengizinkan Admin masuk ke sistem             |
| AC-09.2 | Admin memasukkan field yang salah | Admin mencoba login                    | Sistem menolak login dan menampilkan pesan kesalahan |

### US-10 — Logout

| ID      | Given              | When                 | Then                                                          |
| ------- | ------------------ | -------------------- | ------------------------------------------------------------- |
| AC-10.1 | Admin sedang login | Admin memilih logout | Sistem mengakhiri sesi dan mengarahkan Admin ke halaman login |


### US-11 — Kelola Jadwal

| ID      | Given                              | When                                     | Then                                |
| ------- | ---------------------------------- | ---------------------------------------- | ----------------------------------- |
| AC-12.1 | Admin sedang login                 | Admin menambahkan data jadwal yang valid sekaligus titik koordinat lokasi | Sistem menyimpan jadwal kegiatan    |
| AC-12.2 | Admin memilih jadwal yang tersedia | Admin mengubah data jadwal               | Sistem memperbarui jadwal           |
| AC-12.3 | Admin memilih jadwal yang tersedia | Admin menghapus jadwal                   | Sistem menghapus jadwal dari sistem |


### US-14 — Kelola Data Kehadiran

| ID      | Given                                      | When                                       | Then                                          |
| ------- | ------------------------------------------ | ------------------------------------------ | --------------------------------------------- |
| AC-14.1 | Admin sedang login                         | Admin membuka data kehadiran               | Sistem menampilkan data kehadiran Participant |
| AC-14.2 | Admin memilih data kehadiran yang tersedia | Admin melakukan perubahan sesuai hak akses | Sistem menyimpan perubahan data kehadiran     |

### US-15 — Laporan Kehadiran

| ID      | Given                                          | When                       | Then                                      |
| ------- | ---------------------------------------------- | -------------------------- | ----------------------------------------- |
| AC-15.1 | Admin sedang login dan data kehadiran tersedia | Admin membuka menu laporan | Sistem menampilkan rekapitulasi kehadiran |

### US-15 — Kelola Pengajuan izin

| ID      | Given                                          | When                       | Then                                      |
| ------- | ---------------------------------------------- | -------------------------- | ----------------------------------------- |
| AC-15.1 | Admin sedang login | Admin membuka menu kelola izin | Sistem menampilkan daftar participant yang mengajukan izin |
| AC-15.1 | Admin memilih daftar pengajuan izin | Admin melakukan perubahan sesuai hak akses | Sistem menyimpan perubahan data kehadiran |

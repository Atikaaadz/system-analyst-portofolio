# Test Scenario

## 1. Overview

Test Scenario digunakan untuk mendefinisikan skenario pengujian berdasarkan fungsi utama pada Location-Based Attendance Information System.

Pengujian mencakup fungsi Participant dan Admin, proses autentikasi, pengelolaan jadwal, presensi, validasi lokasi, pengajuan izin, serta pengelolaan dan pelaporan data kehadiran.

---

## 2. Test Scenario

| ID    | Feature               | Actor               | Test Scenario                                                                                  |
| ----- | --------------------- | ------------------- | ---------------------------------------------------------------------------------------------- |
| TS-01 | Registrasi          | Participant         | Memastikan Participant dapat membuat akun dengan data yang valid.                              |
| TS-02 | Registrasi          | Participant         | Memastikan sistem menolak registration dengan email yang sudah terdaftar.                      |
| TS-03 | Registrasi          | Participant         | Memastikan sistem melakukan validasi ketika data registration tidak lengkap.                   |
| TS-04 | Login                 | Admin & Participant | Memastikan pengguna dapat login menggunakan kredensial yang valid.                             |
| TS-05 | Login                 | Admin & Participant | Memastikan sistem menolak login dengan kredensial yang tidak valid.                            |
| TS-06 | Logout                | Admin & Participant | Memastikan pengguna dapat mengakhiri sesi melalui fungsi logout.                               |
| TS-07 | Kelola profil    | Admin & Participant | Memastikan pengguna dapat melihat informasi profile.                                           |
| TS-08 | Kelola profil    | Admin & Participant | Memastikan pengguna dapat memperbarui informasi profile.                                       |
| TS-09 | Lihat Jadwal         | Participant         | Memastikan Participant dapat melihat jadwal kegiatan yang tersedia.                            |
| TS-10 | Lihat Jadwal         | Participant         | Memastikan sistem memberikan informasi ketika jadwal belum tersedia.                           |
| TS-11 | Kelola Jadwal   | Admin               | Memastikan Admin dapat menambahkan jadwal kegiatan.                                            |
| TS-12 | Kelola Jadwal   | Admin               | Memastikan Admin dapat mengubah data jadwal kegiatan.                                          |
| TS-13 | Kelola Jadwal   | Admin               | Memastikan Admin dapat menghapus jadwal kegiatan.                                              |
| TS-14 | Kelola Jadwal   | Admin               | Memastikan sistem melakukan validasi terhadap data jadwal yang tidak lengkap atau tidak valid. |              |
| TS-15 | Presensi            | Participant         | Memastikan Participant dapat melakukan presensi dengan kondisi yang memenuhi ketentuan.        |
| TS-16 | Presensi            | Participant         | Memastikan sistem menolak presensi yang dilakukan di luar waktu yang ditentukan.               |
| TS-17 | Presensi            | Participant         | Memastikan sistem menolak QR Code yang tidak valid atau tidak sesuai.                          |
| TS-18 | Validasi Lokasi   | Participant         | Memastikan sistem menerima lokasi Participant yang berada dalam area presensi.                 |
| TS-19 | Validasi Lokasi   | Participant         | Memastikan sistem menolak lokasi Participant yang berada di luar area presensi.                |
| TS-20 | Validasi Lokasi   | Participant         | Memastikan sistem menangani kondisi ketika lokasi perangkat tidak tersedia.                    |
| TS-21 | Validasi Lokasi   | Participant         | Memastikan sistem menangani kegagalan memperoleh data lokasi.                                  |
| TS-22 | Riwayat Kehadiran dan izin  | Participant         | Memastikan Participant dapat melihat riwayat kehadiran serta pengajuan izin.                                        |
| TS-23 | Riwayat Kehadiran dan izin   | Participant         | Memastikan sistem memberikan informasi ketika belum terdapat riwayat kehadiran maupun pengajuan izin.                |
| TS-24 | Ajukan Izin    | Participant         | Memastikan Participant dapat mengajukan izin dengan data yang valid.                           |
| TS-25 | Ajukan Izin    | Participant         | Memastikan sistem melakukan validasi terhadap pengajuan izin yang tidak lengkap.               |
| TS-26 | Ajukan Izin    | Participant         | Memastikan Participant dapat mengirimkan bukti izin jika diperlukan.                           |
| TS-27 | Kelola Data Kehadiran | Admin               | Memastikan Admin dapat melihat data kehadiran Participant.                                     |
| TS-28 | Kelola Data Kehadiran | Admin               | Memastikan Admin dapat mengelola data kehadiran sesuai akses yang diberikan.                   |
| TS-29 | Kelola Data Kehadiran | Admin               | Memastikan sistem menangani kondisi ketika data kehadiran belum tersedia.                      |
| TS-30 | Laporan Kehadiran     | Admin               | Memastikan Admin dapat melihat rekapitulasi kehadiran.                                         |
| TS-31 | Laporan Kehadiran     | Admin               | Memastikan sistem menangani kondisi ketika data laporan belum tersedia.                        |                                  |
| TS-32 | Session               | Admin & Participant | Memastikan halaman yang membutuhkan autentikasi tidak dapat diakses setelah logout.            |

---

## 3. Test Coverage

Pengujian mencakup beberapa kategori utama:

| Category              | Scope                                                                           |
| --------------------- | ------------------------------------------------------------------------------- |
| Functional Testing    | Memastikan fungsi utama sistem berjalan sesuai kebutuhan.                       |
| Negative Testing      | Memastikan sistem dapat menangani input atau kondisi yang tidak valid.          |
| Validation Testing    | Memastikan sistem melakukan validasi terhadap data dan kondisi yang diperlukan. |
| Location Testing      | Memastikan proses validasi lokasi berjalan sesuai ketentuan presensi.           |
| Session Testing       | Memastikan pengelolaan sesi login dan logout berjalan dengan benar.             |
| Error Handling        | Memastikan sistem memberikan respons yang sesuai ketika terjadi kondisi error.  |

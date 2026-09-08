# Use Case Description


## UC-01 — Registrasi

| Item                 | Description                                                                                                                                                                                                                        |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Use Case         | Registrasi                                                                                                                                                                                                                       |
| Actor            | Participant                                                                                                                                                                                                                        |
| Goal             | Participant dapat membuat akun untuk menggunakan sistem.                                                                                                                                                                           |
| Precondition     | Participant belum memiliki akun dan berada pada halaman registration.                                                                                                                                                              |
| Main Flow        | 1. Participant membuka halaman registrasi.<br>2. Participant mengisi data yang diperlukan.<br>3. Participant mengirimkan data registration.<br>4. Sistem memvalidasi data yang diberikan.<br>5. Sistem membuat akun Participant. |
| Alternative Flow | Jika data tidak lengkap atau tidak valid, sistem menolak registration dan menampilkan informasi kesalahan.                                                                                                                         |
| Postcondition    | Akun Participant berhasil dibuat dan dapat digunakan untuk login.                                                                                                                                                                  |


## UC-02 — Login

| Item                 | Description                                                                                                                                                                                                                   |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Use Case         | Login                                                                                                                                                                                                                         |
| Actor            | Admin & Participant                                                                                                                                                                                                           |
| Goal             | Pengguna dapat masuk ke sistem menggunakan akun yang telah terdaftar.                                                                                                                                                         |
| Precondition     | Pengguna telah memiliki akun dan berada pada halaman login.                                                                                                                                                                   |
| Main Flow        | 1. Pengguna memasukkan email/username dan password.<br>2. Pengguna mengirimkan data login.<br>3. Sistem memvalidasi data login.<br>4. Sistem memverifikasi akun pengguna.<br>5. Sistem memberikan akses sesuai role pengguna. |
| Alternative Flow | Jika data login tidak sesuai, sistem menolak login dan menampilkan pesan kesalahan.                                                                                                                                           |
| Postcondition    | Pengguna berhasil masuk ke sistem dan diarahkan ke halaman sesuai role.                                                                                                                                                       |



## UC-03 — Logout

| Item                 | Description                                                                                                                   |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| Use Case         | Logout                                                                                                                        |
| Actor            | Admin & Participant                                                                                                           |
| Goal             | Pengguna dapat mengakhiri sesi penggunaan sistem.                                                                             |
| Precondition     | Pengguna telah login ke sistem.                                                                                               |
| Main Flow        | 1. Pengguna memilih fungsi logout.<br>2. Sistem mengakhiri sesi pengguna.<br>3. Sistem mengarahkan pengguna ke halaman login. |
| Alternative Flow | Jika proses logout mengalami kegagalan, sistem menampilkan informasi kesalahan.                                               |
| Postcondition    | Sesi pengguna telah berakhir dan pengguna tidak lagi berada dalam halaman yang membutuhkan autentikasi.                       |



## UC-04 — Kelola Profil

| Item                 | Description                                                                                                                                                                                                           |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Use Case         | Kelola Profil                                                                                                                                                                                                    |
| Actor            | Admin & Participant                                                                                                                                                                                                   |
| Goal             | Pengguna dapat melihat dan mengelola informasi profil.                                                                                                                                                                |
| Precondition     | Pengguna telah login ke sistem.                                                                                                                                                                                       |
| Main Flow        | 1. Pengguna membuka halaman profil.<br>2. Sistem menampilkan informasi profil pengguna.<br>3. Pengguna mengubah informasi yang diperlukan.<br>4. Pengguna menyimpan perubahan.<br>5. Sistem memperbarui data profil. |
| Alternative Flow | Jika data yang diperbarui tidak valid, sistem menolak perubahan dan menampilkan informasi kesalahan.                                                                                                                  |
| Postcondition    | Informasi profil pengguna tersimpan sesuai perubahan yang dilakukan.                                                                                                                                                  |



## UC-05 — Lihat Jadwal

| Item                 | Description                                                                                                                                                                                                      |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Use Case         | Lihat Jadwal                                                                                                                                                                                                    |
| Actor            | Participant                                                                                                                                                                                                      |
| Goal             | Participant dapat melihat jadwal kegiatan yang tersedia.                                                                                                                                                         |
| Precondition     | Participant telah login ke sistem dan jadwal kegiatan tersedia.                                                                                                                                                  |
| Main Flow        | 1. Participant membuka halaman jadwal.<br>2. Sistem mengambil data jadwal kegiatan.<br>3. Sistem menampilkan daftar jadwal kepada Participant.<br>4. Participant dapat melihat informasi kegiatan yang tersedia. |
| Alternative Flow | Jika belum terdapat jadwal kegiatan, sistem menampilkan informasi bahwa jadwal belum tersedia.                                                                                                                   |
| Postcondition    | Participant dapat mengetahui jadwal kegiatan yang tersedia.                                                                                                                                                      |



## UC-06 — Kelola Jadwal

| Item                 | Description                                                                                                                                                                                                                                         |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Use Case         | Kelola Jadwal                                                                                                                                                                                                                                |
| Actor            | Admin                                                                                                                                                                                                                                               |
| Goal             | Admin dapat mengelola jadwal kegiatan.                                                                                                                                                                                                              |
| Precondition     | Admin telah login dan memiliki akses ke fungsi pengelolaan jadwal.                                                                                                                                                                                  |
| Main Flow        | 1. Admin membuka halaman kelola jadwal.<br>2. Admin memilih fungsi tambah, ubah, atau hapus jadwal.<br>3. Admin memasukkan atau mengubah informasi jadwal.<br>4. Sistem memvalidasi data jadwal.<br>5. Sistem menyimpan perubahan data jadwal. |
| Alternative Flow | Jika data jadwal tidak lengkap atau tidak valid, sistem menolak perubahan dan menampilkan informasi kesalahan.                                                                                                                                      |
| Postcondition    | Data jadwal tersimpan sesuai perubahan yang dilakukan Admin.                                                                                                                                                                                        |                                                                                                                                                                      |



## UC-07 — Presensi

| Item                 | Description                                                                                                                                                                                                                                                  |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Use Case         | Presensi                                                                                                                                                                                                                                                   |
| Actor            | Participant                                                                                                                                                                                                                                                  |
| Goal             | Participant dapat melakukan presensi sehingga kehadirannya tercatat dalam sistem.                                                                                                                                                                            |
| Precondition     | Participant telah login dan terdapat kegiatan yang dapat digunakan untuk presensi.                                                                                                                                                                           |
| Main Flow        | 1. Participant memilih kegiatan yang akan diikuti.<br>2. Sistem menerima data presensi.<br>3. Sistem melakukan validasi yang diperlukan terutama lokasi.<br>6. Sistem menyimpan data kehadiran Participant. |
| Alternative Flow | Jika proses presensi tidak memenuhi ketentuan yang ditetapkan sistem, presensi ditolak dan sistem menampilkan informasi yang sesuai.                                                                                                                         |
| Postcondition    | Data kehadiran Participant berhasil tercatat dalam sistem.                                                                                                                                                                                                   |



## UC-08 — Riwayat Kehadiran

| Item                 | Description                                                                                                                                                         |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Use Case         | Riwayat Kehadiran                                                                                                                                                  |
| Actor            | Participant                                                                                                                                                         |
| Goal             | Participant dapat melihat riwayat kehadirannya.                                                                                                                     |
| Precondition     | Participant telah login dan memiliki data kehadiran atau riwayat yang tersedia.                                                                                     |
| Main Flow        | 1. Participant membuka halaman riwayat kehadiran.<br>2. Sistem mengambil data kehadiran Participant.<br>3. Sistem menampilkan riwayat kehadiran kepada Participant. |
| Alternative Flow | Jika belum terdapat data kehadiran, sistem menampilkan informasi bahwa riwayat kehadiran belum tersedia.                                                            |
| Postcondition    | Participant dapat melihat catatan kehadirannya.                                                                                                                     |



## UC-09 — Riwayat Izin

| Item                 | Description                                                                                                                                                         |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Use Case         | Riwayat Izin                                                                                                                                                  |
| Actor            | Participant                                                                                                                                                         |
| Goal             | Participant dapat melihat riwayat pengajuan izinnya.                                                                                                                     |
| Precondition     | Participant telah login dan memiliki data kehadiran atau riwayat yang tersedia.                                                                                     |
| Main Flow        | 1. Participant membuka halaman riwayat izin.<br>2. Sistem mengambil data kehadiran Participant.<br>3. Sistem menampilkan riwayat pengajuan izin kepada Participant. |
| Alternative Flow | Jika belum terdapat data pengajuan izin, sistem menampilkan informasi bahwa riwayat kehadiran belum tersedia.                                                            |
| Postcondition    | Participant dapat melihat catatan kehadirannya.



## UC-10 — Ajukan Izim

| Item                 | Description                                                                                                                                                                                                                                           |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Use Case**         | Ajukan Izin                                                                                                                                                                                                                                   |
| **Actor**            | Participant                                                                                                                                                                                                                                           |
| **Goal**             | Participant dapat mengajukan izin ketika tidak dapat menghadiri kegiatan.                                                                                                                                                                             |
| **Precondition**     | Participant telah login dan terdapat kegiatan yang dapat diajukan izin.                                                                                                                                                                               |
| **Main Flow**        | 1. Participant membuka fungsi pengajuan izin.<br>2. Participant memilih kegiatan.<br>3. Participant mengisi informasi izin yang diperlukan.<br>4. Participant mengirimkan pengajuan izin.<br>5. Sistem memvalidasi dan menyimpan data pengajuan izin. |
| **Alternative Flow** | Jika data pengajuan tidak lengkap atau tidak valid, sistem menolak pengajuan dan meminta Participant melengkapi data.                                                                                                                                 |
| **Postcondition**    | Data pengajuan izin tersimpan dalam sistem.                                                                                                                                                                                                           |



## UC-11 — Kelola Data Kehadiran

| Item                 | Description                                                                                                                                                                                                                                     |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Use Case         | Kelola Data Kehadiran                                                                                                                                                                                                                           |
| Actor            | Admin                                                                                                                                                                                                                                           |
| Goal             | Admin dapat melihat dan mengelola data kehadiran Participant.                                                                                                                                                                                   |
| Precondition     | Admin telah login dan memiliki akses ke data kehadiran.                                                                                                                                                                                         |
| Main Flow        | 1. Admin membuka halaman kelola data kehadiran.<br>2. Sistem menampilkan data kehadiran Participant.<br>3. Admin melihat atau melakukan pengelolaan terhadap data yang tersedia.<br>4. Sistem menyimpan perubahan jika terdapat perubahan data. |
| Alternative Flow | Jika data kehadiran belum tersedia, sistem menampilkan informasi bahwa data belum tersedia.                                                                                                                                                     |
| Postcondition    | Admin dapat memantau dan mengelola data kehadiran yang tersimpan dalam sistem.                                                                                                                                                                  |



## UC-12 — Laporan Kehadiran

| Item                 | Description                                                                                                                                                                                  |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Use Case         | Laporan Kehadiran                                                                                                                                                                            |
| Actor            | Admin                                                                                                                                                                                        |
| Goal             | Admin dapat melihat rekapitulasi data kehadiran Participant.                                                                                                                                 |
| Precondition     | Admin telah login dan data kehadiran tersedia.                                                                                                                                               |
| Main Flow        | 1. Admin membuka halaman laporan kehadiran.<br>2. Sistem mengambil data kehadiran.<br>3. Sistem mengolah data menjadi rekapitulasi.<br>4. Sistem menampilkan laporan kehadiran kepada Admin. |
| Alternative Flow | Jika data kehadiran belum tersedia, sistem menampilkan informasi bahwa laporan belum dapat ditampilkan.                                                                                      |
| Postcondition    | Admin dapat melihat informasi rekapitulasi kehadiran Participant.                                                                                                                            |



# Actor Summary

| Actor           | Main Responsibilities                                                                                                                                                                                 |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Participant | Melakukan registration, login, logout, mengelola profil, melihat jadwal, melakukan presensi sekaligus validasi lokasi, melihat riwayat kehadiran dan izin, dan mengajukan izin. |
| Admin       | Melakukan login, logout, mengelola jadwal, mengelola data kehadiran, mengelola pengajuan izin dan melihat laporan kehadiran.                                                           |


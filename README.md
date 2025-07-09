# Asisten-Email-Profesional

Asisten Email Profesional adalah aplikasi web yang membantu Anda mengubah draf email santai menjadi email profesional dengan bantuan kecerdasan buatan (AI). Aplikasi ini dirancang untuk berjalan sepenuhnya di browser Anda, menyediakan berbagai fitur untuk menyempurnakan komunikasi email Anda.

## Fitur Utama

*   **Transformasi Email Profesional**: Mengubah draf email informal menjadi versi yang lebih formal dan profesional, menjaga inti pesan tetap utuh.
*   **Template Berbasis Konteks**: Menyediakan berbagai template email siap pakai untuk skenario umum seperti follow-up wawancara, menolak tawaran kerja, meminta kenaikan gaji, mengundurkan diri, dan memperkenalkan diri ke kontak baru.
*   **Asisten Komunikasi Lintas Bahasa**: Mendukung terjemahan dan profesionalisasi email antara Bahasa Indonesia dan Bahasa Inggris, memungkinkan komunikasi yang lancar lintas bahasa.
*   **Penyesuaian Nada & Gaya (Simulasi)**: Menawarkan slider untuk menyesuaikan formalitas, gaya bahasa (diplomatis, langsung, persuasif), dan keringkasan (lengkap, sedang, singkat) dari email yang dihasilkan. Fitur ini disimulasikan untuk tujuan demonstrasi.
*   **Analisis & Umpan Balik Edukatif (Simulasi)**: Menganalisis draf email awal Anda dan menyoroti bagian-bagian yang dapat ditingkatkan, memberikan saran edukatif saat kursor diarahkan ke teks yang disorot. Fitur ini disimulasikan.
*   **Fungsionalitas Salin**: Tombol praktis untuk menyalin email profesional yang dihasilkan ke clipboard Anda dengan mudah.

## Teknologi yang Digunakan

*   **HTML**: Struktur dasar halaman web.
*   **Tailwind CSS**: Kerangka kerja CSS untuk desain antarmuka pengguna yang responsif dan modern.
*   **JavaScript**: Logika inti aplikasi, termasuk interaksi UI, pemrosesan input, dan panggilan API.
*   **Google Gemini API**: Digunakan untuk pemrosesan bahasa alami dan generasi teks (membutuhkan API Key yang valid).

## Cara Menggunakan

1.  **Buka Aplikasi**: Buka file `index.html` di browser web Anda.
2.  **Pilih Bahasa Input**: Pilih bahasa draf email Anda (Bahasa Indonesia atau English).
3.  **Pilih Template (Opsional)**: Anda dapat memilih salah satu template yang tersedia untuk memulai, atau langsung mengetik draf Anda.
4.  **Masukkan Draf Email**: Ketik atau tempel draf email Anda ke dalam area teks yang disediakan.
5.  **Pilih Bahasa Output**: Pilih bahasa yang Anda inginkan untuk email profesional yang dihasilkan.
6.  **Buat Email**: Klik tombol "Buat Email Profesional". Aplikasi akan memproses draf Anda dan menampilkan versi profesionalnya.
7.  **Sesuaikan (Opsional)**: Gunakan slider "Sesuaikan Nada & Gaya" untuk mengubah formalitas, gaya, dan keringkasan email yang dihasilkan.
8.  **Salin Email**: Klik tombol "Salin" untuk menyalin email profesional ke clipboard Anda.
9.  **Analisis Draf Awal (Opsional)**: Perhatikan bagian "Analisis Draf Awal Anda" untuk melihat saran perbaikan pada draf asli Anda.

## Instalasi dan Setup

Untuk menjalankan proyek ini secara lokal:

1.  **Klon Repositori**:
    ```bash
    git clone https://github.com/Drinkopi53/Asisten-Email-Profesional.git
    cd Asisten-Email-Profesional
    ```
2.  **Dapatkan Google Gemini API Key**:
    *   Kunjungi [Google AI Studio](https://aistudio.google.com/app/apikey) atau [Google Cloud Console](https://console.cloud.google.com/apis/credentials) untuk mendapatkan API Key.
    *   Pastikan API Key Anda memiliki akses ke model Gemini.
3.  **Konfigurasi API Key**:
    *   Buka file `script.js`.
    *   Temukan baris `const API_KEY = 'AIzaSyDet_RXvk9Xb1W67qxe0aoIr_iCst2qOt0';`
    *   Ganti placeholder `'AIzaSyDet_RXvk9Xb1W67qxe0aoIr_iCst2qOt0'` dengan API Key Google Gemini Anda yang sebenarnya.
    *   Pastikan `const SIMULATE_API = false;` jika Anda ingin menggunakan API Gemini asli.
4.  **Buka di Browser**: Buka file `index.html` di browser web pilihan Anda.

## Kontribusi

Kontribusi sangat dihargai! Jika Anda memiliki ide untuk fitur baru, perbaikan bug, atau peningkatan, jangan ragu untuk membuka *issue* atau mengirimkan *pull request*.

## Lisensi

Proyek ini dilisensikan di bawah [Nama Lisensi, misal: MIT License]. Lihat file `LICENSE` untuk detail lebih lanjut.

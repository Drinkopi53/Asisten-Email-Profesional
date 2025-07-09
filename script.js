document.addEventListener('DOMContentLoaded', () => {
    const userInput = document.getElementById('userInput');
    const generateButton = document.getElementById('generateButton');
    const buttonText = document.getElementById('buttonText');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const professionalEmail = document.getElementById('professionalEmail');
    const copyButton = document.getElementById('copyButton');
    const errorMessages = document.getElementById('errorMessages');

    // --- Konfigurasi API (PENTING: Ganti dengan API Key Anda) ---
    // const API_KEY = 'MASUKKAN_API_KEY_GEMINI_ANDA_DI_SINI';
    // const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`;

    // --- Mode Simulasi API (untuk pengembangan tanpa API Key asli) ---
    const SIMULATE_API = true; // Set ke false jika menggunakan API Key asli
    const SIMULATION_DELAY = 1500; // milidetik

    generateButton.addEventListener('click', async () => {
        const inputText = userInput.value.trim();
        if (!inputText) {
            displayError("Silakan masukkan draf email Anda terlebih dahulu.");
            return;
        }

        clearError();
        showLoadingState(true);
        professionalEmail.value = ""; // Kosongkan hasil sebelumnya

        try {
            let generatedText = "";
            if (SIMULATE_API) {
                generatedText = await simulateGeminiApiCall(inputText);
            } else {
                // Kode untuk panggilan API Gemini asli (membutuhkan API_KEY dan API_URL yang dikonfigurasi)
                // Pastikan Anda memiliki API_KEY yang valid.
                // if (!API_KEY || API_KEY === 'MASUKKAN_API_KEY_GEMINI_ANDA_DI_SINI') {
                //     throw new Error("API Key Gemini belum dikonfigurasi. Silakan edit script.js.");
                // }
                // generatedText = await callGeminiApi(inputText);
                displayError("Mode API asli belum diimplementasikan sepenuhnya dalam contoh ini. Atur SIMULATE_API ke true atau lengkapi callGeminiApi.");
                throw new Error("Panggilan API asli belum diimplementasikan.");

            }
            professionalEmail.value = generatedText;
            copyButton.textContent = "Salin"; // Reset tombol salin jika sebelumnya "Disalin!"
        } catch (error) {
            console.error("Error generating email:", error);
            displayError(error.message || "Terjadi kesalahan saat membuat email. Coba lagi.");
            professionalEmail.value = "Tidak dapat menghasilkan email saat ini.";
        } finally {
            showLoadingState(false);
        }
    });

    copyButton.addEventListener('click', () => {
        if (!professionalEmail.value) {
            displayError("Tidak ada teks untuk disalin.");
            return;
        }
        clearError();
        navigator.clipboard.writeText(professionalEmail.value)
            .then(() => {
                copyButton.textContent = "Disalin!";
                setTimeout(() => {
                    copyButton.textContent = "Salin";
                }, 2000);
            })
            .catch(err => {
                console.error("Error copying text:", err);
                displayError("Gagal menyalin teks. Coba salin secara manual.");
            });
    });

    function showLoadingState(isLoading) {
        if (isLoading) {
            buttonText.textContent = "Memproses...";
            loadingSpinner.classList.remove('hidden');
            generateButton.disabled = true;
            generateButton.classList.add('opacity-75', 'cursor-not-allowed');
        } else {
            buttonText.textContent = "Buat Email Profesional";
            loadingSpinner.classList.add('hidden');
            generateButton.disabled = false;
            generateButton.classList.remove('opacity-75', 'cursor-not-allowed');
        }
    }

    function displayError(message) {
        errorMessages.textContent = message;
    }

    function clearError() {
        errorMessages.textContent = "";
    }

    // --- Fungsi untuk Panggilan API Gemini Asli (Contoh) ---
    // async function callGeminiApi(promptText) {
    //     const requestBody = {
    //         contents: [{
    //             parts: [{
    //                 text: `Tulis ulang teks berikut menjadi sebuah email yang formal dan profesional, dengan tetap menjaga inti pesan. Jika teksnya sudah cukup formal, sempurnakan sedikit agar lebih baik. Teks asli: "${promptText}"`
    //             }]
    //         }],
    //         // Optional: tambahkan generationConfig jika perlu
    //         // generationConfig: {
    //         //   temperature: 0.7,
    //         //   topK: 1,
    //         //   topP: 1,
    //         //   maxOutputTokens: 2048,
    //         // }
    //     };

    //     const response = await fetch(API_URL, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(requestBody)
    //     });

    //     if (!response.ok) {
    //         const errorData = await response.json();
    //         console.error("Gemini API Error:", errorData);
    //         throw new Error(`Error dari API Gemini: ${errorData.error?.message || response.statusText}`);
    //     }

    //     const data = await response.json();
    //     if (data.candidates && data.candidates.length > 0 && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts.length > 0) {
    //         return data.candidates[0].content.parts[0].text;
    //     } else {
    //         // Handle kasus dimana respons tidak sesuai format yang diharapkan
    //         console.error("Invalid response structure from Gemini API:", data);
    //         throw new Error("Format respons dari API tidak valid.");
    //     }
    // }

    // --- Fungsi Simulasi API ---
    async function simulateGeminiApiCall(inputText) {
        return new Promise(resolve => {
            setTimeout(() => {
                let simulatedResponse = `Kepada pihak yang berkepentingan,\n\n`;
                simulatedResponse += `Menindaklanjuti permintaan Anda terkait "${inputText}", dengan ini kami sampaikan bahwa hal tersebut sedang kami proses.\n\n`;
                simulatedResponse += `Kami akan segera memberikan pembaruan lebih lanjut.\n\n`;
                simulatedResponse += `Hormat kami,\n\n[Nama Anda]`;
                resolve(simulatedResponse);
            }, SIMULATION_DELAY);
        });
    }
});

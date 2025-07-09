document.addEventListener('DOMContentLoaded', () => {
    const userInput = document.getElementById('userInput');
    const generateButton = document.getElementById('generateButton');
    const buttonText = document.getElementById('buttonText');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const professionalEmail = document.getElementById('professionalEmail');
    const copyButton = document.getElementById('copyButton');
    const errorMessages = document.getElementById('errorMessages');

    // Elements for Feature 1: Tone & Style Sliders
    const toneSlidersContainer = document.getElementById('toneSlidersContainer');
    const formalitySlider = document.getElementById('formalitySlider');
    const styleSlider = document.getElementById('styleSlider');
    const concisenessSlider = document.getElementById('concisenessSlider');
    const formalityValue = document.getElementById('formalityValue');
    const styleValue = document.getElementById('styleValue');
    const concisenessValue = document.getElementById('concisenessValue');

    // Elements for Feature 2: Educational Analysis & Feedback
    const analysisContainer = document.getElementById('analysisContainer');
    const originalTextWithHighlights = document.getElementById('originalTextWithHighlights');
    const analysisTooltip = document.getElementById('analysisTooltip');

    // Elements for Feature 3: Context-based Templates
    const templateSelector = document.getElementById('templateSelector');

    // Elements for Feature 4: Cross-Language Communication Assistant
    const inputLanguageSelector = document.getElementById('inputLanguageSelector');
    const outputLanguageSelector = document.getElementById('outputLanguageSelector');

    let userOriginalInput = ""; // To store the user's raw input for analysis
    let originalGeneratedText = ""; // To store the first AI-generated text


    const emailTemplates = {
        follow_up_interview: `Yth. [Nama Pewawancara],\n\nSaya ingin mengucapkan terima kasih atas kesempatan wawancara untuk posisi [Posisi yang Dilamar] pada [Tanggal Wawancara].\n\nSaya sangat antusias dengan diskusi kita mengenai [Sebutkan topik spesifik yang menarik] dan bagaimana keahlian saya di bidang [Sebutkan keahlian Anda] dapat berkontribusi untuk [Nama Perusahaan].\n\nSaya ingin menegaskan kembali minat saya pada posisi ini dan tim Anda. Mohon informasinya jika ada langkah selanjutnya dalam proses rekrutmen ini.\n\nTerima kasih atas waktu dan pertimbangan Anda.\n\nHormat saya,\n[Nama Anda]\n[Kontak Anda]`,
        reject_offer: `Yth. [Nama Hiring Manager/Perekrut],\n\nTerima kasih banyak atas penawaran posisi [Nama Posisi] di [Nama Perusahaan]. Saya sangat menghargai waktu yang telah Anda luangkan untuk berdiskusi dengan saya mengenai kesempatan ini.\n\nSetelah pertimbangan yang matang, dengan berat hati saya memutuskan untuk tidak menerima tawaran ini pada saat ini karena [Sebutkan alasan secara singkat dan profesional, opsional, misal: telah menerima tawaran lain yang lebih sesuai dengan tujuan karir saya saat ini / alasan pribadi].\n\nIni adalah keputusan yang sulit bagi saya, karena saya sangat terkesan dengan [Sebutkan hal positif tentang perusahaan/tim].\n\nSaya berharap yang terbaik untuk Anda dan [Nama Perusahaan] dalam mencari kandidat yang tepat. Semoga kita dapat tetap terhubung.\n\nHormat saya,\n[Nama Anda]`,
        request_raise: `Yth. [Nama Manajer Langsung],\n\nSaya menulis surat ini untuk secara resmi meminta peninjauan kembali kompensasi saya untuk posisi [Posisi Anda] saat ini.\n\nSelama [Jumlah Waktu, misal: satu tahun terakhir / periode proyek X], saya telah secara konsisten menunjukkan dedikasi dan memberikan kontribusi signifikan terhadap tujuan tim dan perusahaan, termasuk [Sebutkan 1-2 pencapaian kunci dengan dampak terukur, misal: berhasil meningkatkan efisiensi proses Y sebesar Z% / memimpin proyek A hingga selesai tepat waktu dan sesuai anggaran].\n\nSaya yakin bahwa kinerja dan tanggung jawab saya yang meningkat telah melampaui ekspektasi awal untuk peran ini. Berdasarkan riset pasar untuk posisi serupa dan kontribusi saya, saya percaya bahwa penyesuaian gaji sebesar [Persentase atau Jumlah Kenaikan yang Diinginkan] akan lebih mencerminkan nilai saya bagi perusahaan.\n\nSaya sangat menghargai kesempatan untuk membahas hal ini lebih lanjut dengan Anda pada waktu yang nyaman bagi Anda.\n\nTerima kasih atas waktu dan pertimbangannya.\n\nHormat saya,\n[Nama Anda]`,
        resign: `Yth. [Nama Manajer Langsung],\n\nMohon terima surat ini sebagai pemberitahuan resmi bahwa saya akan mengundurkan diri dari posisi saya sebagai [Posisi Anda] di [Nama Perusahaan], efektif per [Tanggal Terakhir Bekerja, biasanya 2 minggu atau satu bulan dari sekarang].\n\nIni bukanlah keputusan yang mudah, dan saya sangat menghargai kesempatan yang telah diberikan kepada saya selama bekerja di [Nama Perusahaan] selama [Lama Bekerja, misal: tiga tahun terakhir]. Saya telah banyak belajar dan berkembang, terutama dalam [Sebutkan hal positif atau pelajaran berharga].\n\nSaya berkomitmen untuk memastikan transisi yang lancar selama periode ini dan bersedia membantu dalam proses serah terima tugas semampu saya.\n\nSaya berharap yang terbaik untuk kesuksesan [Nama Perusahaan] di masa depan.\n\nHormat saya,\n[Nama Anda]`,
        introduction: `Yth. [Nama Kontak Baru],\n\nNama saya [Nama Anda], dan saya seorang [Profesi/Jabatan Anda] di [Nama Perusahaan/Institusi Anda]. Saya mendapatkan kontak Anda dari [Nama Pemberi Referensi/Sumber Kontak, jika ada] / Saya menemukan profil Anda melalui [Platform, misal: LinkedIn] dan tertarik dengan pekerjaan Anda di bidang [Bidang Pekerjaan Kontak Baru].\n\nSaya ingin terhubung karena [Sebutkan alasan spesifik, misal: saya juga bekerja di industri yang sama dan tertarik untuk bertukar pikiran / saya mengagumi proyek X yang Anda kerjakan / saya sedang mencari peluang kolaborasi di bidang Y].\n\n[Opsional: Tambahkan 1-2 kalimat singkat tentang diri Anda atau apa yang bisa Anda tawarkan].\n\nApakah Anda bersedia untuk berdiskusi singkat melalui telepon atau kopi virtual dalam beberapa minggu ke depan? Saya sangat antusias untuk belajar lebih banyak tentang pekerjaan Anda.\n\nTerima kasih atas waktu Anda.\n\nHormat saya,\n[Nama Anda]\n[Link Profil LinkedIn/Website Anda, jika relevan]`
    };

    // --- Konfigurasi API (PENTING: Ganti dengan API Key Anda) ---
    const API_KEY = 'MASUKKAN_API_KEY_GEMINI_ANDA_DI_SINI'; // PENTING: Pastikan ini sudah diisi dengan API Key Anda!
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`;

    // --- Mode Simulasi API (untuk pengembangan tanpa API Key asli) ---
    const SIMULATE_API = false; // DISET KE FALSE untuk menggunakan API Gemini asli
    const SIMULATION_DELAY = 1500; // Tidak lagi digunakan jika SIMULATE_API false

    // --- Event Listener for Template Selector ---
    templateSelector.addEventListener('change', () => {
        const selectedTemplateKey = templateSelector.value;
        if (selectedTemplateKey && emailTemplates[selectedTemplateKey]) {
            userInput.value = emailTemplates[selectedTemplateKey];
            // Optionally, trigger analysis or other actions if needed when a template is selected
            // For now, just fill the textarea. User then clicks "Generate"
            userInput.focus(); // Focus on textarea for immediate editing
        } else if (!selectedTemplateKey) {
            // Optional: Clear userInput if "Pilih template..." is re-selected
            // userInput.value = "";
        }
    });

    generateButton.addEventListener('click', async () => {
        const inputText = userInput.value.trim();
        if (!inputText) {
            displayError("Silakan masukkan draf email Anda terlebih dahulu.");
            return;
        }
        userOriginalInput = inputText; // Simpan input asli pengguna

        clearError();
        showLoadingState(true);
        professionalEmail.value = ""; // Kosongkan hasil sebelumnya
        originalTextWithHighlights.innerHTML = ""; // Kosongkan analisis sebelumnya


        try {
            let generatedText = "";
            if (SIMULATE_API) {
                generatedText = await simulateGeminiApiCall(inputText); // Ini akan tetap sebagai fallback jika diperlukan
            } else {
                if (!API_KEY || API_KEY === 'MASUKKAN_API_KEY_GEMINI_ANDA_DI_SINI') {
                    displayError("API Key Gemini belum dikonfigurasi di script.js. Silakan periksa dan isi API Key Anda.");
                    throw new Error("API Key Gemini belum dikonfigurasi.");
                }
                // Panggil API Gemini asli
                const currentInputLang = inputLanguageSelector.value;
                const currentOutputLang = outputLanguageSelector.value;
                generatedText = await callGeminiApi(inputText, currentInputLang, currentOutputLang);
            }

            originalGeneratedText = generatedText; // Simpan hasil asli
            updateProfessionalEmailDisplay(originalGeneratedText); // Tampilkan hasil awal dan slider

            copyButton.textContent = "Salin"; // Reset tombol salin jika sebelumnya "Disalin!"
        } catch (error) {
            console.error("Error generating email:", error);
            displayError(error.message || "Terjadi kesalahan saat membuat email. Coba lagi.");
            updateProfessionalEmailDisplay("Tidak dapat menghasilkan email saat ini.", true);
        } finally {
            showLoadingState(false);
        }
    });

    function updateProfessionalEmailDisplay(text, isError = false) {
        professionalEmail.value = text;
        if (text && !isError && text !== "Tidak dapat menghasilkan email saat ini.") {
            professionalEmail.classList.remove('opacity-0');
            professionalEmail.classList.add('opacity-100');
            copyButton.classList.remove('opacity-0');
            copyButton.classList.add('opacity-100');
            toneSlidersContainer.classList.remove('hidden'); // Tampilkan slider
            // Reset slider values to default (1) if it's a new generation
            formalitySlider.value = 1; updateFormalityValue();
            styleSlider.value = 1; updateStyleValue();
            concisenessSlider.value = 1; updateConcisenessValue();

            // Display and analyze the original user input
            if (userOriginalInput) {
                displayAndAnalyzeOriginalText(userOriginalInput);
            }

        } else {
            professionalEmail.classList.add('opacity-0');
            professionalEmail.classList.remove('opacity-100');
            copyButton.classList.add('opacity-0');
            copyButton.classList.remove('opacity-100');
            toneSlidersContainer.classList.add('hidden'); // Sembunyikan slider jika error atau tidak ada teks
            analysisContainer.classList.add('hidden'); // Sembunyikan analisis jika error
        }
    }

    function displayAndAnalyzeOriginalText(originalText) {
        const highlightedHTML = analyzeAndHighlightText(originalText);
        originalTextWithHighlights.innerHTML = highlightedHTML;
        analysisContainer.classList.remove('hidden');

        // Add event listeners for tooltips
        const highlights = originalTextWithHighlights.querySelectorAll('span.highlighted-text');
        highlights.forEach(span => {
            span.addEventListener('mousemove', (e) => {
                const tooltipText = span.dataset.tooltip;
                if (tooltipText) {
                    analysisTooltip.innerHTML = tooltipText;
                    analysisTooltip.classList.remove('hidden');
                    // Position tooltip near mouse, with offset
                    // Consider viewport boundaries later for robustness
                    let x = e.clientX + 15;
                    let y = e.clientY + 15;
                    if (x + analysisTooltip.offsetWidth > window.innerWidth) {
                        x = e.clientX - analysisTooltip.offsetWidth - 15;
                    }
                    if (y + analysisTooltip.offsetHeight > window.innerHeight) {
                        y = e.clientY - analysisTooltip.offsetHeight - 15;
                    }
                    analysisTooltip.style.left = `${x}px`;
                    analysisTooltip.style.top = `${y}px`;
                }
            });
            span.addEventListener('mouseleave', () => {
                analysisTooltip.classList.add('hidden');
            });
        });
    }

    function analyzeAndHighlightText(text) {
        let analyzedText = text;
        const analysisRules = [
            {
                keyword: /bro\b/gi,
                suggestion: "Kata 'Bro' bersifat sangat informal. Pertimbangkan sapaan yang lebih formal seperti 'Bapak/Ibu' atau nama jika diketahui."
            },
            {
                keyword: /sist\b/gi,
                suggestion: "Kata 'Sist' bersifat sangat informal. Pertimbangkan sapaan yang lebih formal."
            },
            {
                keyword: /nih\b/gi,
                suggestion: "Partikel 'nih' cenderung informal. Coba hilangkan atau ganti dengan struktur kalimat yang lebih baku."
            },
            {
                keyword: /cepet\b|cepetan\b/gi,
                suggestion: "Kata 'cepet' atau 'cepetan' kurang formal. Gunakan 'segera', 'sesegera mungkin', atau 'dengan cepat'."
            },
            {
                keyword: /banget\b/gi,
                suggestion: "'Banget' adalah kata informal. Pertimbangkan menggunakan 'sangat' atau 'sekali'."
            },
            {
                keyword: /pokoknya saya minta/gi,
                suggestion: "Frasa 'Pokoknya saya minta' bisa terdengar menuntut. Pertimbangkan menggunakan kalimat yang lebih kolaboratif seperti 'Mohon bantuannya untuk menyediakan...' atau 'Saya ingin meminta...'."
            },
            {
                keyword: /duit\b|fulus\b/gi,
                suggestion: "Gunakan istilah 'dana', 'biaya', atau 'anggaran' untuk konteks profesional."
            }
        ];

        analysisRules.forEach(rule => {
            analyzedText = analyzedText.replace(rule.keyword, (match) => {
                return `<span class="highlighted-text bg-yellow-500/30 px-1 rounded cursor-pointer" data-tooltip="${rule.suggestion}">${match}</span>`;
            });
        });

        // Preserve line breaks by converting \n to <br>
        return analyzedText.replace(/\n/g, '<br>');
    }

    copyButton.addEventListener('click', () => {
        if (!professionalEmail.value || professionalEmail.classList.contains('opacity-0')) {
            displayError("Tidak ada teks untuk disalin atau hasil belum terlihat.");
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

    // --- Event Listeners for Tone Sliders ---
    let debounceTimer;
    const handleSliderChange = () => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(async () => {
            // Update text labels immediately
            updateFormalityValueDisplay();
            updateStyleValueDisplay();
            updateConcisenessValueDisplay();

            // Call API to adjust email
            await adjustEmailWithApi();
        }, 500); // Debounce time: 500ms
    };

    formalitySlider.addEventListener('input', handleSliderChange);
    styleSlider.addEventListener('input', handleSliderChange);
    concisenessSlider.addEventListener('input', handleSliderChange);

    function updateFormalityValueDisplay() { // Renamed from updateFormalityValue
        const values = ["Sangat Santai", "Netral", "Sangat Formal"];
        formalityValue.textContent = values[formalitySlider.value];
    }
    function updateStyleValueDisplay() { // Renamed from updateStyleValue
        const values = ["Diplomatis", "Langsung", "Persuasif"];
        styleValue.textContent = values[styleSlider.value];
    }
    function updateConcisenessValueDisplay() { // Renamed from updateConcisenessValue
        const values = ["Lengkap & Rinci", "Sedang", "Singkat & Padat"];
        concisenessValue.textContent = values[concisenessSlider.value];
    }

    async function adjustEmailWithApi() {
        if (!originalGeneratedText || originalGeneratedText === "Tidak dapat menghasilkan email saat ini." || SIMULATE_API) {
            // If using simulation, fallback to old simulated adjustment
            if (SIMULATE_API && originalGeneratedText) {
                adjustEmailSimulatedFallback(); // Call the old simulation logic
            }
            return;
        }
        if (!API_KEY || API_KEY === 'MASUKKAN_API_KEY_GEMINI_ANDA_DI_SINI') {
            displayError("API Key Gemini belum dikonfigurasi untuk penyesuaian nada. Silakan periksa script.js.");
            return;
        }

        showLoadingState(true);
        professionalEmail.classList.add('opacity-50'); // Dim text during API call

        try {
            const formalityMap = ["very casual", "neutral", "very formal"];
            const styleMap = ["diplomatic", "direct", "persuasive"];
            const concisenessMap = ["detailed and comprehensive", "medium", "brief and concise"];

            const toneSettings = {
                formality: formalityMap[formalitySlider.value],
                style: styleMap[styleSlider.value],
                conciseness: concisenessMap[concisenessSlider.value]
            };

            // Penting: Gunakan userOriginalInput sebagai dasar untuk penyesuaian nada,
            // agar setiap penyesuaian slider tidak bertumpuk pada hasil API sebelumnya yang sudah disesuaikan juga.
            // Bahasa input dan output juga harus dari userOriginalInput's context.
            const currentInputLang = inputLanguageSelector.value; // Ini mungkin perlu dipikirkan ulang jika output lang berbeda
            const currentOutputLang = outputLanguageSelector.value;

            // Base text untuk penyesuaian adalah userOriginalInput, BUKAN originalGeneratedText (hasil API pertama)
            // karena originalGeneratedText mungkin sudah hasil terjemahan/profesionalisasi.
            // Kita ingin AI menerapkan nada pada *konsep asli* dari userOriginalInput.
            const adjustedText = await callGeminiApi(userOriginalInput, currentInputLang, currentOutputLang, toneSettings);

            professionalEmail.value = adjustedText;
            // Tidak perlu mengubah originalGeneratedText di sini, karena itu adalah basis untuk *generasi awal*
            // atau basis untuk *perubahan bahasa*. Perubahan slider adalah variasi dari itu.
            // Namun, jika kita ingin perubahan slider bersifat kumulatif pada hasil terakhir, maka originalGeneratedText perlu diupdate.
            // Untuk saat ini, setiap gerakan slider akan memanggil API berdasarkan userOriginalInput + tone.

        } catch (error) {
            console.error("Error adjusting email with API:", error);
            displayError(error.message || "Gagal menyesuaikan email dengan API.");
            // Biarkan teks email yang ada, jangan kosongkan.
        } finally {
            showLoadingState(false);
            professionalEmail.classList.remove('opacity-50');
        }
    }

    // Fallback simulation logic for sliders if SIMULATE_API is true
    function adjustEmailSimulatedFallback() {
        if (!originalGeneratedText) return;
        let adjustedText = originalGeneratedText;

        const formalityMap = ["Sangat Santai", "Netral", "Sangat Formal"];
        const styleMap = ["Diplomatis", "Langsung", "Persuasif"];
        const concisenessMap = ["Lengkap & Rinci", "Sedang", "Singkat & Padat"];

        let prefix = `[Simulasi: Formalitas=${formalityMap[formalitySlider.value]}, Gaya=${styleMap[styleSlider.value]}, Keringkasan=${concisenessMap[concisenessSlider.value]}]\n\n`;

        // Simulasi yang sangat sederhana hanya dengan menambahkan prefix
        // dan mungkin memotong teks untuk keringkasan.
        if (parseInt(concisenessSlider.value) === 2) { // Singkat & Padat
            adjustedText = prefix + (originalGeneratedText.substring(0, Math.min(originalGeneratedText.length, 150)) + "...");
        } else if (parseInt(concisenessSlider.value) === 0) { // Lengkap & Rinci
             adjustedText = prefix + originalGeneratedText + "\n\n(Ini adalah simulasi penambahan detail lebih lanjut...)";
        } else {
            adjustedText = prefix + originalGeneratedText;
        }
        professionalEmail.value = adjustedText;
    }


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

    // --- Fungsi untuk Panggilan API Gemini Asli ---
    async function callGeminiApi(promptText, inputLang, outputLang, toneSettings = null) {
        let effectivePrompt = "";

        // Default prompt (jika tidak ada penyesuaian nada/gaya/bahasa)
        if (inputLang === 'id' && outputLang === 'id') {
            effectivePrompt = `Tulis ulang teks Bahasa Indonesia berikut menjadi sebuah email yang formal dan profesional, dengan tetap menjaga inti pesan. Jika teksnya sudah cukup formal, sempurnakan sedikit agar lebih baik. Teks asli: "${promptText}"`;
        } else if (inputLang === 'en' && outputLang === 'en') {
            effectivePrompt = `Rewrite the following English text into a formal and professional email, maintaining the core message. If the text is already quite formal, refine it slightly to make it better. Original text: "${promptText}"`;
        } else if (inputLang === 'id' && outputLang === 'en') {
            effectivePrompt = `Translate the following Indonesian text into a professional English email. Ensure the tone is appropriate for the context, and the language is formal and clear. If the text is already an email, refine it. Indonesian text: "${promptText}"`;
        } else if (inputLang === 'en' && outputLang === 'id') {
            effectivePrompt = `Terjemahkan teks Bahasa Inggris berikut menjadi email profesional berbahasa Indonesia. Pastikan nadanya sesuai dengan konteks, dan bahasanya formal serta jelas. Jika teks tersebut sudah berupa email, sempurnakanlah. Teks Bahasa Inggris: "${promptText}"`;
        } else { // Fallback jika kombinasi bahasa tidak terduga
            effectivePrompt = `Rewrite the following text into a formal and professional email: "${promptText}"`;
        }

        if (toneSettings) {
            let toneInstructions = "";
            if (toneSettings.formality) toneInstructions += ` Adjust formality to: ${toneSettings.formality}.`;
            if (toneSettings.style) toneInstructions += ` Adjust writing style to: ${toneSettings.style}.`;
            if (toneSettings.conciseness) toneInstructions += ` Adjust conciseness to: ${toneSettings.conciseness}.`;

            // Prepend tone instructions to the existing prompt or integrate it more intelligently
            effectivePrompt = `Considering the following desired adjustments: ${toneInstructions}. Now, take the original request: "${effectivePrompt}" and generate the email.`;
            // Alternatif: Bisa juga membuat prompt yang lebih terstruktur
            // effectivePrompt = `Task: Generate a professional email.
            // Original Text: "${promptText}"
            // Source Language: ${inputLang}
            // Target Language: ${outputLang}
            // Desired Formality: ${toneSettings.formality || 'neutral'}
            // Desired Style: ${toneSettings.style || 'direct'}
            // Desired Conciseness: ${toneSettings.conciseness || 'medium'}
            // Instructions: [Combined instructions based on above]`;
        }

        console.log("Sending to Gemini API. Prompt:", effectivePrompt);

        const requestBody = {
            contents: [{ parts: [{ text: effectivePrompt }] }],
            // Optional: tambahkan generationConfig jika perlu
            // generationConfig: {
            //   temperature: 0.7, // Untuk kreativitas, bisa disesuaikan
            //   // maxOutputTokens: 2048,
            // }
        };

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            let errorData;
            try {
                errorData = await response.json();
                console.error("Gemini API Error Full Response:", errorData);
            } catch (e) {
                console.error("Gemini API Error: Could not parse error response JSON.", e);
                errorData = { error: { message: response.statusText } };
            }
            const errorMessage = errorData.error?.message || response.statusText || "Unknown API error";
            if (response.status === 400 && errorMessage.includes("API key not valid")) {
                 throw new Error("API Key tidak valid. Harap periksa konfigurasi API Key Anda di Google AI Studio atau pastikan sudah benar di script.js.");
            }
            if (response.status === 429) {
                throw new Error("Terlalu banyak permintaan ke API Gemini. Silakan coba lagi nanti (Rate limit exceeded).");
            }
            throw new Error(`Error dari API Gemini: ${errorMessage} (Status: ${response.status})`);
        }

        const data = await response.json();
        console.log("Gemini API Response:", data);

        if (data.candidates && data.candidates.length > 0 && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts.length > 0) {
            return data.candidates[0].content.parts[0].text;
        } else if (data.promptFeedback && data.promptFeedback.blockReason) {
            // Jika ada blockReason, tampilkan itu sebagai pesan error yang lebih informatif
            const blockReason = data.promptFeedback.blockReason;
            const safetyRatings = data.promptFeedback.safetyRatings.map(r => `${r.category}: ${r.probability}`).join(', ');
            throw new Error(`Permintaan diblokir oleh API Gemini. Alasan: ${blockReason}. Detail: ${safetyRatings}`);
        } else {
            console.error("Invalid response structure from Gemini API:", data);
            throw new Error("Format respons dari API tidak valid atau tidak ada konten yang dihasilkan.");
        }
    }

    // --- Fungsi Simulasi API (sekarang hanya sebagai fallback jika SIMULATE_API true) ---
    async function simulateGeminiApiCall(inputText) { // Fungsi ini tetap ada jika SIMULATE_API = true
        const inputLang = inputLanguageSelector.value;
        const outputLang = outputLanguageSelector.value;

        return new Promise(resolve => {
            setTimeout(() => {
                let simulatedResponse = "";
                let header = `Kepada pihak yang berkepentingan,\n\n`;
                let body = `Menindaklanjuti permintaan Anda terkait "${inputText}", dengan ini kami sampaikan bahwa hal tersebut sedang kami proses.\n\n`;
                let footer = `Kami akan segera memberikan pembaruan lebih lanjut.\n\nHormat kami,\n\n[Nama Anda]`;

                // Simple heuristic to summarize if inputText is very long (likely a template)
                // Removed summarizedInputText as it's not the right approach for this simulation.
                // The simulation will now generate entirely generic content for cross-language requests.

                if (inputLang === 'id' && outputLang === 'en') {
                    header = `Dear Sir/Madam,\n\n`;
                    // Generic English body, does NOT include original Indonesian text.
                    body = `This is a professionally styled English email based on the Indonesian draft you provided.\n\nIt has been structured to effectively convey your message in a formal and clear manner, suitable for professional communication.\n\nKey points from your original draft (simulated understanding):\n- Purpose: [e.g., Follow-up, Inquiry, Request based on context if AI were real]\n- Recipient: [e.g., Hiring Manager, Colleague if AI were real]\n\nPlease review and use as needed.\n\n`;
                    footer = `Sincerely,\n[Your Name]`;
                    simulatedResponse = `(Simulated Professional English version of your Indonesian draft)\n\n${header}${body}${footer}`;
                } else if (inputLang === 'en' && outputLang === 'id') {
                    header = `Kepada pihak yang berkepentingan,\n\n`;
                    // Generic Indonesian body, does NOT include original English text.
                    body = `Berikut adalah email berbahasa Indonesia yang telah disusun secara profesional berdasarkan draf bahasa Inggris yang Anda berikan.\n\nEmail ini telah diformat untuk menyampaikan pesan Anda secara formal, jelas, dan efektif, sesuai untuk komunikasi profesional.\n\nPoin-poin utama dari draf asli Anda (pemahaman simulasi):\n- Tujuan: [misalnya, Tindak lanjut, Pertanyaan, Permintaan berdasarkan konteks jika AI sungguhan]\n- Penerima: [misalnya, Manajer Perekrutan, Kolega jika AI sungguhan]\n\nSilakan ditinjau dan digunakan sesuai kebutuhan.\n\n`;
                    footer = `Hormat kami,\n[Nama Anda]`;
                    simulatedResponse = `(Versi profesional Bahasa Indonesia simulasi dari draf Bahasa Inggris Anda)\n\n${header}${body}${footer}`;
                } else if (inputLang === 'en' && outputLang === 'en') {
                    // Simulation for EN to EN (can be more direct about input)
                    header = `Dear Sir/Madam,\n\n`;
                    body = `This is a professionally revised version of your English draft:\n\n"${inputText}"\n\nWe have refined the structure and tone for clarity and professional impact.\n\n`;
                    footer = `Sincerely,\n[Your Name]`;
                    simulatedResponse = `${header}${body}${footer}`;
                } else { // Default to ID-ID or if inputLang === outputLang (e.g. id to id)
                    header = `Kepada pihak yang berkepentingan,\n\n`;
                    body = `Berikut adalah versi profesional dari draf Bahasa Indonesia Anda:\n\n"${inputText}"\n\nTelah kami sesuaikan struktur dan gayanya agar lebih jelas dan berdampak profesional.\n\n`;
                    footer = `Hormat kami,\n[Nama Anda]`;
                    simulatedResponse = `${header}${body}${footer}`;
                }
                resolve(simulatedResponse);
            }, SIMULATION_DELAY);
        });
    }

    // Add event listeners to language selectors to re-adjust email if languages change
    // after an email has been generated and sliders might have been used.
    // This implies that changing language should ideally re-trigger a (simulated) generation.
    // For simplicity now, we'll just note that changing language ideally should clear the current output
    // or re-generate. The current slider logic works on `originalGeneratedText`.
    // If `originalGeneratedText` is in a different language due to prior selection, then sliders would
    // be adjusting a text that doesn't match the new outputLang.
    // A more robust solution would re-call the generation logic.

    inputLanguageSelector.addEventListener('change', () => {
        // If an email is already generated, changing input lang might imply needing re-generation
        // For now, this change will be picked up at the next "Generate" click.
        // Consider clearing output or indicating a mismatch if desired.
        console.log("Input language changed to: " + inputLanguageSelector.value);
    });

    outputLanguageSelector.addEventListener('change', async () => {
        console.log("Output language changed to: " + outputLanguageSelector.value);
        if (SIMULATE_API) { // Jika simulasi, lakukan simulasi ulang sederhana
            if (originalGeneratedText && professionalEmail.value && !professionalEmail.classList.contains('opacity-0')) {
                showLoadingState(true);
                try {
                    const newRawOutput = await simulateGeminiApiCall(userOriginalInput);
                    originalGeneratedText = newRawOutput;
                    adjustEmailSimulatedFallback(); // Gunakan fallback simulasi
                    professionalEmail.classList.remove('opacity-0');
                    professionalEmail.classList.add('opacity-100');
                } catch (e) {
                    console.error("Error re-simulating for language change:", e);
                    displayError("Gagal mengubah bahasa output (simulasi). Coba generate ulang.");
                } finally {
                    showLoadingState(false);
                }
            }
            return;
        }

        // Logika untuk API asli
        if (userOriginalInput && professionalEmail.value && !professionalEmail.classList.contains('opacity-0')) {
            if (!API_KEY || API_KEY === 'MASUKKAN_API_KEY_GEMINI_ANDA_DI_SINI') {
                displayError("API Key Gemini belum dikonfigurasi untuk mengubah bahasa output. Silakan periksa script.js.");
                return;
            }
            showLoadingState(true);
            professionalEmail.classList.add('opacity-50');
            try {
                const currentInputLang = inputLanguageSelector.value;
                const newOutputLang = outputLanguageSelector.value;

                const formalityMap = ["very casual", "neutral", "very formal"];
                const styleMap = ["diplomatic", "direct", "persuasive"];
                const concisenessMap = ["detailed and comprehensive", "medium", "brief and concise"];
                const currentToneSettings = {
                    formality: formalityMap[formalitySlider.value],
                    style: styleMap[styleSlider.value],
                    conciseness: concisenessMap[concisenessSlider.value]
                };

                const newTransformedText = await callGeminiApi(userOriginalInput, currentInputLang, newOutputLang, currentToneSettings);
                originalGeneratedText = newTransformedText; // Simpan ini sebagai basis baru
                professionalEmail.value = newTransformedText;

                professionalEmail.classList.remove('opacity-0');
                professionalEmail.classList.add('opacity-100');
            } catch (error) {
                console.error("Error changing output language with API:", error);
                displayError(error.message || "Gagal mengubah bahasa output dengan API.");
            } finally {
                showLoadingState(false);
                professionalEmail.classList.remove('opacity-50');
            }
        }
    });

});

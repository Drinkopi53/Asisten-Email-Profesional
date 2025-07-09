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
    const API_KEY = 'AIzaSyDet_RXvk9Xb1W67qxe0aoIr_iCst2qOt0';
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;

    // --- Mode Simulasi API (untuk pengembangan tanpa API Key asli) ---
    const SIMULATE_API = true; // Set ke false jika menggunakan API Key asli
    const SIMULATION_DELAY = 1500; // milidetik

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
                generatedText = await simulateGeminiApiCall(inputText);
            } else {
                // Kode untuk panggilan API Gemini asli (membutuhkan API_KEY dan API_URL yang dikonfigurasi)
                // Pastikan Anda memiliki API_KEY yang valid.
                if (!API_KEY || API_KEY === 'MASUKKAN_API_KEY_GEMINI_ANDA_DI_SINI') {
                    throw new Error("API Key Gemini belum dikonfigurasi. Silakan edit script.js.");
                }
                generatedText = await callGeminiApi(inputText);
                displayError("Mode API asli belum diimplementasikan sepenuhnya dalam contoh ini. Atur SIMULATE_API ke true atau lengkapi callGeminiApi.");
                throw new Error("Panggilan API asli belum diimplementasikan.");
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
    formalitySlider.addEventListener('input', () => {
        updateFormalityValue();
        adjustEmailSimulated();
    });
    styleSlider.addEventListener('input', () => {
        updateStyleValue();
        adjustEmailSimulated();
    });
    concisenessSlider.addEventListener('input', () => {
        updateConcisenessValue();
        adjustEmailSimulated();
    });

    function updateFormalityValue() {
        const values = ["Sangat Santai", "Netral", "Sangat Formal"];
        formalityValue.textContent = values[formalitySlider.value];
    }
    function updateStyleValue() {
        const values = ["Diplomatis", "Langsung", "Persuasif"];
        styleValue.textContent = values[styleSlider.value];
    }
    function updateConcisenessValue() {
        const values = ["Lengkap & Rinci", "Sedang", "Singkat & Padat"];
        concisenessValue.textContent = values[concisenessSlider.value];
    }

    function adjustEmailSimulated() {
        if (!originalGeneratedText || originalGeneratedText === "Tidak dapat menghasilkan email saat ini.") {
            return;
        }

        let adjustedText = originalGeneratedText;

        // Simulasi penyesuaian berdasarkan formality
        const formality = parseInt(formalitySlider.value);
        if (formality === 0) { // Sangat Santai
            adjustedText = "Hei,\n\n" + adjustedText.replace("Kepada pihak yang berkepentingan,\n\n", "").replace("Hormat kami,\n\n[Nama Anda]", "Thanks,\n[Nama Anda]");
            if (!adjustedText.includes("Thanks,\n[Nama Anda]")) adjustedText += "\n\nThanks,\n[Nama Anda]";
        } else if (formality === 2) { // Sangat Formal
            if (!adjustedText.startsWith("Dengan hormat,\n\n") && !adjustedText.startsWith("Kepada Yth.")) {
                 adjustedText = "Dengan hormat,\n\n" + adjustedText.replace("Kepada pihak yang berkepentingan,\n\n", "");
            }
            if (!adjustedText.includes("Demikian kami sampaikan. Atas perhatiannya, diucapkan terima kasih.\n\nHormat saya,\n[Nama Anda]")) {
                adjustedText = adjustedText.replace("Hormat kami,\n\n[Nama Anda]", "Demikian kami sampaikan. Atas perhatiannya, diucapkan terima kasih.\n\nHormat saya,\n[Nama Anda]");
            }
        }
        // Untuk formality === 1 (Netral), kita anggap originalGeneratedText sudah netral

        // Simulasi penyesuaian berdasarkan style
        const style = parseInt(styleSlider.value);
        if (style === 0) { // Diplomatis
            adjustedText = adjustedText.replace("kami sampaikan bahwa", "kami ingin menginformasikan dengan hati-hati bahwa");
        } else if (style === 2) { // Persuasif
            adjustedText = adjustedText.replace("Kami akan segera memberikan pembaruan", "Kami percaya bahwa pembaruan ini akan sangat bermanfaat dan akan kami berikan segera");
        }

        // Simulasi penyesuaian berdasarkan conciseness
        const conciseness = parseInt(concisenessSlider.value);
        if (conciseness === 0 && !adjustedText.includes("Sebagai tambahan informasi,")) { // Lengkap & Rinci
            adjustedText += "\n\nSebagai tambahan informasi, detail lebih lanjut akan kami sertakan dalam komunikasi berikutnya.";
        } else if (conciseness === 2) { // Singkat & Padat
            adjustedText = adjustedText.split('\n\n')[0]; // Ambil paragraf pertama saja (simulasi kasar)
             if (formality === 0 && !adjustedText.endsWith("Thanks,\n[Nama Anda]")) adjustedText += "\n\nThanks,\n[Nama Anda]";
             else if (formality !== 0 && !adjustedText.endsWith("Hormat kami,\n[Nama Anda]") && !adjustedText.includes("Hormat saya,\n[Nama Anda]")) adjustedText += "\n\nSingkatnya,\n[Nama Anda]";
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

    // --- Fungsi untuk Panggilan API Gemini Asli (Contoh) ---
    async function callGeminiApi(promptText) {
        const requestBody = {
            contents: [{
                parts: [{
                    text: `Tulis ulang teks berikut menjadi sebuah email yang formal dan profesional, dengan tetap menjaga inti pesan. Jika teksnya sudah cukup formal, sempurnakan sedikit agar lebih baik. Teks asli: "${promptText}"`
                }]
            }],
            // Optional: tambahkan generationConfig jika perlu
            // generationConfig: {
            //   temperature: 0.7,
            //   topK: 1,
            //   topP: 1,
            //   maxOutputTokens: 2048,
            // }
        };

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Gemini API Error:", errorData);
            throw new Error(`Error dari API Gemini: ${errorData.error?.message || response.statusText}`);
        }

        const data = await response.json();
        if (data.candidates && data.candidates.length > 0 && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts.length > 0) {
            return data.candidates[0].content.parts[0].text;
        } else {
            // Handle kasus dimana respons tidak sesuai format yang diharapkan
            console.error("Invalid response structure from Gemini API:", data);
            throw new Error("Format respons dari API tidak valid.");
        }
    }

    // --- Fungsi Simulasi API ---
    async function simulateGeminiApiCall(inputText) {
        const inputLang = inputLanguageSelector.value;
        const outputLang = outputLanguageSelector.value;

        return new Promise(resolve => {
            setTimeout(() => {
                let simulatedResponse = "";
                let header = `Kepada pihak yang berkepentingan,\n\n`;
                let body = `Menindaklanjuti permintaan Anda terkait "${inputText}", dengan ini kami sampaikan bahwa hal tersebut sedang kami proses.\n\n`;
                let footer = `Kami akan segera memberikan pembaruan lebih lanjut.\n\nHormat kami,\n\n[Nama Anda]`;

                if (inputLang === 'id' && outputLang === 'en') {
                    header = `Dear Sir/Madam,\n\n`;
                    body = `Regarding your inquiry about "${inputText}", please be informed that we are currently processing it.\n\n`;
                    footer = `We will provide further updates shortly.\n\nSincerely,\n[Your Name]`;
                    simulatedResponse = `(Simulated Professional English version of your Indonesian draft)\n\n${header}${body}${footer}`;
                } else if (inputLang === 'en' && outputLang === 'id') {
                    header = `Kepada pihak yang berkepentingan,\n\n`;
                    body = `Sehubungan dengan pertanyaan Anda mengenai "${inputText}", dengan ini kami informasikan bahwa saat ini sedang kami proses.\n\n`;
                    footer = `Kami akan segera memberikan pembaruan lebih lanjut.\n\nHormat kami,\n\n[Nama Anda]`;
                    simulatedResponse = `(Versi profesional Bahasa Indonesia simulasi dari draf Bahasa Inggris Anda)\n\n${header}${body}${footer}`;
                } else if (inputLang === 'en' && outputLang === 'en') {
                    header = `Dear Sir/Madam,\n\n`;
                    body = `Regarding your inquiry about "${inputText}", please be informed that we are currently processing it.\n\n`;
                    footer = `We will provide further updates shortly.\n\nSincerely,\n[Your Name]`;
                    simulatedResponse = `${header}${body}${footer}`;
                } else { // Default to ID-ID or if langs are same
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

    outputLanguageSelector.addEventListener('change', () => {
        // If an email is displayed, and sliders have modified it,
        // changing output lang should ideally re-fetch or re-simulate for the new lang
        // and then re-apply slider effects.
        // For now, we'll make it simple: re-simulate and re-apply current slider settings.
        if (originalGeneratedText && professionalEmail.value && !professionalEmail.classList.contains('opacity-0')) {
            // Re-simulate with new output language, using the very original user input.
            // Then, re-apply slider adjustments.
            (async () => {
                showLoadingState(true);
                try {
                    const newRawOutput = await simulateGeminiApiCall(userOriginalInput); // userOriginalInput is the raw text
                    originalGeneratedText = newRawOutput; // This becomes the new base for sliders
                    adjustEmailSimulated(); // This function reads current slider values and applies them
                    professionalEmail.classList.remove('opacity-0'); // ensure it's visible
                    professionalEmail.classList.add('opacity-100');
                } catch (e) {
                    console.error("Error re-simulating for language change:", e);
                    displayError("Gagal mengubah bahasa output. Coba generate ulang.");
                } finally {
                    showLoadingState(false);
                }
            })();
        }
         console.log("Output language changed to: " + outputLanguageSelector.value);
    });

});

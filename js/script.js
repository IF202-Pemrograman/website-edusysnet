// EduSysNet - JavaScript

document.addEventListener("DOMContentLoaded", function () {
    const themeToggle = document.getElementById("themeToggle");
    const navToggle = document.getElementById("navToggle");
    const mainNav = document.getElementById("mainNav");
    const quizForm = document.getElementById("quizForm");
    const quizResult = document.getElementById("quizResult");
    const resetQuiz = document.getElementById("resetQuiz");
    const contactForm = document.getElementById("contactForm");
    const formResult = document.getElementById("formResult");

    // Menampilkan tahun secara otomatis pada footer.
    document.getElementById("currentYear").textContent = new Date().getFullYear();

    // Dark mode.
    const savedTheme = localStorage.getItem("edusysnet-theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark");
        themeToggle.textContent = "☀️";
    }

    themeToggle.addEventListener("click", function () {
        document.body.classList.toggle("dark");

        const isDark = document.body.classList.contains("dark");
        themeToggle.textContent = isDark ? "☀️" : "🌙";

        localStorage.setItem("edusysnet-theme", isDark ? "dark" : "light");
    });

    // Navigasi mobile.
    navToggle.addEventListener("click", function () {
        mainNav.classList.toggle("open");
    });

    mainNav.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            mainNav.classList.remove("open");
        });
    });

    // Quiz interaktif.
    quizForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const answers = {
            q1: "443",
            q2: "ping",
            q3: "DNS"
        };

        let score = 0;
        let unanswered = 0;

        Object.keys(answers).forEach(function (question) {
            const selected = document.querySelector(
                'input[name="' + question + '"]:checked'
            );

            if (!selected) {
                unanswered++;
                return;
            }

            if (selected.value === answers[question]) {
                score++;
            }
        });

        if (unanswered > 0) {
            quizResult.textContent =
                "Silakan jawab semua pertanyaan terlebih dahulu.";
            quizResult.className = "result-box error";
            return;
        }

        quizResult.textContent =
            "Nilai Anda: " + score + "/3. " +
            (score === 3
                ? "Mantap! Semua jawaban benar."
                : "Silakan pelajari kembali materi di atas.");

        quizResult.className =
            score === 3 ? "result-box success" : "result-box";
    });

    resetQuiz.addEventListener("click", function () {
        quizForm.reset();
        quizResult.textContent = "";
        quizResult.className = "result-box";
    });

    // Validasi sederhana form feedback.
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const nama = document.getElementById("nama");
        const email = document.getElementById("email");
        const pesan = document.getElementById("pesan");
        const setuju = document.getElementById("setuju");

        const namaError = document.getElementById("namaError");
        const emailError = document.getElementById("emailError");
        const pesanError = document.getElementById("pesanError");

        namaError.textContent = "";
        emailError.textContent = "";
        pesanError.textContent = "";
        formResult.textContent = "";
        formResult.className = "result-box";

        let valid = true;

        if (nama.value.trim().length < 3) {
            namaError.textContent = "Nama minimal 3 karakter.";
            valid = false;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email.value.trim())) {
            emailError.textContent = "Masukkan format email yang valid.";
            valid = false;
        }

        if (pesan.value.trim().length < 10) {
            pesanError.textContent = "Pesan minimal 10 karakter.";
            valid = false;
        }

        if (!setuju.checked) {
            formResult.textContent =
                "Centang persetujuan sebelum mengirim feedback.";
            formResult.className = "result-box error";
            valid = false;
        }

        if (!valid) {
            return;
        }

        // Project ini bersifat frontend, sehingga data tidak dikirim ke server.
        // JavaScript menampilkan simulasi pesan berhasil.
        formResult.textContent =
            "Terima kasih, " + nama.value.trim() +
            "! Feedback berhasil divalidasi.";
        formResult.className = "result-box success";

        contactForm.reset();
    });
});

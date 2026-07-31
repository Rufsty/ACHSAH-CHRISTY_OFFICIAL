// ===============================
// PASSWORD
// ===============================

const PASSWORD = "12thmay2025"; // Change this to your anniversary date

// ===============================
// ELEMENTS
// ===============================

const unlockBtn = document.getElementById("unlock-btn");
const passwordInput = document.getElementById("password");

const welcomeScreen = document.getElementById("welcome-screen");
const loadingScreen = document.getElementById("loading-screen");
const website = document.getElementById("website");

const errorMessage = document.getElementById("error-message");

const loadingItems = document.querySelectorAll(".loading-item");

const cat = document.getElementById("cat");
const bubble = document.getElementById("speech-bubble");

// ===============================
// SPEECH BUBBLE
// ===============================

const messages = [

    "Hi! 🐾",
    "I've been waiting...",
    "Is that my favorite human? ❤️",
    "Type our anniversary date 😺"

];

let messageIndex = 0;

const bubbleInterval = setInterval(() => {

    messageIndex++;

    if (messageIndex < messages.length) {

        bubble.textContent = messages[messageIndex];

    } else {

        clearInterval(bubbleInterval);

    }

}, 2500);

// ===============================
// CAT REACTION
// ===============================

passwordInput.addEventListener("focus", () => {

    cat.style.transform = "scale(1.08)";

    bubble.textContent = "Hehe... I know you'll get it 😺";

});

passwordInput.addEventListener("blur", () => {

    cat.style.transform = "scale(1)";

});

// ===============================
// ENTER KEY
// ===============================

passwordInput.addEventListener("keypress", function (event) {

    if (event.key === "Enter") {

        unlockWebsite();

    }

});

// ===============================
// BUTTON
// ===============================

unlockBtn.addEventListener("click", unlockWebsite);

// ===============================
// PASSWORD FUNCTION
// ===============================

function unlockWebsite() {

    if (passwordInput.value.trim() === PASSWORD) {

        errorMessage.innerHTML = "";

        bubble.textContent = "YAYYYY!! ❤️";

        cat.style.transform = "scale(1.15) rotate(-8deg)";

        unlockBtn.disabled = true;

        setTimeout(() => {

            welcomeScreen.style.opacity = "0";

            welcomeScreen.style.transition = ".8s";

        }, 500);

        setTimeout(() => {

            welcomeScreen.style.display = "none";

            loadingScreen.style.display = "flex";

            startLoading();

        }, 1400);

    }

    else {

        errorMessage.innerHTML = `
    <strong>Access Denied 🚫</strong><br><br>
    Nice try...<br><br>
    But this place is reserved for someone<br>
    who owns my heart 😾😌
`;

cat.classList.add("shake");



        bubble.textContent = "Hmm... That's not right! 🙀";

        setTimeout(() => {

            cat.classList.remove("shake");

            bubble.textContent = "Try again 😺";

        }, 700);

    }

}

// ===============================
// LOADING
// ===============================

function startLoading() {

    loadingItems.forEach(item => {

        item.style.opacity = "0";

    });

    loadingItems.forEach((item, index) => {

        setTimeout(() => {

            item.style.opacity = "1";

            item.style.transform = "translateY(0)";
            item.style.transition = ".6s";

        }, index * 900);

    });

    setTimeout(() => {

        loadingScreen.style.opacity = "0";
        loadingScreen.style.transition = ".8s";

    }, 4300);

    setTimeout(() => {

        loadingScreen.style.display = "none";

        website.style.display = "block";

        website.style.opacity = "0";

        setTimeout(() => {

            website.style.transition = "1.2s";

            website.style.opacity = "1";

        }, 100);

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    }, 5200);

}

// ===============================
// FLOATING HEARTS
// ===============================

let lastHeartTime = 0;

document.addEventListener("mousemove", (e) => {

    if (website.style.display !== "block") return;

    const now = Date.now();

    // Create hearts only every 180ms
    if (now - lastHeartTime < 180) return;

    lastHeartTime = now;

    for (let i = 0; i < 2; i++) {

        const heart = document.createElement("div");

        heart.className = "floating-heart";

        heart.innerHTML = "❤️";

        heart.style.left = (e.pageX + (i === 0 ? -15 : 15)) + "px";
        heart.style.top = (e.pageY - 10) + "px";

        document.body.appendChild(heart);

        setTimeout(() => {

            heart.remove();

        }, 1000);

    }

});



// ===============================
// SCROLL REVEAL
// ===============================

const observer = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

        }

    });

});

document.querySelectorAll("#about,#gallery,#reasons,#letter").forEach((section) => {

    section.classList.add("hidden");

    observer.observe(section);

});
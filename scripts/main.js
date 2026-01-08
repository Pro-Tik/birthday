// CONFIG: Set your target date here (Year, Month (0-11), Day, Hour, Minute, Second)
const TARGET_DATE = new Date(2026, 0, 9, 0, 0, 0).getTime(); // April 18, 2026

window.addEventListener('load', () => {
    // Dynamic Image Loading
    const photos = [
        "assets/images/photo_1_2026-01-06_22-54-35.jpg",
        "assets/images/photo_2_2026-01-06_22-54-35.jpg",
        "assets/images/photo_3_2026-01-06_22-54-35.jpg",
        
        "assets/images/photo_5_2026-01-06_22-54-35.jpg",
        "assets/images/photo_6_2026-01-06_22-54-35.jpg",
        "assets/images/photo_7_2026-01-06_22-54-35.jpg"
    ];

    // Shuffle and pick 5
    const shuffledPhotos = photos.sort(() => 0.5 - Math.random()).slice(0, 5);

    // Inject into grid
    const gridImages = document.querySelectorAll(".grid-item img");
    gridImages.forEach((img, index) => {
        if (shuffledPhotos[index]) {
            img.src = shuffledPhotos[index];
            img.alt = "Happy Birthday Memory";
        }
    });

    // Countdown Logic
    const countdownContainer = document.getElementById('countdown');

    // Timer Function
    const updateCountdown = () => {
        const now = new Date().getTime();
        const distance = TARGET_DATE - now;

        if (distance < 0) {
            // Timer expired, show main content
            clearInterval(timerInterval);
            countdownContainer.style.opacity = '0';
            setTimeout(() => {
                countdownContainer.style.display = 'none';
                startBirthdayApp(); // Start the main app
            }, 1000);
            return;
        }

        // Calculate time
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Update DOM
        document.getElementById('days').innerText = String(days).padStart(2, '0');
        document.getElementById('hours').innerText = String(hours).padStart(2, '0');
        document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
        document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');
    };

    // Check immediately
    const now = new Date().getTime();
    if (now >= TARGET_DATE) {
        countdownContainer.style.display = 'none';
        startBirthdayApp();
    } else {
        // Start countdown
        updateCountdown(); // Run once immediately
        var timerInterval = setInterval(updateCountdown, 1000);
    }
});

const startBirthdayApp = () => {
    Swal.fire({
        title: 'Do you wanna play music in the background?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
    }).then((result) => {
        if (result.isConfirmed) {
            document.querySelector('.song').play();
            animationTimeline();
        } else {
            animationTimeline();
        }
    });
};

// animation timeline
const animationTimeline = () => {
    // photo grid animation — moved here
    const items = document.querySelectorAll('.grid-item');
    items.forEach((item, index) => {
        const delay = Math.random() * 1000; // random delay up to 1s
        setTimeout(() => {
            item.classList.add('animate-in');
        }, delay);
    });

    // split chars that needs to be animated individually
    const textBoxChars = document.getElementsByClassName("hbd-chatbox")[0];

    textBoxChars.innerHTML = `<span>${textBoxChars.innerHTML
        .split("")
        .join("</span><span>")}</span>`;

    const ideaTextTrans = {
        opacity: 0,
        y: -20,
        rotationX: 5,
        skewX: "15deg"
    }

    const ideaTextTransLeave = {
        opacity: 0,
        y: 20,
        rotationY: 5,
        skewX: "-15deg"
    }

    const tl = new TimelineMax();

    tl.to(".container", 0.6, { visibility: "visible" })
        .from(".one", 0.7, { opacity: 0, y: 10 })
        .from(".two", 0.4, { opacity: 0, y: 10 })
        .to(".one", 0.7, { opacity: 0, y: 10 }, "+=3.5")
        .to(".two", 0.7, { opacity: 0, y: 10 }, "-=1")
        .from(".three", 0.7, { opacity: 0, y: 10 })
        .to(".three", 0.7, { opacity: 0, y: 10 }, "+=3")
        .from(".four", 0.7, { scale: 0.2, opacity: 0 })
        .from(".fake-btn", 0.3, { scale: 0.2, opacity: 0 })
        .staggerTo(".hbd-chatbox span", 1.5, { visibility: "visible" }, 0.05)
        .to(".fake-btn", 0.1, { backgroundColor: "rgb(127, 206, 248)" }, "+=4")
        .to(".four", 0.5, { scale: 0.2, opacity: 0, y: -150 }, "+=1")
        .from(".idea-1", 0.7, ideaTextTrans)
        .to(".idea-1", 0.7, ideaTextTransLeave, "+=2.5")
        .from(".idea-2", 0.7, ideaTextTrans)
        .to(".idea-2", 0.7, ideaTextTransLeave, "+=2.5")
        .from(".idea-3", 0.7, ideaTextTrans)
        .to(".idea-3 strong", 0.5, {
            scale: 1.2,
            x: 10,
            backgroundColor: "rgb(21, 161, 237)",
            color: "#fff",
        })
        .to(".idea-3", 0.7, ideaTextTransLeave, "+=2.5")
        .from(".idea-4", 0.7, ideaTextTrans)
        .to(".idea-4", 0.7, ideaTextTransLeave, "+=2.5")
        .from(".idea-5", 0.7, {
            rotationX: 15,
            rotationZ: -10,
            skewY: "-5deg",
            y: 50,
            z: 10,
            opacity: 0,
        }, "+=1.5")
        .to(".idea-5 span", 0.7, {
            rotation: 90,
            x: 8,
        }, "+=1.4")
        .to(".idea-5", 0.7, { scale: 0.2, opacity: 0 }, "+=2")
        .staggerFrom(".idea-6 span", 0.8, {
            scale: 3,
            opacity: 0,
            rotation: 15,
            ease: Expo.easeOut,
        }, 0.2)
        .staggerTo(".idea-6 span", 0.8, {
            scale: 3,
            opacity: 0,
            rotation: -15,
            ease: Expo.easeOut,
        }, 0.2, "+=1.5")
        .staggerFromTo(".baloons img", 2.5, {
            opacity: 0.9,
            y: 1400,
        }, {
            opacity: 1,
            y: -1000,
        }, 0.2)
        .fromTo(".six", 1, {
            opacity: 0,
            y: 30,
            zIndex: "-1"
        }, {
            opacity: 1,
            y: 0,
            zIndex: "1"
        }, "+=0.5")
        .to(".six", 1, {
            opacity: 0,
            y: 30,
            zIndex: "-1"
        }, "+=12")
        .staggerFrom(".nine p", 1, ideaTextTrans, 1.2)
        .to(".last-smile", 0.5, { rotation: 90 }, "+=1");

    // Restart Animation on click
    const replyBtn = document.getElementById("replay");
    replyBtn.addEventListener("click", () => {
        tl.restart();
    });
}

// javascript
/* =========================================================
   ELEMENTS
========================================================= */

const openingScreen =
    document.getElementById("openingScreen");

const openInvitation =
    document.getElementById("openInvitation");

const weddingMusic =
    document.getElementById("weddingMusic");

const musicButton =
    document.getElementById("musicButton");


/* =========================================================
   OPEN INVITATION
========================================================= */

openInvitation.addEventListener("click", async () => {

    // Start the music after the user's click
    try {

        await weddingMusic.play();

        musicButton.innerText = "❚❚";

    } catch (error) {

        console.log(
            "Music could not start:",
            error
        );

    }

    // Hide opening screen
    openingScreen.classList.add("hidden");

    // Show music button
    musicButton.classList.add("visible");

});


/* =========================================================
   MUSIC BUTTON
========================================================= */

musicButton.addEventListener("click", async () => {

    if (weddingMusic.paused) {

        try {

            await weddingMusic.play();

            musicButton.innerText = "❚❚";

        } catch (error) {

            console.log(
                "Music could not start:",
                error
            );

        }

    } else {

        weddingMusic.pause();

        musicButton.innerText = "♫";

    }

});


/* =========================================================
   COUNTDOWN
========================================================= */

const weddingDate =
    new Date(
        "2026-10-11T20:00:00+03:00"
    ).getTime();


function updateCountdown() {

    const now =
        Date.now();

    const difference =
        weddingDate - now;


    // Wedding date has arrived
    if (difference <= 0) {

        document.getElementById("days").innerText =
            "00";

        document.getElementById("hours").innerText =
            "00";

        document.getElementById("minutes").innerText =
            "00";

        document.getElementById("seconds").innerText =
            "00";

        return;
    }


    const days =
        Math.floor(
            difference /
            (1000 * 60 * 60 * 24)
        );


    const hours =
        Math.floor(
            (difference /
                (1000 * 60 * 60)) % 24
        );


    const minutes =
        Math.floor(
            (difference /
                (1000 * 60)) % 60
        );


    const seconds =
        Math.floor(
            (difference / 1000) % 60
        );


    document.getElementById("days").innerText =
        String(days).padStart(2, "0");


    document.getElementById("hours").innerText =
        String(hours).padStart(2, "0");


    document.getElementById("minutes").innerText =
        String(minutes).padStart(2, "0");


    document.getElementById("seconds").innerText =
        String(seconds).padStart(2, "0");

}


updateCountdown();


setInterval(
    updateCountdown,
    1000
);


/* =========================================================
   SCROLL ANIMATIONS
========================================================= */

const revealElements =
    document.querySelectorAll(".reveal");


const revealObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (
                    entry.isIntersecting
                ) {

                    entry.target.classList.add(
                        "active"
                    );

                }

            });

        },
        {
            threshold: 0.15
        }
    );


revealElements.forEach(
    (element) => {

        revealObserver.observe(
            element
        );

    }
);


/* =========================================================
   WISH FORM
========================================================= */

const wishForm =
    document.getElementById("wishForm");

const formStatus =
    document.getElementById("formStatus");


wishForm.addEventListener(
    "submit",
    async (event) => {

        event.preventDefault();


        const submitButton =
            wishForm.querySelector(
                ".submit-button"
            );


        // Prevent double clicking
        submitButton.disabled =
            true;


        submitButton.innerText =
            "SENDING...";


        formStatus.innerText =
            "";


        const formData =
            new FormData(
                wishForm
            );


        try {

            const response =
                await fetch(
                    wishForm.action,
                    {
                        method: "POST",

                        body: formData,

                        headers: {
                            "Accept":
                                "application/json"
                        }
                    }
                );


            /* =========================
               SUCCESS
            ========================= */

            if (response.ok) {

                formStatus.innerText =
                    "Thank you for your beautiful wish ♡";

                formStatus.classList.add(
                    "success"
                );

                wishForm.reset();

                submitButton.innerText =
                    "SENT ✓";


                setTimeout(() => {

                    submitButton.innerText =
                        "SEND YOUR WISH";

                    submitButton.disabled =
                        false;

                    formStatus.classList.remove(
                        "success"
                    );

                }, 3000);


            }


            /* =========================
               ERROR FROM FORMSPREE
            ========================= */

            else {

                throw new Error(
                    "Form submission failed"
                );

            }


        } catch (error) {

            console.error(
                error
            );


            formStatus.innerText =
                "Something went wrong. Please try again.";


            submitButton.innerText =
                "SEND YOUR WISH";


            submitButton.disabled =
                false;

        }

    }
);

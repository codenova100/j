/* ================================================= */
/*                  GLOBAL VARIABLES                 */
/* ================================================= */

const music =
    document.getElementById(
        "backgroundMusic"
    );

const musicButton =
    document.getElementById(
        "musicButton"
    );


let musicPlaying = false;

let typingStarted = false;


/* ================================================= */
/*                  START SURPRISE                   */
/* ================================================= */

function startSurprise() {

    document
        .getElementById("opening")
        .classList
        .add("hidden");


    document
        .getElementById("birthday")
        .classList
        .remove("hidden");


    /* 🎵 MUSIC */

    music.volume = 0.6;

    music.currentTime = 0;


    const playMusic =
        music.play();


    if (playMusic !== undefined) {

        playMusic
            .then(() => {

                musicPlaying = true;

                musicButton.textContent =
                    "🔊";

            })

            .catch((error) => {

                console.log(
                    "Music could not start:",
                    error
                );

                musicPlaying = false;

                musicButton.textContent =
                    "🎵";

            });

    }


    /* 🎉 CONFETTI */

    startConfetti();

}



/* ================================================= */
/*                  MUSIC CONTROL                    */
/* ================================================= */

function toggleMusic() {

    if (musicPlaying) {

        music.pause();

        musicPlaying = false;

        musicButton.textContent =
            "🎵";

    }

    else {

        music.volume = 0.6;

        music.play()
            .then(() => {

                musicPlaying = true;

                musicButton.textContent =
                    "🔊";

            })
            .catch((error) => {

                console.log(
                    "Music play failed:",
                    error
                );

            });

    }

}



/* ================================================= */
/*                  MEMORY GALLERY                   */
/* ================================================= */

function showMemories() {

    document
        .getElementById("birthday")
        .classList
        .add("hidden");


    document
        .getElementById("memories")
        .classList
        .remove("hidden");


    window.scrollTo(
        0,
        0
    );

}



/* ================================================= */
/*                  MESSAGE SCREEN                   */
/* ================================================= */

function showMessage() {

    document
        .getElementById("memories")
        .classList
        .add("hidden");


    document
        .getElementById("message")
        .classList
        .remove("hidden");


    window.scrollTo(
        0,
        0
    );


    if (!typingStarted) {

        typingStarted = true;

        typeMessage();

    }

}



/* ================================================= */
/*                  TYPING EFFECT                    */
/* ================================================= */

function typeMessage() {

    const message =

        `Happy Birthday! 🎂✨

I hope this new chapter of your life
brings you countless reasons to smile,
beautiful memories to look back on,
and plenty of moments that make you
genuinely happy.

Stay exactly the way you are,
keep chasing the things that make you
excited, and never forget how special
the little moments can be.

Have an absolutely amazing birthday! 💖`;


    const element =
        document.getElementById(
            "typingMessage"
        );


    let index = 0;


    element.innerHTML = "";


    function type() {

        if (index < message.length) {

            if (
                message[index] === "\n"
            ) {

                element.innerHTML +=
                    "<br>";

            }

            else {

                element.innerHTML +=
                    message[index];

            }


            index++;


            setTimeout(
                type,
                35
            );

        }

        else {

            document
                .getElementById(
                    "messageButton"
                )
                .classList
                .remove("hidden");

        }

    }


    type();

}



/* ================================================= */
/*                  CAKE SCREEN                      */
/* ================================================= */

function showCake() {

    document
        .getElementById("message")
        .classList
        .add("hidden");


    document
        .getElementById("cake")
        .classList
        .remove("hidden");


    window.scrollTo(
        0,
        0
    );

}



/* ================================================= */
/*                  BLOW CANDLE                     */
/* ================================================= */

function blowCandle() {

    const flame =
        document.querySelector(
            ".flame"
        );


    flame.style.display =
        "none";


    document
        .getElementById(
            "wishButton"
        )
        .style.display =
        "none";


    document
        .getElementById(
            "wishMessage"
        )
        .textContent =
        "✨ Wish made! May it come true. 💖";


    startConfetti();


    setTimeout(
        showFinal,
        3500
    );

}



/* ================================================= */
/*                  FINAL SCREEN                     */
/* ================================================= */

function showFinal() {

    document
        .getElementById("cake")
        .classList
        .add("hidden");


    document
        .getElementById("final")
        .classList
        .remove("hidden");


    startConfetti();

}



/* ================================================= */
/*                  CONFETTI                        */
/* ================================================= */

function startConfetti() {

    const canvas =
        document.getElementById(
            "confettiCanvas"
        );


    const ctx =
        canvas.getContext(
            "2d"
        );


    canvas.width =
        window.innerWidth;


    canvas.height =
        window.innerHeight;


    const pieces = [];


    const totalPieces = 350;


    for (
        let i = 0;
        i < totalPieces;
        i++
    ) {

        pieces.push({

            x:
                window.innerWidth / 2,

            y:
                window.innerHeight / 2,

            size:
                Math.random() * 9 + 4,

            speedX:
                (Math.random() - 0.5) *
                (Math.random() * 20 + 8),

            speedY:
                (Math.random() - 0.5) *
                (Math.random() * 20 + 8) -
                5,

            gravity:
                0.25,

            rotation:
                Math.random() *
                360,

            rotationSpeed:
                (Math.random() - 0.5) *
                18,

            opacity:
                1,

            color:
                getRandomColor()

        });

    }


    function animate() {

        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );


        pieces.forEach(
            (piece, index) => {

                piece.x +=
                    piece.speedX;

                piece.y +=
                    piece.speedY;

                piece.speedY +=
                    piece.gravity;

                piece.speedX *=
                    0.995;

                piece.rotation +=
                    piece.rotationSpeed;

                piece.opacity -=
                    0.005;


                ctx.save();


                ctx.globalAlpha =
                    Math.max(
                        piece.opacity,
                        0
                    );


                ctx.translate(
                    piece.x,
                    piece.y
                );


                ctx.rotate(
                    piece.rotation *
                    Math.PI /
                    180
                );


                ctx.fillStyle =
                    piece.color;


                ctx.fillRect(

                    -piece.size / 2,

                    -piece.size / 2,

                    piece.size,

                    piece.size * 1.8

                );


                ctx.restore();


                if (

                    piece.opacity <= 0 ||

                    piece.y >
                    canvas.height + 100

                ) {

                    pieces.splice(
                        index,
                        1
                    );

                }

            }
        );


        if (
            pieces.length > 0
        ) {

            requestAnimationFrame(
                animate
            );

        }

    }


    animate();

}



/* ================================================= */
/*                  RANDOM COLORS                   */
/* ================================================= */

function getRandomColor() {

    const colors = [

        "#ff4d9d",

        "#ffcf33",

        "#9b6cff",

        "#4ddcff",

        "#5ff2b2",

        "#ff6b6b",

        "#ffffff",

        "#ff9f43"

    ];


    return colors[
        Math.floor(
            Math.random() *
            colors.length
        )
    ];

}



/* ================================================= */
/*                  WINDOW RESIZE                   */
/* ================================================= */

window.addEventListener(
    "resize",
    () => {

        const canvas =
            document.getElementById(
                "confettiCanvas"
            );


        canvas.width =
            window.innerWidth;


        canvas.height =
            window.innerHeight;

    }
);
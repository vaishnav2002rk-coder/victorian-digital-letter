
document.addEventListener("DOMContentLoaded", () => {

    const chandelier = document.getElementById("chandelier");
// Rain ambience
const rainSound = new Audio("assets/sounds/rain-ambience.mp3");

rainSound.loop = true;
rainSound.volume = 0.12;
rainSound.preload = "auto";

document.addEventListener("click", () => {
    if (rainSound.paused) {
        rainSound.play().catch((error) => {
            console.log("Rain sound could not play:", error);
        });
    }
}, { once: true });
    // Load the chandelier sound
    const chandelierSound = new Audio(
        "assets/sounds/chandelier-creak.mp3"
    );

    chandelierSound.preload = "auto";

    if (chandelier) {

        chandelier.addEventListener("click", () => {

            // Don't interrupt an existing swing
            if (chandelier.classList.contains("is-swinging")) {
                return;
            }

            // Start the existing swing animation
            chandelier.classList.add("is-swinging");

            // Play the metallic creak
            chandelierSound.pause();
chandelierSound.currentTime = 0;

chandelierSound.volume = 0.45;

chandelierSound.play().catch((error) => {
    console.log("Sound could not play:", error);
});

        });

        // Reset after the swing finishes
        
chandelier.addEventListener("animationend", () => {

    // Stop the sound when the swing finishes
    chandelierSound.pause();
    chandelierSound.currentTime = 0;

    // Reset the chandelier
    chandelier.classList.remove("is-swinging");
    });

// Cat sounds and interaction
// Cat sounds and interaction
const cat = document.querySelector(".sleeping-cat");
const catEar = document.querySelector(".cat-ear");

const catPurr = new Audio("assets/sounds/cat-purr.mp3");
const catSleepy = new Audio("assets/sounds/cat-sleepy-meow.mp3");

catPurr.preload = "auto";
catSleepy.preload = "auto";

catPurr.volume = 0.25;
catSleepy.volume = 0.25;

let catClickCount = 0;

function playCatSound(sound, duration) {
    sound.pause();
    sound.currentTime = 0;

    sound.play().then(() => {
        setTimeout(() => {
            sound.pause();
            sound.currentTime = 0;
        }, duration);
    }).catch(error => {
        console.log("Cat sound could not play:", error);
    });
}

if (cat && catEar) {
cat.addEventListener("click", () => {
    catClickCount++;
    

    // Stop BOTH sounds before playing the selected one
    catPurr.pause();
    catPurr.currentTime = 0;

    catSleepy.pause();
    catSleepy.currentTime = 0;

    if (catClickCount % 2 === 1) {
        // Odd clicks: purr only
        playCatSound(catPurr, 1400);

    }
    
    else {
        // Even clicks: sleepy meow only
        playCatSound(catSleepy, 1700);

        catEar.classList.remove("is-flicking");
        void catEar.offsetWidth;
                catEar.classList.add("is-flicking");
    }

}); // closes cat click event

} // closes if (cat && catEar)

// Flower bouquet interaction
// Flower bouquet interaction
const flowerBouquet = document.querySelector(".flower-bouquet");
const roomScene = document.querySelector(".room-scene");

// Flower rustling sound
const flowerSound = new Audio("assets/sounds/flower-rustle.mp3");

flowerSound.preload = "auto";
flowerSound.volume = 0.45;

// All 15 individual leaves
const leafFiles = [
    "leaf-01.png",
    "leaf-02.png",
    "leaf-03.png",
    "leaf-04.png",
    "leaf-05.png",
    "leaf-06.png",
    "leaf-07.png",
    "leaf-08.png",
    "leaf-09.png",
    "leaf-10.png",
    "leaf-11.png",
    "leaf-12.png",
    "leaf-13.png",
    "leaf-14.png",
    "leaf-15.png"
];

// Release falling leaves
function releaseLeaves() {
    if (!roomScene || !flowerBouquet) return;

    const sceneRect = roomScene.getBoundingClientRect();
    const flowerRect = flowerBouquet.getBoundingClientRect();

    // Randomly shuffle the 15 leaves
    const shuffledLeaves = [...leafFiles]
        .sort(() => Math.random() - 0.5);

    // Release 3 or 4 leaves
    const leafCount = 3 + Math.floor(Math.random() * 2);

    for (let i = 0; i < leafCount; i++) {
        const leaf = document.createElement("img");

        leaf.src =
            `assets/flowers/individual-leaves/${shuffledLeaves[i]}`;

        leaf.alt = "";
        leaf.classList.add("falling-leaf");

        // Different starting positions around the bouquet
        const startX =
            flowerRect.left - sceneRect.left +
            Math.random() * flowerRect.width;

        const startY =
            flowerRect.top - sceneRect.top +
            flowerRect.height * (0.35 + Math.random() * 0.4);

        leaf.style.left = `${startX}px`;
        leaf.style.top = `${startY}px`;

        // Different leaf sizes
     leaf.style.width = `${0.8 + Math.random() * 0.6}%`;

        // Different falling speeds
        leaf.style.setProperty(
            "--fall-duration",
            `${0.7 + Math.random() * 0.7}s`
        );

        // Gentle sideways drift
        leaf.style.setProperty(
            "--fall-drift",
            `${-55 + Math.random() * 110}px`
        );

        // Different falling distances
        leaf.style.setProperty(
            "--fall-distance",
            `${sceneRect.height * (0.15 + Math.random() * 0.12)}px`
        );

        // Different rotations
        leaf.style.setProperty(
            "--fall-rotation",
            `${-180 + Math.random() * 360}deg`
        );

        roomScene.appendChild(leaf);

        // Remove leaf after animation
        leaf.addEventListener("animationend", () => {
            leaf.remove();
        });
    }
}

// Bouquet click interaction
if (flowerBouquet) {

    flowerBouquet.addEventListener("click", () => {

        // Play flower rustling sound
        flowerSound.pause();
        flowerSound.currentTime = 0;

        flowerSound.play().catch(error => {
            console.log("Flower sound could not play:", error);
        });

        // Trigger bouquet giggle
        flowerBouquet.classList.remove("is-giggling");
        void flowerBouquet.offsetWidth;
        flowerBouquet.classList.add("is-giggling");

        // Release falling leaves
        releaseLeaves();
    });

    // Reset bouquet after giggle
    flowerBouquet.addEventListener("animationend", () => {
        flowerBouquet.classList.remove("is-giggling");
    });
}
} // closes if (chandelier)
// =================================
// ENVELOPE INTERACTION
// =================================


// =================================
// ENVELOPE INTERACTION
// =================================


// =================================
// ENVELOPE INTERACTION
// =================================

const envelopeTrigger = document.getElementById("envelope-trigger");
const envelopeFocus = document.getElementById("envelope-focus");

const waxSealIntact = envelopeFocus?.querySelector(".wax-seal-intact");
const waxSealCrack = envelopeFocus?.querySelector(".wax-seal-crack-1");
const waxSealBroken = envelopeFocus?.querySelector(".wax-seal-broken");

const envelopeFlap = envelopeFocus?.querySelector(".envelope-flap");
const envelopeOpen = envelopeFocus?.querySelector(".envelope-open");
const envelopeMain = envelopeFocus?.querySelector(".envelope-main");
const letterFolded = envelopeFocus?.querySelector(".letter-folded");
const letterUnfolding = envelopeFocus?.querySelector(".letter-unfolding");
const letterUnfolded = envelopeFocus?.querySelector(".letter-unfolded");
const envelopeFrontPocket = envelopeFocus?.querySelector(".envelope-front-pocket");
let envelopeClickCount = 0;

const interactionGuide = document.getElementById("interaction-guide");
const guideText = document.getElementById("guide-text");

function showGuide(message) {
    if (!interactionGuide || !guideText) return;

    guideText.textContent = message;
    interactionGuide.classList.add("is-visible");
}

function hideGuide() {
    if (!interactionGuide) return;

    interactionGuide.classList.remove("is-visible");
}

if (
    envelopeTrigger &&
    envelopeFocus &&
    waxSealIntact &&
    waxSealCrack &&
    waxSealBroken &&
    envelopeFlap &&
    envelopeOpen &&
    envelopeMain &&
    letterFolded &&
    letterUnfolding &&
    letterUnfolded
) {

    // First and second clicks
    envelopeTrigger.addEventListener("click", () => {

        if (envelopeClickCount === 0) {
            // First click: envelope giggles
            envelopeClickCount = 1;

            envelopeTrigger.classList.remove("is-giggling");
            void envelopeTrigger.offsetWidth;
            envelopeTrigger.classList.add("is-giggling");
        }

        else if (envelopeClickCount === 1) {
            // Second click: foreground envelope appears
            envelopeClickCount = 2;

            envelopeTrigger.style.display = "none";
            envelopeFocus.style.display = "block";
        }

    });

    
// Third, fourth, fifth, sixth, seventh and eighth clicks
envelopeFocus.addEventListener("click", (event) => {

    // Seventh click: begin unfolding
    if (envelopeClickCount === 6 && event.target === letterFolded) {
        event.stopPropagation();
        envelopeClickCount = 7;

        // Hide envelope layers
        envelopeOpen.style.display = "none";
        envelopeFrontPocket.style.display = "none";
        envelopeFlap.style.display = "none";

        const innerLip = envelopeFocus.querySelector(".envelope-inner-lip");
        if (innerLip) innerLip.style.display = "none";

        // Hide folded letter
        letterFolded.style.display = "none";

        // Show unfolding image
       showGuide("tap the letter to unfold "); // Show and animate the unfolding letter
letterUnfolding.style.display = "block";
hideGuide();

letterUnfolding.classList.remove("is-unfolding");
void letterUnfolding.offsetWidth;

letterUnfolding.addEventListener("animationend", () => {
    letterUnfolding.style.display = "none";
    letterUnfolding.classList.remove("is-unfolding");

    // Show the final unfolded letter
    letterUnfolded.style.display = "block";
}, { once: true });

letterUnfolding.classList.add("is-unfolding");
return;
    }

    // Eighth click: show final unfolded letter
    if (envelopeClickCount === 7 && event.target === letterUnfolding) {
        event.stopPropagation();
        envelopeClickCount = 8;
        letterUnfolding.style.display = "none";
        letterUnfolded.style.display = "block";
        return;
        hideGuide();
    }

    // Third click: first crack
    if (envelopeClickCount === 2) {
        envelopeClickCount = 3;
        waxSealIntact.style.display = "none";
        waxSealCrack.style.display = "block";
        showGuide("Tap again to break the wax seal");
    }

    // Fourth click: seal breaks
    else if (envelopeClickCount === 3) {
        envelopeClickCount = 4;
        waxSealCrack.style.display = "none";
        waxSealBroken.style.display = "block";
        showGuide("tap to open yousr envelope");
    }

    // Fifth click: open envelope
    else if (envelopeClickCount === 4) {
        envelopeClickCount = 5;

        waxSealBroken.style.display = "none";
        envelopeMain.style.display = "none";
        envelopeOpen.style.display = "block";
showGuide("Your letter is waiting inside... ");
        const innerLip = envelopeFocus.querySelector(".envelope-inner-lip");
        if (innerLip) innerLip.style.display = "block";

        envelopeFrontPocket.style.display = "block";
        letterFolded.style.display = "block";

        envelopeFlap.style.display = "block";
        envelopeFlap.classList.remove("is-opening");
        void envelopeFlap.offsetWidth;
        envelopeFlap.classList.add("is-opening");
    }

    // Sixth click: extract letter
    else if (envelopeClickCount === 5) {
        envelopeClickCount = 6;

        letterFolded.style.display = "block";
        letterFolded.classList.remove("letter-pop-out");
        void letterFolded.offsetWidth;
        letterFolded.classList.add("letter-pop-out");
        showGuide("Tap the letter to unfold it");
    }

});


    // Reset the initial envelope giggle
    envelopeTrigger.addEventListener("animationend", () => {
        envelopeTrigger.classList.remove("is-giggling");
    });

}
});

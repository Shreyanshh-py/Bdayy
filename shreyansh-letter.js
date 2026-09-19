/* Secret envelope: password gate → envelope opens → letter + heart confetti. */

const lockedState = document.getElementById("lockedState");
const envelope = document.getElementById("envelope");
const unlockForm = document.getElementById("unlockForm");
const passwordInput = document.getElementById("password");
const unlockBtn = document.getElementById("unlockBtn");
const gateError = document.getElementById("gateError");
const letter = document.getElementById("letter");
const lockCard = document.querySelector(".lock-card");

/* Case-insensitive, whitespace-tolerant. */
const PASSWORDS = ["babe", "babee", "mah babe", "my babe"];

const TEASES = [
  "Nope, try what I call you! 🤭",
  "Not it babe... wait, that's a hint 👀",
  "Hmm nope. Think about my texts 🤭💭",
  "Sooo close, try again pretty 🌸",
];
let teaseIndex = 0;

function playSuccessSound() {
  try {
    const audio = new Audio("./Sounds/togepi.mp3");
    audio.preload = "auto";
    audio.volume = 0.7;
    const p = audio.play();
    if (p && typeof p.catch === "function") p.catch(() => {});
  } catch {
    // no-op — sound is a bonus, never a blocker
  }
}

function heartBurst() {
  if (typeof confetti !== "function") return;

  const heart = confetti.shapeFromText
    ? confetti.shapeFromText({ text: "❤️", scalar: 2 })
    : null;

  const base = {
    spread: 80,
    ticks: 200,
    gravity: 0.9,
    scalar: 1.2,
    colors: ["#c24a63", "#e8879b", "#f2c14e", "#6e8b5a", "#fff1e8"],
  };

  confetti({ ...base, particleCount: 90, origin: { x: 0.5, y: 0.55 } });
  setTimeout(
    () => confetti({ ...base, particleCount: 60, angle: 60, origin: { x: 0, y: 0.7 } }),
    180
  );
  setTimeout(
    () => confetti({ ...base, particleCount: 60, angle: 120, origin: { x: 1, y: 0.7 } }),
    320
  );

  if (heart) {
    setTimeout(
      () =>
        confetti({
          particleCount: 26,
          spread: 100,
          scalar: 2,
          shapes: [heart],
          origin: { x: 0.5, y: 0.5 },
        }),
      420
    );
  }
}

function revealLetter() {
  lockedState.classList.add("is-hidden");
  letter.classList.remove("is-hidden");

  if (typeof gsap !== "undefined") {
    gsap.fromTo(
      letter,
      { opacity: 0, y: 40, scale: 0.96, rotate: -1 },
      { opacity: 1, y: 0, scale: 1, rotate: 0, duration: 0.9, ease: "power3.out" }
    );
    gsap.fromTo(
      letter.querySelectorAll(".letter__body p, .letter__closing, .letter__sig"),
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, delay: 0.25, ease: "power2.out" }
    );
  }

  letter.scrollIntoView({ behavior: "smooth", block: "start" });
  heartBurst();
}

function unlock(e) {
  if (e) e.preventDefault();

  const input = passwordInput.value || "";
  const cleanedInput = input.trim().toLowerCase();

  if (!PASSWORDS.includes(cleanedInput)) {
    gateError.textContent = TEASES[teaseIndex % TEASES.length];
    teaseIndex++;

    lockCard.classList.remove("shake");
    void lockCard.offsetWidth; // restart the animation
    lockCard.classList.add("shake");

    passwordInput.focus();
    passwordInput.select();
    return;
  }

  gateError.textContent = "";
  passwordInput.value = "";
  passwordInput.blur();
  unlockBtn.disabled = true;

  playSuccessSound();

  // Open the flap first, then swap in the letter.
  envelope.classList.add("envelope--open");

  if (typeof gsap !== "undefined") {
    gsap.to(lockCard, {
      opacity: 0,
      y: 16,
      scale: 0.97,
      duration: 0.45,
      delay: 0.35,
      ease: "power2.inOut",
    });
    gsap.to(envelope, {
      opacity: 0,
      y: -24,
      scale: 1.08,
      duration: 0.5,
      delay: 0.6,
      ease: "power2.in",
    });
  }

  setTimeout(revealLetter, 1000);
}

unlockForm.addEventListener("submit", unlock);

passwordInput.addEventListener("input", () => {
  if (gateError.textContent) gateError.textContent = "";
});

passwordInput.focus({ preventScroll: true });

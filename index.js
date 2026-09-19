/* Tap a bloom, untie its note. */
const blooms = document.querySelectorAll(".bloom");
const note = document.getElementById("bouquetNote");

function pick(bloom) {
  const text = bloom.dataset.note;
  if (!text || !note) return;

  blooms.forEach((b) => b.classList.remove("is-picked"));
  void bloom.offsetWidth; // restart the wiggle
  bloom.classList.add("is-picked");

  note.classList.add("is-swapping");
  setTimeout(() => {
    note.textContent = text;
    note.classList.remove("is-swapping");
  }, 220);
}

blooms.forEach((bloom) => {
  bloom.addEventListener("click", () => pick(bloom));
  bloom.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      pick(bloom);
    }
  });
});

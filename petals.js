/* Petals and sage leaves drifting down the page. */
(function () {
  const layer = document.getElementById("petals");
  if (!layer) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const petalColors = ["#f7cfd4", "#e8879b", "#f0a3b3", "#ffd9c7"];
  const leafColors = ["#6e8b5a", "#87a06f"];
  const count = window.innerWidth < 560 ? 16 : 28;

  for (let i = 0; i < count; i++) {
    const isLeaf = i % 4 === 0;
    const el = document.createElement("span");
    el.className = isLeaf ? "petal petal--leaf" : "petal";
    el.style.left = Math.random() * 100 + "vw";
    el.style.background = isLeaf
      ? leafColors[Math.floor(Math.random() * leafColors.length)]
      : petalColors[Math.floor(Math.random() * petalColors.length)];

    const scale = 0.6 + Math.random() * 0.9;
    el.style.width = (isLeaf ? 18 : 14) * scale + "px";
    el.style.height = (isLeaf ? 10 : 14) * scale + "px";
    el.style.opacity = (0.45 + Math.random() * 0.4).toFixed(2);
    el.style.animationDuration = 11 + Math.random() * 13 + "s";
    el.style.animationDelay = -Math.random() * 20 + "s";
    layer.appendChild(el);
  }
})();

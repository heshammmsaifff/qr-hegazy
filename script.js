// السنة الحالية في التذييل
document.getElementById("year").textContent = new Date().getFullYear();

// ===== معرض الصور =====
(function () {
  const slides = document.getElementById("slides");
  const dotsBox = document.getElementById("dots");
  if (!slides || !dotsBox) return;

  const imgs = slides.querySelectorAll("img");
  const count = imgs.length;
  if (count < 2) return; // صورة واحدة: لا نقاط ولا تقليب

  const AUTO_MS = 4500; // مدة التقليب التلقائي
  let index = 0;
  let timer = null;

  // ملاحظة: الصفحة RTL، لذا قيم scrollLeft تكون سالبة في المتصفحات الحديثة
  const slideWidth = () => slides.clientWidth;

  function goTo(i) {
    index = (i + count) % count;
    slides.scrollTo({ left: -index * slideWidth(), behavior: "smooth" });
  }

  // إنشاء النقاط
  const dots = [];
  for (let i = 0; i < count; i++) {
    const d = document.createElement("button");
    d.className = "dot" + (i === 0 ? " active" : "");
    d.setAttribute("aria-label", "صورة " + (i + 1));
    d.addEventListener("click", () => {
      goTo(i);
      restart();
    });
    dotsBox.appendChild(d);
    dots.push(d);
  }

  function markActive() {
    dots.forEach((d, i) => d.classList.toggle("active", i === index));
  }

  // تحديث النقطة النشطة أثناء السحب اليدوي
  let scrollDebounce;
  slides.addEventListener("scroll", () => {
    clearTimeout(scrollDebounce);
    scrollDebounce = setTimeout(() => {
      index = Math.round(Math.abs(slides.scrollLeft) / slideWidth());
      markActive();
    }, 80);
  });

  // التقليب التلقائي — يتوقف مؤقتاً عند اللمس أو المرور
  function start() {
    if (timer) return;
    timer = setInterval(() => {
      goTo(index + 1);
      markActive();
    }, AUTO_MS);
  }
  function stop() {
    clearInterval(timer);
    timer = null;
  }
  function restart() {
    stop();
    start();
  }

  slides.addEventListener("pointerdown", stop);
  slides.addEventListener("pointerup", () => setTimeout(start, 1500));
  slides.addEventListener("mouseenter", stop);
  slides.addEventListener("mouseleave", start);

  // لا تقليب تلقائي لمن يفضّل تقليل الحركة
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) start();
})();

// ردّ فعل لمسي بسيط عند الضغط على الأزرار (لو الجهاز بيدعم)
document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    if (navigator.vibrate) navigator.vibrate(10);
  });
});

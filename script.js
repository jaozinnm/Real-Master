// ==============================
// REAL MASTER — JS PREMIUM
// ==============================

document.addEventListener("DOMContentLoaded", () => {

  // ==============================
  // ANO AUTOMATICO
  // ==============================
  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // ==============================
  // WHATSAPP
  // ==============================
  const WA_NUMBER = "5581985754501";

  function waLink(message) {
    return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
  }

  // ==============================
  // DRAWER MOBILE
  // ==============================
  const burger = document.getElementById("burger");
  const drawer = document.getElementById("drawer");
  const closeDrawer = document.getElementById("closeDrawer");
  const overlay = document.getElementById("drawerOverlay");

  function openDrawer() {
    drawer?.classList.add("open");
    overlay?.classList.add("show");
    burger?.setAttribute("aria-expanded", "true");

    document.body.style.overflow = "hidden";
  }

  function hideDrawer() {
    drawer?.classList.remove("open");
    overlay?.classList.remove("show");
    burger?.setAttribute("aria-expanded", "false");

    document.body.style.overflow = "";
  }

  burger?.addEventListener("click", openDrawer);
  closeDrawer?.addEventListener("click", hideDrawer);
  overlay?.addEventListener("click", hideDrawer);

  drawer?.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", hideDrawer);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 780) {
      hideDrawer();
    }
  });

  // ==============================
  // CAROUSEL
  // ==============================
  const carousel = document.getElementById("carousel");
  const slides = Array.from(document.querySelectorAll(".slide"));

  const dotsWrap = document.getElementById("dots");

  const prev = document.getElementById("prev");
  const next = document.getElementById("next");

  let current = 0;
  let timer = null;

  function renderDots() {

    if (!dotsWrap) return;

    dotsWrap.innerHTML = "";

    slides.forEach((_, i) => {

      const dot = document.createElement("button");

      dot.className = "dot";

      if (i === current) {
        dot.classList.add("active");
      }

      dot.setAttribute("aria-label", `Slide ${i + 1}`);

      dot.addEventListener("click", () => {
        goTo(i);
      });

      dotsWrap.appendChild(dot);
    });
  }

  function goTo(index) {

    if (!slides.length) return;

    slides[current].classList.remove("active");

    current = (index + slides.length) % slides.length;

    slides[current].classList.add("active");

    renderDots();

    restartAuto();
  }

  function restartAuto() {

    clearInterval(timer);

    timer = setInterval(() => {
      goTo(current + 1);
    }, 5000);
  }

  prev?.addEventListener("click", () => {
    goTo(current - 1);
  });

  next?.addEventListener("click", () => {
    goTo(current + 1);
  });

  renderDots();

  restartAuto();

  // ==============================
  // SWIPE MOBILE
  // ==============================
  let touchStartX = 0;

  carousel?.addEventListener("touchstart", (e) => {

    touchStartX = e.touches[0].clientX;

  }, { passive: true });

  carousel?.addEventListener("touchend", (e) => {

    const touchEndX = e.changedTouches[0].clientX;

    const distance = touchEndX - touchStartX;

    if (Math.abs(distance) < 40) return;

    if (distance > 0) {
      goTo(current - 1);
    } else {
      goTo(current + 1);
    }

  }, { passive: true });

  // ==============================
  // SEARCH REAL
  // ==============================
  const searchInput = document.getElementById("searchInput");
  const searchBtn = document.getElementById("searchBtn");

  const allProducts = Array.from(document.querySelectorAll(".product"));

  function applySearch() {

    const value = searchInput?.value
      .trim()
      .toLowerCase();

    allProducts.forEach(product => {

      const name = (
        product.dataset.name || ""
      ).toLowerCase();

      const category = (
        product.dataset.cat || ""
      ).toLowerCase();

      const visible =
        name.includes(value) ||
        category.includes(value);

      product.style.display = visible
        ? ""
        : "none";
    });
  }

  function debounce(fn, delay) {

    let timeout;

    return (...args) => {

      clearTimeout(timeout);

      timeout = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  }

  const applySearchDebounced =
    debounce(applySearch, 180);

  searchBtn?.addEventListener("click", applySearch);

  searchInput?.addEventListener(
    "input",
    applySearchDebounced
  );

  searchInput?.addEventListener("keydown", (e) => {

    if (e.key === "Enter") {
      applySearch();
    }

    if (e.key === "Escape") {

      searchInput.value = "";

      applySearch();

      searchInput.blur();
    }
  });

  // ==============================
  // TOAST
  // ==============================
  function toast(message) {

    let toast = document.getElementById("toast");

    if (!toast) {

      toast = document.createElement("div");

      toast.id = "toast";

      toast.className = "toast";

      document.body.appendChild(toast);
    }

    toast.textContent = message;

    toast.classList.add("show");

    clearTimeout(toast._timeout);

    toast._timeout = setTimeout(() => {
      toast.classList.remove("show");
    }, 1800);
  }

  // ==============================
  // BOTAO ADICIONAR
  // ==============================
  const addButtons =
    document.querySelectorAll(".add");

  addButtons.forEach(btn => {

    btn.addEventListener("click", (e) => {

      e.stopPropagation();

      const original = btn.innerText;

      btn.innerText = "Adicionado";

      btn.style.background = "#ff003c";

      btn.style.color = "#fff";

      toast("Produto adicionado");

      setTimeout(() => {

        btn.innerText = original;

        btn.style.background = "";

        btn.style.color = "";

      }, 1600);
    });
  });

  // ==============================
  // MODAL PRODUTO
  // ==============================
  const modal = document.getElementById("modal");

  const modalOverlay =
    document.getElementById("modalOverlay");

  const modalClose =
    document.getElementById("modalClose");

  const modalBack =
    document.getElementById("modalBack");

  const mImg = document.getElementById("mImg");

  const mTitle = document.getElementById("mTitle");

  const mPrice = document.getElementById("mPrice");

  const mWhats = document.getElementById("mWhats");

  function openModal(card) {

    const name =
      card.dataset.name || "Produto";

    const price =
      Number(card.dataset.price || 0);

    const image =
      card.dataset.img || "";

    if (mImg) {

      mImg.src = image;

      mImg.alt = name;
    }

    if (mTitle) {
      mTitle.textContent = name;
    }

    const formattedPrice =
      price > 0
        ? `R$ ${price.toFixed(2).replace(".", ",")}`
        : "Consulte";

    if (mPrice) {
      mPrice.textContent = formattedPrice;
    }

    const message =
      `Olá! Vim pelo site da REAL MASTER e tenho interesse em: ${name}. Valor: ${formattedPrice}. Pode me ajudar?`;

    if (mWhats) {
      mWhats.href = waLink(message);
    }

    modal?.classList.add("show");

    modal?.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";
  }

  function closeModalFunc() {

    modal?.classList.remove("show");

    modal?.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";
  }

  allProducts.forEach(product => {

    product.addEventListener("click", () => {
      openModal(product);
    });
  });

  modalOverlay?.addEventListener(
    "click",
    closeModalFunc
  );

  modalClose?.addEventListener(
    "click",
    closeModalFunc
  );

  modalBack?.addEventListener(
    "click",
    closeModalFunc
  );

  document.addEventListener("keydown", (e) => {

    if (
      e.key === "Escape" &&
      modal?.classList.contains("show")
    ) {
      closeModalFunc();
    }
  });

  // ==============================
  // UPGRADE LINKS WHATSAPP
  // ==============================
  function updateWhatsAppLinks() {

    const selectors = [
      "a.wa-float",
      ".drawer-cta a.btn",
      ".hero a.btn[target='_blank']",
      ".hero-side a.btn[target='_blank']",
      "#contato a.btn[target='_blank']"
    ];

    const links = selectors.flatMap(selector =>
      Array.from(
        document.querySelectorAll(selector)
      )
    );

    const defaultMessage =
      "Olá! Vim pelo site da REAL MASTER e quero atendimento.";

    links.forEach(link => {

      const href =
        link.getAttribute("href") || "";

      if (!href.includes("wa.me/")) return;

      if (!href.includes("?text=")) {

        link.setAttribute(
          "href",
          waLink(defaultMessage)
        );
      }

      link.setAttribute(
        "href",
        href.replace(
          /wa\.me\/\d+/,
          `wa.me/${WA_NUMBER}`
        )
      );
    });
  }

  updateWhatsAppLinks();

});
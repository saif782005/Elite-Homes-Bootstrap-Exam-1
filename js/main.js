(() => {
  "use strict";

  const propertiesToggle = document.getElementById("desktop-properties-toggle");
  const megaMenu = document.getElementById("desktop-mega-menu");
  const desktopDropdown = document.getElementById(
    "desktop-properties-dropdown",
  );

  propertiesToggle?.addEventListener("click", (event) => {
    event.preventDefault();
    const isOpen = !megaMenu.classList.contains("eh-hidden");
    megaMenu.classList.toggle("eh-hidden", isOpen);
    propertiesToggle.classList.toggle("eh-active-link", !isOpen);
  });

  document.addEventListener("click", (event) => {
    if (desktopDropdown && !desktopDropdown.contains(event.target)) {
      megaMenu?.classList.add("eh-hidden");
      propertiesToggle?.classList.remove("eh-active-link");
    }
  });

  const menuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");
  const menuIcon = document.getElementById("menu-icon");
  const closeIcon = document.getElementById("close-icon");

  menuButton?.addEventListener("click", () => {
    const isOpen = !mobileMenu.classList.contains("eh-hidden");
    mobileMenu.classList.toggle("eh-hidden", isOpen);
    menuIcon?.classList.toggle("eh-hidden", !isOpen);
    closeIcon?.classList.toggle("eh-hidden", isOpen);
  });

  document.querySelectorAll(".mobile-dropdown-button").forEach((button) => {
    button.addEventListener("click", () => {
      const submenu = button.nextElementSibling;
      const icon = button.querySelector("i");
      const isOpen = !submenu.classList.contains("eh-hidden");
      submenu.classList.toggle("eh-hidden", isOpen);
      if (icon)
        icon.style.transform = isOpen ? "rotate(0deg)" : "rotate(180deg)";
    });
  });

  document.querySelectorAll(".mobile-nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu?.classList.add("eh-hidden");
      menuIcon?.classList.remove("eh-hidden");
      closeIcon?.classList.add("eh-hidden");
    });
  });

  const tabButtons = document.querySelectorAll(".tab-button");
  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedId = button.getAttribute("data-tab");
      document.querySelectorAll(".tab-content").forEach((panel) => {
        const selected = panel.id === selectedId;
        panel.classList.toggle("active", selected);
        panel.style.display = selected ? "block" : "none";
      });
      tabButtons.forEach((tab) => {
        tab.classList.remove(
          "eh-text-violet-600",
          "eh-border-violet-600",
          "eh-bg-violet-50",
        );
        tab.classList.add("eh-text-gray-600", "eh-border-transparent");
      });
      button.classList.remove("eh-text-gray-600", "eh-border-transparent");
      button.classList.add(
        "eh-text-violet-600",
        "eh-border-violet-600",
        "eh-bg-violet-50",
      );
    });
  });

  let slideIndex = 0;
  const slider = document.getElementById("testimonialSlider");
  const dots = document.querySelectorAll(".carousel-dot");
  const updateSlider = () => {
    if (!slider || !dots.length) return;
    slideIndex = (slideIndex + dots.length) % dots.length;
    slider.style.transform = `translateX(-${slideIndex * 100}%)`;
    dots.forEach((dot, index) => {
      dot.classList.toggle("eh-bg-white", index === slideIndex);
      dot.classList.toggle("eh-bg-white-30", index !== slideIndex);
      dot.classList.remove("eh-bg-white-50");
    });
  };
  document.getElementById("prev-testimonial")?.addEventListener("click", () => {
    slideIndex -= 1;
    updateSlider();
  });
  document.getElementById("next-testimonial")?.addEventListener("click", () => {
    slideIndex += 1;
    updateSlider();
  });
  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      slideIndex = Number(dot.getAttribute("data-slide")) || 0;
      updateSlider();
    });
  });
  if (dots.length)
    window.setInterval(() => {
      slideIndex += 1;
      updateSlider();
    }, 5000);

  document.querySelectorAll(".faq-toggle").forEach((button) => {
    button.addEventListener("click", () => {
      const number = button.getAttribute("data-faq");
      const content = document.getElementById(`faq-content-${number}`);
      const icon = document.getElementById(`faq-icon-${number}`);
      if (!content) return;
      const willOpen = !content.classList.contains("active");
      document.querySelectorAll(".faq-content").forEach((item) => {
        item.classList.remove("active");
        item.style.height = "0px";
      });
      document
        .querySelectorAll('[id^="faq-icon-"]')
        .forEach((item) => item.classList.remove("eh-rotate-180"));
      if (willOpen) {
        content.classList.add("active");
        content.style.height = `${content.scrollHeight}px`;
        icon?.classList.add("eh-rotate-180");
        content.addEventListener(
          "transitionend",
          () => {
            if (content.classList.contains("active"))
              content.style.height = "auto";
          },
          { once: true },
        );
      }
    });
  });

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");
      if (!targetId || targetId === "#") return;
      const target = document.querySelector(targetId);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");
  const updateActiveLink = () => {
    const currentPosition = window.scrollY + 100;
    let activeId = "";
    sections.forEach((section) => {
      if (
        currentPosition >= section.offsetTop &&
        currentPosition < section.offsetTop + section.offsetHeight
      ) {
        activeId = section.id;
      }
    });
    navLinks.forEach((link) => {
      link.classList.toggle(
        "eh-active-link",
        link.getAttribute("href") === `#${activeId}`,
      );
    });
  };
  window.addEventListener("scroll", updateActiveLink, { passive: true });
  updateActiveLink();
})();

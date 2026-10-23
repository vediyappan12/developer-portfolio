// Portfolio interactions — vanilla JavaScript only.
const menuToggle = document.querySelector("#menuToggle");
const navMenu = document.querySelector("#navMenu");

menuToggle.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// Reveal content as it enters the viewport.
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((element, index) => {
  element.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;
  revealObserver.observe(element);
});

// Subtle cursor light on desktop.
const cursorGlow = document.querySelector(".cursor-glow");
const heroVisual = document.querySelector(".hero-visual");
const supportsFinePointer = window.matchMedia("(pointer: fine)").matches;
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (supportsFinePointer && !prefersReducedMotion) {
  window.addEventListener("pointermove", (event) => {
    cursorGlow.style.opacity = "1";
    cursorGlow.style.left = `${event.clientX}px`;
    cursorGlow.style.top = `${event.clientY}px`;
  });
  document.addEventListener("pointerleave", () => cursorGlow.style.opacity = "0");

  heroVisual.addEventListener("pointermove", (event) => {
    const bounds = heroVisual.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;

    heroVisual.style.setProperty("--tilt-x", `${x * 10}deg`);
    heroVisual.style.setProperty("--tilt-y", `${y * -10}deg`);
  });

  heroVisual.addEventListener("pointerleave", () => {
    heroVisual.style.setProperty("--tilt-x", "0deg");
    heroVisual.style.setProperty("--tilt-y", "0deg");
  });

  document.querySelectorAll(".student-dashboard").forEach((dashboard) => {
    const art = dashboard.closest(".student-project-art");

    art.addEventListener("pointermove", (event) => {
      const bounds = art.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;

      dashboard.style.setProperty("--dashboard-tilt-x", `${x * 8}deg`);
      dashboard.style.setProperty("--dashboard-tilt-y", `${y * -8}deg`);
    });

    art.addEventListener("pointerleave", () => {
      dashboard.style.setProperty("--dashboard-tilt-x", "0deg");
      dashboard.style.setProperty("--dashboard-tilt-y", "0deg");
    });
  });

  document.querySelectorAll("[data-design-stage]").forEach((stage) => {
    const browser = stage.querySelector(".design-browser");

    stage.addEventListener("pointermove", (event) => {
      const bounds = stage.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;

      browser.style.setProperty("--design-tilt-x", `${x * 7}deg`);
      browser.style.setProperty("--design-tilt-y", `${y * -7}deg`);
    });

    stage.addEventListener("pointerleave", () => {
      browser.style.setProperty("--design-tilt-x", "0deg");
      browser.style.setProperty("--design-tilt-y", "0deg");
    });
  });
}

const designViews = {
  portfolio: {
    url: "vediyappan.dev",
    brand: "VP.",
    overline: "INDEPENDENT DEVELOPER · 2026",
    title: ["Ideas into", "experiences."],
    description: "Digital work with a little extra dimension.",
    cta: "EXPLORE THE WORK",
    bottom: "DESIGN WITH INTENTION — BUILT FOR THE WEB"
  },
  product: {
    url: "northstar.product",
    brand: "NORTHSTAR",
    overline: "TOOLS FOR YOUR NEXT BIG IDEA",
    title: ["Make room", "to create."],
    description: "A calmer way to bring good ideas to life.",
    cta: "DISCOVER THE PRODUCT",
    bottom: "LESS FRICTION — MORE ROOM TO CREATE"
  },
  studio: {
    url: "formandfield.studio",
    brand: "FORM / FIELD",
    overline: "CREATIVE STUDIO · TAMIL NADU",
    title: ["Made with", "intention."],
    description: "Distinctive digital stories, thoughtfully made.",
    cta: "MEET THE STUDIO",
    bottom: "BOLD THINKING — HUMAN BY DESIGN"
  }
};

document.querySelectorAll("[data-design-stage]").forEach((stage) => {
  stage.closest(".design-lab-layout").querySelectorAll("[data-design-view]").forEach((button) => {
    button.addEventListener("click", () => {
      const design = designViews[button.dataset.designView];
      if (!design) return;

      stage.dataset.theme = button.dataset.designView;
      stage.closest(".design-lab-layout").querySelectorAll("[data-design-view]").forEach((tab) => {
        const isActive = tab === button;
        tab.classList.toggle("is-active", isActive);
        tab.setAttribute("aria-pressed", String(isActive));
      });

      stage.querySelector("[data-design-url]").textContent = design.url;
      stage.querySelector("[data-design-brand]").textContent = design.brand;
      stage.querySelector("[data-design-overline]").textContent = design.overline;
      const previewTitle = stage.querySelector("[data-design-title]");
      previewTitle.firstChild.textContent = design.title[0];
      previewTitle.querySelector("em").textContent = design.title[1];
      stage.querySelector("[data-design-description]").textContent = design.description;
      stage.querySelector("[data-design-cta]").firstChild.textContent = design.cta;
      stage.querySelector("[data-design-bottom]").textContent = design.bottom;
    });
  });
});

const dashboardViews = {
  Overview: {
    students: ["STUDENTS", "1,284"],
    attendance: ["ATTENDANCE", "94.8%"],
    classes: ["CLASSES", "36"],
    detail: "Everything is on track."
  },
  Students: {
    students: ["ACTIVE STUDENTS", "1,284"],
    attendance: ["NEW THIS TERM", "48"],
    classes: ["GRADE LEVELS", "12"],
    detail: "Student records are organized by grade."
  },
  Attendance: {
    students: ["PRESENT TODAY", "1,217"],
    attendance: ["ATTENDANCE RATE", "94.8%"],
    classes: ["NEEDS FOLLOW-UP", "17"],
    detail: "Attendance is updated for today's classes."
  },
  Reports: {
    students: ["REPORTS READY", "08"],
    attendance: ["THIS TERM", "Q2"],
    classes: ["LAST UPDATED", "TODAY"],
    detail: "Term summaries are ready to review."
  }
};

document.querySelectorAll("[data-student-dashboard]").forEach((dashboard) => {
  const title = dashboard.querySelector("[data-dashboard-title]");
  const detail = dashboard.querySelector("[data-dashboard-detail]");

  dashboard.querySelectorAll("[data-dashboard-view]").forEach((button) => {
    button.addEventListener("click", () => {
      const view = dashboardViews[button.dataset.dashboardView];
      if (!view) return;

      dashboard.querySelectorAll("[data-dashboard-view]").forEach((tab) => {
        const isActive = tab === button;
        tab.classList.toggle("is-active", isActive);
        tab.setAttribute("aria-pressed", String(isActive));
      });

      title.textContent = button.dataset.dashboardView;
      detail.textContent = view.detail;

      Object.entries(view).forEach(([key, value]) => {
        if (key === "detail") return;
        dashboard.querySelector(`[data-stat-label="${key}"]`).textContent = value[0];
        dashboard.querySelector(`[data-stat-value="${key}"]`).textContent = value[1];
      });
    });
  });
});

const EMAILJS_SERVICE_ID = "service_im5r61h";
const EMAILJS_TEMPLATE_ID = "template_i3hszes";
const EMAILJS_PUBLIC_KEY = "G_tdLhI5pW8ma-dAM";
const PORTFOLIO_EMAIL = "vediyappanbusiness77@gmail.com";
const contactForm = document.querySelector("#contactForm");
const contactFormStatus = document.querySelector("#contactFormStatus");
const contactSubmit = contactForm.querySelector(".contact-submit");

contactForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!contactForm.reportValidity()) return;

  const formData = new FormData(contactForm);
  const name = String(formData.get("name")).trim();
  const email = String(formData.get("email")).trim();
  const phone = String(formData.get("phone")).trim();
  const message = String(formData.get("message")).trim();
  const requiredFields = [...contactForm.querySelectorAll("[required]")];
  requiredFields.forEach((field) => {
    field.setCustomValidity(field.value.trim() ? "" : "Please complete this field.");
  });
  if (!contactForm.reportValidity()) return;

  contactFormStatus.hidden = false;
  contactFormStatus.classList.remove("is-success", "is-error");

  if (
    EMAILJS_SERVICE_ID.startsWith("YOUR_") ||
    EMAILJS_TEMPLATE_ID.startsWith("YOUR_") ||
    EMAILJS_PUBLIC_KEY.startsWith("YOUR_")
  ) {
    contactFormStatus.textContent = "Email sending is not connected yet. Add your EmailJS Service ID, Template ID, and Public Key in script.js.";
    contactFormStatus.classList.add("is-error");
    return;
  }

  if (!window.emailjs) {
    contactFormStatus.textContent = "The email service could not load. Check your internet connection and try again.";
    contactFormStatus.classList.add("is-error");
    return;
  }

  contactSubmit.disabled = true;
  contactSubmit.textContent = "Sending...";
  contactFormStatus.textContent = "Sending your message...";

  const formattedMessage = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Mobile Number: ${phone}`,
    "",
    "Message:",
    message
  ].join("\n");

  try {
    await window.emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      {
        to_email: PORTFOLIO_EMAIL,
        from_name: name,
        reply_to: email,
        phone_number: phone,
        message: formattedMessage
      },
      { publicKey: EMAILJS_PUBLIC_KEY }
    );

    contactForm.reset();
    contactFormStatus.textContent = "Message sent successfully. Thank you for reaching out!";
    contactFormStatus.classList.add("is-success");
  } catch (error) {
    const emailJsError = error && typeof error === "object" ? error : {};
    const errorStatus = Number(emailJsError.status) || 0;
    const errorText = typeof emailJsError.text === "string" ? emailJsError.text : "";
    console.error("EmailJS contact form submission failed:", {
      status: errorStatus,
      message: errorText || String(error)
    });

    if (/service id not found/i.test(errorText)) {
      contactFormStatus.textContent = "EmailJS could not find the configured Service ID. Check EMAILJS_SERVICE_ID in script.js against the Service ID shown in your EmailJS dashboard.";
    } else if (/template id not found/i.test(errorText)) {
      contactFormStatus.textContent = "EmailJS could not find the configured Template ID. Check EMAILJS_TEMPLATE_ID in script.js against the Template ID shown in your EmailJS dashboard.";
    } else if (errorStatus === 403) {
      contactFormStatus.textContent = "EmailJS denied this request. Check your EmailJS account security settings and allow this website's domain.";
    } else {
      contactFormStatus.textContent = `Your message could not be sent${errorStatus ? ` (EmailJS error ${errorStatus})` : ""}. Please try again or email vediyappanbusiness77@gmail.com directly.`;
    }
    contactFormStatus.classList.add("is-error");
  } finally {
    contactSubmit.disabled = false;
    contactSubmit.innerHTML = 'Send mail <span>↗</span>';
  }
});

// Current year in footer.
document.querySelector("#year").textContent = new Date().getFullYear();

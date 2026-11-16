(function () {
  "use strict";

  var config = window.SITE_CONFIG || {};
  var socialIcons = {
    youtube:
      '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>',
    facebook:
      '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>',
    instagram:
      '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98C.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.2-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>',
    tiktok:
      '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>',
    x:
      '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/></svg>'
  };

  var socialLabels = {
    youtube: "YouTube",
    facebook: "Facebook",
    instagram: "Instagram",
    tiktok: "TikTok",
    x: "X (Twitter)"
  };

  var contactIcons = {
    address:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></svg>',
    phone:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L8 9.73a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92Z"/></svg>',
    email:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="m3.5 7 8.5 6 8.5-6"/></svg>'
  };

  function getSiteName() {
    var name = typeof config.siteName === "string" ? config.siteName.trim() : "";
    return name || "सुरेन्द्र कुमार सिग्देल";
  }

  function resolveAsset(path) {
    if (!path) {
      return "";
    }

    try {
      var url = new URL(path, document.baseURI);
      return url.href;
    } catch (error) {
      return path;
    }
  }

  function normaliseSocialUrl(value) {
    if (typeof value !== "string" || !value.trim()) {
      return "";
    }

    try {
      var url = new URL(value.trim());
      if (url.protocol === "http:" || url.protocol === "https:") {
        return url.href;
      }
    } catch (error) {
      return "";
    }

    return "";
  }

  function getSocialLinks() {
    var links = [];
    var social = config.social || {};

    Object.keys(socialLabels).forEach(function (key) {
      var href = normaliseSocialUrl(social[key]);
      if (href) {
        links.push({ key: key, href: href, label: socialLabels[key] });
      }
    });

    return links;
  }

  function setSiteName() {
    var name = getSiteName();
    document.querySelectorAll("[data-site-name]").forEach(function (element) {
      element.textContent = name;
    });
  }

  function setCurrentYear() {
    var year = String(new Date().getFullYear());
    document.querySelectorAll("[data-current-year]").forEach(function (element) {
      element.textContent = year;
    });
  }

  function setProfilePhoto() {
    var photo = document.querySelector("[data-profile-photo]");
    if (!photo) {
      return;
    }

    if (config.photo) {
      photo.src = resolveAsset(config.photo);
    }

    if (config.photoAlt) {
      photo.alt = config.photoAlt;
    }
  }

  function setIntroduction() {
    var intro = document.querySelector("[data-hero-intro]");
    if (!intro) {
      return;
    }

    var text = typeof config.intro === "string" ? config.intro.trim() : "";

    if (text) {
      intro.textContent = text;
      intro.hidden = false;
    } else {
      intro.hidden = true;
    }
  }

  function setChannelLink() {
    document.querySelectorAll("[data-youtube-channel]").forEach(function (link) {
      var url = normaliseSocialUrl((config.social || {}).youtube);
      if (url) {
        link.href = url;
        link.hidden = false;
      } else {
        link.hidden = true;
      }
    });
  }

  function renderSocialLinks() {
    var links = getSocialLinks();

    document.querySelectorAll("[data-social-links]").forEach(function (container) {
      var isFooter = container.getAttribute("data-social-style") === "footer";
      container.textContent = "";

      if (!links.length) {
        if (isFooter) {
          var note = document.createElement("p");
          note.className = "footer-social-note";
          note.textContent = "सामाजिक सञ्जाल लिङ्कहरू अझै थपिएका छैनन्।";
          container.appendChild(note);
        } else {
          var empty = document.createElement("div");
          empty.className = "empty-state";
          empty.innerHTML =
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg><p>सामाजिक सञ्जाल लिङ्कहरू अझै थपिएका छैनन्।</p>';
          container.appendChild(empty);
        }
        return;
      }

      links.forEach(function (item) {
        var link = document.createElement("a");
        link.href = item.href;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.title = item.label;

        if (isFooter) {
          link.setAttribute("aria-label", item.label + " (नयाँ ट्याबमा खुल्छ)");
          link.innerHTML = socialIcons[item.key];
        } else {
          link.className = "social-card";
          var icon = document.createElement("span");
          icon.className = "social-icon";
          icon.innerHTML = socialIcons[item.key];
          var label = document.createElement("span");
          label.className = "social-label";
          label.textContent = item.label;
          link.appendChild(icon);
          link.appendChild(label);
        }

        container.appendChild(link);
      });
    });
  }

  function renderContact() {
    var contact = config.contact || {};
    var container = document.querySelector("[data-contact-info]");

    if (!container) {
      return;
    }

    var block = container.closest("[data-contact-block]");
    var list = document.createElement("ul");
    list.className = "footer-contact";

    if (typeof contact.address === "string" && contact.address.trim()) {
      var addressItem = document.createElement("li");
      addressItem.innerHTML = contactIcons.address;
      var address = document.createElement("span");
      address.textContent = contact.address.trim();
      addressItem.appendChild(address);
      list.appendChild(addressItem);
    }

    if (typeof contact.phone === "string" && contact.phone.trim()) {
      var phoneItem = document.createElement("li");
      phoneItem.innerHTML = contactIcons.phone;
      var phoneContent = document.createElement("div");
      var phone = document.createElement("a");
      phone.href = "tel:" + contact.phone.replace(/[^\d+]/g, "");
      phone.textContent = contact.phone.trim();
      phoneContent.appendChild(phone);

      if (typeof contact.phoneNote === "string" && contact.phoneNote.trim()) {
        var phoneNote = document.createElement("span");
        phoneNote.className = "footer-contact-note";
        phoneNote.textContent = contact.phoneNote.trim();
        phoneContent.appendChild(phoneNote);
      }

      phoneItem.appendChild(phoneContent);
      list.appendChild(phoneItem);
    }

    if (typeof contact.email === "string" && contact.email.trim()) {
      var emailItem = document.createElement("li");
      emailItem.innerHTML = contactIcons.email;
      var email = document.createElement("a");
      email.href = "mailto:" + contact.email.trim();
      email.textContent = contact.email.trim();
      emailItem.appendChild(email);
      list.appendChild(emailItem);
    }

    if (!list.children.length) {
      if (block) {
        block.hidden = true;
      }
      return;
    }

    container.appendChild(list);
  }

  function initNavigation() {
    var toggle = document.querySelector(".nav-toggle");
    var nav = document.getElementById("site-nav");

    if (!toggle || !nav) {
      return;
    }

    function setOpen(isOpen) {
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.setAttribute("aria-label", isOpen ? "मेनु बन्द गर्नुहोस्" : "मेनु खोल्नुहोस्");
      nav.classList.toggle("is-open", isOpen);
    }

    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });

    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) {
        setOpen(false);
      }
    });

    document.addEventListener("click", function (event) {
      if (
        toggle.getAttribute("aria-expanded") === "true" &&
        !nav.contains(event.target) &&
        !toggle.contains(event.target)
      ) {
        setOpen(false);
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setOpen(false);
        toggle.focus();
      }
    });

    var desktopQuery = window.matchMedia("(min-width: 768px)");
    function handleDesktopChange(event) {
      if (event.matches) {
        setOpen(false);
      }
    }

    if (desktopQuery.addEventListener) {
      desktopQuery.addEventListener("change", handleDesktopChange);
    } else {
      desktopQuery.addListener(handleDesktopChange);
    }
  }

  document.documentElement.classList.add("js");
  setSiteName();
  setCurrentYear();
  setProfilePhoto();
  setIntroduction();
  setChannelLink();
  renderSocialLinks();
  renderContact();
  initNavigation();
})();

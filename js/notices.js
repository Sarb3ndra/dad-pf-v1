(function () {
  "use strict";

  var statusElement = document.querySelector("[data-notices-status]");
  var upcomingSection = document.querySelector("[data-upcoming-section]");
  var upcomingGrid = document.querySelector("[data-upcoming-grid]");
  var pastSection = document.querySelector("[data-past-section]");
  var pastGrid = document.querySelector("[data-past-grid]");
  var emptyState = document.querySelector("[data-notices-empty]");

  if (!upcomingGrid || !pastGrid) {
    return;
  }

  var nepaliDigits = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];
  var nepaliMonths = [
    "जनवरी",
    "फेब्रुअरी",
    "मार्च",
    "अप्रिल",
    "मे",
    "जुन",
    "जुलाई",
    "अगस्ट",
    "सेप्टेम्बर",
    "अक्टोबर",
    "नोभेम्बर",
    "डिसेम्बर"
  ];

  var calendarIcon =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><rect x="3" y="4.5" width="18" height="16" rx="2.5"/><path d="M8 2.5v4M16 2.5v4M3 9.5h18"/></svg>';
  var externalIcon =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M14 3h7v7M21 3l-9 9"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>';

  function pad(value) {
    return String(value).padStart(2, "0");
  }

  function getTodayIso() {
    var today = new Date();
    return today.getFullYear() + "-" + pad(today.getMonth() + 1) + "-" + pad(today.getDate());
  }

  function isValidIsoDate(value) {
    if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      return false;
    }

    var parts = value.split("-").map(Number);
    var date = new Date(parts[0], parts[1] - 1, parts[2]);
    return (
      date.getFullYear() === parts[0] &&
      date.getMonth() === parts[1] - 1 &&
      date.getDate() === parts[2]
    );
  }

  function toNepaliDigits(value) {
    return String(value).replace(/\d/g, function (digit) {
      return nepaliDigits[Number(digit)];
    });
  }

  function formatDate(isoDate) {
    var parts = isoDate.split("-");
    var monthIndex = Number(parts[1]) - 1;

    if (parts.length !== 3 || !nepaliMonths[monthIndex]) {
      return isoDate;
    }

    return (
      toNepaliDigits(Number(parts[2])) +
      " " +
      nepaliMonths[monthIndex] +
      " " +
      toNepaliDigits(parts[0])
    );
  }

  function resolveAsset(path) {
    if (typeof path !== "string" || !path.trim()) {
      return "";
    }

    try {
      var url = new URL(path.trim(), document.baseURI);
      return url.protocol === "http:" || url.protocol === "https:" ? url.href : "";
    } catch (error) {
      return "";
    }
  }

  function resolveLink(value) {
    if (typeof value !== "string" || !value.trim()) {
      return "";
    }

    try {
      var url = new URL(value.trim());
      return url.protocol === "http:" || url.protocol === "https:" ? url.href : "";
    } catch (error) {
      return "";
    }
  }

  function normaliseNotice(raw) {
    if (!raw || typeof raw !== "object") {
      return null;
    }

    var title = typeof raw.title === "string" ? raw.title.trim() : "";
    var date = typeof raw.date === "string" ? raw.date.trim() : "";

    if (!title || !isValidIsoDate(date)) {
      return null;
    }

    return {
      title: title,
      date: date,
      dateNepali: typeof raw.dateNepali === "string" ? raw.dateNepali.trim() : "",
      description: typeof raw.description === "string" ? raw.description.trim() : "",
      image: resolveAsset(raw.image),
      imageAlt: typeof raw.imageAlt === "string" ? raw.imageAlt.trim() : "",
      link: resolveLink(raw.link),
      linkLabel: typeof raw.linkLabel === "string" ? raw.linkLabel.trim() : ""
    };
  }

  function createNoticeCard(notice, isPast) {
    var article = document.createElement("article");
    article.className = "notice-card" + (isPast ? " notice-card--past" : "");

    if (notice.image) {
      var image = document.createElement("img");
      image.className = "notice-image";
      image.src = notice.image;
      image.alt = notice.imageAlt || notice.title;
      image.width = 640;
      image.height = 360;
      image.loading = "lazy";
      image.decoding = "async";
      article.appendChild(image);
    }

    var body = document.createElement("div");
    body.className = "notice-body";

    var meta = document.createElement("div");
    meta.className = "notice-meta";

    var dateWrap = document.createElement("span");
    dateWrap.className = "notice-date";
    dateWrap.innerHTML = calendarIcon;

    var time = document.createElement("time");
    time.dateTime = notice.date;
    time.textContent = notice.dateNepali || formatDate(notice.date);
    time.title = formatDate(notice.date);
    dateWrap.appendChild(time);
    meta.appendChild(dateWrap);

    if (isPast) {
      var badge = document.createElement("span");
      badge.className = "notice-badge";
      badge.textContent = "गत";
      meta.appendChild(badge);
    }

    var heading = document.createElement("h3");
    heading.textContent = notice.title;

    body.appendChild(meta);
    body.appendChild(heading);

    if (notice.description) {
      var description = document.createElement("p");
      description.className = "notice-description";
      description.textContent = notice.description;
      body.appendChild(description);
    }

    if (notice.link) {
      var link = document.createElement("a");
      link.className = "notice-link";
      link.href = notice.link;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = notice.linkLabel || "थप जानकारी";
      link.insertAdjacentHTML("beforeend", externalIcon);
      body.appendChild(link);
    }

    article.appendChild(body);
    return article;
  }

  function renderGroup(notices, grid, isPast) {
    var fragment = document.createDocumentFragment();

    notices.forEach(function (notice) {
      fragment.appendChild(createNoticeCard(notice, isPast));
    });

    grid.textContent = "";
    grid.appendChild(fragment);
  }

  function showError() {
    if (statusElement) {
      statusElement.hidden = false;
      statusElement.classList.add("notice-status--error");
      statusElement.textContent = "सूचनाहरू लोड गर्न सकिएन। कृपया पछि पुनः प्रयास गर्नुहोस्।";
    }
    if (upcomingSection) {
      upcomingSection.hidden = true;
    }
    if (pastSection) {
      pastSection.hidden = true;
    }
  }

  function renderNotices(rawNotices) {
    var today = getTodayIso();
    var notices = rawNotices.map(normaliseNotice).filter(Boolean);
    var upcoming = notices.filter(function (notice) {
      return notice.date >= today;
    });
    var past = notices.filter(function (notice) {
      return notice.date < today;
    });

    upcoming.sort(function (a, b) {
      return a.date.localeCompare(b.date);
    });
    past.sort(function (a, b) {
      return b.date.localeCompare(a.date);
    });

    renderGroup(upcoming, upcomingGrid, false);
    renderGroup(past, pastGrid, true);

    if (upcomingSection) {
      upcomingSection.hidden = upcoming.length === 0;
    }
    if (pastSection) {
      pastSection.hidden = past.length === 0;
    }
    if (emptyState) {
      emptyState.hidden = notices.length !== 0;
    }
    if (statusElement) {
      statusElement.hidden = true;
      statusElement.classList.remove("notice-status--error");
    }
  }

  var noticesUrl = new URL("data/notices.json", document.baseURI).href;

  if (statusElement) {
    statusElement.hidden = false;
    statusElement.textContent = "सूचनाहरू लोड हुँदैछन्…";
  }

  fetch(noticesUrl, { cache: "no-cache" })
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Notices request failed with status " + response.status);
      }
      return response.json();
    })
    .then(function (data) {
      var notices = Array.isArray(data) ? data : data && Array.isArray(data.notices) ? data.notices : [];
      renderNotices(notices);
    })
    .catch(function (error) {
      console.error("Unable to load notices:", error);
      showError();
    });
})();

(function () {
  "use strict";

  var grid = document.querySelector("[data-video-grid]");
  var emptyState = document.querySelector("[data-video-empty]");

  if (!grid) {
    return;
  }

  var videos = Array.isArray(window.SITE_VIDEOS) ? window.SITE_VIDEOS : [];

  function getVideoId(video) {
    if (!video || typeof video !== "object") {
      return "";
    }

    if (typeof video.id === "string" && /^[A-Za-z0-9_-]{11}$/.test(video.id.trim())) {
      return video.id.trim();
    }

    if (typeof video.url !== "string" || !video.url.trim()) {
      return "";
    }

    try {
      var url = new URL(video.url.trim());
      var host = url.hostname.replace(/^www\./, "");
      var id = "";

      if (host === "youtu.be") {
        id = url.pathname.split("/").filter(Boolean)[0] || "";
      } else if (host === "youtube.com" || host === "m.youtube.com" || host === "music.youtube.com") {
        if (url.searchParams.get("v")) {
          id = url.searchParams.get("v");
        } else {
          var parts = url.pathname.split("/").filter(Boolean);
          if (["shorts", "embed", "live"].indexOf(parts[0]) !== -1) {
            id = parts[1] || "";
          }
        }
      }

      return /^[A-Za-z0-9_-]{11}$/.test(id) ? id : "";
    } catch (error) {
      return "";
    }
  }

  function createPlayBadge() {
    var badge = document.createElement("span");
    badge.className = "play-badge";
    badge.setAttribute("aria-hidden", "true");
    badge.innerHTML =
      '<svg viewBox="0 0 24 24" fill="currentColor" focusable="false"><path d="M8 5.14v13.72a1 1 0 0 0 1.5.86l11-6.86a1 1 0 0 0 0-1.72l-11-6.86A1 1 0 0 0 8 5.14Z"/></svg>';
    return badge;
  }

  function createVideoCard(video, id) {
    var title = typeof video.title === "string" ? video.title.trim() : "";
    var watchUrl = "https://www.youtube.com/watch?v=" + encodeURIComponent(id);

    if (typeof video.url === "string" && video.url.trim()) {
      watchUrl = video.url.trim();
    }

    var card = document.createElement("a");
    card.className = "video-card";
    card.href = watchUrl;
    card.target = "_blank";
    card.rel = "noopener noreferrer";

    var thumb = document.createElement("div");
    thumb.className = "video-thumb";

    var image = document.createElement("img");
    image.src = "https://i.ytimg.com/vi/" + encodeURIComponent(id) + "/hqdefault.jpg";
    image.alt = title ? title + " — भिडियो थम्बनेल" : "भिडियो थम्बनेल";
    image.width = 480;
    image.height = 270;
    image.loading = "lazy";
    image.decoding = "async";

    var heading = document.createElement("h3");
    heading.className = "video-title";

    heading.textContent = title || "युट्युब भिडियो";

    thumb.appendChild(image);
    thumb.appendChild(createPlayBadge());
    card.appendChild(thumb);
    card.appendChild(heading);

    return card;
  }

  var fragment = document.createDocumentFragment();
  var rendered = 0;

  videos.forEach(function (video) {
    var id = getVideoId(video);
    if (!id) {
      return;
    }

    fragment.appendChild(createVideoCard(video, id));
    rendered += 1;
  });

  if (rendered === 0) {
    if (emptyState) {
      emptyState.hidden = false;
    }
    return;
  }

  grid.appendChild(fragment);

  if (emptyState) {
    emptyState.hidden = true;
  }
})();

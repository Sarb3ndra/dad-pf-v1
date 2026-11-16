# सुरेन्द्र कुमार सिग्देल — Nepali Devotional Website

A lightweight, fully static website for the Nepali devotional creator **सुरेन्द्र कुमार सिग्देल**. It uses plain HTML, CSS and vanilla JavaScript, requires no build step, and is ready to host on GitHub Pages.

Production URL: `https://sarb3ndra.github.io/dad-pf-v1/`

## Current content

- Name, location, photograph, phone, email and social links are supplied by the site owner.
- Five real YouTube videos are listed in `data/videos.js`.
- YouTube and Facebook links are configured in `data/site-config.js`.
- No notices are published yet. The notices page shows a genuine empty state.

No biography, qualifications, video titles, religious dates or social accounts have been invented.

## Quick start

1. Preview locally with the instructions below.
2. Update routine content in `data/` or replace the image assets.
3. Push to GitHub and confirm GitHub Pages is enabled for the repository root.

## 1. Personal information and photo

Edit `data/site-config.js`.

| Field | Purpose |
| --- | --- |
| `siteName` | Name displayed in the header, hero and footer. |
| `intro` | Short line shown under the name. Leave empty to hide it. |
| `photo` | Path to the profile photograph. |
| `photoAlt` | Accessible description of the photograph. |
| `contact` | Address, phone, phone note and email shown in the footer. |
| `social` | YouTube, Facebook, Instagram, TikTok and X URLs. |

The current photograph is `assets/images/surendra_sigdel_photo.jpeg` (896 × 1200). Replace it with an optimized portrait, then update `photo`, `photoAlt` and the `<img>` `width`/`height` attributes in `index.html`.

The social sharing image is `assets/images/og-image.jpg` (1200 × 630). If the name or photograph changes, replace this image and keep the SEO metadata consistent.

If the site name changes, also update the matching `<title>`, description, Open Graph, Twitter Card and structured-data values in `index.html` and `notices.html`.

## 2. Contact and social links

Contact details and social URLs are configured in `data/site-config.js`. The footer is rendered by `js/main.js`; empty values are not displayed. Supported social keys are `youtube`, `facebook`, `instagram`, `tiktok` and `x`.

When a YouTube URL is present, the homepage also shows a link to the YouTube channel in the video section.

## 3. YouTube videos

Open `data/videos.js` and edit the array. Each entry needs a real title and either a full YouTube URL or an 11-character video ID.

```js
window.SITE_VIDEOS = [
  {
    title: "Actual video title",
    url: "https://www.youtube.com/watch?v=VIDEO_ID"
  }
];
```

The homepage displays every valid entry. Thumbnails are loaded from YouTube and cards use a responsive 16:9 layout.

## 4. Publish a notice

Edit `data/notices.json`. The notices page loads this file at runtime, so publishing only requires editing the JSON and pushing the change.

```json
{
  "notices": [
    {
      "title": "Actual notice title",
      "description": "A short, accurate description of the notice.",
      "date": "2026-12-01",
      "dateNepali": "",
      "image": "",
      "imageAlt": "",
      "link": "",
      "linkLabel": ""
    }
  ]
}
```

Keep the file as valid JSON: no comments, trailing commas or unquoted keys.

| Field | Required | Notes |
| --- | --- | --- |
| `title` | Yes | Notice heading in Nepali or another supplied language. |
| `description` | Recommended | Short description. Line breaks are preserved. |
| `date` | Yes | ISO date in `YYYY-MM-DD` format. Used to separate upcoming and past notices. |
| `dateNepali` | No | Nepali date text supplied by the owner, such as a Bikram Sambat date. |
| `image` | No | Relative path such as `assets/images/notices/notice.jpg`, or a full HTTPS URL. |
| `imageAlt` | No | Accessible description. Defaults to the notice title. |
| `link` | No | Full external `http://` or `https://` reference link. |
| `linkLabel` | No | Text for the reference link. Defaults to `थप जानकारी`. |

A notice dated today or later appears under **आगामी सूचनाहरू**, sorted by nearest date first. Past notices appear under **गत सूचनाहरू**, newest first. Without `dateNepali`, the Gregorian date is rendered with Nepali month names and Devanagari digits. Invalid or missing ISO dates are ignored.

The file currently contains an empty `notices` array. Keep it that way until real notices are supplied.

Notice images should go in `assets/images/notices/`, ideally as compressed JPG or WebP around 1200 × 675 px.

## 5. Production URL and SEO

The production URL is configured as:

```text
https://sarb3ndra.github.io/dad-pf-v1/
```

It appears in:

- `index.html`
- `notices.html`
- `sitemap.xml`
- `robots.txt`

If the repository name, GitHub account or custom domain changes, update every occurrence and keep the trailing slash on directory URLs.

Do not add credentials, titles or claims that have not been supplied by the site owner.

## Preview locally

The notices page fetches JSON, so use a local web server rather than opening the HTML file directly with `file://`.

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000/
```

Stop the server with `Ctrl+C`.

## Deploy to GitHub Pages

1. Push this project to `Sarb3ndra/dad-pf-v1`.
2. In the repository, open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select the branch (`master`) and the repository root (`/`).
5. Save the settings. The site will publish at `https://sarb3ndra.github.io/dad-pf-v1/`.

The included `.nojekyll` file prevents Jekyll processing. All internal links and assets are relative, so the site works from the project subdirectory.

## Project structure

```text
/
├── index.html
├── notices.html
├── assets/
│   ├── icons/
│   │   └── favicon.svg
│   └── images/
│       ├── og-image.jpg
│       └── surendra_sigdel_photo.jpeg
├── css/
│   └── style.css
├── js/
│   ├── main.js
│   ├── notices.js
│   └── videos.js
├── data/
│   ├── notices.json
│   ├── site-config.js
│   └── videos.js
├── sitemap.xml
├── robots.txt
├── .nojekyll
└── README.md
```

## Performance and accessibility

- No frameworks, build tools, databases or backend services.
- Small vanilla JavaScript files handle navigation and content rendering; there is no client-side routing.
- Profile and Open Graph images are local and compressed.
- Below-the-fold images use native lazy loading; the hero photograph loads eagerly with high fetch priority.
- Image dimensions reduce layout shifts.
- Notices are rendered with DOM text nodes rather than injected HTML.
- Responsive from 320 px upward with no horizontal scrolling.
- Keyboard navigation, visible focus states and `Escape` to close the mobile menu.
- Reduced-motion preferences are respected.
- Semantic headings, skip navigation, descriptive alt text and accessible social link labels are included.
- Noto Sans Devanagari and Noto Serif Devanagari load from Google Fonts with `display=swap` and system fallbacks.

## Content rules

Do not invent personal qualifications, religious authority, credentials, video titles, social accounts, festival dates, fast information or notice descriptions. Keep content empty or hidden until real information is supplied.

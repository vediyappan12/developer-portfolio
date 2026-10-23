# Full Stack Developer Student Portfolio

A responsive full-stack developer portfolio built using **HTML, CSS, and vanilla JavaScript** only. It includes pointer-responsive 3D scenes, an interactive website design showcase, motion-led scroll reveals, and a student-management dashboard concept. The dashboard is a front-end preview; no production data or backend is connected.

The contact form sends the visitor's name, email, mobile number, and message directly to `vediyappanbusiness77@gmail.com` using EmailJS. The `{{message}}` template variable contains a labeled, multiline block: `Name:`, `Email:`, `Mobile Number:`, and `Message:`. EmailJS Service ID, Template ID, and Public Key are configured in `script.js`. Confirm the Service ID and Template ID against the IDs shown in the EmailJS dashboard. The EmailJS template must use `{{to_email}}` as its recipient, `{{reply_to}}` as reply-to, and include `{{message}}` in the email body.

Deploy the site over HTTPS, or test it locally using an HTTP server (not by opening `index.html` directly as a `file://` URL). The form reports success or a useful EmailJS configuration error; actual delivery requires a valid, active service and template.

The EmailJS public key is designed for browser use. Never put a private SMTP password or secret API key in frontend code.

## Run locally
1. Extract the ZIP.
2. Use VS Code + the Live Server extension (or another local HTTP server) to open the site at an `http://localhost` address. Do not open `index.html` directly as a `file://` URL; EmailJS blocks email submissions from that origin.
3. No build tools, npm packages, or backend are required.

## Personalize before publishing
Update the GitHub and LinkedIn profile links in `index.html` before publishing. The portfolio currently uses the supplied name, phone number, email, and Tamil Nadu location. Update skill labels to match your experience as it grows.

## Files
- `index.html` — page content and sections
- `style.css` — responsive styling, 3D scenes, animated design showcase, dashboard preview, and reduced-motion support
- `script.js` — mobile navigation, scroll reveal, pointer-responsive 3D tilt, design showcase controls, dashboard tabs, EmailJS contact form, cursor glow, current year
- `assets/profile.png` — supplied profile portrait

## Publish free
You can deploy this static site with GitHub Pages, Netlify, or Cloudflare Pages. For GitHub Pages, create a repository, upload these files, and enable Pages in repository Settings.

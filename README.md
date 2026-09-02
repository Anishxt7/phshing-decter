# PhishGuard

Local phishing website detector with a browser UI. It scores a URL using structural tricks (IP hosts, `@` confusion, punycode, typosquats, risky TLDs), then optionally fetches the live page for redirects, password fields, off-site form actions, and RDAP domain age.

This is an educational scanner. It does not execute page JavaScript and it is not a substitute for browser Safe Browsing.

## Run it

```bash
cd phishing-detector
npm install
npm start
```

Open [http://127.0.0.1:8787](http://127.0.0.1:8787) in your browser.

## Chrome / Edge helper

1. Leave the server running.
2. Go to `chrome://extensions` (or `edge://extensions`).
3. Enable Developer mode.
4. Load unpacked and choose the `extension` folder.

The popup sends the current tab URL to your local scanner.

## Safety

Live fetches refuse private and reserved IP ranges so the scanner cannot be pointed at localhost or internal networks.

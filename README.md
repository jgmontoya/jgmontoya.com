# jgmontoya.com

Static landing page for <https://jgmontoya.com>.

## Local development

Open `index.html` directly in a browser, or serve the directory:

```sh
python3 -m http.server 8080
```

Run the lightweight site check:

```sh
node scripts/verify-site.mjs
```

## Deployment

The site is deployed to GitHub Pages through `.github/workflows/pages.yml`.
The custom domain is configured by `CNAME`.

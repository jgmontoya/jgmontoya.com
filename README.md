# jgmontoya.com

Static landing page for <https://jgmontoya.com>.

## Local development

Build the public site artifact:

```sh
node scripts/build-site.mjs
```

Serve the built site:

```sh
python3 -m http.server 8080 --directory _site
```

Run the lightweight site check:

```sh
node scripts/verify-site.mjs
```

## Deployment

The site is deployed to GitHub Pages through `.github/workflows/pages.yml`.
The workflow builds `_site`, verifies it, and uploads only that public artifact.
The custom domain is configured by `CNAME`.

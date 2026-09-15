# Coquina Cove

Website for the Coquina Cove Gulf-front vacation rental on Manasota Key, Florida.

## Project structure

- `app/` contains the React/Vinext source used for the hosted review site.
- `static-site/` contains the production static site deployed to `coquinacove.net`.
- `public/` contains shared images and website assets.

## Development

Requires Node.js 22.13 or newer.

```bash
npm install
npm run dev
npm run build
```

## Static deployment

Upload the contents of `static-site/` to the Pair Networks document root. The availability calendar uses `availability.php` to read booking dates from the configured Google Apps Script endpoint.

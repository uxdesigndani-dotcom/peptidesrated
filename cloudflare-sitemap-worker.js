/**
 * Cloudflare Worker: serves sitemap.xml at /sitemap.xml with Content-Type: application/xml
 * Everything else passes through to your Figma Make site.
 * 
 * Setup: Cloudflare Dashboard → Workers & Pages → Create Worker → paste this code.
 * Then add a route: peptidesrated.com/sitemap.xml
 */

const SITEMAP = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://peptidesrated.com/</loc><changefreq>weekly</changefreq><priority>1.0</priority></url>
  <url><loc>https://peptidesrated.com/quiz</loc><changefreq>monthly</changefreq><priority>0.9</priority></url>
  <url><loc>https://peptidesrated.com/browse</loc><changefreq>weekly</changefreq><priority>0.9</priority></url>
  <url><loc>https://peptidesrated.com/blog</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>
  <url><loc>https://peptidesrated.com/suppliers/supplier-1</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>https://peptidesrated.com/suppliers/supplier-2</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>https://peptidesrated.com/suppliers/supplier-3</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>https://peptidesrated.com/suppliers/supplier-4</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>https://peptidesrated.com/use-cases/use-case-1</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>https://peptidesrated.com/use-cases/use-case-2</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>https://peptidesrated.com/use-cases/use-case-3</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>https://peptidesrated.com/faq</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>
  <url><loc>https://peptidesrated.com/privacy-policy</loc><changefreq>yearly</changefreq><priority>0.3</priority></url>
  <url><loc>https://peptidesrated.com/terms-of-service</loc><changefreq>yearly</changefreq><priority>0.3</priority></url>
</urlset>`;

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (url.pathname === '/sitemap.xml') {
      return new Response(SITEMAP, {
        headers: {
          'Content-Type': 'application/xml',
          'Cache-Control': 'public, max-age=3600',
        },
      });
    }
    return fetch(request);
  },
};

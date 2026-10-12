// Función de Vercel: trae los aviones cercanos desde adsb.lol (red ADS-B comunitaria)
// y los devuelve a la página. Evita problemas de CORS y cachea 4 s en el borde.
export default async function handler(req, res) {
  const lat = Number(req.query.lat);
  const lon = Number(req.query.lon);
  const dist = Math.min(Math.max(Number(req.query.dist) || 60, 5), 250); // millas náuticas

  if (!Number.isFinite(lat) || !Number.isFinite(lon) || Math.abs(lat) > 90 || Math.abs(lon) > 180) {
    return res.status(400).json({ error: "Parámetros lat/lon inválidos" });
  }

  try {
    const r = await fetch(`https://api.adsb.lol/v2/point/${lat}/${lon}/${dist}`, {
      headers: { "User-Agent": "radar-pista-en-vivo/1.0" },
    });
    if (!r.ok) return res.status(502).json({ error: `adsb.lol respondió ${r.status}` });
    const data = await r.json();
    res.setHeader("Cache-Control", "s-maxage=4, stale-while-revalidate=10");
    return res.status(200).json({ ac: data.ac || [], now: data.now });
  } catch (e) {
    return res.status(502).json({ error: "No se pudo consultar adsb.lol" });
  }
}

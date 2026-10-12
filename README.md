# Radar Pista en Vivo

Prototipo de mapa de tráfico aéreo en vivo para Rionegro (MDE), Olaya Herrera (EOH) y El Dorado (BOG).

## Qué hace
- Mapa con MapLibre GL y teselas gratuitas de OpenFreeMap.
- Aviones en vivo cada 5 s desde **adsb.lol** (red ADS-B comunitaria, gratis), en un radio de ~110 km.
- Lista ordenada por distancia y ficha con callsign, tipo, matrícula, altitud, velocidad, velocidad vertical y squawk.
- Enlaces a las páginas de ATColombia de cada aeropuerto para el audio (demo gratis de El Dorado Autorizaciones).

## Estructura
- `index.html` — la página.
- `api/vuelos.js` — función de Vercel que consulta adsb.lol (evita CORS y cachea 4 s).

## Publicar
1. Subir la carpeta a un repo de GitHub.
2. Importarlo en Vercel (sin framework, sin build). Vercel detecta `api/` como funciones.
3. Abrir el dominio: el radar arranca en Rionegro.

## Limitaciones
- La cobertura comunitaria en Colombia es baja (fuera de Bogotá pueden verse pocos aviones). Un receptor propio (Raspberry Pi + RTL-SDR + antena 1090 MHz) alimentando a adsb.lol, o leído directo con readsb, la resuelve.
- ADS-B no trae origen/destino; para eso hace falta una API de horarios (AeroDataBox, AviationStack, etc.).
- Para uso comercial (p. ej. un restaurante), revisar los términos de adsb.lol y de cualquier API que se agregue.

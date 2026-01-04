import opencage from "opencage-api-client";

const cache = new Map();

export async function geocodeLocation(locationName) {
  if (cache.has(locationName)) {
    return cache.get(locationName);
  }

  const data = await opencage.geocode({
    q: locationName,
    key: process.env.OPENCAGE_API_KEY,
    limit: 1,
  });

  if (!data.results.length) return null;

  const { lat, lng } = data.results[0].geometry;

  const coords = { latitude: lat, longitude: lng };
  cache.set(locationName, coords);

  return coords;
}

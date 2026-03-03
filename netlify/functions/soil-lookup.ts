export default async (req: Request) => {
  const url = new URL(req.url);
  const lat = url.searchParams.get("lat");
  const lng = url.searchParams.get("lng");

  if (!lat || !lng || isNaN(Number(lat)) || isNaN(Number(lng))) {
    return new Response(JSON.stringify({ error: "lat and lng required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const apiUrl = new URL(
      "https://www.landis.org.uk/arcgis/rest/services/UKSoilObservatory/Soilscapes_Cranfield/MapServer/identify"
    );
    apiUrl.searchParams.set("geometry", `${lng},${lat}`);
    apiUrl.searchParams.set("geometryType", "esriGeometryPoint");
    apiUrl.searchParams.set("sr", "4326");
    apiUrl.searchParams.set("layers", "all");
    apiUrl.searchParams.set("tolerance", "1");
    apiUrl.searchParams.set(
      "mapExtent",
      `${Number(lng) - 1},${Number(lat) - 1},${Number(lng) + 1},${Number(lat) + 1}`
    );
    apiUrl.searchParams.set("imageDisplay", "400,400,96");
    apiUrl.searchParams.set("returnGeometry", "false");
    apiUrl.searchParams.set("f", "json");

    const res = await fetch(apiUrl.toString());
    if (!res.ok) {
      return new Response(JSON.stringify({ error: "Upstream API error" }), {
        status: 502,
        headers: { "Content-Type": "application/json" },
      });
    }

    const data = await res.json();

    const firstResult = data.results?.[0];
    if (!firstResult) {
      return new Response(JSON.stringify({ description: null }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(
      JSON.stringify({
        description: firstResult.attributes?.SOILSCAPE || firstResult.value || null,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "public, max-age=86400", // 24h — soil doesn't change
        },
      }
    );
  } catch {
    return new Response(JSON.stringify({ error: "Request failed" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

function fetchWithTimeout(url: string, ms: number) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), ms);
  return fetch(url, { cache: "no-store", signal: controller.signal })
    .finally(() => clearTimeout(id));
}

export default async function HealthPage() {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!base) {
    return (
      <main style={{ padding: 24 }}>
        <h1>WEB /health</h1>
        <p>Falta NEXT_PUBLIC_API_BASE_URL en .env.local ❌</p>
      </main>
    );
  }

  try {
    const res = await fetchWithTimeout(`${base}/health`, 3000);
    if (!res.ok) throw new Error("API not ok");
    const data = await res.json();

    return (
      <main style={{ padding: 24 }}>
        <h1>WEB /health</h1>
        <p>API OK ✅</p>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </main>
    );
  } catch (e: any) {
    return (
      <main style={{ padding: 24 }}>
        <h1>WEB /health</h1>
        <p>API ERROR ❌</p>
        <p>URL: {base}/health</p>
        <p>Detalle: {String(e?.name || e?.message || e)}</p>
      </main>
    );
  }
}

const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyov4-OocFuAOux15jQ_4YB4B1GEIRjLLv17b6kj85J3vPBmrCqZ4NGOeksvpLpza7O/exec";

export async function GET() {
  try {
    const response = await fetch(APPS_SCRIPT_URL, { headers: { Accept: "application/json" }, redirect: "follow" });
    if (!response.ok) throw new Error(`Availability service returned ${response.status}`);
    const data = await response.json() as { ok?: boolean; updatedAt?: string; timeZone?: string; bookings?: Array<{ start: string; endExclusive: string }> };
    if (!data.ok || !Array.isArray(data.bookings)) throw new Error("Invalid availability response");
    return Response.json({ ok: true, updatedAt: data.updatedAt, timeZone: data.timeZone, bookings: data.bookings.map(({ start, endExclusive }) => ({ start, endExclusive })) }, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "public, max-age=60, s-maxage=60",
      },
    });
  } catch {
    return Response.json({ error: "Availability is temporarily unavailable." }, { status: 502, headers: { "Access-Control-Allow-Origin": "*" } });
  }
}

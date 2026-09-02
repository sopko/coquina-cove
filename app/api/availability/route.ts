const PUBLIC_ICAL_URL = "https://calendar.google.com/calendar/ical/08db48b7170badbb3cca60c9400ec2bb3ef9e3e905605cd5c2bba8cd27a3795c%40group.calendar.google.com/public/basic.ics";

export async function GET() {
  try {
    const response = await fetch(PUBLIC_ICAL_URL, { headers: { Accept: "text/calendar" } });
    if (!response.ok) throw new Error(`Google Calendar returned ${response.status}`);
    return new Response(await response.text(), {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "public, max-age=300, s-maxage=300",
        "Content-Type": "text/calendar; charset=utf-8",
      },
    });
  } catch {
    return Response.json({ error: "Availability is temporarily unavailable." }, { status: 502, headers: { "Access-Control-Allow-Origin": "*" } });
  }
}

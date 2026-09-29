const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY!;

export async function sbFetch<T>(table: string, query: string = ""): Promise<T[]> {
  const url = `${SUPABASE_URL}/rest/v1/${table}?select=*${query}`;
  const res = await fetch(url, {
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
    },
    cache: "no-store",
  });
  if (!res.ok) {
    console.error("Supabase error", res.status, await res.text());
    return [];
  }
  return res.json();
}

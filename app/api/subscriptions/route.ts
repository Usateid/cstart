import { getActiveBundles } from "@/lib/db/queries/bundle";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return Response.json({ error: "User ID is required" }, { status: 400 });
  }

  const activeBundles = await getActiveBundles(Number(id));
  return Response.json(activeBundles);
}

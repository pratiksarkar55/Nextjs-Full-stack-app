export async function POST(request: any) {
  const body = await request.json();
  console.log("Data from client:", body);
  const { count } = body;
  return Response.json({ count });
}

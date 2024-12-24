import { logout } from "@/lib/auth";

export async function GET() {
  const response = await logout();
  return new Response(JSON.stringify(response), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

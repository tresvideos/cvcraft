import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json(
    {
      error: "Google OAuth will be configured after deployment",
      message: "This feature requires deployment to Vercel with proper environment variables",
    },
    { status: 501 },
  )
}

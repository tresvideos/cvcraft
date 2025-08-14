import { type NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  const baseUrl = req.nextUrl.origin
  return NextResponse.redirect(`${baseUrl}/login?error=google_oauth_not_available_in_preview`)
}

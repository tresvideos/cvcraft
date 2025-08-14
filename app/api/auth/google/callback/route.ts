import { type NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  return NextResponse.redirect("/login?error=google_oauth_not_available_in_preview")
}

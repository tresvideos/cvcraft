import { NextResponse } from "next/server"

export async function GET() {
  const facebookAuthUrl = new URL("https://www.facebook.com/v18.0/dialog/oauth")

  facebookAuthUrl.searchParams.set("client_id", process.env.FACEBOOK_APP_ID!)
  facebookAuthUrl.searchParams.set("redirect_uri", `${process.env.NEXTAUTH_URL}/api/auth/facebook/callback`)
  facebookAuthUrl.searchParams.set("scope", "email,public_profile")
  facebookAuthUrl.searchParams.set("response_type", "code")
  facebookAuthUrl.searchParams.set("state", "random_state_string")

  return NextResponse.redirect(facebookAuthUrl.toString())
}

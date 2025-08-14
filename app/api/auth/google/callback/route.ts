import { type NextRequest, NextResponse } from "next/server"
import { OAuth2Client } from "google-auth-library"

function createGoogleClient() {
  const clientId = process.env.GOOGLE_CLIENT_ID
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET
  const redirectUri = process.env.NEXTAUTH_URL

  if (!clientId || !clientSecret || !redirectUri) {
    return null
  }

  return new OAuth2Client(clientId, clientSecret, `${redirectUri}/api/auth/google/callback`)
}

export async function GET(req: NextRequest) {
  const client = createGoogleClient()

  if (!client) {
    return NextResponse.redirect("/login?error=google_oauth_not_configured")
  }

  const { searchParams } = new URL(req.url)
  const code = searchParams.get("code")

  if (!code) {
    return NextResponse.redirect("/login?error=google_auth_failed")
  }

  try {
    const { tokens } = await client.getToken(code)
    client.setCredentials(tokens)

    const ticket = await client.verifyIdToken({
      idToken: tokens.id_token!,
      audience: process.env.GOOGLE_CLIENT_ID,
    })

    const payload = ticket.getPayload()
    if (!payload) {
      throw new Error("No payload from Google")
    }

    const userData = {
      id: payload.sub,
      email: payload.email!,
      name: payload.name!,
      picture: payload.picture,
      provider: "google",
      verified: payload.email_verified,
    }

    // Aquí integrarías con tu base de datos
    // const user = await createOrUpdateUser(userData)

    const response = NextResponse.redirect("/dashboard")
    response.cookies.set("auth-token", "jwt-token-here", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 días
    })

    return response
  } catch (error) {
    console.error("Google OAuth error:", error)
    return NextResponse.redirect("/login?error=google_auth_failed")
  }
}

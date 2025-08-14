import { NextResponse } from "next/server"
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

export async function GET() {
  const client = createGoogleClient()

  if (!client) {
    return NextResponse.json({ error: "Google OAuth not configured" }, { status: 500 })
  }

  const authUrl = client.generateAuthUrl({
    access_type: "offline",
    scope: ["profile", "email"],
    prompt: "consent",
  })

  return NextResponse.redirect(authUrl)
}

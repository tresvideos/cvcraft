import { type NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const code = searchParams.get("code")
  const state = searchParams.get("state")

  if (!code || !state) {
    return NextResponse.redirect("/login?error=facebook_auth_failed")
  }

  try {
    const tokenResponse = await fetch("https://graph.facebook.com/v18.0/oauth/access_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: process.env.FACEBOOK_APP_ID!,
        client_secret: process.env.FACEBOOK_APP_SECRET!,
        redirect_uri: `${process.env.NEXTAUTH_URL}/api/auth/facebook/callback`,
        code,
      }),
    })

    const tokenData = await tokenResponse.json()

    if (!tokenData.access_token) {
      throw new Error("No access token received")
    }

    const userResponse = await fetch(
      `https://graph.facebook.com/me?fields=id,name,email,picture&access_token=${tokenData.access_token}`,
    )

    const userData = await userResponse.json()

    if (!userData.id) {
      throw new Error("No user data received")
    }

    const user = {
      id: userData.id,
      email: userData.email,
      name: userData.name,
      picture: userData.picture?.data?.url,
      provider: "facebook",
      verified: true,
    }

    // Aquí integrarías con tu base de datos
    // const dbUser = await createOrUpdateUser(user)

    const response = NextResponse.redirect("/dashboard")
    response.cookies.set("auth-token", "jwt-token-here", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 días
    })

    return response
  } catch (error) {
    console.error("Facebook OAuth error:", error)
    return NextResponse.redirect("/login?error=facebook_auth_failed")
  }
}

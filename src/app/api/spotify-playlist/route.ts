import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const playlistId = searchParams.get("playlistId")

  if (!playlistId)
    return NextResponse.json(
      { error: "Playlist ID is required" },
      { status: 400 }
    )

  const tokenResponse = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(
          process.env.SPOTIFY_CLIENT_ID +
            ":" +
            process.env.SPOTIFY_CLIENT_SECRET
        ).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "client_credentials",
    }),
  })

  const tokenData = await tokenResponse.json()

  const response = await fetch(
    `https://api.spotify.com/v1/playlists/${playlistId}`,
    {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    }
  )

  const data = await response.json()

  const dataNeeded = {
    name: data.name,
    images: data.images[0].url,
    owner: data.owner.display_name,
    open_link: data.external_urls.spotify,
  }

  const nextResponse = NextResponse.json(dataNeeded)

  nextResponse.cookies.set({
    name: "spotify-playlist",
    value: JSON.stringify(dataNeeded),
    expires: new Date(Date.now() + (data.expires_in - 500) * 1000),
  })

  return nextResponse
}

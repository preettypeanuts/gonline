import { NextResponse } from "next/server"
import { getAds } from "@/lib/googleSheets"

export async function GET() {
  try {
    const ads = await getAds()
    return NextResponse.json({ data: ads })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Failed to fetch ads" }, { status: 500 })
  }
}
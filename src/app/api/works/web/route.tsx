import { NextRequest, NextResponse } from "next/server"
import { getWorks } from "@/lib/googleSheets"

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url)
        const category = searchParams.get("category")

        let works = await getWorks()

        if (category) {
            works = works.filter(
                (w) => w.category.toLowerCase() === category.toLowerCase()
            )
        }

        return NextResponse.json({ data: works, total: works.length })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: "Failed to fetch works" }, { status: 500 })
    }
}
import { createClient } from "@/lib/supabase-server"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const { fullName, whatsappNumber, inConnectGroup, connectGroup } = body

    if (!fullName || !whatsappNumber || inConnectGroup === undefined) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    if (inConnectGroup === "Yes" && !connectGroup) {
      return NextResponse.json({ error: "Connect Group is required when selected" }, { status: 400 })
    }

    const supabase = await createClient()

    const { data, error } = await supabase.from("participants").insert([
      {
        name: fullName,
        phone_number: whatsappNumber,
        is_cg: inConnectGroup === "Yes",
        cg_number: inConnectGroup === "Yes" ? connectGroup : null,
      },
    ])

    if (error) {
      console.error("[v0] Supabase insert error:", error)
      return NextResponse.json({ error: "Failed to register participant" }, { status: 500 })
    }

    return NextResponse.json({ success: true, data }, { status: 201 })
  } catch (error) {
    console.error("[v0] API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

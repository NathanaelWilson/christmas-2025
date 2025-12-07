import { createClient } from "@supabase/supabase-js"; // Gunakan library standar untuk upload lebih aman
import { NextResponse } from "next/server";

// Inisialisasi Supabase Client khusus untuk API Route
// Pastikan variable ini ada di .env.local Anda
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // PENTING: Gunakan SERVICE_ROLE_KEY untuk bypass RLS saat upload/insert
);

export async function POST(request: Request) {
  try {
    // 1. Terima sebagai FormData (bukan JSON)
    const formData = await request.formData();

    const fullName = formData.get("fullName") as string;
    const whatsappNumber = formData.get("whatsappNumber") as string;
    const inConnectGroup = formData.get("inConnectGroup") as string;
    const connectGroup = formData.get("connectGroup") as string;
    const proofFile = formData.get("proofFile") as File;

    // 2. Validasi File
    if (!proofFile) {
      return NextResponse.json({ error: "Payment proof is required" }, { status: 400 });
    }

    // 3. Logic Upload ke Supabase Storage
    // Buat nama file unik: timestamp_namauser_original.ext
    const fileExt = proofFile.name.split(".").pop();
    const cleanName = fullName.replace(/[^a-zA-Z0-9]/g, "_"); // Hapus karakter aneh
    const fileName = `${Date.now()}_${cleanName}.${fileExt}`;
    const filePath = `uploads/${fileName}`; // Masuk ke folder uploads (opsional)

    const { error: uploadError } = await supabase.storage
      .from("payment-proofs") // Nama Bucket
      .upload(filePath, proofFile, {
        contentType: proofFile.type,
        upsert: false,
      });

    if (uploadError) {
      console.error("Upload Error:", uploadError);
      return NextResponse.json({ error: "Failed to upload image" }, { status: 500 });
    }

    // 4. Ambil Public URL (Agar bisa dilihat di Google Sheets)
    const { data: urlData } = supabase.storage
      .from("payment-proofs")
      .getPublicUrl(filePath);
    
    const publicUrl = urlData.publicUrl;

    // 5. Insert ke Database
    const { data, error: dbError } = await supabase
      .from("participants")
      .insert([
        {
          name: fullName,
          phone_number: whatsappNumber,
          is_cg: inConnectGroup === "Yes",
          cg_number: inConnectGroup === "Yes" ? connectGroup : null,
          payment_proof_url: publicUrl, // Simpan URL, bukan file object
        },
      ])
      .select();

    if (dbError) {
      console.error("DB Insert Error:", dbError);
      return NextResponse.json({ error: "Failed to save registration data" }, { status: 500 });
    }

    return NextResponse.json({ success: true, data }, { status: 201 });

  } catch (error) {
    console.error("[API Error]:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
"use client";

import { useState, useRef } from "react";
import {
  ChevronDown,
  Loader2,
  Upload,
  ArrowLeft,
  Clipboard,
  Check,
  Paperclip,
} from "lucide-react";

// --- KONSTANTA & PATH ---
// Pastikan file "bg-form.webp" ada di dalam folder "public" project Anda
const FORM_TEXTURE_URL = "/background-form.webp";
const ACCOUNT_NUMBER = "0881995912";

interface FormData {
  fullName: string;
  whatsappNumber: string;
  inConnectGroup: string;
  connectGroup: string;
  proofFile: File | null;
}

export default function RegistrationForm({
  onSubmit,
}: {
  onSubmit: (d: FormData) => void;
}) {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    whatsappNumber: "",
    inConnectGroup: "",
    connectGroup: "",
    proofFile: null,
  });

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const cgOptions = [
    "CG 07 - Ailicia Wibiksono",
    "CG 11 - Kimberly Joseph Wirawan",
    "CG 52 - Rachel Pascalie",
    "CG 54 - Finnegan Evan Kesuma",
    "CG 78 - Nathanael Wilson",
    "CG 98 - Rick Joyner Supit",
    "CG 110 - Javier",
  ];

  const readableBytes = (bytes: number) => {
    const units = ["B", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return (bytes / Math.pow(1024, i)).toFixed(1) + " " + units[i];
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    // VALIDASI KHUSUS WHATSAPP (Hanya Angka)
    if (name === "whatsappNumber") {
      if (value && !/^\d*$/.test(value)) {
        return;
      }
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "inConnectGroup" && value === "No"
        ? { connectGroup: "" }
        : {}),
    }));
  };

  const handleFilePicked = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("File must be an image (screenshot).");
      return;
    }

    if (file.size > 10_000_000) {
      setError("Image too large. Max 10MB.");
      return;
    }

    setError("");
    setFormData((prev) => ({ ...prev, proofFile: file }));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(ACCOUNT_NUMBER).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const goNext = () => {
    setError("");

    if (!formData.fullName.trim())
      return setError("Please enter your full name.");
    if (!formData.whatsappNumber.trim())
      return setError("Please enter your WhatsApp number.");
    if (!formData.inConnectGroup)
      return setError("Please select if you are in a CG.");
    if (formData.inConnectGroup === "Yes" && !formData.connectGroup)
      return setError("Please select your CG.");

    setStep(2);
  };

  // --- LOGIKA INTEGRASI SUPABASE ---
  const handleReserve = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.proofFile)
      return setError("Please upload your transfer screenshot.");

    setLoading(true);

    try {
      const dataToSend = new FormData();
      dataToSend.append("fullName", formData.fullName);
      dataToSend.append("whatsappNumber", formData.whatsappNumber);
      dataToSend.append("inConnectGroup", formData.inConnectGroup);
      dataToSend.append("connectGroup", formData.connectGroup || "");

      if (formData.proofFile) {
        dataToSend.append("proofFile", formData.proofFile);
      }

      console.log("Mengirim data ke /api/register...");

      const response = await fetch("/api/register", {
        method: "POST",
        body: dataToSend,
      });

      // Validasi Response
      const responseText = await response.text();
      console.log("Response dari server:", responseText);

      let result;
      try {
        result = JSON.parse(responseText);
      } catch (e) {
        throw new Error(
          `Server Error: Tidak merespons dengan JSON. Kemungkinan URL salah atau Server Crash. Isi: ${responseText.slice(
            0,
            50
          )}...`
        );
      }

      if (!response.ok) {
        throw new Error(result.error || "Gagal mendaftar");
      }

      if (onSubmit) onSubmit(formData);
    } catch (err: any) {
      console.error("Error Detail:", err);
      setError(err.message || "Terjadi kesalahan sistem.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-4 bg-[#7E0A06] font-mono">
      {/* Main Card dengan Background Texture */}
      <div
        className="relative w-full max-w-md shadow-2xl border border-stone-800/20 overflow-hidden bg-cover bg-center rounded-sm"
        // Update di sini: Menggunakan tanda kutip tunggal di dalam url() agar lebih aman
        style={{ backgroundImage: `url('${FORM_TEXTURE_URL}')` }}
      >
        <div className="absolute inset-0 bg-[#F9F7F2]/30" />

        <div className="relative">
          {/* Progress Dots */}
          <div className="flex justify-center gap-3 pt-6 mb-3">
            <div
              className={`h-2 w-2 rounded-full border border-stone-600 ${
                step >= 1 ? "bg-stone-800" : "bg-transparent"
              }`}
            />
            <div
              className={`h-2 w-2 rounded-full border border-stone-600 ${
                step >= 2 ? "bg-stone-800" : "bg-transparent"
              }`}
            />
          </div>

          {/* Header Title */}
          <div className="text-center mb-8">
            <h1 className="text-[17px] font-bold text-stone-800 tracking-tighter uppercase px-4">
              {step === 1
                ? "PLEASE FILL IN YOUR INFORMATION"
                : "PAYMENT DETAILS"}
            </h1>
            <p className="text-[10px] text-stone-500 uppercase tracking-widest">
              CHRISTMAS CELEBRATION
            </p>
          </div>

          {/* SLIDING WRAPPER */}
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                width: "200%",
                transform: `translateX(${step === 1 ? "0%" : "-50%"})`,
              }}
            >
              {/* SLIDE 1: PERSONAL INFO */}
              <div className="w-1/2 shrink-0 px-8 pb-8 space-y-6">
                <div className="space-y-5">
                  {/* Name Input */}
                  <div className="group">
                    <label className="block text-[10px] uppercase tracking-widest text-stone-500 mb-1">
                      Full Name
                    </label>
                    <input
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full bg-transparent border-b border-stone-400 py-1 text-sm text-stone-800 placeholder-stone-400/50 focus:outline-none focus:border-[#7E0A06] transition-colors"
                      placeholder="YOUR NAME"
                      autoComplete="off"
                    />
                  </div>

                  {/* WA Input */}
                  <div className="group">
                    <label className="block text-[10px] uppercase tracking-widest text-stone-500 mb-1">
                      WhatsApp No.
                    </label>
                    <input
                      name="whatsappNumber"
                      type="tel"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      value={formData.whatsappNumber}
                      onChange={handleInputChange}
                      className="w-full bg-transparent border-b border-stone-400 py-1 text-sm text-stone-800 placeholder-stone-400/50 focus:outline-none focus:border-[#7E0A06] transition-colors"
                      placeholder="08..."
                      autoComplete="off"
                    />
                  </div>

                  {/* CG Status */}
                  <div className="group">
                    <label className="block text-[10px] uppercase tracking-widest text-stone-500 mb-1">
                      Are you in a CG?
                    </label>
                    <div className="relative">
                      <select
                        name="inConnectGroup"
                        value={formData.inConnectGroup}
                        onChange={handleInputChange}
                        className="w-full bg-transparent border-b border-stone-400 py-1 text-sm text-stone-800 focus:outline-none focus:border-[#7E0A06] appearance-none rounded-none"
                      >
                        <option value="" className="text-stone-300">
                          SELECT OPTION
                        </option>
                        <option value="Yes">YES</option>
                        <option value="No">NO</option>
                      </select>
                      <ChevronDown
                        size={14}
                        className="absolute right-0 top-1/2 -translate-y-1/2 text-stone-500 pointer-events-none"
                      />
                    </div>
                  </div>

                  {/* CG Selection */}
                  {formData.inConnectGroup === "Yes" && (
                    <div className="group pt-2 animate-fadeIn">
                      <label className="block text-[10px] uppercase tracking-widest text-[#7E0A06] mb-1">
                        Select Connect Group
                      </label>
                      <div className="relative">
                        <select
                          name="connectGroup"
                          value={formData.connectGroup}
                          onChange={handleInputChange}
                          className="w-full bg-[#7E0A06]/5 border-b border-[#7E0A06] py-2 px-2 text-[11px] text-[#7E0A06] focus:outline-none appearance-none font-bold uppercase"
                        >
                          <option value="">SELECT YOUR CG</option>
                          {cgOptions.map((o) => (
                            <option key={o} value={o}>
                              {o}
                            </option>
                          ))}
                        </select>
                        <ChevronDown
                          size={14}
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-[#7E0A06] pointer-events-none"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {error && (
                  <p className="text-[10px] text-red-600 font-bold tracking-wide border border-red-200 bg-red-50 p-2 text-center">
                    ⚠️ {error}
                  </p>
                )}

                <div className="pt-6 mt-4">
                  <p className="text-center text-[9px] uppercase tracking-widest text-stone-600 mb-6 leading-relaxed px-2">
                    THERE WILL BE A CHARGE OF{" "}
                    <span className="font-bold text-stone-800">
                      IDR 50.000,00
                    </span>{" "}
                    FOR THE EVENT, INCLUDING DELICIOUS MEALS, LIGHT BITES, AND
                    REFRESHMENTS.
                  </p>

                  <button
                    onClick={goNext}
                    className="w-full border border-stone-800 bg-transparent text-stone-800 py-3 text-xs font-bold tracking-[0.2em] uppercase hover:bg-stone-800 hover:text-[#F9F7F2] transition-all active:scale-[0.98]"
                  >
                    Proceed
                  </button>
                </div>
              </div>

              {/* SLIDE 2: PAYMENT & UPLOAD */}
              <div className="w-1/2 shrink-0 px-8 pb-8 space-y-6">
                <button
                  onClick={() => setStep(1)}
                  className="flex items-center gap-2 text-[10px] text-stone-500 hover:text-stone-800 transition-colors uppercase tracking-widest mb-4"
                >
                  <ArrowLeft size={12} /> Back
                </button>

                <div className="bg-white/50 border border-stone-300 p-4 space-y-3 relative">
                  <div className="flex justify-between border-b border-dashed border-stone-300 pb-2 z-10 relative">
                    <span className="text-[10px] text-stone-500 uppercase">
                      Bank
                    </span>
                    <span className="text-xs font-bold text-stone-800">
                      BCA
                    </span>
                  </div>

                  <div className="flex justify-between items-center border-b border-dashed border-stone-300 pb-2 z-10 relative">
                    <span className="text-[10px] text-stone-500 uppercase">
                      Account
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-stone-800 tracking-wider">
                        {ACCOUNT_NUMBER}
                      </span>
                      <button
                        type="button"
                        onClick={handleCopy}
                        className={`p-1 transition-colors ${
                          copied
                            ? "text-green-600"
                            : "text-stone-500 hover:text-[#7E0A06]"
                        }`}
                        title="Copy Account Number"
                      >
                        {copied ? <Check size={14} /> : <Clipboard size={14} />}
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-between border-b border-dashed border-stone-300 pb-2 z-10 relative">
                    <span className="text-[10px] text-stone-500 uppercase mb-1">
                      Beneficiary
                    </span>
                    <span className="text-xs font-bold text-stone-800">
                      KIMBERLY JOSEPH WIRAWAN
                    </span>
                  </div>

                  {/* TOTAL AMOUNT SECTION (DITAMBAHKAN SESUAI REQUEST) */}
                  <div className="flex justify-between border-b border-dashed border-stone-300 pb-2 z-10 relative">
                    <span className="text-[10px] text-stone-500 uppercase">
                      Total Amount
                    </span>
                    <span className="text-xs font-bold text-stone-800">
                      IDR 50.000,00
                    </span>
                  </div>

                  {/* NEWS SECTION */}
                  <div className="bg-stone-100 p-2 border border-stone-200">
                    <span className="block text-[9px] text-stone-400 uppercase tracking-widest mb-1">
                      News / Berita Transfer:
                    </span>
                    <p className="text-[10px] font-bold text-stone-700 break-all">
                      HFC {formData.fullName.split(" ")[0].toUpperCase()}{" "}
                      {formData.connectGroup
                        ? formData.connectGroup.split(" - ")[0]
                        : "GUEST"}
                    </p>
                  </div>
                </div>

                <form onSubmit={handleReserve} className="space-y-4">
                  <div className="space-y-2">
                    <label className="block text-[10px] uppercase tracking-widest text-stone-500">
                      Upload Receipt
                    </label>

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFilePicked}
                      className="hidden"
                    />

                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className={`
                                        border border-dashed p-4 text-center cursor-pointer transition-all
                                        ${
                                          formData.proofFile
                                            ? "border-[#7E0A06] bg-[#7E0A06]/5"
                                            : "border-stone-400 hover:bg-stone-100"
                                        }
                                    `}
                    >
                      {formData.proofFile ? (
                        <div className="flex items-center justify-center gap-2 text-[#7E0A06]">
                          <Paperclip size={14} />
                          <span className="text-[10px] font-bold truncate max-w-[150px]">
                            {formData.proofFile.name}
                            <span className="text-stone-500 font-normal ml-1">
                              ({readableBytes(formData.proofFile.size)})
                            </span>
                          </span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-2 text-stone-400">
                          <Upload size={16} />
                          <span className="text-[10px]">TAP TO UPLOAD</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {error && (
                    <p className="text-[10px] text-red-600 font-bold tracking-wide text-center">
                      ⚠️ {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#7E0A06] text-white py-3 text-xs font-bold tracking-[0.2em] uppercase hover:bg-[#600603] transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                  >
                    {loading ? (
                      <Loader2 size={14} className="animate-spin" />
                    ) : (
                      "CONFIRM RESERVATION"
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="bg-[repeating-linear-gradient(45deg,transparent,transparent_5px,#31684e_5px,#31684e_10px)] h-3 w-full border-t border-stone-200" />
        </div>
      </div>
    </div>
  );
}

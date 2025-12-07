"use client";

import { useState, useRef } from "react";
import { ChevronDown, Loader2, Upload, ArrowLeft } from "lucide-react";

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

      console.log("Mengirim data ke /api/register..."); // Debug log

      const response = await fetch("/api/register", {
        method: "POST",
        body: dataToSend,
      });

      // --- PERBAIKAN PENTING DI SINI ---
      // Ambil respons sebagai text dulu untuk pengecekan
      const responseText = await response.text();
      console.log("Response dari server:", responseText); // Cek Console browser (F12)

      // Coba parse ke JSON
      let result;
      try {
        result = JSON.parse(responseText);
      } catch (e) {
        // Jika gagal parse, berarti server kirim HTML (biasanya Error page)
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
      // Tampilkan error yang lebih jelas ke user
      setError(err.message || "Terjadi kesalahan sistem.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto mt-10 px-4">
      {/* Progress dots */}
      <div className="flex justify-center gap-3 mb-5">
        <div
          className={`h-3 w-3 rounded-full border border-amber-200 ${
            step === 1 ? "bg-amber-50" : "bg-transparent"
          }`}
        />
        <div
          className={`h-3 w-3 rounded-full border border-amber-200 ${
            step === 2 ? "bg-amber-50" : "bg-transparent"
          }`}
        />
      </div>

      {/* Card container */}
      <div className="relative overflow-hidden rounded-3xl border-4 border-emerald-600 shadow-xl bg-white">
        <div className="h-2 bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600" />

        {/* Sliding wrapper */}
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(${step === 1 ? "0%" : "-100%"})` }}
        >
          {/* SLIDE 1 — Info */}
          <div className="w-full shrink-0 px-8 py-10 space-y-6">
            <h2 className="text-4xl font-bold text-center text-slate-900">
              Join the Joy
            </h2>
            <p className="text-center text-sm text-stone-500">
              Fill your details below to continue
            </p>

            {/* Full Name */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Full Name
              </label>
              <input
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full rounded-xl border-2 border-slate-200 bg-slate-50 px-4 py-3"
                placeholder="Jessie Ellanda"
              />
            </div>

            {/* WhatsApp */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                WhatsApp Number
              </label>
              <input
                name="whatsappNumber"
                value={formData.whatsappNumber}
                onChange={handleInputChange}
                className="w-full rounded-xl border-2 border-slate-200 bg-slate-50 px-4 py-3"
                placeholder="08xxxxxxxxxx"
              />
            </div>

            {/* In CG */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Are you in a Connect Group (CG)?
              </label>
              <div className="relative">
                <select
                  name="inConnectGroup"
                  value={formData.inConnectGroup}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border-2 border-slate-200 bg-slate-50 px-4 py-3 appearance-none"
                >
                  <option value="">Select an option</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-700" />
              </div>
            </div>

            {/* CG List */}
            {formData.inConnectGroup === "Yes" && (
              <div className="animate-fadeIn">
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Select your CG
                </label>
                <div className="relative">
                  <select
                    name="connectGroup"
                    value={formData.connectGroup}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border-2 border-emerald-300 bg-emerald-50 px-4 py-3 appearance-none"
                  >
                    <option value="">Select your CG</option>
                    {cgOptions.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-700" />
                </div>
              </div>
            )}

            {error && (
              <div className="rounded-xl bg-red-50 p-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <button
              onClick={goNext}
              className="w-full rounded-xl bg-emerald-600 text-white py-3 font-bold hover:bg-emerald-700 shadow"
            >
              Next Slide
            </button>
          </div>

          {/* SLIDE 2 — Payment */}
          <div className="w-full shrink-0 px-8 py-10 space-y-6">
            <button
              onClick={() => setStep(1)}
              className="flex items-center gap-2 text-sm text-emerald-700 mb-2"
            >
              <ArrowLeft size={18} /> Back
            </button>

            <h2 className="text-3xl font-bold text-center text-slate-900">
              Payment Details
            </h2>
            <p className="text-center text-sm text-stone-500">
              Transfer <strong>Rp 50.000</strong> to complete your reservation
            </p>

            {/* Bank Card */}
            <div className="rounded-2xl border-2 border-emerald-300 bg-emerald-50 p-5 shadow-sm">
              <p className="text-sm text-slate-700">
                <span className="font-semibold">Bank:</span> BCA
              </p>
              <p className="text-sm text-slate-700">
                <span className="font-semibold">No Rekening:</span> 1234567890
              </p>
              <p className="text-sm text-slate-700">
                <span className="font-semibold">A.n:</span> Nama Penerima
              </p>
            </div>

            {/* Upload */}
            <form onSubmit={handleReserve} className="space-y-4">
              <label className="block text-sm font-semibold">
                Upload Screenshot Transfer
              </label>

              <div className="flex items-center gap-3">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFilePicked}
                  className="hidden"
                />

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-slate-300"
                >
                  <Upload size={18} /> Choose File
                </button>

                <div className="text-sm text-stone-600">
                  {formData.proofFile ? (
                    `${formData.proofFile.name} • ${readableBytes(
                      formData.proofFile.size
                    )}`
                  ) : (
                    <span className="text-stone-400">No file chosen</span>
                  )}
                </div>
              </div>

              {/* Preview */}
              {formData.proofFile && (
                <img
                  src={URL.createObjectURL(formData.proofFile)}
                  className="w-28 h-28 rounded-xl object-cover border border-slate-200"
                />
              )}

              {error && (
                <div className="rounded-xl bg-red-50 p-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-emerald-600 text-white py-3 font-bold hover:bg-emerald-700 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <Loader2 className="animate-spin" size={18} />
                ) : (
                  "Reserve My Spot"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

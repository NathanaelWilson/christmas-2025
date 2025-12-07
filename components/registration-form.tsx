"use client";

import type React from "react";

import { useState } from "react";
import { ChevronDown, Loader2, Star } from "lucide-react";

interface FormData {
  fullName: string;
  whatsappNumber: string;
  inConnectGroup: string;
  connectGroup: string;
}

interface RegistrationFormProps {
  onSubmit: (data: FormData) => void;
}

export default function RegistrationForm({ onSubmit }: RegistrationFormProps) {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    whatsappNumber: "",
    inConnectGroup: "",
    connectGroup: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const cgOptions = [
    "CG 07 - Ailicia Wibiksono",
    "CG 11 - Kimberly Joseph Wirawan",
    "CG 52 - Rachel Pascalie",
    "CG 54 - Finnegan Evan Kesuma",
    "CG 78 - Nathanael Wilson",
    "CG 98 - Rick Joyner Supit",
    "CG 110 - Javier",
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "inConnectGroup" && value === "No") {
      setFormData((prev) => ({
        ...prev,
        connectGroup: "",
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.fullName.trim()) {
      setError("Please enter your full name");
      return;
    }
    if (!formData.whatsappNumber.trim()) {
      setError("Please enter your WhatsApp number");
      return;
    }
    if (!formData.inConnectGroup) {
      setError("Please select whether you are in a Connect Group");
      return;
    }
    if (formData.inConnectGroup === "Yes" && !formData.connectGroup) {
      setError("Please select your Connect Group");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          whatsappNumber: formData.whatsappNumber,
          inConnectGroup: formData.inConnectGroup,
          connectGroup:
            formData.inConnectGroup === "Yes" ? formData.connectGroup : null,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Registration failed");
      }

      console.log("[v0] Registration successful");
      setLoading(false);
      onSubmit(formData);
    } catch (err) {
      console.error("[v0] Registration error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Failed to register. Please try again."
      );
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl">
      {/* Decorative stars */}
      <div className="absolute top-1/3 left-12 text-yellow-300 opacity-70 animate-pulse">
        <Star size={24} fill="currentColor" />
      </div>
      <div
        className="absolute top-1/2 right-16 text-yellow-200 opacity-60 animate-pulse"
        style={{ animationDelay: "0.5s" }}
      >
        <Star size={20} fill="currentColor" />
      </div>

      {/* Main content card with paper-cut effect */}
      <div className="relative z-20 w-full">
        {/* Paper-cut shadow effect */}
        <div className="absolute inset-0 rounded-3xl bg-black/10 blur-2xl -z-10 transform translate-y-4" />

        {/* Main card */}
        <div className="rounded-3xl bg-white/95 backdrop-blur shadow-2xl overflow-hidden border-4 border-emerald-600">
          {/* Top decorative border */}
          <div className="h-2 bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600" />

          {/* Content */}
          <div className="px-8 py-12 md:px-12 md:py-16 space-y-8">
            {/* Header */}
            <div className="text-center space-y-3">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 text-balance">
                Join the Joy
              </h2>
              <p className="text-sm text-slate-500">
                Register below to reserve your seat
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-semibold text-slate-700 mb-2"
                >
                  Full Name
                </label>
                <input
                  id="fullName"
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Jessie Ellanda"
                  className="w-full rounded-xl border-2 border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder-slate-400 transition-all focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                />
              </div>

              {/* WhatsApp Number */}
              <div>
                <label
                  htmlFor="whatsappNumber"
                  className="block text-sm font-semibold text-slate-700 mb-2"
                >
                  WhatsApp Number
                </label>
                <input
                  id="whatsappNumber"
                  type="tel"
                  name="whatsappNumber"
                  value={formData.whatsappNumber}
                  onChange={handleInputChange}
                  placeholder="08xxxxxxxxxx"
                  className="w-full rounded-xl border-2 border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder-slate-400 transition-all focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                />
              </div>

              {/* Connect Group Question */}
              <div>
                <label
                  htmlFor="inConnectGroup"
                  className="block text-sm font-semibold text-slate-700 mb-2"
                >
                  Are you in a Connect Group (CG)?
                </label>
                <div className="relative">
                  <select
                    id="inConnectGroup"
                    name="inConnectGroup"
                    value={formData.inConnectGroup}
                    onChange={handleInputChange}
                    className="w-full appearance-none rounded-xl border-2 border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 transition-all focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                  >
                    <option value="">Select an option</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                  <ChevronDown
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
                    size={18}
                  />
                </div>
              </div>

              {/* Conditional CG Selection */}
              {formData.inConnectGroup === "Yes" && (
                <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                  <label
                    htmlFor="connectGroup"
                    className="block text-sm font-semibold text-slate-700 mb-2"
                  >
                    Select your CG
                  </label>
                  <div className="relative">
                    <select
                      id="connectGroup"
                      name="connectGroup"
                      value={formData.connectGroup}
                      onChange={handleInputChange}
                      className="w-full appearance-none rounded-xl border-2 border-emerald-300 bg-emerald-50 px-4 py-3 text-slate-900 transition-all focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                    >
                      <option value="">Select your connect group</option>
                      {cgOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-emerald-600"
                      size={18}
                    />
                  </div>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="rounded-xl bg-red-50 p-4 text-sm text-red-700 border-l-4 border-red-600 animate-in fade-in">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-emerald-600 px-6 py-3.5 font-bold text-white text-base transition-all hover:bg-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed active:scale-95 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
              >
                {loading ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Reserve My Seat"
                )}
              </button>
            </form>
          </div>

          {/* Bottom decorative border */}
          <div className="h-2 bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600" />
        </div>
      </div>
    </div>
  );
}

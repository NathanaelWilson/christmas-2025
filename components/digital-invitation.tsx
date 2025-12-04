"use client"

import { X, Download } from "lucide-react"

interface DigitalInvitationProps {
  data: {
    fullName: string
    whatsappNumber: string
    inConnectGroup: string
    connectGroup: string
  } | null
  onClose: () => void
}

export default function DigitalInvitation({ data, onClose }: DigitalInvitationProps) {
  const handleSave = async () => {
    // In a real app, this would generate and download a PDF or image
    console.log("Saving invitation for:", data?.fullName)

    // Show success feedback
    alert("Invitation saved to your device!")
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-red-50 px-4 py-8 animate-in fade-in duration-500">
      <div className="w-full max-w-md">
        {/* Card Container */}
        <div className="relative overflow-hidden rounded-2xl bg-white shadow-2xl">
          {/* Decorative Top Border */}
          <div className="h-1 bg-gradient-to-r from-emerald-600 to-emerald-500" />

          {/* Card Content */}
          <div className="space-y-6 p-8 text-center">
            {/* Header */}
            <div className="space-y-3">
              <div className="text-4xl font-bold text-emerald-600">✨</div>
              <h1 className="text-3xl font-bold text-slate-900">You're Invited!</h1>
              <div className="h-1 w-12 bg-red-500 mx-auto rounded-full" />
            </div>

            {/* Main Message */}
            <div className="space-y-4 text-left">
              <p className="text-base leading-relaxed text-slate-700">
                Dear <span className="font-semibold text-emerald-700">{data?.fullName}</span>,
              </p>
              <p className="text-base leading-relaxed text-slate-700">
                You are warmly invited to celebrate Christmas with us!
              </p>

              {/* Event Details Box */}
              <div className="rounded-lg bg-gradient-to-br from-emerald-50 to-emerald-100 p-4 border border-emerald-200">
                <p className="text-sm font-semibold text-emerald-900 mb-2">I'll be Home for Christmas</p>
                <p className="text-sm text-emerald-800">📅 December 25, 2024</p>
                <p className="text-sm text-emerald-800">🕖 6:00 PM - 9:00 PM</p>
                <p className="text-sm text-emerald-800">📍 Community Church Center</p>
              </div>

              {/* Contact Info */}
              <div className="rounded-lg bg-red-50 p-4 border border-red-200">
                <p className="text-sm text-slate-700">
                  <span className="font-semibold">WhatsApp:</span> {data?.whatsappNumber}
                </p>
                {data?.inConnectGroup === "Yes" && (
                  <p className="text-sm text-slate-700 mt-2">
                    <span className="font-semibold">Connect Group:</span> {data?.connectGroup}
                  </p>
                )}
              </div>

              {/* Closing Message */}
              <p className="text-base leading-relaxed text-slate-700 pt-2">
                We look forward to spending this special day with you. Come celebrate the joy of Christmas with our
                church family!
              </p>

              <p className="text-sm font-semibold text-emerald-700 pt-4">
                In His Love,
                <br />
                The Church Community
              </p>
            </div>

            {/* Decorative Bottom Border */}
            <div className="h-1 bg-gradient-to-r from-red-500 to-red-400" />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 bg-slate-50 px-8 py-4 border-t border-slate-200">
            <button
              onClick={handleSave}
              className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 font-semibold text-white transition-all hover:bg-emerald-700 active:scale-95"
            >
              <Download size={18} />
              Save
            </button>
            <button
              onClick={onClose}
              className="flex items-center justify-center rounded-lg bg-slate-200 px-4 py-2.5 font-semibold text-slate-700 transition-all hover:bg-slate-300 active:scale-95"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Helper text */}
        <p className="text-center text-xs text-slate-500 mt-4">Share this invitation with your family and friends</p>
      </div>
    </div>
  )
}

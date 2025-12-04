"use client"

import { useState } from "react"
import RegistrationForm from "@/components/registration-form"
import DigitalInvitation from "@/components/digital-invitation"
import TreeFrame from "@/components/tree-frame"

export default function Home() {
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [registrationData, setRegistrationData] = useState<{
    fullName: string
    whatsappNumber: string
    inConnectGroup: string
    connectGroup: string
  } | null>(null)

  const handleFormSubmit = (data: {
    fullName: string
    whatsappNumber: string
    inConnectGroup: string
    connectGroup: string
  }) => {
    setRegistrationData(data)
    setFormSubmitted(true)
  }

  const handleClose = () => {
    setFormSubmitted(false)
    setRegistrationData(null)
  }

  return (
    <main>
      {!formSubmitted ? (
        <div className="relative min-h-screen bg-red-700 overflow-hidden">
          {/* Textured red background */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22%3E%3Crect fill=%22%23b91c1c%22 width=%22100%22 height=%22100%22/%3E%3Ccircle cx=%2220%22 cy=%2220%22 r=%221%22 fill=%22%238b1515%22 opacity=%220.3%22/%3E%3Ccircle cx=%2250%22 cy=%2240%22 r=%221.5%22 fill=%22%238b1515%22 opacity=%220.2%22/%3E%3Ccircle cx=%2280%22 cy=%2260%22 r=%221%22 fill=%22%238b1515%22 opacity=%220.25%22/%3E%3Ccircle cx=%2230%22 cy=%2270%22 r=%221.2%22 fill=%22%238b1515%22 opacity=%220.3%22/%3E%3C/svg%3E')] opacity-80" />

          {/* Left tree frame */}
          <TreeFrame position="left" />

          {/* Right tree frame */}
          <TreeFrame position="right" />

          {/* Content wrapper */}
          <div className="relative z-10 flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="flex flex-col items-center justify-center px-4 py-8 md:py-12 min-h-screen md:min-h-auto md:flex-shrink-0 md:h-screen">
              <div className="text-center space-y-6 animate-in">
                <h1 className="text-5xl md:text-7xl font-bold text-white drop-shadow-lg text-balance">
                  I'll be Home for Christmas
                </h1>
                <p className="text-xl md:text-2xl text-amber-100 font-semibold">
                  December 25, 2024 • 6:00 PM - 9:00 PM
                </p>
                <p className="text-lg text-amber-50 font-light">Celebrate the season with us</p>
                <button
                  onClick={() => {
                    document.getElementById("form-section")?.scrollIntoView({ behavior: "smooth" })
                  }}
                  className="mt-8 px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-all hover:shadow-lg active:scale-95"
                >
                  Register Now
                </button>
              </div>
            </section>

            {/* Form Section */}
            <section
              id="form-section"
              className="flex flex-col items-center justify-center px-4 py-8 md:py-12 min-h-screen md:min-h-auto"
            >
              <RegistrationForm onSubmit={handleFormSubmit} />
            </section>
          </div>
        </div>
      ) : (
        <DigitalInvitation data={registrationData} onClose={handleClose} />
      )}
    </main>
  )
}

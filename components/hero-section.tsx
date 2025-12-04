"use client"

import { Star, Trees } from "lucide-react"

export default function HeroSection() {
  const scrollToForm = () => {
    const formSection = document.getElementById("registration-form")
    formSection?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="flex h-screen flex-col items-center justify-center bg-gradient-to-b from-white to-emerald-50 px-4 text-center">
      {/* Decorative icons */}
      <div className="absolute top-8 left-6 text-emerald-600 opacity-70">
        <Star size={28} fill="currentColor" />
      </div>
      <div className="absolute top-16 right-10 text-emerald-600 opacity-70">
        <Trees size={32} />
      </div>

      {/* Main content */}
      <div className="space-y-6">
        <h1 className="text-balance text-5xl font-bold tracking-tight text-slate-900 md:text-6xl">
          I'll be Home for Christmas
        </h1>

        <div className="space-y-2">
          <p className="text-lg font-semibold text-emerald-700">December 25, 2024</p>
          <p className="text-base text-slate-600">6:00 PM - 9:00 PM</p>
          <p className="text-base text-slate-600">Community Church Center</p>
        </div>

        <button
          onClick={scrollToForm}
          className="mx-auto mt-8 block rounded-full bg-emerald-600 px-8 py-3 font-semibold text-white transition-all hover:bg-emerald-700 active:scale-95"
        >
          Register Now
        </button>
      </div>

      {/* Decorative bottom element */}
      <div className="absolute bottom-8 right-8 text-red-500 opacity-60">
        <Star size={20} fill="currentColor" />
      </div>
    </section>
  )
}

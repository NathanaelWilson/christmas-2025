"use client";

import { useState } from "react";
import RegistrationForm from "@/components/registration-form";
import HeroSection from "@/components/hero-section";
import DigitalInvitation from "@/components/digital-invitation";
// Import loader baru Anda (sesuaikan nama file jika beda)
import ChristmasLoader from "@/components/christmas-loader";

export default function Home() {
  // 1. Ganti state boolean jadi string untuk 3 fase
  const [view, setView] = useState<"form" | "loading" | "invitation">("form");

  const [registrationData, setRegistrationData] = useState<{
    fullName: string;
    whatsappNumber: string;
    inConnectGroup: string;
    connectGroup: string;
  } | null>(null);

  const handleFormSubmit = (data: {
    fullName: string;
    whatsappNumber: string;
    inConnectGroup: string;
    connectGroup: string;
  }) => {
    // Simpan data
    setRegistrationData(data);

    // 2. Pindah ke Loading (Splash Screen)
    setView("loading");

    // 3. Tahan selama 2.5 detik untuk animasi, lalu tampilkan undangan
    setTimeout(() => {
      setView("invitation");
    }, 2500);
  };

  const handleClose = () => {
    // Reset ke awal
    setView("form");
    setRegistrationData(null);
  };

  return (
    <main>
      {/* TAMPILAN 1: HERO & FORM */}
      {view === "form" && (
        <div
          className="relative min-h-screen overflow-hidden"
          style={{ backgroundColor: "#7E0A06" }}
        >
          {/* Textured red background (Code asli Anda) */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22%3E%3Crect fill=%22%237e0a06%22 width=%22100%22 height=%22100%22/%3E%3Ccircle cx=%2220%22 cy=%2220%22 r=%221%22 fill=%22%23660804%22 opacity=%220.3%22/%3E%3Ccircle cx=%2250%22 cy=%2240%22 r=%221.5%22 fill=%22%23660804%22 opacity=%220.2%22/%3E%3Ccircle cx=%2280%22 cy=%2260%22 r=%221%22 fill=%22%23660804%22 opacity=%220.25%22/%3E%3Ccircle cx=%2230%22 cy=%2270%22 r=%221.2%22 fill=%22%23660804%22 opacity=%220.3%22/%3E%3C/svg%3E')] opacity-80" />

          {/* Content wrapper */}
          <div className="relative z-10 flex flex-col min-h-screen">
            <HeroSection />

            <section
              id="form-section"
              className="flex flex-col items-center justify-center px-4 py-8 md:py-12 min-h-screen md:min-h-auto"
            >
              <RegistrationForm onSubmit={handleFormSubmit} />
            </section>
          </div>
        </div>
      )}

      {/* TAMPILAN 2: SPLASH SCREEN / LOADER */}
      {view === "loading" && <ChristmasLoader />}

      {/* TAMPILAN 3: HASIL UNDANGAN */}
      {view === "invitation" && (
        <DigitalInvitation data={registrationData} onClose={handleClose} />
      )}
    </main>
  );
}

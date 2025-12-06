"use client";

import { useState } from "react";
import RegistrationForm from "@/components/registration-form";
import HeroSection from "@/components/hero-section";
import DigitalInvitation from "@/components/digital-invitation";

export default function Home() {
  const [formSubmitted, setFormSubmitted] = useState(false);
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
    setRegistrationData(data);
    setFormSubmitted(true);
  };

  const handleClose = () => {
    setFormSubmitted(false);
    setRegistrationData(null);
  };

  return (
    <main>
      {!formSubmitted ? (
        <div
          className="relative min-h-screen overflow-hidden"
          style={{ backgroundColor: "#7E0A06" }}
        >
          {/* Textured red background */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22%3E%3Crect fill=%22%237e0a06%22 width=%22100%22 height=%22100%22/%3E%3Ccircle cx=%2220%22 cy=%2220%22 r=%221%22 fill=%22%23660804%22 opacity=%220.3%22/%3E%3Ccircle cx=%2250%22 cy=%2240%22 r=%221.5%22 fill=%22%23660804%22 opacity=%220.2%22/%3E%3Ccircle cx=%2280%22 cy=%2260%22 r=%221%22 fill=%22%23660804%22 opacity=%220.25%22/%3E%3Ccircle cx=%2230%22 cy=%2270%22 r=%221.2%22 fill=%22%23660804%22 opacity=%220.3%22/%3E%3C/svg%3E')] opacity-80" />

          {/* Content wrapper */}
          <div className="relative z-10 flex flex-col min-h-screen">
            {/* Hero Section (from component with snowfall) */}
            <HeroSection />

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
  );
}

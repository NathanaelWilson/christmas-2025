export default function FrameOverlay() {
  return (
    <div className="absolute inset-0 pointer-events-none z-40">
      {/* Place your PNG in `public/frame.png` */}
      <img
        src="/Top Frame.webp"
        alt="Decorative Frame"
        className="w-full h-full object-cover"
      />
    </div>
  );
}

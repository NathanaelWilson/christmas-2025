export default function FrameOverlay() {
  return (
    <div className="fixed inset-0 pointer-events-none z-40">
      {/* Place your PNG in `public/frame.png` */}
      <img
        src="/Frame.png"
        alt="Decorative Frame"
        className="w-full h-full object-cover"
      />
    </div>
  );
}

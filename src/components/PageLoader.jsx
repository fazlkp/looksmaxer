// ─── components/PageLoader.jsx ───────────────────────────────
export default function PageLoader() {
  return (
    <div className="fixed inset-0 z-[9997] flex items-center justify-center bg-[#24252A]">
      <div className="flex flex-col items-center gap-4">
        <div className="loader-spinner" />
        <p className="font-montserrat font-bold text-[rgba(0,136,169,1)] text-sm tracking-widest uppercase animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  );
}

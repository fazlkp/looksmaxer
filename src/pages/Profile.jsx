// ─── pages/Profile.jsx ───────────────────────────────────────
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { usePageTitle } from "../hooks";
import { toast } from "../utils";

// Resize + compress the image client-side before storing, so we don't
// blow past Firestore's 1MB document size limit.
function resizeImage(file, maxSize = 300) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let { width, height } = img;

        if (width > height && width > maxSize) {
          height = (height * maxSize) / width;
          width = maxSize;
        } else if (height > maxSize) {
          width = (width * maxSize) / height;
          height = maxSize;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", 0.8));
      };
      img.onerror = reject;
      img.src = e.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function Profile() {
  usePageTitle("My Profile");
  const navigate = useNavigate();
  const { currentUser, refreshProfile, logout } = useAuth();
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  if (!currentUser) {
    navigate("/login");
    return null;
  }

  const handlePhotoClick = () => fileInputRef.current?.click();

  const handlePhotoChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file.");
      return;
    }

    setUploading(true);
    try {
      const resizedDataUrl = await resizeImage(file);
      await updateDoc(doc(db, "users", currentUser.uid), {
        photoBase64: resizedDataUrl,
      });
      await refreshProfile();
      toast.success("Profile photo updated!");
    } catch (err) {
      console.error(err);
      toast.error("Couldn't update photo. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const memberSince = currentUser.createdAt
    ? new Date(currentUser.createdAt).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "—";

  return (
    <div className="page-hero-bg min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-black/50 z-0" />
      <div className="relative z-[1] max-w-2xl mx-auto px-6 py-20">
        <span className="badge-pulse inline-block text-[11px] tracking-[0.3em] uppercase text-[rgba(0,200,220,0.9)] font-[Verdana] font-bold mb-4 px-3 py-1 rounded-full border border-[rgba(0,136,169,0.5)]">
          My Account
        </span>
        <h1 className="gradient-title text-3xl md:text-4xl font-montserrat font-black mb-10">
          Profile
        </h1>

        {/* Avatar + basic info */}
        <div className="glass-panel rounded-2xl p-8 mb-6 flex items-center gap-6">
          <div className="relative">
            {currentUser.photoBase64 ? (
              <img
                src={currentUser.photoBase64}
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover border-2 border-[rgba(0,200,220,0.5)]"
              />
            ) : (
              <div className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-montserrat font-black text-white bg-gradient-to-br from-[rgba(0,136,169,1)] to-[rgba(0,200,220,1)]">
                {(currentUser.username || currentUser.email || "U").charAt(0).toUpperCase()}
              </div>
            )}
            <button
              onClick={handlePhotoClick}
              disabled={uploading}
              className="btn-shine absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-[rgba(0,136,169,1)] flex items-center justify-center text-white text-xs border-2 border-[#050506] disabled:opacity-50"
              title="Change photo"
            >
              {uploading ? "…" : "✎"}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoChange}
            />
          </div>

          <div>
            <h2 className="text-xl font-montserrat font-black text-white">
              {currentUser.username || "—"}
            </h2>
            <p className="text-[azure]/60 text-sm font-[Verdana]">{currentUser.email}</p>
          </div>
        </div>

        {/* Account details */}
        <div className="glass-panel rounded-2xl p-6 mb-6">
          <h3 className="text-lg font-montserrat font-black text-white mb-4">Account Details</h3>
          <div className="space-y-3 text-sm font-[Verdana]">
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span className="text-[azure]/50">Username</span>
              <span className="text-[azure]/90">{currentUser.username || "—"}</span>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span className="text-[azure]/50">Email</span>
              <span className="text-[azure]/90">{currentUser.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[azure]/50">Member Since</span>
              <span className="text-[azure]/90">{memberSince}</span>
            </div>
          </div>
        </div>

        {/* Log out */}
        <button
          onClick={handleLogout}
          className="btn-shine w-full h-11 rounded-[40px] font-montserrat font-bold text-sm text-[azure] border border-[rgba(0,136,169,0.6)] bg-white/5 hover:scale-[1.02] transition-transform"
        >
          Log Out
        </button>
      </div>
    </div>
  );
}
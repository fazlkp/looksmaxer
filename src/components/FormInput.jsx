// ─── components/FormInput.jsx ────────────────────────────────
export default function FormInput({
  label,
  id,
  type = "text",
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  touched,
  required,
}) {
  const hasError = touched && error;

  return (
    <div className="mb-5">
      {label && (
        <label
          htmlFor={id}
          className="block text-[rgba(0,136,169,1)] text-sm font-bold font-montserrat mb-1"
        >
          {label} {required && <span className="text-red-400">*</span>}
        </label>
      )}
      <input
        id={id}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        autoComplete={type === "password" ? "current-password" : "on"}
        className={`w-[85%] h-[38px] rounded-[8px] px-3 text-white font-[Verdana] text-sm
          bg-black/50 border-2 transition-all duration-200
          placeholder:text-white/20 placeholder:font-['Times_New_Roman'] placeholder:font-light placeholder:text-[15px]
          ${hasError ? "border-red-500 focus:border-red-400" : "border-black/50 focus:border-[rgba(0,136,169,1)]"}`}
        style={{ display: "block" }}
      />
      {hasError && (
        <p className="mt-1 text-red-400 text-xs font-[Verdana]">{error}</p>
      )}
    </div>
  );
}

export function PasswordStrengthBar({ strength }) {
  const colors = { weak: "bg-red-500", medium: "bg-yellow-400", strong: "bg-green-500" };
  const widths = { weak: "w-1/3", medium: "w-2/3", strong: "w-full" };
  return (
    <div className="mt-1 h-1 bg-white/10 rounded-full overflow-hidden w-[85%]">
      <div className={`h-full rounded-full transition-all duration-500 ${colors[strength] || ""} ${widths[strength] || "w-0"}`} />
    </div>
  );
}

// ─── pages/Payment.jsx ───────────────────────────────────────
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, usePageTitle } from "../hooks";
import { validators, cart, toast, analytics } from "../utils";

const validate = (values) => {
  const errors = {};
  const n = validators.fullName(values.fullName);
  const e = validators.email(values.email);
  if (!n.valid) errors.fullName = n.error;
  if (!e.valid) errors.email = e.error;
  if (!values.method) errors.method = "Please select a payment method.";
  if (!values.type) errors.type = "Please select a payment type.";
  if (!values.terms) errors.terms = "Please agree to terms.";
  return errors;
};

const PAYMENT_METHODS = ["Binance", "Bank to Bank", "PayPal", "Remitly.io"];
const PAYMENT_TYPES = ["Link", "QR Code", "Deposit"];

export default function Payment() {
  usePageTitle("Payment");
  const navigate = useNavigate();
  const selectedPlan = cart.getPlan();

  const { values, errors, touched, isSubmitting, setIsSubmitting, handleChange, handleBlur, validate: runValidate } = useForm(
    { fullName: "", email: "", method: "", type: "", terms: false },
    validate
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!runValidate()) {
      toast.error("Please fill all required fields.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      analytics.track("payment_submitted", {
        plan: selectedPlan?.id,
        method: values.method,
        type: values.type,
      });
      cart.clearPlan();
      toast.success("Payment initiated successfully! Check your email. ✅");
      navigate("/");
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background:
          "linear-gradient(rgba(0,0,0,.55),rgba(0,0,0,.55)), url(https://images5.alphacoders.com/298/298387.jpg) center/cover",
      }}
    >
      <div className="h-[56px]" />

      <div className="flex flex-1 items-center justify-center py-10 px-4">
        <div
          className="w-full max-w-md rounded-[10px] px-7 py-7 page-enter"
          style={{
            background: "rgba(255,255,255,0.12)",
            boxShadow: "-2px 5px 10px black",
            border: "2px solid rgba(0,0,0,0.5)",
          }}
        >
          {/* Selected Plan Badge */}
          {selectedPlan && (
            <div className="mb-4 p-3 rounded-lg bg-[rgba(0,136,169,0.15)] border border-[rgba(0,136,169,0.4)]">
              <p className="text-[rgba(0,136,169,1)] text-sm font-montserrat font-bold">
                ✓ {selectedPlan.title} — ${selectedPlan.price}/mo
              </p>
            </div>
          )}

          <h2 className="font-montserrat font-black text-xl text-white mb-5">
            Payment Details
          </h2>

          <form onSubmit={handleSubmit} noValidate>
            {/* Full Name */}
            <div className="mb-4">
              <label className="block font-montserrat font-bold text-sm text-[azure] mb-1">
                Full Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={values.fullName}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full h-[32px] rounded-[7px] px-3 text-white text-sm bg-black/30 border border-black/50 focus:border-[rgba(0,136,169,1)] outline-none transition-all"
              />
              {touched.fullName && errors.fullName && (
                <p className="text-red-400 text-xs mt-1 font-[Verdana]">{errors.fullName}</p>
              )}
            </div>

            {/* Payment Method */}
            <div className="mb-4">
              <label className="block font-montserrat font-bold text-sm text-[azure] mb-1">
                Payment Method <span className="text-red-400">*</span>
              </label>
              <select
                name="method"
                value={values.method}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full h-[32px] rounded-[10px] px-2 text-sm bg-white/60 text-black border border-black/30 focus:border-[rgba(0,136,169,1)] outline-none transition-all"
              >
                <option value="">Select method</option>
                {PAYMENT_METHODS.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
              {touched.method && errors.method && (
                <p className="text-red-400 text-xs mt-1 font-[Verdana]">{errors.method}</p>
              )}
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block font-montserrat font-bold text-sm text-[azure] mb-1">
                Email Address <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full h-[32px] rounded-[7px] px-3 text-white text-sm bg-black/30 border border-black/50 focus:border-[rgba(0,136,169,1)] outline-none transition-all"
              />
              {touched.email && errors.email && (
                <p className="text-red-400 text-xs mt-1 font-[Verdana]">{errors.email}</p>
              )}
            </div>

            {/* Payment Type */}
            <div className="mb-5">
              <h3 className="font-montserrat font-bold text-sm text-[azure] mb-3">
                Payment Type <span className="text-red-400">*</span>
              </h3>
              <div className="flex gap-4">
                {PAYMENT_TYPES.map((type) => (
                  <label key={type} className="flex items-center gap-2 cursor-pointer text-[azure] text-sm font-[Verdana]">
                    <input
                      type="radio"
                      name="type"
                      value={type}
                      checked={values.type === type}
                      onChange={handleChange}
                      className="accent-[rgba(0,136,169,1)]"
                    />
                    {type}
                  </label>
                ))}
              </div>
              {touched.type && errors.type && (
                <p className="text-red-400 text-xs mt-1 font-[Verdana]">{errors.type}</p>
              )}
            </div>

            {/* Terms */}
            <div className="mb-5">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="terms"
                  checked={values.terms}
                  onChange={handleChange}
                  className="w-4 h-4 accent-[rgba(0,136,169,1)] mt-0.5"
                />
                <span className="text-[azure]/70 text-xs font-[Verdana]">
                  I agree to the{" "}
                  <a
                    href="https://cdn.prod.website-files.com/612c95056c9d4bcd6cdfd320/66f2db2546916f4b4daf0e0d_653f71d84cf1820e12211e7d_juro-user-agreement-preview.png"
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-400 underline"
                  >
                    Terms and Conditions
                  </a>
                </span>
              </label>
              {touched.terms && errors.terms && (
                <p className="text-red-400 text-xs mt-1 font-[Verdana]">{errors.terms}</p>
              )}
            </div>

            {/* Submit */}
            <input
              type="submit"
              value={isSubmitting ? "Processing..." : "Proceed to Pay →"}
              disabled={isSubmitting}
              className="w-full h-[34px] rounded-[8px] bg-green-600 text-black font-montserrat font-bold text-base border-2 border-black/50 cursor-pointer hover:bg-green-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </form>
        </div>
      </div>
    </div>
  );
}

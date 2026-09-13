// ─── pages/Register.jsx ──────────────────────────────────────
import { useNavigate, Link } from "react-router-dom";
import FormInput, { PasswordStrengthBar } from "../components/FormInput";
import { useForm, usePageTitle } from "../hooks";
import { validators, toast, analytics } from "../utils";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

const validate = (values) => {
  const errors = {};
  const u = validators.username(values.username);
  const e = validators.email(values.email);
  const p = validators.password(values.password);
  if (!u.valid) errors.username = u.error;
  if (!e.valid) errors.email = e.error;
  if (!p.valid) errors.password = p.error;
  if (!values.terms) errors.terms = "You must agree to the terms.";
  return errors;
};

export default function Register() {
  usePageTitle("Register");
  const navigate = useNavigate();
  const { values, errors, touched, isSubmitting, setIsSubmitting, handleChange, handleBlur, validate: runValidate } = useForm(
    { username: "", email: "", password: "", terms: false },
    validate
  );

  const pwStrength = validators.password(values.password).strength;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!runValidate()) return;

    setIsSubmitting(true);
    const usernameKey = values.username.trim().toLowerCase();

    try {
      // Make sure this username isn't already taken
      const usernameDoc = await getDoc(doc(db, "usernames", usernameKey));
      if (usernameDoc.exists()) {
        toast.error("That username is already taken — try another.");
        setIsSubmitting(false);
        return;
      }

      // Create the real Firebase Auth account
      const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
      const uid = userCredential.user.uid;

      // Store the profile, and a username→email lookup for login-by-username
      await setDoc(doc(db, "users", uid), {
        username: values.username,
        email: values.email,
        createdAt: new Date().toISOString(),
      });
      await setDoc(doc(db, "usernames", usernameKey), {
        email: values.email,
        uid,
      });

      analytics.track("user_registered", { username: values.username });
      toast.success("Account created! Welcome to LooksMaxer 🎉");
      navigate("/");
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        toast.error("An account with this email already exists.");
      } else if (err.code === "auth/weak-password") {
        toast.error("Password is too weak — try a stronger one.");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col bg-cover bg-center"
      style={{
        background:
          "linear-gradient(rgba(0,0,0,.55),rgba(0,0,0,.55)), url(https://wallpapercat.com/w/full/5/5/a/40645-3840x2160-desktop-4k-zayn-malik-wallpaper-photo.jpg) center/cover",
      }}
    >
      <div className="h-[56px]" />

      <div className="flex flex-1 items-center justify-center py-10 px-4">
        <div
          className="w-full max-w-md rounded-[10px] px-8 py-8 page-enter"
          style={{
            background: "linear-gradient(rgba(0,0,0,0.1),rgba(255,252,252,0.08))",
            boxShadow: "-2px -1px 10px rgba(0,136,169,1)",
          }}
        >
          <h2 className="font-montserrat font-black text-2xl text-yellow-400 mb-6 pt-2">
            Create Account
          </h2>

          <form onSubmit={handleSubmit} noValidate>
            <FormInput
              label="Username"
              id="username"
              name="username"
              type="text"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="choose a username"
              error={errors.username}
              touched={touched.username}
              required
            />
            <FormInput
              label="Email Address"
              id="email"
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="your@email.com"
              error={errors.email}
              touched={touched.email}
              required
            />
            <FormInput
              label="Password"
              id="password"
              name="password"
              type="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="create a strong password"
              error={errors.password}
              touched={touched.password}
              required
            />
            {values.password && (
              <>
                <PasswordStrengthBar strength={pwStrength} />
                <p className="text-xs font-[Verdana] mt-1 mb-3 text-[azure]/60">
                  Strength:{" "}
                  <span className={pwStrength === "strong" ? "text-green-400" : pwStrength === "medium" ? "text-yellow-400" : "text-red-400"}>
                    {pwStrength}
                  </span>
                </p>
              </>
            )}

            <label className="flex items-center gap-3 cursor-pointer mb-5">
              <input
                type="checkbox"
                name="terms"
                checked={values.terms}
                onChange={handleChange}
                className="w-4 h-4 accent-[rgba(0,136,169,1)]"
              />
              <span className="text-[azure]/70 text-sm font-[Verdana]">
                I agree to the{" "}
                <a href="#" className="text-[rgba(0,136,169,1)] underline">
                  Terms & Conditions
                </a>
              </span>
            </label>
            {touched.terms && errors.terms && (
              <p className="text-red-400 text-xs mb-3 font-[Verdana]">{errors.terms}</p>
            )}

            <input
              type="submit"
              value={isSubmitting ? "Creating Account..." : "Proceed →"}
              disabled={isSubmitting}
              className="w-[85%] h-[32px] rounded-[30px] bg-[rgba(0,136,169,1)] text-white font-montserrat font-bold text-sm border-2 border-black/50 cursor-pointer hover:bg-[rgba(0,136,169,0.8)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </form>

          <Link
            to="/login"
            className="block mt-4 text-[13px] text-blue-400 underline font-[Verdana] hover:text-blue-300 transition-colors"
          >
            Already have an account? Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
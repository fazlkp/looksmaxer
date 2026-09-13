// ─── pages/Login.jsx ─────────────────────────────────────────
import { useNavigate, Link } from "react-router-dom";
import FormInput from "../components/FormInput";
import { useForm, usePageTitle } from "../hooks";
import { validators, toast, analytics } from "../utils";
import { auth, db } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const validate = (values) => {
  const errors = {};
  const u = validators.username(values.username);
  const e = validators.email(values.email);
  if (!u.valid) errors.username = u.error;
  if (values.email && !e.valid) errors.email = e.error;
  if (!values.password) errors.password = "Password is required.";
  return errors;
};

export default function Login() {
  usePageTitle("Login");
  const navigate = useNavigate();
  const { values, errors, touched, isSubmitting, setIsSubmitting, handleChange, handleBlur, validate: runValidate } = useForm(
    { username: "", email: "", password: "", otp: false },
    validate
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!runValidate()) return;

    setIsSubmitting(true);

    try {
      // Firebase signs in by email — if the user typed a username instead,
      // look up which email it belongs to first.
      let emailToUse = values.email;

      if (!emailToUse) {
        const usernameKey = values.username.trim().toLowerCase();
        const usernameDoc = await getDoc(doc(db, "usernames", usernameKey));

        if (!usernameDoc.exists()) {
          toast.error("No account found with that username.");
          setIsSubmitting(false);
          return;
        }
        emailToUse = usernameDoc.data().email;
      }

      await signInWithEmailAndPassword(auth, emailToUse, values.password);

      analytics.track("user_logged_in", { username: values.username });
      toast.success(`Welcome back, ${values.username || "there"}! 💪`);
      navigate("/");
    } catch (err) {
      if (err.code === "auth/invalid-credential" || err.code === "auth/wrong-password") {
        toast.error("Incorrect password. Please try again.");
      } else if (err.code === "auth/user-not-found") {
        toast.error("No account found with that email.");
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
          "linear-gradient(rgba(0,0,0,.55),rgba(0,0,0,.55)), url(https://fromheretoheaven.wordpress.com/wp-content/uploads/2012/04/kaka-cristiano-ronaldo-ricardo-kaka-8031338-656-369.jpg) center/cover",
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
            Welcome Back
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
              placeholder="your username"
              error={errors.username}
              touched={touched.username}
              required
            />
            <FormInput
              label="Email Address (optional)"
              id="email"
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="your@email.com"
              error={errors.email}
              touched={touched.email}
            />
            <FormInput
              label="Password"
              id="password"
              name="password"
              type="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="your password"
              error={errors.password}
              touched={touched.password}
              required
            />

            <label className="flex items-center gap-3 cursor-pointer mb-5">
              <input
                type="checkbox"
                name="otp"
                checked={values.otp}
                onChange={handleChange}
                className="w-4 h-4 accent-[rgba(0,136,169,1)]"
              />
              <span className="text-[azure]/70 text-sm font-[Verdana]">
                Get OTP instead
              </span>
            </label>

            <input
              type="submit"
              value={isSubmitting ? "Signing in..." : "Proceed →"}
              disabled={isSubmitting}
              className="w-[85%] h-[32px] rounded-[30px] bg-[rgba(0,136,169,1)] text-white font-montserrat font-bold text-sm border-2 border-black/50 cursor-pointer hover:bg-[rgba(0,136,169,0.8)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </form>

          <Link
            to="/register"
            className="block mt-4 text-[13px] text-blue-400 underline font-[Verdana] hover:text-blue-300 transition-colors"
          >
            Don't have an account? Register
          </Link>
        </div>
      </div>
    </div>
  );
}
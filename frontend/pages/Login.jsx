import { useState } from "react";
import { useAuthStore } from "../src/store/useAuthStore";
import { LuEye, LuEyeOff } from "react-icons/lu";

const Login = () => {
  // State variables for email and password
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center gap-6 p-4">
      <h1 className="text-3xl font-semibold text-black">Sign In</h1>
      <span className="text-xl">or use your email & password</span>

      <input
        type="email"
        placeholder="Email"
        className="input input-bordered w-72"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />

      {/* Password Input with Toggle */}
      <div className="relative w-72">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          className="input input-bordered w-full pr-10"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        <button
          type="button"
          className="absolute inset-y-0 right-3 flex items-center"
          onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? <LuEyeOff size={20} /> : <LuEye size={20} />}
        </button>
      </div>

      <button
        type="submit"
        className="btn btn-primary w-24"
        disabled={isLoggingIn}>
        {isLoggingIn ? "Signing In..." : "Sign In"}
      </button>
    </form>
  );
};

export default Login;

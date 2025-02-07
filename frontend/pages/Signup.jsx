import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../src/store/useAuthStore"; // Import Zustand store
import { LuUpload, LuEyeOff, LuEye, LuCheck } from "react-icons/lu";
import toast from "react-hot-toast";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    avatar: null,
  });

  const navigate = useNavigate();
  const { signup, isSigningUp } = useAuthStore();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, avatar: file }));
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!formData.avatar) return toast("Please upload an avatar.");

    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      form.append(key, value);
    });

    try {
      await signup(form);
      navigate("/dashboard");
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  return (
    <form onSubmit={submitHandler} className="flex flex-col items-center gap-6">
      <h1 className="text-3xl font-semibold text-black">Create Account</h1>
      <input
        type="text"
        name="fullName"
        placeholder="Name"
        className="input input-bordered w-72"
        value={formData.fullName}
        onChange={handleChange}
      />
      <input
        type="text"
        name="username"
        placeholder="Username"
        className="input input-bordered w-72"
        value={formData.username}
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        className="input input-bordered w-72"
        value={formData.email}
        onChange={handleChange}
      />

      <div className="relative w-72">
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Password"
          className="input input-bordered w-full pr-10"
          value={formData.password}
          onChange={handleChange}
        />
        <button
          type="button"
          className="absolute inset-y-0 right-3 flex items-center"
          onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? <LuEyeOff size={20} /> : <LuEye size={20} />}
        </button>
      </div>

      <label className="btn flex gap-2 w-72 justify-center">
        {formData.avatar ? (
          <LuCheck size={20} className="text-green-500" />
        ) : (
          <LuUpload size={20} />
        )}
        {formData.avatar ? formData.avatar.name : "Upload Avatar"}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleAvatarChange}
        />
      </label>

      <button className="btn btn-primary w-24" disabled={isSigningUp}>
        {isSigningUp ? "Signing Up..." : "Sign Up"}
      </button>
    </form>
  );
};

export default Signup;

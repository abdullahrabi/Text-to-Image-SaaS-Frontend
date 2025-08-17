import React, { useEffect, useState, useContext } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { motion } from "motion/react";
import axios from "axios";
import { toast } from "react-toastify";
import CaptchaModal from "./CaptchaModal";

const Login = () => {
  const [state, setState] = useState("Login");
  const { setShowLogin, backendUrl, setToken, setUser } =
    useContext(AppContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Captcha flow
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [formData, setFormData] = useState(null);

  // When user clicks "Login" or "Signup"
  const onSubmitHandler = (e) => {
    e.preventDefault();
    setFormData({ name, email, password, state });
    setShowCaptcha(true); // open captcha instead of calling API directly
  };

  // After captcha success
  const handleCaptchaSuccess = async (token) => {
    try {
      if (formData.state === "Login") {
        const { data } = await axios.post(backendUrl + "/api/user/login", {
          email: formData.email,
          password: formData.password,
          captchaToken: token, // send captcha token too
        });

        if (data.success) {
          setToken(data.token);
          setUser(data.user);
          toast.success("Login Successfully! 😊");
          localStorage.setItem("token", data.token);
          setShowLogin(false);
        } else {
          toast.error(data.message + " 😢");
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/user/register", {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          captchaToken: token,
        });

        if (data.success) {
          setToken(data.token);
          setUser(data.user);
          toast.success("Signup Successful! 😊");
          localStorage.setItem("token", data.token);
          setShowLogin(false);
        } else {
          toast.error(data.message + " 😢");
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message + " 😢");
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center">
      <motion.form
        onSubmit={onSubmitHandler}
        initial={{ opacity: 0.2, y: 50 }}
        transition={{ duration: 0.3 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative bg-white p-10 rounded-xl text-slate-500"
      >
        <h1 className="text-center text-2xl  text-neutral-700 font-medium">
          {state}
        </h1>
        <p className="text-sm mt-3">
          Welcome! {state === "Login" ? "Back!" : ""} Please{" "}
          {state === "Login" ? "login" : "signup"} to continue
        </p>

        {state !== "Login" && (
          <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-5">
            <img src={assets.user_icon} alt="" />
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="outline-none text-sm"
              type="text"
              placeholder="Full Name"
              required
            />
          </div>
        )}

        <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-4">
          <img src={assets.email_icon} alt="" />
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="outline-none text-sm"
            type="email"
            placeholder="Email id"
            required
          />
        </div>

        <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-4">
          <img src={assets.lock_icon} alt="" />
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="outline-none text-sm"
            type="password"
            placeholder="Password"
            required
          />
        </div>

        <p className="text-sm text-blue-600 my-4 cursor-pointer text-center">
          Forgot Password?
        </p>

        <button className="bg-blue-600 w-full text-white py-2 rounded-full">
          {state === "Login" ? "Login" : "Create Account"}
        </button>

        {state === "Login" ? (
          <p className="mt-4 text-center">
            Don't have Account?
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => setState("Sign Up")}
            >
              {" "}
              Sign Up
            </span>
          </p>
        ) : (
          <p className="mt-4 text-center">
            Already have an Account?
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => setState("Login")}
            >
              {" "}
              Login
            </span>
          </p>
        )}

        <img
          onClick={() => setShowLogin(false)}
          className="absolute top-5 right-5 cursor-pointer"
          src={assets.cross_icon}
          alt=""
        />
      </motion.form>

      {showCaptcha && (
        <CaptchaModal
          onVerify={handleCaptchaSuccess}
          onClose={() => setShowCaptcha(false)}
        />
      )}
    </div>
  );
};

export default Login;

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { UserApi } from "../../api";
import { UserRequest } from "../../types";
import useAuth from "../../contexts/AuthContext";

function Register() {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [request, setRequest] = useState<UserRequest>({
    email: "",
    username: "",
    password: "",
    name: "",
  });
  // Error Message
  const [errors, setErrors] = useState({
    email: "",
    username: "",
    password: "",
    name: "",
  });

  // Redirect to home if already logged in
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  // Form Validation
  const validateForm = () => {
    let valid = true;
    let errors = { email: "", username: "", password: "", name: "" };

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(request.email)) {
      errors.email = "Email must be a valid email address.";
      valid = false;
    }

    if (request.username.trim().length < 6) {
      errors.username =
        "Username must be at least 6 characters long (whitespace is not counted).";
      valid = false;
    }

    if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(request.password)) {
      errors.password =
        "Password must be at least 6 characters long and contain at least one letter and one number.";
      valid = false;
    }

    if (!/^[A-Za-z]+$/.test(request.name)) {
      errors.name = "Name must only contain letters.";
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await UserApi.register(request);
      navigate("/login");
    } catch (error) {
      alert((error as any).response.data.message);
    }
  };

  return (
    <div className="bg-black h-screen xl:w-screen flex flex-col justify-center items-center">
      <div className="bg-light-gray w-3/4 md:w-1/2 xl:w-1/3 overflow-y-auto px-10 py-10 xl:px-12 xl:py-16 rounded-lg text-white text-sm md:text-base xl:text-lg font-poppins">
        <p className="text-center text-lg md:text-xl xl:text-2xl font-semibold">
          Create KBL Account
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col mt-8">
          {/* Email */}
          <label>
            EMAIL<span className="text-red-700">*</span>
          </label>
          <input
            type="text"
            value={request.email}
            onChange={(e) => setRequest({ ...request, email: e.target.value })}
            className="bg-black text-white px-4 py-2 mt-2 border rounded-2xl border-white focus:border-light-blue focus:outline-none"
          />
          {/* Error Message */}
          {errors.email && <p className="mt-2 text-red-500">{errors.email}</p>}

          {/* Username */}
          <label className="mt-7">
            USERNAME<span className="text-red-700">*</span>
          </label>
          <input
            type="text"
            value={request.username}
            onChange={(e) =>
              setRequest({ ...request, username: e.target.value })
            }
            className="bg-black text-white px-4 py-2 mt-2 border rounded-2xl border-white focus:border-light-blue focus:outline-none"
          />
          {/* Error Message */}
          {errors.username && (
            <p className="mt-2 text-red-500">{errors.username}</p>
          )}

          {/* Password */}
          <label className="mt-7">
            PASSWORD<span className="text-red-700">*</span>
          </label>
          <input
            type="password"
            value={request.password}
            onChange={(e) =>
              setRequest({ ...request, password: e.target.value })
            }
            className="bg-black text-white px-4 py-2 mt-2 border rounded-2xl border-white focus:border-light-blue focus:outline-none"
          />
          {/* Error Message */}
          {errors.password && (
            <p className="mt-2 text-red-500">{errors.password}</p>
          )}

          {/* Display Name */}
          <label className="mt-7">
            DISPLAY NAME<span className="text-red-700">*</span>
          </label>
          <input
            type="text"
            value={request.name}
            onChange={(e) => setRequest({ ...request, name: e.target.value })}
            className="bg-black text-white px-4 py-2 mt-2 border rounded-2xl border-white focus:border-light-blue focus:outline-none"
          />
          {/* Error Message */}
          {errors.password && (
            <p className="mt-2 text-red-500">{errors.name}</p>
          )}

          {/* Submit Button */}
          <button className="bg-green-500 rounded-lg mt-6 py-2 text-md font-bold hover:bg-green-400">
            Sign Up
          </button>
        </form>
        <p className="text-white mt-5">
          Have an account?{" "}
          <Link
            to="/login"
            className="text-light-blue hover:underline hover:text-blue-300"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;

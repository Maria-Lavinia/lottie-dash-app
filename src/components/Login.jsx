import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/users/UserSlice";
import { useNavigate } from "react-router-dom";
import HelpButton from "./HelpButton";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let userCredentials = {
      username,
      password,
    };
    setError(""); // Reset previous error

    // Simple validation
    if (!username.trim() || !password.trim()) {
      setError("Username and password are required");
      return;
    }
    try {
      const response = await dispatch(loginUser(userCredentials));
      const { access_token } = response.payload;
      const { role } = response.payload;

      // Check if the token exists
      if (access_token && role === "admin") {
        setUsername("");
        setPassword("");
        navigate("/upload-lottie");
      } else {
        navigate("/dashboard");
        setError("Authentication failed");
        console.error("Authentication failed");
      }
    } catch (error) {
      setError("Login failed. Please try again.");
      console.error("Login failed:", error);
    }
  };

  return (
    <>
      <section data-comp="form">
        <HelpButton />
        <h1>Sign in with you email</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">
            Email:
            <input
              type="email"
              id="email"
              autoComplete="off"
              required
              value={username}
              placeholder="dev@frankly.dk"
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>

          <label htmlFor="password">
            Password:
            <input
              type="password"
              id="password"
              required
              value={password}
              placeholder="1234"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          {error && (
            <p style={{ fontSize: 0.8 + "rem" }} data-color="text-error">
              {error}
            </p>
          )}
          <button data-comp="button" type="submit">
            Sign in
          </button>
        </form>
      </section>
    </>
  );
}

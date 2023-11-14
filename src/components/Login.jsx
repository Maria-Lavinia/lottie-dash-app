import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/users/UserSlice";
import { useNavigate } from "react-router-dom";

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

      // Assuming your loginUser action returns the token in the response.data
      const { access_token } = response.payload;

      // Check if the token exists
      if (access_token) {
        setUsername("");
        setPassword("");
        // Only navigate if there is a valid token
        navigate("/dashboard");
      } else {
        setError("Authentication failed");
        console.error("Authentication failed");
      }
    } catch (error) {
      setError("Login failed. Please try again.");
      console.error("Login failed:", error);
      // Handle other errors if needed
    }
  };

  // Use useEffect to check if there is a token in local storage
  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    // If there is a token, navigate to the dashboard
    if (storedToken) {
      navigate("/dashboard");
    }
  }, [navigate]);

  return (
    <>
      <section>
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
              placeholder="mlo@frankly.dk"
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
          {error && <p className="error">{error}</p>}
          <button type="submit">Sign in </button>
        </form>
      </section>
    </>
  );
}

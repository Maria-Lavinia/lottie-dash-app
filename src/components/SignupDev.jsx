import { useState } from "react";
import { useDispatch } from "react-redux";
import { signUpUser } from "../redux/users/UserSlice";
import { useNavigate } from "react-router-dom";
import HelpButton from "./HelpButton";

export default function SignupDev() {
  const [email, setEmail] = useState("@frankly.dk");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role] = useState("user");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let userCredentials = {
      email,
      password,
      firstName,
      lastName,
      role,
    };
    setError(""); // Reset previous error

    // Simple validation
    if (!email.trim() || !password.trim()) {
      setError("Email and password are required");
      return;
    }
    try {
      const response = await dispatch(signUpUser(userCredentials));
      console.log(response);

      if (response.payload === undefined) {
        setError("Authentication failed");
        console.error("Authentication failed");
      } else {
        setEmail("");
        setPassword("");
        setFirstName("");
        setLastName("");
        navigate("/");
      }
    } catch (error) {
      setError("Sign up failed. Please try again.");
      console.error("Sign up failed:", error);
    }
  };

  return (
    <>
      <section data-comp="form">
        <HelpButton />
        <h1>Sign up as a Developer</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">
            Email:
            <input
              type="email"
              id="email"
              autoComplete="off"
              required
              value={email}
              placeholder="dev@frankly.dk"
              onChange={(e) => setEmail(e.target.value)}
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
          <label htmlFor="firstName">
            First Name:
            <input
              type="text"
              id="firstName"
              autoComplete="off"
              required
              value={firstName}
              placeholder="Maria"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </label>
          <label htmlFor="lastName">
            Last Name:
            <input
              type="text"
              id="lastName"
              autoComplete="off"
              required
              value={lastName}
              placeholder="Otelea"
              onChange={(e) => setLastName(e.target.value)}
            />
          </label>
          <label htmlFor="role">
            Role:
            <input
              type="text"
              id="role"
              required
              value={"dev"}
              placeholder="Dev"
              disabled
              onChange={(e) => setRole()}
            />
          </label>
          {error && (
            <p style={{ fontSize: 0.8 + "rem" }} data-color="text-error">
              {error}
            </p>
          )}
          <button data-comp="button" type="submit">
            Sign up
          </button>
        </form>
      </section>
    </>
  );
}

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { postAnimation } from "../redux/animations/AnimationSlice";
import { useNavigate } from "react-router-dom";

export default function UploadAnimation() {
  const [fileName, setFileName] = useState("");
  const [projectName, setProjectName] = useState("");
  const [jsonData, setJsonData] = useState(null);
  const [error, setError] = useState("");
  const [storedId, setStoredId] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [succes, setSucces] = useState(false);

  useEffect(() => {
    const storedId = localStorage.getItem("userId");
    setStoredId(storedId);
  }, []);

  const upload = async (e) => {
    const lottieCredentials = new FormData();
    lottieCredentials.append("userId", storedId);
    lottieCredentials.append("fileName", fileName);
    lottieCredentials.append("projectName", projectName);
    lottieCredentials.append("jsonData", jsonData);
    console.log("lottieCredentials:", lottieCredentials);

    setError("");

    // Simple validation
    if (!fileName.trim() || !projectName.trim() || !jsonData) {
      setError("Name, project, and file are required");
    }

    try {
      await dispatch(postAnimation(lottieCredentials));
    } catch (error) {
      setError("Upload failed. Please try again.");
      console.error("Upload failed:", error);
    }
    setSucces(true);
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setJsonData(file);
  };

  if (succes) {
    navigate("/dashboard");
  }
  return (
    <>
      <section data-comp="form">
        <h1>Upload your Lottie</h1>
        <form onSubmit={upload}>
          <label htmlFor="fileName">
            Lottie name:
            <input
              type="text"
              id="fileName"
              autoComplete="off"
              required
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
            />
          </label>

          <label htmlFor="projectName">
            Project it belongs to:
            <input
              type="text"
              id="projectName"
              autoComplete="off"
              required
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />
          </label>
          <label htmlFor="jsonData">
            Upload here:
            <input
              type="file"
              multiple="multiple"
              id="jsonData"
              accept=".json,application/json"
              required
              filename=""
              onChange={handleFileChange}
            />
          </label>
          {error && <p className="error">{error}</p>}
          <button data-comp="button" type="submit">
            Upload{" "}
          </button>
        </form>
      </section>
    </>
  );
}

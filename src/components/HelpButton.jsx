import React from "react";
import HelpIcon from "@mui/icons-material/Help";

const HelpButton = ({ url }) => {
  const handleDownload = () => {
    // Create a download link
    const blob = new Blob([url], { type: "application/json" });
    const blobUrl = URL.createObjectURL(blob);

    // Create a download link
    const a = document.createElement("a");
    a.href = `${process.env.PUBLIC_URL}/download/loc-placeholder.json`; // desired filename
    a.download = "loc-placeholder.json"; // desired filename
    document.body.appendChild(a);

    // Trigger a click on the link to initiate the download
    a.click();

    // Remove the link from the DOM
    document.body.removeChild(a);

    // Revoke the temporary URL to free up resources
    URL.revokeObjectURL(blobUrl);
  };

  return (
    <>
      <div data-comp="helpBtn">
        <HelpIcon onClick={handleDownload}>
          {/* <dialog open>Help</dialog> */}
        </HelpIcon>
        <p data-color="text-black">
          Click to download a Lottie animation that you can use within this app.
        </p>
      </div>
    </>
  );
};

export default HelpButton;

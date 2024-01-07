import React from "react";
import HelpIcon from "@mui/icons-material/Help";

const HelpButton = ({ url }) => {
  const handleDownload = () => {
    const blob = new Blob([url], { type: "application/json" });
    const blobUrl = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = `${process.env.PUBLIC_URL}/download/loc-placeholder.json`;
    a.download = "loc-placeholder.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
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

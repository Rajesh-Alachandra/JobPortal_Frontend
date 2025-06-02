import React, { useEffect, useState } from "react";
import { Button } from "reactstrap";

const ScrolltoTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Handle scroll event
  const handleScroll = () => {
    const scrollTop =
      document.body.scrollTop || document.documentElement.scrollTop;
    setIsVisible(scrollTop > 20);
  };

  // Add scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    // Clean up
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top
  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // If not visible, don't render the button
  if (!isVisible) return null;

  return (
    <Button
      id="back-to-top"
      className="p-0"
      onClick={scrollTop}
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        display: "inline-block",
        zIndex: 1000,
        borderRadius: "50%",
        backgroundColor: "#007bff",
        color: "#fff",
        padding: "10px 15px",
        border: "none",
      }}
    >
      <i className="mdi mdi-arrow-up"></i>
    </Button>
  );
};

export default ScrolltoTop;

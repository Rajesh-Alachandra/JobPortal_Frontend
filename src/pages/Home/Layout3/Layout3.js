import React from "react";
import Home from "../Home";
import Section from "../Layout3/Section";

const Layout3 = () => {
  document.title = "Home | Katlyst - Job Listing Template | Themesdesign";
  return (
    <React.Fragment>
      <Section />
      <Home />
    </React.Fragment>
  );
};
export default Layout3;

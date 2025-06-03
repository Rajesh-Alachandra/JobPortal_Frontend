import React from "react";
import Section from "../Team/Section";
import TeamPage from "../Team/TeamPage";

const Team = () => {
  document.title = "Team | Katlyst - Job Listing Template | Themesdesign";
  return (
    <React.Fragment>
      <Section />
      <TeamPage />
    </React.Fragment>
  );
};

export default Team;

import React from "react";
import Select from "react-select";

const IndiaDevelopedCities = () => {
  const options = [
    { value: "bangalore", label: "Bangalore" },
    { value: "mumbai", label: "Mumbai" },
    { value: "delhi", label: "Delhi" },
    { value: "hyderabad", label: "Hyderabad" },
    { value: "chennai", label: "Chennai" },
    { value: "pune", label: "Pune" },
    { value: "ahmedabad", label: "Ahmedabad" },
    { value: "kolkata", label: "Kolkata" },
    { value: "noida", label: "Noida" },
    { value: "gurugram", label: "Gurugram" },
    { value: "surat", label: "Surat" },
    { value: "jaipur", label: "Jaipur" },
    { value: "coimbatore", label: "Coimbatore" },
    { value: "indore", label: "Indore" },
    { value: "visakhapatnam", label: "Visakhapatnam" },
    { value: "nagpur", label: "Nagpur" },
    { value: "bhubaneswar", label: "Bhubaneswar" },
    { value: "chandigarh", label: "Chandigarh" },
    { value: "thiruvananthapuram", label: "Thiruvananthapuram" },
    { value: "vadodara", label: "Vadodara" }
  ];

  const colourStyles = {
    control: (base) => ({
      ...base,
      border: 0,
      boxShadow: "none",
      padding: "12px 0 12px 35px",
      margin: "-16px 0 0 -45px",
      borderRadius: "0",
      outline: "none"
    })
  };

  return (
    <React.Fragment>
      <Select
        options={options}
        className="choices selectForm__inner"
        defaultValue={{ label: "Bangalore", value: "bangalore" }}
        styles={colourStyles}
      />
    </React.Fragment>
  );
};

export default IndiaDevelopedCities;

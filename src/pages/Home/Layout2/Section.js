import React from "react";
import { Col, Container, Row, Form } from "reactstrap";
import { useNavigate } from "react-router-dom"; // Step 1: Import
import processImage2 from "../../../assets/images/process-02.png";
import CountryOptions from "../SubSection/CountryOptions";
import JobSearch from "../SubSection/JobSearch";

const Section = () => {
  const navigate = useNavigate(); // Step 2: Initialize

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submit
    navigate("/joblist"); // Navigate to jobslist
  };

  return (
    <React.Fragment>
      <section className="bg-home2" id="home">
        <Container>
          <Row className="align-items-center">
            <Col lg={7}>
              <div className="mb-4 pb-3 me-lg-5">
                <h6 className="sub-title">We have 150,000+ live jobs</h6>
                <h1 className="display-5 fw-semibold mb-3">
                  Find your dream jobs with{" "}
                  <span className="text-primary fw-bold">Katlyst</span>
                </h1>
                <p className="lead text-muted mb-0">
                  Find jobs, create trackable resumes and enrich your
                  applications. Carefully crafted after analyzing the needs of
                  different industries.
                </p>
              </div>
              <Form onSubmit={handleSubmit}> {/* Step 3: Handle submit */}
                <div className="registration-form">
                  <Row className="g-0">
                    <Col md={4}>
                      <div className="filter-search-form filter-border mt-1 mt-md-0 ">
                        <i className="uil uil-briefcase-alt"></i>
                        <JobSearch />
                      </div>
                    </Col>
                    <Col md={4}>
                      <div className="filter-search-form mt-3 mt-md-0">
                        <i className="uil uil-map-marker"></i>
                        <CountryOptions />
                      </div>
                    </Col>
                    <Col md={4}>
                      <div className="mt-3 mt-md-0 h-100">
                        <button
                          className="btn btn-primary submit-btn w-100 h-100"
                          type="submit"
                        >
                          <i className="uil uil-search me-1"></i> Find Job
                        </button>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Form>
            </Col>

            <Col lg={5}>
              <div className="mt-5 mt-md-0">
                <img src={processImage2} alt="" className="home-img" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
};

export default Section;

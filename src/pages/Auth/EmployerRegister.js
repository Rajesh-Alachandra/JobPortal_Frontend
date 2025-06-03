import React, { useState } from "react";
import { Card, CardBody, Col, Container, Input, Row, Label } from "reactstrap";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";

import lightLogo from "../../assets/images/logo-light.png";
import darkLogo from "../../assets/images/logo-dark.png";
import signInImage from "../../assets/images/auth/sign-in.png";

const EmployerRegister = () => {
    document.title = "Sign Up | Jobcy - Job Listing Template";

    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        companyName: "",
        email: "",
        password: "",
        phone: "",
        website: "",
        companySize: "",
        industry: "",
        description: "",
        address: "",
        city: "",
        state: "",
        country: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleNext = () => setStep(step + 1);
    const handleBack = () => setStep(step - 1);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitted Data:", formData);
        // You can POST to backend here using axios or fetch
    };

    return (
        <React.Fragment>
            <div className="main-content">
                <div className="page-content">
                    <section className="bg-auth">
                        <Container>
                            <Row className="justify-content-center">
                                <Col xl={10} lg={12}>
                                    <Card className="auth-box">
                                        <Row className="g-0">
                                            <Col lg={6} className="text-center">
                                                <CardBody className="p-4">
                                                    <Link to="/">
                                                        <img src={lightLogo} alt="" className="logo-light" />
                                                        <img src={darkLogo} alt="" className="logo-dark" />
                                                    </Link>
                                                    <div className="mt-5">
                                                        <img src={signInImage} alt="" className="img-fluid" />
                                                    </div>
                                                </CardBody>
                                            </Col>
                                            <Col lg={6}>
                                                <CardBody className="auth-content p-5 h-100 text-white">
                                                    <div className="w-100">
                                                        <div className="text-center mb-4">
                                                            <h5>Register Your Company</h5>
                                                            <p className="text-white-70">Step {step} of 3</p>
                                                        </div>
                                                        <Form onSubmit={handleSubmit} className="auth-form">
                                                            {step === 1 && (
                                                                <>
                                                                    <div className="mb-3">
                                                                        <Label for="companyName">Company Name</Label>
                                                                        <Input
                                                                            type="text"
                                                                            id="companyName"
                                                                            placeholder="Enter your company name"
                                                                            value={formData.companyName}
                                                                            onChange={handleChange}
                                                                            required
                                                                        />
                                                                    </div>
                                                                    <div className="mb-3">
                                                                        <Label for="email">Email</Label>
                                                                        <Input
                                                                            type="email"
                                                                            id="email"
                                                                            placeholder="Enter email address"
                                                                            value={formData.email}
                                                                            onChange={handleChange}
                                                                            required
                                                                        />
                                                                    </div>
                                                                    <div className="mb-3">
                                                                        <Label for="password">Password</Label>
                                                                        <Input
                                                                            type="password"
                                                                            id="password"
                                                                            placeholder="Create a password"
                                                                            value={formData.password}
                                                                            onChange={handleChange}
                                                                            required
                                                                        />
                                                                    </div>
                                                                </>
                                                            )}

                                                            {step === 2 && (
                                                                <>
                                                                    <div className="mb-3">
                                                                        <Label for="phone">Phone</Label>
                                                                        <Input
                                                                            type="text"
                                                                            id="phone"
                                                                            placeholder="Enter phone number"
                                                                            value={formData.phone}
                                                                            onChange={handleChange}
                                                                        />
                                                                    </div>
                                                                    <div className="mb-3">
                                                                        <Label for="website">Website</Label>
                                                                        <Input
                                                                            type="text"
                                                                            id="website"
                                                                            placeholder="https://yourcompany.com"
                                                                            value={formData.website}
                                                                            onChange={handleChange}
                                                                        />
                                                                    </div>
                                                                    <div className="mb-3">
                                                                        <Label for="companySize">Company Size</Label>
                                                                        <Input
                                                                            type="select"
                                                                            id="companySize"
                                                                            value={formData.companySize}
                                                                            onChange={handleChange}
                                                                        >
                                                                            <option value="">Select company size</option>
                                                                            <option>1-10</option>
                                                                            <option>11-50</option>
                                                                            <option>51-200</option>
                                                                            <option>201-500</option>
                                                                            <option>500+</option>
                                                                        </Input>
                                                                    </div>
                                                                    <div className="mb-3">
                                                                        <Label for="industry">Industry</Label>
                                                                        <Input
                                                                            type="text"
                                                                            id="industry"
                                                                            placeholder="e.g. Information Technology"
                                                                            value={formData.industry}
                                                                            onChange={handleChange}
                                                                        />
                                                                    </div>
                                                                    <div className="mb-3">
                                                                        <Label for="description">Description</Label>
                                                                        <Input
                                                                            type="textarea"
                                                                            id="description"
                                                                            placeholder="Brief about your company"
                                                                            value={formData.description}
                                                                            onChange={handleChange}
                                                                        />
                                                                    </div>

                                                                </>
                                                            )}

                                                            {step === 3 && (
                                                                <>
                                                                    <div className="mb-3">
                                                                        <Label for="address">Address</Label>
                                                                        <Input
                                                                            type="textarea"
                                                                            id="address"
                                                                            placeholder="Street, Building, Area"
                                                                            value={formData.address}
                                                                            onChange={handleChange}
                                                                        />
                                                                    </div>
                                                                    <div className="mb-3">
                                                                        <Label for="city">City</Label>
                                                                        <Input
                                                                            type="text"
                                                                            id="city"
                                                                            placeholder="e.g. Mumbai"
                                                                            value={formData.city}
                                                                            onChange={handleChange}
                                                                        />
                                                                    </div>
                                                                    <div className="mb-3">
                                                                        <Label for="state">State</Label>
                                                                        <Input
                                                                            type="text"
                                                                            id="state"
                                                                            placeholder="e.g. Maharashtra"
                                                                            value={formData.state}
                                                                            onChange={handleChange}
                                                                        />
                                                                    </div>
                                                                    <div className="mb-3">
                                                                        <Label for="country">Country</Label>
                                                                        <Input
                                                                            type="text"
                                                                            id="country"
                                                                            placeholder="e.g. India"
                                                                            value={formData.country}
                                                                            onChange={handleChange}
                                                                        />
                                                                    </div>
                                                                </>
                                                            )}

                                                            <div className="d-flex justify-content-between mt-4">
                                                                {step > 1 && (
                                                                    <button type="button" className="btn btn-secondary" onClick={handleBack}>
                                                                        Back
                                                                    </button>
                                                                )}
                                                                {step < 3 ? (
                                                                    <button type="button" className="btn btn-white btn-hover" onClick={handleNext}>
                                                                        Next
                                                                    </button>
                                                                ) : (
                                                                    <button type="submit" className="btn btn-white btn-hover w-50">
                                                                        Submit
                                                                    </button>
                                                                )}
                                                            </div>
                                                        </Form>

                                                        <div className="mt-4 text-center">
                                                            <p className="mb-0">
                                                                Already registered?{" "}
                                                                <Link to="/employerlogin" className="fw-medium text-white text-decoration-underline">
                                                                    Sign In
                                                                </Link>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </CardBody>
                                            </Col>
                                        </Row>
                                    </Card>
                                </Col>
                            </Row>
                        </Container>
                    </section>
                </div>
            </div>
        </React.Fragment>
    );
};

export default EmployerRegister;

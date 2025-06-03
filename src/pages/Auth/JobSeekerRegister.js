import React, { useState } from "react";
import { Card, CardBody, Col, Container, Input, Row, FormGroup, Label } from "reactstrap";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";

// Images
import lightLogo from "../../assets/images/logo-light.png";
import darkLogo from "../../assets/images/logo-dark.png";
import signUpImage from "../../assets/images/auth/sign-up.png";

const JobSeekerRegister = () => {
    document.title = "Register | Katlyst - Job Listing Template | Themesdesign";

    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        firstName: "", lastName: "", email: "", password: "",
        phone: "", dateOfBirth: "", gender: "",
        address: "", city: "", state: "", country: "",
        skills: "", experience: "", education: "",
        currentJobTitle: "", expectedSalary: "", profileImage: null
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: files ? files[0] : value
        }));
    };

    const handleNext = () => setStep(prev => prev + 1);
    const handleBack = () => setStep(prev => prev - 1);
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitted", formData);
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
                                                        <img src={signUpImage} alt="" className="img-fluid" />
                                                    </div>
                                                </CardBody>
                                            </Col>
                                            <Col lg={6}>
                                                <CardBody className="auth-content p-5 h-100 text-white">
                                                    <div className="w-100">
                                                        <div className="text-center mb-4">
                                                            <h5>Create Your Account</h5>
                                                            <p className="text-white-70">Register as a Job Seeker</p>
                                                        </div>

                                                        <Form onSubmit={handleSubmit} className="auth-form">
                                                            {/* Step 1 */}
                                                            {step === 1 && (
                                                                <>
                                                                    <Row>
                                                                        <Col md={6}>
                                                                            <FormGroup>
                                                                                <Label>First Name</Label>
                                                                                <Input type="text" name="firstName" placeholder="Enter your first name" onChange={handleChange} required />
                                                                            </FormGroup>
                                                                        </Col>
                                                                        <Col md={6}>
                                                                            <FormGroup>
                                                                                <Label>Last Name</Label>
                                                                                <Input type="text" name="lastName" placeholder="Enter your last name" onChange={handleChange} required />
                                                                            </FormGroup>
                                                                        </Col>
                                                                    </Row>
                                                                    <FormGroup>
                                                                        <Label>Email</Label>
                                                                        <Input type="email" name="email" placeholder="Enter your email address" onChange={handleChange} required />
                                                                    </FormGroup>
                                                                    <FormGroup>
                                                                        <Label>Password</Label>
                                                                        <Input type="password" name="password" placeholder="Enter your password" onChange={handleChange} required />
                                                                    </FormGroup>
                                                                </>
                                                            )}

                                                            {/* Step 2 */}
                                                            {step === 2 && (
                                                                <>
                                                                    <FormGroup>
                                                                        <Label>Phone</Label>
                                                                        <Input type="text" name="phone" placeholder="Enter your phone number" onChange={handleChange} />
                                                                    </FormGroup>
                                                                    <Row>
                                                                        <Col md={6}>
                                                                            <FormGroup>
                                                                                <Label>Date of Birth</Label>
                                                                                <Input type="date" name="dateOfBirth" onChange={handleChange} />
                                                                            </FormGroup>
                                                                        </Col>
                                                                        <Col md={6}>
                                                                            <FormGroup>
                                                                                <Label>Gender</Label>
                                                                                <Input type="select" name="gender" onChange={handleChange}>
                                                                                    <option value="">Select gender</option>
                                                                                    <option value="Male">Male</option>
                                                                                    <option value="Female">Female</option>
                                                                                    <option value="Other">Other</option>
                                                                                </Input>
                                                                            </FormGroup>
                                                                        </Col>
                                                                    </Row>
                                                                </>
                                                            )}

                                                            {/* Step 3 */}
                                                            {step === 3 && (
                                                                <>
                                                                    <FormGroup>
                                                                        <Label>Address</Label>
                                                                        <Input type="textarea" name="address" placeholder="Enter your address" onChange={handleChange} />
                                                                    </FormGroup>
                                                                    <Row>
                                                                        <Col md={4}>
                                                                            <FormGroup>
                                                                                <Label>City</Label>
                                                                                <Input type="text" name="city" placeholder="Enter city" onChange={handleChange} />
                                                                            </FormGroup>
                                                                        </Col>
                                                                        <Col md={4}>
                                                                            <FormGroup>
                                                                                <Label>State</Label>
                                                                                <Input type="text" name="state" placeholder="Enter state" onChange={handleChange} />
                                                                            </FormGroup>
                                                                        </Col>
                                                                        <Col md={4}>
                                                                            <FormGroup>
                                                                                <Label>Country</Label>
                                                                                <Input type="text" name="country" placeholder="Enter country" onChange={handleChange} />
                                                                            </FormGroup>
                                                                        </Col>
                                                                    </Row>
                                                                </>
                                                            )}

                                                            {/* Step 4 */}
                                                            {step === 4 && (
                                                                <>
                                                                    <FormGroup>
                                                                        <Label>Skills</Label>
                                                                        <Input type="text" name="skills" placeholder="Enter skills (comma separated)" onChange={handleChange} />
                                                                    </FormGroup>
                                                                    <Row>
                                                                        <Col md={6}>
                                                                            <FormGroup>
                                                                                <Label>Experience (Years)</Label>
                                                                                <Input type="number" name="experience" placeholder="e.g., 3" onChange={handleChange} />
                                                                            </FormGroup>
                                                                        </Col>
                                                                        <Col md={6}>
                                                                            <FormGroup>
                                                                                <Label>Expected Salary</Label>
                                                                                <Input type="number" name="expectedSalary" placeholder="e.g., 50000" onChange={handleChange} />
                                                                            </FormGroup>
                                                                        </Col>
                                                                    </Row>
                                                                </>
                                                            )}

                                                            {/* Step 5 */}
                                                            {step === 5 && (
                                                                <>
                                                                    <FormGroup>
                                                                        <Label>Education</Label>
                                                                        <Input type="text" name="education" placeholder="Enter education details" onChange={handleChange} />
                                                                    </FormGroup>
                                                                    <FormGroup>
                                                                        <Label>Current Job Title</Label>
                                                                        <Input type="text" name="currentJobTitle" placeholder="Enter current job title" onChange={handleChange} />
                                                                    </FormGroup>
                                                                    <FormGroup>
                                                                        <Label>Profile Image</Label>
                                                                        <Input type="file" name="profileImage" accept="image/*" onChange={handleChange} />
                                                                    </FormGroup>
                                                                </>
                                                            )}

                                                            {/* Navigation Buttons */}
                                                            <div className="d-flex justify-content-between mt-4">
                                                                {step > 1 && (
                                                                    <button type="button" className="btn btn-light" onClick={handleBack}>
                                                                        Back
                                                                    </button>
                                                                )}
                                                                {step < 5 && (
                                                                    <button type="button" className="btn btn-white btn-hover" onClick={handleNext}>
                                                                        Next
                                                                    </button>
                                                                )}
                                                                {step === 5 && (
                                                                    <button type="submit" className="btn btn-white btn-hover w-100">
                                                                        Register
                                                                    </button>
                                                                )}
                                                            </div>
                                                        </Form>

                                                        <div className="mt-4 text-center">
                                                            <p className="mb-0">
                                                                Already have an account?{" "}
                                                                <Link to="/jobseeker/login" className="fw-medium text-white text-decoration-underline">
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

export default JobSeekerRegister;

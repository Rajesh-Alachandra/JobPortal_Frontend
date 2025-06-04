import React, { useState, useEffect } from "react";
import { Card, CardBody, Col, Container, Row, Alert } from "reactstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../components/AuthContext";

// Images
import signInImage from "../../assets/images/auth/sign-in.png";

// Validation schemas for each step
const validationSchemas = [
    // Step 1 - Basic Company Info
    Yup.object({
        companyName: Yup.string()
            .min(2, "Company name must be at least 2 characters")
            .max(100, "Company name must be less than 100 characters")
            .required("Company name is required"),
        email: Yup.string()
            .email("Invalid email format")
            .required("Email is required"),
        password: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "Password must contain at least one uppercase, one lowercase, and one number")
            .required("Password is required"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required("Confirm password is required")
    }),
    // Step 2 - Company Details
    Yup.object({
        phone: Yup.string()
            .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
            .required("Phone number is required"),
        website: Yup.string()
            .url("Please enter a valid URL")
            .nullable(),
        companySize: Yup.string().required("Company size is required"),
        industry: Yup.string()
            .min(2, "Industry must be at least 2 characters")
            .required("Industry is required"),
        description: Yup.string()
            .min(10, "Description must be at least 10 characters")
            .max(500, "Description must be less than 500 characters")
            .required("Company description is required")
    }),
    // Step 3 - Address Info
    Yup.object({
        address: Yup.string()
            .min(5, "Address must be at least 5 characters")
            .required("Address is required"),
        city: Yup.string()
            .min(2, "City must be at least 2 characters")
            .required("City is required"),
        state: Yup.string()
            .min(2, "State must be at least 2 characters")
            .required("State is required"),
        country: Yup.string()
            .min(2, "Country must be at least 2 characters")
            .required("Country is required")
    })
];

const EmployerRegister = () => {
    const { register, isAuthenticated, loading } = useAuth();
    const navigate = useNavigate();

    const [step, setStep] = useState(1);
    const [registrationError, setRegistrationError] = useState("");
    const [registrationSuccess, setRegistrationSuccess] = useState("");

    // Redirect if already authenticated
    useEffect(() => {
        if (isAuthenticated()) {
            navigate('/employer/dashboard', { replace: true });
        }
    }, [isAuthenticated, navigate]);

    // Set document title
    useEffect(() => {
        document.title = "Employer Register | Katlyst - Job Listing Template";
    }, []);

    // Initial form values
    const initialValues = {
        companyName: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        website: "",
        companySize: "",
        industry: "",
        description: "",
        address: "",
        city: "",
        state: "",
        country: "",
        companyLogo: null
    };

    // Handle form submission
    const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
        try {
            setRegistrationError("");
            setRegistrationSuccess("");
            setSubmitting(true);

            // Prepare form data for API
            const formData = new FormData();

            // Add all form fields
            Object.keys(values).forEach(key => {
                if (key !== 'confirmPassword' && key !== 'companyLogo') {
                    formData.append(key, values[key]);
                }
            });

            // Add company logo if selected
            if (values.companyLogo) {
                formData.append('companyLogo', values.companyLogo);
            }

            console.log('Attempting employer registration...'); // Debug log

            // Call register function from AuthContext
            const userData = await register('employer', formData);

            console.log('Employer registration successful:', userData); // Debug log

            setRegistrationSuccess("Registration successful! Redirecting to dashboard...");

            // Redirect to employer dashboard
            setTimeout(() => {
                navigate('/employer/dashboard', { replace: true });
            }, 1500);

        } catch (error) {
            console.error('Employer registration error:', error); // Debug log
            setRegistrationError(error.message || "Registration failed. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    // Handle next step
    const handleNext = (errors) => {
        if (Object.keys(errors).length === 0) {
            setStep(prev => prev + 1);
        }
    };

    // Handle back step
    const handleBack = () => {
        setStep(prev => prev - 1);
    };

    // Get current step validation schema
    const getCurrentValidationSchema = () => {
        return validationSchemas[step - 1];
    };

    // Render step content
    const renderStepContent = (values, errors, touched, setFieldValue) => {
        switch (step) {
            case 1:
                return (
                    <>
                        <div className="text-center mb-4">
                            <h6 className="text-white-70">Step 1 of 3 - Basic Company Information</h6>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Company Name *</label>
                            <Field
                                name="companyName"
                                type="text"
                                className={`form-control ${errors.companyName && touched.companyName ? 'is-invalid' : ''}`}
                                placeholder="Enter your company name"
                            />
                            <ErrorMessage name="companyName" component="div" className="invalid-feedback d-block" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email Address *</label>
                            <Field
                                name="email"
                                type="email"
                                className={`form-control ${errors.email && touched.email ? 'is-invalid' : ''}`}
                                placeholder="Enter company email address"
                            />
                            <ErrorMessage name="email" component="div" className="invalid-feedback d-block" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password *</label>
                            <Field
                                name="password"
                                type="password"
                                className={`form-control ${errors.password && touched.password ? 'is-invalid' : ''}`}
                                placeholder="Create a password"
                            />
                            <ErrorMessage name="password" component="div" className="invalid-feedback d-block" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Confirm Password *</label>
                            <Field
                                name="confirmPassword"
                                type="password"
                                className={`form-control ${errors.confirmPassword && touched.confirmPassword ? 'is-invalid' : ''}`}
                                placeholder="Confirm your password"
                            />
                            <ErrorMessage name="confirmPassword" component="div" className="invalid-feedback d-block" />
                        </div>
                    </>
                );
            case 2:
                return (
                    <>
                        <div className="text-center mb-4">
                            <h6 className="text-white-70">Step 2 of 3 - Company Details</h6>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Phone Number *</label>
                            <Field
                                name="phone"
                                type="text"
                                className={`form-control ${errors.phone && touched.phone ? 'is-invalid' : ''}`}
                                placeholder="Enter phone number"
                            />
                            <ErrorMessage name="phone" component="div" className="invalid-feedback d-block" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Website</label>
                            <Field
                                name="website"
                                type="url"
                                className={`form-control ${errors.website && touched.website ? 'is-invalid' : ''}`}
                                placeholder="https://yourcompany.com"
                            />
                            <ErrorMessage name="website" component="div" className="invalid-feedback d-block" />
                        </div>
                        <Row>
                            <Col md={6}>
                                <div className="mb-3">
                                    <label className="form-label">Company Size *</label>
                                    <Field
                                        name="companySize"
                                        as="select"
                                        className={`form-control ${errors.companySize && touched.companySize ? 'is-invalid' : ''}`}
                                    >
                                        <option value="">Select company size</option>
                                        <option value="1-10">1-10 employees</option>
                                        <option value="11-50">11-50 employees</option>
                                        <option value="51-200">51-200 employees</option>
                                        <option value="201-500">201-500 employees</option>
                                        <option value="500+">500+ employees</option>
                                    </Field>
                                    <ErrorMessage name="companySize" component="div" className="invalid-feedback d-block" />
                                </div>
                            </Col>
                            <Col md={6}>
                                <div className="mb-3">
                                    <label className="form-label">Industry *</label>
                                    <Field
                                        name="industry"
                                        type="text"
                                        className={`form-control ${errors.industry && touched.industry ? 'is-invalid' : ''}`}
                                        placeholder="e.g. Information Technology"
                                    />
                                    <ErrorMessage name="industry" component="div" className="invalid-feedback d-block" />
                                </div>
                            </Col>
                        </Row>
                        <div className="mb-3">
                            <label className="form-label">Company Description *</label>
                            <Field
                                name="description"
                                as="textarea"
                                rows="4"
                                className={`form-control ${errors.description && touched.description ? 'is-invalid' : ''}`}
                                placeholder="Brief description about your company"
                            />
                            <ErrorMessage name="description" component="div" className="invalid-feedback d-block" />
                        </div>
                    </>
                );
            case 3:
                return (
                    <>
                        <div className="text-center mb-4">
                            <h6 className="text-white-70">Step 3 of 3 - Company Address</h6>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Address *</label>
                            <Field
                                name="address"
                                as="textarea"
                                rows="3"
                                className={`form-control ${errors.address && touched.address ? 'is-invalid' : ''}`}
                                placeholder="Street, Building, Area"
                            />
                            <ErrorMessage name="address" component="div" className="invalid-feedback d-block" />
                        </div>
                        <Row>
                            <Col md={4}>
                                <div className="mb-3">
                                    <label className="form-label">City *</label>
                                    <Field
                                        name="city"
                                        type="text"
                                        className={`form-control ${errors.city && touched.city ? 'is-invalid' : ''}`}
                                        placeholder="e.g. Mumbai"
                                    />
                                    <ErrorMessage name="city" component="div" className="invalid-feedback d-block" />
                                </div>
                            </Col>
                            <Col md={4}>
                                <div className="mb-3">
                                    <label className="form-label">State *</label>
                                    <Field
                                        name="state"
                                        type="text"
                                        className={`form-control ${errors.state && touched.state ? 'is-invalid' : ''}`}
                                        placeholder="e.g. Maharashtra"
                                    />
                                    <ErrorMessage name="state" component="div" className="invalid-feedback d-block" />
                                </div>
                            </Col>
                            <Col md={4}>
                                <div className="mb-3">
                                    <label className="form-label">Country *</label>
                                    <Field
                                        name="country"
                                        type="text"
                                        className={`form-control ${errors.country && touched.country ? 'is-invalid' : ''}`}
                                        placeholder="e.g. India"
                                    />
                                    <ErrorMessage name="country" component="div" className="invalid-feedback d-block" />
                                </div>
                            </Col>
                        </Row>
                        <div className="mb-3">
                            <label className="form-label">Company Logo</label>
                            <input
                                name="companyLogo"
                                type="file"
                                className="form-control"
                                accept="image/*"
                                onChange={(e) => setFieldValue('companyLogo', e.target.files[0])}
                            />
                            <small className="form-text text-muted">
                                Upload your company logo (optional)
                            </small>
                        </div>
                    </>
                );
            default:
                return null;
        }
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
                                                        <span className="ms-2 fw-bold" style={{ fontSize: "1.5rem", letterSpacing: "1px" }}>Katlyst</span>
                                                    </Link>
                                                    <div className="mt-5">
                                                        <img src={signInImage} alt="Sign Up" className="img-fluid" />
                                                    </div>
                                                </CardBody>
                                            </Col>
                                            <Col lg={6}>
                                                <CardBody className="auth-content p-5 h-100 text-white">
                                                    <div className="w-100">
                                                        <div className="text-center mb-4">
                                                            <h5>Register Your Company</h5>
                                                        </div>

                                                        {/* Registration Error Alert */}
                                                        {registrationError && (
                                                            <Alert color="danger" className="mb-3">
                                                                <i className="mdi mdi-alert-circle-outline me-2"></i>
                                                                {registrationError}
                                                            </Alert>
                                                        )}

                                                        {/* Registration Success Alert */}
                                                        {registrationSuccess && (
                                                            <Alert color="success" className="mb-3">
                                                                <i className="mdi mdi-check-circle-outline me-2"></i>
                                                                {registrationSuccess}
                                                            </Alert>
                                                        )}

                                                        {/* Formik Form */}
                                                        <Formik
                                                            initialValues={initialValues}
                                                            validationSchema={getCurrentValidationSchema()}
                                                            onSubmit={handleSubmit}
                                                            validateOnChange={true}
                                                            validateOnBlur={true}
                                                        >
                                                            {({ isSubmitting, setFieldValue, values, errors, touched, validateForm }) => (
                                                                <Form className="auth-form">
                                                                    {renderStepContent(values, errors, touched, setFieldValue)}

                                                                    {/* Navigation Buttons */}
                                                                    <div className="d-flex justify-content-between mt-4">
                                                                        {step > 1 && (
                                                                            <button
                                                                                type="button"
                                                                                className="btn btn-outline-light"
                                                                                onClick={handleBack}
                                                                                disabled={isSubmitting || loading}
                                                                            >
                                                                                <i className="mdi mdi-arrow-left me-1"></i>
                                                                                Back
                                                                            </button>
                                                                        )}

                                                                        {step < 3 && (
                                                                            <button
                                                                                type="button"
                                                                                className="btn btn-white btn-hover ms-auto"
                                                                                onClick={async () => {
                                                                                    const validationErrors = await validateForm();
                                                                                    handleNext(validationErrors);
                                                                                }}
                                                                                disabled={isSubmitting || loading}
                                                                            >
                                                                                Next
                                                                                <i className="mdi mdi-arrow-right ms-1"></i>
                                                                            </button>
                                                                        )}

                                                                        {step === 3 && (
                                                                            <button
                                                                                type="submit"
                                                                                className="btn btn-white btn-hover w-100"
                                                                                disabled={isSubmitting || loading}
                                                                            >
                                                                                {isSubmitting || loading ? (
                                                                                    <>
                                                                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                                                        Registering...
                                                                                    </>
                                                                                ) : (
                                                                                    <>
                                                                                        <i className="mdi mdi-domain me-1"></i>
                                                                                        Complete Registration
                                                                                    </>
                                                                                )}
                                                                            </button>
                                                                        )}
                                                                    </div>
                                                                </Form>
                                                            )}
                                                        </Formik>

                                                        {/* Sign In Link */}
                                                        <div className="mt-4 text-center">
                                                            <p className="mb-0">
                                                                Already registered?{" "}
                                                                <Link
                                                                    to="/login"
                                                                    className="fw-medium text-white text-decoration-underline"
                                                                >
                                                                    Sign In Here
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
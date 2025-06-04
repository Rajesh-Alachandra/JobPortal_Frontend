import React, { useState, useEffect } from "react";
import { Card, CardBody, Col, Container, Row, Alert } from "reactstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../components/AuthContext";

// Images
import lightLogo from "../../assets/images/logo-light.png";
import darkLogo from "../../assets/images/logo-dark.png";
import signUpImage from "../../assets/images/auth/sign-up.png";

// Validation schemas for each step
const validationSchemas = [
    // Step 1 - Basic Info
    Yup.object({
        firstName: Yup.string()
            .min(2, "First name must be at least 2 characters")
            .max(50, "First name must be less than 50 characters")
            .required("First name is required"),
        lastName: Yup.string()
            .min(2, "Last name must be at least 2 characters")
            .max(50, "Last name must be less than 50 characters")
            .required("Last name is required"),
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
    // Step 2 - Personal Info
    Yup.object({
        phone: Yup.string()
            .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
            .required("Phone number is required"),
        dateOfBirth: Yup.date()
            .max(new Date(Date.now() - 567648000000), "You must be at least 18 years old")
            .required("Date of birth is required"),
        gender: Yup.string().required("Gender is required")
    }),
    // Step 3 - Address Info
    Yup.object({
        address: Yup.string().required("Address is required"),
        city: Yup.string().required("City is required"),
        state: Yup.string().required("State is required"),
        country: Yup.string().required("Country is required")
    }),
    // Step 4 - Professional Info
    Yup.object({
        skills: Yup.string().required("Skills are required"),
        experience: Yup.number()
            .min(0, "Experience cannot be negative")
            .max(50, "Experience cannot exceed 50 years")
            .required("Experience is required"),
        expectedSalary: Yup.number()
            .min(0, "Salary cannot be negative")
            .required("Expected salary is required")
    }),
    // Step 5 - Additional Info
    Yup.object({
        education: Yup.string().required("Education is required"),
        currentJobTitle: Yup.string().required("Current job title is required")
    })
];

const JobSeekerRegister = () => {
    const { register, isAuthenticated, loading } = useAuth();
    const navigate = useNavigate();

    const [step, setStep] = useState(1);
    const [registrationError, setRegistrationError] = useState("");
    const [registrationSuccess, setRegistrationSuccess] = useState("");

    // Redirect if already authenticated
    useEffect(() => {
        if (isAuthenticated()) {
            navigate('/jobseeker/joblist', { replace: true });
        }
    }, [isAuthenticated, navigate]);

    // Set document title
    useEffect(() => {
        document.title = "Job Seeker Register | Katlyst - Job Listing Template";
    }, []);

    // Initial form values
    const initialValues = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        dateOfBirth: "",
        gender: "",
        address: "",
        city: "",
        state: "",
        country: "",
        skills: "",
        experience: "",
        education: "",
        currentJobTitle: "",
        expectedSalary: "",
        profileImage: null
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
                if (key !== 'confirmPassword' && key !== 'profileImage') {
                    formData.append(key, values[key]);
                }
            });

            // Add profile image if selected
            if (values.profileImage) {
                formData.append('profileImage', values.profileImage);
            }

            console.log('Attempting registration...'); // Debug log

            // Call register function from AuthContext
            const userData = await register('jobseeker', formData);

            console.log('Registration successful:', userData); // Debug log

            setRegistrationSuccess("Registration successful! Redirecting to dashboard...");

            // Redirect to jobseeker dashboard
            setTimeout(() => {
                navigate('/jobseeker/joblist', { replace: true });
            }, 1500);

        } catch (error) {
            console.error('Registration error:', error); // Debug log
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
                            <h6 className="text-white-70">Step 1 of 5 - Basic Information</h6>
                        </div>
                        <Row>
                            <Col md={6}>
                                <div className="mb-3">
                                    <label className="form-label">First Name *</label>
                                    <Field
                                        name="firstName"
                                        type="text"
                                        className={`form-control ${errors.firstName && touched.firstName ? 'is-invalid' : ''}`}
                                        placeholder="Enter your first name"
                                    />
                                    <ErrorMessage name="firstName" component="div" className="invalid-feedback d-block" />
                                </div>
                            </Col>
                            <Col md={6}>
                                <div className="mb-3">
                                    <label className="form-label">Last Name *</label>
                                    <Field
                                        name="lastName"
                                        type="text"
                                        className={`form-control ${errors.lastName && touched.lastName ? 'is-invalid' : ''}`}
                                        placeholder="Enter your last name"
                                    />
                                    <ErrorMessage name="lastName" component="div" className="invalid-feedback d-block" />
                                </div>
                            </Col>
                        </Row>
                        <div className="mb-3">
                            <label className="form-label">Email Address *</label>
                            <Field
                                name="email"
                                type="email"
                                className={`form-control ${errors.email && touched.email ? 'is-invalid' : ''}`}
                                placeholder="Enter your email address"
                            />
                            <ErrorMessage name="email" component="div" className="invalid-feedback d-block" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password *</label>
                            <Field
                                name="password"
                                type="password"
                                className={`form-control ${errors.password && touched.password ? 'is-invalid' : ''}`}
                                placeholder="Enter your password"
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
                            <h6 className="text-white-70">Step 2 of 5 - Personal Information</h6>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Phone Number *</label>
                            <Field
                                name="phone"
                                type="text"
                                className={`form-control ${errors.phone && touched.phone ? 'is-invalid' : ''}`}
                                placeholder="Enter your phone number"
                            />
                            <ErrorMessage name="phone" component="div" className="invalid-feedback d-block" />
                        </div>
                        <Row>
                            <Col md={6}>
                                <div className="mb-3">
                                    <label className="form-label">Date of Birth *</label>
                                    <Field
                                        name="dateOfBirth"
                                        type="date"
                                        className={`form-control ${errors.dateOfBirth && touched.dateOfBirth ? 'is-invalid' : ''}`}
                                    />
                                    <ErrorMessage name="dateOfBirth" component="div" className="invalid-feedback d-block" />
                                </div>
                            </Col>
                            <Col md={6}>
                                <div className="mb-3">
                                    <label className="form-label">Gender *</label>
                                    <Field
                                        name="gender"
                                        as="select"
                                        className={`form-control ${errors.gender && touched.gender ? 'is-invalid' : ''}`}
                                    >
                                        <option value="">Select gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </Field>
                                    <ErrorMessage name="gender" component="div" className="invalid-feedback d-block" />
                                </div>
                            </Col>
                        </Row>
                    </>
                );
            case 3:
                return (
                    <>
                        <div className="text-center mb-4">
                            <h6 className="text-white-70">Step 3 of 5 - Address Information</h6>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Address *</label>
                            <Field
                                name="address"
                                as="textarea"
                                rows="3"
                                className={`form-control ${errors.address && touched.address ? 'is-invalid' : ''}`}
                                placeholder="Enter your address"
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
                                        placeholder="Enter city"
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
                                        placeholder="Enter state"
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
                                        placeholder="Enter country"
                                    />
                                    <ErrorMessage name="country" component="div" className="invalid-feedback d-block" />
                                </div>
                            </Col>
                        </Row>
                    </>
                );
            case 4:
                return (
                    <>
                        <div className="text-center mb-4">
                            <h6 className="text-white-70">Step 4 of 5 - Professional Information</h6>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Skills *</label>
                            <Field
                                name="skills"
                                type="text"
                                className={`form-control ${errors.skills && touched.skills ? 'is-invalid' : ''}`}
                                placeholder="Enter skills (comma separated)"
                            />
                            <ErrorMessage name="skills" component="div" className="invalid-feedback d-block" />
                        </div>
                        <Row>
                            <Col md={6}>
                                <div className="mb-3">
                                    <label className="form-label">Experience (Years) *</label>
                                    <Field
                                        name="experience"
                                        type="number"
                                        className={`form-control ${errors.experience && touched.experience ? 'is-invalid' : ''}`}
                                        placeholder="e.g., 3"
                                    />
                                    <ErrorMessage name="experience" component="div" className="invalid-feedback d-block" />
                                </div>
                            </Col>
                            <Col md={6}>
                                <div className="mb-3">
                                    <label className="form-label">Expected Salary *</label>
                                    <Field
                                        name="expectedSalary"
                                        type="number"
                                        className={`form-control ${errors.expectedSalary && touched.expectedSalary ? 'is-invalid' : ''}`}
                                        placeholder="e.g., 50000"
                                    />
                                    <ErrorMessage name="expectedSalary" component="div" className="invalid-feedback d-block" />
                                </div>
                            </Col>
                        </Row>
                    </>
                );
            case 5:
                return (
                    <>
                        <div className="text-center mb-4">
                            <h6 className="text-white-70">Step 5 of 5 - Additional Information</h6>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Education *</label>
                            <Field
                                name="education"
                                type="text"
                                className={`form-control ${errors.education && touched.education ? 'is-invalid' : ''}`}
                                placeholder="Enter education details"
                            />
                            <ErrorMessage name="education" component="div" className="invalid-feedback d-block" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Current Job Title *</label>
                            <Field
                                name="currentJobTitle"
                                type="text"
                                className={`form-control ${errors.currentJobTitle && touched.currentJobTitle ? 'is-invalid' : ''}`}
                                placeholder="Enter current job title"
                            />
                            <ErrorMessage name="currentJobTitle" component="div" className="invalid-feedback d-block" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Profile Image</label>
                            <input
                                name="profileImage"
                                type="file"
                                className="form-control"
                                accept="image/*"
                                onChange={(e) => setFieldValue('profileImage', e.target.files[0])}
                            />
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
                                                        <img src={signUpImage} alt="Sign Up" className="img-fluid" />
                                                    </div>
                                                </CardBody>
                                            </Col>
                                            <Col lg={6}>
                                                <CardBody className="auth-content p-5 h-100 text-white">
                                                    <div className="w-100">
                                                        <div className="text-center mb-4">
                                                            <h5>Create Your Account</h5>
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

                                                                        {step < 5 && (
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

                                                                        {step === 5 && (
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
                                                                                        <i className="mdi mdi-account-plus me-1"></i>
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
                                                                Already have an account?{" "}
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

export default JobSeekerRegister;
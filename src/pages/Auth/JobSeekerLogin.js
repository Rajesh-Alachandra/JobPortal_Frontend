import React, { useState, useEffect } from "react";
import { Card, CardBody, Col, Container, Row, Alert } from "reactstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../components/AuthContext";

//Import Images
import lightLogo from "../../assets/images/logo-light.png";
import darkLogo from "../../assets/images/logo-dark.png";
import signInImage from "../../assets/images/auth/sign-in.png";

// Validation Schema
const validationSchema = Yup.object({
    email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
    password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    rememberMe: Yup.boolean()
});

const JobSeekerLogin = () => {
    const { login, isAuthenticated, loading, user } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();

    const [loginError, setLoginError] = useState("");

    // Redirect if already authenticated
    useEffect(() => {
        if (isAuthenticated()) {
            // Check if user is a jobseeker to prevent wrong role access
            if (user?.role === 'jobseeker') {
                const from = location.state?.from?.pathname || '/jobseeker/joblist';
                navigate(from, { replace: true });
            } else if (user?.role === 'employer') {
                // Redirect employer to their dashboard
                navigate('/employer/dashboard', { replace: true });
            }
        }
    }, [isAuthenticated, navigate, location, user]);

    // Initial form values
    const initialValues = {
        email: "",
        password: "",
        rememberMe: false
    };

    // Function to fill demo credentials
    const fillDemoCredentials = (setFieldValue) => {
        setFieldValue('email', 'jobseeker@example.com');
        setFieldValue('password', 'Password123');
    };

    // Handle form submission
    const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
        try {
            setLoginError("");
            setSubmitting(true);

            const userData = await login(values.email, values.password);

            // Check if the logged-in user is a jobseeker
            if (userData.role !== 'jobseeker') {
                setLoginError("This login is for job seekers only. Please use the appropriate login page.");
                return;
            }

            // Redirect to intended page or jobseeker dashboard
            const from = location.state?.from?.pathname || '/jobseeker/joblist';
            navigate(from, { replace: true });

        } catch (error) {
            setLoginError(error.message || "Login failed. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    // Set document title
    useEffect(() => {
        document.title = "Job Seeker Sign In | Katlyst - Job Listing Template";
    }, []);

    return (
        <React.Fragment>
            <div>
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
                                                            <img
                                                                src={signInImage}
                                                                alt="Sign In"
                                                                className="img-fluid"
                                                            />
                                                        </div>
                                                    </CardBody>
                                                </Col>
                                                <Col lg={6}>
                                                    <CardBody className="auth-content p-5 h-100 text-white">
                                                        <div className="w-100">
                                                            <div className="text-center mb-4">
                                                                <h5>Welcome Back!</h5>
                                                                <p className="text-white-70">
                                                                    Sign in to explore job opportunities and manage your applications.
                                                                </p>
                                                            </div>

                                                            {/* Login Error Alert */}
                                                            {loginError && (
                                                                <Alert color="danger" className="mb-3">
                                                                    <i className="mdi mdi-alert-circle-outline me-2"></i>
                                                                    {loginError}
                                                                </Alert>
                                                            )}

                                                            {/* Formik Form */}
                                                            <Formik
                                                                initialValues={initialValues}
                                                                validationSchema={validationSchema}
                                                                onSubmit={handleSubmit}
                                                            >
                                                                {({ isSubmitting, setFieldValue, values, errors, touched }) => (
                                                                    <Form className="auth-form">
                                                                        {/* Email Field */}
                                                                        <div className="mb-3">
                                                                            <label
                                                                                htmlFor="email"
                                                                                className="form-label"
                                                                            >
                                                                                Email Address *
                                                                            </label>
                                                                            <Field
                                                                                name="email"
                                                                                type="email"
                                                                                className={`form-control ${errors.email && touched.email ? 'is-invalid' : ''
                                                                                    }`}
                                                                                placeholder="Enter your email address"
                                                                                disabled={isSubmitting || loading}
                                                                            />
                                                                            <ErrorMessage
                                                                                name="email"
                                                                                component="div"
                                                                                className="invalid-feedback d-block"
                                                                            />
                                                                        </div>

                                                                        {/* Password Field */}
                                                                        <div className="mb-3">
                                                                            <label
                                                                                htmlFor="password"
                                                                                className="form-label"
                                                                            >
                                                                                Password *
                                                                            </label>
                                                                            <Field
                                                                                name="password"
                                                                                type="password"
                                                                                className={`form-control ${errors.password && touched.password ? 'is-invalid' : ''
                                                                                    }`}
                                                                                placeholder="Enter your password"
                                                                                disabled={isSubmitting || loading}
                                                                            />
                                                                            <ErrorMessage
                                                                                name="password"
                                                                                component="div"
                                                                                className="invalid-feedback d-block"
                                                                            />
                                                                        </div>

                                                                        {/* Remember Me & Forgot Password */}
                                                                        <div className="mb-4">
                                                                            <div className="form-check">
                                                                                <Field
                                                                                    name="rememberMe"
                                                                                    type="checkbox"
                                                                                    className="form-check-input"
                                                                                    id="rememberMe"
                                                                                />
                                                                                <label
                                                                                    className="form-check-label"
                                                                                    htmlFor="rememberMe"
                                                                                >
                                                                                    Remember me
                                                                                </label>
                                                                                <Link
                                                                                    to="/resetpassword"
                                                                                    className="float-end text-white text-decoration-underline"
                                                                                >
                                                                                    Forgot Password?
                                                                                </Link>
                                                                            </div>
                                                                        </div>

                                                                        {/* Demo Credentials Button */}
                                                                        <div className="mb-3 text-center">
                                                                            <button
                                                                                type="button"
                                                                                className="btn btn-outline-light btn-sm"
                                                                                onClick={() => fillDemoCredentials(setFieldValue)}
                                                                                disabled={isSubmitting || loading}
                                                                            >
                                                                                <i className="mdi mdi-account-key me-1"></i>
                                                                                Use Demo Credentials
                                                                            </button>
                                                                        </div>

                                                                        {/* Submit Button */}
                                                                        <div className="text-center">
                                                                            <button
                                                                                type="submit"
                                                                                className="btn btn-white btn-hover w-100"
                                                                                disabled={isSubmitting || loading}
                                                                            >
                                                                                {isSubmitting || loading ? (
                                                                                    <>
                                                                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                                                        Signing In...
                                                                                    </>
                                                                                ) : (
                                                                                    <>
                                                                                        <i className="mdi mdi-login me-1"></i>
                                                                                        Sign In
                                                                                    </>
                                                                                )}
                                                                            </button>
                                                                        </div>
                                                                    </Form>
                                                                )}
                                                            </Formik>

                                                            {/* Sign Up Link */}
                                                            <div className="mt-4 text-center">
                                                                <p className="mb-0">
                                                                    Don't have a job seeker account?{" "}
                                                                    <Link
                                                                        to="/jobseeker/register"
                                                                        className="fw-medium text-white text-decoration-underline"
                                                                    >
                                                                        Sign Up Here
                                                                    </Link>
                                                                </p>
                                                            </div>

                                                            {/* Alternative Login */}
                                                            <div className="mt-3 text-center">
                                                                <p className="mb-0 text-white-70">
                                                                    Looking to hire?{" "}
                                                                    <Link
                                                                        to="/employer/register"
                                                                        className="text-white text-decoration-underline"
                                                                    >
                                                                        Employer Sign Up
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
            </div>
        </React.Fragment>
    );
};

export default JobSeekerLogin;
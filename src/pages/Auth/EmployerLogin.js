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

const EmployerLogin = () => {
    const { login, isAuthenticated, loading } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const [loginError, setLoginError] = useState("");
    const [showCredentials, setShowCredentials] = useState(false);

    // Redirect if already authenticated
    useEffect(() => {
        if (isAuthenticated()) {
            const from = location.state?.from?.pathname || '/employer/dashboard';
            navigate(from, { replace: true });
        }
    }, [isAuthenticated, navigate, location]);

    // Initial form values
    const initialValues = {
        email: "",
        password: "",
        rememberMe: false
    };

    // Handle form submission
    const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
        try {
            setLoginError("");

            const user = await login(values.email, values.password);

            // Check if the logged-in user is an employer
            if (user.role !== 'employer') {
                setLoginError("Access denied. This login is for employers only.");
                return;
            }

            // Redirect to intended page or dashboard
            const from = location.state?.from?.pathname || '/employer/dashboard';
            navigate(from, { replace: true });

        } catch (error) {
            setLoginError(error.message || "Login failed. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    // Auto-fill demo credentials
    const fillDemoCredentials = (setFieldValue) => {
        setFieldValue('email', 'employer@example.com');
        setFieldValue('password', 'employer123');
    };

    document.title = "Employer Sign In | Katlyst - Job Listing Template";

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
                                                            <img
                                                                src={lightLogo}
                                                                alt="Logo"
                                                                className="logo-light"
                                                            />
                                                            <img
                                                                src={darkLogo}
                                                                alt="Logo"
                                                                className="logo-dark"
                                                            />
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
                                                                <h5>Welcome Back Employer!</h5>
                                                                <p className="text-white-70">
                                                                    Sign in to manage your job postings and applications.
                                                                </p>
                                                            </div>

                                                            {/* Demo Credentials Info */}
                                                            {/* <div className="mb-3">
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-outline-light btn-sm"
                                                                    onClick={() => setShowCredentials(!showCredentials)}
                                                                >
                                                                    {showCredentials ? 'Hide' : 'Show'} Demo Credentials
                                                                </button>
                                                                {showCredentials && (
                                                                    <div className="mt-2 p-2 bg-white bg-opacity-10 rounded">
                                                                        <small className="text-white-70">
                                                                            <strong>Demo Employer Account:</strong><br />
                                                                            Email: employer@example.com<br />
                                                                            Password: employer123
                                                                        </small>
                                                                    </div>
                                                                )}
                                                            </div> */}

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
                                                                                className="btn btn-sm"
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
                                                                    Don't have an employer account?{" "}
                                                                    <Link
                                                                        to="/employer/register"
                                                                        className="fw-medium text-white text-decoration-underline"
                                                                    >
                                                                        Sign Up Here
                                                                    </Link>
                                                                </p>
                                                            </div>

                                                            {/* Alternative Login */}
                                                            <div className="mt-3 text-center">
                                                                <p className="mb-0 text-white-70">
                                                                    Looking for a job?{" "}
                                                                    <Link
                                                                        to="/jobseeker/login"
                                                                        className="text-white text-decoration-underline"
                                                                    >
                                                                        Job Seeker Login
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

export default EmployerLogin;
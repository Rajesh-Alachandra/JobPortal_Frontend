// Routes/index.js

import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
import { publicRoutes, employerRoutes, jobSeekerRoutes, authRoutes } from './allRoutes';

/* Layout */
const CommonLayout = React.lazy(() => import('../Layout/CommonLayout/index'));
const AuthLayout = React.lazy(() => import('../Layout/AuthLayout'));

// Loading component
const Loader = () => {
    return (
        <div id="preloader">
            <div id="status">
                <ul>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div>
        </div>
    );
};

// Protected Route component for employers
const EmployerRoute = ({ children }) => {
    const { isAuthenticated, getUserRole, loading } = useAuth();

    if (loading) return <Loader />;

    if (!isAuthenticated() || getUserRole() !== 'employer') {
        return <Navigate to="/employer/login" replace />;
    }

    return children;
};

// Protected Route component for job seekers
const JobSeekerRoute = ({ children }) => {
    const { isAuthenticated, getUserRole, loading } = useAuth();

    if (loading) return <Loader />;

    if (!isAuthenticated() || getUserRole() !== 'jobseeker') {
        return <Navigate to="/login" replace />;
    }

    return children;
};

// Auth Route component (prevents authenticated users from accessing auth pages)
const AuthRoute = ({ children }) => {
    const { isAuthenticated, getUserRole, loading } = useAuth();

    if (loading) return <Loader />;

    // If user is authenticated, redirect to appropriate dashboard
    if (isAuthenticated()) {
        const role = getUserRole();
        if (role === 'employer') {
            return <Navigate to="/employer/dashboard" replace />;
        } else if (role === 'jobseeker') {
            return <Navigate to="/jobseeker/joblist" replace />; // This should go to joblist
        }
    }

    return children;
};

// Main Routes component
const AppRoutes = () => {
    return (
        <Suspense fallback={<Loader />}>
            <Routes>
                {/* Public Routes with CommonLayout */}
                {publicRoutes.map((route, idx) => (
                    <Route
                        key={idx}
                        path={route.path}
                        element={
                            <CommonLayout>
                                {route.component}
                            </CommonLayout>
                        }
                    />
                ))}

                {/* Auth Routes with AuthLayout */}
                {authRoutes.map((route, idx) => (
                    <Route
                        key={`auth-${idx}`}
                        path={route.path}
                        element={
                            <AuthRoute>
                                <AuthLayout>
                                    {route.component}
                                </AuthLayout>
                            </AuthRoute>
                        }
                    />
                ))}

                {/* Protected Employer Routes with CommonLayout */}
                {employerRoutes.map((route, idx) => (
                    <Route
                        key={`employer-${idx}`}
                        path={route.path}
                        element={
                            <EmployerRoute>
                                <CommonLayout>
                                    {route.component}
                                </CommonLayout>
                            </EmployerRoute>
                        }
                    />
                ))}

                {/* Protected Job Seeker Routes with CommonLayout */}
                {jobSeekerRoutes.map((route, idx) => (
                    <Route
                        key={`jobseeker-${idx}`}
                        path={route.path}
                        element={
                            <JobSeekerRoute>
                                <CommonLayout>
                                    {route.component}
                                </CommonLayout>
                            </JobSeekerRoute>
                        }
                    />
                ))}

                {/* Catch all route - 404 */}
                <Route path="*" element={<Navigate to="/error404" replace />} />
            </Routes>
        </Suspense>
    );
};

export default AppRoutes;
// AuthContext.js

import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { noAuthAxios } from './axiosInstance';

// Create the authentication context
const AuthContext = createContext();

// AuthProvider component wraps your entire app to provide auth state
export const AuthProvider = ({ children }) => {
    // Global auth state
    const [user, setUser] = useState(null);           // Logged-in user data
    const [token, setToken] = useState(null);         // Auth token (JWT)
    const [loading, setLoading] = useState(true);     // Indicates if auth state is initializing or updating

    // Load user and token from localStorage when app starts
    useEffect(() => {
        const storedUser = localStorage.getItem('authUser');
        const storedToken = localStorage.getItem('authToken');

        if (storedUser && storedToken) {
            setUser(JSON.parse(storedUser));
            setToken(storedToken);
        }

        setLoading(false);
    }, []);

    // LOGIN FUNCTION
    const login = async (email, password) => {
        try {
            setLoading(true);

            // Make login request to API
            const response = await noAuthAxios.post('auth/login', { email, password });

            // Check if response is successful
            if (!response.data.success) {
                throw new Error(response.data.message || 'Login failed');
            }

            // Extract user data and token from the response
            const userData = response.data.data.user;
            const jwtToken = response.data.data.token;

            // Update state
            setUser(userData);
            setToken(jwtToken);

            // Persist in localStorage
            localStorage.setItem('authUser', JSON.stringify(userData));
            localStorage.setItem('authToken', jwtToken);

            console.log('Login successful:', userData); // Debug log

            return userData;
        } catch (error) {
            console.error('Login error:', error); // Debug log
            throw new Error(error.response?.data?.message || error.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    // REGISTER FUNCTION (for both employer and jobseeker)
    const register = async (role, registrationData) => {
        try {
            setLoading(true);

            // Choose the correct endpoint based on role
            const endpoint = role === 'employer' ? 'auth/register/employer' : 'auth/register/jobseeker';

            const response = await noAuthAxios.post(endpoint, registrationData);

            // Check if response is successful
            if (!response.data.success) {
                throw new Error(response.data.message || 'Registration failed');
            }

            // Extract user data and token from the response
            const userData = response.data.data.user;
            const jwtToken = response.data.data.token;

            // Update state
            setUser(userData);
            setToken(jwtToken);

            // Persist in localStorage
            localStorage.setItem('authUser', JSON.stringify(userData));
            localStorage.setItem('authToken', jwtToken);

            return userData;
        } catch (error) {
            throw new Error(error.response?.data?.message || error.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    // LOGOUT FUNCTION
    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('authUser');
        localStorage.removeItem('authToken');
    };

    // Check if the user is authenticated
    const isAuthenticated = () => {
        const hasUser = !!user;
        const hasToken = !!token;
        console.log('Auth check - User:', hasUser, 'Token:', hasToken); // Debug log
        return hasUser && hasToken;
    };

    // Get user role (employer or jobseeker)
    const getUserRole = () => user?.role || null;

    // Optional: Provide role-based redirect after login
    const getRedirectPath = () => {
        if (!user) return '/login';
        if (user.role === 'employer') return '/employer/dashboard';
        if (user.role === 'jobseeker') return '/jobseeker/joblist';
        return '/';
    };

    // Auth context value provided to consumers
    const value = {
        user,
        token,
        login,
        register,
        logout,
        isAuthenticated,
        getUserRole,
        getRedirectPath,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use auth context in any component
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
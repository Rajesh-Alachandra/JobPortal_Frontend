//AuthContext.js

import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the AuthContext
const AuthContext = createContext();

// Dummy user data for testing
const DUMMY_USERS = {
    employer: {
        id: 1,
        email: 'employer@example.com',
        password: 'employer123',
        role: 'employer',
        name: 'John Employer',
        company: 'Tech Corp Inc.',
        profile: {
            companySize: '100-500',
            industry: 'Technology',
            location: 'San Francisco, CA'
        }
    },
    jobseeker: {
        id: 2,
        email: 'jobseeker@example.com',
        password: 'jobseeker123',
        role: 'jobseeker',
        name: 'Jane Jobseeker',
        profile: {
            skills: ['JavaScript', 'React', 'Node.js'],
            experience: '3 years',
            location: 'New York, NY',
            resume: 'Software Developer with 3 years experience...'
        }
    }
};

// AuthProvider component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Initialize auth state from localStorage
    useEffect(() => {
        const initAuth = () => {
            try {
                const storedUser = localStorage.getItem('authUser');
                if (storedUser) {
                    setUser(JSON.parse(storedUser));
                }
            } catch (error) {
                console.error('Error loading auth state:', error);
                localStorage.removeItem('authUser');
            } finally {
                setLoading(false);
            }
        };

        initAuth();
    }, []);

    // Login function
    const login = async (email, password) => {
        try {
            setLoading(true);

            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Find matching user
            const foundUser = Object.values(DUMMY_USERS).find(
                u => u.email === email && u.password === password
            );

            if (!foundUser) {
                throw new Error('Invalid email or password');
            }

            // Remove password from user object before storing
            const { password: _, ...userWithoutPassword } = foundUser;

            setUser(userWithoutPassword);
            localStorage.setItem('authUser', JSON.stringify(userWithoutPassword));

            return userWithoutPassword;
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    };

    // Logout function
    const logout = () => {
        setUser(null);
        localStorage.removeItem('authUser');
    };

    // Check if user is authenticated
    const isAuthenticated = () => {
        return user !== null;
    };

    // Get current user role
    const getUserRole = () => {
        return user?.role || null;
    };

    // Update user profile
    const updateProfile = (profileData) => {
        if (user) {
            const updatedUser = {
                ...user,
                ...profileData,
                profile: {
                    ...user.profile,
                    ...profileData.profile
                }
            };
            setUser(updatedUser);
            localStorage.setItem('authUser', JSON.stringify(updatedUser));
        }
    };

    const value = {
        user,
        login,
        logout,
        isAuthenticated,
        getUserRole,
        updateProfile,
        loading
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the AuthContext
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

// Export dummy credentials for easy reference
export const DUMMY_CREDENTIALS = {
    employer: {
        email: 'employer@example.com',
        password: 'employer123'
    },
    jobseeker: {
        email: 'jobseeker@example.com',
        password: 'jobseeker123'
    }
};
'use client';

import { getTokens, isAuthenticated, signIn, signOut } from '@/lib/cognito';
import {
    CognitoUser,
    CognitoUserAttribute,
    CognitoUserPool,
} from 'amazon-cognito-identity-js';
import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
    const [isAuth, setIsAuth] = useState(false);
    const [loading, setLoading] = useState(true);
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        checkAuth();
    }, []);

    function checkAuth() {
        const authenticated = isAuthenticated();
        setIsAuth(authenticated);
        if (authenticated) {
            // Get user role from ID token
            const { idToken } = getTokens();
            try {
                const payload = JSON.parse(atob(idToken.split('.')[1]));
                const groups = payload['cognito:groups'] || [];
                console.log(payload);
                setUserRole(
                    groups.includes('storm-to-shore-admin') ? 'admin' : 'user',
                );
            } catch (error) {
                console.error('Error parsing token:', error);
                setUserRole('user');
            }
        }
        setLoading(false);
    }

    const handleSignIn = async (username, password) => {
        try {
            const result = await signIn(username, password);
            if (result.userNotConfirmed) {
                return result;
            }
            if (result.success) {
                setIsAuth(true);
                // Get user role from ID token
                const { idToken } = getTokens();
                try {
                    const payload = JSON.parse(atob(idToken.split('.')[1]));
                    const groups = payload['cognito:groups'] || [];
                    setUserRole(
                        groups.includes('storm-to-shore-admin')
                            ? 'admin'
                            : 'user',
                    );
                } catch (error) {
                    console.error('Error parsing token:', error);
                    setUserRole('user');
                }
            }
            return result;
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    const signUp = async (email, password, attributes = {}) => {
        try {
            const userPool = new CognitoUserPool({
                UserPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID,
                ClientId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_CLIENT_ID,
            });

            const attributeList = [
                new CognitoUserAttribute({
                    Name: 'email',
                    Value: email,
                }),
            ];

            // Add custom attributes
            Object.entries(attributes).forEach(([key, value]) => {
                attributeList.push(
                    new CognitoUserAttribute({
                        Name: key,
                        Value: value,
                    }),
                );
            });

            return new Promise((resolve, reject) => {
                userPool.signUp(
                    email,
                    password,
                    attributeList,
                    null,
                    (err, result) => {
                        if (err) {
                            reject(err);
                            return;
                        }
                        resolve(result);
                    },
                );
            });
        } catch (error) {
            console.error('Error signing up:', error);
            throw error;
        }
    };

    const handleSignOut = async () => {
        try {
            signOut();
            setIsAuth(false);
            setUserRole(null);
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    const confirmSignUp = async (email, code) => {
        return new Promise((resolve, reject) => {
            const userPool = new CognitoUserPool({
                UserPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID,
                ClientId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_CLIENT_ID,
            });

            const cognitoUser = new CognitoUser({
                Username: email,
                Pool: userPool,
            });

            cognitoUser.confirmRegistration(code, true, (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result);
            });
        });
    };

    const resendConfirmationCode = async (email) => {
        return new Promise((resolve, reject) => {
            const userPool = new CognitoUserPool({
                UserPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID,
                ClientId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_CLIENT_ID,
            });

            const cognitoUser = new CognitoUser({
                Username: email,
                Pool: userPool,
            });

            cognitoUser.resendConfirmationCode((err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result);
            });
        });
    };

    return (
        <AuthContext.Provider
            value={{
                isAuth,
                loading,
                userRole,
                signIn: handleSignIn,
                signUp,
                signOut: handleSignOut,
                confirmSignUp,
                resendConfirmationCode,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);

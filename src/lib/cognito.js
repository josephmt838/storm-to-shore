import {
    AuthenticationDetails,
    CognitoUser,
    CognitoUserPool,
} from 'amazon-cognito-identity-js';

const poolData = {
    UserPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID,
    ClientId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_CLIENT_ID,
};

const userPool = new CognitoUserPool(poolData);

// Store token in localStorage
const setTokens = (tokens) => {
    localStorage.setItem('idToken', tokens.idToken);
    localStorage.setItem('accessToken', tokens.accessToken);
    localStorage.setItem('refreshToken', tokens.refreshToken);
};

// Get tokens from localStorage
export const getTokens = () => {
    return {
        idToken: localStorage.getItem('idToken'),
        accessToken: localStorage.getItem('accessToken'),
        refreshToken: localStorage.getItem('refreshToken'),
    };
};

// Clear tokens from localStorage
const clearTokens = () => {
    localStorage.removeItem('idToken');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
};

export const signIn = (username, password) => {
    return new Promise((resolve, reject) => {
        const cognitoUser = new CognitoUser({
            Username: username,
            Pool: userPool,
        });

        cognitoUser.authenticateUser(
            new AuthenticationDetails({
                Username: username,
                Password: password,
            }),
            {
                onSuccess: (result) => {
                    const tokens = {
                        accessToken: result.getAccessToken().getJwtToken(),
                        idToken: result.getIdToken().getJwtToken(),
                        refreshToken: result.getRefreshToken().getToken(),
                    };
                    setTokens(tokens);
                    resolve({ success: true });
                },
                onFailure: (err) => {
                    console.log('Login error:', err);
                    if (err.name === 'UserNotConfirmedException') {
                        // Don't set any tokens for unconfirmed users
                        resolve({
                            success: false,
                            userNotConfirmed: true,
                            email: username,
                            error: 'Please confirm your email address before logging in.',
                        });
                    } else {
                        reject(err);
                    }
                },
            },
        );
    });
};

export const signUp = async (username, password, email) => {
    return new Promise((resolve, reject) => {
        userPool.signUp(
            username,
            password,
            [
                {
                    Name: 'email',
                    Value: email,
                },
            ],
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
};

export const signOut = () => {
    clearTokens();
    const user = userPool.getCurrentUser();
    if (user) {
        user.signOut();
    }
};

export const isAuthenticated = () => {
    const { idToken } = getTokens();
    if (!idToken) return false;

    try {
        // Check if token is expired
        const payload = JSON.parse(atob(idToken.split('.')[1]));
        return payload.exp * 1000 > Date.now();
    } catch {
        return false;
    }
};

export const getAuthHeader = () => {
    const { idToken } = getTokens();
    return idToken ? { Authorization: `Bearer ${idToken}` } : {};
};

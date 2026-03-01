import { createContext, useContext, useEffect, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [users, setUsers] = useLocalStorage('streaming_users', []);
    const [currentUser, setCurrentUser] = useLocalStorage('streaming_current_user', null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        if (currentUser) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, [currentUser]);

    const login = (email, password) => {
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
            setCurrentUser(user);
            return { success: true };
        }
        return { success: false, message: 'Identifiants incorrects' };
    };

    const register = (userData) => {
        const userExists = users.some(u => u.email === userData.email);
        if (userExists) {
            return { success: false, message: 'Cet email est déjà utilisé' };
        }
        const newUser = {
            ...userData,
            id: Date.now().toString(),
        };
        setUsers([...users, newUser]);
        setCurrentUser(newUser);
        return { success: true };
    };

    const logout = () => {
        setCurrentUser(null);
    };

    return (
        <AuthContext.Provider value={{ currentUser, isAuthenticated, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

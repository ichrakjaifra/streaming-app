import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Lazy loading pages
const Home = lazy(() => import('./pages/Home').catch(() => ({ default: () => <div>En cours...</div> })));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const VideoDetailPage = lazy(() => import('./pages/VideoDetailPage').catch(() => ({ default: () => <div>En cours...</div> })));
const WatchlistPage = lazy(() => import('./pages/WatchlistPage').catch(() => ({ default: () => <div>En cours...</div> })));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();
    if (!isAuthenticated) return <Navigate to="/login" replace />;
    return children;
};

const PublicOnlyRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();
    if (isAuthenticated) return <Navigate to="/" replace />;
    return children;
};

const AppRoutes = () => {
    return (
        <Suspense fallback={<div className="loading-spinner">Chargement...</div>}>
            <Routes>
                <Route path="/login" element={
                    <PublicOnlyRoute>
                        <LoginPage />
                    </PublicOnlyRoute>
                } />
                <Route path="/register" element={
                    <PublicOnlyRoute>
                        <RegisterPage />
                    </PublicOnlyRoute>
                } />
                <Route path="/" element={
                    <ProtectedRoute>
                        <Home />
                    </ProtectedRoute>
                } />
                <Route path="/video/:id" element={
                    <ProtectedRoute>
                        <VideoDetailPage />
                    </ProtectedRoute>
                } />
                <Route path="/watchlist" element={
                    <ProtectedRoute>
                        <WatchlistPage />
                    </ProtectedRoute>
                } />
                <Route path="/profile" element={
                    <ProtectedRoute>
                        <ProfilePage />
                    </ProtectedRoute>
                } />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </Suspense>
    );
};

export default AppRoutes;

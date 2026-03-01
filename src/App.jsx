import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthContext';
import AppRoutes from './routes';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="app-container">
          {/* Header will go here */}
          <main className="main-content">
            <AppRoutes />
          </main>
        </div>
        <ToastContainer position="bottom-right" theme="colored" />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

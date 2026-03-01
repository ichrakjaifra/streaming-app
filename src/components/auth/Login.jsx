import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Auth.css';

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Adresse email invalide')
                .required('L\'email est requis'),
            password: Yup.string()
                .min(6, 'Le mot de passe doit contenir au moins 6 caractères')
                .required('Le mot de passe est requis'),
        }),
        onSubmit: (values) => {
            const result = login(values.email, values.password);
            if (result.success) {
                toast.success('Connexion réussie !');
                navigate('/');
            } else {
                toast.error(result.message || 'Erreur de connexion');
            }
        },
    });

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Connexion</h2>
                <form onSubmit={formik.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                            className={formik.touched.email && formik.errors.email ? 'input-error' : ''}
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <div className="error-message">{formik.errors.email}</div>
                        ) : null}
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Mot de passe</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                            className={formik.touched.password && formik.errors.password ? 'input-error' : ''}
                        />
                        {formik.touched.password && formik.errors.password ? (
                            <div className="error-message">{formik.errors.password}</div>
                        ) : null}
                    </div>

                    <button type="submit" className="auth-button">Se connecter</button>
                </form>
                <p className="auth-link">
                    Pas encore de compte ? <Link to="/register">S'inscrire</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;

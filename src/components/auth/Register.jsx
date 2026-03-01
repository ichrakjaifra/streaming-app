import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Auth.css';

const Register = () => {
    const { register } = useAuth();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: Yup.object({
            username: Yup.string()
                .min(3, 'Le nom d\'utilisateur doit contenir au moins 3 caractères')
                .required('Le nom d\'utilisateur est requis'),
            email: Yup.string()
                .email('Adresse email invalide')
                .required('L\'email est requis'),
            password: Yup.string()
                .min(6, 'Le mot de passe doit contenir au moins 6 caractères')
                .required('Le mot de passe est requis'),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Les mots de passe doivent correspondre')
                .required('La confirmation du mot de passe est requise'),
        }),
        onSubmit: (values) => {
            const { confirmPassword, ...userData } = values;
            const result = register(userData);
            if (result.success) {
                toast.success('Inscription réussie !');
                navigate('/');
            } else {
                toast.error(result.message || 'Erreur d\'inscription');
            }
        },
    });

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Créer un compte</h2>
                <form onSubmit={formik.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Nom d'utilisateur</label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.username}
                            className={formik.touched.username && formik.errors.username ? 'input-error' : ''}
                        />
                        {formik.touched.username && formik.errors.username ? (
                            <div className="error-message">{formik.errors.username}</div>
                        ) : null}
                    </div>

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

                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.confirmPassword}
                            className={formik.touched.confirmPassword && formik.errors.confirmPassword ? 'input-error' : ''}
                        />
                        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                            <div className="error-message">{formik.errors.confirmPassword}</div>
                        ) : null}
                    </div>

                    <button type="submit" className="auth-button">S'inscrire</button>
                </form>
                <p className="auth-link">
                    Déjà un compte ? <Link to="/login">Se connecter</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;

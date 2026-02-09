import { createFileRoute, useNavigate, Link } from '@tanstack/react-router';
import { useState } from 'react';
import logo from '../assets/Logo-GSO3.png';
import './register.css';
import { checkPasswordStrength } from '../utils/password';

export const Route = createFileRoute('/register')({
    component: RouteComponent,
});

function RouteComponent() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        company: '',
        contact: '',
        email: '',
        password: '',
        passwordConfirm: '',
    });

    const passwordRules = checkPasswordStrength(form.password);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Backend bewusst nicht angebunden (UI only)navigate("/register/success");
    };

    return (
        <div className="register-wrapper">
            <div className="register-card">
                {/* Header */}
                <div className="register-header">
                    <img src={logo} alt="GSO Köln Marketplace" />
                    <span>MARKETPLACE</span>
                </div>

                {/* Progress */}
                <div className="stepper">
                    <div className="step active">1</div>
                    <div className="step-line active"></div>
                    <div className="step">2</div>
                </div>
                <p className="step-text">Schritt 1 von 2</p>

                {/* Content */}
                <div className="register-content">
                    <h1>Unternehmensregistrierung</h1>
                    <p>Bitte geben Sie Ihre Unternehmensdaten ein.</p>

                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <span className="icon">🏢</span>
                            <input
                                name="company"
                                placeholder="Firmenname"
                                value={form.company}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="input-group">
                            <span className="icon">👤</span>
                            <input
                                name="contact"
                                placeholder="Ansprechpartner"
                                value={form.contact}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="input-group">
                            <span className="icon">📧</span>
                            <input
                                type="email"
                                name="email"
                                placeholder="E-Mail-Adresse"
                                value={form.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <h3>Passwort erstellen</h3>

                        <div className="input-group">
                            <span className="icon">🔒</span>
                            <input
                                type="password"
                                name="password"
                                placeholder="Passwort"
                                value={form.password}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="input-group">
                            <span className="icon">🔒</span>
                            <input
                                type="password"
                                name="passwordConfirm"
                                placeholder="Passwort bestätigen"
                                value={form.passwordConfirm}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="password-rules">
                            <p className={passwordRules.length ? 'valid' : ''}>• Mindestens 8 Zeichen</p>
                            <p className={passwordRules.uppercase ? 'valid' : ''}>• Mindestens ein Großbuchstabe</p>
                            <p className={passwordRules.number ? 'valid' : ''}>• Mindestens eine Zahl</p>
                        </div>

                        <button className="btn-primary">Registrieren</button>
                    </form>

                    <div className="login-link">
                        Schon ein Konto? <Link to="/login">Jetzt anmelden</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

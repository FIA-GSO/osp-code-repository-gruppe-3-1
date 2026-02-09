import { createFileRoute } from '@tanstack/react-router'
import "./login.css"
import logo from '../assets/Logo-GSO3.png'
import { Link, useNavigate } from '@tanstack/react-router';

import { useState } from "react";
import { login, saveSession } from "../api/authApi";

export const Route = createFileRoute('/login')({
    component: RouteComponent,
})

function RouteComponent() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const data = await login(email, password);

            saveSession(data);

            navigate({ to: "/dashboardUser" }); 

        } catch (err) {
            console.log(err);
            if (err.response) {
                setError(err.response.data.message || "Login fehlgeschlagen");
            } else {
                setError("Server nicht erreichbar");
            }
        }
    };

    return (
        <div className="login-wrapper">
            <div className="login-card">
                <div className="login-header">
                    <img src={logo} alt="GSO Köln Marketplace" />
                    <hr />
                    <span>Marketplace</span>
                </div>

                <div className="login-content">
                    <h1>Anmelden</h1>
                    <p>Bitte melden Sie sich an.</p>

                    <form onSubmit={handleSubmit}>
                        {error && <div className="error">{error}</div>}

                        <div className="input-group">
                            <span className="icon">📧</span>
                            <input
                                type="email"
                                placeholder="E-Mail-Adresse"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="input-group">
                            <span className="icon">🔒</span>
                            <input
                                type="password"
                                placeholder="Passwort"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <div className="forgot-password">
                            <Link to="/passwordForgotten" className="font-semibold text-blue-500">
                                Passwort vergessen?
                            </Link>
                        </div>

                        <button type="submit" className="btn-primary">
                            Anmelden
                        </button>
                    </form>

                    <div className="register-link">
                        Noch kein Konto?<br />
                        <Link to="/register" className="font-semibold text-blue-500">
                            Jetzt registrieren
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

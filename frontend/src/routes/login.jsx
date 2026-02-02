import { createFileRoute } from '@tanstack/react-router'
import "./login.css"
import logo from '../assets/Logo-GSO.png'

export const Route = createFileRoute('/login')({
    component: RouteComponent,
})

function RouteComponent() {
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

                    <form>
                        <div className="input-group">
                            <span className="icon">📧</span>
                            <input type="email" placeholder="E-Mail-Adresse" required />
                        </div>

                        <div className="input-group">
                            <span className="icon">🔒</span>
                            <input type="password" placeholder="Passwort" required />
                        </div>

                        <div className="forgot-password">
                            <a href="#">Passwort vergessen?</a>
                        </div>

                        <button type="submit" className="btn-primary">
                            Anmelden
                        </button>
                    </form>

                    <div className="register-link">
                        Noch kein Konto?<br />
                        <a href="#">Jetzt registrieren</a>
                    </div>
                </div>
            </div>
        </div>
    );
}
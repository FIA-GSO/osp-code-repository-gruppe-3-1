import { createFileRoute } from '@tanstack/react-router'
import "./passwordForgotten.css"
import logo from '../assets/Logo-GSO3.png'
import { Link } from '@tanstack/react-router';


export const Route = createFileRoute('/passwordForgotten')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <div className="forgot-wrapper">
            <div className="forgot-card">

                {/* Header */}
                <div className="forgot-header">
                    <img src={logo} alt="GSO Köln Marketplace" />
                    <hr />
                    <span>MARKETPLACE</span>
                </div>

                {/* Content */}
                <div className="forgot-content">
                    <h1>Passwort vergessen</h1>
                    <p>
                        Geben Sie Ihre E-Mail-Adresse ein, um Ihr Passwort zurückzusetzen.
                    </p>

                    <form>
                        <div className="input-group">
                            <span className="icon">📧</span>
                            <input type="email" placeholder="E-Mail-Adresse" required />
                        </div>

                        <button type="submit" className="btn-primary">
                            Passwort zurücksetzen
                        </button>
                    </form>

                    <div className="back-to-login">
                                <Link to="/login" className="font-semibold text-blue-500">
                                    Zurück zum Login
                                </Link>
                    </div>
                </div>

            </div>
        </div>
    );
}


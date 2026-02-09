import { createFileRoute, Link } from '@tanstack/react-router'
import "./register.css";
import logo from '../assets/Logo-GSO3.png'

export const Route = createFileRoute('/registerSuccess')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <div className="register-wrapper">
            <div className="register-card">

                <div className="register-header">
                    <img src={logo} alt="GSO Köln Marketplace" />
                    <hr />
                    <span>MARKETPLACE</span>
                </div>

                <div className="stepper">
                    <div className="step active">1</div>
                    <div className="step-line active"></div>
                    <div className="step active">2</div>
                </div>
                <p className="step-text">Schritt 2 von 2</p>

                <div className="register-content success">
                    <div className="success-icon">✔</div>
                    <h1>Registrierung erfolgreich!</h1>

                    <p>
                        Vielen Dank für Ihre Anmeldung. Sie können sich nun anmelden.
                    </p>

                    <Link to="/login" className="btn-primary">
                        Zum Login
                    </Link>
                </div>
            </div>
        </div>
    );
}

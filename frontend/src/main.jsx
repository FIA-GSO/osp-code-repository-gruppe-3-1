import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Router } from './router.jsx';
import './index.css';
import './localization/index.js';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Router />
    </StrictMode>,
);

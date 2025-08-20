import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import AppContextProvider from './context/AppContext.jsx';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import './index.css';
import App from './App.jsx';

// Load your publishable key from environment
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AppContextProvider>
      <Elements stripe={stripePromise}>
        <App />
      </Elements>
    </AppContextProvider>
  </BrowserRouter>
);

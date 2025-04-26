
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { OnboardingTour } from './components/onboarding/OnboardingTour.tsx'
import { ErrorBoundary } from './components/ErrorBoundary.tsx'

createRoot(document.getElementById("root")!).render(
  <ErrorBoundary>
    <App />
    <OnboardingTour />
  </ErrorBoundary>
);

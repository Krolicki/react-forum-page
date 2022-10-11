import ReactDOM from 'react-dom/client';
import {LandingPage} from './Landing-Page/LandingPage'
import { AuthProvider } from './Landing-Page/context/AuthProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //<React.StrictMode>
    <AuthProvider>
      <LandingPage />
    </AuthProvider>
  //</React.StrictMode>
)
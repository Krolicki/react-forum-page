import ReactDOM from 'react-dom/client';
import {LandingPage} from './Apps'
//import {Workshop, TaksTracker} from './Apps'
import { AuthProvider } from './Apps/Landing-Page/context/AuthProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //<React.StrictMode>
    //<Workshop />
    //<TaksTracker />
    <AuthProvider>
      <LandingPage />
    </AuthProvider>
  //</React.StrictMode>
)
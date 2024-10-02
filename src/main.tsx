import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App.tsx';

// import de la feuille de style de semantic-ui dans notre app entry file
// avant ça on a installé semanticavec la commande pnpm i semantic-ui-react semantic-ui-css
import 'semantic-ui-css/semantic.min.css';
import './index.scss';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<App />
	</StrictMode>,
);

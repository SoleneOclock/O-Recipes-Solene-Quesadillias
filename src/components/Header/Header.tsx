import axios from 'axios';
import logo from '../../assets/logo.png';
import './Header.scss';

// import des composant pré stylés de semantic
import { Input, Button, Form, FormGroup } from 'semantic-ui-react';
import { useState } from 'react';

export default function Header() {
	// STATE pour stocker le pseudo
	const [pseudo, setPseudo] = useState<null | string>(null);

	// STATE pour stocker l'erreur de connexion
	const [authentError, setAuthentError] = useState<null | string>(null);

	// fonction qui envoie au back l'email et le password et recup la response et affiche un message en fonction
	const checkCredentials = async (email: string, pass: string) => {
		try {
			const response = await axios.post(
				'https://orecipesapi.onrender.com/api/login/',
				// on envoie au back les données du formulaire
				{
					email: email,
					password: pass,
				},
			);
			console.log(response);
			// si on reçoit une 200 on  va enregistrer le pseudo dan sle state pour afficher un message dans le JSX avec ce pseudo 'bonjour pseudo'
			setPseudo(response.data.pseudo);

			// on est connecté don con vire la potentielle precedente erreur
			setAuthentError(null);
		} catch (e) {
			// si on reçoit un 401 unathorised on va enregistrer dans le state un erreur pour afficher dans le JSX 'Mauvais mot de passe...'
			setAuthentError('Mauvais mot de passe ...');
		}
	};

	return (
		<header className="Header">
			<img className="Header-logo" src={logo} alt="logo" />
			{pseudo ? (
				<p>Bonjour {pseudo}</p>
			) : (
				<Form
					onSubmit={(e) => {
						// pas besoin de prevent default car le Form de semantic le fait deja
						// recuperer les valeurs des input pour les envoyer au back pour qu'il nous dise c'est c'est bien des credentials valides

						const formData = new FormData(e.currentTarget);
						const email = formData.get('email') as string;
						const password = formData.get('password') as string;

						// on fetch l'API
						checkCredentials(email, password);
					}}
				>
					<FormGroup>
						<Input name="email" />
						<Input name="password" />
						<Button>OK</Button>
					</FormGroup>
				</Form>
			)}
			{authentError && <p>{authentError}</p>}
		</header>
	);
}

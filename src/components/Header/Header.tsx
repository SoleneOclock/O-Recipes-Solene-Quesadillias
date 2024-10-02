import logo from '../../assets/logo.png';
import './Header.scss';
import { Input, Button, Form, FormGroup } from 'semantic-ui-react';
import { useEffect, useState } from 'react';
import myAxiosInstance, {
	addTokenToInstance,
	removeTokenFromAxiosInstance,
} from '../../axios/axios';
import { Link } from 'react-router-dom';
import {
	addTokenToLocalStorage,
	getTokenFromLocalStorage,
	removeTokenFromLocalStorage,
} from '../../localstorage/localstorage';

interface HeaderProps {
	setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Header({ setIsLogged }: HeaderProps) {
	// STATE pour stocker le pseudo
	const [pseudo, setPseudo] = useState<null | string>(null);

	// STATE pour stocker l'erreur de connexion
	const [authentError, setAuthentError] = useState<null | string>(null);

	// la fonction qui logue le user donc qui change le state pour que le pseudo s'affiche
	const onAuthenticatedUser = (pseudo: string, token: string) => {
		// si on reçoit une 200 on  va enregistrer le pseudo dan sle state pour afficher un message dans le JSX avec ce pseudo 'bonjour pseudo'
		setPseudo(pseudo);
		// on passe isLogged à true
		setIsLogged(true);
		// on va aussi recuperer le token
		// - on pourrait le placer dans le state de App
		// - on peut aussi le placer direct dans l'instance axios (ce qu'on va faire)
		addTokenToInstance(token);
	};

	// fonction qui envoie au back l'email et le password et recup la response et affiche un message en fonction
	const checkCredentials = async (email: string, pass: string) => {
		try {
			const response = await myAxiosInstance.post(
				'/login/',
				// on envoie au back les données du formulaire
				{
					email: email,
					password: pass,
				},
			);
			console.log(response);

			// on execute la fonction qui logue le user
			onAuthenticatedUser(response.data.pseudo, response.data.token);

			// on ajoute aussi le token au localStorage
			addTokenToLocalStorage(response.data.token, response.data.pseudo);

			// on est connecté donc on vire la potentielle precedente erreur
			setAuthentError(null);
		} catch (e) {
			// si on reçoit un 401 unathorised on va enregistrer dans le state un erreur pour afficher dans le JSX 'Mauvais mot de passe...'
			setAuthentError('Mauvais mot de passe ...');
		}
	};

	// au premier rendu de la page on va chercher dan sle localstorage si y'a pas un token et si oui on va re executer la fonction onAuthenticatedUser
	// biome-ignore lint/correctness/useExhaustiveDependencies: <onAuthenticatedUser ne change pas si ce n'est quelle est redefinie à l'identique donc pas besoin de l'ajouter au tableau des deps>
	useEffect(() => {
		const { jwt, pseudo } = getTokenFromLocalStorage();
		console.log('recup du jwt en localstorage');

		if (jwt && pseudo) {
			onAuthenticatedUser(pseudo, jwt);
		}
	}, []);

	return (
		<header className="Header">
			<img className="Header-logo" src={logo} alt="logo" />
			{pseudo ? (
				<div>
					<p>Bonjour {pseudo}</p>
					<Button
						onClick={() => {
							// vider le pseudo du state
							setPseudo(null);
							// isLogged passer à false
							setIsLogged(false);
							// virer le token de l'instance axios
							removeTokenFromAxiosInstance();
							// supprimer le token du localStorage
							removeTokenFromLocalStorage();
						}}
					>
						Se deconnecter
					</Button>
					<Link to="/favorites">❤️</Link>
				</div>
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

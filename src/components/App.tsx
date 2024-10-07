import { useEffect, useState } from 'react';
import './App.scss';
import Header from './Header/Header';
import HomePage from './HomePage/HomePage';
import Nav from './Nav/Nav';
import IRecipe from '../@types/recipe';
import { Route, Routes } from 'react-router-dom';
import RecipePage from './RecipePage/RecipePage';
import myAxiosInstance from '../axios/axios';
import FavoritesPage from './HomePage/FavoritesPage';

function App() {
	// STATE qui stocke les recettes : au debut un tableau vide et après le fetch on a les recettes
	// - on les passe via une prop à HomePage pour qu'il affiche ses card
	// - et aussi à Nav pour qu'il affiche ses liens
	const [recipes, setRecipes] = useState<IRecipe[]>([]);

	// STATE qui stocke si le user est connecté
	const [isLogged, setIsLogged] = useState(false);

	useEffect(() => {
		const fetchRecipes = async () => {
			try {
				// ici on utilise l'instance axios qui a la base url de paramétrée
				const response = await myAxiosInstance.get('/recipes');
				console.log(response.data);
				// on a recup les données de l'API on va les mettre dans le state
				setRecipes(response.data);
			} catch (e) {
				console.log(e);
			}
		};
		fetchRecipes();
	}, []);

	// recuperation de la variable d'environnement qui sera diffferente suivant qu'on soit en dev ou en prod
	console.log(import.meta.env.MODE);
	console.log(import.meta.env.VITE_BASEURL);

	return (
		<div className="App">
			<div className="App-left">
				<Nav recipes={recipes} />
			</div>
			<div className="App-right">
				<p>on est en mode : {import.meta.env.MODE}</p>
				<p>l'url de l'API est : {import.meta.env.VITE_BASEURL}</p>
				<Header setIsLogged={setIsLogged} />

				<Routes>
					<Route path="/" element={<HomePage recipes={recipes} />} />
					<Route path="/recipe/:slug" element={<RecipePage />} />
					{isLogged && <Route path="/favorites" element={<FavoritesPage />} />}
					<Route path="*" element={<p>404</p>} />
				</Routes>
			</div>
		</div>
	);
}

export default App;

import axios from 'axios';

import { useEffect, useState } from 'react';
import './App.scss';
import Header from './Header/Header';
import HomePage from './HomePage/HomePage';
import Nav from './Nav/Nav';
import IRecipe from '../@types/recipe';

function App() {
	// STATE qui stocke les recettes : au debut un tableau vide et après le fetch on a les recettes
	// - on les passe via une prop à HomePage pour qu'il affiche ses card
	// - et aussi à Nav pour qu'il affiche ses liens
	const [recipes, setRecipes] = useState<IRecipe[]>([]);

	useEffect(() => {
		const fetchRecipes = async () => {
			try {
				const response = await axios.get(
					'https://orecipesapi.onrender.com/api/recipes',
				);
				console.log(response.data);
				// on a recup les données de l'API on va les mettre dans le state
				setRecipes(response.data);
			} catch (e) {
				console.log(e);
			}
		};
		fetchRecipes();
	}, []);

	return (
		<div className="App">
			<div className="App-left">
				<Nav recipes={recipes} />
			</div>
			<div className="App-right">
				<Header />
				<HomePage recipes={recipes} />
			</div>
		</div>
	);
}

export default App;

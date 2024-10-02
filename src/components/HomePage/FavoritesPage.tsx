import { Link } from 'react-router-dom';
import IRecipe from '../../@types/recipe';
import './HomePage.scss';
import { Card, CardGroup, Button } from 'semantic-ui-react';
import { useEffect, useState } from 'react';
import myAxiosInstance from '../../axios/axios';

export default function FavoritesPage() {
	// STATE pour stocker les recettes pref
	const [favRecipes, setFavRecipes] = useState<IRecipe[]>([]);

	useEffect(() => {
		// faire une requete vers le endpoint /favorite qui a besoin du token en headers
		// au premier chargement de la page on va fetch les recettes pref
		// si on affiche cette page c'est qu'on est logé et donc c'est que y'a les headers avec le token dans l'instance
		const fetchFavRecipes = async () => {
			try {
				// si on fetch sans headers on reçoit une 401
				const response = await myAxiosInstance.get(
					'https://orecipesapi.onrender.com/api/favorites',
				);
				console.log(response);

				// enregistrer les recettes pref dans le state
				setFavRecipes(response.data.favorites);
			} catch (e) {
				console.log(e);
			}
		};
		fetchFavRecipes();
	}, []);

	return (
		<main className="Main">
			<h1 className="Main-title">Mes recettes pref</h1>
			<p>Les meilleures</p>
			<CardGroup itemsPerRow={2}>
				{favRecipes.map((recipe) => (
					<Card
						key={recipe.id}
						image={recipe.thumbnail}
						header={recipe.title}
						meta={`Difficulty: ${recipe.difficulty}`}
						description={
							<Button as={Link} to={`/recipe/${recipe.slug}`}>
								Voir la recette
							</Button>
						}
					/>
				))}
			</CardGroup>
		</main>
	);
}

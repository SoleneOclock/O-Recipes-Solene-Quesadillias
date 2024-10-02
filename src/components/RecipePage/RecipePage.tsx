import { useParams } from 'react-router-dom';
import IRecipe from '../../@types/recipe';
import { useEffect, useState } from 'react';
import axios from 'axios';

import './RecipePage.scss';

interface IRecipePageProps {
	recipes: IRecipe[];
}

export default function RecipePage({ recipes }: IRecipePageProps) {
	// recuperer le slug de l'url pour savoir quelle recette afficher
	// on va utiliser useParams pour recuperer le slug de l'url
	const { slug } = useParams();
	console.log(slug);

	// on a recup le slug mais on veut l'objet recette associé à ce slug
	// - soit on fetch l'API pour recuperer la recette
	// - soit on recup la listed es recettes en props depuis app et on find celle qu'on veut
	const [recipeToDisplay, setRecipeToDisplay] = useState<null | IRecipe>(null);

	useEffect(() => {
		const fetchRecipeFromSlug = async () => {
			try {
				const response = await axios.get(
					`https://orecipesapi.onrender.com/api/recipes/${slug}`,
				);
				console.log(response);
				// on place la recette reçue dans le state pour l'afficher
				setRecipeToDisplay(response.data);
			} catch (e) {
				console.log(e);
			}
		};
		fetchRecipeFromSlug();
	}, [slug]);

	if (!recipeToDisplay) {
		return <div>...</div>;
	}

	return (
		<main className="Recipe">
			<div className="Recipe__header">
				<img
					className="Recipe__img"
					src={recipeToDisplay.thumbnail}
					alt={recipeToDisplay.title}
				/>
				<div className="Recipe__infos">
					<h1>{recipeToDisplay.title}</h1>
					<p>Difficlutée : {recipeToDisplay.difficulty}</p>
				</div>
			</div>

			<ul className="ingredients">
				{recipeToDisplay.ingredients.map((ingredient) => (
					<li key={ingredient.id} className="ingredients__item">
						<span className="ingredients__quantity">{ingredient.quantity}</span>
						{ingredient.name}
					</li>
				))}
			</ul>

			<ul className="step">
				{recipeToDisplay.instructions.map((step) => (
					<li key={step} className="step__item">
						{step}
					</li>
				))}
			</ul>
		</main>
	);
}

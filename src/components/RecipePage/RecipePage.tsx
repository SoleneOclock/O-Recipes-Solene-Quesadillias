import { useParams } from 'react-router-dom';
import IRecipe from '../../@types/recipe';

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
	const recipeToDisplay = recipes.find((recette) => recette.slug === slug);
	console.log(recipeToDisplay);

	if (!recipeToDisplay) {
		return <div>Erreur recette non trouvée</div>;
	}

	return (
		<main className="Recipe">
			<h1>{recipeToDisplay.title}</h1>
			<img
				className="Recipe-img"
				src={recipeToDisplay.thumbnail}
				alt={recipeToDisplay.title}
			/>

			<ul className="Recipe-ingredients">
				{recipeToDisplay.ingredients.map((ingredient) => (
					<li key={ingredient.id}>{ingredient.name}</li>
				))}
			</ul>

			<ul className="Recipe-step">
				{recipeToDisplay.instructions.map((step) => (
					<li key={step}>{step}</li>
				))}
			</ul>
		</main>
	);
}

import { Link } from 'react-router-dom';
import IRecipe from '../../@types/recipe';
import './HomePage.scss';
import { Card, CardGroup, Button } from 'semantic-ui-react';

interface IHomePageProps {
	recipes: IRecipe[];
}

export default function HomePage({ recipes }: IHomePageProps) {
	return (
		<main className="Main">
			<h1 className="Main-title">Les recettes O Recipes</h1>
			<p>Voici nos recettes</p>
			<CardGroup itemsPerRow={2}>
				{recipes.map((recipe) => (
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

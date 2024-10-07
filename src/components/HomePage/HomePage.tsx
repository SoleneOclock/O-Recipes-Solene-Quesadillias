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
			<h1 className="Main-title">Les recettes O Recipes de Soso ohohoh !!!</h1>
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

/*
- build le code
- lancer les tests : si ils passent pas on s'arrete la on corrige les bugs
- se connecter sur le serveur
	- installer les bons outils (node, php, sgbd) avec les bonnes version (ou lancer un docker)
- copier les fichiers du bundle sur le serveur
- lancer le serveur

-> pour automatiser tout on peut mettre en place un script qui fait tout ça pour nous 
ci/cd
-> on peut utiliser github ou gitlab pour executer les jobs de notre ci 
*/

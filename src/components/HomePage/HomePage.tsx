import './HomePage.scss';
import { Card, CardGroup } from 'semantic-ui-react';

export default function HomePage() {
	return (
		<main className="Main">
			<h1 className="Main-title">Les recettes O Recipes</h1>
			<p>Voici nos recettes</p>
			<CardGroup itemsPerRow={2}>
				<Card
					image="https://lorempokemon.fakerapi.it/pokemon/200"
					header="Cupcake"
					meta="Friend"
					description="Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat."
				/>
				<Card
					image="https://lorempokemon.fakerapi.it/pokemon/200"
					header="Tarte"
					meta="Friend"
					description="Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat."
				/>
			</CardGroup>
		</main>
	);
}

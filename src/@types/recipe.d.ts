// on defini le type d'un objet recette, il sera utilisé dans plusieurs composants pour typer les props

export default interface IRecipe {
	id: number;
	title: string;
	slug: string;
	thumbnail: string;
	author: string;
	difficulty: string;
	description: string;
	instructions: string[];
	ingredients: {
		name: string;
		id: number;
		quantity: number;
		unit: string;
	}[];
}

import IRecipe from '../../@types/recipe';
import './Nav.scss';

interface INavProps {
	recipes: IRecipe[];
}

export default function Nav({ recipes }: INavProps) {
	return (
		<nav className="Nav">
			<ul>
				<li className="Nav-link">
					<a href="/">Acceuil</a>
				</li>
				{recipes.map((recipe) => (
					<li key={recipe.id} className="Nav-link">
						<a href="/">{recipe.title}</a>
					</li>
				))}
			</ul>
		</nav>
	);
}

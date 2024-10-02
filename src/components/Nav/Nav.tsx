import { NavLink } from 'react-router-dom';
import IRecipe from '../../@types/recipe';
import './Nav.scss';

interface INavProps {
	recipes: IRecipe[];
}

export default function Nav({ recipes }: INavProps) {
	return (
		<nav className="Nav">
			<ul>
				<li className="Nav-li">
					<NavLink to="/" className="Nav-link">
						Acceuil
					</NavLink>
				</li>
				{recipes.map((recipe) => (
					<li key={recipe.id} className="Nav-li">
						<NavLink to={`/recipe/${recipe.slug}`} className="Nav-link">
							{recipe.title}
						</NavLink>
					</li>
				))}
			</ul>
		</nav>
	);
}

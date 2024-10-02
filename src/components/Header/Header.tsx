import logo from '../../assets/logo.png';
import './Header.scss';

// import des composant pré stylés de semantic
import { Input, Button, Form, FormGroup } from 'semantic-ui-react';

export default function Header() {
	return (
		<header className="Header">
			<img className="Header-logo" src={logo} alt="logo" />
			<Form>
				<FormGroup>
					<Input />
					<Input />
					<Button>OK</Button>
				</FormGroup>
			</Form>
		</header>
	);
}

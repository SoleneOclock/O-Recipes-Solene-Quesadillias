// fonction qui ajoute le token dans le localstorage
// executée quand le user se connecte
export const addTokenToLocalStorage = (jwt: string, pseudo: string) => {
	localStorage.setItem('jwt', jwt);
	localStorage.setItem('pseudo', pseudo);
};

// fonction qui renvoie le token si y'en a un dans le localstorage sinon null
// executée au premier rendu de l'App
export const getTokenFromLocalStorage = () => {
	return {
		jwt: localStorage.getItem('jwt'),
		pseudo: localStorage.getItem('pseudo'),
	};
};

// fonction qui supprime le token du localstorage
// executée quand le user se deconnecte ou après un temps défini
export const removeTokenFromLocalStorage = () => {
	localStorage.removeItem('jwt');
	localStorage.removeItem('pseudo');
};

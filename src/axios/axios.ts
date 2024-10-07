import axios from 'axios';

const myAxiosInstance = axios.create({
	// ici on irait chercher l'url dans un fichier .env et comme ça elle sera différente suivant qu'on en dev ou en prod
	// dev -> API de dev (base avec des données de test bidons)
	// prod -> API de prod (base ave cles vraies données )
	baseURL: 'https://orecipesapi.onrender.com/api/',
	// au debut le user n'est pas connecté on ne connait pas le token donc on peut pas mettre les headers autorisation
});

export const addTokenToInstance = (jwt: string) => {
	// on ajoute le token après coup, dans l'entete authorisation on met la chaine de caractère 'Bearer letoken'
	myAxiosInstance.defaults.headers.common.Authorization = `Bearer ${jwt}`;
};

export const removeTokenFromAxiosInstance = () => {
	myAxiosInstance.defaults.headers.common.Authorization = '';
};

export default myAxiosInstance;

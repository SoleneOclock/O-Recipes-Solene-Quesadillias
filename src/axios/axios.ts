import axios from 'axios';

const myAxiosInstance = axios.create({
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

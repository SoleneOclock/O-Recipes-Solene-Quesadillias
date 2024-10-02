import axios from 'axios';

const myAxiosInstance = axios.create({
	baseURL: 'https://orecipesapi.onrender.com/api/',
});

export default myAxiosInstance;

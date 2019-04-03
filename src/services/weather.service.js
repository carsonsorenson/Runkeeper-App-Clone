import apiService from './api.service';
import { Weather } from '../models/weather';

let WeatherService = class MovieService {
	constructor() {
	}
    
    getWeather(lat, lon) {
        return new Promise((resolve, reject) => {
            fetch(apiService.getWeather(lat, lon))
            .then((response) => response.json())
            .then((response) => {
                let weather = new Weather(
                    response.weather[0].description,
                    response.main.temp,
                    response.weather[0].icon,
                    response.name,
                    response.dt
                );
                resolve(weather);
            })
            .catch((error) => {
                console.error(error);
                reject(error);
            });
        });
    }
};

// Create a Singleton
const weatherService = new WeatherService();
export default weatherService;
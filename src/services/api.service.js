let ApiService = class ApiService {
	constructor() {
		this.apiProtocol = 'https:';
        this.apiHost = 'api.openweathermap.org/data/2.5';
        this.apiKey = '5602fcad813c9421c2db3736e9606795'
	}


	get apiLocation() {
		return `${this.apiProtocol}//${this.apiHost}`;
	}

	getWeather(lat, lon) {
		let request =  `${this.apiLocation}/weather?lat=${lat}&lon=${lon}&APPID=${this.apiKey}&units=imperial`
		return request;
	}
};

const apiService = new ApiService();
export default apiService;
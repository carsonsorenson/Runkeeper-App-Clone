export class Weather {
    constructor(description, temp, icon, city, dt) {
        this.description = description;
        this.temp = temp;
        this.icon = icon;
        this.city = city
        this.dt = dt
    }

    getDescription() {
        return this.description;
    }

    getTemp() {
        return this.temp;
    }

    getIcon() {
        return `http://openweathermap.org/img/w/${this.icon}.png`;
    }

    getCity() {
        return this.city;
    }
}
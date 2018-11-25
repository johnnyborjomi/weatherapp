class ApiGetter {
    constructor() {
        this.log = '';
        this.apiKey = '&appid=fc224f33111b95796a7a8bcfc97ddea5';
        this.apiDomain = 'https://api.openweathermap.org/data/2.5/weather?q=';
    }

    getResponse(city) {
        let apiUrl = this.apiDomain + city + this.apiKey;
        return fetch(apiUrl)
            .then(data => data.json())
            .catch(
                (err) => {
                    console.log(err);
                }
            );
    }
}


export default ApiGetter;
import axios from "axios";
import config from "../config.json"

class ClientService {
    getMoviesByTitle(searchedTitle, currentPage) {
        const {apiURL, apiKey} = config;

        return new Promise((resolve, reject) => {
            axios.get(apiURL + "?apikey=" + apiKey + "&s=" + searchedTitle + "&page=" + currentPage)
                .then((response) =>
                    resolve(response.data))
                .catch((error) => {
                    reject({
                        status: (error.response && error.response.status) || '',
                        message: error.message || '',
                    });
                });
        });
    }

    getMovieDetails(id) {
        const {apiURL, apiKey} = config;

        return new Promise((resolve, reject) => {
            axios.get(apiURL + "?apikey=" + apiKey + "&i=" + id)
                .then((response) =>
                    resolve(response.data))
                .catch((error) => {
                    reject({
                        status: (error.response && error.response.status) || '',
                        message: error.message || '',
                    });
                });
        });
    }
}


export default new ClientService();

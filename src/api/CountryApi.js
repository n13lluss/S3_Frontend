import Api from './api'

const CountryApi = {
    getAllCountries: async () => {
        try {
        const response = await Api.Country.get();
        return response.data;
        } catch (error) {
        console.error('Error fetching countries:', error);
        return null;
        }
    },
};

export default CountryApi;
import CountryService from "../services/country.service";

export const country = {
  namespaced: true,
  state: { countries: [] },
  actions: {
    getCountries({ commit }) {
      return CountryService.getCountries().then(
        (data) => {
          commit("setCountries", data);
          return Promise.resolve(data);
        },
        (error) => {
          return Promise.reject(error);
        }
      );
    },
  },
  mutations: {
    setCountries(state, countries) {
      state.countries = countries;
    },
  },
};

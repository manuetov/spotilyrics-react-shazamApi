import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// API calls
// const options = {
//    method: 'GET',
//    headers: {
//      'X-RapidAPI-Key': 'dd7843d8eamshbea650910592f61p181e08jsn287bc1a1be2a',
//      'X-RapidAPI-Host': 'shazam-core.p.rapidapi.com'
//    }
//  };
 
//  fetch('https://shazam-core.p.rapidapi.com/v1/charts/world', options)
//    .then(response => response.json())
//    .then(response => console.log(response))
//    .catch(err => console.error(err));

// redux-function toolkit to provide API calls
export const shazamApi = createApi({
  reducerPath: 'shazamApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://shazam-core.p.rapidapi.com/v1',
    prepareHeaders: (headers) => {
      headers.set('X-RapidAPI-Key', 'dd7843d8eamshbea650910592f61p181e08jsn287bc1a1be2a');
      return headers;
    },
  }),
  // here we're building all endpoints
  endpoints: (builder) => ({
    getTopCharts: builder.query({ query: () => '/charts/world' }),
    getSongDetails: builder.query({ query: ({ songid }) => `/tracks/details?track_id=${songid}` }),
    getSongRelated: builder.query({ query: ({ songid }) => `/tracks/related?track_id=${songid}` }),
    getArtistDetails: builder.query({ query: (artistId) => `/artists/details?artist_id=${artistId}` }),
    getSongsByCountry: builder.query({ query: (countryCode) => `/charts/country?country_code=${countryCode}` }),
    getSongsBySearch: builder.query({ query: (searchTerm) => `/search/multi?search_type=SONGS_ARTISTS&query=${searchTerm}` }),
    getSongsByGenre: builder.query({ query: (genre) => `/charts/genre-world?genre_code=${genre}` }),
  }),
});
// redux toolkit allow us to call this endpoints as a hook and export
export const { 
  useGetTopChartsQuery,
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
  useGetArtistDetailsQuery,
  useGetSongsByCountryQuery,
  useGetSongsBySearchQuery,
  useGetSongsByGenreQuery,
 } = shazamApi;
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
  }),
});
// redux toolkit allow us to call this endpoints as a hook and export
export const { useGetTopChartsQuery } = shazamApi;
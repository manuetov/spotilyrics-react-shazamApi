import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Error, Loader, SongCard } from "../components";
import { genres } from "../assets/constants";

// dispatch => dispatches an action to the store => genres => selector => state
import { selectGenreListId } from '../redux/features/playerSlice';

import { useGetSongsByGenreQuery } from '../redux/services/shazamApi';

const Discover = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { genreListId } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetSongsByGenreQuery(genreListId || 'POP');
  // data => Api's call result. isFetching => show loading state. error => show if errors happened.
  // console.log(data)
  
  if (isFetching) return <Loader title="Cargando canciones..." />;
  if (error) return <Error />;
  
  const genreTitle = genres.find(({ value }) => value === genreListId?.title);
  
  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h2 className="font-bold text-3xl text-white text-left">
          Descubre {genreTitle}
        </h2>
        {/* select genres */}
        <select
          onChange={(e) => dispatch(selectGenreListId(e.target.value))}
          value={genreListId || 'POP'}
          className="bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5"
        >
          {genres.map((genre) => (
            <option key={genre.value} value={genre.value}>
              {genre.title}
            </option>
          ))}
        </select>
      </div>
      {/* fetch from API. map over the songs  */}
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {/* data from endpoint query: () => '/charts/world' */}
        {data?.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};

export default Discover;

import { useSelector, useDispatch } from "react-redux";
import { Error, Loader, SongCard } from "../components";
import { genres } from "../assets/constants";

import { useGetTopChartsQuery } from "../redux/services/shazamApi";

const Discover = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  // data => Api's call result. isFetching => show loading state. error => show if errors happened.
  const { data, isFetching, error } = useGetTopChartsQuery();
  console.log(data);
  const genreTitle = "Pop";

  if (isFetching) return <Loader title="Cargando canciones..." />;
  if (error) return <Error />;

  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h2 className="font-bold text-3xl text-white text-left">
          Descubre {genreTitle}
        </h2>
        {/* select genres */}
        <select
          onChange={(e) => {
            e.target.value;
          }}
          value=""
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

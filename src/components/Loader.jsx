import { loader } from '../assets';

const Loader = ({ title }) => (

  <div className="w-full flex justify-center items-center">
    <img src={loader} alt={loader} />
    <h1 className="text-bold text-2xl text-white mt-2">{title || 'Loading...'}</h1>
  </div>
);

export default Loader;

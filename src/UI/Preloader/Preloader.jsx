// import style from './Loader.module.css';
import {BarLoader} from 'react-spinners';
import PropTypes from 'prop-types';

export const Preloader = ({width = 300}) => {
  console.log();
  return <BarLoader width={width}></BarLoader>;
};

Preloader.propTypes = {
  width: PropTypes.number,
};

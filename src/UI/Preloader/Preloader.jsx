// import style from './Loader.module.css';
import {BarLoader} from 'react-spinners';
import PropTypes from 'prop-types';

export const Preloader = ({width = 300}) => (
  <BarLoader width={width}></BarLoader>
);

Preloader.propTypes = {
  width: PropTypes.number,
};

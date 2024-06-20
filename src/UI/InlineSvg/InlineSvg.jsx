import React, {useEffect, useState} from 'react';
// import style from './InlineSvg.module.css';
import PropTypes from 'prop-types';

export const InlineSvg = ({href, height, width}) => {
  const [svg, setSvg] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isErrored, setIsErrored] = useState(false);

  useEffect(() => {
    fetch(href)
      .then((res) => res.text())
      .then(setSvg)
      .catch(setIsErrored)
      .then(() => setIsLoaded(true));
  }, [href]);

  if (isErrored) {
    return '';
  }
  if (!isLoaded) {
    return '';
  }

  return (
    <div
      height={height}
      width={width}
      dangerouslySetInnerHTML={{__html: svg}}
    />
  );
};

InlineSvg.propTypes = {
  href: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number,
};

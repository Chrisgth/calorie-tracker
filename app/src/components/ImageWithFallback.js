import React from 'react';

const ImageWithFallback = ({ src, alt, defaultSrc }) => {
  const handleError = (event) => {
    event.target.src = defaultSrc;
  };

  return <img src={src} alt={alt} onError={handleError} />;
};

export default ImageWithFallback;

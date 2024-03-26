import { useState, useEffect } from 'react';

function useImageLoader(imageSources) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const images = imageSources.map(src => {
      const img = new Image();
      img.src = src;
      return img;
    });

    console.log(images);

    Promise.all(images.map(img => new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
    })))
    .then(() => setIsLoading(false))
    .catch(err => console.log(err));

  }, [imageSources]);

  return isLoading;
}

export default useImageLoader;
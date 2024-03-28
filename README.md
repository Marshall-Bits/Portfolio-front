# Marshall-Bits page

The project started when I wanted to create something special, something that I could call my own. It includes a few things that I like and allows me to showcase a bit of my skills. Essentially, it's a presentation page.

I really like pixel art, a while ago, I created a pixel art character that represents me. I thought it would be cool to design the page in a pixel art style as well using that character.

I used React to develop the page and [aseprite](https://www.aseprite.org/) to create all the pixel art.
To be honest, I started with React because I wanted to create a simple portfolio page. However, I ended up creating a mini-game, a pixel art character, and many pixel art assets.

## The mini game
This is my first attempt at creating a mini-game using React. I found it interesting to manage the state of the components and the game's logic.
As you can imagine, all games need to have progression over time. So, I used the `setInterval` function to control the game's timing.
This `setInterval` function is invoked when the component mounts and is cleared when the component unmounts. Yes, this seems straightforward, but it is tricky to manage the component's state and the game's timing. This is because, when this interval changes the component's state, all functions inside the interval use the component's previous state, right? Therefore, I had to use the `useRef` hook to store the state of all the mini-game variables.

### What's useRef?
`useRef` is a hook that allows you to store mutable values that are not part of the component's state. This is useful when you need to store a value that persists between renders. In this case, I used it to store a few game variables, such as the array of technologies the character is catching.

## Making the character talk
I wanted the character to talk, so I created a function that changes the character's sprite when text is displayed, to make it look like it's talking. I also added a sound effect every time a new letter is displayed on the screen. This gives it a kind of RPG style, which I really enjoy.

### useContext hook
To manage the character's state, I used the `useContext` hook. This hook allows you to pass data through the component tree without having to pass props down manually at every level. This is useful when you have a lot of components that need to access the same data. In this case, the character is always present on the screen, so I used this hook to manage its state. The components that appear under the character can access its state without having to pass props down. 

## Hook to load the images
The custom hook I created to load the images is very straightforward; it simply receives an array of images and returns `true` when the images are loaded. I used the useEffect hook to load the array of images when the component mounts. This way, I can display a loading message while the images are loading.
I found this method interesting instead of relying on external libraries to load the images.

### What's a custom hook?
A custom hook is a JavaScript function whose name starts with `use`. This allows you to reuse stateful logic without changing your component hierarchy. In this case, I created a custom hook to load the images, which I used in the component that displays the loading message.
 ```jsx
 import { useState, useEffect } from 'react';

function useImageLoader(imageSources) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const images = imageSources.map(src => {
      const img = new Image();
      img.src = src;
      return img;
    });

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
```
As you can see, the custom hook receives an array of image sources and returns a boolean that indicates whether the images are loaded or not. The `useEffect` hook is used to load the images when the component mounts. Every time you want to load an array of images, you just import this custom hook and use it in your component.

#### Promise.all
The `Promise.all` method is used to wait for all the images to be loaded. This method returns a promise that resolves when all the promises in the iterable argument have resolved or when the iterable argument contains no promises. In this case, I create an array of promises that resolve when the images are loaded. The `img.onload` event is used to resolve the promise when the image is loaded, and the `img.onerror` event is used to reject the promise when the image fails to load. This methods are available in the `Image` object in JavaScript.

## The responsive design
Oh yes! The worst part 🙅🏻. When creating this super personalized assets, the responsive design can be tedious. I wanted this to be a mobile page. So it's mainly focused on that. You can also check the desktop version but I'm not expecting it to be super fancy on a 4k display 😅. The key is to keep tha main parts of the app with similar proportions and leave space on the sides, the images are divided there in two parts (right and left) and the sky with the stars is just repeated multiple times. 

Thanks fort taking the time to read this. I hope you enjoy the page.

Deployed version [here](https://marshall-bits.netlify.app/)
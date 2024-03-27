# Marshall-Bits page

The project started when I wanted to create something special, something that I could call my own. It includes a few things that I like and allows me to showcase a bit of my skills. Essentially, it's a presentation page.

I really like pixel art, so I decided to create a pixel art character that represents me. I thought it would be cool to design the page in a pixel art style as well.

I used React to develop the page and [aseprite](https://www.aseprite.org/) to create all the pixel art.
To be honest, I started with React because I wanted to create a simple portfolio page. However, I ended up creating a mini-game, a pixel art character, and many pixel art assets.

## The mini game
This is my first attempt at creating a mini-game using React. I found it interesting to manage the state of the components and the game's logic.
As you can imagine, all games need to have progression over time. So, I used the `setInterval` function to control the game's timing.
This `setInterval` function is invoked when the component mounts and is cleared when the component unmounts. Yes, this seems straightforward, but it was tricky to manage the component's state and the game's timing. This is because, when this interval changes the component's state, all functions inside the interval use the component's previous state, right? Therefore, I had to use the `useRef` hook to store the state of all the mini-game variables.

## Making the character talk
I wanted the character to talk, so I created a function that changes the character's sprite when text is displayed, to make it look like it's talking. I also added a sound effect every time a new letter is displayed on the screen. This gives it a kind of RPG style, which I really enjoy.

## Hook to load the images
The custom hook I created to load the images is very straightforward; it simply receives an array of images and returns `true` when the images are loaded. I used the useEffect hook to load the images when the component mounts. This way, I can display a loading message while the images are loading.
I found this method interesting instead of relying on external libraries to load the images.

## The responsive design
Oh yes! The worst part 🙅🏻. When creating this super personalized assets, the responsive design can be tedious. I wanted this to be a mobile page. So it's mainly focused on that. You can also check the desktop version but I'm not expecting it to be super fancy on a 4k display 😅

Thanks fort taking the time to read this. I hope you enjoy the page.

Deployed version [here](https://marshall-bits.netlify.app/)
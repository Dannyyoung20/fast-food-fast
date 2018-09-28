// Our chosen character list
const chosenChar = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcedfghijklmnopqrstuvwxyz0123456789_';

// Array for storing the string characters.
const stringArray = [];

// Random character number
const iterationCount = 12;

// A unique random string generator
const generator = () => {
  // Looping through our character
  for (let i = 0; i < iterationCount; i += 1) {
    // Get a random character index
    const randCharIndex = Math.floor(Math.random() * chosenChar.length);
    // Get the character
    const char = chosenChar.charAt(randCharIndex);

    // Push the character to our string array
    stringArray.push(char);
  }
  // Return the full random string.
  const string = stringArray.join('');

  // Clean our stringArray
  stringArray.splice(0, stringArray.length);

  // Return our random string
  return string;
};


export default generator;

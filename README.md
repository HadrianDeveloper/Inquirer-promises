# Project overview
For this project, I created a Command Line Interface (CLI) using the **Inquirer.js** package which guides users to search and save data from two external APIs: GoogleBooks, PokemonAPI. Async functionality is handled by **Promises**, and the **Axios** and **fs/promises** libraries.

# Project structure
## /make-inquiries
The CLI which will prompt the user with a series of questions to find, select and save a Pokemon or a book in local persistant storage. Selected book data is stored in JSON and Pokemon data in a text file. The CLI will offer the user to find more books/Pokemon until they opt out.



## Challenges

### **1. use `fs/promises` to read a file**

In the file `1-read-and-log.js` require in `fs/promises` (Note: this is a module that is built into Node JS, so does **not** need to be installed separately).

Use the `fs/promises` `readFile` method to read the contents of `secret-message.txt` and log the result to the terminal.

_**Hint:** If you are getting a 'no such file' error with your readFile path, think about which directory you are inside in your terminal (i.e. where you are running the file from)._

### **2. use inquirer to ask for a name and log a greeting**

You will need to install the [inquirer](https://github.com/SBoudrias/Inquirer.js#installation) npm package (`npm install inquirer@8.0.0`).

**Note: You will need install version 8!**

Once installed require `inquirer` into the `2-greet.js` file.

Use `inquirer` to ask for your name when you run the file with `node`, and then log `"Hello <name>!"` to the console.

### **3. use axios to request a list of pokemon**

You will need to install the [axios](https://github.com/axios/axios#example) package (`npm install axios@1.1.3`) and require it into the `3-get-pokemon.js` file.

**Note: You will need install version 1.1.3!**

Use the `axios` `.get` method to make an http GET request to the `https://pokeapi.co/api/v2/pokemon` api and log the list of pokemon results from the response object.

### **4. use inquirer and axios to get a single pokemon**

In `4-get-single-pokemon.js`, use `inquirer` to ask the user for a number that will represent the pokemon id, and then use axios to make a GET request to `https://pokeapi.co/api/v2/pokemon/:id` to get info about the pokemon with that id.

- log the name of the pokemon with that id
- use a single `catch` method to handle if the axios request gives back a 404 - in this case, log a user friendly error saying that the pokemon does not exist.

_**Hint**: There are currently no pokemon in the database with IDs between 19999 and 29999 so you can use a number between these to test that your catch method is working._

### **5. Compare & combine files**

In the `5-compare-combine.js` file use the `fs/promises` `readFile` method to read the contents of `secret-message.txt` and `super-secret-message.txt` and:

- log the name of the file that contains the most characters of text and how many more characters it contains.
- combine the contents of the two files into a single new file `mega-secret-message.txt` using `fs/promises` `writeFile` method.

_**Hint:** [Promise.all()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all) will be useful here!_

### **6. Delete VIP**

In the `6-delete-vip.js` file use the `fs/promises` `readFile` method to read the contents of `vip-list.txt` and:

- use `inquirer` to ask the user which VIP they want to remove from the list
- update the file so that it no longer contains the VIP the user wanted to delete
- print to the console to tell the user which VIP was successfully deleted

_**Hint:** [Promise.all()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all) will be useful here!_

### **7. Save book details**

Now we can use what we have practised so far with promises and using different libraries. Within `7-save-book-details.js`:

- Use `inquirer` to ask for an author and a book.
- Use the author and book title to request the book details using `axios` to make an http GET request to the google books api (`https://www.googleapis.com/books/v1/volumes?q=${book}+inauthor:${author}`)
- Save the details to a `details.txt` file using `fs/promises`
  - You may want to take a look at the data you receive and pick some of the interesting properties to save!
- Update your code to save the details to a file that includes the author and book title, i.e. `<author>-<bookTitle>.txt`. _**Hint:** [Promise.all()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all) will be useful here!_
- Add the option to choose between exiting or getting another book with `inquirer`. _**Hint:** You will need to consider how to make your code re-usable_

If you have got up to here... CONGRATULATIONS! Time to take a break and make a brew :).

## **Extra Challenges**

1. Refactor challenges 1, 2 and 3 into flexible/reusable functions.

2. Head over to the `extra-challenges/promisification.js`. There you will see a classic async callback function `readSecretFile`. Without changing this original function, you should re-use it to make a new function, `promisifiedReadSecretFile`. `promisifiedReadSecretFile` should perform the same task but instead of using the callback pattern, returns the results in a `Promise`.

Keep track of your progress by running `npm test`!

3. Update task 5 to use [a loading spinner package](https://www.npmjs.com/package/cli-spinner) to log what is happening during the execution of the code.

**Additional Functionality**

Add a minimum wait to your `stopSpinner` function to smooth out the UI. The spinner should always show for at least 1 second before being removed.

## **Advanced**

Make a command line app that contacts users can interact with to fetch data from the [Star Wars API](https://swapi.dev/).

- Users should be presented with a list of star wars films and be able to choose which of the films they would like to know more about.
- Once they have chosen a film they should be presented with some info about it and some further options.
- They should be able to choose a character, planet or starship that features in the film to learn more about it.
- After viewing one of their choices they should be able to return to the previous film or the main menu.
- Users should be able to continue navigating around and viewing the available info until they are done and have the option to quit and return to the terminal.

Think about what information you can show your users and come up with a nice way to display that data. Do some research into how you can format your logs to make them more user friendly than just the raw data. If you're looking for some inspiration then do some research into adding colour to your logs or displaying the data as a table.

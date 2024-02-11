/* This file starts out empty; you will be adding to it in Lab 3 */

async function populate() {
    const requestURL = 'https://dsc106.com/resources/data/movies.json';
    const request = new Request(requestURL);
    const response = await fetch(request);
    const movies = await response.json();

    console.log("Number of movies in the Webfilms collection: ", Object.keys(movies).length);
    let jimCarrey = movies.filter(movie => 
        !movie.genres.includes('Comedy') &&
        !movie.genres.includes('Family') &&
        !movie.genres.includes('Animated') &&
        movie.cast.includes('Jim Carrey') );
    populateMovies(jimCarrey, "Serious Side of Jim Carrey");

    // Exercise 1
    function countMoviesByTitleKeyword(keyword) {
        return movies.filter(movie => movie.title.includes(keyword)).length;
    }
    function compareMore() {
        numLondon = countMoviesByTitleKeyword("London");
        numParis = countMoviesByTitleKeyword("Paris");
        numNewYork = countMoviesByTitleKeyword("New York");
        if (numLondon > numParis && numLondon > numNewYork) {
            console.log("There are more movies with 'London' in their title than those with 'Paris' or 'New York'");
        }
        else if (numParis > numLondon && numParis > numNewYork) {
            console.log("There are more movies with 'Paris' in their title than those with 'London' or 'New York'");
        }
        else if (numNewYork > numLondon && numNewYork > numParis) {
            console.log("There are more movies with 'New York' in their title than those with 'London' or 'Paris'");
        }
    }
    compareMore()

    // Exercise 2
    function filterMoviesByActors(actor1, actor2) {
        return movies.filter(movie => 
            (movie.cast.includes(actor1) || movie.cast.includes(actor2)) &&
            !(movie.cast.includes(actor1) && movie.cast.includes(actor2)));
    }

    const moviesWithDanielOrRalph = filterMoviesByActors("Daniel Radcliffe", "Ralph Fiennes");
    // Here you can use the existing `populateMovies` function to display these movies
    populateMovies(moviesWithDanielOrRalph, "Movies with Daniel Radcliffe or Ralph Fiennes");

    // Exercise 3
    function countAdventureMoviesByDecade() {
        const adventureMoviesByDecade = {};
        movies.forEach(movie => {
          if (movie.title.includes("Adventure") || movie.title.includes("Exploration")) {
            const decade = Math.floor(movie.year / 10) * 10;
            if (!adventureMoviesByDecade[decade]) {
              adventureMoviesByDecade[decade] = 0;
            }
            adventureMoviesByDecade[decade]++;
          }
        });
        return adventureMoviesByDecade;
    }
      
    const adventureMoviesCount = countAdventureMoviesByDecade();
    console.log(adventureMoviesCount);

}
populate();

function populateMovies(movies, categoryTitle) {
    const section = document.querySelector('section');
    const subsection = document.createElement('subsection');
    section.appendChild(subsection);
    const myH1 = document.createElement('h1');
    myH1.textContent = categoryTitle;
    subsection.appendChild(myH1);
    for (const movie of movies) {
        const myEntry = document.createElement('movie_entry');
        const myH2 = document.createElement('h2');
        const myPara2 = document.createElement('p');
        const myPara3 = document.createElement('p');
        const myPara4 = document.createElement('p');
        const myList = document.createElement('ul');
        myH2.textContent = movie.title;
        myPara2.textContent = `Year: ${movie.year}`;
        myPara3.textContent = 'Cast:';
        const castList = movie.cast;
        for (const actor of castList) {
          const listItem = document.createElement('li');
          listItem.textContent = actor;
          myList.appendChild(listItem);
        }       
        if (movie.genres) {
            myPara4.textContent = `Genres: ${movie.genres}`;
        }
        myEntry.appendChild(myH2);
        myEntry.appendChild(myPara2);
        myEntry.appendChild(myPara3);
        myEntry.appendChild(myList);
        myEntry.appendChild(myPara4);
        subsection.appendChild(myEntry);
    }
}

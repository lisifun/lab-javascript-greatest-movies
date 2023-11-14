// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
// How could you "clean" a bit this array and make it unified (without duplicates)?
function getAllDirectors(moviesArray) {
  return moviesArray.map((movie) => {
    return movie.director;
  });
}

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(moviesArray) {
  return moviesArray
    .filter((movie) => {
      return movie.director === "Steven Spielberg";
    })
    .filter((movie) => {
      return movie.genre.includes("Drama");
    }).length;
}

// Another way for Iteration 2
// function howManyMovies(moviesArray) {
//   return moviesArray.filter((movie) => {
//     return (
//       movie.director === "Steven Spielberg" && movie.genre.includes("Drama")
//     );
//   }).length;
// }

// Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(moviesArray) {
  if (moviesArray.length === 0) {
    return 0;
  }
  let average =
    moviesArray.reduce((acc, movie) => {
      if (!movie.score) {
        return acc + 0; // if the movie.score is undefined we are gonna try it like a 0;
      }
      return acc + movie.score;
    }, 0) / moviesArray.length;
  return Number(average.toFixed(2));
}

// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(moviesArray) {
  let dramaMovies = moviesArray.filter((movie) => {
    return movie.genre.includes("Drama");
  });
  return scoresAverage(dramaMovies);
}

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(moviesArray) {
  let moviesArrayCopy = [...moviesArray];
  moviesArrayCopy.sort((movie1, movie2) => {
    if (movie1.year - movie2.year !== 0) {
      return movie1.year - movie2.year;
    } else {
      return movie1.title.localeCompare(movie2.title);
    }
  });
  return moviesArrayCopy;
}

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(moviesArray) {
  let moviesArrayCopy = [...moviesArray];
  moviesArrayCopy.sort((movie1, movie2) =>
    movie1.title.localeCompare(movie2.title)
  );
  let orderedMoviesAlphabetically = moviesArrayCopy
    .slice(0, 20)
    .map((movie) => {
      return movie.title;
    });
  return orderedMoviesAlphabetically;
}

// BONUS - Iteration 1.1
// This code works but i need to find another way using filter
function cleanTheArr(moviesArray) {
  let allDirectors = [];
  getAllDirectors(moviesArray).forEach((director) => {
    if (!allDirectors.includes(director)) {
      allDirectors.push(director);
    }
  });
  return allDirectors;
}

// This is another way but is using Set
// function cleanTheArr(moviesArray) {
//   let allDirectors = getAllDirectors(moviesArray);
//   return [...new Set(allDirectors)];
// }

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes(moviesArray) {
  let newMoviesArray = structuredClone(moviesArray);

  return newMoviesArray.map((movie) => {
    let hIndex = movie.duration.indexOf("h");
    let mIndex = movie.duration.indexOf("m");
    movie.duration =
      Number(movie.duration.slice(0, hIndex) * 60) +
      Number(movie.duration.slice(hIndex + 2, mIndex));

    return movie;
  });
}

// BONUS - Iteration 8: Best yearly score average - Best yearly score average
function bestYearAvg(moviesArray) {
  if (moviesArray.length === 0) {
    return null;
  }
  let orderedMoviesByYear = orderByYear(moviesArray);
  let test = orderedMoviesByYear.reduce((acc, movie) => {
    if (!acc[movie.year]) {
      acc[movie.year] = [movie.score];
    } else {
      acc[movie.year].push(movie.score);
    }
    return acc;
  }, {});

  let maxScore = 0;
  let bestYear;

  for (let key in test) {
    let averageYear = parseFloat(
      (
        test[key].reduce((acc, score) => {
          return score + acc;
        }, 0) / test[key].length
      ).toFixed(2)
    );

    if (averageYear > maxScore) {
      maxScore = averageYear;
      bestYear = key;
    } else if (averageYear === maxScore) {
      if (bestYear < key) {
        continue;
      }
    }
  }
  return `The best year was ${bestYear} with an average score of ${maxScore}`;
}

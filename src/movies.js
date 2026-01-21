// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
// How could you "clean" a bit this array and make it unified (without duplicates)?
function getAllDirectors(moviesArray) {
    return moviesArray
        .map((movie) => movie.director)
}

function getAllUniqueDirectors(moviesArray) {
    return getAllDirectors(moviesArray)
        .filter((movie, index) => index === moviesArray.lastIndexOf(movie))
}

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(moviesArray) {
    return moviesArray.filter((movie) => movie.director === "Steven Spielberg" && movie.genre.includes("Drama")).length
}

// Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(moviesArray) {
    if (moviesArray.length === 0) {
        return 0
    }
    const total = moviesArray.reduce((sum, movie) => {
        if (typeof (movie.score) == "number") {
            return sum + movie.score
        }
        return sum
    }, 0)
    return Number((total / moviesArray.length).toFixed(2))
}

// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(moviesArray) {
    const dramaMovies = moviesArray.filter((movie) => movie.genre.includes("Drama"))
    if (dramaMovies.length === 0) {
        return 0
    }
    const dramaMoviesScore = dramaMovies.reduce((sum, movie) => {
        if (typeof (movie.score) == "number") {
            return sum + movie.score
        }
        return sum
    }, 0)
    return Number((dramaMoviesScore / dramaMovies.length).toFixed(2))
}

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(moviesArray) {
    return moviesArray.toSorted((movie1, movie2) => {
        if (movie1.year < movie2.year) {
            return -1
        } else if (movie1.year > movie2.year) {
            return 1
        } else {
            if (movie1.title < movie2.title) {
                return -1
            } else if (movie1.title > movie2.title) {
                return 1
            } else {
                return 0
            }
        }
    })
}

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(moviesArray) {
    return moviesArray
        .toSorted((movie1, movie2) => {
            if (movie1.title < movie2.title) {
                return -1
            } else if (movie1.title > movie2.title) {
                return 1
            } else {
                return 0
            }
        })
        .filter((movie, index) => index < 20)
        .map((movie) => movie.title)
}

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes(moviesArray) {
    return moviesArray.map((movie) => {
        // Creates the copy of the movie iterated.
        const copy = { ...movie }
        let totalMinutes = 0
        // Checks the regular expression and matches it.
        const hoursMatch = movie.duration.match(/(\d+)h/);
        if (hoursMatch) {
            totalMinutes += Number(hoursMatch[1]) * 60;
        }
        const minutesMatch = movie.duration.match(/(\d+)min/);
        if (minutesMatch) {
            totalMinutes += Number(minutesMatch[1]);
        }
        copy.duration = totalMinutes
        return copy
    })
}

// BONUS - Iteration 8: Best yearly score average - Best yearly score average
function bestYearAvg(moviesArray) {
    if (moviesArray.length === 0) {
        return null
    }
    let bestYear = 0
    let averageScore = 0
    const moviesByYear = {}
    moviesArray.forEach((movie) => {
        if (moviesByYear.hasOwnProperty(movie.year)) {
            let moviesScoreSum = moviesByYear[movie.year]["scoreSum"]
            moviesByYear[movie.year]["scoreSum"] = moviesScoreSum + movie.score
            moviesByYear[movie.year]["numberOfMovies"] += 1
        } else {
            moviesByYear[movie.year] = {
                "scoreSum": movie.score,
                "numberOfMovies": 1
            }
        }
    })
    for (const movie in moviesByYear) {
        let moviesScoreSum = moviesByYear[movie]["scoreSum"]
        let numberOfMovies = moviesByYear[movie]["numberOfMovies"]
        let average = moviesScoreSum / numberOfMovies
        if (average > averageScore) {
            bestYear = movie
            averageScore = average
        } else if (average === averageScore) {
            bestYear = Math.min(parseInt(movie), bestYear)
        }
    }
    return `The best year was ${bestYear} with an average score of ${averageScore}`
 }

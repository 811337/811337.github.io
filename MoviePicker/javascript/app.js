const tmdbApiKey = "84dabc723cff3b071bdbb2f068882641";

let medium;
let genrePick;
let resultsArr = [];
let choiceArr = [];
let title;
let averageVote;
let releaseDate;
let newChoose;

// clicking a medium button will save "movie" or "TV" into the medium variable
$(".mediumRadio").click(function() {
  medium = this.value;
});

// clicking a genre button will save a genre into the genrePick variable
$(".genreRadio").click(function() {
  genrePick = this.value;
});

/* API genre codes
    action: 28,
    adventure: 12,
    animation: 16,
    comedy: 35,
    crime: 80,
    documentary: 99,
    drama: 18,
    family: 10751,
    fantasy: 14,
    history: 36,
    horror: 27,
    music: 10402,
    mystery: 9648,
    romance: 10749,
    sciFi: 878,
    thriller: 53,
    war: 10752,
    western: 37
*/

$("#submitBtn").on("click", function() {

  for (let i = 0; i < 3; i++) {
    let tmdbURL =
      "https://api.themoviedb.org/4/discover/" + medium +
      "?api_key=" + tmdbApiKey +
      "&sort_by=popularity.desc&page=" + [i+1] +
      "&with_genres=" + genrePick;

      /*
      https://api.themoviedb.org/3/discover/movie?api_key=37c1cec5856970e41782ef3828236ba2
      &language=en-US&sort_by=popularity.desc&include_adult=true&include_video=false&page=8&with_genres=16
      */

    $.ajax({
      url: tmdbURL,
      method: "GET"
    }).then(function(response) {
    
      resultsArr.push(response.results);
      let choice = Math.floor(Math.random() * response.results.length);      
      choiceArr.push(choice);

      // builds poster
      if (response.results[choice].poster_path) {
        document.getElementsByTagName("img")[i].setAttribute("src", "https://image.tmdb.org/t/p/w342/" + response.results[choice].poster_path)
      } else {
        document.getElementsByTagName("img")[i].setAttribute("src", "assets/images/NoPoster3.jpg")
      }

      // builds title
      document.getElementsByClassName("name")[i].textContent = response.results[choice].name || response.results[choice].title
    });
  };
});

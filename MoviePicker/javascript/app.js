const tmdbApiKey = "84dabc723cff3b071bdbb2f068882641";

let genrePick;
let resultsArr = [];
let choiceArr = [];
let title;
let averageVote;
let releaseDate;
let newChoose;

// clicking a genre button will save a genre into the genrePick variable
$(".genreRadio").click(function() {
  genrePick = this.value;
});

/* API genre codes
    action/adventure: 10759,
    animation: 16,
    comedy: 35,
    crime: 80,
    documentary: 99,
    drama: 18,
    family: 10751,
    kids: 10762,
    mystery: 9648,
    reality: 10764,
    sci-fi/fantasy: 10765,
    soap: 10766,
    talk: 10767,
    war/politics: 10768,
    western: 37
*/

$("#submitBtn").on("click", function() {

  for (let i = 0; i < 3; i++) {
    let tmdbURL =
      "https://api.themoviedb.org/4/discover/tv?api_key=" + tmdbApiKey +
      "&sort_by=popularity.desc&include_adult=false&page=" + [i+1] +
      "&with_genres=" + genrePick;

      /*
      https://api.themoviedb.org/3/discover/tv?api_key=37c1cec5856970e41782ef3828236ba2
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
        document.getElementsByTagName("img")[i].setAttribute("src", "assets/images/NoPoster.png")
      }

      // builds title
      document.getElementsByClassName("name")[i].textContent = response.results[choice].name || response.results[choice].title
    });
  };
});

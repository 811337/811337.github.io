  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAZyx-LYc1-oV-dFlDdsmbhDI0FLttQVW4",
    authDomain: "wtfsww.firebaseapp.com",
    databaseURL: "https://wtfsww.firebaseio.com",
    projectId: "wtfsww",
    storageBucket: "wtfsww.appspot.com",
    messagingSenderId: "336077336011"
};

  firebase.initializeApp(config);

  // Variables and URL building elements
const tmdbApiKey = "90968a3a4b4657a1e2fce6130d75ba6f";
const ytApiKey = "AIzaSyC20vgTb7sNZe3ZoXWThFESKMjwCyPIof0";

  // initially loads with no medium and genre picked
let medium;
let genrePick;
let resultsArr = [];
let choiceArr = [];
let title;
let averageVote;
let releaseDate;
let ytVidURL;
let newChoose;
let ytLink;

// clicking a medium button will save "movie" or "TV" into the medium variable
$(".mediumRadio").click(function() {
  medium = this.value;
  console.log(medium);
  return medium;
});

// clicking a genre button will save a genre into the genrePick variable
$(".genreRadio").click(function() {
  genrePick = this.value;
  console.log(genrePick);
  return genrePick;
});

/*const genre = [{
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
}];*/

$("#submitBtn").on("click", function() {
  let tmdbURL = "https://api.themoviedb.org/3/discover/" + medium + "?api_key=" + tmdbApiKey +
                "&with_genres=" + genrePick + "&certification_country=US&append_to_response=release_dates";
    let trailerSearch;

    // User Input Validation Modal (a requirement)
    /*if ((medium === "") || (genrePick === "")) {
        modal("Please choose either Movie or TV Show *and* a genre to continue");
    } 
    else { */
    // First AJAX call (TMDB) (note: indent all the ajax stuff if modal is working)
    $.ajax({
        url: tmdbURL,
        method: "GET"
    // TMDB AJAX Promise:
    }).then(function(response) {
      // Pull 3 random choices from the response data w/ a loop
      for (let i = 0; i < 3; i++) {
        resultsArr.push(response.results);
        let choice = Math.floor(Math.random() * response.results.length);
            
        choiceArr.push(choice);
        console.log(choiceArr);

        // builds poster
        document.getElementsByTagName("img")[i].setAttribute("src", "https://image.tmdb.org/t/p/w342/" + response.results[choice].poster_path);
      }

        let tmdbResponse = response.results;
        console.log(response.results);
        console.log(tmdbURL);
        //return tmdbResponse;

        // Build the YouTube API Call
        let ytURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&order=relevance&q=" + tmdbResponse.title + 
        "%20trailer&key=" + ytApiKey;

        // Build the movie data + poster assembly w/ a for loop
        for (let k = 0; k < choiceArr.length; k++) {
          let poster = $("<img>");
          poster.attr("class", "moviePoster");
          poster.attr("id", "poster");
          poster.attr("src", "http://api.themoviedb.org/3/discover" + response.results[i].poster_path);
          if (medium === "tv") {
            title = response.results[i].name
            $("#titleSpace").text(response.results[i].title);
          } else if (medium === "movie") {
            $("#titleSpace").text(response.results[i].title);
          }
          $("#score").text(response.results[i].vote_average);
          // This is where we'd have a bunch of if/else if statements for the ratings, but it's not pulling that data
          // so we're going to jettison it here and make it a future development item 
          // if (response.results[i].)
          // $("#rating")
          
          // Build the choose/seen buttons dynamically
          let chooseBtn = $("<button>");
          chooseBtn.attr("class", "choose-button");
          chooseBtn.attr("id", "choose");
          chooseBtn.text("I'll watch this!");
          $(".buttons").append(chooseBtn);
          let seenBtn = $("<button>");
          seenBtn.attr("class", "seen-button");
          seenBtn.attr("id", "seen");
          chooseBtn.text("Already seen it!");
          $(".buttons").append(seenBtn);
        }

        // Second AJAX call (YouTube)
        $.ajax({
        url: ytURL,
        method: "GET"
        // YouTube AJAX Promise:
        }).done(function(data){
          // Build the YouTube source URL using the YouTube ID and their URL structure
          // with a for loop for each needed result and add link to poster
            for (let j = 0; j < data.length; j++) {
              console.log(data);
              //let ytVidURL = "http://www.youtube.com/watch?v=" + data.items[k].id.videoId;
              // Add the trailer link to the poster to be viewed as pop-up modal
              poster.html("<a href=" + ytVidURL);
            }
        })
    });
  });

  // Populate two tables, one for titles when you've seen the generated choice, 
  // one for when you choose it (persistent data requirement). 
  // This will be stored on Greg's Firebase (initiated at the top).
  $("#choose").on("click", function() {
    database.ref().on("value", function(snapshot) {
      if (medium = "tv") {
        title = response.results[i].name;
      }
      averageVote = response.results[i].average_vote;
      releaseDate = response.resulst[i].release_date;
      ytLink = ytVidURL;

      const newChoose = {
        title: title,
        averageVote: averageVote,
        releaseDate: releaseDate,
        ytLink: ytLink
      }

      database.ref().push(newChoose);
      console.log(newChoose.title);
      console.log(newChoose.averageVote);
      console.log(newChoose.releaseDate);
      console.log(newChoose.ytLink);
      
      $("#chosen-table > tbody").append($("<tr>").append(
        $("<td class='text-center'>").text(newChoose.title),
        $("<td class='text-center'>").text(newChoose.averageVote),
        $("<td class='text-center'>").text(newChoose.releaseDate),
        $("<td class='text-center'>").text(newChoose.ytLink)
      ));
    });
  });

  $("#seen").on("click", function() { 
    database.ref().on("value", function(snapshot) {
      if (medium = "tv") {
        title = response.results[i].name;
      }
      averageVote = response.results[i].average_vote;
      releaseDate = response.resulst[i].release_date;
      ytLink = ytVidURL;

      const newSeen = {
        title: title,
        averageVote: averageVote,
        releaseDate: releaseDate,
        ytLink: ytLink
      }

      database.ref().push(newChoose);
      console.log(newSeen.title);
      console.log(newSeen.averageVote);
      console.log(newSeen.releaseDate);
      console.log(newSeen.ytLink); 
      $("#chosen-table > tbody").append($("<tr>").append(
        $("<td class='text-center'>").text(newSeen.title),
        $("<td class='text-center'>").text(newSeen.averageVote),
        $("<td class='text-center'>").text(newSeen.releaseDate),
        $("<td class='text-center'>").text(newSeen.ytLink)    
      ));
  });
});

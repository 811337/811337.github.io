//array of existing animals
var animals = ["Unicorn", "Dragon", "Mermaid", "Goblin", "Centaur", "Chicken"];

//creates buttons from existing indexes
function existingButtons(){

	// deletes the prior array of buttons
	$("#showButtons").empty();
	
	for (var i = 0; i < animals.length; i++){
		var a = $("<button>") 
		a.addClass("btns margin");
		a.attr("data-name", animals[i]);
		a.text(animals[i]);
		$("#showButtons").append(a);
	}
}

//adds to array when submit button is clicked
$("#subButton").on("click", function(event){

    //prevents buttons from resetting to orginial state
    event.preventDefault();

    var newAnimal = $("#animal-input").val().trim();
    
	//added to array
    animals.push(newAnimal);

    existingButtons();

    //clear input after submit
    $("#animal-input").val("");
})

//display gifs
function displayGifs(){

	var name = $(this).attr("data-name");
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + name + "&api_key=lWbyc6E2INMnYsvTgiWyjuDsUfaa7fhX&limit=10";

	$.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        var results = response.data;
			
		for (var i = 0; i < results.length; i++) {
			
			var gifDiv = $("<div>");
            var gifImg = $("<img>");

            gifDiv.addClass("padding")
            gifDiv.append(gifImg);
            
            //source of image
            gifImg.attr("src", results[i].images.fixed_height_still.url);

            //still image
            gifImg.attr("data-still", results[i].images.fixed_height_still.url);

            //animated image
            gifImg.attr("data-animate", results[i].images.fixed_height.url);

            //image default is still
            gifImg.attr("data-state", 'still');
            
            gifImg.addClass("gif");
            
            $("#gif-view").prepend(

                //appends rating to each gif
                gifDiv.append("<h4>Rating: " + results[i].rating + "</h4>")
            );
		};
			
	});
}

//animate when a gif with a class of "gif" is clicked
$(document).on("click", ".gif", function(){

	var state = $(this).attr('data-state');
    
    if (state === "still"){
        $(this).attr("src", $(this).data("animate"));
        $(this).attr("data-state", "animate");
    }
    else {
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    };
});

//show gifs when a button with a class of "btns" is clicked
$(document).on("click", ".btns", displayGifs);

existingButtons();
$(document).ready(function(){
      var topics = ["cat", "dog", "rabbit", "parrot", "deer", "fox", "horse", "tiger", "puma", "cow"];



      // =====================================RENDER BUTTONs==================================================//



      function renderButtons() {

        $('#buttons-view').empty();
        for (var i = 0; i < topics.length; i++) {
          var button = $('<input type="submit"/>');
          button.attr("value", topics[i]);
          button.attr("id", "animal-button")

          button.click(function () {
            console.log($(this).attr('value'));
          });

          $('#buttons-view').append(button);
        }
      }

      // ======================================================================================================//

      // This function handles events where the add movie button is clicked

      $("#add-animal").on("click", function (event) {
        event.preventDefault();

        // Write code to grab the text the user types into the input field
        // Write code to add the new movie into the movies array
        topics.push($('#animal-input').val());
        // The renderButtons function is called, rendering the list of movie buttons
        renderButtons();
      });

      // Calling the renderButtons function to display the initial list of movies
      renderButtons();

//======================================PAUSE GIFF==============================================================//

$(".animal").on("click", function() {
      // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
      var state = $(this).attr("data-state");
      // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      // Then, set the image's data-state to animate
      // Else set src to the data-still value
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });

    //===============================CREATE THE PAGE============================================================//

      $(document).on("click", "#animal-button", function () {

        // Grabbing and storing the data-animal property value from the button
        var animal = $(this).attr("value");

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
          animal + "&api_key=QNPh2j3CFJwQwpohcxQN1tBWoyL5Nw5P&limit=10"
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function (response) {

          console.log(queryURL);

          console.log(response);

          // storing the data from the AJAX request in the results variable
          var results = response.data;

          //Looping through any array result
          for (var i = 0; i < results.length; i++) {


            // Creating a div to hold the Animal
            var animalDiv = $("<div class='animal'>");

            // Storing the rating data
            var rating = results[i].rating;

            // Creating an element to have the rating displayed
            var pOne = $("<p>").text("Rating: " + rating);

            // Displaying the rating
            animalDiv.append(pOne);

            // Retrieving the URL for the image
            // var imgURL = response.Poster;

            // Creating an element to hold the image
            var image = $("<img>").attr("src", results[i].images.fixed_height.url);

//==============================================================================================================//

//giving the image tag an src attribute of a property pulled off the result item
	    				image.attr('src', results[i].images.fixed_height_still.url)
		                    	.attr('data-still', results[i].images.fixed_height_still.url)
		                    	.attr('data-animate', results[i].images.fixed_height.url)
		                    	.attr('data-state', "still")
		                    	.addClass("showImage");

//==============================================================================================================//

            // Appending the image
            animalDiv.append(image);
            animalDiv.append(pOne);

            // Putting the entire movie above the previous movies
            $("#animal-view").prepend(animalDiv);
            
          }
        });
       });

//====================Still and Animate Image =================================================================//

	// Listens for a click on any image (dynamic)
	// $('.showImage').on('click', function(){ --> won't work here
	$(document).on('click', '.showImage',  function() {

var state = $(this).data('state');
//If the clicked image's state is still, update its src attribute to what its data-animate value is
if (state == "still") {
    console.log("still image works");
 // Then, set the image's data-state to animate
    $(this).attr('src', $(this).data('animate'))
           .data('state', 'animate');
} else {
//  else set src to the data-still value
    console.log("animated image works");
    $(this).attr('src', $(this).data('still'))
           .data('state', 'still');               
   }

 });

});
// Grab the saved articles as a json for /saved
$.getJSON("/", function(data) {
  // For each one
  for (var i = 0; i < data.length; i++) {
    // Display the apropos information on the page
    $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
  }
});

// Grab the saved articles as a json for /saved
$.getJSON("/saved", function(data) {
  // For each one
  for (var i = 0; i < data.length; i++) {
    // Display the apropos information on the page
    // Creating a panel for each article entry and adding id
    $("#saved-articles").append("class='panel panel-default' data-id='" + data[i]._id + "'>");
    // Adding panel heading
    $("#saved-articles").append("class='panel-heading'");
    // Panel title using the title of the article
    $("#saved-articles").append("<h3 class='panel-title'>" + data[i].title + "</h3>");
    // A button for viewing existing comments
    $("#saved-articles").append("<button data-id='" + data._id + "' id='view-comments'>COMMENTS</button>");
    // A button to remove an article from the saved-articles list
    $("#saved-articles").append("<button data-id'" + data._id + "' id='remove-article'>REMOVE FROM SAVED</BUTTON");
    // Panel body including the brief summary and the link
    $("#saved-articles").append("<p>" + data[i].brief + "<br />" + data[i].link + "</p>");
  }
});

// Whenever someone clicks a view-comments button
$(document).on("click", "#view-comments", function() {
  // Empty the notes from the comment section
  $("#comments").empty();
  // Save the id from the p tag
  var thisId = $(this).attr("data-id");

  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    // With that done, add the comment information to the page
    .done(function(data) {
      console.log(data);
      // The title of the article
      $("#comments").append("<h2>" + data.title + "</h2>");
      // An input to enter a new title
      $("#comments").append("<input id='titleinput' name='title' >");
      // A textarea to add a new note body
      $("#comments").append("<textarea id='bodyinput' name='body'></textarea>");
      // A button to submit a new note, with the id of the article saved to it
      $("#comments").append("<button data-id='" + data._id + "' id='savecomment'>Save Comment</button>");

      // If there's a note in the article
      if (data.comment) {
        // Place the title of the comment in the title input
        $("#titleinput").val(data.comment.title);
        // Place the body of the comment in the body textarea
        $("#bodyinput").val(data.comment.body);
      }
    });
});

// When you click the save-comment button
$(document).on("click", "#save-comment", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the comment, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      // Value taken from title input
      title: $("#titleinput").val(),
      // Value taken from note textarea
      body: $("#bodyinput").val()
    }
  })
    // With that done
    .done(function(data) {
      // Log the response
      console.log(data);
      // Empty the notes section
      $("#comments").empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#titleinput").val("");
  $("#bodyinput").val("");
});

// Whenever someone clicks a remove-article button
$(document).on("click", "#remove-article", function() {
  // Empty the notes from the comment section
  $("#comments").empty();
  // Save the id
  var thisId = $(this).attr("data-id");

  // Now make an ajax call for the Article
  $.ajax({
    method: "DELETE",
    url: "/articles/" + thisId
  })
    // With that done, ...
    .done(function(data) {
        // Need to write call to remove from database for saved articles
      console.log(data);
      console.log("Need to delete this");
    });
});
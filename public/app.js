$.getJSON('/articles', function(data) {
  for (var i = 0; i<data.length; i++){
    $('#articles').append('<div class = "panel"><p data-id="' + data[i]._id + '">'+ data[i].title + '<br><a href= http://www.Sherdog.com'+ data[i].link +' target="_blank">Click Here to Read More</a></p></div>');
  }
});


$(document).on('click', 'p', function(){
  $('#notes').empty();
  var thisId = $(this).attr('data-id');

  $.ajax({
    method: "GET",
    url: "/articles/" + thisId,
  })
    .done(function( data ) {
      console.log(data);
      $('#notes').append('<h2>' + data.title + '</h2>');
      $('#notes').append('<input id="titleinput" name="title" ><br>');
      $('#notes').append('<textarea id="bodyinput" name="body"></textarea><br>');
      $('#notes').append('<button class="btn btn-default" data-id="' + data._id + '" id="savenote">Save Note</button>');

      if(data.note){
        $('#notes').append('<h3>'+data.note.title+'</h3>');
        $('#notes').append('<p>'+data.note.body+'</p>');
      }
    });
});

$(document).on('click', '#savenote', function(){
  var thisId = $(this).attr('data-id');

  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      title: $('#titleinput').val(),
      body: $('#bodyinput').val()
    }
  })
    .done(function( data ) {
      console.log(data);
      $('#notes').empty();
    });


  $('#titleinput').val("");
  $('#bodyinput').val("");
});
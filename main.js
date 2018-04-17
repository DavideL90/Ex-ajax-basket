//declaring an empty array to store the players
var playerArray = [];
$(document).ready(function(){
   //When click on button generate an array
   //containing the number of players given
   //as input
   $('#insertNumb').click(function(){
      var numberRequested = $('#playerNumb').val();
      $('#playerNumb').val('');
      //make an ajax request to obtain the array
      $.ajax({
         url:'https://www.boolean.careers/api/array/basket?n=' + numberRequested,
         method:'GET',
         success: function(data){
            console.log(data.response);
            playerArray = data.response;
            fillTheList(playerArray);
         },
         error: function(){
            alert('Error');
         }
      });
   });
   //When click on a playerCode shows statistics
   $(document).on('click', 'playerCode', function(){

   });
});

//function to fill the player list
function fillTheList(arrPlayer){
   var list = $('#playerList');
   for (var i = 0; i < arrPlayer.length; i++) {
      list.append('<div class="playerCode"> Codice giocatore: ' + arrPlayer[i].playerCode + '</div>');
   }
}

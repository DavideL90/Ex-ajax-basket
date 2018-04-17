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
            playerArray = data.response;
            console.log(playerArray);
            fillTheList(playerArray);
         },
         error: function(){
            alert('Error');
         }
      });
   });
   //When click on a playerCode shows statistics
   $(document).on('click', '.playerCode', function(){
      //take the code of the selected player
      var actualCode = $(this).children('.code').text();
      //declare an obj with all the player's stats
      var actualPlayer = giveStats(playerArray, actualCode);
      $('#stats').children().remove();
      //print on screen all the stats
      printStats(actualPlayer);
   });
});

//function to fill the player list
function fillTheList(arrPlayer){
   var list = $('#playerList');
   for (var i = 0; i < arrPlayer.length; i++) {
      list.append('<div class="playerCode"> Codice giocatore: ' + '<span class="code">' + arrPlayer[i].playerCode + '</span></div>');
   }
}
//function that gives the stas of the player
function giveStats(arrPlayer, currentCode){
   //variable to see if I found the playercode
   var isFound = false;
   //variable to search every element of the array
   var cont = 0;
   //var to append the result
   do{
      if(arrPlayer[cont].playerCode == currentCode){
         var player = arrPlayer[cont];
         isFound = true;
      }
      else{
         cont++;
      }
   }while((!isFound) && (cont <= arrPlayer.length));

   return player;
}
//function that prints on screen the stats
function printStats(currentPlayer){
   var stats = $('#stats');
   var twoPoints = currentPlayer.twoPoints;
   var threePoints = currentPlayer.threePoints;
   var totPoints = currentPlayer.points;
   stats.append('<div> Punti: ' + currentPlayer.points + '</div>' +
                '<div> % tiri da 2 Punti: ' + (twoPoints * 100 / totPoints).toFixed(2) + '</div>' +
                '<div> % tiri da 3 Punti: ' + (threePoints * 100 / totPoints).toFixed(2) + '</div>' +
                '<div> Rimbalzi: ' + currentPlayer.rebounds + '</div>' +
                '<div> Falli: ' + currentPlayer.fouls + '</div>');
}

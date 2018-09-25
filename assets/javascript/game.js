 var ttlWins = 0;
 var ttlLosses = 0;
 var lettersTried = "";
 var typed = "";
 var NumGuessesLeft = 0;
 var Guessed = 0;
 var ttlGuesses = 0;
 var masterWord = "";
 var emptyWord = [];
 var showWord = "";
 
  // function to generate a random word called masterWord.
  function GenerateRandomWord()
  {
    var randmWordArray = ["smile", "happy" ,"sad","crazy", "cool", "surprised", "confused" , "wow","mad", "omg", "grin","amuzed"];
    var j = Math.floor((Math.random() * randmWordArray.length));
      
    masterWord = randmWordArray[j];
    
    //This will clear the existing array by setting its length to 0.
    emptyWord.length = 0;
    showWord.length = 0;

    //initializing display array and word array to match against master word.
    for (var i =0; i<masterWord.length; i++){
        showWord[i] = " _ "; 
        emptyWord[i] = "_";
        }
  }

  function resetGame()
  {
    // number of guesses is masterWord.length + 3
    ttlGuesses = masterWord.length + 3;
    NumGuessesLeft = ttlGuesses;
    lettersTried = "";
    Guessed = 0;
  }

  function displays()
  {
    // displays summary
    document.getElementById("GuessesRemaining").textContent = NumGuessesLeft;
    document.getElementById("GoodGuess").textContent = Guessed;    
    document.getElementById("varWins").textContent = ttlWins;
    document.getElementById("varLoose").textContent = ttlLosses;
    //  display the random word from the randomwordarray. for TESTING only
    //document.getElementById("masterWord").textContent = masterWord;        
  }


  //first time execution
  GenerateRandomWord();
  resetGame();
  displays();

 function checkifMatch()
 {
     matchFound = true;
    for (var x=0;x<masterWord.length;x++)
    {
        if (masterWord[x] != emptyWord[x])
        {
            matchFound = false;
        }
    } 
}

  // function to execute when onkeyup event fires.
  document.onkeyup = function(event) {

    // check whether to continue with current word or new game
    // decide if user already guessed the word 
      checkifMatch();  
      if (matchFound)    
      {
          ttlWins++; 
          // reset stats and start a new game
          GenerateRandomWord();
          resetGame();         
      }
      else if (NumGuessesLeft == 0)
      {
        ttlLosses++;
        // reset stats and start a new game
        GenerateRandomWord();
        resetGame();
      }      
      else
      {
          // user continuing to guess
        NumGuessesLeft--;
        lettersTried = lettersTried + " , " + event.key;

        // traverse to fill empty word 
        for (var i=0;i<masterWord.length;i++)
        {
            if (masterWord[i] === event.key)
            {
                Guessed++;
                typed = typed + event.key;
                emptyWord[i] = event.key;
                showWord[i] = event.key;
                document.getElementById("GoodGuess").textContent = Guessed;                
            }          
        }
        
        // updates displays
        document.getElementById("GuessesRemaining").textContent = NumGuessesLeft;
        document.getElementById("lettersTried").textContent = lettersTried;
        document.getElementById("strEmptyWord").textContent = emptyWord;
      }
    displays();
};

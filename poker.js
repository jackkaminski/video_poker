/*  Jack Kaminski
    02/17/16
    cisw 400
    Video Poker*/

window.onload = init;

// Global variable that stores the poker card array and "deal" counter
var POKER = {
    card_number: [],
    card_slot: 0,
    card_hand_log: [],
    deal_counter: 0,
    user_credit: 20,
    card_hand_tally: []      // Adds a tally per hand for each card drawn
    };


//////////////////////////////////////////////////////
// Start new game if browser has JavaScript enabled
//////////////////////////////////////////////////////
function init()
{
    if (document.getElementById) {
        
        var link = document.getElementById("deal");  
            link.onclick = deal;

        // Display user credit
        display_credit(POKER.user_credit);

    }
    else
        alert("Sorry, your browser cannot run this script");
}

//////////////////////////////////////////////////////
// Deal cards
//////////////////////////////////////////////////////
function deal()
{        
    // Deal cards if user has credit and is within a hand
    if(POKER.deal_counter == 1 || POKER.user_credit != 0){

        // Begin round one of two, initialize a new deck
        if(POKER.deal_counter == 0){
            
            // Display user credit
            display_credit(POKER.user_credit -= 5);
            
            // Reset history of cards delt from deck
            card_loop(reset_deck);
            
            // Reset array of held random numbers representing cards       
            POKER.card_number = [];
            
            // Reset the array of five cards used for scoring   
            POKER.card_hand_log = [];
            
            // Resets the card tally when a new hand is drawn
            POKER.card_hand_tally = [];
            
            // Deal out cards
            card_loop(unique_number);

            // Display proper instructions to user
            display_instructions("round_one_message", "visible");
            display_instructions("round_two_message", "hidden");
            
            // Set deal to round two of two
            POKER.deal_counter++
        }
        
        // Begin round two of two  and deal replacement cards
        else if(POKER.deal_counter == 1){
            
            // Reset card slots used in card array tally back to 0
            POKER.card_slot = 0;

            // Deal out replacement cards for those not held
            card_loop(unique_number);

            // Display round two message
            display_instructions("round_one_message", "hidden");
            display_instructions("round_two_message", "visible");
            
//////////////////////////////////////////////////////////////////////////////////
//           LEFT OFF HERE 
// Trying to figure out how to compare each char in loop to the other chars in loop
//////////////////////////////////////////////////////////////////////////////////
          /*  for (var i = 0; i < 5; i++){
            alert("the poker hand is: " + POKER.card_hand_log[i]);
                
                //line i left off on
                //if(POKER.card_hand_log[i] == POKER.card_hand_log[0])
            }*/
            //var card_sum = 0;
            
            //alert(POKER.card_hand_tally[2]);
            
            for (var i = 0; i < 5; i++){
                
                        //alert("before if");
                var card_id = "card_" + i;
                var card = document.getElementById(card_id);

                   // alert("right before if");
                if(POKER.card_hand_tally[card.dataset.card_rank_num] > 0){
                    POKER.card_hand_tally[card.dataset.card_rank_num] += 1;
                    //alert("Added +=1 to card: " + card.dataset.card_rank_num);
                    //alert("if");
                }
                else {
                    POKER.card_hand_tally[card.dataset.card_rank_num] = 1;
                    //alert("Added 1 to card: " + card.dataset.card_rank_num);
                                        
                    //alert("else");
                }
                
            }
                                    //alert("finished");
                
            var four_of_kind_found = 0;
            var three_of_kind_found = 0;
            var two_of_kind_found = 0;
            
            for (var c = 1; c < 14; c++){
                //alert("Card #" + c + ": " + POKER.card_hand_tally[c]);
                
                if (POKER.card_hand_tally[c] == 4)
                    four_of_kind_found = 1;
                    //alert("Four of a kind!");
                else if(POKER.card_hand_tally[c] == 3)
                    three_of_kind_found = 1;
                    //alert("Three of a kind!");
                else if(POKER.card_hand_tally[c] == 2){
                    two_of_kind_found = 1;
                    //alert("Two pair!");
                    //alert(POKER.card_hand_tally[c]);
                }
                
                
            }
            
            if(four_of_kind_found == 1)
                alert("Four of a kind!");
            else if (three_of_kind_found == 1 && two_of_kind_found == 1)
                alert("Full house!");
            else if (three_of_kind_found == 1)
                alert("Three of a kind!");
            else if (two_of_kind_found == 1)
                alert("Two pair!");
                /*
                card_sum += POKER.card_hand_tally[rank_number];
                
                if (card_sum == )
                
                POKER.card_hand_tally[rank_number]*/
            
            
        
            
            
            
            
        
            
            
            
            // Resets the card tally when a new hand is drawn
            //POKER.card_hand_tally = [];
            
            
            // Reset deal to round one of two for next hand
            POKER.deal_counter = 0;   
        }
    }
    else {
        // Display message to user, no longer enough credits to play
        display_instructions("round_one_message", "hidden");
        display_instructions("round_two_message", "hidden");
        display_instructions("no_credit", "visible");
    }
}

    
//////////////////////////////////////////////////////
// Display user credit
//////////////////////////////////////////////////////
function display_credit(display)
{
    var credit_display = document.getElementById("credit"); 
    credit_display.innerHTML = display;  
}


//////////////////////////////////////////////////////
// Switchs instruction visibility based on deal round
//////////////////////////////////////////////////////
function display_instructions(id, visibility)
{
    var instructions = document.getElementById(id); 
    instructions.className = visibility;
}


//////////////////////////////////////////////////////
// Register cards loop
//////////////////////////////////////////////////////
function card_loop(passed_function)
{
    for (var i = 0; i < 5; i++){
    
    var card_id = "card_" + i;
    var card = document.getElementById(card_id);
    
    passed_function(card);
    }
}


//////////////////////////////////////////////////////
// Register cards loop
///////////////////////////////////////////////////////////////////////////////////////////////////
function reset_deck(card)
{    
    // Remove card outline
    card.className = "release_card"; 
    
    // Reset card held value to false
    card.dataset.held_card = "false";
}


//////////////////////////////////////////////////////
// Generate card based on random number
//////////////////////////////////////////////////////////////////////////////////////////////////////
function unique_number(card)
{
    // If user has not held the card, genterate card
    if(card.dataset.held_card == "false"){
        
        card.dataset.card_rank_num = 0;

        
        // Generate number if it has not been used
        var number;
        do {
            number = random_number();
        } while (POKER.card_number[number]);    
        // While true, meaning number is used, keep generating
        // If false, move on to next statement and  assign as true 

        
        // Indicate number has been used
        POKER.card_number[number] = true;

        // Link card to number
        card.src = "images/cards/" + number_to_card(number, card);

        //alert("did we make it");
        // Allows user to hold or release a card
        card.onmousedown = hold_or_release_card;
    }
    // This else if used for proper logging of card hand
    // Passes over array slot if card is held
    else if(card.dataset.held_card == "true" )
        POKER.card_slot += 1;
}


//////////////////////////////////////////////////////
// Generate random number
//////////////////////////////////////////////////////
function random_number()
{
    return Math.floor(Math.random() * 52);
    alert("random");
}


//////////////////////////////////////////////////////
// Link a card to a number
//////////////////////////////////////////////////////
function number_to_card(number, card)
{  
    var rank_number = Math.floor(number / 4) + 1;
    var suit_number = number % 4;
    
    var rank_drawn, suit_drawn, card_drawn;
    
    if(rank_number == 1)
        rank_drawn = "a";
    else if(rank_number == 2)
        rank_drawn = "2";
    else if(rank_number == 3)
        rank_drawn = "3";
    else if(rank_number == 4)
        rank_drawn = "4";
    else if(rank_number == 5)
        rank_drawn = "5";
    else if(rank_number == 6)
        rank_drawn = "6";
    else if(rank_number == 7)
        rank_drawn = "7";
    else if(rank_number == 8)
        rank_drawn = "8";
    else if(rank_number == 9)
        rank_drawn = "9";
    else if(rank_number == 10)
        rank_drawn = "t";
    else if(rank_number == 11)
        rank_drawn = "j";
    else if(rank_number == 12)
        rank_drawn = "q";
    else if(rank_number == 13)
        rank_drawn = "k";
    
    if(suit_number == 0)
        suit_drawn = "c";
    else if(suit_number == 1)
        suit_drawn = "d";
    else if(suit_number == 2)
        suit_drawn = "s";
    else if(suit_number == 3)
        suit_drawn = "h";
    
    
    
    //if 
   // POKER.card_hand_tally[rank_number] = POKER.card_hand_tally[rank_number] += 1;
    
    //var temp_tally_2 = 1;
    //alert(POKER.card_hand_tally[rank_number]);
  //  if(card.dataset.card_rank_num == 0)
        card.dataset.card_rank_num = rank_number;
  //  else
   //     card.dataset.card_rank_num += 1;
    //alert(card.dataset.card_rank_num);//
    
    
    //if(card.dataset.held_card == "false")
     //   POKER.card_hand_tally[rank_number] = 0;
    /*
    if (POKER.card_hand_tally[rank_number] > 0){
        //POKER.temp_tally++;
        POKER.card_hand_tally[rank_number] += 1; 
        //alert("add a second");
    }
    else{
        POKER.card_hand_tally[rank_number] = 1;
            //alert("add a first");
    }
    
    

    */
    
    
    
    
    
    
    
    

    
    
    
    
    
    
    
   /* // Logs card hand in array
    POKER.card_hand_log[POKER.card_slot] = rank_drawn;
    
        // Check on cards that are in hand that are not held
        alert("array slot: " + POKER.card_slot);
        //alert("card held: " + card.dataset.held_card);
        alert("rank drawn: " + rank_drawn);*/
    
    // Log next card in new slot in array
    //POKER.card_slot++;

    // Returns the card image name
    return card_drawn = rank_drawn + suit_drawn + ".gif";
}

//////////////////////////////////////////////////////
// Hold a card or release a card
/////////////////////////////////////////////////////////////////////////////////////////////////////////
function hold_or_release_card()
{
    var card = this;
    
    //alert(POKER.deal_counter);
    // Allow user to hold or release cards if new hand
    if(POKER.deal_counter == 1){
        // Hold card and outline in yellow
        if(card.dataset.held_card == "false"){
            card.className = "held_card"; 
            card.dataset.held_card = "true";
            //alert(card.dataset.held_card);
        }
        // Release card and remove outline
        else if(card.dataset.held_card == "true"){
            card.className = "release_card"; 
            card.dataset.held_card = "false";
            //alert(card.dataset.held_card);
        }
    }
}



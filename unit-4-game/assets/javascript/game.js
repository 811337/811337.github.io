$(document).ready(function(){
    //generate random number to "get", from 30 to 100
    var random = Math.floor((Math.random()*71)+30);

    $("#randomNumber").text(random);

    var wins = 0;
    var losses = 0;
    var total = 0;

    $("#winsScore").text(wins);
    $("#lossesScore").text(losses);

    //generate random number for crystals, from 1 - 10
    var num1 = Math.floor((Math.random()*10)+1);
    var num2 = Math.floor((Math.random()*10)+1);
    var num3 = Math.floor((Math.random()*10)+1);
    var num4 = Math.floor((Math.random()*10)+1);

    function winner(){
        alert("Winner! Gems are truly outrageous!");
        wins++;
        $("#winsScore").text(wins);
        reset();
        }
    
    function loser(){
        alert ("Loser!");
        losses++;
        $("#lossesScore").text(losses);
        reset();
        }
    
    function reset(){
        random = Math.floor((Math.random()*71)+30);
    
        $("#randomNumber").text(random);
    
        var num1 = Math.floor((Math.random()*10)+1)
        var num2 = Math.floor((Math.random()*10)+1)
        var num3 = Math.floor((Math.random()*10)+1)
        var num4 = Math.floor((Math.random()*10)+1)
    
        total= 0;
    
        $('#totalScore').text(total);
    }

    $("#blue").on("click", function(){
        total = total + num1;
        $("#totalScore").text(total); 
            
        if (total === random){
            winner();
        }
        else if (total > random){
            loser();
        }   
    })  

    $("#green").on("click", function(){
        total = total + num2;
        $("#totalScore").text(total); 
            
        if (total === random){
            winner();
        }
        else if (total > random){
            loser();
        }   
    })  

    $("#red").on("click", function(){
        total = total + num3;
        $("#totalScore").text(total); 
            
        if (total === random){
            winner();
        }
        else if (total > random){
            loser();
        }   
    })  

    $("#yellow").on("click", function(){
        total = total + num4;
        $("#totalScore").text(total); 
            
        if (total === random){
            winner();
        }
        else if (total > random){
            loser();
        }   
    })

    reset();

})
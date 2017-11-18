var starWarsGame = {
    selectedCharacter: undefined,
    charSelected: false,
    selectedDefender: undefined,
    defenderSelected: false,
    turnCounter: 1,
    gameCharacters: [
        {
            name: "Obi-Wan Kenobi",
            char_img: "assets/images/obi-wan.jpg",
            hp: 120,
            ap: 8,
            cap: 15
        },
        {
            name: "Luke Skywalker",
            char_img: "assets/images/luke-skywalker.jpg",
            hp: 100,
            ap: 14,
            cap: 5
        },
        {
            name: "Darth Sidious",
            char_img: "assets/images/darth-sidious.jpg",
            hp: 150,
            ap: 8,
            cap: 20
        },
        {
            name: "Darth Maul",
            char_img: "assets/images/darth-maul.jpg",
            hp: 180,
            ap: 7,
            cap: 25
        }
    ],
    initializeGame: function(){
        for(var i = 0; i < this.gameCharacters.length; i++){
            var charObj = this.gameCharacters[i];
            this.renderCharacter(charObj, "#characters");
        }
        $("#characters-header").text("Select Your Character");
        $("#restart").hide();
    },
    setPlayerCharacter: function(characterName){
        var removeCharacterAt;
        for(var i = 0; i < this.gameCharacters.length; i++){
            if(characterName === this.gameCharacters[i].name){
                this.selectedCharacter = this.gameCharacters[i];
                this.charSelected = true;
                removeCharacterAt = i;
                break;
            }
        }
        if(this.charSelected){
            this.gameCharacters.splice(removeCharacterAt, 1);
            this.renderCharacter(this.selectedCharacter, "#player", false);
            $("#characters-header").text("Enemies Available To Attack");
            $("#characters").children().addClass("enemy");
        }
    },
    setDefenderCharacter: function(characterName){
        var removeDefenderAt;
        for(var i = 0; i < this.gameCharacters.length; i++){
            if(characterName === this.gameCharacters[i].name){
                this.selectedDefender = this.gameCharacters[i];
                this.defenderSelected = true;
                removeDefenderAt = i;
                break;
            }
        }
        if(this.charSelected){
            this.gameCharacters.splice(removeDefenderAt, 1);
            this.renderCharacter(this.selectedDefender, "#defender", true);
        }
    },
    renderCharacter: function(charObj, area){
        var charDiv = $("<div class='character' data-character='" + charObj.name + "'>");
        var charName = $("<div class='character-name'>").text(charObj.name);
        var charImg = $("<img class='character-image'>").attr("src", charObj.char_img).attr("alt", charObj.name);
        var charHealth = $("<div class='character-health'>").text(charObj.hp);
        charDiv.append(charName).append(charImg).append(charHealth);
        $(area).append(charDiv);
    },
    renderMessage: function(message){
        var generatedMessage = $("<p>");
        generatedMessage.text(message);
        $("#game-messages").append(generatedMessage);
    },
    clearGameMessages: function(){
        $("#game-messages").empty();
    }
};

starWarsGame.initializeGame();

$(".character").on("click", function(){
    var clickedCharName = $(this).data("character");

    if(!starWarsGame.charSelected){
        starWarsGame.setPlayerCharacter(clickedCharName);
        $(this).remove();
    }
    else if(!starWarsGame.defenderSelected){
        starWarsGame.setDefenderCharacter(clickedCharName);
        $(this).remove();
    }
});

$("#attack").on("click", function(){
    starWarsGame.clearGameMessages();
    if(starWarsGame.charSelected){
        if(starWarsGame.defenderSelected)
        {
            starWarsGame.selectedDefender.hp -= (starWarsGame.selectedCharacter.ap * starWarsGame.turnCounter);
            var attackMessage = "You attacked " + starWarsGame.selectedDefender.name + " for " + (starWarsGame.selectedCharacter.ap * starWarsGame.turnCounter);
            starWarsGame.renderMessage(attackMessage);

            if(starWarsGame.selectedDefender.hp > 0){
                $("#defender").empty();
                starWarsGame.renderCharacter(starWarsGame.selectedDefender, "#defender");
                starWarsGame.selectedCharacter.hp -= starWarsGame.selectedDefender.cap;
                var counterAttackMessage = starWarsGame.selectedDefender.name + " attacked you back for " + starWarsGame.selectedDefender.cap;
                starWarsGame.renderMessage(counterAttackMessage);
                $("#player").empty();
                starWarsGame.renderCharacter(starWarsGame.selectedCharacter, "#player");

                if(starWarsGame.selectedCharacter.hp <= 0){
                    starWarsGame.clearGameMessages();
                    var playerDefeatedMessage = "You have been defeated...GAME OVER!!!";
                    starWarsGame.renderMessage(playerDefeatedMessage);
                    $("#attack").hide();
                    $("#restart").show();
                }
            }
            else{
                $("#defender").empty();
                starWarsGame.clearGameMessages();
                var enemyDefeatedMessage = "You have defeated " + starWarsGame.selectedDefender.name + ", you can choose to fight another enemy.";
                starWarsGame.renderMessage(enemyDefeatedMessage);
                starWarsGame.defenderSelected = false;
                starWarsGame.selectedDefender = undefined;

                if(starWarsGame.gameCharacters.length === 0){
                    starWarsGame.clearGameMessages();
                    var gameWonMessage = "You Won!!! GAME OVER!!!";
                    starWarsGame.renderMessage(gameWonMessage);
                    $("#attack").hide();
                    $("#restart").show();
                }
            }
            starWarsGame.turnCounter++;
        }
        else{
            starWarsGame.renderMessage("No enemy here");
        }
    }
    else{
        starWarsGame.renderMessage("Please select your character");
    }
});

$("#restart").on("click", function(){
    location.href = location.href;
});
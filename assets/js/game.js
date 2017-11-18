
//  Character objects
var obiWan = {
    name: "Obi-Wan Kenobi",
    char_img: "../images/obi-wan.jpg",
    hp: 120,
    ap: 0,
    cap: 0
};

var lukeSkywalker = {
    name: "Luke Skywalker",
    char_img: "../images/luke-skywalker.jpg",
    hp: 100,
    ap: 0,
    cap: 0
};

var darthSidious = {
    name: "Darth Sidious",
    char_img: "../images/darth-sidious.jpg",
    hp: 150,
    ap: 0,
    cap: 0
};

var darthMaul = {
    name: "Darth Maul",
    char_img: "../images/darth-maul.jpg",
    hp: 180,
    ap: 0,
    cap: 0
};

var starWarsGame = {
    selectedCharacter: undefined,
    charSelected: false,
    selectedDefender: undefined,
    defenderSelected: false,
    gameCharacters: [
        {
            name: "Obi-Wan Kenobi",
            char_img: "assets/images/obi-wan.jpg",
            hp: 120,
            ap: 0,
            cap: 0
        },
        {
            name: "Luke Skywalker",
            char_img: "assets/images/luke-skywalker.jpg",
            hp: 100,
            ap: 0,
            cap: 0
        },
        {
            name: "Darth Sidious",
            char_img: "assets/images/darth-sidious.jpg",
            hp: 150,
            ap: 0,
            cap: 0
        },
        {
            name: "Darth Maul",
            char_img: "assets/images/darth-maul.jpg",
            hp: 180,
            ap: 0,
            cap: 0
        }
    ],
    initializeGame: function(){
        for(var i = 0; i < this.gameCharacters.length; i++){
            var charObj = this.gameCharacters[i];
            this.renderCharacter(charObj, "#characters");
        }
    },
    setPlayerCharacter: function(characterName){
        for(var i = 0; i < this.gameCharacters.length; i++){
            if(characterName === this.gameCharacters[i].name){
                this.selectedCharacter = this.gameCharacters[i];
                this.charSelected = true;
                break;
            }
        }
        if(this.charSelected){
            this.renderCharacter(this.selectedCharacter, "#player");
        }
    },
    setDefenderCharacter: function(characterName){
        for(var i = 0; i < this.gameCharacters.length; i++){
            if(characterName === this.gameCharacters[i].name){
                this.selectedDefender = this.gameCharacters[i];
                this.defenderSelected = true;
                break;
            }
        }
        if(this.charSelected){
            this.renderCharacter(this.selectedDefender, "#defender");
        }
    },
    renderCharacter: function(charObj, area){
        var charDiv = $("<div class='character' data-character='" + charObj.name + "'>");
        var charName = $("<div class='character-name'>").text(charObj.name);
        var charImg = $("<img class='character-image'>").attr("src", charObj.char_img).attr("alt", charObj.name);
        var charHealth = $("<div class='character-health'>").text(charObj.hp);
        charDiv.append(charName).append(charImg).append(charHealth);
        $(area).append(charDiv);
    }
};

starWarsGame.initializeGame();

$(".character").on("click", function(){
    var clickedCharName = $(this).data("character");

    if(!starWarsGame.charSelected){
        starWarsGame.setPlayerCharacter(clickedCharName);
        $(this).hide();
    }
    else if(!starWarsGame.defenderSelected){
        starWarsGame.setDefenderCharacter(clickedCharName);
        $(this).hide();
    }
});
$(document).ready(function() {
	var characterList = [
		{
			name: "Obi-Wan Kenobi",
			picture: "assets/images/obi-wan.jpg",
			hp: 120,
			ap: 10,
			cap: 10
		},
		{
			name: "Luke Skywalker",
			picture: "assets/images/luke.jpg",
			hp: 100,
			ap: 8,
			cap: 8
		},
		{
			name: "Darth Sidious",
			picture: "assets/images/sidious.jpg",
			hp: 150,
			ap: 6,
			cap: 6
		},
		{
			name: "Darth Maul",
			picture: "assets/images/maul.jpg",
			hp: 180,
			ap: 4,
			cap: 4
		}
	]

	console.log("The characterList is working: " + characterList[1].name);

	for (i = 0; i < characterList.length; i++) {
		
		// Create character list item.
		var character = $("<li>");
		var characterClass
		character.addClass("ui-widget-content");
		
		// Create character's name element.
		var characterName = $("<div>");
		characterName.addClass("characterName");
		characterName.text(characterList[i].name);

		// Create character's picture element.
		var characterPicture = $("<img>");
		characterPicture.addClass("characterPicture");
		characterPicture.attr("src", characterList[i].picture);
		
		// Create character's health points element.
		var characterHealth = $("<div>");
		characterHealth.addClass("characterHealth");
		characterHealth.text(characterList[i].hp);

		// Append character's name, picture, and health to list item.
		character.append(characterName, characterPicture, characterHealth);

		//Add data to each character.
		character.attr("data-character", i);
		character.attr("data-isCharacter", false);
		character.attr("data-isEnemy", false);

		// Append each character list item to list.
		character.appendTo(".characterList");

	};

	$(".ui-widget-content").on("click", function() {
		console.log("You are able to click a character" + $(this).attr("data-character"));
		var selectedCharacter = $(this);
		console.log("You are able to select your character: " + selectedCharacter.attr("data-character"));
		selectedCharacter.attr("data-isCharacter", true);
		console.log("Is your character selected?" + selectedCharacter.attr("data-isCharacter"));
	});

});

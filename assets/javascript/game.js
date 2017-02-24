$(document).ready(function() {
	
	// Create array of possible characters.
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

	// Set global variables.
	var characterSelected;
	var enemySelected;
	var enemiesAvailable;

	// Creates DOM elements for available characters from characterList[];
	for (i = 0; i < characterList.length; i++) {
		
		// Create character list item.
		var character = $("<li>");
		var characterClass
		character.addClass("ui-widget-content");
		character.addClass("available-character");
		
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
		character.attr("data-isCharacter", "false");
		character.attr("data-isEnemy", "false");

		// Append each character list item to list.
		character.appendTo(".characterList");

	};

	// Event fires any time click on list item.
	$("li").on("click", function() {

		// Don't do anything if character and enemy selected.
		if (characterSelected && enemySelected) {
			return;

		// Pick enemy only after character selection.
		// But your character can't also be your enemy.
		} else if (characterSelected && ($(this).attr("data-isCharacter") == "false")) {
			console.log("You can pick the enemy.");
			var selectedEnemy = $(this);
			console.log("You are able to select your enemy: " + selectedEnemy.attr("data-character"));
			selectedEnemy.attr("data-isEnemy", "true");
			console.log("Is your enemy selected?" + selectedEnemy.attr("data-isEnemy"));

			// Add selected enemy to DOM.
			selectedEnemy.appendTo($("#selected-enemy"));

			// Remove this class to track of available characters.
			selectedEnemy.removeClass("available-character");

			// Keep track of enemy selection.
			enemySelected = true;

			// Update list of available enemies in DOM.
			$(".characterList").appendTo($("#available-enemies"));

		// Pick your character.
		} else {
			var selectedCharacter = $(this);
			console.log("You are able to select your character: " + selectedCharacter.attr("data-character"));
			selectedCharacter.attr("data-isCharacter", "true");
			console.log("Is your character selected?" + selectedCharacter.attr("data-isCharacter"));

			// Add selected character to DOM.
			selectedCharacter.appendTo($("#character-placeholder"));

			// Remove this class to keep track of available characters.
			selectedCharacter.removeClass("available-character");
			
			// Keep track of character selection.
			characterSelected = true;

			// Update list of available enemies in DOM.
			$(".characterList").appendTo($("#available-enemies"));
		}
	});
	$("#attack").on("click", function() {
		console.log("Button event firing.");
		var characterHealthPoints = $("#selected-character #character-placeholder .ui-widget-content .characterHealth").html();
		console.log("Character Health Points = " + characterHealthPoints);
		var characterReport = "Character Health Points = " + characterHealthPoints;
		var enemyHealthPoints = $("#fight-section #selected-enemy .ui-widget-content .characterHealth").html();
		console.log("Enemy Health Points = " + enemyHealthPoints);
		var enemyReport = "Enemy Health Points = " + enemyHealthPoints;
		$("#attack-report").text(characterReport + " " + enemyReport);
    });
});

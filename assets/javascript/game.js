$(document).ready(function() {

			// Set global variables.
	var characterSelected;
	var enemySelected;
	var enemyDefeated;
	var enemiesAvailable;
	var powerSurge = 6;
	var counter = 0;
	var gameOn = true;

	// Create array of possible characters.
	var characterList = [
		{
			name: "Obi-Wan Kenobi",
			picture: "assets/images/obi-wan.jpg",
			hp: 120,
			ap: 2,
			cap: 10
		},
		{
			name: "Luke Skywalker",
			picture: "assets/images/luke.jpg",
			hp: 100,
			ap: 4,
			cap: 8
		},
		{
			name: "Darth Sidious",
			picture: "assets/images/sidious.jpg",
			hp: 150,
			ap: 4,
			cap: 20
		},
		{
			name: "Darth Maul",
			picture: "assets/images/maul.jpg",
			hp: 180,
			ap: 2,
			cap: 20
		}
	]
	

	function createCharacterList(characterList) {
		
		// Creates DOM elements for available characters from characterList[];
		for (i = 0; i < characterList.length; i++) {
			
			// Create character list item.
			var character = $("<li>");
			character.addClass("ui-widget-content");
			character.addClass("available-characters");
			
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
			character.attr("data-attackPower", characterList[i].ap);
			character.attr("data-counterAttackPower", characterList[i].cap);
			character.attr("data-isCharacter", "false");
			character.attr("data-isEnemy", "false");

			// Append each character list item to list.
			character.appendTo(".characterList");

		};
	};

	createCharacterList(characterList);

	function addLiClickListeners() {
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
				// Use prepend so next enemy is always first.
				selectedEnemy.prependTo($("#selected-enemy"));

				// Remove this class to track available characters.
				selectedEnemy.removeClass("available-characters");

				// Keep track of enemy selection.
				enemySelected = true;

				$(".characterList").removeClass($("#available-characters"));

				$("ol").addClass("enemyList").removeClass("characterList");

			// Pick your character.
			} else {
				var selectedCharacter = $(this);
				console.log("You are able to select your character: " + selectedCharacter.attr("data-character"));
				selectedCharacter.attr("data-isCharacter", "true");
				console.log("Is your character selected?" + selectedCharacter.attr("data-isCharacter"));

				// Add selected character to DOM.
				selectedCharacter.appendTo($("#character-placeholder"));

				// Remove this class to keep track of available characters.
				selectedCharacter.removeClass("available-characters");
				
				// Keep track of character selection.
				characterSelected = true;

				$(".characterList").removeClass($("#available-characters"));

				$("ol").addClass("enemyList").removeClass("characterList");

				// Update list of available enemies in DOM.
				$(".enemyList").appendTo($("#available-enemies"));
			}
		});
	}

	addLiClickListeners();
	
	$("#attack").on("click", function() {

		if (gameOn) {

			var selectedCharacter = $("#selected-character #character-placeholder .ui-widget-content").html();

			var selectedEnemy = $("#fight-section #selected-enemy .ui-widget-content .characterName").html();

			var selectedCharacterHealthPoints = $("#selected-character #character-placeholder .ui-widget-content .characterHealth").html();
			console.log("Selected Character Health Points = " + selectedCharacterHealthPoints);

			selectedCharacterHealthPoints = parseInt(selectedCharacterHealthPoints);
			
			var selectedCharacterAttackPower = $("#selected-character #character-placeholder .ui-widget-content").attr("data-attackPower");
			console.log("Character Attack Power = " + selectedCharacterAttackPower);

			selectedCharacterAttackPower = parseInt(selectedCharacterAttackPower);
			
			var selectedEnemyHealthPoints = $("#fight-section #selected-enemy .ui-widget-content .characterHealth").html();
			console.log("Enemy Health Points = " + selectedEnemyHealthPoints);

			selectedEnemyHealthPoints = parseInt(selectedEnemyHealthPoints);
			
			var selectedEnemyCounterAttackPoints = $("#fight-section #selected-enemy .ui-widget-content").attr("data-counterAttackPower");
			console.log("Enemy Counter Attack Points = " + selectedEnemyCounterAttackPoints);

			selectedEnemyCounterAttackPoints = parseInt(selectedEnemyCounterAttackPoints);

			if ((selectedCharacterHealthPoints - selectedEnemyCounterAttackPoints) > 0) {
	 			selectedCharacterHealthPoints = selectedCharacterHealthPoints - selectedEnemyCounterAttackPoints;
	 			$("#selected-character #character-placeholder .ui-widget-content .characterHealth").html(selectedCharacterHealthPoints);
	 			var characterReport = "You attacked " + selectedEnemy + " for " + selectedCharacterAttackPower + " damage.";
	 			var enemyReport = selectedEnemy + " attacked you back for " + selectedEnemyCounterAttackPoints + " damage.";
	 			$("#attack-report").text(characterReport);
	 			$("#losses-report").text(enemyReport);
	 		} else {
	 			var gameLostMessage = "You've been defeated . . . GAME OVER!!!";
	 			selectedCharacterHealthPoints = selectedCharacterHealthPoints - selectedEnemyCounterAttackPoints;
	 			$("#selected-character #character-placeholder .ui-widget-content .characterHealth").html(selectedCharacterHealthPoints);
	 			$("#attack-report").text(gameLostMessage);
	 			$("#losses-report").empty();
	 			var restartBtn = $("<button>");
	 			restartBtn.text("Restart");
	 			restartBtn.addClass("restart");
	 			restartBtn.appendTo("#fight-section");
	 			gameOn = false;
	 		}


			if ((selectedEnemyHealthPoints - selectedCharacterAttackPower) > 0) {
	 			selectedEnemyHealthPoints = selectedEnemyHealthPoints - selectedCharacterAttackPower;
	 			$("#fight-section #selected-enemy .ui-widget-content .characterHealth").html(selectedEnemyHealthPoints);
	 			var updatedCharacterAttackPower = selectedCharacterAttackPower + powerSurge;
	 			console.log("Power surge is working: " + updatedCharacterAttackPower);
	 			$("#selected-character #character-placeholder .ui-widget-content").attr("data-attackPower", updatedCharacterAttackPower);
	 			enemyDefeated = false;
	 		} else if ((selectedEnemyHealthPoints - selectedCharacterAttackPower) <= 0) {
	 			selectedEnemyHealthPoints = selectedEnemyHealthPoints - selectedCharacterAttackPower;
	 			$("#fight-section #selected-enemy .ui-widget-content .characterHealth").html(selectedEnemyHealthPoints);

	 			//selectedEnemy.attr("data-isEnemy", "false");
	 			// Todo: remove the enemy you beat.
	 			var currentEnemy = $("#fight-section #selected-enemy .ui-widget-content");
				currentEnemy.css('visibility', 'hidden');

				enemyDefeated = true;
				enemySelected = false;

				$("#losses-report").empty();

	 			if ($(".enemyList").is(":empty")) {
	 				var enemyDefeatedMessage = "You Won!!! GAME OVER!!!";
	 				$("#attack-report").text(enemyDefeatedMessage);
	 				var restartBtn = $("<button>");
	 				restartBtn.text("Restart");
	 				restartBtn.addClass("restart");
	 				restartBtn.appendTo("#fight-section");
	 				gameOn = false;
	 			} else {
	 				var enemyDefeatedMessage = "You have defeated " + selectedEnemy + ", " + "you can choose to fight another enemy.";
	 				$("#attack-report").text(enemyDefeatedMessage);
	 			}
	 				 			
	 			// Todo: at any point you get to zero, you should die.
	 			// Todo: once you beat the last creature, you will see the you won message, and the restart button will reappear.
	 			// Todo: use awesome trick of descendant selectors in inspector to get colors in boxes, etc.
	 			// Todo: one tricky bit might be the enemySelected boolean, so if anything is annoying it is probably that.

			} else {
	 			// Todo: if you press attack button, message will change again reminding you there is no enemy.
	 			var noEnemyMessage = "No enemy here.";
	 			$("#attack-report").text(noEnemyMessage);
	 		}
		} else {
			console.log("Attack button shouldn't work when game is over.");
		}	
    });
	
	//$("#fight-section").on("click", ".restart", createCharacterList);
	$("#fight-section").on("click", ".restart", function() {
		$("ol").addClass("characterList").removeClass("enemyList");
		$(".characterList").appendTo($("#available-characters"));
		$(".characterList").empty();
		createCharacterList(characterList);
		addLiClickListeners();
		$("#available-enemies").empty();
		$("#character-placeholder").empty();
		$("#selected-enemy").empty();
		$("#fight-section.button.restart").empty();$("#attack-report").empty();
		$(".restart").remove();
		gameOn = true;
		characterSelected = false;
		enemySelected = false;
    });
});

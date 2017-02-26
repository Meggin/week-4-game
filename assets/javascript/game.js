$(document).ready(function() {

	// Boolean true when character selected.
	var characterSelected;

	// Boolean true when enemy selected.
	var enemySelected;

	// Boolean true when enemy defeated.
	var enemyDefeated;

	// Boolean true when enemies still available.
	var enemiesAvailable;

	// Character attack power increases with each attack.
	var powerSurge = 6;

	// Boolean true when you can still attack enemies.
	var gameOn = true;

	// Create array characters and enemies.
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

	// Create initial list of available characters.
	createCharacterList(characterList);

	// Respond to any click on any character list item.
	addLiClickListeners();

	// Respond to any click on attack button.
	addAttClickListeners();
	
	// Create and add characters and bios to DOM.
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

	// Handle any clicks on a character.
	function addLiClickListeners() {

		// Event fires any time click on character list item.
		$("li").on("click", function() {

			// Don't do anything if character and enemy selected.
			if (characterSelected && enemySelected) {
				return;

			// Pick enemy only after character selection.
			// But your character can't also be your enemy.
			} else if (characterSelected && ($(this).attr("data-isCharacter") == "false")) {

				// Set enemy to selected list item.
				var selectedEnemy = $(this);

				// Set enemy attribute to true.
				selectedEnemy.attr("data-isEnemy", "true");

				// Add selected enemy to DOM in fight arena.
				// Use prepend so next enemy is always first.
				selectedEnemy.prependTo($("#selected-enemy"));

				// Remove class so that enemy characters don't appear.
				// Without this, they duplicate on game lost reset.
				//selectedEnemy.removeClass("available-characters");

				// Track enemy selection.
				enemySelected = true;

				// Remove this class so that enemies don't appear in character list on reset.
				$(".characterList").removeClass($("#available-characters"));

				// Rename enemy class so that you can iterate through enemies later.
				$("ol").addClass("enemyList").removeClass("characterList");


			// Choose character.
			} else {

				// Selected character item is now character.
				var selectedCharacter = $(this);

				// Set character attribute to true.
				selectedCharacter.attr("data-isCharacter", "true");

				// Add selected character to DOM.
				selectedCharacter.appendTo($("#character-placeholder"));

				// Remove this class to keep track of available characters.
				selectedCharacter.removeClass("available-characters");
				
				// Keep track of character selection.
				characterSelected = true;

				// Need to remove this class so reset is clean.
				// The class is recreated on reset, and you don't want duplicates.
				$(".characterList").removeClass($("#available-characters"));

				// Create enemy list once character selected.
				// Called at start and reset of game.
				$("ol").addClass("enemyList").removeClass("characterList");

				// Append enemy list to DOM.
				$(".enemyList").appendTo($("#available-enemies"));
			}
		});
	}
	
	// Respond to attack clicks in many ways.
	function addAttClickListeners() {

		// Event fires on attack button clicks.
		$("#attack").on("click", function() {

			// Fighting can only continue when game is on.
			if (gameOn) {

				// Access character and enemy information in the DOM>
				var selectedCharacter = $("#selected-character #character-placeholder .ui-widget-content").html();
				var selectedEnemy = $("#fight-section #selected-enemy .ui-widget-content .characterName").html();
				var selectedCharacterHealthPoints = $("#selected-character #character-placeholder .ui-widget-content .characterHealth").html();
				var selectedCharacterAttackPower = $("#selected-character #character-placeholder .ui-widget-content").attr("data-attackPower");
				var selectedEnemyHealthPoints = $("#fight-section #selected-enemy .ui-widget-content .characterHealth").html();
				var selectedEnemyCounterAttackPoints = $("#fight-section #selected-enemy .ui-widget-content").attr("data-counterAttackPower");

				// Parse DOM strings into integers.
				selectedCharacterHealthPoints = parseInt(selectedCharacterHealthPoints);
				selectedCharacterAttackPower = parseInt(selectedCharacterAttackPower);
				selectedEnemyHealthPoints = parseInt(selectedEnemyHealthPoints);
				selectedEnemyCounterAttackPoints = parseInt(selectedEnemyCounterAttackPoints);

				// If character has more health than enemy attack, attack.
				if ((selectedCharacterHealthPoints - selectedEnemyCounterAttackPoints) > 0) {
					
					// Attack and assess damage.
					characterAttacks(selectedCharacterHealthPoints, selectedEnemyCounterAttackPoints, selectedCharacterAttackPower, selectedEnemy);
		 		
		 		// Your character has lost and cgame is over.
		 		} else {
		 			
		 			// Process game over.
		 			characterLost(selectedCharacterHealthPoints, selectedEnemyCounterAttackPoints);
		 			gameOn = false;
		 		}

		 		// If enemy has more health points than character attack power, attack.
				if ((selectedEnemyHealthPoints - selectedCharacterAttackPower) > 0) {
					enemyAttacksBack(selectedEnemyHealthPoints, selectedCharacterAttackPower);
		 		
				// Enemy lost and you will pick new enemy.
		 		} else if ((selectedEnemyHealthPoints - selectedCharacterAttackPower) <= 0) {

		 			// Process fallen enemy.
		 			enemyLost(selectedEnemyHealthPoints, selectedCharacterAttackPower, selectedEnemy);
				} else {
				console.log("Attack button shouldn't work when game is over.");
				}
	    	}
	  	});
	}
	
	// Restarts game on restart click.
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

	// Handles attack.
    function characterAttacks(selectedCharacterHealthPoints, selectedEnemyCounterAttackPoints, selectedCharacterAttackPower, selectedEnemy) {
    	
    	// Adjusts character score.
    	selectedCharacterHealthPoints = selectedCharacterHealthPoints - selectedEnemyCounterAttackPoints;
		$("#selected-character #character-placeholder .ui-widget-content .characterHealth").html(selectedCharacterHealthPoints);
		
		// Creates report.
		var characterReport = "You attacked " + selectedEnemy + " for " + selectedCharacterAttackPower + " damage.";
		var enemyReport = selectedEnemy + " attacked you back for " + selectedEnemyCounterAttackPoints + " damage.";
		$("#attack-report").text(characterReport);
		$("#losses-report").text(enemyReport);
    };

    // Handles character loss and end of game.
    function characterLost(selectedCharacterHealthPoints, selectedEnemyCounterAttackPoints) {
    	var gameLostMessage = "You've been defeated . . . GAME OVER!!!";
    	selectedCharacterHealthPoints = selectedCharacterHealthPoints - selectedEnemyCounterAttackPoints;
    	$("#selected-character #character-placeholder .ui-widget-content .characterHealth").html(selectedCharacterHealthPoints);
    	$("#attack-report").text(gameLostMessage);
    	$("#losses-report").empty();
    	
    	// Adds restart button.
    	var restartBtn = $("<button>");
    	restartBtn.text("Restart");
    	restartBtn.addClass("restart");
    	restartBtn.appendTo("#fight-section");
    };

    // Handles enemy counter attack.
    function enemyAttacksBack(selectedEnemyHealthPoints, selectedCharacterAttackPower) {
    	selectedEnemyHealthPoints = selectedEnemyHealthPoints - selectedCharacterAttackPower;
    	$("#fight-section #selected-enemy .ui-widget-content .characterHealth").html(selectedEnemyHealthPoints);
    	var updatedCharacterAttackPower = selectedCharacterAttackPower + powerSurge;
    	console.log("Power surge is working: " + updatedCharacterAttackPower);
    	$("#selected-character #character-placeholder .ui-widget-content").attr("data-attackPower", updatedCharacterAttackPower);
    	enemyDefeated = false;
    }

    // Handles enemy loss.
	function enemyLost(selectedEnemyHealthPoints, selectedCharacterAttackPower, selectedEnemy) {
		selectedEnemyHealthPoints = selectedEnemyHealthPoints - selectedCharacterAttackPower;
		$("#fight-section #selected-enemy .ui-widget-content .characterHealth").html(selectedEnemyHealthPoints);

		var currentEnemy = $("#fight-section #selected-enemy .ui-widget-content");
		currentEnemy.css('visibility', 'hidden');

		enemyDefeated = true;
		enemySelected = false;

		$("#losses-report").empty();

		// Game is won when all enemies have been defeated.
		if ($(".enemyList").is(":empty")) {
			var enemyDefeatedMessage = "You Won!!! GAME OVER!!!";
			$("#attack-report").text(enemyDefeatedMessage);
			
			// Adds restart button.
			var restartBtn = $("<button>");
			restartBtn.text("Restart");
			restartBtn.addClass("restart");
			restartBtn.appendTo("#fight-section");
			gameOn = false;

		// Controls ability to select new enemy.
		} else {
			var enemyDefeatedMessage = "You have defeated " + selectedEnemy + ", " + "you can choose to fight another enemy.";
			$("#attack-report").text(enemyDefeatedMessage);

			// I tried hard to disable the attack button after enemy loses, but couldn't.
			//$("#attack").attr("disabled", true);
		}
		//} else if ($("#attack").attr("disabled", true)){
			// Todo: if you press attack button, message will change again reminding you there is no enemy.
			//var noEnemyMessage = "No enemy here.";
			//$("#attack-report").text(noEnemyMessage);
    };
});
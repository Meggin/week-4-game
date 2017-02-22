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
	var character = $("<li>");
	character.addClass("character");
	var characterName = $("<div>");
	characterName.addClass("characterName");
	characterName.text(characterList[i].name);
	var characterPicture = $("<img>");
	characterPicture.addClass("characterPicture");
	characterPicture.attr("src", characterList[i].picture);
	var characterHealth = $("<div>");
	characterHealth.addClass("characterHealth");
	characterHealth.text(characterList[i].hp)
	character.append(characterName, characterPicture, characterHealth);
	//character.text(characterList[i].name);
	character.appendTo(".characterList");
};
$(document).ready(function () {

	function greetings() {
		alert("Welcome to the Star Wars RPG Game. Please choose your character.");
	}

	function resetCharacters() {
		$("#luke_skywalker").attr("name", "Luke Skywalker");
		$("#luke_skywalker").attr("health_points", 100);
		var hp = $("#luke_skywalker").attr("health_points");
		$("#luke_skywalker .hp").text(hp);
		$("#luke_skywalker").attr("attack_power", 5);
		$("#luke_skywalker").attr("counter_attack_power", 5);

		$("#obi_wan").attr("name", "Obi-Wan");
		$("#obi_wan").attr("health_points", 120);
		var hp = $("#obi_wan").attr("health_points");
		$("#obi_wan .hp").text(hp);
		$("#obi_wan").attr("attack_power", 8);
		$("#obi_wan").attr("counter_attack_power", 8);

		$("#darth_sidious").attr("name", "Darth Sidious");
		$("#darth_sidious").attr("health_points", 150);
		var hp = $("#darth_sidious").attr("health_points");
		$("#darth_sidious .hp").text(hp);
		$("#darth_sidious").attr("attack_power", 20);
		$("#darth_sidious").attr("counter_attack_power", 20);

		$("#darth_maul").attr("name", "Darth Maul");
		$("#darth_maul").attr("health_points", 180);
		var hp = $("#darth_maul").attr("health_points");
		$("#darth_maul .hp").text(hp);
		$("#darth_maul").attr("attack_power", 25);
		$("#darth_maul").attr("counter_attack_power", 25);
	}

	function resetPlacement() {
		gameOver = false;
		won = false;
		$("#luke_skywalker.characters").appendTo(".main_menu");
		$("#obi_wan.characters").appendTo(".main_menu");
		$("#darth_sidious.characters").appendTo(".main_menu");
		$("#darth_maul.characters").appendTo(".main_menu");
		$(".characters").css("background-color", "#ffffff");
		$(".characters").css("color", "#000000");
		$(".result").empty();
		$(".reset").hide();
	}

	greetings();
	resetCharacters();
	var gameOver = false;
	var won = false;

	$(".main_menu").on("click", ".characters" ,function() {
		var characterClicked = $(this).attr("id");
		var allCharacters = $(".main_menu .characters");
		allCharacters.each(function() {
			if ($(this).attr("id") != characterClicked) {
				$(this).appendTo(".enemies_available");
				$(this).css("background-color", "#ff0000");
			} else {
				$(this).appendTo(".your_character");
			}
		})
	})

	$(".enemies_available").on("click", ".characters", function() {
		if ($(".defender").is(":empty")) {
			$(this).appendTo(".defender");
			$(this).css("background-color", "#000000");
			$(this).css("color", "#ffffff");
		} else {
			var defenderName = $(".defender .characters").attr("name");
			newDiv = $("<p></p>").text("Defeat " + defenderName + " first to move on to another enemy.");
			$(".result").html(newDiv);
		}
	})

	$(".attack").on("click", function() {
		if (!gameOver) {
			var enemyName = $(".defender .characters").attr("name");
			var enemyHP = $(".defender .characters").attr("health_points");
			var baseDamageDone = $(".your_character .characters").attr("counter_attack_power")
			var hp = $(".your_character .characters").attr("health_points");
			var damageDone = $(".your_character .characters").attr("attack_power");
			var damageReceived = $(".defender .characters").attr("counter_attack_power");
			var newAttackPower = parseInt(damageDone) + parseInt(baseDamageDone);
			var newEnemyHP = parseInt(enemyHP) - parseInt(damageDone)
			$(".defender .characters").attr("health_points", newEnemyHP);
			$(".defender .characters .hp").text(newEnemyHP);
			var newHP = parseInt(hp) - parseInt(damageReceived);
			if ($(".defender").is(":empty")) {
				$(".result").html("<p>No enemy here. Fight all enemies to win the game.</p>");
			} else if (newEnemyHP <= 0) {
				$(".your_character .characters").attr("attack_power", newAttackPower);
				if ($(".enemies_available").is(":empty")) {
					gameOver = true;
					won = true;
					$(".defender .characters").appendTo(".graveyard");
					newDiv = $("<p></p>").text("You won!!! GAME OVER!!!");
					$(".result").html(newDiv);
					$(".reset").show();
				} else {
					$(".defender .characters").appendTo(".graveyard");
					newDiv = $("<p></p>").text("You have defeated " + enemyName + ". You can choose to fight another enemy.");
					$(".result").html(newDiv);
				}
			} else if (newHP <= 0) {
				gameOver = true;
				$(".your_character .characters").attr("attack_power", newAttackPower);
				$(".your_character .characters").attr("health_points", newHP);
				$(".your_character .characters .hp").text(newHP);
				newDiv = $("<p></p>").text("You have been defeated...GAME OVER!!!");
				$(".result").html(newDiv);
				$(".reset").show();
			} else {
				$(".your_character .characters").attr("attack_power", newAttackPower);
				$(".your_character .characters").attr("health_points", newHP);
				$(".your_character .characters .hp").text(newHP);
				newDiv1 = $("<p></p>").text("You attacked " + enemyName + " for " + damageDone + " damage.");
				newDiv2 = $("<p></p>").text(enemyName + " attacked you back for " + damageReceived + " damage.");
				$(".result").html(newDiv1);
				newDiv2.appendTo(".result");
			}
		} else {
			if (!won) {
				newDiv = $("<p></p>").text("You have been defeated already. Please reset the game.");
			} else {
				newDiv = $("<p></p>").text("You have won already. Please reset the game.");
			}
			$(".result").html(newDiv);
		}

	})

	$(".reset").on("click", function() {
		resetCharacters();
		resetPlacement();
	})

});





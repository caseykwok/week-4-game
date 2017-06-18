$(document).ready(function () {

	function resetCharacters() {
		$("#obi_wan").attr("name", "Obi-Wan");
		$("#obi_wan").attr("health_points", 120);
		var hp = $("#obi_wan").attr("health_points");
		$("#obi_wan .hp").text(hp);
		$("#obi_wan").attr("attack_power", 8);
		$("#obi_wan").attr("counter_attack_power", 8);

		$("#luke_skywalker").attr("name", "Luke Skywalker");
		$("#luke_skywalker").attr("health_points", 100);
		var hp = $("#luke_skywalker").attr("health_points");
		$("#luke_skywalker .hp").text(hp);
		$("#luke_skywalker").attr("attack_power", 5);
		$("#luke_skywalker").attr("counter_attack_power", 5);

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
		$(".your_character .characters").appendTo(".main_menu");
		$(".enemies_available .characters").appendTo(".main_menu");
		$(".defender .characters").appendTo(".main_menu");
		$(".characters").css("background-color", "#ffffff");
		$(".characters").css("color", "#000000");
		$(".result").empty();
		$(".reset").hide();
	}

	resetCharacters()
	var gameOver = false;

	$(".main_menu").on("click", ".characters" ,function() {
		// console.log($(this));
		var characterClicked = $(this).attr("id");
		var allCharacters = $(".main_menu .characters");
		// console.log(characterDiv);
		// $(this).appendTo(".your_character");
		// if $(".characters").attr() 
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
		// var characterClicked = $(this).attr("id");
		// console.log(characterClicked);
		// var allCharacters = $(".enemies_available .characters");
		if ($(".defender").is(":empty")) {
			$(this).appendTo(".defender");
			$(this).css("background-color", "#000000");
			$(this).css("color", "#ffffff");
		}
	})

	$(".attack").on("click", function() {
		// alert("You're attacking!");
		if (!gameOver) {
			var enemyName = $(".defender .characters").attr("name");
			var enemyHP = $(".defender .characters").attr("health_points");
			var baseDamageDone = $(".your_character .characters").attr("counter_attack_power")
			var hp = $(".your_character .characters").attr("health_points");
			var damageDone = $(".your_character .characters").attr("attack_power");
			var damageReceived = $(".defender .characters").attr("counter_attack_power");
			// console.log("Enemy Name: " + enemyName);
			// console.log("Enemy HP: " + enemyHP);
			// console.log("Base Damage Done: " + baseDamageDone);
			// console.log("Health Points: " + hp);
			// console.log("Damage Done: " + damageDone);
			// console.log("Damage Received: " + damageReceived);
			var newAttackPower = parseInt(damageDone) + parseInt(baseDamageDone);
			$(".your_character .characters").attr("attack_power", newAttackPower);
			var newEnemyHP = parseInt(enemyHP) - parseInt(damageDone)
			$(".defender .characters").attr("health_points", newEnemyHP);
			$(".defender .characters .hp").text(newEnemyHP);
			var newHP = parseInt(hp) - parseInt(damageReceived);
			// console.log("New Attack Power: " + newAttackPower);
			// console.log("New HP: " + newHP);
			// console.log("New Enemy HP: " + newEnemyHP);
			// after attacking one round and resetting, attack button still works but should return "no enemy here"
			if ($(".defender").is(":empty")) {
				$(".result").html("<p>No enemy here.</p>");
			} else if (newEnemyHP <= 0) {
				// console.log($(".enemies_available").is(":empty"));
				if ($(".enemies_available").is(":empty")) {
					// $(".result").html("<p>You won!!! GAME OVER!!!</p>");
					newDiv = $("<p></p>").text("You won!!! GAME OVER!!!");
					$(".result").html(newDiv);
					// check this, doesn't work
					// add reset button
					$(".reset").show();
				} else {
					$(".defender").empty();
					// $(".result").html("<p>You have defeated " + enemyName + ". You can choose to fight another enemy.</p>");
					newDiv = $("<p></p>").text("You have defeated " + enemyName + ". You can choose to fight another enemy.");
					$(".result").html(newDiv);
				}
			} else if (newHP <= 0) {
				gameOver = true;
				$(".your_character .characters").attr("health_points", newHP);
				$(".your_character .characters .hp").text(newHP);
				// $(".result").html("<p>You have been defeated...GAME OVER!!!</p>");
				newDiv = $("<p></p>").text("You have been defeated...GAME OVER!!!");
				$(".result").html(newDiv);
				$(".reset").show();
				// add reset button
			} else {
				$(".your_character .characters").attr("health_points", newHP);
				$(".your_character .characters .hp").text(newHP);
				// syntax may be for HTML, need to use jQuery
				newDiv1 = $("<p></p>").text("You attacked " + enemyName + " for " + damageDone + " damage.");
				newDiv2 = $("<p></p>").text(enemyName + " attacked you back for " + damageReceived + " damage.");
				$(".result").html(newDiv1);
				newDiv2.appendTo(".result");
				// $(".result").html("<p>You attacked " + enemyName + " for " + damageDone + " damage.</p><p>" + enemyName + " attacked you back for " + damageReceived + " damage.</p>");
			}
		} else {
			newDiv = $("<p></p>").text("You have been defeated already. Please restart the game.");
			$(".result").html(newDiv);
		}

	})

	$(".reset").on("click", function() {
		alert("you clicked reset");
		resetCharacters();
		resetPlacement();
	})

})





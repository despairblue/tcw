$(document).ready(function() {
	$('#einkaufen').click(function() {
		window.parent.$('#game-frame').attr('src','levels/level_1/index.html');
	})
	$('#entsorgung').click(function() {
		window.parent.$('#game-frame').attr('src','levels/level_2/index.html');
	})
})

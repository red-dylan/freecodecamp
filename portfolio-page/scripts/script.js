	$(".img-highres").off().on("load", function() {
		var highres = $(this).attr("src").toString();
		console.log(highres);
		$("#top-background").css("background-image", "url(../" + highres +")");
	});

debug = true;

special = {
	'andres': 'img/andres.jpg',
	'jack.kelly': ''
};

(function(){
	// Subdomain handling
	var url = debug ? "everyone.thinksyoure.sexy" : window.location.host;
	var urlParts = url.split(".");
	var subdomain = urlParts.slice(0, -2).join(".");
	
	// Update Noun field
	var name = subdomain.replace(".", " ");
	var noun = $("#noun");
	if(name != "everyone") noun.val(name);
	noun
		.focus()
		.keypress(function(e) {
			if(e.which == 13) {
				var newVal = noun.val().replace(/[^a-zA-Z ]/g, '').replace(" ", '.').toLowerCase();
				newVal = (newVal == "" && "everyone" != subdomain) ? "everyone" : newVal;
				if (newVal != "" && newVal != subdomain) {
					window.location.href = "http://" + newVal + ".thinksyoure.sexy";
				}
			}
		});


	// $("#background").css("backgroundImage", "url(img/andres.jpg)");
	
	console.log("subdomain: " + subdomain);
	if (subdomain in special) {
		$("#background").attr("src", special[subdomain]);
	}


})();
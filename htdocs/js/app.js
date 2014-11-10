debug = false;

special = {
	'everyone': 'http://cofeehgoestopeacecorps.files.wordpress.com/2013/08/1077872_10151575173891452_633936788_o.jpg',
	'andres': 'img/andres.jpg',
	'jack.kelly': 'img/jack.jpg'
};

google.load('search', '1');

google.setOnLoadCallback(function(){
	// Subdomain handling
	var url = debug ? "brad.pitt.thinksyoure.sexy" : window.location.host;
	var urlParts = url.split(".");
	var subdomain = urlParts.slice(0, -2).join(".");
	
	// Update Noun field
	var name = subdomain.replace(".", " ");
	document.title = name.toUpperCase() + " THINKS YOU'RE SEXY";
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



	if (subdomain in special) {
		$("#background").attr("src", special[subdomain]);
	}
	else {
		// Create an Image Search instance.
	    window.imageSearch = new google.search.ImageSearch();
	    imageSearch.setQueryAddition('sexy');
		imageSearch.setRestriction(
			google.search.Search.RESTRICT_SAFESEARCH,
			google.search.Search.SAFESEARCH_OFF
		);
		imageSearch.setRestriction(
			google.search.ImageSearch.RESTRICT_IMAGESIZE,
			google.search.ImageSearch.IMAGESIZE_LARGE
		);
		imageSearch.setRestriction(
			google.search.ImageSearch.RESTRICT_COLORFILTER,
			google.search.ImageSearch.COLOR_BLACK
		);
		imageSearch.setRestriction(
			google.search.ImageSearch.RESTRICT_IMAGETYPE,
			google.search.ImageSearch.IMAGETYPE_FACES
		);

	    imageSearch.setSearchCompleteCallback(this, searchComplete, null);

	    imageSearch.execute(name);
	    
	    google.search.Search.getBranding('body');
	}
});


function searchComplete() {
        // Check that we got results
        var results = imageSearch.results;
        if (imageSearch.results && imageSearch.results.length > 0) {
        	$("#background").attr("src", results[1].url);
        	console.log(results[1]);
        }
        else {
        	$("#background").attr("src", 'img/andres.jpg';
        }
      }
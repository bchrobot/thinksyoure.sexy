debug = false;

special = {
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

	    // Set searchComplete as the callback function when a search is 
	    // complete.  The imageSearch object will have results in it.
	    imageSearch.setSearchCompleteCallback(this, searchComplete, null);

	    // Find me a beautiful car.
	    imageSearch.execute(name);
	    
	    // Include the required Google branding
	    google.search.Search.getBranding('branding');
	}
});


function searchComplete() {
        // Check that we got results
        var results = imageSearch.results;
        if (imageSearch.results && imageSearch.results.length > 0) {
        	$("#background").attr("src", results[1].url);
        	console.log(results[1]);
        }
      }
debug = false;

(function(){
  var url = debug ? "zeta.psi.thinksyoure.sexy" : window.location.host;
  var urlParts = url.split(".");
  var subdomain = urlParts.slice(0, -2);
  var name = subdomain.join(" ");
  dalert(name);
})();

function dalert(string) {
	if (debug) alert(string);
}
var Finance = {
	App : {},
	Utils : {}
}

Finance.App = {
	settings: {},
	Utils: Finance.App.Util,

	init : ()=> {
		switch (window.location.pathname.replace('/', '').split('/')[0]) {
			case '': 
				console.log('Ok');
				break;
		}
	}
}

document.addEventListener("DOMContentLoaded", event => {
	Finance.App.init();
	var _json;

	fetch('/api/login', {
	    method: 'get'
	}).then(function(response) {
		return response.json();
	}).then(function(google) {
	  _json = google;
	});
	console.log(_json);
});
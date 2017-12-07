var Finance = {
	App : {},
	Utils : {}
}

Finance.App = {
	settings: {},
	Utils: Finance.App.Util,

	init : () => {
		switch (window.location.pathname.replace('/', '').split('/')[0]) {
			case '':
				console.log('Ok');
				break;
		}
	},
	binds : () => {

	}
}

Finance.Utils = {
	request : config => {
		let options = {
			method : config.method || 'GET',
			url : config.url,
			contentType : config.contentType || 'application/json',
			data : config.data || undefined,
			callback : config.callback || undefined,
		};
		let ajax = new XMLHttpRequest();
		let ajaxResponse;

		ajax.open(options.method, options.url);
		ajax.setRequestHeader('Content-Type', options.contentType);
		ajax.onload = () => {
		    if (ajax.status === 200) {
		        ajaxResponse = JSON.parse(ajax);
				  options.callback(ajaxResponse)
		    }
		}
		if(options.data)
			ajax.send(JSON.stringify(options.data));
	}
}
document.addEventListener("DOMContentLoaded", event => {
	Finance.App.init();
});

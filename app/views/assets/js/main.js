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
			success : config.success || undefined,
			error : () => {
				console.log(url + ' error with request');
			}
		};
		let ajax = new XMLHttpRequest();
		let ajaxResponse;

		ajax.open(options.method, options.url);
		ajax.setRequestHeader('Content-Type', options.contentType);
		ajax.onload = () => {
		    if (ajax.status === 200) {
		        ajaxResponse = JSON.parse(ajax.responseText);
				  options.success(ajaxResponse)
		    }
		}
		if(options.data)
			ajax.send(JSON.stringify(options.data));
	}
}
document.addEventListener("DOMContentLoaded", event => {
	let data = {
		method : 'POST',
		url : 'api/login/',
		data : { login: 'willians.echart@gmail.com', password: '123' },
		success : data => {
			console.log(data);
		}
	}
	Finance.App.init();
	Finance.Utils.request(data);
	// console.log('GRÊMIO CAMPEÃO MUNDIAL 2017');
	// console.log(response);
});

// let z = data => {
// 	console.log('GRÊMIO CAMPEÃO DA LIBERTADORES 2017');
// 	console.log(data);
// }

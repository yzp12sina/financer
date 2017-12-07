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
				console.log('init');
				break;
		}
	},
	binds : () => {

	}
}

document.addEventListener("DOMContentLoaded", event => {
	Finance.App.init();
});


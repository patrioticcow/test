.run(function ($ionicPlatform, Service) {
		$ionicPlatform.ready(function () {
			if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
				cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
				cordova.plugins.Keyboard.disableScroll(true);
			}

			var pushNotification = cordova.require("com.pushwoosh.plugins.pushwoosh.PushNotification");

			var isIOS = ionic.Platform.isIOS();

			if (isIOS) {
				pushNotification.onDeviceReady({pw_appid: Service.pwAppId});
				pushNotification.registerDevice(function (status) {
						console.warn(status);
						window.localStorage['pushToken'] = status['deviceToken'];
					}, function (status) {
						console.error(status);
					}
				);

				pushNotification.setApplicationIconBadgeNumber(0);
			} else {
				pushNotification.onDeviceReady({projectid: Service.projectId, pw_appid: Service.pwAppId});

				pushNotification.registerDevice(function (status) {
						console.warn(status);
						window.localStorage['pushToken'] = status;
					}, function (status) {
						console.error(status);
					}
				);
			}
		});
	})

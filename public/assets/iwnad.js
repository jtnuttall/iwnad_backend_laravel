'use strict';



;define('iwnad/app', ['exports', 'iwnad/resolver', 'ember-load-initializers', 'iwnad/config/environment'], function (exports, _resolver, _emberLoadInitializers, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  const App = Ember.Application.extend({
    modulePrefix: _environment.default.modulePrefix,
    podModulePrefix: _environment.default.podModulePrefix,
    Resolver: _resolver.default
  });

  (0, _emberLoadInitializers.default)(App, _environment.default.modulePrefix);

  exports.default = App;
});
;define('iwnad/authenticators/oauth2', ['exports', 'ember-simple-auth/authenticators/oauth2-password-grant'], function (exports, _oauth2PasswordGrant) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _oauth2PasswordGrant.default.extend({
    serverTokenEndpoint: 'api/login'
  });
});
;define('iwnad/authenticators/torii', ['exports', 'ember-simple-auth/authenticators/torii'], function (exports, _torii) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});


	const {
		inject: { service }
	} = Ember;

	exports.default = _torii.default.extend({
		torii: service('torii'),
		authenticate(provider, options) {
			//https://www.youtube.com/watch?v=YONCNJuLBP8
			//use jsbin to try it in JS first
			return this.get('torii').open(provider, options).then(authResponse => {
				console.log(authResponse);
			});
		}
	});
});
;define('iwnad/components/basic-dropdown', ['exports', 'ember-basic-dropdown/components/basic-dropdown'], function (exports, _basicDropdown) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _basicDropdown.default;
    }
  });
});
;define('iwnad/components/basic-dropdown/content-element', ['exports', 'ember-basic-dropdown/components/basic-dropdown/content-element'], function (exports, _contentElement) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _contentElement.default;
    }
  });
});
;define('iwnad/components/basic-dropdown/content', ['exports', 'ember-basic-dropdown/components/basic-dropdown/content'], function (exports, _content) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _content.default;
    }
  });
});
;define('iwnad/components/basic-dropdown/trigger', ['exports', 'ember-basic-dropdown/components/basic-dropdown/trigger'], function (exports, _trigger) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _trigger.default;
    }
  });
});
;define('iwnad/components/bs-datetimepicker', ['exports', 'ember-cli-bootstrap-datetimepicker/components/bs-datetimepicker', 'iwnad/config/environment'], function (exports, _bsDatetimepicker, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _bsDatetimepicker.default.extend({
    config: _environment.default['ember-cli-bootstrap-datetimepicker']
  });
});
;define('iwnad/components/content-editable', ['exports', 'ember-content-editable/components/content-editable'], function (exports, _contentEditable) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _contentEditable.default;
    }
  });
});
;define('iwnad/components/dashboard-module', ['exports'], function (exports) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = Ember.Component.extend({
		currentFiles: null,
		isShowingModal: false,
		invalidLink: false,
		emptyLink: false,
		emptyFeedback: false,
		init: function () {
			this._super(...arguments);
			if (localStorage.currentDashboard !== undefined) {
				if (JSON.parse(localStorage.currentDashboard)[0].currentphaseid <= JSON.parse(localStorage.currentDashboard)[0].modules.length) {
					this.set('currentFiles', JSON.parse(localStorage.currentDashboard)[0].modules[JSON.parse(localStorage.currentDashboard)[0].currentphaseid - 1].doclinks);
				}
			}
		},
		actions: {
			linkFileDelete(doclinkid) {

				$.ajax({
					type: "post",
					url: "/api/deletelink",
					data: JSON.stringify({ doclinkid: doclinkid }),
					contentType: "application/json"
				}).then(result => {
					for (var i = this.currentFiles.length - 1; i >= 0; i--) {
						if (this.currentFiles[i].doclinkid == doclinkid) {
							this.currentFiles.removeObject(this.currentFiles[i]);
							return;
						}
					}
				}, error => {
					//error case
					console.log("delete link error: ");
					console.log(error);
				});
			},
			toggleModal: function () {
				this.toggleProperty('isShowingModal');
			},
			toggleModalRequest: function (message) {
				if (message == undefined) {
					this.set('emptyFeedback', true);
					return;
				}
				this.toggleProperty('isShowingModal');
				// $.ajax({
				//     type: "post",
				//     url: "api/sendFeedback",
				//     data: JSON.stringify(message),
				//     contentType: "application/json",
				//   	}).then(() => {
				//   	  this.toggleProperty('isShowingModal');
				//     },
				//     (error) => {
				//       //error case
				//       console.log("feedback request error: ");
				//       console.log(error);
				//     }
				//   );
			},
			toggleModalApprove: function () {

				$.ajax({
					type: "post",
					url: "/api/approve",
					contentType: "application/json"
				}).then(result => {
					console.log("approved: ");
					console.log(result);
					this.toggleProperty('isShowingModal');
					window.location.reload(true);
				}, error => {
					//error case
					console.log("approve error: ");
					console.log(error);
				});
			},
			authenticateSession() {
				this.get('session').authenticate('authenticator:torii', 'google-oauth2');
			},
			//for linking files
			onApiLoad() {
				gapi.load('auth', { 'callback': window.onAuthApiLoad });
				gapi.load('picker', { 'callback': window.onPickerApiLoad });
			}

		}
	});
});
;define('iwnad/components/date-picker-inline', ['exports', 'ember-date-components/components/date-picker-inline'], function (exports, _datePickerInline) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _datePickerInline.default;
    }
  });
});
;define('iwnad/components/date-picker-month-year-select', ['exports', 'ember-date-components/components/date-picker-month-year-select'], function (exports, _datePickerMonthYearSelect) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _datePickerMonthYearSelect.default;
    }
  });
});
;define('iwnad/components/date-picker-month', ['exports', 'ember-date-components/components/date-picker-month'], function (exports, _datePickerMonth) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _datePickerMonth.default;
    }
  });
});
;define('iwnad/components/date-picker-navigation', ['exports', 'ember-date-components/components/date-picker-navigation'], function (exports, _datePickerNavigation) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _datePickerNavigation.default;
    }
  });
});
;define('iwnad/components/date-picker', ['exports', 'ember-date-components/components/date-picker'], function (exports, _datePicker) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _datePicker.default;
    }
  });
});
;define('iwnad/components/date-time-picker', ['exports', 'ember-date-components/components/date-time-picker'], function (exports, _dateTimePicker) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _dateTimePicker.default;
    }
  });
});
;define('iwnad/components/ember-modal-dialog-positioned-container', ['exports', 'ember-modal-dialog/components/positioned-container'], function (exports, _positionedContainer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _positionedContainer.default;
    }
  });
});
;define('iwnad/components/ember-modal-dialog/-basic-dialog', ['exports', 'ember-modal-dialog/components/basic-dialog'], function (exports, _basicDialog) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _basicDialog.default;
    }
  });
});
;define('iwnad/components/ember-modal-dialog/-in-place-dialog', ['exports', 'ember-modal-dialog/components/in-place-dialog'], function (exports, _inPlaceDialog) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _inPlaceDialog.default;
    }
  });
});
;define('iwnad/components/ember-modal-dialog/-liquid-dialog', ['exports', 'ember-modal-dialog/components/liquid-dialog'], function (exports, _liquidDialog) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _liquidDialog.default;
    }
  });
});
;define('iwnad/components/ember-modal-dialog/-liquid-tether-dialog', ['exports', 'ember-modal-dialog/components/liquid-tether-dialog'], function (exports, _liquidTetherDialog) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _liquidTetherDialog.default;
    }
  });
});
;define('iwnad/components/ember-modal-dialog/-tether-dialog', ['exports', 'ember-modal-dialog/components/tether-dialog'], function (exports, _tetherDialog) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _tetherDialog.default;
    }
  });
});
;define('iwnad/components/ember-wormhole', ['exports', 'ember-wormhole/components/ember-wormhole'], function (exports, _emberWormhole) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _emberWormhole.default;
    }
  });
});
;define('iwnad/components/modal-dialog', ['exports', 'ember-modal-dialog/components/modal-dialog'], function (exports, _modalDialog) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _modalDialog.default;
    }
  });
});
;define('iwnad/components/pikaday-input', ['exports', 'ember-pikaday/components/pikaday-input'], function (exports, _pikadayInput) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _pikadayInput.default;
});
;define('iwnad/components/pikaday-inputless', ['exports', 'ember-pikaday/components/pikaday-inputless'], function (exports, _pikadayInputless) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _pikadayInputless.default;
    }
  });
});
;define('iwnad/components/time-picker-input', ['exports', 'ember-date-components/components/time-picker-input'], function (exports, _timePickerInput) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _timePickerInput.default;
    }
  });
});
;define('iwnad/components/time-picker', ['exports', 'ember-date-components/components/time-picker'], function (exports, _timePicker) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _timePicker.default;
    }
  });
});
;define('iwnad/components/torii-iframe-placeholder', ['exports', 'torii/components/torii-iframe-placeholder'], function (exports, _toriiIframePlaceholder) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _toriiIframePlaceholder.default;
});
;define('iwnad/components/welcome-page', ['exports', 'ember-welcome-page/components/welcome-page'], function (exports, _welcomePage) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _welcomePage.default;
    }
  });
});
;define('iwnad/controllers/about', ['exports'], function (exports) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = Ember.Controller.extend({
		message: '',
		actions: {
			subscribe() {
				$.ajax({
					url: 'api/subscribe',
					type: 'post',
					data: JSON.stringify({ email: this.email }),
					contentType: 'application/json'
				}).then(result => {
					this.set('message', 'Thanks for subscribing!');
				}, error => {
					console.log("subscriber error: ");
					console.log(error);
					this.set('message', 'Please enter a valid email!');
				});
			}
		}
	});
});
;define('iwnad/controllers/admin', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({
    users: null,
    pairs: null,
    unpaired: null,

    init: function () {
      console.log("call the ajax");
      $.ajaxSetup({
        headers: {
          'Authorization': 'Bearer ' + localStorage.token
        }
      });

      //when it loads call to get all users
      $.ajax({
        url: 'api/allusers',
        type: 'post',
        dataType: 'json'

      }).then(result => {
        localStorage.users = JSON.stringify(result);

        if (localStorage.users !== undefined) {
          console.log("filling users");
          this.set('users', JSON.parse(localStorage.users));
          //console.log('users');
        }
      }, () => {
        console.log("entered error");
      });

      //when it loads call to get all subscribers
      $.ajax({
        url: 'api/subscribers',
        type: 'post',
        dataType: 'json',
        data: JSON.stringify({
          all: 1
        }),
        contentType: "application/json"

      }).then(result => {
        localStorage.subscribers = JSON.stringify(result);

        if (localStorage.subscribers !== undefined) {
          this.set('subscribers', JSON.parse(localStorage.subscribers));
          //console.log('users');
        }
      }, () => {
        console.log("entered error");
      });

      //when it loads call to get all pairs
      $.ajax({
        url: 'api/allpairs',
        type: 'post',
        dataType: 'json'

      }).then(result => {
        localStorage.pairs = JSON.stringify(result);
        if (localStorage.pairs !== undefined) {
          console.log("filling pairs");
          this.set('pairs', JSON.parse(localStorage.pairs));
          //console.log('users');
        }
      }, () => {
        console.log("entered error");
      });

      //when it loads call to get all unpaired mentors and mentees
      $.ajax({
        url: 'api/unpaired',
        type: 'post',
        dataType: 'json'

      }).then(result => {
        localStorage.unpaired = JSON.stringify(result);

        if (localStorage.pairs !== undefined) {
          console.log("filling unpaired");
          this.set('unpaired', JSON.parse(localStorage.unpaired));
          //console.log('users');
        }
      }, () => {
        console.log("entered error");
      });
    },

    refresh: function () {
      //when it loads call to get all users
      $.ajax({
        url: 'api/allusers',
        type: 'post',
        dataType: 'json'

      }).then(result => {
        localStorage.users = JSON.stringify(result);

        if (localStorage.users !== undefined) {
          console.log("filling users");
          this.set('users', JSON.parse(localStorage.users));
          //console.log('users');
        }
      }, () => {
        console.log("entered error");
      });

      //when it loads call to get all pairs
      $.ajax({
        url: 'api/allpairs',
        type: 'post',
        dataType: 'json'

      }).then(result => {
        localStorage.pairs = JSON.stringify(result);

        if (localStorage.pairs !== undefined) {
          console.log("filling pairs");
          this.set('pairs', JSON.parse(localStorage.pairs));
          //console.log('users');
        }
      }, () => {
        console.log("entered error");
      });

      //when it loads call to get all unpaired mentors and mentees
      $.ajax({
        url: 'api/unpaired',
        type: 'post',
        dataType: 'json'

      }).then(result => {
        localStorage.unpaired = JSON.stringify(result);

        if (localStorage.pairs !== undefined) {
          console.log("filling unpaired");
          this.set('unpaired', JSON.parse(localStorage.unpaired));
          //console.log('users');
        }
      }, () => {
        console.log("entered error");
      });
    },

    actions: {

      //connect to backend

      addUser() {
        if (this.userType == undefined || this.email == "" || this.username == "") {
          $("#addresults").html("Not all fields are filled. Please fill out everything.");
          return;
        }
        $.ajax({
          type: "post",
          url: "api/register",
          // url: "api/login",
          data: JSON.stringify({
            email: this.email,
            name: this.username,
            permissions: this.userType,
            password: this.password
          }),
          contentType: "application/json"
          //success: function() {location.reload();}
        }).then(() => {
          $("#addresults").html("Successfuly added user!");
          document.getElementById('username').value = '';
          document.getElementById('email').value = '';
          document.getElementById('password').value = '';
          this.refresh();
          //add user to data of all users
        }, () => {
          $("#addresults").html("failed to add user");
          // this.transitionToRoute("login");
          //error case
        });
      },

      deleteUser() {
        if (this.userEmail == undefined) {
          $("#removeresults").html("No user selected to delete! Please select a user.");
          return;
        }
        $.ajax({
          type: "post",
          url: "api/deleteuser",
          // url: "api/login",
          data: JSON.stringify({
            email: this.userEmail
          }),
          contentType: "application/json"
          //success: function() {location.reload();}
        }).then(() => {
          $("#removeresults").html("Successfuly deleted user!");
          this.refresh();
          //delete user from data
        }, () => {
          $("#removeresults").html("failed to delete user");
          // this.transitionToRoute("login");
          //error case
        });
      },

      deletePair(group) {
        console.log("PairingID" + group.pairingid);

        $.ajax({
          type: "post",
          url: "api/deletepair",
          // url: "api/login",
          data: JSON.stringify({
            pairid: group.pairingid
          }),
          contentType: "application/json"
          //success: function() {location.reload();}
        }).then(() => {
          $("#removePairResults").html("Successfuly deleted Pair!");
          this.refresh();
          //delete user from data
        }, () => {
          $("#removePairResults").html("failed to delete Pair");
          // this.transitionToRoute("login");
          //error case
        });
      },

      addPair() {

        //calling to add a pair
        if (this.menteeEmail == undefined || this.mentorEmail == undefined) {
          $("#addPairResults").html("Pick a valid mentor and mentee pair");
          return;
        }
        $.ajax({
          type: "post",
          url: "api/pair",
          // url: "api/login",
          data: JSON.stringify({
            mentee: this.menteeEmail,
            mentor: this.mentorEmail

          }),
          contentType: "application/json"
          //success: function() {location.reload();}
        }).then(() => {
          $("#addPairResults").html("Successfuly added pair!");
          //add user to data of all users
          this.refresh();
        }, () => {
          $("#addPairResults").html("failed to add pair");
          // this.transitionToRoute("login");
          //error case
        });
      },

      updateTypeValue(value) {
        this.set('userType', value);
      },
      updateUserEmailValue(value) {
        this.set('userEmail', value);
      },
      updateMenteeValue(value) {
        this.set('menteeEmail', value);
      },
      updateMentorValue(value) {
        this.set('mentorEmail', value);
      }

    }

  });
});
;define('iwnad/controllers/application', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({
    loggedIn: localStorage.currentUser !== undefined,
    isAdmin: false,

    applicationController: Ember.inject.controller('application'),

    init: function () {
      if (localStorage.currentUser !== undefined) {
        if (JSON.parse(localStorage.currentUser).permissions === 0) {
          this.set('isAdmin', true);
          console.log("admin is true");
        } else {
          this.set('isAdmin', false);
        }
      } else {
        this.set('isAdmin', false);
      }
    },

    actions: {
      logout() {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('currentDashboard');
        localStorage.removeItem('currentMatch');
        localStorage.clear();
        this.get('applicationController').set('loggedIn', false);
        this.transitionToRoute('main');
      }
    }
  });
});
;define('iwnad/controllers/dashboard-module', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({});
});
;define('iwnad/controllers/dashboard-page', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({
    currentDashboard: null,
    currentMatch: null,
    currentUser: null,
    programEnded: false,
    programEndedMessage: '',
    init: function () {
      $.ajaxSetup({
        headers: {
          'Authorization': 'Bearer ' + localStorage.token
        }
      });

      $.ajax({
        url: 'api/currentpairs',
        type: 'post',
        contentType: 'application/json'
      }).then(result => {
        localStorage.currentMatch = JSON.stringify(result.pairings[0].match);
        this.set('currentMatch', JSON.parse(localStorage.currentMatch));
      }, error => {});

      $.ajax({
        url: 'api/dashboard',
        type: 'post',
        contentType: 'application/json'
      }).then(result => {
        localStorage.currentDashboard = JSON.stringify(result.dashboards);
        this.set('currentDashboard', JSON.parse(localStorage.currentDashboard)[0]);
        console.log("here 1");
        console.log(JSON.parse(localStorage.currentDashboard)[0].modules.length);
        console.log(JSON.parse(localStorage.currentDashboard)[0].currentphaseid);
        if (JSON.parse(localStorage.currentDashboard)[0].modules.length < JSON.parse(localStorage.currentDashboard)[0].currentphaseid) {
          console.log("here 2");
          this.set('programEnded', true);
          this.set('programEndedMessage', '🎉 Congratulations! You have completed all the modules. 🎉');
          return;
        }
      }, error => {
        console.log("dashboard error: ");
        console.log(error);
      });

      if (localStorage.currentUser !== undefined) {
        this.set('currentUser', JSON.parse(localStorage.currentUser));
      }

      if (localStorage.currentDashboard !== undefined) {
        this.set('currentDashboard', JSON.parse(localStorage.currentDashboard)[0]);
      }

      if (localStorage.currentMatch !== undefined) {
        this.set('currentMatch', JSON.parse(localStorage.currentMatch));
      }
    },
    actions: {
      onLoad() {}
    }

  });
});
;define('iwnad/controllers/google-drive-api', ['exports'], function (exports) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});


	const {
		inject: { service }
	} = Ember;

	exports.default = Ember.Controller.extend({
		session: Ember.inject.service('session'),
		actions: {
			authenticateSession() {
				this.get('session').authenticate('authenticator:torii', 'google-oauth2');
			}
		}
	});
});
;define('iwnad/controllers/login', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({

    failedLogin: false,
    emptyForm: false,
    applicationController: Ember.inject.controller('application'),

    actions: {

      login() {

        if (this.email == undefined || this.password == undefined || this.email == '' | this.password == '') {
          this.set('emptyForm', true);
          return;
        } else {
          this.set('emptyForm', false);
        }

        let controller = this;

        $.ajax({
          url: 'api/login',
          type: 'post',
          contentType: 'application/json',
          data: JSON.stringify({
            email: this.email,
            password: this.password
          })
        }).then(result => {
          console.log("login result is " + result);
          $.ajaxSetup({
            headers: {
              'Authorization': 'Bearer ' + result.access_token
            },
            error: function (jqXHR, textStatus, errorThrown) {
              if (jqXHR.status == 401) {
                localStorage.removeItem('currentUser');
                controller.transitionToRoute('login');
                controller.get('applicationController').set('loggedIn', false);
              }
            }
          });
          localStorage.token = result.access_token;

          if (result.user.firstlogin) {
            localStorage.currentUserName = JSON.stringify(result.user.name);
            this.transitionToRoute('signup');
          } else {
            this.get('applicationController').set('loggedIn', true);
            localStorage.currentUser = JSON.stringify(result.user);
            if (JSON.parse(localStorage.currentUser).permissions === 0) {
              controller.get('applicationController').set('isAdmin', true);
              this.transitionToRoute('admin');
            } else {
              controller.get('applicationController').set('isAdmin', false);
              this.transitionToRoute('dashboard-page');
            }
          }
        }, error => {
          console.log("login errr: ");
          console.log(error);
          this.set('failedLogin', true);
        });
      }
    }
  });
});
;define('iwnad/controllers/main', ['exports'], function (exports) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = Ember.Controller.extend({
		message: '',
		actions: {
			subscribe() {
				$.ajax({
					url: 'api/subscribe',
					type: 'post',
					data: JSON.stringify({ email: this.email }),
					contentType: 'application/json'
				}).then(result => {
					this.set('message', 'Thanks for subscribing!');
				}, error => {
					console.log("subscriber error: ");
					console.log(error);
					this.set('message', 'Please enter a valid email!');
				});
			}
		}
	});
});
;define('iwnad/controllers/module-resources', ['exports'], function (exports) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = Ember.Controller.extend({
		list: ['resource one', 'resource two', 'resource three']
	});
});
;define('iwnad/controllers/my-match', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({
    currentMatch: null,
    socialMedia: false,
    init: function () {
      $.ajaxSetup({
        headers: {
          'Authorization': 'Bearer ' + localStorage.token
        }
      });

      $.ajax({
        url: 'api/currentpairs',
        type: 'post',
        contentType: 'application/json'
      }).then(result => {
        localStorage.currentMatch = JSON.stringify(result.pairings[0].match);
        this.set('currentMatch', JSON.parse(localStorage.currentMatch));
        if (JSON.parse(localStorage.currentMatch).twitter != null || JSON.parse(localStorage.currentMatch).facebook != null || JSON.parse(localStorage.currentMatch).linkedin != null || JSON.parse(localStorage.currentMatch).instagram != null) {
          this.set('socialMedia', true);
        }
      }, error => {});

      if (localStorage.currentMatch !== undefined) {
        this.set('currentMatch', JSON.parse(localStorage.currentMatch));
        if (JSON.parse(localStorage.currentMatch).twitter != null || JSON.parse(localStorage.currentMatch).facebook != null || JSON.parse(localStorage.currentMatch).linkedin != null || JSON.parse(localStorage.currentMatch).instagram != null) {
          this.set('socialMedia', true);
        }
      }
    },
    actions: {
      onLoad() {}
    }
  });
});
;define('iwnad/controllers/my-profile', ['exports'], function (exports) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = Ember.Controller.extend({
		currentUser: null,
		phoneVal: null,
		emailVal: null,
		organizationVal: null,
		occupationVal: null,
		bioVal: null,
		availabilityVal: null,
		skillsVal: null,
		interestsVal: null,
		linkedinVal: null,
		twitterVal: null,
		instagramVal: null,
		facebookVal: null,
		init: function () {
			if (localStorage.currentUser !== undefined) {
				this.set('currentUser', JSON.parse(localStorage.currentUser));
				this.set('phoneVal', JSON.parse(localStorage.currentUser).phone);
				this.set('emailVal', JSON.parse(localStorage.currentUser).email);
				this.set('organizationVal', JSON.parse(localStorage.currentUser).organization);
				this.set('occupationVal', JSON.parse(localStorage.currentUser).occupation);
				this.set('bioVal', JSON.parse(localStorage.currentUser).bio);
				this.set('availabilityVal', JSON.parse(localStorage.currentUser).availability);
				this.set('skillsVal', JSON.parse(localStorage.currentUser).skills);
				this.set('interestsVal', JSON.parse(localStorage.currentUser).interests);
				this.set('linkedinVal', JSON.parse(localStorage.currentUser).linkedin);
				this.set('twitterVal', JSON.parse(localStorage.currentUser).twitter);
				this.set('instagramVal', JSON.parse(localStorage.currentUser).instagram);
				this.set('facebookVal', JSON.parse(localStorage.currentUser).facebook);
			}
		},
		showUpdateModal: false,
		actions: {
			updateInfo() {
				if (localStorage.currentUser !== undefined) {
					this.set('currentUser', JSON.parse(localStorage.currentUser));
				}

				var profiledata = {};
				if (this.emailVal != JSON.parse(localStorage.currentUser).email) {
					profiledata.email = this.emailVal;
				}

				if (this.phoneVal != JSON.parse(localStorage.currentUser).phone) {
					profiledata.phone = this.phoneVal;
				}

				if (this.organizationVal != JSON.parse(localStorage.currentUser).organization) {
					profiledata.organization = this.organizationVal;
				}

				if (this.occupationVal != JSON.parse(localStorage.currentUser).occupation) {
					profiledata.occupation = this.occupationVal;
				}

				if (this.bioVal != null && this.bioVal != JSON.parse(localStorage.currentUser).bio) {
					profiledata.bio = this.bioVal;
				}

				if (this.availabilityVal != null && this.availabilityVal != JSON.parse(localStorage.currentUser).availability) {
					profiledata.availability = this.availabilityVal;
				}

				console.log("form data: " + this.skillsVal);

				if (this.skillsVal != null && this.skillsVal != JSON.parse(localStorage.currentUser).skills) {
					profiledata.skills = this.skillsVal;
					console.log("backend: " + profiledata.skills);
				}

				if (this.interestsVal != null && this.interestsVal != JSON.parse(localStorage.currentUser).interests) {
					profiledata.interests = this.interestsVal;
				}

				if (this.linkedinVal != null && this.linkedinVal != JSON.parse(localStorage.currentUser).linkedin) {
					profiledata.linkedin = this.linkedinVal;
				}

				if (this.twitterVal != null && this.twitterVal != JSON.parse(localStorage.currentUser).twitter) {
					profiledata.twitter = this.twitterVal;
				}

				if (this.instagramVal != null && this.instagramVal != JSON.parse(localStorage.currentUser).instagram) {
					profiledata.instagram = this.instagramVal;
				}

				if (this.facebookVal != null && this.facebookVal != JSON.parse(localStorage.currentUser).facebook) {
					profiledata.facebook = this.facebookVal;
				}

				console.log(JSON.stringify(profiledata));
				$.ajax({
					type: "post",
					url: "api/updateuser",
					data: JSON.stringify(profiledata),
					contentType: "application/json"
				}).then(result => {
					console.log("success: ");
					console.log(result);
					localStorage.currentUser = JSON.stringify(result.user);
					this.set('currentUser', JSON.parse(localStorage.currentUser));
					this.toggleProperty('showUpdateModal');
				}, error => {
					//error case
					console.log("update user error: ");
					console.log(error);
				});
			},

			cancel() {
				this.toggleProperty('showUpdateModal');
			}
		}
	});
});
;define('iwnad/controllers/signup', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({
    currentUserName: null,
    errorMessage: '',
    currentUser: null,
    applicationController: Ember.inject.controller('application'),
    image: null,
    init: function () {
      if (localStorage.currentUserName !== undefined) {
        this.set('currentUserName', JSON.parse(localStorage.currentUserName));
      }

      if (localStorage.currentUser !== undefined) {
        this.set('currentUser', JSON.parse(localStorage.currentUser));
      }

      if (localStorage.token != undefined) {
        $.ajaxSetup({
          headers: {
            'Authorization': 'Bearer ' + localStorage.token
          },
          error: function (jqXHR, textStatus, errorThrown) {
            if (jqXHR.status == 401) {
              localStorage.removeItem('currentUser');
              controller.transitionToRoute('login');
              controller.get('applicationController').set('loggedIn', false);
            }
          }
        });
      }
    },

    actions: {
      upload(event) {
        const reader = new FileReader();
        const file = event.target.files[0];
        let imageData;
        console.log("upload is called");
        // Note: reading file is async
        reader.onload = () => {
          let imageData = reader.result;
          this.set('image', imageData);
          // console.log("imageData " + imageData);
          // console.log("the real image: " + this.image);
          // additional logics as you wish
        };

        if (file) {
          reader.readAsDataURL(file);
        }
      },
      signup() {
        if (this.role == undefined || this.organization == undefined || this.phone == undefined || this.password1 == undefined || this.password2 == undefined || this.role == '' || this.organization == '' || this.phone == '' || this.password1 == '' || this.password2 == '' || this.image == null) {
          this.set('errorMessage', '*All fields are required');
          return;
        }
        if (this.password1.length < 6) {
          this.set('errorMessage', '*Password must be at least 6 characters long');
          return;
        }
        if (this.password1 !== this.password2) {
          this.set('errorMessage', '*Passwords must match');
          return;
        }

        this.set('errorMessage', '');

        // console.log("sending backend: ");
        // console.log(JSON.stringify({
        //     occupation: this.role,
        //     organization: this.organization,
        //     phone: this.phone,
        //     password: this.password1,
        //     profilepic: this.image,
        //   }));
        //let data = new FormData();
        let data = JSON.stringify({
          occupation: this.role,
          organization: this.organization,
          phone: this.phone,
          password: this.password1,
          profilepic: this.image
        });
        // data.append('occupation', this.role);
        // data.append('organization', this.organization);
        // data.append('phone', this.phone);
        // data.append('password', this.password1);
        // data.append('profilepic', this.image);

        $.ajax({
          async: true,
          url: 'api/updateuser',
          type: 'post',
          // processData: false,
          // contentType: false,
          contentType: 'application/json',
          data: data
        }).then(result => {
          this.get('applicationController').set('loggedIn', true);
          console.log("signup result: ");
          console.log(result);
          this.get('applicationController').set('loggedIn', true);
          localStorage.currentUser = JSON.stringify(result.user);
          if (JSON.parse(localStorage.currentUser).permissions === 0) {
            this.get('applicationController').set('isAdmin', true);
            this.transitionToRoute('admin');
          } else {
            this.set('currentUser', JSON.parse(localStorage.currentUser));
            this.get('applicationController').set('isAdmin', false);
            this.transitionToRoute('dashboard-page');
          }
          localStorage.removeItem('currentUserName');
        }, error => {
          console.log("signup error is: ");
          console.log(error);
        });
      }
    }
  });
});
;define('iwnad/helpers/and', ['exports', 'ember-truth-helpers/helpers/and'], function (exports, _and) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _and.default;
    }
  });
  Object.defineProperty(exports, 'and', {
    enumerable: true,
    get: function () {
      return _and.and;
    }
  });
});
;define('iwnad/helpers/app-version', ['exports', 'iwnad/config/environment', 'ember-cli-app-version/utils/regexp'], function (exports, _environment, _regexp) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.appVersion = appVersion;
  function appVersion(_, hash = {}) {
    const version = _environment.default.APP.version;
    // e.g. 1.0.0-alpha.1+4jds75hf

    // Allow use of 'hideSha' and 'hideVersion' For backwards compatibility
    let versionOnly = hash.versionOnly || hash.hideSha;
    let shaOnly = hash.shaOnly || hash.hideVersion;

    let match = null;

    if (versionOnly) {
      if (hash.showExtended) {
        match = version.match(_regexp.versionExtendedRegExp); // 1.0.0-alpha.1
      }
      // Fallback to just version
      if (!match) {
        match = version.match(_regexp.versionRegExp); // 1.0.0
      }
    }

    if (shaOnly) {
      match = version.match(_regexp.shaRegExp); // 4jds75hf
    }

    return match ? match[0] : version;
  }

  exports.default = Ember.Helper.helper(appVersion);
});
;define('iwnad/helpers/date-picker-day-classes', ['exports', 'ember-date-components/helpers/date-picker-day-classes'], function (exports, _datePickerDayClasses) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _datePickerDayClasses.default;
    }
  });
  Object.defineProperty(exports, 'datePickerDayClasses', {
    enumerable: true,
    get: function () {
      return _datePickerDayClasses.datePickerDayClasses;
    }
  });
});
;define('iwnad/helpers/eq', ['exports', 'ember-truth-helpers/helpers/equal'], function (exports, _equal) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _equal.default;
    }
  });
  Object.defineProperty(exports, 'equal', {
    enumerable: true,
    get: function () {
      return _equal.equal;
    }
  });
});
;define("iwnad/helpers/get-dashboard-module-status", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.getDashboardModuleStatus = getDashboardModuleStatus;
  function getDashboardModuleStatus(status) {
    if (status == "IN PROGRESS") {
      return true;
    }

    return false;
  }

  exports.default = Ember.Helper.helper(getDashboardModuleStatus);
});
;define('iwnad/helpers/get-status-color', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.getStatusColor = getStatusColor;
  function getStatusColor(status) {
    if (status == "IN PROGRESS") {
      return '#FF583E';
    } else if (status == "COMPLETED") {
      return '#568DFF';
    } else {
      return '#808080';
    }
  }

  exports.default = Ember.Helper.helper(getStatusColor);
});
;define('iwnad/helpers/gt', ['exports', 'ember-truth-helpers/helpers/gt'], function (exports, _gt) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _gt.default;
    }
  });
  Object.defineProperty(exports, 'gt', {
    enumerable: true,
    get: function () {
      return _gt.gt;
    }
  });
});
;define('iwnad/helpers/gte', ['exports', 'ember-truth-helpers/helpers/gte'], function (exports, _gte) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _gte.default;
    }
  });
  Object.defineProperty(exports, 'gte', {
    enumerable: true,
    get: function () {
      return _gte.gte;
    }
  });
});
;define('iwnad/helpers/ignore-children', ['exports', 'ember-ignore-children-helper/helpers/ignore-children'], function (exports, _ignoreChildren) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _ignoreChildren.default;
    }
  });
  Object.defineProperty(exports, 'ignoreChildren', {
    enumerable: true,
    get: function () {
      return _ignoreChildren.ignoreChildren;
    }
  });
});
;define('iwnad/helpers/is-after', ['exports', 'ember-moment/helpers/is-after'], function (exports, _isAfter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _isAfter.default;
    }
  });
});
;define('iwnad/helpers/is-array', ['exports', 'ember-truth-helpers/helpers/is-array'], function (exports, _isArray) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _isArray.default;
    }
  });
  Object.defineProperty(exports, 'isArray', {
    enumerable: true,
    get: function () {
      return _isArray.isArray;
    }
  });
});
;define('iwnad/helpers/is-before', ['exports', 'ember-moment/helpers/is-before'], function (exports, _isBefore) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _isBefore.default;
    }
  });
});
;define('iwnad/helpers/is-between', ['exports', 'ember-moment/helpers/is-between'], function (exports, _isBetween) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _isBetween.default;
    }
  });
});
;define('iwnad/helpers/is-empty', ['exports', 'ember-truth-helpers/helpers/is-empty'], function (exports, _isEmpty) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _isEmpty.default;
    }
  });
});
;define('iwnad/helpers/is-equal-day', ['exports', 'ember-date-components/helpers/is-equal-day'], function (exports, _isEqualDay) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _isEqualDay.default;
    }
  });
  Object.defineProperty(exports, 'isEqualDay', {
    enumerable: true,
    get: function () {
      return _isEqualDay.isEqualDay;
    }
  });
});
;define('iwnad/helpers/is-equal-month', ['exports', 'ember-date-components/helpers/is-equal-month'], function (exports, _isEqualMonth) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _isEqualMonth.default;
    }
  });
  Object.defineProperty(exports, 'isEqualMonth', {
    enumerable: true,
    get: function () {
      return _isEqualMonth.isEqualMonth;
    }
  });
});
;define('iwnad/helpers/is-equal-time', ['exports', 'ember-date-components/helpers/is-equal-time'], function (exports, _isEqualTime) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _isEqualTime.default;
    }
  });
  Object.defineProperty(exports, 'isEqualTime', {
    enumerable: true,
    get: function () {
      return _isEqualTime.isEqualTime;
    }
  });
});
;define('iwnad/helpers/is-equal-year', ['exports', 'ember-date-components/helpers/is-equal-year'], function (exports, _isEqualYear) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _isEqualYear.default;
    }
  });
  Object.defineProperty(exports, 'isEqualYear', {
    enumerable: true,
    get: function () {
      return _isEqualYear.isEqualYear;
    }
  });
});
;define('iwnad/helpers/is-equal', ['exports', 'ember-truth-helpers/helpers/is-equal'], function (exports, _isEqual) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _isEqual.default;
    }
  });
  Object.defineProperty(exports, 'isEqual', {
    enumerable: true,
    get: function () {
      return _isEqual.isEqual;
    }
  });
});
;define('iwnad/helpers/is-same-or-after', ['exports', 'ember-moment/helpers/is-same-or-after'], function (exports, _isSameOrAfter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _isSameOrAfter.default;
    }
  });
});
;define('iwnad/helpers/is-same-or-before', ['exports', 'ember-moment/helpers/is-same-or-before'], function (exports, _isSameOrBefore) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _isSameOrBefore.default;
    }
  });
});
;define('iwnad/helpers/is-same', ['exports', 'ember-moment/helpers/is-same'], function (exports, _isSame) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _isSame.default;
    }
  });
});
;define('iwnad/helpers/lt', ['exports', 'ember-truth-helpers/helpers/lt'], function (exports, _lt) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _lt.default;
    }
  });
  Object.defineProperty(exports, 'lt', {
    enumerable: true,
    get: function () {
      return _lt.lt;
    }
  });
});
;define('iwnad/helpers/lte', ['exports', 'ember-truth-helpers/helpers/lte'], function (exports, _lte) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _lte.default;
    }
  });
  Object.defineProperty(exports, 'lte', {
    enumerable: true,
    get: function () {
      return _lte.lte;
    }
  });
});
;define('iwnad/helpers/moment-add', ['exports', 'ember-moment/helpers/moment-add'], function (exports, _momentAdd) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _momentAdd.default;
    }
  });
});
;define('iwnad/helpers/moment-calendar', ['exports', 'ember-moment/helpers/moment-calendar'], function (exports, _momentCalendar) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _momentCalendar.default;
    }
  });
});
;define('iwnad/helpers/moment-diff', ['exports', 'ember-moment/helpers/moment-diff'], function (exports, _momentDiff) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _momentDiff.default;
    }
  });
});
;define('iwnad/helpers/moment-duration', ['exports', 'ember-moment/helpers/moment-duration'], function (exports, _momentDuration) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _momentDuration.default;
    }
  });
});
;define('iwnad/helpers/moment-format', ['exports', 'ember-moment/helpers/moment-format'], function (exports, _momentFormat) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _momentFormat.default;
    }
  });
});
;define('iwnad/helpers/moment-from-now', ['exports', 'ember-moment/helpers/moment-from-now'], function (exports, _momentFromNow) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _momentFromNow.default;
    }
  });
});
;define('iwnad/helpers/moment-from', ['exports', 'ember-moment/helpers/moment-from'], function (exports, _momentFrom) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _momentFrom.default;
    }
  });
});
;define('iwnad/helpers/moment-subtract', ['exports', 'ember-moment/helpers/moment-subtract'], function (exports, _momentSubtract) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _momentSubtract.default;
    }
  });
});
;define('iwnad/helpers/moment-to-date', ['exports', 'ember-moment/helpers/moment-to-date'], function (exports, _momentToDate) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _momentToDate.default;
    }
  });
});
;define('iwnad/helpers/moment-to-now', ['exports', 'ember-moment/helpers/moment-to-now'], function (exports, _momentToNow) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _momentToNow.default;
    }
  });
});
;define('iwnad/helpers/moment-to', ['exports', 'ember-moment/helpers/moment-to'], function (exports, _momentTo) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _momentTo.default;
    }
  });
});
;define('iwnad/helpers/moment-unix', ['exports', 'ember-moment/helpers/unix'], function (exports, _unix) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _unix.default;
    }
  });
});
;define('iwnad/helpers/moment', ['exports', 'ember-moment/helpers/moment'], function (exports, _moment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _moment.default;
    }
  });
});
;define('iwnad/helpers/not-eq', ['exports', 'ember-truth-helpers/helpers/not-equal'], function (exports, _notEqual) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _notEqual.default;
    }
  });
  Object.defineProperty(exports, 'notEq', {
    enumerable: true,
    get: function () {
      return _notEqual.notEq;
    }
  });
});
;define('iwnad/helpers/not', ['exports', 'ember-truth-helpers/helpers/not'], function (exports, _not) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _not.default;
    }
  });
  Object.defineProperty(exports, 'not', {
    enumerable: true,
    get: function () {
      return _not.not;
    }
  });
});
;define('iwnad/helpers/now', ['exports', 'ember-moment/helpers/now'], function (exports, _now) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _now.default;
    }
  });
});
;define('iwnad/helpers/or', ['exports', 'ember-truth-helpers/helpers/or'], function (exports, _or) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _or.default;
    }
  });
  Object.defineProperty(exports, 'or', {
    enumerable: true,
    get: function () {
      return _or.or;
    }
  });
});
;define('iwnad/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _pluralize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _pluralize.default;
});
;define('iwnad/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _singularize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _singularize.default;
});
;define('iwnad/helpers/unix', ['exports', 'ember-moment/helpers/unix'], function (exports, _unix) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _unix.default;
    }
  });
});
;define('iwnad/helpers/utc', ['exports', 'ember-moment/helpers/utc'], function (exports, _utc) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _utc.default;
    }
  });
  Object.defineProperty(exports, 'utc', {
    enumerable: true,
    get: function () {
      return _utc.utc;
    }
  });
});
;define('iwnad/helpers/xor', ['exports', 'ember-truth-helpers/helpers/xor'], function (exports, _xor) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _xor.default;
    }
  });
  Object.defineProperty(exports, 'xor', {
    enumerable: true,
    get: function () {
      return _xor.xor;
    }
  });
});
;define('iwnad/initializers/add-modals-container', ['exports', 'ember-modal-dialog/initializers/add-modals-container'], function (exports, _addModalsContainer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'add-modals-container',
    initialize: _addModalsContainer.default
  };
});
;define('iwnad/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'iwnad/config/environment'], function (exports, _initializerFactory, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  let name, version;
  if (_environment.default.APP) {
    name = _environment.default.APP.name;
    version = _environment.default.APP.version;
  }

  exports.default = {
    name: 'App Version',
    initialize: (0, _initializerFactory.default)(name, version)
  };
});
;define('iwnad/initializers/container-debug-adapter', ['exports', 'ember-resolver/resolvers/classic/container-debug-adapter'], function (exports, _containerDebugAdapter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'container-debug-adapter',

    initialize() {
      let app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _containerDebugAdapter.default);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
;define('iwnad/initializers/ember-cli-mirage', ['exports', 'iwnad/config/environment', 'iwnad/mirage/config', 'ember-cli-mirage/get-rfc232-test-context', 'ember-cli-mirage/start-mirage'], function (exports, _environment, _config, _getRfc232TestContext, _startMirage) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.startMirage = startMirage;
  exports.default = {
    name: 'ember-cli-mirage',
    initialize(application) {
      if (_config.default) {
        application.register('mirage:base-config', _config.default, { instantiate: false });
      }
      if (_config.testConfig) {
        application.register('mirage:test-config', _config.testConfig, { instantiate: false });
      }

      _environment.default['ember-cli-mirage'] = _environment.default['ember-cli-mirage'] || {};
      if (_shouldUseMirage(_environment.default.environment, _environment.default['ember-cli-mirage'])) {
        startMirage(_environment.default);
      }
    }
  };
  function startMirage(env = _environment.default) {
    return (0, _startMirage.default)(null, { env, baseConfig: _config.default, testConfig: _config.testConfig });
  }

  function _shouldUseMirage(env, addonConfig) {
    if (typeof FastBoot !== 'undefined') {
      return false;
    }
    if ((0, _getRfc232TestContext.default)()) {
      return false;
    }
    let userDeclaredEnabled = typeof addonConfig.enabled !== 'undefined';
    let defaultEnabled = _defaultEnabled(env, addonConfig);

    return userDeclaredEnabled ? addonConfig.enabled : defaultEnabled;
  }

  /*
    Returns a boolean specifying the default behavior for whether
    to initialize Mirage.
  */
  function _defaultEnabled(env, addonConfig) {
    let usingInDev = env === 'development' && !addonConfig.usingProxy;
    let usingInTest = env === 'test';

    return usingInDev || usingInTest;
  }
});
;define('iwnad/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data'], function (exports, _setupContainer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'ember-data',
    initialize: _setupContainer.default
  };
});
;define('iwnad/initializers/export-application-global', ['exports', 'iwnad/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.initialize = initialize;
  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_environment.default.exportApplicationGlobal !== false) {
      var theGlobal;
      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _environment.default.exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = Ember.String.classify(_environment.default.modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;

        application.reopen({
          willDestroy: function () {
            this._super.apply(this, arguments);
            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  exports.default = {
    name: 'export-application-global',

    initialize: initialize
  };
});
;define('iwnad/initializers/google-drive-setup', ['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.initialize = initialize;
    function initialize() /* application */{
        // application.inject('route', 'foo', 'service:foo');
        // The Browser API key obtained from the Google Developers Console.
        window.developerKey = 'AIzaSyBHdCxBJOh0AbNpM8wcn-RWwkwjxUz5sBc';

        // The Client ID obtained from the Google Developers Console. Replace with your own Client ID.
        window.clientId = "968059611761-nqpp6sf3ed58envp2gfptupk8atg3rrv.apps.googleusercontent.com";

        // Scope to use to access user's photos.
        window.scope = ['https://www.googleapis.com/auth/drive.file'];

        var pickerApiLoaded = false;
        var oauthToken;

        window.onAuthApiLoad = function () {
            window.gapi.auth.authorize({
                'client_id': clientId,
                'scope': scope,
                'immediate': false
            }, handleAuthResult);
        };

        window.onPickerApiLoad = function () {
            pickerApiLoaded = true;
            createPicker();
        };

        window.handleAuthResult = function (authResult) {
            if (authResult && !authResult.error) {
                oauthToken = authResult.access_token;
                createPicker();
            }
        };

        // Create and render a Picker object for picking user Photos.
        window.createPicker = function () {
            if (pickerApiLoaded && oauthToken) {
                var picker = new google.picker.PickerBuilder().addViewGroup(new google.picker.ViewGroup(google.picker.ViewId.DOCS).addView(google.picker.ViewId.DOCUMENTS).addView(google.picker.ViewId.PRESENTATIONS)).setOAuthToken(oauthToken).setCallback(pickerCallback).build();
                picker.setVisible(true);
            }
        };

        // A simple callback implementation.
        window.pickerCallback = function (data) {
            var url = '';
            var name = '';
            if (data[google.picker.Response.ACTION] == google.picker.Action.PICKED) {
                var doc = data[google.picker.Response.DOCUMENTS][0];
                url = doc[google.picker.Document.URL];
                name = doc.name;

                var param = { 'fileId': doc.id, 'oAuthToken': oauthToken, 'name': name };
                console.log(param);
            }

            var message = 'You picked this file ' + name + ': ' + url;
            if (url != '') {
                $.ajax({
                    type: "post",
                    url: "api/addlink",
                    data: JSON.stringify({
                        name: name,
                        link: url
                    }),
                    contentType: "application/json"
                }).then(result => {
                    window.location.reload(true);
                    console.log("google drive success result is: ");
                    console.log(result);
                }, error => {
                    console.log("google drive error: ");
                    console.log(error);
                    //error case
                });
            }
        };
    }

    exports.default = {
        initialize
    };
});
;define('iwnad/initializers/initialize-torii-callback', ['exports', 'iwnad/config/environment', 'torii/redirect-handler'], function (exports, _environment, _redirectHandler) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'torii-callback',
    before: 'torii',
    initialize(application) {
      if (arguments[1]) {
        // Ember < 2.1
        application = arguments[1];
      }
      if (_environment.default.torii && _environment.default.torii.disableRedirectInitializer) {
        return;
      }
      application.deferReadiness();
      _redirectHandler.default.handle(window).catch(function () {
        application.advanceReadiness();
      });
    }
  };
});
;define('iwnad/initializers/initialize-torii-session', ['exports', 'torii/bootstrap/session', 'torii/configuration'], function (exports, _session, _configuration) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'torii-session',
    after: 'torii',

    initialize(application) {
      if (arguments[1]) {
        // Ember < 2.1
        application = arguments[1];
      }
      const configuration = (0, _configuration.getConfiguration)();
      if (!configuration.sessionServiceName) {
        return;
      }

      (0, _session.default)(application, configuration.sessionServiceName);

      var sessionFactoryName = 'service:' + configuration.sessionServiceName;
      application.inject('adapter', configuration.sessionServiceName, sessionFactoryName);
    }
  };
});
;define('iwnad/initializers/initialize-torii', ['exports', 'torii/bootstrap/torii', 'torii/configuration', 'iwnad/config/environment'], function (exports, _torii, _configuration, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var initializer = {
    name: 'torii',
    initialize(application) {
      if (arguments[1]) {
        // Ember < 2.1
        application = arguments[1];
      }
      (0, _configuration.configure)(_environment.default.torii || {});
      (0, _torii.default)(application);
      application.inject('route', 'torii', 'service:torii');
    }
  };

  exports.default = initializer;
});
;define('iwnad/instance-initializers/ember-cli-mirage-autostart', ['exports', 'ember-cli-mirage/instance-initializers/ember-cli-mirage-autostart'], function (exports, _emberCliMirageAutostart) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _emberCliMirageAutostart.default;
    }
  });
});
;define("iwnad/instance-initializers/ember-data", ["exports", "ember-data/initialize-store-service"], function (exports, _initializeStoreService) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: "ember-data",
    initialize: _initializeStoreService.default
  };
});
;define('iwnad/instance-initializers/setup-routes', ['exports', 'torii/bootstrap/routing', 'torii/configuration', 'torii/compat/get-router-instance', 'torii/compat/get-router-lib', 'torii/router-dsl-ext'], function (exports, _routing, _configuration, _getRouterInstance, _getRouterLib) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'torii-setup-routes',
    initialize(applicationInstance /*, registry */) {
      const configuration = (0, _configuration.getConfiguration)();

      if (!configuration.sessionServiceName) {
        return;
      }

      let router = (0, _getRouterInstance.default)(applicationInstance);
      var setupRoutes = function () {
        let routerLib = (0, _getRouterLib.default)(router);
        var authenticatedRoutes = routerLib.authenticatedRoutes;
        var hasAuthenticatedRoutes = !Ember.isEmpty(authenticatedRoutes);
        if (hasAuthenticatedRoutes) {
          (0, _routing.default)(applicationInstance, authenticatedRoutes);
        }
        router.off('willTransition', setupRoutes);
      };
      router.on('willTransition', setupRoutes);
    }
  };
});
;define('iwnad/instance-initializers/walk-providers', ['exports', 'torii/lib/container-utils', 'torii/configuration'], function (exports, _containerUtils, _configuration) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'torii-walk-providers',
    initialize(applicationInstance) {
      let configuration = (0, _configuration.getConfiguration)();
      // Walk all configured providers and eagerly instantiate
      // them. This gives providers with initialization side effects
      // like facebook-connect a chance to load up assets.
      for (var key in configuration.providers) {
        if (configuration.providers.hasOwnProperty(key)) {
          (0, _containerUtils.lookup)(applicationInstance, 'torii-provider:' + key);
        }
      }
    }
  };
});
;define('iwnad/mirage/config', ['exports', 'ember-cli-mirage'], function (exports, _emberCliMirage) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function () {

    // this.get('/modules');

    this.post('api/login', function (schema, req) {
      let loginData = JSON.parse(req.requestBody);
      if (loginData.email === 'letme' && loginData.password === 'in') {
        return {
          "user": {
            "userid": 1,
            "email": "abarman@usc.edu",
            "email_verified_at": null,
            "permissions": 1, //admin is 0, mentor is 1, mentee is 2
            "firstlogin": false,
            "name": "Avni",
            "profilepic": null,
            "occupation": null,
            "organization": null,
            "phone": null,
            "bio": null,
            "created_at": "2018-10-25 21:36:25",
            "updated_at": "2018-10-25 21:36:25"
          },
          "access_token": "token"
        };
      } else {
        return new _emberCliMirage.Response(400);
      }
    });

    this.post('api/updateuser', function (schema, req) {
      let signupData = JSON.parse(req.requestBody);
      return {
        "user": {
          "userid": 1,
          "email": "abarman@usc.edu",
          "email_verified_at": null,
          "permissions": 0, //admin is 0, mentor is 1, mentee is 2
          "firstlogin": true,
          "name": "Avni",
          "profilepic": null,
          "occupation": "Student",
          "organization": "USC",
          "phone": "2062519281",
          "bio": null,
          "created_at": "2018-10-25 21:36:25",
          "updated_at": "2018-10-25 21:36:25"
        }
      };
    });

    this.get('api/currentpairs', function (schema, req) {
      return {
        "pairings": [{
          "pairingid": 8,
          "mentorid": 12,
          "menteeid": 13,
          "current": {
            "userid": 12,
            "email": "abuomar@usc.edu",
            "email_verified_at": null,
            "permissions": 1,
            "firstlogin": true,
            "name": "Jamila",
            "profilepic": null,
            "occupation": null,
            "organization": null,
            "phone": null,
            "bio": null,
            "partnernote": null,
            "created_at": "2018-11-08 22:27:17",
            "updated_at": "2018-11-08 22:27:17"
          },
          "match": {
            "userid": 13,
            "email": "dshafi@usc.edu",
            "email_verified_at": null,
            "permissions": 2,
            "firstlogin": true,
            "name": "daniyal",
            "profilepic": null,
            "occupation": null,
            "organization": null,
            "phone": null,
            "bio": null,
            "partnernote": null,
            "created_at": "2018-11-08 22:58:42",
            "updated_at": "2018-11-08 22:58:42"
          }
        }]
      };
    });

    this.get('api/getDashboard', function (schema, req) {
      console.log("DAFUG");
      return {
        "dashboard": {
          "currentPhaseID": 2,
          "comment": "Call me on my phone number.",
          "meetingTime": "2018-06-11T00:00:00.000Z",
          "phase": [{
            "phaseID": 1,
            "phaseName": "Research",
            "dueDate": "February 1st",
            "description": "This is the research module.",
            "links": [{
              "linkName": "Doc1",
              "docLink": "http://drive.google.com"
            }, {
              "linkName": "Doc2",
              "docLink": "http://drive.google.com"
            }],
            "resources": [{
              "resourceName": "Google1",
              "resourceLink": "http://google.com"
            }, {
              "resourceName": "Facebook2",
              "resourceLink": "http://facebook.com"
            }]
          }, {
            "phaseID": 2,
            "phaseName": "Prototype",
            "dueDate": "March 1st",
            "description": "This is the prototype module.",
            "links": [{
              "linkName": "Doc3",
              "docLink": "http://drive.google.com"
            }, {
              "linkName": "Doc4",
              "docLink": "http://drive.google.com"
            }],
            "resources": [{
              "resourceName": "Google3",
              "resourceLink": "http://google.com"
            }, {
              "resourceName": "Facebook4",
              "resourceLink": "http://facebook.com"
            }]
          }, {
            "phaseID": 3,
            "phaseName": "Pitch",
            "dueDate": "April 1st",
            "description": "This is the pitch module.",
            "links": [{
              "linkName": "Doc5",
              "docLink": "http://drive.google.com"
            }, {
              "linkName": "Doc6",
              "docLink": "http://drive.google.com"
            }],
            "resources": [{
              "resourceName": "Google5",
              "resourceLink": "http://google.com"
            }, {
              "resourceName": "Facebook6",
              "resourceLink": "http://facebook.com"
            }]
          }]
        }
      };
    });

    this.post("api/linkFile/:linkName/:docLink", function (schema, request) {

      let userLinkData = JSON.parse(request.requestBody);
      if (userLinkData.linkName != undefined && userLinkData.docLink != undefined) {
        // var currentPhase = JSON.parse(localStorage.currentDashboard).currentPhaseID;
        // var currentFiles = JSON.parse(localStorage.currentDashboard).phase[currentPhase].links;
        // currentFiles.pushObject({linkName: name, docLink: url});
        //this.set(localstorage.currentDashboard, )
        return new _emberCliMirage.Response(200);
      } else {
        return new _emberCliMirage.Response(401);
      }
    });

    this.post("api/deleteLink/:docLink", function (schema, request) {

      let userLinkToDelete = JSON.parse(request.requestBody);
      if (userLinkToDelete != null) {
        return new _emberCliMirage.Response(200);
      } else {
        return new _emberCliMirage.Response(401);
      }
    });

    this.post("api/sendFeedback/:feedback", function (schema, request) {

      let message = JSON.parse(request.requestBody);
      if (message != null) {
        return new _emberCliMirage.Response(200);
      } else {
        return new _emberCliMirage.Response(401);
      }
    });

    this.post("api/approveNextStep", function (schema, request) {
      return new _emberCliMirage.Response(200);
    });

    this.post("api/subscribe", function (schema, request) {

      let message = JSON.parse(request.requestBody);
      console.log("message is " + message);
      if (message != null) {
        conole.log("Response(200)");
        return new _emberCliMirage.Response(200);
      } else {
        conole.log("Response(401)");
        return new _emberCliMirage.Response(401);
      }
    });

    // These comments are here to help you get started. Feel free to delete them.

    /*
      Config (with defaults).
       Note: these only affect routes defined *after* them!
    */

    // this.urlPrefix = '';    // make this `http://localhost:8080`, for example, if your API is on a different server
    // this.namespace = '';    // make this `/api`, for example, if your API is namespaced
    // this.timing = 400;      // delay for each request, automatically set to 0 during testing

    /*
      Shorthand cheatsheet:
       this.get('/posts');
      this.post('/posts');
      this.get('/posts/:id');
      this.put('/posts/:id'); // or this.patch
      this.del('/posts/:id');
       http://www.ember-cli-mirage.com/docs/v0.3.x/shorthands/
    */
  };
});
;define("iwnad/mirage/fixtures/modules", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = [];
});
;define("iwnad/mirage/scenarios/default", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function () /*server*/{

    //server.loadFixtures();

    /*
      Seed your development database using your factories.
      This data will not be loaded in your tests.
    */

    // server.createList('post', 10);
  };
});
;define('iwnad/mirage/serializers/application', ['exports', 'ember-cli-mirage'], function (exports, _emberCliMirage) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberCliMirage.JSONAPISerializer.extend({});
});
;define('iwnad/models/module', ['exports', 'ember-data'], function (exports, _emberData) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = _emberData.default.Model.extend({
		name: _emberData.default.attr('string'),
		status: _emberData.default.attr('string'),
		due: _emberData.default.attr('string'),
		resources: _emberData.default.attr()
	});
});
;define('iwnad/models/user', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberData.default.Model.extend({
    userid: _emberData.default.attr('int'),
    email: _emberData.default.attr('string'),
    email_verified_at: _emberData.default.attr('string'),
    permissions: _emberData.default.attr('int'),
    firstlogin: _emberData.default.attr('boolean'),
    name: _emberData.default.attr('string'),
    profilepic: _emberData.default.attr('string'),
    occupation: _emberData.default.attr('string'),
    organization: _emberData.default.attr('string'),
    phone: _emberData.default.attr('string'),
    bio: _emberData.default.attr('string'),
    created_at: _emberData.default.attr('string'),
    updated_at: _emberData.default.attr('string')
  });
});
;define('iwnad/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberResolver.default;
});
;define('iwnad/router', ['exports', 'iwnad/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  const Router = Ember.Router.extend({
    location: _environment.default.locationType,
    rootURL: _environment.default.rootURL
  });

  Router.map(function () {
    this.route('login');
    this.route('main', { path: '/' });
    this.route('magic');
    this.route('signup');
    this.route('dashboard-page', { path: '/dashboard' });
    this.route('my-match');
    this.route('my-profile');
    this.route('new-user');
    this.route('admin');
    this.route('about');
  });

  exports.default = Router;
});
;define('iwnad/routes/about', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({});
});
;define('iwnad/routes/admin', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    model() {
      if (localStorage.currentUser == undefined) {
        this.transitionTo('login');
      } else if (JSON.parse(localStorage.currentUser).permissions !== 0) {
        this.transitionTo('dashboard-page');
      }
    }
  });
});
;define('iwnad/routes/application', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend();
});
;define('iwnad/routes/dashboard-page', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({

    activate: function () {
      if (localStorage.currentUser == undefined) {
        this.transitionTo('login');
      } else if (JSON.parse(localStorage.currentUser).permissions === 0) {
        this.transitionTo('admin');
      } else {
        this.controllerFor('dashboard-page').send('onLoad');
      }
      //return this.store.findAll("module");
    }
  });
});
;define('iwnad/routes/login', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    model() {
      if (localStorage.currentUser !== undefined) {
        if (JSON.parse(localStorage.currentUser).permissions == 0) {
          this.transitionTo('admin');
        } else {
          this.transitionTo('dashboard-page');
        }
      } else if (localStorage.currentUserName !== undefined) {
        this.transitionTo('signup');
      }
    }
  });
});
;define('iwnad/routes/magic', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({});
});
;define('iwnad/routes/main', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({});
});
;define('iwnad/routes/my-match', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    model() {
      if (localStorage.currentUser == undefined) {
        this.transitionTo('login');
      } else if (JSON.parse(localStorage.currentUser).permissions === 0) {
        this.transitionTo('admin');
      }
    }
  });
});
;define('iwnad/routes/my-profile', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    model() {
      if (localStorage.currentUser == undefined) {
        this.transitionTo('login');
      } else if (JSON.parse(localStorage.currentUser).permissions === 0) {
        this.transitionTo('admin');
      }
    }
  });
});
;define('iwnad/routes/new-user', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({});
});
;define('iwnad/routes/signup', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    model() {
      if (localStorage.currentUserName === undefined) {
        this.transitionTo('login');
      } else if (localStorage.currentUser !== undefined) {
        if (JSON.parse(localStorage.currentUser).permissions === 0) {
          this.transitionTo('admin');
        } else {
          this.transitionTo('dashboard-page');
        }
      }
    }
  });
});
;define('iwnad/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _ajax) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _ajax.default;
    }
  });
});
;define('iwnad/services/current-user', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Service.extend({});
});
;define('iwnad/services/modal-dialog', ['exports', 'iwnad/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  function computedFromConfig(prop) {
    return Ember.computed(function () {
      return _environment.default['ember-modal-dialog'] && _environment.default['ember-modal-dialog'][prop];
    });
  }

  exports.default = Ember.Service.extend({
    hasEmberTether: computedFromConfig('hasEmberTether'),
    hasLiquidWormhole: computedFromConfig('hasLiquidWormhole'),
    hasLiquidTether: computedFromConfig('hasLiquidTether'),
    destinationElementId: null // injected by initializer
  });
});
;define('iwnad/services/moment', ['exports', 'ember-moment/services/moment', 'iwnad/config/environment'], function (exports, _moment, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  const { get } = Ember;

  exports.default = _moment.default.extend({
    defaultFormat: get(_environment.default, 'moment.outputFormat')
  });
});
;define('iwnad/services/popup', ['exports', 'torii/services/popup'], function (exports, _popup) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _popup.default;
    }
  });
});
;define('iwnad/services/torii-session', ['exports', 'torii/services/torii-session'], function (exports, _toriiSession) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _toriiSession.default;
    }
  });
});
;define('iwnad/services/torii', ['exports', 'torii/services/torii'], function (exports, _torii) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _torii.default;
    }
  });
});
;define("iwnad/templates/about", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "hZvj0rk/", "block": "{\"symbols\":[],\"statements\":[[7,\"div\"],[11,\"class\",\"about-page\"],[9],[0,\"\\n\\t\"],[7,\"div\"],[11,\"class\",\"row\"],[9],[0,\"\\n\\t\\t\"],[7,\"div\"],[11,\"class\",\"col\"],[9],[0,\"\\n\\t\\t\\t\"],[7,\"img\"],[11,\"style\",\"width: 100%;\"],[11,\"src\",\"/assets/images/mission-about-page.png\"],[9],[10],[0,\"\\n\\t\\t\"],[10],[0,\"\\n\\n\\t\\t\"],[7,\"div\"],[11,\"class\",\"col\"],[11,\"style\",\"margin-top: auto; margin-bottom: auto;\"],[9],[0,\"\\n\\t\\t\\t\"],[7,\"h2\"],[9],[0,\"Our Mission\"],[10],[0,\"\\n\\t\\t\\t\"],[7,\"p\"],[9],[0,\"To reshape the current leadership landscape with a greater number of women leaders by instilling young women with a sense of ownership and entrepreneurial spirit to become the decision-makers of tomorrow.\"],[10],[0,\"\\n\\t\\t\"],[10],[0,\"\\n\\t\"],[10],[0,\"\\n\\n\\t\"],[7,\"div\"],[11,\"class\",\"row\"],[11,\"style\",\"margin-top: 50px;\"],[9],[0,\"\\n\\t\\t\"],[7,\"div\"],[11,\"class\",\"col-8\"],[9],[0,\"\\n\\t\\t\\t\"],[7,\"h2\"],[9],[0,\"Note from the Founder\"],[10],[0,\"\\n\\t\\t\\t\"],[7,\"p\"],[9],[0,\"“Having worked for various tech companies and always being the only female on the team, I was compelled to personally reassess the lack of gender diversity in technology. While many companies have already addressed this with numerous diversity initiatives for recruiting more women, only 20% of women hold these tech jobs. While this bottom-up approach is essential, we remain far from achieving a gender balance in leadership positions and our general workforce. Culture shifts start from the top. I believe that if we approach this problem top-down as well, with a goal to have more women leading companies, the workplace culture will naturally shift towards diversity. With this approach, we can more rapidly attain gender balance in the workplace. However, every day fewer women are starting their own companies due to a variety of factors stemming from a lack of moral support and guidance at a young age, understanding of entrepreneurial risks, and resources to pursue an idea.” \"],[7,\"strong\"],[9],[0,\"~Founder, Avni Barman\"],[10],[10],[0,\"\\n\\t\\t\"],[10],[0,\"\\n\\t\\t\"],[7,\"div\"],[11,\"class\",\"col-4\"],[11,\"style\",\"margin-bottom: auto; margin-top: auto;\"],[9],[0,\"\\n\\t\\t\\t\"],[7,\"img\"],[11,\"style\",\"width: 100%; border-radius: 50%;\"],[11,\"src\",\"/assets/images/founder-about.png\"],[9],[10],[0,\"\\n\\t\\t\"],[10],[0,\"\\n\\t\"],[10],[0,\"\\n\"],[10],[0,\"\\n\\n\"],[7,\"div\"],[11,\"class\",\"about-statistics\"],[9],[0,\"\\n\\t\"],[7,\"div\"],[11,\"class\",\"about-statistics-sub row\"],[9],[0,\"\\n\\t\\t\"],[7,\"div\"],[11,\"class\",\"col-sm\"],[9],[0,\"\\n\\t\\t\\t\"],[7,\"img\"],[11,\"style\",\"width: 50%;\"],[11,\"src\",\"/assets/images/about-icon-1.png\"],[9],[10],[0,\"\\n\\t\\t\\t\"],[7,\"div\"],[11,\"style\",\"margin-top: 10px;\"],[9],[0,\"Only \"],[7,\"span\"],[11,\"class\",\"medium-text-pink\"],[9],[7,\"strong\"],[9],[0,\"17%\"],[10],[10],[0,\" of startups have a female founder.\"],[10],[0,\"\\n\\t\\t\"],[10],[0,\"\\n\\t\\t\"],[7,\"div\"],[11,\"class\",\"col-sm\"],[9],[0,\"\\n\\t\\t\\t\"],[7,\"img\"],[11,\"style\",\"width: 90%;\"],[11,\"src\",\"/assets/images/about-icon-2.png\"],[9],[10],[0,\"\\n\\t\\t\\t\"],[7,\"div\"],[11,\"style\",\"margin-top: 10px;\"],[9],[0,\"Female Founders get less than \"],[7,\"span\"],[11,\"class\",\"medium-text-pink\"],[9],[7,\"strong\"],[9],[0,\"2%\"],[10],[10],[0,\" of venture capital dollars.\"],[10],[0,\"\\n\\t\\t\"],[10],[0,\"\\n\\t\\t\"],[7,\"div\"],[11,\"class\",\"col-sm\"],[9],[0,\"\\n\\t\\t\\t\"],[7,\"img\"],[11,\"style\",\"width: 65%;\"],[11,\"src\",\"/assets/images/about-icon-3.png\"],[9],[10],[0,\"\\n\\t\\t\\t\"],[7,\"div\"],[11,\"style\",\"margin-top: 10px;\"],[9],[0,\"Young girls are \"],[7,\"span\"],[11,\"class\",\"medium-text-pink\"],[9],[7,\"strong\"],[9],[0,\"not\"],[10],[10],[0,\" raised to be \"],[7,\"span\"],[11,\"class\",\"medium-text-pink\"],[9],[7,\"strong\"],[9],[0,\"risk-takers\"],[10],[10],[0,\".\"],[10],[0,\"\\n\\t\\t\"],[10],[0,\"\\n\\t\"],[10],[0,\"\\n\"],[10],[0,\"\\n\\n\"],[7,\"div\"],[11,\"class\",\"about-page\"],[9],[0,\"\\n\\t\"],[7,\"div\"],[11,\"class\",\"row\"],[11,\"style\",\"margin-top: 50px;\"],[9],[0,\"\\n\\t\\t\"],[7,\"div\"],[11,\"class\",\"col-4\"],[9],[0,\"\\n\\t\\t\\t\"],[7,\"img\"],[11,\"style\",\"width: 100%;\"],[11,\"src\",\"/assets/images/mentorship-about-page.png\"],[9],[10],[0,\"\\n\\t\\t\"],[10],[0,\"\\n\\t\\t\"],[7,\"div\"],[11,\"class\",\"col-8\"],[9],[0,\"\\n\\t\\t\\t\"],[7,\"h2\"],[9],[0,\"Our Approach\"],[10],[0,\"\\n\\t\\t\\t\"],[7,\"p\"],[9],[0,\"In a recent TEDx talk, Reshma Saujani pointed out that from a young age, boys are taught to be brave while girls are raised to be perfect. Starting a business involves taking risks and being bold, an idea often instilled in growing boys, not girls. Women around the world are less likely to consider entrepreneurship as a career path, largely because they do not see other women entrepreneurs as role models.\"],[7,\"br\"],[9],[10],[7,\"br\"],[9],[10],[0,\"We believe targeting this problem through an accelerator for young girls when they are most open-minded with their interests is the best way to tackle this issue. By providing resources and mentoring aspiring innovators within this age group, we hope to build the next generation of female founders.\"],[10],[0,\"\\n\\t\\t\"],[10],[0,\"\\n\\t\"],[10],[0,\"\\n\\t\"],[7,\"hr\"],[11,\"style\",\"border: 1px solid #FFABB4; margin-top: 50px; margin-bottom: 50px;\"],[9],[10],[0,\"\\n\\n\\t\"],[7,\"div\"],[11,\"class\",\"row\"],[9],[0,\"\\n\\t\\t\"],[7,\"div\"],[11,\"class\",\"col\"],[9],[0,\"\\n\\t\\t\\t\"],[7,\"h3\"],[9],[0,\"Entrepreneurship Makeathon\"],[10],[0,\"\\n\\t\\t\\t\"],[7,\"p\"],[9],[0,\"We are inviting all students between the ages of 14-16 to attend our annual \"],[7,\"a\"],[11,\"target\",\"_blank\"],[11,\"href\",\"https://www.eventbrite.com/e/she-leads-entrepreneurship-makeathon-tickets-52561122733?utm-medium=discovery&utm-campaign=social&utm-content=attendeeshare&aff=escb&utm-source=cp&utm-term=eventcard\"],[9],[0,\"She Leads Entrepreneurship Makeathon\"],[10],[0,\". During these two days, students will get to actively engage in discussions with female entrepreneurs, participate in design thinking and ideation exercises, attend product development and marketing workshops, and so much more. Students will attain effective communication skills, alongside a fully developed idea in preparation for the pitch competition at the end of the makeathon. Winners of this pitch competition will be paired with leading female founders to help guide their ideas into reality over the next couple of months following the makeathon through our mentorship program.\"],[10],[0,\"\\n\\t\\t\"],[10],[0,\"\\n\\n\\t\\t\"],[7,\"div\"],[11,\"class\",\"col\"],[9],[0,\"\\n\\t\\t\\t\"],[7,\"h3\"],[9],[0,\"Mentorship Program\"],[10],[0,\"\\n\\t\\t\\t\"],[7,\"p\"],[9],[0,\"Through this mentorship program, young girls will have an opportunity to take their ideas one step further and make them a reality. We plan to enable angel investors to come on board and invest in students’ ideas. By instilling a passion for entrepreneurship through real-world examples and experiences, young girls can realize their potential and capabilities. With these building blocks and learning experiences behind them, they will feel more confident in choosing entrepreneurship as a career choice.\"],[10],[0,\"\\n\\t\\t\"],[10],[0,\"\\n\\t\"],[10],[0,\"\\n\"],[10],[0,\"\\n\\n\"],[7,\"div\"],[11,\"class\",\"ways-involved\"],[9],[0,\"\\n\\t\"],[7,\"div\"],[11,\"class\",\"row ways-involved-sub\"],[9],[0,\"\\n\\t\\t\"],[7,\"div\"],[11,\"class\",\"col-8\"],[9],[0,\"\\n\\t\\t\\t\"],[7,\"h2\"],[11,\"class\",\"medium-musket-text-red\"],[9],[0,\"WAYS TO GET INVOLVED\"],[10],[0,\"\\n\\t\\t\\t\"],[7,\"div\"],[9],[0,\"\\n\\t\\t\\t\\tSubscribe to our email list:\\n\\t\\t\\t\\t\"],[7,\"div\"],[11,\"style\",\"width: 100%; vertical-align: middle;\"],[9],[0,\"\\n\\t\\t\\t\\t\\t\"],[1,[27,\"input\",null,[[\"class\",\"placeholder\",\"value\"],[\"email-subscribe-box\",\"Email*\",[23,[\"email\"]]]]],false],[0,\"\\n\\t\\t\\t\\t\\t\"],[7,\"button\"],[11,\"class\",\"subscribe-button\"],[3,\"action\",[[22,0,[]],\"subscribe\"]],[9],[0,\"SUBSCRIBE\"],[10],[0,\"\\n\\t\\t\\t\\t\"],[10],[0,\"\\n\\t\\t\\t\\t\"],[7,\"br\"],[9],[10],[7,\"br\"],[9],[10],[0,\"\\n\\t\\t\\t\\t\"],[7,\"h6\"],[11,\"style\",\"color: #FF583E;\"],[9],[1,[21,\"message\"],false],[10],[0,\"\\n\\t\\t\\t\"],[10],[0,\"\\n\\t\\t\\t\"],[7,\"div\"],[11,\"style\",\"margin-top: 20px;\"],[9],[0,\"\\n\\t\\t\\t\\t\"],[7,\"h3\"],[11,\"class\",\"medium-text-red\"],[9],[7,\"strong\"],[9],[0,\"Students\"],[10],[10],[0,\"\\n\\t\\t\\t\\tRegister for our annual entrepreneurship makeathon \"],[7,\"a\"],[11,\"target\",\"_blank\"],[11,\"href\",\"https://www.eventbrite.com/e/she-leads-entrepreneurship-makeathon-tickets-52561122733?utm-medium=discovery&utm-campaign=social&utm-content=attendeeshare&aff=escb&utm-source=cp&utm-term=eventcard\"],[9],[0,\"here\"],[10],[0,\".\\n\\t\\t\\t\\t\"],[7,\"br\"],[9],[10],[7,\"br\"],[9],[10],[0,\"\\n\\t\\t\\t\\t\"],[7,\"h3\"],[11,\"class\",\"medium-text-red\"],[9],[7,\"strong\"],[9],[0,\"Female Founders\"],[10],[10],[0,\"\\n\\t\\t\\t\\tEmail \"],[7,\"strong\"],[9],[0,\"avni@sheleads.io\"],[10],[0,\" to volunteer as a mentor.\\n\\t\\t\\t\\t\"],[7,\"br\"],[9],[10],[7,\"br\"],[9],[10],[0,\"\\n\\t\\t\\t\\t\"],[7,\"h3\"],[11,\"class\",\"medium-text-red\"],[9],[7,\"strong\"],[9],[0,\"Partners & Sponsors\"],[10],[10],[0,\"\\t\\n\\t\\t\\t\\tEmail \"],[7,\"strong\"],[9],[0,\"contact@sheleads.io\"],[10],[0,\" to learn how to be a partner.\\n\\t\\t\\t\\t\"],[7,\"br\"],[9],[10],[0,\"\\n\\t\\t\\t\\t\"],[7,\"br\"],[9],[10],[0,\"\\n\\t\\t\\t\"],[10],[0,\"\\n\\t\\t\"],[10],[0,\"\\n\\n\\t\\t\"],[7,\"div\"],[11,\"class\",\"col-4\"],[9],[0,\"\\n\\t\\t\\t\"],[7,\"img\"],[11,\"style\",\"width: 100%;\"],[11,\"src\",\"/assets/images/ways-involved-image.png\"],[9],[10],[0,\"\\n\\t\\t\"],[10],[0,\"\\n\\t\"],[10],[0,\"\\n\"],[10],[0,\"\\n\\n\"],[7,\"div\"],[11,\"class\",\"footer\"],[9],[0,\"\\n\\t\"],[7,\"div\"],[11,\"class\",\"footer-sub\"],[9],[0,\"\\n\\t\\t\"],[7,\"div\"],[11,\"class\",\"navbar-brand\"],[11,\"href\",\"#\"],[9],[0,\"she leads\"],[10],[0,\"\\n\\t\"],[10],[0,\"\\n\\t\"],[7,\"div\"],[11,\"class\",\"copyright-sub\"],[9],[0,\"\\n\\t\\t\"],[7,\"div\"],[11,\"style\",\"text-align: right;\"],[9],[0,\"Copyright © 2018\"],[10],[0,\"\\n\\t\"],[10],[0,\"\\n\"],[10],[0,\"\\n\"],[1,[21,\"outlet\"],false]],\"hasEval\":false}", "meta": { "moduleName": "iwnad/templates/about.hbs" } });
});
;define("iwnad/templates/admin", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "42ZkkWTu", "block": "{\"symbols\":[\"subscriber\",\"group\",\"person\",\"person\",\"user\",\"user\"],\"statements\":[[7,\"div\"],[11,\"class\",\"component-padding\"],[9],[0,\"\\n   \"],[7,\"div\"],[11,\"class\",\"row\"],[9],[0,\"\\n      \"],[7,\"div\"],[11,\"class\",\"login-text col-md-8\"],[9],[0,\"\\n         \"],[7,\"h1\"],[11,\"class\",\"large-text\"],[9],[0,\"Add a User\"],[10],[0,\"\\n         \"],[7,\"br\"],[9],[10],[0,\"\\n         \"],[7,\"h6\"],[11,\"class\",\"small-text\"],[9],[0,\"User's Name\"],[10],[0,\"\\n         \"],[1,[27,\"input\",null,[[\"name\",\"id\",\"value\"],[\"username\",\"username\",[23,[\"username\"]]]]],false],[0,\"\\n         \"],[7,\"h6\"],[11,\"class\",\"small-text\"],[9],[0,\"User Email Address\"],[10],[0,\"\\n         \"],[1,[27,\"input\",null,[[\"name\",\"id\",\"type\",\"value\"],[\"email\",\"email\",\"email\",[23,[\"email\"]]]]],false],[0,\"\\n         \"],[7,\"h6\"],[11,\"class\",\"small-text\"],[9],[0,\"Password\"],[10],[0,\"\\n         \"],[1,[27,\"input\",null,[[\"name\",\"id\",\"type\",\"value\"],[\"password\",\"password\",\"password\",[23,[\"password\"]]]]],false],[0,\"\\n         \"],[7,\"h6\"],[11,\"class\",\"small-text\"],[9],[0,\"User Type\"],[10],[0,\"\\n         \"],[7,\"select\"],[12,\"onchange\",[27,\"action\",[[22,0,[]],\"updateTypeValue\"],[[\"value\"],[\"target.value\"]]]],[9],[0,\"\\n         \"],[7,\"option\"],[11,\"disabled\",\"\"],[11,\"selected\",\"\"],[9],[0,\" -- select type of User -- \"],[10],[0,\"\\n         \"],[7,\"option\"],[11,\"value\",\"0\"],[9],[0,\"Admin\"],[10],[0,\"\\n         \"],[7,\"option\"],[11,\"value\",\"1\"],[9],[0,\"Mentor\"],[10],[0,\"\\n         \"],[7,\"option\"],[11,\"value\",\"2\"],[9],[0,\"Mentee\"],[10],[0,\"\\n         \"],[10],[0,\"\\n      \"],[10],[0,\"\\n   \"],[10],[0,\"\\n   \"],[7,\"div\"],[11,\"class\",\"row\"],[9],[0,\"\\n      \"],[7,\"div\"],[11,\"class\",\"login-text col-md-8\"],[9],[0,\"\\n         \"],[7,\"div\"],[11,\"class\",\"button-div\"],[9],[0,\"\\n            \"],[7,\"button\"],[11,\"class\",\"submit-button\"],[3,\"action\",[[22,0,[]],\"addUser\"]],[9],[0,\"Submit\"],[10],[0,\"\\n         \"],[10],[0,\"\\n         \"],[7,\"h6\"],[11,\"style\",\"color: #FF583E;\"],[11,\"class\",\"login-text col-md-8\"],[11,\"id\",\"addresults\"],[9],[10],[0,\"\\n         \"],[7,\"h4\"],[9],[0,\"All Current Users\"],[10],[0,\"\\n         \"],[7,\"h6\"],[11,\"class\",\"small-text\"],[9],[0,\"*admin is 0, mentor is 1, mentee is 2\"],[10],[0,\"\\n         \"],[7,\"table\"],[11,\"class\",\"table table-bordered\"],[9],[0,\"\\n            \"],[7,\"thead\"],[9],[0,\"\\n               \"],[7,\"tr\"],[9],[0,\"\\n                  \"],[7,\"td\"],[9],[7,\"strong\"],[9],[0,\"Name\"],[10],[10],[0,\"\\n                  \"],[7,\"td\"],[9],[7,\"strong\"],[9],[0,\"Email\"],[10],[10],[0,\"\\n                  \"],[7,\"td\"],[9],[7,\"strong\"],[9],[0,\"Permissions\"],[10],[10],[0,\"\\n               \"],[10],[0,\"\\n            \"],[10],[0,\"\\n\"],[4,\"each\",[[23,[\"users\",\"users\"]]],null,{\"statements\":[[0,\"               \"],[7,\"tr\"],[9],[0,\"\\n               \"],[7,\"td\"],[9],[7,\"h6\"],[9],[1,[22,6,[\"name\"]],false],[10],[10],[0,\"\\n               \"],[7,\"td\"],[9],[7,\"h6\"],[9],[1,[22,6,[\"email\"]],false],[10],[10],[0,\"\\n               \"],[7,\"td\"],[9],[7,\"h6\"],[9],[1,[22,6,[\"permissions\"]],false],[10],[10],[0,\"\\n               \"],[10],[0,\"\\n\"]],\"parameters\":[6]},null],[0,\"         \"],[10],[0,\"\\n\\n         \"],[7,\"br\"],[9],[10],[0,\"\\n         \"],[7,\"br\"],[9],[10],[0,\"\\n         \"],[7,\"h1\"],[11,\"class\",\"large-text\"],[9],[0,\"Delete a User\"],[10],[0,\"\\n         \"],[7,\"br\"],[9],[10],[0,\"\\n         \"],[7,\"h6\"],[11,\"class\",\"small-text\"],[9],[0,\"User Email Address\"],[10],[0,\"\\n         \"],[7,\"select\"],[12,\"onchange\",[27,\"action\",[[22,0,[]],\"updateUserEmailValue\"],[[\"value\"],[\"target.value\"]]]],[9],[0,\"\\n         \"],[7,\"option\"],[11,\"disabled\",\"\"],[11,\"selected\",\"\"],[9],[0,\" -- select email -- \"],[10],[0,\"\\n         \"],[1,[27,\"log\",[[23,[\"users\",\"users\"]]],null],false],[0,\"\\n\"],[4,\"each\",[[23,[\"users\",\"users\"]]],null,{\"statements\":[[0,\"         \"],[7,\"option\"],[12,\"value\",[22,5,[\"email\"]]],[9],[1,[22,5,[\"email\"]],false],[10],[0,\"\\n\"]],\"parameters\":[5]},null],[0,\"         \"],[10],[0,\"\\n         \"],[7,\"div\"],[11,\"class\",\"button-div\"],[9],[0,\"\\n            \"],[7,\"button\"],[11,\"class\",\"submit-button\"],[3,\"action\",[[22,0,[]],\"deleteUser\"]],[9],[0,\"Submit\"],[10],[0,\"\\n         \"],[10],[0,\"\\n         \"],[7,\"h6\"],[11,\"style\",\"color: #FF583E;\"],[11,\"class\",\"login-text col-md-8\"],[11,\"id\",\"removeresults\"],[9],[10],[0,\"\\n         \"],[7,\"br\"],[9],[10],[0,\"\\n      \"],[10],[0,\"\\n   \"],[10],[0,\"\\n   \"],[7,\"div\"],[11,\"class\",\"row\"],[9],[0,\"\\n      \"],[7,\"div\"],[11,\"class\",\"login-text col-md-8\"],[9],[0,\"\\n         \"],[7,\"br\"],[9],[10],[0,\"\\n         \"],[7,\"h1\"],[11,\"class\",\"large-text\"],[9],[0,\"Add a Mentorship Pair\"],[10],[0,\"\\n         \"],[7,\"br\"],[9],[10],[0,\"\\n         \"],[7,\"h6\"],[11,\"class\",\"small-text\"],[9],[0,\"Mentee Email Address\"],[10],[0,\"\\n         \"],[7,\"select\"],[12,\"onchange\",[27,\"action\",[[22,0,[]],\"updateMenteeValue\"],[[\"value\"],[\"target.value\"]]]],[9],[0,\"\\n         \"],[7,\"option\"],[11,\"disabled\",\"\"],[11,\"selected\",\"\"],[9],[0,\" -- select email -- \"],[10],[0,\"\\n\"],[4,\"each\",[[23,[\"unpaired\",\"users\"]]],null,{\"statements\":[[4,\"if\",[[27,\"eq\",[[22,4,[\"permissions\"]],2],null]],null,{\"statements\":[[0,\"         \"],[7,\"option\"],[12,\"value\",[22,4,[\"email\"]]],[9],[1,[22,4,[\"email\"]],false],[10],[0,\"\\n\"]],\"parameters\":[]},null]],\"parameters\":[4]},null],[0,\"         \"],[10],[0,\"\\n         \"],[7,\"h6\"],[11,\"class\",\"small-text\"],[9],[0,\"Mentor Email Address\"],[10],[0,\"\\n         \"],[7,\"select\"],[12,\"onchange\",[27,\"action\",[[22,0,[]],\"updateMentorValue\"],[[\"value\"],[\"target.value\"]]]],[9],[0,\"\\n         \"],[7,\"option\"],[11,\"disabled\",\"\"],[11,\"selected\",\"\"],[9],[0,\" -- select email -- \"],[10],[0,\"\\n\"],[4,\"each\",[[23,[\"unpaired\",\"users\"]]],null,{\"statements\":[[4,\"if\",[[27,\"eq\",[[22,3,[\"permissions\"]],1],null]],null,{\"statements\":[[0,\"         \"],[7,\"option\"],[12,\"value\",[22,3,[\"email\"]]],[9],[1,[22,3,[\"email\"]],false],[10],[0,\"\\n\"]],\"parameters\":[]},null]],\"parameters\":[3]},null],[0,\"         \"],[10],[0,\"\\n         \"],[7,\"br\"],[9],[10],[0,\"\\n         \"],[7,\"div\"],[11,\"class\",\"button-div\"],[9],[0,\"\\n            \"],[7,\"button\"],[11,\"class\",\"submit-button\"],[3,\"action\",[[22,0,[]],\"addPair\"]],[9],[0,\"Submit\"],[10],[0,\"\\n         \"],[10],[0,\"\\n         \"],[7,\"h6\"],[11,\"style\",\"color: #FF583E;\"],[11,\"class\",\"login-text col-md-8\"],[11,\"id\",\"addPairResults\"],[9],[10],[0,\"\\n         \"],[7,\"br\"],[9],[10],[0,\"\\n         \"],[10],[0,\"\\n   \"],[10],[0,\"\\n   \"],[7,\"div\"],[11,\"class\",\"row\"],[9],[0,\"\\n      \"],[7,\"div\"],[11,\"class\",\"login-text col-md-8\"],[9],[0,\"\\n         \"],[7,\"br\"],[9],[10],[0,\"\\n         \"],[7,\"h1\"],[11,\"class\",\"large-text\"],[9],[0,\"Current Mentorship Pairs \"],[10],[0,\"\\n         \"],[7,\"table\"],[11,\"class\",\"table table-bordered allPairsTable\"],[9],[0,\"\\n         \"],[7,\"thead\"],[9],[0,\"\\n            \"],[7,\"tr\"],[9],[0,\"\\n               \"],[7,\"td\"],[11,\"class\",\"medium-text\"],[9],[0,\" \"],[7,\"strong\"],[9],[0,\"Mentee Name\"],[10],[10],[0,\"\\n               \"],[7,\"td\"],[11,\"class\",\"medium-text\"],[9],[0,\" \"],[7,\"strong\"],[9],[0,\"Mentee Email\"],[10],[10],[0,\"\\n               \"],[7,\"td\"],[11,\"class\",\"medium-text\"],[9],[0,\" \"],[7,\"strong\"],[9],[0,\"Mentor Name\"],[10],[10],[0,\"\\n               \"],[7,\"td\"],[11,\"class\",\"medium-text\"],[9],[0,\" \"],[7,\"strong\"],[9],[0,\"Mentor Email\"],[10],[10],[0,\"\\n            \"],[10],[0,\"\\n         \"],[10],[0,\"\\n         \"],[7,\"tbody\"],[9],[0,\"\\n            \"],[1,[27,\"log\",[[23,[\"pairs\",\"pairings\"]]],null],false],[0,\"\\n\"],[4,\"each\",[[23,[\"pairs\",\"pairings\"]]],null,{\"statements\":[[0,\"            \"],[7,\"tr\"],[9],[0,\"\\n               \"],[7,\"td\"],[9],[0,\" \"],[1,[22,2,[\"mentee\",\"name\"]],false],[0,\" \"],[10],[0,\"\\n               \"],[7,\"td\"],[9],[0,\" \"],[1,[22,2,[\"mentee\",\"email\"]],false],[0,\" \"],[10],[0,\"\\n               \"],[7,\"td\"],[9],[0,\" \"],[1,[22,2,[\"mentor\",\"name\"]],false],[0,\" \"],[10],[0,\"\\n               \"],[7,\"td\"],[9],[0,\" \"],[1,[22,2,[\"mentor\",\"email\"]],false],[0,\" \"],[10],[0,\"\\n               \"],[1,[27,\"log\",[[22,2,[\"pairingid\"]]],null],false],[0,\"\\n               \"],[7,\"td\"],[9],[0,\" \"],[7,\"div\"],[12,\"value\",[22,2,[\"pairingid\"]]],[11,\"class\",\"button-text\"],[3,\"action\",[[22,0,[]],\"deletePair\",[22,2,[]]]],[9],[0,\"Delete\"],[10],[10],[0,\"\\n            \"],[10],[0,\"\\n\"]],\"parameters\":[2]},null],[0,\"            \"],[10],[0,\"\\n         \"],[10],[0,\"\\n         \"],[7,\"h6\"],[11,\"style\",\"color: #FF583E;\"],[11,\"class\",\"login-text col-md-8\"],[11,\"id\",\"removePairResults\"],[9],[10],[0,\"\\n         \"],[7,\"br\"],[9],[10],[0,\"\\n      \"],[10],[0,\"\\n   \"],[10],[0,\"\\n    \"],[7,\"div\"],[11,\"class\",\"row\"],[9],[0,\"\\n      \"],[7,\"h4\"],[9],[0,\"All Current Subscribers\"],[10],[0,\"\\n         \"],[7,\"table\"],[11,\"class\",\"table table-bordered\"],[9],[0,\"\\n            \"],[7,\"thead\"],[9],[0,\"\\n               \"],[7,\"tr\"],[9],[0,\"\\n                  \"],[7,\"td\"],[9],[7,\"strong\"],[9],[0,\"Email\"],[10],[10],[0,\"\\n               \"],[10],[0,\"\\n            \"],[10],[0,\"\\n            \"],[1,[27,\"log\",[[23,[\"subscribers\",\"result\"]]],null],false],[0,\"\\n\"],[4,\"each\",[[23,[\"subscribers\",\"result\"]]],null,{\"statements\":[[0,\"               \"],[7,\"tr\"],[9],[0,\"\\n               \"],[7,\"td\"],[9],[7,\"h6\"],[9],[1,[22,1,[\"email\"]],false],[10],[10],[0,\"\\n               \"],[10],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"         \"],[10],[0,\"\\n      \"],[10],[0,\"\\n\"],[10],[0,\"\\n\"],[1,[21,\"outlet\"],false]],\"hasEval\":false}", "meta": { "moduleName": "iwnad/templates/admin.hbs" } });
});
;define("iwnad/templates/application", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "8DwNuGWO", "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[7,\"head\"],[9],[0,\"\\n  \"],[7,\"link\"],[11,\"rel\",\"stylesheet\"],[11,\"href\",\"https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css\"],[11,\"integrity\",\"sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO\"],[11,\"crossorigin\",\"anonymous\"],[9],[10],[0,\"\\n  \"],[7,\"script\"],[11,\"src\",\"https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js\"],[11,\"integrity\",\"sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy\"],[11,\"crossorigin\",\"anonymous\"],[9],[10],[0,\"\\n\\n  \"],[7,\"script\"],[11,\"src\",\"https://apis.google.com/js/api.js?onload=onApiLoad\"],[11,\"type\",\"text/javascript\"],[9],[10],[0,\"\\n\"],[10],[0,\"\\n\\n\"],[7,\"body\"],[11,\"style\",\"flex: 1;\"],[9],[0,\"\\n\"],[7,\"nav\"],[11,\"class\",\"header navbar navbar-expand-lg navbar-dark\"],[9],[0,\"\\n\"],[4,\"if\",[[23,[\"loggedIn\"]]],null,{\"statements\":[[0,\"\\n \"],[4,\"link-to\",[\"main\"],null,{\"statements\":[[7,\"div\"],[11,\"class\",\"navbar-brand\"],[11,\"href\",\"#\"],[9],[0,\"she leads\"],[10]],\"parameters\":[]},null],[0,\"\\n    \"],[7,\"button\"],[11,\"class\",\"navbar-toggler\"],[11,\"data-toggle\",\"collapse\"],[11,\"data-target\",\"#navbarSupportedContent\"],[11,\"aria-controls\",\"navbarSupportedContent\"],[11,\"aria-expanded\",\"false\"],[11,\"aria-label\",\"Toggle navigation\"],[11,\"type\",\"button\"],[9],[0,\"\\n      \"],[7,\"span\"],[11,\"class\",\"navbar-toggler-icon\"],[9],[10],[0,\"\\n    \"],[10],[0,\"\\n    \"],[7,\"div\"],[11,\"class\",\"collapse navbar-collapse\"],[11,\"id\",\"navbarSupportedContent\"],[9],[0,\"\\n      \"],[7,\"ul\"],[11,\"class\",\"navbar-nav mr-auto\"],[9],[0,\"\\n       \"],[7,\"li\"],[11,\"class\",\"navbar-link nav-item\"],[9],[0,\"\\n          \"],[4,\"link-to\",[\"about\"],null,{\"statements\":[[7,\"div\"],[11,\"class\",\"nav-link\"],[11,\"href\",\"#\"],[9],[0,\"About\"],[10]],\"parameters\":[]},null],[0,\"\\n       \"],[10],[0,\"\\n       \"],[2,\"<li class=\\\"navbar-link nav-item\\\">\\n          <div class=\\\"nav-link\\\" href=\\\"#\\\">Mentors</div>\\n       </li>\"],[0,\"\\n\"],[4,\"if\",[[23,[\"isAdmin\"]]],null,{\"statements\":[[0,\"          \"],[7,\"li\"],[11,\"class\",\"navbar-link nav-item\"],[9],[0,\"\\n          \"],[4,\"link-to\",[\"admin\"],null,{\"statements\":[[7,\"div\"],[11,\"class\",\"nav-link\"],[11,\"href\",\"#\"],[9],[0,\"Admin\"],[10]],\"parameters\":[]},null],[0,\"\\n          \"],[10],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"          \"],[7,\"li\"],[11,\"class\",\"navbar-link nav-item\"],[9],[0,\"\\n           \"],[4,\"link-to\",[\"dashboard-page\"],null,{\"statements\":[[7,\"div\"],[11,\"class\",\"nav-link\"],[11,\"href\",\"#\"],[9],[0,\"Dashboard\"],[10]],\"parameters\":[]},null],[0,\"\\n          \"],[10],[0,\"\\n          \"],[7,\"li\"],[11,\"class\",\"navbar-link nav-item\"],[9],[0,\"\\n            \"],[4,\"link-to\",[\"my-match\"],null,{\"statements\":[[7,\"div\"],[11,\"class\",\"nav-link\"],[11,\"href\",\"#\"],[9],[0,\"My Match\"],[10]],\"parameters\":[]},null],[0,\"\\n          \"],[10],[0,\"\\n          \"],[7,\"li\"],[11,\"class\",\"navbar-link nav-item\"],[9],[0,\"\\n           \"],[4,\"link-to\",[\"my-profile\"],null,{\"statements\":[[7,\"div\"],[11,\"class\",\"nav-link\"],[11,\"href\",\"#\"],[9],[0,\"My Profile\"],[10]],\"parameters\":[]},null],[0,\"\\n          \"],[10],[0,\"\\n\"]],\"parameters\":[]}],[0,\"\\n      \"],[10],[0,\"\\n\\n      \"],[4,\"link-to\",[\"main\"],null,{\"statements\":[[7,\"div\"],[11,\"class\",\"logout\"],[11,\"style\",\"color: white;\"],[11,\"href\",\"#\"],[3,\"action\",[[22,0,[]],\"logout\"]],[9],[0,\"Log Out\"],[10]],\"parameters\":[]},null],[0,\"\\n\\n    \"],[10],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"    \"],[4,\"link-to\",[\"main\"],null,{\"statements\":[[7,\"div\"],[11,\"class\",\"navbar-brand\"],[11,\"href\",\"#\"],[9],[0,\"she leads\"],[10]],\"parameters\":[]},null],[0,\"\\n        \"],[7,\"button\"],[11,\"class\",\"navbar-toggler\"],[11,\"data-toggle\",\"collapse\"],[11,\"data-target\",\"#navbarSupportedContent\"],[11,\"aria-controls\",\"navbarSupportedContent\"],[11,\"aria-expanded\",\"false\"],[11,\"aria-label\",\"Toggle navigation\"],[11,\"type\",\"button\"],[9],[0,\"\\n      \"],[7,\"span\"],[11,\"class\",\"navbar-toggler-icon\"],[9],[10],[0,\"\\n    \"],[10],[0,\"\\n    \"],[7,\"div\"],[11,\"class\",\"collapse navbar-collapse\"],[11,\"id\",\"navbarSupportedContent\"],[9],[0,\"\\n      \"],[7,\"ul\"],[11,\"class\",\"navbar-nav mr-auto\"],[9],[0,\"\\n        \"],[7,\"li\"],[11,\"class\",\"navbar-link nav-item\"],[9],[0,\"\\n          \"],[4,\"link-to\",[\"about\"],null,{\"statements\":[[7,\"div\"],[11,\"class\",\"nav-link\"],[11,\"href\",\"#\"],[9],[0,\"About\"],[10]],\"parameters\":[]},null],[0,\"\\n        \"],[10],[0,\"\\n        \"],[2,\"<li class=\\\"navbar-link nav-item\\\">\\n          <div class=\\\"nav-link\\\" href=\\\"#\\\">Mentors</div>\\n        </li>\"],[0,\"\\n      \"],[10],[0,\"\\n      \"],[4,\"link-to\",[\"login\"],null,{\"statements\":[[7,\"div\"],[11,\"class\",\"logout\"],[11,\"style\",\"color: white;\"],[11,\"href\",\"#\"],[9],[0,\"Log In\"],[10]],\"parameters\":[]},null],[0,\"\\n    \"],[10],[0,\"\\n\"]],\"parameters\":[]}],[10],[0,\"\\n\\n\\n\"],[1,[21,\"outlet\"],false],[0,\"\\n\\n\"],[10],[0,\"\\n\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "iwnad/templates/application.hbs" } });
});
;define("iwnad/templates/components/dashboard-module", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "yTbAqe3+", "block": "{\"symbols\":[\"resource\",\"file\",\"resource\",\"file\",\"&default\"],\"statements\":[[14,5],[0,\"\\n\"],[7,\"div\"],[11,\"class\",\"dashboard-module\"],[9],[0,\"\\n\"],[4,\"if\",[[27,\"get-dashboard-module-status\",[[23,[\"status\"]]],null]],null,{\"statements\":[[0,\"\\t\"],[7,\"div\"],[11,\"class\",\"row module-active-header\"],[9],[0,\"\\n\\t\\t\"],[7,\"div\"],[11,\"class\",\"col\"],[9],[0,\"\\n\\t\\t\\t\"],[7,\"h1\"],[11,\"class\",\"large-blue-text\"],[9],[1,[23,[\"module\",\"phaseid\"]],false],[0,\". \"],[1,[23,[\"module\",\"phase\",\"name\"]],false],[10],[0,\"\\n\\t\\t\\t\"],[1,[23,[\"module\",\"phase\",\"description\"]],false],[0,\" \"],[7,\"br\"],[9],[10],[0,\"\\n\\t\\t\\t\"],[7,\"strong\"],[9],[0,\"Suggested Time Frame:\"],[10],[0,\" \"],[1,[23,[\"module\",\"phase\",\"duedate\"]],false],[0,\"\\n\\t\\t\"],[10],[0,\"\\n\\n\\t\\t\"],[7,\"div\"],[11,\"class\",\"col status\"],[9],[0,\"\\n\\t\\t\\t\"],[7,\"span\"],[12,\"style\",[28,[\"color: \",[27,\"get-status-color\",[[23,[\"status\"]]],null],\";\"]]],[9],[1,[21,\"status\"],false],[10],[0,\"\\n\\t\\t\"],[10],[0,\"\\n\\t\"],[10],[0,\"\\n\\n\\t\"],[7,\"div\"],[11,\"class\",\"row module-active\"],[9],[0,\"\\n\\t\\t\"],[7,\"div\"],[11,\"class\",\"col-8 module-active-right-bar\"],[9],[0,\"\\n\\t\\t\\t\"],[7,\"h3\"],[11,\"class\",\"large-blue-text\"],[9],[0,\"Files\"],[10],[0,\"\\n\"],[4,\"if\",[[23,[\"module\",\"doclinks\"]]],null,{\"statements\":[[4,\"each\",[[23,[\"currentFiles\"]]],null,{\"statements\":[[4,\"if\",[[27,\"gt\",[[23,[\"permissions\"]],1],null]],null,{\"statements\":[[0,\"\\t\\t\\t\\t\\t\\t\"],[7,\"div\"],[11,\"class\",\"row\"],[9],[0,\"\\n\\t\\t\\t\\t\\t\\t\\t\"],[7,\"div\"],[11,\"class\",\"col-6\"],[11,\"style\",\"margin-bottom: 20px;\"],[9],[0,\"\\n\\t\\t\\t\\t\\t\\t\\t  \\t\"],[7,\"img\"],[11,\"style\",\"width: 15px;\"],[11,\"src\",\"https://svgsilh.com/svg_v2/308487.svg\"],[9],[10],[0,\"\\n\\t\\t\\t\\t\\t\\t\\t  \\t\"],[7,\"a\"],[12,\"href\",[22,4,[\"link\"]]],[11,\"target\",\"_blank\"],[9],[1,[22,4,[\"name\"]],false],[10],[0,\"\\n\\t\\t\\t\\t\\t\\t\\t\"],[10],[0,\"\\n\\n\\t\\t\\t\\t\\t\\t\\t\"],[7,\"div\"],[11,\"class\",\"col\"],[9],[0,\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\"],[7,\"div\"],[11,\"class\",\"button-text\"],[3,\"action\",[[22,0,[]],\"linkFileDelete\",[22,4,[\"doclinkid\"]]]],[9],[0,\"DELETE\"],[10],[0,\"\\n\\t\\t\\t\\t\\t\\t\\t\"],[10],[0,\"\\n\\t\\t\\t\\t\\t\\t\"],[10],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"\\t\\t\\t\\t\\t\\t\"],[7,\"div\"],[11,\"style\",\"width: 100%; margin-bottom: 20px;\"],[9],[0,\"\\n\\t\\t\\t\\t\\t\\t  \\t\"],[7,\"img\"],[11,\"style\",\"width: 15px;\"],[11,\"src\",\"https://svgsilh.com/svg_v2/308487.svg\"],[9],[10],[0,\"\\n\\t\\t\\t\\t\\t\\t  \\t\"],[7,\"a\"],[12,\"href\",[22,4,[\"link\"]]],[11,\"target\",\"_blank\"],[9],[1,[22,4,[\"name\"]],false],[10],[0,\"\\n\\t\\t\\t\\t\\t\\t\"],[10],[0,\"\\n\"]],\"parameters\":[]}]],\"parameters\":[4]},null],[0,\"\\t\\t\\t\\t\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"\\t\\t\\tNo files yet.\\n\\t\\t\\t\"],[7,\"br\"],[9],[10],[0,\"\\n\\t\\t\\t\"],[7,\"br\"],[9],[10],[0,\"\\n\"]],\"parameters\":[]}],[0,\"\\n\"],[4,\"if\",[[27,\"gt\",[[23,[\"permissions\"]],1],null]],null,{\"statements\":[[0,\"\\t\\t\\t    \"],[7,\"button\"],[11,\"class\",\"link-button\"],[3,\"action\",[[22,0,[]],\"onApiLoad\"]],[9],[0,\"Attach a Google Drive File\"],[10],[0,\"\\n\\t\\t\\t\\t\"],[2,\"<div class=\\\"row\\\">\\n\\t\\t\\t\\t    <div class=\\\"col\\\">\\n\\t\\t\\t\\t      {{input class=\\\"link-input\\\" placeholder=\\\"File Name\\\" type=\\\"text\\\" value=linkTitle}}\\n\\t\\t\\t\\t    </div>\\n\\t\\t\\t\\t    <div class=\\\"col-6\\\">\\n\\t\\t\\t\\t      {{input class=\\\"link-input\\\" placeholder=\\\"Insert Google Drive link here i.e. https://drive.google.com/235..\\\" type=\\\"text\\\" value=link}}\\n\\n{{#if invalidLink}}\\n\\t\\t\\t\\t\\t\\t<h6 style=\\\"color: #FF583E;\\\"> Please input a valid Google Drive link.</h6>\\n\\t\\t\\t\\t\\t  {{/if}}\\n{{#if emptyLink}}\\n\\t\\t\\t\\t\\t  \\t<h6 style=\\\"color: #FF583E;\\\"> Please input both a title & link. </h6>\\n\\t\\t\\t\\t\\t  {{/if}}\\n\\n\\t\\t\\t\\t    </div>\\n\\t\\t\\t\\t    <div class=\\\"col\\\">\\n\\t\\t\\t\\t      <button {{action \\\"linkFile\\\"}} class=\\\"link-button\\\">LINK</button>\\n\\t\\t\\t\\t      <div {{action \\\"authenticateSession\\\"}}>Login</div>\\n\\t\\t\\t\\t    </div>\\n\\t \\t\\t\\t</div>\"],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\\t\\t\"],[10],[0,\"\\n\\t\\t\"],[7,\"div\"],[11,\"class\",\"col-4\"],[9],[0,\"\\n\\t\\t\\t\"],[7,\"div\"],[11,\"class\",\"resources-section\"],[9],[0,\"\\n\\t\\t\\t\\t\"],[7,\"h3\"],[11,\"class\",\"large-blue-text\"],[9],[0,\"Resources\"],[10],[0,\"\\n\\t\\t\\t\\t\"],[7,\"ol\"],[9],[0,\"\\n\"],[4,\"each\",[[23,[\"module\",\"phase\",\"resources\"]]],null,{\"statements\":[[0,\"\\t\\t\\t\\t\\t\"],[7,\"li\"],[9],[7,\"a\"],[11,\"target\",\"_blank\"],[12,\"href\",[22,3,[\"link\"]]],[9],[1,[22,3,[\"name\"]],false],[10],[10],[0,\"\\n\"]],\"parameters\":[3]},null],[0,\"\\t\\t\\t\\t\"],[10],[0,\"\\n\\t\\t\\t\"],[10],[0,\"\\n\\t\\t\"],[10],[0,\"\\t\\n\\n\\t\\t\"],[7,\"div\"],[11,\"class\",\"approve-request-row row\"],[9],[0,\"\\n\\t\\t\\t\"],[7,\"div\"],[11,\"class\",\"col-8 module-active-right-bar\"],[9],[0,\"\\n\\t\\t\\t\"],[10],[0,\"\\n\\t\\t\\t\"],[7,\"div\"],[11,\"class\",\"col-4\"],[11,\"style\",\"text-align: center;\"],[9],[0,\"\\n\"],[4,\"if\",[[27,\"gt\",[[23,[\"permissions\"]],1],null]],null,{\"statements\":[[4,\"if\",[[23,[\"programEnded\"]]],null,{\"statements\":[],\"parameters\":[]},{\"statements\":[[0,\"\\t\\t\\t\\t\\t\"],[7,\"button\"],[11,\"class\",\"request-feedback-button\"],[3,\"action\",[[22,0,[]],\"toggleModal\"]],[9],[0,\"REQUEST FEEDBACK\"],[10],[0,\"\\n\\n\"],[4,\"if\",[[23,[\"isShowingModal\"]]],null,{\"statements\":[[4,\"modal-dialog\",null,[[\"onClose\",\"targetAttachment\",\"translucentOverlay\"],[\"toggleModal\",\"center\",true]],{\"statements\":[[0,\"\\t\\t\\t\\t\\t    \"],[7,\"div\"],[11,\"class\",\"cancel-button\"],[3,\"action\",[[22,0,[]],\"toggleModal\"]],[9],[7,\"strong\"],[9],[0,\"x\"],[10],[10],[0,\"\\n\\t\\t\\t\\t\\t    \"],[7,\"h3\"],[11,\"class\",\"large-blue-text\"],[9],[0,\"Request Feedback\"],[10],[0,\"\\n\\t\\t\\t\\t\\t    Let your mentor know you’re looking for some help!\"],[7,\"br\"],[9],[10],[0,\"Your mentor will either reply through email or by commenting on your Google Doc.\\n\\t\\t\\t\\t\\t    \"],[7,\"br\"],[9],[10],[0,\"\\n\\t\\t\\t\\t\\t    \"],[7,\"br\"],[9],[10],[0,\"\\n\\t\\t\\t\\t\\t    \"],[1,[27,\"textarea\",null,[[\"class\",\"placeholder\",\"type\",\"value\"],[\"modal-textarea\",\"Hey Mentor, I’m looking for feedback on my Marketing timeline and was wondering if you could check the new events I added to see if I’ll have the budget for it. Thanks! \",\"textarea\",[23,[\"feedbackMessage\"]]]]],false],[0,\"\\n\"],[4,\"if\",[[23,[\"emptyFeedback\"]]],null,{\"statements\":[[0,\"\\t\\t\\t\\t\\t\\t\\t\"],[7,\"h6\"],[11,\"style\",\"color: #FF583E;\"],[9],[0,\" Please tell your mentor what you want feedback on.\"],[10],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\t\\t\\t\\t\\t\\t\"],[7,\"br\"],[9],[10],[0,\"\\n\\t\\t\\t\\t\\t\\t\"],[7,\"br\"],[9],[10],[0,\"\\n\\t\\t\\t\\t\\t    \"],[7,\"button\"],[11,\"class\",\"request-feedback-button\"],[3,\"action\",[[22,0,[]],\"toggleModalRequest\",[23,[\"feedbackMessage\"]]]],[9],[0,\"REQUEST FEEDBACK\"],[10],[0,\"\\n\\t\\t\\t\\t\\t    \\n\"]],\"parameters\":[]},null]],\"parameters\":[]},null]],\"parameters\":[]}]],\"parameters\":[]},{\"statements\":[[4,\"if\",[[23,[\"programEnded\"]]],null,{\"statements\":[],\"parameters\":[]},{\"statements\":[[0,\"\\t\\t\\t\\t\\t\"],[7,\"button\"],[11,\"class\",\"request-feedback-button\"],[3,\"action\",[[22,0,[]],\"toggleModal\"]],[9],[0,\"APPROVE🎉\"],[10],[0,\"\\n\\n\"],[4,\"if\",[[23,[\"isShowingModal\"]]],null,{\"statements\":[[4,\"modal-dialog\",null,[[\"onClose\",\"targetAttachment\",\"translucentOverlay\"],[\"toggleModal\",\"center\",true]],{\"statements\":[[0,\"\\t\\t\\t\\t\\t    \\t\"],[7,\"h3\"],[11,\"class\",\"large-blue-text\"],[9],[0,\"Are You Sure?\"],[10],[0,\"\\n\\t\\t\\t\\t\\t\\t    You cannot undo this.\\n\\t\\t\\t\\t\\t\\t    \"],[7,\"br\"],[9],[10],[0,\"\\n\\t\\t\\t\\t\\t\\t    \"],[7,\"button\"],[11,\"class\",\"yes-button\"],[3,\"action\",[[22,0,[]],\"toggleModalApprove\"]],[9],[0,\"Yes\"],[10],[0,\"\\n\\t\\t\\t\\t\\t\\t    \"],[7,\"button\"],[11,\"class\",\"no-button\"],[3,\"action\",[[22,0,[]],\"toggleModal\"]],[9],[0,\"No\"],[10],[0,\"\\n\"]],\"parameters\":[]},null]],\"parameters\":[]},null]],\"parameters\":[]}]],\"parameters\":[]}],[0,\"\\t\\t\\t\"],[10],[0,\"\\n\\t\\t\"],[10],[0,\"\\n\\t\"],[10],[0,\"\\n\\n\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"\\n\\t\"],[7,\"div\"],[11,\"class\",\"row module-inactive-header\"],[9],[0,\"\\n\\t\\t\"],[7,\"div\"],[11,\"class\",\"col\"],[9],[0,\"\\n\\t\\t\\t\"],[7,\"h1\"],[11,\"class\",\"large-blue-text\"],[9],[1,[23,[\"module\",\"phase\",\"phaseid\"]],false],[0,\". \"],[1,[23,[\"module\",\"phase\",\"name\"]],false],[10],[0,\"\\n\\t\\t\\t\"],[1,[23,[\"module\",\"phase\",\"description\"]],false],[0,\" \"],[7,\"br\"],[9],[10],[0,\"\\n\\t\\t\\t\"],[7,\"strong\"],[9],[0,\"Suggested Time Frame:\"],[10],[0,\" \"],[1,[23,[\"module\",\"phase\",\"duedate\"]],false],[0,\"\\n\\t\\t\"],[10],[0,\"\\n\\n\\t\\t\"],[7,\"div\"],[11,\"class\",\"col status\"],[9],[0,\"\\n\\t\\t\\t\"],[7,\"span\"],[12,\"style\",[28,[\"color: \",[27,\"get-status-color\",[[23,[\"status\"]]],null],\";\"]]],[9],[1,[21,\"status\"],false],[10],[0,\"\\n\\t\\t\"],[10],[0,\"\\n\\t\"],[10],[0,\"\\n\\n\\t\"],[7,\"div\"],[11,\"class\",\"row module-inactive\"],[9],[0,\"\\n\\t\\t\"],[7,\"div\"],[11,\"class\",\"col-8 module-active-right-bar\"],[9],[0,\"\\n\\t\\t\\t\"],[7,\"h3\"],[11,\"class\",\"large-blue-text\"],[9],[0,\"Files\"],[10],[0,\"\\n\"],[4,\"if\",[[23,[\"module\",\"doclinks\"]]],null,{\"statements\":[[0,\"\\t\\t\\t\"],[7,\"div\"],[11,\"class\",\"row\"],[9],[0,\"\\n\"],[4,\"each\",[[23,[\"currentFiles\"]]],null,{\"statements\":[[0,\"\\t\\t\\t\\t\\t\\t\"],[7,\"div\"],[11,\"style\",\"width: 100%; margin-bottom: 20px;\"],[9],[0,\"\\n\\t\\t\\t\\t\\t\\t  \\t\"],[7,\"img\"],[11,\"style\",\"width: 15px;\"],[11,\"src\",\"https://svgsilh.com/svg_v2/308487.svg\"],[9],[10],[0,\"\\n\\t\\t\\t\\t\\t\\t  \\t\"],[7,\"a\"],[12,\"href\",[22,2,[\"link\"]]],[11,\"target\",\"_blank\"],[9],[1,[22,2,[\"name\"]],false],[10],[0,\"\\n\\t\\t\\t\\t\\t\\t\"],[10],[0,\"\\n\"]],\"parameters\":[2]},null],[0,\"\\t\\t\\t\"],[10],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"\\t\\t\\t\\tNo files yet.\\n\"]],\"parameters\":[]}],[0,\"\\t\\t\\t\\n\\t\\t\"],[10],[0,\"\\n\\t\\t\"],[7,\"div\"],[11,\"class\",\"col-4\"],[9],[0,\"\\n\\t\\t\\t\"],[7,\"div\"],[11,\"class\",\"resources-section\"],[9],[0,\"\\n\\t\\t\\t\\t\"],[7,\"h3\"],[11,\"class\",\"large-blue-text\"],[9],[0,\"Resources\"],[10],[0,\"\\n\\t\\t\\t\\t\"],[7,\"ol\"],[9],[0,\"\\n\"],[4,\"each\",[[23,[\"module\",\"phase\",\"resources\"]]],null,{\"statements\":[[0,\"\\t\\t\\t\\t\\t\"],[7,\"li\"],[9],[7,\"a\"],[11,\"target\",\"_blank\"],[12,\"href\",[22,1,[\"link\"]]],[9],[1,[22,1,[\"name\"]],false],[10],[10],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"\\t\\t\\t\\t\"],[10],[0,\"\\n\\t\\t\\t\"],[10],[0,\"\\n\\t\\t\"],[10],[0,\"\\n\\t\"],[10],[0,\"\\n\\n\"]],\"parameters\":[]}],[0,\"\\n\"],[10]],\"hasEval\":false}", "meta": { "moduleName": "iwnad/templates/components/dashboard-module.hbs" } });
});
;define("iwnad/templates/dashboard-page", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "SFXtsDB4", "block": "{\"symbols\":[\"phase\",\"phase\"],\"statements\":[[7,\"div\"],[11,\"class\",\"dashboard-background\"],[9],[0,\"\\n\\t\"],[7,\"div\"],[11,\"class\",\"component-padding\"],[9],[0,\"\\n\\t\\t\"],[7,\"div\"],[11,\"class\",\"row\"],[9],[0,\"\\n\\t\\t\\t\"],[7,\"div\"],[11,\"class\",\"col-8 extra-large-blue-text\"],[9],[0,\"\\n\\t\\t\\t\\tWelcome Back!\\n\\t\\t\\t\"],[10],[0,\"\\n\\n\\t\\t\\t\"],[7,\"div\"],[11,\"class\",\"col-4\"],[9],[0,\"\\n\\t\\t\\t\\t\"],[7,\"div\"],[11,\"class\",\"match-card\"],[9],[0,\"\\n\\t\\t\\t\\t\\t\"],[7,\"span\"],[11,\"style\",\"font-family: 'Muli-Bold'\"],[9],[0,\"YOUR MATCH:\"],[10],[0,\" \"],[7,\"br\"],[9],[10],[7,\"br\"],[9],[10],[0,\"\\n\\t\\t\\t\\t\\t\"],[1,[23,[\"currentMatch\",\"name\"]],false],[0,\" \"],[7,\"br\"],[9],[10],[0,\"\\n\\t\\t\\t\\t\\t\"],[1,[23,[\"currentMatch\",\"email\"]],false],[0,\" \"],[7,\"br\"],[9],[10],[0,\"\\n\\t\\t\\t\\t\\t\"],[1,[23,[\"currentMatch\",\"phone\"]],false],[7,\"br\"],[9],[10],[0,\"\\n\\t\\t\\t\\t\"],[10],[0,\"\\n\\t\\t\\t\"],[10],[0,\"\\n\\t\\t\"],[10],[0,\"\\n\\t\"],[10],[0,\"\\n\\n\"],[7,\"div\"],[11,\"style\",\"text-align: center; margin-bottom: 20px;\"],[9],[0,\"\\n\"],[4,\"if\",[[23,[\"programEnded\"]]],null,{\"statements\":[[0,\"\\t\"],[7,\"div\"],[11,\"class\",\"medium-text-red\"],[9],[1,[21,\"programEndedMessage\"],false],[10],[0,\"\\n\"]],\"parameters\":[]},null],[10],[0,\"\\n\\n\"],[7,\"div\"],[11,\"class\",\"nav-progress\"],[9],[0,\"\\n\"],[4,\"each\",[[23,[\"currentDashboard\",\"modules\"]]],null,{\"statements\":[[0,\"\\n\"],[4,\"if\",[[27,\"gt\",[[22,2,[\"phaseid\"]],[23,[\"currentDashboard\",\"currentphaseid\"]]],null]],null,{\"statements\":[[0,\"\\t\\t\\t\"],[7,\"div\"],[9],[0,\"\\n\\t\\t\\t\\t\"],[1,[22,2,[\"phaseid\"]],false],[0,\"\\n\\t\\t    \"],[7,\"div\"],[11,\"class\",\"arrow-wrapper\"],[9],[0,\"\\n\\t\\t      \"],[7,\"div\"],[11,\"class\",\"arrow-cover\"],[9],[0,\"\\n\\t\\t        \"],[7,\"div\"],[11,\"class\",\"arrow\"],[9],[10],[0,\"\\n\\t\\t      \"],[10],[0,\"\\n\\t\\t    \"],[10],[0,\"\\n\\t\\t\\t\"],[10],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[4,\"if\",[[27,\"lt\",[[22,2,[\"phaseid\"]],[23,[\"currentDashboard\",\"currentphaseid\"]]],null]],null,{\"statements\":[[0,\"\\t\\t\\t\"],[7,\"div\"],[11,\"class\",\"complete\"],[9],[0,\"\\n\\t\\t\\t\\t\"],[1,[22,2,[\"phaseid\"]],false],[0,\"\\n\\t\\t    \"],[7,\"div\"],[11,\"class\",\"arrow-wrapper\"],[9],[0,\"\\n\\t\\t      \"],[7,\"div\"],[11,\"class\",\"arrow-cover\"],[9],[0,\"\\n\\t\\t        \"],[7,\"div\"],[11,\"class\",\"arrow\"],[9],[10],[0,\"\\n\\t\\t      \"],[10],[0,\"\\n\\t\\t    \"],[10],[0,\"\\n\\t\\t\\t\"],[10],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"\\t\\t\\t\"],[7,\"div\"],[11,\"class\",\"active\"],[9],[0,\"\\n\\t\\t\\t\\t\"],[1,[22,2,[\"phaseid\"]],false],[0,\"\\n\\t\\t    \"],[7,\"div\"],[11,\"class\",\"arrow-wrapper\"],[9],[0,\"\\n\\t\\t      \"],[7,\"div\"],[11,\"class\",\"arrow-cover\"],[9],[0,\"\\n\\t\\t        \"],[7,\"div\"],[11,\"class\",\"arrow\"],[9],[10],[0,\"\\n\\t\\t      \"],[10],[0,\"\\n\\t\\t    \"],[10],[0,\"\\n\\t\\t\\t\"],[10],[0,\"\\n\\t\\t\"]],\"parameters\":[]}]],\"parameters\":[]}],[0,\"\\t\\t\\n\"]],\"parameters\":[2]},null],[10],[0,\"\\n\\n\"],[4,\"each\",[[23,[\"currentDashboard\",\"modules\"]]],null,{\"statements\":[[4,\"if\",[[27,\"gt\",[[22,1,[\"phaseid\"]],[23,[\"currentDashboard\",\"currentphaseid\"]]],null]],null,{\"statements\":[[0,\"\\t\\t\"],[1,[27,\"dashboard-module\",null,[[\"module\",\"status\",\"permissions\",\"programEnded\"],[[22,1,[]],\"NEXT STEP\",[23,[\"currentUser\",\"permissions\"]],[23,[\"programEnded\"]]]]],false],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[4,\"if\",[[27,\"lt\",[[22,1,[\"phaseid\"]],[23,[\"currentDashboard\",\"currentphaseid\"]]],null]],null,{\"statements\":[[0,\"\\t\\t\"],[1,[27,\"dashboard-module\",null,[[\"module\",\"status\",\"permissions\",\"programEnded\"],[[22,1,[]],\"COMPLETED\",[23,[\"currentUser\",\"permissions\"]],[23,[\"programEnded\"]]]]],false],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"\\t\\t\"],[1,[27,\"dashboard-module\",null,[[\"module\",\"status\",\"permissions\",\"programEnded\"],[[22,1,[]],\"IN PROGRESS\",[23,[\"currentUser\",\"permissions\"]],[23,[\"programEnded\"]]]]],false],[0,\"\\n\\t\"]],\"parameters\":[]}]],\"parameters\":[]}]],\"parameters\":[1]},null],[0,\"\\n\"],[7,\"br\"],[9],[10],[0,\"\\n\"],[7,\"br\"],[9],[10],[0,\"\\n\"],[10],[0,\"\\n\"],[1,[21,\"outlet\"],false]],\"hasEval\":false}", "meta": { "moduleName": "iwnad/templates/dashboard-page.hbs" } });
});
;define("iwnad/templates/login", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "bB85XWN1", "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[7,\"div\"],[11,\"class\",\"component-padding\"],[9],[0,\"\\n\\t\"],[7,\"div\"],[11,\"class\",\"row\"],[9],[0,\"\\n\\t  \"],[7,\"div\"],[11,\"class\",\"col-md-4\"],[9],[0,\"\\n\\t  \\t\"],[7,\"img\"],[11,\"style\",\"width: 100%;\"],[11,\"src\",\"/assets/images/join-club.png\"],[9],[10],[0,\"\\n\\t  \"],[10],[0,\"\\n\\t  \"],[7,\"div\"],[11,\"class\",\"login-text col-md-8\"],[9],[0,\"\\n\\t  \\t\"],[7,\"h1\"],[11,\"class\",\"large-text\"],[9],[0,\"Log In\"],[10],[0,\"\\n\\t\\t\\t\"],[7,\"br\"],[9],[10],[0,\"\\n\\t\\t\\t\"],[7,\"h6\"],[11,\"required\",\"required\"],[11,\"class\",\"small-text\"],[9],[0,\"Email Address\"],[7,\"span\"],[11,\"style\",\"color: #E36364;\"],[9],[0,\" *\"],[10],[10],[0,\"\\n    \\t\"],[1,[27,\"input\",null,[[\"name\",\"value\"],[\"email\",[23,[\"email\"]]]]],false],[0,\"\\n\\t\\t\\t\"],[7,\"br\"],[9],[10],[0,\"\\n\\t\\t\\t\"],[7,\"br\"],[9],[10],[0,\"\\n\\t\\t\\t\"],[7,\"h6\"],[11,\"required\",\"required\"],[11,\"class\",\"small-text\"],[9],[0,\"Password\"],[7,\"span\"],[11,\"style\",\"color: #E36364;\"],[9],[0,\" *\"],[10],[10],[0,\"\\n\\t\\t\\t\"],[1,[27,\"input\",null,[[\"type\",\"name\",\"value\"],[\"password\",\"password\",[23,[\"password\"]]]]],false],[0,\"\\n\\t\\t\\t\"],[7,\"br\"],[9],[10],[0,\"\\n\\t\\t\\t\"],[7,\"br\"],[9],[10],[0,\"\\n\\n\"],[4,\"if\",[[23,[\"emptyForm\"]]],null,{\"statements\":[[0,\"\\t\\t\\t\\t\"],[7,\"h6\"],[11,\"style\",\"color: #E36364;\"],[9],[0,\"*Username and password are required\"],[10],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\"],[4,\"if\",[[23,[\"failedLogin\"]]],null,{\"statements\":[[0,\"\\t\\t\\t\\t\"],[7,\"h6\"],[11,\"style\",\"color: #E36364;\"],[9],[0,\"*Username or password is incorrect\"],[10],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\\t\\t\\t\"],[7,\"div\"],[11,\"class\",\"button-div\"],[9],[0,\"\\n\\t\\t\\t\\t\"],[7,\"button\"],[11,\"class\",\"submit-button\"],[3,\"action\",[[22,0,[]],\"login\"]],[9],[0,\"Next\"],[10],[0,\"\\n\\t\\t\\t\"],[10],[0,\"\\n\\t  \"],[10],[0,\"\\n\\t\"],[10],[0,\"\\n\"],[10],[0,\"\\n\\n\"],[1,[21,\"outlet\"],false],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "iwnad/templates/login.hbs" } });
});
;define("iwnad/templates/magic", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "2n1goBJV", "block": "{\"symbols\":[],\"statements\":[[7,\"div\"],[11,\"class\",\"component-padding\"],[9],[0,\"\\n  \"],[7,\"div\"],[11,\"class\",\"row\"],[9],[0,\"\\n    \"],[7,\"div\"],[11,\"class\",\"col-md-4\"],[9],[0,\"\\n    \\t\"],[7,\"img\"],[11,\"style\",\"width: 300px;\"],[11,\"src\",\"/assets/images/welcome-mentorship.png\"],[9],[10],[0,\"\\n    \"],[10],[0,\"\\n    \"],[7,\"div\"],[11,\"class\",\"login-text col-md-8\"],[9],[0,\"\\n    \\t\"],[7,\"h1\"],[11,\"class\",\"large-text\"],[9],[0,\"Congratulations!\"],[10],[0,\"\\n    \\t\"],[7,\"h6\"],[11,\"class\",\"medium-text\"],[9],[0,\"You’ve made it to the She Leads Mentorship Program. Check your email for a magic code!\"],[10],[0,\"\\n    \\t\"],[7,\"br\"],[9],[10],[0,\"\\n      \"],[7,\"h6\"],[11,\"class\",\"small-text\"],[9],[0,\"In order to have recieved a magic code, you will need to have won our Makeathon.\"],[7,\"br\"],[9],[10],[0,\"Click here to learn more. \"],[10],[0,\"\\n  \\t\"],[7,\"br\"],[9],[10],[0,\"\\n  \\t\"],[7,\"h6\"],[11,\"class\",\"small-text\"],[9],[0,\"Magic Code\"],[7,\"span\"],[11,\"style\",\"color: #FF583E;\"],[9],[0,\" *\"],[10],[10],[0,\"\\n  \\t\"],[7,\"input\"],[11,\"name\",\"code\"],[11,\"type\",\"text\"],[9],[10],[0,\"\\n\\n  \\t\"],[7,\"div\"],[11,\"class\",\"button-div\"],[9],[0,\"\\n  \\t\\t\"],[4,\"link-to\",[\"signup\"],null,{\"statements\":[[7,\"button\"],[11,\"class\",\"submit-button\"],[9],[0,\"Next\"],[10]],\"parameters\":[]},null],[0,\"\\n  \\t\"],[10],[0,\"\\n    \"],[10],[0,\"\\n  \"],[10],[0,\"\\n\"],[10],[0,\"\\n\"],[1,[21,\"outlet\"],false],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "iwnad/templates/magic.hbs" } });
});
;define("iwnad/templates/main", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "SBQGI9sa", "block": "{\"symbols\":[],\"statements\":[[7,\"div\"],[11,\"class\",\"welcome\"],[9],[0,\"\\n\\t\"],[7,\"div\"],[11,\"class\",\"row\"],[9],[0,\"\\n\\t  \"],[7,\"div\"],[11,\"class\",\"col\"],[9],[0,\"\\n\\t  \\t\"],[7,\"div\"],[11,\"class\",\"welcome-text\"],[9],[0,\"\\n\\t  \\t\\t\"],[7,\"div\"],[11,\"style\",\"margin-bottom: 10px;\"],[9],[0,\"\\n\\t\\t\\t  \\t\"],[7,\"h1\"],[11,\"class\",\"large-musket-text\"],[9],[0,\"Join the next generation\"],[10],[0,\"\\n\\t\\t\\t  \\t\"],[7,\"h1\"],[11,\"class\",\"large-musket-text\"],[9],[0,\"of female leaders.\"],[10],[0,\"\\n\\t\\t  \\t\"],[10],[0,\"\\n\\t\\t  \\t\"],[7,\"div\"],[11,\"class\",\"medium-white-text\"],[9],[0,\"We empower young women with the skills they need to start their own businesses and take control of their careers.\"],[10],[0,\"\\n\\t\\t\\t\"],[7,\"br\"],[9],[10],[0,\"\\n\\t\\t\\t\"],[7,\"div\"],[11,\"style\",\"width: 100%; vertical-align: middle;\"],[9],[0,\"\\n\\t\\t\\t\\t\"],[1,[27,\"input\",null,[[\"class\",\"placeholder\",\"value\"],[\"email-subscribe-box\",\"Email*\",[23,[\"email\"]]]]],false],[0,\"\\n\\t\\t\\t\\t\"],[7,\"button\"],[11,\"class\",\"subscribe-button\"],[3,\"action\",[[22,0,[]],\"subscribe\"]],[9],[0,\"SUBSCRIBE\"],[10],[0,\"\\n\\t\\t\\t\"],[10],[0,\"\\n\\t\\t\\t\"],[7,\"br\"],[9],[10],[7,\"br\"],[9],[10],[0,\"\\n\\t\\t\\t\"],[7,\"h6\"],[11,\"style\",\"color: #FF583E;\"],[9],[1,[21,\"message\"],false],[10],[0,\"\\n\\t\\t\\t\\n\\t  \\t\"],[10],[0,\"\\n\\t  \"],[10],[0,\"\\n\\t  \"],[7,\"div\"],[11,\"class\",\"col welcome-image\"],[9],[0,\"\\n\\t  \\t\"],[7,\"img\"],[11,\"style\",\"width: 600px;\"],[11,\"src\",\"/assets/images/homepage-main.png\"],[9],[10],[0,\"\\n\\t  \"],[10],[0,\"\\n\\t\"],[10],[0,\"\\n\"],[10],[0,\"\\n\\n\"],[7,\"div\"],[11,\"class\",\"looking-for\"],[9],[0,\"\\n\\t\"],[7,\"div\"],[11,\"class\",\"row looking-for-sub\"],[9],[0,\"\\n\\t\\t\"],[7,\"div\"],[11,\"class\",\"col-4 women-mug-image\"],[9],[0,\"\\n\\t\\t\\t\"],[7,\"img\"],[11,\"style\",\"width: 140%;\"],[11,\"src\",\"/assets/images/women-mug.png\"],[9],[10],[0,\"\\n\\t\\t\"],[10],[0,\"\\n\\n\\t\\t\"],[7,\"div\"],[11,\"class\",\"col-8 looking-for-right\"],[9],[0,\"\\n\\t\\t\\t\"],[7,\"h1\"],[11,\"class\",\"large-musket-text-blue\"],[9],[0,\"We are looking for\"],[10],[0,\"\\n\\t\\t\\t\"],[7,\"strong\"],[9],[0,\"Students\"],[10],[0,\" aged 14-16 who are creative thinkers, makers, and leaders.\\n\\t\\t\\t\"],[7,\"br\"],[9],[10],[7,\"br\"],[9],[10],[0,\"\\n\\t\\t\\t\"],[7,\"strong\"],[9],[0,\"Female founders\"],[10],[0,\" interested in breaking glass ceilings, mentoring future change-makers, and giving back to their community.\\n\\t\\t\\t\"],[7,\"br\"],[9],[10],[7,\"br\"],[9],[10],[0,\"\\n\\t\\t\\t\"],[7,\"strong\"],[9],[0,\"Partners\"],[10],[0,\" interested in financially supporting our mission,  getting your organization involved, and promoting your brand to our members.\\n\\t\\t\"],[10],[0,\"\\n\\t\"],[10],[0,\"\\n\"],[10],[0,\"\\n\\t\\n\"],[7,\"div\"],[11,\"class\",\"makeathon\"],[9],[0,\"\\t\\n\\t\\t\"],[7,\"h1\"],[11,\"class\",\"large-musket-text-red\"],[9],[0,\"Join us at our\"],[10],[0,\"\\n\\t\\t\"],[7,\"h1\"],[11,\"class\",\"large-musket-text-red\"],[9],[0,\"entrepreneurship makeathon.\"],[10],[0,\"\\n\\t\\t\"],[7,\"h4\"],[11,\"style\",\"margin-top: 15px;\"],[11,\"class\",\"medium-regular-musket-text-red\"],[9],[0,\"March 9-10th\"],[10],[0,\"\\n\\t\\t\"],[7,\"a\"],[11,\"target\",\"_blank\"],[11,\"href\",\"https://www.eventbrite.com/e/she-leads-entrepreneurship-makeathon-tickets-52561122733?utm-medium=discovery&utm-campaign=social&utm-content=attendeeshare&aff=escb&utm-source=cp&utm-term=eventcard\"],[9],[7,\"button\"],[11,\"class\",\"register-button\"],[9],[0,\"REGISTER\"],[10],[10],[0,\"\\n\\t\\t\"],[7,\"br\"],[9],[10],[0,\"\\n\\t\\t\"],[7,\"br\"],[9],[10],[0,\"\\n\\n\\t\\t\"],[7,\"div\"],[11,\"class\",\"row\"],[9],[0,\"\\n\\t\\t\\t\"],[7,\"div\"],[11,\"style\",\"text-align: center;\"],[11,\"class\",\"col-sm\"],[9],[0,\"\\n\\t\\t\\t\\t\"],[7,\"img\"],[11,\"style\",\"width: 250px;\"],[11,\"src\",\"/assets/images/attend-learn.png\"],[9],[10],[0,\"\\n\\t\\t\\t\\t\"],[7,\"div\"],[11,\"style\",\"margin-top: 10px;\"],[9],[0,\"\\n\\t\\t\\t\\t\\t\"],[7,\"h4\"],[11,\"class\",\"medium-musket-text-red\"],[9],[0,\"Attend and\"],[10],[0,\"\\n\\t\\t\\t\\t\\t\"],[7,\"h4\"],[11,\"class\",\"medium-musket-text-red\"],[9],[0,\"Learn.\"],[10],[0,\"\\n\\t\\t\\t\\t\\t\"],[7,\"div\"],[11,\"class\",\"small-text-red\"],[9],[0,\"Our workshops teach you the business and leadership skills to start a business in any industry.\"],[10],[0,\"\\n\\t\\t\\t\\t\"],[10],[0,\"\\n\\t\\t\\t\"],[10],[0,\"\\n\\t\\t\\t\\n\\t\\t\\t\"],[7,\"div\"],[11,\"style\",\"text-align: center;\"],[11,\"class\",\"col-sm\"],[9],[0,\"\\n\\t\\t\\t\\t\"],[7,\"img\"],[11,\"style\",\"width: 360px;\"],[11,\"src\",\"/assets/images/recieve-mentorship.png\"],[9],[10],[0,\"\\n\\t\\t\\t\\t\"],[7,\"div\"],[11,\"style\",\"margin-top: 10px;\"],[9],[0,\"\\n\\t\\t\\t\\t\\t\"],[7,\"h4\"],[11,\"class\",\"medium-musket-text-red\"],[9],[0,\"Receive\"],[10],[0,\"\\n\\t\\t\\t\\t\\t\"],[7,\"h4\"],[11,\"class\",\"medium-musket-text-red\"],[9],[0,\"Mentorship.\"],[10],[0,\"\\n\\t\\t\\t\\t\\t\"],[7,\"div\"],[11,\"class\",\"small-text-red\"],[9],[0,\"You won't be alone! After the makeathon, we will pair you with a female entrepreneur that will take you through the journey of starting your own business over the course of 5 months.\"],[10],[0,\"\\n\\t\\t\\t\\t\"],[10],[0,\"\\n\\t\\t\\t\"],[10],[0,\"\\n\\n\\t\\t\\t\"],[7,\"div\"],[11,\"style\",\"text-align: center;\"],[11,\"class\",\"col-sm\"],[9],[0,\"\\n\\t\\t\\t\\t\"],[7,\"img\"],[11,\"style\",\"width: 255px;\"],[11,\"src\",\"/assets/images/pitch-funds.png\"],[9],[10],[0,\"\\n\\t\\t\\t\\t\"],[7,\"div\"],[11,\"style\",\"margin-top: 10px;\"],[9],[0,\"\\n\\t\\t\\t\\t\\t\"],[7,\"h4\"],[11,\"class\",\"medium-musket-text-red\"],[9],[0,\"Pitch for\"],[10],[0,\" \\n\\t\\t\\t\\t\\t\"],[7,\"h4\"],[11,\"class\",\"medium-musket-text-red\"],[9],[0,\"Funds.\"],[10],[0,\"\\n\\t\\t\\t\\t\\t\"],[7,\"div\"],[11,\"class\",\"small-text-red\"],[9],[0,\"Pitch your ideas to investors. You will have the chance to earn funding to transform your ideas into reality!\"],[10],[0,\"\\n\\t\\t\\t\\t\"],[10],[0,\"\\n\\t\\t\\t\"],[10],[0,\"\\n\\t\\t\"],[10],[0,\"\\n\"],[10],[0,\"\\n\\n\"],[7,\"div\"],[11,\"class\",\"mentorship\"],[9],[0,\"\\n\\t\"],[7,\"div\"],[11,\"class\",\"mentorship-sub\"],[9],[0,\"\\n\\t\"],[7,\"div\"],[11,\"class\",\"row\"],[9],[0,\"\\n\\t\\t\"],[7,\"div\"],[11,\"class\",\"col mentorship-image\"],[9],[0,\"\\n\\t\\t\\t\"],[7,\"div\"],[11,\"style\",\"width: 100%; padding-bottom: 10%;\"],[9],[0,\"\\n\\t\\t\\t\\t\"],[7,\"h4\"],[11,\"class\",\"medium-musket-text-white\"],[9],[0,\"Connect with a mentor to lead you through your startup journey.\"],[10],[0,\" \\n\\t\\t\\t\"],[10],[0,\"\\n\\t\\t\\t\"],[7,\"div\"],[11,\"style\",\"width: 100%;\"],[9],[0,\"\\n\\t\\t\\t\\t\"],[7,\"img\"],[11,\"style\",\"width: 100%;\"],[11,\"src\",\"/assets/images/mentorship-pair.png\"],[9],[10],[0,\"\\n\\t\\t\\t\"],[10],[0,\"\\n\\t\\t\"],[10],[0,\"\\n\\n\\t\\t\"],[7,\"div\"],[11,\"class\",\"mentorship-text col\"],[9],[0,\"\\n\\t\\t\\t\"],[7,\"div\"],[11,\"style\",\"width: 100%; padding-bottom: 10%;\"],[9],[0,\"\\n\\t\\t\\t\\t\"],[7,\"h4\"],[11,\"class\",\"medium-musket-text-white\"],[9],[0,\"Resources\"],[10],[0,\"\\n\\t\\t\\t\\t\"],[7,\"div\"],[11,\"class\",\"small-text-white\"],[9],[0,\"We have curated the best resources to help you through each step of starting a business. \"],[10],[0,\"\\n\\t\\t\\t\"],[10],[0,\"\\n\\n\\t\\t\\t\"],[7,\"div\"],[11,\"style\",\"width: 100%; padding-bottom: 10%;\"],[9],[0,\"\\n\\t\\t\\t\\t\"],[7,\"h4\"],[11,\"class\",\"medium-musket-text-white\"],[9],[0,\"Accountability\"],[10],[0,\"\\n\\t\\t\\t\\t\"],[7,\"div\"],[11,\"class\",\"small-text-white\"],[9],[0,\"Meet or video call with your mentor, a female entrepreneur, who will be there to offer advice and guidance.\"],[10],[0,\"\\n\\t\\t\\t\"],[10],[0,\"\\n\\n\\t\\t\\t\"],[7,\"div\"],[11,\"style\",\"width: 100%; padding-bottom: 10%;\"],[9],[0,\"\\n\\t\\t\\t\\t\"],[7,\"h4\"],[11,\"class\",\"medium-musket-text-white\"],[9],[0,\"Leadership \"],[10],[0,\"\\n\\t\\t\\t\\t\"],[7,\"div\"],[11,\"class\",\"small-text-white\"],[9],[0,\"Challenge yourself and learn what it takes to be your own boss as you start your own company.\"],[10],[0,\"\\n\\t\\t\\t\"],[10],[0,\"\\n\\t\\t\"],[10],[0,\"\\n\\t\"],[10],[0,\"\\n\\t\"],[10],[0,\"\\n\"],[10],[0,\"\\n\\n\"],[7,\"div\"],[11,\"class\",\"makeathon\"],[9],[0,\"\\n\\t\"],[7,\"h1\"],[11,\"class\",\"large-musket-text-blue\"],[9],[0,\"Our Team\"],[10],[0,\"\\n\\t\"],[7,\"br\"],[9],[10],[0,\"\\n\\t\"],[7,\"div\"],[11,\"class\",\"row\"],[11,\"style\",\"margin-top: 50px;\"],[9],[0,\"\\n\\t\\t\"],[7,\"div\"],[11,\"class\",\"col\"],[9],[0,\"\\n\\t\\t\\t\"],[7,\"img\"],[11,\"style\",\"width: 150px; border-radius: 50%;\"],[11,\"src\",\"/assets/images/Avni.jpg\"],[9],[10],[0,\"\\n\\t\\t\\t\"],[7,\"div\"],[11,\"class\",\"medium-musket-text-blue\"],[9],[0,\"Avni Barman\"],[10],[0,\"\\n\\t\\t\\tCEO & Founder\\n\\t\\t\"],[10],[0,\"\\n\\t\\t\"],[7,\"div\"],[11,\"class\",\"col\"],[9],[0,\"\\n\\t\\t\\t\"],[7,\"img\"],[11,\"style\",\"width: 150px; border-radius: 50%;\"],[11,\"src\",\"/assets/images/Shirley.jpg\"],[9],[10],[0,\"\\n\\t\\t\\t\"],[7,\"div\"],[11,\"class\",\"medium-musket-text-blue\"],[9],[0,\"Shirley Huang\"],[10],[0,\"\\n\\t\\t\\tDesign\\n\\t\\t\"],[10],[0,\"\\t\\t\\n\\t\\t\"],[7,\"div\"],[11,\"class\",\"col\"],[9],[0,\"\\n\\t\\t\\t\"],[7,\"img\"],[11,\"style\",\"width: 150px; border-radius: 50%;\"],[11,\"src\",\"/assets/images/Angela.jpg\"],[9],[10],[0,\"\\n\\t\\t\\t\"],[7,\"div\"],[11,\"class\",\"medium-musket-text-blue\"],[9],[0,\"Angela Wu\"],[10],[0,\"\\n\\t\\t\\tDesign\\n\\t\\t\"],[10],[0,\"\\n\\t\\t\"],[7,\"div\"],[11,\"class\",\"col\"],[9],[0,\"\\n\\t\\t\\t\"],[7,\"img\"],[11,\"style\",\"width: 150px; border-radius: 50%;\"],[11,\"src\",\"/assets/images/Annie.jpg\"],[9],[10],[0,\"\\n\\t\\t\\t\"],[7,\"div\"],[11,\"class\",\"medium-musket-text-blue\"],[9],[0,\"Annie Oh\"],[10],[0,\"\\n\\t\\t\\tDesign\\n\\t\\t\"],[10],[0,\"\\n\\t\\t\"],[7,\"div\"],[11,\"class\",\"col\"],[9],[0,\"\\n\\t\\t\\t\"],[7,\"img\"],[11,\"style\",\"width: 150px; border-radius: 50%;\"],[11,\"src\",\"/assets/images/Dani.jpg\"],[9],[10],[0,\"\\n\\t\\t\\t\"],[7,\"div\"],[11,\"class\",\"medium-musket-text-blue\"],[9],[0,\"Dani Boyce\"],[10],[0,\"\\n\\t\\t\\tBrand\\n\\t\\t\"],[10],[0,\"\\n\\t\"],[10],[0,\"\\n\\n\\t\"],[7,\"div\"],[11,\"class\",\"row\"],[11,\"style\",\"margin-top: 50px;\"],[9],[0,\"\\n\\t\\t\"],[7,\"div\"],[11,\"class\",\"col\"],[9],[0,\"\\n\\t\\t\\t\"],[7,\"img\"],[11,\"style\",\"width: 150px; border-radius: 50%;\"],[11,\"src\",\"/assets/images/Melissa.jpg\"],[9],[10],[0,\"\\n\\t\\t\\t\"],[7,\"div\"],[11,\"class\",\"medium-musket-text-blue\"],[9],[0,\"Melissa Yang\"],[10],[0,\"\\n\\t\\t\\tSocial Media\\n\\t\\t\"],[10],[0,\"\\n\\t\\t\"],[7,\"div\"],[11,\"class\",\"col\"],[9],[0,\"\\n\\t\\t\\t\"],[7,\"img\"],[11,\"style\",\"width: 150px; border-radius: 50%;\"],[11,\"src\",\"/assets/images/Sarah.jpg\"],[9],[10],[0,\"\\n\\t\\t\\t\"],[7,\"div\"],[11,\"class\",\"medium-musket-text-blue\"],[9],[0,\"Sarah Kim\"],[10],[0,\"\\n\\t\\t\\tLogistics & Finance\\n\\t\\t\"],[10],[0,\"\\t\\t\\n\\t\\t\"],[7,\"div\"],[11,\"class\",\"col\"],[9],[0,\"\\n\\t\\t\\t\"],[7,\"img\"],[11,\"style\",\"width: 150px; border-radius: 50%;\"],[11,\"src\",\"/assets/images/Ilona.jpg\"],[9],[10],[0,\"\\n\\t\\t\\t\"],[7,\"div\"],[11,\"class\",\"medium-musket-text-blue\"],[9],[0,\"Ilona Bodnar\"],[10],[0,\"\\n\\t\\t\\tLogistics & Finance\\n\\t\\t\"],[10],[0,\"\\n\\t\\t\"],[7,\"div\"],[11,\"class\",\"col\"],[9],[0,\"\\n\\t\\t\\t\"],[7,\"img\"],[11,\"style\",\"width: 150px; border-radius: 50%;\"],[11,\"src\",\"/assets/images/Marissa.jpg\"],[9],[10],[0,\"\\n\\t\\t\\t\"],[7,\"div\"],[11,\"class\",\"medium-musket-text-blue\"],[9],[0,\"Marissa Vergel de Dios\"],[10],[0,\"\\n\\t\\t\\tCorporate Affairs\\n\\t\\t\"],[10],[0,\"\\n\\t\\t\"],[7,\"div\"],[11,\"class\",\"col\"],[9],[0,\"\\n\\t\\t\\t\"],[7,\"img\"],[11,\"style\",\"width: 150px; border-radius: 50%;\"],[11,\"src\",\"/assets/images/Kaitlyn.jpg\"],[9],[10],[0,\"\\n\\t\\t\\t\"],[7,\"div\"],[11,\"class\",\"medium-musket-text-blue\"],[9],[0,\"Kaitlyn Chu\"],[10],[0,\"\\n\\t\\t\\tPartnerships\\n\\t\\t\"],[10],[0,\"\\n\\t\"],[10],[0,\"\\n\\n\\t\"],[7,\"div\"],[11,\"class\",\"medium-musket-text-blue\"],[11,\"style\",\"margin-top: 50px;\"],[9],[0,\" and more!\"],[10],[0,\"\\n\"],[10],[0,\"\\n\\n\"],[7,\"div\"],[11,\"class\",\"contact\"],[9],[0,\"\\n\\t\"],[7,\"div\"],[11,\"class\",\"contact-sub\"],[9],[0,\"\\n\\t\\t\"],[7,\"div\"],[11,\"class\",\"row\"],[9],[0,\"\\n\\t\\t\\t\"],[7,\"div\"],[11,\"class\",\"col\"],[9],[0,\"\\n\\t\\t\\t\\t\"],[7,\"img\"],[11,\"style\",\"width: 450px;\"],[11,\"src\",\"/assets/images/girl-laptop.png\"],[9],[10],[0,\"\\n\\t\\t\\t\"],[10],[0,\"\\n\\n\\t\\t\\t\"],[7,\"div\"],[11,\"class\",\"col\"],[11,\"style\",\" padding-top: 15%; padding-bottom: 15%; text-align: center;\"],[9],[0,\"\\n\\t\\t\\t\\t\"],[7,\"h1\"],[11,\"class\",\"large-musket-text-dark-blue\"],[9],[0,\"Contact Us\"],[10],[0,\"\\n\\t\\t\\t\\t\\t508-469-9409 | contact@sheleads.io\\n\\t\\t\\t\\t\"],[7,\"div\"],[11,\"class\",\"row\"],[11,\"style\",\"text-align: center; margin-top: 50px;\"],[9],[0,\"\\n\\t\\t          \"],[7,\"div\"],[11,\"class\",\"col\"],[9],[0,\"\\n\\t\\t            \"],[7,\"a\"],[11,\"href\",\"https://www.linkedin.com/company/sheleads-io/\"],[11,\"target\",\"_blank\"],[9],[7,\"img\"],[11,\"style\",\"width: 40px;\"],[11,\"src\",\"/assets/images/LinkedIn_icon.png\"],[9],[10],[10],[0,\"\\n\\t\\t          \"],[10],[0,\"\\n\\t\\t          \\n\\t\\t          \"],[7,\"div\"],[11,\"class\",\"col\"],[9],[0,\"\\n\\t\\t            \"],[7,\"a\"],[11,\"href\",\"https://www.instagram.com/sheleads_io/\"],[11,\"target\",\"_blank\"],[9],[7,\"img\"],[11,\"style\",\"width: 40px;\"],[11,\"src\",\"/assets/images/Instagram_icon.png\"],[9],[10],[10],[0,\"\\n\\t\\t          \"],[10],[0,\"\\n\\t\\t          \\n\\t\\t          \"],[7,\"div\"],[11,\"class\",\"col\"],[9],[0,\"\\n\\t\\t            \"],[7,\"a\"],[11,\"href\",\"https://twitter.com/SheLeads_io\"],[11,\"target\",\"_blank\"],[9],[7,\"img\"],[11,\"style\",\"width: 40px;\"],[11,\"src\",\"/assets/images/Twitter_icon.png\"],[9],[10],[10],[0,\"\\n\\t\\t          \"],[10],[0,\"\\n\\n\\t\\t          \"],[7,\"div\"],[11,\"class\",\"col\"],[9],[0,\"\\n\\t\\t            \"],[7,\"a\"],[11,\"href\",\"https://www.facebook.com/SheLeads.io\"],[11,\"target\",\"_blank\"],[9],[7,\"img\"],[11,\"style\",\"width: 40px;\"],[11,\"src\",\"/assets/images/Facebook_icon.png\"],[9],[10],[10],[0,\"\\n\\t\\t          \"],[10],[0,\"\\n        \\t\\t\"],[10],[0,\"\\n\\t\\t\\t\"],[10],[0,\"\\n\\t\\t\"],[10],[0,\"\\n\\t\"],[10],[0,\"\\n\"],[10],[0,\"\\n\\n\"],[7,\"div\"],[11,\"class\",\"footer\"],[9],[0,\"\\n\\t\"],[7,\"div\"],[11,\"class\",\"footer-sub\"],[9],[0,\"\\n\\t\\t\"],[7,\"div\"],[11,\"class\",\"navbar-brand\"],[11,\"href\",\"#\"],[9],[0,\"she leads\"],[10],[0,\"\\n\\t\"],[10],[0,\"\\n\\t\"],[7,\"div\"],[11,\"class\",\"copyright-sub\"],[9],[0,\"\\n\\t\\t\"],[7,\"div\"],[11,\"style\",\"text-align: right;\"],[9],[0,\"Copyright © 2018\"],[10],[0,\"\\n\\t\"],[10],[0,\"\\n\"],[10],[0,\"\\n\"],[1,[21,\"outlet\"],false],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "iwnad/templates/main.hbs" } });
});
;define("iwnad/templates/my-match", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "gBc8lPlV", "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[7,\"div\"],[11,\"class\",\"dashboard-background\"],[9],[0,\"\\n\"],[7,\"div\"],[11,\"class\",\"profile-info-header\"],[9],[0,\"\\n  \"],[2,\"Student@USC\"],[0,\"\\n  \"],[7,\"div\"],[11,\"class\",\"profile-pic-box\"],[9],[0,\"\\n      \"],[2,\"<div class=\\\"col-4\\\">\\n        <img class=\\\"profile-pic\\\" src=\\\"https://pbs.twimg.com/profile_images/968462973663629313/GTxyK4er_400x400.jpg\\\">\\n      </div>\"],[0,\"\\n  \\t  \"],[7,\"div\"],[11,\"class\",\"name-and-role-box\"],[9],[0,\"\\n          \"],[7,\"div\"],[11,\"class\",\"extra-large-blue-text\"],[9],[1,[23,[\"currentMatch\",\"name\"]],false],[10],[0,\"\\n          \"],[7,\"br\"],[9],[10],[0,\"\\n\"],[4,\"if\",[[23,[\"currentMatch\",\"occupation\"]]],null,{\"statements\":[[0,\"            \"],[7,\"div\"],[11,\"class\",\"content-not-editable-role\"],[9],[1,[23,[\"currentMatch\",\"occupation\"]],false],[0,\" at \"],[1,[23,[\"currentMatch\",\"organization\"]],false],[10],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"  \\t  \"],[10],[0,\"\\n  \"],[10],[0,\"\\n\"],[10],[0,\"\\n \"],[2,\"Contact Info\"],[0,\"\\n \"],[7,\"div\"],[11,\"class\",\"profile-info\"],[9],[0,\"\\n    \"],[7,\"h6\"],[11,\"class\",\"small-text\"],[9],[0,\"Contact\"],[7,\"span\"],[11,\"style\",\"color: #E36364;\"],[9],[0,\" *\"],[10],[10],[0,\"\\n    \"],[7,\"div\"],[11,\"class\",\"row\"],[9],[0,\"\\n      \"],[7,\"div\"],[11,\"class\",\"col\"],[9],[0,\"\\n        \"],[7,\"div\"],[11,\"class\",\"row\"],[9],[0,\"\\n            \"],[7,\"div\"],[11,\"style\",\"line-height: 45px; text-align: center;\"],[11,\"class\",\"col col-lg-2\"],[9],[0,\"\\n              \"],[7,\"img\"],[11,\"style\",\"width: 40px;\"],[11,\"src\",\"/assets/images/Email_icon.png\"],[9],[10],[0,\"\\n            \"],[10],[0,\"\\n          \"],[7,\"div\"],[11,\"class\",\"col\"],[9],[0,\"\\n            \"],[7,\"h7\"],[11,\"class\",\"content-not-editable\"],[9],[1,[23,[\"currentMatch\",\"email\"]],false],[10],[0,\"\\n          \"],[10],[0,\"\\n        \"],[10],[0,\"\\n      \"],[10],[0,\"\\n\"],[4,\"if\",[[23,[\"currentMatch\",\"phone\"]]],null,{\"statements\":[[0,\"        \"],[7,\"div\"],[11,\"class\",\"col\"],[9],[0,\"\\n          \"],[7,\"div\"],[11,\"class\",\"row\"],[9],[0,\"\\n              \"],[7,\"div\"],[11,\"style\",\"line-height: 45px; text-align: center;\"],[11,\"class\",\"col col-lg-2\"],[9],[0,\"\\n                \"],[7,\"img\"],[11,\"style\",\"width: 40px;\"],[11,\"src\",\"/assets/images/Phone_icon.png\"],[9],[10],[0,\"\\n              \"],[10],[0,\"\\n            \"],[7,\"div\"],[11,\"class\",\"col\"],[9],[0,\"\\n              \"],[7,\"h7\"],[11,\"class\",\"content-not-editable\"],[9],[1,[23,[\"currentMatch\",\"phone\"]],false],[10],[0,\"\\n            \"],[10],[0,\"\\n          \"],[10],[0,\"\\n        \"],[10],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"    \"],[10],[0,\"\\n    \"],[7,\"br\"],[9],[10],[0,\"\\n    \"],[7,\"br\"],[9],[10],[0,\"\\n\"],[4,\"if\",[[23,[\"currentMatch\",\"bio\"]]],null,{\"statements\":[[0,\"      \"],[7,\"h6\"],[11,\"class\",\"small-text\"],[9],[0,\"Bio\"],[10],[0,\"\\n      \"],[7,\"h7\"],[11,\"class\",\"content-not-editable\"],[9],[1,[23,[\"currentMatch\",\"bio\"]],false],[10],[0,\"\\n      \"],[7,\"br\"],[9],[10],[0,\"\\n      \"],[7,\"br\"],[9],[10],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\"],[4,\"if\",[[23,[\"currentMatch\",\"availability\"]]],null,{\"statements\":[[0,\"      \"],[7,\"h6\"],[11,\"class\",\"small-text\"],[9],[0,\"General Availability\"],[10],[0,\"\\n      \"],[7,\"h7\"],[11,\"class\",\"content-not-editable\"],[9],[1,[23,[\"currentMatch\",\"availability\"]],false],[10],[0,\"\\n      \"],[7,\"br\"],[9],[10],[0,\"\\n      \"],[7,\"br\"],[9],[10],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\"],[4,\"if\",[[23,[\"currentMatch\",\"skills\"]]],null,{\"statements\":[[0,\"      \"],[7,\"h6\"],[11,\"class\",\"small-text\"],[9],[0,\"Skills\"],[10],[0,\"\\n      \"],[7,\"h7\"],[11,\"class\",\"content-not-editable\"],[9],[1,[23,[\"currentMatch\",\"skills\"]],false],[10],[0,\"\\n      \"],[7,\"br\"],[9],[10],[0,\"\\n      \"],[7,\"br\"],[9],[10],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\"],[4,\"if\",[[23,[\"currentMatch\",\"interests\"]]],null,{\"statements\":[[0,\"      \"],[7,\"h6\"],[11,\"class\",\"small-text\"],[9],[0,\"Interests\"],[10],[0,\"\\n      \"],[7,\"h7\"],[11,\"class\",\"content-not-editable\"],[9],[1,[23,[\"currentMatch\",\"interests\"]],false],[10],[0,\"\\n      \"],[7,\"br\"],[9],[10],[0,\"\\n      \"],[7,\"br\"],[9],[10],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\"],[4,\"if\",[[23,[\"socialMedia\"]]],null,{\"statements\":[[0,\"      \"],[7,\"h6\"],[11,\"class\",\"small-text\"],[9],[0,\"Social Media\"],[10],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n    \"],[7,\"div\"],[11,\"class\",\"row\"],[9],[0,\"\\n      \"],[7,\"div\"],[11,\"class\",\"col\"],[9],[0,\"\\n        \"],[7,\"div\"],[11,\"class\",\"row\"],[9],[0,\"\\n\"],[4,\"if\",[[23,[\"currentMatch\",\"linkedin\"]]],null,{\"statements\":[[0,\"            \"],[7,\"div\"],[11,\"class\",\"col col-lg-2\"],[9],[0,\"\\n              \"],[7,\"a\"],[12,\"href\",[27,\"concat\",[\"https://linkedin.com/in/\",[23,[\"currentMatch\",\"linkedin\"]]],null]],[11,\"target\",\"_blank\"],[9],[7,\"img\"],[11,\"style\",\"width: 80px;\"],[11,\"src\",\"/assets/images/LinkedIn_icon.png\"],[9],[10],[10],[0,\"\\n            \"],[10],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\"],[4,\"if\",[[23,[\"currentMatch\",\"instagram\"]]],null,{\"statements\":[[0,\"            \"],[7,\"div\"],[11,\"class\",\"col col-lg-2\"],[9],[0,\"\\n              \"],[7,\"a\"],[12,\"href\",[27,\"concat\",[\"https://instagram.com/\",[23,[\"currentMatch\",\"instagram\"]]],null]],[11,\"target\",\"_blank\"],[9],[7,\"img\"],[11,\"style\",\"width: 80px;\"],[11,\"src\",\"/assets/images/Instagram_icon.png\"],[9],[10],[10],[0,\"\\n            \"],[10],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\"],[4,\"if\",[[23,[\"currentMatch\",\"twitter\"]]],null,{\"statements\":[[0,\"            \"],[7,\"div\"],[11,\"class\",\"col col-lg-2\"],[9],[0,\"\\n              \"],[7,\"a\"],[12,\"href\",[27,\"concat\",[\"https://twitter.com/\",[23,[\"currentMatch\",\"twitter\"]]],null]],[11,\"target\",\"_blank\"],[9],[7,\"img\"],[11,\"style\",\"width: 70px;\"],[11,\"src\",\"/assets/images/Twitter_icon.png\"],[9],[10],[10],[0,\"\\n            \"],[10],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\"],[4,\"if\",[[23,[\"currentMatch\",\"facebook\"]]],null,{\"statements\":[[0,\"            \"],[7,\"div\"],[11,\"class\",\"col col-lg-2\"],[9],[0,\"\\n              \"],[7,\"a\"],[12,\"href\",[27,\"concat\",[\"https://facebook.com/\",[23,[\"currentMatch\",\"facebook\"]]],null]],[11,\"target\",\"_blank\"],[9],[7,\"img\"],[11,\"style\",\"width: 65px;\"],[11,\"src\",\"/assets/images/Facebook_icon.png\"],[9],[10],[10],[0,\"\\n            \"],[10],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n        \"],[10],[0,\"\\n      \"],[10],[0,\"\\n    \"],[10],[0,\"\\n  \"],[10],[0,\"\\n\"],[10],[0,\"\\n\"],[1,[21,\"outlet\"],false],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "iwnad/templates/my-match.hbs" } });
});
;define("iwnad/templates/my-profile", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "FVjVLbZv", "block": "{\"symbols\":[],\"statements\":[[7,\"div\"],[11,\"class\",\"dashboard-background\"],[9],[0,\"\\n  \"],[7,\"div\"],[11,\"class\",\"profile-info-header\"],[9],[0,\"\\n    \"],[2,\"Student@USC\"],[0,\"\\n    \"],[7,\"div\"],[11,\"class\",\"profile-pic-box\"],[9],[0,\"\\n        \"],[2,\"<div class=\\\"col-4\\\">\\n          <img class=\\\"profile-pic\\\" src=\\\"https://pbs.twimg.com/profile_images/968462973663629313/GTxyK4er_400x400.jpg\\\">\\n        </div>\"],[0,\"\\n        \"],[7,\"div\"],[11,\"class\",\"name-and-role-box\"],[9],[0,\"\\n            \"],[7,\"div\"],[11,\"class\",\"extra-large-blue-text\"],[9],[1,[23,[\"currentUser\",\"name\"]],false],[10],[0,\"\\n            \"],[7,\"br\"],[9],[10],[0,\"\\n            \"],[7,\"div\"],[11,\"class\",\"row\"],[9],[0,\"\\n              \"],[7,\"div\"],[9],[0,\"\\n                \"],[1,[27,\"content-editable\",null,[[\"class\",\"value\",\"name\"],[\"content-editable-role\",[23,[\"occupationVal\"]],\"occupation\"]]],false],[0,\"\\n              \"],[10],[0,\"\\n              \"],[7,\"div\"],[11,\"class\",\"at-role\"],[9],[0,\"\\n                at\\n              \"],[10],[0,\"\\n              \"],[7,\"div\"],[9],[0,\"\\n                \"],[1,[27,\"content-editable\",null,[[\"class\",\"value\",\"name\"],[\"content-editable-location\",[23,[\"organizationVal\"]],\"organization\"]]],false],[0,\"\\n              \"],[10],[0,\"\\n            \"],[10],[0,\"\\n        \"],[10],[0,\"\\n    \"],[10],[0,\"\\n  \"],[10],[0,\"\\n\\n   \"],[2,\"Contact Info\"],[0,\"\\n   \"],[7,\"div\"],[11,\"class\",\"profile-info\"],[9],[0,\"\\n      \"],[7,\"h6\"],[11,\"class\",\"small-text\"],[9],[0,\"Contact\"],[7,\"span\"],[11,\"style\",\"color: #E36364;\"],[9],[0,\" *\"],[10],[10],[0,\"\\n      \"],[7,\"div\"],[11,\"class\",\"row\"],[9],[0,\"\\n        \"],[7,\"div\"],[11,\"class\",\"col\"],[9],[0,\"\\n          \"],[7,\"div\"],[11,\"class\",\"row\"],[9],[0,\"\\n            \"],[7,\"div\"],[11,\"style\",\"line-height: 45px; text-align: center;\"],[11,\"class\",\"col col-lg-2\"],[9],[0,\"\\n              \"],[7,\"img\"],[11,\"style\",\"width: 40px;\"],[11,\"src\",\"/assets/images/Email_icon.png\"],[9],[10],[0,\"\\n            \"],[10],[0,\"\\n            \"],[7,\"div\"],[11,\"class\",\"col\"],[9],[0,\"\\n              \"],[1,[27,\"content-editable\",null,[[\"class\",\"value\",\"name\"],[\"content-editable\",[23,[\"emailVal\"]],\"email\"]]],false],[0,\"\\n            \"],[10],[0,\"\\n          \"],[10],[0,\"\\n        \"],[10],[0,\"\\n\\n        \"],[7,\"div\"],[11,\"class\",\"col\"],[9],[0,\"\\n          \"],[7,\"div\"],[11,\"class\",\"row\"],[9],[0,\"\\n            \"],[7,\"div\"],[11,\"style\",\"line-height: 45px; text-align: center;\"],[11,\"class\",\"col col-lg-2\"],[9],[0,\"\\n              \"],[7,\"img\"],[11,\"style\",\"width: 40px;\"],[11,\"src\",\"/assets/images/Phone_icon.png\"],[9],[10],[0,\"\\n            \"],[10],[0,\"\\n            \"],[7,\"div\"],[11,\"class\",\"col\"],[9],[0,\"\\n              \"],[1,[27,\"content-editable\",null,[[\"class\",\"value\",\"name\"],[\"content-editable\",[23,[\"phoneVal\"]],\"phone\"]]],false],[0,\"\\n            \"],[10],[0,\"\\n          \"],[10],[0,\"\\n        \"],[10],[0,\"\\n      \"],[10],[0,\"\\n      \"],[7,\"br\"],[9],[10],[0,\"\\n      \"],[7,\"br\"],[9],[10],[0,\"\\n      \"],[7,\"h6\"],[11,\"class\",\"small-text\"],[9],[0,\"Bio\"],[10],[0,\"\\n      \"],[1,[27,\"textarea\",null,[[\"class\",\"value\",\"name\",\"placeholder\"],[\"text-area-my-profile content-editable\",[23,[\"bioVal\"]],\"bio\",\"i.e. I am a student at USC and love to code. I am really interested in building apps for healthcare and education.\"]]],false],[0,\"\\n      \"],[7,\"br\"],[9],[10],[0,\"\\n      \"],[7,\"br\"],[9],[10],[0,\"\\n      \"],[7,\"h6\"],[11,\"class\",\"small-text\"],[9],[0,\"General Availability\"],[10],[0,\"\\n      \"],[1,[27,\"content-editable\",null,[[\"class\",\"value\",\"name\",\"placeholder\"],[\"content-editable\",[23,[\"availabilityVal\"]],\"availability\",\"i.e. Weekdays after 3pm and weekends at 10am\"]]],false],[0,\"\\n      \"],[7,\"br\"],[9],[10],[0,\"\\n      \"],[7,\"br\"],[9],[10],[0,\"\\n      \"],[7,\"h6\"],[11,\"class\",\"small-text\"],[9],[0,\"Skills\"],[10],[0,\"\\n      \"],[1,[27,\"content-editable\",null,[[\"class\",\"value\",\"name\",\"placeholder\"],[\"content-editable\",[23,[\"skillsVal\"]],\"skills\",\"i.e. Coding, Design, Marketing, Social Media\"]]],false],[0,\"\\n      \"],[7,\"br\"],[9],[10],[0,\"\\n      \"],[7,\"br\"],[9],[10],[0,\"\\n      \"],[7,\"h6\"],[11,\"class\",\"small-text\"],[9],[0,\"Interests\"],[10],[0,\"\\n      \"],[1,[27,\"content-editable\",null,[[\"class\",\"value\",\"name\",\"placeholder\"],[\"content-editable\",[23,[\"interestsVal\"]],\"interests\",\"i.e. Entrepreneurship, Music, Biology\"]]],false],[0,\"\\n      \"],[7,\"br\"],[9],[10],[0,\"\\n      \"],[7,\"br\"],[9],[10],[0,\"\\n\\n      \"],[7,\"h6\"],[11,\"class\",\"small-text\"],[9],[0,\"Social Media\"],[10],[0,\"\\n      \"],[7,\"div\"],[11,\"class\",\"row\"],[9],[0,\"\\n            \"],[7,\"div\"],[11,\"class\",\"col col-md-auto\"],[11,\"style\",\"line-height: 50px;\"],[9],[0,\"\\n              \"],[7,\"img\"],[11,\"style\",\"width: 30px;\"],[11,\"src\",\"/assets/images/LinkedIn_icon.png\"],[9],[10],[0,\"\\n            \"],[10],[0,\"\\n            \"],[7,\"div\"],[11,\"style\",\"line-height: 50px;\"],[9],[0,\"\\n              https://linkedin.com/in/\\n            \"],[10],[0,\"\\n            \"],[7,\"div\"],[11,\"class\",\"col\"],[9],[0,\"\\n              \"],[1,[27,\"content-editable\",null,[[\"class\",\"value\",\"name\",\"placeholder\"],[\"content-editable\",[23,[\"linkedinVal\"]],\"linkedin\",\"username\"]]],false],[0,\"\\n            \"],[10],[0,\"\\n      \"],[10],[0,\"\\n      \"],[7,\"br\"],[9],[10],[0,\"\\n      \"],[7,\"br\"],[9],[10],[0,\"\\n      \"],[7,\"div\"],[11,\"class\",\"row\"],[9],[0,\"\\n            \"],[7,\"div\"],[11,\"class\",\"col col-md-auto\"],[11,\"style\",\"line-height: 50px;\"],[9],[0,\"\\n              \"],[7,\"img\"],[11,\"style\",\"width: 30px;\"],[11,\"src\",\"/assets/images/Twitter_icon.png\"],[9],[10],[0,\"\\n            \"],[10],[0,\"\\n            \"],[7,\"div\"],[11,\"style\",\"line-height: 50px;\"],[9],[0,\"\\n            https://twitter.com/\\n            \"],[10],[0,\"\\n            \"],[7,\"div\"],[11,\"class\",\"col\"],[9],[0,\"\\n              \"],[1,[27,\"content-editable\",null,[[\"class\",\"value\",\"name\",\"placeholder\"],[\"content-editable\",[23,[\"twitterVal\"]],\"twitter\",\"username\"]]],false],[0,\"\\n            \"],[10],[0,\"\\n      \"],[10],[0,\"   \\n      \"],[7,\"br\"],[9],[10],[0,\"\\n      \"],[7,\"br\"],[9],[10],[0,\"\\n      \"],[7,\"div\"],[11,\"class\",\"row\"],[9],[0,\"\\n            \"],[7,\"div\"],[11,\"class\",\"col col-md-auto\"],[11,\"style\",\"line-height: 50px;\"],[9],[0,\"\\n              \"],[7,\"img\"],[11,\"style\",\"width: 30px;\"],[11,\"src\",\"/assets/images/Instagram_icon.png\"],[9],[10],[0,\"\\n            \"],[10],[0,\"\\n            \"],[7,\"div\"],[11,\"style\",\"line-height: 50px;\"],[9],[0,\"\\n              https://instagram.com/\\n            \"],[10],[0,\"\\n            \"],[7,\"div\"],[11,\"class\",\"col\"],[9],[0,\"\\n              \"],[1,[27,\"content-editable\",null,[[\"class\",\"value\",\"name\",\"placeholder\"],[\"content-editable\",[23,[\"instagramVal\"]],\"instagram\",\"username\"]]],false],[0,\"\\n            \"],[10],[0,\"\\n      \"],[10],[0,\" \\n      \"],[7,\"br\"],[9],[10],[0,\"\\n      \"],[7,\"br\"],[9],[10],[0,\"\\n      \"],[7,\"div\"],[11,\"class\",\"row\"],[9],[0,\"\\n            \"],[7,\"div\"],[11,\"class\",\"col col-md-auto\"],[11,\"style\",\"line-height: 50px;\"],[9],[0,\"\\n              \"],[7,\"img\"],[11,\"style\",\"width: 30px;\"],[11,\"src\",\"/assets/images/Facebook_icon.png\"],[9],[10],[0,\"\\n            \"],[10],[0,\"\\n            \"],[7,\"div\"],[11,\"style\",\"line-height: 50px;\"],[9],[0,\"\\n              https://facebook.com/\\n            \"],[10],[0,\"\\n            \"],[7,\"div\"],[11,\"class\",\"col\"],[9],[0,\"\\n              \"],[1,[27,\"content-editable\",null,[[\"class\",\"value\",\"name\",\"placeholder\"],[\"content-editable\",[23,[\"facebookVal\"]],\"facebook\",\"username\"]]],false],[0,\"\\n            \"],[10],[0,\"\\n      \"],[10],[0,\"\\n      \"],[7,\"br\"],[9],[10],[0,\"\\n      \"],[7,\"br\"],[9],[10],[0,\"\\n\\n      \"],[2,\"<h6 class= \\\"small-text\\\">Social Media</h6>\\n      <div class=\\\"row\\\">\\n        <div class=\\\"col\\\">\\n          <div class=\\\"row\\\">\\n            <div class=\\\"col col-md-auto\\\" style=\\\"line-height: 50px;\\\">\\n              <img style=\\\"width: 30px;\\\" src=\\\"/assets/images/LinkedIn_icon.png\\\">\\n            </div>\\n            <div style=\\\"line-height: 50px;\\\">\\n              https://linkedin.com/in/\\n            </div>\\n            <div class=\\\"col\\\">\\n              {{content-editable class=\\\"content-editable\\\" value=linkedinVal name=\\\"linkedin\\\"}}\\n            </div>\\n          </div>\\n        </div>\\n\\n        <div class=\\\"col\\\">\\n          <div class=\\\"row\\\">\\n            <div class=\\\"col col-md-auto\\\" style=\\\"line-height: 50px;\\\">\\n              <img style=\\\"width: 30px;\\\" src=\\\"/assets/images/Twitter_icon.png\\\">\\n            </div>\\n            <div style=\\\"line-height: 50px;\\\">\\n            https://twitter.com/\\n            </div>\\n            <div class=\\\"col\\\">\\n              {{content-editable class=\\\"content-editable\\\" value=twitterVal name=\\\"twitter\\\"}}\\n            </div>\\n          </div>\\n        </div>\\n      </div>\\n      <br>\\n      <div class=\\\"row\\\">\\n        <div class=\\\"col\\\">\\n          <div class=\\\"row\\\">\\n            <div class=\\\"col col-md-auto\\\" style=\\\"line-height: 50px;\\\">\\n              <img style=\\\"width: 30px;\\\" src=\\\"/assets/images/Instagram_icon.png\\\">\\n            </div>\\n            <div style=\\\"line-height: 50px;\\\">\\n              https://instagram.com/\\n            </div>\\n            <div class=\\\"col\\\">\\n              {{content-editable class=\\\"content-editable\\\" value=instagramVal name=\\\"instagram\\\"}}\\n            </div>\\n          </div>\\n        </div>\\n\\n        <div class=\\\"col\\\">\\n          <div class=\\\"row\\\">\\n            <div class=\\\"col col-md-auto\\\" style=\\\"line-height: 50px;\\\">\\n              <img style=\\\"width: 30px;\\\" src=\\\"/assets/images/Facebook_icon.png\\\">\\n            </div>\\n            <div style=\\\"line-height: 50px;\\\">\\n              https://facebook.com/\\n            </div>\\n            <div class=\\\"col\\\">\\n              {{content-editable class=\\\"content-editable\\\" value=facebookVal name=\\\"facebook\\\"}}\\n            </div>\\n          </div>\\n        </div>\\n      </div>\"],[0,\"\\n\\n      \"],[7,\"div\"],[11,\"class\",\"update-button-div\"],[9],[0,\"\\n        \"],[7,\"button\"],[11,\"class\",\"update-button\"],[3,\"action\",[[22,0,[]],\"updateInfo\"]],[9],[0,\"Update Info\"],[10],[0,\"\\n\\n\"],[4,\"if\",[[23,[\"showUpdateModal\"]]],null,{\"statements\":[[4,\"modal-dialog\",null,[[\"onClose\",\"targetAttachment\",\"translucentOverlay\"],[\"updateInfo\",\"center\",true]],{\"statements\":[[0,\"            \"],[7,\"div\"],[11,\"class\",\"cancel-button\"],[3,\"action\",[[22,0,[]],\"cancel\"]],[9],[7,\"strong\"],[9],[0,\"x\"],[10],[10],[0,\"   \\n            \"],[7,\"br\"],[9],[10],[7,\"br\"],[9],[10],[0,\"\\n            \"],[7,\"h6\"],[11,\"style\",\"color: #182330;\"],[9],[0,\" Your information has been updated.\"],[10],[0,\"     \\n\"]],\"parameters\":[]},null]],\"parameters\":[]},null],[0,\"      \"],[10],[0,\"\\n    \"],[10],[0,\"\\n\"],[10],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "iwnad/templates/my-profile.hbs" } });
});
;define("iwnad/templates/new-user", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "+WsSIEsq", "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[7,\"div\"],[11,\"class\",\"component-padding\"],[9],[0,\"\\n\\t\"],[7,\"div\"],[11,\"class\",\"row\"],[9],[0,\"\\n\\t  \"],[7,\"div\"],[11,\"class\",\"greeting\"],[9],[0,\"\\n\\t  \\t\"],[7,\"div\"],[11,\"class\",\"greeting-pic\"],[9],[0,\"\\n\\t  \\t  \"],[7,\"img\"],[11,\"style\",\"width: 60px;\"],[11,\"src\",\"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvyjtZBrZtFqBZEimzVor2zPU6VSgREi4YaIrOmzAGoGpGce0J\"],[9],[10],[0,\"\\n\\t  \\t\"],[10],[0,\"\\n\\n\\t  \\t\"],[7,\"div\"],[11,\"class\",\"greeting-message\"],[9],[0,\"\\n\\t  \\t  \"],[7,\"h1\"],[11,\"class\",\"large-text\"],[9],[0,\"Hi, {person}!\"],[10],[0,\"\\n\\t\\t  \"],[7,\"h6\"],[11,\"class\",\"small-text\"],[9],[0,\"Let’s get to work.\"],[10],[0,\"\\n\\t  \\t\"],[10],[0,\"\\n\\t  \"],[10],[0,\"\\n\\n\\n    \"],[7,\"div\"],[11,\"class\",\"row\"],[9],[0,\"\\n      \"],[7,\"div\"],[11,\"class\",\"col\"],[9],[0,\"\\n        \"],[7,\"h6\"],[11,\"required\",\"required\"],[11,\"class\",\"small-text\"],[9],[0,\"Role\"],[7,\"span\"],[11,\"style\",\"color: #E36364;\"],[9],[0,\" *\"],[10],[10],[0,\"\\n         \"],[1,[27,\"input\",null,[[\"name\",\"type\",\"value\",\"placeholder\"],[\"role\",\"role\",[23,[\"role\"]],\"i.e. Student\"]]],false],[0,\"\\n       \"],[10],[0,\"\\n         \"],[7,\"h1\"],[11,\"class\",\"large-text\"],[11,\"style\",\"line-height: 2.5em\"],[9],[0,\"@\"],[10],[0,\"\\n      \"],[7,\"div\"],[11,\"class\",\"col\"],[9],[0,\"\\n        \"],[7,\"h6\"],[11,\"required\",\"required\"],[11,\"class\",\"small-text\"],[9],[0,\"Organization\"],[7,\"span\"],[11,\"style\",\"color: #E36364;\"],[9],[0,\" *\"],[10],[10],[0,\"\\n        \"],[1,[27,\"input\",null,[[\"type\",\"name\",\"value\",\"placeholder\"],[\"organization\",\"organization\",[23,[\"organization\"]],\"i.e. School\"]]],false],[0,\"\\n      \"],[10],[0,\"\\n      \"],[7,\"div\"],[11,\"class\",\"col\"],[9],[0,\"\\n        \"],[7,\"h6\"],[11,\"required\",\"required\"],[11,\"class\",\"small-text\"],[9],[0,\"Phone Number\"],[7,\"span\"],[11,\"style\",\"color: #E36364;\"],[9],[0,\" *\"],[10],[10],[0,\"\\n        \"],[1,[27,\"input\",null,[[\"type\",\"name\",\"value\"],[\"phone\",\"phone\",[23,[\"phone\"]]]]],false],[0,\"\\n      \"],[10],[0,\"\\n    \"],[10],[0,\"\\n    \"],[7,\"div\"],[11,\"class\",\"row\"],[9],[0,\"\\n      \"],[7,\"div\"],[11,\"class\",\"col\"],[9],[0,\"\\n        \"],[7,\"h6\"],[11,\"required\",\"required\"],[11,\"class\",\"small-text\"],[9],[0,\"Create Password\"],[7,\"span\"],[11,\"style\",\"color: #E36364;\"],[9],[0,\" *\"],[10],[10],[0,\"\\n         \"],[1,[27,\"input\",null,[[\"name\",\"type\",\"value\"],[\"password1\",\"password1\",[23,[\"password1\"]]]]],false],[0,\"\\n      \"],[10],[0,\"\\n      \"],[7,\"div\"],[11,\"class\",\"col\"],[9],[0,\"\\n        \"],[7,\"h6\"],[11,\"required\",\"required\"],[11,\"class\",\"small-text\"],[9],[0,\"Retype Password\"],[7,\"span\"],[11,\"style\",\"color: #E36364;\"],[9],[0,\" *\"],[10],[10],[0,\"\\n        \"],[1,[27,\"input\",null,[[\"type\",\"name\",\"value\"],[\"password2\",\"password2\",[23,[\"password2\"]]]]],false],[0,\"\\n      \"],[10],[0,\"\\n    \"],[10],[0,\"\\n\\n\\t\\t\"],[7,\"div\"],[11,\"class\",\"button-div\"],[9],[0,\"\\n\\t\\t\\t\"],[4,\"link-to\",[\"dashboard-page\"],null,{\"statements\":[[7,\"button\"],[11,\"class\",\"submit-button\"],[9],[0,\"Next\"],[10]],\"parameters\":[]},null],[0,\"\\n\\t\\t\"],[10],[0,\"\\n\\t  \"],[10],[0,\"\\n\\t\"],[10],[0,\"\\n\\n\"],[1,[21,\"outlet\"],false],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "iwnad/templates/new-user.hbs" } });
});
;define("iwnad/templates/signup", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "ZcB4zi8i", "block": "{\"symbols\":[],\"statements\":[[7,\"div\"],[11,\"class\",\"component-padding\"],[9],[0,\"\\n\\t\"],[7,\"div\"],[11,\"class\",\"row\"],[9],[0,\"\\n\\t  \"],[7,\"div\"],[11,\"class\",\"greeting\"],[9],[0,\"\\n\\t  \\t\"],[2,\"<div class=\\\"greeting-pic\\\">\\n\\t  \\t  <img style=\\\"width: 60px;\\\" src=\\\"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvyjtZBrZtFqBZEimzVor2zPU6VSgREi4YaIrOmzAGoGpGce0J\\\">\\n\\t  \\t</div>\"],[0,\"\\n\\n\\t  \\t\"],[7,\"div\"],[11,\"class\",\"greeting-message\"],[9],[0,\"\\n\\t  \\t  \"],[7,\"h1\"],[11,\"class\",\"large-text\"],[9],[0,\"Hi, \"],[1,[21,\"currentUserName\"],false],[0,\"!\"],[10],[0,\"\\n\\t\\t  \"],[7,\"h6\"],[11,\"class\",\"small-text\"],[9],[0,\"Let’s get to work.\"],[10],[0,\"\\n\\t  \\t\"],[10],[0,\"\\n\\t  \"],[10],[0,\"\\n\\n\\n    \"],[7,\"div\"],[11,\"class\",\"row\"],[9],[0,\"\\n      \"],[7,\"div\"],[11,\"class\",\"col\"],[9],[0,\"\\n        \"],[7,\"h6\"],[11,\"required\",\"required\"],[11,\"class\",\"small-text\"],[9],[0,\"Role\"],[7,\"span\"],[11,\"style\",\"color: #E36364;\"],[9],[0,\" *\"],[10],[10],[0,\"\\n         \"],[1,[27,\"input\",null,[[\"name\",\"type\",\"value\",\"placeholder\"],[\"role\",\"role\",[23,[\"role\"]],\"i.e. Student\"]]],false],[0,\"\\n       \"],[10],[0,\"\\n         \"],[7,\"h1\"],[11,\"class\",\"large-text\"],[11,\"style\",\"line-height: 2.5em\"],[9],[0,\"@\"],[10],[0,\"\\n      \"],[7,\"div\"],[11,\"class\",\"col\"],[9],[0,\"\\n        \"],[7,\"h6\"],[11,\"required\",\"required\"],[11,\"class\",\"small-text\"],[9],[0,\"Organization\"],[7,\"span\"],[11,\"style\",\"color: #E36364;\"],[9],[0,\" *\"],[10],[10],[0,\"\\n        \"],[1,[27,\"input\",null,[[\"type\",\"name\",\"value\",\"placeholder\"],[\"organization\",\"organization\",[23,[\"organization\"]],\"i.e. School\"]]],false],[0,\"\\n      \"],[10],[0,\"\\n      \"],[7,\"div\"],[11,\"class\",\"col\"],[9],[0,\"\\n        \"],[7,\"h6\"],[11,\"required\",\"required\"],[11,\"class\",\"small-text\"],[9],[0,\"Phone Number\"],[7,\"span\"],[11,\"style\",\"color: #E36364;\"],[9],[0,\" *\"],[10],[10],[0,\"\\n        \"],[1,[27,\"input\",null,[[\"type\",\"name\",\"value\"],[\"phone\",\"phone\",[23,[\"phone\"]]]]],false],[0,\"\\n      \"],[10],[0,\"\\n    \"],[10],[0,\"\\n    \"],[7,\"div\"],[11,\"class\",\"row\"],[9],[0,\"\\n      \"],[7,\"div\"],[11,\"class\",\"col\"],[9],[0,\"\\n        \"],[7,\"h6\"],[11,\"required\",\"required\"],[11,\"class\",\"small-text\"],[9],[0,\"Create Password\"],[7,\"span\"],[11,\"style\",\"color: #E36364;\"],[9],[0,\" *\"],[10],[10],[0,\"\\n         \"],[1,[27,\"input\",null,[[\"type\",\"name\",\"value\"],[\"password\",\"password1\",[23,[\"password1\"]]]]],false],[0,\"\\n      \"],[10],[0,\"\\n      \"],[7,\"div\"],[11,\"class\",\"col\"],[9],[0,\"\\n        \"],[7,\"h6\"],[11,\"required\",\"required\"],[11,\"class\",\"small-text\"],[9],[0,\"Retype Password\"],[7,\"span\"],[11,\"style\",\"color: #E36364;\"],[9],[0,\" *\"],[10],[10],[0,\"\\n        \"],[1,[27,\"input\",null,[[\"type\",\"name\",\"value\"],[\"password\",\"password2\",[23,[\"password2\"]]]]],false],[0,\"\\n      \"],[10],[0,\"\\n\\t\\t\\t\\t\"],[7,\"h6\"],[11,\"style\",\"color: #E36364; line-height: 7em;\"],[9],[1,[21,\"errorMessage\"],false],[10],[0,\"\\n    \"],[10],[0,\"\\n\\n\\t\\t\"],[7,\"input\"],[11,\"multiple\",\"true\"],[12,\"onchange\",[27,\"action\",[[22,0,[]],\"upload\"],null]],[11,\"accept\",\"image/png,image/jpeg,application/pdf\"],[11,\"type\",\"file\"],[9],[10],[0,\"\\n\\n\\t\\t\"],[7,\"img\"],[12,\"src\",[21,\"image\"]],[11,\"alt\",\"/assets/images/join-club.png\"],[11,\"style\",\"width:200px;height:200px;\"],[9],[10],[0,\"\\n\\n\\n\\t\\t\"],[7,\"div\"],[11,\"class\",\"button-div\"],[9],[0,\"\\n\\t\\t\\t\"],[7,\"button\"],[11,\"class\",\"submit-button\"],[3,\"action\",[[22,0,[]],\"signup\"]],[9],[0,\"Next\"],[10],[0,\"\\n\\t\\t\"],[10],[0,\"\\n\\t  \"],[10],[0,\"\\n\\t\"],[10],[0,\"\\n\\n\"],[1,[21,\"outlet\"],false],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "iwnad/templates/signup.hbs" } });
});
;define('iwnad/tests/mirage/mirage.lint-test', [], function () {
  'use strict';

  QUnit.module('ESLint | mirage');

  QUnit.test('mirage/config.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'mirage/config.js should pass ESLint\n\n36:9 - \'signupData\' is assigned a value but never used. (no-unused-vars)\n56:49 - \'req\' is defined but never used. (no-unused-vars)\n98:49 - \'req\' is defined but never used. (no-unused-vars)\n99:5 - Unexpected console statement. (no-console)\n216:53 - \'request\' is defined but never used. (no-unused-vars)\n223:5 - Unexpected console statement. (no-console)\n225:7 - \'conole\' is not defined. (no-undef)\n228:7 - \'conole\' is not defined. (no-undef)');
  });

  QUnit.test('mirage/fixtures/modules.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mirage/fixtures/modules.js should pass ESLint\n\n');
  });

  QUnit.test('mirage/scenarios/default.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mirage/scenarios/default.js should pass ESLint\n\n');
  });

  QUnit.test('mirage/serializers/application.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mirage/serializers/application.js should pass ESLint\n\n');
  });
});
;

;define('iwnad/config/environment', [], function() {
  var prefix = 'iwnad';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

;
          if (!runningTests) {
            require("iwnad/app")["default"].create({"name":"iwnad","version":"0.0.0+e4f36aa5"});
          }
        
//# sourceMappingURL=iwnad.map

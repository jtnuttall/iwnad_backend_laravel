'use strict';

define('iwnad/tests/app.lint-test', [], function () {
  'use strict';

  QUnit.module('ESLint | app');

  QUnit.test('app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app.js should pass ESLint\n\n');
  });

  QUnit.test('authenticators/oauth2.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'authenticators/oauth2.js should pass ESLint\n\n');
  });

  QUnit.test('authenticators/torii.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'authenticators/torii.js should pass ESLint\n\n14:4 - Unexpected console statement. (no-console)');
  });

  QUnit.test('components/dashboard-module.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/dashboard-module.js should pass ESLint\n\n29:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n30:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n31:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n32:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n32:15 - Empty block statement. (no-empty)\n33:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n34:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n36:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n36:7 - \'$\' is not defined. (no-undef)\n37:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n38:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n39:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n40:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n41:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n42:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n43:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n44:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n45:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n46:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n47:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n48:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n49:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n50:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n51:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n52:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n53:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n54:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n55:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n55:9 - \'$\' is not defined. (no-undef)\n56:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n57:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n58:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n59:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n60:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n61:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n62:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n63:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n64:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n65:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n66:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n67:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n68:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n69:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n70:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n71:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n72:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n73:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n74:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n75:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n76:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n77:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n77:7 - \'$\' is not defined. (no-undef)\n78:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n79:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n80:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n81:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n82:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n83:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n84:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n85:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n86:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n87:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n88:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n89:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n90:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n91:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n93:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n93:7 - \'$\' is not defined. (no-undef)\n94:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n95:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n96:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n97:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n98:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n99:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n100:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n101:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n102:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n104:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n105:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)');
  });

  QUnit.test('controllers/admin.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/admin.js should pass ESLint\n\n8:11 - \'$\' is not defined. (no-undef)\n11:9 - \'$\' is not defined. (no-undef)\n24:13 - Unexpected console statement. (no-console)\n25:13 - \'$\' is not defined. (no-undef)\n29:13 - Unexpected console statement. (no-console)\n30:13 - \'$\' is not defined. (no-undef)\n39:11 - \'$\' is not defined. (no-undef)\n42:9 - \'$\' is not defined. (no-undef)\n51:11 - \'$\' is not defined. (no-undef)\n55:13 - \'$\' is not defined. (no-undef)');
  });

  QUnit.test('controllers/application.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/application.js should pass ESLint\n\n5:26 - \'Ember\' is not defined. (no-undef)');
  });

  QUnit.test('controllers/dashboard-module.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/dashboard-module.js should pass ESLint\n\n4:13 - \'service\' is defined but never used. (no-unused-vars)');
  });

  QUnit.test('controllers/dashboard-page.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/dashboard-page.js should pass ESLint\n\n4:13 - \'service\' is defined but never used. (no-unused-vars)');
  });

  QUnit.test('controllers/google-drive-api.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/google-drive-api.js should pass ESLint\n\n4:12 - \'service\' is assigned a value but never used. (no-unused-vars)\n5:5 - \'Ember\' is not defined. (no-undef)\n8:11 - \'Ember\' is not defined. (no-undef)');
  });

  QUnit.test('controllers/login.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/login.js should pass ESLint\n\n3:13 - \'service\' is defined but never used. (no-unused-vars)\n10:26 - \'Ember\' is not defined. (no-undef)\n26:7 - \'$\' is not defined. (no-undef)\n37:11 - Unexpected console statement. (no-console)\n38:11 - Unexpected console statement. (no-console)\n41:11 - \'$\' is not defined. (no-undef)\n45:48 - \'errorThrown\' is defined but never used. (no-unused-vars)\n53:11 - Unexpected console statement. (no-console)\n58:13 - Unexpected console statement. (no-console)\n61:13 - Unexpected console statement. (no-console)\n64:13 - Unexpected console statement. (no-console)\n70:11 - Unexpected console statement. (no-console)\n71:11 - Unexpected console statement. (no-console)');
  });

  QUnit.test('controllers/module-resources.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/module-resources.js should pass ESLint\n\n');
  });

  QUnit.test('controllers/my-profile.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/my-profile.js should pass ESLint\n\n8:4 - \'$\' is not defined. (no-undef)\n9:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n10:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n11:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n12:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n13:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n14:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n15:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n16:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n17:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n18:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n19:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)');
  });

  QUnit.test('controllers/signup.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/signup.js should pass ESLint\n\n30:7 - \'$\' is not defined. (no-undef)\n41:10 - \'result\' is defined but never used. (no-unused-vars)');
  });

  QUnit.test('helpers/get-dashboard-module-status.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'helpers/get-dashboard-module-status.js should pass ESLint\n\n5:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)');
  });

  QUnit.test('helpers/get-status-color.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'helpers/get-status-color.js should pass ESLint\n\n5:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n8:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n11:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)');
  });

  QUnit.test('models/module.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/module.js should pass ESLint\n\n');
  });

  QUnit.test('models/user.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/user.js should pass ESLint\n\n');
  });

  QUnit.test('resolver.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'resolver.js should pass ESLint\n\n');
  });

  QUnit.test('router.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'router.js should pass ESLint\n\n');
  });

  QUnit.test('routes/admin.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/admin.js should pass ESLint\n\n7:6 - Unnecessary semicolon. (no-extra-semi)');
  });

  QUnit.test('routes/application.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/application.js should pass ESLint\n\n');
  });

  QUnit.test('routes/dashboard-page.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/dashboard-page.js should pass ESLint\n\n1:8 - \'Route\' is defined but never used. (no-unused-vars)\n3:13 - \'service\' is defined but never used. (no-unused-vars)\n6:16 - \'Ember\' is not defined. (no-undef)');
  });

  QUnit.test('routes/login.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/login.js should pass ESLint\n\n11:6 - Unnecessary semicolon. (no-extra-semi)');
  });

  QUnit.test('routes/magic.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/magic.js should pass ESLint\n\n');
  });

  QUnit.test('routes/main.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/main.js should pass ESLint\n\n');
  });

  QUnit.test('routes/my-match.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/my-match.js should pass ESLint\n\n7:6 - Unnecessary semicolon. (no-extra-semi)');
  });

  QUnit.test('routes/my-profile.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/my-profile.js should pass ESLint\n\n7:6 - Unnecessary semicolon. (no-extra-semi)');
  });

  QUnit.test('routes/new-user.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/new-user.js should pass ESLint\n\n');
  });

  QUnit.test('routes/signup.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/signup.js should pass ESLint\n\n7:6 - Unnecessary semicolon. (no-extra-semi)');
  });

  QUnit.test('services/current-user.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'services/current-user.js should pass ESLint\n\n');
  });
});
define('iwnad/tests/helpers/torii', ['exports', 'iwnad/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.stubValidSession = stubValidSession;


  const {
    torii: { sessionServiceName }
  } = _environment.default;

  function stubValidSession(application, sessionData) {
    let session = application.__container__.lookup(`service:${sessionServiceName}`);

    let sm = session.get('stateMachine');
    Ember.run(() => {
      sm.send('startOpen');
      sm.send('finishOpen', sessionData);
    });
  }
});
define('iwnad/tests/integration/components/dashboard-module-test', ['qunit', 'ember-qunit', '@ember/test-helpers'], function (_qunit, _emberQunit, _testHelpers) {
  'use strict';

  (0, _qunit.module)('Integration | Component | dashboard-module', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "YEWJo0h2",
        "block": "{\"symbols\":[],\"statements\":[[1,[21,\"dashboard-module\"],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.trim(), '');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "1wjnq9c+",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"dashboard-module\",null,null,{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.trim(), 'template block text');
    });
  });
});
define('iwnad/tests/integration/components/people-list-test', ['qunit', 'ember-qunit', '@ember/test-helpers'], function (_qunit, _emberQunit, _testHelpers) {
  'use strict';

  (0, _qunit.module)('Integration | Component | people-list', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "xjcHuFm8",
        "block": "{\"symbols\":[],\"statements\":[[1,[21,\"people-list\"],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.trim(), '');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "hW0aTInt",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"people-list\",null,null,{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.trim(), 'template block text');
    });
  });
});
define('iwnad/tests/integration/helpers/get-dashboard-module-status-test', ['qunit', 'ember-qunit', '@ember/test-helpers'], function (_qunit, _emberQunit, _testHelpers) {
  'use strict';

  (0, _qunit.module)('Integration | Helper | get-dashboard-module-status', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it renders', async function (assert) {
      this.set('inputValue', '1234');

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "a1H3+H8C",
        "block": "{\"symbols\":[],\"statements\":[[1,[27,\"get-dashboard-module-status\",[[23,[\"inputValue\"]]],null],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.trim(), '1234');
    });
  });
});
define('iwnad/tests/integration/helpers/get-status-color-test', ['qunit', 'ember-qunit', '@ember/test-helpers'], function (_qunit, _emberQunit, _testHelpers) {
  'use strict';

  (0, _qunit.module)('Integration | Helper | get-status-color', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it renders', async function (assert) {
      this.set('inputValue', '1234');

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "YDkap26r",
        "block": "{\"symbols\":[],\"statements\":[[1,[27,\"get-status-color\",[[23,[\"inputValue\"]]],null],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.trim(), '1234');
    });
  });
});
define('iwnad/tests/test-helper', ['iwnad/app', 'iwnad/config/environment', '@ember/test-helpers', 'ember-qunit'], function (_app, _environment, _testHelpers, _emberQunit) {
  'use strict';

  (0, _testHelpers.setApplication)(_app.default.create(_environment.default.APP));

  (0, _emberQunit.start)();
});
define('iwnad/tests/tests.lint-test', [], function () {
  'use strict';

  QUnit.module('ESLint | tests');

  QUnit.test('integration/components/dashboard-module-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/dashboard-module-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/people-list-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/people-list-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/helpers/get-dashboard-module-status-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/helpers/get-dashboard-module-status-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/helpers/get-status-color-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/helpers/get-status-color-test.js should pass ESLint\n\n');
  });

  QUnit.test('test-helper.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'test-helper.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/admin-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/admin-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/application-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/application-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/dashboard-page-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/dashboard-page-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/google-drive-api-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/google-drive-api-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/login-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/login-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/module-resources-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/module-resources-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/my-profile-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/my-profile-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/signup-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/signup-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/1-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/1-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/module-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/module-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/user-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/user-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/application-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/application-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/dashboard-page-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/dashboard-page-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/login-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/login-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/magic-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/magic-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/main-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/main-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/my-match-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/my-match-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/my-profile-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/my-profile-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/new-user-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/new-user-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/signup-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/signup-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/services/current-user-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/services/current-user-test.js should pass ESLint\n\n');
  });
});
define('iwnad/tests/unit/controllers/admin-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Controller | admin', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let controller = this.owner.lookup('controller:admin');
      assert.ok(controller);
    });
  });
});
define('iwnad/tests/unit/controllers/application-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Controller | application', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let controller = this.owner.lookup('controller:application');
      assert.ok(controller);
    });
  });
});
define('iwnad/tests/unit/controllers/dashboard-page-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Controller | dashboard-page', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let controller = this.owner.lookup('controller:dashboard-page');
      assert.ok(controller);
    });
  });
});
define('iwnad/tests/unit/controllers/google-drive-api-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Controller | google-drive-api', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let controller = this.owner.lookup('controller:google-drive-api');
      assert.ok(controller);
    });
  });
});
define('iwnad/tests/unit/controllers/login-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Controller | login', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let controller = this.owner.lookup('controller:login');
      assert.ok(controller);
    });
  });
});
define('iwnad/tests/unit/controllers/module-resources-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Controller | module-resources', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let controller = this.owner.lookup('controller:module-resources');
      assert.ok(controller);
    });
  });
});
define('iwnad/tests/unit/controllers/my-profile-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Controller | my-profile', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let controller = this.owner.lookup('controller:my-profile');
      assert.ok(controller);
    });
  });
});
define('iwnad/tests/unit/controllers/signup-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Controller | signup', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let controller = this.owner.lookup('controller:signup');
      assert.ok(controller);
    });
  });
});
define('iwnad/tests/unit/models/1-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Model | 1', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let store = this.owner.lookup('service:store');
      let model = store.createRecord('1', {});
      assert.ok(model);
    });
  });
});
define('iwnad/tests/unit/models/module-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Model | module', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let store = this.owner.lookup('service:store');
      let model = store.createRecord('module', {});
      assert.ok(model);
    });
  });
});
define('iwnad/tests/unit/models/user-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Model | user', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let store = this.owner.lookup('service:store');
      let model = store.createRecord('user', {});
      assert.ok(model);
    });
  });
});
define('iwnad/tests/unit/routes/application-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | application', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:application');
      assert.ok(route);
    });
  });
});
define('iwnad/tests/unit/routes/dashboard-page-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | dashboard-page', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:dashboard-page');
      assert.ok(route);
    });
  });
});
define('iwnad/tests/unit/routes/login-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | login', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:login');
      assert.ok(route);
    });
  });
});
define('iwnad/tests/unit/routes/magic-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | magic', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:magic');
      assert.ok(route);
    });
  });
});
define('iwnad/tests/unit/routes/main-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | main', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:main');
      assert.ok(route);
    });
  });
});
define('iwnad/tests/unit/routes/my-match-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | my-match', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:my-match');
      assert.ok(route);
    });
  });
});
define('iwnad/tests/unit/routes/my-profile-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | my-profile', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:my-profile');
      assert.ok(route);
    });
  });
});
define('iwnad/tests/unit/routes/new-user-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | new-user', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:new-user');
      assert.ok(route);
    });
  });
});
define('iwnad/tests/unit/routes/signup-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | signup', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:signup');
      assert.ok(route);
    });
  });
});
define('iwnad/tests/unit/services/current-user-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Service | current-user', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let service = this.owner.lookup('service:current-user');
      assert.ok(service);
    });
  });
});
define('iwnad/config/environment', [], function() {
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

require('iwnad/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;
//# sourceMappingURL=tests.map

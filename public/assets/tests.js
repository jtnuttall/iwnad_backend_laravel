'use strict';

define('iwnad/tests/app.lint-test', [], function () {
  'use strict';

  QUnit.module('ESLint | app');

  QUnit.test('app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app.js should pass ESLint\n\n');
  });

  QUnit.test('components/dashboard-module.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/dashboard-module.js should pass ESLint\n\n');
  });

  QUnit.test('controllers/login.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/login.js should pass ESLint\n\n10:7 - Unexpected console statement. (no-console)\n11:7 - Unexpected console statement. (no-console)\n19:7 - \'$\' is not defined. (no-undef)\n29:11 - Unexpected console statement. (no-console)\n31:13 - Unexpected console statement. (no-console)');
  });

  QUnit.test('controllers/module-resources.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/module-resources.js should pass ESLint\n\n');
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

  QUnit.test('resolver.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'resolver.js should pass ESLint\n\n');
  });

  QUnit.test('router.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'router.js should pass ESLint\n\n');
  });

  QUnit.test('routes/dashboard-page.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/dashboard-page.js should pass ESLint\n\n');
  });

  QUnit.test('routes/login.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/login.js should pass ESLint\n\n');
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
    assert.ok(true, 'routes/my-match.js should pass ESLint\n\n');
  });

  QUnit.test('routes/my-profile.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/my-profile.js should pass ESLint\n\n');
  });

  QUnit.test('routes/new-user.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/new-user.js should pass ESLint\n\n');
  });

  QUnit.test('routes/signup.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/signup.js should pass ESLint\n\n');
  });
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

  QUnit.test('unit/controllers/login-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/login-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/module-resources-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/module-resources-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/1-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/1-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/module-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/module-test.js should pass ESLint\n\n');
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

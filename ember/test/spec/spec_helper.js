Ember.testing = true;

EmberApp = Ember.Application.create();

/* Order and include as you please. */
require('scripts/components/*');
require('scripts/controllers/*');
require('scripts/store');
require('scripts/models/*');
require('scripts/routes/*');
require('scripts/views/*');
require('scripts/router');
require('scripts/utils/*'); 
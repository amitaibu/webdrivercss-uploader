var WebdriverIO = require('webdriverio');
var WebdriverCSS = require('webdrivercss');

describe('my webdriverio tests', function(){

  this.timeout(99999999);
  var client = {};

  var caps;
  caps = {
    'browserName': 'chrome'
  };

  before(function(done){

    if (process.env.BROWSERSTACK_USERNAME) {
      caps['browserstack.user'] = process.env.BROWSERSTACK_USERNAME;
      caps['browserstack.key'] = process.env.BROWSERSTACK_KEY;
      caps['browserstack.debug'] = 'true';

      client = WebdriverIO.remote({
        desiredCapabilities: caps,
        host: 'hub.browserstack.com',
        port: 80
      });
    }
    else {
      client = WebdriverIO.remote({ desiredCapabilities: {browserName: 'phantomjs'} });
    }

    client.init(done);
    WebdriverCSS.init(client);
  });

  it('Google test',function(done) {
    client
      .url('https://google.com')
      .webdrivercss('google', {name: 'homepage'})
      .call(done);
  });

  it('GitHub test',function(done) {
    client
      .url('https://github.com')
      .webdrivercss('github', {name: 'homepage'})
      .call(done);
  });

  after(function(done) {
    client.end(done);
  });
});
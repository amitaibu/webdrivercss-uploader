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

    client
      .init(done)
      .setViewportSize({
        width: 1024,
        height: 768
      });
    WebdriverCSS.init(client);
  });

  it('Google test',function(done) {
    client
      .url('https://www.google.com/?gfe_rd=cr&ei=tMH8VONqy4fxB5rygZgD&gws_rd=ssl,cr&fg=1')
      .webdrivercss('chrome', {name: 'google-homepage'})
      .call(done);
  });

  it('GitHub test',function(done) {
    client
      .url('http://amitaibu.com')
      .webdrivercss('chrome', {name: 'amitaibu-homepage'})
      .call(done);
  });

  after(function(done) {
    client.end(done);
  });
});

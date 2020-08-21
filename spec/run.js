const Jasmine = require('jasmine');
const CustomReporter = require('jasmine-console-reporter');

const jasmine = new Jasmine();
jasmine.loadConfigFile('spec/support/jasmine.json');

const customReporter = new CustomReporter();

jasmine.addReporter(customReporter);
jasmine.execute();
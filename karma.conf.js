// Karma configuration
// Generated on Tue Jun 27 2017 13:36:04 GMT+0100 (GMT Daylight Time)
var webpackConfig = require('./webpack.test.config');

// Headless environments (containers, CI agents) have no desktop Chrome and no
// usable remote debugging port, so they must use the headless launcher.
// Switch explicitly with KARMA_HEADLESS (1|true|yes|on), or implicitly via the standard
// CI variable (GitHub Actions, GitLab CI, Jenkins, ...). Everything else is
// treated as a desktop dev machine and gets the debugging launcher.
var isHeadless = [process.env.KARMA_HEADLESS, process.env.CI].some((v) => /^(1|true|yes|on)$/i.test(v || ''));

module.exports = function (config) {
	let originalConfig = {
		client: {
			args: ['--test-target', config.testTarget]
		},

		basePath: '',

		frameworks: ['webpack', 'jasmine'],

		files: [{
			pattern: './testing/karma-test-shim.js',
			watched: false
		}],

		preprocessors: {
			'./testing/karma-test-shim.js': ['webpack', 'sourcemap']
		},

		webpack: webpackConfig,

		webpackServer: {
			noInfo: true
		},

		coverageReporter: {
			type: 'html',
			dir: 'coverage/'
		},

		reporters: ['kjhtml', 'mocha', 'coverage'],

		port: 9876,
		colors: true,
		logLevel: config.LOG_INFO,
		autoWatch: false,
		autoWatchBatchDelay: 1000,
		browsers: [isHeadless ? 'ChromeHeadlessNoSandbox' : 'ChromeDebugging'],
		customLaunchers: {
			ChromeDebugging: {
				base: 'Chrome',
				flags: ['--remote-debugging-port=9333'],
			},
			ChromeHeadlessNoSandbox: {
				base: 'ChromeHeadless',
				flags: ['--no-sandbox', '--disable-dev-shm-usage'],
			},
		},
		// browserDisconnectTimeout : 0,
		// browserNoActivityTimeout : 0,
		singleRun: true,
		concurrency: Infinity
	};

	if (config.testTarget === 'npm') {
		
		originalConfig.files = [{
			pattern: './testing/karma-test-shim-npm.js',
			watched: false
		}];

		originalConfig.preprocessors = {
			'./testing/karma-test-shim-npm.js': ['webpack', 'sourcemap']
		};

	}

	config.set(originalConfig);
}
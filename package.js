Package.describe({
    name: 'workman:templating-ext',
    version: '0.0.2',
    summary: 'Extensions to templates to make it easier to get child and parent templates',
    git: 'https://github.com/davidworkman9/templating-ext.git',
    documentation: 'README.md'
});

Package.onUse(function(api) {
    api.versionsFrom('1.0');
    api.addFiles('workman:templating-ext.js', 'client');
    api.use([
        'templating',
        'underscore',
        'jquery'
    ], 'client');
});

// TODO: write tests.
// Package.onTest(function(api) {
//     api.use('tinytest');
//     api.use('workman:templating-ext');
//     api.addFiles('workman:templating-ext-tests.js');
// });

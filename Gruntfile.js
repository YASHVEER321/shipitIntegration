var pkg = require('./package.json');

module.exports = function(grunt) {

    /**
     * Initialize config.
     */

    grunt.initConfig({
        shipit: {
            options: {
                // Project will be build in this directory.
                workspace: '/tmp/hello-world-workspace',

                // Project will be deployed in this directory.
                deployTo: '/project/hello-world',

                // Repository url.
                repositoryUrl: 'git@bitbucket.org:YashInnotical1/shipit-tutorial.git',

                // This files will not be transfered.
                ignores: ['.git', 'node_modules'],

                // Number of release to keep (for rollback).
                keepReleases: 3
            },

            // Staging environment.
            staging: {
                servers: ['root@172.104.50.150'],
                servers: ['root@172.104.58.69']
            }
        }
    });

    /**
     * Load shipit task.
     */

    grunt.loadNpmTasks('grunt-shipit');

    /**
     * Start project on the remote server.
     */

    grunt.registerTask('start', function() {
        var done = this.async();
        var current = grunt.config('shipit.options.deployTo') + '/current';
        grunt.shipit.remote('cd ' + current + ' && npm start', done);
    });

    /**
     * Run start task after deployment.
     */

    grunt.shipit.on('published', function() {
        grunt.task.run(['start']);
    });
};
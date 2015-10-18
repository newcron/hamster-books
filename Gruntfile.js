module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),

        less: {
            development: {
                options: {
                    /* https://www.npmjs.org/package/grunt-css-url-embed --> data uri support  */

                    paths: ["app/style/"],
                    compress: true,
                    cleanCss: true,
                    sourceMap: true,
                    modifyVars: {
                        "image-url": "\"../../app/img\""
                    }
                },
                files: {
                    "app-optimized/style/hamstersbooks.css": "app/style/hamstersbooks.less"
                }
            }

        }, requirejs: {
            compile: {
                options: {
                    baseUrl: "app/",
                    paths: {
                        "signals": "lib/signals/signals",
                        "mustache": "lib/mustache/mustache",
                        "jquery": "lib/jquery2/jquery",
                        "crossroads": "lib/crossroads/crossroads",
                        "xdate": "lib/xdate/xdate"
                    },
                    preserveLicenseComments: false,
                    optimize: "uglify2",
                    generateSourceMaps: true,
                    name: "hamstersBooks", // assumes a production build using almond
                    out: "app-optimized/js/hamstersbooks.js"
                }
            }
        }, hogan: {
            files: {
                "app-optimized/js" : "view/**/*.mustache"
            },
            options: {
                amdWrapper: true
            }
        },


        watch: {
            options: {
                spawn: false
            }, css: {
                files: ['app/**/*.less'],
                tasks: ['less']
            }, scripts: {
                files: ["app/**/*.js"],
                tasks: ["requirejs"]
            }, templates: {
                files: ["view/**/*.js"],
                tasks: ["hogan"]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-hogan');
    grunt.registerTask('default', ['less', 'hogan', 'requirejs']);

}
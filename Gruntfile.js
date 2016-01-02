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
                    sourceMap: true

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
                        "jquery": "lib/jquery2/jquery",
                        "crossroads": "lib/crossroads/crossroads",
                        "xdate": "lib/xdate/xdate",
                        "Hogan": "lib/hogan/hogan-2.0.0",
                        "Templates": "../app-optimized/js/templates"
                    },
                    preserveLicenseComments: false,
                    optimize: "uglify2",
                    generateSourceMaps: true,
                    name: "hamstersBooks", // assumes a production build using almond
                    out: "app-optimized/js/hamstersbooks.js"
                }
            }
        }, hogan: {
            publish: {
                options: {
                    prettify: true,
                    asString: false,
                    amdWrapper: true
                },
                files: {
                    "app-optimized/js/templates.js": ["app/view/*.mustache"]
                }
            }
        }, uglify: {
            aggregate: {
                options: {
                    sourceMapIn: "app-optimized/js/hamstersbooks.js.map",
                    sourceMapName: 'app-optimized/js/hamstersbooks-full.js.map',
                    sourceMap: true,
                    screwIE8: true
                },
                files: {
                    "app-optimized/js/hamstersbooks-full.js": ["app/lib/requirejs/require.js", "app-optimized/js/hamstersbooks.js"]
                }
            }
        },
        "copy": {
            code: {
                files: [
                    {src: "web/index.php", dest: "app-optimized/index.php"},
                    {src: "web/api.php", dest: "app-optimized/api.php"}
                ]

            },
            media: {
                flatten: true,
                expand: true,
                cwd: "app/img",
                src: "*",
                dest: "app-optimized/img/"
            },
            htaccess: {
                files: [
                    {src: "htaccess-enable-gzip-and-routing", dest: "app-optimized/.htaccess"},
                    {src: "htaccess-set-cache-control", dest: "app-optimized/js/.htaccess"},
                    {src: "htaccess-set-cache-control", dest: "app-optimized/img/.htaccess"},
                    {src: "htaccess-set-cache-control", dest: "app-optimized/style/.htaccess"}
                ]
            }

        },

        'cache-busting': {
            js: {
                replace: ['src/web/indexDocument.html'],
                replacement: 'hamstersbooks-full.js',
                file: 'app-optimized/js/hamstersbooks-full.js',
                get_param: true
            },
            css: {
                replace: ['src/web/indexDocument.html'],
                replacement: 'hamstersbooks.css',
                file: 'app-optimized/style/hamstersbooks.css',
                get_param: true
            }
        },

        watch: {
            options: {
                spawn: false
            }, css: {
                files: ['app/**/*.less'],
                tasks: ['less', 'cache-busting']
            }, scripts: {
                files: ["app/**/*.js", "view/**/*.mustache"],
                tasks: ["hogan", "requirejs", 'uglify', 'cache-busting']
            }, php: {
                files: ["api/*", "index.php"],
                tasks: ["copy", "cache-busting"]
            }
        },
        compress: {
            options: {
                archive: "build.tar",
                mode: "tar"
            }, files: {
                dot: true,
                src: ["*", "**/*",
                    "!node_modules/**/*",
                    "!app/**/*",
                    "!.gitignore",
                    "!composer.*",
                    "!production_constants.php",
                    "!*.iml",
                    "!.idea/**/*",
                    "!package.json",
                    "!build.tar",
                    "!build.sh",
                    "!**/.DS_Store",
                    "!.git/**/*"]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-hogan');
    grunt.loadNpmTasks('grunt-cache-busting');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-compress');


    grunt.registerTask('default', ['less', 'hogan', 'requirejs', 'uglify', 'copy', 'cache-busting']);
    grunt.registerTask('build', ["default", "compress"]);

}
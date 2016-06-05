module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),

        less: {
            development: {
                options: {
                    paths: ["app/style/"],
                    compress: true,
                    cleanCss: true,
                    sourceMap: true
                },
                files: {
                    "app-optimized/style/hamstersbooks.css": "app/style/hamstersbooks.less"
                }
            }

        },
        browserify: {
            options: {
                alias: {
                    "xdate": "./node_modules/xdate/src/xdate.js",
                    "Chart": "./node_modules/chart.js/Chart.min.js",
                    "Hogan": "./node_modules/hogan.js/dist/template-3.0.2.js",
                    "Templates": "./app-optimized/js/templates.js",
                    "form-serialize": "./node_modules/form-serialize/index.js"
                },
                browserifyOptions: {
                    builtins: {},
                    insertGlobalVars: {
                        Hogan: function (file, dir) {
                            return 'require("Hogan")';
                        }
                    }
                }
            },
            dist: {
                files: {
                    'app-optimized/js/hamstersbooks.js': ["app/**/*.js", "app/*.js"]
                }
            }
        }, hogan: {
            publish: {
                options: {
                    prettify: true,
                    asString: false,
                    commonJsWrapper: true
                },
                files: {
                    "app-optimized/js/templates.js": ["app/view/*.mustache"]
                }
            }
        }, uglify: {
            aggregate: {
                options: {
                    // sourceMapIn: "app-optimized/js/hamstersbooks.js.map",
                    // sourceMapName: 'app-optimized/js/hamstersbooks.js.map',
                    sourceMap: false,
                    screwIE8: true
                },
                files: {
                    "app-optimized/js/hamstersbooks.js": ["app-optimized/js/hamstersbooks.js"]
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
                replacement: 'hamstersbooks.js',
                file: 'app-optimized/js/hamstersbooks.js',
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
                tasks: ['less', 'copy', 'cache-busting']
            }, scripts: {
                files: ["app/**/*.js", "app/view/**/*.mustache"],
                tasks: ["hogan", "browserify", 'cache-busting']
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

    grunt.loadNpmTasks('grunt-templates-hogan');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-cache-busting');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-compress');


    grunt.registerTask('default', ['less', 'hogan', 'browserify', 'copy', 'cache-busting']);
    grunt.registerTask('build', ["default", "compress"]);

}
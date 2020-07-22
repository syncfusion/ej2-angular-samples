var fs = require('fs');
var glob = require('glob');
var gulp = require("gulp");
var shelljs = global.shelljs = global.shelljs || require('shelljs');

gulp.task('copy-source', function (done) {
  var localeJson = glob.sync(__dirname + '/src/app/**/*', {
    silent: true,
    ignore: ['/src/app/common/**/*.*', '/src/app/common']
  });
  if (localeJson.length) {
    for (var i = 0; i < localeJson.length; i++) {
      if (localeJson[i].indexOf('/common') == -1) {
        console.log(localeJson[i])
        shelljs.cp('-R', localeJson[i], localeJson[i].replace('app', 'source'));
      }
    }
  }
  done();
});

gulp.task('build', function (done) {
  shelljs.exec('npm run build:prod', function (exitCode, error) {
    console.log(error);
    done(exitCode);
  })
  // runSequence('create-locale');
});

gulp.task('serve', ['copy-source', 'styles-all'], function () {
  shelljs.exec('npm run start');
});


gulp.task('clear-all', function () {
  return gulp.src(['src/**/*.js.map', 'src/**/*.json', 'src/**/*.js', 'src/**/*.d.ts', 'src/**/*.ngfactory.ts', 'src/**/*.ngstyle.ts']).pipe(clean({
    force: true
  }))
});

gulp.task('move', function (done) {
  shelljs.cp('-rf', './OpenNewSamples/*', './output');
  var mainBundle = fs.readFileSync('./output/main.js', 'utf8');
  mainBundle = mainBundle.replace(/\(\/assets/g, '(./assets');
  fs.writeFileSync('./output/main.js', mainBundle, 'utf8');
  done();
});

gulp.task('styles-replace', function (done) {
  var nos = glob.sync('node_modules/@syncfusion/ej2/*.css');
  for (var j = 0; j < nos.length; j++) {
    var htmlfile = fs.readFileSync(nos[j], 'utf8');
    fs.writeFileSync('./src/styles/' + nos[j].split('/')[3], htmlfile, 'utf8');
  }
  done();
});

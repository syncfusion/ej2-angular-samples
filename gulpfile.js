var fs = require('fs');
var glob = require('glob');
var runSequence = require('run-sequence');
var build = require("@syncfusion/ej2-build");
var gulp = require("gulp");
var webpack = require("webpack");
// var webpackConfig = require("./webpack.config.js");
// var clean = require("gulp-clean");
var shelljs = global.shelljs = global.shelljs || require('shelljs');
var common = require("./node_modules/@syncfusion/ej2-build/src/utils/common.js");
var isReleaseBranch = /^((release\/|hotfix\/))/g.test(process.env.BRANCH_NAME);

gulp.task('create-locale', function () {
  var localeJson = glob.sync(__dirname + '/src/app/**/locale.json', {
    silent: true
  });
  if (localeJson.length) {
    // baseUtil;
    var obj = {};
    for (var i = 0; i < localeJson.length; i++) {
      var compentLocale = JSON.parse(fs.readFileSync(localeJson[i]));
      obj = common.extend({}, obj, compentLocale, true);
    }
    fs.writeFileSync(__dirname + '/src/app/common/locale-string.ts', 'export let Locale: Object=' + JSON.stringify(obj) + ';');
  } else {
    fs.writeFileSync(__dirname + '/src/app/common/locale-string.ts', 'export let Locale: Object={};');
  }
});

gulp.task('copy-source', function () {
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
});

gulp.task('build', function (done) {
  shelljs.exec('npm run build:prod', function (exitCode, error) {
    console.log(error);
    done(exitCode);
  });
  // runSequence('create-locale');
});

gulp.task('serve', ['copy-source', 'styles-all'], function () {
  shelljs.exec('npm run start');
});


gulp.task('clear-all', function () {
  return gulp.src(['src/**/*.js.map', 'src/**/*.json', 'src/**/*.js', 'src/**/*.d.ts', 'src/**/*.ngfactory.ts', 'src/**/*.ngstyle.ts']).pipe(clean({
    force: true
  }));
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

gulp.task('SEO-changes', function () {
  var newWindowSamples = glob.sync('./OpenNewSamples/**/**/index.html');
  var samplsListJson = JSON.parse(fs.readFileSync('./sampleOrder.json'));
  var localCss = `<link href="../../styles/OpenNew.css" rel="stylesheet">`;
  var localCssRegex = /(.*)styles\/OpenNew.css\" rel\=\"stylesheet(.*)/g;

    for (var i = 0; i < newWindowSamples.length; i++) {

      var indexFile = fs.readFileSync(newWindowSamples[i], 'utf8');
      if (samplsListJson[newWindowSamples[i].split('/')[2]] === undefined) {
          console.log(`${i}------${newWindowSamples[i]}`);
      }
      var ControlName = samplsListJson[newWindowSamples[i].split('/')[2]].ControlName;
      var sampleName = samplsListJson[newWindowSamples[i].split('/')[2]].Samples[newWindowSamples[i].split('/')[3]];

      indexFile= indexFile.replace(/<meta name="description"(.*)/g,'');
      indexFile = indexFile.replace(/<h1 class="sb-bread-crumb-text">(.*)/g,'');

      var metaTagTemplate = `<meta name="description" content="This example demonstrates the ${sampleName} in Angular ${ControlName} Component. Explore here for more details." />`;
      indexFile = indexFile.replace(/<title>(.*)/g, '<title>' +'Angular ' + ControlName + ' ' + sampleName + ' Example - Syncfusion Demos</title>\n\t' + metaTagTemplate);
      
      var headerDesc = '';
      if(newWindowSamples[i].indexOf('sidebar')>=0) {
        headerDesc = '';
      } else {
        headerDesc = `<h1 class="sb-bread-crumb-text">Example of ${sampleName} in Angular ${ControlName} Component</h1>`;
      }

      indexFile= indexFile.replace(`<app-root></app-root>`,headerDesc + `\n\t<app-root></app-root>`);

      if(!(localCssRegex.test(indexFile))) {
        indexFile = indexFile.replace(/(.*)styles\/material.css\" rel\=\"stylesheet(.*)/g,'<link href="../../styles/material.css" rel="stylesheet">\n'+ localCss)
      }
      
      fs.writeFileSync(newWindowSamples[i], indexFile.replace('Essential JS 2','Essential Studio'), 'utf8');
    }
  }
);

function camelCase(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index)
  {
      return index === 0 ?word.toUpperCase() : word.toUpperCase();
  }).replace(/\s+/g, '').replace(/\-/g,' ');
}


gulp.task('create-sampleList', function () {

  var newWindowSamples = glob.sync('./src/app/**/**.module.ts', {
    silent: true,
    ignore: ['./src/app/app.module.ts', './src/app/common/shared.module.ts']
  });

  var temp = `{{path}}:{{name}}`
    for (var i = 0; i < newWindowSamples.length; i++) {
      var sampleJson= '';
      var indexFile = fs.readFileSync(newWindowSamples[i], 'utf8');
      paths = indexFile.match(/path(| )\:[^,]+/g);
      names = indexFile.match(/name(| |'|' )\:[^,]+/g);
      for(var j=0; j < paths.length; j++){
        var template = temp;
        template = template.replace(`{{path}}`,`"${paths[j].replace(/path(| )\:[^theme]+theme/g,'').replace('\'','')}"`);
        template = template.replace(`{{name}}`,`"${names[j].replace(/name(| |'|' )\:[^']+\'/g,'').replace('\'','')}"`);
        sampleJson += template + `,\n`;
      }
      console.log(i +`----------` +newWindowSamples[i].replace(`.module.ts`,'').replace(`./src/app/`,''));
      fs.writeFileSync(newWindowSamples[i].replace(`.module.ts`,'sampleList'), sampleJson, 'utf8');
    }
  }
);

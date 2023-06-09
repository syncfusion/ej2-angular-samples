var fs = require('fs');
var glob = require('glob');
var gulp = require("gulp");
var shelljs = global.shelljs = global.shelljs || require('shelljs');
const exec = require('child_process').exec;

gulp.task('replace-service-link', gulp.series(function (done) {
  var srcFiles = glob.sync(
    './src/app/{pdfviewer,document-editor}/*.component.ts'
  );
  var srcFilesOpen = glob.sync(
    './OpenNewSamples/{document-editor,pdfviewer}/*.js'
  );
  srcFiles = srcFiles.concat(srcFilesOpen);
  for (var src of srcFiles) {
    var content = fs.readFileSync(src, 'utf8');
    console.log(src);
    content = content.replace(/https:\/\/(?:ej2)?services.syncfusion.com\/(?:ts|js|angular|react|vue)\/(?:production|release|hotfix|development)|https:\/\/(?:ej2)?services.syncfusion.com\/production\/web-services/g, 'http://localhost:62728');
    fs.writeFileSync(src, content);
  }
  done();
}));

gulp.task('ls-log', function (cb) {
  shelljs.mkdir('-p', './cireports/logs');
  exec('npm ls >./cireports/logs/install.log', function (err, stdout, stderr) {
    cb(err);
  });
});

// Update the stackblitz files as per the ng structure
gulp.task('update-stackblitz', function (done) {

  const rootFiles = ['tsconfig.json', 'dependencies.json', 'angular.json'],
  angularJsonFiles = ['"index.html"', '"main.ts"', '"polyfills.ts"', '"tsconfig.app.json"'];
  let count = 0;

  try {

    // Read the *-stackb.json file from src/app folder
    let filesArray = glob.sync(__dirname + '/src/app/**/*.json', {
      silent: true, 
      ignore: ['/src/app/common/**/*.*', '/src/app/common']
    });

    if (!filesArray.length || !(filesArray.length > 0) ) throw('No files found');

    // Update the stackblitz file structure
    for (let i = 0; i < filesArray.length; i++) {

      if (!fs.existsSync(filesArray[i]) || !filesArray[i].includes('stackb.json')) continue;
      
      let fileData = JSON.parse(fs.readFileSync(filesArray[i], 'utf8')), jsonData = {};

      if (!fileData || Object.keys(fileData).length === 0 || fileData.hasOwnProperty("src/index.html")) continue;
      
      console.log(filesArray[i]);
      
      for (const key in fileData) {

        if (!fileData.hasOwnProperty(key)) continue;

        let element = fileData[key];
        jsonData[rootFiles.includes(key) && !key.includes('src') ? key : 'src/'+key] = element;
      }

      // Add reflect-metadata package in dependencies.json data
      if (jsonData["dependencies.json"] && !jsonData["dependencies.json"].includes('reflect-metadata')) {
        jsonData["dependencies.json"] = replaceString(jsonData["dependencies.json"], '"core-js"', '\"reflect-metadata\": \"*\", "core-js"');
      }

      // Update the files name in angular.json file
      if (jsonData["angular.json"]) {
        angularJsonFiles.forEach(fileName => {
          jsonData["angular.json"] = replaceString(jsonData["angular.json"], fileName, '"src/' + fileName.slice(1));
        });
      }

      // Update the styles link in index.html file
      if (jsonData["src/index.html"] && !jsonData["src/index.html"].includes('https://cdn.syncfusion.com/ej2/')) {
        jsonData["src/index.html"] = replaceString(jsonData["src/index.html"], '</head>', '<link href="https://cdn.syncfusion.com/ej2/material.css" rel="stylesheet"/> \n</head>');
      }

      if(!jsonData || Object.keys(jsonData).length === 0) continue;

      // Write the updated data to the file
      fs.writeFileSync(filesArray[i],JSON.stringify(jsonData), 'utf8');
      count++;
    }

    if (count > 0) console.log('\n' + count + ' files updated \n');

  } catch (error) {
    if (error) console.log("stackblitz-update: " + error);
  }
  done();
});

// Replace the string in the file
function replaceString(data, pattern, replaceString) {
  try {
    if (data && pattern && replaceString && data.includes(pattern)) {
      return data.replace(pattern, replaceString);
    }
    return data;
  } catch (error) { if (error) console.log('replaceString function: ', error); }
}

gulp.task('hide-license', function (done) {
  if (process.env.samples === 'true') {
    console.log('Skipped the hide license task for ES Build');
    done();
  } else {
    try {
      let patternArray = ['it.validate()', 'licenseValidator.validate()'];
      let pathArray = [
        require.resolve('@syncfusion/ej2-base/dist/ej2-base.umd.min.js'),
        require.resolve('@syncfusion/ej2-base/dist/es6/ej2-base.es5.js'),
        require.resolve('@syncfusion/ej2-base/dist/es6/ej2-base.es2015.js'),
        require.resolve('@syncfusion/ej2-base/src/validate-lic.js')
      ];

      for (let i in pathArray) { replaceStringInFile(pathArray[i], patternArray[i === '0' ? 0 : 1], 'true'); }

    } catch (error) { if (error) console.log('Gulp task to hide license ', error); }
    done();
  }
});

function replaceStringInFile(filePath, pattern, replaceString) {
  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf8');
      if (data && pattern && replaceString && data.includes(pattern)) {
        fs.writeFileSync(filePath, data.replace(pattern, replaceString), 'utf8');
      }
    }
  } catch (error) { if (error) console.log('replaceStringInFile function: ', error); }
}

gulp.task('copy-source', function(done) {
  gulp.src(['src/app/**/*', '!src/app/common', '!src/app/common/**/*.*'])
    .pipe(gulp.dest('src/source'))
    .on('end', function() {
      done();
    });
});

gulp.task('build', gulp.series(function (done) {
  shelljs.exec('npm run build:prod', function (exitCode, error) {
    console.log(error);
    done(exitCode);
  });
}));

// gulp.task('serve', ['copy-source', 'styles-all'], function () {
//   shelljs.exec('npm run start');
// });

gulp.task('move', function (done) {
  shelljs.cp('-rf', './OpenNewSamples/*', './output');
  shelljs.cp('-rf', './sitemap-demos.xml', './output');
  var mainBundle;
  if(fs.existsSync('./output/main.js')){
    mainBundle = fs.readFileSync('./output/main.js', 'utf8');
  } 
  mainBundle = mainBundle.replace(/\(\/assets/g, '(./assets').replace(/\('\/assets/g, `('./assets`);
  fs.writeFileSync('./output/main.js', mainBundle, 'utf8');
  done();
});

gulp.task('styles-replace', gulp.series(function (done) {
  var nos = glob.sync('node_modules/@syncfusion/ej2/*.css');
  for (var j = 0; j < nos.length; j++) {
    var htmlfile = fs.readFileSync(nos[j], 'utf8');
    fs.writeFileSync('./src/styles/' + nos[j].split('/')[3], htmlfile, 'utf8');
  }
  done();
}));

gulp.task('SEO-changes', gulp.series(function (done) {
  var newWindowSamples = glob.sync('./OpenNewSamples/**/**/index.html');
  var samplsListJson = JSON.parse(fs.readFileSync('./sampleOrder.json'));
  var localCss = `<link href="/angular/demos/styles/OpenNew.css" rel="stylesheet">`;
  var localCssRegex = /(.*)styles\/OpenNew.css\" rel\=\"stylesheet(.*)/g;

  for (var i = 0; i < newWindowSamples.length; i++) {

    var indexFile = fs.readFileSync(newWindowSamples[i], 'utf8');
    var scriptMatch = indexFile.match(/<script\b[^>]*>([\s\S]*?)<\/script>/g);
    for (var j = 0; j < scriptMatch.length; j++) {
      if (scriptMatch[j].includes('var baseref =')) {
        indexFile = indexFile.replace(scriptMatch[j], `<base href="/angular/demos/${newWindowSamples[i].replace('./OpenNewSamples/','').replace('index.html', '')}">`);
      }
    }
    if (samplsListJson[newWindowSamples[i].split('/')[2]] === undefined) {
      console.log(`${i}------${newWindowSamples[i]}`);
    }
    var ControlName = samplsListJson[newWindowSamples[i].split('/')[2]].ControlName;
    var sampleName = samplsListJson[newWindowSamples[i].split('/')[2]].Samples[newWindowSamples[i].split('/')[3]];

    indexFile = indexFile.replace(/<meta name="description"(.*)/g, '');
    indexFile = indexFile.replace(/<h1 class="sb-bread-crumb-text">(.*)/g, '');

    var metaTagTemplate = `<meta name="description" content="This example demonstrates the ${sampleName} in Angular ${ControlName} Component. Explore here for more details." />`;
    indexFile = indexFile.replace(/<title>(.*)/g, '<title>' + 'Angular ' + ControlName + ' ' + sampleName + ' Example - Syncfusion Demos</title>\n\t' + metaTagTemplate);

    var headerDesc = '';
    if (newWindowSamples[i].indexOf('sidebar') >= 0) {
      headerDesc = '';
    } else {
      headerDesc = `<h1 class="sb-bread-crumb-text">Example of ${sampleName} in Angular ${ControlName} Component</h1>`;
    }

    indexFile = indexFile.replace(`<app-root></app-root>`, headerDesc + `\n\t<app-root></app-root>`);

    if (!(localCssRegex.test(indexFile))) {
      indexFile = indexFile.replace(/(.*)styles\/material.css\" rel\=\"stylesheet(.*)/g, '<link href="/angular/demos/styles/material.css" rel="stylesheet">\n' + localCss)
    }

    indexFile = indexFile.replace('<script src="../vendors.bundle.js"></script>', `<script src="/angular/demos/${newWindowSamples[i].split('/')[2]}/vendors.bundle.js"></script>`);
    indexFile = indexFile.replace('<script src="./main.bundle.js"></script>', `<script src="/angular/demos/${newWindowSamples[i].split('/')[2]}/${newWindowSamples[i].split('/')[3]}/main.bundle.js"></script>`);

    indexFile = indexFile.replace(/<head>/, `<head>
        <script>function _0xde02(){var _0x5f2ba3=['9TYJyPJ','8519130vccODC','length','indexOf','642676nYqdEN','split','1588446jBtanR','1207348wihLFo','204856gJKXOd','1996386mrrBRO','7202905WqbCdL','href','ej2.syncfusion.com','36VGEwVI'];_0xde02=function(){return _0x5f2ba3;};return _0xde02();}var _0x5c03ce=_0x2e99;(function(_0x4610ba,_0x2edf38){var _0x2bab05=_0x2e99,_0x295339=_0x4610ba();while(!![]){try{var _0x258b1a=parseInt(_0x2bab05(0xd5))/0x1+-parseInt(_0x2bab05(0xd7))/0x2+parseInt(_0x2bab05(0xd1))/0x3*(parseInt(_0x2bab05(0xd8))/0x4)+-parseInt(_0x2bab05(0xdb))/0x5+parseInt(_0x2bab05(0xd2))/0x6+parseInt(_0x2bab05(0xda))/0x7+-parseInt(_0x2bab05(0xd9))/0x8*(parseInt(_0x2bab05(0xd0))/0x9);if(_0x258b1a===_0x2edf38)break;else _0x295339['push'](_0x295339['shift']());}catch(_0x5cb54d){_0x295339['push'](_0x295339['shift']());}}}(_0xde02,0xdfa28));var bypassKey=[0x73,0x79,0x6e,0x63,0x66,0x75,0x73,0x69,0x6f,0x6e,0x2e,0x69,0x73,0x4c,0x69,0x63,0x56,0x61,0x6c,0x69,0x64,0x61,0x74,0x65,0x64];function _0x2e99(_0x50a339,_0x56f268){var _0xde0271=_0xde02();return _0x2e99=function(_0x2e9975,_0x55ee02){_0x2e9975=_0x2e9975-0xce;var _0x32119=_0xde0271[_0x2e9975];return _0x32119;},_0x2e99(_0x50a339,_0x56f268);}function convertToChar(_0x3e5688){var _0x37d95d=_0x2e99,_0x30ade7='';for(var _0x30d200=0x0,_0x532558=_0x3e5688;_0x30d200<_0x532558[_0x37d95d(0xd3)];_0x30d200++){var _0xc98512=_0x532558[_0x30d200];_0x30ade7+=String['fromCharCode'](_0xc98512);}return _0x30ade7;}location[_0x5c03ce(0xce)]&&location['href'][_0x5c03ce(0xd4)](_0x5c03ce(0xcf))!==-0x1&&(window[convertToChar(bypassKey)['split']('.')[0x0]]={},window[convertToChar(bypassKey)[_0x5c03ce(0xd6)]('.')[0x0]][convertToChar(bypassKey)[_0x5c03ce(0xd6)]('.')[0x1]]=!![]);</script>`);

    fs.writeFileSync(newWindowSamples[i], indexFile.replace('Essential JS 2', 'Essential Studio'), 'utf8');
  }
done();
}
));

gulp.task('Angular-latest-changes', gulp.series(function (done) {
  var componentTs = glob.sync('./src/app/**/**.component.ts', {
    silent: true,
    ignore: ['/src/app/common/**/*.*', '/src/app/common']
  });
  for (tsFile of componentTs) {
    if (tsFile.indexOf('./src/app/common/') === -1) {
      var tsfileCnt = fs.readFileSync(tsFile, 'utf8');
      tsfileCnt = tsfileCnt.replace('* as data', 'data').replace('* as dataSource', 'dataSource').replace('* as Data', 'Data');
      tsfileCnt = tsfileCnt.replace('window.navigator.msSaveBlob', '(window.navigator as any).msSaveBlob').replace('window.navigator.msSaveOrOpenBlob', '(window.navigator as any).msSaveOrOpenBlob');
      tsfileCnt = tsfileCnt.replace(`import { debugOutputAstAsTypeScript } from '@angular/compiler';`, '');
      fs.writeFileSync(tsFile, tsfileCnt, 'utf8');
    }
  }
  if(fs.existsSync('./src/app/accordion/ajax.component.ts')){
    var ajaxCompTs = fs.readFileSync('./src/app/accordion/ajax.component.ts', 'utf8');
    ajaxCompTs = ajaxCompTs.replace('public ajaxData: string;', `public ajaxData: string = '';`);
    fs.writeFileSync('./src/app/accordion/ajax.component.ts', ajaxCompTs, 'utf8');
  }
  if(fs.existsSync('./src/app/diagram/custom-shapes.html')){
  var diagramHtml = fs.readFileSync('./src/app/diagram/custom-shapes.html', 'utf8');
  diagramHtml = diagramHtml.replace(`<ejs-accumulationchart style='display: block;' #pie id="total-expense" #pie width='100%' height='350px'`, `<ejs-accumulationchart style='display: block;' #pie id="total-expense" width='100%' height='350px'`);
  fs.writeFileSync('./src/app/diagram/custom-shapes.html', diagramHtml, 'utf8');
  }
  done();
}));

gulp.task('create-sampleList', gulp.series(function (done) {

  var newWindowSamples = glob.sync('./src/app/**/**.module.ts', {
    silent: true,
    ignore: ['./src/app/app.module.ts', './src/app/common/shared.module.ts']
  });

  var temp = `{{path}}:{{name}}`
  for (var i = 0; i < newWindowSamples.length; i++) {
    var sampleJson = '';
    var indexFile = fs.readFileSync(newWindowSamples[i], 'utf8');
    paths = indexFile.match(/path(| )\:[^,]+/g);
    names = indexFile.match(/name(| |'|' )\:[^,]+/g);
    for (var j = 0; j < paths.length; j++) {
      var template = temp;
      template = template.replace(`{{path}}`, `"${paths[j].replace(/path(| )\:[^theme]+theme/g, '').replace('\'', '')}"`);
      template = template.replace(`{{name}}`, `"${names[j].replace(/name(| |'|' )\:[^']+\'/g, '').replace('\'', '')}"`);
      sampleJson += template + `,\n`;
    }
    console.log(i + `----------` + newWindowSamples[i].replace(`.module.ts`, '').replace(`./src/app/`, ''));
    fs.writeFileSync(newWindowSamples[i].replace(`.module.ts`, 'sampleList'), sampleJson, 'utf8');
  }
  done();
}
));

gulp.task('CDN-changes', gulp.series(function (done) {
  var stackFiles = glob.sync('./src/app/**/*-stackb.json', {
    ignore: ['./src/app/{images,common}/**', './src/app/app.module.ts']
  });
  if (fs.existsSync('./config.json')) {
    for (var i = 0; i < stackFiles.length; i++) {
      var stackFile = fs.readFileSync(stackFiles[i], 'utf8');
      var config = JSON.parse(fs.readFileSync('./config.json', 'utf-8'));
      stackFile = stackFile.replace(/\/\/cdn.syncfusion.com\/ej2\//g, '//cdn.syncfusion.com/ej2/' + config.releaseVersion + '/');
      fs.writeFileSync(stackFiles[i], stackFile, 'utf8');
    }
  }
  done();
}));


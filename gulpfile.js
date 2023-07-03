var fs = require('fs');
var glob = require('glob');
var gulp = require("gulp");
var shelljs = global.shelljs = global.shelljs || require('shelljs');

gulp.task('build', gulp.series(function (done) {
  shelljs.exec('npm run build:prod', function (exitCode, error) {
    console.log(error);
    done(exitCode);
  });
}));

gulp.task('styles-replace', gulp.series(function (done) {
  var nos = glob.sync('node_modules/@syncfusion/ej2/*.css');
  for (var j = 0; j < nos.length; j++) {
    var htmlfile = fs.readFileSync(nos[j], 'utf8');
    fs.writeFileSync('./src/styles/' + nos[j].split('/')[3], htmlfile, 'utf8');
  }
  done();
}));

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

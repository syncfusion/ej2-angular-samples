System.config({
    transpiler: "typescript",
    typescriptOptions: {
        compilerOptions: {
            target: "umd",
            module: "commonjs",
            moduleResolution: "node",
            emitDecoratorMetadata: true,
            experimentalDecorators: true
        }
    },
    paths: {
        "syncfusion:": "{{:CDN_LINK}}",
        "angular:": "https://unpkg.com/@angular/"
    },
    map: {
        main: 'main.ts',
        typescript: "https://unpkg.com/typescript@2.2.2/lib/typescript.js",
        "plugin-json":"https://cdnjs.cloudflare.com/ajax/libs/systemjs-plugin-json/0.3.0/json.min.js",
        "@syncfusion/ej2-base": "syncfusion:ej2-base/dist/ej2-base.umd.min.js",
        "@syncfusion/ej2-buttons": "syncfusion:ej2-buttons/dist/ej2-buttons.umd.min.js",
        "@syncfusion/ej2-splitbuttons": "syncfusion:ej2-splitbuttons/dist/ej2-splitbuttons.umd.min.js",
        "@syncfusion/ej2-calendars": "syncfusion:ej2-calendars/dist/ej2-calendars.umd.min.js",
        "@syncfusion/ej2-charts": "syncfusion:ej2-charts/dist/ej2-charts.umd.min.js",
        "@syncfusion/ej2-maps": "syncfusion:ej2-maps/dist/ej2-maps.umd.min.js",
        "@syncfusion/ej2-circulargauge": "syncfusion:ej2-circulargauge/dist/ej2-circulargauge.umd.min.js",
        "@syncfusion/ej2-data": "syncfusion:ej2-data/dist/ej2-data.umd.min.js",
        "@syncfusion/ej2-dropdowns": "syncfusion:ej2-dropdowns/dist/ej2-dropdowns.umd.min.js",
        "@syncfusion/ej2-grids": "syncfusion:ej2-grids/dist/ej2-grids.umd.min.js",
        "@syncfusion/ej2-inputs": "syncfusion:ej2-inputs/dist/ej2-inputs.umd.min.js",
        "@syncfusion/ej2-lists": "syncfusion:ej2-lists/dist/ej2-lists.umd.min.js",
        "@syncfusion/ej2-navigations": "syncfusion:ej2-navigations/dist/ej2-navigations.umd.min.js",
        "@syncfusion/ej2-popups": "syncfusion:ej2-popups/dist/ej2-popups.umd.min.js",
        "@syncfusion/ej2-lineargauge": "syncfusion:ej2-lineargauge/dist/ej2-lineargauge.umd.min.js",
        "@syncfusion/ej2-pdf-export": "syncfusion:ej2-pdf-export/dist/ej2-pdf-export.umd.min.js",
        "@syncfusion/ej2-compression": "syncfusion:ej2-compression/dist/ej2-compression.umd.min.js",
        "@syncfusion/ej2-excel-export": "syncfusion:ej2-excel-export/dist/ej2-excel-export.umd.min.js",        
        "@syncfusion/ej2-file-utils": "syncfusion:ej2-file-utils/dist/ej2-file-utils.umd.min.js",
        
        "@syncfusion/ej2-ng-base": "syncfusion:ej2-ng-base/dist/ej2-ng-base.umd.min.js",
        "@syncfusion/ej2-ng-buttons": "syncfusion:ej2-ng-buttons/dist/ej2-ng-buttons.umd.min.js",
        "@syncfusion/ej2-ng-splitbuttons": "syncfusion:ej2-ng-splitbuttons/dist/ej2-ng-splitbuttons.umd.min.js",
        "@syncfusion/ej2-ng-calendars": "syncfusion:ej2-ng-calendars/dist/ej2-ng-calendars.umd.min.js",
        "@syncfusion/ej2-ng-charts": "syncfusion:ej2-ng-charts/dist/ej2-ng-charts.umd.min.js",
        "@syncfusion/ej2-ng-maps": "syncfusion:ej2-ng-maps/dist/ej2-ng-maps.umd.min.js",
        "@syncfusion/ej2-ng-circulargauge": "syncfusion:ej2-ng-circulargauge/dist/ej2-ng-circulargauge.umd.min.js",
        "@syncfusion/ej2-ng-data": "syncfusion:ej2-ng-data/dist/ej2-ng-data.umd.min.js",
        "@syncfusion/ej2-ng-dropdowns": "syncfusion:ej2-ng-dropdowns/dist/ej2-ng-dropdowns.umd.min.js",
        "@syncfusion/ej2-ng-grids": "syncfusion:ej2-ng-grids/dist/ej2-ng-grids.umd.min.js",
        "@syncfusion/ej2-ng-inputs": "syncfusion:ej2-ng-inputs/dist/ej2-ng-inputs.umd.min.js",
        "@syncfusion/ej2-ng-lists": "syncfusion:ej2-ng-lists/dist/ej2-ng-lists.umd.min.js",
        "@syncfusion/ej2-ng-navigations": "syncfusion:ej2-ng-navigations/dist/ej2-ng-navigations.umd.min.js",
        "@syncfusion/ej2-ng-popups": "syncfusion:ej2-ng-popups/dist/ej2-ng-popups.umd.min.js",
        "@syncfusion/ej2-ng-lineargauge": "syncfusion:ej2-ng-lineargauge/dist/ej2-ng-lineargauge.umd.min.js",

        '@angular/core': 'angular:core/bundles/core.umd.js',
        '@angular/common': 'angular:common/bundles/common.umd.js',
        '@angular/compiler': 'angular:compiler/bundles/compiler.umd.js',
        '@angular/http': 'angular:http/bundles/http.umd.js',
        '@angular/forms': 'angular:forms/bundles/forms.umd.js',
        '@angular/router': 'angular:router/bundles/router.umd.js',
        '@angular/platform-browser': 'angular:platform-browser/bundles/platform-browser.umd.js',
        '@angular/platform-browser-dynamic': 'angular:platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
        '@angular/material': 'angular:material/bundles/material.umd.js',
        'rxjs': 'https://unpkg.com/rxjs'
    },
     meta: { 
       '*.json': { loader: 'plugin-json' }
    }
});

System.import('main.ts').catch(console.error.bind(console));

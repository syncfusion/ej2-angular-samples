# Ej2AngularSamples

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.2.1.

## Run your Sample Browser


### Development server

Run `npm run ship-source` for to update latest styles and stackb sample source.

Then run `npm run start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Production server

Run `npm run ship-source` for to update latest styles and stackb sample source.

Then run `npm run start:prod` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Build

Run `npm run build:dev` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `npm run build:prod` flag for a production build.

# Angular Sample Configuration

## Adding your sample
Create your new folder in 'src' location and name the folder as control name for example “listview” it is control name.

_Note: Do not use whitespace at any cause in folder’s name. Use “-” instead of space._

## Add module for your sample
Add your sample router module named controlName.module.ts

_Note: Export sample routed array of links. This has used to sample list._

## Add Routing for your sample
Add your sample router module to sb router module
1.	Import your **controlName.moduler.ts** in **sb.router.ts**
2.	Add imported module to app routes

```
import { ListViewModule } from '../listview/listview.module';

const appRoutes: any = [
    { path: 'listview', loadChildren: ListViewModule },
    { path: '', redirectTo: 'listview/default', pathMatch: 'full' , hideOnDevice:true},
];
```
*Note: set **hideOnDevice** as true if you want to hide a sample in devices.*
## Adding your control dependency

Add your dependency in “package.json” file inside the dependencies.

Note: Here, '\*' Specifies that install the latest published package form the online. '\*' is recommended for Syncfusion packages.

```
"dependencies": {
        "@syncfusion/ej2-angular-base": "*",
        "@syncfusion/ej2-angular-list": "*",
},
```

Add your dependency in “system.config.js” file inside the packages.

```

packages: {
        'app': { main: 'main.js', defaultExtension: 'js' },
        'rxjs': { defaultExtension: 'js' },

        '@syncfusion/ej2-lists': { main: '/src/list-view/index.js', defaultExtension: 'js' },        
        '@syncfusion/ej2-data': { main: '/index.js', defaultExtension: 'js' },
        '@syncfusion/ej2-base': { main: '/index.js', defaultExtension: 'js' },
        '@syncfusion/ej2-angular-base': { main: '//index.js', defaultExtension: 'js' },
        '@syncfusion/ej2-angular-list': { main: 'src/list-view/index.js', defaultExtension: 'js' }
    
},

```
## Adding style dependency

Add your dependency in “config.json” file inside the styleDependency array.

```
{                       
    "styleDependency":["ej2-angular-lists"]
}
```
## Add description in sample

Add sample description  within the div tag with id as **description**.

```html
<div class="control-section">
<div id='description'>
//sample description.
</div>
</div>
```
## Configure Sample List

Add your samples in “samplelist.ts” located in “/src/common” folder
1.	Import your Sample Module routed array for json
2.	Add your samples in Sample List as Like below

```
import { listAppRoutes } from '../listview/listview.module';

export let samplesList: any = [
    {
        "name": "ListView", "category": "List", "path": "listview", "samples": listAppRoutes,
    }
];
```

## FAQ

### 1) Is it possible to refer css files in sample html file?

 No, In your sample level html files, you don't read css files.

 For example: [Refer Here](https://gitlab.syncfusion.com/essential-studio/ej2-diagram-angular-samples/blob/master/src/app/diagram/bpmn-editor.html#L1).

### 2) How to solve below Error while compilation?

#### Error: 
 
 > ngc -p ./Samples/tsconfig.json

 > : Can't bind to 'dataSource' since it isn't a known property of 'ejs-dropdownlist'.
   1. If 'ejs-dropdownlist' is an Angular component and it has 'dataSource' input, then verify that it is part of this module.
   2. If 'ejs-dropdownlist' is a Web Component then add 'CUSTOM_ELEMENTS_SCHEMA' to the '@NgModule.schemas' of this component to suppress this message.
   3. To allow any property add 'NO_ERRORS_SCHEMA' to the '@NgModule.schemas' of this component. ("              <div style="max-width: 200px"

#### Solution

If you have used some control in your samples, you have to map component module in your control module.

For Example: If You use `ejs-dropdownlist` control in your [sample](https://gitlab.syncfusion.com/essential-studio/ej2-diagram-angular-samples/blob/release/17.1.0.1/src/app/diagram/ports.html#L133), you need to import that control module in your sample level [modulefile](https://gitlab.syncfusion.com/essential-studio/ej2-diagram-angular-samples/blob/release/17.1.0.1/src/app/diagram/diagram.module.ts#L14)
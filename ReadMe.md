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



## Run your Sample Browser

To run your sample browser you can use any of the following command.

```
gulp serve
```
```
gulp watch
```

# Plunker Guidelines

1.  In import statements in html file for a sample the package subdirectory shouldn’t be mentioned. Please refer the link given below.
    
    https://gitlab.syncfusion.com/essential-studio/ej2-angular-samples/blob/development/src/grid/column/showhide.component.ts#L4

2.	In Base component dom and util are not available in the customer end. So, please don’t use the same. Please refer the link below.
	
    https://gitlab.syncfusion.com/essential-studio/ej2-angular-samples/blob/development/src/grid/column/showhide.component.ts#L4

3.	To add any icon in the samples use base64 font and don’t use any font files like ttf, woff, or svg externally. Please refer the link given below.
    
    https://gitlab.syncfusion.com/essential-studio/ej2-angular-samples/blob/development/src/toolbar/toolbar.component.css#L3

    For example:
    ```
    <style>
        @font-face {
    font-family: 'temp1';
    src:url(data:application/x-font-ttf;charset=utf-8;base64,AAEAAAAKAIAAAwAgT1MvMj0gSIMAAAEoAAAAVmNtYXDnEOdVAAABiAAAADZnbHlmazsA9wAAAcgAAAAcaGVhZA3qwqgAAADQAAAANmhoZWEHmQNrAAAArAAAACRobXR4B+gAAAAAAYAAAAAIbG9jYQAOAAAAAAHAAAAABm1heHABDQAPAAABCAAAACBuYW1lv7gVOQAAAeQAAAINcG9zdD4ZCQ8AAAP0AAAANgABAAADUv9qAFoEAAAA//4D6gABAAAAAAAAAAAAAAAAAAAAAgABAAAAAQAAThBvMl8PPPUACwPoAAAAANVxP0wAAAAA1XE/TAAAAAAD6gMrAAAACAACAAAAAAAAAAEAAAACAAMAAQAAAAAAAgAAAAoACgAAAP8AAAAAAAAAAQP0AZAABQAAAnoCvAAAAIwCegK8AAAB4AAxAQIAAAIABQMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUGZFZABA5wDnAANS/2oAWgNSAJYAAAABAAAAAAAABAAAAAPoAAAAAAACAAAAAwAAABQAAwABAAAAFAAEACIAAAAEAAQAAQAA5wD//wAA5wD//wAAAAEABAAAAAEAAAAAAAAADgAAAAEAAAAAA+oDKwACAAA3IQECA+j+DMICaQAAAAAAABIA3gABAAAAAAAAAAEAAAABAAAAAAABAAUAAQABAAAAAAACAAcABgABAAAAAAADAAUADQABAAAAAAAEAAUAEgABAAAAAAAFAAsAFwABAAAAAAAGAAUAIgABAAAAAAAKACwAJwABAAAAAAALABIAUwADAAEECQAAAAIAZQADAAEECQABAAoAZwADAAEECQACAA4AcQADAAEECQADAAoAfwADAAEECQAEAAoAiQADAAEECQAFABYAkwADAAEECQAGAAoAqQADAAEECQAKAFgAswADAAEECQALACQBCyB0ZW1wMVJlZ3VsYXJ0ZW1wMXRlbXAxVmVyc2lvbiAxLjB0ZW1wMUZvbnQgZ2VuZXJhdGVkIHVzaW5nIFN5bmNmdXNpb24gTWV0cm8gU3R1ZGlvd3d3LnN5bmNmdXNpb24uY29tACAAdABlAG0AcAAxAFIAZQBnAHUAbABhAHIAdABlAG0AcAAxAHQAZQBtAHAAMQBWAGUAcgBzAGkAbwBuACAAMQAuADAAdABlAG0AcAAxAEYAbwBuAHQAIABnAGUAbgBlAHIAYQB0AGUAZAAgAHUAcwBpAG4AZwAgAFMAeQBuAGMAZgB1AHMAaQBvAG4AIABNAGUAdAByAG8AIABTAHQAdQBkAGkAbwB3AHcAdwAuAHMAeQBuAGMAZgB1AHMAaQBvAG4ALgBjAG8AbQAAAAACAAAAAAAAAAoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIBAgEDAAxhcnJvd2hlYWQtMDEAAAAA) format('truetype');
    font-weight: normal;
    font-style: normal;
    }
    #font::after {
        content: "\e700";
        font-size: large
    }
    .icon {
        font-family: temp1;
    }
    </style>
    <div id="font" class="icon"></div>
    ```
    
4.	Use All Module instead of importing each and every service individually in the module. Please refer the link given below.
    
    https://gitlab.syncfusion.com/essential-studio/ej2-angular-samples/blob/development/src/chart/chart.module.ts#L9

import { Component, ViewEncapsulation, Inject } from '@angular/core';

/**
 * TreeView Component with Icons
 */
@Component({
    selector: 'control-content',
    templateUrl: 'icons.html',
    styleUrls: ['icons.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class IconsTreeViewComponent {

   public hierarchicalData: Object[] = [
        {
            nodeId: '01', nodeText: 'Music', icon: 'folder',
            nodeChild: [
                { nodeId: '01-01', nodeText: 'Gouttes.mp3', icon: 'audio' }
            ]
        },
        {
            nodeId: '02', nodeText: 'Videos', icon: 'folder',
            nodeChild: [
                { nodeId: '02-01', nodeText: 'Naturals.mp4', icon: 'video' },
                { nodeId: '02-02', nodeText: 'Wild.mpeg', icon: 'video' },
            ]
        },
        {
            nodeId: '03', nodeText: 'Documents', icon: 'folder',
            nodeChild: [
                { nodeId: '03-01', nodeText: 'Environment Pollution.docx', icon: 'docx' },
                { nodeId: '03-02', nodeText: 'Global Water, Sanitation, & Hygiene.docx', icon: 'docx' },
                { nodeId: '03-03', nodeText: 'Global Warming.ppt', icon: 'ppt' },
                { nodeId: '03-04', nodeText: 'Social Network.pdf', icon: 'pdf' },
                { nodeId: '03-05', nodeText: 'Youth Empowerment.pdf', icon: 'pdf' },
            ]
        },
        {
            nodeId: '04', nodeText: 'Pictures', icon: 'folder', expanded: true,
            nodeChild: [
                {
                    nodeId: '04-01', nodeText: 'Camera Roll', icon: 'folder', expanded: true,
                    nodeChild: [
                        { nodeId: '04-01-01', nodeText: 'WIN_20160726_094117.JPG', image: 'https://ej2.syncfusion.com/demos/src/images/employees/9.png' },
                        { nodeId: '04-01-02', nodeText: 'WIN_20160726_094118.JPG', image: 'https://ej2.syncfusion.com/demos/src/images/employees/3.png' },
                    ]
                },
                { nodeId: '04-02', nodeText: 'Wind.jpg', icon: 'images' },
                { nodeId: '04-03', nodeText: 'Stone.jpg', icon: 'images' },
            ]
        },
        {
            nodeId: '05', nodeText: 'Downloads', icon: 'folder',
            nodeChild: [
                { nodeId: '05-01', nodeText: 'UI-Guide.pdf', icon: 'pdf' },
                { nodeId: '05-02', nodeText: 'Tutorials.zip', icon: 'zip' },
                { nodeId: '05-03', nodeText: 'Game.exe', icon: 'exe' },
                { nodeId: '05-04', nodeText: 'TypeScript.7z', icon: 'zip' },
            ]
        }
    ];
    public field:Object ={ dataSource: this.hierarchicalData, id: 'nodeId', text: 'nodeText', child: 'nodeChild', iconCss: 'icon', imageUrl: 'image' };
    // Load icons for TreeView
    constructor( @Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['icons.component.css'];
    }
}

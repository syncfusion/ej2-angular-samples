export class SampleDataSource {
    public cellSeletionData: Object = [
    [2.9, 5.2, 3.4, 5.6, 4.4],
    [6.6, 4.8, 8, 3.9, 6.5],
    [5.1, 4.6, 5.4, 3.9, 4.3],
    [5.2, 4.3, 3.9, 6.2, 6.4],
    [7, 3, 1.9, 5.9, 3.5],
    [7.8, 5.9, 3.9, 4.3, 4.3],
    [6.5, 4.3, 3.9, 5.2, 3.9]];

    
    public chartData: object = [
        {
            type: 'Column', xName: 'x', width: 2, yName: 'y',name:'Cereals', 
            dataSource: [{ x: '2014', y: 2.9 }, { x: '2015', y: 5.2 }, { x: '2016', y: 3.4 },{ x: '2017', y: 5.6 },{ x: '2018', y: 4.4 }],
            marker: { dataLabel: { visible: false } }
        },
        {
            type: 'Column', xName: 'x', width: 2, yName: 'y',name:'Meat', 
            dataSource: [{ x: '2014', y: 6.6 }, { x: '2015', y: 4.8 }, { x: '2016', y: 8 },{ x: '2017', y: 3.9 },{ x: '2018', y: 6.5 }],
            marker: { dataLabel: { visible: false } }
        },
        {
            type: 'Column', xName: 'x', width: 2, yName: 'y',name:'Spices', 
            dataSource: [{ x: '2014', y: 5.1 }, { x: '2015', y: 4.6 }, { x: '2016', y: 5.4 },{ x: '2017', y: 3.9 },{ x: '2018', y: 4.3 }],
            marker: { dataLabel: { visible: false } }
        },
        {
            type: 'Column', xName: 'x', width: 2, yName: 'y',name:'Tea',
            dataSource: [{ x: '2014', y: 5.2 }, { x: '2015', y: 4.3 }, { x: '2016', y: 3.9 },{ x: '2017', y: 6.2 },{ x: '2018', y: 6.4 }],
            marker: { dataLabel: { visible: false } }
        },
        {
            type: 'Column', xName: 'x', width: 2, yName: 'y',name:'Edible Oil',
            dataSource: [{ x: '2014', y: 7 }, { x: '2015', y: 3 }, { x: '2016', y: 1.9 },{ x: '2017', y: 5.9 },{ x: '2018', y: 3.5 }],
            marker: { dataLabel: { visible: false } }
        },
        {
            type: 'Column', xName: 'x', width: 2, yName: 'y',name:'Dairy Products',
            dataSource: [{ x: '2014', y: 7.8 }, { x: '2015', y: 5.9 }, { x: '2016', y: 3.9 },{ x: '2017', y: 4.3 },{ x: '2018', y: 4.5 }],
            marker: { dataLabel: { visible: false } }
        },
        {
            type: 'Column', xName: 'x', width: 2, yName: 'y',name:'Wheat',
            dataSource: [{ x: '2014', y: 6.5 }, { x: '2015', y: 4.3 }, { x: '2016', y: 3.9 },{ x: '2017', y: 5.2 },{ x: '2018', y: 3.9 }],
            marker: { dataLabel: { visible: false } }
        }
    ]
}

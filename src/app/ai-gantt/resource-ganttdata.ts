export let tasksCollection = [
    {
        TaskID: 1,
        TaskName: "Project initiation",
        StartDate: new Date('03/29/2024'),
        EndDate: new Date('04/02/2024'),
        resourceInfo: [3],
        Duration: 3,
    },
    {
        TaskID: 2,
        TaskName: "Identify site location",
        StartDate: new Date('03/29/2024'),
        EndDate: new Date('04/02/2024'),
        Duration: 3,
        resourceInfo: [1]
    },
    {
        TaskID: 3,
        TaskName: "Perform soil test",
        StartDate: new Date('03/29/2024'),
        EndDate: new Date('04/03/2024'),
        Duration: 4,
        resourceInfo: [1],
    },

    {
        TaskID: 5,
        TaskName: "Project estimation",
        StartDate: new Date('03/29/2024'),
        EndDate: new Date('04/02/2024'),
        resourceInfo: [3],
        Duration: 3,
    }
];
export let resourceCollection = [
    { resourceId: 1, resourceName: 'Martin Tamer', resourceGroup: 'Planning Team' },
        { resourceId: 2, resourceName: 'Rose Fuller', resourceGroup: 'Testing Team' },
        { resourceId: 3, resourceName: 'Margaret Buchanan', resourceGroup: 'Approval Team' },
        { resourceId: 4, resourceName: 'Fuller King', resourceGroup: 'Development Team' },
        { resourceId: 5, resourceName: 'Davolio Fuller', resourceGroup: 'Approval Team' },
 
];
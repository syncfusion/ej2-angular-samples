export let tasksCollection: Object[] = [
    {
        TaskID: 1,
        TaskName: 'Product Concept',
        StartDate: new Date('04/02/2019'),
        EndDate: new Date('04/21/2019'),
        subtasks: [
            { TaskID: 2, TaskName: 'Defining the product and its usage', BaselineStartDate: new Date('04/02/2019'), BaselineEndDate: new Date('04/06/2019'), StartDate: new Date('04/02/2019'), Duration: 3,Progress: 100 },
            { TaskID: 3, TaskName: 'Defining target audience', StartDate: new Date('04/02/2019'), Duration: 3,Predecessor: "2",Progress: 100,
        },
            { TaskID: 4, TaskName: 'Prepare product sketch and notes', StartDate: new Date('04/02/2019'), Duration: 3,Progress: 100 ,Predecessor: "3" },
        ]
    },
    { TaskID: 5, TaskName: 'Concept Approval', StartDate: new Date('04/02/2019'), Duration: 0,Predecessor: "4",Progress: 100, },
    {
        TaskID: 6,
        TaskName: 'Market Research',
        StartDate: new Date('04/02/2019'),
        EndDate: new Date('04/21/2019'),
        subtasks: [
            { TaskID: 7, TaskName: 'Competitor Analysis', StartDate: new Date('04/04/2019'), Duration: 4 ,Progress: 100,Predecessor: "5" },
            { TaskID: 8, TaskName: 'Product strength analysis', StartDate: new Date('04/04/2019'),Progress: 100, Duration: 4,Predecessor: "7"   },
            { TaskID: 9, TaskName: 'Research complete', StartDate: new Date('04/04/2019'),Progress: 100, Duration: 0,Predecessor: "8" }
        ]
    }
];
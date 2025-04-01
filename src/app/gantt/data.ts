/**
 * Gantt DataSource
 */

export let projectNewData: Object[] = [
    {
        TaskID: 1,
        TaskName: 'Product concept',
        StartDate: new Date('04/02/2024'),
        EndDate: new Date('04/21/2024'),
        subtasks: [
            { TaskID: 2, TaskName: 'Defining the product and its usage', StartDate: new Date('04/02/2024'), Duration: 3, Progress: 30 },
            { TaskID: 3, TaskName: 'Defining target audience', StartDate: new Date('04/02/2024'), Duration: 3 },
            {
                TaskID: 4, TaskName: 'Prepare product sketch and notes', StartDate: new Date('04/02/2024'), Duration: 2,
                Predecessor: '2', Progress: 30
            },
        ]
    },
    {
        TaskID: 5, TaskName: 'Concept approval', StartDate: new Date('04/02/2024'), Duration: 0, Predecessor: '3,4',
        Indicators: [
            {
                'date': new Date('04/15/2024'),
                'name': 'Design Phase',
                'tooltip': 'Design phase completed',
                'iconClass': 'okIcon e-icons'
            }
        ]
    },
    {
        TaskID: 6,
        TaskName: 'Market research',
        StartDate: new Date('04/02/2024'),
        EndDate: new Date('04/21/2024'),
        subtasks: [
            {
                TaskID: 7,
                TaskName: 'Demand analysis',
                StartDate: new Date('04/04/2024'),
                EndDate: new Date('04/21/2024'),
                subtasks: [
                    {
                        TaskID: 8, TaskName: 'Customer strength', StartDate: new Date('04/04/2024'), Duration: 4,
                        Predecessor: '5', Progress: 30
                    },
                    { TaskID: 9, TaskName: 'Market opportunity analysis', StartDate: new Date('04/04/2024'), Duration: 4, Predecessor: '5' }
                ]
            },
            {
                TaskID: 10, TaskName: 'Competitor analysis', StartDate: new Date('04/04/2024'), Duration: 4,
                Predecessor: '7, 8', Progress: 30
            },
            { TaskID: 11, TaskName: 'Product strength analsysis', StartDate: new Date('04/04/2024'), Duration: 4, Predecessor: '9' },
            {
                TaskID: 12, TaskName: 'Research complete', StartDate: new Date('04/04/2024'), Duration: 0, Predecessor: '10',
                Indicators: [
                    {
                        'date': new Date('04/27/2024'),
                        'name': 'Research completed',
                        'tooltip': 'Research completed',
                        'iconClass': 'description e-icons'
                    }
                ]
            }
        ]
    },
    {
        TaskID: 13,
        TaskName: 'Product design and development',
        StartDate: new Date('04/04/2024'),
        EndDate: new Date('04/21/2024'),
        subtasks: [
            {
                TaskID: 14, TaskName: 'Functionality design', StartDate: new Date('04/04/2024'),
                Duration: 3, Progress: 30, Predecessor: '12'
            },
            { TaskID: 15, TaskName: 'Quality design', StartDate: new Date('04/04/2024'), Duration: 3, Predecessor: '12' },
            { TaskID: 16, TaskName: 'Define reliability', StartDate: new Date('04/04/2024'), Duration: 2, Progress: 30, Predecessor: '15' },
            { TaskID: 17, TaskName: 'Identifying raw materials', StartDate: new Date('04/04/2024'), Duration: 2, Predecessor: '15' },
            {
                TaskID: 18,
                TaskName: 'Define cost plan',
                StartDate: new Date('04/04/2024'),
                EndDate: new Date('04/21/2024'),
                subtasks: [
                    {
                        TaskID: 19, TaskName: 'Manufacturing cost', StartDate: new Date('04/04/2024'),
                        Duration: 2, Progress: 30, Predecessor: '17'
                    },
                    { TaskID: 20, TaskName: 'Selling cost', StartDate: new Date('04/04/2024'), Duration: 2, Predecessor: '17' }
                ]
            },
            {
                TaskID: 21,
                TaskName: 'Development of the final design',
                StartDate: new Date('04/04/2024'),
                EndDate: new Date('04/21/2024'),
                subtasks: [
                    {
                        TaskID: 22, TaskName: 'Defining dimensions and package volume', StartDate: new Date('04/04/2024'),
                        Duration: 2, Progress: 30, Predecessor: '19,20'
                    },
                    {
                        TaskID: 23, TaskName: 'Develop design to meet industry standards', StartDate: new Date('04/04/2024'),
                        Duration: 2, Predecessor: '22'
                    },
                    { TaskID: 24, TaskName: 'Include all the details', StartDate: new Date('04/04/2024'), Duration: 3, Predecessor: '23' }
                ]
            },
            {
                TaskID: 25, TaskName: 'CAD computer-aided design', StartDate: new Date('04/04/2024'),
                Duration: 3, Progress: 30, Predecessor: '24'
            },
            { TaskID: 26, TaskName: 'CAM computer-aided manufacturing', StartDate: new Date('04/04/2024'), Duration: 3, Predecessor: '25' },
            {
                TaskID: 27, TaskName: 'Design complete', StartDate: new Date('04/04/2024'), Duration: 0, Predecessor: '26'
            }

        ]
    },
    { TaskID: 28, TaskName: 'Prototype testing', StartDate: new Date('04/04/2024'), Duration: 4, Progress: 30, Predecessor: '27' },
    { TaskID: 29, TaskName: 'Include feedback', StartDate: new Date('04/04/2024'), Duration: 4, Predecessor: '28ss',  Indicators: [
        {
            'date': new Date('05/24/2024'),
            'name': 'Production phase',
            'tooltip': 'Production phase completed',
            'iconClass': 'okIcon e-icons'
        }
    ], },
    { TaskID: 30, TaskName: 'Manufacturing', StartDate: new Date('04/04/2024'), Duration: 5, Progress: 30, Predecessor: '28,29' },
    { TaskID: 31, TaskName: 'Assembling materials to finsihed goods', StartDate: new Date('04/04/2024'), Duration: 5, Predecessor: '30' },
    {
        TaskID: 32,
        TaskName: 'Feedback and testing',
        StartDate: new Date('04/04/2024'),
        EndDate: new Date('04/21/2024'),
        subtasks: [
            {
                TaskID: 33, TaskName: 'Internal testing and feedback', StartDate: new Date('04/04/2024'),
                Duration: 3, Progress: 45, Predecessor: '31'
            },
            {
                TaskID: 34, TaskName: 'Customer testing and feedback', StartDate: new Date('04/04/2024'),
                Duration: 3, Progress: 50, Predecessor: '33'
            }
        ]
    },
    {
        TaskID: 35,
        TaskName: 'Final product development',
        StartDate: new Date('04/04/2024'),
        EndDate: new Date('04/21/2024'),
        subtasks: [
            {
                TaskID: 36, TaskName: 'Important improvements', StartDate: new Date('04/04/2024'),
                Duration: 4, Progress: 30, Predecessor: '34'
            },
            {
                TaskID: 37, TaskName: 'Address any unforeseen issues', StartDate: new Date('04/04/2024'),
                Duration: 4, Progress: 30, Predecessor: '36ss',
                Indicators: [
                    {
                        'date': new Date('06/21/2024'),
                        'name': 'Sales and marketing',
                        'tooltip': 'Sales and marketing',
                        'iconClass': 'description e-icons'
                    }
                ],
            }
        ]
    },
    {
        TaskID: 38,
        TaskName: 'Final product',
        StartDate: new Date('04/04/2024'),
        EndDate: new Date('04/21/2024'),
        subtasks: [
            { TaskID: 39, TaskName: 'Branding product', StartDate: new Date('04/04/2024'), Duration: 4, Predecessor: '37' },
            {
                TaskID: 40, TaskName: 'Marketing and presales', StartDate: new Date('04/04/2024'),
                Duration: 4, Progress: 30, Predecessor: '39'
            }
        ]
    }
];

export let WorkingTimeRangeData: Object[] = [
    {
        TaskID: 1,
        TaskName: 'Product concept',
        StartDate: new Date('04/02/2024'),
        EndDate: new Date('04/21/2024'),
        subtasks: [
            { TaskID: 2, TaskName: 'Defining the product and its usage', StartDate: new Date('04/02/2024'), Duration: 3, Progress: 30 },
            { TaskID: 3, TaskName: 'Defining target audience', StartDate: new Date('04/02/2024'), Duration: 3 },
            {
                TaskID: 4, TaskName: 'Prepare product sketch and notes', StartDate: new Date('04/02/2024'), Duration: 2,
                Predecessor: '2', Progress: 30
            },
        ]
    },
    {
        TaskID: 5, TaskName: 'Concept approval', StartDate: new Date('04/02/2024'), Duration: 0, Predecessor: '3,4',
        Indicators: [
            {
                'date': new Date('04/10/2024'),
                'name': '#briefing',
                'title': 'Product concept breifing',
            }
        ]
    },
    {
        TaskID: 6,
        TaskName: 'Market research',
        StartDate: new Date('04/02/2024'),
        EndDate: new Date('04/21/2024'),
        subtasks: [
            {
                TaskID: 7,
                TaskName: 'Demand analysis',
                StartDate: new Date('04/04/2024'),
                EndDate: new Date('04/21/2024'),
                subtasks: [
                    {
                        TaskID: 8, TaskName: 'Customer strength', StartDate: new Date('04/04/2024'), Duration: 4,
                        Predecessor: '5', Progress: 30
                    },
                    { TaskID: 9, TaskName: 'Market opportunity analysis', StartDate: new Date('04/04/2024'), Duration: 4, Predecessor: '5' }
                ]
            },
            {
                TaskID: 10, TaskName: 'Competitor analysis', StartDate: new Date('04/04/2024'), Duration: 4,
                Predecessor: '7, 8', Progress: 30
            },
            { TaskID: 11, TaskName: 'Product strength analsysis', StartDate: new Date('04/04/2024'), Duration: 4, Predecessor: '9' },
            {
                TaskID: 12, TaskName: 'Research complete', StartDate: new Date('04/04/2024'), Duration: 0, Predecessor: '10',
                Indicators: [
                    {
                        'date': new Date('04/20/2024'),
                        'name': '#meeting',
                        'title': '1st board of directors meeting',
                    }
                ]
            }
        ]
    },
    {
        TaskID: 13,
        TaskName: 'Product design and development',
        StartDate: new Date('04/04/2024'),
        EndDate: new Date('04/21/2024'),
        subtasks: [
            {
                TaskID: 14, TaskName: 'Functionality design', StartDate: new Date('04/04/2024'),
                Duration: 3, Progress: 30, Predecessor: '12'
            },
            { TaskID: 15, TaskName: 'Quality design', StartDate: new Date('04/04/2024'), Duration: 3, Predecessor: '12' },
            { TaskID: 16, TaskName: 'Define reliability', StartDate: new Date('04/04/2024'), Duration: 2, Progress: 30, Predecessor: '15' },
            { TaskID: 17, TaskName: 'Identifying raw materials', StartDate: new Date('04/04/2024'), Duration: 2, Predecessor: '15' },
            {
                TaskID: 18,
                TaskName: 'Define cost plan',
                StartDate: new Date('04/04/2024'),
                EndDate: new Date('04/21/2024'),
                subtasks: [
                    {
                        TaskID: 19, TaskName: 'Manufacturing cost', StartDate: new Date('04/04/2024'),
                        Duration: 2, Progress: 30, Predecessor: '17'
                    },
                    { TaskID: 20, TaskName: 'Selling cost', StartDate: new Date('04/04/2024'), Duration: 2, Predecessor: '17' }
                ]
            },
            {
                TaskID: 21,
                TaskName: 'Development of the final design',
                StartDate: new Date('04/04/2024'),
                EndDate: new Date('04/21/2024'),
                subtasks: [
                    {
                        TaskID: 22, TaskName: 'Defining dimensions and package volume', StartDate: new Date('04/04/2024'),
                        Duration: 2, Progress: 30, Predecessor: '19,20'
                    },
                    {
                        TaskID: 23, TaskName: 'Develop design to meet industry standards', StartDate: new Date('04/04/2024'),
                        Duration: 2, Predecessor: '22'
                    },
                    { TaskID: 24, TaskName: 'Include all the details', StartDate: new Date('04/04/2024'), Duration: 3, Predecessor: '23' }
                ]
            },
            {
                TaskID: 25, TaskName: 'CAD computer-aided design', StartDate: new Date('04/04/2024'),
                Duration: 3, Progress: 30, Predecessor: '24'
            },
            { TaskID: 26, TaskName: 'CAM computer-aided manufacturing', StartDate: new Date('04/04/2024'), Duration: 3, Predecessor: '25' },
            {
                TaskID: 27, TaskName: 'Design complete', StartDate: new Date('04/04/2024'), Duration: 0, Predecessor: '26'
            }

        ]
    },
    { TaskID: 28, TaskName: 'Prototype testing', StartDate: new Date('04/04/2024'), Duration: 4, Progress: 30, Predecessor: '27' },
    { TaskID: 29, TaskName: 'Include feedback', StartDate: new Date('04/04/2024'), Duration: 4, Predecessor: '28ss',  Indicators: [
        {
            'date': new Date('05/24/2024'),
            'name': 'Production phase',
            'tooltip': 'Production phase completed',
            'iconClass': 'okIcon e-icons'
        }
    ], },
    { TaskID: 30, TaskName: 'Manufacturing', StartDate: new Date('04/04/2024'), Duration: 5, Progress: 30, Predecessor: '28,29' },
    { TaskID: 31, TaskName: 'Assembling materials to finsihed goods', StartDate: new Date('04/04/2024'), Duration: 5, Predecessor: '30' },
    {
        TaskID: 32,
        TaskName: 'Feedback and testing',
        StartDate: new Date('04/04/2024'),
        EndDate: new Date('04/21/2024'),
        subtasks: [
            {
                TaskID: 33, TaskName: 'Internal testing and feedback', StartDate: new Date('04/04/2024'),
                Duration: 3, Progress: 45, Predecessor: '31'
            },
            {
                TaskID: 34, TaskName: 'Customer testing and feedback', StartDate: new Date('04/04/2024'),
                Duration: 3, Progress: 50, Predecessor: '33'
            }
        ]
    },
    {
        TaskID: 35,
        TaskName: 'Final product development',
        StartDate: new Date('04/04/2024'),
        EndDate: new Date('04/21/2024'),
        subtasks: [
            {
                TaskID: 36, TaskName: 'Important improvements', StartDate: new Date('04/04/2024'),
                Duration: 4, Progress: 30, Predecessor: '34'
            },
            {
                TaskID: 37, TaskName: 'Address any unforeseen issues', StartDate: new Date('04/04/2024'),
                Duration: 4, Progress: 30, Predecessor: '36ss'
            }
        ]
    },
    {
        TaskID: 38,
        TaskName: 'Final product',
        StartDate: new Date('04/04/2024'),
        EndDate: new Date('04/21/2024'),
        subtasks: [
            { TaskID: 39, TaskName: 'Branding product', StartDate: new Date('04/04/2024'), Duration: 4, Predecessor: '37' },
            {
                TaskID: 40, TaskName: 'Marketing and presales', StartDate: new Date('04/04/2024'),
                Duration: 4, Progress: 30, Predecessor: '39'
            }
        ]
    }
];

export let templateData: Object[] = [
    {
        TaskID: 1,
        TaskName: 'Product concept',
        StartDate: new Date('04/02/2024'),
        EndDate: new Date('04/21/2024'),
        subtasks: [
            { TaskID: 2, TaskName: 'Defining the product and its usage', StartDate: new Date('04/02/2024'), Duration: 3, Progress: 30, resources: [2] },
            { TaskID: 3, TaskName: 'Defining target audience', StartDate: new Date('04/02/2024'), Duration: 3, resources: [3]},
            { TaskID: 4, TaskName: 'Prepare product sketch and notes', StartDate: new Date('04/02/2024'), Duration: 2, Predecessor: '2', Progress: 30, resources: [4] }]
        },
        {
        TaskID: 5, TaskName: 'Concept approval', StartDate: new Date('04/02/2024'), Duration: 0, Predecessor: '3,4', resources: [1]
    },
    {
        TaskID: 6,
        TaskName: 'Market research',
        StartDate: new Date('04/02/2024'),
        EndDate: new Date('04/21/2024'),
        subtasks: [
            {
                TaskID: 7,
                TaskName: 'Demand analysis',
                StartDate: new Date('04/04/2024'),
                EndDate: new Date('04/21/2024'),
                subtasks: [
                    { TaskID: 8, TaskName: 'Customer strength', StartDate: new Date('04/04/2024'), Duration: 4, Predecessor: '5', Progress: 30, resources: [5] },
                    { TaskID: 9, TaskName: 'Market opportunity analysis', StartDate: new Date('04/04/2024'), Duration: 4, Predecessor: '5', resources: [6] }
                ]
            },
            { TaskID: 10, TaskName: 'Competitor analysis', StartDate: new Date('04/04/2024'), Duration: 4, Predecessor: '7, 8', Progress: 30, resources: [4] },
            { TaskID: 11, TaskName: 'Product strength analsysis', StartDate: new Date('04/04/2024'), Duration: 4, Predecessor: '9', resources: [8] },
        ]
    }

]

export let zoomingData: Object[] = [
    {
        TaskID: 1,
        TaskName: 'Product concept',
        StartDate: new Date('04/02/2024'),
        EndDate: new Date('04/21/2024'),
        subtasks: [
            { TaskID: 2, TaskName: 'Defining the product and its usage', StartDate: new Date('04/02/2024'), Duration: 3, Progress: 30 },
            { TaskID: 3, TaskName: 'Defining target audience', StartDate: new Date('04/02/2024'), Duration: 3 },
            {
                TaskID: 4, TaskName: 'Prepare product sketch and notes', StartDate: new Date('04/02/2024'), Duration: 2,
                Predecessor: '2', Progress: 30
            },
        ]
    },
    {
        TaskID: 5, TaskName: 'Concept approval', StartDate: new Date('04/02/2024'), Duration: 0, Predecessor: '3,4',
        Indicators: [
            {
                'date': new Date('04/10/2024'),
                'name': '#briefing',
                'title': 'Product concept breifing',
            }
        ]
    },
    {
        TaskID: 6,
        TaskName: 'Market research',
        StartDate: new Date('04/02/2024'),
        EndDate: new Date('04/21/2024'),
        subtasks: [
            {
                TaskID: 7,
                TaskName: 'Demand analysis',
                StartDate: new Date('04/04/2024'),
                EndDate: new Date('04/21/2024'),
                subtasks: [
                    {
                        TaskID: 8, TaskName: 'Customer strength', StartDate: new Date('04/04/2024'), Duration: 4,
                        Predecessor: '5', Progress: 30
                    },
                    { TaskID: 9, TaskName: 'Market opportunity analysis', StartDate: new Date('04/04/2024'), Duration: 4, Predecessor: '5' }
                ]
            },
            {
                TaskID: 10, TaskName: 'Competitor analysis', StartDate: new Date('04/04/2024'), Duration: 4,
                Predecessor: '7, 8', Progress: 30
            },
            { TaskID: 11, TaskName: 'Product strength analsysis', StartDate: new Date('04/04/2024'), Duration: 4, Predecessor: '9' },
            {
                TaskID: 12, TaskName: 'Research complete', StartDate: new Date('04/04/2024'), Duration: 1, Predecessor: '10',
                Indicators: [
                    {
                        'date': new Date('04/20/2024'),
                        'name': '#meeting',
                        'title': '1st board of directors meeting',
                    }
                ]
            }
        ]
    }
]

export let editingResources: Object[] = [
    { resourceId: 1, resourceName: 'Martin Tamer' },
    { resourceId: 2, resourceName: 'Rose Fuller' },
    { resourceId: 3, resourceName: 'Margaret Buchanan' },
    { resourceId: 4, resourceName: 'Fuller King' },
    { resourceId: 5, resourceName: 'Davolio Fuller' },
    { resourceId: 6, resourceName: 'Van Jack' },
    { resourceId: 7, resourceName: 'Fuller Buchanan' },
    { resourceId: 8, resourceName: 'Jack Davolio' },
    { resourceId: 9, resourceName: 'Tamer Vinet' },
    { resourceId: 10, resourceName: 'Vinet Fuller' },
    { resourceId: 11, resourceName: 'Bergs Anton' },
    { resourceId: 12, resourceName: 'Construction Supervisor' }
];
export let timelineTemplateData: Object[] = [
    {
        TaskID: 1,
        TaskName: 'Product Concept',
        StartDate: new Date('03/31/2024'),
        EndDate: new Date('04/21/2024'),
        subtasks: [
            { TaskID: 2, TaskName: 'Defining the product and its usage', StartDate: new Date('03/31/2024'), Duration: 3,Progress: 30 },
            { TaskID: 3, TaskName: 'Defining target audience', StartDate: new Date('03/31/2024'), Duration: 3 },
            { TaskID: 4, TaskName: 'Prepare product sketch and notes', StartDate: new Date('03/31/2024'), Duration: 3, Predecessor: "2" ,Progress: 30},
        ]
    },
    { TaskID: 5, TaskName: 'Concept Approval', StartDate: new Date('03/31/2024'), Duration: 0, Predecessor: "3,4" },
    {
        TaskID: 6,
        TaskName: 'Market Research',
        StartDate: new Date('03/31/2024'),
        EndDate: new Date('04/21/2024'),
        subtasks: [
            {
                TaskID: 7,
                TaskName: 'Demand Analysis',
                StartDate: new Date('03/31/2024'),
                EndDate: new Date('04/21/2024'),
                subtasks: [
                    { TaskID: 8, TaskName: 'Customer strength', StartDate: new Date('03/31/2024'), Duration: 4,Progress: 30 },
                    { TaskID: 9, TaskName: 'Market opportunity analysis', StartDate: new Date('03/31/2024'), Duration: 4,}
                ]
            },
            { TaskID: 10, TaskName: 'Competitor Analysis', StartDate: new Date('03/31/2024'), Duration: 4, Predecessor: "7,8" ,Progress: 30},
            { TaskID: 11, TaskName: 'Product strength analysis', StartDate: new Date('03/31/2024'), Duration: 4, Predecessor: "9" },
            { TaskID: 12, TaskName: 'Research complete', StartDate: new Date('03/31/2024'), Duration: 0, Predecessor: "10" }
        ]
    },
    {
        TaskID: 13,
        TaskName: 'Product Design and Development',
        StartDate: new Date('03/31/2024'),
        EndDate: new Date('04/21/2024'),
        subtasks: [
            { TaskID: 14, TaskName: 'Functionality design', StartDate: new Date('03/31/2024'), Duration: 7,Progress: 30 },
            { TaskID: 15, TaskName: 'Quality design', StartDate: new Date('03/31/2024'), Duration: 5 },
            { TaskID: 16, TaskName: 'Define Reliability', StartDate: new Date('03/31/2024'), Duration: 5,Progress: 30 },
            { TaskID: 17, TaskName: 'Identifying raw materials ', StartDate: new Date('03/31/2024'), Duration: 4 },
            {
                TaskID: 18,
                TaskName: 'Define cost plan',
                StartDate: new Date('03/31/2024'),
                EndDate: new Date('04/21/2024'),
                subtasks: [
                    { TaskID: 19, TaskName: 'Manufacturing cost', StartDate: new Date('03/31/2024'), Duration: 1,Progress: 30 },
                    { TaskID: 20, TaskName: 'Selling cost', StartDate: new Date('04/04/2024'), Duration: 1 }
                ]
            },
            {
                TaskID: 21,
                TaskName: 'Development of the final design',
                StartDate: new Date('04/04/2024'),
                EndDate: new Date('04/21/2024'),
                subtasks: [
                    { TaskID: 22, TaskName: 'Defining dimensions and package volume', StartDate: new Date('04/04/2024'), Duration: 2,Progress: 30 },
                    { TaskID: 23, TaskName: 'Develop design to meet industry standards', StartDate: new Date('04/04/2024'), Duration: 3 },
                    { TaskID: 24, TaskName: 'Include all the details', StartDate: new Date('04/04/2024'), Duration: 5 }
                ]
            },
            { TaskID: 25, TaskName: 'CAD Computer-aided design', StartDate: new Date('04/04/2024'), Duration: 10,Progress: 30 },
            { TaskID: 26, TaskName: 'CAM Computer-aided manufacturing', StartDate: new Date('04/04/2024'), Duration: 10 }
        ]
    },
    { TaskID: 27, TaskName: 'Prototype Testing', StartDate: new Date('04/04/2024'), Duration: 12,Progress: 30 },
    { TaskID: 28, TaskName: 'Include feedback', StartDate: new Date('04/04/2024'), Duration: 5 },
    { TaskID: 29, TaskName: 'Manufacturing', StartDate: new Date('04/04/2024'), Duration: 9 ,Progress: 30},
    { TaskID: 30, TaskName: 'Assembling materials to finished goods', StartDate: new Date('04/04/2024'), Duration: 12 },
    {
        TaskID: 31,
        TaskName: 'Feedback and Testing',
        StartDate: new Date('04/04/2024'),
        EndDate: new Date('04/21/2024'),
        subtasks: [
            { TaskID: 32, TaskName: 'Internal testing and feedback', StartDate: new Date('04/04/2024'), Duration: 5,Progress: 30 },
            { TaskID: 33, TaskName: 'Customer testing and feedback', StartDate: new Date('04/04/2024'), Duration: 7,Progress: 30 }
        ]
    },
    {
        TaskID: 34,
        TaskName: 'Product Development',
        StartDate: new Date('04/04/2024'),
        EndDate: new Date('04/21/2024'),
        subtasks: [
            { TaskID: 35, TaskName: 'Important improvements', StartDate: new Date('04/04/2024'), Duration: 2,Progress: 30 },
            { TaskID: 36, TaskName: 'Address any unforeseen issues', StartDate: new Date('04/04/2024'), Duration: 2,Progress: 30 }
        ]
    },
    {
        TaskID: 37,
        TaskName: 'Final Product',
        StartDate: new Date('04/04/2024'),
        EndDate: new Date('04/21/2024'),
        subtasks: [
            { TaskID: 38, TaskName: 'Branding product', StartDate: new Date('04/04/2024'), Duration: 5 },
            { TaskID: 39, TaskName: 'Marketing and pre-sales', StartDate: new Date('04/04/2024'), Duration: 10,Progress: 30 }
        ]
    }
];
export let editingData: Object[] = [
    {
        TaskID: 1,
        TaskName: 'Project initiation',
        StartDate: new Date('04/02/2024'),
        EndDate: new Date('04/21/2024'),
        subtasks: [
            {
                TaskID: 2, TaskName: 'Identify site location', StartDate: new Date('04/02/2024'), Duration: 0,
                Progress: 30, resources: [1], info: 'Measure the total property area alloted for construction'
            },
            {
                TaskID: 3, TaskName: 'Perform Soil test', StartDate: new Date('04/02/2024'), Duration: 4, Predecessor: '2',
                resources: [2, 3, 5], info: 'Obtain an engineered soil test of lot where construction is planned.' +
                    'From an engineer or company specializing in soil testing'
            },
            { TaskID: 4, TaskName: 'Soil test approval', StartDate: new Date('04/02/2024'), Duration: 0, Predecessor: '3', Progress: 30 },
        ]
    },
    {
        TaskID: 5,
        TaskName: 'Project estimation',
        StartDate: new Date('04/02/2024'),
        EndDate: new Date('04/21/2024'),
        subtasks: [
            {
                TaskID: 6, TaskName: 'Develop floor plan for estimation', StartDate: new Date('04/04/2024'),
                Duration: 3, Predecessor: '4', Progress: 30, resources: 4,
                info: 'Develop floor plans and obtain a materials list for estimations'
            },
            {
                TaskID: 7, TaskName: 'List materials', StartDate: new Date('04/04/2024'),
                Duration: 3, Predecessor: '6', resources: [4, 8], info: ''
            },
            {
                TaskID: 8, TaskName: 'Estimation approval', StartDate: new Date('04/04/2024'),
                Duration: 0, Predecessor: '7', resources: [12, 5], info: ''
            }
        ]
    },
    {
        TaskID: 9, TaskName: 'Sign contract', StartDate: new Date('04/04/2024'), Duration: 1,
        Predecessor: '8', Progress: 30, resources: [12],
        info: 'If required obtain approval from HOA (homeowners association) or ARC (architectural review committee)'
    },
    {
        TaskID: 10,
        TaskName: 'Project approval and kick off',
        StartDate: new Date('04/04/2024'),
        EndDate: new Date('04/21/2024'),
        Duration: 0,
        Predecessor: '9'
    },
    {
        TaskID: 11,
        TaskName: 'Site work',
        StartDate: new Date('04/04/2024'),
        EndDate: new Date('04/21/2024'),
        subtasks: [
            {
                TaskID: 12, TaskName: 'Clear the building site', StartDate: new Date('04/04/2024'),
                Duration: 2, Progress: 30, Predecessor: '9', resources: [6, 7],
                info: 'Clear the building site (demolition of existing home if necessary)'
            },
            {
                TaskID: 13, TaskName: 'Install temporary power service', StartDate: new Date('04/04/2024'),
                Duration: 2, Predecessor: '12', resources: [6, 7], info: ''
            },
        ]
    },
    {
        TaskID: 14,
        TaskName: 'Foundation',
        StartDate: new Date('04/04/2024'),
        EndDate: new Date('04/21/2024'),
        subtasks: [
            {
                TaskID: 15, TaskName: 'Excavate for foundations', StartDate: new Date('04/04/2024'),
                Duration: 3, Progress: 30, Predecessor: '13', resources: [2, 8],
                info: 'Excavate the foundation and dig footers (Scope of work is dependent of foundation designed by engineer)'
            },
            {
                TaskID: 16, TaskName: 'Dig footer', StartDate: new Date('04/04/2024'),
                Duration: 2, Predecessor: '15FF', resources: [8], info: ''
            },
            {
                TaskID: 17, TaskName: 'Install plumbing grounds', StartDate: new Date('04/04/2024'), Duration: 4,
                Progress: 30, Predecessor: '15', resources: [9], info: ''
            },
            {
                TaskID: 18, TaskName: 'Pour a foundation and footer with concrete', StartDate: new Date('04/04/2024'),
                Duration: 1, Predecessor: '17', resources: [8, 9, 10], info: ''
            },
            {
                TaskID: 19, TaskName: 'Cure basement walls', StartDate: new Date('04/04/2024'), Duration: 4,
                Progress: 30, Predecessor: '18', resources: [10], info: ''
            },
        ]
    },
    {
        TaskID: 20,
        TaskName: 'Framing',
        StartDate: new Date('04/04/2024'),
        EndDate: new Date('04/21/2024'),
        subtasks: [
            {
                TaskID: 21, TaskName: 'Add load-bearing structure', StartDate: new Date('04/04/2024'),
                Duration: 3, Progress: 30, Predecessor: '19', resources: [4, 5],
                info: 'Build the main load-bearing structure out of thick pieces of wood and' +
                    'possibly metal I-beams for large spans with few supports'
            },
            {
                TaskID: 22, TaskName: 'Install floor joists', StartDate: new Date('04/04/2024'),
                Duration: 3, Predecessor: '21', resources: [2, 3], info: 'Add floor and ceiling joists and install subfloor panels'
            },
            {
                TaskID: 23, TaskName: 'Add ceiling joists', StartDate: new Date('04/04/2024'),
                Duration: 3, Progress: 30, Predecessor: '22SS', resources: [5], info: ''
            },
            {
                TaskID: 24, TaskName: 'Install subfloor panels', StartDate: new Date('04/04/2024'),
                Duration: 3, Predecessor: '23', resources: [8, 9]
            },
            {
                TaskID: 25, TaskName: 'Frame floor walls', StartDate: new Date('04/04/2024'), Duration: 3,
                Progress: 30, Predecessor: '24', resources: [10], info: ''
            },
            {
                TaskID: 26, TaskName: 'Frame floor decking', StartDate: new Date('04/04/2024'), Duration: 3,
                Progress: 30, Predecessor: '25SS', resources: [4, 8], info: ''
            },
        ]
    },
    {
        TaskID: 27,
        TaskName: 'Exterior finishing',
        StartDate: new Date('04/04/2024'),
        EndDate: new Date('04/21/2024'),
        subtasks: [
            {
                TaskID: 28, TaskName: 'Cover outer walls and roof in OSB', StartDate: new Date('04/04/2024'),
                Duration: 3, Progress: 30, Predecessor: '26', resources: [2, 8],
                info: 'Cover outer walls and roof in OSB or plywood and a water-resistive barrier'
            },
            {
                TaskID: 29, TaskName: 'Add water resistive barrier', StartDate: new Date('04/04/2024'),
                Duration: 3, Predecessor: '28', resources: [1, 10],
                info: 'Cover the walls with siding, typically vinyl, wood, or brick veneer but possibly stone or other materials'
            },
            {
                TaskID: 30, TaskName: 'Install roof shingles', StartDate: new Date('04/04/2024'), Duration: 3,
                Progress: 30, Predecessor: '29', resources: [8, 9], info: 'Install roof shingles or other covering for flat roof'
            },
            { TaskID: 31, TaskName: 'Install windows', StartDate: new Date('04/04/2024'), Duration: 3, Predecessor: '29', resources: 7 },
        ]
    },
    {
        TaskID: 32,
        TaskName: 'Utilities',
        StartDate: new Date('04/04/2024'),
        EndDate: new Date('04/21/2024'),
        subtasks: [
            {
                TaskID: 33, TaskName: 'Install internal plumbing', StartDate: new Date('04/04/2024'), Duration: 3,
                Progress: 30, Predecessor: '26', resources: [1, 10]
            },
            {
                TaskID: 34, TaskName: 'Install HVAC', StartDate: new Date('04/04/2024'), Duration: 3, Predecessor: '33',
                resources: [4, 9], info: 'Add internal plumbing, HVAC, electrical, and natural gas utilities'
            },
            {
                TaskID: 35, TaskName: 'Electrical utilities', StartDate: new Date('04/04/2024'), Duration: 3,
                Progress: 30, Predecessor: '34'
            },
            {
                TaskID: 36, TaskName: 'Natural gas utilities', StartDate: new Date('04/04/2024'), Duration: 3,
                Predecessor: '35', resources: 11
            },
            {
                TaskID: 37, TaskName: 'Install bathroom fixtures', StartDate: new Date('04/04/2024'), Duration: 3,
                Progress: 30, Predecessor: '35', resources: [3, 7]
            },
        ],
        info: 'Building inspector visits if necessary to approve utilities and framing'
    },
    {
        TaskID: 38,
        TaskName: 'Interior finsihing',
        StartDate: new Date('04/04/2024'),
        EndDate: new Date('04/21/2024'),
        subtasks: [
            {
                TaskID: 39, TaskName: 'Install insulation', StartDate: new Date('04/04/2024'),
                Duration: 3, Progress: 30, Predecessor: '37', resources: [1, 8], info: 'Frame interior walls with wooden 2×4s'
            },
            {
                TaskID: 40, TaskName: 'Install  drywall panels', StartDate: new Date('04/04/2024'), Duration: 3,
                Predecessor: '39', resources: 5,
                info: 'Install insulation and interior drywall panels (cementboard for wet areas) and to complete walls and ceilings'
            },
            {
                TaskID: 41, TaskName: 'Spackle', StartDate: new Date('04/04/2024'), Duration: 3,
                Progress: 30, Predecessor: '40', resources: 10
            },
            {
                TaskID: 42, TaskName: 'Apply primer', StartDate: new Date('04/04/2024'), Duration: 3,
                Predecessor: '41', resources: [10, 11]
            },
            {
                TaskID: 43, TaskName: 'Paint wall and ceilings', StartDate: new Date('04/04/2024'),
                Duration: 3, Progress: 30, Predecessor: '42', resources: [2, 9]
            },
            {
                TaskID: 44, TaskName: 'Install modular kitchen', StartDate: new Date('04/04/2024'),
                Duration: 3, Progress: 30, Predecessor: '43', resources: [5, 7]
            },
        ]
    },
    {
        TaskID: 45,
        TaskName: 'Flooring',
        StartDate: new Date('04/04/2024'),
        EndDate: new Date('04/21/2024'),
        subtasks: [
            {
                TaskID: 46, TaskName: 'Tile kitchen, bathroom and entry walls', StartDate: new Date('04/04/2024'),
                Duration: 3, Progress: 30, Predecessor: '44', resources: [4, 9, 3],
                info: 'Additional tiling on top of cementboard for wet areas, such as the bathroom and kitchen backsplash'
            },
            {
                TaskID: 47, TaskName: 'Tile floor', StartDate: new Date('04/04/2024'), Duration: 3, Predecessor: '46SS',
                resources: [2, 8], info: 'Installation of final floor covering, such as floor tile, carpet, or wood flooring'
            },
        ]
    },
    {
        TaskID: 48,
        TaskName: 'Final Acceptance',
        StartDate: new Date('04/04/2024'),
        EndDate: new Date('04/21/2024'),
        subtasks: [
            {
                TaskID: 49, TaskName: 'Final inspection', StartDate: new Date('04/04/2024'), Duration: 2,
                Progress: 30, Predecessor: '47', resources: 12, info: 'Ensure the contracted items'
            },
            {
                TaskID: 50, TaskName: 'Cleanup for occupancy', StartDate: new Date('04/04/2024'), Duration: 2,
                Predecessor: '49', resources: [1, 5], info: 'Installation of major appliances'
            },
            {
                TaskID: 51, TaskName: 'Property handover', StartDate: new Date('04/04/2024'), Duration: 0,
                Predecessor: '50', info: 'Ending the contract'
            },
        ]
    },
];

export let filteredData: Object[] = [
    {
        TaskID: 1,
        TaskName: 'Launch and flight to lunar orbit',
        StartDate: new Date('07/16/2024'),
        subtasks: [
            {
                TaskID: 2, TaskName: 'Apollo 11 blasts off from launch pad', StartDate: new Date('07/16/2024 03:32:00 AM'),
                EndDate: new Date('07/16/2024 03:32:00 AM'), Duration: 0,
            },
            {
                TaskID: 3, TaskName: 'Entry to earth’s orbit', StartDate: new Date('07/16/2024 03:32:00 AM'),
                EndDate: new Date('07/16/2024 03:44:00 AM'), Predecessor: '2FS'
            },
            {
                TaskID: 4, TaskName: 'Travelling in earth’s orbit', StartDate: new Date('07/16/2024 03:44:00 AM'),
                EndDate: new Date('07/16/2024 04:22:13 AM'), Predecessor: '3FS'
            },
            {
                TaskID: 5, TaskName: 'Trajectory change toward the Moon', StartDate: new Date('07/16/2024 04:22:13 AM'),
                EndDate: new Date('07/16/2024 04:52:00 AM'), Predecessor: '4FS'
            },
            {
                TaskID: 6, TaskName: 'extraction maneuver performed', StartDate: new Date('07/16/2024 04:52:00 AM'),
                EndDate: new Date('07/16/2024 04:52:00 AM'), Predecessor: '5FS'
            },
            {
                TaskID: 7, TaskName: 'Travelling toward moon and entering into lunar orbit', StartDate: new Date('07/16/2024 04:52:00 AM'),
                EndDate: new Date('07/16/2024 04:21:50 PM'), Predecessor: '6FS'
            },
            {
                TaskID: 8, TaskName: 'Midcourse correction, sharpening the course and testing the engine',
                StartDate: new Date('07/16/2024 11:22:00 PM'), EndDate: new Date('07/17/2024 05:21:50 AM')
            },
            {
                TaskID: 9, TaskName: 'Reached half the distance spanning between earth and moon',
                StartDate: new Date('07/17/2024 05:22:00 AM'), EndDate: new Date('07/17/2024 08:00:50 PM')
            },
            {
                TaskID: 10, TaskName: 'Reached 3/4th distance spanning between earth and moon',
                StartDate: new Date('07/17/2024 8:02:00 PM'), EndDate: new Date('07/18/2024 04:21:50 PM')
            },
            {
                TaskID: 11, TaskName: 'Reached distance 45000 miles from moon',
                StartDate: new Date('07/18/2024 11:22:00 PM'), EndDate: new Date('07/19/2024 05:21:50 PM')
            },
        ]
    },
    {
        TaskID: 12,
        TaskName: 'Lunar descent',
        StartDate: new Date('07/19/2024 05:21:50 PM'),
        subtasks: [
            {
                TaskID: 13, TaskName: 'Lunar orbiting (30 orbits)', StartDate: new Date('07/19/2024 05:21:50 PM'),
                EndDate: new Date('07/20/2024 12:52:00 AM'), Predecessor: '11FS'
            },
            {
                TaskID: 14, TaskName: 'Landing site identified', StartDate: new Date('07/20/2024 12:52:00 AM'),
                EndDate: new Date('07/20/2024 12:52:00 AM'), Predecessor: '13FS'
            },
            {
                TaskID: 15, TaskName: 'Eagle separated from Columbia.', StartDate: new Date('07/20/2024 05:44:00 PM'),
                EndDate: new Date('07/20/2024 05:44:00 PM')
            },
            {
                TaskID: 16, TaskName: 'Eagle’s decent to Moon', StartDate: new Date('07/20/2024 05:44:00 PM'),
                EndDate: new Date('07/20/2024 08:16:40 PM'), Predecessor: '15FS'
            }
        ]
    },
    {
        TaskID: 17,
        TaskName: 'Landing',
        StartDate: new Date('07/20/2024 08:17:40 PM'),
        subtasks: [
            {
                TaskID: 18, TaskName: 'Eagle’s touch down', StartDate: new Date('07/20/2024 08:17:40 PM'),
                EndDate: new Date('07/20/2024 08:17:40 PM')
            },
            {
                TaskID: 19, TaskName: 'Radio communication and performing post landing checklist',
                StartDate: new Date('07/20/2024 08:17:40 PM'), EndDate: new Date('07/20/2024 11:43:00 PM'), Predecessor: '18FS'
            },
            {
                TaskID: 20, TaskName: 'Preparations for EVA (Extra Vehicular Activity)',
                StartDate: new Date('07/20/2024 11:43:00 PM'), EndDate: new Date('07/21/2024 02:39:33 AM'), Predecessor: '19FS'
            },
            {
                TaskID: 21, TaskName: 'Hatch open and climbing down the moon', StartDate: new Date('07/21/2024 02:39:33 AM'),
                EndDate: new Date('07/21/2024 02:56:15 AM'), Predecessor: '20FS'
            },
            {
                TaskID: 22, TaskName: 'Armstrong stepped down on the moon', StartDate: new Date('07/21/2024 02:56:15 AM'),
                EndDate: new Date('07/21/2024 03:11:00 AM'), Predecessor: '21FS'
            },
        ]
    },
    {
        TaskID: 23,
        TaskName: 'Lunar surface operations',
        StartDate: new Date('07/21/2024'),
        subtasks: [
            {
                TaskID: 24, TaskName: 'Soil sample collections', StartDate: new Date('07/21/2024 02:56:15 AM'),
                EndDate: new Date('07/21/2024 03:11:00 AM')
            },
            {
                TaskID: 25, TaskName: 'Aldrin joined armstrong', StartDate: new Date('07/21/2024 03:11:00 AM'),
                EndDate: new Date('07/21/2024 03:41:00 AM'), Predecessor: '24FS'
            },
            {
                TaskID: 26, TaskName: 'planted the lunar flag assembly', StartDate: new Date('07/21/2024 03:41:00 AM'),
                EndDate: new Date('07/21/2024 03:46:00 AM'), Predecessor: '25FS'
            },
            {
                TaskID: 27, TaskName: 'President richard nixon’s telephone-radio transmission ',
                StartDate: new Date('07/21/2024 03:48:00 AM'), EndDate: new Date('07/21/2024 03:51:00 AM')
            },
            {
                TaskID: 28, TaskName: 'Collect rock samples, photos and other mission controls',
                StartDate: new Date('07/21/2024 03:52:00 AM'), EndDate: new Date('07/21/2024 04:50:00 AM')
            },
        ]
    },
    {
        TaskID: 29,
        TaskName: 'Lunar ascent',
        StartDate: new Date('07/21/2024'),
        subtasks: [
            {
                TaskID: 30, TaskName: 'Climbing the eagle to ascent', StartDate: new Date('07/21/2024 04:51:00 AM'),
                EndDate: new Date('07/21/2024 05:00:00 AM')
            },
            {
                TaskID: 31, TaskName: 'Hatch closing', StartDate: new Date('07/21/2024 05:01:00 AM'),
                EndDate: new Date('07/21/2024 05:01:00 AM'), Predecessor: '30FS'
            },
            {
                TaskID: 32, TaskName: 'Final housekeeping', StartDate: new Date('07/21/2024 05:02:00 AM'),
                EndDate: new Date('07/21/2024 08:00:00 AM')
            },
            {
                TaskID: 33, TaskName: 'Resting of astronauts', StartDate: new Date('07/21/2024 08:00:00 AM'),
                EndDate: new Date('07/21/2024 03:00:00 PM'), Predecessor: '32FS'
            },
            {
                TaskID: 34, TaskName: 'Preparation for lift off and ascent engine started', StartDate: new Date('07/21/2024 03:00:00 PM'),
                EndDate: new Date('07/21/2024 05:54:00 PM'), Predecessor: '33FS'
            },
            {
                TaskID: 35, TaskName: 'Eagle lifted off', StartDate: new Date('07/21/2024 05:54:00 PM'),
                EndDate: new Date('07/21/2024 05:54:00 PM'), Predecessor: '34FS'
            },
            {
                TaskID: 36, TaskName: 'Eagle’s travel toward Columbia', StartDate: new Date('07/21/2024 05:54:00 PM'),
                EndDate: new Date('07/21/2024 09:23:00 PM'), Predecessor: '35FS'
            },
        ]
    },
    {
        TaskID: 37,
        TaskName: 'Return',
        StartDate: new Date('07/21/2024 09:24:00 PM'),
        subtasks: [
            {
                TaskID: 38, TaskName: 'Eagle docked with columbia', StartDate: new Date('07/21/2024 09:24:00 PM'),
                EndDate: new Date('07/21/2024 09:35:00 PM')
            },
            {
                TaskID: 39, TaskName: 'Eagle’s ascent stage jettisoned into lunar orbit', StartDate: new Date('07/21/2024 09:35:00 PM'),
                EndDate: new Date('07/21/2024 11:41:00 PM'), Predecessor: '38FS'
            },
        ]
    },
    {
        TaskID: 40,
        TaskName: 'Decent toward earth  and Splashdown',
        StartDate: new Date('07/21/2024'),
        subtasks: [
            {
                TaskID: 41, TaskName: 'Spacecraft reaches 1/4th distance spanning between moon and earth',
                StartDate: new Date('07/21/2024 11:50:00 PM'), EndDate: new Date('07/22/2024 04:40:00 PM')
            },
            {
                TaskID: 42, TaskName: 'Spacecraft travels to midway point of journey',
                StartDate: new Date('07/22/2024 04:40:00 PM'), EndDate: new Date('07/23/2024 04:00:00 PM'), Predecessor: '41FS'
            },
            {
                TaskID: 43, TaskName: 'Spacecraft travels to 3/4th point of journey', StartDate: new Date('07/23/2024 04:40:00 PM'),
                EndDate: new Date('07/24/2024 10:00:00 AM'), Predecessor: '42FS'
            },
            {
                TaskID: 44, TaskName: 'Crew prepares for splashdown', StartDate: new Date('07/24/2024 11:47:00 AM'),
                EndDate: new Date('07/24/2024 04:20:00 PM')
            },
            {
                TaskID: 45, TaskName: 'Command and service modules separates', StartDate: new Date('07/24/2024 04:20:00 PM'),
                EndDate: new Date('07/24/2024 04:35:00 PM'), Predecessor: '44FS'
            },
            {
                TaskID: 46, TaskName: 'Command module re-enters the Earth’s atmosphere', StartDate: new Date('07/24/2024 04:35:00 PM'),
                EndDate: new Date('07/24/2024 04:50:00 PM'), Predecessor: '45FS'
            },
            {
                TaskID: 47, TaskName: 'Spacecraft splashes near USS hornet', StartDate: new Date('07/24/2024 04:51:00 PM'),
                EndDate: new Date('07/24/2024 04:51:00 PM')
            },
        ]
    }
];

export let projectResources: Object[] = [
    { resourceId: 1, resourceName: 'Project Manager' },
    { resourceId: 2, resourceName: 'Software Analyst' },
    { resourceId: 3, resourceName: 'Developer' },
    { resourceId: 4, resourceName: 'Testing Engineer' }
];

export let projectData: Object[] = [
    {
        taskID: 1,
        taskName: 'Project schedule',
        startDate: new Date('02/08/2024'),
        endDate: new Date('03/15/2024'),
        subtasks: [
            {
                taskID: 2,
                taskName: 'Planning',
                startDate: new Date('02/08/2024'),
                endDate: new Date('02/12/2024'),
                subtasks: [
                    {
                        taskID: 3, taskName: 'Plan timeline', startDate: new Date('02/08/2024'),
                        endDate: new Date('02/12/2024'), duration: 5, progress: '100', resourceId: [1]
                    },
                    {
                        taskID: 4, taskName: 'Plan budget', startDate: new Date('02/08/2024'),
                        endDate: new Date('02/12/2024'), duration: 5, progress: '100', resourceId: [1]
                    },
                    {
                        taskID: 5, taskName: 'Allocate resources', startDate: new Date('02/08/2024'),
                        endDate: new Date('02/12/2024'), duration: 5, progress: '100', resourceId: [1]
                    },
                    {
                        taskID: 6, taskName: 'Planning complete', startDate: new Date('02/10/2024'),
                        endDate: new Date('02/10/2024'), duration: 0, predecessor: '3FS,4FS,5FS'
                    }
                ]
            }, {
                taskID: 7,
                taskName: 'Design',
                startDate: new Date('02/15/2024'),
                endDate: new Date('02/19/2024'),
                subtasks: [
                    {
                        taskID: 8, taskName: 'Software specification', startDate: new Date('02/15/2024'),
                        endDate: new Date('02/17/2024'), duration: 3, progress: '60', predecessor: '6FS', resourceId: [2]
                    },
                    {
                        taskID: 9, taskName: 'Develop prototype', startDate: new Date('02/15/2024'),
                        endDate: new Date('02/17/2024'), duration: 3, progress: '100', predecessor: '6FS', resourceId: [3]
                    },
                    {
                        taskID: 10, taskName: 'Get approval from customer', startDate: new Date('02/18/2024'),
                        endDate: new Date('02/19/2024'), duration: 2, progress: '100', predecessor: '9FS', resourceId: [1]
                    },
                    {
                        taskID: 11, taskName: 'Design complete', startDate: new Date('02/17/2024'),
                        endDate: new Date('02/17/2024'), duration: 0, predecessor: '10FS'
                    }
                ]
            },
            {
                taskID: 12,
                taskName: 'Implementation phase',
                startDate: new Date('02/25/2024'),
                endDate: new Date('03/05/2024'),
                subtasks: [
                    {
                        taskID: 13,
                        taskName: 'Phase 1',
                        startDate: new Date('02/25/2024'),
                        endDate: new Date('03/07/2024'),
                        subtasks: [{
                            taskID: 14,
                            taskName: 'Implementation module 1',
                            startDate: new Date('02/25/2024'),
                            endDate: new Date('03/07/2024'),
                            subtasks: [
                                {
                                    taskID: 15, taskName: 'Development task 1', startDate: new Date('02/22/2024'),
                                    endDate: new Date('02/24/2024'), duration: 3, progress: '50', predecessor: '11FS', resourceId: [3]
                                },
                                {
                                    taskID: 16, taskName: 'Development task 2', startDate: new Date('02/22/2024'),
                                    endDate: new Date('02/24/2024'), duration: 3, progress: '50', predecessor: '11FS', resourceId: [3]
                                },
                                {
                                    taskID: 17, taskName: 'Testing', startDate: new Date('02/25/2024'),
                                    endDate: new Date('02/26/2024'), duration: 2, progress: '0', predecessor: '15FS,16FS', resourceId: [4]
                                },
                                {
                                    taskID: 18, taskName: 'Bug fix', startDate: new Date('03/01/2024'),
                                    endDate: new Date('03/02/2024'), duration: 2, progress: '0', predecessor: '17FS', resourceId: [3]
                                },
                                {
                                    taskID: 19, taskName: 'Customer review meeting', startDate: new Date('03/03/2024'),
                                    endDate: new Date('03/07/2024'), duration: 2, progress: '0', predecessor: '18FS', resourceId: [1]
                                },
                                {
                                    taskID: 20, taskName: 'Phase 1 complete', startDate: new Date('03/05/2024'),
                                    endDate: new Date('03/05/2024'), duration: 0, predecessor: '19FS'
                                }

                            ]
                        }]
                    },

                    {
                        taskID: 21,
                        taskName: 'Phase 2',
                        startDate: new Date('02/25/2024'),
                        endDate: new Date('03/05/2024'),
                        subtasks: [{
                            taskID: 22,
                            taskName: 'Implementation module 2',
                            startDate: new Date('02/25/2024'),
                            endDate: new Date('03/05/2024'),
                            subtasks: [
                                {
                                    taskID: 23, taskName: 'Development task 1', startDate: new Date('02/22/2024'),
                                    endDate: new Date('02/25/2024'), duration: 4, progress: '50', resourceId: [3]
                                },
                                {
                                    taskID: 24, taskName: 'Development task 2', startDate: new Date('02/22/2024'),
                                    endDate: new Date('02/25/2024'), duration: 4, progress: '50', resourceId: [3]
                                },
                                {
                                    taskID: 25, taskName: 'Testing', startDate: new Date('02/26/2024'),
                                    endDate: new Date('03/01/2024'), duration: 2, progress: '0', predecessor: '23FS,24FS', resourceId: [4]
                                },
                                {
                                    taskID: 26, taskName: 'Bug fix', startDate: new Date('03/02/2024'),
                                    endDate: new Date('03/03/2024'), duration: 2, progress: '0', predecessor: '25FS', resourceId: [3]
                                },
                                {
                                    taskID: 27, taskName: 'Customer review meeting', startDate: new Date('03/07/2024'),
                                    endDate: new Date('03/09/2024'), duration: 2, progress: '0', predecessor: '26FS', resourceId: [1]
                                },
                                {
                                    taskID: 28, taskName: 'Phase 2 complete', startDate: new Date('03/03/2024'),
                                    endDate: new Date('03/03/2024'), duration: 0, predecessor: '27FS'
                                }

                            ]
                        }]
                    },

                    {
                        taskID: 29,
                        taskName: 'Phase 3',
                        startDate: new Date('02/25/2024'),
                        endDate: new Date('03/07/2024'),
                        subtasks: [{
                            taskID: 30,
                            taskName: 'Implementation module 3',
                            startDate: new Date('02/25/2024'),
                            endDate: new Date('03/07/2024'),
                            subtasks: [
                                {
                                    taskID: 31, taskName: 'Development task 1', startDate: new Date('02/22/2024'),
                                    endDate: new Date('02/24/2024'), duration: 3, progress: '50', resourceId: [3]
                                },
                                {
                                    taskID: 32, taskName: 'Development task 2', startDate: new Date('02/22/2024'),
                                    endDate: new Date('02/24/2024'), duration: 3, progress: '50', resourceId: [3]
                                },
                                {
                                    taskID: 33, taskName: 'Testing', startDate: new Date('02/25/2024'), endDate: new Date('02/26/2024'),
                                    duration: 2, progress: '0', predecessor: '31FS,32FS', resourceId: [4]
                                },
                                {
                                    taskID: 34, taskName: 'Bug fix', startDate: new Date('03/01/2024'), endDate: new Date('03/05/2024'),
                                    duration: 2, progress: '0', predecessor: '33FS', resourceId: [3]
                                },
                                {
                                    taskID: 35, taskName: 'Customer review meeting', startDate: new Date('03/03/2024'),
                                    endDate: new Date('03/04/2024'), duration: 2, progress: '0', predecessor: '34FS',
                                    resourceId: [1]
                                },
                                {
                                    taskID: 36, taskName: 'Phase 3 complete', startDate: new Date('03/02/2024'),
                                    endDate: new Date('03/02/2024'), duration: 0, predecessor: '35FS'
                                },

                            ]
                        }]
                    }
                ]
            },
            {
                taskID: 37, taskName: 'Integration', startDate: new Date('03/08/2024'), endDate: new Date('03/10/2024'), duration: 3,
                progress: '0', predecessor: '20FS,28FS,36FS', resourceId: [3]
            },
            {
                taskID: 38, taskName: 'Final testing', startDate: new Date('03/11/2024'), endDate: new Date('03/12/2024'), duration: 2,
                progress: '0', predecessor: '37FS', resourceId: [4]
            },
            {
                taskID: 39, taskName: 'Final delivery', startDate: new Date('03/10/2024'), endDate: new Date('03/10/2024'),
                duration: 0, predecessor: '38FS'
            }
        ]
    }
];

export let baselineData: Object[] = [
    {
        TaskId: 1, TaskName: 'Receive vehicle and create job card', BaselineStartDate: new Date('03/05/2024 10:00:00 AM'),
        BaselineEndDate: new Date('03/05/2024 10:00:00 AM'), StartDate: new Date('03/05/2024 10:00:00 AM'),
        EndDate: new Date('03/05/2024 10:00:00 AM')
    },
    {
        TaskId: 2, TaskName: 'Allot mechanic and send vehicle to service bay', BaselineStartDate: new Date('03/05/2024 10:00:00 AM'),
        BaselineEndDate: new Date('03/05/2024 10:15:00 AM'), StartDate: new Date('03/05/2024 10:15:00 AM'),
        EndDate: new Date('03/05/2024 10:20:00 AM')
    },
    {
        TaskId: 3, TaskName: 'Change the receive vehicle and create job cardengine oil',
        BaselineStartDate: new Date('03/05/2024 10:15:00 AM'),
        BaselineEndDate: new Date('03/05/2024 10:45:00 AM'), StartDate: new Date('03/05/2024 10:20:00 AM'),
        EndDate: new Date('03/05/2024 10:35:00 AM')
    },
    {
        TaskId: 4, TaskName: 'Replace the oil filter', BaselineStartDate: new Date('03/05/2024 10:45:00 AM'),
        BaselineEndDate: new Date('03/05/2024 11:15:00 AM'), StartDate: new Date('03/05/2024 10:35:00 AM'),
        EndDate: new Date('03/05/2024 11:00:00 AM')
    },
    {
        TaskId: 5, TaskName: 'Replace the air filter', BaselineStartDate: new Date('03/05/2024 10:45:00 AM'),
        BaselineEndDate: new Date('03/05/2024 11:15:00 AM'), StartDate: new Date('03/05/2024 10:35:00 AM'),
        EndDate: new Date('03/05/2024 11:00:00 AM')
    },
    {
        TaskId: 6, TaskName: 'Replace the fuel filter', BaselineStartDate: new Date('03/05/2024 11:15:00 AM'),
        BaselineEndDate: new Date('03/05/2024 11:25:00 AM'), StartDate: new Date('03/05/2024 11:00:00 AM'),
        EndDate: new Date('03/05/2024 11:20:00 AM')
    },
    {
        TaskId: 7, TaskName: 'Replace the cabin filter', BaselineStartDate: new Date('03/05/2024 11:00:00 AM'),
        BaselineEndDate: new Date('03/05/2024 11:20:00 AM'), StartDate: new Date('03/05/2024 11:00:00 AM'),
        EndDate: new Date('03/05/2024 11:25:00 AM')
    },
    {
        TaskId: 8, TaskName: 'Replace the spark plugs', BaselineStartDate: new Date('03/05/2024 11:00:00 AM'),
        BaselineEndDate: new Date('03/05/2024 11:30:00 AM'), StartDate: new Date('03/05/2024 11:25:00 AM'),
        EndDate: new Date('03/05/2024 11:45:00 AM')
    },
    {
        TaskId: 9, TaskName: 'Check level and refill brake fluid/clutch fluid', BaselineStartDate: new Date('03/05/2024 11:20:00 AM'),
        BaselineEndDate: new Date('03/05/2024 11:40:00 AM'), StartDate: new Date('03/05/2024 11:30:00 AM'),
        EndDate: new Date('03/05/2024 11:50:00 AM')
    },
    {
        TaskId: 10, TaskName: 'Check Brake Pads/Liners, Brake Discs/Drums, and replace if worn out.',
        BaselineStartDate: new Date('03/05/2024 11:40:00 AM'),
        BaselineEndDate: new Date('03/05/2024 12:00:00 PM'), StartDate: new Date('03/05/2024 11:50:00 AM'),
        EndDate: new Date('03/05/2024 12:20:00 PM')
    },
    {
        TaskId: 11, TaskName: 'Check level and refill power steering fluid', BaselineStartDate: new Date('03/05/2024 11:40:00 AM'),
        BaselineEndDate: new Date('03/05/2024 12:00:00 PM'), StartDate: new Date('03/05/2024 11:50:00 AM'),
        EndDate: new Date('03/05/2024 12:15:00 PM')
    },
    {
        TaskId: 12, TaskName: 'Check level and refill automatic/manual transmission fluid',
        BaselineStartDate: new Date('03/05/2024 12:00:00 PM'),
        BaselineEndDate: new Date('03/05/2024 12:35:00 PM'), StartDate: new Date('03/05/2024 11:50:00 AM'),
        EndDate: new Date('03/05/2024 12:20:00 PM')
    },
    {
        TaskId: 13, TaskName: 'Grease and lubricate components', BaselineStartDate: new Date('03/05/2024 12:20:00 PM'),
        BaselineEndDate: new Date('03/05/2024 12:35:00 PM'), StartDate: new Date('03/05/2024 12:20:00 PM'),
        EndDate: new Date('03/05/2024 12:45:00 PM')
    },
    {
        TaskId: 14, TaskName: 'Inspect and replace the timing belt or timing chain if needed',
        BaselineStartDate: new Date('03/05/2024 12:35:00 PM'),
        BaselineEndDate: new Date('03/05/2024 1:00:00 PM'), StartDate: new Date('03/05/2024 12:45:00 PM'),
        EndDate: new Date('03/05/2024 1:00:00 PM')
    },
    {
        TaskId: 15, TaskName: 'Wheel balancing', BaselineStartDate: new Date('03/05/2024 1:00:00 PM'),
        BaselineEndDate: new Date('03/05/2024 1:20:00 PM'), StartDate: new Date('03/05/2024 1:00:00 PM'),
        EndDate: new Date('03/05/2024 1:45:00 PM')
    },
    {
        TaskId: 16, TaskName: 'Wheel alignment', BaselineStartDate: new Date('03/05/2024 1:20:00 PM'),
        BaselineEndDate: new Date('03/05/2024 1:45:00 PM'), StartDate: new Date('03/05/2024 1:45:00 PM'),
        EndDate: new Date('03/05/2024 2:45:00 PM')
    },
    {
        TaskId: 17, TaskName: 'Check for proper operation of all lights, wipers etc.', BaselineStartDate: new Date('03/05/2024 1:50:00 PM'),
        BaselineEndDate: new Date('03/05/2024 02:30:00 PM'), StartDate: new Date('03/05/2024 02:45:00 PM'),
        EndDate: new Date('03/05/2024 03:30:00 PM')
    },
    {
        TaskId: 18, TaskName: 'Check for any error codes in the ECU and take corrective action.',
        BaselineStartDate: new Date('03/05/2024 2:30:00 PM'),
        BaselineEndDate: new Date('03/05/2024 3:30:00 PM'), StartDate: new Date('03/05/2024 03:30:00 PM'),
        EndDate: new Date('03/05/2024 04:15:00 PM')
    },
    {
        TaskId: 19, TaskName: 'Use scan tool read trouble code', BaselineStartDate: new Date('03/05/2024 03:30:00 PM'),
        BaselineEndDate: new Date('03/05/2024 04:45:00 PM'), StartDate: new Date('03/05/2024 04:15:00 PM'),
        EndDate: new Date('03/05/2024 04:45:00 PM')
    },
    {
        TaskId: 20, TaskName: 'Exterior washing', BaselineStartDate: new Date('03/05/2024 04:45:00 PM'),
        BaselineEndDate: new Date('03/05/2024 05:15:00 PM'), StartDate: new Date('03/05/2024 04:45:00 PM'),
        EndDate: new Date('03/05/2024 05:30:00 PM')
    },
    {
        TaskId: 21, TaskName: 'Interior vacuuming', BaselineStartDate: new Date('03/05/2024 05:15:00 PM'),
        BaselineEndDate: new Date('03/05/2024 05:45:00 PM'), StartDate: new Date('03/05/2024 05:30:00 PM'),
        EndDate: new Date('03/05/2024 06:00:00 PM')
    },
    {
        TaskId: 22, TaskName: 'Final service inspection', BaselineStartDate: new Date('03/05/2024 05:45:00 PM'),
        BaselineEndDate: new Date('03/05/2024 06:00:00 PM'), StartDate: new Date('03/05/2024 06:00:00 PM'),
        EndDate: new Date('03/05/2024 06:30:00 PM')
    },
    {
        TaskId: 23, TaskName: 'Vehicle handover', BaselineStartDate: new Date('03/05/2024 06:00:00 PM'),
        BaselineEndDate: new Date('03/05/2024 06:00:00 PM'), StartDate: new Date('03/05/2024 06:30:00 PM'),
        EndDate: new Date('03/05/2024 06:30:00 PM')
    }
];

export let customizedData: Object[] = [
    {
        TaskId: 1, TaskName: 'Oscar moments', Performance: '90th Academy awards kicks-off and Jimmy kimmel hosts the show',
        StartDate: new Date('03/05/2024 06:00:00 PM'), EndDate: new Date('03/05/2024 06:15:00 PM')
    },
    {
        TaskId: 2, TaskName: 'Actor in a supporting role', Predecessor: '1FS',
        StartDate: new Date('03/05/2024 06:16:00 PM'), EndDate: new Date('03/05/2024 06:25:00 PM'),
        Winner: 'Sam Rockwell', Movie: 'Three Billboards Outside Ebbing, Missouri.'
    },
    {
        TaskId: 3, TaskName: 'Hair and makeup', Movie: 'Darkest Hour', Predecessor: '2FS',
        StartDate: new Date('03/05/2024 06:26:00 PM'), EndDate: new Date('03/05/2024 06:32:00 PM')
    },
    {
        TaskId: 4, TaskName: 'Costume design', Winner: 'Mark Bridges', Movie: 'Phantom Thread', Predecessor: '3FS',
        StartDate: new Date('03/05/2024 06:33:00 PM'), EndDate: new Date('03/05/2024 06:40:00 PM')
    },
    {
        TaskId: 5, TaskName: 'Documentary feature', Winner: 'Bryan Fogel', Movie: ' Icarus', Predecessor: '4FS',
        StartDate: new Date('03/05/2024 06:41:00 PM'), EndDate: new Date('03/05/2024 06:58:00 PM')
    },
    {
        TaskId: 6, TaskName: 'Best sound editing and sound mixing', Winner: 'Richard King and Alex Gibson', Movie: 'Dunkirk',
        StartDate: new Date('03/05/2024 06:59:00 PM'), EndDate: new Date('03/05/2024 07:10:00 PM'), Predecessor: '5FS'
    },
    {
        TaskId: 7, TaskName: 'Production design', Movie: 'The Shape of Water', Predecessor: '6FS',
        StartDate: new Date('03/05/2024 07:11:00 PM'), EndDate: new Date('03/05/2024 07:15:00 PM')
    },
    {
        TaskId: 8, TaskName: 'Oscar performance', Performance: 'Second performance of the night is "Remember Me" from Coco',
        StartDate: new Date('03/05/2024 07:16:00 PM'), EndDate: new Date('03/05/2024 07:23:00 PM'), Predecessor: '7FS'
    },
    {
        TaskId: 9, TaskName: 'Best foreign language film goes', Movie: 'A Fantastic Woman', Predecessor: '8FS',
        StartDate: new Date('03/05/2024 07:24:00 PM'), EndDate: new Date('03/05/2024 07:29:00 PM')
    },
    {
        TaskId: 10, TaskName: 'Best supporting actress', Winner: 'Allison Janney', Movie: 'I, Tonya',
        StartDate: new Date('03/05/2024 07:30:00 PM'), EndDate: new Date('03/05/2024 07:35:00 PM'), Predecessor: '9FS'
    },
    {
        TaskId: 11, TaskName: 'Best animated short', Winner: 'Kobe Bryant', Movie: 'Dear Basketball',
        StartDate: new Date('03/05/2024 07:36:00 PM'), EndDate: new Date('03/05/2024 07:45:00 PM'), Predecessor: '10FS'
    },
    {
        TaskId: 12, TaskName: 'Award for best animated feature.', Movie: 'Coco', Predecessor: '11FS',
        StartDate: new Date('03/05/2024 07:46:00 PM'), EndDate: new Date('03/05/2024 07:52:00 PM')
    },
    {
        TaskId: 13, TaskName: 'Best visual effects.', Movie: 'Blade Runner 2049', Predecessor: '12FS',
        StartDate: new Date('03/05/2024 07:53:00 PM'), EndDate: new Date('03/05/2024 07:56:00 PM')
    },
    {
        TaskId: 14, TaskName: 'Achievement in film editing', Movie: 'Dunkirk', Predecessor: '13FS',
        StartDate: new Date('03/05/2024 07:57:00 PM'), EndDate: new Date('03/05/2024 07:59:00 PM')
    },
    {
        TaskId: 15, TaskName: 'Oscar moments', Performance: 'Jimmy Kimmel surprises moviegoers along with celebrities',
        StartDate: new Date('03/05/2024 08:00:00 PM'), EndDate: new Date('03/05/2024 08:09:00 PM'), Predecessor: '14FS'
    },
    {
        TaskId: 16, TaskName: 'Best documentary short', Movie: 'Heaven is a Traffic Jam on the 405', Predecessor: '15FS',
        StartDate: new Date('03/05/2024 08:10:00 PM'), EndDate: new Date('03/05/2024 08:12:00 PM')
    },
    {
        TaskId: 17, TaskName: 'Best live action short film', Movie: 'The Silent Child', Predecessor: '16FS',
        StartDate: new Date('03/05/2024 08:13:00 PM'), EndDate: new Date('03/05/2024 08:15:00 PM')
    },
    {
        TaskId: 18, TaskName: 'Oscar performance',
        Performance: 'Jimmy Kimmel surprCommon and Andra Day performs "Stand Up for Something" by "Marshall"',
        StartDate: new Date('03/05/2024 08:16:00 PM'), EndDate: new Date('03/05/2024 08:25:00 PM'), Predecessor: '17FS'
    },
    {
        TaskId: 19, TaskName: 'Oscar moments',
        Performance: 'The Oscars are showcasing the #MeToo and #TimesUp movements with a montage and interviews with actors and filmmakers',
        StartDate: new Date('03/05/2024 08:26:00 PM'), EndDate: new Date('03/05/2024 08:29:00 PM'), Predecessor: '18FS'
    },
    {
        TaskId: 20, TaskName: 'Oscar for best adapted screenplay', Winner: 'James Ivory', Movie: 'Call Me By Your Name',
        StartDate: new Date('03/05/2024 08:30:00 PM'), EndDate: new Date('03/05/2024 08:35:00 PM'), Predecessor: '19FS'
    },
    {
        TaskId: 21, TaskName: 'Oscar for best original screenplay', Winner: 'Jordan Peele', Movie: 'Get Out',
        StartDate: new Date('03/05/2024 08:36:00 PM'), EndDate: new Date('03/05/2024 08:44:00 PM'), Predecessor: '20FS'
    },
    {
        TaskId: 22, TaskName: 'Oscar moments',
        Performance: 'Who’s trending on Twitter at the Oscars? Actors Timothée Chalamet, Chadwick Boseman,' +
            'Tom Holland, Lupita Nyong’o and Adam Rippon.',
        StartDate: new Date('03/05/2024 08:40:00 PM'), EndDate: new Date('03/05/2024 08:45:00 PM'), Predecessor: '21FS'
    },
    {
        TaskId: 23, TaskName: 'Best cinematography', Winner: 'Roger A. Deakins', Movie: 'Blade Runner 2049',
        StartDate: new Date('03/05/2024 08:46:00 PM'), EndDate: new Date('03/05/2024 08:48:00 PM'), Predecessor: '22FS'
    },
    {
        TaskId: 24, TaskName: 'Oscar performance',
        Performance: 'Keala Settle performs the nominated song "This is Me" from "The Greatest Showman".',
        StartDate: new Date('03/05/2024 08:49:00 PM'), EndDate: new Date('03/05/2024 08:54:00 PM'), Predecessor: '23FS'
    },
    {
        TaskId: 25, TaskName: 'Best original score', Movie: 'The Shape of Water', Predecessor: '24FS',
        StartDate: new Date('03/05/2024 08:55:00 PM'), EndDate: new Date('03/05/2024 08:59:00 PM')
    },
    {
        TaskId: 26, TaskName: 'Award for original song', Winner: 'Remember Me', Movie: 'Coco', Predecessor: '25FS',
        StartDate: new Date('03/05/2024 09:00:00 PM'), EndDate: new Date('03/05/2024 09:07:00 PM')
    },
    {
        TaskId: 27, TaskName: 'Oscar moments', Performance: 'Time to pay tribute to those in the cinema world we lost last year',
        StartDate: new Date('03/05/2024 09:05:00 PM'), EndDate: new Date('03/05/2024 09:11:00 PM'), Predecessor: '26FS'
    },
    {
        TaskId: 28, TaskName: 'Oscar for best director', Winner: 'Guillermo del Toro', Movie: 'The Shape of Water',
        StartDate: new Date('03/05/2024 09:12:00 PM'), EndDate: new Date('03/05/2024 09:19:00 PM'), Predecessor: '27FS'
    },
    {
        TaskId: 29, TaskName: 'Best actor in a leading role', Winner: 'Gary Oldman', Movie: 'The Shape of Water',
        StartDate: new Date('03/05/2024 09:20:00 PM'), EndDate: new Date('03/05/2024 09:29:00 PM'), Predecessor: '28FS'
    },
    {
        TaskId: 30, TaskName: 'Best leading actress', Winner: 'Frances McDormand', Movie: 'Three Billboards Outside Ebbing, Missouri',
        StartDate: new Date('03/05/2024 09:30:00 PM'), EndDate: new Date('03/05/2024 09:44:00 PM'), Predecessor: '29FS'
    },
    {
        TaskId: 31, TaskName: 'Oscar for best picture.', Movie: 'The Shape of Water', Predecessor: '30FS',
        StartDate: new Date('03/05/2024 09:45:00 PM'), EndDate: new Date('03/05/2024 10:00:00 PM')
    },
    {
        TaskId: 32, TaskName: 'Oscar moments', Performance: '90th Academy awards wind-up', Predecessor: '31FS',
        StartDate: new Date('03/05/2024 10:00:00 PM'), EndDate: new Date('03/05/2024 10:00:00 PM'), Duration: 0
    }
];

export let unscheduledData: Object[] = [
    {
        TaskId: 1, TaskName: 'Task 1', StartDate: new Date('01/03/2024'),
        EndDate: new Date('01/08/2024'), Duration: '5', TaskType: ''
    },
    {
        TaskId: 2, TaskName: 'Task 2', Duration: '5', TaskType: "Task with duration only"
    },
    {
        TaskId: 3, TaskName: 'Task 3', StartDate: new Date('01/03/2024'), TaskType: "Task with start date only"
    },
    {
        TaskId: 4, TaskName: 'Task 4', EndDate: new Date('01/08/2024'), TaskType: "Task with end date only"
    },
];

export let tooltipData: object[] = [
    {
        TaskID: 1,
        TaskName: 'Project initiation',
        StartDate: new Date('04/02/2024'),
        EndDate: new Date('04/21/2024'),
        subtasks: [
            {
                TaskID: 2, TaskName: 'Identify site location', StartDate: new Date('04/02/2024'), Duration: 0,
                Progress: 30, resources: [1], info: 'Measure the total property area alloted for construction',
                BaselineStartDate: new Date('04/02/2024'), BaselineEndDate: new Date('04/02/2024')
            },
            {
                TaskID: 3, TaskName: 'Perform soil test', StartDate: new Date('04/02/2024'), Duration: 4, Predecessor: '2',
                resources: [2], info: 'Obtain an engineered soil test of lot where construction is planned.' +
                    'From an engineer or company specializing in soil testing', BaselineStartDate: new Date('04/01/2024'),
                BaselineEndDate: new Date('04/04/2024')
            },
            {
                TaskID: 4, TaskName: 'Soil test approval', StartDate: new Date('04/02/2024'), Duration: 0, Predecessor: '3', Progress: 30,
                BaselineStartDate: new Date('04/06/2024'), BaselineEndDate: new Date('04/06/2024')
            },

        ]
    },
    {
        TaskID: 5,
        TaskName: 'Project estimation',
        StartDate: new Date('04/02/2024'),
        EndDate: new Date('04/21/2024'),
        subtasks: [
            {
                TaskID: 6, TaskName: 'Develop floor plan for estimation', StartDate: new Date('04/04/2024'),
                Duration: 3, Predecessor: '4', Progress: 30, resources: 4,
                info: 'Develop floor plans and obtain a materials list for estimations',
                BaselineStartDate: new Date('04/05/2024'), BaselineEndDate: new Date('04/07/2024')
            },
            {
                TaskID: 7, TaskName: 'List materials', StartDate: new Date('04/04/2024'),
                Duration: 3, Predecessor: '6', resources: [4], info: '',
                BaselineStartDate: new Date('04/09/2024'), BaselineEndDate: new Date('04/12/2024')
            },
            {
                TaskID: 8, TaskName: 'Estimation approval', StartDate: new Date('04/04/2024'),
                Duration: 0, Predecessor: '7', resources: [12], info: '',
                BaselineStartDate: new Date('04/16/2024'), BaselineEndDate: new Date('04/16/2024')
            }
        ]
    },
    {
        TaskID: 9, TaskName: 'Sign contract', StartDate: new Date('04/04/2024'), Duration: 1,
        Predecessor: '8', Progress: 30, resources: [12],
        info: 'If required obtain approval from HOA (homeowners association) or ARC (architectural review committee)',
        BaselineStartDate: new Date('04/16/2024'), BaselineEndDate: new Date('04/17/2024')
    },
    {
        TaskID: 10,
        TaskName: 'Project approval and kick off',
        StartDate: new Date('04/04/2024'),
        EndDate: new Date('04/21/2024'),
        Duration: 0,
        Predecessor: '9',
        BaselineStartDate: new Date('04/17/2024'), BaselineEndDate: new Date('04/17/2024')
    },
    {
        TaskID: 11,
        TaskName: 'Site work',
        StartDate: new Date('04/04/2024'),
        EndDate: new Date('04/21/2024'),
        subtasks: [
            {
                TaskID: 12, TaskName: 'Clear the building site', StartDate: new Date('04/04/2024'),
                Duration: 2, Progress: 30, Predecessor: '9',
                info: 'Clear the building site (demolition of existing home if necessary)',
                BaselineStartDate: new Date('04/16/2024'), BaselineEndDate: new Date('04/18/2024')
            },
            {
                TaskID: 13, TaskName: 'Install temporary power service', StartDate: new Date('04/04/2024'),
                Duration: 2, Predecessor: '12', info: '',
                BaselineStartDate: new Date('04/17/2024'), BaselineEndDate: new Date('04/19/2024')
            },
        ]
    }
];

export let selfData: object[] = [
    { taskID: 1, taskName: "Project Schedule", startDate: new Date("02/04/2024"), endDate: new Date("03/10/2024") },
    { taskID: 2, taskName: "Planning", startDate: new Date("02/04/2024"), endDate: new Date("02/10/2024"), parentID: 1 },
    { taskID: 3, taskName: "Plan timeline", startDate: new Date("02/04/2024"), endDate: new Date("02/10/2024"), duration: 6, progress: "60", parentID: 2 },
    { taskID: 4, taskName: "Plan budget", startDate: new Date("02/04/2024"), endDate: new Date("02/10/2024"), duration: 6, progress: "90", parentID: 2 },
    { taskID: 5, taskName: "Allocate resources", startDate: new Date("02/04/2024"), endDate: new Date("02/10/2024"), duration: 6, progress: "75", parentID: 2 },
    { taskID: 6, taskName: "Planning complete", startDate: new Date("02/06/2024"), endDate: new Date("02/10/2024"), duration: 0, predecessor: "3FS,4FS,5FS", parentID: 2 },
    { taskID: 7, taskName: "Design", startDate: new Date("02/13/2024"), endDate: new Date("02/17/2024"), parentID: 1, },
    { taskID: 8, taskName: "Software Specification", startDate: new Date("02/13/2024"), endDate: new Date("02/15/2024"), duration: 3, progress: "60", predecessor: "6FS", parentID: 7, },
    { taskID: 9, taskName: "Develop prototype", startDate: new Date("02/13/2024"), endDate: new Date("02/15/2024"), duration: 3, progress: "100", predecessor: "6FS", parentID: 7, },
    { taskID: 10, taskName: "Get approval from customer", startDate: new Date("02/16/2024"), endDate: new Date("02/17/2024"), duration: 2, progress: "100", predecessor: "9FS", parentID: 7, },
    { taskID: 11, taskName: "Design complete", startDate: new Date("02/17/2024"), endDate: new Date("02/17/2024"), duration: 0, predecessor: "10FS", parentID: 7, }
];

export let labelData: object[] = [
    {
        TaskID: 1,
        TaskName: 'Project initiation',
        StartDate: new Date('04/02/2024'),
        EndDate: new Date('04/21/2024'),
        subtasks: [
            {
                TaskID: 2, TaskName: 'Identify site location', StartDate: new Date('04/02/2024'), Duration: 0,
                Progress: 30, resources: [1], info: 'Measure the total property area alloted for construction',
                BaselineStartDate: new Date('04/02/2024'), BaselineEndDate: new Date('04/02/2024')
            },
            {
                TaskID: 3, TaskName: 'Perform soil test', StartDate: new Date('04/02/2024'), Duration: 4, Predecessor: '2',
                resources: [2, 3, 5], info: 'Obtain an engineered soil test of lot where construction is planned.' +
                    'From an engineer or company specializing in soil testing', BaselineStartDate: new Date('04/01/2024'),
                BaselineEndDate: new Date('04/04/2024')
            },
            {
                TaskID: 4, TaskName: 'Soil test approval', StartDate: new Date('04/02/2024'), Duration: 0, Predecessor: '3', Progress: 30,
                BaselineStartDate: new Date('04/06/2024'), BaselineEndDate: new Date('04/06/2024')
            },

        ]
    },
    {
        TaskID: 5,
        TaskName: 'Project estimation',
        StartDate: new Date('04/02/2024'),
        EndDate: new Date('04/21/2024'),
        subtasks: [
            {
                TaskID: 6, TaskName: 'Develop floor plan for estimation', StartDate: new Date('04/04/2024'),
                Duration: 3, Predecessor: '4', Progress: 30, resources: 4,
                info: 'Develop floor plans and obtain a materials list for estimations',
                BaselineStartDate: new Date('04/05/2024'), BaselineEndDate: new Date('04/07/2024')
            },
            {
                TaskID: 7, TaskName: 'List materials', StartDate: new Date('04/04/2024'),
                Duration: 3, Predecessor: '6', resources: [4, 8], info: '',
                BaselineStartDate: new Date('04/09/2024'), BaselineEndDate: new Date('04/12/2024')
            },
            {
                TaskID: 8, TaskName: 'Estimation approval', StartDate: new Date('04/04/2024'),
                Duration: 0, Predecessor: '7', resources: [12, 5], info: '',
                BaselineStartDate: new Date('04/16/2024'), BaselineEndDate: new Date('04/16/2024')
            }
        ]
    },
    {
        TaskID: 9, TaskName: 'Sign contract', StartDate: new Date('04/04/2024'), Duration: 1,
        Predecessor: '8', Progress: 30, resources: [12],
        info: 'If required obtain approval from HOA (homeowners association) or ARC (architectural review committee)',
        BaselineStartDate: new Date('04/16/2024'), BaselineEndDate: new Date('04/17/2024')
    },
    {
        TaskID: 10,
        TaskName: 'Project approval and kick off',
        StartDate: new Date('04/04/2024'),
        EndDate: new Date('04/21/2024'),
        Duration: 0,
        Predecessor: '9',
        BaselineStartDate: new Date('04/17/2024'), BaselineEndDate: new Date('04/17/2024')
    },
    {
        TaskID: 11,
        TaskName: 'Site work',
        StartDate: new Date('04/04/2024'),
        EndDate: new Date('04/21/2024'),
        subtasks: [
            {
                TaskID: 12, TaskName: 'Clear the building site', StartDate: new Date('04/04/2024'),
                Duration: 2, Progress: 30, Predecessor: '9',
                info: 'Clear the building site (demolition of existing home if necessary)',
                BaselineStartDate: new Date('04/16/2024'), BaselineEndDate: new Date('04/18/2024')
            },
            {
                TaskID: 13, TaskName: 'Install temporary power service', StartDate: new Date('04/04/2024'),
                Duration: 2, Predecessor: '12', info: '',
                BaselineStartDate: new Date('04/17/2024'), BaselineEndDate: new Date('04/19/2024')
            },
        ]
    },
];
export let resourceData: object[] = [
    {
        TaskID: 1,
        TaskName: 'Project initiation',
        StartDate: new Date('03/29/2024'),
        EndDate: new Date('04/21/2024'),
        subtasks: [
            {
                TaskID: 2, TaskName: 'Identify site location', StartDate: new Date('03/29/2024'), Duration: 3,
                Progress: 30, work: 10, resources: [{ resourceId: 1, resourceUnit: 50 }]
            },
            {
                TaskID: 3, TaskName: 'Perform soil test', StartDate: new Date('03/29/2024'), Duration: 4,
                resources: [{ resourceId: 2, resourceUnit: 70 }], Progress: 30, work: 20
            },
            {
                TaskID: 4, TaskName: 'Soil test approval', StartDate: new Date('03/29/2024'), Duration: 4,
                resources: [{ resourceId: 1, resourceUnit: 75 }], Predecessor: 2, Progress: 30, work: 10,
            },
        ]
    },
    {
        TaskID: 5,
        TaskName: 'Project estimation', StartDate: new Date('03/29/2024'), EndDate: new Date('04/21/2024'),
        subtasks: [
            {
                TaskID: 6, TaskName: 'Develop floor plan for estimation', StartDate: new Date('03/29/2024'),
                Duration: 3, Progress: 30, resources: [{ resourceId: 2, resourceUnit: 70 }], Predecessor: '3FS+2', work: 30
            },
            {
                TaskID: 7, TaskName: 'List materials', StartDate: new Date('04/08/2024'), Duration: 12,
                resources: [{ resourceId: 6, resourceUnit: 40 }], Progress: 30, work: 40
            },
            {
                TaskID: 8, TaskName: 'Estimation approval', StartDate: new Date('04/03/2024'),
                Duration: 10, resources: [{ resourceId: 5, resourceUnit: 75 }], Progress: 30, work: 60,
            },
            {
                TaskID: 9, TaskName: 'Excavate for foundations', StartDate: new Date('04/01/2024'),
                Duration: 4, Progress: 30, resources: [{ resourceId: 4, resourceUnit: 100 }], work: 32
            },
            {
                TaskID: 10, TaskName: 'Install plumbing grounds', StartDate: new Date('04/08/2024'), Duration: 4,
                Progress: 30, Predecessor: '9SS', resources: [{ resourceId: 3, resourceUnit: 100 }], work: 32
            },
            {
                TaskID: 11, TaskName: 'Dig footer', StartDate: new Date('04/08/2024'),
                Duration: 3, resources: [{ resourceId: 2, resourceUnit: 100 }], work: 24
            },
            {
                TaskID: 12, TaskName: 'Electrical utilities', StartDate: new Date('04/03/2024'),
                Duration: 4, Progress: 30, resources: [{ resourceId: 3, resourceUnit: 100 }], work: 32
            }
        ]
    },
    {
        TaskID: 13, TaskName: 'Sign contract', StartDate: new Date('04/04/2024'), Duration: 2,
        Progress: 30,
    }
];
export let resourceResources: object[] = [
    { resourceId: 1, resourceName: 'Martin Tamer' },
    { resourceId: 2, resourceName: 'Rose Fuller' },
    { resourceId: 3, resourceName: 'Margaret Buchanan' },
    { resourceId: 4, resourceName: 'Fuller King' },
    { resourceId: 5, resourceName: 'Davolio Fuller' },
    { resourceId: 6, resourceName: 'Van Jack' },
    { resourceId: 7, resourceName: 'Fuller Buchanan' },
    { resourceId: 8, resourceName: 'Jack Davolio' },
    { resourceId: 9, resourceName: 'Tamer Vinet' },
    { resourceId: 10, resourceName: 'Vinet Fuller' },
    { resourceId: 11, resourceName: 'Bergs Anton' },
    { resourceId: 12, resourceName: 'Construction Supervisor' }
];
export let resourceAllocationData: object[] = [
  {
      TaskID: 1,
      TaskName: 'Project initiation',
      StartDate: new Date('03/29/2024'),
      EndDate: new Date('04/21/2024'),
      subtasks: [
          {
              TaskID: 2, TaskName: 'Identify site location', StartDate: new Date('03/29/2024'), Duration: 2,
              Progress: 30, work: 16, resources: [4]
          },
          {
              TaskID: 3, TaskName: 'Perform soil test', StartDate: new Date('03/29/2024'), Duration: 4,
              resources: [1], work: 32
          },
          {
              TaskID: 4, TaskName: 'Soil test approval', StartDate: new Date('03/29/2024'), Duration: 2,
              work: 16, resources: [2], Progress: 30
          },
      ]
  },
  {
      TaskID: 5,
      TaskName: 'Project estimation', StartDate: new Date('03/29/2024'), EndDate: new Date('04/21/2024'),
      subtasks: [
          {
              TaskID: 6, TaskName: 'Develop floor plan for estimation', StartDate: new Date('03/29/2024'),
              Duration: 3, Progress: 30, resources: [3], work: 30
          },
          {
              TaskID: 7, TaskName: 'List materials', StartDate: new Date('04/01/2024'), Duration: 4,
              work: 48, resources: [2]
          },
          {
              TaskID: 8, TaskName: 'Estimation approval', StartDate: new Date('04/01/2024'),
              Duration: 3, work: 60, resources: [4]
          }
      ]
  },
  {
      TaskID: 9, TaskName: 'Sign contract', StartDate: new Date('04/01/2024'), Duration: 2,
      Progress: 30, resources: [5], work: 24
  }
];
export let resourceAllocationResources: object[] = [
  { resourceId: 1, resourceName: 'Rose Fuller' },
  { resourceId: 2, resourceName: 'Fuller King' },
  { resourceId: 3, resourceName: 'Tamer Vinet' },
  { resourceId: 4, resourceName: 'Van Jack' },
  { resourceId: 5, resourceName: 'Bergs Anton' }
];
export let taskModeData: Object[] = [
    {
        "TaskID": 1,
        "TaskName": "Parent Task 1",
        "StartDate": new Date("02/27/2024"),
        "EndDate": new Date("03/03/2024"),
        "Progress": "40",
        "isManual" : true,
        resources: [1],
        "Children": [
             { "TaskID": 2, resources: [2,3],"TaskName": "Child Task 1", "StartDate": new Date("02/27/2024"), "EndDate": new Date("03/03/2024"), "Progress": "40" },
             { "TaskID": 3, "TaskName": "Child Task 2", "StartDate": new Date("02/26/2024"), "EndDate": new Date("03/03/2024"), "Progress": "40","isManual": true },
             { "TaskID": 4, "TaskName": "Child Task 3", "StartDate": new Date("02/27/2024"), "EndDate": new Date("03/03/2024"), "Duration": 5, "Progress": "40", }
        ]
    },
    {
        "TaskID": 5,
        "TaskName": "Parent Task 2",
        "StartDate": new Date("03/05/2024"),
        "EndDate": new Date("03/09/2024"),
        "Progress": "40",
        "isManual": true,
        "Children": [
             { "TaskID": 6, "TaskName": "Child Task 1", "StartDate": new Date("03/06/2024"), "EndDate": new Date("03/09/2024"), "Progress": "40" },
             { "TaskID": 7, "TaskName": "Child Task 2", "StartDate": new Date("03/06/2024"), "EndDate": new Date("03/09/2024"), "Progress": "40", },
             { "TaskID": 8, "TaskName": "Child Task 3", "StartDate": new Date("02/28/2024"), "EndDate": new Date("03/05/2024"), "Progress": "40","isManual":true },
             { "TaskID": 9, "TaskName": "Child Task 4", "StartDate": new Date("03/04/2024"), "EndDate": new Date("03/09/2024"), "Progress": "40","isManual":true }
        ]
    },
    {
        "TaskID": 10,
        "TaskName": "Parent Task 3",
        "StartDate": new Date("03/13/2024"),
        "EndDate": new Date("03/17/2024"),
        "Progress": "40",
        "Children": [
             { "TaskID": 11, "TaskName": "Child Task 1", "StartDate": new Date("03/13/2024"), "EndDate": new Date("03/17/2024"), "Progress": "40" },
             { "TaskID": 12, "TaskName": "Child Task 2", "StartDate": new Date("03/13/2024"), "EndDate": new Date("03/17/2024"), "Progress": "40", },
             { "TaskID": 13, "TaskName": "Child Task 3", "StartDate": new Date("03/13/2024"), "EndDate": new Date("03/17/2024"), "Progress": "40", },
             { "TaskID": 14, "TaskName": "Child Task 4", "StartDate": new Date("03/12/2024"), "EndDate": new Date("03/17/2024"), "Progress": "40","isManual":true },
             { "TaskID": 15, "TaskName": "Child Task 5", "StartDate": new Date("03/13/2024"), "EndDate": new Date("03/17/2024"), "Progress": "40", }
        ]
    }
];
export let resourcesData: object[] = [
    {
        TaskID: 1,
        TaskName: 'Project initiation',
        StartDate: new Date('03/29/2024'),
        EndDate: new Date('04/21/2024'),
        subtasks: [
            {
                TaskID: 2, TaskName: 'Identify site location', StartDate: new Date('03/29/2024'), Duration: 3,
                Progress: 30, work: 10, resources: [{ resourceId: 1, resourceUnit: 50 }]
            },
            {
                TaskID: 3, TaskName: 'Perform soil test', StartDate: new Date('03/29/2024'), Duration: 4,
                resources: [{ resourceId: 2, resourceUnit: 70 }], Progress: 30, work: 20
            },
            {
                TaskID: 4, TaskName: 'Soil test approval', StartDate: new Date('03/29/2024'), Duration: 4,
                resources: [{ resourceId: 1, resourceUnit: 75 }], Predecessor: 2, Progress: 30, work: 10,
            },
        ]
    },
    {
        TaskID: 5,
        TaskName: 'Project estimation', StartDate: new Date('03/29/2024'), EndDate: new Date('04/21/2024'),
        subtasks: [
            {
                TaskID: 6, TaskName: 'Develop floor plan for estimation', StartDate: new Date('03/29/2024'),
                Duration: 3, Progress: 30, resources: [{ resourceId: 2, resourceUnit: 70 }], Predecessor: '3FS+2', work: 30
            },
            {
                TaskID: 7, TaskName: 'List materials', StartDate: new Date('04/08/2024'), Duration: 12,
                resources: [{ resourceId: 6, resourceUnit: 40 }], Progress: 30, work: 40
            },
            {
                TaskID: 8, TaskName: 'Estimation approval', StartDate: new Date('04/03/2024'),
                Duration: 10, resources: [{ resourceId: 5, resourceUnit: 75 }], Progress: 30, work: 60,
            },
            {
                TaskID: 9, TaskName: 'Excavate for foundations', StartDate: new Date('04/01/2024'),
                Duration: 4, Progress: 30, resources: [{ resourceId: 4, resourceUnit: 100 }], work: 32
            },
            {
                TaskID: 10, TaskName: 'Install plumbing grounds', StartDate: new Date('04/08/2024'), Duration: 4,
                Progress: 30, Predecessor: '9SS', resources: [{ resourceId: 3, resourceUnit: 100 }], work: 32
            },
            {
                TaskID: 11, TaskName: 'Dig footer', StartDate: new Date('04/08/2024'),
                Duration: 3, resources: [{ resourceId: 2, resourceUnit: 100 }], work: 24
            },
            {
                TaskID: 12, TaskName: 'Electrical utilities', StartDate: new Date('04/03/2024'),
                Duration: 4, Progress: 30, resources: [{ resourceId: 3, resourceUnit: 100 }],  work: 32
            }
        ]
    },
    {
        TaskID: 13, TaskName: 'Sign contract', StartDate: new Date('04/04/2024'), Duration: 2,
        Progress: 30,
    }
];
export let resourceCollection: object[] = [
    { resourceId: 1, resourceName: 'Martin Tamer', resourceGroup: 'Planning Team'},
    { resourceId: 2, resourceName: 'Rose Fuller', resourceGroup: 'Testing Team' },
    { resourceId: 3, resourceName: 'Margaret Buchanan', resourceGroup: 'Approval Team' },
    { resourceId: 4, resourceName: 'Fuller King', resourceGroup: 'Development Team' },
    { resourceId: 5, resourceName: 'Davolio Fuller', resourceGroup: 'Approval Team' },
    { resourceId: 6, resourceName: 'Van Jack', resourceGroup: 'Development Team' }
];

export let multiTaskbarData: Object[] = [
    {
        TaskID: 1,
        TaskName: 'Project initiation',
        StartDate: new Date('03/29/2024'),
        EndDate: new Date('04/21/2024'),
        subtasks: [
            {
                TaskID: 2, TaskName: 'Identify site location', StartDate: new Date('03/29/2024'), Duration: 3,
                Progress: 30, work: 10, resources: [{ resourceId: 1, resourceUnit: 50 }]
            },
            {
                TaskID: 3, TaskName: 'Perform soil test', StartDate: new Date('04/03/2024'), Duration: 4,
                resources: [{ resourceId: 1, resourceUnit: 70 }], Predecessor: 2, Progress: 30, work: 20
            },
            {
                TaskID: 4, TaskName: 'Soil test approval', StartDate: new Date('04/09/2024'), Duration: 4,
                resources: [{ resourceId: 1, resourceUnit: 25 }], Predecessor: 3, Progress: 30, work: 10,
            },
        ]
    },
    {
        TaskID: 5,
        TaskName: 'Project estimation', StartDate: new Date('03/29/2024'), EndDate: new Date('04/21/2024'),
        subtasks: [
            {
                TaskID: 6, TaskName: 'Develop floor plan for estimation', StartDate: new Date('04/01/2024'),
                Duration: 5, Progress: 30, resources: [{ resourceId: 2, resourceUnit: 50 }], work: 30
            },
            {
                TaskID: 7, TaskName: 'List materials', StartDate: new Date('04/04/2024'), Duration: 4,
                resources: [{ resourceId: 2, resourceUnit: 40 }], Predecessor: '6FS-2', Progress: 30, work: 40
            },
            {
                TaskID: 8, TaskName: 'Estimation approval', StartDate: new Date('04/09/2024'),
                Duration: 4, resources: [{ resourceId: 2, resourceUnit: 75 }], Predecessor: '7FS-1', Progress: 30, work: 60,
            }
        ]
    },
    {
        TaskID: 9,
        TaskName: 'Site work',
        StartDate: new Date('04/04/2024'),
        EndDate: new Date('04/21/2024'),
        subtasks: [
            {
                TaskID: 10, TaskName: 'Install temporary power service', StartDate: new Date('04/01/2024'), Duration: 14,
                Progress: 30, resources: [{ resourceId: 3, resourceUnit: 100 }], work: 112
            },
            {
                TaskID: 11, TaskName: 'Clear the building site', StartDate: new Date('04/08/2024'),
                Duration: 9, Progress: 30, Predecessor: '10FS-2', resources: [{ resourceId: 3, resourceUnit: 100 }], work: 72
            },
            {
                TaskID: 12, TaskName: 'Sign contract', StartDate: new Date('04/12/2024'),
                Duration: 5, resources: [{ resourceId: 3, resourceUnit: 100 }], work: 40, Predecessor: '11FS-2'
            },
        ]
    },
    {
        TaskID: 13,
        TaskName: 'Foundation',
        StartDate: new Date('04/04/2024'),
        EndDate: new Date('04/21/2024'),
        subtasks: [
            {
                TaskID: 14, TaskName: 'Excavate for foundations', StartDate: new Date('04/01/2024'),
                Duration: 2, Progress: 30, resources: [{ resourceId: 4, resourceUnit: 100 }], work: 16,
            },
            {
                TaskID: 15, TaskName: 'Dig footer', StartDate: new Date('04/04/2024'),
                Duration: 2, Predecessor: '14FS + 1', resources: [{ resourceId: 4, resourceUnit: 100 }], work: 16,
            },
            {
                TaskID: 16, TaskName: 'Install plumbing grounds', StartDate: new Date('04/08/2024'), Duration: 2,
                Progress: 30, Predecessor: 15, resources: [{ resourceId: 4, resourceUnit: 100 }], work: 16,
            }
        ]
    },
    {
        TaskID: 17,
        TaskName: 'Framing',
        StartDate: new Date('04/04/2024'),
        EndDate: new Date('04/21/2024'),
        subtasks: [
            {
                TaskID: 18, TaskName: 'Add load-bearing structure', StartDate: new Date('04/03/2024'),
                Duration: 2, Progress: 30, resources: [{ resourceId: 5, resourceUnit: 100 }], work: 16,
            },
            {
                TaskID: 19, TaskName: 'Natural gas utilities', StartDate: new Date('04/08/2024'),
                Duration: 4, Predecessor: '18', resources: [{ resourceId: 5, resourceUnit: 100 }], work: 32,
            },
            {
                TaskID: 20, TaskName: 'Electrical utilities', StartDate: new Date('04/11/2024'),
                Duration: 2, Progress: 30, Predecessor: '19FS + 1', resources: [{ resourceId: 5, resourceUnit: 100 }], work: 16,
            }
        ]
    }
];
export let resources: object[] = [
    { resourceId: 1, resourceName: 'Martin Tamer', resourceGroup: 'Planning Team', isExpand: false},
    { resourceId: 2, resourceName: 'Rose Fuller', resourceGroup: 'Testing Team', isExpand: true},
    { resourceId: 3, resourceName: 'Margaret Buchanan', resourceGroup: 'Approval Team', isExpand: false },
    { resourceId: 4, resourceName: 'Fuller King', resourceGroup: 'Development Team', isExpand: false },
    { resourceId: 5, resourceName: 'Davolio Fuller', resourceGroup: 'Approval Team', isExpand: true }
];

export let splitTasksData: object[] = [
    {
        TaskID: 1,
        TaskName: 'Project Schedule',
        StartDate: new Date('02/04/2024'),
        EndDate: new Date('03/10/2024'),
        subtasks: [
            {
                TaskID: 2,
                TaskName: 'Planning',
                StartDate: new Date('02/04/2024'),
                subtasks: [
                    {
                        TaskID: 3, TaskName: 'Plan timeline', StartDate: new Date('02/04/2024'), EndDate: new Date('02/10/2024'),
                        Duration: 10, Progress: '60',
                        Segments: [
                            { StartDate: new Date('02/04/2024'), Duration: 2 },
                            { StartDate: new Date('02/05/2024'), Duration: 5 },
                            { StartDate: new Date('02/08/2024'), Duration: 3 }
                          ]
                    },
                    {
                        TaskID: 4, TaskName: 'Plan budget', StartDate: new Date('02/04/2024'), EndDate: new Date('02/10/2024'),
                        Duration: 10, Progress: '90'
                    },
                    {
                        TaskID: 5, TaskName: 'Allocate resources', StartDate: new Date('02/04/2024'), EndDate: new Date('02/10/2024'),
                        Duration: 10, Progress: '75',
                        Segments: [
                            { StartDate: new Date('02/04/2024'), Duration: 4 },
                            { StartDate: new Date('02/08/2024'), Duration: 2 }
                          ]
                    },
                    {
                        TaskID: 6, TaskName: 'Planning complete', StartDate: new Date('02/21/2024'), EndDate: new Date('02/21/2024'),
                        Duration: 0, Predecessor: '3FS,5FS'
                    },
                ]
            },
            {
                TaskID: 7,
                TaskName: 'Design',
                StartDate: new Date('02/25/2024'),
                subtasks: [
                    {
                        TaskID: 8, TaskName: 'Software Specification', StartDate: new Date('02/25/2024'), EndDate: new Date('03/02/2024'),
                        Duration: 5, Progress: '60', Predecessor: '6FS'
                    },
                    {
                        TaskID: 9, TaskName: 'Develop prototype', StartDate: new Date('02/25/2024'), EndDate: new Date('03/02/2024'),
                        Duration: 5, Progress: '100', Predecessor: '6FS',
                        Segments: [
                            { StartDate: new Date('02/25/2024'), Duration: 2 },
                            { StartDate: new Date('02/28/2024'), Duration: 3 }
                          ]
                    },
                    {
                        TaskID: 10, TaskName: 'Get approval from customer', StartDate: new Date('02/25/2024'),
						EndDate: new Date('03/01/2024'), Duration: 4, Progress: '100', Predecessor: '9FS'
                    },
                    {
                        TaskID: 11, TaskName: 'Design complete', StartDate: new Date('02/25/2024'), EndDate: new Date('02/25/2024'),
                        Duration: 0, Predecessor: '10FS'
                    }
                ]
            }
        ]
    }
];

export let tempData: any[] = [
    {
        TaskID: 1, TaskName: 'Product concept',StartDate: new Date('04/02/2024'), EndDate: new Date('04/21/2024'),
        parentID: 0
    },
    {
        TaskID: 2, TaskName: 'Defining the product and its usage', StartDate: new Date('04/02/2024'),
        Duration: 3, Progress: 30, parentID: 1
    },
    {
        TaskID: 3, TaskName: 'Defining target audience', StartDate: new Date('04/02/2024'),
        parentID: 1, Duration: 3
    },
    {
        TaskID: 4, TaskName: 'Prepare product sketch and notes', StartDate: new Date('04/05/2024'),
        Duration: 2, parentID: 1, Progress: 30
    },
    {
        TaskID: 5, TaskName: 'Concept approval', StartDate: new Date('04/08/2024'),
        parentID: 0, Duration: 0
    },
    {
        TaskID: 6, TaskName: 'Market research', StartDate: new Date('04/02/2024'),
        parentID: 0, EndDate: new Date('04/21/2024')
    },
    {
        TaskID: 7, TaskName: 'Demand analysis', StartDate: new Date('04/04/2024'),
        EndDate: new Date('04/21/2024'), parentID: 6
    },
    {
        TaskID: 8, TaskName: 'Customer strength', StartDate: new Date('04/09/2024'),
        Duration: 4, parentID: 7, Progress: 30
    },
    {
        TaskID: 9, TaskName: 'Market opportunity analysis', StartDate: new Date('04/09/2024'),
        Duration: 4, parentID: 7
    },
    {
        TaskID: 10, TaskName: 'Competitor analysis', StartDate: new Date('04/15/2024'),
        Duration: 4, parentID: 6, Progress: 30
    },
    {
        TaskID: 11, TaskName: 'Product strength analsysis', StartDate: new Date('04/15/2024'),
        Duration: 4, parentID: 6
    },
    {
        TaskID: 12, TaskName: 'Research complete', StartDate: new Date('04/18/2024'),
        Duration: 0, parentID: 6
    },
    {
        TaskID: 13, TaskName: 'Product design and development', StartDate: new Date('04/04/2024'),
        parentID: 0, EndDate: new Date('04/21/2024')
    },
    {
        TaskID: 14, TaskName: 'Functionality design', StartDate: new Date('04/19/2024'),
        Duration: 3, parentID: 13, Progress: 30
    },
    {
        TaskID: 15, TaskName: 'Quality design', StartDate: new Date('04/19/2024'),
        Duration: 3, parentID: 13
    },
    {
        TaskID: 16, TaskName: 'Define reliability', StartDate: new Date('04/24/2024'),
        Duration: 2, Progress: 30, parentID: 13
    },
    {
        TaskID: 17, TaskName: 'Identifying raw materials', StartDate: new Date('04/24/2024'),
        Duration: 2, parentID: 13
    },
    {
        TaskID: 18, TaskName: 'Define cost plan', StartDate: new Date('04/04/2024'),
        parentID: 13, EndDate: new Date('04/21/2024')
    },
    {
        TaskID: 19, TaskName: 'Manufacturing cost', StartDate: new Date('04/26/2024'),
        Duration: 2, Progress: 30, parentID: 18
    },
    {
        TaskID: 20, TaskName: 'Selling cost', StartDate: new Date('04/26/2024'),
        Duration: 2, parentID: 18
    },
    {
        TaskID: 21, TaskName: 'Development of the final design', StartDate: new Date('04/30/2024'),
        parentID: 13, EndDate: new Date('04/21/2024')
    },
    {
        TaskID: 22, TaskName: 'Defining dimensions and package volume', StartDate: new Date('04/30/2024'),
        Duration: 2, parentID: 21, Progress: 30
    },
    {
        TaskID: 23, TaskName: 'Develop design to meet industry standards', StartDate: new Date('05/02/2024'),
        Duration: 2, parentID: 21
    },
    {
        TaskID: 24, TaskName: 'Include all the details', StartDate: new Date('05/06/2024'),
        Duration: 3, parentID: 21
    },
    {
        TaskID: 25, TaskName: 'CAD computer-aided design', StartDate: new Date('05/09/2024'),
        Duration: 3, parentID: 13, Progress: 30
    },
    {
        TaskID: 26, TaskName: 'CAM computer-aided manufacturing', StartDate: new Date('09/14/2024'),
        Duration: 3, parentID: 13
    },
    {
        TaskID: 27, TaskName: 'Design complete', StartDate: new Date('05/16/2024'),
        Duration: 0, parentID: 13
    },
    {
        TaskID: 28, TaskName: 'Prototype testing', StartDate: new Date('05/17/2024'),
        Duration: 4, Progress: 30, parentID: 0
    },
    {
        TaskID: 29, TaskName: 'Include feedback', StartDate: new Date('05/17/2024'),
        Duration: 4, parentID: 0
    },
    {
        TaskID: 30, TaskName: 'Manufacturing', StartDate: new Date('05/23/2024'),
        Duration: 5, Progress: 30, parentID: 0
    },
    {
        TaskID: 31, TaskName: 'Assembling materials to finsihed goods', StartDate: new Date('05/30/2024'),
        Duration: 5, parentID: 0
    },
    {
        TaskID: 32, TaskName: 'Feedback and testing', StartDate: new Date('04/04/2024'),
        parentID: 0, EndDate: new Date('04/21/2024'),
    },
    {
        TaskID: 33, TaskName: 'Internal testing and feedback', StartDate: new Date('06/06/2024'),
        Duration: 3, parentID: 32, Progress: 45
    },
    {
        TaskID: 34, TaskName: 'Customer testing and feedback', StartDate: new Date('06/11/2024'),
        Duration: 3, parentID: 32, Progress: 50
    },
    {
        TaskID: 35, TaskName: 'Final product development', StartDate: new Date('04/04/2024'),
        parentID: 0, EndDate: new Date('04/21/2024'),
    },
    {
        TaskID: 36, TaskName: 'Important improvements', StartDate: new Date('06/14/2024'),
        Duration: 4, Progress: 30, parentID: 35
    },
    {
        TaskID: 37, TaskName: 'Address any unforeseen issues', StartDate: new Date('06/14/2024'),
        Duration: 4, Progress: 30, parentID: 35
    },
    {
        TaskID: 38, TaskName: 'Final product', StartDate: new Date('04/04/2024'),
        parentID: 0, EndDate: new Date('04/21/2024'),
    },
    {
        TaskID: 39, TaskName: 'Branding product', StartDate: new Date('06/20/2024'),
        Duration: 4, parentID: 38
    },
    {
        TaskID: 40, TaskName: 'Marketing and presales', StartDate: new Date('06/26/2024'), Duration: 4,
        Progress: 30, parentID: 38
    }
];

export let virtualData: any[] = [];
let projId: number = 1;
for (let i: number = 0; i < 50; i++) {
    let x: number = virtualData.length + 1;
    let parent: any = {};
    /* tslint:disable:no-string-literal */
    parent['TaskID'] = x;
    parent['TaskName'] = 'Project ' + (i + 1);
    virtualData.push(parent);
    for (let j: number = 0; j < tempData.length; j++) {
        let subtasks: any = {};
        /* tslint:disable:no-string-literal */
        subtasks['TaskID'] = tempData[j].TaskID + x;
        subtasks['TaskName'] = tempData[j].TaskName;
        subtasks['StartDate'] = tempData[j].StartDate;
        subtasks['Duration'] = tempData[j].Duration;
        subtasks['Progress'] = tempData[j].Progress;
        subtasks['parentID'] = tempData[j].parentID + x;
        virtualData.push(subtasks);
    }
}

export let timezoneData: object[] = [
    {
        taskID: 1,
        taskName: 'Project Schedule',
        startDate: new Date('02/04/2024 08:00'),
        endDate: new Date('03/10/2024')
    },
    {
        taskID: 2,
        taskName: 'Planning',
        startDate: new Date('02/04/2024 08:00'),
        endDate: new Date('02/10/2024'),
        parentID: 1
    },
    {
        taskID: 3,
        taskName: 'Plan timeline',
        startDate: new Date('02/04/2024 08:00'),
        endDate: new Date('02/10/2024'),
        duration: 6,
        progress: '60',
        parentID: 2
    },
    {
        taskID: 4,
        taskName: 'Plan budget',
        startDate: new Date('02/04/2024 08:00'),
        endDate: new Date('02/10/2024'),
        duration: 6,
        progress: '90',
        parentID: 2
    },
    {
        taskID: 5,
        taskName: 'Allocate resources',
        startDate: new Date('02/04/2024 08:00'),
        endDate: new Date('02/10/2024'),
        duration: 6,
        progress: '75',
        parentID: 2
    },
    {
        taskID: 6,
        taskName: 'Planning complete',
        startDate: new Date('02/06/2024 08:00'),
        endDate: new Date('02/10/2024'),
        duration: 0,
        predecessor: '3FS,4FS,5FS',
        parentID: 2
    },
    {
        taskID: 7,
        taskName: 'Design',
        startDate: new Date('02/13/2024 08:00'),
        endDate: new Date('02/17/2024 08:00'),
        parentID: 1,
    },
    {
        taskID: 8,
        taskName: 'Software Specification',
        startDate: new Date('02/13/2024 08:00'),
        endDate: new Date('02/15/2024'),
        duration: 3,
        progress: '60',
        predecessor: '6FS',
        parentID: 7,
    },
    {
        taskID: 9,
        taskName: 'Develop prototype',
        startDate: new Date('02/13/2024 08:00'),
        endDate: new Date('02/15/2024'),
        duration: 3,
        progress: '100',
        predecessor: '6FS',
        parentID: 7,
    },
    {
        taskID: 10,
        taskName: 'Get approval from customer',
        startDate: new Date('02/16/2024 08:00'),
        endDate: new Date('02/17/2024 08:00'),
        duration: 2,
        progress: '100',
        predecessor: '9FS',
        parentID: 7,
    },
    {
        taskID: 11,
        taskName: 'Design complete',
        startDate: new Date('02/17/2024 08:00'),
        endDate: new Date('02/17/2024 08:00'),
        duration: 0,
        predecessor: '10FS',
        parentID: 7,
    }
];

export let overviewData: object[] = [
    {
        TaskId: '1',
        TaskName: "Q-1 Release",
        StartDate: new Date('2023/12/20'),
        EndDate: new Date('2024/04/04'),
        TimeLog: 2,
        Work: 2,
        Progress: 80,
        Status: "In Progress"
    },
    {
        TaskId: '2',
        TaskName: "Roadmap",
        ParentId: 1
    },
    {
        TaskId: '3',
        TaskName: "Implementation",
        ParentId: 2
    },
    {
        TaskId: '4',
        TaskName: "Grid",
        StartDate: new Date('2023/12/20'),
        EndDate: new Date('2024/02/20'),
        TimeLog: 44,
        Work: 45,
        Progress: 70,
        ParentId: 3
    },
    {
        TaskId: '5',
        TaskName: "Batch Editing",
        StartDate: new Date('2023/12/24'),
        EndDate: new Date('2024/02/21'),
        Assignee: [1],
        resourcesImage:'/9j/4AAQSkZJRgABAQAAAQABAAD//gAfQ29tcHJlc3NlZCBieSBqcGVnLXJlY29tcHJlc3P/2wCEAAQEBAQEBAQEBAQGBgUGBggHBwcHCAwJCQkJCQwTDA4MDA4MExEUEA8QFBEeFxUVFx4iHRsdIiolJSo0MjRERFwBBAQEBAQEBAQEBAYGBQYGCAcHBwcIDAkJCQkJDBMMDgwMDgwTERQQDxAUER4XFRUXHiIdGx0iKiUlKjQyNEREXP/CABEIADcANwMBIgACEQEDEQH/xAAaAAACAwEBAAAAAAAAAAAAAAAHCAQFBgID/9oACAEBAAAAAH+qsdiSrczqiUBMb22cXitDeKqHJh+9YFRxtGA87Oevw2Kx1qZOdFq/gVwmsmjsTDfKu9sf/8QAGQEAAwEBAQAAAAAAAAAAAAAAAAQFBgED/9oACAECEAAAAORaDfjmqNozlhsZWP/EABkBAAIDAQAAAAAAAAAAAAAAAAAGAwQFAf/aAAgBAxAAAADu/l0535dXB6VKBDMf/8QANRAAAgIBAgQDBgUCBwAAAAAAAQIDBAUABhESIUEHIjEQEzJhgZEIFFJicRYjQkNRU6Gx0f/aAAgBAQABPwDRyFq9K9bBxoVRisl2UExKR6iMD4z/AMa3ZuPaO0ljG6stav3JFLpVVizn5iKMqqL821S8WPC675v6duQR8SDK9VOA+fkYnWJfE5eimT2jnZFhPoFcywhv0vHJ1U/Y6qZSeGePHZeAQWHPCKVOsE5/0Un0b9p9mRle9ZTDV5GSMoJLkingViJ4CNT+p/8ArWSsLicRZkpQKErQkRRjopb0UfxqvtKDJy5DI5ZFnuW3LyyP1PA/4RrM7OxVPnaJCir5Qo462Bck2luuCerZc46+Vgnic9FPz/j1GrVWtfrSVbKB42HXsQexB7Eaw9mdXsYm63Nbq8P7n+7C3wSfz2OsEVkr2snJ1e9ZklHc+7Q8kY+gGt3OYMRzMQqvNGp+p1l/ELD7fdaj15ZmLBCyPGoB+QZgW+g1u/etWq8cEVI2PeRrM3K4HlZebsCTrbmWpZqJrEdaeKeOVeEfu3kC9QOYlAeH11i7iXMXRlSVZCY1DFTxBZeh+x1nZVxtnHZntGXrzcPVo5FLD7Mo1txlGCxRHxCsgOt2442sM3lDGJxMVb0IH/gPHVuth1s1oI4meRuMrhVBVFXuen21ubKYo7gi9yvvVSFIDGkbIyIo9OLDh/A1tCCNoMpdqM0R/J2EjUgcyMqgq3A62nhzg8BjMbJIXkih4yv+qWQl3I+XMTw1vdCNu2FHVjLF9TzawZ/Lm/iWPBqdhygPeGY86EfcjUsayK6OoZWUqQfQg6yuCWPMGvYkmikqWRMhjdk94i9VDcpHMpHqNbrxUty4VmhgEDyBnMMUkbso7czSPw9O2vDivEk/AgK5aOMD08yedvtzBfZkoUyGRoYk8WjRXtWeHZQCiD6k6ytWxFPBmMfGXswKUliHrPATxKj9w9V1mfETY23KkV3Oblp1VdOdYGYtYI9OkKcX1Z3zQ8Q6ljO7TpzitjbUlMTyoEaduRX4qvZRx6cdbq3Nu5bDKFPkPUiuUCBevEknhrJ+J+6bNqEUMrNDFWsCdJUYq7zIxYScfkTxGvCn8S2e3ZNits39ny5LKjyWr9SURx8naVoyvRtYynNWSa1dIa/aYSTkei9ljH7UHs8QPCTa+/4C1+uIbw+CzF5XGsNsbdXhdtnI4PEClfju5SSy1qySAsRijjCKilSX8vxa8RU35ubBxbdwWBrQGy5F65+ZQNLGT0iHE8VX9etl/hN3LlpIbe5MrWq0+6Vn53OtheGe1vDvHpSwNBEk/wAyc9Xdu5JPs//EACMRAAIBAwMEAwAAAAAAAAAAAAECAwAREgQQMQUTIUEiM3L/2gAIAQIBAT8AJABJ4FSdWChmwOPANaPVJq4s15HO0/0y/k1IUKhcSUHqulKEzwSysLnzvPBJFM0CDk3Xx6NaOJooQrizHfJTAD2o8wbCS3ytv//EACMRAAEDAwQCAwAAAAAAAAAAAAECAxEABBIFECExFCJBUXH/2gAIAQMBAT8AAJIA7JimNELsAujOORV7Zrs3i0v9B2tY8liTHuO6t7Vcyk4qUJyNa8BnC3cnEKCRA7ESd9OvG3rYXD6uQnE8/IrUXkv3K1oVkn73BcDpSHlhCuSifUnf/9k=',
        TimeLog: 42,
        Work: 43,
        Progress: 100,
        Status: "Completed",
        ParentId: 4,
        Priority: "High",
        Component: "Grid",
    },
    {
        TaskId: '6',
        TaskName: "PDF Export",
        StartDate: new Date('2023/12/28'),
        EndDate: new Date('2024/02/25'),
        Assignee: [2],
        resourcesImage:'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',
        TimeLog: 42,
        Work: 45,
        Progress: 10,
        Status: "On Hold",
        ParentId: 4,
        Priority: "Normal",
        Component: "Grid"
    },
    {
        TaskId: '7',
        TaskName: "Tree Grid",
        StartDate: new Date('2024/01/02'),
        EndDate: new Date('2024/02/20'),
        TimeLog: 33,
        Work: 30,
        Progress: 80,
        ParentId: 3
    },
    {
        TaskId: '8',
        TaskName: "Drag Multi-selection",
        StartDate: new Date('2024/01/02'),
        EndDate: new Date('2024/02/20'),
        Assignee: [4],
        resourcesImage:'/9j/4AAQSkZJRgABAQAAAQABAAD//gAfQ29tcHJlc3NlZCBieSBqcGVnLXJlY29tcHJlc3P/2wCEAAQEBAQEBAQEBAQGBgUGBggHBwcHCAwJCQkJCQwTDA4MDA4MExEUEA8QFBEeFxUVFx4iHRsdIiolJSo0MjRERFwBBAQEBAQEBAQEBAYGBQYGCAcHBwcIDAkJCQkJDBMMDgwMDgwTERQQDxAUER4XFRUXHiIdGx0iKiUlKjQyNEREXP/CABEIADcANwMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAAFBwQGCAMCCf/aAAgBAQAAAADfwhV0x/EZ4hW5npVo+hcTlnMn4TW6ofZUBIXDSIEnOzwAaDYEyICYV79vc+aEqNLsbBM//8QAGAEAAwEBAAAAAAAAAAAAAAAAAgQFAwD/2gAIAQIQAAAABNvRaHSpjAqO9hof/8QAGQEAAgMBAAAAAAAAAAAAAAAAAgUDBAYA/9oACAEDEAAAADbLIbutRIi2OdXdagD/xAAfEAACAwEBAQADAQAAAAAAAAAEBQIDBgEHABITFBX/2gAIAQEAAQgA+/0izrLKEuj9O81zxtwL2r3Pze87lUFwwDEEVrlQ21sL617X47th5VaUf2TSlZ/O0Z9IT468vpqspb+dtFYNhQ3jnpLfFP6lzAoQY4aY5acm+MyFJqOf5jlMu+12WWaxaJBjugEFv8cG+5kMlobU70irSIgntauc+rF0rHtsVpK5z9nZ/ihVc56fmiTmueaDmJMvJkTeVxnnCKIgcJUrma0oRaHRwYYYeO3h3mdIjxF3+fp6mRlA5dMxyHyyqbZuDVFcbTyFFuAVdpIlKz5lTBgxAU9aikV30OALtIDMbnQ9akbk12vEoL7YmE1i9xrWtZKdU6tYkvF7IVYHcNC4o35zmhjLJmCfqbZwqBJeqGzphcDs2mzjIsTN8WJ84Ak7K2H3/8QAMxAAAgEDAgMECQMFAAAAAAAAAQIDAAQREjETIVEFQWGhEBQjMkJicXKBBiIzUlOCkbH/2gAIAQEACT8ApE0IxWS9l5xKRuEHxnyrt687Wv4v5o4Q7oh8Fj0pX6PuY7HIBunjjDjqdCk12xItvOgkhZJDPbspH9D58iDUKw3D8opUJMEx6KTs3yn0SMqlOLeyqcFYicCNT1f/AJXsZryMxkxjBSHbC/dUS3XEjDSaSoYN/kRVndZikKSppJKMOoHcakkXseadI7mCbKhdZwZUB2K0gaKTGANwe4g9xFNqu7XHtP7sLe5J9e40My31zJL1IjU6EH4UUTxNFsR0KvIVxVnLPPGig5dIkzjnguQTiuxxi4bHtpAgBHzYNWcEc9rexJrt51nDRzciCQBUgaQ20RYg55ledbRl7ebG7RyKWH+mUVv6sgPhgUoYiWO3lDclVUbiqSfrUEMlyrH4QWOfOpFdopjmAxMMN0C489qgRtckMiRON3WQPjyonTFEqDPRRiubGWL8nVXJrS4coOsMx1ofMiow6HcVcvBLLMdMyAFlO/xCnLXnMLcNAMdNVScd7ePEkxULqZ+/C4A9GWjRXurnHcoBRB+Saj13MAKSxDeeA8yo+YbrUmt2HMEEafr4ipHkljYm4Qe+veGHUVLFpZsamWpGnyWSd1HvTIobC/aDtUrTTNgJbqhEruTyUCiGv7phJPjZcDCxj5UHok9WvH95gMxyfevXxFW4MWzNFIGR1+hwaaW2u5c8UJEBFkjGcMVw3iKs/Ubaxt7mOX1iZZuJLOysZMpgs37eg3ocW9fOudhjGdwg7h6P/8QAIREBAAIBBAEFAAAAAAAAAAAAAQIDAAQQETESBSJBYYH/2gAIAQIBAT8AnMhFk4a2Euph+ZXYWG2rOaX6yTxEDr5z015jMD2m0kB5yyLXKzkAVTND4RoiHart3llNdkGE48mRhGIeMToNv//EACIRAQACAQMEAwEAAAAAAAAAAAECAxEAEBIEBTFhFSEiNP/aAAgBAwEBPwCuuVs4wj5dfFTBzFUPGdXUyplxdu3/ANURQyOq6xCUs5cYdd7hwnUyRk7R5cjj510t5OqGP2kQfSa7k2T6qyUj6MB62FETVHU3U2RsrniXh96nZOaspLlV2//Z',
        TimeLog: 33,
        Work: 32,
        Progress: 100,
        Status: "Completed",
        ParentId: 7,
        Priority: "Critical",
        Component: "Tree Grid"
    },
    {
        TaskId: '9',
        TaskName: "Gantt Chart",
        StartDate: new Date('2024/02/20'),
        EndDate: new Date('2024/04/28'),
        TimeLog: 2,
        Work: 2,
        Progress: 100,
        ParentId: 3
    },
    {
        TaskId: '10',
        TaskName: "Initial loading performance",
        StartDate: new Date('2024/02/24'),
        EndDate: new Date('2024/03/14'),
        Assignee: [1],
        resourcesImage:'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',
        TimeLog: 13,
        Work: 15,
        Progress: 35,
        Status: "In Progress",
        ParentId: 9,
        Priority: "Low",
        Component: "Gantt Chart"
    },
    {
        TaskId: '11',
        TaskName: "Drag Multi-selection",
        StartDate: new Date('2024/02/22'),
        EndDate: new Date('2024/03/14'),
        Assignee: [8],
        resourcesImage:'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',
        TimeLog: 13,
        Work: 14,
        Progress: 100,
        Predecessor: "8FS",
        Status: "Completed",
        ParentId: 9,
        Priority: "Normal",
        Component: "Gantt Chart"
    },
    {
        TaskId: '12',
        TaskName: "ScrollToViewAsync Method",
        StartDate: new Date('2024/02/20'),
        EndDate: new Date('2024/03/10'),
        Assignee: [1],
        resourcesImage:'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',
        TimeLog: 13,
        Work: 10,
        Progress: 100,
        Status: "Completed",
        ParentId: 9,
        Priority: "High",
        Component: "Gantt Chart"
    },
    {
        TaskId: '13',
        TaskName: "ScrollToTimelineAsync Method",
        StartDate: new Date('2024/02/20'),
        EndDate: new Date('2024/03/10'),
        Assignee: [4],
        resourcesImage:'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',
        TimeLog: 13,
        Work: 10,
        Progress: 40,
        Status: "On Hold",
        ParentId: 9,
        Priority: "Normal",
        Component: "Gantt Chart"
    },
    {
        TaskId: '14',
        TaskName: "ScrollToTaskbarAsync Method",
        StartDate: new Date('2024/03/10'),
        EndDate: new Date('2024/03/25'),
        Assignee: [1],
        resourcesImage:'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',
        TimeLog: 11,
        Work: 15,
        Progress: 100,
        Status: "Completed",
        ParentId: 9,
        Priority: "Critical",
        Component: "Gantt Chart"
    },
    {
        TaskId: '15',
        TaskName: "Web Accessibility",
        StartDate: new Date('2024/03/10'),
        EndDate: new Date('2024/03/25'),
        Assignee: [4],
        resourcesImage:'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',
        TimeLog: 11,
        Work: 12,
        Progress: 35,
        Status: "On Hold",
        ParentId: 9,
        Priority: "Normal",
        Component: "Gantt Chart"
    },
    {
        TaskId: '16',
        TaskName: "Testing",
        Work: 8,
        ParentId: 3,
    },
    {
        TaskId: '17',
        TaskName: "Phase-1",
        StartDate: new Date('2024/03/20'),
        EndDate: new Date('2024/03/24'),
        Work: 2,
        Progress: 0,
        ParentId: 16,
    },
    {
        TaskId: '18',
        TaskName: "Phase-2",
        StartDate: new Date('2024/03/22'),
        EndDate: new Date('2024/03/26'),
        Work: 1,
        Progress: 0,
        Predecessor: "17FS",
        ParentId: 16,
    },
    {
        TaskId: '19',
        TaskName: "Testing Completion",
        StartDate: new Date('2024/03/27'),
        TimeLog: 0,
        ParentId: 3,
    },
    {
        TaskId: '20',
        TaskName: "Release Roll-out",
        StartDate: new Date('2024/04/04'),
        TimeLog: 0,
        ParentId: 2,
    },
    {
        TaskId: '21',
        TaskName: "Q-2 Release",
        StartDate: new Date('2024/04/05'),
        EndDate: new Date('2024/06/30'),
        TimeLog: 2,
        Work: 2,
        Progress: 90,
        Status: "Completed",
    },
    {
        TaskId: '22',
        TaskName: "Roadmap",
        ParentId: 21
    },
    {
        TaskId: '23',
        TaskName: "Implementation",
        ParentId: 22
    },
    {
        TaskId: '24',
        TaskName: "Grid",
        StartDate: new Date('2024/04/05'),
        EndDate: new Date('2024/05/30'),
        TimeLog: 2,
        Work: 2,
        Progress: 100,
        ParentId: 23
    },
    {
        TaskId: '25',
        TaskName: "Web Accessibility",
        StartDate: new Date('2024/04/05'),
        EndDate: new Date('2024/04/30'),
        Assignee: [1],
        resourcesImage:'/9j/4AAQSkZJRgABAQAAAQABAAD//gAfQ29tcHJlc3NlZCBieSBqcGVnLXJlY29tcHJlc3P/2wCEAAQEBAQEBAQEBAQGBgUGBggHBwcHCAwJCQkJCQwTDA4MDA4MExEUEA8QFBEeFxUVFx4iHRsdIiolJSo0MjRERFwBBAQEBAQEBAQEBAYGBQYGCAcHBwcIDAkJCQkJDBMMDgwMDgwTERQQDxAUER4XFRUXHiIdGx0iKiUlKjQyNEREXP/CABEIADcANwMBIgACEQEDEQH/xAAaAAACAwEBAAAAAAAAAAAAAAAHCAQFBgID/9oACAEBAAAAAH+qsdiSrczqiUBMb22cXitDeKqHJh+9YFRxtGA87Oevw2Kx1qZOdFq/gVwmsmjsTDfKu9sf/8QAGQEAAwEBAQAAAAAAAAAAAAAAAAQFBgED/9oACAECEAAAAORaDfjmqNozlhsZWP/EABkBAAIDAQAAAAAAAAAAAAAAAAAGAwQFAf/aAAgBAxAAAADu/l0535dXB6VKBDMf/8QANRAAAgIBAgQDBgUCBwAAAAAAAQIDBAUABhESIUEHIjEQEzJhgZEIFFJicRYjQkNRU6Gx0f/aAAgBAQABPwDRyFq9K9bBxoVRisl2UExKR6iMD4z/AMa3ZuPaO0ljG6stav3JFLpVVizn5iKMqqL821S8WPC675v6duQR8SDK9VOA+fkYnWJfE5eimT2jnZFhPoFcywhv0vHJ1U/Y6qZSeGePHZeAQWHPCKVOsE5/0Un0b9p9mRle9ZTDV5GSMoJLkingViJ4CNT+p/8ArWSsLicRZkpQKErQkRRjopb0UfxqvtKDJy5DI5ZFnuW3LyyP1PA/4RrM7OxVPnaJCir5Qo462Bck2luuCerZc46+Vgnic9FPz/j1GrVWtfrSVbKB42HXsQexB7Eaw9mdXsYm63Nbq8P7n+7C3wSfz2OsEVkr2snJ1e9ZklHc+7Q8kY+gGt3OYMRzMQqvNGp+p1l/ELD7fdaj15ZmLBCyPGoB+QZgW+g1u/etWq8cEVI2PeRrM3K4HlZebsCTrbmWpZqJrEdaeKeOVeEfu3kC9QOYlAeH11i7iXMXRlSVZCY1DFTxBZeh+x1nZVxtnHZntGXrzcPVo5FLD7Mo1txlGCxRHxCsgOt2442sM3lDGJxMVb0IH/gPHVuth1s1oI4meRuMrhVBVFXuen21ubKYo7gi9yvvVSFIDGkbIyIo9OLDh/A1tCCNoMpdqM0R/J2EjUgcyMqgq3A62nhzg8BjMbJIXkih4yv+qWQl3I+XMTw1vdCNu2FHVjLF9TzawZ/Lm/iWPBqdhygPeGY86EfcjUsayK6OoZWUqQfQg6yuCWPMGvYkmikqWRMhjdk94i9VDcpHMpHqNbrxUty4VmhgEDyBnMMUkbso7czSPw9O2vDivEk/AgK5aOMD08yedvtzBfZkoUyGRoYk8WjRXtWeHZQCiD6k6ytWxFPBmMfGXswKUliHrPATxKj9w9V1mfETY23KkV3Oblp1VdOdYGYtYI9OkKcX1Z3zQ8Q6ljO7TpzitjbUlMTyoEaduRX4qvZRx6cdbq3Nu5bDKFPkPUiuUCBevEknhrJ+J+6bNqEUMrNDFWsCdJUYq7zIxYScfkTxGvCn8S2e3ZNits39ny5LKjyWr9SURx8naVoyvRtYynNWSa1dIa/aYSTkei9ljH7UHs8QPCTa+/4C1+uIbw+CzF5XGsNsbdXhdtnI4PEClfju5SSy1qySAsRijjCKilSX8vxa8RU35ubBxbdwWBrQGy5F65+ZQNLGT0iHE8VX9etl/hN3LlpIbe5MrWq0+6Vn53OtheGe1vDvHpSwNBEk/wAyc9Xdu5JPs//EACMRAAIBAwMEAwAAAAAAAAAAAAECAwAREgQQMQUTIUEiM3L/2gAIAQIBAT8AJABJ4FSdWChmwOPANaPVJq4s15HO0/0y/k1IUKhcSUHqulKEzwSysLnzvPBJFM0CDk3Xx6NaOJooQrizHfJTAD2o8wbCS3ytv//EACMRAAEDAwQCAwAAAAAAAAAAAAECAxEABBIFECExFCJBUXH/2gAIAQMBAT8AAJIA7JimNELsAujOORV7Zrs3i0v9B2tY8liTHuO6t7Vcyk4qUJyNa8BnC3cnEKCRA7ESd9OvG3rYXD6uQnE8/IrUXkv3K1oVkn73BcDpSHlhCuSifUnf/9k=',
        TimeLog: 19,
        Work: 15,
        Progress: 100,
        Status: "Completed",
        ParentId: 24,
        Priority: "High",
        Component: "Grid"
    },
    {
        TaskId: '26',
        TaskName: "Sticky Header",
        StartDate: new Date('2024/04/15'),
        EndDate: new Date('2024/05/10'),
        Assignee: [8],
        resourcesImage:'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',
        TimeLog: 19,
        Work: 20,
        Progress: 100,
        Status: "Completed",
        ParentId: 24,
        Priority: "Normal",
        Component: "Grid"
    },
    {
        TaskId: '27',
        TaskName: "Adapative UI Mode",
        StartDate: new Date('2024/04/20'),
        EndDate: new Date('2024/05/20'),
        Assignee: [2],
        resourcesImage:'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',
        TimeLog: 19,
        Work: 25,
        Progress: 100,
        Status: "Completed",
        ParentId: 24,
        Priority: "Normal",
        Component: "Grid"
    },
    {
        TaskId: '28',
        TaskName: "Tree Grid",
        StartDate: new Date('2024/04/25'),
        EndDate: new Date('2024/05/30'),
        TimeLog: 2,
        Work: 2,
        Progress: 50,
        ParentId: 23
    },
    {
        TaskId: '29',
        TaskName: "CRUD Opreation for virtualization",
        StartDate: new Date('2024/04/25'),
        EndDate: new Date('2024/05/30'),
        Assignee: [4],
        resourcesImage:'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',
        TimeLog: 26,
        Work: 28,
        Progress: 72,
        Status: "In Progress",
        ParentId: 28,
        Priority: "Normal",
        Component: "Tree Grid"
    },
    {
        TaskId: '30',
        TaskName: "Frozen Column",
        StartDate: new Date('2024/04/28'),
        EndDate: new Date('2024/05/30'),
        Assignee: [1],
        resourcesImage:'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',
        TimeLog: 26,
        Work: 28,
        Progress: 100,
        Status: "Completed",
        ParentId: 28,
        Priority: "High",
        Component: "Tree Grid"
    },
    {
        TaskId: '31',
        TaskName: "Gantt Chart",
        StartDate: new Date('2024/05/05'),
        EndDate: new Date('2024/06/20'),
        TimeLog: 2,
        Work: 2,
        Progress: 50,
        ParentId: 23
    },
    {
        TaskId: '32',
        TaskName: "Observable Collection",
        StartDate: new Date('2024/05/15'),
        EndDate: new Date('2024/06/10'),
        Assignee: [2],
        resourcesImage:'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',
        TimeLog: 19,
        Work: 15,
        Progress: 70,
        Status: "On Hold",
        ParentId: 31,
        Priority: "Critical",
        Component: "Gantt Chart"
    },
    {
        TaskId: '33',
        TaskName: "INotifyPropertyChanged",
        StartDate: new Date('2024/05/18'),
        EndDate: new Date('2024/05/30'),
        Assignee: [4],
        resourcesImage:'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',
        TimeLog: 19,
        Work: 18,
        Progress: 20,
        Status: "On Hold",
        ParentId: 31,
        Priority: "Normal",
        Component: "Gantt Chart"
    },
    {
        TaskId: '34',
        TaskName: "INotifyPropertyChanged",
        StartDate: new Date('2024/05/25'),
        EndDate: new Date('2024/06/15'),
        Assignee: [8],
        resourcesImage:'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',
        TimeLog: 19,
        Work: 25,
        Progress: 50,
        Status: "In Progress",
        ParentId: 31,
        Priority: "Normal",
        Component: "Gantt Chart"
    },
    {
        TaskId: '35',
        TaskName: "Customized Taskbar Editing",
        StartDate: new Date('2024/05/25'),
        EndDate: new Date('2024/06/30'),
        Assignee: [1],
        resourcesImage:'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',
        TimeLog: 15,
        Work: 20,
        Progress: 10,
        Status: "On Hold",
        ParentId: 31,
        Priority: "High",
        Component: "Gantt Chart"
    },
    {
        TaskId: '36',
        TaskName: "Column Virtualization ",
        StartDate: new Date('2024/05/05'),
        EndDate: new Date('2024/05/30'),
        Assignee: [2],
        resourcesImage:'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',
        TimeLog: 18,
        Work: 22,
        Progress: 100,
        Status: "Completed",
        ParentId: 31,
        Priority: "Critical",
        Component: "Gantt Chart"
    },
    {
        TaskId: '37',
        TaskName: "Touch Interaction ",
        StartDate: new Date('2024/05/27'),
        EndDate: new Date('2024/6/17'),
        Assignee: [8],
        resourcesImage:'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',
        TimeLog: 18,
        Work: 14,
        Progress: 100,
        Status: "Completed",
        ParentId: 31,
        Priority: "Normal",
        Component: "Gantt Chart"
    },
    {
        TaskId: '38',
        TaskName: "Editing Tooltip Template",
        StartDate: new Date('2024/05/29'),
        EndDate: new Date('2024/06/19'),
        Assignee: [4],
        resourcesImage:'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',
        TimeLog: 18,
        Work: 20,
        Progress: 100,
        Status: "Completed",
        ParentId: 31,
        Priority: "Low",
        Component: "Gantt Chart"
    },
    {
        TaskId: '39',
        TaskName: "Predecessor Drag Vertical Auto Scroll",
        StartDate: new Date('2024/05/25'),
        EndDate: new Date('2024/06/15'),
        Assignee: [2],
        resourcesImage:'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',
        TimeLog: 18,
        Work: 15,
        Progress: 100,
        Status: "Completed",
        ParentId: 31,
        Priority: "Normal",
        Component: "Gantt Chart"
    },
    {
        TaskId: '40',
        TaskName: "Taskbar Drag Horizontal Auto Scroll",
        StartDate: new Date('2024/05/27'),
        EndDate: new Date('2024/06/17'),
        Assignee: [1],
        resourcesImage:'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',
        TimeLog: 18,
        Work: 14,
        Progress: 100,
        Status: "Completed",
        ParentId: 31,
        Priority: "Normal",
        Component: "Gantt Chart"
    },
    {
        TaskId: '41',
        TaskName: "Predecessor Types Configure",
        StartDate: new Date('2024/05/28'),
        EndDate: new Date('2024/06/18'),
        Assignee: [8],
        resourcesImage:'/9j/4AAQSkZJRgABAQAAAQABAAD//gAfQ29tcHJlc3NlZCBieSBqcGVnLXJlY29tcHJlc3P/2wCEAAQEBAQEBAQEBAQGBgUGBggHBwcHCAwJCQkJCQwTDA4MDA4MExEUEA8QFBEeFxUVFx4iHRsdIiolJSo0MjRERFwBBAQEBAQEBAQEBAYGBQYGCAcHBwcIDAkJCQkJDBMMDgwMDgwTERQQDxAUER4XFRUXHiIdGx0iKiUlKjQyNEREXP/CABEIADcANwMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAAFCAQGBwIDAP/aAAgBAQAAAAB/g1XXloS88OQU0GCe6NyOxoXir48e32K0iIz/AIk5+IUe07+JkzcmxgawWhza5jZBbHVuv//EABkBAAIDAQAAAAAAAAAAAAAAAAAFAQMEAv/aAAgBAhAAAACF+u7hBvZiBxeAf//EABoBAAICAwAAAAAAAAAAAAAAAAAFAQYCAwT/2gAIAQMQAAAAG6/RncU6MtVe5iYP/8QAIBAAAgMBAQEAAwEBAAAAAAAABAUCAwYBBwAIFBURE//aAAgBAQABCAD794thbOhLtHOcxSMt7q0v5FYlmd+vap/ltl1DbJitL6iKl7f4+VjEytMOxMCz6csvrTI3+n0A6Ted8Mxws+EVZo1v4xt14UCKA2QP/G9OTfGZCk1F2Mxymc9gJ0zMtRvjNCPQ9/iSeaelcZBZR6t2Zq4BtXmLezziC2T22K0lc5+zvY/wlPz0Wd6u+NLIIKZkrbqgEz8tsKa7UiWirk0MsMUFn1Yhe3h3mdIjxF39fp6mXec7zvOvl19RhFH06eKZybNPKeCaB60Y3fMqYMGICnrUUiq+hwvDMHPHrKF2EotyZEpTsNr9QXWOVsvRE/g4MUWd889hzfoGYg4AWB3DQuKN+0+Oqfhm0h25zVeeYYHOL32uYB5D/MZm/wAV9jrGE3e0wvm+W85XQBQff//EADAQAAIBAwIEAwgBBQAAAAAAAAECAwAEERIxBRMhQVFhgQYQIiMyYnGRFEJSU6Gx/9oACAEBAAk/AKRCiMVkvJQTEpG4Qf1kfquIzXhiQskMk4j5z+EUSlRXsTHDAHJeQMOYIh3VcDJFccdIJV1oEkM8H4ZHzg/o1AtvcP0ilTJhnPgpOzfafc7ImjmXkinBWInAQHsz/wDKURWljbPIVQbIgzgDxpphNcJrtuG27mOG3gbqmvclyKivEkGSGE5yK4s83s9xSZC0ZUEEatJBHZ11ZGKUSRTKGGNx3DA9iKbVd2uPmf5YW+iT89jX131zJL4nlqdCL6KKOnnIqZ8iwyKhijC4RMXMRkCgAKTHnIBq0ubu6K63CGNVRfMuw/QpCi292mUdSCM7g0S7Pw+3bLb/ABRg5NbRl7ebG7RyKWH6ZRR6i2QEeY8a6spVgOzaGDVBDrDAB9ALb5GSBneoLe7jLgHmIGBKfkdiOlWqm2W4h+ALqwkJ1bd87UW5scQBDklgOwOe4FdWMsXqdVdGtLhygPeGY60P+yK7ipuU8XQakDhx2O4q9XlAALEsQjy3bOCc0iSi3ReUGGQpY7j3ZaNFe6ucdlAKIPUnPpUZe5gUpLEN54CclR9w3WpNUbehBG4I7EVdxB4jJAH+qN5bdzHIn5Rhg1xWJYQ2SsCk1PHee1VwYnlj+uOCMMCTN5uKBTiMTJBc8MyGmWdtgvijdmohr+6YST42XAwsY+1B7uI3fDZrkDmyWkzRczH92iuF23GpIeJTzi5uLr+N8ueZ5soVBPMBfFcHB9orqGNFhndAltLIvxPK5OH5flnJrj0Ua3MzTXDwyc6aVnOTlzViiy4+ZO3V2Pckn3f/xAAiEQABAwMEAwEAAAAAAAAAAAABAgMRABASBCExMgUiQXH/2gAIAQIBAT8AJApzVkKOIMCmXg6LOdF/hpa/eJ2JivHnsmDxM31DCg8pCU8natM0WmUpIg/bgDLLETHN/wD/xAAiEQABBAEEAgMAAAAAAAAAAAABAgMREgAEEDFBBSEiMjP/2gAIAQMBAT8AAkxjPjwpAKiJOahhTCoPB42a/RuTHyGMsSzbsJnPLNiqXbj7Vr3xzvpddGkFiB69nNU8Hn1rCpT1vZVaWNZ43//Z',
        TimeLog: 18,
        Work: 15,
        Progress: 70,
        Status: "On Hold",
        ParentId: 31,
        Priority: "Low",
        Component: "Gantt Chart"
    },
    {
        TaskId: '42',
        TaskName: "Based on content height holiday, event markers, and weekend container rendering",
        StartDate: new Date('2024/05/28'),
        EndDate: new Date('2024/06/15'),
        Assignee: [4],
        resourcesImage:'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',
        TimeLog: 18,
        Work: 17,
        Progress: 60,
        Status: "In Progress",
        ParentId: 31,
        Priority: "Normal",
        Component: "Gantt Chart"
    },
    {
        TaskId: '43',
        TaskName: "Feature Completion",
        StartDate: new Date('2024/06/15'),
        TimeLog: 0,
        ParentId: 23,
    },
    {
        TaskId: '44',
        TaskName: "Testing",
        Work: 8,
        ParentId: 23,
    },
    {
        TaskId: '45',
        TaskName: "Phase-1",
        StartDate: new Date('2024/06/15'),
        EndDate: new Date('2024/06/20'),
        Work: 3,
        Progress: 0,
        ParentId: 44,
    },
    {
        TaskId: '46',
        TaskName: "Phase-2",
        StartDate: new Date('2024/06/18'),
        EndDate: new Date('2024/06/23'),
        Work: 2,
        Predecessor: "45FS",
        Progress: 0,
        ParentId: 44,
    },
    {
        TaskId: '47',
        TaskName: "Testing Completion",
        StartDate: new Date('2024/06/24'),
        TimeLog: 0,
        ParentId: 24,
    },
    {
        TaskId: '48',
        TaskName: "Release Roll-out",
        StartDate: new Date('2024/06/30'),
        TimeLog: 0,
        ParentId: 22,
    },
    {
        TaskId: '49',
        TaskName: "Q-3 Release",
        StartDate: new Date('2024/07/01'),
        EndDate: new Date('2024/09/29'),
        TimeLog: 2,
        Work: 2,
        Progress: 100,
        StoryPoints: 100,
        Status: "In Progress"
    },
    {
        TaskId: '50',
        TaskName: "Roadmap",
        ParentId: 49
    },
    {
        TaskId: '51',
        TaskName: "Implementation",
        ParentId: 50
    },
    {
        TaskId: '52',
        TaskName: "Grid",
        StartDate: new Date('2024/07/01'),
        EndDate: new Date('2024/07/20'),
        TimeLog: 15,
        Work: 120,
        Progress: 100,
        ParentId: 51
    },
    {
        TaskId: '53',
        TaskName: "Lazy-Loading Grouping with Virtualization",
        StartDate: new Date('2024/07/01'),
        EndDate: new Date('2024/07/15'),
        Assignee: [1],
        resourcesImage:'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',
        TimeLog: 11,
        Work: 12,
        Progress: 50,
        Status: "In Progress",
        ParentId: 52,
        Priority: "Normal",
        Component: "Grid"
    },
    {
        TaskId: '54',
        TaskName: "Filter Bar Keyboard Navigation",
        StartDate: new Date('2024/07/04'),
        EndDate: new Date('2024/07/18'),
        Assignee: [8],
        resourcesImage:'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',
        TimeLog: 11,
        Work: 15,
        Progress: 20,
        Status: "On Hold",
        ParentId: 52,
        Priority: "Low",
        Component: "Grid"
    },
    {
        TaskId: '55',
        TaskName: "Keyboard Navigation Enhanced",
        StartDate: new Date('2024/07/07'),
        EndDate: new Date('2024/07/20'),
        Assignee: [2],
        resourcesImage:'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',
        TimeLog: 11,
        Work: 12,
        Progress: 33,
        Status: "In Progress",
        ParentId: 52,
        Priority: "High",
        Component: "Grid"
    },
    {
        TaskId: '56',
        TaskName: "Tree Grid",
        StartDate: new Date('2024/07/01'),
        EndDate: new Date('2024/07/20'),
        TimeLog: 15,
        Work: 12,
        Progress: 100,
        ParentId: 51
    },
    {
        TaskId: '57',
        TaskName: "Persistence State",
        StartDate: new Date('2024/07/15'),
        EndDate: new Date('2024/08/15'),
        Assignee: [2],
        resourcesImage:'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',
        TimeLog: 24,
        Work: 20,
        Progress: 20,
        Status: "In Progress",
        ParentId: 56,
        Priority: "Normal",
        Component: "Tree Grid"
    },
    {
        TaskId: '58',
        TaskName: "Add or Remove Frozen Columns",
        StartDate: new Date('2024/07/18'),
        EndDate: new Date('2024/08/15'),
        Assignee: [1],
        resourcesImage:'/9j/4AAQSkZJRgABAQAAAQABAAD//gAfQ29tcHJlc3NlZCBieSBqcGVnLXJlY29tcHJlc3P/2wCEAAQEBAQEBAQEBAQGBgUGBggHBwcHCAwJCQkJCQwTDA4MDA4MExEUEA8QFBEeFxUVFx4iHRsdIiolJSo0MjRERFwBBAQEBAQEBAQEBAYGBQYGCAcHBwcIDAkJCQkJDBMMDgwMDgwTERQQDxAUER4XFRUXHiIdGx0iKiUlKjQyNEREXP/CABEIADcANwMBIgACEQEDEQH/xAAaAAACAwEBAAAAAAAAAAAAAAAHCAQFBgID/9oACAEBAAAAAH+qsdiSrczqiUBMb22cXitDeKqHJh+9YFRxtGA87Oevw2Kx1qZOdFq/gVwmsmjsTDfKu9sf/8QAGQEAAwEBAQAAAAAAAAAAAAAAAAQFBgED/9oACAECEAAAAORaDfjmqNozlhsZWP/EABkBAAIDAQAAAAAAAAAAAAAAAAAGAwQFAf/aAAgBAxAAAADu/l0535dXB6VKBDMf/8QANRAAAgIBAgQDBgUCBwAAAAAAAQIDBAUABhESIUEHIjEQEzJhgZEIFFJicRYjQkNRU6Gx0f/aAAgBAQABPwDRyFq9K9bBxoVRisl2UExKR6iMD4z/AMa3ZuPaO0ljG6stav3JFLpVVizn5iKMqqL821S8WPC675v6duQR8SDK9VOA+fkYnWJfE5eimT2jnZFhPoFcywhv0vHJ1U/Y6qZSeGePHZeAQWHPCKVOsE5/0Un0b9p9mRle9ZTDV5GSMoJLkingViJ4CNT+p/8ArWSsLicRZkpQKErQkRRjopb0UfxqvtKDJy5DI5ZFnuW3LyyP1PA/4RrM7OxVPnaJCir5Qo462Bck2luuCerZc46+Vgnic9FPz/j1GrVWtfrSVbKB42HXsQexB7Eaw9mdXsYm63Nbq8P7n+7C3wSfz2OsEVkr2snJ1e9ZklHc+7Q8kY+gGt3OYMRzMQqvNGp+p1l/ELD7fdaj15ZmLBCyPGoB+QZgW+g1u/etWq8cEVI2PeRrM3K4HlZebsCTrbmWpZqJrEdaeKeOVeEfu3kC9QOYlAeH11i7iXMXRlSVZCY1DFTxBZeh+x1nZVxtnHZntGXrzcPVo5FLD7Mo1txlGCxRHxCsgOt2442sM3lDGJxMVb0IH/gPHVuth1s1oI4meRuMrhVBVFXuen21ubKYo7gi9yvvVSFIDGkbIyIo9OLDh/A1tCCNoMpdqM0R/J2EjUgcyMqgq3A62nhzg8BjMbJIXkih4yv+qWQl3I+XMTw1vdCNu2FHVjLF9TzawZ/Lm/iWPBqdhygPeGY86EfcjUsayK6OoZWUqQfQg6yuCWPMGvYkmikqWRMhjdk94i9VDcpHMpHqNbrxUty4VmhgEDyBnMMUkbso7czSPw9O2vDivEk/AgK5aOMD08yedvtzBfZkoUyGRoYk8WjRXtWeHZQCiD6k6ytWxFPBmMfGXswKUliHrPATxKj9w9V1mfETY23KkV3Oblp1VdOdYGYtYI9OkKcX1Z3zQ8Q6ljO7TpzitjbUlMTyoEaduRX4qvZRx6cdbq3Nu5bDKFPkPUiuUCBevEknhrJ+J+6bNqEUMrNDFWsCdJUYq7zIxYScfkTxGvCn8S2e3ZNits39ny5LKjyWr9SURx8naVoyvRtYynNWSa1dIa/aYSTkei9ljH7UHs8QPCTa+/4C1+uIbw+CzF5XGsNsbdXhdtnI4PEClfju5SSy1qySAsRijjCKilSX8vxa8RU35ubBxbdwWBrQGy5F65+ZQNLGT0iHE8VX9etl/hN3LlpIbe5MrWq0+6Vn53OtheGe1vDvHpSwNBEk/wAyc9Xdu5JPs//EACMRAAIBAwMEAwAAAAAAAAAAAAECAwAREgQQMQUTIUEiM3L/2gAIAQIBAT8AJABJ4FSdWChmwOPANaPVJq4s15HO0/0y/k1IUKhcSUHqulKEzwSysLnzvPBJFM0CDk3Xx6NaOJooQrizHfJTAD2o8wbCS3ytv//EACMRAAEDAwQCAwAAAAAAAAAAAAECAxEABBIFECExFCJBUXH/2gAIAQMBAT8AAJIA7JimNELsAujOORV7Zrs3i0v9B2tY8liTHuO6t7Vcyk4qUJyNa8BnC3cnEKCRA7ESd9OvG3rYXD6uQnE8/IrUXkv3K1oVkn73BcDpSHlhCuSifUnf/9k=',
        TimeLog: 24,
        Work: 20,
        Progress: 40,
        Status: "In Progress",
        ParentId: 56,
        Priority: "Critical",
        Component: "Tree Grid"
    },
    {
        TaskId: '59',
        TaskName: "Gantt Chart",
        StartDate: new Date('2024/07/01'),
        EndDate: new Date('2024/07/20'),
        TimeLog: 15,
        Work: 120,
        Progress: 100,
        ParentId: 51
    },
    {
        TaskId: '60',
        TaskName: "Timeline Virtualization",
        StartDate: new Date('2024/07/18'),
        EndDate: new Date('2024/08/15'),
        Assignee: [8],
        resourcesImage:'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',
        TimeLog: 24,
        Work: 21,
        Progress: 80,
        Status: "In Progress",
        ParentId: 59,
        Priority: "Normal",
        Component: "Gantt Chart"
    },
    {
        TaskId: '61',
        TaskName: "String and GUID Task Id type",
        StartDate: new Date('2024/07/25'),
        EndDate: new Date('2024/08/20'),
        Assignee: [4],
        resourcesImage:'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',
        TimeLog: 24,
        Work: 19,
        Progress: 10,
        Status: "In Progress",
        ParentId: 59,
        Priority: "Normal",
        Component: "Gantt Chart"
    },
    {
        TaskId: '62',
        TaskName: "Rendering spinner for every Gantt action",
        StartDate: new Date('2024/07/27'),
        EndDate: new Date('2024/08/20'),
        Assignee: [2],
        resourcesImage:'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',
        TimeLog: 24,
        Work: 20,
        Progress: 35,
        Status: "In Progress",
        ParentId: 59,
        Priority: "Normal",
        Component: "Gantt Chart"
    },
    {
        TaskId: '63',
        TaskName: "External Key Events",
        StartDate: new Date('2024/07/27'),
        EndDate: new Date('2024/08/15'),
        Assignee: [8],
        resourcesImage:'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',
        TimeLog: 24,
        Work: 18,
        Progress: 100,
        Status: "Completed",
        ParentId: 59,
        Priority: "High",
        Component: "Gantt Chart"
    },
    {
        TaskId: '64',
        TaskName: "Dependency and CRUD operation in row virtualization",
        StartDate: new Date('2024/07/25'),
        EndDate: new Date('2024/08/15'),
        Assignee: [1],
        resourcesImage:'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',
        TimeLog: 24,
        Work: 17,
        Progress: 78,
        Status: "In Progress",
        ParentId: 59,
        Predecessor: "30FS+40Days",
        Priority: "Normal",
        Component: "Gantt Chart"
    },
    {
        TaskId: '65',
        TaskName: "AutoCalculateDateScheduling API",
        StartDate: new Date('2024/07/27'),
        EndDate: new Date('2024/08/20'),
        Assignee: [2],
        resourcesImage:'/9j/4AAQSkZJRgABAQAAAQABAAD//gAfQ29tcHJlc3NlZCBieSBqcGVnLXJlY29tcHJlc3P/2wCEAAQEBAQEBAQEBAQGBgUGBggHBwcHCAwJCQkJCQwTDA4MDA4MExEUEA8QFBEeFxUVFx4iHRsdIiolJSo0MjRERFwBBAQEBAQEBAQEBAYGBQYGCAcHBwcIDAkJCQkJDBMMDgwMDgwTERQQDxAUER4XFRUXHiIdGx0iKiUlKjQyNEREXP/CABEIADcANwMBIgACEQEDEQH/xAAbAAADAAMBAQAAAAAAAAAAAAAFBwgEBgkCA//aAAgBAQAAAAC/hQFOvYjnCinKzbmZbGH5zuQtL+rjE/fO5y7I93/rpMhES5qCgxOTPErmqDaDCzVpNoBsPfbf/8QAGgEAAQUBAAAAAAAAAAAAAAAAAAECAwQFBv/aAAgBAhAAAAAoWZjmNLVM6a2Pan//xAAXAQEBAQEAAAAAAAAAAAAAAAAABAUG/9oACAEDEAAAAGjNO7PFxm1FEH//xAA3EAACAgECBAMFBgQHAAAAAAABAgMEBQAGBxESQSExMhATUVKBCBQiYWKhFiNxkTNCU2RygrH/2gAIAQEAAT8A0chavSvWwcaFUYrJdlBMSkeYjA9Z/bW5b209pY98xvncBFf57UrKrP8ACOGL1H8gCdRcfOB8txaopTojeU5p8o9Uq+OuVUv7XzrLE4DIYpvvNduY+Vif2I1Vyk0NiPH5eBYLD+EUqEmCc/BSfJv0n2ZB5MjajwlZ2RCnvbkinkViJ5CMH5n/APNdNajV5L0Q14IyflREUeJ1vDP53jTu65l72QMOMWZ4MbW/yQwBuw+Yj1HW3OAEF1lntZ50iHNRGkHiSe/MtrbEF3ghuPEWkyktvbt2daeQRx4oH8EfkPk1PTr5CrLVtRBom5fkQR3B7EdjrD2Z1exibrdVury/mf6sLeiT+vY6wRV69rJv671mSX4n3anoRfoo1l6pv4rKUAwQ2ak8AY+QMiFef76x2VbacmNrvjnnmjAMiGRU5OW9IB8WOtucRXk2ra3FiMK9panISQGTpCv+ZAJ1ZvZjiJgbr28VBVimjjmj6RYVo2V/DwljQN3BI1Gysqup5hgCNZ2VcbZx2Z7Rl683LzaORSw/syjW3HUYHFfEVkB9m7sNitqby3LVzlFmkhlkmrFVKO6MSY+nXBvN0Zq+YoLQsixLKr9DxosBHkSCxAIXvrFTRzyDCrSjhnM6x9KgCFwT6l5dtIOlFX4Aa3uhG3bCjxYyxfU9WsEfu5v4lvBqlhygPeGY9aH9yPZ9rHEQ0M5tvOo/4sjVnqSoP9uQQw+kuuFMAd0DW4pK5J61lkYsOf8A28DrYaU23dFVqoohgWWdlTyDEcv7nnz9mShTIZGhiTzaNFe1Z5dlAKIPqTrK1bEU8GYx8ZezApSWIec8BPMqP1DzXXEn7Ue2dlT2sNisLfyGZi7TxmrWT+rP+JtY7c03GVty/wAVSKcnNcjsQyJ4CCLoEaJEOypy1tjgruGnuypiZcpXkSWMWVevZVHeH5mTnzGt75ylwWweJkw5jmzlu5FyD94IiGm+jenWy+NG1N60m+4CxHlo4laTGshMhZjyHQw8GBOsZTmrJNaukNftMJJyPJeyxj9KD2cReDu0OJNUnJVBDdH+Hai/C6nW2+AWe4ZbrOTe3VvYKeKSByT0ypzIKkL31tfZ+8It62tx5a37h6+T+/0pY5FKycj0CAgEkRmPw1ujg/n+Ke7XzuRvpTwcaJBVjRg0vuk8T/xJOtmcPtu7EpJVw9VRL0/zJ28XY+z/xAAiEQACAQMEAgMAAAAAAAAAAAABAgMABBEQEhNRISIFQYH/2gAIAQIBAT8AqW/hjk4y/t1ioJ0nTemtyA0pYREOjeT3XxjFufxhcg/ut5aMw5Ez7H6Gas7ZraHa4wzHcdVYjaOjmiSTk6f/xAAiEQACAQIGAwEAAAAAAAAAAAABAgMEEQAFEBITISJBUZH/2gAIAQMBAT8AxFltRJGsvH4H3fFTTvTPsf2LjWlBEChp1aNk8V+YzdVUwDddrH81y6t4xxkjpSLsbdYr6hamfehuoULr91//2Q==',
        TimeLog: 24,
        Work: 19,
        Progress: 25,
        Status: "On Hold",
        ParentId: 59,
        Priority: "Low",
        Component: "Gantt Chart"
    },
    {
        TaskId: '66',
        TaskName: "Persistence State",
        StartDate: new Date('2024/08/15'),
        EndDate: new Date('2024/09/15'),
        Assignee: [4],
        resourcesImage:'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',
        TimeLog: 24,
        Work: 18,
        Progress: 70,
        Status: "In Progress",
        ParentId: 59,
        Predecessor: "58FS",
        Priority: "Normal",
        Component: "Gantt Chart"
    },
    {
        TaskId: '67',
        TaskName: "Feature Completion",
        StartDate: new Date('2024/09/15'),
        TimeLog: 0,
        ParentId: 51,
    },
    {
        TaskId: '68',
        TaskName: "Testing",
        Work: 8,
        ParentId: 51,
    },
    {
        TaskId: '69',
        TaskName: "Phase-1",
        StartDate: new Date('2024/09/15'),
        EndDate: new Date('2024/09/19'),
        Work: 3,
        Progress: 0,
        ParentId: 68,
    },
    {
        TaskId: '70',
        TaskName: "Phase-2",
        StartDate: new Date('2024/09/18'),
        EndDate: new Date('2024/09/23'),
        Work: 4,
        Predecessor: "69FS",
        Progress: 0,
        ParentId: 68,
    },
    {
        TaskId: '71',
        TaskName: "Testing Completion",
        StartDate: new Date('2024/09/24'),
        TimeLog: 0,
        ParentId: 51,
    },
    {
        TaskId: '72',
        TaskName: "Release Roll-out",
        StartDate: new Date('2024/09/29'),
        TimeLog: 0,
        ParentId: 50,
    },
];

export let pdfExport: object[] = [
    {
        TaskID: 1,
        TaskName: 'Project initiation',
        StartDate: new Date('04/02/2025'),
        EndDate: new Date('04/21/2025'),
        subtasks: [
            {
                TaskID: 2, TaskName: 'Identify site location', StartDate: new Date('04/02/2025'), Duration: 0,
                Progress: 30, resources: [1],EmailId: 'MartinTamer@gmail.com', resourcesImage: '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', info: 'Measure the total property area alloted for construction',
            },
            {
                TaskID: 3, TaskName: 'Perform soil test', StartDate: new Date('04/02/2025'), Duration: 4, Predecessor: '2',
                 resources: [2],  Progress: 30 ,EmailId: 'RoseFuller@gmail.com', resourcesImage: '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' , info: 'Obtain an engineered soil test of lot where construction is planned.' +
                    'From an engineer or company specializing in soil testing'
            },
            { TaskID: 4, TaskName: 'Soil test approval', StartDate: new Date('04/02/2025'), Duration: 0, Predecessor: '3', Progress: 30 },
        ]
    },
    {
        TaskID: 5,
        TaskName: 'Project estimation',
        StartDate: new Date('04/02/2025'),
        EndDate: new Date('04/21/2025'),
        subtasks: [
            {
                TaskID: 6, TaskName: 'Develop floor plan for estimation', StartDate: new Date('04/04/2025'),
                Duration: 3, Predecessor: '4', Progress: 30, resources: 4,
                info: 'Develop floor plans and obtain a materials list for estimations'
            },
            {
                TaskID: 7, TaskName: 'List materials', StartDate: new Date('04/04/2025'),
                Duration: 3, Predecessor: '6',  Progress: 30 , resources: [4], EmailId: 'FullerKing@gmail.com', resourcesImage: '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' , info: ''
            },
            {
                TaskID: 8, TaskName: 'Estimation approval', StartDate: new Date('04/04/2025'),
                Duration: 0, Predecessor: '7',  resources: [2], EmailId: 'RoseFuller@gmail.com', resourcesImage: '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' , info: ''
            }
        ]
    },
    {
        TaskID: 9, TaskName: 'Sign contract', StartDate: new Date('04/04/2025'), Duration: 1,
        Predecessor: '8', Progress: 30,  resources: [2], EmailId: 'RoseFuller@gmail.com', resourcesImage: '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' ,
        info: 'If required obtain approval from HOA (homeowners association) or ARC (architectural review committee)'
    },
    {
        TaskID: 10,
        TaskName: 'Project approval and kick off',
        StartDate: new Date('04/04/2025'),
        EndDate: new Date('04/21/2025'),
        Duration: 0,
        Predecessor: '9'
    },
    {
        TaskID: 11,
        TaskName: 'Site work',
        StartDate: new Date('04/04/2025'),
        EndDate: new Date('04/21/2025'),
        Predecessor: '7, 8',
        subtasks: [
            {
                TaskID: 12, TaskName: 'Clear the building site', StartDate: new Date('04/04/2025'),
                Duration: 2,Progress: 30,  resources: [1],EmailId: 'MartinTamer@gmail.com', resourcesImage: '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', info: '',
            },
            {
                TaskID: 13, TaskName: 'Install temporary power service', StartDate: new Date('04/04/2025'),
                Duration: 2,Progress: 30,  Predecessor: '10', resources: [1],EmailId: 'MartinTamer@gmail.com', resourcesImage: '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', info: ''
            },
        ]
    },
    {
        TaskID: 14,
        TaskName: 'Foundation',
        StartDate: new Date('04/04/2025'),
        EndDate: new Date('04/21/2025'),
        subtasks: [
            {
                TaskID: 15, TaskName: 'Excavate for foundations', StartDate: new Date('04/04/2025'),
                Duration: 3, Progress: 30,  resources: [8],EmailId: 'JackDavolio@gmail.com', resourcesImage: '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',
                info: 'Excavate the foundation and dig footers (Scope of work is dependent of foundation designed by engineer)'
            },
            {
                TaskID: 16, TaskName: 'Dig footer', StartDate: new Date('04/04/2025'),
                Duration: 2, resources: [8],EmailId: 'JackDavolio@gmail.com', resourcesImage: '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', info: ''
            },
            {
                TaskID: 17, TaskName: 'Install plumbing grounds', StartDate: new Date('04/04/2025'), Duration: 4,
                Progress: 30, Predecessor: '13',  resources: [6], EmailId: 'VanJack@gmail.com', resourcesImage: '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', info: ''
            },
            {
                TaskID: 18, TaskName: 'Pour a foundation and footer with concrete', StartDate: new Date('04/04/2025'),
                Duration: 1, Predecessor: '17', resources: [8],EmailId: 'JackDavolio@gmail.com', resourcesImage: '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', info: ''
            },
            {
                TaskID: 19, TaskName: 'Cure basement walls', StartDate: new Date('04/04/2025'), Duration: 4,
                Progress: 30, Predecessor: '18', resources: [5],EmailId: 'DavolioFuller@gmail.com', resourcesImage: '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', info: ''
            },
        ]
    },
    {
        TaskID: 20,
        TaskName: 'Framing',
        StartDate: new Date('04/04/2025'),
        EndDate: new Date('04/21/2025'),
        subtasks: [
            {
                TaskID: 21, TaskName: 'Add load-bearing structure', StartDate: new Date('04/04/2025'),
                Duration: 3, Progress: 30, Predecessor: '19',  resources: [4], EmailId: 'FullerKing@gmail.com', resourcesImage: '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' ,
                info: 'Build the main load-bearing structure out of thick pieces of wood and' +
                    'possibly metal I-beams for large spans with few supports'
            },
            {
                TaskID: 22, TaskName: 'Install floor joists', StartDate: new Date('04/04/2025'),
                Duration: 3, Predecessor: '21', resources: [3], EmailId: 'MargaretBuchanan@gmail.com', resourcesImage: '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' , info: 'Add floor and ceiling joists and install subfloor panels'
            },
            {
                TaskID: 23, TaskName: 'Add ceiling joists', StartDate: new Date('04/04/2025'),
                Duration: 3, Progress: 30, Predecessor: '22SS', resources: [5],EmailId: 'DavolioFuller@gmail.com', resourcesImage: '/9j/4AAQSkZJRgABAQAAAQABAAD//gAfQ29tcHJlc3NlZCBieSBqcGVnLXJlY29tcHJlc3P/2wCEAAQEBAQEBAQEBAQGBgUGBggHBwcHCAwJCQkJCQwTDA4MDA4MExEUEA8QFBEeFxUVFx4iHRsdIiolJSo0MjRERFwBBAQEBAQEBAQEBAYGBQYGCAcHBwcIDAkJCQkJDBMMDgwMDgwTERQQDxAUER4XFRUXHiIdGx0iKiUlKjQyNEREXP/CABEIADcANwMBIgACEQEDEQH/xAAdAAACAgIDAQAAAAAAAAAAAAAEBwUIAwYAAQkC/9oACAEBAAAAAL/RKXSL6ch0UrvNI3nqPuPwl9aaldWm688LUdtYd922TOpawDHviJKrZ2W4J00JAp+yjGkf/8QAGgEAAgMBAQAAAAAAAAAAAAAAAAMBBAUCBv/aAAgBAhAAAAAR2yPO2tkxrV8S+P/EABkBAAIDAQAAAAAAAAAAAAAAAAAFAQQGA//aAAgBAxAAAACb9ev01i5AbFIpGC8//8QANBAAAgIBAgMFBgUEAwAAAAAAAQIDBAUABgcREhMhIjFBFDJRYnKBCBAVQqFTYXGRI3Ox/9oACAEBAAE/ANHIW70skGFRCqErJdlHOFCPMRj95/jXEHi/w32HA4zmbl3BmA5Q42pYDujjz60jISID5tVvxT7auTOIOFkIh9Ge6Fcj7Ra4ecUtmb96Ku28xaw+Y6S36bccOj/QGJDj6DqrlJobEePy8CwWH7opUJME5+Ck+TfKfyyDyZG1HhKzsiFO1uSKeRWInkIwfRn/APNceN0vsvhhlxiXNa1cVMZS7LwlDP3Mw/uqAnUXC3dt5Ip6dSSwHTqPQpY6j2LuvFiT23b2TLwqSI46jv8AfuGrWA3ttaLG7nt46xTAkVon6ws0bDxo3h5sp/zrhruJeJfDbb2dycQ7W5Ay2QP68DmIuvwJK8xrD2Z1exibrdVury/5P6sLe5J/n0OsB0tWs5Jh47tmSQep7NT0IPsBr8RWIN/bG1JSoMdbdGMef/rdyh1w8kQ0olji7h5nUzyPA6dIOuL2MsWtp5/2eEuUgEpUeYER6iRr8LmThv8ACbFQiXvp2bUJT4EuX1nZVxtnHZn0jL15uXm0cilh/plGtuOowOK+IrIDrfmHOc2jk6ar41aGwn1VpVmH8rrAVt9YaGfLpmIVhWszmvKhkhceagEKvTrN4e/uGtUavlLtVexR2SvMU5u68+Z5FQwHwOptvLj6EyT2J7HbR9EomIIAI5eQ7tcFtvRbY2ZQxUUaDs1DSunk8rgF21vdCNu2FHexli+56tYI+zm/iW7mqWHKA+sMx60P8kamj7WGaMnkHUr/ALGs5kbuJ2xkaMkDA17TVJH8kVonAKuf2gj11j8hkMpiqlubHSU4Y4lQ8uouXA5c1Ze4aFu1Yov7eJEkUMCsg6SeXkdbf6IsFiliUL1VYj3D4oNZKFMhkaGJPNo0V7Vnl6KAUQfcnWVq2Ip4Mxj4y9mBSksQ854CeZUfMPNdVrte/VSzVk643+xBHmCPQjXGixgsPuPEVhN2VjORTpbjA8DCLpEc31gnlra/tQq169mSvJFCp7Hkh6vCeRKk+Q1JZTK5T9KpsJrTP1OqnmEjT1b4AE6xOQgweMhx83azyIAkCjxPMxPPpX7n7DWMpzVkmtXSGv2mEk5HkvosY+VB+VvDv28l7FWjUuP7/hDRS/Wnx/uNcSeHlzcYpWc7EDLUNns545AwmE/SSPRkKlfDqngt/i3Xw0WYWtiWcq11wkk0UfyovIsx1szaX6NjWqYHHgCWTnNkrsoeawR++QLzJPwXuUaxuGgx7e1TObF4ry7Vx7oPogHuj8v/xAAjEQACAgEDAwUAAAAAAAAAAAABAwIRABAhMQQFYRIyQVFi/9oACAECAQE/AOMHUpn7WA4tsWi4SBHjQ7g4ulxkv1A2Tx5zthK5MT+r1mmKmygRyLGdCqQLZgGtt9Wwi1sJz5oDL+BsPoaf/8QAIhEAAgEDAwUBAAAAAAAAAAAAAQMCAAQREBIhBRMiMWFi/9oACAEDAQE/AIgyIiPZo2D1kdxUqeiSCBIEfDok7WrP6FXEJMYGY2j7XVYhioOzyAI6puZXNpBwwDE811RsT2oGXkSTt+a2l25FuxK8beSMjkZo5lIzkSZH2T70/9k=', info: ''
            },
            {
                TaskID: 24, TaskName: 'Install subfloor panels', StartDate: new Date('04/04/2025'),
                Duration: 3, Predecessor: '23', resources: [8],EmailId: 'JackDavolio@gmail.com', resourcesImage: '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'
            },
            {
                TaskID: 25, TaskName: 'Frame floor walls', StartDate: new Date('04/04/2025'), Duration: 3,
                Progress: 30, Predecessor: '24', resources: [1],EmailId: 'MartinTamer@gmail.com', resourcesImage: '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', info: ''
            },
            {
                TaskID: 26, TaskName: 'Frame floor decking', StartDate: new Date('04/04/2025'), Duration: 3,
                Progress: 30, Predecessor: '25SS',  resources: [4], EmailId: 'FullerKing@gmail.com', resourcesImage: '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' , info: ''
            },
        ]
    },
    {
        TaskID: 27,
        TaskName: 'Exterior finishing',
        StartDate: new Date('04/04/2025'),
        EndDate: new Date('04/21/2025'),
        subtasks: [
            {
                TaskID: 28, TaskName: 'Cover outer walls and roof in OSB', StartDate: new Date('04/04/2025'),
                Duration: 3, Progress: 30,  resources: [8],EmailId: 'JackDavolio@gmail.com', resourcesImage: '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',
                info: 'Cover outer walls and roof in OSB or plywood and a water-resistive barrier'
            },
            {
                TaskID: 29, TaskName: 'Add water resistive barrier', StartDate: new Date('04/04/2025'),
                Duration: 3, Predecessor: '28', resources: [1],EmailId: 'MartinTamer@gmail.com', resourcesImage: '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',
                info: 'Cover the walls with siding, typically vinyl, wood, or brick veneer but possibly stone or other materials'
            }
        ]
    },
   
];
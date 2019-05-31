
export let callHistoryData: any = [
    { "text": "Smith", "id": "received-01", "icon": "e-custom", "type": "received", "group": "Received", "time": "2 hours ago", "category": "Today" },
    {
        "text": "Johnson", "id": "received-02", "icon": "e-custom", "type": "received",
        "group": "Received", "time": "Yesterday", "category": "Yesterday"
    },
    { "text": "Williams", "id": "missed-01", "icon": "e-custom", "type": "missed", "group": "Missed", "time": "4 hours ago", "category": "Today" },
    { "text": "Jones", "id": "missed-02", "icon": "e-custom", "type": "missed", "group": "Missed", "time": "Yesterday", "category": "Yesterday" },
    {
        "text": "Brown", "id": "received-03", "icon": "e-custom", "type": "received",
        "group": "Received", "time": "Yesterday", "category": "Yesterday"
    },
    {
        "text": "Anderson", "id": "received-01", "icon": "e-custom", "type": "received",
        "group": "Received", "time": "12 hours ago", "category": "Today"
    },
    {
        "text": "Thomas", "id": "received-02", "icon": "e-custom", "type": "received",
        "group": "Received", "time": "Yesterday", "category": "Yesterday"
    },
    { "text": "Jackson", "id": "missed-01", "icon": "e-custom", "type": "missed", "group": "Missed", "time": "Yesterday", "category": "Yesterday" },
    { "text": "Emily", "id": "missed-01", "icon": "e-custom", "type": "missed", "group": "Missed", "time": "14 hours ago", "category": "Today" },
    { "text": "White", "id": "missed-02", "icon": "e-custom", "type": "missed", "group": "Missed", "time": "Yesterday", "category": "Yesterday" },
    { "text": "Jones", "id": "missed-02", "icon": "e-custom", "type": "missed", "group": "Missed", "time": "18 hours ago", "category": "Today" },
    { "text": "Grace", "id": "missed-02", "icon": "e-custom", "type": "missed", "group": "Missed", "time": "Yesterday", "category": "Yesterday" },
    { "text": "Brooklyn", "id": "missed-02", "icon": "e-custom", "type": "missed", "group": "Missed", "time": "Yesterday", "category": "Yesterday" },
    {
        "text": "Arianna", "id": "received-01", "icon": "e-custom", "type": "received",
        "group": "Received", "time": "Yesterday", "category": "Yesterday"
    },
    {
        "text": "Katherine", "id": "received-02", "icon": "e-custom", "type": "received",
        "group": "Received", "time": "Yesterday", "category": "Yesterday"
    }
];
export let checkboxdata: any = [
    { "text": "Hennessey Venom", "id": "list-01" },
    { "text": "Bugatti Chiron", "id": "list-02" },
    { "text": "Bugatti Veyron Super Sport", "id": "list-03" },
    { "text": "SSC Ultimate Aero", "id": "list-04" },
    { "text": "Koenigsegg CCR", "id": "list-05" },
    { "text": "McLaren F1", "id": "list-06" },
    { "text": "Aston Martin One- 77", "id": "list-07" },
    { "text": "Jaguar XJ220", "id": "list-08" },
    { "text": "McLaren P1", "id": "list-09" },
    { "text": "Ferrari LaFerrari", "id": "list-10" }
];
export let groupData: any = [
    {
        "text": "Audi A4",
        "id": "9bdb",
        "category": "Audi"
    },
    {
        "text": "Audi A5",
        "id": "4589",
        "category": "Audi"
    },
    {
        "text": "Audi A6",
        "id": "e807",
        "category": "Audi"
    },
    {
        "text": "Audi A7",
        "id": "a0cc",
        "category": "Audi"
    },
    {
        "text": "Audi A8",
        "id": "5e26",
        "category": "Audi"
    },
    {
        "text": "BMW 501",
        "id": "f849",
        "category": "BMW"
    },
    {
        "text": "BMW 502",
        "id": "7aff",
        "category": "BMW"
    },
    {
        "text": "BMW 503",
        "id": "b1da",
        "category": "BMW"
    },
    {
        "text": "BMW 507",
        "id": "de2f",
        "category": "BMW"
    },
    {
        "text": "BMW 3200",
        "id": "b2b1",
        "category": "BMW"
    }
];
export let grouptemplatedata: any = [
    { "Name": "WI-FI", "content": "Disabled", "id": "1", "class": "wifi", "category": "Wireless & networks", "order": 0 },
    { "Name": "Bluetooth", "content": "Disabled", "id": "2", "class": "bluetooth", "category": "Wireless & networks", "order": 0 },
    { "Name": "SIM cards", "id": "3", "content": "AT&T", "class": "sim", "category": "Wireless & networks", "order": 0 },
    { "Name": "Display", "content": "Adaptive brightness is OFF", "id": "4", "class": "display", "category": "Device", "order": 1 },
    { "Name": "Sound", "content": "Ringer volume at 50%", "id": "5", "class": "sound", "category": "Device", "order": 1 },
    { "Name": "Battery", "content": "85%", "id": "5", "class": "battery", "category": "Device", "order": 1 },
    { "Name": "Users", "content": "Signed in as Albert", "id": "6", "class": "user", "category": "Device", "order": 1 },
    { "Name": "Location", "content": "ON / High accuracy", "id": "7", "class": "location", "category": "Personal", "order": 2 },
    { "Name": "Security", "id": "8", "content": "Screen Lock", "class": "security", "category": "Personal", "order": 2 },
    { "Name": "Languages & input", "content": "English (US)", "id": "9", "class": "language", "category": "Personal", "order": 2 }
];
export let nesteddata: any = [
    {
        "id": "01", "text": "Music", "icon": "folder",
        "child": [
            { "id": "01-01", "text": "Gouttes.mp3", "icon": "file" }
        ]
    },
    {
        "id": "02", "text": "Videos", "icon": "folder",
        "child": [
            { "id": "02-01", "text": "Naturals.mp4", "icon": "file" },
            { "id": "02-02", "text": "Wild.mpeg", "icon": "file" }
        ]
    },
    {
        "id": "03", "text": "Documents", "icon": "folder",
        "child": [
            { "id": "03-01", "text": "Environment Pollution.docx", "icon": "file" },
            { "id": "03-02", "text": "Global Water, Sanitation, & Hygiene.docx", "icon": "file" },
            { "id": "03-03", "text": "Global Warming.ppt", "icon": "file" },
            { "id": "03-04", "text": "Social Network.pdf", "icon": "file" },
            { "id": "03-05", "text": "Youth Empowerment.pdf", "icon": "file" }
        ]
    },
    {
        "id": "04", "text": "Pictures", "icon": "folder",
        "child": [
            {
                "id": "04-01", "text": "Camera Roll", "icon": "folder",
                "child": [
                    { "id": "04-01-01", "text": "WIN_20160726_094117.JPG", "icon": "file" },
                    { "id": "04-01-02", "text": "WIN_20160726_094118.JPG", "icon": "file" },
                    { "id": "04-01-03", "text": "WIN_20160726_094119.JPG", "icon": "file" }
                ]
            },
            {
                "id": "04-02", "text": "Wind.jpg", "icon": "file"
            },
            {
                "id": "04-02", "text": "Stone.jpg", "icon": "file"
            },
            {
                "id": "04-02", "text": "Home.jpg", "icon": "file"
            },
            {
                "id": "04-02", "text": "Bridge.png", "icon": "file"
            }
        ]
    },
    {
        "id": "05", "text": "Downloads", "icon": "folder",
        "child": [
            { "id": "05-01", "text": "UI-Guide.pdf", "icon": "file" },
            { "id": "05-02", "text": "Tutorials.zip", "icon": "file" },
            { "id": "05-03", "text": "Game.exe", "icon": "file" },
            { "id": "05-04", "text": "TypeScript.7z", "icon": "file" }
        ]
    }
];
export let virtualizationdata: any = [
    { "name": "Nancy", "icon": "N", "id": "0" },
    { "name": "Andrew", "icon": "A", "id": "1" },
    { "name": "Janet", "icon": "J", "id": "2" },
    { "name": "Margaret", "imgUrl": "margaret", "id": "3" },
    { "name": "Steven", "icon": "S", "id": "4" },
    { "name": "Laura", "imgUrl": "laura", "id": "5" },
    { "name": "Robert", "icon": "R", "id": "6" },
    { "name": "Michael", "icon": "M", "id": "7" },
    { "name": "Albert", "imgUrl": "albert", "id": "8" },
    { "name": "Nolan", "icon": "N", "id": "9" }
];

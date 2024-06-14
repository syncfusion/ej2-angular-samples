
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
        "text": "Anderson", "id": "received-04", "icon": "e-custom", "type": "received",
        "group": "Received", "time": "12 hours ago", "category": "Today"
    },
    {
        "text": "Thomas", "id": "received-05", "icon": "e-custom", "type": "received",
        "group": "Received", "time": "Yesterday", "category": "Yesterday"
    },
    { "text": "Jackson", "id": "missed-03", "icon": "e-custom", "type": "missed", "group": "Missed", "time": "Yesterday", "category": "Yesterday" },
    { "text": "Emily", "id": "missed-04", "icon": "e-custom", "type": "missed", "group": "Missed", "time": "14 hours ago", "category": "Today" },
    { "text": "White", "id": "missed-05", "icon": "e-custom", "type": "missed", "group": "Missed", "time": "Yesterday", "category": "Yesterday" },
    { "text": "Jones", "id": "missed-06", "icon": "e-custom", "type": "missed", "group": "Missed", "time": "18 hours ago", "category": "Today" },
    { "text": "Grace", "id": "missed-07", "icon": "e-custom", "type": "missed", "group": "Missed", "time": "Yesterday", "category": "Yesterday" },
    { "text": "Brooklyn", "id": "missed-08", "icon": "e-custom", "type": "missed", "group": "Missed", "time": "Yesterday", "category": "Yesterday" },
    {
        "text": "Arianna", "id": "received-06", "icon": "e-custom", "type": "received",
        "group": "Received", "time": "Yesterday", "category": "Yesterday"
    },
    {
        "text": "Katherine", "id": "received-07", "icon": "e-custom", "type": "received",
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
    { "text": "Ferrari LaFerrari", "id": "list-10" },
    { "text": "Zenvo ST1", "id": "list-11" },
    { "text": "Lamborghini Veneno", "id": "list-12" }
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
    { "Name": "Battery", "content": "85%", "id": "6", "class": "battery", "category": "Device", "order": 1 },
    { "Name": "Users", "content": "Signed in as Albert", "id": "7", "class": "user", "category": "Device", "order": 1 },
    { "Name": "Location", "content": "ON / High accuracy", "id": "8", "class": "location", "category": "Personal", "order": 2 },
    { "Name": "Security", "id": "9", "content": "Screen Lock", "class": "security", "category": "Personal", "order": 2 },
    { "Name": "Languages & input", "content": "English (US)", "id": "10", "class": "language", "category": "Personal", "order": 2 }
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
    { "name": "Nancy", "icon": "N", "id": "0", "altText":"" },
    { "name": "Andrew", "icon": "A", "id": "1", "altText":"" },
    { "name": "Janet", "icon": "J", "id": "2", "altText":"" },
    { "name": "Margaret", "imgUrl": "//ej2.syncfusion.com/demos/src/listview/images/margaret.png", "id": "3", "altText":"" },
    { "name": "Steven", "icon": "S", "id": "4", "altText":"" },
    { "name": "Laura", "imgUrl": "//ej2.syncfusion.com/demos/src/listview/images/laura.png", "id": "5", "altText":"" },
    { "name": "Robert", "icon": "R", "id": "6", "altText":"" },
    { "name": "Michael", "icon": "M", "id": "7", "altText":"" },
    { "name": "Albert", "imgUrl": "//ej2.syncfusion.com/demos/src/listview/images/albert.png", "id": "8", "altText":"" },
    { "name": "Nolan", "icon": "N", "id": "9", "altText":"" }
];
export let foodData: any = [
    { text: 'Hamburger', id: 'list-01', price: '$10', src: 'hamburger.jpg', altText: 'hamburger', type: 'non-veg', description: 'A patty of ground beef grilled and placed between two halves of a bun with slices of lettuce and mayonnaise', rating: 3 },
    { text: 'Cheeseburger', id: 'list-02', price: '$12', src: 'cheeseburger.jpg', altText: 'cheeseburger', type: 'veg', description: 'A hamburger with a slice of melted cheese on top of the meat patty, added near the end of the cooking time', rating: 4  },
    { text: 'Sandwich', id: 'list-03', price: '$8', src: 'sandwich.jpg', altText: 'sandwich', type: 'veg', description: 'A combination of vegetables, sliced cheese or meat, placed on or between slices of bread with layer of ingredients', rating: 5 },
    { text: 'Milkshake', id: 'list-04', price: '$6', src: 'milkshake.jpg', altText: 'milkshake', type: 'veg', description: 'A sweet beverage made by blending milk, ice cream, and flavorings or fruit syrup into a thick, sweet, cold mixture', rating: 3 },
    { text: 'Muffin', id: 'list-05', price: '$11', src: 'muffin.jpg', altText: 'muffin', type: 'veg', description: 'Muffins are single-serving quick breads, which rise with the help of baking soda or baking powder and eggs instead of yeast', rating: 4 },
    { text: 'Pizza', id: 'list-06', price: '$22', src: 'pizza.jpg', altText: 'pizza', type: 'veg', description: 'A combination of a flattened disk of bread dough with olive oil, oregano, tomato, mozzarella cheese', rating: 3 },
    { text: 'Onion ring', id: 'list-07', price: '$10', src: 'onionrings.jpg', altText: 'onionrings', type: 'veg', description: 'Consists of a cross-sectional "ring" of onion dipped in bread crumbs and then deep fried; variant is made with onion paste.', rating: 4 },
    { text: 'Sausage', id: 'list-08', price: '$15', src: 'sausage.jpg', altText: 'sausage', type: 'veg', description: 'Sausage is a combination of minced/ground meat, a binder, water and seasonings, mild but strongly spiced', rating: 5 },
    { text: 'Pretzel', id: 'list-09', price: '$25', src: 'pretzel.jpg', altText: 'pretzel', type: 'veg', description: 'Made from a rope of dough, the pretzel is briefly boiled and then glazed with egg, salted, and baked', rating: 3 },
    { text: 'Pancake', id: 'list-10', price: '$23', src: 'pancake.jpg', altText: 'pancake', type: 'veg', description: 'A combination of eggs, milk on a hot surface such as a griddle or frying pan, often frying with oil or butter', rating: 4 },
];
export let  foodItems : any = [
    { text: 'Taco', price: '$15', src: 'taco.jpg', type: 'veg', description: 'A crispy or soft corn or wheat tortilla that is folded or rolled and stuffed with a mixture of cheese, lettuce, and tomato' , rating: 5},
    { text: 'Hot dog', price: '$50', src: 'hotdog.jpg', type: 'non-veg', description: 'A dish consisting of a grilled or steamed sausage served in the slit of a partially sliced bun also used as a wiener', rating: 3 },
    { text: 'Fried chicken', price: '$19', src: 'friedchicken.jpg', type: 'non-veg', description: 'Chicken pieces coated with seasoned flour or batter and pan-fried, deep fried, pressure fried, or air fried', rating: 4 },
    { text: 'Donuts', price: '$5', src: 'donuts.jpg', type: 'veg', description: 'A kind of ring-shaped snack food popular in many countries, which are usually deep fried from flour doughs', rating: 3 },
    { text: 'Baguette', price: '$7', src: 'baguette.jpg', type: 'veg', description: 'French bread shaped like a long, thin loaf with a crisp and crunchy crust made using flour, yeast and water', rating: 4 },
    { text: 'Soft drink', price: '$3', src: 'softdrink.jpg', type: 'veg', description: 'Flavored drinks usually with nutritive and/or intense sweeteners with other permitted food additives', rating: 5 },
    { text: 'Bacon', price: '$12', src: 'bacon.jpg', type: 'non-veg', description: 'Salt-cured pork made from various cuts, typically the belly or less fatty parts of the back eaten as a side dish', rating: 3 },
    { text: 'Chips', price: '$13', src: 'chips.jpg', type: 'veg', description: 'A small usually thin and flat piece (as of wood or stone) cut, struck, or flaked off also served as an appetizer', rating: 4 },
    { text: 'Noodles', price: '$11', src: 'noodles.jpg', type: 'veg', description: 'A cooked egg-and-flour paste, generally distinguished from pasta by its elongated ribbonlike form', rating: 3 },
];
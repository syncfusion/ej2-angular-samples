let communityMessageAdmin = {
    user: 'Alice',
    id: 'admin'
};

let communityMessageUser1 = {
    user: 'Michale Suyama',
    id: 'user1',
    avatarBgColor: "#87cefa"
};

let communityMessageUser2 = {
    user: 'Charlie',
    id: 'user2',
    avatarUrl: "./assets/chat-ui/images/charlie.png",
};

let communityMessageUser3 = {
    user: 'Janet',
    id: 'user3',
    avatarBgColor: "#dec287",
    avatarUrl: './assets/chat-ui/images/janet.png'
};

let chatMessageUser1 = {
    user: 'Albert',
    id: 'user1',
    avatarUrl: './assets/chat-ui/images/andrew.png'
};

let chatMessageUser2 = {
    user: 'Reena',
    id: 'user2',
    avatarUrl: './assets/chat-ui/images/reena.png'
};

let integrationMessageUser1 = {
    user: 'Reena',
    id: 'user1',
    avatarUrl: './assets/chat-ui/images/reena.png'
};

let integrationMessageUser2 = {
    user: 'Albert',
    id: 'user2',
    avatarUrl: './assets/chat-ui/images/andrew.png'
};

let botMessage = {
    user: 'Bot',
    id: 'bot',
    avatarUrl: './assets/chat-ui/images/bot.png'
};

let walterMessageUser1 = {
    user: 'Sam',
    id: 'user2',
    avatarUrl: './assets/chat-ui/images/laura.png'
};

let walterMessageUser2 = {
    user: 'Charlie',
    id: 'user5',
    avatarUrl: "./assets/chat-ui/images/charlie.png",
};

let lauraMessageUser1 = {
    user: 'Laura Callahan',
    id: 'user1',
    avatarUrl: './assets/chat-ui/images/laura.png'
};

let lauraMessageUser2 = {
    user: 'Sam',
    id: 'user3',
    avatarUrl: './assets/chat-ui/images/laura.png'
};

let teamsMessageUser1 = {
    user: 'Admin',
    id: 'team'
};

let teamsMessageUser2= {
    user: 'Janet',
    id: 'user2',
    avatarUrl: './assets/chat-ui/images/janet.png'
};

export const communityMessagedata = [
    {
        author: communityMessageAdmin,
        text: 'Hey Michale, Charlie! Seen the latest posts in the Design Community? Amazing projects!',
        timeStamp: new Date("October 25, 2024 07:30")
    },
    {
        author: communityMessageUser1,
        text: 'Hi Alice! Yes, Dana’s new UI design is incredible.',
        timeStamp: new Date("October 25, 2024 08:00")
    },
    {
        author: communityMessageUser2,
        text: 'Hey! I loved Dana’s use of color. Frank’s typography guide was great too.',
        timeStamp: new Date("October 25, 2024 11:00")
    },
    {
        author: communityMessageAdmin,
        text: 'Absolutely! Any new community events planned?',
        timeStamp: new Date("October 26, 2024 11:00")
    },
    {
        author: communityMessageUser1,
        text: 'We should organize a design challenge.',
        timeStamp: new Date("October 26, 2024 12:15")
    },
    {
        author: communityMessageUser3,
        text: 'I am excited to see the new projects.',
        timeStamp: new Date("October 26, 2024 12:17")
    },
    {
        author: communityMessageUser2,
        text: 'Great idea! Let’s discuss it in the next meeting.',
        timeStamp: new Date("October 26, 2024 12:30")
    },
    {
        author: communityMessageAdmin,
        text: 'Sounds good! This community is so inspiring.',
        timeStamp: new Date()
    },
    {
        author: communityMessageUser1,
        text: 'Agreed! Excited to see everyone’s ideas.',
        timeStamp: new Date()
    },
    {
        author: communityMessageUser2,
        text: 'I am looking forward to the design challenge.',
        timeStamp: new Date()
    }
];

export const chatMessagedata = [
    {
        author: chatMessageUser1,
        text: "Hi there! How's it going?"
    },
    {
        author: chatMessageUser2,
        text: "Hey! I'm doing well, thanks. How about you?"
    },
    {
        author: chatMessageUser1,
        text: "Mostly the usual stuff. I did start a new hobby - painting!"
    },
];

export const integrationMessagedata = [
    {
        author: integrationMessageUser1,
        text: "Hey, I'm having trouble with my computer. It keeps freezing."
    },
    {
        author: integrationMessageUser2,
        text: "Oh, that's annoying. Have you tried restarting it?"
    },
    {
        author: integrationMessageUser1,
        text: "Yeah, I did, but it didn't help."
    },
    {
        author: integrationMessageUser2,
        text: "Sometimes, outdated software or malware can cause issues."
    },
    {
        author: integrationMessageUser1,
        text: "Okay, I'll try that. Thanks for the help!"
    }
];

export const botMessagedata = [
    {
        author: botMessage,
        text: "Hello Sam, I am a virtual assitant."
    },
    {
        author: botMessage,
        text: "Which room are you looking to decorate?"
    }
];

export const botData = [
    {
        text: "Bedroom",
        reply: "For a bedroom, we can create a serene and calm atmosphere with neutral colors and comfortable bedding.",
        suggestions: ["Garden", "Balcony"]
    },
    {
        text: "Kitchen",
        reply: "For a kitchen, we can go for a modern, sleek look with stainless steel appliances and minimalist cabinetry. </br> <p>Any other home decor suggestions you'd like to explore ?</p>",
        suggestions: ["Wall art", "Plants"]
    }
    
];

export const chatSuggestions = ["Bedroom", "Kitchen"];

export const walterMessagedata = [
    {
        author: walterMessageUser1,
        text: "Hey Charlie, have you thought about where you want to go for our vacation?"
    },
    {
        author: walterMessageUser2,
        text: "Hi Sam! I was thinking about going to Bali. I've heard the beaches are beautiful and there's so much to do."
    },
    {
        author: walterMessageUser1,
        text: "Bali sounds amazing! I've always wanted to try surfing. Do you know any good places to stay?"
    },
    {
        author: walterMessageUser2,
        text: "Yes, I found a few nice resorts and some budget-friendly options too. I'll send you the links."
    },
    {
        author: walterMessageUser1,
        text: "Great! Let's finalize our plans this weekend."
    }
];

export const lauraMessagedata = [
    {
        author: lauraMessageUser1,
        text: "Hey Sam, can we have a quick meeting tomorrow morning to discuss the new project?"
    },
    {
        author: lauraMessageUser2,
        text: "Sure, what time works best for you?"
    },
    {
        author: lauraMessageUser1,
        text: "10 AM?"
    },
    {
        author: lauraMessageUser2,
        text: "10 AM works for me."
    }
];

export const teamsMessagedate = [
    {
        author: teamsMessageUser1,
        text: "Hi, everyone!, welcome to the new web team"
    },
    {
        author: teamsMessageUser2,
        text: "Hi Sir, excited about the new team."
    },
    {
        author: {
            user: 'Margaret Peacock',
            id: 'user3'
        },
        text: "Good morning ! suprised with the new team message."
    },
    {
        author: communityMessageUser2,
        text: "Hi all, what's the purpose of this new team formation ?"
    },
    {
        author: teamsMessageUser1,
        text: "Charlie, we are planning for a new portal launch hence, grouping all in one place."
    }
];

export const suyamaMessagedata = [
    { 
        author: {
            id: 'user4',
            user: 'Reena'
        },
        text: "Hi, are you available ?"
    }
];

export const templateMessagedata = [
    {
        text: "Hello! I'm the Order tracking bot. how can I help you today?",
        suggestions: ["Track an order", "Cancel an order"]
    },
    {
        text: "Track an order",
        reply: 'Please select the order you want to track.',
        suggestions: ["Order #67890", "Order #53461"]
    },
    {
        text: "Order #67890",
        reply: "Fetching details for order <b>#67890</b> </br></br> Your order is currently being processed and will ship in 2-3 days.",
        suggestions: ["Back to main menu", "Need help with something else"]
    },
    {
        text: "Order #53461",
        reply: "Fetching details for order <b>#53461</b> </br></br> Your order is currently being processed and will ship in 2-3 days.",
        suggestions: ["Back to main menu", "Need help with something else"]
    },
    {
        text: "Order #87890",
        reply: "Your order <b>#87890</b> has been cancelled.",
        suggestions: ["Back to main menu", "Need help with something else"]
    },
    {
        text: "Order #90910",
        reply: "Your order <b>#90910</b> has been cancelled.",
        suggestions: ["Back to main menu", "Need help with something else"]
    },
    {
        text: "Cancel an order",
        reply: 'Pick the order you need to cancel.',
        suggestions: ["Order #87890", "Order #90910"]
    },
    {
        text: "Back to main menu",
        reply: "You have returned to the main menu. What would you like to do next?",
        suggestions: ["Track an order", "Cancel an order"]
    },
    {
        text: "Need help with something else",
        reply: "Please hold while we connect you to a support agent. You can chat with them for any additional queries.",
        suggestions: []
    }
];

export const defaultChatSuggestions = [ "Awesome!", "What kind of painting ?" ];

export const integrationListTemplateData = [
    {
        id: '01',
        title: 'Albert',
        imgSrc: 'andrew', message: "Okay, I'll try that. Thanks for the help!"
    },
    {
        id: '02',
        title: 'Bot',
        imgSrc: 'bot', message: 'Personal decor assistant'
    },
    {
        id: '03',
        title: 'Charlie',
        imgSrc: 'charlie', message: "Great! Let's finalize our plans this weekend."
    },
    {
        id: '04',
        title: 'Laura',
        imgSrc: 'laura', message: '10 AM works for me.'
    },
    {
        id: '05',
        title: 'New Dev Team',
        imgSrc: 'calendar', message: 'User added'
    },
    {
        id: '06',
        title: 'Reena',
        imgSrc: 'reena', message: 'You: Hi, are you available ?'
    },
];


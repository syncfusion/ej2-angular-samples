const recentDocuments: Array<{ fileName: string, location: string }> = [
    {
        "fileName": "Classic_layout.docx",
        "location": "EJ2 >> Components >> Navigations >> Ribbon >> layouts"
    },
    {
        "fileName": "Simplified_layout.docx",
        "location": "EJ2 >> Components >> Navigations >> Ribbon >> layouts"
    },
    {
        "fileName": "Ribbon_resize.docx",
        "location": "EJ2 >> Components >> Navigations >> Ribbon >> resize"
    },
    {
        "fileName": "Ribbon_backstage.docx",
        "location": "EJ2 >> Components >> Navigations >> Ribbon >> backstage"
    },
    {
        "fileName": "Ribbon_overflow.docx",
        "location": "EJ2 >> Components >> Navigations >> Ribbon >> overflow"
    },
    {
        "fileName": "Custom_items.docx",
        "location": "EJ2 >> Components >> Navigations >> Ribbon >> items"
    }
]

const dataOptions: Record<string, Array<{ icon: string, title: string, description: string }>> = {
    "info": [
        {
            "icon": "e-open-link",
            "title": "Open in Desktop App",
            "description": "Use the full functionality of Ribbon"
        },
        {
            "icon": "e-protect-sheet",
            "title": "Protect Document",
            "description": "To prevent accidental changes, this document has been set to open as view-only."
        },
        {
            "icon": "e-send-to-back",
            "title": "Version History",
            "description": "View previous versions"
        }
    ],
    "save": [
        {
            "icon": "e-save",
            "title": "Save as",
            "description": "Save a copy online"
        },
        {
            "icon": "e-rename",
            "title": "Rename",
            "description": "Rename this file"
        },
        {
            "icon": "e-download",
            "title": "Download a Copy",
            "description": "Download a local copy"
        },
        {
            "icon": "e-export-pdf",
            "title": "Download as PDF",
            "description": "Download a copy as PDF file"
        },
        {
            "icon": "e-chevron-down-fill",
            "title": "Download as ODT",
            "description": "Download a copy as ODT file"
        }
    ],
    "export": [
        {
            "icon": "e-transform-right",
            "title": "Transform to Web Page",
            "description": "Transform your document into an interactive webpage"
        },
        {
            "icon": "e-export",
            "title": "Export to PowerPoint presentation",
            "description": "Export your document into a multi-slide presentation"
        },
        {
            "icon": "e-protect-workbook",
            "title": "Send documents to Kindle",
            "description": "Send documents to your Kindle device to read and annotate the documents"
        }
    ],
    "print": [
        {
            "icon": "e-print-layout",
            "title": "Print",
            "description": "Print this document"
        }
    ],
    "share": [
        {
            "icon": "e-arrow-right-up",
            "title": "Share with People",
            "description": "Invite other people to view or edit this document"
        },
        {
            "icon": "e-protect-workbook",
            "title": "Embed",
            "description": "Embed this document in your blog or website"
        }
    ],
    "account": [
        {
            "icon": "e-people",
            "title": "Account type",
            "description": "Administrator"
        },
        {
            "icon": "e-password",
            "title": "Password protected",
            "description": "Yes"
        },
        {
            "icon": "e-text-that-contains",
            "title": "E-mail",
            "description": "abc@gmail.com"
        }
    ],
    "feedback": [
        {
            "icon": "e-check",
            "title": "I Like Something",
            "description": "It's nice to know when we have made a positive change."
        },
        {
            "icon": "e-close",
            "title": "I Don't Like Something",
            "description": "If something's not right we'd like to know so we can fix it."
        },
        {
            "icon": "e-comment-add",
            "title": "I Have a Suggestion",
            "description": "Do you have an idea for a new feature or an improvement ?"
        }
    ]
}

export const backstageData = {
    recentDocuments: recentDocuments,
    dataOptions: dataOptions
}

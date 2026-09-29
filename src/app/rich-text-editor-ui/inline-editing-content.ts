export const INLINE_EDITING_CONTENT = {
    type: 'document',
    schemaVersion: 1,
    attrs: {},
    children: [
        {
            type: 'heading',
            attrs: {
                level: 4,
                align: null,
                indent: 0
            },
            children: [
                {
                    type: 'text',
                    text: 'Inline Editing Demo',
                    attrs: {},
                    children: [],
                    marks: []
                }
            ],
            marks: []
        },
        {
            type: 'paragraph',
            attrs: {
                align: null,
                indent: 0
            },
            children: [
                {
                    type: 'text',
                    text: 'Welcome to the ',
                    attrs: {},
                    children: [],
                    marks: []
                },
                {
                    type: 'text',
                    text: 'Rich Text Editor',
                    attrs: {},
                    children: [],
                    marks: [
                        {
                            type: 'bold',
                            attrs: {}
                        }
                    ]
                },
                {
                    type: 'text',
                    text: ' inline editing demo. Select any part of this text to see the ',
                    attrs: {},
                    children: [],
                    marks: []
                },
                {
                    type: 'text',
                    text: 'quick toolbar',
                    attrs: {},
                    children: [],
                    marks: [
                        {
                            type: 'italic',
                            attrs: {}
                        }
                    ]
                },
                {
                    type: 'text',
                    text: ' appear with formatting options like Bold, Italic, Underline, and more.',
                    attrs: {},
                    children: [],
                    marks: []
                }
            ],
            marks: []
        },
        {
            type: 'heading',
            attrs: {
                level: 4,
                align: null,
                indent: 0
            },
            children: [
                {
                    type: 'text',
                    text: 'Try These Interactions',
                    attrs: {},
                    children: [],
                    marks: []
                }
            ],
            marks: []
        },
        {
            type: 'bulletList',
            attrs: {
                listStyleType: 'disc'
            },
            children: [
                {
                    type: 'listItem',
                    attrs: {
                        align: null
                    },
                    children: [
                        {
                            type: 'paragraph',
                            attrs: {
                                align: null,
                                indent: 0
                            },
                            children: [
                                {
                                    type: 'text',
                                    text: 'Select a word or sentence to trigger the ',
                                    attrs: {},
                                    children: [],
                                    marks: []
                                },
                                {
                                    type: 'text',
                                    text: 'quick toolbar',
                                    attrs: {},
                                    children: [],
                                    marks: [
                                        {
                                            type: 'bold',
                                            attrs: {}
                                        }
                                    ]
                                },
                                {
                                    type: 'text',
                                    text: ' with text formatting options.',
                                    attrs: {},
                                    children: [],
                                    marks: []
                                }
                            ],
                            marks: []
                        }
                    ],
                    marks: []
                },
                {
                    type: 'listItem',
                    attrs: {
                        align: null
                    },
                    children: [
                        {
                            type: 'paragraph',
                            attrs: {
                                align: null,
                                indent: 0
                            },
                            children: [
                                {
                                    type: 'text',
                                    text: 'Type ',
                                    attrs: {},
                                    children: [],
                                    marks: []
                                },
                                {
                                    type: 'text',
                                    text: '/',
                                    attrs: {},
                                    children: [],
                                    marks: [
                                        {
                                            type: 'code',
                                            attrs: {}
                                        }
                                    ]
                                },
                                {
                                    type: 'text',
                                    text: ' on a new line to open the ',
                                    attrs: {},
                                    children: [],
                                    marks: []
                                },
                                {
                                    type: 'text',
                                    text: 'slash command',
                                    attrs: {},
                                    children: [],
                                    marks: [
                                        {
                                            type: 'bold',
                                            attrs: {}
                                        }
                                    ]
                                },
                                {
                                    type: 'text',
                                    text: ' menu and insert elements like tables, images, or lists.',
                                    attrs: {},
                                    children: [],
                                    marks: []
                                }
                            ],
                            marks: []
                        }
                    ],
                    marks: []
                },
                {
                    type: 'listItem',
                    attrs: {
                        align: null
                    },
                    children: [
                        {
                            type: 'paragraph',
                            attrs: {
                                align: null,
                                indent: 0
                            },
                            children: [
                                {
                                    type: 'text',
                                    text: 'Highlight text and try changing the ',
                                    attrs: {},
                                    children: [],
                                    marks: []
                                },
                                {
                                    type: 'text',
                                    text: 'font color',
                                    attrs: {},
                                    children: [],
                                    marks: [
                                        {
                                            type: 'textStyle',
                                            attrs: {
                                                color: '#e74c3c',
                                                backgroundColor: null,
                                                fontFamily: null,
                                                fontSize: null
                                            }
                                        }
                                    ]
                                },
                                {
                                    type: 'text',
                                    text: ' or ',
                                    attrs: {},
                                    children: [],
                                    marks: []
                                },
                                {
                                    type: 'text',
                                    text: 'background color',
                                    attrs: {},
                                    children: [],
                                    marks: [
                                        {
                                            type: 'textStyle',
                                            attrs: {
                                                color: null,
                                                backgroundColor: '#fff3cd',
                                                fontFamily: null,
                                                fontSize: null
                                            }
                                        }
                                    ]
                                },
                                {
                                    type: 'text',
                                    text: '.',
                                    attrs: {},
                                    children: [],
                                    marks: []
                                }
                            ],
                            marks: []
                        }
                    ],
                    marks: []
                }
            ],
            marks: []
        }
    ],
    marks: []
} as any;
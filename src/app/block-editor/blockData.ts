import { BlockModel, BlockType, ContentType } from "@syncfusion/ej2-angular-blockeditor"

export let blockDataAPI: BlockModel[] = [
    {
        id: 'heading-block',
        type: BlockType.Heading1,
        content: [{ 
            id: 'heading-content',
            type: ContentType.Text,
            content: 'Block Editor API Demo'
        }]
    },
    {
        id: 'intro-block',
        type: BlockType.Paragraph,
        content: [{ 
            id: 'intro-content',
            type: ContentType.Text,
            content: 'The Block Editor enables users to create, format, and organize content using various block types.'
        }]
    },
    {
        id: 'api-heading',
        type: BlockType.Heading2,
        content: [{ 
            id: 'api-heading-content',
            type: ContentType.Text,
            content: 'API Features:'
        }]
    },
    {
        id: 'api-list-1',
        type: BlockType.BulletList,
        content: [{ 
            id: 'api-list-1-content',
            type: ContentType.Text,
            content: 'readOnly - allows to change it as a non-editable state.'
        }]
    },
    {
        id: 'api-list-2',
        type: BlockType.BulletList,
        content: [{ 
            id: 'api-list-2-content',
            type: ContentType.Text,
            content: 'enableDragAndDrop - allows to control drag-and-drop operations within the block editor.'
        }]
    },
    {
        id: 'api-list-3',
        type: BlockType.BulletList,
        content: [{ 
            id: 'api-list-3-content',
            type: ContentType.Text,
            content: 'enableHtmlEncode - Get the encoded string value through value property and source code panel.'
        }]
    },
    {
        id: 'api-list-4',
        type: BlockType.BulletList,
        content: [{ 
            id: 'api-list-4-content',
            type: ContentType.Text,
            content: 'selectAllBlocks - Selects all blocks in the editor.'
        }]
    },
    {
        id: 'api-list-5',
        type: BlockType.BulletList,
        content: [{ 
            id: 'api-list-5-content',
            type: ContentType.Text,
            content: 'focusIn - Focuses the editor.'
        }]
    },
    {
        id: 'api-list-6',
        type: BlockType.BulletList,
        content: [{ 
            id: 'api-list-6-content',
            type: ContentType.Text,
            content: 'focusOut - Removes focus from the editor.'
        }]
    },
    {
        id: 'api-list-7',
        type: BlockType.BulletList,
        content: [{ 
            id: 'api-list-7-content',
            type: ContentType.Text,
            content: 'getBlockCount - Gets total block count.'
        }]
    },
    {
        id: 'api-list-8',
        type: BlockType.BulletList,
        content: [{ 
            id: 'api-list-8-content',
            type: ContentType.Text,
            content: 'getDataAsJson - Retrieves data from the editor as JSON.'
        }]
    },
    {
        id: 'api-list-9',
        type: BlockType.BulletList,
        content: [{ 
            id: 'api-list-8-content',
            type: ContentType.Text,
            content: 'getDataAsHtml - Retrieves data from the editor as HTML.'
        }]
    },
    {
        id: 'try-it-block',
        type: BlockType.Paragraph,
        content: [{ 
            id: 'try-it-content',
            type: ContentType.Text,
            content: 'Try it out! Use the property panel on the right to interact with the API.',
            styles: {
                bold: true,
                bgColor: '#999999'
            }
        }]
    }
];

export let blockDataOverview: BlockModel[] = [
    {
        id: 'heading-block',
        type: BlockType.Heading1,
        content: [{ 
            id: 'heading-content',
            type: ContentType.Text,
            content: 'Welcome to the Block Editor Demo!'
        }]
    },
    {
        id: 'intro-block',
        type: BlockType.Paragraph,
        content: [{ 
            id: 'intro-content',
            type: ContentType.Text,
            content: 'Block Editor is a powerful rich text editor that allows you to create structured content using blocks. Each block can be formatted, moved, or transformed into different types.',
        }]
    },
    {
        id: 'styled-paragraph',
        type: BlockType.Paragraph,
        content: [
            { 
                id: 'styled-text-1',
                type: ContentType.Text,
                content: 'Try selecting text to see '
            },
            {
                id: 'styled-text-2',
                type: ContentType.Text,
                content: 'formatting options',
                styles: {
                    bold: true,
                    italic: true
                }
            },
            {
                id: 'styled-text-3',
                type: ContentType.Text,
                content: ' or type '
            },
            {
                id: 'styled-text-4',
                type: ContentType.Text,
                content: '"/"',
                styles: {
                    bgColor: '#999999',
                    bold: true
                }
            },
            {
                id: 'styled-text-5',
                type: ContentType.Text,
                content: ' to access the command menu.'
            }
        ]
    },
    {
        id: 'block-types-heading',
        type: BlockType.Heading2,
        content: [{ 
            id: 'block-types-heading-content',
            type: ContentType.Text,
            content: 'Block Types'
        }]
    },
    {
        id: 'quote-block',
        type: BlockType.Quote,
        content: [{ 
            id: 'quote-content',
            type: ContentType.Text,
            content: 'The Block Editor makes document creation a seamless experience with its intuitive block-based approach.',
            styles: {
                italic: true
            }
        }]
    },
    {
        id: 'callout-block',
        type: BlockType.Callout,
        children: [{ 
            id: 'callout-content',
            type: BlockType.Paragraph,
            content: [{
                id: 'callout-content-1',
                type: ContentType.Text,
                content: 'Important: Block Editor supports various content types including Text, Link, Code, Mention, and Label.',
                styles: {
                    bold: true
                }
            }]
        }]
    },
    {
        id: 'list-types-heading',
        type: BlockType.Heading3,
        content: [{ 
            id: 'list-types-heading-content',
            type: ContentType.Text,
            content: 'List Types'
        }]
    },
    {
        id: 'bullet-list-header',
        type: BlockType.BulletList,
        content: [{ 
            id: 'bullet-list-header-content',
            type: ContentType.Text,
            content: 'Text blocks: Paragraph, Heading 1-4, Quote, Callout',
            styles: {
                bold: true
            }
        }]
    },
    {
        id: 'numbered-list',
        type: BlockType.NumberedList,
        content: [{ 
            id: 'numbered-list-content',
            type: ContentType.Text,
            content: 'Lists: Bullet lists, Numbered lists, Check lists'
        }]
    },
    {
        id: 'check-list',
        type: BlockType.CheckList,
        isChecked: true,
        content: [{ 
            id: 'check-list-content',
            type: ContentType.Text,
            content: 'Special blocks: Divider, Toggle, Code block'
        }]
    },
    {
        id: 'divider-block',
        type: BlockType.Divider,
        content: []
    },
    {
        id: 'toggle-block',
        type: BlockType.ToggleParagraph,
        isExpanded: true,
        content: [{ 
            id: 'toggle-content',
            type: ContentType.Text,
            content: 'Click me to expand/collapse'
        }],
        children: [
            {
                id: 'toggle-child',
                type: BlockType.Paragraph,
                content: [{ 
                    id: 'toggle-child-content',
                    type: ContentType.Text,
                    content: 'This content is inside a toggle block. Toggle blocks are useful for organizing content that can be expanded or collapsed.',
                }]
            }
        ]
    },
    {
        id: 'code-block',
        type: BlockType.Code,
        content: [{ 
            id: 'code-content',
            type: ContentType.Text,
            content: 'const editor = new BlockEditor();\neditor.appendTo("#element");'
        }]
    },
    {
        id: 'formatting-heading',
        type: BlockType.Heading4,
        content: [{ 
            id: 'formatting-heading-content',
            type: ContentType.Text,
            content: 'Text Formatting Examples'
        }]
    },
    {
        id: 'formatting-examples',
        type: BlockType.Paragraph,
        content: [
            { 
                id: 'format-bold',
                type: ContentType.Text,
                content: 'Bold ',
                styles: {
                    bold: true
                }
            },
            { 
                id: 'format-italic',
                type: ContentType.Text,
                content: 'Italic ',
                styles: {
                    italic: true
                }
            },
            { 
                id: 'format-underline',
                type: ContentType.Text,
                content: 'Underline ',
                styles: {
                    underline: true
                }
            },
            { 
                id: 'format-strikethrough',
                type: ContentType.Text,
                content: 'Strikethrough ',
                styles: {
                    strikethrough: true
                }
            },
            { 
                id: 'format-superscript',
                type: ContentType.Text,
                content: 'Superscript ',
                styles: {
                    superscript: true
                }
            },
            { 
                id: 'format-subscript',
                type: ContentType.Text,
                content: 'Subscript ',
                styles: {
                    subscript: true
                }
            },
            { 
                id: 'format-uppercase',
                type: ContentType.Text,
                content: 'uppercase ',
                styles: {
                    uppercase: true
                }
            },
            { 
                id: 'format-lowercase',
                type: ContentType.Text,
                content: 'LOWERCASE',
                styles: {
                    lowercase: true
                }
            }
        ]
    },
    {
        id: 'link-block',
        type: BlockType.Paragraph,
        content: [
            { 
                id: 'link-text',
                type: ContentType.Text,
                content: 'Visit '
            },
            { 
                id: 'link-content',
                type: ContentType.Link,
                content: 'Syncfusion',
                linkSettings: {
                    url: 'https://www.syncfusion.com/',
                    openInNewWindow: true
                }
            },
            { 
                id: 'link-text-end',
                type: ContentType.Text,
                content: ' for more information.'
            }
        ]
    },
    {
        id: 'label-block',
        type: BlockType.Paragraph,
        content: [
            { 
                id: 'label-text',
                type: ContentType.Text,
                content: 'This block contains a '
            },
            { 
                id: 'progress',
                type: ContentType.Label
            },
            { 
                id: 'label-text-end',
                type: ContentType.Text,
                content: ' label.'
            }
        ]
    },
    {
        id: 'try-it-block',
        type: BlockType.Paragraph,
        content: [{ 
            id: 'try-it-content',
            type: ContentType.Text,
            content: 'Try it out! Click anywhere and start typing, or type "/" to see available commands.',
            styles: {
                bold: true,
                bgColor: '#999999'
            }
        }]
    }
]

export let blockDataEvents: BlockModel[] = [
    {
        id: 'heading-block',
        type: BlockType.Heading1,
        content: [{ 
            id: 'heading-content',
            type: ContentType.Text,
            content: 'Block Editor Events Demo'
        }]
    },
    {
        id: 'intro-block',
        type: BlockType.Paragraph,
        content: [{ 
            id: 'intro-content',
            type: ContentType.Text,
            content: 'This sample demonstrates the events triggered by the Block Editor component. Try different actions to see the events in the trace panel.'
        }]
    },
    {
        id: 'features-heading',
        type: BlockType.Heading2,
        content: [{ 
            id: 'features-heading-content',
            type: ContentType.Text,
            content: 'Notable Features:'
        }]
    },
    {
        id: 'feature-list-1',
        type: BlockType.BulletList,
        content: [{ 
            id: 'feature-list-1-content',
            type: ContentType.Text,
            content: 'Block-based editing with various block types (paragraphs, headings, lists, etc.)'
        }]
    },
    {
        id: 'feature-list-2',
        type: BlockType.BulletList,
        content: [{ 
            id: 'feature-list-2-content',
            type: ContentType.Text,
            content: 'Slash commands for quick block transformation'
        }]
    },
    {
        id: 'feature-list-3',
        type: BlockType.BulletList,
        content: [{ 
            id: 'feature-list-3-content',
            type: ContentType.Text,
            content: 'Rich text formatting with inline toolbar'
        }]
    },
    {
        id: 'feature-list-4',
        type: BlockType.BulletList,
        content: [{ 
            id: 'feature-list-4-content',
            type: ContentType.Text,
            content: 'Hierarchical content organization with nested blocks'
        }]
    },
    {
        id: 'feature-list-5',
        type: BlockType.BulletList,
        content: [{ 
            id: 'feature-list-5-content',
            type: ContentType.Text,
            content: 'Block manipulation (move, delete, duplicate)'
        }]
    },
    {
        id: 'feature-list-6',
        type: BlockType.BulletList,
        content: [{ 
            id: 'feature-list-6-content',
            type: ContentType.Text,
            content: 'Keyboard shortcuts for efficient editing'
        }]
    },
    {
        id: 'feature-list-7',
        type: BlockType.BulletList,
        content: [{ 
            id: 'feature-list-7-content',
            type: ContentType.Text,
            content: 'Drag and drop functionality for blocks'
        }]
    },
    {
        id: 'try-it-block',
        type: BlockType.Paragraph,
        content: [{ 
            id: 'try-it-content',
            type: ContentType.Text,
            content: 'Try different actions like typing, selecting text, adding blocks, or moving blocks to see the events triggered.',
            styles: {
                bold: true,
                bgColor: '#999999'
            }
        }]
    }
]

import { ItemModel, MenuItemModel } from "@syncfusion/ej2-angular-navigations";

export let data = [
    { id: "1", Label: "Business Planning", parentId: "", branch: "Root", fill: "#D0ECFF", hasChild: true, level: 0, strokeColor: "#D0ECFF", orientation: "Root" },
    { id: "2", Label: "Expectation", parentId: "1", branch: "Left", fill: "#C4F2E8", hasChild: true, level: 1, strokeColor: "#C4F2E8", orientation: "Left" },
    { id: "3", Label: "Requirements", parentId: "1", branch: "Right", fill: "#F7E0B3", hasChild: true, level: 1, strokeColor: "#F7E0B3", orientation: "Right" },
    { id: "4", Label: "Marketing", parentId: "1", branch: "Left", fill: "#E5FEE4", hasChild: true, level: 1, strokeColor: "#E5FEE4", orientation: "Left" },
    { id: "5", Label: "Budgets", parentId: "1", branch: "Right", fill: "#E9D4F1", hasChild: true, level: 1, strokeColor: "#E9D4F1", orientation: "Right" },
    { id: "6", Label: "Situation in Market", parentId: "1", branch: "Left", fill: "#90C8C2", hasChild: true, level: 1, strokeColor: "#90C8C2", orientation: "Left" },
    { id: "7", Label: "Product Sales", parentId: "2", branch: "SubLeft", fill: "#C4F2E8", hasChild: false, level: 2, strokeColor: "#C4F2E8", orientation: "SubLeft" },
    { id: "8", Label: "Strategy", parentId: "2", branch: "SubLeft", fill: "#C4F2E8", hasChild: false, level: 2, strokeColor: "#C4F2E8", orientation: "SubLeft" },
    { id: "9", Label: "Contacts", parentId: "2", branch: "SubLeft", fill: "#C4F2E8", hasChild: false, level: 2, strokeColor: "#C4F2E8", orientation: "SubLeft" },
    { id: "10", Label: "Customer Groups", parentId: "4", branch: "SubLeft", fill: "#E5FEE4", hasChild: false, level: 2, strokeColor: "#E5FEE4", orientation: "SubLeft" },
    { id: "11", Label: "Branding", parentId: "4", branch: "SubLeft", fill: "#E5FEE4", hasChild: false, level: 2, strokeColor: "#E5FEE4", orientation: "SubLeft" },
    { id: "12", Label: "Advertising", parentId: "4", branch: "SubLeft", fill: "#E5FEE4", hasChild: false, level: 2, strokeColor: "#E5FEE4", orientation: "SubLeft" },
    { id: "13", Label: "Competitors", parentId: "6", branch: "SubLeft", fill: "#90C8C2", hasChild: false, level: 2, strokeColor: "#90C8C2", orientation: "SubLeft" },
    { id: "14", Label: "Location", parentId: "6", branch: "SubLeft", fill: "#90C8C2", hasChild: false, level: 2, strokeColor: "#90C8C2", orientation: "SubLeft" },
    { id: "15", Label: "Director", parentId: "3", branch: "SubRight", fill: "#F7E0B3", hasChild: false, level: 2, strokeColor: "#F7E0B3", orientation: "SubRight" },
    { id: "16", Label: "Accounts Department", parentId: "3", branch: "SubRight", fill: "#F7E0B3", hasChild: false, level: 2, strokeColor: "#F7E0B3", orientation: "SubRight" },
    { id: "17", Label: "Administration", parentId: "3", branch: "SubRight", fill: "#F7E0B3", hasChild: false, level: 2, strokeColor: "#F7E0B3", orientation: "SubRight" },
    { id: "18", Label: "Development", parentId: "3", branch: "SubRight", fill: "#F7E0B3", hasChild: false, level: 2, strokeColor: "#F7E0B3", orientation: "SubRight" },
    { id: "19", Label: "Estimation", parentId: "5", branch: "SubRight", fill: "#E9D4F1", hasChild: false, level: 2, strokeColor: "#E9D4F1", orientation: "SubRight" },
    { id: "20", Label: "Profit", parentId: "5", branch: "SubRight", fill: "#E9D4F1", hasChild: false, level: 2, strokeColor: "#E9D4F1", orientation: "SubRight" },
    { id: "21", Label: "Funds", parentId: "5", branch: "SubRight", fill: "#E9D4F1", hasChild: false, level: 2, strokeColor: "#E9D4F1", orientation: "SubRight" }
  ];

  export let zoomMenuItems: ItemModel[] = [
    { text: 'Zoom In' }, { text: 'Zoom Out' }, { text: 'Zoom to Fit' }, { text: 'Zoom to 50%' },
    { text: 'Zoom to 100%' }, { text: 'Zoom to 200%' },
  ];
  // Menu items definition
  export let menuItems: MenuItemModel[] = [
    {
      text: 'File',
      items: [
        { text: 'New', iconCss: 'e-icons e-circle-add' }, { separator: true }, { text: 'Open', iconCss: 'e-icons e-folder-open' },
        { text: 'Save', iconCss: 'e-icons e-save' },
        {
          text: 'Export', iconCss: 'e-export e-icons', items: [
            { text: 'JPG' }, { text: 'PNG' }, { text: 'SVG' }
          ]
        },
        { text: 'Print', iconCss: 'e-print e-icons' }
      ]
    },
    {
      text: 'Edit',
      items: [
        { text: 'Undo', iconCss: 'e-icons e-undo' }, { text: 'Redo', iconCss: 'e-icons e-redo' }, { separator: true },
        { text: 'Cut', iconCss: 'e-cut e-icons' }, { text: 'Copy', iconCss: 'e-copy e-icons' },
        { text: 'Paste', iconCss: 'e-icons e-paste' }, { text: 'Delete', iconCss: 'e-trash e-icons' }, { separator: true },
        { text: 'Select All', iconCss: 'e-icons e-select-all' },
      ]
    },
    {
      text: 'View',
      items: [
        { text: 'Zoom In', iconCss: 'e-zoom-in e-icons' }, { text: 'Zoom Out', iconCss: 'e-zoom-out e-icons' }, { separator: true },
        { text: 'Fit To Screen', iconCss: 'e-icons e-zoom-to-fit' }, { separator: true },
        { text: 'Show Rulers', iconCss: 'e-icons e-check' },
        { text: 'Show Lines', iconCss: 'e-icons e-check' },
      ]
    },
    {
      text: 'Window',
      items: [
        { text: 'Show Toolbar', iconCss: 'e-icons e-check' },
        { text: 'Show Shortcuts', iconCss: '' },
      ]
    },
  ];
import { Diagram, DiagramComponent } from "@syncfusion/ej2-angular-diagrams";
import { getAzureChatAIRequest } from '../../azure-openai';

let workingData = [
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

export async function convertTextToMindMap(inputText: string, diagram: Diagram) {
    showLoading();
    const options = {
        messages: [
            {
                role: 'system',
                content: 'You are an assistant tasked with generating mermaid mindmap diagram data source based on user queries with space indentation'
            },
            {
                role: 'user',
                content: `Generate only the Mermaid mindmap code for the subject titled "${inputText}".
            Use the format provided in the example below, but adjust the steps, shapes, and indentation according to the new title:
            
            **Example Title:** Organizational Research
            
            **Example Steps and Mermaid Code:**
  
                mindmap
                root(Mobile Banking Registration)
                    User(User)
                    PersonalInfo(Personal Information)
                        Name(Name)
                        DOB(Date of Birth)
                        Address(Address)
                    ContactInfo))Contact Information((
                        Email(Email)
                        Phone(Phone Number)
                    Account[Account]
                        AccountType[Account Type]
                            Savings[Savings]
                            Checking[Checking]
                        AccountDetails(Account Details)
                            AccountNumber(Account Number)
                            SortCode(Sort Code)
                    Security{{Security}}
                        Authentication(Authentication)
                            Password(Password)
                            Biometrics(Biometrics)
                            Fingerprint(Fingerprint)
                            FaceID(Face ID)
                        Verification)Verification(
                            OTP)OTP(
                            SecurityQuestions)Security Questions(
                    Terms(Terms & Conditions)
                        AcceptTerms(Accept Terms)
                        PrivacyPolicy(Privacy Policy)
  
            
            
            Note: Please ensure the generated code matches the title "${inputText}" and follows the format given above. Provide only the Mermaid mindmap code, without any additional explanations, comments, or text.
            `


            }
        ],
    }

    try {
        const jsonResponse = await getAzureChatAIRequest(options);
        diagram.loadDiagramFromMermaid(jsonResponse as string);
        diagram.clearHistory();
        pushWorkingData(diagram as DiagramComponent);
        (document.getElementById('toolbarEditor') as any).ej2_instances[0].items[0].disabled = true;
        hideLoading();

    } catch (error) {
        console.error('Error:', error);
        convertTextToMindMap(inputText, diagram);

    }
};

function pushWorkingData(diagram: DiagramComponent) {
    workingData = [];
    for (let i = 0; i < diagram.nodes.length; i++) {
        let node: any = diagram.nodes[i];
        let nodeData: any = {
            id: node.id,
            Label: node.annotations ? node.annotations[0].content : 'Node',
            fill: node!.style.fill,
            branch: node.addInfo.orientation,
            strokeColor: node.style.strokeColor,
            parentId: node.data.parentId,
            level: node.addInfo.level,
            orientation: node.addInfo!.orientation,
            hasChild: false,
        };
        workingData.push(nodeData);
    }
    // Create a Set of parentIds to quickly check which ids have children
    const parentIds = new Set(workingData.map(item => item.parentId).filter(id => id !== null));

    // Iterate over the data array and set hasChild to true if id is in parentIds
    workingData.forEach(item => {
        if (parentIds.has(item.id)) {
            item.hasChild = true;
        }
    });
}

// Function to show loading indicator
function showLoading() {
    (document.getElementById('loadingContainer') as HTMLInputElement).style.display = 'block';
}

// Function to hide loading indicator
function hideLoading() {
    (document.getElementById('loadingContainer') as HTMLInputElement).style.display = 'none';
}
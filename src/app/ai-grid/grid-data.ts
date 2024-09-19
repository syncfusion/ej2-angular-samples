export interface MachineData {
    MachineID: string;
    Temperature: number;
    Pressure: number;
    Voltage: number;
    MotorSpeed: number;
    ProductionRate: number;
    AnomalyDescription?: string;
};

let description: string = "The factors that supporting the Production rate is relevant to the count produced, hence the row data is marked as normal data.";

export let machineDataList: MachineData[] = [
    {
        MachineID: "M001",
        Temperature: 85,
        Pressure: 120,
        Voltage: 220,
        MotorSpeed: 1500,
        ProductionRate: 100,
        AnomalyDescription: description,
    },
    {
        MachineID: "M002",
        Temperature: 788,
        Pressure: 115,
        Voltage: 230,
        MotorSpeed: 1520,
        ProductionRate: 105,
        AnomalyDescription: description,
    },
    {
        MachineID: "M003",
        Temperature: 90,
        Pressure: 118,
        Voltage: 225,
        MotorSpeed: 1480,
        ProductionRate: 95,
        AnomalyDescription: description,
    },
    {
        MachineID: "M004",
        Temperature: 87,
        Pressure: 122,
        Voltage: 228,
        MotorSpeed: 1515,
        ProductionRate: 110,
        AnomalyDescription: description,
    },
    {
        MachineID: "M005",
        Temperature: 92,
        Pressure: 116,
        Voltage: 222,
        MotorSpeed: 21475,
        ProductionRate: 980,
        AnomalyDescription: description,
    },
    {
        MachineID: "M006",
        Temperature: 85,
        Pressure: 119,
        Voltage: 220,
        MotorSpeed: 1490,
        ProductionRate: 102,
        AnomalyDescription: description,
    },
    {
        MachineID: "M007",
        Temperature: 88,
        Pressure: 114,
        Voltage: 230,
        MotorSpeed: 1500,
        ProductionRate: 104,
        AnomalyDescription: description,
    },
    {
        MachineID: "M008",
        Temperature: 90,
        Pressure: 1120,
        Voltage: 225,
        MotorSpeed: 1470,
        ProductionRate: 89,
        AnomalyDescription: description,
    },
    {
        MachineID: "M009",
        Temperature: 87,
        Pressure: 121,
        Voltage: 228,
        MotorSpeed: 1505,
        ProductionRate: 108,
        AnomalyDescription: description,
    },
    {
        MachineID: "M010",
        Temperature: 92,
        Pressure: 117,
        Voltage: 222,
        MotorSpeed: 1480,
        ProductionRate: 100,
        AnomalyDescription: description,
    }
];

export interface predictive {
    StudentID: number;
    StudentName: string;
    FirstYearGPA: number;
    SecondYearGPA: number;
    ThirdYearGPA: number;
    FinalYearGPA?: number;
    TotalGPA?: number;
    TotalGrade?: string;
};

export let predictiveData: predictive[] = [
    { StudentID: 512001, StudentName: "John Smith", FirstYearGPA: 4.7, SecondYearGPA: 4.1, ThirdYearGPA: 5.0 },
    { StudentID: 512002, StudentName: "Emily Davis", FirstYearGPA: 3.3, SecondYearGPA: 3.5, ThirdYearGPA: 3.7 },
    { StudentID: 512003, StudentName: "Micheal Lee", FirstYearGPA: 3.9, SecondYearGPA: 3.8, ThirdYearGPA: 3.9 },
    { StudentID: 512004, StudentName: "Sarah Brown", FirstYearGPA: 2.0, SecondYearGPA: 2.7, ThirdYearGPA: 2.5 },
    { StudentID: 512005, StudentName: "James Wilson", FirstYearGPA: 3.0, SecondYearGPA: 3.5, ThirdYearGPA: 3.2 },
    { StudentID: 512006, StudentName: "Sarah Jane", FirstYearGPA: 3.7, SecondYearGPA: 3.0, ThirdYearGPA: 4.3 },
    { StudentID: 512007, StudentName: "Emily Rose", FirstYearGPA: 5.0, SecondYearGPA: 4.9, ThirdYearGPA: 4.8 },
    { StudentID: 512008, StudentName: "John Michael", FirstYearGPA: 4.0, SecondYearGPA: 4.1, ThirdYearGPA: 4.2 },
    { StudentID: 512009, StudentName: "David James", FirstYearGPA: 1.5, SecondYearGPA: 2.2, ThirdYearGPA: 2.3 },
    { StudentID: 512010, StudentName: "Mary Ann", FirstYearGPA: 2.7, SecondYearGPA: 2.1, ThirdYearGPA: 3.0 },
];

export interface MedicalRecord {
    RecordID: number;
    PatientID: number;
    Symptoms: string;
    Diagnosis: string;
    DoctorDetails: string;
};

export let MedicalRecords: MedicalRecord[] = [
    { RecordID: 1, PatientID: 615001, Symptoms: "Fever, cough, and shortness of breath.", Diagnosis: "Pneumonia", DoctorDetails: "Dr. John Smith - Specialized in Pulmonology" },
    { RecordID: 2, PatientID: 615002, Symptoms: "Severe headache, nausea, and sensitivity to light.", Diagnosis: "Migraine", DoctorDetails: "Dr. Alice Brown - Specialized in Neurology" },
    { RecordID: 3, PatientID: 615003, Symptoms: "Fatigue, weight gain, and hair loss.", Diagnosis: "Hypothyroidism", DoctorDetails: "Dr. Robert Johnson - Specialized in Endocrinology" },
    { RecordID: 4, PatientID: 615004, Symptoms: "Chest pain, shortness of breath, and sweating.", Diagnosis: "Heart Attack", DoctorDetails: "Dr. Michael Williams - Specialized in Cardiology" },
    { RecordID: 5, PatientID: 615005, Symptoms: "Joint pain, stiffness, and swelling.", Diagnosis: "Arthritis", DoctorDetails: "Dr. Mary Jones - Specialized in Rheumatology" },
    { RecordID: 6, PatientID: 615006, Symptoms: "Abdominal pain, bloating, and irregular bowel movements.", Diagnosis: "Irritable Bowel Syndrome (IBS)", DoctorDetails: "Dr. Patricia Garcia - Specialized in Gastroenterology" },
    { RecordID: 7, PatientID: 615007, Symptoms: "Frequent urination, excessive thirst, and unexplained weight loss.", Diagnosis: "Diabetes", DoctorDetails: "Dr. Robert Johnson - Specialized in Endocrinology" },
    { RecordID: 8, PatientID: 615008, Symptoms: "Persistent sadness, loss of interest, and fatigue.", Diagnosis: "Depression", DoctorDetails: "Dr. Linda Martinez - Specialized in Psychiatry" },
    { RecordID: 9, PatientID: 615009, Symptoms: "Shortness of breath, wheezing, and chronic cough.", Diagnosis: "Asthma", DoctorDetails: "Dr. John Smith - Specialized in Pulmonology" },
    { RecordID: 10, PatientID: 615010, Symptoms: "High blood pressure, headaches, and blurred vision.", Diagnosis: "Hypertension", DoctorDetails: "Dr. Michael Williams - Specialized in Cardiology" }
];
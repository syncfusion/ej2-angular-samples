import { Schema } from "@syncfusion/ej2-angular-form-renderer";

export const customerService: Schema = {
  "version": "0.1.0",
  "properties": {
    "html": {
      "id": "staticHtml_1780380000000_101",
      "name": "staticHtml_101",
      "type": "string",
      "label": "HTML",
      "defaultValue": "<div class=\"form-title\"><h1>Customer Service</h1><p>Here to Help, Every Step of the Way</p></div>",
      "widget": "staticHtml"
    },
    "phoneNumber": {
      "id": "textbox_1780380000003_404",
      "name": "phone",
      "type": "string",
      "label": "Phone Number",
      "textboxType": "number",
      "required": true,
      "widget": "textbox",
      "labelPosition": "top",
      "size": "Bigger",
      "placeholder": "Enter your phone number"
    },
    "customerName": {
      "id": "textbox_1780380000001_202",
      "name": "customerName",
      "type": "string",
      "label": "Customer Name",
      "textboxType": "text",
      "required": true,
      "widget": "textbox",
      "labelPosition": "top",
      "size": "Bigger",
      "placeholder": "Enter your full name"
    },
    "emailAddress": {
      "id": "textbox_1780380000002_303",
      "name": "email",
      "type": "string",
      "label": "Email Address",
      "textboxType": "email",
      "widget": "textbox",
      "labelPosition": "top",
      "size": "Bigger",
      "placeholder": "Enter your email",
      "customValidation": [
        {
          "expression": "valid = (input && /^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$/.test(input)) ? true : 'Please enter a valid email address'"
        }
      ]
    },
    "category": {
      "id": "dropdown_1784806977213_757",
      "name": "category",
      "type": "string",
      "label": "Category",
      "required": true,
      "options": [
        "Bug",
        "Configuration",
        "Performance",
        "Access Issue",
        "Invoice",
        "Payment Failure",
        "Refund",
        "Subscription",
        "New Feature",
        "Enhancement",
        "Integration",
        "Product Information",
        "Pricing",
        "Documentation"
      ],
      "widget": "dropdown",
      "conditions": {
        "disabledWhen": {
          "condition": "and",
          "rules": [
            {
              "label": "Request Type",
              "field": "dropdown_1784806488933_725",
              "operator": "isempty",
              "type": "string",
              "value": null
            }
          ]
        },
        "choiceBasedField": {
          "primaryFieldId": "dropdown_1784806488933_725",
          "choiceMapping": {
            "Technical Support": [
              "Bug",
              "Configuration",
              "Performance",
              "Access Issue"
            ],
            "Billing": [
              "Invoice",
              "Payment Failure",
              "Refund",
              "Subscription"
            ],
            "General Inquiry": [
              "Product Information",
              "Pricing",
              "Documentation"
            ],
            "Feature Request": [
              "New Feature",
              "Enhancement",
              "Integration"
            ]
          },
          "showAllWhenNotMapped": false
        }
      },
      "size": "Bigger",
      "placeholder": "Enter the category",
      "labelPosition": "top"
    },
    "requestType": {
      "id": "dropdown_1784806488933_725",
      "name": "requestType",
      "type": "string",
      "label": "Request Type",
      "required": true,
      "options": [
        "Technical Support",
        "Billing",
        "General Inquiry",
        "Feature Request"
      ],
      "widget": "dropdown",
      "size": "Bigger",
      "placeholder": "Enter the request type",
      "labelPosition": "top"
    },
    "description": {
      "id": "textarea_1784807274610_757",
      "name": "description",
      "type": "string",
      "label": "Description",
      "required": true,
      "widget": "textarea",
      "size": "Bigger",
      "placeholder": "Enter the description"
    },
    "priority": {
      "id": "dropdown_1784807350904_540",
      "name": "priority",
      "type": "string",
      "label": "Priority",
      "required": true,
      "options": [
        "Low",
        "Medium",
        "High",
        "Critical"
      ],
      "widget": "dropdown",
      "size": "Bigger",
      "placeholder": "Enter the priority of the issue"
    },
    "submitRequest": {
      "id": "submit_button_initial",
      "name": "",
      "type": "button",
      "label": "Submit Request",
      "buttonType": "submit",
      "widget": "button",
      "size": "Bigger",
      "style": "primary",
      "position": "center"
    }
  },
  "layout": [
    {
      "type": "field",
      "propertyId": "html"
    },
    {
      "type": "panel",
      "id": "panel_1780381000000_001",
      "name": "panel_001",
      "label": "Your Information",
      "children": [
        {
          "type": "table",
          "id": "table_1784805969209_126",
          "name": "table_31",
          "label": "Table",
          "hideBorders": true,
          "rows": 1,
          "cols": 2,
          "cells": [
            [
              {
                "row": 0,
                "col": 0,
                "children": [
                  {
                    "type": "field",
                    "propertyId": "customerName"
                  }
                ]
              },
              {
                "row": 0,
                "col": 1,
                "children": [
                  {
                    "type": "field",
                    "propertyId": "phoneNumber"
                  }
                ]
              }
            ]
          ]
        },
        {
          "type": "field",
          "propertyId": "emailAddress"
        }
      ]
    },
    {
      "type": "panel",
      "id": "panel_1780381000002_002",
      "name": "panel_002",
      "label": "Request Details",
      "children": [
        {
          "type": "table",
          "id": "table_1780381000003_303",
          "name": "table_303",
          "label": "Table",
          "hideBorders": true,
          "rows": 1,
          "cols": 2,
          "cells": [
            [
              {
                "row": 0,
                "col": 0,
                "children": [
                  {
                    "type": "field",
                    "propertyId": "requestType"
                  }
                ]
              },
              {
                "row": 0,
                "col": 1,
                "children": [
                  {
                    "type": "field",
                    "propertyId": "category"
                  }
                ]
              }
            ]
          ]
        },
        {
          "type": "field",
          "propertyId": "description"
        },
        {
          "type": "field",
          "propertyId": "priority"
        }
      ]
    },
    {
      "type": "field",
      "propertyId": "submitRequest"
    }
  ],
  "settings": {
    "name": "Customer Feedback Form",
    "width": "700px",
    "size": "Bigger"
  }
};

export const userRegistration: Schema = {
  "version": "0.1.0",
  "properties": {
    "html": {
      "id": "staticHtml_1779366656553_385",
      "name": "staticHtml_553",
      "type": "string",
      "label": "HTML",
      "defaultValue": "<div class=\"form-title\"><h1>Registration Form</h1></div><hr>",
      "widget": "staticHtml",
      "size": "Bigger"
    },
    "lastName": {
      "id": "textbox_1778743492061_220",
      "name": "textbox_267",
      "type": "string",
      "label": "Last Name",
      "textboxType": "text",
      "required": true,
      "widget": "textbox",
      "labelPosition": "top",
      "autocomplete": true,
      "size": "Bigger"
    },
    "firstName": {
      "id": "textbox_1778743347128_521",
      "name": "textbox_624",
      "type": "string",
      "label": "First Name",
      "textboxType": "text",
      "required": true,
      "widget": "textbox",
      "labelPosition": "top",
      "autocomplete": true,
      "size": "Bigger"
    },
    "phoneNumber": {
      "id": "textbox_1778743694408_294",
      "name": "textbox_604",
      "type": "string",
      "label": "Phone Number",
      "textboxType": "number",
      "required": true,
      "widget": "textbox",
      "labelPosition": "top",
      "autocomplete": true,
      "size": "Bigger"
    },
    "userName": {
      "id": "textbox_1778743622010_848",
      "name": "textbox_684",
      "type": "string",
      "label": "User Name",
      "textboxType": "text",
      "required": true,
      "widget": "textbox",
      "labelPosition": "top",
      "autocomplete": true,
      "size": "Bigger"
    },
    "confirmPassword": {
      "id": "textbox_1778744420029_685",
      "name": "textbox_29",
      "type": "string",
      "label": "Confirm Password",
      "textboxType": "password",
      "required": true,
      "widget": "textbox",
      "labelPosition": "top",
      "size": "Bigger",
      "customValidation": [
        {
          "expression": "valid = (input === {textbox_715}) ? true : 'Confirm password should match password'"
        }
      ]
    },
    "password": {
      "id": "textbox_1778744397712_334",
      "name": "textbox_715",
      "type": "string",
      "label": "Password",
      "textboxType": "password",
      "required": true,
      "minLength": 8,
      "widget": "textbox",
      "labelPosition": "top",
      "size": "Bigger"
    },
    "iAgreeToTheTermsAndConditions": {
      "id": "checkbox_1779362732753_574",
      "name": "checkbox_867",
      "type": "boolean",
      "label": "I agree to the Terms and Conditions",
      "widget": "checkbox",
      "size": "Bigger"
    },
    "submit": {
      "id": "submit_button_initial",
      "name": "",
      "type": "button",
      "label": "Submit",
      "buttonType": "submit",
      "widget": "button",
      "size": "Bigger"
    }
  },
  "layout": [
    {
      "type": "field",
      "propertyId": "html"
    },
    {
      "type": "panel",
      "id": "panel_1779362566261_783",
      "name": "panel_384",
      "label": "Personal Information",
      "children": [
        {
          "type": "table",
          "id": "table_1779362611831_406",
          "name": "table_727",
          "label": "Table",
          "hideBorders": true,
          "rows": 1,
          "cols": 2,
          "cells": [
            [
              {
                "row": 0,
                "col": 0,
                "children": [
                  {
                    "type": "field",
                    "propertyId": "firstName"
                  }
                ]
              },
              {
                "row": 0,
                "col": 1,
                "children": [
                  {
                    "type": "field",
                    "propertyId": "lastName"
                  }
                ]
              }
            ]
          ]
        },
        {
          "type": "field",
          "propertyId": "phoneNumber"
        }
      ]
    },
    {
      "type": "panel",
      "id": "panel_1779362669605_403",
      "name": "panel_554",
      "label": "Account Details",
      "children": [
        {
          "type": "field",
          "propertyId": "userName"
        },
        {
          "type": "table",
          "id": "table_1779362720807_367",
          "name": "table_728",
          "label": "Table",
          "hideBorders": true,
          "rows": 1,
          "cols": 2,
          "cells": [
            [
              {
                "row": 0,
                "col": 0,
                "children": [
                  {
                    "type": "field",
                    "propertyId": "password"
                  }
                ]
              },
              {
                "row": 0,
                "col": 1,
                "children": [
                  {
                    "type": "field",
                    "propertyId": "confirmPassword"
                  }
                ]
              }
            ]
          ]
        },
        {
          "type": "field",
          "propertyId": "iAgreeToTheTermsAndConditions"
        }
      ]
    },
    {
      "type": "field",
      "propertyId": "submit"
    }
  ],
  "settings": {
    "name": "Registration Form",
    "width": "700px"
  }
};

export const doctorsAppointment: any = {
  "version": "0.1.0",
  "properties": {
    "html": {
      "id": "staticHtml_1784808502326_789",
      "name": "staticHtml_134",
      "type": "string",
      "label": "HTML",
      "defaultValue": "<div class=\"form-title\"><h1>Doctor Appointment Booking</h1><p>Book your appointment quickly and conveniently with our healthcare specialists.</p></div><hr>",
      "widget": "staticHtml",
      "size": "Bigger"
    },
    "emailAddress": {
      "id": "textbox_emailAddress",
      "name": "emailAddress",
      "type": "string",
      "label": "Email Address",
      "textboxType": "email",
      "required": true,
      "widget": "textbox",
      "size": "Bigger"
    },
    "gender": {
      "id": "dropdown_gender",
      "name": "gender",
      "type": "string",
      "label": "Gender",
      "required": true,
      "options": [
        "Male",
        "Female",
        "Other"
      ],
      "widget": "dropdown",
      "size": "Bigger",
      "labelPosition": "top"
    },
    "age": {
      "id": "number_age",
      "name": "age",
      "type": "number",
      "label": "Age",
      "expressionValue": "AGE({dob})",
      "widget": "number",
      "readOnly": true,
      "size": "Bigger",
      "labelPosition": "top"
    },
    "patientName": {
      "id": "textbox_patientName",
      "name": "patientName",
      "type": "string",
      "label": "Patient Name",
      "textboxType": "text",
      "required": true,
      "widget": "textbox",
      "size": "Bigger",
      "labelPosition": "top"
    },
    "mobileNumber": {
      "id": "textbox_mobileNumber",
      "name": "mobileNumber",
      "type": "string",
      "label": "Mobile Number",
      "textboxType": "tel",
      "required": true,
      "widget": "textbox",
      "size": "Bigger",
      "labelPosition": "top"
    },
    "dateOfBirth": {
      "id": "date_dob",
      "name": "dob",
      "type": "string",
      "format": "date",
      "label": "Date of Birth",
      "required": true,
      "widget": "date",
      "size": "Bigger",
      "labelPosition": "top"
    },
    "doctor": {
      "id": "dropdown_doctor",
      "name": "doctor",
      "type": "string",
      "label": "Doctor",
      "required": true,
      "options": [
        "Dr. John Carter",
        "Dr. Emily Smith",
        "Dr. Sarah Wilson",
        "Dr. Michael Brown",
        "Dr. David Lee",
        "Dr. Lisa Thomas"
      ],
      "widget": "dropdown",
      "conditions": {
        "disabledWhen": {
          "condition": "and",
          "rules": [
            {
              "label": "Department",
              "field": "dropdown_department",
              "operator": "isempty",
              "type": "string",
              "value": null
            }
          ]
        },
        "choiceBasedField": {
          "primaryFieldId": "dropdown_department",
          "choiceMapping": {
            "Cardiology": [
              "Dr. John Carter",
              "Dr. Emily Smith"
            ],
            "Dermatology": [
              "Dr. Sarah Wilson",
              "Dr. Michael Brown"
            ],
            "Pediatrics": [
              "Dr. David Lee",
              "Dr. Lisa Thomas"
            ],
            "Orthopedics": [
              "Dr. Robert Taylor",
              "Dr. James Walker"
            ]
          },
          "showAllWhenNotMapped": false
        }
      },
      "size": "Bigger",
      "labelPosition": "top"
    },
    "appointmentTime": {
      "id": "dropdown_appointmentTime",
      "name": "appointmentTime",
      "type": "string",
      "label": "Appointment Time",
      "required": true,
      "options": [
        "09:00 AM",
        "10:00 AM",
        "11:00 AM",
        "02:00 PM",
        "03:00 PM",
        "04:00 PM"
      ],
      "widget": "dropdown",
      "size": "Bigger",
      "labelPosition": "top"
    },
    "department": {
      "id": "dropdown_department",
      "name": "department",
      "type": "string",
      "label": "Department",
      "required": true,
      "options": [
        "Cardiology",
        "Dermatology",
        "Pediatrics",
        "Orthopedics"
      ],
      "widget": "dropdown",
      "size": "Bigger",
      "labelPosition": "top"
    },
    "appointmentDate": {
      "id": "date_appointmentDate",
      "name": "appointmentDate",
      "type": "string",
      "format": "date",
      "label": "Appointment Date",
      "required": true,
      "widget": "date",
      "size": "Bigger",
      "labelPosition": "top"
    },
    "visitType": {
      "id": "radio_visitType",
      "name": "visitType",
      "type": "string",
      "label": "Visit Type",
      "required": true,
      "options": [
        "Consultation",
        "Follow-up",
        "Routine Checkup",
        "Emergency"
      ],
      "widget": "radio",
      "size": "Bigger",
      "labelPosition": "top"
    },
    "reasonForVisit": {
      "id": "textarea_reasonForVisit",
      "name": "reasonForVisit",
      "type": "string",
      "label": "Reason for Visit",
      "required": true,
      "widget": "textarea",
      "size": "Bigger"
    },
    "hasInsurance": {
      "id": "radio_hasInsurance",
      "name": "hasInsurance",
      "type": "string",
      "label": "Has Insurance",
      "options": [
        "Yes",
        "No"
      ],
      "widget": "radio",
      "size": "Bigger"
    },
    "insuranceProvider": {
      "id": "textbox_insuranceProvider",
      "name": "insuranceProvider",
      "type": "string",
      "label": "Insurance Provider",
      "required": true,
      "widget": "textbox",
      "size": "Bigger",
      "labelPosition": "top"
    },
    "policyNumber": {
      "id": "textbox_policyNumber",
      "name": "policyNumber",
      "type": "string",
      "label": "Policy Number",
      "required": true,
      "widget": "textbox",
      "size": "Bigger",
      "labelPosition": "top"
    },
    "bookAppointment": {
      "id": "submit_button",
      "name": "submit",
      "type": "button",
      "label": "Book Appointment",
      "buttonType": "submit",
      "widget": "button",
      "style": "primary",
      "size": "Bigger"
    }
  },
  "layout": [
    {
      "type": "field",
      "propertyId": "html"
    },
    {
      "type": "panel",
      "id": "panel_patient",
      "name": "patientInformation",
      "label": "Patient Information",
      "children": [
        {
          "type": "table",
          "id": "table_patient",
          "label": "Table",
          "hideBorders": true,
          "rows": 1,
          "cols": 2,
          "cells": [
            [
              {
                "row": 0,
                "col": 0,
                "children": [
                  {
                    "type": "field",
                    "propertyId": "patientName"
                  },
                  {
                    "type": "field",
                    "propertyId": "mobileNumber"
                  },
                  {
                    "type": "field",
                    "propertyId": "dateOfBirth"
                  }
                ]
              },
              {
                "row": 0,
                "col": 1,
                "children": [
                  {
                    "type": "field",
                    "propertyId": "emailAddress"
                  },
                  {
                    "type": "field",
                    "propertyId": "gender"
                  },
                  {
                    "type": "field",
                    "propertyId": "age"
                  }
                ]
              }
            ]
          ]
        }
      ]
    },
    {
      "type": "panel",
      "id": "panel_appointment",
      "name": "appointmentDetails",
      "label": "Appointment Details",
      "children": [
        {
          "type": "table",
          "id": "table_appointment",
          "label": "Table",
          "hideBorders": true,
          "rows": 1,
          "cols": 2,
          "cells": [
            [
              {
                "row": 0,
                "col": 0,
                "children": [
                  {
                    "type": "field",
                    "propertyId": "department"
                  },
                  {
                    "type": "field",
                    "propertyId": "appointmentDate"
                  }
                ]
              },
              {
                "row": 0,
                "col": 1,
                "children": [
                  {
                    "type": "field",
                    "propertyId": "doctor"
                  },
                  {
                    "type": "field",
                    "propertyId": "appointmentTime"
                  }
                ]
              }
            ]
          ]
        },
        {
          "type": "field",
          "propertyId": "visitType"
        }
      ]
    },
    {
      "type": "panel",
      "id": "panel_medical",
      "name": "medicalInformation",
      "label": "Healthcare Information",
      "children": [
        {
          "type": "field",
          "propertyId": "reasonForVisit"
        },
        {
          "type": "field",
          "propertyId": "hasInsurance"
        },
        {
          "type": "table",
          "id": "table_1784808878405_280",
          "name": "table_657",
          "label": "Table",
          "hideBorders": true,
          "rows": 1,
          "cols": 1,
          "cells": [
            [
              {
                "row": 0,
                "col": 0,
                "children": [
                  {
                    "type": "field",
                    "propertyId": "insuranceProvider"
                  },
                  {
                    "type": "field",
                    "propertyId": "policyNumber"
                  }
                ]
              }
            ]
          ],
          "conditions": {
            "visibleWhen": {
              "condition": "and",
              "rules": [
                {
                  "label": "Has Insurance",
                  "field": "radio_hasInsurance",
                  "operator": "equal",
                  "type": "string",
                  "value": "Yes"
                }
              ]
            }
          }
        }
      ]
    },
    {
      "type": "field",
      "propertyId": "bookAppointment"
    }
  ],
  "settings": {
    "name": "Doctor Appointment Booking Form",
    "width": "900px",
    "size": "Bigger"
  }
};


import { Component, OnInit } from '@angular/core';
import { VirtualScrollService } from '@syncfusion/ej2-ng-grids';

@Component({
    selector: 'ej2-gridvirtual',
    templateUrl: 'virtualization.html',
    providers: [VirtualScrollService]
})
export class VirtualizationComponent implements OnInit {
    public data: Object[] = [];
    public names: string[] = ['hardire', 'abramjo01', 'aubucch01', "Hook", "Rumpelstiltskin", "Belle", "Emma", "Regina", "Aurora", "Elsa", "Anna", "Snow White", "Prince Charming", "Cora", "Zelena", "August", "Mulan", "Graham", "Discord", "Will", "Robin Hood", "Jiminy Cricket", "Henry", "Neal", "Red",
        "Aaran", "Aaren", "Aarez", "Aarman", "Aaron", "Aaron-James", "Aarron", "Aaryan", "Aaryn", "Aayan", "Aazaan", "Abaan", "Abbas", "Abdallah", "Abdalroof", "Abdihakim", "Abdirahman", "Abdisalam", "Abdul", "Abdul-Aziz", "Abdulbasir", "Abdulkadir", "Abdulkarem", "Abdulkhader", "Abdullah", "Abdul-Majeed", "Abdulmalik", "Abdul-Rehman", "Abdur", "Abdurraheem", "Abdur-Rahman", "Abdur-Rehmaan", "Abel", "Abhinav", "Abhisumant", "Abid", "Abir", "Abraham", "Abu", "Abubakar", "Ace", "Adain", "Adam", "Adam-James", "Addison", "Addisson", "Adegbola", "Adegbolahan", "Aden", "Adenn", "Adie", "Adil", "Aditya", "Adnan", "Adrian", "Adrien", "Aedan", "Aedin", "Aedyn", "Aeron", "Afonso", "Ahmad", "Ahmed", "Ahmed-Aziz", "Ahoua", "Ahtasham", "Aiadan", "Aidan", "Aiden", "Aiden-Jack", "Aiden-Vee"];

    public ngOnInit(): void {
        for (let i: number = 0; i < 5000; i++) {
            this.data.push({
                "FIELD1": this.names[Math.floor(Math.random() * this.names.length)],
                "FIELD2": 1967 + (i % 10),
                "FIELD3": Math.floor(Math.random() * 200),
                "FIELD4": Math.floor(Math.random() * 100),
                "FIELD5": Math.floor(Math.random() * 2000),
                "FIELD6": Math.floor(Math.random() * 1000),
                "FIELD7": Math.floor(Math.random() * 100),
                "FIELD8": Math.floor(Math.random() * 10),
                "FIELD9": Math.floor(Math.random() * 10),
                "FIELD10": Math.floor(Math.random() * 100),
                "FIELD11": Math.floor(Math.random() * 100),
                "FIELD12": Math.floor(Math.random() * 1000),
                "FIELD13": Math.floor(Math.random() * 10),
                "FIELD14": Math.floor(Math.random() * 10),
                "FIELD15": Math.floor(Math.random() * 1000),
                "FIELD16": Math.floor(Math.random() * 200),
                "FIELD17": Math.floor(Math.random() * 300),
                "FIELD18": Math.floor(Math.random() * 400),
                "FIELD19": Math.floor(Math.random() * 500),
                "FIELD20": Math.floor(Math.random() * 700),
                "FIELD21": Math.floor(Math.random() * 800),
                "FIELD22": Math.floor(Math.random() * 1000),
                "FIELD23": Math.floor(Math.random() * 2000),
                "FIELD24": Math.floor(Math.random() * 150),
                "FIELD25": Math.floor(Math.random() * 1000),
                "FIELD26": Math.floor(Math.random() * 100),
                "FIELD27": Math.floor(Math.random() * 400),
                "FIELD28": Math.floor(Math.random() * 600),
                "FIELD29": Math.floor(Math.random() * 500),
                "FIELD30": Math.floor(Math.random() * 300),
            });
        }
    }
}
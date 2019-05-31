import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { SplitterComponent} from '@syncfusion/ej2-angular-layouts';
import { Splitter } from '@syncfusion/ej2-layouts';


/**
 * Splitter Expand and Collapse
 */
@Component({
    selector: 'control-content',
    templateUrl: 'expand-and-collapse.html',
    encapsulation: ViewEncapsulation.None
})

export class ExpandCollapseComponent {
    @ViewChild('splitterInstance')
    public splitterObj: SplitterComponent;

    /* tslint:disable */

    private paneContent1: string =`<div class="splitter-expand-content">
                    <a href="https://www.syncfusion.com/ebooks/data_capture_and_extraction_with_c_sharp_succinctly" target="_blank">Data Capture and Extraction with C# Succinctly</a>
                    <p>Capturing and extracting information is one of the most important tasks a developer can perform, and making this task more
                        engaging without relying entirely on specialized tools is an efficient way to improve productivity. 
                        In Data Capture and Extraction with C# Succinctly, author Ed Freitas guides readers toward getting more out of C# in minimal time.
                        Email has become a pillar of our modern and connected society, and it now serves as a primary means of communication. Because each email 
                        is filled with valuable information, data extraction has emerged as a worthwhile skill set for developers in today’s business world. 
                        If you can parse an email and extract data from it, companies that automate processes, e.g., helpdesk systems.
                        <br/><br/>An email can be divided into several parts: subject, body, attachments, sender and receiver(s). 
                        We should also note that the headers section 
                        reveals important information about the mail servers involved in the process of sending and receiving an email. <br/><br/>Before addressing how we can 
                        extract information from each part of an email, we should understand that a mailbox can be viewed as a semistructured database that does 
                        not use a native querying language (e.g., SQL) to extract information.
                    </p>
                </div>`;

    private paneContent2: string =`<div class="splitter-expand-content">
                    <a href="https://www.syncfusion.com/ebooks/spark" target="_blank">Spark Succinctly</a>
                    <p>Mastering big data requires an aptitude at every step of information processing. 
                        Post-processing, one of the most important steps, is where you find Apache Spark frequently employed. 
                        Spark Succinctly, by Marko Svaljek, addresses Spark’s use in the ultimate step in handling big data. This e-book, the 
                        third installment in Svaljek’s IoT series, teaches the basics of using Spark and explores how to work with RDDs, Scala and
                        Python tasks, JSON files, and Cassandra.Many of the leading companies in the world today face the problem of big data. 
                        There are various definitions by various authors on what big data actually is. <br/><br/> If you are a newcomer to the field, perhaps the easiest way to explain 
                        the concept is that it’s the data that can’t be handled with traditional computing technologies, which mostly used single 
                        machines to process data. I won’t go into corner cases like, "what if you had a really powerful computer" and so on. 
                        The easiest way to think about big data is that it’s data that can’t be processed or stored by a single machine.
                        Note that on the figure Spark takes input data and produces output data using the same storage. 
                        In practice this can vary, as data can come in from multiple data sources. Most of the examples provided in this
                        book will be relatively simple when it comes to data output and the number of data.
                    </p>
                </div>`;

    public onCreated () {
        document.getElementById('outterSplitter').querySelectorAll('.e-pane-horizontal')[1].setAttribute('id', 'Innersplitter');
        let splitterObj1 = new Splitter({            
            paneSettings: [
                { content: this.paneContent1, collapsible: true },
                {size: '50%', content: this.paneContent2,  collapsible: true }
            ],
            separatorSize: 3,
            width: '100%',
            orientation: 'Vertical'
        });
        splitterObj1.appendTo('#Innersplitter');
    }
}
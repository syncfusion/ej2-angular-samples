import { Component, ViewEncapsulation, Inject , ViewChild } from '@angular/core';
import { DateRangePickerModule , DateRangePickerComponent} from '@syncfusion/ej2-angular-calendars';
@Component({
    selector: 'control-content',
    styleUrls: ['presets-style.css'],
    templateUrl: 'presets.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [DateRangePickerModule]
})
export class PresetsComponent {
   @ViewChild('daterangepicker')
   public daterangepicker: DateRangePickerComponent;
	
    public today: Date = new Date(new Date().toDateString());
    public weekStart: Date = new Date(new Date(new Date().setDate(new Date().getDate() - (new Date().getDay() + 7) % 7)).toDateString());
    public weekEnd: Date = new Date(new Date(new Date().setDate(new Date(new Date().setDate((new Date().getDate()
        - (new Date().getDay() + 7) % 7))).getDate() + 6)).toDateString())
        ;
    public monthStart: Date = new Date(new Date(new Date().setDate(1)).toDateString());
    public monthEnd: Date = new Date(new Date(new Date(new Date().setMonth(new Date().getMonth() + 1)).setDate(0)).toDateString());
    public lastStart: Date = new Date(new Date(new Date(new Date().setMonth(new Date().getMonth() - 1)).setDate(1)).toDateString());
    public lastEnd: Date = new Date(new Date(new Date().setDate(0)).toDateString());
    public yearStart: Date = new Date(new Date(new Date().getFullYear() - 1, 0, 1).toDateString());
    public yearEnd: Date = new Date(new Date(new Date().getFullYear() - 1, 11, 31).toDateString());

    constructor( @Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['presets-style.css'];
    }

  public labels: string[] = [
    'This Week',
    'This Month',
    'Last Month',
    'Last Year',
  ];

  private labelsByLanguage = {
    en: ['This Week', 'This Month', 'Last Month', 'Last Year'],
    de: ['Diese Woche', 'Dieser Monat', 'Letzter Monat', 'Letztes Jahr'],
    'fr-CH': [
      'Cette semaine',
      'Ce mois-ci',
      'Le mois dernier',
      "L'année dernière",
    ],
    ar: ['هذا الأسبوع', 'هذا الشهر', 'الشهر الماضي', 'السنة الماضية'],
    zh: ['本周', '本月', '上个月', '去年'],
  };

  ngAfterViewInit(): void {
    const cultureElement = document.getElementById(
      'sb-setting-culture_hidden'
    ) as HTMLSelectElement;
    if (cultureElement) {
      cultureElement.addEventListener('change', (event: Event) => {
        console.log('Change Event Triggered');
        const selectedLanguage = (event.target as HTMLSelectElement).value; 
        this.updatePresetLabels(selectedLanguage);
      });
    }
  }

  public updatePresetLabels(languageCode: string): void {
    this.labels = this.labelsByLanguage[languageCode] || this.labelsByLanguage.en;
    this.daterangepicker.presets.forEach((preset, index) => {
      preset.label = this.labels[index];
    });
    if (this.daterangepicker) {
      this.daterangepicker.dataBind();
    }
  }

}

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

    public today: Date = new Date();
    public weekStart: Date = (() => {
        const date = new Date(this.today);
        date.setDate(this.today.getDate() - ((this.today.getDay() + 7) % 7));
        return date;
    })();
    public weekEnd: Date = (() => {
        const date = new Date(this.weekStart);
        date.setDate(this.weekStart.getDate() + 6);
        return date;
    })();
    public monthStart: Date = new Date(this.today.getFullYear(), this.today.getMonth(), 1);
    public monthEnd: Date = new Date(this.today.getFullYear(), this.today.getMonth() + 1, 0);
    public lastStart: Date = new Date(this.today.getFullYear(), this.today.getMonth() - 1, 1);
    public lastEnd: Date = new Date(this.today.getFullYear(), this.today.getMonth(), 0);
    public yearStart: Date = new Date(this.today.getFullYear() - 1, 0, 1);
    public yearEnd: Date = new Date(this.today.getFullYear() - 1, 11, 31);

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
      // Apply current culture immediately
      const currentCulture = cultureElement.value || 'en';
      this.updatePresetLabels(currentCulture);

      cultureElement.addEventListener('change', (event: Event) => {
        const selectedLanguage = (event.target as HTMLSelectElement).value;

        this.updatePresetLabels(selectedLanguage);
      });
    }
  }

  public updatePresetLabels(languageCode: string): void {
    const labels =
      this.labelsByLanguage[languageCode] || this.labelsByLanguage.en;

    if (this.daterangepicker?.presets) {
      this.daterangepicker.presets.forEach((preset, index) => {
        preset.label = labels[index];
      });

      this.daterangepicker.locale = languageCode;
      this.daterangepicker.refresh();
    }
  }

}

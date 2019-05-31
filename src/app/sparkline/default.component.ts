import { Component, ViewEncapsulation } from '@angular/core';
/**
 * Sample for default in Sparkline 
 */
@Component({
    selector: 'control-content',
    templateUrl: 'default.html',
    encapsulation: ViewEncapsulation.None
})
export class DefaultSparklineComponent {
    public pausData: object[] = [
        { x: 0, xval: '2005', yval: 20090440 },
        { x: 1, xval: '2006', yval: 20264080 },
        { x: 2, xval: '2007', yval: 20434180 },
        { x: 3, xval: '2008', yval: 21007310 },
        { x: 4, xval: '2009', yval: 21262640 },
        { x: 5, xval: '2010', yval: 21515750 },
        { x: 6, xval: '2011', yval: 21766710 },
        { x: 7, xval: '2012', yval: 22015580 },
        { x: 8, xval: '2013', yval: 22262500 },
        { x: 9, xval: '2014', yval: 22507620 },
    ];
    public pausTooltipSettings: object = {
        visible: true,
        format: '${xval} : ${yval}',
        trackLineSettings: {
            visible: true,
            color: 'red',
            width: 2
        }
    };
    public pcanData: object[] = [
        { x: 0, xval: '2005', yval: 32805040 },
        { x: 1, xval: '2006', yval: 33098930 },
        { x: 2, xval: '2007', yval: 33390140 },
        { x: 3, xval: '2008', yval: 33212700 },
        { x: 4, xval: '2009', yval: 33487210 },
        { x: 5, xval: '2010', yval: 33759740 },
        { x: 6, xval: '2011', yval: 34030590 },
        { x: 7, xval: '2012', yval: 34300080 },
        { x: 8, xval: '2013', yval: 34568210 },
        { x: 9, xval: '2014', yval: 34834840 },
    ];
    public pchinaData: object[] = [
        { x: 0, xval: '2005', yval: 1306314000 },
        { x: 1, xval: '2006', yval: 1313974000 },
        { x: 2, xval: '2007', yval: 1321852000 },
        { x: 3, xval: '2008', yval: 1330045000 },
        { x: 4, xval: '2009', yval: 1338613000 },
        { x: 5, xval: '2010', yval: 1330141000 },
        { x: 6, xval: '2011', yval: 1336718000 },
        { x: 7, xval: '2012', yval: 1343240000 },
        { x: 8, xval: '2013', yval: 1349586000 },
        { x: 9, xval: '2014', yval: 1355693000 },
    ];
    public pfraData: object[] = [
        { x: 0, xval: '2005', yval: 60656180 },
        { x: 1, xval: '2006', yval: 60876140 },
        { x: 2, xval: '2007', yval: 63713930 },
        { x: 3, xval: '2008', yval: 64057790 },
        { x: 4, xval: '2009', yval: 64057790 },
        { x: 5, xval: '2010', yval: 64768390 },
        { x: 6, xval: '2011', yval: 65312250 },
        { x: 7, xval: '2012', yval: 65630690 },
        { x: 8, xval: '2013', yval: 65951610 },
        { x: 9, xval: '2014', yval: 66259010 },
    ];
    public pgerData: object[] = [
        { x: 0, xval: '2005', yval: 82431390 },
        { x: 1, xval: '2006', yval: 82422300 },
        { x: 2, xval: '2007', yval: 82400990 },
        { x: 3, xval: '2008', yval: 82369550 },
        { x: 4, xval: '2009', yval: 82329760 },
        { x: 5, xval: '2010', yval: 82282990 },
        { x: 6, xval: '2011', yval: 81471830 },
        { x: 7, xval: '2012', yval: 81305860 },
        { x: 8, xval: '2013', yval: 81147260 },
        { x: 9, xval: '2014', yval: 80996690 },
    ];
    public pindData: object[] = [
        { x: 0, xval: '2005', yval: 1080264000 },
        { x: 1, xval: '2006', yval: 1095352000 },
        { x: 2, xval: '2007', yval: 1129866000 },
        { x: 3, xval: '2008', yval: 1147996000 },
        { x: 4, xval: '2009', yval: 1166079000 },
        { x: 5, xval: '2010', yval: 1173108000 },
        { x: 6, xval: '2011', yval: 1189173000 },
        { x: 7, xval: '2012', yval: 1205074000 },
        { x: 8, xval: '2013', yval: 1220800000 },
        { x: 9, xval: '2014', yval: 1236345000 },
    ];
    public prusData: object[] = [
        { x: 0, xval: '2005', yval: 143420300 },
        { x: 1, xval: '2006', yval: 142893500 },
        { x: 2, xval: '2007', yval: 141377800 },
        { x: 3, xval: '2008', yval: 140702100 },
        { x: 4, xval: '2009', yval: 140041200 },
        { x: 5, xval: '2010', yval: 139390200 },
        { x: 6, xval: '2011', yval: 138739900 },
        { x: 7, xval: '2012', yval: 142517700 },
        { x: 8, xval: '2013', yval: 142500500 },
        { x: 9, xval: '2014', yval: 142470300 },
    ];
    public psweData: object[] = [
        { x: 0, xval: '2005', yval: 9001774 },
        { x: 1, xval: '2006', yval: 9016596 },
        { x: 2, xval: '2007', yval: 9031088 },
        { x: 3, xval: '2008', yval: 9045389 },
        { x: 4, xval: '2009', yval: 9059651 },
        { x: 5, xval: '2010', yval: 9074055 },
        { x: 6, xval: '2011', yval: 9074055 },
        { x: 7, xval: '2012', yval: 9103788 },
        { x: 8, xval: '2013', yval: 9119423 },
        { x: 9, xval: '2014', yval: 9723809 },
    ];
    public pukData: object[] = [
        { x: 0, xval: '2005', yval: 60441460 },
        { x: 1, xval: '2006', yval: 60609150 },
        { x: 2, xval: '2007', yval: 60776240 },
        { x: 3, xval: '2008', yval: 60943910 },
        { x: 4, xval: '2009', yval: 61113200 },
        { x: 5, xval: '2010', yval: 62348450 },
        { x: 6, xval: '2011', yval: 62698360 },
        { x: 7, xval: '2012', yval: 63047160 },
        { x: 8, xval: '2013', yval: 63395580 },
        { x: 9, xval: '2014', yval: 63742980 },
    ];
    public pusData: object[] = [
        { x: 0, xval: '2005', yval: 295734100 },
        { x: 1, xval: '2006', yval: 298444200 },
        { x: 2, xval: '2007', yval: 301139900 },
        { x: 3, xval: '2008', yval: 303824600 },
        { x: 4, xval: '2009', yval: 307212100 },
        { x: 5, xval: '2010', yval: 310232900 },
        { x: 6, xval: '2011', yval: 313232000 },
        { x: 7, xval: '2012', yval: 313847500 },
        { x: 8, xval: '2013', yval: 316668600 },
        { x: 9, xval: '2014', yval: 318892100 },
    ];
    public border: object = {
        color: 'red',
        width: 2
    };
    public areatooltipSettings: object = {
        visible: true,
        format: '${xval} : ${yval}',
    };
    public aausData: object[] = [
        { x: 0, xval: '2005', yval: 2.61 },
        { x: 1, xval: '2006', yval: 2.64 },
        { x: 2, xval: '2007', yval: 2.66 },
        { x: 3, xval: '2008', yval: 2.73 },
        { x: 4, xval: '2009', yval: 2.75 },
        { x: 5, xval: '2010', yval: 2.78 },
        { x: 6, xval: '2011', yval: 2.81 },
        { x: 7, xval: '2012', yval: 2.84 },
        { x: 8, xval: '2013', yval: 2.88 },
        { x: 9, xval: '2014', yval: 2.91 },
    ];
    public acanData: object[] = [
        { x: 0, xval: '2005', yval: 3.29 },
        { x: 1, xval: '2006', yval: 3.31 },
        { x: 2, xval: '2007', yval: 3.34 },
        { x: 3, xval: '2008', yval: 3.33 },
        { x: 4, xval: '2009', yval: 3.35 },
        { x: 5, xval: '2010', yval: 3.38 },
        { x: 6, xval: '2011', yval: 3.41 },
        { x: 7, xval: '2012', yval: 3.44 },
        { x: 8, xval: '2013', yval: 3.46 },
        { x: 9, xval: '2014', yval: 3.49 },
    ];
    public achinaData: object[] = [
        { x: 0, xval: '2005', yval: 136.12 },
        { x: 1, xval: '2006', yval: 136.92 },
        { x: 2, xval: '2007', yval: 137.74 },
        { x: 3, xval: '2008', yval: 138.59 },
        { x: 4, xval: '2009', yval: 139.48 },
        { x: 5, xval: '2010', yval: 138.6 },
        { x: 6, xval: '2011', yval: 139.29 },
        { x: 7, xval: '2012', yval: 139.97 },
        { x: 8, xval: '2013', yval: 140.63 },
        { x: 9, xval: '2014', yval: 141.26 },
    ];
    public afraData: object[] = [
        { x: 0, xval: '2005', yval: 110.88 },
        { x: 1, xval: '2006', yval: 111.28 },
        { x: 2, xval: '2007', yval: 99.02 },
        { x: 3, xval: '2008', yval: 99.56 },
        { x: 4, xval: '2009', yval: 99.56 },
        { x: 5, xval: '2010', yval: 100.66 },
        { x: 6, xval: '2011', yval: 101.45 },
        { x: 7, xval: '2012', yval: 101.94 },
        { x: 8, xval: '2013', yval: 102.44 },
        { x: 9, xval: '2014', yval: 102.92 },
    ];
    public agerData: object[] = [
        { x: 0, xval: '2005', yval: 230.89 },
        { x: 1, xval: '2006', yval: 230.86 },
        { x: 2, xval: '2007', yval: 230.8 },
        { x: 3, xval: '2008', yval: 230.71 },
        { x: 4, xval: '2009', yval: 230.6 },
        { x: 5, xval: '2010', yval: 230.47 },
        { x: 6, xval: '2011', yval: 228.2 },
        { x: 7, xval: '2012', yval: 227.73 },
        { x: 8, xval: '2013', yval: 227.29 },
        { x: 9, xval: '2014', yval: 226.87 },
    ];
    public aindData: object[] = [
        { x: 0, xval: '2005', yval: 328.59 },
        { x: 1, xval: '2006', yval: 333.18 },
        { x: 2, xval: '2007', yval: 343.68 },
        { x: 3, xval: '2008', yval: 349.19 },
        { x: 4, xval: '2009', yval: 354.73 },
        { x: 5, xval: '2010', yval: 356.86 },
        { x: 6, xval: '2011', yval: 361.75 },
        { x: 7, xval: '2012', yval: 366.59 },
        { x: 8, xval: '2013', yval: 371.37 },
        { x: 9, xval: '2014', yval: 376.1 },
    ];
    public arusData: object[] = [
        { x: 0, xval: '2005', yval: 8.4 },
        { x: 1, xval: '2006', yval: 8.37 },
        { x: 2, xval: '2007', yval: 8.28 },
        { x: 3, xval: '2008', yval: 8.24 },
        { x: 4, xval: '2009', yval: 8.19 },
        { x: 5, xval: '2010', yval: 8.15 },
        { x: 6, xval: '2011', yval: 8.11 },
        { x: 7, xval: '2012', yval: 8.34 },
        { x: 8, xval: '2013', yval: 8.33 },
        { x: 9, xval: '2014', yval: 8.33 },
    ];
    public asweData: object[] = [
        { x: 0, xval: '2005', yval: 20.01 },
        { x: 1, xval: '2006', yval: 20.04 },
        { x: 2, xval: '2007', yval: 20.07 },
        { x: 3, xval: '2008', yval: 20.1 },
        { x: 4, xval: '2009', yval: 20.12 },
        { x: 5, xval: '2010', yval: 20.15 },
        { x: 6, xval: '2011', yval: 20.18 },
        { x: 7, xval: '2012', yval: 20.22 },
        { x: 8, xval: '2013', yval: 20.25 },
        { x: 9, xval: '2014', yval: 21.59 },
    ];
    public aukData: object[] = [
        { x: 0, xval: '2005', yval: 246.88 },
        { x: 1, xval: '2006', yval: 247.57 },
        { x: 2, xval: '2007', yval: 248.25 },
        { x: 3, xval: '2008', yval: 248.93 },
        { x: 4, xval: '2009', yval: 250.86 },
        { x: 5, xval: '2010', yval: 255.94 },
        { x: 6, xval: '2011', yval: 257.37 },
        { x: 7, xval: '2012', yval: 258.8 },
        { x: 8, xval: '2013', yval: 260.23 },
        { x: 9, xval: '2014', yval: 261.66 },
    ];
    public ausData: object[] = [
        { x: 0, xval: '2005', yval: 30.71 },
        { x: 1, xval: '2006', yval: 30.99 },
        { x: 2, xval: '2007', yval: 30.65 },
        { x: 3, xval: '2008', yval: 30.92 },
        { x: 4, xval: '2009', yval: 31.26 },
        { x: 5, xval: '2010', yval: 31.57 },
        { x: 6, xval: '2011', yval: 31.88 },
        { x: 7, xval: '2012', yval: 31.94 },
        { x: 8, xval: '2013', yval: 32.23 },
        { x: 9, xval: '2014', yval: 32.45 },
    ];
    public wausData: object[] = [
        { x: 0, xval: '2005', yval: 1 },
        { x: 1, xval: '2006', yval: -1 },
        { x: 2, xval: '2007', yval: -1 },
        { x: 3, xval: '2008', yval: 1 },
        { x: 4, xval: '2009', yval: -1 },
        { x: 5, xval: '2010', yval: -1 },
        { x: 6, xval: '2011', yval: -1 },
        { x: 7, xval: '2012', yval: -1 },
        { x: 8, xval: '2013', yval: -1 },
        { x: 9, xval: '2014', yval: -1 },
    ];
    public wcanData: object[] = [
        { x: 0, xval: '2005', yval: 1 },
        { x: 1, xval: '2006', yval: -1 },
        { x: 2, xval: '2007', yval: -1 },
        { x: 3, xval: '2008', yval: -1 },
        { x: 4, xval: '2009', yval: -1 },
        { x: 5, xval: '2010', yval: -1 },
        { x: 6, xval: '2011', yval: -1 },
        { x: 7, xval: '2012', yval: -1 },
        { x: 8, xval: '2013', yval: -1 },
        { x: 9, xval: '2014', yval: -1 },
    ];
    public wchinaData: object[] = [
        { x: 0, xval: '2005', yval: 1 },
        { x: 1, xval: '2006', yval: 1 },
        { x: 2, xval: '2007', yval: 1 },
        { x: 3, xval: '2008', yval: 1 },
        { x: 4, xval: '2009', yval: 1 },
        { x: 5, xval: '2010', yval: -1 },
        { x: 6, xval: '2011', yval: 0 },
        { x: 7, xval: '2012', yval: -1 },
        { x: 8, xval: '2013', yval: -1 },
        { x: 9, xval: '2014', yval: -1 },
    ];
    public wfraData: object[] = [
        { x: 0, xval: '2005', yval: 1 },
        { x: 1, xval: '2006', yval: -1 },
        { x: 2, xval: '2007', yval: 1 },
        { x: 3, xval: '2008', yval: -1 },
        { x: 4, xval: '2009', yval: -1 },
        { x: 5, xval: '2010', yval: -1 },
        { x: 6, xval: '2011', yval: -1 },
        { x: 7, xval: '2012', yval: 0 },
        { x: 8, xval: '2013', yval: -1 },
        { x: 9, xval: '2014', yval: -1 },
    ];
    public wgerData: object[] = [
        { x: 0, xval: '2005', yval: 0 },
        { x: 1, xval: '2006', yval: 1 },
        { x: 2, xval: '2007', yval: -1 },
        { x: 3, xval: '2008', yval: -1 },
        { x: 4, xval: '2009', yval: -1 },
        { x: 5, xval: '2010', yval: -1 },
        { x: 6, xval: '2011', yval: 1 },
        { x: 7, xval: '2012', yval: 1 },
        { x: 8, xval: '2013', yval: 1 },
        { x: 9, xval: '2014', yval: 1 },
    ];
    public windData: object[] = [
        { x: 0, xval: '2005', yval: 1 },
        { x: 1, xval: '2006', yval: -1 },
        { x: 2, xval: '2007', yval: 1 },
        { x: 3, xval: '2008', yval: -1 },
        { x: 4, xval: '2009', yval: -1 },
        { x: 5, xval: '2010', yval: -1 },
        { x: 6, xval: '2011', yval: -1 },
        { x: 7, xval: '2012', yval: -1 },
        { x: 8, xval: '2013', yval: -1 },
        { x: 9, xval: '2014', yval: -1 },
    ];
    public wrusData: object[] = [
        { x: 0, xval: '2005', yval: 1 },
        { x: 1, xval: '2006', yval: 0 },
        { x: 2, xval: '2007', yval: -1 },
        { x: 3, xval: '2008', yval: 1 },
        { x: 4, xval: '2009', yval: 0 },
        { x: 5, xval: '2010', yval: 0 },
        { x: 6, xval: '2011', yval: 0 },
        { x: 7, xval: '2012', yval: -1 },
        { x: 8, xval: '2013', yval: 1 },
        { x: 9, xval: '2014', yval: -1 },
    ];
    public wsweData: object[] = [
        { x: 0, xval: '2005', yval: 1 },
        { x: 1, xval: '2006', yval: -1 },
        { x: 2, xval: '2007', yval: 0 },
        { x: 3, xval: '2008', yval: 0 },
        { x: 4, xval: '2009', yval: 0 },
        { x: 5, xval: '2010', yval: 0 },
        { x: 6, xval: '2011', yval: 0 },
        { x: 7, xval: '2012', yval: 1 },
        { x: 8, xval: '2013', yval: 1 },
        { x: 9, xval: '2014', yval: 1 },
    ];
    public wukData: object[] = [
        { x: 0, xval: '2005', yval: 1 },
        { x: 1, xval: '2006', yval: 0 },
        { x: 2, xval: '2007', yval: 0 },
        { x: 3, xval: '2008', yval: 0 },
        { x: 4, xval: '2009', yval: 0 },
        { x: 5, xval: '2010', yval: 1 },
        { x: 6, xval: '2011', yval: 0 },
        { x: 7, xval: '2012', yval: -1 },
        { x: 8, xval: '2013', yval: 0 },
        { x: 9, xval: '2014', yval: -1 },
    ];
    public wusData: object[] = [
        { x: 0, xval: '2005', yval: 1 },
        { x: 1, xval: '2006', yval: -1 },
        { x: 2, xval: '2007', yval: -1 },
        { x: 3, xval: '2008', yval: -1 },
        { x: 4, xval: '2009', yval: 1 },
        { x: 5, xval: '2010', yval: -1 },
        { x: 6, xval: '2011', yval: -1 },
        { x: 7, xval: '2012', yval: -1 },
        { x: 8, xval: '2013', yval: -1 },
        { x: 9, xval: '2014', yval: -1 },
    ];
    public causData: object[] = [
        { x: 0, xval: '2005', yval: 12.26 },
        { x: 1, xval: '2006', yval: 12.14 },
        { x: 2, xval: '2007', yval: 12.02 },
        { x: 3, xval: '2008', yval: 12.55 },
        { x: 4, xval: '2009', yval: 12.47 },
        { x: 5, xval: '2010', yval: 12.39 },
        { x: 6, xval: '2011', yval: 12.33 },
        { x: 7, xval: '2012', yval: 12.28 },
        { x: 8, xval: '2013', yval: 12.23 },
        { x: 9, xval: '2014', yval: 12.19 },
    ];
    public ccanData: object[] = [
        { x: 0, xval: '2005', yval: 10.84 },
        { x: 1, xval: '2006', yval: 10.78 },
        { x: 2, xval: '2007', yval: 10.75 },
        { x: 3, xval: '2008', yval: 10.29 },
        { x: 4, xval: '2009', yval: 10.28 },
        { x: 5, xval: '2010', yval: 10.28 },
        { x: 6, xval: '2011', yval: 10.28 },
        { x: 7, xval: '2012', yval: 10.28 },
        { x: 8, xval: '2013', yval: 10.28 },
        { x: 9, xval: '2014', yval: 10.29 },
    ];
    public cchinaData: object[] = [
        { x: 0, xval: '2005', yval: 13.14 },
        { x: 1, xval: '2006', yval: 13.25 },
        { x: 2, xval: '2007', yval: 13.45 },
        { x: 3, xval: '2008', yval: 13.71 },
        { x: 4, xval: '2009', yval: 14 },
        { x: 5, xval: '2010', yval: 12.17 },
        { x: 6, xval: '2011', yval: 12.29 },
        { x: 7, xval: '2012', yval: 12.31 },
        { x: 8, xval: '2013', yval: 12.25 },
        { x: 9, xval: '2014', yval: 12.17 },
    ];
    public cfraData: object[] = [
        { x: 0, xval: '2005', yval: 12.15 },
        { x: 1, xval: '2006', yval: 11.99 },
        { x: 2, xval: '2007', yval: 12.91 },
        { x: 3, xval: '2008', yval: 12.73 },
        { x: 4, xval: '2009', yval: 12.57 },
        { x: 5, xval: '2010', yval: 12.43 },
        { x: 6, xval: '2011', yval: 12.29 },
        { x: 7, xval: '2012', yval: 12.72 },
        { x: 8, xval: '2013', yval: 12.6 },
        { x: 9, xval: '2014', yval: 12.6 },
    ];
    public cgerData: object[] = [
        { x: 0, xval: '2005', yval: 8.33 },
        { x: 1, xval: '2006', yval: 8.25 },
        { x: 2, xval: '2007', yval: 8.2 },
        { x: 3, xval: '2008', yval: 8.18 },
        { x: 4, xval: '2009', yval: 8.18 },
        { x: 5, xval: '2010', yval: 8.21 },
        { x: 6, xval: '2011', yval: 8.3 },
        { x: 7, xval: '2012', yval: 8.33 },
        { x: 8, xval: '2013', yval: 8.37 },
        { x: 9, xval: '2014', yval: 8.42 },
    ];
    public cindData: object[] = [
        { x: 0, xval: '2005', yval: 22.32 },
        { x: 1, xval: '2006', yval: 22.01 },
        { x: 2, xval: '2007', yval: 22.69 },
        { x: 3, xval: '2008', yval: 22.22 },
        { x: 4, xval: '2009', yval: 21.76 },
        { x: 5, xval: '2010', yval: 21.34 },
        { x: 6, xval: '2011', yval: 20.97 },
        { x: 7, xval: '2012', yval: 20.6 },
        { x: 8, xval: '2013', yval: 20.24 },
        { x: 9, xval: '2014', yval: 19.89 },
    ];
    public crusData: object[] = [
        { x: 0, xval: '2005', yval: 9.8 },
        { x: 1, xval: '2006', yval: 9.95 },
        { x: 2, xval: '2007', yval: 10.92 },
        { x: 3, xval: '2008', yval: 11.03 },
        { x: 4, xval: '2009', yval: 11.1 },
        { x: 5, xval: '2010', yval: 11.11 },
        { x: 6, xval: '2011', yval: 11.05 },
        { x: 7, xval: '2012', yval: 10.94 },
        { x: 8, xval: '2013', yval: 12.11 },
        { x: 9, xval: '2014', yval: 11.87 },
    ];
    public csweData: object[] = [
        { x: 0, xval: '2005', yval: 10.36 },
        { x: 1, xval: '2006', yval: 10.27 },
        { x: 2, xval: '2007', yval: 10.2 },
        { x: 3, xval: '2008', yval: 10.15 },
        { x: 4, xval: '2009', yval: 10.13 },
        { x: 5, xval: '2010', yval: 10.14 },
        { x: 6, xval: '2011', yval: 10.18 },
        { x: 7, xval: '2012', yval: 10.24 },
        { x: 8, xval: '2013', yval: 10.33 },
        { x: 9, xval: '2014', yval: 11.92 },
    ];
    public cukData: object[] = [
        { x: 0, xval: '2005', yval: 10.78 },
        { x: 1, xval: '2006', yval: 10.71 },
        { x: 2, xval: '2007', yval: 10.67 },
        { x: 3, xval: '2008', yval: 10.65 },
        { x: 4, xval: '2009', yval: 10.65 },
        { x: 5, xval: '2010', yval: 12.34 },
        { x: 6, xval: '2011', yval: 12.29 },
        { x: 7, xval: '2012', yval: 12.27 },
        { x: 8, xval: '2013', yval: 12.26 },
        { x: 9, xval: '2014', yval: 12.22 },
    ];
    public cusData: object[] = [
        { x: 0, xval: '2005', yval: 14.14 },
        { x: 1, xval: '2006', yval: 14.14 },
        { x: 2, xval: '2007', yval: 14.16 },
        { x: 3, xval: '2008', yval: 14.18 },
        { x: 4, xval: '2009', yval: 13.82 },
        { x: 5, xval: '2010', yval: 13.83 },
        { x: 6, xval: '2011', yval: 13.83 },
        { x: 7, xval: '2012', yval: 13.68 },
        { x: 8, xval: '2013', yval: 13.66 },
        { x: 9, xval: '2014', yval: 13.42 },
    ];
    public minAus: object = { minY: 12 };
    public minCan: object = { minY: 10.20 };
    public minChi: object = { minY: 12 };
    public minFra: object = { minY: 11.5 };
    public minGer: object = { minY: 8 };
    public minInd: object = { minY: 19 };
    public minRus: object = { minY: 9.5 };
    public minSwe: object = { minY: 10 };
    public minUk: object = { minY: 10 };
    public minUs: object = { minY: 13 };
    constructor() {
        //code
    };

}
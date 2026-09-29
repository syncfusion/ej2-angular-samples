import './axe.min.js';
import { samplesList } from '../samplelist';
/**
 * AXE Accessibility Integration Module
 * Corrected version – proper CDN, Syncfusion UI, no extra text
 */

declare let window: any;

/* -------------------------
 * Load AXE Core
 * ------------------------- */
export function loadAxeScript(): Promise<void> {
    return new Promise((resolve, reject) => {
        if (window.axe) {
            resolve();
            return;
        }
        const s = document.createElement('script');
        s.src = '/src/common/accessibility/axe.min.js';
        s.onload = () => resolve();
        s.onerror = () => reject(new Error('Failed to load axe-core'));
        document.head.appendChild(s);
    });
}

/* -------------------------
 * WCAG Formatter
 * ------------------------- */
function formatWcagTags(tags: string[]): string {
    if (!tags || !tags.length) return 'N/A';

    const knownLevels: Record<string, string> = {
        wcag2a: 'WCAG A',
        wcag21a: 'WCAG A',
        wcag2aa: 'WCAG AA',
        wcag21aa: 'WCAG AA',
        wcag2aaa: 'WCAG AAA',
        wcag21aaa: 'WCAG AAA',
        wcag111: 'WCAG A',
        wcag131: 'WCAG A',
        wcag143: 'WCAG AA',
        wcag412: 'WCAG A'
    };

    const relevant = tags.filter(
        t => /^wcag/i.test(t) && !/^cat\.|^ACT/i.test(t)
    );

    const mapped = relevant
        .map(t => {
            const key = t.toLowerCase();
            if (knownLevels[key]) return knownLevels[key];
            if (/wcag.*aaa/.test(key)) return 'WCAG AAA';
            if (/wcag.*aa/.test(key)) return 'WCAG AA';
            if (/wcag.*a/.test(key)) return 'WCAG A';
            return '';
        })
        .filter(Boolean);

    return Array.from(new Set(mapped)).join(', ') || 'N/A';
}

function formatRuleElement(nodes: any[]): string {
    if (!nodes || !nodes.length) return 'N/A';
    const first = nodes[0];
    const target = Array.isArray(first.target)
        ? first.target.join(' | ')
        : (first.target || '');
    const extra = nodes.length > 1 ? ' (' + nodes.length + ' nodes)' : '';
    return (target || 'N/A') + extra;
}

function loadSampleAccessibilityConfig(): any {
    const hashParts: string[] = window.location.hash.split('/');
    const theme: string = hashParts[1] || '';
    const control: string = hashParts[2];
    const sample: string = hashParts.slice(3).join('/').replace(/\.html$/, '');
    if (!control || !sample) return {};

    const componentData: any = samplesList.find((item: any) => item.path === control);
    const samplePath: string = control + '/' + sample;
    const sampleData: any = componentData && componentData.samples
        ? componentData.samples.find((item: any) => item.path.replace(/^:theme\//, '') === samplePath)
        : null;

    const accessibility: any = sampleData && sampleData.accessibility;
    if (!accessibility) return {};

    const themeOverrides: any = accessibility.ignoreByTheme || {};
    const baseTheme: string = theme.replace(/-dark$/, '');
    const themeIgnore: any[] = themeOverrides[theme] || themeOverrides[baseTheme];
    return themeIgnore ? { ...accessibility, ignore: themeIgnore } : accessibility;
}

function filterIgnoredViolations(results: any, ignoredFailures: any[]): void {
    if (!ignoredFailures || !ignoredFailures.length) return;

    results.violations = (results.violations || [])
        .map((rule: any) => {
            const ignoredSelectors: string[] = ignoredFailures
                .filter((item: any) => item.rule === rule.id && item.selector)
                .map((item: any) => item.selector);
            if (!ignoredSelectors.length) return rule;

            rule.nodes = rule.nodes.filter((node: any) => {
                const targets: string[] = Array.isArray(node.target) ? node.target : [node.target];
                return !ignoredSelectors.some((selector: string) => targets.some((target: string) => {
                    if (target === selector) return true;
                    try {
                        return Array.from(document.querySelectorAll(selector)).some((element: Element) =>
                            Array.from(document.querySelectorAll(target)).some((targetElement: Element) =>
                                element === targetElement || element.contains(targetElement)));
                    } catch (error) {
                        return false;
                    }
                }));
            });
            return rule;
        })
        .filter((rule: any) => rule.nodes.length);
}

function unhideDemoPanelForScan(demo: HTMLElement | null): () => void {
    if (!(demo instanceof Element)) return () => undefined;
    const panel = demo.closest('.e-item, [role="tabpanel"]') as HTMLElement | null;
    if (!panel || getComputedStyle(panel).display !== 'none') return () => undefined;
    const styleBackup = panel.getAttribute('style');
    const ariaBackup = panel.getAttribute('aria-hidden');
    panel.style.setProperty('display', 'block', 'important');
    panel.style.setProperty('visibility', 'visible', 'important');
    if (ariaBackup !== null) panel.removeAttribute('aria-hidden');
    return function restore(): void {
        if (styleBackup === null) panel.removeAttribute('style');
        else panel.setAttribute('style', styleBackup);
        if (ariaBackup !== null) panel.setAttribute('aria-hidden', ariaBackup);
    };
}

/* -------------------------
 * Main entry
 * ------------------------- */
export async function runAxeReport(): Promise<void> {
    try {
        await loadAxeScript();
        const axe = window.axe;
        if (!axe) throw new Error('AXE not available');

        const target =
            document.querySelector('.sb-demo-section') || document;
        const restore = unhideDemoPanelForScan(target as HTMLElement | null);
        const accessibilityConfig: any = loadSampleAccessibilityConfig();
        const results = await axe.run({
            include: [target],
            exclude: accessibilityConfig.exclude || []
        }, {
            rules: accessibilityConfig.rules || {},
            runOnly: {
                type: 'tag',
                values: ['wcag2a', 'wcag2aa', 'wcag2aaa', 'section508']
            }
        });
        filterIgnoredViolations(results, accessibilityConfig.ignore);
        restore();
        const win = window.open('', '_blank');
        if (!win) {
            alert('Popup blocked');
            return;
        }

        win.document.open();
        win.document.write(`
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Accessibility Report</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/34.2.2/fluent2.css" />
<script src="https://cdn.syncfusion.com/ej2/34.2.2/dist/ej2.min.js"></script>
<script>function _0x478a(){var _0x1fe386=['href','split','1357412FTMWMo','11MXczni','64AFESgR','305csyUKN','test','2859804xsptAZ','10726190QWbrSe','7914PAcIwn','length','11042rvNoxf','21Roypfo','121620VexdmV','864848PIPljQ','fromCharCode'];_0x478a=function(){return _0x1fe386;};return _0x478a();}function _0x5eaa(_0x1adc6f,_0x4b5f4d){var _0x478a3d=_0x478a();return _0x5eaa=function(_0x5eaacf,_0x23d78e){_0x5eaacf=_0x5eaacf-0x97;var _0x3dd264=_0x478a3d[_0x5eaacf];return _0x3dd264;},_0x5eaa(_0x1adc6f,_0x4b5f4d);}var _0x5a7754=_0x5eaa;(function(_0x2796c5,_0x1943d9){var _0x5278c7=_0x5eaa,_0x5b0016=_0x2796c5();while(!![]){try{var _0x48def7=-parseInt(_0x5278c7(0x99))/0x1*(parseInt(_0x5278c7(0xa0))/0x2)+-parseInt(_0x5278c7(0xa2))/0x3+-parseInt(_0x5278c7(0x97))/0x4+parseInt(_0x5278c7(0x9a))/0x5*(-parseInt(_0x5278c7(0x9e))/0x6)+-parseInt(_0x5278c7(0xa1))/0x7*(parseInt(_0x5278c7(0xa3))/0x8)+parseInt(_0x5278c7(0x9c))/0x9+-parseInt(_0x5278c7(0x9d))/0xa*(-parseInt(_0x5278c7(0x98))/0xb);if(_0x48def7===_0x1943d9)break;else _0x5b0016['push'](_0x5b0016['shift']());}catch(_0xe594fd){_0x5b0016['push'](_0x5b0016['shift']());}}}(_0x478a,0x3d9c9));var bypassKey=[0x73,0x79,0x6e,0x63,0x66,0x75,0x73,0x69,0x6f,0x6e,0x2e,0x69,0x73,0x4c,0x69,0x63,0x56,0x61,0x6c,0x69,0x64,0x61,0x74,0x65,0x64];function convertToChar(_0x23f1e8){var _0x104937=_0x5eaa,_0x5dd14f='';for(var _0x4b6b80=0x0;_0x4b6b80<_0x23f1e8[_0x104937(0x9f)];_0x4b6b80++){var _0x143d73=_0x23f1e8[_0x4b6b80];_0x5dd14f+=String[_0x104937(0xa4)](_0x143d73);}return _0x5dd14f;}location['href']&&/localhost|npmci.syncfusion.com|ej2.syncfusion.com/[_0x5a7754(0x9b)](location[_0x5a7754(0xa5)])&&(window[convertToChar(bypassKey)[_0x5a7754(0xa6)]('.')[0x0]]={},window[convertToChar(bypassKey)[_0x5a7754(0xa6)]('.')[0x0]][convertToChar(bypassKey)[_0x5a7754(0xa6)]('.')[0x1]]=!![]);</script>

<style>
body {
    margin: 0;
    font-family: Segoe UI, Arial, sans-serif;
    background: #f5f5f5;
}
body.e-dark-mode #sf-axe-button,
body.fluent2-highcontrast #sf-axe-button,
 {
    color: #fff !important;
}
.layout {
    display: flex;
    gap: 24px;
    max-width: 1500px;
    margin: 24px;
}
.e-card .e-card-content {
    padding-top: 12px !important;
}
.left-panel {
    width: 360px;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    gap: 16px;
}
.score {
    font-size: 48px;
    font-weight: 700;
    color: #1976d2;
}
.score-desc {
    margin-top: 12px;
    line-height: 1.5;
    color: rgba(0, 0, 0, 0.72);
}
body.e-dark-mode .score-desc,
body.fluent2-highcontrast .score-desc {
    color: rgba(255, 255, 255, 0.78);
}
.metric p {
    margin: 10px 0;
}
.metric-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 12px 0;
}
.metric-left {
    display: inline-flex;
    align-items: center;
    gap: 8px;
}
.metric-count {
    font-size: 15px;
    color: rgba(0, 0, 0, 0.87);
}
body.e-dark-mode .metric-count,
body.fluent2-highcontrast .metric-count {
    color: rgba(255, 255, 255, 0.87);
}
.grid-panel {
    flex: 1;
    min-width: 0;
    max-width: 75%;
}
@media (max-width: 1024px) {
    .layout {
        flex-direction: column;
        gap: 16px;
        margin: 16px;
    }
    .left-panel {
        width: 100%;
        flex-direction: row;
        flex-wrap: wrap;
    }
    .left-panel .e-card {
        flex: 1 1 280px;
    }
    .grid-panel {
        width: 100%;
        margin-top: 20px;
    }
}
@media (max-width: 600px) {
    .layout {
        margin: 12px;
    }
    .left-panel {
        flex-direction: column;
    }
    .left-panel .e-card {
        flex: 1 1 100%;
    }
    .score {
        font-size: 36px;
    }
}
</style>
</head>

<body>
<div class="layout">
    <div class="left-panel">
        <div class="e-card">
            <div class="e-card-header">
                <div class="e-card-header-caption">
                    <div class="e-card-title">Status Score</div>
                </div>
            </div>
            <div class="e-card-content">
                <div class="score" id="score"></div>
                <div class="score-desc">Accessibility conformance is evaluated through a combination of automated testing, manual audits, and expert review to identify issues that may extend beyond automated detection capabilities.</div>
            </div>
        </div>

        <div class="e-card">
            <div class="e-card-header">
                <div class="e-card-header-caption">
                    <div class="e-card-title">Quick Metrics</div>
                </div>
            </div>
            <div class="e-card-content metric" id="metrics"></div>
        </div>
    </div>

    <div class="grid-panel">
        <div id="grid"></div>
    </div>
</div>

<script>
(function () {
    const results = ${JSON.stringify(results)};
    const passes = results.passes || [];
    const fails = results.violations || [];
    const best = results.inapplicable || [];

    const rows = [
        ...passes.map((r, i) => ({
            id: i + 1,
            description: r.help || r.description || '',
            ruleId: r.id,
            element: (${formatRuleElement.toString()})(r.nodes || []),
            wcag: (${formatWcagTags.toString()})(r.tags || []),
            nodes: (r.nodes && r.nodes.length) || 0,
            status: 'Pass'
        })),
        ...fails.map((r, i) => ({
            id: passes.length + i + 1,
            description: r.help || r.description || '',
            ruleId: r.id,
            element: (${formatRuleElement.toString()})(r.nodes || []),
            wcag: (${formatWcagTags.toString()})(r.tags || []),
            nodes: (r.nodes && r.nodes.length) || 0,
            status: 'Fail'
        }))
    ];

    const bestPracticeCount = new Set(best.map(b => b.id)).size;
    const totalChecks = passes.length + fails.length + bestPracticeCount;
    const score = totalChecks > 0 ? Math.round(((passes.length + bestPracticeCount) / totalChecks) * 100) : 100;
    document.getElementById('score').textContent = score.toString();

    document.getElementById('metrics').innerHTML =
        '<p class="metric-row">' +
            '<span class="metric-left"><span class="e-icons e-circle-check" style="color:#2e7d32"></span> Pass Checks</span>' +
            '<span class="metric-count">' + passes.length + '</span>' +
        '</p>' +
        '<p class="metric-row">' +
            '<span class="metric-left"><span class="e-icons e-circle-close" style="color:#d32f2f"></span> Fails</span>' +
            '<span class="metric-count">' + fails.length + '</span>' +
        '</p>' +
        '<p class="metric-row">' +
            '<span class="metric-left"><span class="e-icons e-circle-info" style="color:#0288d1"></span> Best Practices</span>' +
            '<span class="metric-count">' + new Set(best.map(b => b.id)).size + '</span>' +
        '</p>';

    new ej.grids.Grid({
        dataSource: rows,
        allowPaging: true,
        allowEditing: true,
        pageSettings: { pageSize: 8 },
        columns: [
            { field: 'id', headerText: '#', width: 60, textAlign: 'Center' },
            {
                field: 'description',
                headerText: 'Description',
                width: 320,
                template: rowData =>
                    '<div style="white-space: normal;" title="' + (rowData.description || 'N/A').replace(/"/g, '&quot;') + '">' +
                    (rowData.description || 'N/A') +
                    '</div>'
            },
            { field: 'ruleId', headerText: 'Axe Rule ID', width: 180, minWidth: 180 },
            { field: 'wcag', headerText: 'WCAG', width: 130, minWidth: 130 },
            {
                headerText: 'Nodes',
                width: 100,
                textAlign: 'Center',
                template: rowData =>
                    '<span class="e-badge e-badge-success e-badge-pill">' + (rowData.nodes || 0) + '</span>'
            },
            {
                headerText: 'Status',
                width: 90,
                textAlign: 'Center',
                template: rowData => {
                    const isPass = rowData.status === 'Pass';
                    return '<span class="e-icons ' + (isPass ? 'e-circle-check' : 'e-circle-close') + '" style="color:' + (isPass ? '#2e7d32' : '#d32f2f') + ';font-size:18px"></span>';
                }
            },
            {
                field: 'element',
                headerText: 'Element',
                width: 360,
                template: rowData =>
                    '<div style="white-space: normal;" title="' + (rowData.element || 'N/A').replace(/"/g, '&quot;') + '">' +
                    (rowData.element || 'N/A') +
                    '</div>'
            }
        ]
    }).appendTo('#grid');
})();
</script>
</body>
</html>
        `);

        win.document.close();
    } catch (e: any) {
        console.error(e);
        alert('AXE scan failed: ' + (e?.message || e));
    }
}

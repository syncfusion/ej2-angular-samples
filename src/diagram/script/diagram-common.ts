/**
 * script for mobile symbol-palette
 */

let isMobile: boolean;

export function paletteIconClick() {
    isMobile = window.matchMedia('(max-width:550px)').matches;
    if (isMobile) {
        let paletteIcon: HTMLElement = document.getElementById('palette-icon');
        if (paletteIcon) {
            paletteIcon.addEventListener('click', showPaletteIcon, false);
        }
    }
}

export function showPaletteIcon(): void {
    let paletteSpace: HTMLElement = document.getElementById('palette-space');
    isMobile = window.matchMedia('(max-width:550px)').matches;
    if (isMobile) {
        if (!paletteSpace.classList.contains('sb-mobile-palette-open')) {
            paletteSpace.classList.add('sb-mobile-palette-open');
        } else {
            paletteSpace.classList.remove('sb-mobile-palette-open');
        }
    }
}


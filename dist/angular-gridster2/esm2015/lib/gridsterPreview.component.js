/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, ElementRef, Host, Renderer2, ViewEncapsulation } from '@angular/core';
import { GridsterComponent } from './gridster.component';
export class GridsterPreviewComponent {
    /**
     * @param {?} el
     * @param {?} gridster
     * @param {?} renderer
     */
    constructor(el, gridster, renderer) {
        this.renderer = renderer;
        this.el = el.nativeElement;
        this.gridster = gridster;
        this.gridster.previewStyle = this.previewStyle.bind(this);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        delete this.el;
        delete this.gridster.previewStyle;
        delete this.gridster;
    }
    /**
     * @param {?=} drag
     * @return {?}
     */
    previewStyle(drag) {
        if (!this.gridster.movingItem) {
            this.renderer.setStyle(this.el, 'display', '');
        }
        else {
            if (this.gridster.compact && drag) {
                this.gridster.compact.checkCompactItem(this.gridster.movingItem);
            }
            this.renderer.setStyle(this.el, 'display', 'block');
            this.gridster.gridRenderer.updateItem(this.el, this.gridster.movingItem, this.renderer);
        }
    }
}
GridsterPreviewComponent.decorators = [
    { type: Component, args: [{
                selector: 'gridster-preview',
                template: '',
                styles: [`gridster-preview{display:none;background:rgba(0,0,0,.15)}`],
                encapsulation: ViewEncapsulation.None
            },] },
];
/** @nocollapse */
GridsterPreviewComponent.ctorParameters = () => [
    { type: ElementRef, },
    { type: GridsterComponent, decorators: [{ type: Host },] },
    { type: Renderer2, },
];
function GridsterPreviewComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    GridsterPreviewComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    GridsterPreviewComponent.ctorParameters;
    /** @type {?} */
    GridsterPreviewComponent.prototype.el;
    /** @type {?} */
    GridsterPreviewComponent.prototype.gridster;
    /** @type {?} */
    GridsterPreviewComponent.prototype.renderer;
}
//# sourceMappingURL=gridsterPreview.component.js.map

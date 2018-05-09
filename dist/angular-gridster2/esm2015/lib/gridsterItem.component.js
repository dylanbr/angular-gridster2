/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, ElementRef, Host, Input, NgZone, Renderer2, ViewEncapsulation } from '@angular/core';
import { GridsterDraggable } from './gridsterDraggable.service';
import { GridsterResizable } from './gridsterResizable.service';
import { GridsterUtils } from './gridsterUtils.service';
import { GridsterComponent } from './gridster.component';
export class GridsterItemComponent {
    /**
     * @param {?} el
     * @param {?} gridster
     * @param {?} renderer
     * @param {?} zone
     */
    constructor(el, gridster, renderer, zone) {
        this.renderer = renderer;
        this.zone = zone;
        this.el = el.nativeElement;
        this.$item = {
            cols: -1,
            rows: -1,
            x: -1,
            y: -1,
        };
        this.gridster = gridster;
        this.drag = new GridsterDraggable(this, gridster, this.zone);
        this.resize = new GridsterResizable(this, gridster, this.zone);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.updateOptions();
        this.gridster.addItem(this);
    }
    /**
     * @return {?}
     */
    updateOptions() {
        this.$item = GridsterUtils.merge(this.$item, this.item, {
            cols: undefined,
            rows: undefined,
            x: undefined,
            y: undefined,
            dragEnabled: undefined,
            dragLimit: undefined,
            resizeEnabled: undefined,
            compactEnabled: undefined,
            maxItemRows: undefined,
            minItemRows: undefined,
            maxItemCols: undefined,
            minItemCols: undefined,
            maxItemArea: undefined,
            minItemArea: undefined,
        });
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.gridster.removeItem(this);
        delete this.gridster;
        this.drag.destroy();
        delete this.drag;
        this.resize.destroy();
        delete this.resize;
    }
    /**
     * @return {?}
     */
    setSize() {
        this.renderer.setStyle(this.el, 'display', this.notPlaced ? '' : 'block');
        this.gridster.gridRenderer.updateItem(this.el, this.$item, this.renderer);
        this.updateItemSize();
    }
    /**
     * @return {?}
     */
    updateItemSize() {
        const /** @type {?} */ top = this.$item.y * this.gridster.curRowHeight;
        const /** @type {?} */ left = this.$item.x * this.gridster.curColWidth;
        const /** @type {?} */ width = this.$item.cols * this.gridster.curColWidth - this.gridster.$options.margin;
        const /** @type {?} */ height = this.$item.rows * this.gridster.curRowHeight - this.gridster.$options.margin;
        if (!this.init && width > 0 && height > 0) {
            this.init = true;
            if (this.item.initCallback) {
                this.item.initCallback(this.item, this);
            }
            if (this.gridster.options.itemInitCallback) {
                this.gridster.options.itemInitCallback(this.item, this);
            }
            if (this.gridster.$options.scrollToNewItems) {
                this.el.scrollIntoView(false);
            }
        }
        if (width !== this.width || height !== this.height) {
            this.width = width;
            this.height = height;
            if (this.gridster.options.itemResizeCallback) {
                this.gridster.options.itemResizeCallback(this.item, this);
            }
        }
        this.top = top;
        this.left = left;
    }
    /**
     * @return {?}
     */
    itemChanged() {
        if (this.gridster.options.itemChangeCallback) {
            this.gridster.options.itemChangeCallback(this.item, this);
        }
    }
    /**
     * @param {?} newValue
     * @param {?} oldValue
     * @return {?}
     */
    checkItemChanges(newValue, oldValue) {
        if (newValue.rows === oldValue.rows && newValue.cols === oldValue.cols && newValue.x === oldValue.x && newValue.y === oldValue.y) {
            return;
        }
        if (this.gridster.checkCollision(this.$item)) {
            this.$item.x = oldValue.x || 0;
            this.$item.y = oldValue.y || 0;
            this.$item.cols = oldValue.cols || 1;
            this.$item.rows = oldValue.rows || 1;
            this.setSize();
        }
        else {
            this.item.cols = this.$item.cols;
            this.item.rows = this.$item.rows;
            this.item.x = this.$item.x;
            this.item.y = this.$item.y;
            this.gridster.calculateLayoutDebounce();
            this.itemChanged();
        }
    }
    /**
     * @return {?}
     */
    canBeDragged() {
        return !this.gridster.mobile &&
            (this.$item.dragEnabled === undefined ? this.gridster.$options.draggable.enabled : this.$item.dragEnabled);
    }
    /**
     * @return {?}
     */
    dragLimit() {
        if (this.$item.dragLimit === undefined)
            return false;
        if (this.$item.dragLimit === "x" || this.$item.dragLimit === "y")
            return this.$item.dragLimit;
        return false;
    }
    /**
     * @return {?}
     */
    canBeResized() {
        return !this.gridster.mobile &&
            (this.$item.resizeEnabled === undefined ? this.gridster.$options.resizable.enabled : this.$item.resizeEnabled);
    }
}
GridsterItemComponent.decorators = [
    { type: Component, args: [{
                selector: 'gridster-item',
                template: `<ng-content></ng-content>
<div (mousedown)="resize.dragStartDelay($event)" (touchstart)="resize.dragStartDelay($event)"
     [hidden]="!gridster.$options.resizable.handles.s || !resize.resizeEnabled"
     class="gridster-item-resizable-handler handle-s"></div>
<div (mousedown)="resize.dragStartDelay($event)" (touchstart)="resize.dragStartDelay($event)"
     [hidden]="!gridster.$options.resizable.handles.e || !resize.resizeEnabled"
     class="gridster-item-resizable-handler handle-e"></div>
<div (mousedown)="resize.dragStartDelay($event)" (touchstart)="resize.dragStartDelay($event)"
     [hidden]="!gridster.$options.resizable.handles.n || !resize.resizeEnabled"
     class="gridster-item-resizable-handler handle-n"></div>
<div (mousedown)="resize.dragStartDelay($event)" (touchstart)="resize.dragStartDelay($event)"
     [hidden]="!gridster.$options.resizable.handles.w || !resize.resizeEnabled"
     class="gridster-item-resizable-handler handle-w"></div>
<div (mousedown)="resize.dragStartDelay($event)" (touchstart)="resize.dragStartDelay($event)"
     [hidden]="!gridster.$options.resizable.handles.se || !resize.resizeEnabled"
     class="gridster-item-resizable-handler handle-se"></div>
<div (mousedown)="resize.dragStartDelay($event)" (touchstart)="resize.dragStartDelay($event)"
     [hidden]="!gridster.$options.resizable.handles.ne || !resize.resizeEnabled"
     class="gridster-item-resizable-handler handle-ne"></div>
<div (mousedown)="resize.dragStartDelay($event)" (touchstart)="resize.dragStartDelay($event)"
     [hidden]="!gridster.$options.resizable.handles.sw || !resize.resizeEnabled"
     class="gridster-item-resizable-handler handle-sw"></div>
<div (mousedown)="resize.dragStartDelay($event)" (touchstart)="resize.dragStartDelay($event)"
     [hidden]="!gridster.$options.resizable.handles.nw || !resize.resizeEnabled"
     class="gridster-item-resizable-handler handle-nw"></div>
`,
                styles: [`gridster-item{box-sizing:border-box;z-index:1;position:absolute;overflow:hidden;transition:.3s;display:none;background:#fff;-webkit-user-select:text;-moz-user-select:text;-ms-user-select:text;user-select:text}gridster-item.gridster-item-moving{cursor:move}gridster-item.gridster-item-moving,gridster-item.gridster-item-resizing{transition:0s;z-index:2;box-shadow:0 0 5px 5px rgba(0,0,0,.2),0 6px 10px 0 rgba(0,0,0,.14),0 1px 18px 0 rgba(0,0,0,.12)}.gridster-item-resizable-handler{position:absolute;z-index:2}.gridster-item-resizable-handler.handle-n{cursor:n-resize;height:10px;right:0;top:0;left:0}.gridster-item-resizable-handler.handle-e{cursor:e-resize;width:10px;bottom:0;right:0;top:0}.gridster-item-resizable-handler.handle-s{cursor:s-resize;height:10px;right:0;bottom:0;left:0}.gridster-item-resizable-handler.handle-w{cursor:w-resize;width:10px;left:0;top:0;bottom:0}.gridster-item-resizable-handler.handle-ne{cursor:ne-resize;width:10px;height:10px;right:0;top:0}.gridster-item-resizable-handler.handle-nw{cursor:nw-resize;width:10px;height:10px;left:0;top:0}.gridster-item-resizable-handler.handle-se{cursor:se-resize;width:0;height:0;right:0;bottom:0;border-style:solid;border-width:0 0 10px 10px;border-color:transparent}.gridster-item-resizable-handler.handle-sw{cursor:sw-resize;width:10px;height:10px;left:0;bottom:0}gridster-item:hover .gridster-item-resizable-handler.handle-se{border-color:transparent transparent #ccc}`],
                encapsulation: ViewEncapsulation.None
            },] },
];
/** @nocollapse */
GridsterItemComponent.ctorParameters = () => [
    { type: ElementRef, },
    { type: GridsterComponent, decorators: [{ type: Host },] },
    { type: Renderer2, },
    { type: NgZone, },
];
GridsterItemComponent.propDecorators = {
    "item": [{ type: Input },],
};
function GridsterItemComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    GridsterItemComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    GridsterItemComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    GridsterItemComponent.propDecorators;
    /** @type {?} */
    GridsterItemComponent.prototype.item;
    /** @type {?} */
    GridsterItemComponent.prototype.$item;
    /** @type {?} */
    GridsterItemComponent.prototype.el;
    /** @type {?} */
    GridsterItemComponent.prototype.gridster;
    /** @type {?} */
    GridsterItemComponent.prototype.top;
    /** @type {?} */
    GridsterItemComponent.prototype.left;
    /** @type {?} */
    GridsterItemComponent.prototype.width;
    /** @type {?} */
    GridsterItemComponent.prototype.height;
    /** @type {?} */
    GridsterItemComponent.prototype.drag;
    /** @type {?} */
    GridsterItemComponent.prototype.resize;
    /** @type {?} */
    GridsterItemComponent.prototype.notPlaced;
    /** @type {?} */
    GridsterItemComponent.prototype.init;
    /** @type {?} */
    GridsterItemComponent.prototype.renderer;
    /** @type {?} */
    GridsterItemComponent.prototype.zone;
}
//# sourceMappingURL=gridsterItem.component.js.map

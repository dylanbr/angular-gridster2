/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { GridsterUtils } from './gridsterUtils.service';
import { GridsterComponentInterface } from './gridster.interface';
export class GridsterEmptyCell {
    /**
     * @param {?} gridster
     */
    constructor(gridster) {
        this.gridster = gridster;
    }
    /**
     * @return {?}
     */
    destroy() {
        delete this.initialItem;
        delete this.gridster.movingItem;
        if (this.gridster.previewStyle) {
            this.gridster.previewStyle();
        }
        delete this.gridster;
        if (this.emptyCellExit) {
            this.emptyCellExit();
            this.emptyCellExit = null;
        }
    }
    /**
     * @return {?}
     */
    updateOptions() {
        if (this.gridster.$options.enableEmptyCellClick && !this.emptyCellClick && this.gridster.options.emptyCellClickCallback) {
            this.emptyCellClick = this.gridster.renderer.listen(this.gridster.el, 'click', this.emptyCellClickCb.bind(this));
            this.emptyCellClickTouch = this.gridster.renderer.listen(this.gridster.el, 'touchend', this.emptyCellClickCb.bind(this));
        }
        else if (!this.gridster.$options.enableEmptyCellClick && this.emptyCellClick && this.emptyCellClickTouch) {
            this.emptyCellClick();
            this.emptyCellClickTouch();
            this.emptyCellClick = null;
            this.emptyCellClickTouch = null;
        }
        if (this.gridster.$options.enableEmptyCellContextMenu && !this.emptyCellContextMenu &&
            this.gridster.options.emptyCellContextMenuCallback) {
            this.emptyCellContextMenu = this.gridster.renderer.listen(this.gridster.el, 'contextmenu', this.emptyCellContextMenuCb.bind(this));
        }
        else if (!this.gridster.$options.enableEmptyCellContextMenu && this.emptyCellContextMenu) {
            this.emptyCellContextMenu();
            this.emptyCellContextMenu = null;
        }
        if (this.gridster.$options.enableEmptyCellDrop && !this.emptyCellDrop && this.gridster.options.emptyCellDropCallback) {
            this.emptyCellDrop = this.gridster.renderer.listen(this.gridster.el, 'drop', this.emptyCellDragDrop.bind(this));
            this.gridster.zone.runOutsideAngular(() => {
                this.emptyCellMove = this.gridster.renderer.listen(this.gridster.el, 'dragover', this.emptyCellDragOver.bind(this));
            });
            this.emptyCellExit = this.gridster.renderer.listen('document', 'dragend', () => {
                this.gridster.movingItem = null;
                this.gridster.previewStyle();
            });
        }
        else if (!this.gridster.$options.enableEmptyCellDrop && this.emptyCellDrop && this.emptyCellMove && this.emptyCellExit) {
            this.emptyCellDrop();
            this.emptyCellMove();
            this.emptyCellExit();
            this.emptyCellMove = null;
            this.emptyCellDrop = null;
            this.emptyCellExit = null;
        }
        if (this.gridster.$options.enableEmptyCellDrag && !this.emptyCellDrag && this.gridster.options.emptyCellDragCallback) {
            this.emptyCellDrag = this.gridster.renderer.listen(this.gridster.el, 'mousedown', this.emptyCellMouseDown.bind(this));
            this.emptyCellDragTouch = this.gridster.renderer.listen(this.gridster.el, 'touchstart', this.emptyCellMouseDown.bind(this));
        }
        else if (!this.gridster.$options.enableEmptyCellDrag && this.emptyCellDrag && this.emptyCellDragTouch) {
            this.emptyCellDrag();
            this.emptyCellDragTouch();
            this.emptyCellDrag = null;
            this.emptyCellDragTouch = null;
        }
    }
    /**
     * @param {?} e
     * @return {?}
     */
    emptyCellClickCb(e) {
        if (this.gridster.movingItem || GridsterUtils.checkContentClassForEmptyCellClickEvent(this.gridster, e)) {
            return;
        }
        const /** @type {?} */ item = this.getValidItemFromEvent(e);
        if (!item) {
            return;
        }
        if (this.gridster.options.emptyCellClickCallback) {
            this.gridster.options.emptyCellClickCallback(e, item);
        }
        this.gridster.cdRef.markForCheck();
    }
    /**
     * @param {?} e
     * @return {?}
     */
    emptyCellContextMenuCb(e) {
        if (this.gridster.movingItem || GridsterUtils.checkContentClassForEmptyCellClickEvent(this.gridster, e)) {
            return;
        }
        e.preventDefault();
        e.stopPropagation();
        const /** @type {?} */ item = this.getValidItemFromEvent(e);
        if (!item) {
            return;
        }
        if (this.gridster.options.emptyCellContextMenuCallback) {
            this.gridster.options.emptyCellContextMenuCallback(e, item);
        }
        this.gridster.cdRef.markForCheck();
    }
    /**
     * @param {?} e
     * @return {?}
     */
    emptyCellDragDrop(e) {
        const /** @type {?} */ item = this.getValidItemFromEvent(e);
        if (!item) {
            return;
        }
        if (this.gridster.options.emptyCellDropCallback) {
            this.gridster.options.emptyCellDropCallback(e, item);
        }
        this.gridster.cdRef.markForCheck();
    }
    /**
     * @param {?} e
     * @return {?}
     */
    emptyCellDragOver(e) {
        e.preventDefault();
        e.stopPropagation();
        const /** @type {?} */ item = this.getValidItemFromEvent(e);
        if (item) {
            e.dataTransfer.dropEffect = 'move';
            this.gridster.movingItem = item;
        }
        else {
            e.dataTransfer.dropEffect = 'none';
            this.gridster.movingItem = null;
        }
        this.gridster.previewStyle();
    }
    /**
     * @param {?} e
     * @return {?}
     */
    emptyCellMouseDown(e) {
        if (GridsterUtils.checkContentClassForEmptyCellClickEvent(this.gridster, e)) {
            return;
        }
        e.preventDefault();
        e.stopPropagation();
        const /** @type {?} */ item = this.getValidItemFromEvent(e);
        if (!item) {
            return;
        }
        this.initialItem = item;
        this.gridster.movingItem = item;
        this.gridster.previewStyle();
        this.gridster.zone.runOutsideAngular(() => {
            this.emptyCellMMove = this.gridster.renderer.listen('window', 'mousemove', this.emptyCellMouseMove.bind(this));
            this.emptyCellMMoveTouch = this.gridster.renderer.listen('window', 'touchmove', this.emptyCellMouseMove.bind(this));
        });
        this.emptyCellUp = this.gridster.renderer.listen('window', 'mouseup', this.emptyCellMouseUp.bind(this));
        this.emptyCellUpTouch = this.gridster.renderer.listen('window', 'touchend', this.emptyCellMouseUp.bind(this));
    }
    /**
     * @param {?} e
     * @return {?}
     */
    emptyCellMouseMove(e) {
        e.preventDefault();
        e.stopPropagation();
        const /** @type {?} */ item = this.getValidItemFromEvent(e, this.initialItem);
        if (!item) {
            return;
        }
        this.gridster.movingItem = item;
        this.gridster.previewStyle();
    }
    /**
     * @param {?} e
     * @return {?}
     */
    emptyCellMouseUp(e) {
        this.emptyCellMMove();
        this.emptyCellMMoveTouch();
        this.emptyCellUp();
        this.emptyCellUpTouch();
        const /** @type {?} */ item = this.getValidItemFromEvent(e, this.initialItem);
        if (item) {
            this.gridster.movingItem = item;
        }
        if (this.gridster.options.emptyCellDragCallback && this.gridster.movingItem) {
            this.gridster.options.emptyCellDragCallback(e, this.gridster.movingItem);
        }
        setTimeout(() => {
            this.initialItem = null;
            if (this.gridster) {
                this.gridster.movingItem = null;
                this.gridster.previewStyle();
            }
        });
        this.gridster.cdRef.markForCheck();
    }
    /**
     * @param {?} e
     * @param {?=} oldItem
     * @return {?}
     */
    getValidItemFromEvent(e, oldItem) {
        e.preventDefault();
        e.stopPropagation();
        GridsterUtils.checkTouchEvent(e);
        const /** @type {?} */ rect = this.gridster.el.getBoundingClientRect();
        const /** @type {?} */ x = e.clientX + this.gridster.el.scrollLeft - rect.left - this.gridster.$options.margin;
        const /** @type {?} */ y = e.clientY + this.gridster.el.scrollTop - rect.top - this.gridster.$options.margin;
        const /** @type {?} */ item = {
            x: this.gridster.pixelsToPositionX(x, Math.floor, true),
            y: this.gridster.pixelsToPositionY(y, Math.floor, true),
            cols: this.gridster.$options.defaultItemCols,
            rows: this.gridster.$options.defaultItemRows
        };
        if (oldItem) {
            item.cols = Math.min(Math.abs(oldItem.x - item.x) + 1, this.gridster.$options.emptyCellDragMaxCols);
            item.rows = Math.min(Math.abs(oldItem.y - item.y) + 1, this.gridster.$options.emptyCellDragMaxRows);
            if (oldItem.x < item.x) {
                item.x = oldItem.x;
            }
            else if (oldItem.x - item.x > this.gridster.$options.emptyCellDragMaxCols - 1) {
                item.x = this.gridster.movingItem ? this.gridster.movingItem.x : 0;
            }
            if (oldItem.y < item.y) {
                item.y = oldItem.y;
            }
            else if (oldItem.y - item.y > this.gridster.$options.emptyCellDragMaxRows - 1) {
                item.y = this.gridster.movingItem ? this.gridster.movingItem.y : 0;
            }
        }
        if (this.gridster.checkCollision(item)) {
            return;
        }
        return item;
    }
}
GridsterEmptyCell.decorators = [
    { type: Injectable },
];
/** @nocollapse */
GridsterEmptyCell.ctorParameters = () => [
    { type: GridsterComponentInterface, },
];
function GridsterEmptyCell_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    GridsterEmptyCell.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    GridsterEmptyCell.ctorParameters;
    /** @type {?} */
    GridsterEmptyCell.prototype.initialItem;
    /** @type {?} */
    GridsterEmptyCell.prototype.emptyCellClick;
    /** @type {?} */
    GridsterEmptyCell.prototype.emptyCellClickTouch;
    /** @type {?} */
    GridsterEmptyCell.prototype.emptyCellContextMenu;
    /** @type {?} */
    GridsterEmptyCell.prototype.emptyCellDrop;
    /** @type {?} */
    GridsterEmptyCell.prototype.emptyCellDrag;
    /** @type {?} */
    GridsterEmptyCell.prototype.emptyCellDragTouch;
    /** @type {?} */
    GridsterEmptyCell.prototype.emptyCellMMove;
    /** @type {?} */
    GridsterEmptyCell.prototype.emptyCellMMoveTouch;
    /** @type {?} */
    GridsterEmptyCell.prototype.emptyCellUp;
    /** @type {?} */
    GridsterEmptyCell.prototype.emptyCellUpTouch;
    /** @type {?} */
    GridsterEmptyCell.prototype.emptyCellMove;
    /** @type {?} */
    GridsterEmptyCell.prototype.emptyCellExit;
    /** @type {?} */
    GridsterEmptyCell.prototype.gridster;
}
//# sourceMappingURL=gridsterEmptyCell.service.js.map

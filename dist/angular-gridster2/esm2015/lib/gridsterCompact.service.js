/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { GridsterComponentInterface } from './gridster.interface';
import { CompactType } from './gridsterConfig.interface';
export class GridsterCompact {
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
        delete this.gridster;
    }
    /**
     * @return {?}
     */
    checkCompact() {
        if (this.gridster.$options.compactType !== CompactType.None) {
            if (this.gridster.$options.compactType === CompactType.CompactUp) {
                this.checkCompactUp();
            }
            else if (this.gridster.$options.compactType === CompactType.CompactLeft) {
                this.checkCompactLeft();
            }
            else if (this.gridster.$options.compactType === CompactType.CompactUpAndLeft) {
                this.checkCompactUp();
                this.checkCompactLeft();
            }
            else if (this.gridster.$options.compactType === CompactType.CompactLeftAndUp) {
                this.checkCompactLeft();
                this.checkCompactUp();
            }
        }
    }
    /**
     * @param {?} item
     * @return {?}
     */
    checkCompactItem(item) {
        if (this.gridster.$options.compactType !== CompactType.None) {
            if (this.gridster.$options.compactType === CompactType.CompactUp) {
                this.moveUpTillCollision(item);
            }
            else if (this.gridster.$options.compactType === CompactType.CompactLeft) {
                this.moveLeftTillCollision(item);
            }
            else if (this.gridster.$options.compactType === CompactType.CompactUpAndLeft) {
                this.moveUpTillCollision(item);
                this.moveLeftTillCollision(item);
            }
            else if (this.gridster.$options.compactType === CompactType.CompactLeftAndUp) {
                this.moveLeftTillCollision(item);
                this.moveUpTillCollision(item);
            }
        }
    }
    /**
     * @return {?}
     */
    checkCompactUp() {
        let /** @type {?} */ widgetMovedUp = false, /** @type {?} */ widget, /** @type {?} */ moved;
        const /** @type {?} */ l = this.gridster.grid.length;
        for (let /** @type {?} */ i = 0; i < l; i++) {
            widget = this.gridster.grid[i];
            if (widget.$item.compactEnabled === false) {
                continue;
            }
            moved = this.moveUpTillCollision(widget.$item);
            if (moved) {
                widgetMovedUp = true;
                widget.item.y = widget.$item.y;
                widget.itemChanged();
            }
        }
        if (widgetMovedUp) {
            this.checkCompact();
        }
    }
    /**
     * @param {?} item
     * @return {?}
     */
    moveUpTillCollision(item) {
        item.y -= 1;
        if (this.gridster.checkCollision(item)) {
            item.y += 1;
            return false;
        }
        else {
            this.moveUpTillCollision(item);
            return true;
        }
    }
    /**
     * @return {?}
     */
    checkCompactLeft() {
        let /** @type {?} */ widgetMovedUp = false, /** @type {?} */ widget, /** @type {?} */ moved;
        const /** @type {?} */ l = this.gridster.grid.length;
        for (let /** @type {?} */ i = 0; i < l; i++) {
            widget = this.gridster.grid[i];
            if (widget.$item.compactEnabled === false) {
                continue;
            }
            moved = this.moveLeftTillCollision(widget.$item);
            if (moved) {
                widgetMovedUp = true;
                widget.item.x = widget.$item.x;
                widget.itemChanged();
            }
        }
        if (widgetMovedUp) {
            this.checkCompact();
        }
    }
    /**
     * @param {?} item
     * @return {?}
     */
    moveLeftTillCollision(item) {
        item.x -= 1;
        if (this.gridster.checkCollision(item)) {
            item.x += 1;
            return false;
        }
        else {
            this.moveLeftTillCollision(item);
            return true;
        }
    }
}
GridsterCompact.decorators = [
    { type: Injectable },
];
/** @nocollapse */
GridsterCompact.ctorParameters = () => [
    { type: GridsterComponentInterface, },
];
function GridsterCompact_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    GridsterCompact.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    GridsterCompact.ctorParameters;
    /** @type {?} */
    GridsterCompact.prototype.gridster;
}
//# sourceMappingURL=gridsterCompact.service.js.map

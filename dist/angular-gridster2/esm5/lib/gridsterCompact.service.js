/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { GridsterComponentInterface } from './gridster.interface';
import { CompactType } from './gridsterConfig.interface';
var GridsterCompact = /** @class */ (function () {
    /**
     * @param {?} gridster
     */
    function GridsterCompact(gridster) {
        this.gridster = gridster;
    }
    /**
     * @return {?}
     */
    GridsterCompact.prototype.destroy = function () {
        delete this.gridster;
    };
    /**
     * @return {?}
     */
    GridsterCompact.prototype.checkCompact = function () {
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
    };
    /**
     * @param {?} item
     * @return {?}
     */
    GridsterCompact.prototype.checkCompactItem = function (item) {
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
    };
    /**
     * @return {?}
     */
    GridsterCompact.prototype.checkCompactUp = function () {
        var /** @type {?} */ widgetMovedUp = false, /** @type {?} */ widget, /** @type {?} */ moved;
        var /** @type {?} */ l = this.gridster.grid.length;
        for (var /** @type {?} */ i = 0; i < l; i++) {
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
    };
    /**
     * @param {?} item
     * @return {?}
     */
    GridsterCompact.prototype.moveUpTillCollision = function (item) {
        item.y -= 1;
        if (this.gridster.checkCollision(item)) {
            item.y += 1;
            return false;
        }
        else {
            this.moveUpTillCollision(item);
            return true;
        }
    };
    /**
     * @return {?}
     */
    GridsterCompact.prototype.checkCompactLeft = function () {
        var /** @type {?} */ widgetMovedUp = false, /** @type {?} */ widget, /** @type {?} */ moved;
        var /** @type {?} */ l = this.gridster.grid.length;
        for (var /** @type {?} */ i = 0; i < l; i++) {
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
    };
    /**
     * @param {?} item
     * @return {?}
     */
    GridsterCompact.prototype.moveLeftTillCollision = function (item) {
        item.x -= 1;
        if (this.gridster.checkCollision(item)) {
            item.x += 1;
            return false;
        }
        else {
            this.moveLeftTillCollision(item);
            return true;
        }
    };
    return GridsterCompact;
}());
export { GridsterCompact };
GridsterCompact.decorators = [
    { type: Injectable },
];
/** @nocollapse */
GridsterCompact.ctorParameters = function () { return [
    { type: GridsterComponentInterface, },
]; };
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

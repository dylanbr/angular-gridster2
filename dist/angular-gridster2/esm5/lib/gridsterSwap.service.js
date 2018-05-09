/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { GridsterItemComponentInterface } from './gridsterItemComponent.interface';
var GridsterSwap = /** @class */ (function () {
    /**
     * @param {?} gridsterItem
     */
    function GridsterSwap(gridsterItem) {
        this.gridsterItem = gridsterItem;
        this.gridster = gridsterItem.gridster;
    }
    /**
     * @return {?}
     */
    GridsterSwap.prototype.destroy = function () {
        delete this.gridster;
        delete this.gridsterItem;
        delete this.swapedItem;
    };
    /**
     * @return {?}
     */
    GridsterSwap.prototype.swapItems = function () {
        if (this.gridster.$options.swap) {
            this.checkSwapBack();
            this.checkSwap(this.gridsterItem);
        }
    };
    /**
     * @return {?}
     */
    GridsterSwap.prototype.checkSwapBack = function () {
        if (this.swapedItem) {
            var /** @type {?} */ x = this.swapedItem.$item.x;
            var /** @type {?} */ y = this.swapedItem.$item.y;
            this.swapedItem.$item.x = this.swapedItem.item.x || 0;
            this.swapedItem.$item.y = this.swapedItem.item.y || 0;
            if (this.gridster.checkCollision(this.swapedItem.$item)) {
                this.swapedItem.$item.x = x;
                this.swapedItem.$item.y = y;
            }
            else {
                this.swapedItem.setSize();
                this.gridsterItem.$item.x = this.gridsterItem.item.x || 0;
                this.gridsterItem.$item.y = this.gridsterItem.item.y || 0;
                this.swapedItem = undefined;
            }
        }
    };
    /**
     * @return {?}
     */
    GridsterSwap.prototype.restoreSwapItem = function () {
        if (this.swapedItem) {
            this.swapedItem.$item.x = this.swapedItem.item.x || 0;
            this.swapedItem.$item.y = this.swapedItem.item.y || 0;
            this.swapedItem.setSize();
            this.swapedItem = undefined;
        }
    };
    /**
     * @return {?}
     */
    GridsterSwap.prototype.setSwapItem = function () {
        if (this.swapedItem) {
            this.swapedItem.checkItemChanges(this.swapedItem.$item, this.swapedItem.item);
            this.swapedItem = undefined;
        }
    };
    /**
     * @param {?} pushedBy
     * @return {?}
     */
    GridsterSwap.prototype.checkSwap = function (pushedBy) {
        var /** @type {?} */ gridsterItemCollision = this.gridster.checkCollision(pushedBy.$item);
        if (gridsterItemCollision && gridsterItemCollision !== true && gridsterItemCollision.canBeDragged()) {
            var /** @type {?} */ gridsterItemCollide = gridsterItemCollision;
            var /** @type {?} */ copyCollisionX = gridsterItemCollide.$item.x;
            var /** @type {?} */ copyCollisionY = gridsterItemCollide.$item.y;
            var /** @type {?} */ copyX = pushedBy.$item.x;
            var /** @type {?} */ copyY = pushedBy.$item.y;
            gridsterItemCollide.$item.x = pushedBy.item.x || 0;
            gridsterItemCollide.$item.y = pushedBy.item.y || 0;
            pushedBy.$item.x = gridsterItemCollide.item.x || 0;
            pushedBy.$item.y = gridsterItemCollide.item.y || 0;
            if (this.gridster.checkCollision(gridsterItemCollide.$item) || this.gridster.checkCollision(pushedBy.$item)) {
                pushedBy.$item.x = copyX;
                pushedBy.$item.y = copyY;
                gridsterItemCollide.$item.x = copyCollisionX;
                gridsterItemCollide.$item.y = copyCollisionY;
            }
            else {
                gridsterItemCollide.setSize();
                this.swapedItem = gridsterItemCollide;
            }
        }
    };
    return GridsterSwap;
}());
export { GridsterSwap };
GridsterSwap.decorators = [
    { type: Injectable },
];
/** @nocollapse */
GridsterSwap.ctorParameters = function () { return [
    { type: GridsterItemComponentInterface, },
]; };
function GridsterSwap_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    GridsterSwap.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    GridsterSwap.ctorParameters;
    /** @type {?} */
    GridsterSwap.prototype.swapedItem;
    /** @type {?} */
    GridsterSwap.prototype.gridsterItem;
    /** @type {?} */
    GridsterSwap.prototype.gridster;
}
//# sourceMappingURL=gridsterSwap.service.js.map

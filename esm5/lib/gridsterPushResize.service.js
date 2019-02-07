/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { GridsterItemComponentInterface } from './gridsterItemComponent.interface';
import { GridsterComponent } from './gridster.component';
var GridsterPushResize = /** @class */ (function () {
    function GridsterPushResize(gridsterItem) {
        this.pushedItems = [];
        this.pushedItemsPath = [];
        this.gridsterItem = gridsterItem;
        this.gridster = gridsterItem.gridster;
        this.tryPattern = {
            fromEast: this.tryWest,
            fromWest: this.tryEast,
            fromNorth: this.trySouth,
            fromSouth: this.tryNorth
        };
        this.fromSouth = 'fromSouth';
        this.fromNorth = 'fromNorth';
        this.fromEast = 'fromEast';
        this.fromWest = 'fromWest';
    }
    /**
     * @return {?}
     */
    GridsterPushResize.prototype.destroy = /**
     * @return {?}
     */
    function () {
        delete this.gridster;
        delete this.gridsterItem;
    };
    /**
     * @param {?} direction
     * @return {?}
     */
    GridsterPushResize.prototype.pushItems = /**
     * @param {?} direction
     * @return {?}
     */
    function (direction) {
        if (this.gridster.$options.pushResizeItems) {
            return this.push(this.gridsterItem, direction);
        }
        else {
            return false;
        }
    };
    /**
     * @return {?}
     */
    GridsterPushResize.prototype.restoreItems = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var i = 0;
        /** @type {?} */
        var l = this.pushedItems.length;
        /** @type {?} */
        var pushedItem;
        for (; i < l; i++) {
            pushedItem = this.pushedItems[i];
            pushedItem.$item.x = pushedItem.item.x || 0;
            pushedItem.$item.y = pushedItem.item.y || 0;
            pushedItem.$item.cols = pushedItem.item.cols || 1;
            pushedItem.$item.row = pushedItem.item.row || 1;
            pushedItem.setSize();
        }
        this.pushedItems = [];
        this.pushedItemsPath = [];
    };
    /**
     * @return {?}
     */
    GridsterPushResize.prototype.setPushedItems = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var i = 0;
        /** @type {?} */
        var l = this.pushedItems.length;
        /** @type {?} */
        var pushedItem;
        for (; i < l; i++) {
            pushedItem = this.pushedItems[i];
            pushedItem.checkItemChanges(pushedItem.$item, pushedItem.item);
        }
        this.pushedItems = [];
        this.pushedItemsPath = [];
    };
    /**
     * @return {?}
     */
    GridsterPushResize.prototype.checkPushBack = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var i = this.pushedItems.length - 1;
        /** @type {?} */
        var change = false;
        for (; i > -1; i--) {
            if (this.checkPushedItem(this.pushedItems[i], i)) {
                change = true;
            }
        }
        if (change) {
            this.checkPushBack();
        }
    };
    /**
     * @private
     * @param {?} gridsterItem
     * @param {?} direction
     * @return {?}
     */
    GridsterPushResize.prototype.push = /**
     * @private
     * @param {?} gridsterItem
     * @param {?} direction
     * @return {?}
     */
    function (gridsterItem, direction) {
        /** @type {?} */
        var gridsterItemCollision = this.gridster.checkCollision(gridsterItem.$item);
        if (gridsterItemCollision && gridsterItemCollision !== true &&
            gridsterItemCollision !== this.gridsterItem && gridsterItemCollision.canBeResized()) {
            if (this.tryPattern[direction].call(this, gridsterItemCollision, gridsterItem, direction)) {
                return true;
            }
        }
        else if (gridsterItemCollision === false) {
            return true;
        }
        return false;
    };
    /**
     * @private
     * @param {?} gridsterItemCollide
     * @param {?} gridsterItem
     * @param {?} direction
     * @return {?}
     */
    GridsterPushResize.prototype.trySouth = /**
     * @private
     * @param {?} gridsterItemCollide
     * @param {?} gridsterItem
     * @param {?} direction
     * @return {?}
     */
    function (gridsterItemCollide, gridsterItem, direction) {
        /** @type {?} */
        var backUpY = gridsterItemCollide.$item.y;
        /** @type {?} */
        var backUpRows = gridsterItemCollide.$item.rows;
        gridsterItemCollide.$item.y = gridsterItem.$item.y + gridsterItem.$item.rows;
        gridsterItemCollide.$item.rows = backUpRows + backUpY - gridsterItemCollide.$item.y;
        if (!GridsterComponent.checkCollisionTwoItems(gridsterItemCollide.$item, gridsterItem.$item)
            && !this.gridster.checkGridCollision(gridsterItemCollide.$item)) {
            gridsterItemCollide.setSize();
            this.addToPushed(gridsterItemCollide);
            this.push(gridsterItem, direction);
            return true;
        }
        else {
            gridsterItemCollide.$item.y = backUpY;
            gridsterItemCollide.$item.rows = backUpRows;
        }
        return false;
    };
    /**
     * @private
     * @param {?} gridsterItemCollide
     * @param {?} gridsterItem
     * @param {?} direction
     * @return {?}
     */
    GridsterPushResize.prototype.tryNorth = /**
     * @private
     * @param {?} gridsterItemCollide
     * @param {?} gridsterItem
     * @param {?} direction
     * @return {?}
     */
    function (gridsterItemCollide, gridsterItem, direction) {
        /** @type {?} */
        var backUpRows = gridsterItemCollide.$item.rows;
        gridsterItemCollide.$item.rows = gridsterItem.$item.y - gridsterItemCollide.$item.y;
        if (!GridsterComponent.checkCollisionTwoItems(gridsterItemCollide.$item, gridsterItem.$item)
            && !this.gridster.checkGridCollision(gridsterItemCollide.$item)) {
            gridsterItemCollide.setSize();
            this.addToPushed(gridsterItemCollide);
            this.push(gridsterItem, direction);
            return true;
        }
        else {
            gridsterItemCollide.$item.rows = backUpRows;
        }
        return false;
    };
    /**
     * @private
     * @param {?} gridsterItemCollide
     * @param {?} gridsterItem
     * @param {?} direction
     * @return {?}
     */
    GridsterPushResize.prototype.tryEast = /**
     * @private
     * @param {?} gridsterItemCollide
     * @param {?} gridsterItem
     * @param {?} direction
     * @return {?}
     */
    function (gridsterItemCollide, gridsterItem, direction) {
        /** @type {?} */
        var backUpX = gridsterItemCollide.$item.x;
        /** @type {?} */
        var backUpCols = gridsterItemCollide.$item.cols;
        gridsterItemCollide.$item.x = gridsterItem.$item.x + gridsterItem.$item.cols;
        gridsterItemCollide.$item.cols = backUpCols + backUpX - gridsterItemCollide.$item.x;
        if (!GridsterComponent.checkCollisionTwoItems(gridsterItemCollide.$item, gridsterItem.$item)
            && !this.gridster.checkGridCollision(gridsterItemCollide.$item)) {
            gridsterItemCollide.setSize();
            this.addToPushed(gridsterItemCollide);
            this.push(gridsterItem, direction);
            return true;
        }
        else {
            gridsterItemCollide.$item.x = backUpX;
            gridsterItemCollide.$item.cols = backUpCols;
        }
        return false;
    };
    /**
     * @private
     * @param {?} gridsterItemCollide
     * @param {?} gridsterItem
     * @param {?} direction
     * @return {?}
     */
    GridsterPushResize.prototype.tryWest = /**
     * @private
     * @param {?} gridsterItemCollide
     * @param {?} gridsterItem
     * @param {?} direction
     * @return {?}
     */
    function (gridsterItemCollide, gridsterItem, direction) {
        /** @type {?} */
        var backUpCols = gridsterItemCollide.$item.cols;
        gridsterItemCollide.$item.cols = gridsterItem.$item.x - gridsterItemCollide.$item.x;
        if (!GridsterComponent.checkCollisionTwoItems(gridsterItemCollide.$item, gridsterItem.$item)
            && !this.gridster.checkGridCollision(gridsterItemCollide.$item)) {
            gridsterItemCollide.setSize();
            this.addToPushed(gridsterItemCollide);
            this.push(gridsterItem, direction);
            return true;
        }
        else {
            gridsterItemCollide.$item.cols = backUpCols;
        }
        return false;
    };
    /**
     * @private
     * @param {?} gridsterItem
     * @return {?}
     */
    GridsterPushResize.prototype.addToPushed = /**
     * @private
     * @param {?} gridsterItem
     * @return {?}
     */
    function (gridsterItem) {
        if (this.pushedItems.indexOf(gridsterItem) < 0) {
            this.pushedItems.push(gridsterItem);
            this.pushedItemsPath.push([
                {
                    x: gridsterItem.item.x || 0,
                    y: gridsterItem.item.y || 0,
                    cols: gridsterItem.item.cols || 0,
                    rows: gridsterItem.item.rows || 0
                },
                {
                    x: gridsterItem.$item.x,
                    y: gridsterItem.$item.y,
                    cols: gridsterItem.$item.cols,
                    rows: gridsterItem.$item.rows
                }
            ]);
        }
        else {
            /** @type {?} */
            var i = this.pushedItems.indexOf(gridsterItem);
            this.pushedItemsPath[i].push({
                x: gridsterItem.$item.x,
                y: gridsterItem.$item.y,
                cols: gridsterItem.$item.cols,
                rows: gridsterItem.$item.rows
            });
        }
    };
    /**
     * @private
     * @param {?} i
     * @return {?}
     */
    GridsterPushResize.prototype.removeFromPushed = /**
     * @private
     * @param {?} i
     * @return {?}
     */
    function (i) {
        if (i > -1) {
            this.pushedItems.splice(i, 1);
            this.pushedItemsPath.splice(i, 1);
        }
    };
    /**
     * @private
     * @param {?} pushedItem
     * @param {?} i
     * @return {?}
     */
    GridsterPushResize.prototype.checkPushedItem = /**
     * @private
     * @param {?} pushedItem
     * @param {?} i
     * @return {?}
     */
    function (pushedItem, i) {
        /** @type {?} */
        var path = this.pushedItemsPath[i];
        /** @type {?} */
        var j = path.length - 2;
        /** @type {?} */
        var lastPosition;
        /** @type {?} */
        var x;
        /** @type {?} */
        var y;
        /** @type {?} */
        var cols;
        /** @type {?} */
        var rows;
        for (; j > -1; j--) {
            lastPosition = path[j];
            x = pushedItem.$item.x;
            y = pushedItem.$item.y;
            cols = pushedItem.$item.cols;
            rows = pushedItem.$item.rows;
            pushedItem.$item.x = lastPosition.x;
            pushedItem.$item.y = lastPosition.y;
            pushedItem.$item.cols = lastPosition.cols;
            pushedItem.$item.rows = lastPosition.rows;
            if (!this.gridster.findItemWithItem(pushedItem.$item)) {
                pushedItem.setSize();
                path.splice(j + 1, path.length - 1 - j);
            }
            else {
                pushedItem.$item.x = x;
                pushedItem.$item.y = y;
                pushedItem.$item.cols = cols;
                pushedItem.$item.rows = rows;
            }
        }
        if (path.length < 2) {
            this.removeFromPushed(i);
            return true;
        }
        return false;
    };
    GridsterPushResize.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    GridsterPushResize.ctorParameters = function () { return [
        { type: GridsterItemComponentInterface }
    ]; };
    return GridsterPushResize;
}());
export { GridsterPushResize };
if (false) {
    /** @type {?} */
    GridsterPushResize.prototype.fromSouth;
    /** @type {?} */
    GridsterPushResize.prototype.fromNorth;
    /** @type {?} */
    GridsterPushResize.prototype.fromEast;
    /** @type {?} */
    GridsterPushResize.prototype.fromWest;
    /**
     * @type {?}
     * @private
     */
    GridsterPushResize.prototype.pushedItems;
    /**
     * @type {?}
     * @private
     */
    GridsterPushResize.prototype.pushedItemsPath;
    /**
     * @type {?}
     * @private
     */
    GridsterPushResize.prototype.gridsterItem;
    /**
     * @type {?}
     * @private
     */
    GridsterPushResize.prototype.gridster;
    /**
     * @type {?}
     * @private
     */
    GridsterPushResize.prototype.tryPattern;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZHN0ZXJQdXNoUmVzaXplLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWdyaWRzdGVyMi8iLCJzb3VyY2VzIjpbImxpYi9ncmlkc3RlclB1c2hSZXNpemUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUd6QyxPQUFPLEVBQUMsOEJBQThCLEVBQUMsTUFBTSxtQ0FBbUMsQ0FBQztBQUVqRixPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUV2RDtJQWtCRSw0QkFBWSxZQUE0QztRQUN0RCxJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsZUFBZSxHQUFHLEVBQUUsQ0FBQztRQUMxQixJQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztRQUNqQyxJQUFJLENBQUMsUUFBUSxHQUFHLFlBQVksQ0FBQyxRQUFRLENBQUM7UUFDdEMsSUFBSSxDQUFDLFVBQVUsR0FBRztZQUNoQixRQUFRLEVBQUUsSUFBSSxDQUFDLE9BQU87WUFDdEIsUUFBUSxFQUFFLElBQUksQ0FBQyxPQUFPO1lBQ3RCLFNBQVMsRUFBRSxJQUFJLENBQUMsUUFBUTtZQUN4QixTQUFTLEVBQUUsSUFBSSxDQUFDLFFBQVE7U0FDekIsQ0FBQztRQUNGLElBQUksQ0FBQyxTQUFTLEdBQUcsV0FBVyxDQUFDO1FBQzdCLElBQUksQ0FBQyxTQUFTLEdBQUcsV0FBVyxDQUFDO1FBQzdCLElBQUksQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDO1FBQzNCLElBQUksQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDO0lBQzdCLENBQUM7Ozs7SUFFRCxvQ0FBTzs7O0lBQVA7UUFDRSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDckIsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQzNCLENBQUM7Ozs7O0lBRUQsc0NBQVM7Ozs7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Ozs7OztJQUN4Qix5Q0FBMkQ7Ozs7O0lBQzNELDZDQUFvRDs7Ozs7SUFDcEQsMENBQXFEOzs7OztJQUNyRCxzQ0FBNkM7Ozs7O0lBQzdDLHdDQU1FIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtHcmlkc3Rlckl0ZW19IGZyb20gJy4vZ3JpZHN0ZXJJdGVtLmludGVyZmFjZSc7XG5pbXBvcnQge0dyaWRzdGVySXRlbUNvbXBvbmVudEludGVyZmFjZX0gZnJvbSAnLi9ncmlkc3Rlckl0ZW1Db21wb25lbnQuaW50ZXJmYWNlJztcbmltcG9ydCB7R3JpZHN0ZXJDb21wb25lbnRJbnRlcmZhY2V9IGZyb20gJy4vZ3JpZHN0ZXIuaW50ZXJmYWNlJztcbmltcG9ydCB7R3JpZHN0ZXJDb21wb25lbnR9IGZyb20gJy4vZ3JpZHN0ZXIuY29tcG9uZW50JztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEdyaWRzdGVyUHVzaFJlc2l6ZSB7XG4gIHB1YmxpYyBmcm9tU291dGg6IHN0cmluZztcbiAgcHVibGljIGZyb21Ob3J0aDogc3RyaW5nO1xuICBwdWJsaWMgZnJvbUVhc3Q6IHN0cmluZztcbiAgcHVibGljIGZyb21XZXN0OiBzdHJpbmc7XG4gIHByaXZhdGUgcHVzaGVkSXRlbXM6IEFycmF5PEdyaWRzdGVySXRlbUNvbXBvbmVudEludGVyZmFjZT47XG4gIHByaXZhdGUgcHVzaGVkSXRlbXNQYXRoOiBBcnJheTxBcnJheTxHcmlkc3Rlckl0ZW0+PjtcbiAgcHJpdmF0ZSBncmlkc3Rlckl0ZW06IEdyaWRzdGVySXRlbUNvbXBvbmVudEludGVyZmFjZTtcbiAgcHJpdmF0ZSBncmlkc3RlcjogR3JpZHN0ZXJDb21wb25lbnRJbnRlcmZhY2U7XG4gIHByaXZhdGUgdHJ5UGF0dGVybjoge1xuICAgIGZyb21FYXN0OiBGdW5jdGlvbixcbiAgICBmcm9tV2VzdDogRnVuY3Rpb24sXG4gICAgZnJvbU5vcnRoOiBGdW5jdGlvbixcbiAgICBmcm9tU291dGg6IEZ1bmN0aW9uLFxuICAgIFtrZXk6IHN0cmluZ106IEZ1bmN0aW9uXG4gIH07XG5cbiAgY29uc3RydWN0b3IoZ3JpZHN0ZXJJdGVtOiBHcmlkc3Rlckl0ZW1Db21wb25lbnRJbnRlcmZhY2UpIHtcbiAgICB0aGlzLnB1c2hlZEl0ZW1zID0gW107XG4gICAgdGhpcy5wdXNoZWRJdGVtc1BhdGggPSBbXTtcbiAgICB0aGlzLmdyaWRzdGVySXRlbSA9IGdyaWRzdGVySXRlbTtcbiAgICB0aGlzLmdyaWRzdGVyID0gZ3JpZHN0ZXJJdGVtLmdyaWRzdGVyO1xuICAgIHRoaXMudHJ5UGF0dGVybiA9IHtcbiAgICAgIGZyb21FYXN0OiB0aGlzLnRyeVdlc3QsXG4gICAgICBmcm9tV2VzdDogdGhpcy50cnlFYXN0LFxuICAgICAgZnJvbU5vcnRoOiB0aGlzLnRyeVNvdXRoLFxuICAgICAgZnJvbVNvdXRoOiB0aGlzLnRyeU5vcnRoXG4gICAgfTtcbiAgICB0aGlzLmZyb21Tb3V0aCA9ICdmcm9tU291dGgnO1xuICAgIHRoaXMuZnJvbU5vcnRoID0gJ2Zyb21Ob3J0aCc7XG4gICAgdGhpcy5mcm9tRWFzdCA9ICdmcm9tRWFzdCc7XG4gICAgdGhpcy5mcm9tV2VzdCA9ICdmcm9tV2VzdCc7XG4gIH1cblxuICBkZXN0cm95KCk6IHZvaWQge1xuICAgIGRlbGV0ZSB0aGlzLmdyaWRzdGVyO1xuICAgIGRlbGV0ZSB0aGlzLmdyaWRzdGVySXRlbTtcbiAgfVxuXG4gIHB1c2hJdGVtcyhkaXJlY3Rpb246IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLmdyaWRzdGVyLiRvcHRpb25zLnB1c2hSZXNpemVJdGVtcykge1xuICAgICAgcmV0dXJuIHRoaXMucHVzaCh0aGlzLmdyaWRzdGVySXRlbSwgZGlyZWN0aW9uKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIHJlc3RvcmVJdGVtcygpOiB2b2lkIHtcbiAgICBsZXQgaSA9IDA7XG4gICAgY29uc3QgbDogbnVtYmVyID0gdGhpcy5wdXNoZWRJdGVtcy5sZW5ndGg7XG4gICAgbGV0IHB1c2hlZEl0ZW06IEdyaWRzdGVySXRlbUNvbXBvbmVudEludGVyZmFjZTtcbiAgICBmb3IgKDsgaSA8IGw7IGkrKykge1xuICAgICAgcHVzaGVkSXRlbSA9IHRoaXMucHVzaGVkSXRlbXNbaV07XG4gICAgICBwdXNoZWRJdGVtLiRpdGVtLnggPSBwdXNoZWRJdGVtLml0ZW0ueCB8fCAwO1xuICAgICAgcHVzaGVkSXRlbS4kaXRlbS55ID0gcHVzaGVkSXRlbS5pdGVtLnkgfHwgMDtcbiAgICAgIHB1c2hlZEl0ZW0uJGl0ZW0uY29scyA9IHB1c2hlZEl0ZW0uaXRlbS5jb2xzIHx8IDE7XG4gICAgICBwdXNoZWRJdGVtLiRpdGVtLnJvdyA9IHB1c2hlZEl0ZW0uaXRlbS5yb3cgfHwgMTtcbiAgICAgIHB1c2hlZEl0ZW0uc2V0U2l6ZSgpO1xuICAgIH1cbiAgICB0aGlzLnB1c2hlZEl0ZW1zID0gW107XG4gICAgdGhpcy5wdXNoZWRJdGVtc1BhdGggPSBbXTtcbiAgfVxuXG4gIHNldFB1c2hlZEl0ZW1zKCkge1xuICAgIGxldCBpID0gMDtcbiAgICBjb25zdCBsOiBudW1iZXIgPSB0aGlzLnB1c2hlZEl0ZW1zLmxlbmd0aDtcbiAgICBsZXQgcHVzaGVkSXRlbTogR3JpZHN0ZXJJdGVtQ29tcG9uZW50SW50ZXJmYWNlO1xuICAgIGZvciAoOyBpIDwgbDsgaSsrKSB7XG4gICAgICBwdXNoZWRJdGVtID0gdGhpcy5wdXNoZWRJdGVtc1tpXTtcbiAgICAgIHB1c2hlZEl0ZW0uY2hlY2tJdGVtQ2hhbmdlcyhwdXNoZWRJdGVtLiRpdGVtLCBwdXNoZWRJdGVtLml0ZW0pO1xuICAgIH1cbiAgICB0aGlzLnB1c2hlZEl0ZW1zID0gW107XG4gICAgdGhpcy5wdXNoZWRJdGVtc1BhdGggPSBbXTtcbiAgfVxuXG4gIGNoZWNrUHVzaEJhY2soKTogdm9pZCB7XG4gICAgbGV0IGk6IG51bWJlciA9IHRoaXMucHVzaGVkSXRlbXMubGVuZ3RoIC0gMTtcbiAgICBsZXQgY2hhbmdlID0gZmFsc2U7XG4gICAgZm9yICg7IGkgPiAtMTsgaS0tKSB7XG4gICAgICBpZiAodGhpcy5jaGVja1B1c2hlZEl0ZW0odGhpcy5wdXNoZWRJdGVtc1tpXSwgaSkpIHtcbiAgICAgICAgY2hhbmdlID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGNoYW5nZSkge1xuICAgICAgdGhpcy5jaGVja1B1c2hCYWNrKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBwdXNoKGdyaWRzdGVySXRlbTogR3JpZHN0ZXJJdGVtQ29tcG9uZW50SW50ZXJmYWNlLCBkaXJlY3Rpb246IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGdyaWRzdGVySXRlbUNvbGxpc2lvbjogYW55ID0gdGhpcy5ncmlkc3Rlci5jaGVja0NvbGxpc2lvbihncmlkc3Rlckl0ZW0uJGl0ZW0pO1xuICAgIGlmIChncmlkc3Rlckl0ZW1Db2xsaXNpb24gJiYgZ3JpZHN0ZXJJdGVtQ29sbGlzaW9uICE9PSB0cnVlICYmXG4gICAgICBncmlkc3Rlckl0ZW1Db2xsaXNpb24gIT09IHRoaXMuZ3JpZHN0ZXJJdGVtICYmIGdyaWRzdGVySXRlbUNvbGxpc2lvbi5jYW5CZVJlc2l6ZWQoKSkge1xuICAgICAgaWYgKHRoaXMudHJ5UGF0dGVybltkaXJlY3Rpb25dLmNhbGwodGhpcywgZ3JpZHN0ZXJJdGVtQ29sbGlzaW9uLCBncmlkc3Rlckl0ZW0sIGRpcmVjdGlvbikpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChncmlkc3Rlckl0ZW1Db2xsaXNpb24gPT09IGZhbHNlKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcHJpdmF0ZSB0cnlTb3V0aChncmlkc3Rlckl0ZW1Db2xsaWRlOiBHcmlkc3Rlckl0ZW1Db21wb25lbnRJbnRlcmZhY2UsIGdyaWRzdGVySXRlbTogR3JpZHN0ZXJJdGVtQ29tcG9uZW50SW50ZXJmYWNlLFxuICAgICAgICAgICAgICAgICAgIGRpcmVjdGlvbjogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgY29uc3QgYmFja1VwWSA9IGdyaWRzdGVySXRlbUNvbGxpZGUuJGl0ZW0ueTtcbiAgICBjb25zdCBiYWNrVXBSb3dzID0gZ3JpZHN0ZXJJdGVtQ29sbGlkZS4kaXRlbS5yb3dzO1xuICAgIGdyaWRzdGVySXRlbUNvbGxpZGUuJGl0ZW0ueSA9IGdyaWRzdGVySXRlbS4kaXRlbS55ICsgZ3JpZHN0ZXJJdGVtLiRpdGVtLnJvd3M7XG4gICAgZ3JpZHN0ZXJJdGVtQ29sbGlkZS4kaXRlbS5yb3dzID0gYmFja1VwUm93cyArIGJhY2tVcFkgLSBncmlkc3Rlckl0ZW1Db2xsaWRlLiRpdGVtLnk7XG4gICAgaWYgKCFHcmlkc3RlckNvbXBvbmVudC5jaGVja0NvbGxpc2lvblR3b0l0ZW1zKGdyaWRzdGVySXRlbUNvbGxpZGUuJGl0ZW0sIGdyaWRzdGVySXRlbS4kaXRlbSlcbiAgICAgICYmICF0aGlzLmdyaWRzdGVyLmNoZWNrR3JpZENvbGxpc2lvbihncmlkc3Rlckl0ZW1Db2xsaWRlLiRpdGVtKSkge1xuICAgICAgZ3JpZHN0ZXJJdGVtQ29sbGlkZS5zZXRTaXplKCk7XG4gICAgICB0aGlzLmFkZFRvUHVzaGVkKGdyaWRzdGVySXRlbUNvbGxpZGUpO1xuICAgICAgdGhpcy5wdXNoKGdyaWRzdGVySXRlbSwgZGlyZWN0aW9uKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBncmlkc3Rlckl0ZW1Db2xsaWRlLiRpdGVtLnkgPSBiYWNrVXBZO1xuICAgICAgZ3JpZHN0ZXJJdGVtQ29sbGlkZS4kaXRlbS5yb3dzID0gYmFja1VwUm93cztcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcHJpdmF0ZSB0cnlOb3J0aChncmlkc3Rlckl0ZW1Db2xsaWRlOiBHcmlkc3Rlckl0ZW1Db21wb25lbnRJbnRlcmZhY2UsIGdyaWRzdGVySXRlbTogR3JpZHN0ZXJJdGVtQ29tcG9uZW50SW50ZXJmYWNlLFxuICAgICAgICAgICAgICAgICAgIGRpcmVjdGlvbjogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgY29uc3QgYmFja1VwUm93cyA9IGdyaWRzdGVySXRlbUNvbGxpZGUuJGl0ZW0ucm93cztcbiAgICBncmlkc3Rlckl0ZW1Db2xsaWRlLiRpdGVtLnJvd3MgPSBncmlkc3Rlckl0ZW0uJGl0ZW0ueSAtIGdyaWRzdGVySXRlbUNvbGxpZGUuJGl0ZW0ueTtcbiAgICBpZiAoIUdyaWRzdGVyQ29tcG9uZW50LmNoZWNrQ29sbGlzaW9uVHdvSXRlbXMoZ3JpZHN0ZXJJdGVtQ29sbGlkZS4kaXRlbSwgZ3JpZHN0ZXJJdGVtLiRpdGVtKVxuICAgICAgJiYgIXRoaXMuZ3JpZHN0ZXIuY2hlY2tHcmlkQ29sbGlzaW9uKGdyaWRzdGVySXRlbUNvbGxpZGUuJGl0ZW0pKSB7XG4gICAgICBncmlkc3Rlckl0ZW1Db2xsaWRlLnNldFNpemUoKTtcbiAgICAgIHRoaXMuYWRkVG9QdXNoZWQoZ3JpZHN0ZXJJdGVtQ29sbGlkZSk7XG4gICAgICB0aGlzLnB1c2goZ3JpZHN0ZXJJdGVtLCBkaXJlY3Rpb24pO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGdyaWRzdGVySXRlbUNvbGxpZGUuJGl0ZW0ucm93cyA9IGJhY2tVcFJvd3M7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHByaXZhdGUgdHJ5RWFzdChncmlkc3Rlckl0ZW1Db2xsaWRlOiBHcmlkc3Rlckl0ZW1Db21wb25lbnRJbnRlcmZhY2UsIGdyaWRzdGVySXRlbTogR3JpZHN0ZXJJdGVtQ29tcG9uZW50SW50ZXJmYWNlLFxuICAgICAgICAgICAgICAgICAgZGlyZWN0aW9uOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICBjb25zdCBiYWNrVXBYID0gZ3JpZHN0ZXJJdGVtQ29sbGlkZS4kaXRlbS54O1xuICAgIGNvbnN0IGJhY2tVcENvbHMgPSBncmlkc3Rlckl0ZW1Db2xsaWRlLiRpdGVtLmNvbHM7XG4gICAgZ3JpZHN0ZXJJdGVtQ29sbGlkZS4kaXRlbS54ID0gZ3JpZHN0ZXJJdGVtLiRpdGVtLnggKyBncmlkc3Rlckl0ZW0uJGl0ZW0uY29scztcbiAgICBncmlkc3Rlckl0ZW1Db2xsaWRlLiRpdGVtLmNvbHMgPSBiYWNrVXBDb2xzICsgYmFja1VwWCAtIGdyaWRzdGVySXRlbUNvbGxpZGUuJGl0ZW0ueDtcbiAgICBpZiAoIUdyaWRzdGVyQ29tcG9uZW50LmNoZWNrQ29sbGlzaW9uVHdvSXRlbXMoZ3JpZHN0ZXJJdGVtQ29sbGlkZS4kaXRlbSwgZ3JpZHN0ZXJJdGVtLiRpdGVtKVxuICAgICAgJiYgIXRoaXMuZ3JpZHN0ZXIuY2hlY2tHcmlkQ29sbGlzaW9uKGdyaWRzdGVySXRlbUNvbGxpZGUuJGl0ZW0pKSB7XG4gICAgICBncmlkc3Rlckl0ZW1Db2xsaWRlLnNldFNpemUoKTtcbiAgICAgIHRoaXMuYWRkVG9QdXNoZWQoZ3JpZHN0ZXJJdGVtQ29sbGlkZSk7XG4gICAgICB0aGlzLnB1c2goZ3JpZHN0ZXJJdGVtLCBkaXJlY3Rpb24pO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGdyaWRzdGVySXRlbUNvbGxpZGUuJGl0ZW0ueCA9IGJhY2tVcFg7XG4gICAgICBncmlkc3Rlckl0ZW1Db2xsaWRlLiRpdGVtLmNvbHMgPSBiYWNrVXBDb2xzO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBwcml2YXRlIHRyeVdlc3QoZ3JpZHN0ZXJJdGVtQ29sbGlkZTogR3JpZHN0ZXJJdGVtQ29tcG9uZW50SW50ZXJmYWNlLCBncmlkc3Rlckl0ZW06IEdyaWRzdGVySXRlbUNvbXBvbmVudEludGVyZmFjZSxcbiAgICAgICAgICAgICAgICAgIGRpcmVjdGlvbjogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgY29uc3QgYmFja1VwQ29scyA9IGdyaWRzdGVySXRlbUNvbGxpZGUuJGl0ZW0uY29scztcbiAgICBncmlkc3Rlckl0ZW1Db2xsaWRlLiRpdGVtLmNvbHMgPSBncmlkc3Rlckl0ZW0uJGl0ZW0ueCAtIGdyaWRzdGVySXRlbUNvbGxpZGUuJGl0ZW0ueDtcbiAgICBpZiAoIUdyaWRzdGVyQ29tcG9uZW50LmNoZWNrQ29sbGlzaW9uVHdvSXRlbXMoZ3JpZHN0ZXJJdGVtQ29sbGlkZS4kaXRlbSwgZ3JpZHN0ZXJJdGVtLiRpdGVtKVxuICAgICAgJiYgIXRoaXMuZ3JpZHN0ZXIuY2hlY2tHcmlkQ29sbGlzaW9uKGdyaWRzdGVySXRlbUNvbGxpZGUuJGl0ZW0pKSB7XG4gICAgICBncmlkc3Rlckl0ZW1Db2xsaWRlLnNldFNpemUoKTtcbiAgICAgIHRoaXMuYWRkVG9QdXNoZWQoZ3JpZHN0ZXJJdGVtQ29sbGlkZSk7XG4gICAgICB0aGlzLnB1c2goZ3JpZHN0ZXJJdGVtLCBkaXJlY3Rpb24pO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGdyaWRzdGVySXRlbUNvbGxpZGUuJGl0ZW0uY29scyA9IGJhY2tVcENvbHM7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHByaXZhdGUgYWRkVG9QdXNoZWQoZ3JpZHN0ZXJJdGVtOiBHcmlkc3Rlckl0ZW1Db21wb25lbnRJbnRlcmZhY2UpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5wdXNoZWRJdGVtcy5pbmRleE9mKGdyaWRzdGVySXRlbSkgPCAwKSB7XG4gICAgICB0aGlzLnB1c2hlZEl0ZW1zLnB1c2goZ3JpZHN0ZXJJdGVtKTtcbiAgICAgIHRoaXMucHVzaGVkSXRlbXNQYXRoLnB1c2goW1xuICAgICAgICB7XG4gICAgICAgICAgeDogZ3JpZHN0ZXJJdGVtLml0ZW0ueCB8fCAwLFxuICAgICAgICAgIHk6IGdyaWRzdGVySXRlbS5pdGVtLnkgfHwgMCxcbiAgICAgICAgICBjb2xzOiBncmlkc3Rlckl0ZW0uaXRlbS5jb2xzIHx8IDAsXG4gICAgICAgICAgcm93czogZ3JpZHN0ZXJJdGVtLml0ZW0ucm93cyB8fCAwXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICB4OiBncmlkc3Rlckl0ZW0uJGl0ZW0ueCxcbiAgICAgICAgICB5OiBncmlkc3Rlckl0ZW0uJGl0ZW0ueSxcbiAgICAgICAgICBjb2xzOiBncmlkc3Rlckl0ZW0uJGl0ZW0uY29scyxcbiAgICAgICAgICByb3dzOiBncmlkc3Rlckl0ZW0uJGl0ZW0ucm93c1xuICAgICAgICB9XSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGkgPSB0aGlzLnB1c2hlZEl0ZW1zLmluZGV4T2YoZ3JpZHN0ZXJJdGVtKTtcbiAgICAgIHRoaXMucHVzaGVkSXRlbXNQYXRoW2ldLnB1c2goXG4gICAgICAgIHtcbiAgICAgICAgICB4OiBncmlkc3Rlckl0ZW0uJGl0ZW0ueCxcbiAgICAgICAgICB5OiBncmlkc3Rlckl0ZW0uJGl0ZW0ueSxcbiAgICAgICAgICBjb2xzOiBncmlkc3Rlckl0ZW0uJGl0ZW0uY29scyxcbiAgICAgICAgICByb3dzOiBncmlkc3Rlckl0ZW0uJGl0ZW0ucm93c1xuICAgICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHJlbW92ZUZyb21QdXNoZWQoaTogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKGkgPiAtMSkge1xuICAgICAgdGhpcy5wdXNoZWRJdGVtcy5zcGxpY2UoaSwgMSk7XG4gICAgICB0aGlzLnB1c2hlZEl0ZW1zUGF0aC5zcGxpY2UoaSwgMSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBjaGVja1B1c2hlZEl0ZW0ocHVzaGVkSXRlbTogR3JpZHN0ZXJJdGVtQ29tcG9uZW50SW50ZXJmYWNlLCBpOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICBjb25zdCBwYXRoID0gdGhpcy5wdXNoZWRJdGVtc1BhdGhbaV07XG4gICAgbGV0IGogPSBwYXRoLmxlbmd0aCAtIDI7XG4gICAgbGV0IGxhc3RQb3NpdGlvbjogeyB4OiBudW1iZXIsIHk6IG51bWJlciwgY29sczogbnVtYmVyLCByb3dzOiBudW1iZXIgfSwgeCwgeSwgY29scywgcm93cztcbiAgICBmb3IgKDsgaiA+IC0xOyBqLS0pIHtcbiAgICAgIGxhc3RQb3NpdGlvbiA9IHBhdGhbal07XG4gICAgICB4ID0gcHVzaGVkSXRlbS4kaXRlbS54O1xuICAgICAgeSA9IHB1c2hlZEl0ZW0uJGl0ZW0ueTtcbiAgICAgIGNvbHMgPSBwdXNoZWRJdGVtLiRpdGVtLmNvbHM7XG4gICAgICByb3dzID0gcHVzaGVkSXRlbS4kaXRlbS5yb3dzO1xuICAgICAgcHVzaGVkSXRlbS4kaXRlbS54ID0gbGFzdFBvc2l0aW9uLng7XG4gICAgICBwdXNoZWRJdGVtLiRpdGVtLnkgPSBsYXN0UG9zaXRpb24ueTtcbiAgICAgIHB1c2hlZEl0ZW0uJGl0ZW0uY29scyA9IGxhc3RQb3NpdGlvbi5jb2xzO1xuICAgICAgcHVzaGVkSXRlbS4kaXRlbS5yb3dzID0gbGFzdFBvc2l0aW9uLnJvd3M7XG4gICAgICBpZiAoIXRoaXMuZ3JpZHN0ZXIuZmluZEl0ZW1XaXRoSXRlbShwdXNoZWRJdGVtLiRpdGVtKSkge1xuICAgICAgICBwdXNoZWRJdGVtLnNldFNpemUoKTtcbiAgICAgICAgcGF0aC5zcGxpY2UoaiArIDEsIHBhdGgubGVuZ3RoIC0gMSAtIGopO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcHVzaGVkSXRlbS4kaXRlbS54ID0geDtcbiAgICAgICAgcHVzaGVkSXRlbS4kaXRlbS55ID0geTtcbiAgICAgICAgcHVzaGVkSXRlbS4kaXRlbS5jb2xzID0gY29scztcbiAgICAgICAgcHVzaGVkSXRlbS4kaXRlbS5yb3dzID0gcm93cztcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHBhdGgubGVuZ3RoIDwgMikge1xuICAgICAgdGhpcy5yZW1vdmVGcm9tUHVzaGVkKGkpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuIl19
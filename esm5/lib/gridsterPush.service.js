/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { GridsterItemComponentInterface } from './gridsterItemComponent.interface';
var GridsterPush = /** @class */ (function () {
    function GridsterPush(gridsterItem) {
        this.pushedItems = [];
        this.pushedItemsTemp = [];
        this.pushedItemsTempPath = [];
        this.pushedItemsPath = [];
        this.gridsterItem = gridsterItem;
        this.gridster = gridsterItem.gridster;
        this.tryPattern = {
            fromEast: [this.tryWest, this.trySouth, this.tryNorth, this.tryEast],
            fromWest: [this.tryEast, this.trySouth, this.tryNorth, this.tryWest],
            fromNorth: [this.trySouth, this.tryEast, this.tryWest, this.tryNorth],
            fromSouth: [this.tryNorth, this.tryEast, this.tryWest, this.trySouth]
        };
        this.fromSouth = 'fromSouth';
        this.fromNorth = 'fromNorth';
        this.fromEast = 'fromEast';
        this.fromWest = 'fromWest';
    }
    /**
     * @return {?}
     */
    GridsterPush.prototype.destroy = /**
     * @return {?}
     */
    function () {
        delete this.gridster;
        delete this.gridsterItem;
    };
    /**
     * @param {?} direction
     * @param {?=} disable
     * @return {?}
     */
    GridsterPush.prototype.pushItems = /**
     * @param {?} direction
     * @param {?=} disable
     * @return {?}
     */
    function (direction, disable) {
        if (this.gridster.$options.pushItems && !disable) {
            this.pushedItemsOrder = [];
            /** @type {?} */
            var pushed = this.push(this.gridsterItem, direction);
            if (!pushed) {
                this.restoreTempItems();
            }
            this.pushedItemsOrder = [];
            this.pushedItemsTemp = [];
            this.pushedItemsTempPath = [];
            return pushed;
        }
        else {
            return false;
        }
    };
    /**
     * @return {?}
     */
    GridsterPush.prototype.restoreTempItems = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var i = this.pushedItemsTemp.length - 1;
        for (; i > -1; i--) {
            this.removeFromTempPushed(this.pushedItemsTemp[i]);
        }
    };
    /**
     * @return {?}
     */
    GridsterPush.prototype.restoreItems = /**
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
            pushedItem.setSize();
        }
        this.pushedItems = [];
        this.pushedItemsPath = [];
    };
    /**
     * @return {?}
     */
    GridsterPush.prototype.setPushedItems = /**
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
    GridsterPush.prototype.checkPushBack = /**
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
    GridsterPush.prototype.push = /**
     * @private
     * @param {?} gridsterItem
     * @param {?} direction
     * @return {?}
     */
    function (gridsterItem, direction) {
        if (this.gridster.checkGridCollision(gridsterItem.$item)) {
            return false;
        }
        if (direction === '') {
            return false;
        }
        /** @type {?} */
        var a = this.gridster.findItemsWithItem(gridsterItem.$item);
        /** @type {?} */
        var i = a.length - 1;
        /** @type {?} */
        var itemCollision;
        /** @type {?} */
        var makePush = true;
        /** @type {?} */
        var b = [];
        for (; i > -1; i--) {
            itemCollision = a[i];
            if (itemCollision === this.gridsterItem) {
                makePush = false;
                break;
            }
            if (!itemCollision.canBeDragged()) {
                makePush = false;
                break;
            }
            /** @type {?} */
            var compare = this.pushedItemsTemp.find(function (el) {
                return el.$item.x === itemCollision.$item.x && el.$item.y === itemCollision.$item.y;
            });
            if (compare) {
                makePush = false;
                break;
            }
            if (this.tryPattern[direction][0].call(this, itemCollision, gridsterItem)) {
                this.pushedItemsOrder.push(itemCollision);
                b.push(itemCollision);
            }
            else if (this.tryPattern[direction][1].call(this, itemCollision, gridsterItem)) {
                this.pushedItemsOrder.push(itemCollision);
                b.push(itemCollision);
            }
            else if (this.tryPattern[direction][2].call(this, itemCollision, gridsterItem)) {
                this.pushedItemsOrder.push(itemCollision);
                b.push(itemCollision);
            }
            else if (this.tryPattern[direction][3].call(this, itemCollision, gridsterItem)) {
                this.pushedItemsOrder.push(itemCollision);
                b.push(itemCollision);
            }
            else {
                makePush = false;
                break;
            }
        }
        if (!makePush) {
            i = this.pushedItemsOrder.lastIndexOf(b[0]);
            if (i > -1) {
                /** @type {?} */
                var j = this.pushedItemsOrder.length - 1;
                for (; j >= i; j--) {
                    itemCollision = this.pushedItemsOrder[j];
                    this.pushedItemsOrder.pop();
                    this.removeFromTempPushed(itemCollision);
                    this.removeFromPushedItem(itemCollision);
                }
            }
        }
        return makePush;
    };
    /**
     * @private
     * @param {?} gridsterItemCollide
     * @param {?} gridsterItem
     * @return {?}
     */
    GridsterPush.prototype.trySouth = /**
     * @private
     * @param {?} gridsterItemCollide
     * @param {?} gridsterItem
     * @return {?}
     */
    function (gridsterItemCollide, gridsterItem) {
        if (!this.gridster.$options.pushDirections.south) {
            return false;
        }
        /** @type {?} */
        var dragLimit = gridsterItemCollide.dragLimit();
        if (dragLimit && dragLimit == "x")
            return false;
        this.addToTempPushed(gridsterItemCollide);
        gridsterItemCollide.$item.y = gridsterItem.$item.y + gridsterItem.$item.rows;
        if (this.push(gridsterItemCollide, this.fromNorth)) {
            gridsterItemCollide.setSize();
            this.addToPushed(gridsterItemCollide);
            return true;
        }
        else {
            this.removeFromTempPushed(gridsterItemCollide);
        }
        return false;
    };
    /**
     * @private
     * @param {?} gridsterItemCollide
     * @param {?} gridsterItem
     * @return {?}
     */
    GridsterPush.prototype.tryNorth = /**
     * @private
     * @param {?} gridsterItemCollide
     * @param {?} gridsterItem
     * @return {?}
     */
    function (gridsterItemCollide, gridsterItem) {
        if (!this.gridster.$options.pushDirections.north) {
            return false;
        }
        /** @type {?} */
        var dragLimit = gridsterItemCollide.dragLimit();
        if (dragLimit && dragLimit == "x")
            return false;
        this.addToTempPushed(gridsterItemCollide);
        gridsterItemCollide.$item.y = gridsterItem.$item.y - gridsterItemCollide.$item.rows;
        if (this.push(gridsterItemCollide, this.fromSouth)) {
            gridsterItemCollide.setSize();
            this.addToPushed(gridsterItemCollide);
            return true;
        }
        else {
            this.removeFromTempPushed(gridsterItemCollide);
        }
        return false;
    };
    /**
     * @private
     * @param {?} gridsterItemCollide
     * @param {?} gridsterItem
     * @return {?}
     */
    GridsterPush.prototype.tryEast = /**
     * @private
     * @param {?} gridsterItemCollide
     * @param {?} gridsterItem
     * @return {?}
     */
    function (gridsterItemCollide, gridsterItem) {
        if (!this.gridster.$options.pushDirections.east) {
            return false;
        }
        /** @type {?} */
        var dragLimit = gridsterItemCollide.dragLimit();
        if (dragLimit && dragLimit == "y")
            return false;
        this.addToTempPushed(gridsterItemCollide);
        gridsterItemCollide.$item.x = gridsterItem.$item.x + gridsterItem.$item.cols;
        if (this.push(gridsterItemCollide, this.fromWest)) {
            gridsterItemCollide.setSize();
            this.addToPushed(gridsterItemCollide);
            return true;
        }
        else {
            this.removeFromTempPushed(gridsterItemCollide);
        }
        return false;
    };
    /**
     * @private
     * @param {?} gridsterItemCollide
     * @param {?} gridsterItem
     * @return {?}
     */
    GridsterPush.prototype.tryWest = /**
     * @private
     * @param {?} gridsterItemCollide
     * @param {?} gridsterItem
     * @return {?}
     */
    function (gridsterItemCollide, gridsterItem) {
        if (!this.gridster.$options.pushDirections.west) {
            return false;
        }
        /** @type {?} */
        var dragLimit = gridsterItemCollide.dragLimit();
        if (dragLimit && dragLimit == "y")
            return false;
        this.addToTempPushed(gridsterItemCollide);
        gridsterItemCollide.$item.x = gridsterItem.$item.x - gridsterItemCollide.$item.cols;
        if (this.push(gridsterItemCollide, this.fromEast)) {
            gridsterItemCollide.setSize();
            this.addToPushed(gridsterItemCollide);
            return true;
        }
        else {
            this.removeFromTempPushed(gridsterItemCollide);
        }
        return false;
    };
    /**
     * @private
     * @param {?} gridsterItem
     * @return {?}
     */
    GridsterPush.prototype.addToTempPushed = /**
     * @private
     * @param {?} gridsterItem
     * @return {?}
     */
    function (gridsterItem) {
        /** @type {?} */
        var i = this.pushedItemsTemp.indexOf(gridsterItem);
        if (i === -1) {
            i = this.pushedItemsTemp.push(gridsterItem) - 1;
            this.pushedItemsTempPath[i] = [];
        }
        this.pushedItemsTempPath[i].push({ x: gridsterItem.$item.x, y: gridsterItem.$item.y });
    };
    /**
     * @private
     * @param {?} gridsterItem
     * @return {?}
     */
    GridsterPush.prototype.removeFromTempPushed = /**
     * @private
     * @param {?} gridsterItem
     * @return {?}
     */
    function (gridsterItem) {
        /** @type {?} */
        var i = this.pushedItemsTemp.indexOf(gridsterItem);
        /** @type {?} */
        var tempPosition = this.pushedItemsTempPath[i].pop();
        if (!tempPosition) {
            return;
        }
        gridsterItem.$item.x = tempPosition.x;
        gridsterItem.$item.y = tempPosition.y;
        gridsterItem.setSize();
        if (!this.pushedItemsTempPath[i].length) {
            this.pushedItemsTemp.splice(i, 1);
            this.pushedItemsTempPath.splice(i, 1);
        }
    };
    /**
     * @private
     * @param {?} gridsterItem
     * @return {?}
     */
    GridsterPush.prototype.addToPushed = /**
     * @private
     * @param {?} gridsterItem
     * @return {?}
     */
    function (gridsterItem) {
        if (this.pushedItems.indexOf(gridsterItem) < 0) {
            this.pushedItems.push(gridsterItem);
            this.pushedItemsPath.push([{ x: gridsterItem.item.x || 0, y: gridsterItem.item.y || 0 },
                { x: gridsterItem.$item.x, y: gridsterItem.$item.y }]);
        }
        else {
            /** @type {?} */
            var i = this.pushedItems.indexOf(gridsterItem);
            this.pushedItemsPath[i].push({ x: gridsterItem.$item.x, y: gridsterItem.$item.y });
        }
    };
    /**
     * @private
     * @param {?} i
     * @return {?}
     */
    GridsterPush.prototype.removeFromPushed = /**
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
     * @param {?} gridsterItem
     * @return {?}
     */
    GridsterPush.prototype.removeFromPushedItem = /**
     * @private
     * @param {?} gridsterItem
     * @return {?}
     */
    function (gridsterItem) {
        /** @type {?} */
        var i = this.pushedItems.indexOf(gridsterItem);
        if (i > -1) {
            this.pushedItemsPath[i].pop();
            if (!this.pushedItemsPath.length) {
                this.pushedItems.splice(i, 1);
                this.pushedItemsPath.splice(i, 1);
            }
        }
    };
    /**
     * @private
     * @param {?} pushedItem
     * @param {?} i
     * @return {?}
     */
    GridsterPush.prototype.checkPushedItem = /**
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
        var change = false;
        for (; j > -1; j--) {
            lastPosition = path[j];
            x = pushedItem.$item.x;
            y = pushedItem.$item.y;
            pushedItem.$item.x = lastPosition.x;
            pushedItem.$item.y = lastPosition.y;
            if (!this.gridster.findItemWithItem(pushedItem.$item)) {
                pushedItem.setSize();
                path.splice(j + 1, path.length - j - 1);
                change = true;
            }
            else {
                pushedItem.$item.x = x;
                pushedItem.$item.y = y;
            }
        }
        if (path.length < 2) {
            this.removeFromPushed(i);
        }
        return change;
    };
    GridsterPush.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    GridsterPush.ctorParameters = function () { return [
        { type: GridsterItemComponentInterface }
    ]; };
    return GridsterPush;
}());
export { GridsterPush };
if (false) {
    /** @type {?} */
    GridsterPush.prototype.fromSouth;
    /** @type {?} */
    GridsterPush.prototype.fromNorth;
    /** @type {?} */
    GridsterPush.prototype.fromEast;
    /** @type {?} */
    GridsterPush.prototype.fromWest;
    /**
     * @type {?}
     * @private
     */
    GridsterPush.prototype.pushedItems;
    /**
     * @type {?}
     * @private
     */
    GridsterPush.prototype.pushedItemsTemp;
    /**
     * @type {?}
     * @private
     */
    GridsterPush.prototype.pushedItemsTempPath;
    /**
     * @type {?}
     * @private
     */
    GridsterPush.prototype.pushedItemsPath;
    /**
     * @type {?}
     * @private
     */
    GridsterPush.prototype.gridsterItem;
    /**
     * @type {?}
     * @private
     */
    GridsterPush.prototype.gridster;
    /**
     * @type {?}
     * @private
     */
    GridsterPush.prototype.pushedItemsOrder;
    /**
     * @type {?}
     * @private
     */
    GridsterPush.prototype.tryPattern;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZHN0ZXJQdXNoLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWdyaWRzdGVyMi8iLCJzb3VyY2VzIjpbImxpYi9ncmlkc3RlclB1c2guc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUV6QyxPQUFPLEVBQUMsOEJBQThCLEVBQUMsTUFBTSxtQ0FBbUMsQ0FBQztBQUdqRjtJQXFCRSxzQkFBWSxZQUE0QztRQUN0RCxJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsZUFBZSxHQUFHLEVBQUUsQ0FBQztRQUMxQixJQUFJLENBQUMsbUJBQW1CLEdBQUcsRUFBRSxDQUFDO1FBQzlCLElBQUksQ0FBQyxlQUFlLEdBQUcsRUFBRSxDQUFDO1FBQzFCLElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxRQUFRLEdBQUcsWUFBWSxDQUFDLFFBQVEsQ0FBQztRQUN0QyxJQUFJLENBQUMsVUFBVSxHQUFHO1lBQ2hCLFFBQVEsRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDcEUsUUFBUSxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNwRSxTQUFTLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDO1lBQ3JFLFNBQVMsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFF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QUN4QjtTQUNGO1FBQ0QsSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUNuQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDMUI7UUFDRCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDOztnQkE1VEYsVUFBVTs7OztnQkFISCw4QkFBOEI7O0lBZ1V0QyxtQkFBQztDQUFBLEFBN1RELElBNlRDO1NBNVRZLFlBQVk7OztJQUN2QixpQ0FBeUI7O0lBQ3pCLGlDQUF5Qjs7SUFDekIsZ0NBQXdCOztJQUN4QixnQ0FBd0I7Ozs7O0lBQ3hCLG1DQUEyRDs7Ozs7SUFDM0QsdUNBQStEOzs7OztJQUMvRCwyQ0FBb0U7Ozs7O0lBQ3BFLHVDQUFnRTs7Ozs7SUFDaEUsb0NBQXFEOzs7OztJQUNyRCxnQ0FBNkM7Ozs7O0lBQzdDLHdDQUFnRTs7Ozs7SUFDaEUsa0NBTUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge0dyaWRzdGVySXRlbUNvbXBvbmVudEludGVyZmFjZX0gZnJvbSAnLi9ncmlkc3Rlckl0ZW1Db21wb25lbnQuaW50ZXJmYWNlJztcbmltcG9ydCB7R3JpZHN0ZXJDb21wb25lbnRJbnRlcmZhY2V9IGZyb20gJy4vZ3JpZHN0ZXIuaW50ZXJmYWNlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEdyaWRzdGVyUHVzaCB7XG4gIHB1YmxpYyBmcm9tU291dGg6IHN0cmluZztcbiAgcHVibGljIGZyb21Ob3J0aDogc3RyaW5nO1xuICBwdWJsaWMgZnJvbUVhc3Q6IHN0cmluZztcbiAgcHVibGljIGZyb21XZXN0OiBzdHJpbmc7XG4gIHByaXZhdGUgcHVzaGVkSXRlbXM6IEFycmF5PEdyaWRzdGVySXRlbUNvbXBvbmVudEludGVyZmFjZT47XG4gIHByaXZhdGUgcHVzaGVkSXRlbXNUZW1wOiBBcnJheTxHcmlkc3Rlckl0ZW1Db21wb25lbnRJbnRlcmZhY2U+O1xuICBwcml2YXRlIHB1c2hlZEl0ZW1zVGVtcFBhdGg6IEFycmF5PEFycmF5PHsgeDogbnVtYmVyLCB5OiBudW1iZXIgfT4+O1xuICBwcml2YXRlIHB1c2hlZEl0ZW1zUGF0aDogQXJyYXk8QXJyYXk8eyB4OiBudW1iZXIsIHk6IG51bWJlciB9Pj47XG4gIHByaXZhdGUgZ3JpZHN0ZXJJdGVtOiBHcmlkc3Rlckl0ZW1Db21wb25lbnRJbnRlcmZhY2U7XG4gIHByaXZhdGUgZ3JpZHN0ZXI6IEdyaWRzdGVyQ29tcG9uZW50SW50ZXJmYWNlO1xuICBwcml2YXRlIHB1c2hlZEl0ZW1zT3JkZXI6IEFycmF5PEdyaWRzdGVySXRlbUNvbXBvbmVudEludGVyZmFjZT47XG4gIHByaXZhdGUgdHJ5UGF0dGVybjoge1xuICAgIGZyb21FYXN0OiBBcnJheTxGdW5jdGlvbj4sXG4gICAgZnJvbVdlc3Q6IEFycmF5PEZ1bmN0aW9uPixcbiAgICBmcm9tTm9ydGg6IEFycmF5PEZ1bmN0aW9uPixcbiAgICBmcm9tU291dGg6IEFycmF5PEZ1bmN0aW9uPixcbiAgICBba2V5OiBzdHJpbmddOiBBcnJheTxGdW5jdGlvbj5cbiAgfTtcblxuICBjb25zdHJ1Y3Rvcihncmlkc3Rlckl0ZW06IEdyaWRzdGVySXRlbUNvbXBvbmVudEludGVyZmFjZSkge1xuICAgIHRoaXMucHVzaGVkSXRlbXMgPSBbXTtcbiAgICB0aGlzLnB1c2hlZEl0ZW1zVGVtcCA9IFtdO1xuICAgIHRoaXMucHVzaGVkSXRlbXNUZW1wUGF0aCA9IFtdO1xuICAgIHRoaXMucHVzaGVkSXRlbXNQYXRoID0gW107XG4gICAgdGhpcy5ncmlkc3Rlckl0ZW0gPSBncmlkc3Rlckl0ZW07XG4gICAgdGhpcy5ncmlkc3RlciA9IGdyaWRzdGVySXRlbS5ncmlkc3RlcjtcbiAgICB0aGlzLnRyeVBhdHRlcm4gPSB7XG4gICAgICBmcm9tRWFzdDogW3RoaXMudHJ5V2VzdCwgdGhpcy50cnlTb3V0aCwgdGhpcy50cnlOb3J0aCwgdGhpcy50cnlFYXN0XSxcbiAgICAgIGZyb21XZXN0OiBbdGhpcy50cnlFYXN0LCB0aGlzLnRyeVNvdXRoLCB0aGlzLnRyeU5vcnRoLCB0aGlzLnRyeVdlc3RdLFxuICAgICAgZnJvbU5vcnRoOiBbdGhpcy50cnlTb3V0aCwgdGhpcy50cnlFYXN0LCB0aGlzLnRyeVdlc3QsIHRoaXMudHJ5Tm9ydGhdLFxuICAgICAgZnJvbVNvdXRoOiBbdGhpcy50cnlOb3J0aCwgdGhpcy50cnlFYXN0LCB0aGlzLnRyeVdlc3QsIHRoaXMudHJ5U291dGhdXG4gICAgfTtcbiAgICB0aGlzLmZyb21Tb3V0aCA9ICdmcm9tU291dGgnO1xuICAgIHRoaXMuZnJvbU5vcnRoID0gJ2Zyb21Ob3J0aCc7XG4gICAgdGhpcy5mcm9tRWFzdCA9ICdmcm9tRWFzdCc7XG4gICAgdGhpcy5mcm9tV2VzdCA9ICdmcm9tV2VzdCc7XG4gIH1cblxuICBkZXN0cm95KCk6IHZvaWQge1xuICAgIGRlbGV0ZSB0aGlzLmdyaWRzdGVyO1xuICAgIGRlbGV0ZSB0aGlzLmdyaWRzdGVySXRlbTtcbiAgfVxuXG4gIHB1c2hJdGVtcyhkaXJlY3Rpb246IHN0cmluZywgZGlzYWJsZT86IGJvb2xlYW4pOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy5ncmlkc3Rlci4kb3B0aW9ucy5wdXNoSXRlbXMgJiYgIWRpc2FibGUpIHtcbiAgICAgIHRoaXMucHVzaGVkSXRlbXNPcmRlciA9IFtdO1xuICAgICAgY29uc3QgcHVzaGVkID0gdGhpcy5wdXNoKHRoaXMuZ3JpZHN0ZXJJdGVtLCBkaXJlY3Rpb24pO1xuICAgICAgaWYgKCFwdXNoZWQpIHtcbiAgICAgICAgdGhpcy5yZXN0b3JlVGVtcEl0ZW1zKCk7XG4gICAgICB9XG4gICAgICB0aGlzLnB1c2hlZEl0ZW1zT3JkZXIgPSBbXTtcbiAgICAgIHRoaXMucHVzaGVkSXRlbXNUZW1wID0gW107XG4gICAgICB0aGlzLnB1c2hlZEl0ZW1zVGVtcFBhdGggPSBbXTtcbiAgICAgIHJldHVybiBwdXNoZWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICByZXN0b3JlVGVtcEl0ZW1zKCk6IHZvaWQge1xuICAgIGxldCBpID0gdGhpcy5wdXNoZWRJdGVtc1RlbXAubGVuZ3RoIC0gMTtcbiAgICBmb3IgKDsgaSA+IC0xOyBpLS0pIHtcbiAgICAgIHRoaXMucmVtb3ZlRnJvbVRlbXBQdXNoZWQodGhpcy5wdXNoZWRJdGVtc1RlbXBbaV0pO1xuICAgIH1cbiAgfVxuXG4gIHJlc3RvcmVJdGVtcygpOiB2b2lkIHtcbiAgICBsZXQgaSA9IDA7XG4gICAgY29uc3QgbDogbnVtYmVyID0gdGhpcy5wdXNoZWRJdGVtcy5sZW5ndGg7XG4gICAgbGV0IHB1c2hlZEl0ZW06IEdyaWRzdGVySXRlbUNvbXBvbmVudEludGVyZmFjZTtcbiAgICBmb3IgKDsgaSA8IGw7IGkrKykge1xuICAgICAgcHVzaGVkSXRlbSA9IHRoaXMucHVzaGVkSXRlbXNbaV07XG4gICAgICBwdXNoZWRJdGVtLiRpdGVtLnggPSBwdXNoZWRJdGVtLml0ZW0ueCB8fCAwO1xuICAgICAgcHVzaGVkSXRlbS4kaXRlbS55ID0gcHVzaGVkSXRlbS5pdGVtLnkgfHwgMDtcbiAgICAgIHB1c2hlZEl0ZW0uc2V0U2l6ZSgpO1xuICAgIH1cbiAgICB0aGlzLnB1c2hlZEl0ZW1zID0gW107XG4gICAgdGhpcy5wdXNoZWRJdGVtc1BhdGggPSBbXTtcbiAgfVxuXG4gIHNldFB1c2hlZEl0ZW1zKCkge1xuICAgIGxldCBpID0gMDtcbiAgICBjb25zdCBsOiBudW1iZXIgPSB0aGlzLnB1c2hlZEl0ZW1zLmxlbmd0aDtcbiAgICBsZXQgcHVzaGVkSXRlbTogR3JpZHN0ZXJJdGVtQ29tcG9uZW50SW50ZXJmYWNlO1xuICAgIGZvciAoOyBpIDwgbDsgaSsrKSB7XG4gICAgICBwdXNoZWRJdGVtID0gdGhpcy5wdXNoZWRJdGVtc1tpXTtcbiAgICAgIHB1c2hlZEl0ZW0uY2hlY2tJdGVtQ2hhbmdlcyhwdXNoZWRJdGVtLiRpdGVtLCBwdXNoZWRJdGVtLml0ZW0pO1xuICAgIH1cbiAgICB0aGlzLnB1c2hlZEl0ZW1zID0gW107XG4gICAgdGhpcy5wdXNoZWRJdGVtc1BhdGggPSBbXTtcbiAgfVxuXG4gIGNoZWNrUHVzaEJhY2soKTogdm9pZCB7XG4gICAgbGV0IGk6IG51bWJlciA9IHRoaXMucHVzaGVkSXRlbXMubGVuZ3RoIC0gMTtcbiAgICBsZXQgY2hhbmdlID0gZmFsc2U7XG4gICAgZm9yICg7IGkgPiAtMTsgaS0tKSB7XG4gICAgICBpZiAodGhpcy5jaGVja1B1c2hlZEl0ZW0odGhpcy5wdXNoZWRJdGVtc1tpXSwgaSkpIHtcbiAgICAgICAgY2hhbmdlID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGNoYW5nZSkge1xuICAgICAgdGhpcy5jaGVja1B1c2hCYWNrKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBwdXNoKGdyaWRzdGVySXRlbTogR3JpZHN0ZXJJdGVtQ29tcG9uZW50SW50ZXJmYWNlLCBkaXJlY3Rpb246IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLmdyaWRzdGVyLmNoZWNrR3JpZENvbGxpc2lvbihncmlkc3Rlckl0ZW0uJGl0ZW0pKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmIChkaXJlY3Rpb24gPT09ICcnKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGNvbnN0IGE6IEFycmF5PEdyaWRzdGVySXRlbUNvbXBvbmVudEludGVyZmFjZT4gPSB0aGlzLmdyaWRzdGVyLmZpbmRJdGVtc1dpdGhJdGVtKGdyaWRzdGVySXRlbS4kaXRlbSk7XG4gICAgbGV0IGkgPSBhLmxlbmd0aCAtIDEsIGl0ZW1Db2xsaXNpb246IEdyaWRzdGVySXRlbUNvbXBvbmVudEludGVyZmFjZTtcbiAgICBsZXQgbWFrZVB1c2ggPSB0cnVlO1xuICAgIGNvbnN0IGI6IEFycmF5PEdyaWRzdGVySXRlbUNvbXBvbmVudEludGVyZmFjZT4gPSBbXTtcbiAgICBmb3IgKDsgaSA+IC0xOyBpLS0pIHtcbiAgICAgIGl0ZW1Db2xsaXNpb24gPSBhW2ldO1xuICAgICAgaWYgKGl0ZW1Db2xsaXNpb24gPT09IHRoaXMuZ3JpZHN0ZXJJdGVtKSB7XG4gICAgICAgIG1ha2VQdXNoID0gZmFsc2U7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgaWYgKCFpdGVtQ29sbGlzaW9uLmNhbkJlRHJhZ2dlZCgpKSB7XG4gICAgICAgIG1ha2VQdXNoID0gZmFsc2U7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY29uc3QgY29tcGFyZSA9IHRoaXMucHVzaGVkSXRlbXNUZW1wLmZpbmQoKGVsOiBHcmlkc3Rlckl0ZW1Db21wb25lbnRJbnRlcmZhY2UpID0+IHtcbiAgICAgICAgcmV0dXJuIGVsLiRpdGVtLnggPT09IGl0ZW1Db2xsaXNpb24uJGl0ZW0ueCAmJiBlbC4kaXRlbS55ID09PSBpdGVtQ29sbGlzaW9uLiRpdGVtLnk7XG4gICAgICB9KTtcbiAgICAgIGlmIChjb21wYXJlKSB7XG4gICAgICAgIG1ha2VQdXNoID0gZmFsc2U7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMudHJ5UGF0dGVybltkaXJlY3Rpb25dWzBdLmNhbGwodGhpcywgaXRlbUNvbGxpc2lvbiwgZ3JpZHN0ZXJJdGVtKSkge1xuICAgICAgICB0aGlzLnB1c2hlZEl0ZW1zT3JkZXIucHVzaChpdGVtQ29sbGlzaW9uKTtcbiAgICAgICAgYi5wdXNoKGl0ZW1Db2xsaXNpb24pO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLnRyeVBhdHRlcm5bZGlyZWN0aW9uXVsxXS5jYWxsKHRoaXMsIGl0ZW1Db2xsaXNpb24sIGdyaWRzdGVySXRlbSkpIHtcbiAgICAgICAgdGhpcy5wdXNoZWRJdGVtc09yZGVyLnB1c2goaXRlbUNvbGxpc2lvbik7XG4gICAgICAgIGIucHVzaChpdGVtQ29sbGlzaW9uKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy50cnlQYXR0ZXJuW2RpcmVjdGlvbl1bMl0uY2FsbCh0aGlzLCBpdGVtQ29sbGlzaW9uLCBncmlkc3Rlckl0ZW0pKSB7XG4gICAgICAgIHRoaXMucHVzaGVkSXRlbXNPcmRlci5wdXNoKGl0ZW1Db2xsaXNpb24pO1xuICAgICAgICBiLnB1c2goaXRlbUNvbGxpc2lvbik7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMudHJ5UGF0dGVybltkaXJlY3Rpb25dWzNdLmNhbGwodGhpcywgaXRlbUNvbGxpc2lvbiwgZ3JpZHN0ZXJJdGVtKSkge1xuICAgICAgICB0aGlzLnB1c2hlZEl0ZW1zT3JkZXIucHVzaChpdGVtQ29sbGlzaW9uKTtcbiAgICAgICAgYi5wdXNoKGl0ZW1Db2xsaXNpb24pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbWFrZVB1c2ggPSBmYWxzZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICghbWFrZVB1c2gpIHtcbiAgICAgIGkgPSB0aGlzLnB1c2hlZEl0ZW1zT3JkZXIubGFzdEluZGV4T2YoYlswXSk7XG4gICAgICBpZiAoaSA+IC0xKSB7XG4gICAgICAgIGxldCBqID0gdGhpcy5wdXNoZWRJdGVtc09yZGVyLmxlbmd0aCAtIDE7XG4gICAgICAgIGZvciAoOyBqID49IGk7IGotLSkge1xuICAgICAgICAgIGl0ZW1Db2xsaXNpb24gPSB0aGlzLnB1c2hlZEl0ZW1zT3JkZXJbal07XG4gICAgICAgICAgdGhpcy5wdXNoZWRJdGVtc09yZGVyLnBvcCgpO1xuICAgICAgICAgIHRoaXMucmVtb3ZlRnJvbVRlbXBQdXNoZWQoaXRlbUNvbGxpc2lvbik7XG4gICAgICAgICAgdGhpcy5yZW1vdmVGcm9tUHVzaGVkSXRlbShpdGVtQ29sbGlzaW9uKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbWFrZVB1c2g7XG4gIH1cblxuICBwcml2YXRlIHRyeVNvdXRoKGdyaWRzdGVySXRlbUNvbGxpZGU6IEdyaWRzdGVySXRlbUNvbXBvbmVudEludGVyZmFjZSwgZ3JpZHN0ZXJJdGVtOiBHcmlkc3Rlckl0ZW1Db21wb25lbnRJbnRlcmZhY2UpOiBib29sZWFuIHtcbiAgICBpZiAoIXRoaXMuZ3JpZHN0ZXIuJG9wdGlvbnMucHVzaERpcmVjdGlvbnMuc291dGgpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgbGV0IGRyYWdMaW1pdCA9IGdyaWRzdGVySXRlbUNvbGxpZGUuZHJhZ0xpbWl0KCk7XG5cdGlmKGRyYWdMaW1pdCAmJiBkcmFnTGltaXQgPT0gXCJ4XCIpIHJldHVybiBmYWxzZTtcbiAgICB0aGlzLmFkZFRvVGVtcFB1c2hlZChncmlkc3Rlckl0ZW1Db2xsaWRlKTtcbiAgICBncmlkc3Rlckl0ZW1Db2xsaWRlLiRpdGVtLnkgPSBncmlkc3Rlckl0ZW0uJGl0ZW0ueSArIGdyaWRzdGVySXRlbS4kaXRlbS5yb3dzO1xuICAgIGlmICh0aGlzLnB1c2goZ3JpZHN0ZXJJdGVtQ29sbGlkZSwgdGhpcy5mcm9tTm9ydGgpKSB7XG4gICAgICBncmlkc3Rlckl0ZW1Db2xsaWRlLnNldFNpemUoKTtcbiAgICAgIHRoaXMuYWRkVG9QdXNoZWQoZ3JpZHN0ZXJJdGVtQ29sbGlkZSk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5yZW1vdmVGcm9tVGVtcFB1c2hlZChncmlkc3Rlckl0ZW1Db2xsaWRlKTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcHJpdmF0ZSB0cnlOb3J0aChncmlkc3Rlckl0ZW1Db2xsaWRlOiBHcmlkc3Rlckl0ZW1Db21wb25lbnRJbnRlcmZhY2UsIGdyaWRzdGVySXRlbTogR3JpZHN0ZXJJdGVtQ29tcG9uZW50SW50ZXJmYWNlKTogYm9vbGVhbiB7XG4gICAgaWYgKCF0aGlzLmdyaWRzdGVyLiRvcHRpb25zLnB1c2hEaXJlY3Rpb25zLm5vcnRoKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGxldCBkcmFnTGltaXQgPSBncmlkc3Rlckl0ZW1Db2xsaWRlLmRyYWdMaW1pdCgpO1xuXHRpZihkcmFnTGltaXQgJiYgZHJhZ0xpbWl0ID09IFwieFwiKSByZXR1cm4gZmFsc2U7XG4gICAgdGhpcy5hZGRUb1RlbXBQdXNoZWQoZ3JpZHN0ZXJJdGVtQ29sbGlkZSk7XG4gICAgZ3JpZHN0ZXJJdGVtQ29sbGlkZS4kaXRlbS55ID0gZ3JpZHN0ZXJJdGVtLiRpdGVtLnkgLSBncmlkc3Rlckl0ZW1Db2xsaWRlLiRpdGVtLnJvd3M7XG4gICAgaWYgKHRoaXMucHVzaChncmlkc3Rlckl0ZW1Db2xsaWRlLCB0aGlzLmZyb21Tb3V0aCkpIHtcbiAgICAgIGdyaWRzdGVySXRlbUNvbGxpZGUuc2V0U2l6ZSgpO1xuICAgICAgdGhpcy5hZGRUb1B1c2hlZChncmlkc3Rlckl0ZW1Db2xsaWRlKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJlbW92ZUZyb21UZW1wUHVzaGVkKGdyaWRzdGVySXRlbUNvbGxpZGUpO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBwcml2YXRlIHRyeUVhc3QoZ3JpZHN0ZXJJdGVtQ29sbGlkZTogR3JpZHN0ZXJJdGVtQ29tcG9uZW50SW50ZXJmYWNlLCBncmlkc3Rlckl0ZW06IEdyaWRzdGVySXRlbUNvbXBvbmVudEludGVyZmFjZSk6IGJvb2xlYW4ge1xuICAgIGlmICghdGhpcy5ncmlkc3Rlci4kb3B0aW9ucy5wdXNoRGlyZWN0aW9ucy5lYXN0KSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGxldCBkcmFnTGltaXQgPSBncmlkc3Rlckl0ZW1Db2xsaWRlLmRyYWdMaW1pdCgpO1xuXHRpZihkcmFnTGltaXQgJiYgZHJhZ0xpbWl0ID09IFwieVwiKSByZXR1cm4gZmFsc2U7XG4gICAgdGhpcy5hZGRUb1RlbXBQdXNoZWQoZ3JpZHN0ZXJJdGVtQ29sbGlkZSk7XG4gICAgZ3JpZHN0ZXJJdGVtQ29sbGlkZS4kaXRlbS54ID0gZ3JpZHN0ZXJJdGVtLiRpdGVtLnggKyBncmlkc3Rlckl0ZW0uJGl0ZW0uY29scztcbiAgICBpZiAodGhpcy5wdXNoKGdyaWRzdGVySXRlbUNvbGxpZGUsIHRoaXMuZnJvbVdlc3QpKSB7XG4gICAgICBncmlkc3Rlckl0ZW1Db2xsaWRlLnNldFNpemUoKTtcbiAgICAgIHRoaXMuYWRkVG9QdXNoZWQoZ3JpZHN0ZXJJdGVtQ29sbGlkZSk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5yZW1vdmVGcm9tVGVtcFB1c2hlZChncmlkc3Rlckl0ZW1Db2xsaWRlKTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcHJpdmF0ZSB0cnlXZXN0KGdyaWRzdGVySXRlbUNvbGxpZGU6IEdyaWRzdGVySXRlbUNvbXBvbmVudEludGVyZmFjZSwgZ3JpZHN0ZXJJdGVtOiBHcmlkc3Rlckl0ZW1Db21wb25lbnRJbnRlcmZhY2UpOiBib29sZWFuIHtcbiAgICBpZiAoIXRoaXMuZ3JpZHN0ZXIuJG9wdGlvbnMucHVzaERpcmVjdGlvbnMud2VzdCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBsZXQgZHJhZ0xpbWl0ID0gZ3JpZHN0ZXJJdGVtQ29sbGlkZS5kcmFnTGltaXQoKTtcblx0aWYoZHJhZ0xpbWl0ICYmIGRyYWdMaW1pdCA9PSBcInlcIikgcmV0dXJuIGZhbHNlO1xuICAgIHRoaXMuYWRkVG9UZW1wUHVzaGVkKGdyaWRzdGVySXRlbUNvbGxpZGUpO1xuICAgIGdyaWRzdGVySXRlbUNvbGxpZGUuJGl0ZW0ueCA9IGdyaWRzdGVySXRlbS4kaXRlbS54IC0gZ3JpZHN0ZXJJdGVtQ29sbGlkZS4kaXRlbS5jb2xzO1xuICAgIGlmICh0aGlzLnB1c2goZ3JpZHN0ZXJJdGVtQ29sbGlkZSwgdGhpcy5mcm9tRWFzdCkpIHtcbiAgICAgIGdyaWRzdGVySXRlbUNvbGxpZGUuc2V0U2l6ZSgpO1xuICAgICAgdGhpcy5hZGRUb1B1c2hlZChncmlkc3Rlckl0ZW1Db2xsaWRlKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJlbW92ZUZyb21UZW1wUHVzaGVkKGdyaWRzdGVySXRlbUNvbGxpZGUpO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBwcml2YXRlIGFkZFRvVGVtcFB1c2hlZChncmlkc3Rlckl0ZW06IEdyaWRzdGVySXRlbUNvbXBvbmVudEludGVyZmFjZSk6IHZvaWQge1xuICAgIGxldCBpID0gdGhpcy5wdXNoZWRJdGVtc1RlbXAuaW5kZXhPZihncmlkc3Rlckl0ZW0pO1xuICAgIGlmIChpID09PSAtMSkge1xuICAgICAgaSA9IHRoaXMucHVzaGVkSXRlbXNUZW1wLnB1c2goZ3JpZHN0ZXJJdGVtKSAtIDE7XG4gICAgICB0aGlzLnB1c2hlZEl0ZW1zVGVtcFBhdGhbaV0gPSBbXTtcbiAgICB9XG4gICAgdGhpcy5wdXNoZWRJdGVtc1RlbXBQYXRoW2ldLnB1c2goe3g6IGdyaWRzdGVySXRlbS4kaXRlbS54LCB5OiBncmlkc3Rlckl0ZW0uJGl0ZW0ueX0pO1xuICB9XG5cbiAgcHJpdmF0ZSByZW1vdmVGcm9tVGVtcFB1c2hlZChncmlkc3Rlckl0ZW06IEdyaWRzdGVySXRlbUNvbXBvbmVudEludGVyZmFjZSk6IHZvaWQge1xuICAgIGNvbnN0IGkgPSB0aGlzLnB1c2hlZEl0ZW1zVGVtcC5pbmRleE9mKGdyaWRzdGVySXRlbSk7XG4gICAgY29uc3QgdGVtcFBvc2l0aW9uID0gdGhpcy5wdXNoZWRJdGVtc1RlbXBQYXRoW2ldLnBvcCgpO1xuICAgIGlmICghdGVtcFBvc2l0aW9uKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGdyaWRzdGVySXRlbS4kaXRlbS54ID0gdGVtcFBvc2l0aW9uLng7XG4gICAgZ3JpZHN0ZXJJdGVtLiRpdGVtLnkgPSB0ZW1wUG9zaXRpb24ueTtcbiAgICBncmlkc3Rlckl0ZW0uc2V0U2l6ZSgpO1xuICAgIGlmICghdGhpcy5wdXNoZWRJdGVtc1RlbXBQYXRoW2ldLmxlbmd0aCkge1xuICAgICAgdGhpcy5wdXNoZWRJdGVtc1RlbXAuc3BsaWNlKGksIDEpO1xuICAgICAgdGhpcy5wdXNoZWRJdGVtc1RlbXBQYXRoLnNwbGljZShpLCAxKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGFkZFRvUHVzaGVkKGdyaWRzdGVySXRlbTogR3JpZHN0ZXJJdGVtQ29tcG9uZW50SW50ZXJmYWNlKTogdm9pZCB7XG4gICAgaWYgKHRoaXMucHVzaGVkSXRlbXMuaW5kZXhPZihncmlkc3Rlckl0ZW0pIDwgMCkge1xuICAgICAgdGhpcy5wdXNoZWRJdGVtcy5wdXNoKGdyaWRzdGVySXRlbSk7XG4gICAgICB0aGlzLnB1c2hlZEl0ZW1zUGF0aC5wdXNoKFt7eDogZ3JpZHN0ZXJJdGVtLml0ZW0ueCB8fCAwLCB5OiBncmlkc3Rlckl0ZW0uaXRlbS55IHx8IDB9LFxuICAgICAgICB7eDogZ3JpZHN0ZXJJdGVtLiRpdGVtLngsIHk6IGdyaWRzdGVySXRlbS4kaXRlbS55fV0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBpID0gdGhpcy5wdXNoZWRJdGVtcy5pbmRleE9mKGdyaWRzdGVySXRlbSk7XG4gICAgICB0aGlzLnB1c2hlZEl0ZW1zUGF0aFtpXS5wdXNoKHt4OiBncmlkc3Rlckl0ZW0uJGl0ZW0ueCwgeTogZ3JpZHN0ZXJJdGVtLiRpdGVtLnl9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHJlbW92ZUZyb21QdXNoZWQoaTogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKGkgPiAtMSkge1xuICAgICAgdGhpcy5wdXNoZWRJdGVtcy5zcGxpY2UoaSwgMSk7XG4gICAgICB0aGlzLnB1c2hlZEl0ZW1zUGF0aC5zcGxpY2UoaSwgMSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSByZW1vdmVGcm9tUHVzaGVkSXRlbShncmlkc3Rlckl0ZW06IEdyaWRzdGVySXRlbUNvbXBvbmVudEludGVyZmFjZSk6IHZvaWQge1xuICAgIGNvbnN0IGkgPSB0aGlzLnB1c2hlZEl0ZW1zLmluZGV4T2YoZ3JpZHN0ZXJJdGVtKTtcbiAgICBpZiAoaSA+IC0xKSB7XG4gICAgICB0aGlzLnB1c2hlZEl0ZW1zUGF0aFtpXS5wb3AoKTtcbiAgICAgIGlmICghdGhpcy5wdXNoZWRJdGVtc1BhdGgubGVuZ3RoKSB7XG4gICAgICAgIHRoaXMucHVzaGVkSXRlbXMuc3BsaWNlKGksIDEpO1xuICAgICAgICB0aGlzLnB1c2hlZEl0ZW1zUGF0aC5zcGxpY2UoaSwgMSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBjaGVja1B1c2hlZEl0ZW0ocHVzaGVkSXRlbTogR3JpZHN0ZXJJdGVtQ29tcG9uZW50SW50ZXJmYWNlLCBpOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICBjb25zdCBwYXRoID0gdGhpcy5wdXNoZWRJdGVtc1BhdGhbaV07XG4gICAgbGV0IGogPSBwYXRoLmxlbmd0aCAtIDI7XG4gICAgbGV0IGxhc3RQb3NpdGlvbiwgeCwgeTtcbiAgICBsZXQgY2hhbmdlID0gZmFsc2U7XG4gICAgZm9yICg7IGogPiAtMTsgai0tKSB7XG4gICAgICBsYXN0UG9zaXRpb24gPSBwYXRoW2pdO1xuICAgICAgeCA9IHB1c2hlZEl0ZW0uJGl0ZW0ueDtcbiAgICAgIHkgPSBwdXNoZWRJdGVtLiRpdGVtLnk7XG4gICAgICBwdXNoZWRJdGVtLiRpdGVtLnggPSBsYXN0UG9zaXRpb24ueDtcbiAgICAgIHB1c2hlZEl0ZW0uJGl0ZW0ueSA9IGxhc3RQb3NpdGlvbi55O1xuICAgICAgaWYgKCF0aGlzLmdyaWRzdGVyLmZpbmRJdGVtV2l0aEl0ZW0ocHVzaGVkSXRlbS4kaXRlbSkpIHtcbiAgICAgICAgcHVzaGVkSXRlbS5zZXRTaXplKCk7XG4gICAgICAgIHBhdGguc3BsaWNlKGogKyAxLCBwYXRoLmxlbmd0aCAtIGogLSAxKTtcbiAgICAgICAgY2hhbmdlID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHB1c2hlZEl0ZW0uJGl0ZW0ueCA9IHg7XG4gICAgICAgIHB1c2hlZEl0ZW0uJGl0ZW0ueSA9IHk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChwYXRoLmxlbmd0aCA8IDIpIHtcbiAgICAgIHRoaXMucmVtb3ZlRnJvbVB1c2hlZChpKTtcbiAgICB9XG4gICAgcmV0dXJuIGNoYW5nZTtcbiAgfVxufVxuIl19
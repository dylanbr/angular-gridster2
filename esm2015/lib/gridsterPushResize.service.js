/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { GridsterItemComponentInterface } from './gridsterItemComponent.interface';
import { GridsterComponent } from './gridster.component';
export class GridsterPushResize {
    /**
     * @param {?} gridsterItem
     */
    constructor(gridsterItem) {
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
    destroy() {
        delete this.gridster;
        delete this.gridsterItem;
    }
    /**
     * @param {?} direction
     * @return {?}
     */
    pushItems(direction) {
        if (this.gridster.$options.pushResizeItems) {
            return this.push(this.gridsterItem, direction);
        }
        else {
            return false;
        }
    }
    /**
     * @return {?}
     */
    restoreItems() {
        /** @type {?} */
        let i = 0;
        /** @type {?} */
        const l = this.pushedItems.length;
        /** @type {?} */
        let pushedItem;
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
    }
    /**
     * @return {?}
     */
    setPushedItems() {
        /** @type {?} */
        let i = 0;
        /** @type {?} */
        const l = this.pushedItems.length;
        /** @type {?} */
        let pushedItem;
        for (; i < l; i++) {
            pushedItem = this.pushedItems[i];
            pushedItem.checkItemChanges(pushedItem.$item, pushedItem.item);
        }
        this.pushedItems = [];
        this.pushedItemsPath = [];
    }
    /**
     * @return {?}
     */
    checkPushBack() {
        /** @type {?} */
        let i = this.pushedItems.length - 1;
        /** @type {?} */
        let change = false;
        for (; i > -1; i--) {
            if (this.checkPushedItem(this.pushedItems[i], i)) {
                change = true;
            }
        }
        if (change) {
            this.checkPushBack();
        }
    }
    /**
     * @private
     * @param {?} gridsterItem
     * @param {?} direction
     * @return {?}
     */
    push(gridsterItem, direction) {
        /** @type {?} */
        const gridsterItemCollision = this.gridster.checkCollision(gridsterItem.$item);
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
    }
    /**
     * @private
     * @param {?} gridsterItemCollide
     * @param {?} gridsterItem
     * @param {?} direction
     * @return {?}
     */
    trySouth(gridsterItemCollide, gridsterItem, direction) {
        /** @type {?} */
        const backUpY = gridsterItemCollide.$item.y;
        /** @type {?} */
        const backUpRows = gridsterItemCollide.$item.rows;
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
    }
    /**
     * @private
     * @param {?} gridsterItemCollide
     * @param {?} gridsterItem
     * @param {?} direction
     * @return {?}
     */
    tryNorth(gridsterItemCollide, gridsterItem, direction) {
        /** @type {?} */
        const backUpRows = gridsterItemCollide.$item.rows;
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
    }
    /**
     * @private
     * @param {?} gridsterItemCollide
     * @param {?} gridsterItem
     * @param {?} direction
     * @return {?}
     */
    tryEast(gridsterItemCollide, gridsterItem, direction) {
        /** @type {?} */
        const backUpX = gridsterItemCollide.$item.x;
        /** @type {?} */
        const backUpCols = gridsterItemCollide.$item.cols;
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
    }
    /**
     * @private
     * @param {?} gridsterItemCollide
     * @param {?} gridsterItem
     * @param {?} direction
     * @return {?}
     */
    tryWest(gridsterItemCollide, gridsterItem, direction) {
        /** @type {?} */
        const backUpCols = gridsterItemCollide.$item.cols;
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
    }
    /**
     * @private
     * @param {?} gridsterItem
     * @return {?}
     */
    addToPushed(gridsterItem) {
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
            const i = this.pushedItems.indexOf(gridsterItem);
            this.pushedItemsPath[i].push({
                x: gridsterItem.$item.x,
                y: gridsterItem.$item.y,
                cols: gridsterItem.$item.cols,
                rows: gridsterItem.$item.rows
            });
        }
    }
    /**
     * @private
     * @param {?} i
     * @return {?}
     */
    removeFromPushed(i) {
        if (i > -1) {
            this.pushedItems.splice(i, 1);
            this.pushedItemsPath.splice(i, 1);
        }
    }
    /**
     * @private
     * @param {?} pushedItem
     * @param {?} i
     * @return {?}
     */
    checkPushedItem(pushedItem, i) {
        /** @type {?} */
        const path = this.pushedItemsPath[i];
        /** @type {?} */
        let j = path.length - 2;
        /** @type {?} */
        let lastPosition;
        /** @type {?} */
        let x;
        /** @type {?} */
        let y;
        /** @type {?} */
        let cols;
        /** @type {?} */
        let rows;
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
    }
}
GridsterPushResize.decorators = [
    { type: Injectable }
];
/** @nocollapse */
GridsterPushResize.ctorParameters = () => [
    { type: GridsterItemComponentInterface }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZHN0ZXJQdXNoUmVzaXplLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWdyaWRzdGVyMi8iLCJzb3VyY2VzIjpbImxpYi9ncmlkc3RlclB1c2hSZXNpemUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUd6QyxPQUFPLEVBQUMsOEJBQThCLEVBQUMsTUFBTSxtQ0FBbUMsQ0FBQztBQUVqRixPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUd2RCxNQUFNLE9BQU8sa0JBQWtCOzs7O0lBaUI3QixZQUFZLFlBQTRDO1FBQ3RELElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxlQUFlLEdBQUcsRUFBRSxDQUFDO1FBQzFCLElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxRQUFRLEdBQUcsWUFBWSxDQUFDLFFBQVEsQ0FBQztRQUN0QyxJQUFJLENBQUMsVUFBVSxHQUFHO1lBQ2hCLFFBQVEsRUFBRSxJQUFJLENBQUMsT0FBTztZQUN0QixRQUFRLEVBQUUsSUFBSSxDQUFDLE9BQU87WUFDdEIsU0FBUyxFQUFFLElBQUksQ0FBQyxRQUFRO1lBQ3hCLFNBQVMsRUFBRSxJQUFJLENBQUMsUUFBUTtTQUN6QixDQUFDO1FBQ0YsSUFBSSxDQUFDLFNBQVMsR0FBRyxXQUFXLENBQUM7UUFDN0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxXQUFXLENBQUM7UUFDN0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxVQUFVLENBQUM7UUFDM0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxVQUFVLENBQUM7SUFDN0IsQ0FBQzs7OztJQUVELE9BQU87UUFDTCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDckIsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQzNCLENBQUM7Ozs7O0lB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VSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsWUFBWSxDQUFDLElBQUksQ0FBQztZQUMxQyxVQUFVLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxZQUFZLENBQUMsSUFBSSxDQUFDO1lBQzFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDckQsVUFBVSxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUNyQixJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7YUFDekM7aUJBQU07Z0JBQ0wsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUN2QixVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ3ZCLFVBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztnQkFDN0IsVUFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO2FBQzlCO1NBQ0Y7UUFDRCxJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ25CLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN6QixPQUFPLElBQUksQ0FBQztTQUNiO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDOzs7WUE1T0YsVUFBVTs7OztZQUpILDhCQUE4Qjs7OztJQU1wQyx1Q0FBeUI7O0lBQ3pCLHVDQUF5Qjs7SUFDekIsc0NBQXdCOztJQUN4QixzQ0FBd0I7Ozs7O0lBQ3hCLHlDQUEyRDs7Ozs7SUFDM0QsNkNBQW9EOzs7OztJQUNwRCwwQ0FBcUQ7Ozs7O0lBQ3JELHNDQUE2Qzs7Ozs7SUFDN0Msd0NBTUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge0dyaWRzdGVySXRlbX0gZnJvbSAnLi9ncmlkc3Rlckl0ZW0uaW50ZXJmYWNlJztcbmltcG9ydCB7R3JpZHN0ZXJJdGVtQ29tcG9uZW50SW50ZXJmYWNlfSBmcm9tICcuL2dyaWRzdGVySXRlbUNvbXBvbmVudC5pbnRlcmZhY2UnO1xuaW1wb3J0IHtHcmlkc3RlckNvbXBvbmVudEludGVyZmFjZX0gZnJvbSAnLi9ncmlkc3Rlci5pbnRlcmZhY2UnO1xuaW1wb3J0IHtHcmlkc3RlckNvbXBvbmVudH0gZnJvbSAnLi9ncmlkc3Rlci5jb21wb25lbnQnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgR3JpZHN0ZXJQdXNoUmVzaXplIHtcbiAgcHVibGljIGZyb21Tb3V0aDogc3RyaW5nO1xuICBwdWJsaWMgZnJvbU5vcnRoOiBzdHJpbmc7XG4gIHB1YmxpYyBmcm9tRWFzdDogc3RyaW5nO1xuICBwdWJsaWMgZnJvbVdlc3Q6IHN0cmluZztcbiAgcHJpdmF0ZSBwdXNoZWRJdGVtczogQXJyYXk8R3JpZHN0ZXJJdGVtQ29tcG9uZW50SW50ZXJmYWNlPjtcbiAgcHJpdmF0ZSBwdXNoZWRJdGVtc1BhdGg6IEFycmF5PEFycmF5PEdyaWRzdGVySXRlbT4+O1xuICBwcml2YXRlIGdyaWRzdGVySXRlbTogR3JpZHN0ZXJJdGVtQ29tcG9uZW50SW50ZXJmYWNlO1xuICBwcml2YXRlIGdyaWRzdGVyOiBHcmlkc3RlckNvbXBvbmVudEludGVyZmFjZTtcbiAgcHJpdmF0ZSB0cnlQYXR0ZXJuOiB7XG4gICAgZnJvbUVhc3Q6IEZ1bmN0aW9uLFxuICAgIGZyb21XZXN0OiBGdW5jdGlvbixcbiAgICBmcm9tTm9ydGg6IEZ1bmN0aW9uLFxuICAgIGZyb21Tb3V0aDogRnVuY3Rpb24sXG4gICAgW2tleTogc3RyaW5nXTogRnVuY3Rpb25cbiAgfTtcblxuICBjb25zdHJ1Y3Rvcihncmlkc3Rlckl0ZW06IEdyaWRzdGVySXRlbUNvbXBvbmVudEludGVyZmFjZSkge1xuICAgIHRoaXMucHVzaGVkSXRlbXMgPSBbXTtcbiAgICB0aGlzLnB1c2hlZEl0ZW1zUGF0aCA9IFtdO1xuICAgIHRoaXMuZ3JpZHN0ZXJJdGVtID0gZ3JpZHN0ZXJJdGVtO1xuICAgIHRoaXMuZ3JpZHN0ZXIgPSBncmlkc3Rlckl0ZW0uZ3JpZHN0ZXI7XG4gICAgdGhpcy50cnlQYXR0ZXJuID0ge1xuICAgICAgZnJvbUVhc3Q6IHRoaXMudHJ5V2VzdCxcbiAgICAgIGZyb21XZXN0OiB0aGlzLnRyeUVhc3QsXG4gICAgICBmcm9tTm9ydGg6IHRoaXMudHJ5U291dGgsXG4gICAgICBmcm9tU291dGg6IHRoaXMudHJ5Tm9ydGhcbiAgICB9O1xuICAgIHRoaXMuZnJvbVNvdXRoID0gJ2Zyb21Tb3V0aCc7XG4gICAgdGhpcy5mcm9tTm9ydGggPSAnZnJvbU5vcnRoJztcbiAgICB0aGlzLmZyb21FYXN0ID0gJ2Zyb21FYXN0JztcbiAgICB0aGlzLmZyb21XZXN0ID0gJ2Zyb21XZXN0JztcbiAgfVxuXG4gIGRlc3Ryb3koKTogdm9pZCB7XG4gICAgZGVsZXRlIHRoaXMuZ3JpZHN0ZXI7XG4gICAgZGVsZXRlIHRoaXMuZ3JpZHN0ZXJJdGVtO1xuICB9XG5cbiAgcHVzaEl0ZW1zKGRpcmVjdGlvbjogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMuZ3JpZHN0ZXIuJG9wdGlvbnMucHVzaFJlc2l6ZUl0ZW1zKSB7XG4gICAgICByZXR1cm4gdGhpcy5wdXNoKHRoaXMuZ3JpZHN0ZXJJdGVtLCBkaXJlY3Rpb24pO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgcmVzdG9yZUl0ZW1zKCk6IHZvaWQge1xuICAgIGxldCBpID0gMDtcbiAgICBjb25zdCBsOiBudW1iZXIgPSB0aGlzLnB1c2hlZEl0ZW1zLmxlbmd0aDtcbiAgICBsZXQgcHVzaGVkSXRlbTogR3JpZHN0ZXJJdGVtQ29tcG9uZW50SW50ZXJmYWNlO1xuICAgIGZvciAoOyBpIDwgbDsgaSsrKSB7XG4gICAgICBwdXNoZWRJdGVtID0gdGhpcy5wdXNoZWRJdGVtc1tpXTtcbiAgICAgIHB1c2hlZEl0ZW0uJGl0ZW0ueCA9IHB1c2hlZEl0ZW0uaXRlbS54IHx8IDA7XG4gICAgICBwdXNoZWRJdGVtLiRpdGVtLnkgPSBwdXNoZWRJdGVtLml0ZW0ueSB8fCAwO1xuICAgICAgcHVzaGVkSXRlbS4kaXRlbS5jb2xzID0gcHVzaGVkSXRlbS5pdGVtLmNvbHMgfHwgMTtcbiAgICAgIHB1c2hlZEl0ZW0uJGl0ZW0ucm93ID0gcHVzaGVkSXRlbS5pdGVtLnJvdyB8fCAxO1xuICAgICAgcHVzaGVkSXRlbS5zZXRTaXplKCk7XG4gICAgfVxuICAgIHRoaXMucHVzaGVkSXRlbXMgPSBbXTtcbiAgICB0aGlzLnB1c2hlZEl0ZW1zUGF0aCA9IFtdO1xuICB9XG5cbiAgc2V0UHVzaGVkSXRlbXMoKSB7XG4gICAgbGV0IGkgPSAwO1xuICAgIGNvbnN0IGw6IG51bWJlciA9IHRoaXMucHVzaGVkSXRlbXMubGVuZ3RoO1xuICAgIGxldCBwdXNoZWRJdGVtOiBHcmlkc3Rlckl0ZW1Db21wb25lbnRJbnRlcmZhY2U7XG4gICAgZm9yICg7IGkgPCBsOyBpKyspIHtcbiAgICAgIHB1c2hlZEl0ZW0gPSB0aGlzLnB1c2hlZEl0ZW1zW2ldO1xuICAgICAgcHVzaGVkSXRlbS5jaGVja0l0ZW1DaGFuZ2VzKHB1c2hlZEl0ZW0uJGl0ZW0sIHB1c2hlZEl0ZW0uaXRlbSk7XG4gICAgfVxuICAgIHRoaXMucHVzaGVkSXRlbXMgPSBbXTtcbiAgICB0aGlzLnB1c2hlZEl0ZW1zUGF0aCA9IFtdO1xuICB9XG5cbiAgY2hlY2tQdXNoQmFjaygpOiB2b2lkIHtcbiAgICBsZXQgaTogbnVtYmVyID0gdGhpcy5wdXNoZWRJdGVtcy5sZW5ndGggLSAxO1xuICAgIGxldCBjaGFuZ2UgPSBmYWxzZTtcbiAgICBmb3IgKDsgaSA+IC0xOyBpLS0pIHtcbiAgICAgIGlmICh0aGlzLmNoZWNrUHVzaGVkSXRlbSh0aGlzLnB1c2hlZEl0ZW1zW2ldLCBpKSkge1xuICAgICAgICBjaGFuZ2UgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoY2hhbmdlKSB7XG4gICAgICB0aGlzLmNoZWNrUHVzaEJhY2soKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHB1c2goZ3JpZHN0ZXJJdGVtOiBHcmlkc3Rlckl0ZW1Db21wb25lbnRJbnRlcmZhY2UsIGRpcmVjdGlvbjogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgY29uc3QgZ3JpZHN0ZXJJdGVtQ29sbGlzaW9uOiBhbnkgPSB0aGlzLmdyaWRzdGVyLmNoZWNrQ29sbGlzaW9uKGdyaWRzdGVySXRlbS4kaXRlbSk7XG4gICAgaWYgKGdyaWRzdGVySXRlbUNvbGxpc2lvbiAmJiBncmlkc3Rlckl0ZW1Db2xsaXNpb24gIT09IHRydWUgJiZcbiAgICAgIGdyaWRzdGVySXRlbUNvbGxpc2lvbiAhPT0gdGhpcy5ncmlkc3Rlckl0ZW0gJiYgZ3JpZHN0ZXJJdGVtQ29sbGlzaW9uLmNhbkJlUmVzaXplZCgpKSB7XG4gICAgICBpZiAodGhpcy50cnlQYXR0ZXJuW2RpcmVjdGlvbl0uY2FsbCh0aGlzLCBncmlkc3Rlckl0ZW1Db2xsaXNpb24sIGdyaWRzdGVySXRlbSwgZGlyZWN0aW9uKSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGdyaWRzdGVySXRlbUNvbGxpc2lvbiA9PT0gZmFsc2UpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBwcml2YXRlIHRyeVNvdXRoKGdyaWRzdGVySXRlbUNvbGxpZGU6IEdyaWRzdGVySXRlbUNvbXBvbmVudEludGVyZmFjZSwgZ3JpZHN0ZXJJdGVtOiBHcmlkc3Rlckl0ZW1Db21wb25lbnRJbnRlcmZhY2UsXG4gICAgICAgICAgICAgICAgICAgZGlyZWN0aW9uOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICBjb25zdCBiYWNrVXBZID0gZ3JpZHN0ZXJJdGVtQ29sbGlkZS4kaXRlbS55O1xuICAgIGNvbnN0IGJhY2tVcFJvd3MgPSBncmlkc3Rlckl0ZW1Db2xsaWRlLiRpdGVtLnJvd3M7XG4gICAgZ3JpZHN0ZXJJdGVtQ29sbGlkZS4kaXRlbS55ID0gZ3JpZHN0ZXJJdGVtLiRpdGVtLnkgKyBncmlkc3Rlckl0ZW0uJGl0ZW0ucm93cztcbiAgICBncmlkc3Rlckl0ZW1Db2xsaWRlLiRpdGVtLnJvd3MgPSBiYWNrVXBSb3dzICsgYmFja1VwWSAtIGdyaWRzdGVySXRlbUNvbGxpZGUuJGl0ZW0ueTtcbiAgICBpZiAoIUdyaWRzdGVyQ29tcG9uZW50LmNoZWNrQ29sbGlzaW9uVHdvSXRlbXMoZ3JpZHN0ZXJJdGVtQ29sbGlkZS4kaXRlbSwgZ3JpZHN0ZXJJdGVtLiRpdGVtKVxuICAgICAgJiYgIXRoaXMuZ3JpZHN0ZXIuY2hlY2tHcmlkQ29sbGlzaW9uKGdyaWRzdGVySXRlbUNvbGxpZGUuJGl0ZW0pKSB7XG4gICAgICBncmlkc3Rlckl0ZW1Db2xsaWRlLnNldFNpemUoKTtcbiAgICAgIHRoaXMuYWRkVG9QdXNoZWQoZ3JpZHN0ZXJJdGVtQ29sbGlkZSk7XG4gICAgICB0aGlzLnB1c2goZ3JpZHN0ZXJJdGVtLCBkaXJlY3Rpb24pO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGdyaWRzdGVySXRlbUNvbGxpZGUuJGl0ZW0ueSA9IGJhY2tVcFk7XG4gICAgICBncmlkc3Rlckl0ZW1Db2xsaWRlLiRpdGVtLnJvd3MgPSBiYWNrVXBSb3dzO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBwcml2YXRlIHRyeU5vcnRoKGdyaWRzdGVySXRlbUNvbGxpZGU6IEdyaWRzdGVySXRlbUNvbXBvbmVudEludGVyZmFjZSwgZ3JpZHN0ZXJJdGVtOiBHcmlkc3Rlckl0ZW1Db21wb25lbnRJbnRlcmZhY2UsXG4gICAgICAgICAgICAgICAgICAgZGlyZWN0aW9uOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICBjb25zdCBiYWNrVXBSb3dzID0gZ3JpZHN0ZXJJdGVtQ29sbGlkZS4kaXRlbS5yb3dzO1xuICAgIGdyaWRzdGVySXRlbUNvbGxpZGUuJGl0ZW0ucm93cyA9IGdyaWRzdGVySXRlbS4kaXRlbS55IC0gZ3JpZHN0ZXJJdGVtQ29sbGlkZS4kaXRlbS55O1xuICAgIGlmICghR3JpZHN0ZXJDb21wb25lbnQuY2hlY2tDb2xsaXNpb25Ud29JdGVtcyhncmlkc3Rlckl0ZW1Db2xsaWRlLiRpdGVtLCBncmlkc3Rlckl0ZW0uJGl0ZW0pXG4gICAgICAmJiAhdGhpcy5ncmlkc3Rlci5jaGVja0dyaWRDb2xsaXNpb24oZ3JpZHN0ZXJJdGVtQ29sbGlkZS4kaXRlbSkpIHtcbiAgICAgIGdyaWRzdGVySXRlbUNvbGxpZGUuc2V0U2l6ZSgpO1xuICAgICAgdGhpcy5hZGRUb1B1c2hlZChncmlkc3Rlckl0ZW1Db2xsaWRlKTtcbiAgICAgIHRoaXMucHVzaChncmlkc3Rlckl0ZW0sIGRpcmVjdGlvbik7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgZ3JpZHN0ZXJJdGVtQ29sbGlkZS4kaXRlbS5yb3dzID0gYmFja1VwUm93cztcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcHJpdmF0ZSB0cnlFYXN0KGdyaWRzdGVySXRlbUNvbGxpZGU6IEdyaWRzdGVySXRlbUNvbXBvbmVudEludGVyZmFjZSwgZ3JpZHN0ZXJJdGVtOiBHcmlkc3Rlckl0ZW1Db21wb25lbnRJbnRlcmZhY2UsXG4gICAgICAgICAgICAgICAgICBkaXJlY3Rpb246IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGJhY2tVcFggPSBncmlkc3Rlckl0ZW1Db2xsaWRlLiRpdGVtLng7XG4gICAgY29uc3QgYmFja1VwQ29scyA9IGdyaWRzdGVySXRlbUNvbGxpZGUuJGl0ZW0uY29scztcbiAgICBncmlkc3Rlckl0ZW1Db2xsaWRlLiRpdGVtLnggPSBncmlkc3Rlckl0ZW0uJGl0ZW0ueCArIGdyaWRzdGVySXRlbS4kaXRlbS5jb2xzO1xuICAgIGdyaWRzdGVySXRlbUNvbGxpZGUuJGl0ZW0uY29scyA9IGJhY2tVcENvbHMgKyBiYWNrVXBYIC0gZ3JpZHN0ZXJJdGVtQ29sbGlkZS4kaXRlbS54O1xuICAgIGlmICghR3JpZHN0ZXJDb21wb25lbnQuY2hlY2tDb2xsaXNpb25Ud29JdGVtcyhncmlkc3Rlckl0ZW1Db2xsaWRlLiRpdGVtLCBncmlkc3Rlckl0ZW0uJGl0ZW0pXG4gICAgICAmJiAhdGhpcy5ncmlkc3Rlci5jaGVja0dyaWRDb2xsaXNpb24oZ3JpZHN0ZXJJdGVtQ29sbGlkZS4kaXRlbSkpIHtcbiAgICAgIGdyaWRzdGVySXRlbUNvbGxpZGUuc2V0U2l6ZSgpO1xuICAgICAgdGhpcy5hZGRUb1B1c2hlZChncmlkc3Rlckl0ZW1Db2xsaWRlKTtcbiAgICAgIHRoaXMucHVzaChncmlkc3Rlckl0ZW0sIGRpcmVjdGlvbik7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgZ3JpZHN0ZXJJdGVtQ29sbGlkZS4kaXRlbS54ID0gYmFja1VwWDtcbiAgICAgIGdyaWRzdGVySXRlbUNvbGxpZGUuJGl0ZW0uY29scyA9IGJhY2tVcENvbHM7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHByaXZhdGUgdHJ5V2VzdChncmlkc3Rlckl0ZW1Db2xsaWRlOiBHcmlkc3Rlckl0ZW1Db21wb25lbnRJbnRlcmZhY2UsIGdyaWRzdGVySXRlbTogR3JpZHN0ZXJJdGVtQ29tcG9uZW50SW50ZXJmYWNlLFxuICAgICAgICAgICAgICAgICAgZGlyZWN0aW9uOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICBjb25zdCBiYWNrVXBDb2xzID0gZ3JpZHN0ZXJJdGVtQ29sbGlkZS4kaXRlbS5jb2xzO1xuICAgIGdyaWRzdGVySXRlbUNvbGxpZGUuJGl0ZW0uY29scyA9IGdyaWRzdGVySXRlbS4kaXRlbS54IC0gZ3JpZHN0ZXJJdGVtQ29sbGlkZS4kaXRlbS54O1xuICAgIGlmICghR3JpZHN0ZXJDb21wb25lbnQuY2hlY2tDb2xsaXNpb25Ud29JdGVtcyhncmlkc3Rlckl0ZW1Db2xsaWRlLiRpdGVtLCBncmlkc3Rlckl0ZW0uJGl0ZW0pXG4gICAgICAmJiAhdGhpcy5ncmlkc3Rlci5jaGVja0dyaWRDb2xsaXNpb24oZ3JpZHN0ZXJJdGVtQ29sbGlkZS4kaXRlbSkpIHtcbiAgICAgIGdyaWRzdGVySXRlbUNvbGxpZGUuc2V0U2l6ZSgpO1xuICAgICAgdGhpcy5hZGRUb1B1c2hlZChncmlkc3Rlckl0ZW1Db2xsaWRlKTtcbiAgICAgIHRoaXMucHVzaChncmlkc3Rlckl0ZW0sIGRpcmVjdGlvbik7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgZ3JpZHN0ZXJJdGVtQ29sbGlkZS4kaXRlbS5jb2xzID0gYmFja1VwQ29scztcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcHJpdmF0ZSBhZGRUb1B1c2hlZChncmlkc3Rlckl0ZW06IEdyaWRzdGVySXRlbUNvbXBvbmVudEludGVyZmFjZSk6IHZvaWQge1xuICAgIGlmICh0aGlzLnB1c2hlZEl0ZW1zLmluZGV4T2YoZ3JpZHN0ZXJJdGVtKSA8IDApIHtcbiAgICAgIHRoaXMucHVzaGVkSXRlbXMucHVzaChncmlkc3Rlckl0ZW0pO1xuICAgICAgdGhpcy5wdXNoZWRJdGVtc1BhdGgucHVzaChbXG4gICAgICAgIHtcbiAgICAgICAgICB4OiBncmlkc3Rlckl0ZW0uaXRlbS54IHx8IDAsXG4gICAgICAgICAgeTogZ3JpZHN0ZXJJdGVtLml0ZW0ueSB8fCAwLFxuICAgICAgICAgIGNvbHM6IGdyaWRzdGVySXRlbS5pdGVtLmNvbHMgfHwgMCxcbiAgICAgICAgICByb3dzOiBncmlkc3Rlckl0ZW0uaXRlbS5yb3dzIHx8IDBcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHg6IGdyaWRzdGVySXRlbS4kaXRlbS54LFxuICAgICAgICAgIHk6IGdyaWRzdGVySXRlbS4kaXRlbS55LFxuICAgICAgICAgIGNvbHM6IGdyaWRzdGVySXRlbS4kaXRlbS5jb2xzLFxuICAgICAgICAgIHJvd3M6IGdyaWRzdGVySXRlbS4kaXRlbS5yb3dzXG4gICAgICAgIH1dKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgaSA9IHRoaXMucHVzaGVkSXRlbXMuaW5kZXhPZihncmlkc3Rlckl0ZW0pO1xuICAgICAgdGhpcy5wdXNoZWRJdGVtc1BhdGhbaV0ucHVzaChcbiAgICAgICAge1xuICAgICAgICAgIHg6IGdyaWRzdGVySXRlbS4kaXRlbS54LFxuICAgICAgICAgIHk6IGdyaWRzdGVySXRlbS4kaXRlbS55LFxuICAgICAgICAgIGNvbHM6IGdyaWRzdGVySXRlbS4kaXRlbS5jb2xzLFxuICAgICAgICAgIHJvd3M6IGdyaWRzdGVySXRlbS4kaXRlbS5yb3dzXG4gICAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgcmVtb3ZlRnJvbVB1c2hlZChpOiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAoaSA+IC0xKSB7XG4gICAgICB0aGlzLnB1c2hlZEl0ZW1zLnNwbGljZShpLCAxKTtcbiAgICAgIHRoaXMucHVzaGVkSXRlbXNQYXRoLnNwbGljZShpLCAxKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGNoZWNrUHVzaGVkSXRlbShwdXNoZWRJdGVtOiBHcmlkc3Rlckl0ZW1Db21wb25lbnRJbnRlcmZhY2UsIGk6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgIGNvbnN0IHBhdGggPSB0aGlzLnB1c2hlZEl0ZW1zUGF0aFtpXTtcbiAgICBsZXQgaiA9IHBhdGgubGVuZ3RoIC0gMjtcbiAgICBsZXQgbGFzdFBvc2l0aW9uOiB7IHg6IG51bWJlciwgeTogbnVtYmVyLCBjb2xzOiBudW1iZXIsIHJvd3M6IG51bWJlciB9LCB4LCB5LCBjb2xzLCByb3dzO1xuICAgIGZvciAoOyBqID4gLTE7IGotLSkge1xuICAgICAgbGFzdFBvc2l0aW9uID0gcGF0aFtqXTtcbiAgICAgIHggPSBwdXNoZWRJdGVtLiRpdGVtLng7XG4gICAgICB5ID0gcHVzaGVkSXRlbS4kaXRlbS55O1xuICAgICAgY29scyA9IHB1c2hlZEl0ZW0uJGl0ZW0uY29scztcbiAgICAgIHJvd3MgPSBwdXNoZWRJdGVtLiRpdGVtLnJvd3M7XG4gICAgICBwdXNoZWRJdGVtLiRpdGVtLnggPSBsYXN0UG9zaXRpb24ueDtcbiAgICAgIHB1c2hlZEl0ZW0uJGl0ZW0ueSA9IGxhc3RQb3NpdGlvbi55O1xuICAgICAgcHVzaGVkSXRlbS4kaXRlbS5jb2xzID0gbGFzdFBvc2l0aW9uLmNvbHM7XG4gICAgICBwdXNoZWRJdGVtLiRpdGVtLnJvd3MgPSBsYXN0UG9zaXRpb24ucm93cztcbiAgICAgIGlmICghdGhpcy5ncmlkc3Rlci5maW5kSXRlbVdpdGhJdGVtKHB1c2hlZEl0ZW0uJGl0ZW0pKSB7XG4gICAgICAgIHB1c2hlZEl0ZW0uc2V0U2l6ZSgpO1xuICAgICAgICBwYXRoLnNwbGljZShqICsgMSwgcGF0aC5sZW5ndGggLSAxIC0gaik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwdXNoZWRJdGVtLiRpdGVtLnggPSB4O1xuICAgICAgICBwdXNoZWRJdGVtLiRpdGVtLnkgPSB5O1xuICAgICAgICBwdXNoZWRJdGVtLiRpdGVtLmNvbHMgPSBjb2xzO1xuICAgICAgICBwdXNoZWRJdGVtLiRpdGVtLnJvd3MgPSByb3dzO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAocGF0aC5sZW5ndGggPCAyKSB7XG4gICAgICB0aGlzLnJlbW92ZUZyb21QdXNoZWQoaSk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG4iXX0=
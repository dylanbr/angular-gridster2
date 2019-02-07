/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { GridsterItemComponentInterface } from './gridsterItemComponent.interface';
var GridsterSwap = /** @class */ (function () {
    function GridsterSwap(gridsterItem) {
        this.gridsterItem = gridsterItem;
        this.gridster = gridsterItem.gridster;
    }
    /**
     * @return {?}
     */
    GridsterSwap.prototype.destroy = /**
     * @return {?}
     */
    function () {
        delete this.gridster;
        delete this.gridsterItem;
        delete this.swapedItem;
    };
    /**
     * @return {?}
     */
    GridsterSwap.prototype.swapItems = /**
     * @return {?}
     */
    function () {
        if (this.gridster.$options.swap) {
            this.checkSwapBack();
            this.checkSwap(this.gridsterItem);
        }
    };
    /**
     * @return {?}
     */
    GridsterSwap.prototype.checkSwapBack = /**
     * @return {?}
     */
    function () {
        if (this.swapedItem) {
            /** @type {?} */
            var x = this.swapedItem.$item.x;
            /** @type {?} */
            var y = this.swapedItem.$item.y;
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
    GridsterSwap.prototype.restoreSwapItem = /**
     * @return {?}
     */
    function () {
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
    GridsterSwap.prototype.setSwapItem = /**
     * @return {?}
     */
    function () {
        if (this.swapedItem) {
            this.swapedItem.checkItemChanges(this.swapedItem.$item, this.swapedItem.item);
            this.swapedItem = undefined;
        }
    };
    /**
     * @param {?} pushedBy
     * @return {?}
     */
    GridsterSwap.prototype.checkSwap = /**
     * @param {?} pushedBy
     * @return {?}
     */
    function (pushedBy) {
        /** @type {?} */
        var gridsterItemCollision = this.gridster.checkCollision(pushedBy.$item);
        if (gridsterItemCollision && gridsterItemCollision !== true && gridsterItemCollision.canBeDragged()) {
            /** @type {?} */
            var gridsterItemCollide = gridsterItemCollision;
            /** @type {?} */
            var copyCollisionX = gridsterItemCollide.$item.x;
            /** @type {?} */
            var copyCollisionY = gridsterItemCollide.$item.y;
            /** @type {?} */
            var copyX = pushedBy.$item.x;
            /** @type {?} */
            var copyY = pushedBy.$item.y;
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
    GridsterSwap.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    GridsterSwap.ctorParameters = function () { return [
        { type: GridsterItemComponentInterface }
    ]; };
    return GridsterSwap;
}());
export { GridsterSwap };
if (false) {
    /**
     * @type {?}
     * @private
     */
    GridsterSwap.prototype.swapedItem;
    /**
     * @type {?}
     * @private
     */
    GridsterSwap.prototype.gridsterItem;
    /**
     * @type {?}
     * @private
     */
    GridsterSwap.prototype.gridster;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZHN0ZXJTd2FwLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWdyaWRzdGVyMi8iLCJzb3VyY2VzIjpbImxpYi9ncmlkc3RlclN3YXAuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUV6QyxPQUFPLEVBQUMsOEJBQThCLEVBQUMsTUFBTSxtQ0FBbUMsQ0FBQztBQUdqRjtJQU1FLHNCQUFZLFlBQTRDO1FBQ3RELElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxRQUFRLEdBQUcsWUFBWSxDQUFDLFFBQVEsQ0FBQztJQUN4QyxDQUFDOzs7O0lBRUQsOEJBQU87OztJQUFQO1FBQ0UsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ3JCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztRQUN6QixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDekIsQ0FBQzs7OztJQUVELGdDQUFTOzs7SUFBVDtRQUNFLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFO1lBQy9CLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUNyQixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUNuQztJQUNILENBQUM7Ozs7SUFFRCxvQ0FBYTs7O0lBQWI7UUFDRSxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7O2dCQUNiLENBQUMsR0FBVyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDOztnQkFDbkMsQ0FBQyxHQUFXLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDekMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7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QUFDLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbkQsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQzNHLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQztnQkFDekIsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDO2dCQUN6QixtQkFBbUIsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLGNBQWMsQ0FBQztnQkFDN0MsbUJBQW1CLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxjQUFjLENBQUM7YUFDOUM7aUJBQU07Z0JBQ0wsbUJBQW1CLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQzlCLElBQUksQ0FBQyxVQUFVLEdBQUcsbUJBQW1CLENBQUM7YUFDdkM7U0FDRjtJQUNILENBQUM7O2dCQWpGRixVQUFVOzs7O2dCQUhILDhCQUE4Qjs7SUFxRnRDLG1CQUFDO0NBQUEsQUFsRkQsSUFrRkM7U0FqRlksWUFBWTs7Ozs7O0lBQ3ZCLGtDQUErRDs7Ozs7SUFDL0Qsb0NBQXFEOzs7OztJQUNyRCxnQ0FBNkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge0dyaWRzdGVySXRlbUNvbXBvbmVudEludGVyZmFjZX0gZnJvbSAnLi9ncmlkc3Rlckl0ZW1Db21wb25lbnQuaW50ZXJmYWNlJztcbmltcG9ydCB7R3JpZHN0ZXJDb21wb25lbnRJbnRlcmZhY2V9IGZyb20gJy4vZ3JpZHN0ZXIuaW50ZXJmYWNlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEdyaWRzdGVyU3dhcCB7XG4gIHByaXZhdGUgc3dhcGVkSXRlbTogR3JpZHN0ZXJJdGVtQ29tcG9uZW50SW50ZXJmYWNlIHwgdW5kZWZpbmVkO1xuICBwcml2YXRlIGdyaWRzdGVySXRlbTogR3JpZHN0ZXJJdGVtQ29tcG9uZW50SW50ZXJmYWNlO1xuICBwcml2YXRlIGdyaWRzdGVyOiBHcmlkc3RlckNvbXBvbmVudEludGVyZmFjZTtcblxuICBjb25zdHJ1Y3Rvcihncmlkc3Rlckl0ZW06IEdyaWRzdGVySXRlbUNvbXBvbmVudEludGVyZmFjZSkge1xuICAgIHRoaXMuZ3JpZHN0ZXJJdGVtID0gZ3JpZHN0ZXJJdGVtO1xuICAgIHRoaXMuZ3JpZHN0ZXIgPSBncmlkc3Rlckl0ZW0uZ3JpZHN0ZXI7XG4gIH1cblxuICBkZXN0cm95KCk6IHZvaWQge1xuICAgIGRlbGV0ZSB0aGlzLmdyaWRzdGVyO1xuICAgIGRlbGV0ZSB0aGlzLmdyaWRzdGVySXRlbTtcbiAgICBkZWxldGUgdGhpcy5zd2FwZWRJdGVtO1xuICB9XG5cbiAgc3dhcEl0ZW1zKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmdyaWRzdGVyLiRvcHRpb25zLnN3YXApIHtcbiAgICAgIHRoaXMuY2hlY2tTd2FwQmFjaygpO1xuICAgICAgdGhpcy5jaGVja1N3YXAodGhpcy5ncmlkc3Rlckl0ZW0pO1xuICAgIH1cbiAgfVxuXG4gIGNoZWNrU3dhcEJhY2soKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuc3dhcGVkSXRlbSkge1xuICAgICAgY29uc3QgeDogbnVtYmVyID0gdGhpcy5zd2FwZWRJdGVtLiRpdGVtLng7XG4gICAgICBjb25zdCB5OiBudW1iZXIgPSB0aGlzLnN3YXBlZEl0ZW0uJGl0ZW0ueTtcbiAgICAgIHRoaXMuc3dhcGVkSXRlbS4kaXRlbS54ID0gdGhpcy5zd2FwZWRJdGVtLml0ZW0ueCB8fCAwO1xuICAgICAgdGhpcy5zd2FwZWRJdGVtLiRpdGVtLnkgPSB0aGlzLnN3YXBlZEl0ZW0uaXRlbS55IHx8IDA7XG4gICAgICBpZiAodGhpcy5ncmlkc3Rlci5jaGVja0NvbGxpc2lvbih0aGlzLnN3YXBlZEl0ZW0uJGl0ZW0pKSB7XG4gICAgICAgIHRoaXMuc3dhcGVkSXRlbS4kaXRlbS54ID0geDtcbiAgICAgICAgdGhpcy5zd2FwZWRJdGVtLiRpdGVtLnkgPSB5O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zd2FwZWRJdGVtLnNldFNpemUoKTtcbiAgICAgICAgdGhpcy5ncmlkc3Rlckl0ZW0uJGl0ZW0ueCA9IHRoaXMuZ3JpZHN0ZXJJdGVtLml0ZW0ueCB8fCAwO1xuICAgICAgICB0aGlzLmdyaWRzdGVySXRlbS4kaXRlbS55ID0gdGhpcy5ncmlkc3Rlckl0ZW0uaXRlbS55IHx8IDA7XG4gICAgICAgIHRoaXMuc3dhcGVkSXRlbSA9IHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgIH1cbiAgfVxuXG4gIHJlc3RvcmVTd2FwSXRlbSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5zd2FwZWRJdGVtKSB7XG4gICAgICB0aGlzLnN3YXBlZEl0ZW0uJGl0ZW0ueCA9IHRoaXMuc3dhcGVkSXRlbS5pdGVtLnggfHwgMDtcbiAgICAgIHRoaXMuc3dhcGVkSXRlbS4kaXRlbS55ID0gdGhpcy5zd2FwZWRJdGVtLml0ZW0ueSB8fCAwO1xuICAgICAgdGhpcy5zd2FwZWRJdGVtLnNldFNpemUoKTtcbiAgICAgIHRoaXMuc3dhcGVkSXRlbSA9IHVuZGVmaW5lZDtcbiAgICB9XG4gIH1cblxuICBzZXRTd2FwSXRlbSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5zd2FwZWRJdGVtKSB7XG4gICAgICB0aGlzLnN3YXBlZEl0ZW0uY2hlY2tJdGVtQ2hhbmdlcyh0aGlzLnN3YXBlZEl0ZW0uJGl0ZW0sIHRoaXMuc3dhcGVkSXRlbS5pdGVtKTtcbiAgICAgIHRoaXMuc3dhcGVkSXRlbSA9IHVuZGVmaW5lZDtcbiAgICB9XG4gIH1cblxuICBjaGVja1N3YXAocHVzaGVkQnk6IEdyaWRzdGVySXRlbUNvbXBvbmVudEludGVyZmFjZSk6IHZvaWQge1xuICAgIGNvbnN0IGdyaWRzdGVySXRlbUNvbGxpc2lvbjogYW55ID0gdGhpcy5ncmlkc3Rlci5jaGVja0NvbGxpc2lvbihwdXNoZWRCeS4kaXRlbSk7XG4gICAgaWYgKGdyaWRzdGVySXRlbUNvbGxpc2lvbiAmJiBncmlkc3Rlckl0ZW1Db2xsaXNpb24gIT09IHRydWUgJiYgZ3JpZHN0ZXJJdGVtQ29sbGlzaW9uLmNhbkJlRHJhZ2dlZCgpKSB7XG4gICAgICBjb25zdCBncmlkc3Rlckl0ZW1Db2xsaWRlOiBHcmlkc3Rlckl0ZW1Db21wb25lbnRJbnRlcmZhY2UgPSBncmlkc3Rlckl0ZW1Db2xsaXNpb247XG4gICAgICBjb25zdCBjb3B5Q29sbGlzaW9uWCA9IGdyaWRzdGVySXRlbUNvbGxpZGUuJGl0ZW0ueDtcbiAgICAgIGNvbnN0IGNvcHlDb2xsaXNpb25ZID0gZ3JpZHN0ZXJJdGVtQ29sbGlkZS4kaXRlbS55O1xuICAgICAgY29uc3QgY29weVggPSBwdXNoZWRCeS4kaXRlbS54O1xuICAgICAgY29uc3QgY29weVkgPSBwdXNoZWRCeS4kaXRlbS55O1xuICAgICAgZ3JpZHN0ZXJJdGVtQ29sbGlkZS4kaXRlbS54ID0gcHVzaGVkQnkuaXRlbS54IHx8IDA7XG4gICAgICBncmlkc3Rlckl0ZW1Db2xsaWRlLiRpdGVtLnkgPSBwdXNoZWRCeS5pdGVtLnkgfHwgMDtcbiAgICAgIHB1c2hlZEJ5LiRpdGVtLnggPSBncmlkc3Rlckl0ZW1Db2xsaWRlLml0ZW0ueCB8fCAwO1xuICAgICAgcHVzaGVkQnkuJGl0ZW0ueSA9IGdyaWRzdGVySXRlbUNvbGxpZGUuaXRlbS55IHx8IDA7XG4gICAgICBpZiAodGhpcy5ncmlkc3Rlci5jaGVja0NvbGxpc2lvbihncmlkc3Rlckl0ZW1Db2xsaWRlLiRpdGVtKSB8fCB0aGlzLmdyaWRzdGVyLmNoZWNrQ29sbGlzaW9uKHB1c2hlZEJ5LiRpdGVtKSkge1xuICAgICAgICBwdXNoZWRCeS4kaXRlbS54ID0gY29weVg7XG4gICAgICAgIHB1c2hlZEJ5LiRpdGVtLnkgPSBjb3B5WTtcbiAgICAgICAgZ3JpZHN0ZXJJdGVtQ29sbGlkZS4kaXRlbS54ID0gY29weUNvbGxpc2lvblg7XG4gICAgICAgIGdyaWRzdGVySXRlbUNvbGxpZGUuJGl0ZW0ueSA9IGNvcHlDb2xsaXNpb25ZO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZ3JpZHN0ZXJJdGVtQ29sbGlkZS5zZXRTaXplKCk7XG4gICAgICAgIHRoaXMuc3dhcGVkSXRlbSA9IGdyaWRzdGVySXRlbUNvbGxpZGU7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=
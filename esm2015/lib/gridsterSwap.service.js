/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { GridsterItemComponentInterface } from './gridsterItemComponent.interface';
export class GridsterSwap {
    /**
     * @param {?} gridsterItem
     */
    constructor(gridsterItem) {
        this.gridsterItem = gridsterItem;
        this.gridster = gridsterItem.gridster;
    }
    /**
     * @return {?}
     */
    destroy() {
        delete this.gridster;
        delete this.gridsterItem;
        delete this.swapedItem;
    }
    /**
     * @return {?}
     */
    swapItems() {
        if (this.gridster.$options.swap) {
            this.checkSwapBack();
            this.checkSwap(this.gridsterItem);
        }
    }
    /**
     * @return {?}
     */
    checkSwapBack() {
        if (this.swapedItem) {
            /** @type {?} */
            const x = this.swapedItem.$item.x;
            /** @type {?} */
            const y = this.swapedItem.$item.y;
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
    }
    /**
     * @return {?}
     */
    restoreSwapItem() {
        if (this.swapedItem) {
            this.swapedItem.$item.x = this.swapedItem.item.x || 0;
            this.swapedItem.$item.y = this.swapedItem.item.y || 0;
            this.swapedItem.setSize();
            this.swapedItem = undefined;
        }
    }
    /**
     * @return {?}
     */
    setSwapItem() {
        if (this.swapedItem) {
            this.swapedItem.checkItemChanges(this.swapedItem.$item, this.swapedItem.item);
            this.swapedItem = undefined;
        }
    }
    /**
     * @param {?} pushedBy
     * @return {?}
     */
    checkSwap(pushedBy) {
        /** @type {?} */
        const gridsterItemCollision = this.gridster.checkCollision(pushedBy.$item);
        if (gridsterItemCollision && gridsterItemCollision !== true && gridsterItemCollision.canBeDragged()) {
            /** @type {?} */
            const gridsterItemCollide = gridsterItemCollision;
            /** @type {?} */
            const copyCollisionX = gridsterItemCollide.$item.x;
            /** @type {?} */
            const copyCollisionY = gridsterItemCollide.$item.y;
            /** @type {?} */
            const copyX = pushedBy.$item.x;
            /** @type {?} */
            const copyY = pushedBy.$item.y;
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
    }
}
GridsterSwap.decorators = [
    { type: Injectable }
];
/** @nocollapse */
GridsterSwap.ctorParameters = () => [
    { type: GridsterItemComponentInterface }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZHN0ZXJTd2FwLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWdyaWRzdGVyMi8iLCJzb3VyY2VzIjpbImxpYi9ncmlkc3RlclN3YXAuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUV6QyxPQUFPLEVBQUMsOEJBQThCLEVBQUMsTUFBTSxtQ0FBbUMsQ0FBQztBQUlqRixNQUFNLE9BQU8sWUFBWTs7OztJQUt2QixZQUFZLFlBQTRDO1FBQ3RELElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxRQUFRLEdBQUcsWUFBWSxDQUFDLFFBQVEsQ0FBQztJQUN4QyxDQUFDOzs7O0lBRUQsT0FBTztRQUNMLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUNyQixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7UUFDekIsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQ3pCLENBQUM7Ozs7SUFFRCxTQUFTO1FBQ1AsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUU7WUFDL0IsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1lBQ3JCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQ25DO0lBQ0gsQ0FBQzs7OztJQUVELGFBQWE7UUFDWCxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7O2tCQUNiLENBQUMsR0FBVyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDOztrQkFDbkMsQ0FBQyxHQUFXLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDekMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdEQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdEQsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUN2RCxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUM1QixJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQzdCO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQzFCLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUMxRCxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDMUQsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7YUFDN0I7U0FFRjtJQUNILENBQUM7Ozs7SUFFRCxlQUFlO1FBQ2IsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ25CLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3RELElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3RELElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDMUIsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7U0FDN0I7SUFDSCxDQUFDOzs7O0lBRUQsV0FBVztRQUNULElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNuQixJQUFJLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDOUUsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7U0FDN0I7SUFDSCxDQUFDOzs7OztJQUVELFNBQVMsQ0FBQyxRQUF3Qzs7Y0FDMUMscUJBQXFCLEdBQVEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQztRQUMvRSxJQUFJLHFCQUFxQixJQUFJLHFCQUFxQixLQUFLLElBQUksSUFBSSxxQkFBcUIsQ0FBQyxZQUFZLEVBQUUsRUFBRTs7a0JBQzdGLG1CQUFtQixHQUFtQyxxQkFBcUI7O2tCQUMzRSxjQUFjLEdBQUcsbUJBQW1CLENBQUMsS0FBSyxDQUFDLENBQUM7O2tCQUM1QyxjQUFjLEdBQUcsbUJBQW1CLENBQUMsS0FBSyxDQUFDLENBQUM7O2tCQUM1QyxLQUFLLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDOztrQkFDeEIsS0FBSyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM5QixtQkFBbUIsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNuRCxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNuRCxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNuRCxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNuRCxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDM0csUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDO2dCQUN6QixRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUM7Z0JBQ3pCLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsY0FBYyxDQUFDO2dCQUM3QyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLGNBQWMsQ0FBQzthQUM5QztpQkFBTTtnQkFDTCxtQkFBbUIsQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDOUIsSUFBSSxDQUFDLFVBQVUsR0FBRyxtQkFBbUIsQ0FBQzthQUN2QztTQUNGO0lBQ0gsQ0FBQzs7O1lBakZGLFVBQVU7Ozs7WUFISCw4QkFBOEI7Ozs7Ozs7SUFLcEMsa0NBQStEOzs7OztJQUMvRCxvQ0FBcUQ7Ozs7O0lBQ3JELGdDQUE2QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7R3JpZHN0ZXJJdGVtQ29tcG9uZW50SW50ZXJmYWNlfSBmcm9tICcuL2dyaWRzdGVySXRlbUNvbXBvbmVudC5pbnRlcmZhY2UnO1xuaW1wb3J0IHtHcmlkc3RlckNvbXBvbmVudEludGVyZmFjZX0gZnJvbSAnLi9ncmlkc3Rlci5pbnRlcmZhY2UnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgR3JpZHN0ZXJTd2FwIHtcbiAgcHJpdmF0ZSBzd2FwZWRJdGVtOiBHcmlkc3Rlckl0ZW1Db21wb25lbnRJbnRlcmZhY2UgfCB1bmRlZmluZWQ7XG4gIHByaXZhdGUgZ3JpZHN0ZXJJdGVtOiBHcmlkc3Rlckl0ZW1Db21wb25lbnRJbnRlcmZhY2U7XG4gIHByaXZhdGUgZ3JpZHN0ZXI6IEdyaWRzdGVyQ29tcG9uZW50SW50ZXJmYWNlO1xuXG4gIGNvbnN0cnVjdG9yKGdyaWRzdGVySXRlbTogR3JpZHN0ZXJJdGVtQ29tcG9uZW50SW50ZXJmYWNlKSB7XG4gICAgdGhpcy5ncmlkc3Rlckl0ZW0gPSBncmlkc3Rlckl0ZW07XG4gICAgdGhpcy5ncmlkc3RlciA9IGdyaWRzdGVySXRlbS5ncmlkc3RlcjtcbiAgfVxuXG4gIGRlc3Ryb3koKTogdm9pZCB7XG4gICAgZGVsZXRlIHRoaXMuZ3JpZHN0ZXI7XG4gICAgZGVsZXRlIHRoaXMuZ3JpZHN0ZXJJdGVtO1xuICAgIGRlbGV0ZSB0aGlzLnN3YXBlZEl0ZW07XG4gIH1cblxuICBzd2FwSXRlbXMoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZ3JpZHN0ZXIuJG9wdGlvbnMuc3dhcCkge1xuICAgICAgdGhpcy5jaGVja1N3YXBCYWNrKCk7XG4gICAgICB0aGlzLmNoZWNrU3dhcCh0aGlzLmdyaWRzdGVySXRlbSk7XG4gICAgfVxuICB9XG5cbiAgY2hlY2tTd2FwQmFjaygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5zd2FwZWRJdGVtKSB7XG4gICAgICBjb25zdCB4OiBudW1iZXIgPSB0aGlzLnN3YXBlZEl0ZW0uJGl0ZW0ueDtcbiAgICAgIGNvbnN0IHk6IG51bWJlciA9IHRoaXMuc3dhcGVkSXRlbS4kaXRlbS55O1xuICAgICAgdGhpcy5zd2FwZWRJdGVtLiRpdGVtLnggPSB0aGlzLnN3YXBlZEl0ZW0uaXRlbS54IHx8IDA7XG4gICAgICB0aGlzLnN3YXBlZEl0ZW0uJGl0ZW0ueSA9IHRoaXMuc3dhcGVkSXRlbS5pdGVtLnkgfHwgMDtcbiAgICAgIGlmICh0aGlzLmdyaWRzdGVyLmNoZWNrQ29sbGlzaW9uKHRoaXMuc3dhcGVkSXRlbS4kaXRlbSkpIHtcbiAgICAgICAgdGhpcy5zd2FwZWRJdGVtLiRpdGVtLnggPSB4O1xuICAgICAgICB0aGlzLnN3YXBlZEl0ZW0uJGl0ZW0ueSA9IHk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnN3YXBlZEl0ZW0uc2V0U2l6ZSgpO1xuICAgICAgICB0aGlzLmdyaWRzdGVySXRlbS4kaXRlbS54ID0gdGhpcy5ncmlkc3Rlckl0ZW0uaXRlbS54IHx8IDA7XG4gICAgICAgIHRoaXMuZ3JpZHN0ZXJJdGVtLiRpdGVtLnkgPSB0aGlzLmdyaWRzdGVySXRlbS5pdGVtLnkgfHwgMDtcbiAgICAgICAgdGhpcy5zd2FwZWRJdGVtID0gdW5kZWZpbmVkO1xuICAgICAgfVxuXG4gICAgfVxuICB9XG5cbiAgcmVzdG9yZVN3YXBJdGVtKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnN3YXBlZEl0ZW0pIHtcbiAgICAgIHRoaXMuc3dhcGVkSXRlbS4kaXRlbS54ID0gdGhpcy5zd2FwZWRJdGVtLml0ZW0ueCB8fCAwO1xuICAgICAgdGhpcy5zd2FwZWRJdGVtLiRpdGVtLnkgPSB0aGlzLnN3YXBlZEl0ZW0uaXRlbS55IHx8IDA7XG4gICAgICB0aGlzLnN3YXBlZEl0ZW0uc2V0U2l6ZSgpO1xuICAgICAgdGhpcy5zd2FwZWRJdGVtID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgfVxuXG4gIHNldFN3YXBJdGVtKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnN3YXBlZEl0ZW0pIHtcbiAgICAgIHRoaXMuc3dhcGVkSXRlbS5jaGVja0l0ZW1DaGFuZ2VzKHRoaXMuc3dhcGVkSXRlbS4kaXRlbSwgdGhpcy5zd2FwZWRJdGVtLml0ZW0pO1xuICAgICAgdGhpcy5zd2FwZWRJdGVtID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgfVxuXG4gIGNoZWNrU3dhcChwdXNoZWRCeTogR3JpZHN0ZXJJdGVtQ29tcG9uZW50SW50ZXJmYWNlKTogdm9pZCB7XG4gICAgY29uc3QgZ3JpZHN0ZXJJdGVtQ29sbGlzaW9uOiBhbnkgPSB0aGlzLmdyaWRzdGVyLmNoZWNrQ29sbGlzaW9uKHB1c2hlZEJ5LiRpdGVtKTtcbiAgICBpZiAoZ3JpZHN0ZXJJdGVtQ29sbGlzaW9uICYmIGdyaWRzdGVySXRlbUNvbGxpc2lvbiAhPT0gdHJ1ZSAmJiBncmlkc3Rlckl0ZW1Db2xsaXNpb24uY2FuQmVEcmFnZ2VkKCkpIHtcbiAgICAgIGNvbnN0IGdyaWRzdGVySXRlbUNvbGxpZGU6IEdyaWRzdGVySXRlbUNvbXBvbmVudEludGVyZmFjZSA9IGdyaWRzdGVySXRlbUNvbGxpc2lvbjtcbiAgICAgIGNvbnN0IGNvcHlDb2xsaXNpb25YID0gZ3JpZHN0ZXJJdGVtQ29sbGlkZS4kaXRlbS54O1xuICAgICAgY29uc3QgY29weUNvbGxpc2lvblkgPSBncmlkc3Rlckl0ZW1Db2xsaWRlLiRpdGVtLnk7XG4gICAgICBjb25zdCBjb3B5WCA9IHB1c2hlZEJ5LiRpdGVtLng7XG4gICAgICBjb25zdCBjb3B5WSA9IHB1c2hlZEJ5LiRpdGVtLnk7XG4gICAgICBncmlkc3Rlckl0ZW1Db2xsaWRlLiRpdGVtLnggPSBwdXNoZWRCeS5pdGVtLnggfHwgMDtcbiAgICAgIGdyaWRzdGVySXRlbUNvbGxpZGUuJGl0ZW0ueSA9IHB1c2hlZEJ5Lml0ZW0ueSB8fCAwO1xuICAgICAgcHVzaGVkQnkuJGl0ZW0ueCA9IGdyaWRzdGVySXRlbUNvbGxpZGUuaXRlbS54IHx8IDA7XG4gICAgICBwdXNoZWRCeS4kaXRlbS55ID0gZ3JpZHN0ZXJJdGVtQ29sbGlkZS5pdGVtLnkgfHwgMDtcbiAgICAgIGlmICh0aGlzLmdyaWRzdGVyLmNoZWNrQ29sbGlzaW9uKGdyaWRzdGVySXRlbUNvbGxpZGUuJGl0ZW0pIHx8IHRoaXMuZ3JpZHN0ZXIuY2hlY2tDb2xsaXNpb24ocHVzaGVkQnkuJGl0ZW0pKSB7XG4gICAgICAgIHB1c2hlZEJ5LiRpdGVtLnggPSBjb3B5WDtcbiAgICAgICAgcHVzaGVkQnkuJGl0ZW0ueSA9IGNvcHlZO1xuICAgICAgICBncmlkc3Rlckl0ZW1Db2xsaWRlLiRpdGVtLnggPSBjb3B5Q29sbGlzaW9uWDtcbiAgICAgICAgZ3JpZHN0ZXJJdGVtQ29sbGlkZS4kaXRlbS55ID0gY29weUNvbGxpc2lvblk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBncmlkc3Rlckl0ZW1Db2xsaWRlLnNldFNpemUoKTtcbiAgICAgICAgdGhpcy5zd2FwZWRJdGVtID0gZ3JpZHN0ZXJJdGVtQ29sbGlkZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==
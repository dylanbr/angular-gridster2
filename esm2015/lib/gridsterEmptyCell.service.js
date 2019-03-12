/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
            this.gridster.zone.runOutsideAngular((/**
             * @return {?}
             */
            () => {
                this.emptyCellMove = this.gridster.renderer.listen(this.gridster.el, 'dragover', this.emptyCellDragOver.bind(this));
            }));
            this.emptyCellExit = this.gridster.renderer.listen('document', 'dragend', (/**
             * @return {?}
             */
            () => {
                this.gridster.movingItem = null;
                this.gridster.previewStyle();
            }));
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
        /** @type {?} */
        const item = this.getValidItemFromEvent(e);
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
        /** @type {?} */
        const item = this.getValidItemFromEvent(e);
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
        /** @type {?} */
        const item = this.getValidItemFromEvent(e);
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
        /** @type {?} */
        const item = this.getValidItemFromEvent(e);
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
        /** @type {?} */
        const item = this.getValidItemFromEvent(e);
        /** @type {?} */
        const leftMouseButtonCode = 1;
        if (!item || e.buttons !== leftMouseButtonCode) {
            return;
        }
        this.initialItem = item;
        this.gridster.movingItem = item;
        this.gridster.previewStyle();
        this.gridster.zone.runOutsideAngular((/**
         * @return {?}
         */
        () => {
            this.emptyCellMMove = this.gridster.renderer.listen('window', 'mousemove', this.emptyCellMouseMove.bind(this));
            this.emptyCellMMoveTouch = this.gridster.renderer.listen('window', 'touchmove', this.emptyCellMouseMove.bind(this));
        }));
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
        /** @type {?} */
        const item = this.getValidItemFromEvent(e, this.initialItem);
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
        /** @type {?} */
        const item = this.getValidItemFromEvent(e, this.initialItem);
        if (item) {
            this.gridster.movingItem = item;
        }
        if (this.gridster.options.emptyCellDragCallback && this.gridster.movingItem) {
            this.gridster.options.emptyCellDragCallback(e, this.gridster.movingItem);
        }
        setTimeout((/**
         * @return {?}
         */
        () => {
            this.initialItem = null;
            if (this.gridster) {
                this.gridster.movingItem = null;
                this.gridster.previewStyle();
            }
        }));
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
        /** @type {?} */
        const rect = this.gridster.el.getBoundingClientRect();
        /** @type {?} */
        const x = e.clientX + this.gridster.el.scrollLeft - rect.left - this.gridster.$options.margin;
        /** @type {?} */
        const y = e.clientY + this.gridster.el.scrollTop - rect.top - this.gridster.$options.margin;
        /** @type {?} */
        const item = {
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
    { type: Injectable }
];
/** @nocollapse */
GridsterEmptyCell.ctorParameters = () => [
    { type: GridsterComponentInterface }
];
if (false) {
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
    /**
     * @type {?}
     * @private
     */
    GridsterEmptyCell.prototype.gridster;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZHN0ZXJFbXB0eUNlbGwuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItZ3JpZHN0ZXIyLyIsInNvdXJjZXMiOlsibGliL2dyaWRzdGVyRW1wdHlDZWxsLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFekMsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBRXRELE9BQU8sRUFBQywwQkFBMEIsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBR2hFLE1BQU0sT0FBTyxpQkFBaUI7Ozs7SUFlNUIsWUFBb0IsUUFBb0M7UUFBcEMsYUFBUSxHQUFSLFFBQVEsQ0FBNEI7SUFDeEQsQ0FBQzs7OztJQUVELE9BQU87UUFDTCxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDeEIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQztRQUNoQyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFO1lBQzlCLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLENBQUM7U0FDOUI7UUFDRCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDckIsSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ3RCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUNyQixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztTQUMzQjtJQUNILENBQUM7Ozs7SUFFRCxhQUFhO1FBQ1gsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxvQkFBb0IsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsc0JBQXNCLEVBQUU7WUFDdkgsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFB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QUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNwRTtTQUNGO1FBQ0QsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUN0QyxPQUFPO1NBQ1I7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7OztZQTNORixVQUFVOzs7O1lBRkgsMEJBQTBCOzs7O0lBSWhDLHdDQUFpQzs7SUFDakMsMkNBQWdDOztJQUNoQyxnREFBcUM7O0lBQ3JDLGlEQUFzQzs7SUFDdEMsMENBQStCOztJQUMvQiwwQ0FBK0I7O0lBQy9CLCtDQUFvQzs7SUFDcEMsMkNBQXlCOztJQUN6QixnREFBOEI7O0lBQzlCLHdDQUFzQjs7SUFDdEIsNkNBQTJCOztJQUMzQiwwQ0FBK0I7O0lBQy9CLDBDQUErQjs7Ozs7SUFFbkIscUNBQTRDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtHcmlkc3RlclV0aWxzfSBmcm9tICcuL2dyaWRzdGVyVXRpbHMuc2VydmljZSc7XG5pbXBvcnQge0dyaWRzdGVySXRlbX0gZnJvbSAnLi9ncmlkc3Rlckl0ZW0uaW50ZXJmYWNlJztcbmltcG9ydCB7R3JpZHN0ZXJDb21wb25lbnRJbnRlcmZhY2V9IGZyb20gJy4vZ3JpZHN0ZXIuaW50ZXJmYWNlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEdyaWRzdGVyRW1wdHlDZWxsIHtcbiAgaW5pdGlhbEl0ZW06IEdyaWRzdGVySXRlbSB8IG51bGw7XG4gIGVtcHR5Q2VsbENsaWNrOiBGdW5jdGlvbiB8IG51bGw7XG4gIGVtcHR5Q2VsbENsaWNrVG91Y2g6IEZ1bmN0aW9uIHwgbnVsbDtcbiAgZW1wdHlDZWxsQ29udGV4dE1lbnU6IEZ1bmN0aW9uIHwgbnVsbDtcbiAgZW1wdHlDZWxsRHJvcDogRnVuY3Rpb24gfCBudWxsO1xuICBlbXB0eUNlbGxEcmFnOiBGdW5jdGlvbiB8IG51bGw7XG4gIGVtcHR5Q2VsbERyYWdUb3VjaDogRnVuY3Rpb24gfCBudWxsO1xuICBlbXB0eUNlbGxNTW92ZTogRnVuY3Rpb247XG4gIGVtcHR5Q2VsbE1Nb3ZlVG91Y2g6IEZ1bmN0aW9uO1xuICBlbXB0eUNlbGxVcDogRnVuY3Rpb247XG4gIGVtcHR5Q2VsbFVwVG91Y2g6IEZ1bmN0aW9uO1xuICBlbXB0eUNlbGxNb3ZlOiBGdW5jdGlvbiB8IG51bGw7XG4gIGVtcHR5Q2VsbEV4aXQ6IEZ1bmN0aW9uIHwgbnVsbDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGdyaWRzdGVyOiBHcmlkc3RlckNvbXBvbmVudEludGVyZmFjZSkge1xuICB9XG5cbiAgZGVzdHJveSgpOiB2b2lkIHtcbiAgICBkZWxldGUgdGhpcy5pbml0aWFsSXRlbTtcbiAgICBkZWxldGUgdGhpcy5ncmlkc3Rlci5tb3ZpbmdJdGVtO1xuICAgIGlmICh0aGlzLmdyaWRzdGVyLnByZXZpZXdTdHlsZSkge1xuICAgICAgdGhpcy5ncmlkc3Rlci5wcmV2aWV3U3R5bGUoKTtcbiAgICB9XG4gICAgZGVsZXRlIHRoaXMuZ3JpZHN0ZXI7XG4gICAgaWYgKHRoaXMuZW1wdHlDZWxsRXhpdCkge1xuICAgICAgdGhpcy5lbXB0eUNlbGxFeGl0KCk7XG4gICAgICB0aGlzLmVtcHR5Q2VsbEV4aXQgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZU9wdGlvbnMoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZ3JpZHN0ZXIuJG9wdGlvbnMuZW5hYmxlRW1wdHlDZWxsQ2xpY2sgJiYgIXRoaXMuZW1wdHlDZWxsQ2xpY2sgJiYgdGhpcy5ncmlkc3Rlci5vcHRpb25zLmVtcHR5Q2VsbENsaWNrQ2FsbGJhY2spIHtcbiAgICAgIHRoaXMuZW1wdHlDZWxsQ2xpY2sgPSB0aGlzLmdyaWRzdGVyLnJlbmRlcmVyLmxpc3Rlbih0aGlzLmdyaWRzdGVyLmVsLCAnY2xpY2snLCB0aGlzLmVtcHR5Q2VsbENsaWNrQ2IuYmluZCh0aGlzKSk7XG4gICAgICB0aGlzLmVtcHR5Q2VsbENsaWNrVG91Y2ggPSB0aGlzLmdyaWRzdGVyLnJlbmRlcmVyLmxpc3Rlbih0aGlzLmdyaWRzdGVyLmVsLCAndG91Y2hlbmQnLCB0aGlzLmVtcHR5Q2VsbENsaWNrQ2IuYmluZCh0aGlzKSk7XG4gICAgfSBlbHNlIGlmICghdGhpcy5ncmlkc3Rlci4kb3B0aW9ucy5lbmFibGVFbXB0eUNlbGxDbGljayAmJiB0aGlzLmVtcHR5Q2VsbENsaWNrICYmIHRoaXMuZW1wdHlDZWxsQ2xpY2tUb3VjaCkge1xuICAgICAgdGhpcy5lbXB0eUNlbGxDbGljaygpO1xuICAgICAgdGhpcy5lbXB0eUNlbGxDbGlja1RvdWNoKCk7XG4gICAgICB0aGlzLmVtcHR5Q2VsbENsaWNrID0gbnVsbDtcbiAgICAgIHRoaXMuZW1wdHlDZWxsQ2xpY2tUb3VjaCA9IG51bGw7XG4gICAgfVxuICAgIGlmICh0aGlzLmdyaWRzdGVyLiRvcHRpb25zLmVuYWJsZUVtcHR5Q2VsbENvbnRleHRNZW51ICYmICF0aGlzLmVtcHR5Q2VsbENvbnRleHRNZW51ICYmXG4gICAgICB0aGlzLmdyaWRzdGVyLm9wdGlvbnMuZW1wdHlDZWxsQ29udGV4dE1lbnVDYWxsYmFjaykge1xuICAgICAgdGhpcy5lbXB0eUNlbGxDb250ZXh0TWVudSA9IHRoaXMuZ3JpZHN0ZXIucmVuZGVyZXIubGlzdGVuKHRoaXMuZ3JpZHN0ZXIuZWwsICdjb250ZXh0bWVudScsIHRoaXMuZW1wdHlDZWxsQ29udGV4dE1lbnVDYi5iaW5kKHRoaXMpKTtcbiAgICB9IGVsc2UgaWYgKCF0aGlzLmdyaWRzdGVyLiRvcHRpb25zLmVuYWJsZUVtcHR5Q2VsbENvbnRleHRNZW51ICYmIHRoaXMuZW1wdHlDZWxsQ29udGV4dE1lbnUpIHtcbiAgICAgIHRoaXMuZW1wdHlDZWxsQ29udGV4dE1lbnUoKTtcbiAgICAgIHRoaXMuZW1wdHlDZWxsQ29udGV4dE1lbnUgPSBudWxsO1xuICAgIH1cbiAgICBpZiAodGhpcy5ncmlkc3Rlci4kb3B0aW9ucy5lbmFibGVFbXB0eUNlbGxEcm9wICYmICF0aGlzLmVtcHR5Q2VsbERyb3AgJiYgdGhpcy5ncmlkc3Rlci5vcHRpb25zLmVtcHR5Q2VsbERyb3BDYWxsYmFjaykge1xuICAgICAgdGhpcy5lbXB0eUNlbGxEcm9wID0gdGhpcy5ncmlkc3Rlci5yZW5kZXJlci5saXN0ZW4odGhpcy5ncmlkc3Rlci5lbCwgJ2Ryb3AnLCB0aGlzLmVtcHR5Q2VsbERyYWdEcm9wLmJpbmQodGhpcykpO1xuICAgICAgdGhpcy5ncmlkc3Rlci56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgdGhpcy5lbXB0eUNlbGxNb3ZlID0gdGhpcy5ncmlkc3Rlci5yZW5kZXJlci5saXN0ZW4odGhpcy5ncmlkc3Rlci5lbCwgJ2RyYWdvdmVyJywgdGhpcy5lbXB0eUNlbGxEcmFnT3Zlci5iaW5kKHRoaXMpKTtcbiAgICAgIH0pO1xuICAgICAgdGhpcy5lbXB0eUNlbGxFeGl0ID0gdGhpcy5ncmlkc3Rlci5yZW5kZXJlci5saXN0ZW4oJ2RvY3VtZW50JywgJ2RyYWdlbmQnLCAoKSA9PiB7XG4gICAgICAgIHRoaXMuZ3JpZHN0ZXIubW92aW5nSXRlbSA9IG51bGw7XG4gICAgICAgIHRoaXMuZ3JpZHN0ZXIucHJldmlld1N0eWxlKCk7XG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKCF0aGlzLmdyaWRzdGVyLiRvcHRpb25zLmVuYWJsZUVtcHR5Q2VsbERyb3AgJiYgdGhpcy5lbXB0eUNlbGxEcm9wICYmIHRoaXMuZW1wdHlDZWxsTW92ZSAmJiB0aGlzLmVtcHR5Q2VsbEV4aXQpIHtcbiAgICAgIHRoaXMuZW1wdHlDZWxsRHJvcCgpO1xuICAgICAgdGhpcy5lbXB0eUNlbGxNb3ZlKCk7XG4gICAgICB0aGlzLmVtcHR5Q2VsbEV4aXQoKTtcbiAgICAgIHRoaXMuZW1wdHlDZWxsTW92ZSA9IG51bGw7XG4gICAgICB0aGlzLmVtcHR5Q2VsbERyb3AgPSBudWxsO1xuICAgICAgdGhpcy5lbXB0eUNlbGxFeGl0ID0gbnVsbDtcbiAgICB9XG4gICAgaWYgKHRoaXMuZ3JpZHN0ZXIuJG9wdGlvbnMuZW5hYmxlRW1wdHlDZWxsRHJhZyAmJiAhdGhpcy5lbXB0eUNlbGxEcmFnICYmIHRoaXMuZ3JpZHN0ZXIub3B0aW9ucy5lbXB0eUNlbGxEcmFnQ2FsbGJhY2spIHtcbiAgICAgIHRoaXMuZW1wdHlDZWxsRHJhZyA9IHRoaXMuZ3JpZHN0ZXIucmVuZGVyZXIubGlzdGVuKHRoaXMuZ3JpZHN0ZXIuZWwsICdtb3VzZWRvd24nLCB0aGlzLmVtcHR5Q2VsbE1vdXNlRG93bi5iaW5kKHRoaXMpKTtcbiAgICAgIHRoaXMuZW1wdHlDZWxsRHJhZ1RvdWNoID0gdGhpcy5ncmlkc3Rlci5yZW5kZXJlci5saXN0ZW4odGhpcy5ncmlkc3Rlci5lbCwgJ3RvdWNoc3RhcnQnLCB0aGlzLmVtcHR5Q2VsbE1vdXNlRG93bi5iaW5kKHRoaXMpKTtcbiAgICB9IGVsc2UgaWYgKCF0aGlzLmdyaWRzdGVyLiRvcHRpb25zLmVuYWJsZUVtcHR5Q2VsbERyYWcgJiYgdGhpcy5lbXB0eUNlbGxEcmFnICYmIHRoaXMuZW1wdHlDZWxsRHJhZ1RvdWNoKSB7XG4gICAgICB0aGlzLmVtcHR5Q2VsbERyYWcoKTtcbiAgICAgIHRoaXMuZW1wdHlDZWxsRHJhZ1RvdWNoKCk7XG4gICAgICB0aGlzLmVtcHR5Q2VsbERyYWcgPSBudWxsO1xuICAgICAgdGhpcy5lbXB0eUNlbGxEcmFnVG91Y2ggPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIGVtcHR5Q2VsbENsaWNrQ2IoZTogYW55KTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZ3JpZHN0ZXIubW92aW5nSXRlbSB8fCBHcmlkc3RlclV0aWxzLmNoZWNrQ29udGVudENsYXNzRm9yRW1wdHlDZWxsQ2xpY2tFdmVudCh0aGlzLmdyaWRzdGVyLCBlKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBpdGVtID0gdGhpcy5nZXRWYWxpZEl0ZW1Gcm9tRXZlbnQoZSk7XG4gICAgaWYgKCFpdGVtKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0aGlzLmdyaWRzdGVyLm9wdGlvbnMuZW1wdHlDZWxsQ2xpY2tDYWxsYmFjaykge1xuICAgICAgdGhpcy5ncmlkc3Rlci5vcHRpb25zLmVtcHR5Q2VsbENsaWNrQ2FsbGJhY2soZSwgaXRlbSk7XG4gICAgfVxuICAgIHRoaXMuZ3JpZHN0ZXIuY2RSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBlbXB0eUNlbGxDb250ZXh0TWVudUNiKGU6IGFueSk6IHZvaWQge1xuICAgIGlmICh0aGlzLmdyaWRzdGVyLm1vdmluZ0l0ZW0gfHwgR3JpZHN0ZXJVdGlscy5jaGVja0NvbnRlbnRDbGFzc0ZvckVtcHR5Q2VsbENsaWNrRXZlbnQodGhpcy5ncmlkc3RlciwgZSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgY29uc3QgaXRlbSA9IHRoaXMuZ2V0VmFsaWRJdGVtRnJvbUV2ZW50KGUpO1xuICAgIGlmICghaXRlbSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodGhpcy5ncmlkc3Rlci5vcHRpb25zLmVtcHR5Q2VsbENvbnRleHRNZW51Q2FsbGJhY2spIHtcbiAgICAgIHRoaXMuZ3JpZHN0ZXIub3B0aW9ucy5lbXB0eUNlbGxDb250ZXh0TWVudUNhbGxiYWNrKGUsIGl0ZW0pO1xuICAgIH1cbiAgICB0aGlzLmdyaWRzdGVyLmNkUmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgZW1wdHlDZWxsRHJhZ0Ryb3AoZTogYW55KTogdm9pZCB7XG4gICAgY29uc3QgaXRlbSA9IHRoaXMuZ2V0VmFsaWRJdGVtRnJvbUV2ZW50KGUpO1xuICAgIGlmICghaXRlbSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodGhpcy5ncmlkc3Rlci5vcHRpb25zLmVtcHR5Q2VsbERyb3BDYWxsYmFjaykge1xuICAgICAgdGhpcy5ncmlkc3Rlci5vcHRpb25zLmVtcHR5Q2VsbERyb3BDYWxsYmFjayhlLCBpdGVtKTtcbiAgICB9XG4gICAgdGhpcy5ncmlkc3Rlci5jZFJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIGVtcHR5Q2VsbERyYWdPdmVyKGU6IGFueSk6IHZvaWQge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGNvbnN0IGl0ZW0gPSB0aGlzLmdldFZhbGlkSXRlbUZyb21FdmVudChlKTtcbiAgICBpZiAoaXRlbSkge1xuICAgICAgZS5kYXRhVHJhbnNmZXIuZHJvcEVmZmVjdCA9ICdtb3ZlJztcbiAgICAgIHRoaXMuZ3JpZHN0ZXIubW92aW5nSXRlbSA9IGl0ZW07XG4gICAgfSBlbHNlIHtcbiAgICAgIGUuZGF0YVRyYW5zZmVyLmRyb3BFZmZlY3QgPSAnbm9uZSc7XG4gICAgICB0aGlzLmdyaWRzdGVyLm1vdmluZ0l0ZW0gPSBudWxsO1xuICAgIH1cbiAgICB0aGlzLmdyaWRzdGVyLnByZXZpZXdTdHlsZSgpO1xuICB9XG5cbiAgZW1wdHlDZWxsTW91c2VEb3duKGU6IGFueSk6IHZvaWQge1xuICAgIGlmIChHcmlkc3RlclV0aWxzLmNoZWNrQ29udGVudENsYXNzRm9yRW1wdHlDZWxsQ2xpY2tFdmVudCh0aGlzLmdyaWRzdGVyLCBlKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBjb25zdCBpdGVtID0gdGhpcy5nZXRWYWxpZEl0ZW1Gcm9tRXZlbnQoZSk7XG4gICAgY29uc3QgbGVmdE1vdXNlQnV0dG9uQ29kZSA9IDE7XG4gICAgaWYgKCFpdGVtIHx8IGUuYnV0dG9ucyAhPT0gbGVmdE1vdXNlQnV0dG9uQ29kZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmluaXRpYWxJdGVtID0gaXRlbTtcbiAgICB0aGlzLmdyaWRzdGVyLm1vdmluZ0l0ZW0gPSBpdGVtO1xuICAgIHRoaXMuZ3JpZHN0ZXIucHJldmlld1N0eWxlKCk7XG4gICAgdGhpcy5ncmlkc3Rlci56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHRoaXMuZW1wdHlDZWxsTU1vdmUgPSB0aGlzLmdyaWRzdGVyLnJlbmRlcmVyLmxpc3Rlbignd2luZG93JywgJ21vdXNlbW92ZScsIHRoaXMuZW1wdHlDZWxsTW91c2VNb3ZlLmJpbmQodGhpcykpO1xuICAgICAgdGhpcy5lbXB0eUNlbGxNTW92ZVRvdWNoID0gdGhpcy5ncmlkc3Rlci5yZW5kZXJlci5saXN0ZW4oJ3dpbmRvdycsICd0b3VjaG1vdmUnLCB0aGlzLmVtcHR5Q2VsbE1vdXNlTW92ZS5iaW5kKHRoaXMpKTtcbiAgICB9KTtcbiAgICB0aGlzLmVtcHR5Q2VsbFVwID0gdGhpcy5ncmlkc3Rlci5yZW5kZXJlci5saXN0ZW4oJ3dpbmRvdycsICdtb3VzZXVwJywgdGhpcy5lbXB0eUNlbGxNb3VzZVVwLmJpbmQodGhpcykpO1xuICAgIHRoaXMuZW1wdHlDZWxsVXBUb3VjaCA9IHRoaXMuZ3JpZHN0ZXIucmVuZGVyZXIubGlzdGVuKCd3aW5kb3cnLCAndG91Y2hlbmQnLCB0aGlzLmVtcHR5Q2VsbE1vdXNlVXAuYmluZCh0aGlzKSk7XG4gIH1cblxuICBlbXB0eUNlbGxNb3VzZU1vdmUoZTogYW55KTogdm9pZCB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgY29uc3QgaXRlbSA9IHRoaXMuZ2V0VmFsaWRJdGVtRnJvbUV2ZW50KGUsIHRoaXMuaW5pdGlhbEl0ZW0pO1xuICAgIGlmICghaXRlbSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuZ3JpZHN0ZXIubW92aW5nSXRlbSA9IGl0ZW07XG4gICAgdGhpcy5ncmlkc3Rlci5wcmV2aWV3U3R5bGUoKTtcbiAgfVxuXG4gIGVtcHR5Q2VsbE1vdXNlVXAoZTogYW55KTogdm9pZCB7XG4gICAgdGhpcy5lbXB0eUNlbGxNTW92ZSgpO1xuICAgIHRoaXMuZW1wdHlDZWxsTU1vdmVUb3VjaCgpO1xuICAgIHRoaXMuZW1wdHlDZWxsVXAoKTtcbiAgICB0aGlzLmVtcHR5Q2VsbFVwVG91Y2goKTtcbiAgICBjb25zdCBpdGVtID0gdGhpcy5nZXRWYWxpZEl0ZW1Gcm9tRXZlbnQoZSwgdGhpcy5pbml0aWFsSXRlbSk7XG4gICAgaWYgKGl0ZW0pIHtcbiAgICAgIHRoaXMuZ3JpZHN0ZXIubW92aW5nSXRlbSA9IGl0ZW07XG4gICAgfVxuICAgIGlmICh0aGlzLmdyaWRzdGVyLm9wdGlvbnMuZW1wdHlDZWxsRHJhZ0NhbGxiYWNrICYmIHRoaXMuZ3JpZHN0ZXIubW92aW5nSXRlbSkge1xuICAgICAgdGhpcy5ncmlkc3Rlci5vcHRpb25zLmVtcHR5Q2VsbERyYWdDYWxsYmFjayhlLCB0aGlzLmdyaWRzdGVyLm1vdmluZ0l0ZW0pO1xuICAgIH1cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuaW5pdGlhbEl0ZW0gPSBudWxsO1xuICAgICAgaWYgKHRoaXMuZ3JpZHN0ZXIpIHtcbiAgICAgICAgdGhpcy5ncmlkc3Rlci5tb3ZpbmdJdGVtID0gbnVsbDtcbiAgICAgICAgdGhpcy5ncmlkc3Rlci5wcmV2aWV3U3R5bGUoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLmdyaWRzdGVyLmNkUmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgZ2V0VmFsaWRJdGVtRnJvbUV2ZW50KGU6IGFueSwgb2xkSXRlbT86IEdyaWRzdGVySXRlbSB8IG51bGwpOiBHcmlkc3Rlckl0ZW0gfCB1bmRlZmluZWQge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIEdyaWRzdGVyVXRpbHMuY2hlY2tUb3VjaEV2ZW50KGUpO1xuICAgIGNvbnN0IHJlY3QgPSB0aGlzLmdyaWRzdGVyLmVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGNvbnN0IHggPSBlLmNsaWVudFggKyB0aGlzLmdyaWRzdGVyLmVsLnNjcm9sbExlZnQgLSByZWN0LmxlZnQgLSB0aGlzLmdyaWRzdGVyLiRvcHRpb25zLm1hcmdpbjtcbiAgICBjb25zdCB5ID0gZS5jbGllbnRZICsgdGhpcy5ncmlkc3Rlci5lbC5zY3JvbGxUb3AgLSByZWN0LnRvcCAtIHRoaXMuZ3JpZHN0ZXIuJG9wdGlvbnMubWFyZ2luO1xuICAgIGNvbnN0IGl0ZW06IEdyaWRzdGVySXRlbSA9IHtcbiAgICAgIHg6IHRoaXMuZ3JpZHN0ZXIucGl4ZWxzVG9Qb3NpdGlvblgoeCwgTWF0aC5mbG9vciwgdHJ1ZSksXG4gICAgICB5OiB0aGlzLmdyaWRzdGVyLnBpeGVsc1RvUG9zaXRpb25ZKHksIE1hdGguZmxvb3IsIHRydWUpLFxuICAgICAgY29sczogdGhpcy5ncmlkc3Rlci4kb3B0aW9ucy5kZWZhdWx0SXRlbUNvbHMsXG4gICAgICByb3dzOiB0aGlzLmdyaWRzdGVyLiRvcHRpb25zLmRlZmF1bHRJdGVtUm93c1xuICAgIH07XG4gICAgaWYgKG9sZEl0ZW0pIHtcbiAgICAgIGl0ZW0uY29scyA9IE1hdGgubWluKE1hdGguYWJzKG9sZEl0ZW0ueCAtIGl0ZW0ueCkgKyAxLCB0aGlzLmdyaWRzdGVyLiRvcHRpb25zLmVtcHR5Q2VsbERyYWdNYXhDb2xzKTtcbiAgICAgIGl0ZW0ucm93cyA9IE1hdGgubWluKE1hdGguYWJzKG9sZEl0ZW0ueSAtIGl0ZW0ueSkgKyAxLCB0aGlzLmdyaWRzdGVyLiRvcHRpb25zLmVtcHR5Q2VsbERyYWdNYXhSb3dzKTtcbiAgICAgIGlmIChvbGRJdGVtLnggPCBpdGVtLngpIHtcbiAgICAgICAgaXRlbS54ID0gb2xkSXRlbS54O1xuICAgICAgfSBlbHNlIGlmIChvbGRJdGVtLnggLSBpdGVtLnggPiB0aGlzLmdyaWRzdGVyLiRvcHRpb25zLmVtcHR5Q2VsbERyYWdNYXhDb2xzIC0gMSkge1xuICAgICAgICBpdGVtLnggPSB0aGlzLmdyaWRzdGVyLm1vdmluZ0l0ZW0gPyB0aGlzLmdyaWRzdGVyLm1vdmluZ0l0ZW0ueCA6IDA7XG4gICAgICB9XG4gICAgICBpZiAob2xkSXRlbS55IDwgaXRlbS55KSB7XG4gICAgICAgIGl0ZW0ueSA9IG9sZEl0ZW0ueTtcbiAgICAgIH0gZWxzZSBpZiAob2xkSXRlbS55IC0gaXRlbS55ID4gdGhpcy5ncmlkc3Rlci4kb3B0aW9ucy5lbXB0eUNlbGxEcmFnTWF4Um93cyAtIDEpIHtcbiAgICAgICAgaXRlbS55ID0gdGhpcy5ncmlkc3Rlci5tb3ZpbmdJdGVtID8gdGhpcy5ncmlkc3Rlci5tb3ZpbmdJdGVtLnkgOiAwO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAodGhpcy5ncmlkc3Rlci5jaGVja0NvbGxpc2lvbihpdGVtKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICByZXR1cm4gaXRlbTtcbiAgfVxufVxuIl19
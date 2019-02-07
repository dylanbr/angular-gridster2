/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZHN0ZXJFbXB0eUNlbGwuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItZ3JpZHN0ZXIyLyIsInNvdXJjZXMiOlsibGliL2dyaWRzdGVyRW1wdHlDZWxsLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFekMsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBRXRELE9BQU8sRUFBQywwQkFBMEIsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBR2hFLE1BQU0sT0FBTyxpQkFBaUI7Ozs7SUFlNUIsWUFBb0IsUUFBb0M7UUFBcEMsYUFBUSxHQUFSLFFBQVEsQ0FBNEI7SUFDeEQsQ0FBQzs7OztJQUVELE9BQU87UUFDTCxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDeEIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQztRQUNoQyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFO1lBQzlCLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLENBQUM7U0FDOUI7UUFDRCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDckIsSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ3RCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUNyQixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztTQUMzQjtJQUNILENBQUM7Ozs7SUFFRCxhQUFhO1FBQ1gsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxvQkFBb0IsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsc0JBQXNCLEVBQUU7WUFDdkgsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFB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LENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDcEU7U0FDRjtRQUNELElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDdEMsT0FBTztTQUNSO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDOzs7WUEzTkYsVUFBVTs7OztZQUZILDBCQUEwQjs7OztJQUloQyx3Q0FBaUM7O0lBQ2pDLDJDQUFnQzs7SUFDaEMsZ0RBQXFDOztJQUNyQyxpREFBc0M7O0lBQ3RDLDBDQUErQjs7SUFDL0IsMENBQStCOztJQUMvQiwrQ0FBb0M7O0lBQ3BDLDJDQUF5Qjs7SUFDekIsZ0RBQThCOztJQUM5Qix3Q0FBc0I7O0lBQ3RCLDZDQUEyQjs7SUFDM0IsMENBQStCOztJQUMvQiwwQ0FBK0I7Ozs7O0lBRW5CLHFDQUE0QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7R3JpZHN0ZXJVdGlsc30gZnJvbSAnLi9ncmlkc3RlclV0aWxzLnNlcnZpY2UnO1xuaW1wb3J0IHtHcmlkc3Rlckl0ZW19IGZyb20gJy4vZ3JpZHN0ZXJJdGVtLmludGVyZmFjZSc7XG5pbXBvcnQge0dyaWRzdGVyQ29tcG9uZW50SW50ZXJmYWNlfSBmcm9tICcuL2dyaWRzdGVyLmludGVyZmFjZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBHcmlkc3RlckVtcHR5Q2VsbCB7XG4gIGluaXRpYWxJdGVtOiBHcmlkc3Rlckl0ZW0gfCBudWxsO1xuICBlbXB0eUNlbGxDbGljazogRnVuY3Rpb24gfCBudWxsO1xuICBlbXB0eUNlbGxDbGlja1RvdWNoOiBGdW5jdGlvbiB8IG51bGw7XG4gIGVtcHR5Q2VsbENvbnRleHRNZW51OiBGdW5jdGlvbiB8IG51bGw7XG4gIGVtcHR5Q2VsbERyb3A6IEZ1bmN0aW9uIHwgbnVsbDtcbiAgZW1wdHlDZWxsRHJhZzogRnVuY3Rpb24gfCBudWxsO1xuICBlbXB0eUNlbGxEcmFnVG91Y2g6IEZ1bmN0aW9uIHwgbnVsbDtcbiAgZW1wdHlDZWxsTU1vdmU6IEZ1bmN0aW9uO1xuICBlbXB0eUNlbGxNTW92ZVRvdWNoOiBGdW5jdGlvbjtcbiAgZW1wdHlDZWxsVXA6IEZ1bmN0aW9uO1xuICBlbXB0eUNlbGxVcFRvdWNoOiBGdW5jdGlvbjtcbiAgZW1wdHlDZWxsTW92ZTogRnVuY3Rpb24gfCBudWxsO1xuICBlbXB0eUNlbGxFeGl0OiBGdW5jdGlvbiB8IG51bGw7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBncmlkc3RlcjogR3JpZHN0ZXJDb21wb25lbnRJbnRlcmZhY2UpIHtcbiAgfVxuXG4gIGRlc3Ryb3koKTogdm9pZCB7XG4gICAgZGVsZXRlIHRoaXMuaW5pdGlhbEl0ZW07XG4gICAgZGVsZXRlIHRoaXMuZ3JpZHN0ZXIubW92aW5nSXRlbTtcbiAgICBpZiAodGhpcy5ncmlkc3Rlci5wcmV2aWV3U3R5bGUpIHtcbiAgICAgIHRoaXMuZ3JpZHN0ZXIucHJldmlld1N0eWxlKCk7XG4gICAgfVxuICAgIGRlbGV0ZSB0aGlzLmdyaWRzdGVyO1xuICAgIGlmICh0aGlzLmVtcHR5Q2VsbEV4aXQpIHtcbiAgICAgIHRoaXMuZW1wdHlDZWxsRXhpdCgpO1xuICAgICAgdGhpcy5lbXB0eUNlbGxFeGl0ID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICB1cGRhdGVPcHRpb25zKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmdyaWRzdGVyLiRvcHRpb25zLmVuYWJsZUVtcHR5Q2VsbENsaWNrICYmICF0aGlzLmVtcHR5Q2VsbENsaWNrICYmIHRoaXMuZ3JpZHN0ZXIub3B0aW9ucy5lbXB0eUNlbGxDbGlja0NhbGxiYWNrKSB7XG4gICAgICB0aGlzLmVtcHR5Q2VsbENsaWNrID0gdGhpcy5ncmlkc3Rlci5yZW5kZXJlci5saXN0ZW4odGhpcy5ncmlkc3Rlci5lbCwgJ2NsaWNrJywgdGhpcy5lbXB0eUNlbGxDbGlja0NiLmJpbmQodGhpcykpO1xuICAgICAgdGhpcy5lbXB0eUNlbGxDbGlja1RvdWNoID0gdGhpcy5ncmlkc3Rlci5yZW5kZXJlci5saXN0ZW4odGhpcy5ncmlkc3Rlci5lbCwgJ3RvdWNoZW5kJywgdGhpcy5lbXB0eUNlbGxDbGlja0NiLmJpbmQodGhpcykpO1xuICAgIH0gZWxzZSBpZiAoIXRoaXMuZ3JpZHN0ZXIuJG9wdGlvbnMuZW5hYmxlRW1wdHlDZWxsQ2xpY2sgJiYgdGhpcy5lbXB0eUNlbGxDbGljayAmJiB0aGlzLmVtcHR5Q2VsbENsaWNrVG91Y2gpIHtcbiAgICAgIHRoaXMuZW1wdHlDZWxsQ2xpY2soKTtcbiAgICAgIHRoaXMuZW1wdHlDZWxsQ2xpY2tUb3VjaCgpO1xuICAgICAgdGhpcy5lbXB0eUNlbGxDbGljayA9IG51bGw7XG4gICAgICB0aGlzLmVtcHR5Q2VsbENsaWNrVG91Y2ggPSBudWxsO1xuICAgIH1cbiAgICBpZiAodGhpcy5ncmlkc3Rlci4kb3B0aW9ucy5lbmFibGVFbXB0eUNlbGxDb250ZXh0TWVudSAmJiAhdGhpcy5lbXB0eUNlbGxDb250ZXh0TWVudSAmJlxuICAgICAgdGhpcy5ncmlkc3Rlci5vcHRpb25zLmVtcHR5Q2VsbENvbnRleHRNZW51Q2FsbGJhY2spIHtcbiAgICAgIHRoaXMuZW1wdHlDZWxsQ29udGV4dE1lbnUgPSB0aGlzLmdyaWRzdGVyLnJlbmRlcmVyLmxpc3Rlbih0aGlzLmdyaWRzdGVyLmVsLCAnY29udGV4dG1lbnUnLCB0aGlzLmVtcHR5Q2VsbENvbnRleHRNZW51Q2IuYmluZCh0aGlzKSk7XG4gICAgfSBlbHNlIGlmICghdGhpcy5ncmlkc3Rlci4kb3B0aW9ucy5lbmFibGVFbXB0eUNlbGxDb250ZXh0TWVudSAmJiB0aGlzLmVtcHR5Q2VsbENvbnRleHRNZW51KSB7XG4gICAgICB0aGlzLmVtcHR5Q2VsbENvbnRleHRNZW51KCk7XG4gICAgICB0aGlzLmVtcHR5Q2VsbENvbnRleHRNZW51ID0gbnVsbDtcbiAgICB9XG4gICAgaWYgKHRoaXMuZ3JpZHN0ZXIuJG9wdGlvbnMuZW5hYmxlRW1wdHlDZWxsRHJvcCAmJiAhdGhpcy5lbXB0eUNlbGxEcm9wICYmIHRoaXMuZ3JpZHN0ZXIub3B0aW9ucy5lbXB0eUNlbGxEcm9wQ2FsbGJhY2spIHtcbiAgICAgIHRoaXMuZW1wdHlDZWxsRHJvcCA9IHRoaXMuZ3JpZHN0ZXIucmVuZGVyZXIubGlzdGVuKHRoaXMuZ3JpZHN0ZXIuZWwsICdkcm9wJywgdGhpcy5lbXB0eUNlbGxEcmFnRHJvcC5iaW5kKHRoaXMpKTtcbiAgICAgIHRoaXMuZ3JpZHN0ZXIuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgIHRoaXMuZW1wdHlDZWxsTW92ZSA9IHRoaXMuZ3JpZHN0ZXIucmVuZGVyZXIubGlzdGVuKHRoaXMuZ3JpZHN0ZXIuZWwsICdkcmFnb3ZlcicsIHRoaXMuZW1wdHlDZWxsRHJhZ092ZXIuYmluZCh0aGlzKSk7XG4gICAgICB9KTtcbiAgICAgIHRoaXMuZW1wdHlDZWxsRXhpdCA9IHRoaXMuZ3JpZHN0ZXIucmVuZGVyZXIubGlzdGVuKCdkb2N1bWVudCcsICdkcmFnZW5kJywgKCkgPT4ge1xuICAgICAgICB0aGlzLmdyaWRzdGVyLm1vdmluZ0l0ZW0gPSBudWxsO1xuICAgICAgICB0aGlzLmdyaWRzdGVyLnByZXZpZXdTdHlsZSgpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmICghdGhpcy5ncmlkc3Rlci4kb3B0aW9ucy5lbmFibGVFbXB0eUNlbGxEcm9wICYmIHRoaXMuZW1wdHlDZWxsRHJvcCAmJiB0aGlzLmVtcHR5Q2VsbE1vdmUgJiYgdGhpcy5lbXB0eUNlbGxFeGl0KSB7XG4gICAgICB0aGlzLmVtcHR5Q2VsbERyb3AoKTtcbiAgICAgIHRoaXMuZW1wdHlDZWxsTW92ZSgpO1xuICAgICAgdGhpcy5lbXB0eUNlbGxFeGl0KCk7XG4gICAgICB0aGlzLmVtcHR5Q2VsbE1vdmUgPSBudWxsO1xuICAgICAgdGhpcy5lbXB0eUNlbGxEcm9wID0gbnVsbDtcbiAgICAgIHRoaXMuZW1wdHlDZWxsRXhpdCA9IG51bGw7XG4gICAgfVxuICAgIGlmICh0aGlzLmdyaWRzdGVyLiRvcHRpb25zLmVuYWJsZUVtcHR5Q2VsbERyYWcgJiYgIXRoaXMuZW1wdHlDZWxsRHJhZyAmJiB0aGlzLmdyaWRzdGVyLm9wdGlvbnMuZW1wdHlDZWxsRHJhZ0NhbGxiYWNrKSB7XG4gICAgICB0aGlzLmVtcHR5Q2VsbERyYWcgPSB0aGlzLmdyaWRzdGVyLnJlbmRlcmVyLmxpc3Rlbih0aGlzLmdyaWRzdGVyLmVsLCAnbW91c2Vkb3duJywgdGhpcy5lbXB0eUNlbGxNb3VzZURvd24uYmluZCh0aGlzKSk7XG4gICAgICB0aGlzLmVtcHR5Q2VsbERyYWdUb3VjaCA9IHRoaXMuZ3JpZHN0ZXIucmVuZGVyZXIubGlzdGVuKHRoaXMuZ3JpZHN0ZXIuZWwsICd0b3VjaHN0YXJ0JywgdGhpcy5lbXB0eUNlbGxNb3VzZURvd24uYmluZCh0aGlzKSk7XG4gICAgfSBlbHNlIGlmICghdGhpcy5ncmlkc3Rlci4kb3B0aW9ucy5lbmFibGVFbXB0eUNlbGxEcmFnICYmIHRoaXMuZW1wdHlDZWxsRHJhZyAmJiB0aGlzLmVtcHR5Q2VsbERyYWdUb3VjaCkge1xuICAgICAgdGhpcy5lbXB0eUNlbGxEcmFnKCk7XG4gICAgICB0aGlzLmVtcHR5Q2VsbERyYWdUb3VjaCgpO1xuICAgICAgdGhpcy5lbXB0eUNlbGxEcmFnID0gbnVsbDtcbiAgICAgIHRoaXMuZW1wdHlDZWxsRHJhZ1RvdWNoID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICBlbXB0eUNlbGxDbGlja0NiKGU6IGFueSk6IHZvaWQge1xuICAgIGlmICh0aGlzLmdyaWRzdGVyLm1vdmluZ0l0ZW0gfHwgR3JpZHN0ZXJVdGlscy5jaGVja0NvbnRlbnRDbGFzc0ZvckVtcHR5Q2VsbENsaWNrRXZlbnQodGhpcy5ncmlkc3RlciwgZSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgaXRlbSA9IHRoaXMuZ2V0VmFsaWRJdGVtRnJvbUV2ZW50KGUpO1xuICAgIGlmICghaXRlbSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodGhpcy5ncmlkc3Rlci5vcHRpb25zLmVtcHR5Q2VsbENsaWNrQ2FsbGJhY2spIHtcbiAgICAgIHRoaXMuZ3JpZHN0ZXIub3B0aW9ucy5lbXB0eUNlbGxDbGlja0NhbGxiYWNrKGUsIGl0ZW0pO1xuICAgIH1cbiAgICB0aGlzLmdyaWRzdGVyLmNkUmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgZW1wdHlDZWxsQ29udGV4dE1lbnVDYihlOiBhbnkpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5ncmlkc3Rlci5tb3ZpbmdJdGVtIHx8IEdyaWRzdGVyVXRpbHMuY2hlY2tDb250ZW50Q2xhc3NGb3JFbXB0eUNlbGxDbGlja0V2ZW50KHRoaXMuZ3JpZHN0ZXIsIGUpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGNvbnN0IGl0ZW0gPSB0aGlzLmdldFZhbGlkSXRlbUZyb21FdmVudChlKTtcbiAgICBpZiAoIWl0ZW0pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHRoaXMuZ3JpZHN0ZXIub3B0aW9ucy5lbXB0eUNlbGxDb250ZXh0TWVudUNhbGxiYWNrKSB7XG4gICAgICB0aGlzLmdyaWRzdGVyLm9wdGlvbnMuZW1wdHlDZWxsQ29udGV4dE1lbnVDYWxsYmFjayhlLCBpdGVtKTtcbiAgICB9XG4gICAgdGhpcy5ncmlkc3Rlci5jZFJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIGVtcHR5Q2VsbERyYWdEcm9wKGU6IGFueSk6IHZvaWQge1xuICAgIGNvbnN0IGl0ZW0gPSB0aGlzLmdldFZhbGlkSXRlbUZyb21FdmVudChlKTtcbiAgICBpZiAoIWl0ZW0pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHRoaXMuZ3JpZHN0ZXIub3B0aW9ucy5lbXB0eUNlbGxEcm9wQ2FsbGJhY2spIHtcbiAgICAgIHRoaXMuZ3JpZHN0ZXIub3B0aW9ucy5lbXB0eUNlbGxEcm9wQ2FsbGJhY2soZSwgaXRlbSk7XG4gICAgfVxuICAgIHRoaXMuZ3JpZHN0ZXIuY2RSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBlbXB0eUNlbGxEcmFnT3ZlcihlOiBhbnkpOiB2b2lkIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBjb25zdCBpdGVtID0gdGhpcy5nZXRWYWxpZEl0ZW1Gcm9tRXZlbnQoZSk7XG4gICAgaWYgKGl0ZW0pIHtcbiAgICAgIGUuZGF0YVRyYW5zZmVyLmRyb3BFZmZlY3QgPSAnbW92ZSc7XG4gICAgICB0aGlzLmdyaWRzdGVyLm1vdmluZ0l0ZW0gPSBpdGVtO1xuICAgIH0gZWxzZSB7XG4gICAgICBlLmRhdGFUcmFuc2Zlci5kcm9wRWZmZWN0ID0gJ25vbmUnO1xuICAgICAgdGhpcy5ncmlkc3Rlci5tb3ZpbmdJdGVtID0gbnVsbDtcbiAgICB9XG4gICAgdGhpcy5ncmlkc3Rlci5wcmV2aWV3U3R5bGUoKTtcbiAgfVxuXG4gIGVtcHR5Q2VsbE1vdXNlRG93bihlOiBhbnkpOiB2b2lkIHtcbiAgICBpZiAoR3JpZHN0ZXJVdGlscy5jaGVja0NvbnRlbnRDbGFzc0ZvckVtcHR5Q2VsbENsaWNrRXZlbnQodGhpcy5ncmlkc3RlciwgZSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgY29uc3QgaXRlbSA9IHRoaXMuZ2V0VmFsaWRJdGVtRnJvbUV2ZW50KGUpO1xuICAgIGNvbnN0IGxlZnRNb3VzZUJ1dHRvbkNvZGUgPSAxO1xuICAgIGlmICghaXRlbSB8fCBlLmJ1dHRvbnMgIT09IGxlZnRNb3VzZUJ1dHRvbkNvZGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5pbml0aWFsSXRlbSA9IGl0ZW07XG4gICAgdGhpcy5ncmlkc3Rlci5tb3ZpbmdJdGVtID0gaXRlbTtcbiAgICB0aGlzLmdyaWRzdGVyLnByZXZpZXdTdHlsZSgpO1xuICAgIHRoaXMuZ3JpZHN0ZXIuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICB0aGlzLmVtcHR5Q2VsbE1Nb3ZlID0gdGhpcy5ncmlkc3Rlci5yZW5kZXJlci5saXN0ZW4oJ3dpbmRvdycsICdtb3VzZW1vdmUnLCB0aGlzLmVtcHR5Q2VsbE1vdXNlTW92ZS5iaW5kKHRoaXMpKTtcbiAgICAgIHRoaXMuZW1wdHlDZWxsTU1vdmVUb3VjaCA9IHRoaXMuZ3JpZHN0ZXIucmVuZGVyZXIubGlzdGVuKCd3aW5kb3cnLCAndG91Y2htb3ZlJywgdGhpcy5lbXB0eUNlbGxNb3VzZU1vdmUuYmluZCh0aGlzKSk7XG4gICAgfSk7XG4gICAgdGhpcy5lbXB0eUNlbGxVcCA9IHRoaXMuZ3JpZHN0ZXIucmVuZGVyZXIubGlzdGVuKCd3aW5kb3cnLCAnbW91c2V1cCcsIHRoaXMuZW1wdHlDZWxsTW91c2VVcC5iaW5kKHRoaXMpKTtcbiAgICB0aGlzLmVtcHR5Q2VsbFVwVG91Y2ggPSB0aGlzLmdyaWRzdGVyLnJlbmRlcmVyLmxpc3Rlbignd2luZG93JywgJ3RvdWNoZW5kJywgdGhpcy5lbXB0eUNlbGxNb3VzZVVwLmJpbmQodGhpcykpO1xuICB9XG5cbiAgZW1wdHlDZWxsTW91c2VNb3ZlKGU6IGFueSk6IHZvaWQge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGNvbnN0IGl0ZW0gPSB0aGlzLmdldFZhbGlkSXRlbUZyb21FdmVudChlLCB0aGlzLmluaXRpYWxJdGVtKTtcbiAgICBpZiAoIWl0ZW0pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmdyaWRzdGVyLm1vdmluZ0l0ZW0gPSBpdGVtO1xuICAgIHRoaXMuZ3JpZHN0ZXIucHJldmlld1N0eWxlKCk7XG4gIH1cblxuICBlbXB0eUNlbGxNb3VzZVVwKGU6IGFueSk6IHZvaWQge1xuICAgIHRoaXMuZW1wdHlDZWxsTU1vdmUoKTtcbiAgICB0aGlzLmVtcHR5Q2VsbE1Nb3ZlVG91Y2goKTtcbiAgICB0aGlzLmVtcHR5Q2VsbFVwKCk7XG4gICAgdGhpcy5lbXB0eUNlbGxVcFRvdWNoKCk7XG4gICAgY29uc3QgaXRlbSA9IHRoaXMuZ2V0VmFsaWRJdGVtRnJvbUV2ZW50KGUsIHRoaXMuaW5pdGlhbEl0ZW0pO1xuICAgIGlmIChpdGVtKSB7XG4gICAgICB0aGlzLmdyaWRzdGVyLm1vdmluZ0l0ZW0gPSBpdGVtO1xuICAgIH1cbiAgICBpZiAodGhpcy5ncmlkc3Rlci5vcHRpb25zLmVtcHR5Q2VsbERyYWdDYWxsYmFjayAmJiB0aGlzLmdyaWRzdGVyLm1vdmluZ0l0ZW0pIHtcbiAgICAgIHRoaXMuZ3JpZHN0ZXIub3B0aW9ucy5lbXB0eUNlbGxEcmFnQ2FsbGJhY2soZSwgdGhpcy5ncmlkc3Rlci5tb3ZpbmdJdGVtKTtcbiAgICB9XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLmluaXRpYWxJdGVtID0gbnVsbDtcbiAgICAgIGlmICh0aGlzLmdyaWRzdGVyKSB7XG4gICAgICAgIHRoaXMuZ3JpZHN0ZXIubW92aW5nSXRlbSA9IG51bGw7XG4gICAgICAgIHRoaXMuZ3JpZHN0ZXIucHJldmlld1N0eWxlKCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5ncmlkc3Rlci5jZFJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIGdldFZhbGlkSXRlbUZyb21FdmVudChlOiBhbnksIG9sZEl0ZW0/OiBHcmlkc3Rlckl0ZW0gfCBudWxsKTogR3JpZHN0ZXJJdGVtIHwgdW5kZWZpbmVkIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBHcmlkc3RlclV0aWxzLmNoZWNrVG91Y2hFdmVudChlKTtcbiAgICBjb25zdCByZWN0ID0gdGhpcy5ncmlkc3Rlci5lbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBjb25zdCB4ID0gZS5jbGllbnRYICsgdGhpcy5ncmlkc3Rlci5lbC5zY3JvbGxMZWZ0IC0gcmVjdC5sZWZ0IC0gdGhpcy5ncmlkc3Rlci4kb3B0aW9ucy5tYXJnaW47XG4gICAgY29uc3QgeSA9IGUuY2xpZW50WSArIHRoaXMuZ3JpZHN0ZXIuZWwuc2Nyb2xsVG9wIC0gcmVjdC50b3AgLSB0aGlzLmdyaWRzdGVyLiRvcHRpb25zLm1hcmdpbjtcbiAgICBjb25zdCBpdGVtOiBHcmlkc3Rlckl0ZW0gPSB7XG4gICAgICB4OiB0aGlzLmdyaWRzdGVyLnBpeGVsc1RvUG9zaXRpb25YKHgsIE1hdGguZmxvb3IsIHRydWUpLFxuICAgICAgeTogdGhpcy5ncmlkc3Rlci5waXhlbHNUb1Bvc2l0aW9uWSh5LCBNYXRoLmZsb29yLCB0cnVlKSxcbiAgICAgIGNvbHM6IHRoaXMuZ3JpZHN0ZXIuJG9wdGlvbnMuZGVmYXVsdEl0ZW1Db2xzLFxuICAgICAgcm93czogdGhpcy5ncmlkc3Rlci4kb3B0aW9ucy5kZWZhdWx0SXRlbVJvd3NcbiAgICB9O1xuICAgIGlmIChvbGRJdGVtKSB7XG4gICAgICBpdGVtLmNvbHMgPSBNYXRoLm1pbihNYXRoLmFicyhvbGRJdGVtLnggLSBpdGVtLngpICsgMSwgdGhpcy5ncmlkc3Rlci4kb3B0aW9ucy5lbXB0eUNlbGxEcmFnTWF4Q29scyk7XG4gICAgICBpdGVtLnJvd3MgPSBNYXRoLm1pbihNYXRoLmFicyhvbGRJdGVtLnkgLSBpdGVtLnkpICsgMSwgdGhpcy5ncmlkc3Rlci4kb3B0aW9ucy5lbXB0eUNlbGxEcmFnTWF4Um93cyk7XG4gICAgICBpZiAob2xkSXRlbS54IDwgaXRlbS54KSB7XG4gICAgICAgIGl0ZW0ueCA9IG9sZEl0ZW0ueDtcbiAgICAgIH0gZWxzZSBpZiAob2xkSXRlbS54IC0gaXRlbS54ID4gdGhpcy5ncmlkc3Rlci4kb3B0aW9ucy5lbXB0eUNlbGxEcmFnTWF4Q29scyAtIDEpIHtcbiAgICAgICAgaXRlbS54ID0gdGhpcy5ncmlkc3Rlci5tb3ZpbmdJdGVtID8gdGhpcy5ncmlkc3Rlci5tb3ZpbmdJdGVtLnggOiAwO1xuICAgICAgfVxuICAgICAgaWYgKG9sZEl0ZW0ueSA8IGl0ZW0ueSkge1xuICAgICAgICBpdGVtLnkgPSBvbGRJdGVtLnk7XG4gICAgICB9IGVsc2UgaWYgKG9sZEl0ZW0ueSAtIGl0ZW0ueSA+IHRoaXMuZ3JpZHN0ZXIuJG9wdGlvbnMuZW1wdHlDZWxsRHJhZ01heFJvd3MgLSAxKSB7XG4gICAgICAgIGl0ZW0ueSA9IHRoaXMuZ3JpZHN0ZXIubW92aW5nSXRlbSA/IHRoaXMuZ3JpZHN0ZXIubW92aW5nSXRlbS55IDogMDtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRoaXMuZ3JpZHN0ZXIuY2hlY2tDb2xsaXNpb24oaXRlbSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcmV0dXJuIGl0ZW07XG4gIH1cbn1cbiJdfQ==
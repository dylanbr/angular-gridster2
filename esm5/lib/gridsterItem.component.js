/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ElementRef, Host, Input, NgZone, Renderer2, ViewEncapsulation } from '@angular/core';
import { GridsterDraggable } from './gridsterDraggable.service';
import { GridsterResizable } from './gridsterResizable.service';
import { GridsterUtils } from './gridsterUtils.service';
import { GridsterComponent } from './gridster.component';
var GridsterItemComponent = /** @class */ (function () {
    function GridsterItemComponent(el, gridster, renderer, zone) {
        this.renderer = renderer;
        this.zone = zone;
        this.el = el.nativeElement;
        this.$item = {
            cols: -1,
            rows: -1,
            x: -1,
            y: -1,
        };
        this.gridster = gridster;
        this.drag = new GridsterDraggable(this, gridster, this.zone);
        this.resize = new GridsterResizable(this, gridster, this.zone);
    }
    /**
     * @return {?}
     */
    GridsterItemComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.updateOptions();
        this.gridster.addItem(this);
    };
    /**
     * @return {?}
     */
    GridsterItemComponent.prototype.updateOptions = /**
     * @return {?}
     */
    function () {
        this.$item = GridsterUtils.merge(this.$item, this.item, {
            cols: undefined,
            rows: undefined,
            x: undefined,
            y: undefined,
            dragEnabled: undefined,
            dragLimit: undefined,
            resizeEnabled: undefined,
            compactEnabled: undefined,
            maxItemRows: undefined,
            minItemRows: undefined,
            maxItemCols: undefined,
            minItemCols: undefined,
            maxItemArea: undefined,
            minItemArea: undefined,
        });
    };
    /**
     * @return {?}
     */
    GridsterItemComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.gridster.removeItem(this);
        delete this.gridster;
        this.drag.destroy();
        delete this.drag;
        this.resize.destroy();
        delete this.resize;
    };
    /**
     * @return {?}
     */
    GridsterItemComponent.prototype.setSize = /**
     * @return {?}
     */
    function () {
        this.renderer.setStyle(this.el, 'display', this.notPlaced ? '' : 'block');
        this.gridster.gridRenderer.updateItem(this.el, this.$item, this.renderer);
        this.updateItemSize();
    };
    /**
     * @return {?}
     */
    GridsterItemComponent.prototype.updateItemSize = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var top = this.$item.y * this.gridster.curRowHeight;
        /** @type {?} */
        var left = this.$item.x * this.gridster.curColWidth;
        /** @type {?} */
        var width = this.$item.cols * this.gridster.curColWidth - this.gridster.$options.margin;
        /** @type {?} */
        var height = this.$item.rows * this.gridster.curRowHeight - this.gridster.$options.margin;
        if (!this.init && width > 0 && height > 0) {
            this.init = true;
            if (this.item.initCallback) {
                this.item.initCallback(this.item, this);
            }
            if (this.gridster.options.itemInitCallback) {
                this.gridster.options.itemInitCallback(this.item, this);
            }
            if (this.gridster.$options.scrollToNewItems) {
                this.el.scrollIntoView(false);
            }
        }
        if (width !== this.width || height !== this.height) {
            this.width = width;
            this.height = height;
            if (this.gridster.options.itemResizeCallback) {
                this.gridster.options.itemResizeCallback(this.item, this);
            }
        }
        this.top = top;
        this.left = left;
    };
    /**
     * @param {?} oldItem
     * @return {?}
     */
    GridsterItemComponent.prototype.itemChanged = /**
     * @param {?} oldItem
     * @return {?}
     */
    function (oldItem) {
        if (this.gridster.options.itemChangeCallback) {
            this.gridster.options.itemChangeCallback(this.item, this, oldItem);
        }
    };
    /**
     * @param {?} newValue
     * @param {?} oldValue
     * @return {?}
     */
    GridsterItemComponent.prototype.checkItemChanges = /**
     * @param {?} newValue
     * @param {?} oldValue
     * @return {?}
     */
    function (newValue, oldValue) {
        if (newValue.rows === oldValue.rows && newValue.cols === oldValue.cols && newValue.x === oldValue.x && newValue.y === oldValue.y) {
            return;
        }
        if (this.gridster.checkCollision(this.$item)) {
            this.$item.x = oldValue.x || 0;
            this.$item.y = oldValue.y || 0;
            this.$item.cols = oldValue.cols || 1;
            this.$item.rows = oldValue.rows || 1;
            this.setSize();
        }
        else {
            /** @type {?} */
            var oldItem = {
                x: oldValue.x,
                y: oldValue.y,
                rows: oldValue.rows,
                cols: oldValue.cols
            };
            this.item.cols = this.$item.cols;
            this.item.rows = this.$item.rows;
            this.item.x = this.$item.x;
            this.item.y = this.$item.y;
            this.gridster.calculateLayoutDebounce();
            this.itemChanged(oldItem);
        }
    };
    /**
     * @return {?}
     */
    GridsterItemComponent.prototype.canBeDragged = /**
     * @return {?}
     */
    function () {
        return !this.gridster.mobile &&
            (this.$item.dragEnabled === undefined ? this.gridster.$options.draggable.enabled : this.$item.dragEnabled);
    };
    /**
     * @return {?}
     */
    GridsterItemComponent.prototype.dragLimit = /**
     * @return {?}
     */
    function () {
        if (this.$item.dragLimit === undefined)
            return false;
        if (this.$item.dragLimit === "x" || this.$item.dragLimit === "y")
            return this.$item.dragLimit;
        return false;
    };
    /**
     * @return {?}
     */
    GridsterItemComponent.prototype.canBeResized = /**
     * @return {?}
     */
    function () {
        return !this.gridster.mobile &&
            (this.$item.resizeEnabled === undefined ? this.gridster.$options.resizable.enabled : this.$item.resizeEnabled);
    };
    GridsterItemComponent.decorators = [
        { type: Component, args: [{
                    selector: 'gridster-item',
                    template: "<ng-content></ng-content>\n<div (mousedown)=\"resize.dragStartDelay($event)\" (touchstart)=\"resize.dragStartDelay($event)\"\n     [hidden]=\"!gridster.$options.resizable.handles.s || !resize.resizeEnabled\"\n     class=\"gridster-item-resizable-handler handle-s\"></div>\n<div (mousedown)=\"resize.dragStartDelay($event)\" (touchstart)=\"resize.dragStartDelay($event)\"\n     [hidden]=\"!gridster.$options.resizable.handles.e || !resize.resizeEnabled\"\n     class=\"gridster-item-resizable-handler handle-e\"></div>\n<div (mousedown)=\"resize.dragStartDelay($event)\" (touchstart)=\"resize.dragStartDelay($event)\"\n     [hidden]=\"!gridster.$options.resizable.handles.n || !resize.resizeEnabled\"\n     class=\"gridster-item-resizable-handler handle-n\"></div>\n<div (mousedown)=\"resize.dragStartDelay($event)\" (touchstart)=\"resize.dragStartDelay($event)\"\n     [hidden]=\"!gridster.$options.resizable.handles.w || !resize.resizeEnabled\"\n     class=\"gridster-item-resizable-handler handle-w\"></div>\n<div (mousedown)=\"resize.dragStartDelay($event)\" (touchstart)=\"resize.dragStartDelay($event)\"\n     [hidden]=\"!gridster.$options.resizable.handles.se || !resize.resizeEnabled\"\n     class=\"gridster-item-resizable-handler handle-se\"></div>\n<div (mousedown)=\"resize.dragStartDelay($event)\" (touchstart)=\"resize.dragStartDelay($event)\"\n     [hidden]=\"!gridster.$options.resizable.handles.ne || !resize.resizeEnabled\"\n     class=\"gridster-item-resizable-handler handle-ne\"></div>\n<div (mousedown)=\"resize.dragStartDelay($event)\" (touchstart)=\"resize.dragStartDelay($event)\"\n     [hidden]=\"!gridster.$options.resizable.handles.sw || !resize.resizeEnabled\"\n     class=\"gridster-item-resizable-handler handle-sw\"></div>\n<div (mousedown)=\"resize.dragStartDelay($event)\" (touchstart)=\"resize.dragStartDelay($event)\"\n     [hidden]=\"!gridster.$options.resizable.handles.nw || !resize.resizeEnabled\"\n     class=\"gridster-item-resizable-handler handle-nw\"></div>\n",
                    encapsulation: ViewEncapsulation.None,
                    styles: ["gridster-item{box-sizing:border-box;z-index:1;position:absolute;overflow:hidden;transition:.3s;display:none;background:#fff;-webkit-user-select:text;-moz-user-select:text;-ms-user-select:text;user-select:text}gridster-item.gridster-item-moving{cursor:move}gridster-item.gridster-item-moving,gridster-item.gridster-item-resizing{transition:none;z-index:2;box-shadow:0 0 5px 5px rgba(0,0,0,.2),0 6px 10px 0 rgba(0,0,0,.14),0 1px 18px 0 rgba(0,0,0,.12)}.gridster-item-resizable-handler{position:absolute;z-index:2}.gridster-item-resizable-handler.handle-n{cursor:n-resize;height:10px;right:0;top:0;left:0}.gridster-item-resizable-handler.handle-e{cursor:e-resize;width:10px;bottom:0;right:0;top:0}.gridster-item-resizable-handler.handle-s{cursor:s-resize;height:10px;right:0;bottom:0;left:0}.gridster-item-resizable-handler.handle-w{cursor:w-resize;width:10px;left:0;top:0;bottom:0}.gridster-item-resizable-handler.handle-ne{cursor:ne-resize;width:10px;height:10px;right:0;top:0}.gridster-item-resizable-handler.handle-nw{cursor:nw-resize;width:10px;height:10px;left:0;top:0}.gridster-item-resizable-handler.handle-se{cursor:se-resize;width:0;height:0;right:0;bottom:0;border-style:solid;border-width:0 0 10px 10px;border-color:transparent}.gridster-item-resizable-handler.handle-sw{cursor:sw-resize;width:10px;height:10px;left:0;bottom:0}gridster-item:hover .gridster-item-resizable-handler.handle-se{border-color:transparent transparent #ccc}"]
                }] }
    ];
    /** @nocollapse */
    GridsterItemComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: GridsterComponent, decorators: [{ type: Host }] },
        { type: Renderer2 },
        { type: NgZone }
    ]; };
    GridsterItemComponent.propDecorators = {
        item: [{ type: Input }]
    };
    return GridsterItemComponent;
}());
export { GridsterItemComponent };
if (false) {
    /** @type {?} */
    GridsterItemComponent.prototype.item;
    /** @type {?} */
    GridsterItemComponent.prototype.$item;
    /** @type {?} */
    GridsterItemComponent.prototype.el;
    /** @type {?} */
    GridsterItemComponent.prototype.gridster;
    /** @type {?} */
    GridsterItemComponent.prototype.top;
    /** @type {?} */
    GridsterItemComponent.prototype.left;
    /** @type {?} */
    GridsterItemComponent.prototype.width;
    /** @type {?} */
    GridsterItemComponent.prototype.height;
    /** @type {?} */
    GridsterItemComponent.prototype.drag;
    /** @type {?} */
    GridsterItemComponent.prototype.resize;
    /** @type {?} */
    GridsterItemComponent.prototype.notPlaced;
    /** @type {?} */
    GridsterItemComponent.prototype.init;
    /** @type {?} */
    GridsterItemComponent.prototype.renderer;
    /**
     * @type {?}
     * @private
     */
    GridsterItemComponent.prototype.zone;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZHN0ZXJJdGVtLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItZ3JpZHN0ZXIyLyIsInNvdXJjZXMiOlsibGliL2dyaWRzdGVySXRlbS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFxQixTQUFTLEVBQUUsaUJBQWlCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFHMUgsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sNkJBQTZCLENBQUM7QUFDOUQsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sNkJBQTZCLENBQUM7QUFDOUQsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBRXRELE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBRXZEO0lBb0JFLCtCQUFZLEVBQWMsRUFBVSxRQUEyQixFQUFTLFFBQW1CLEVBQVUsSUFBWTtRQUF6QyxhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQVUsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUMvRyxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxhQUFhLENBQUM7UUFDM0IsSUFBSSxDQUFDLEtBQUssR0FBRztZQUNYLElBQUksRUFBRSxDQUFDLENBQUM7WUFDUixJQUFJLEVBQUUsQ0FBQyxDQUFDO1lBQ1IsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNMLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDTixDQUFDO1FBQ0YsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDekIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLGlCQUFpQixDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzdELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxpQkFBaUIsQ0FBQyxJQUFJLEVB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Qzs7OztnQkFka0IsVUFBVTtnQkFPckIsaUJBQWlCLHVCQXNCTSxJQUFJO2dCQTdCb0MsU0FBUztnQkFBcEMsTUFBTTs7O3VCQWdCL0MsS0FBSzs7SUE4SVIsNEJBQUM7Q0FBQSxBQXJKRCxJQXFKQztTQS9JWSxxQkFBcUI7OztJQUNoQyxxQ0FBNEI7O0lBQzVCLHNDQUFvQjs7SUFDcEIsbUNBQVE7O0lBQ1IseUNBQTRCOztJQUM1QixvQ0FBWTs7SUFDWixxQ0FBYTs7SUFDYixzQ0FBYzs7SUFDZCx1Q0FBZTs7SUFDZixxQ0FBd0I7O0lBQ3hCLHVDQUEwQjs7SUFDMUIsMENBQW1COztJQUNuQixxQ0FBYzs7SUFFbUQseUNBQTBCOzs7OztJQUFFLHFDQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBFbGVtZW50UmVmLCBIb3N0LCBJbnB1dCwgTmdab25lLCBPbkRlc3Ryb3ksIE9uSW5pdCwgUmVuZGVyZXIyLCBWaWV3RW5jYXBzdWxhdGlvbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7R3JpZHN0ZXJJdGVtfSBmcm9tICcuL2dyaWRzdGVySXRlbS5pbnRlcmZhY2UnO1xuaW1wb3J0IHtHcmlkc3RlckRyYWdnYWJsZX0gZnJvbSAnLi9ncmlkc3RlckRyYWdnYWJsZS5zZXJ2aWNlJztcbmltcG9ydCB7R3JpZHN0ZXJSZXNpemFibGV9IGZyb20gJy4vZ3JpZHN0ZXJSZXNpemFibGUuc2VydmljZSc7XG5pbXBvcnQge0dyaWRzdGVyVXRpbHN9IGZyb20gJy4vZ3JpZHN0ZXJVdGlscy5zZXJ2aWNlJztcbmltcG9ydCB7R3JpZHN0ZXJJdGVtQ29tcG9uZW50SW50ZXJmYWNlfSBmcm9tICcuL2dyaWRzdGVySXRlbUNvbXBvbmVudC5pbnRlcmZhY2UnO1xuaW1wb3J0IHtHcmlkc3RlckNvbXBvbmVudH0gZnJvbSAnLi9ncmlkc3Rlci5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdncmlkc3Rlci1pdGVtJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2dyaWRzdGVySXRlbS5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vZ3JpZHN0ZXJJdGVtLmNzcyddLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuZXhwb3J0IGNsYXNzIEdyaWRzdGVySXRlbUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBHcmlkc3Rlckl0ZW1Db21wb25lbnRJbnRlcmZhY2Uge1xuICBASW5wdXQoKSBpdGVtOiBHcmlkc3Rlckl0ZW07XG4gICRpdGVtOiBHcmlkc3Rlckl0ZW07XG4gIGVsOiBhbnk7XG4gIGdyaWRzdGVyOiBHcmlkc3RlckNvbXBvbmVudDtcbiAgdG9wOiBudW1iZXI7XG4gIGxlZnQ6IG51bWJlcjtcbiAgd2lkdGg6IG51bWJlcjtcbiAgaGVpZ2h0OiBudW1iZXI7XG4gIGRyYWc6IEdyaWRzdGVyRHJhZ2dhYmxlO1xuICByZXNpemU6IEdyaWRzdGVyUmVzaXphYmxlO1xuICBub3RQbGFjZWQ6IGJvb2xlYW47XG4gIGluaXQ6IGJvb2xlYW47XG5cbiAgY29uc3RydWN0b3IoZWw6IEVsZW1lbnRSZWYsIEBIb3N0KCkgZ3JpZHN0ZXI6IEdyaWRzdGVyQ29tcG9uZW50LCBwdWJsaWMgcmVuZGVyZXI6IFJlbmRlcmVyMiwgcHJpdmF0ZSB6b25lOiBOZ1pvbmUpIHtcbiAgICB0aGlzLmVsID0gZWwubmF0aXZlRWxlbWVudDtcbiAgICB0aGlzLiRpdGVtID0ge1xuICAgICAgY29sczogLTEsXG4gICAgICByb3dzOiAtMSxcbiAgICAgIHg6IC0xLFxuICAgICAgeTogLTEsXG4gICAgfTtcbiAgICB0aGlzLmdyaWRzdGVyID0gZ3JpZHN0ZXI7XG4gICAgdGhpcy5kcmFnID0gbmV3IEdyaWRzdGVyRHJhZ2dhYmxlKHRoaXMsIGdyaWRzdGVyLCB0aGlzLnpvbmUpO1xuICAgIHRoaXMucmVzaXplID0gbmV3IEdyaWRzdGVyUmVzaXphYmxlKHRoaXMsIGdyaWRzdGVyLCB0aGlzLnpvbmUpO1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy51cGRhdGVPcHRpb25zKCk7XG4gICAgdGhpcy5ncmlkc3Rlci5hZGRJdGVtKHRoaXMpO1xuICB9XG5cbiAgdXBkYXRlT3B0aW9ucygpOiB2b2lkIHtcbiAgICB0aGlzLiRpdGVtID0gR3JpZHN0ZXJVdGlscy5tZXJnZSh0aGlzLiRpdGVtLCB0aGlzLml0ZW0sIHtcbiAgICAgIGNvbHM6IHVuZGVmaW5lZCxcbiAgICAgIHJvd3M6IHVuZGVmaW5lZCxcbiAgICAgIHg6IHVuZGVmaW5lZCxcbiAgICAgIHk6IHVuZGVmaW5lZCxcbiAgICAgIGRyYWdFbmFibGVkOiB1bmRlZmluZWQsXG5cdCAgZHJhZ0xpbWl0OiB1bmRlZmluZWQsXG4gICAgICByZXNpemVFbmFibGVkOiB1bmRlZmluZWQsXG4gICAgICBjb21wYWN0RW5hYmxlZDogdW5kZWZpbmVkLFxuICAgICAgbWF4SXRlbVJvd3M6IHVuZGVmaW5lZCxcbiAgICAgIG1pbkl0ZW1Sb3dzOiB1bmRlZmluZWQsXG4gICAgICBtYXhJdGVtQ29sczogdW5kZWZpbmVkLFxuICAgICAgbWluSXRlbUNvbHM6IHVuZGVmaW5lZCxcbiAgICAgIG1heEl0ZW1BcmVhOiB1bmRlZmluZWQsXG4gICAgICBtaW5JdGVtQXJlYTogdW5kZWZpbmVkLFxuICAgIH0pO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5ncmlkc3Rlci5yZW1vdmVJdGVtKHRoaXMpO1xuICAgIGRlbGV0ZSB0aGlzLmdyaWRzdGVyO1xuICAgIHRoaXMuZHJhZy5kZXN0cm95KCk7XG4gICAgZGVsZXRlIHRoaXMuZHJhZztcbiAgICB0aGlzLnJlc2l6ZS5kZXN0cm95KCk7XG4gICAgZGVsZXRlIHRoaXMucmVzaXplO1xuICB9XG5cbiAgc2V0U2l6ZSgpOiB2b2lkIHtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWwsICdkaXNwbGF5JywgdGhpcy5ub3RQbGFjZWQgPyAnJyA6ICdibG9jaycpO1xuICAgIHRoaXMuZ3JpZHN0ZXIuZ3JpZFJlbmRlcmVyLnVwZGF0ZUl0ZW0odGhpcy5lbCwgdGhpcy4kaXRlbSwgdGhpcy5yZW5kZXJlcik7XG4gICAgdGhpcy51cGRhdGVJdGVtU2l6ZSgpO1xuICB9XG5cbiAgdXBkYXRlSXRlbVNpemUoKSB7XG4gICAgY29uc3QgdG9wID0gdGhpcy4kaXRlbS55ICogdGhpcy5ncmlkc3Rlci5jdXJSb3dIZWlnaHQ7XG4gICAgY29uc3QgbGVmdCA9IHRoaXMuJGl0ZW0ueCAqIHRoaXMuZ3JpZHN0ZXIuY3VyQ29sV2lkdGg7XG4gICAgY29uc3Qgd2lkdGggPSB0aGlzLiRpdGVtLmNvbHMgKiB0aGlzLmdyaWRzdGVyLmN1ckNvbFdpZHRoIC0gdGhpcy5ncmlkc3Rlci4kb3B0aW9ucy5tYXJnaW47XG4gICAgY29uc3QgaGVpZ2h0ID0gdGhpcy4kaXRlbS5yb3dzICogdGhpcy5ncmlkc3Rlci5jdXJSb3dIZWlnaHQgLSB0aGlzLmdyaWRzdGVyLiRvcHRpb25zLm1hcmdpbjtcblxuICAgIGlmICghdGhpcy5pbml0ICYmIHdpZHRoID4gMCAmJiBoZWlnaHQgPiAwKSB7XG4gICAgICB0aGlzLmluaXQgPSB0cnVlO1xuICAgICAgaWYgKHRoaXMuaXRlbS5pbml0Q2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy5pdGVtLmluaXRDYWxsYmFjayh0aGlzLml0ZW0sIHRoaXMpO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuZ3JpZHN0ZXIub3B0aW9ucy5pdGVtSW5pdENhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMuZ3JpZHN0ZXIub3B0aW9ucy5pdGVtSW5pdENhbGxiYWNrKHRoaXMuaXRlbSwgdGhpcyk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5ncmlkc3Rlci4kb3B0aW9ucy5zY3JvbGxUb05ld0l0ZW1zKSB7XG4gICAgICAgIHRoaXMuZWwuc2Nyb2xsSW50b1ZpZXcoZmFsc2UpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAod2lkdGggIT09IHRoaXMud2lkdGggfHwgaGVpZ2h0ICE9PSB0aGlzLmhlaWdodCkge1xuICAgICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgICBpZiAodGhpcy5ncmlkc3Rlci5vcHRpb25zLml0ZW1SZXNpemVDYWxsYmFjaykge1xuICAgICAgICB0aGlzLmdyaWRzdGVyLm9wdGlvbnMuaXRlbVJlc2l6ZUNhbGxiYWNrKHRoaXMuaXRlbSwgdGhpcyk7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMudG9wID0gdG9wO1xuICAgIHRoaXMubGVmdCA9IGxlZnQ7XG4gIH1cblxuICBpdGVtQ2hhbmdlZChvbGRJdGVtOiBHcmlkc3Rlckl0ZW0pOiB2b2lkIHtcbiAgICBpZiAodGhpcy5ncmlkc3Rlci5vcHRpb25zLml0ZW1DaGFuZ2VDYWxsYmFjaykge1xuICAgICAgdGhpcy5ncmlkc3Rlci5vcHRpb25zLml0ZW1DaGFuZ2VDYWxsYmFjayh0aGlzLml0ZW0sIHRoaXMsIG9sZEl0ZW0pO1xuICAgIH1cbiAgfVxuXG4gIGNoZWNrSXRlbUNoYW5nZXMobmV3VmFsdWU6IEdyaWRzdGVySXRlbSwgb2xkVmFsdWU6IEdyaWRzdGVySXRlbSk6IHZvaWQge1xuICAgIGlmIChuZXdWYWx1ZS5yb3dzID09PSBvbGRWYWx1ZS5yb3dzICYmIG5ld1ZhbHVlLmNvbHMgPT09IG9sZFZhbHVlLmNvbHMgJiYgbmV3VmFsdWUueCA9PT0gb2xkVmFsdWUueCAmJiBuZXdWYWx1ZS55ID09PSBvbGRWYWx1ZS55KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0aGlzLmdyaWRzdGVyLmNoZWNrQ29sbGlzaW9uKHRoaXMuJGl0ZW0pKSB7XG4gICAgICB0aGlzLiRpdGVtLnggPSBvbGRWYWx1ZS54IHx8IDA7XG4gICAgICB0aGlzLiRpdGVtLnkgPSBvbGRWYWx1ZS55IHx8IDA7XG4gICAgICB0aGlzLiRpdGVtLmNvbHMgPSBvbGRWYWx1ZS5jb2xzIHx8IDE7XG4gICAgICB0aGlzLiRpdGVtLnJvd3MgPSBvbGRWYWx1ZS5yb3dzIHx8IDE7XG4gICAgICB0aGlzLnNldFNpemUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IG9sZEl0ZW0gPSB7XG4gICAgICAgIHg6IG9sZFZhbHVlLngsXG4gICAgICAgIHk6IG9sZFZhbHVlLnksXG4gICAgICAgIHJvd3M6IG9sZFZhbHVlLnJvd3MsXG4gICAgICAgIGNvbHM6IG9sZFZhbHVlLmNvbHNcbiAgICAgIH07XG4gICAgICB0aGlzLml0ZW0uY29scyA9IHRoaXMuJGl0ZW0uY29scztcbiAgICAgIHRoaXMuaXRlbS5yb3dzID0gdGhpcy4kaXRlbS5yb3dzO1xuICAgICAgdGhpcy5pdGVtLnggPSB0aGlzLiRpdGVtLng7XG4gICAgICB0aGlzLml0ZW0ueSA9IHRoaXMuJGl0ZW0ueTtcbiAgICAgIHRoaXMuZ3JpZHN0ZXIuY2FsY3VsYXRlTGF5b3V0RGVib3VuY2UoKTtcbiAgICAgIHRoaXMuaXRlbUNoYW5nZWQob2xkSXRlbSk7XG4gICAgfVxuICB9XG5cbiAgY2FuQmVEcmFnZ2VkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhdGhpcy5ncmlkc3Rlci5tb2JpbGUgJiZcbiAgICAgICh0aGlzLiRpdGVtLmRyYWdFbmFibGVkID09PSB1bmRlZmluZWQgPyB0aGlzLmdyaWRzdGVyLiRvcHRpb25zLmRyYWdnYWJsZS5lbmFibGVkIDogdGhpcy4kaXRlbS5kcmFnRW5hYmxlZCk7XG4gIH1cblxuICBkcmFnTGltaXQoKTogYm9vbGVhbiB8IHN0cmluZyB7XG5cdCAgaWYodGhpcy4kaXRlbS5kcmFnTGltaXQgPT09IHVuZGVmaW5lZCkgcmV0dXJuIGZhbHNlO1xuXHQgIGlmKHRoaXMuJGl0ZW0uZHJhZ0xpbWl0ID09PSBcInhcIiB8fCB0aGlzLiRpdGVtLmRyYWdMaW1pdCA9PT0gXCJ5XCIpIHJldHVybiB0aGlzLiRpdGVtLmRyYWdMaW1pdDtcblx0ICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBjYW5CZVJlc2l6ZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICF0aGlzLmdyaWRzdGVyLm1vYmlsZSAmJlxuICAgICAgKHRoaXMuJGl0ZW0ucmVzaXplRW5hYmxlZCA9PT0gdW5kZWZpbmVkID8gdGhpcy5ncmlkc3Rlci4kb3B0aW9ucy5yZXNpemFibGUuZW5hYmxlZCA6IHRoaXMuJGl0ZW0ucmVzaXplRW5hYmxlZCk7XG4gIH1cblxufVxuIl19
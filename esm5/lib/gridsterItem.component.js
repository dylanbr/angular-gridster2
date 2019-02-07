/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
     * @return {?}
     */
    GridsterItemComponent.prototype.itemChanged = /**
     * @return {?}
     */
    function () {
        if (this.gridster.options.itemChangeCallback) {
            this.gridster.options.itemChangeCallback(this.item, this);
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
            this.item.cols = this.$item.cols;
            this.item.rows = this.$item.rows;
            this.item.x = this.$item.x;
            this.item.y = this.$item.y;
            this.gridster.calculateLayoutDebounce();
            this.itemChanged();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZHN0ZXJJdGVtLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItZ3JpZHN0ZXIyLyIsInNvdXJjZXMiOlsibGliL2dyaWRzdGVySXRlbS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFxQixTQUFTLEVBQUUsaUJBQWlCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFHMUgsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sNkJBQTZCLENBQUM7QUFDOUQsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sNkJBQTZCLENBQUM7QUFDOUQsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBRXRELE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBRXZEO0lBb0JFLCtCQUFZLEVBQWMsRUFBVSxRQUEyQixFQUFTLFFBQW1CLEVBQVUsSUFBWTtRQUF6QyxhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQVUsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUMvRyxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxhQUFhLENBQUM7UUFDM0IsSUFBSSxDQUFDLEtBQUssR0FBRztZQUNYLElBQUksRUFBRSxDQUFDLENBQUM7WUFDUixJQUFJLEVBQUUsQ0FBQyxDQUFDO1lBQ1IsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNMLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDTixDQUFDO1FBQ0YsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDekIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLGlCQUFpQixDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzdELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxpQkFBaUIsQ0FBQyxJQUFJLEVB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SUFDNUIsb0NBQVk7O0lBQ1oscUNBQWE7O0lBQ2Isc0NBQWM7O0lBQ2QsdUNBQWU7O0lBQ2YscUNBQXdCOztJQUN4Qix1Q0FBMEI7O0lBQzFCLDBDQUFtQjs7SUFDbkIscUNBQWM7O0lBRW1ELHlDQUEwQjs7Ozs7SUFBRSxxQ0FBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgRWxlbWVudFJlZiwgSG9zdCwgSW5wdXQsIE5nWm9uZSwgT25EZXN0cm95LCBPbkluaXQsIFJlbmRlcmVyMiwgVmlld0VuY2Fwc3VsYXRpb259IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge0dyaWRzdGVySXRlbX0gZnJvbSAnLi9ncmlkc3Rlckl0ZW0uaW50ZXJmYWNlJztcbmltcG9ydCB7R3JpZHN0ZXJEcmFnZ2FibGV9IGZyb20gJy4vZ3JpZHN0ZXJEcmFnZ2FibGUuc2VydmljZSc7XG5pbXBvcnQge0dyaWRzdGVyUmVzaXphYmxlfSBmcm9tICcuL2dyaWRzdGVyUmVzaXphYmxlLnNlcnZpY2UnO1xuaW1wb3J0IHtHcmlkc3RlclV0aWxzfSBmcm9tICcuL2dyaWRzdGVyVXRpbHMuc2VydmljZSc7XG5pbXBvcnQge0dyaWRzdGVySXRlbUNvbXBvbmVudEludGVyZmFjZX0gZnJvbSAnLi9ncmlkc3Rlckl0ZW1Db21wb25lbnQuaW50ZXJmYWNlJztcbmltcG9ydCB7R3JpZHN0ZXJDb21wb25lbnR9IGZyb20gJy4vZ3JpZHN0ZXIuY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZ3JpZHN0ZXItaXRlbScsXG4gIHRlbXBsYXRlVXJsOiAnLi9ncmlkc3Rlckl0ZW0uaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2dyaWRzdGVySXRlbS5jc3MnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBHcmlkc3Rlckl0ZW1Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgR3JpZHN0ZXJJdGVtQ29tcG9uZW50SW50ZXJmYWNlIHtcbiAgQElucHV0KCkgaXRlbTogR3JpZHN0ZXJJdGVtO1xuICAkaXRlbTogR3JpZHN0ZXJJdGVtO1xuICBlbDogYW55O1xuICBncmlkc3RlcjogR3JpZHN0ZXJDb21wb25lbnQ7XG4gIHRvcDogbnVtYmVyO1xuICBsZWZ0OiBudW1iZXI7XG4gIHdpZHRoOiBudW1iZXI7XG4gIGhlaWdodDogbnVtYmVyO1xuICBkcmFnOiBHcmlkc3RlckRyYWdnYWJsZTtcbiAgcmVzaXplOiBHcmlkc3RlclJlc2l6YWJsZTtcbiAgbm90UGxhY2VkOiBib29sZWFuO1xuICBpbml0OiBib29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKGVsOiBFbGVtZW50UmVmLCBASG9zdCgpIGdyaWRzdGVyOiBHcmlkc3RlckNvbXBvbmVudCwgcHVibGljIHJlbmRlcmVyOiBSZW5kZXJlcjIsIHByaXZhdGUgem9uZTogTmdab25lKSB7XG4gICAgdGhpcy5lbCA9IGVsLm5hdGl2ZUVsZW1lbnQ7XG4gICAgdGhpcy4kaXRlbSA9IHtcbiAgICAgIGNvbHM6IC0xLFxuICAgICAgcm93czogLTEsXG4gICAgICB4OiAtMSxcbiAgICAgIHk6IC0xLFxuICAgIH07XG4gICAgdGhpcy5ncmlkc3RlciA9IGdyaWRzdGVyO1xuICAgIHRoaXMuZHJhZyA9IG5ldyBHcmlkc3RlckRyYWdnYWJsZSh0aGlzLCBncmlkc3RlciwgdGhpcy56b25lKTtcbiAgICB0aGlzLnJlc2l6ZSA9IG5ldyBHcmlkc3RlclJlc2l6YWJsZSh0aGlzLCBncmlkc3RlciwgdGhpcy56b25lKTtcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMudXBkYXRlT3B0aW9ucygpO1xuICAgIHRoaXMuZ3JpZHN0ZXIuYWRkSXRlbSh0aGlzKTtcbiAgfVxuXG4gIHVwZGF0ZU9wdGlvbnMoKTogdm9pZCB7XG4gICAgdGhpcy4kaXRlbSA9IEdyaWRzdGVyVXRpbHMubWVyZ2UodGhpcy4kaXRlbSwgdGhpcy5pdGVtLCB7XG4gICAgICBjb2xzOiB1bmRlZmluZWQsXG4gICAgICByb3dzOiB1bmRlZmluZWQsXG4gICAgICB4OiB1bmRlZmluZWQsXG4gICAgICB5OiB1bmRlZmluZWQsXG4gICAgICBkcmFnRW5hYmxlZDogdW5kZWZpbmVkLFxuXHQgIGRyYWdMaW1pdDogdW5kZWZpbmVkLFxuICAgICAgcmVzaXplRW5hYmxlZDogdW5kZWZpbmVkLFxuICAgICAgY29tcGFjdEVuYWJsZWQ6IHVuZGVmaW5lZCxcbiAgICAgIG1heEl0ZW1Sb3dzOiB1bmRlZmluZWQsXG4gICAgICBtaW5JdGVtUm93czogdW5kZWZpbmVkLFxuICAgICAgbWF4SXRlbUNvbHM6IHVuZGVmaW5lZCxcbiAgICAgIG1pbkl0ZW1Db2xzOiB1bmRlZmluZWQsXG4gICAgICBtYXhJdGVtQXJlYTogdW5kZWZpbmVkLFxuICAgICAgbWluSXRlbUFyZWE6IHVuZGVmaW5lZCxcbiAgICB9KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuZ3JpZHN0ZXIucmVtb3ZlSXRlbSh0aGlzKTtcbiAgICBkZWxldGUgdGhpcy5ncmlkc3RlcjtcbiAgICB0aGlzLmRyYWcuZGVzdHJveSgpO1xuICAgIGRlbGV0ZSB0aGlzLmRyYWc7XG4gICAgdGhpcy5yZXNpemUuZGVzdHJveSgpO1xuICAgIGRlbGV0ZSB0aGlzLnJlc2l6ZTtcbiAgfVxuXG4gIHNldFNpemUoKTogdm9pZCB7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLCAnZGlzcGxheScsIHRoaXMubm90UGxhY2VkID8gJycgOiAnYmxvY2snKTtcbiAgICB0aGlzLmdyaWRzdGVyLmdyaWRSZW5kZXJlci51cGRhdGVJdGVtKHRoaXMuZWwsIHRoaXMuJGl0ZW0sIHRoaXMucmVuZGVyZXIpO1xuICAgIHRoaXMudXBkYXRlSXRlbVNpemUoKTtcbiAgfVxuXG4gIHVwZGF0ZUl0ZW1TaXplKCkge1xuICAgIGNvbnN0IHRvcCA9IHRoaXMuJGl0ZW0ueSAqIHRoaXMuZ3JpZHN0ZXIuY3VyUm93SGVpZ2h0O1xuICAgIGNvbnN0IGxlZnQgPSB0aGlzLiRpdGVtLnggKiB0aGlzLmdyaWRzdGVyLmN1ckNvbFdpZHRoO1xuICAgIGNvbnN0IHdpZHRoID0gdGhpcy4kaXRlbS5jb2xzICogdGhpcy5ncmlkc3Rlci5jdXJDb2xXaWR0aCAtIHRoaXMuZ3JpZHN0ZXIuJG9wdGlvbnMubWFyZ2luO1xuICAgIGNvbnN0IGhlaWdodCA9IHRoaXMuJGl0ZW0ucm93cyAqIHRoaXMuZ3JpZHN0ZXIuY3VyUm93SGVpZ2h0IC0gdGhpcy5ncmlkc3Rlci4kb3B0aW9ucy5tYXJnaW47XG5cbiAgICBpZiAoIXRoaXMuaW5pdCAmJiB3aWR0aCA+IDAgJiYgaGVpZ2h0ID4gMCkge1xuICAgICAgdGhpcy5pbml0ID0gdHJ1ZTtcbiAgICAgIGlmICh0aGlzLml0ZW0uaW5pdENhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMuaXRlbS5pbml0Q2FsbGJhY2sodGhpcy5pdGVtLCB0aGlzKTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLmdyaWRzdGVyLm9wdGlvbnMuaXRlbUluaXRDYWxsYmFjaykge1xuICAgICAgICB0aGlzLmdyaWRzdGVyLm9wdGlvbnMuaXRlbUluaXRDYWxsYmFjayh0aGlzLml0ZW0sIHRoaXMpO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuZ3JpZHN0ZXIuJG9wdGlvbnMuc2Nyb2xsVG9OZXdJdGVtcykge1xuICAgICAgICB0aGlzLmVsLnNjcm9sbEludG9WaWV3KGZhbHNlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHdpZHRoICE9PSB0aGlzLndpZHRoIHx8IGhlaWdodCAhPT0gdGhpcy5oZWlnaHQpIHtcbiAgICAgIHRoaXMud2lkdGggPSB3aWR0aDtcbiAgICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgICAgaWYgKHRoaXMuZ3JpZHN0ZXIub3B0aW9ucy5pdGVtUmVzaXplQ2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy5ncmlkc3Rlci5vcHRpb25zLml0ZW1SZXNpemVDYWxsYmFjayh0aGlzLml0ZW0sIHRoaXMpO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLnRvcCA9IHRvcDtcbiAgICB0aGlzLmxlZnQgPSBsZWZ0O1xuICB9XG5cbiAgaXRlbUNoYW5nZWQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZ3JpZHN0ZXIub3B0aW9ucy5pdGVtQ2hhbmdlQ2FsbGJhY2spIHtcbiAgICAgIHRoaXMuZ3JpZHN0ZXIub3B0aW9ucy5pdGVtQ2hhbmdlQ2FsbGJhY2sodGhpcy5pdGVtLCB0aGlzKTtcbiAgICB9XG4gIH1cblxuICBjaGVja0l0ZW1DaGFuZ2VzKG5ld1ZhbHVlOiBHcmlkc3Rlckl0ZW0sIG9sZFZhbHVlOiBHcmlkc3Rlckl0ZW0pOiB2b2lkIHtcbiAgICBpZiAobmV3VmFsdWUucm93cyA9PT0gb2xkVmFsdWUucm93cyAmJiBuZXdWYWx1ZS5jb2xzID09PSBvbGRWYWx1ZS5jb2xzICYmIG5ld1ZhbHVlLnggPT09IG9sZFZhbHVlLnggJiYgbmV3VmFsdWUueSA9PT0gb2xkVmFsdWUueSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodGhpcy5ncmlkc3Rlci5jaGVja0NvbGxpc2lvbih0aGlzLiRpdGVtKSkge1xuICAgICAgdGhpcy4kaXRlbS54ID0gb2xkVmFsdWUueCB8fCAwO1xuICAgICAgdGhpcy4kaXRlbS55ID0gb2xkVmFsdWUueSB8fCAwO1xuICAgICAgdGhpcy4kaXRlbS5jb2xzID0gb2xkVmFsdWUuY29scyB8fCAxO1xuICAgICAgdGhpcy4kaXRlbS5yb3dzID0gb2xkVmFsdWUucm93cyB8fCAxO1xuICAgICAgdGhpcy5zZXRTaXplKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaXRlbS5jb2xzID0gdGhpcy4kaXRlbS5jb2xzO1xuICAgICAgdGhpcy5pdGVtLnJvd3MgPSB0aGlzLiRpdGVtLnJvd3M7XG4gICAgICB0aGlzLml0ZW0ueCA9IHRoaXMuJGl0ZW0ueDtcbiAgICAgIHRoaXMuaXRlbS55ID0gdGhpcy4kaXRlbS55O1xuICAgICAgdGhpcy5ncmlkc3Rlci5jYWxjdWxhdGVMYXlvdXREZWJvdW5jZSgpO1xuICAgICAgdGhpcy5pdGVtQ2hhbmdlZCgpO1xuICAgIH1cbiAgfVxuXG4gIGNhbkJlRHJhZ2dlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gIXRoaXMuZ3JpZHN0ZXIubW9iaWxlICYmXG4gICAgICAodGhpcy4kaXRlbS5kcmFnRW5hYmxlZCA9PT0gdW5kZWZpbmVkID8gdGhpcy5ncmlkc3Rlci4kb3B0aW9ucy5kcmFnZ2FibGUuZW5hYmxlZCA6IHRoaXMuJGl0ZW0uZHJhZ0VuYWJsZWQpO1xuICB9XG5cbiAgZHJhZ0xpbWl0KCk6IGJvb2xlYW4gfCBzdHJpbmcge1xuXHQgIGlmKHRoaXMuJGl0ZW0uZHJhZ0xpbWl0ID09PSB1bmRlZmluZWQpIHJldHVybiBmYWxzZTtcblx0ICBpZih0aGlzLiRpdGVtLmRyYWdMaW1pdCA9PT0gXCJ4XCIgfHwgdGhpcy4kaXRlbS5kcmFnTGltaXQgPT09IFwieVwiKSByZXR1cm4gdGhpcy4kaXRlbS5kcmFnTGltaXQ7XG5cdCAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgY2FuQmVSZXNpemVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhdGhpcy5ncmlkc3Rlci5tb2JpbGUgJiZcbiAgICAgICh0aGlzLiRpdGVtLnJlc2l6ZUVuYWJsZWQgPT09IHVuZGVmaW5lZCA/IHRoaXMuZ3JpZHN0ZXIuJG9wdGlvbnMucmVzaXphYmxlLmVuYWJsZWQgOiB0aGlzLiRpdGVtLnJlc2l6ZUVuYWJsZWQpO1xuICB9XG5cbn1cbiJdfQ==
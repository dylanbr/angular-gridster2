/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable, NgZone } from '@angular/core';
import { GridsterSwap } from './gridsterSwap.service';
import { cancelScroll, scroll } from './gridsterScroll.service';
import { GridsterPush } from './gridsterPush.service';
import { GridsterUtils } from './gridsterUtils.service';
import { GridsterItemComponentInterface } from './gridsterItemComponent.interface';
import { GridsterComponentInterface } from './gridster.interface';
var GridsterDraggable = /** @class */ (function () {
    function GridsterDraggable(gridsterItem, gridster, zone) {
        var _this = this;
        this.zone = zone;
        this.collision = false;
        this.gridsterItem = gridsterItem;
        this.gridster = gridster;
        this.lastMouse = {
            clientX: 0,
            clientY: 0
        };
        this.path = [];
        this.scrollIntoView = this.debounce(function () {
            _this.gridsterItem.el.scrollIntoView({
                behavior: "auto",
                block: "nearest",
                inline: "nearest"
            });
        }, 50);
    }
    /**
     * @return {?}
     */
    GridsterDraggable.prototype.destroy = /**
     * @return {?}
     */
    function () {
        if (this.gridster.previewStyle) {
            this.gridster.previewStyle(true);
        }
        delete this.gridsterItem;
        delete this.gridster;
        delete this.collision;
        if (this.mousedown) {
            this.mousedown();
            this.touchstart();
        }
    };
    /**
     * @param {?} e
     * @return {?}
     */
    GridsterDraggable.prototype.dragStart = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        var _this = this;
        switch (e.which) {
            case 1:
                // left mouse button
                break;
            case 2:
            case 3:
                // right or middle mouse button
                return;
        }
        if (this.gridster.options.draggable && this.gridster.options.draggable.start) {
            this.gridster.options.draggable.start(this.gridsterItem.item, this.gridsterItem, e);
        }
        e.stopPropagation();
        e.preventDefault();
        this.dragFunction = this.dragMove.bind(this);
        this.dragStopFunction = this.dragStop.bind(this);
        this.zone.runOutsideAngular(function () {
            _this.mousemove = _this.gridsterItem.renderer.listen('document', 'mousemove', _this.dragFunction);
            _this.touchmove = _this.gridster.renderer.listen(_this.gridster.el, 'touchmove', _this.dragFunction);
        });
        this.mouseup = this.gridsterItem.renderer.listen('document', 'mouseup', this.dragStopFunction);
        this.mouseleave = this.gridsterItem.renderer.listen('document', 'mouseleave', this.dragStopFunction);
        this.cancelOnBlur = this.gridsterItem.renderer.listen('window', 'blur', this.dragStopFunction);
        this.touchend = this.gridsterItem.renderer.listen('document', 'touchend', this.dragStopFunction);
        this.touchcancel = this.gridsterItem.renderer.listen('document', 'touchcancel', this.dragStopFunction);
        this.gridsterItem.renderer.addClass(this.gridsterItem.el, 'gridster-item-moving');
        this.margin = this.gridster.$options.margin;
        this.offsetLeft = this.gridster.el.scrollLeft - this.gridster.el.offsetLeft;
        this.offsetTop = this.gridster.el.scrollTop - this.gridster.el.offsetTop;
        this.left = this.gridsterItem.left - this.margin;
        this.top = this.gridsterItem.top - this.margin;
        this.width = this.gridsterItem.width;
        this.height = this.gridsterItem.height;
        this.diffLeft = e.clientX + this.offsetLeft - this.margin - this.left;
        this.diffTop = e.clientY + this.offsetTop - this.margin - this.top;
        this.gridster.movingItem = this.gridsterItem.$item;
        this.gridster.previewStyle(true);
        this.push = new GridsterPush(this.gridsterItem);
        this.swap = new GridsterSwap(this.gridsterItem);
        this.gridster.dragInProgress = true;
        this.gridster.updateGrid();
        this.path.push({ x: this.gridsterItem.item.x || 0, y: this.gridsterItem.item.y || 0 });
    };
    /**
     * @param {?} e
     * @return {?}
     */
    GridsterDraggable.prototype.dragMove = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        e.stopPropagation();
        e.preventDefault();
        GridsterUtils.checkTouchEvent(e);
        this.offsetLeft = this.gridster.el.scrollLeft - this.gridster.el.offsetLeft;
        this.offsetTop = this.gridster.el.scrollTop - this.gridster.el.offsetTop;
        scroll(this.gridster, this.left, this.top, this.width, this.height, e, this.lastMouse, this.calculateItemPositionFromMousePosition.bind(this));
        this.calculateItemPositionFromMousePosition(e);
    };
    /**
     * @param {?} e
     * @return {?}
     */
    GridsterDraggable.prototype.calculateItemPositionFromMousePosition = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        var _this = this;
        this.left = e.clientX + this.offsetLeft - this.diffLeft;
        this.top = e.clientY + this.offsetTop - this.diffTop;
        this.calculateItemPosition();
        this.lastMouse.clientX = e.clientX;
        this.lastMouse.clientY = e.clientY;
        this.zone.run(function () {
            _this.gridster.updateGrid();
        });
        this.scrollIntoView();
    };
    /**
     * @param {?} e
     * @return {?}
     */
    GridsterDraggable.prototype.dragStop = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        var _this = this;
        e.stopPropagation();
        e.preventDefault();
        cancelScroll();
        this.cancelOnBlur();
        this.mousemove();
        this.mouseup();
        this.mouseleave();
        this.touchmove();
        this.touchend();
        this.touchcancel();
        this.gridsterItem.renderer.removeClass(this.gridsterItem.el, 'gridster-item-moving');
        this.gridster.dragInProgress = false;
        this.gridster.updateGrid();
        this.path = [];
        if (this.gridster.options.draggable && this.gridster.options.draggable.stop) {
            Promise.resolve(this.gridster.options.draggable.stop(this.gridsterItem.item, this.gridsterItem, e))
                .then(this.makeDrag.bind(this), this.cancelDrag.bind(this));
        }
        else {
            this.makeDrag();
        }
        setTimeout(function () {
            if (_this.gridster) {
                _this.gridster.movingItem = null;
                _this.gridster.previewStyle(true);
            }
        });
    };
    /**
     * @return {?}
     */
    GridsterDraggable.prototype.cancelDrag = /**
     * @return {?}
     */
    function () {
        this.gridsterItem.$item.x = this.gridsterItem.item.x || 0;
        this.gridsterItem.$item.y = this.gridsterItem.item.y || 0;
        this.gridsterItem.setSize();
        if (this.push) {
            this.push.restoreItems();
        }
        if (this.swap) {
            this.swap.restoreSwapItem();
        }
        if (this.push) {
            this.push.destroy();
            delete this.push;
        }
        if (this.swap) {
            this.swap.destroy();
            delete this.swap;
        }
    };
    /**
     * @return {?}
     */
    GridsterDraggable.prototype.makeDrag = /**
     * @return {?}
     */
    function () {
        if (this.gridster.$options.draggable.dropOverItems && this.gridster.options.draggable
            && this.gridster.options.draggable.dropOverItemsCallback
            && this.collision && this.collision !== true && this.collision.$item) {
            this.gridster.options.draggable.dropOverItemsCallback(this.gridsterItem.item, this.collision.item, this.gridster);
        }
        this.collision = false;
        this.gridsterItem.setSize();
        this.gridsterItem.checkItemChanges(this.gridsterItem.$item, this.gridsterItem.item);
        if (this.push) {
            this.push.setPushedItems();
        }
        if (this.swap) {
            this.swap.setSwapItem();
        }
        if (this.push) {
            this.push.destroy();
            delete this.push;
        }
        if (this.swap) {
            this.swap.destroy();
            delete this.swap;
        }
    };
    /**
     * @return {?}
     */
    GridsterDraggable.prototype.calculateItemPosition = /**
     * @return {?}
     */
    function () {
        this.gridster.movingItem = this.gridsterItem.$item;
        this.positionX = this.gridster.pixelsToPositionX(this.left, Math.round);
        this.positionY = this.gridster.pixelsToPositionY(this.top, Math.round);
        this.positionXBackup = this.gridsterItem.$item.x;
        this.positionYBackup = this.gridsterItem.$item.y;
        this.gridsterItem.$item.x = this.positionX;
        if (this.gridster.checkGridCollision(this.gridsterItem.$item)) {
            this.gridsterItem.$item.x = this.positionXBackup;
        }
        this.gridsterItem.$item.y = this.positionY;
        if (this.gridster.checkGridCollision(this.gridsterItem.$item)) {
            this.gridsterItem.$item.y = this.positionYBackup;
        }
        this.gridster.gridRenderer.setCellPosition(this.gridsterItem.renderer, this.gridsterItem.el, this.left, this.top);
        /** @type {?} */
        var limit = this.gridsterItem.dragLimit();
        /** @type {?} */
        var allow = true;
        if (limit) {
            if (limit === "x" && this.path[0].y !== this.gridsterItem.$item.y)
                allow = false;
            if (limit === "y" && this.path[0].x !== this.gridsterItem.$item.x)
                allow = false;
        }
        if (!allow) {
            this.gridsterItem.$item.x = this.positionXBackup;
            this.gridsterItem.$item.y = this.positionYBackup;
        }
        else if (this.positionXBackup !== this.gridsterItem.$item.x || this.positionYBackup !== this.gridsterItem.$item.y) {
            /** @type {?} */
            var lastPosition = this.path[this.path.length - 1];
            /** @type {?} */
            var direction = '';
            if (lastPosition.x < this.gridsterItem.$item.x) {
                direction = this.push.fromWest;
            }
            else if (lastPosition.x > this.gridsterItem.$item.x) {
                direction = this.push.fromEast;
            }
            else if (lastPosition.y < this.gridsterItem.$item.y) {
                direction = this.push.fromNorth;
            }
            else if (lastPosition.y > this.gridsterItem.$item.y) {
                direction = this.push.fromSouth;
            }
            this.push.pushItems(direction, this.gridster.$options.disablePushOnDrag);
            this.swap.swapItems();
            this.collision = this.gridster.checkCollision(this.gridsterItem.$item);
            if (this.collision) {
                this.gridsterItem.$item.x = this.positionXBackup;
                this.gridsterItem.$item.y = this.positionYBackup;
                if (this.gridster.$options.draggable.dropOverItems && this.collision !== true && this.collision.$item) {
                    this.gridster.movingItem = null;
                }
            }
            else {
                this.path.push({ x: this.gridsterItem.$item.x, y: this.gridsterItem.$item.y });
            }
            this.push.checkPushBack();
        }
        this.gridster.previewStyle(true);
    };
    /**
     * @return {?}
     */
    GridsterDraggable.prototype.toggle = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var enableDrag = this.gridsterItem.canBeDragged();
        if (!this.enabled && enableDrag) {
            this.enabled = !this.enabled;
            this.dragStartFunction = this.dragStartDelay.bind(this);
            this.mousedown = this.gridsterItem.renderer.listen(this.gridsterItem.el, 'mousedown', this.dragStartFunction);
            this.touchstart = this.gridsterItem.renderer.listen(this.gridsterItem.el, 'touchstart', this.dragStartFunction);
        }
        else if (this.enabled && !enableDrag) {
            this.enabled = !this.enabled;
            this.mousedown();
            this.touchstart();
        }
    };
    /**
     * @param {?} e
     * @return {?}
     */
    GridsterDraggable.prototype.dragStartDelay = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        var _this = this;
        if (e.target.hasAttribute('class') && e.target.getAttribute('class').split(' ').indexOf('gridster-item-resizable-handler') > -1) {
            return;
        }
        if (GridsterUtils.checkContentClassForEvent(this.gridster, e)) {
            return;
        }
        GridsterUtils.checkTouchEvent(e);
        if (!this.gridster.$options.draggable.delayStart) {
            this.dragStart(e);
            return;
        }
        /** @type {?} */
        var timeout = setTimeout(function () {
            _this.dragStart(e);
            cancelDrag();
        }, this.gridster.$options.draggable.delayStart);
        /** @type {?} */
        var cancelMouse = this.gridsterItem.renderer.listen('document', 'mouseup', cancelDrag);
        /** @type {?} */
        var cancelMouseLeave = this.gridsterItem.renderer.listen('document', 'mouseleave', cancelDrag);
        /** @type {?} */
        var cancelOnBlur = this.gridsterItem.renderer.listen('window', 'blur', cancelDrag);
        /** @type {?} */
        var cancelTouchMove = this.gridsterItem.renderer.listen('document', 'touchmove', cancelMove);
        /** @type {?} */
        var cancelTouchEnd = this.gridsterItem.renderer.listen('document', 'touchend', cancelDrag);
        /** @type {?} */
        var cancelTouchCancel = this.gridsterItem.renderer.listen('document', 'touchcancel', cancelDrag);
        /**
         * @param {?} eventMove
         * @return {?}
         */
        function cancelMove(eventMove) {
            GridsterUtils.checkTouchEvent(eventMove);
            if (Math.abs(eventMove.clientX - e.clientX) > 9 || Math.abs(eventMove.clientY - e.clientY) > 9) {
                cancelDrag();
            }
        }
        /**
         * @return {?}
         */
        function cancelDrag() {
            clearTimeout(timeout);
            cancelOnBlur();
            cancelMouse();
            cancelMouseLeave();
            cancelTouchMove();
            cancelTouchEnd();
            cancelTouchCancel();
        }
    };
    /**
     * @param {?} func
     * @param {?} wait
     * @param {?=} immediate
     * @return {?}
     */
    GridsterDraggable.prototype.debounce = /**
     * @param {?} func
     * @param {?} wait
     * @param {?=} immediate
     * @return {?}
     */
    function (func, wait, immediate) {
        /** @type {?} */
        var timeout;
        return function () {
            /** @type {?} */
            var context = this;
            /** @type {?} */
            var args = arguments;
            /** @type {?} */
            var later = function () {
                timeout = null;
                if (!immediate)
                    func.apply(context, args);
            };
            /** @type {?} */
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow)
                func.apply(context, args);
        };
    };
    ;
    GridsterDraggable.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    GridsterDraggable.ctorParameters = function () { return [
        { type: GridsterItemComponentInterface },
        { type: GridsterComponentInterface },
        { type: NgZone }
    ]; };
    return GridsterDraggable;
}());
export { GridsterDraggable };
if (false) {
    /** @type {?} */
    GridsterDraggable.prototype.gridsterItem;
    /** @type {?} */
    GridsterDraggable.prototype.gridster;
    /** @type {?} */
    GridsterDraggable.prototype.lastMouse;
    /** @type {?} */
    GridsterDraggable.prototype.offsetLeft;
    /** @type {?} */
    GridsterDraggable.prototype.offsetTop;
    /** @type {?} */
    GridsterDraggable.prototype.margin;
    /** @type {?} */
    GridsterDraggable.prototype.diffTop;
    /** @type {?} */
    GridsterDraggable.prototype.diffLeft;
    /** @type {?} */
    GridsterDraggable.prototype.top;
    /** @type {?} */
    GridsterDraggable.prototype.left;
    /** @type {?} */
    GridsterDraggable.prototype.height;
    /** @type {?} */
    GridsterDraggable.prototype.width;
    /** @type {?} */
    GridsterDraggable.prototype.positionX;
    /** @type {?} */
    GridsterDraggable.prototype.positionY;
    /** @type {?} */
    GridsterDraggable.prototype.positionXBackup;
    /** @type {?} */
    GridsterDraggable.prototype.positionYBackup;
    /** @type {?} */
    GridsterDraggable.prototype.enabled;
    /** @type {?} */
    GridsterDraggable.prototype.dragStartFunction;
    /** @type {?} */
    GridsterDraggable.prototype.dragFunction;
    /** @type {?} */
    GridsterDraggable.prototype.dragStopFunction;
    /** @type {?} */
    GridsterDraggable.prototype.mousemove;
    /** @type {?} */
    GridsterDraggable.prototype.mouseup;
    /** @type {?} */
    GridsterDraggable.prototype.mouseleave;
    /** @type {?} */
    GridsterDraggable.prototype.cancelOnBlur;
    /** @type {?} */
    GridsterDraggable.prototype.touchmove;
    /** @type {?} */
    GridsterDraggable.prototype.touchend;
    /** @type {?} */
    GridsterDraggable.prototype.touchcancel;
    /** @type {?} */
    GridsterDraggable.prototype.mousedown;
    /** @type {?} */
    GridsterDraggable.prototype.touchstart;
    /** @type {?} */
    GridsterDraggable.prototype.push;
    /** @type {?} */
    GridsterDraggable.prototype.swap;
    /** @type {?} */
    GridsterDraggable.prototype.path;
    /** @type {?} */
    GridsterDraggable.prototype.collision;
    /** @type {?} */
    GridsterDraggable.prototype.scrollIntoView;
    /**
     * @type {?}
     * @private
     */
    GridsterDraggable.prototype.zone;
    /* Skipping unhandled member: ;*/
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZHN0ZXJEcmFnZ2FibGUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItZ3JpZHN0ZXIyLyIsInNvdXJjZXMiOlsibGliL2dyaWRzdGVyRHJhZ2dhYmxlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxVQUFVLEVBQUUsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRWpELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUNwRCxPQUFPLEVBQUMsWUFBWSxFQUFFLE1BQU0sRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBQzlELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUNwRCxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFDdEQsT0FBTyxFQUFDLDhCQUE4QixFQUFDLE1BQU0sbUNBQW1DLENBQUM7QUFDakYsT0FBTyxFQUFDLDBCQUEwQixFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFFaEU7SUF3Q0UsMkJBQVksWUFBNEMsRUFBRSxRQUFvQyxFQUFVLElBQVk7UUFBcEgsaUJBZUM7UUFmdUcsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUhwSCxjQUFTLEdBQTZDLEtBQUssQ0FBQztRQUkxRCxJQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztRQUNqQyxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN6QixJQUFJLENBQUMsU0FBUyxHQUFHO1lBQ2YsT0FBTyxFQUFFLENBQUM7WUFDVixPQUFPLEVBQUUsQ0FBQztTQUNYLENBQUM7UUFDRixJQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUNmLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUN0QyxLQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxjQUFjLENBQUM7Z0JBQ25DLFFBQVEsRUFBRSxNQUFNO2dCQUNoQixL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SUFBSSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN4RSxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdkUsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDakQsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDakQsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDM0MsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDN0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUM7U0FDbEQ7UUFDRCxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUMzQyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUM3RCxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQztTQUNsRDtRQUNELElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQzs7WUFFOUcs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QXNDOztJQUN0QyxzQ0FBNEQ7O0lBQzVELDJDQUFvQjs7Ozs7SUFFNEUsaUNBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlLCBOZ1pvbmV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge0dyaWRzdGVyU3dhcH0gZnJvbSAnLi9ncmlkc3RlclN3YXAuc2VydmljZSc7XG5pbXBvcnQge2NhbmNlbFNjcm9sbCwgc2Nyb2xsfSBmcm9tICcuL2dyaWRzdGVyU2Nyb2xsLnNlcnZpY2UnO1xuaW1wb3J0IHtHcmlkc3RlclB1c2h9IGZyb20gJy4vZ3JpZHN0ZXJQdXNoLnNlcnZpY2UnO1xuaW1wb3J0IHtHcmlkc3RlclV0aWxzfSBmcm9tICcuL2dyaWRzdGVyVXRpbHMuc2VydmljZSc7XG5pbXBvcnQge0dyaWRzdGVySXRlbUNvbXBvbmVudEludGVyZmFjZX0gZnJvbSAnLi9ncmlkc3Rlckl0ZW1Db21wb25lbnQuaW50ZXJmYWNlJztcbmltcG9ydCB7R3JpZHN0ZXJDb21wb25lbnRJbnRlcmZhY2V9IGZyb20gJy4vZ3JpZHN0ZXIuaW50ZXJmYWNlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEdyaWRzdGVyRHJhZ2dhYmxlIHtcbiAgZ3JpZHN0ZXJJdGVtOiBHcmlkc3Rlckl0ZW1Db21wb25lbnRJbnRlcmZhY2U7XG4gIGdyaWRzdGVyOiBHcmlkc3RlckNvbXBvbmVudEludGVyZmFjZTtcbiAgbGFzdE1vdXNlOiB7XG4gICAgY2xpZW50WDogbnVtYmVyLFxuICAgIGNsaWVudFk6IG51bWJlclxuICB9O1xuICBvZmZzZXRMZWZ0OiBudW1iZXI7XG4gIG9mZnNldFRvcDogbnVtYmVyO1xuICBtYXJnaW46IG51bWJlcjtcbiAgZGlmZlRvcDogbnVtYmVyO1xuICBkaWZmTGVmdDogbnVtYmVyO1xuICB0b3A6IG51bWJlcjtcbiAgbGVmdDogbnVtYmVyO1xuICBoZWlnaHQ6IG51bWJlcjtcbiAgd2lkdGg6IG51bWJlcjtcbiAgcG9zaXRpb25YOiBudW1iZXI7XG4gIHBvc2l0aW9uWTogbnVtYmVyO1xuICBwb3NpdGlvblhCYWNrdXA6IG51bWJlcjtcbiAgcG9zaXRpb25ZQmFja3VwOiBudW1iZXI7XG4gIGVuYWJsZWQ6IGJvb2xlYW47XG4gIGRyYWdTdGFydEZ1bmN0aW9uOiAoZXZlbnQ6IGFueSkgPT4gdm9pZDtcbiAgZHJhZ0Z1bmN0aW9uOiAoZXZlbnQ6IGFueSkgPT4gdm9pZDtcbiAgZHJhZ1N0b3BGdW5jdGlvbjogKGV2ZW50OiBhbnkpID0+IHZvaWQ7XG4gIG1vdXNlbW92ZTogRnVuY3Rpb247XG4gIG1vdXNldXA6IEZ1bmN0aW9uO1xuICBtb3VzZWxlYXZlOiBGdW5jdGlvbjtcbiAgY2FuY2VsT25CbHVyOiBGdW5jdGlvbjtcbiAgdG91Y2htb3ZlOiBGdW5jdGlvbjtcbiAgdG91Y2hlbmQ6IEZ1bmN0aW9uO1xuICB0b3VjaGNhbmNlbDogRnVuY3Rpb247XG4gIG1vdXNlZG93bjogRnVuY3Rpb247XG4gIHRvdWNoc3RhcnQ6IEZ1bmN0aW9uO1xuICBwdXNoOiBHcmlkc3RlclB1c2g7XG4gIHN3YXA6IEdyaWRzdGVyU3dhcDtcbiAgcGF0aDogQXJyYXk8eyB4OiBudW1iZXIsIHk6IG51bWJlciB9PjtcbiAgY29sbGlzaW9uOiBHcmlkc3Rlckl0ZW1Db21wb25lbnRJbnRlcmZhY2UgfCBib29sZWFuID0gZmFsc2U7XG4gIHNjcm9sbEludG9WaWV3OiBhbnk7XG5cbiAgY29uc3RydWN0b3IoZ3JpZHN0ZXJJdGVtOiBHcmlkc3Rlckl0ZW1Db21wb25lbnRJbnRlcmZhY2UsIGdyaWRzdGVyOiBHcmlkc3RlckNvbXBvbmVudEludGVyZmFjZSwgcHJpdmF0ZSB6b25lOiBOZ1pvbmUpIHtcbiAgICB0aGlzLmdyaWRzdGVySXRlbSA9IGdyaWRzdGVySXRlbTtcbiAgICB0aGlzLmdyaWRzdGVyID0gZ3JpZHN0ZXI7XG4gICAgdGhpcy5sYXN0TW91c2UgPSB7XG4gICAgICBjbGllbnRYOiAwLFxuICAgICAgY2xpZW50WTogMFxuICAgIH07XG4gICAgdGhpcy5wYXRoID0gW107XG4gICAgdGhpcy5zY3JvbGxJbnRvVmlldyA9IHRoaXMuZGVib3VuY2UoKCkgPT4ge1xuXHRcdHRoaXMuZ3JpZHN0ZXJJdGVtLmVsLnNjcm9sbEludG9WaWV3KHtcblx0XHRcdGJlaGF2aW9yOiBcImF1dG9cIixcblx0XHRcdGJsb2NrOiBcIm5lYXJlc3RcIixcblx0XHRcdGlubGluZTogXCJuZWFyZXN0XCJcblx0XHR9KTtcblx0fSw1MCk7XG4gIH1cblxuICBkZXN0cm95KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmdyaWRzdGVyLnByZXZpZXdTdHlsZSkge1xuICAgICAgdGhpcy5ncmlkc3Rlci5wcmV2aWV3U3R5bGUodHJ1ZSk7XG4gICAgfVxuICAgIGRlbGV0ZSB0aGlzLmdyaWRzdGVySXRlbTtcbiAgICBkZWxldGUgdGhpcy5ncmlkc3RlcjtcbiAgICBkZWxldGUgdGhpcy5jb2xsaXNpb247XG4gICAgaWYgKHRoaXMubW91c2Vkb3duKSB7XG4gICAgICB0aGlzLm1vdXNlZG93bigpO1xuICAgICAgdGhpcy50b3VjaHN0YXJ0KCk7XG4gICAgfVxuICB9XG5cbiAgZHJhZ1N0YXJ0KGU6IGFueSk6IHZvaWQge1xuICAgIHN3aXRjaCAoZS53aGljaCkge1xuICAgICAgY2FzZSAxOlxuICAgICAgICAvLyBsZWZ0IG1vdXNlIGJ1dHRvblxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMjpcbiAgICAgIGNhc2UgMzpcbiAgICAgICAgLy8gcmlnaHQgb3IgbWlkZGxlIG1vdXNlIGJ1dHRvblxuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuZ3JpZHN0ZXIub3B0aW9ucy5kcmFnZ2FibGUgJiYgdGhpcy5ncmlkc3Rlci5vcHRpb25zLmRyYWdnYWJsZS5zdGFydCkge1xuICAgICAgdGhpcy5ncmlkc3Rlci5vcHRpb25zLmRyYWdnYWJsZS5zdGFydCh0aGlzLmdyaWRzdGVySXRlbS5pdGVtLCB0aGlzLmdyaWRzdGVySXRlbSwgZSk7XG4gICAgfVxuXG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgdGhpcy5kcmFnRnVuY3Rpb24gPSB0aGlzLmRyYWdNb3ZlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5kcmFnU3RvcEZ1bmN0aW9uID0gdGhpcy5kcmFnU3RvcC5iaW5kKHRoaXMpO1xuXG4gICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHRoaXMubW91c2Vtb3ZlID0gdGhpcy5ncmlkc3Rlckl0ZW0ucmVuZGVyZXIubGlzdGVuKCdkb2N1bWVudCcsICdtb3VzZW1vdmUnLCB0aGlzLmRyYWdGdW5jdGlvbik7XG4gICAgICB0aGlzLnRvdWNobW92ZSA9IHRoaXMuZ3JpZHN0ZXIucmVuZGVyZXIubGlzdGVuKHRoaXMuZ3JpZHN0ZXIuZWwsICd0b3VjaG1vdmUnLCB0aGlzLmRyYWdGdW5jdGlvbik7XG4gICAgfSk7XG4gICAgdGhpcy5tb3VzZXVwID0gdGhpcy5ncmlkc3Rlckl0ZW0ucmVuZGVyZXIubGlzdGVuKCdkb2N1bWVudCcsICdtb3VzZXVwJywgdGhpcy5kcmFnU3RvcEZ1bmN0aW9uKTtcbiAgICB0aGlzLm1vdXNlbGVhdmUgPSB0aGlzLmdyaWRzdGVySXRlbS5yZW5kZXJlci5saXN0ZW4oJ2RvY3VtZW50JywgJ21vdXNlbGVhdmUnLCB0aGlzLmRyYWdTdG9wRnVuY3Rpb24pO1xuICAgIHRoaXMuY2FuY2VsT25CbHVyID0gdGhpcy5ncmlkc3Rlckl0ZW0ucmVuZGVyZXIubGlzdGVuKCd3aW5kb3cnLCAnYmx1cicsIHRoaXMuZHJhZ1N0b3BGdW5jdGlvbik7XG4gICAgdGhpcy50b3VjaGVuZCA9IHRoaXMuZ3JpZHN0ZXJJdGVtLnJlbmRlcmVyLmxpc3RlbignZG9jdW1lbnQnLCAndG91Y2hlbmQnLCB0aGlzLmRyYWdTdG9wRnVuY3Rpb24pO1xuICAgIHRoaXMudG91Y2hjYW5jZWwgPSB0aGlzLmdyaWRzdGVySXRlbS5yZW5kZXJlci5saXN0ZW4oJ2RvY3VtZW50JywgJ3RvdWNoY2FuY2VsJywgdGhpcy5kcmFnU3RvcEZ1bmN0aW9uKTtcbiAgICB0aGlzLmdyaWRzdGVySXRlbS5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmdyaWRzdGVySXRlbS5lbCwgJ2dyaWRzdGVyLWl0ZW0tbW92aW5nJyk7XG4gICAgdGhpcy5tYXJnaW4gPSB0aGlzLmdyaWRzdGVyLiRvcHRpb25zLm1hcmdpbjtcbiAgICB0aGlzLm9mZnNldExlZnQgPSB0aGlzLmdyaWRzdGVyLmVsLnNjcm9sbExlZnQgLSB0aGlzLmdyaWRzdGVyLmVsLm9mZnNldExlZnQ7XG4gICAgdGhpcy5vZmZzZXRUb3AgPSB0aGlzLmdyaWRzdGVyLmVsLnNjcm9sbFRvcCAtIHRoaXMuZ3JpZHN0ZXIuZWwub2Zmc2V0VG9wO1xuICAgIHRoaXMubGVmdCA9IHRoaXMuZ3JpZHN0ZXJJdGVtLmxlZnQgLSB0aGlzLm1hcmdpbjtcbiAgICB0aGlzLnRvcCA9IHRoaXMuZ3JpZHN0ZXJJdGVtLnRvcCAtIHRoaXMubWFyZ2luO1xuICAgIHRoaXMud2lkdGggPSB0aGlzLmdyaWRzdGVySXRlbS53aWR0aDtcbiAgICB0aGlzLmhlaWdodCA9IHRoaXMuZ3JpZHN0ZXJJdGVtLmhlaWdodDtcbiAgICB0aGlzLmRpZmZMZWZ0ID0gZS5jbGllbnRYICsgdGhpcy5vZmZzZXRMZWZ0IC0gdGhpcy5tYXJnaW4gLSB0aGlzLmxlZnQ7XG4gICAgdGhpcy5kaWZmVG9wID0gZS5jbGllbnRZICsgdGhpcy5vZmZzZXRUb3AgLSB0aGlzLm1hcmdpbiAtIHRoaXMudG9wO1xuICAgIHRoaXMuZ3JpZHN0ZXIubW92aW5nSXRlbSA9IHRoaXMuZ3JpZHN0ZXJJdGVtLiRpdGVtO1xuICAgIHRoaXMuZ3JpZHN0ZXIucHJldmlld1N0eWxlKHRydWUpO1xuICAgIHRoaXMucHVzaCA9IG5ldyBHcmlkc3RlclB1c2godGhpcy5ncmlkc3Rlckl0ZW0pO1xuICAgIHRoaXMuc3dhcCA9IG5ldyBHcmlkc3RlclN3YXAodGhpcy5ncmlkc3Rlckl0ZW0pO1xuICAgIHRoaXMuZ3JpZHN0ZXIuZHJhZ0luUHJvZ3Jlc3MgPSB0cnVlO1xuICAgIHRoaXMuZ3JpZHN0ZXIudXBkYXRlR3JpZCgpO1xuICAgIHRoaXMucGF0aC5wdXNoKHt4OiB0aGlzLmdyaWRzdGVySXRlbS5pdGVtLnggfHwgMCwgeTogdGhpcy5ncmlkc3Rlckl0ZW0uaXRlbS55IHx8IDB9KTtcbiAgfVxuXG4gIGRyYWdNb3ZlKGU6IGFueSk6IHZvaWQge1xuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIEdyaWRzdGVyVXRpbHMuY2hlY2tUb3VjaEV2ZW50KGUpO1xuICAgIHRoaXMub2Zmc2V0TGVmdCA9IHRoaXMuZ3JpZHN0ZXIuZWwuc2Nyb2xsTGVmdCAtIHRoaXMuZ3JpZHN0ZXIuZWwub2Zmc2V0TGVmdDtcbiAgICB0aGlzLm9mZnNldFRvcCA9IHRoaXMuZ3JpZHN0ZXIuZWwuc2Nyb2xsVG9wIC0gdGhpcy5ncmlkc3Rlci5lbC5vZmZzZXRUb3A7XG4gICAgc2Nyb2xsKHRoaXMuZ3JpZHN0ZXIsIHRoaXMubGVmdCwgdGhpcy50b3AsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0LCBlLCB0aGlzLmxhc3RNb3VzZSxcbiAgICAgIHRoaXMuY2FsY3VsYXRlSXRlbVBvc2l0aW9uRnJvbU1vdXNlUG9zaXRpb24uYmluZCh0aGlzKSk7XG5cbiAgICB0aGlzLmNhbGN1bGF0ZUl0ZW1Qb3NpdGlvbkZyb21Nb3VzZVBvc2l0aW9uKGUpO1xuICB9XG5cbiAgY2FsY3VsYXRlSXRlbVBvc2l0aW9uRnJvbU1vdXNlUG9zaXRpb24oZTogYW55KTogdm9pZCB7XG4gICAgdGhpcy5sZWZ0ID0gZS5jbGllbnRYICsgdGhpcy5vZmZzZXRMZWZ0IC0gdGhpcy5kaWZmTGVmdDtcbiAgICB0aGlzLnRvcCA9IGUuY2xpZW50WSArIHRoaXMub2Zmc2V0VG9wIC0gdGhpcy5kaWZmVG9wO1xuICAgIHRoaXMuY2FsY3VsYXRlSXRlbVBvc2l0aW9uKCk7XG4gICAgdGhpcy5sYXN0TW91c2UuY2xpZW50WCA9IGUuY2xpZW50WDtcbiAgICB0aGlzLmxhc3RNb3VzZS5jbGllbnRZID0gZS5jbGllbnRZO1xuICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xuICAgICAgdGhpcy5ncmlkc3Rlci51cGRhdGVHcmlkKCk7XG4gICAgfSk7XG5cdHRoaXMuc2Nyb2xsSW50b1ZpZXcoKTtcbiAgfVxuXG4gIGRyYWdTdG9wKGU6IGFueSk6IHZvaWQge1xuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgY2FuY2VsU2Nyb2xsKCk7XG4gICAgdGhpcy5jYW5jZWxPbkJsdXIoKTtcbiAgICB0aGlzLm1vdXNlbW92ZSgpO1xuICAgIHRoaXMubW91c2V1cCgpO1xuICAgIHRoaXMubW91c2VsZWF2ZSgpO1xuICAgIHRoaXMudG91Y2htb3ZlKCk7XG4gICAgdGhpcy50b3VjaGVuZCgpO1xuICAgIHRoaXMudG91Y2hjYW5jZWwoKTtcbiAgICB0aGlzLmdyaWRzdGVySXRlbS5yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLmdyaWRzdGVySXRlbS5lbCwgJ2dyaWRzdGVyLWl0ZW0tbW92aW5nJyk7XG4gICAgdGhpcy5ncmlkc3Rlci5kcmFnSW5Qcm9ncmVzcyA9IGZhbHNlO1xuICAgIHRoaXMuZ3JpZHN0ZXIudXBkYXRlR3JpZCgpO1xuICAgIHRoaXMucGF0aCA9IFtdO1xuICAgIGlmICh0aGlzLmdyaWRzdGVyLm9wdGlvbnMuZHJhZ2dhYmxlICYmIHRoaXMuZ3JpZHN0ZXIub3B0aW9ucy5kcmFnZ2FibGUuc3RvcCkge1xuICAgICAgUHJvbWlzZS5yZXNvbHZlKHRoaXMuZ3JpZHN0ZXIub3B0aW9ucy5kcmFnZ2FibGUuc3RvcCh0aGlzLmdyaWRzdGVySXRlbS5pdGVtLCB0aGlzLmdyaWRzdGVySXRlbSwgZSkpXG4gICAgICAgIC50aGVuKHRoaXMubWFrZURyYWcuYmluZCh0aGlzKSwgdGhpcy5jYW5jZWxEcmFnLmJpbmQodGhpcykpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm1ha2VEcmFnKCk7XG4gICAgfVxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuZ3JpZHN0ZXIpIHtcbiAgICAgICAgdGhpcy5ncmlkc3Rlci5tb3ZpbmdJdGVtID0gbnVsbDtcbiAgICAgICAgdGhpcy5ncmlkc3Rlci5wcmV2aWV3U3R5bGUodHJ1ZSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBjYW5jZWxEcmFnKCkge1xuICAgIHRoaXMuZ3JpZHN0ZXJJdGVtLiRpdGVtLnggPSB0aGlzLmdyaWRzdGVySXRlbS5pdGVtLnggfHwgMDtcbiAgICB0aGlzLmdyaWRzdGVySXRlbS4kaXRlbS55ID0gdGhpcy5ncmlkc3Rlckl0ZW0uaXRlbS55IHx8IDA7XG4gICAgdGhpcy5ncmlkc3Rlckl0ZW0uc2V0U2l6ZSgpO1xuICAgIGlmICh0aGlzLnB1c2gpIHtcbiAgICAgIHRoaXMucHVzaC5yZXN0b3JlSXRlbXMoKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuc3dhcCkge1xuICAgICAgdGhpcy5zd2FwLnJlc3RvcmVTd2FwSXRlbSgpO1xuICAgIH1cbiAgICBpZiAodGhpcy5wdXNoKSB7XG4gICAgICB0aGlzLnB1c2guZGVzdHJveSgpO1xuICAgICAgZGVsZXRlIHRoaXMucHVzaDtcbiAgICB9XG4gICAgaWYgKHRoaXMuc3dhcCkge1xuICAgICAgdGhpcy5zd2FwLmRlc3Ryb3koKTtcbiAgICAgIGRlbGV0ZSB0aGlzLnN3YXA7XG4gICAgfVxuICB9XG5cbiAgbWFrZURyYWcoKSB7XG4gICAgaWYgKHRoaXMuZ3JpZHN0ZXIuJG9wdGlvbnMuZHJhZ2dhYmxlLmRyb3BPdmVySXRlbXMgJiYgdGhpcy5ncmlkc3Rlci5vcHRpb25zLmRyYWdnYWJsZVxuICAgICAgJiYgdGhpcy5ncmlkc3Rlci5vcHRpb25zLmRyYWdnYWJsZS5kcm9wT3Zlckl0ZW1zQ2FsbGJhY2tcbiAgICAgICYmIHRoaXMuY29sbGlzaW9uICYmIHRoaXMuY29sbGlzaW9uICE9PSB0cnVlICYmIHRoaXMuY29sbGlzaW9uLiRpdGVtKSB7XG4gICAgICB0aGlzLmdyaWRzdGVyLm9wdGlvbnMuZHJhZ2dhYmxlLmRyb3BPdmVySXRlbXNDYWxsYmFjayh0aGlzLmdyaWRzdGVySXRlbS5pdGVtLCB0aGlzLmNvbGxpc2lvbi5pdGVtLCB0aGlzLmdyaWRzdGVyKTtcbiAgICB9XG4gICAgdGhpcy5jb2xsaXNpb24gPSBmYWxzZTtcbiAgICB0aGlzLmdyaWRzdGVySXRlbS5zZXRTaXplKCk7XG4gICAgdGhpcy5ncmlkc3Rlckl0ZW0uY2hlY2tJdGVtQ2hhbmdlcyh0aGlzLmdyaWRzdGVySXRlbS4kaXRlbSwgdGhpcy5ncmlkc3Rlckl0ZW0uaXRlbSk7XG4gICAgaWYgKHRoaXMucHVzaCkge1xuICAgICAgdGhpcy5wdXNoLnNldFB1c2hlZEl0ZW1zKCk7XG4gICAgfVxuICAgIGlmICh0aGlzLnN3YXApIHtcbiAgICAgIHRoaXMuc3dhcC5zZXRTd2FwSXRlbSgpO1xuICAgIH1cbiAgICBpZiAodGhpcy5wdXNoKSB7XG4gICAgICB0aGlzLnB1c2guZGVzdHJveSgpO1xuICAgICAgZGVsZXRlIHRoaXMucHVzaDtcbiAgICB9XG4gICAgaWYgKHRoaXMuc3dhcCkge1xuICAgICAgdGhpcy5zd2FwLmRlc3Ryb3koKTtcbiAgICAgIGRlbGV0ZSB0aGlzLnN3YXA7XG4gICAgfVxuICB9XG5cbiAgY2FsY3VsYXRlSXRlbVBvc2l0aW9uKCkge1xuICAgIHRoaXMuZ3JpZHN0ZXIubW92aW5nSXRlbSA9IHRoaXMuZ3JpZHN0ZXJJdGVtLiRpdGVtO1xuICAgIHRoaXMucG9zaXRpb25YID0gdGhpcy5ncmlkc3Rlci5waXhlbHNUb1Bvc2l0aW9uWCh0aGlzLmxlZnQsIE1hdGgucm91bmQpO1xuICAgIHRoaXMucG9zaXRpb25ZID0gdGhpcy5ncmlkc3Rlci5waXhlbHNUb1Bvc2l0aW9uWSh0aGlzLnRvcCwgTWF0aC5yb3VuZCk7XG4gICAgdGhpcy5wb3NpdGlvblhCYWNrdXAgPSB0aGlzLmdyaWRzdGVySXRlbS4kaXRlbS54O1xuICAgIHRoaXMucG9zaXRpb25ZQmFja3VwID0gdGhpcy5ncmlkc3Rlckl0ZW0uJGl0ZW0ueTtcbiAgICB0aGlzLmdyaWRzdGVySXRlbS4kaXRlbS54ID0gdGhpcy5wb3NpdGlvblg7XG4gICAgaWYgKHRoaXMuZ3JpZHN0ZXIuY2hlY2tHcmlkQ29sbGlzaW9uKHRoaXMuZ3JpZHN0ZXJJdGVtLiRpdGVtKSkge1xuICAgICAgdGhpcy5ncmlkc3Rlckl0ZW0uJGl0ZW0ueCA9IHRoaXMucG9zaXRpb25YQmFja3VwO1xuICAgIH1cbiAgICB0aGlzLmdyaWRzdGVySXRlbS4kaXRlbS55ID0gdGhpcy5wb3NpdGlvblk7XG4gICAgaWYgKHRoaXMuZ3JpZHN0ZXIuY2hlY2tHcmlkQ29sbGlzaW9uKHRoaXMuZ3JpZHN0ZXJJdGVtLiRpdGVtKSkge1xuICAgICAgdGhpcy5ncmlkc3Rlckl0ZW0uJGl0ZW0ueSA9IHRoaXMucG9zaXRpb25ZQmFja3VwO1xuICAgIH1cbiAgICB0aGlzLmdyaWRzdGVyLmdyaWRSZW5kZXJlci5zZXRDZWxsUG9zaXRpb24odGhpcy5ncmlkc3Rlckl0ZW0ucmVuZGVyZXIsIHRoaXMuZ3JpZHN0ZXJJdGVtLmVsLCB0aGlzLmxlZnQsIHRoaXMudG9wKTtcblxuICAgIGxldCBsaW1pdCA9IHRoaXMuZ3JpZHN0ZXJJdGVtLmRyYWdMaW1pdCgpO1xuXHRsZXQgYWxsb3cgPSB0cnVlO1xuICAgIGlmKGxpbWl0KSB7XG5cdFx0aWYobGltaXQgPT09IFwieFwiICYmIHRoaXMucGF0aFswXS55ICE9PSB0aGlzLmdyaWRzdGVySXRlbS4kaXRlbS55KSBhbGxvdyA9IGZhbHNlO1xuXHRcdGlmKGxpbWl0ID09PSBcInlcIiAmJiB0aGlzLnBhdGhbMF0ueCAhPT0gdGhpcy5ncmlkc3Rlckl0ZW0uJGl0ZW0ueCkgYWxsb3cgPSBmYWxzZTtcblx0fVxuXHRcblx0aWYoIWFsbG93KSB7XG4gICAgICAgIHRoaXMuZ3JpZHN0ZXJJdGVtLiRpdGVtLnggPSB0aGlzLnBvc2l0aW9uWEJhY2t1cDtcbiAgICAgICAgdGhpcy5ncmlkc3Rlckl0ZW0uJGl0ZW0ueSA9IHRoaXMucG9zaXRpb25ZQmFja3VwO1xuXHR9IGVsc2UgaWYgKHRoaXMucG9zaXRpb25YQmFja3VwICE9PSB0aGlzLmdyaWRzdGVySXRlbS4kaXRlbS54IHx8IHRoaXMucG9zaXRpb25ZQmFja3VwICE9PSB0aGlzLmdyaWRzdGVySXRlbS4kaXRlbS55KSB7XG4gICAgICBjb25zdCBsYXN0UG9zaXRpb24gPSB0aGlzLnBhdGhbdGhpcy5wYXRoLmxlbmd0aCAtIDFdO1xuICAgICAgbGV0IGRpcmVjdGlvbiA9ICcnO1xuICAgICAgaWYgKGxhc3RQb3NpdGlvbi54IDwgdGhpcy5ncmlkc3Rlckl0ZW0uJGl0ZW0ueCkge1xuICAgICAgICBkaXJlY3Rpb24gPSB0aGlzLnB1c2guZnJvbVdlc3Q7XG4gICAgICB9IGVsc2UgaWYgKGxhc3RQb3NpdGlvbi54ID4gdGhpcy5ncmlkc3Rlckl0ZW0uJGl0ZW0ueCkge1xuICAgICAgICBkaXJlY3Rpb24gPSB0aGlzLnB1c2guZnJvbUVhc3Q7XG4gICAgICB9IGVsc2UgaWYgKGxhc3RQb3NpdGlvbi55IDwgdGhpcy5ncmlkc3Rlckl0ZW0uJGl0ZW0ueSkge1xuICAgICAgICBkaXJlY3Rpb24gPSB0aGlzLnB1c2guZnJvbU5vcnRoO1xuICAgICAgfSBlbHNlIGlmIChsYXN0UG9zaXRpb24ueSA+IHRoaXMuZ3JpZHN0ZXJJdGVtLiRpdGVtLnkpIHtcbiAgICAgICAgZGlyZWN0aW9uID0gdGhpcy5wdXNoLmZyb21Tb3V0aDtcbiAgICAgIH1cbiAgICAgIHRoaXMucHVzaC5wdXNoSXRlbXMoZGlyZWN0aW9uLCB0aGlzLmdyaWRzdGVyLiRvcHRpb25zLmRpc2FibGVQdXNoT25EcmFnKTtcbiAgICAgIHRoaXMuc3dhcC5zd2FwSXRlbXMoKTtcbiAgICAgIHRoaXMuY29sbGlzaW9uID0gdGhpcy5ncmlkc3Rlci5jaGVja0NvbGxpc2lvbih0aGlzLmdyaWRzdGVySXRlbS4kaXRlbSk7XG4gICAgICBpZiAodGhpcy5jb2xsaXNpb24pIHtcbiAgICAgICAgdGhpcy5ncmlkc3Rlckl0ZW0uJGl0ZW0ueCA9IHRoaXMucG9zaXRpb25YQmFja3VwO1xuICAgICAgICB0aGlzLmdyaWRzdGVySXRlbS4kaXRlbS55ID0gdGhpcy5wb3NpdGlvbllCYWNrdXA7XG4gICAgICAgIGlmICh0aGlzLmdyaWRzdGVyLiRvcHRpb25zLmRyYWdnYWJsZS5kcm9wT3Zlckl0ZW1zICYmIHRoaXMuY29sbGlzaW9uICE9PSB0cnVlICYmIHRoaXMuY29sbGlzaW9uLiRpdGVtKSB7XG4gICAgICAgICAgdGhpcy5ncmlkc3Rlci5tb3ZpbmdJdGVtID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5wYXRoLnB1c2goe3g6IHRoaXMuZ3JpZHN0ZXJJdGVtLiRpdGVtLngsIHk6IHRoaXMuZ3JpZHN0ZXJJdGVtLiRpdGVtLnl9KTtcbiAgICAgIH1cbiAgICAgIHRoaXMucHVzaC5jaGVja1B1c2hCYWNrKCk7XG4gICAgfVxuICAgIHRoaXMuZ3JpZHN0ZXIucHJldmlld1N0eWxlKHRydWUpO1xuICB9XG5cbiAgdG9nZ2xlKCkge1xuICAgIGNvbnN0IGVuYWJsZURyYWcgPSB0aGlzLmdyaWRzdGVySXRlbS5jYW5CZURyYWdnZWQoKTtcbiAgICBpZiAoIXRoaXMuZW5hYmxlZCAmJiBlbmFibGVEcmFnKSB7XG4gICAgICB0aGlzLmVuYWJsZWQgPSAhdGhpcy5lbmFibGVkO1xuICAgICAgdGhpcy5kcmFnU3RhcnRGdW5jdGlvbiA9IHRoaXMuZHJhZ1N0YXJ0RGVsYXkuYmluZCh0aGlzKTtcbiAgICAgIHRoaXMubW91c2Vkb3duID0gdGhpcy5ncmlkc3Rlckl0ZW0ucmVuZGVyZXIubGlzdGVuKHRoaXMuZ3JpZHN0ZXJJdGVtLmVsLCAnbW91c2Vkb3duJywgdGhpcy5kcmFnU3RhcnRGdW5jdGlvbik7XG4gICAgICB0aGlzLnRvdWNoc3RhcnQgPSB0aGlzLmdyaWRzdGVySXRlbS5yZW5kZXJlci5saXN0ZW4odGhpcy5ncmlkc3Rlckl0ZW0uZWwsICd0b3VjaHN0YXJ0JywgdGhpcy5kcmFnU3RhcnRGdW5jdGlvbik7XG4gICAgfSBlbHNlIGlmICh0aGlzLmVuYWJsZWQgJiYgIWVuYWJsZURyYWcpIHtcbiAgICAgIHRoaXMuZW5hYmxlZCA9ICF0aGlzLmVuYWJsZWQ7XG4gICAgICB0aGlzLm1vdXNlZG93bigpO1xuICAgICAgdGhpcy50b3VjaHN0YXJ0KCk7XG4gICAgfVxuICB9XG5cbiAgZHJhZ1N0YXJ0RGVsYXkoZTogYW55KTogdm9pZCB7XG4gICAgaWYgKGUudGFyZ2V0Lmhhc0F0dHJpYnV0ZSgnY2xhc3MnKSAmJiBlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2NsYXNzJykuc3BsaXQoJyAnKS5pbmRleE9mKCdncmlkc3Rlci1pdGVtLXJlc2l6YWJsZS1oYW5kbGVyJykgPiAtMSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoR3JpZHN0ZXJVdGlscy5jaGVja0NvbnRlbnRDbGFzc0ZvckV2ZW50KHRoaXMuZ3JpZHN0ZXIsIGUpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIEdyaWRzdGVyVXRpbHMuY2hlY2tUb3VjaEV2ZW50KGUpO1xuICAgIGlmICghdGhpcy5ncmlkc3Rlci4kb3B0aW9ucy5kcmFnZ2FibGUuZGVsYXlTdGFydCkge1xuICAgICAgdGhpcy5kcmFnU3RhcnQoZSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuZHJhZ1N0YXJ0KGUpO1xuICAgICAgY2FuY2VsRHJhZygpO1xuICAgIH0sIHRoaXMuZ3JpZHN0ZXIuJG9wdGlvbnMuZHJhZ2dhYmxlLmRlbGF5U3RhcnQpO1xuICAgIGNvbnN0IGNhbmNlbE1vdXNlID0gdGhpcy5ncmlkc3Rlckl0ZW0ucmVuZGVyZXIubGlzdGVuKCdkb2N1bWVudCcsICdtb3VzZXVwJywgY2FuY2VsRHJhZyk7XG4gICAgY29uc3QgY2FuY2VsTW91c2VMZWF2ZSA9IHRoaXMuZ3JpZHN0ZXJJdGVtLnJlbmRlcmVyLmxpc3RlbignZG9jdW1lbnQnLCAnbW91c2VsZWF2ZScsIGNhbmNlbERyYWcpO1xuICAgIGNvbnN0IGNhbmNlbE9uQmx1ciA9IHRoaXMuZ3JpZHN0ZXJJdGVtLnJlbmRlcmVyLmxpc3Rlbignd2luZG93JywgJ2JsdXInLCBjYW5jZWxEcmFnKTtcbiAgICBjb25zdCBjYW5jZWxUb3VjaE1vdmUgPSB0aGlzLmdyaWRzdGVySXRlbS5yZW5kZXJlci5saXN0ZW4oJ2RvY3VtZW50JywgJ3RvdWNobW92ZScsIGNhbmNlbE1vdmUpO1xuICAgIGNvbnN0IGNhbmNlbFRvdWNoRW5kID0gdGhpcy5ncmlkc3Rlckl0ZW0ucmVuZGVyZXIubGlzdGVuKCdkb2N1bWVudCcsICd0b3VjaGVuZCcsIGNhbmNlbERyYWcpO1xuICAgIGNvbnN0IGNhbmNlbFRvdWNoQ2FuY2VsID0gdGhpcy5ncmlkc3Rlckl0ZW0ucmVuZGVyZXIubGlzdGVuKCdkb2N1bWVudCcsICd0b3VjaGNhbmNlbCcsIGNhbmNlbERyYWcpO1xuXG4gICAgZnVuY3Rpb24gY2FuY2VsTW92ZShldmVudE1vdmU6IGFueSkge1xuICAgICAgR3JpZHN0ZXJVdGlscy5jaGVja1RvdWNoRXZlbnQoZXZlbnRNb3ZlKTtcbiAgICAgIGlmIChNYXRoLmFicyhldmVudE1vdmUuY2xpZW50WCAtIGUuY2xpZW50WCkgPiA5IHx8IE1hdGguYWJzKGV2ZW50TW92ZS5jbGllbnRZIC0gZS5jbGllbnRZKSA+IDkpIHtcbiAgICAgICAgY2FuY2VsRHJhZygpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNhbmNlbERyYWcoKSB7XG4gICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gICAgICBjYW5jZWxPbkJsdXIoKTtcbiAgICAgIGNhbmNlbE1vdXNlKCk7XG4gICAgICBjYW5jZWxNb3VzZUxlYXZlKCk7XG4gICAgICBjYW5jZWxUb3VjaE1vdmUoKTtcbiAgICAgIGNhbmNlbFRvdWNoRW5kKCk7XG4gICAgICBjYW5jZWxUb3VjaENhbmNlbCgpO1xuICAgIH1cbiAgfVxuXG4gIGRlYm91bmNlKGZ1bmM6IGFueSwgd2FpdDogbnVtYmVyLCBpbW1lZGlhdGU/OiBib29sZWFuKSB7XG4gICAgbGV0IHRpbWVvdXQ6IGFueTtcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgY29udGV4dCA9IHRoaXMsIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgICB2YXIgbGF0ZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdGltZW91dCA9IG51bGw7XG4gICAgICAgIGlmICghaW1tZWRpYXRlKSBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuICAgICAgfTtcbiAgICAgIHZhciBjYWxsTm93ID0gaW1tZWRpYXRlICYmICF0aW1lb3V0O1xuICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICAgICAgdGltZW91dCA9IHNldFRpbWVvdXQobGF0ZXIsIHdhaXQpO1xuICAgICAgaWYgKGNhbGxOb3cpIGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XG4gICAgfTtcbiAgfTtcbn1cbiJdfQ==
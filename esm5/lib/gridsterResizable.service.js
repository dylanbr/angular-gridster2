/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable, NgZone } from '@angular/core';
import { cancelScroll, scroll } from './gridsterScroll.service';
import { GridsterPush } from './gridsterPush.service';
import { GridsterUtils } from './gridsterUtils.service';
import { GridsterPushResize } from './gridsterPushResize.service';
import { GridsterItemComponentInterface } from './gridsterItemComponent.interface';
import { GridsterComponentInterface } from './gridster.interface';
var GridsterResizable = /** @class */ (function () {
    function GridsterResizable(gridsterItem, gridster, zone) {
        this.zone = zone;
        this.gridsterItem = gridsterItem;
        this.gridster = gridster;
        this.lastMouse = {
            clientX: 0,
            clientY: 0
        };
        this.itemBackup = [0, 0, 0, 0];
        this.resizeEventScrollType = { w: false, e: false, n: false, s: false };
    }
    /**
     * @return {?}
     */
    GridsterResizable.prototype.destroy = /**
     * @return {?}
     */
    function () {
        if (this.gridster.previewStyle) {
            this.gridster.previewStyle();
        }
        delete this.gridsterItem;
        delete this.gridster;
    };
    /**
     * @param {?} e
     * @return {?}
     */
    GridsterResizable.prototype.dragStart = /**
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
        if (this.gridster.options.resizable && this.gridster.options.resizable.start) {
            this.gridster.options.resizable.start(this.gridsterItem.item, this.gridsterItem, e);
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
        this.gridsterItem.renderer.addClass(this.gridsterItem.el, 'gridster-item-resizing');
        this.lastMouse.clientX = e.clientX;
        this.lastMouse.clientY = e.clientY;
        this.left = this.gridsterItem.left;
        this.top = this.gridsterItem.top;
        this.width = this.gridsterItem.width;
        this.height = this.gridsterItem.height;
        this.bottom = this.gridsterItem.top + this.gridsterItem.height;
        this.right = this.gridsterItem.left + this.gridsterItem.width;
        this.margin = this.gridster.$options.margin;
        this.offsetLeft = this.gridster.el.scrollLeft - this.gridster.el.offsetLeft;
        this.offsetTop = this.gridster.el.scrollTop - this.gridster.el.offsetTop;
        this.diffLeft = e.clientX + this.offsetLeft - this.left;
        this.diffRight = e.clientX + this.offsetLeft - this.right;
        this.diffTop = e.clientY + this.offsetTop - this.top;
        this.diffBottom = e.clientY + this.offsetTop - this.bottom;
        this.minHeight = this.gridster.positionYToPixels(this.gridsterItem.$item.minItemRows || this.gridster.$options.minItemRows)
            - this.margin;
        this.minWidth = this.gridster.positionXToPixels(this.gridsterItem.$item.minItemCols || this.gridster.$options.minItemCols)
            - this.margin;
        this.maxHeight = this.gridster.positionYToPixels(this.gridsterItem.$item.maxItemRows || this.gridster.$options.maxItemRows)
            - this.margin;
        this.maxWidth = this.gridster.positionXToPixels(this.gridsterItem.$item.maxItemCols || this.gridster.$options.maxItemCols)
            - this.margin;
        this.gridster.movingItem = this.gridsterItem.$item;
        this.gridster.previewStyle();
        this.push = new GridsterPush(this.gridsterItem);
        this.pushResize = new GridsterPushResize(this.gridsterItem);
        this.gridster.dragInProgress = true;
        this.gridster.updateGrid();
        if (e.target.hasAttribute('class') && e.target.getAttribute('class').split(' ').indexOf('handle-n') > -1) {
            this.resizeEventScrollType.n = true;
            this.directionFunction = this.handleN;
        }
        else if (e.target.hasAttribute('class') && e.target.getAttribute('class').split(' ').indexOf('handle-w') > -1) {
            this.resizeEventScrollType.w = true;
            this.directionFunction = this.handleW;
        }
        else if (e.target.hasAttribute('class') && e.target.getAttribute('class').split(' ').indexOf('handle-s') > -1) {
            this.resizeEventScrollType.s = true;
            this.directionFunction = this.handleS;
        }
        else if (e.target.hasAttribute('class') && e.target.getAttribute('class').split(' ').indexOf('handle-e') > -1) {
            this.resizeEventScrollType.e = true;
            this.directionFunction = this.handleE;
        }
        else if (e.target.hasAttribute('class') && e.target.getAttribute('class').split(' ').indexOf('handle-nw') > -1) {
            this.resizeEventScrollType.n = true;
            this.resizeEventScrollType.w = true;
            this.directionFunction = this.handleNW;
        }
        else if (e.target.hasAttribute('class') && e.target.getAttribute('class').split(' ').indexOf('handle-ne') > -1) {
            this.resizeEventScrollType.n = true;
            this.resizeEventScrollType.e = true;
            this.directionFunction = this.handleNE;
        }
        else if (e.target.hasAttribute('class') && e.target.getAttribute('class').split(' ').indexOf('handle-sw') > -1) {
            this.resizeEventScrollType.s = true;
            this.resizeEventScrollType.w = true;
            this.directionFunction = this.handleSW;
        }
        else if (e.target.hasAttribute('class') && e.target.getAttribute('class').split(' ').indexOf('handle-se') > -1) {
            this.resizeEventScrollType.s = true;
            this.resizeEventScrollType.e = true;
            this.directionFunction = this.handleSE;
        }
    };
    /**
     * @param {?} e
     * @return {?}
     */
    GridsterResizable.prototype.dragMove = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        var _this = this;
        e.stopPropagation();
        e.preventDefault();
        GridsterUtils.checkTouchEvent(e);
        this.offsetTop = this.gridster.el.scrollTop - this.gridster.el.offsetTop;
        this.offsetLeft = this.gridster.el.scrollLeft - this.gridster.el.offsetLeft;
        scroll(this.gridster, this.left, this.top, this.width, this.height, e, this.lastMouse, this.directionFunction.bind(this), true, this.resizeEventScrollType);
        this.directionFunction(e);
        this.lastMouse.clientX = e.clientX;
        this.lastMouse.clientY = e.clientY;
        this.zone.run(function () {
            _this.gridster.updateGrid();
        });
    };
    /**
     * @param {?} e
     * @return {?}
     */
    GridsterResizable.prototype.dragStop = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        var _this = this;
        e.stopPropagation();
        e.preventDefault();
        cancelScroll();
        this.mousemove();
        this.mouseup();
        this.mouseleave();
        this.cancelOnBlur();
        this.touchmove();
        this.touchend();
        this.touchcancel();
        this.gridster.dragInProgress = false;
        this.gridster.updateGrid();
        if (this.gridster.options.resizable && this.gridster.options.resizable.stop) {
            Promise.resolve(this.gridster.options.resizable.stop(this.gridsterItem.item, this.gridsterItem, e))
                .then(this.makeResize.bind(this), this.cancelResize.bind(this));
        }
        else {
            this.makeResize();
        }
        setTimeout(function () {
            _this.gridsterItem.renderer.removeClass(_this.gridsterItem.el, 'gridster-item-resizing');
            if (_this.gridster) {
                _this.gridster.movingItem = null;
                _this.gridster.previewStyle();
            }
        });
    };
    /**
     * @return {?}
     */
    GridsterResizable.prototype.cancelResize = /**
     * @return {?}
     */
    function () {
        this.gridsterItem.$item.cols = this.gridsterItem.item.cols || 1;
        this.gridsterItem.$item.rows = this.gridsterItem.item.rows || 1;
        this.gridsterItem.$item.x = this.gridsterItem.item.x || 0;
        this.gridsterItem.$item.y = this.gridsterItem.item.y || 0;
        this.gridsterItem.setSize();
        this.push.restoreItems();
        this.pushResize.restoreItems();
        this.push.destroy();
        delete this.push;
        this.pushResize.destroy();
        delete this.pushResize;
    };
    /**
     * @return {?}
     */
    GridsterResizable.prototype.makeResize = /**
     * @return {?}
     */
    function () {
        this.gridsterItem.setSize();
        this.gridsterItem.checkItemChanges(this.gridsterItem.$item, this.gridsterItem.item);
        this.push.setPushedItems();
        this.pushResize.setPushedItems();
        this.push.destroy();
        delete this.push;
        this.pushResize.destroy();
        delete this.pushResize;
    };
    /**
     * @param {?} e
     * @return {?}
     */
    GridsterResizable.prototype.handleN = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        this.top = e.clientY + this.offsetTop - this.diffTop;
        this.height = this.bottom - this.top;
        if (this.minHeight > this.height) {
            this.height = this.minHeight;
            this.top = this.bottom - this.minHeight;
        }
        if (this.maxHeight < this.height) {
            this.height = this.maxHeight;
            this.top = this.bottom - this.maxHeight;
        }
        this.newPosition = this.gridster.pixelsToPositionY(this.top + this.margin, Math.floor);
        if (this.gridsterItem.$item.y !== this.newPosition) {
            this.itemBackup[1] = this.gridsterItem.$item.y;
            this.itemBackup[3] = this.gridsterItem.$item.rows;
            this.gridsterItem.$item.rows += this.gridsterItem.$item.y - this.newPosition;
            this.gridsterItem.$item.y = this.newPosition;
            this.pushResize.pushItems(this.pushResize.fromSouth);
            this.push.pushItems(this.push.fromSouth, this.gridster.$options.disablePushOnResize);
            if (this.gridster.checkCollision(this.gridsterItem.$item)) {
                this.gridsterItem.$item.y = this.itemBackup[1];
                this.gridsterItem.$item.rows = this.itemBackup[3];
                this.setItemTop(this.gridster.positionYToPixels(this.gridsterItem.$item.y));
                this.setItemHeight(this.gridster.positionYToPixels(this.gridsterItem.$item.rows) - this.margin);
                return;
            }
            else {
                this.gridster.previewStyle();
            }
            this.pushResize.checkPushBack();
            this.push.checkPushBack();
        }
        this.setItemTop(this.top);
        this.setItemHeight(this.height);
    };
    /**
     * @param {?} e
     * @return {?}
     */
    GridsterResizable.prototype.handleW = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        this.left = e.clientX + this.offsetLeft - this.diffLeft;
        this.width = this.right - this.left;
        if (this.minWidth > this.width) {
            this.width = this.minWidth;
            this.left = this.right - this.minWidth;
        }
        if (this.maxWidth < this.width) {
            this.width = this.maxWidth;
            this.left = this.right - this.maxWidth;
        }
        this.newPosition = this.gridster.pixelsToPositionX(this.left + this.margin, Math.floor);
        if (this.gridsterItem.$item.x !== this.newPosition) {
            this.itemBackup[0] = this.gridsterItem.$item.x;
            this.itemBackup[2] = this.gridsterItem.$item.cols;
            this.gridsterItem.$item.cols += this.gridsterItem.$item.x - this.newPosition;
            this.gridsterItem.$item.x = this.newPosition;
            this.pushResize.pushItems(this.pushResize.fromEast);
            this.push.pushItems(this.push.fromEast, this.gridster.$options.disablePushOnResize);
            if (this.gridster.checkCollision(this.gridsterItem.$item)) {
                this.gridsterItem.$item.x = this.itemBackup[0];
                this.gridsterItem.$item.cols = this.itemBackup[2];
                this.setItemLeft(this.gridster.positionXToPixels(this.gridsterItem.$item.x));
                this.setItemWidth(this.gridster.positionXToPixels(this.gridsterItem.$item.cols) - this.margin);
                return;
            }
            else {
                this.gridster.previewStyle();
            }
            this.pushResize.checkPushBack();
            this.push.checkPushBack();
        }
        this.setItemLeft(this.left);
        this.setItemWidth(this.width);
    };
    /**
     * @param {?} e
     * @return {?}
     */
    GridsterResizable.prototype.handleS = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        this.height = e.clientY + this.offsetTop - this.diffBottom - this.top;
        if (this.minHeight > this.height) {
            this.height = this.minHeight;
        }
        if (this.maxHeight < this.height) {
            this.height = this.maxHeight;
        }
        this.bottom = this.top + this.height;
        this.newPosition = this.gridster.pixelsToPositionY(this.bottom, Math.ceil);
        if ((this.gridsterItem.$item.y + this.gridsterItem.$item.rows) !== this.newPosition) {
            this.itemBackup[3] = this.gridsterItem.$item.rows;
            this.gridsterItem.$item.rows = this.newPosition - this.gridsterItem.$item.y;
            this.pushResize.pushItems(this.pushResize.fromNorth);
            this.push.pushItems(this.push.fromNorth, this.gridster.$options.disablePushOnResize);
            if (this.gridster.checkCollision(this.gridsterItem.$item)) {
                this.gridsterItem.$item.rows = this.itemBackup[3];
                this.setItemHeight(this.gridster.positionYToPixels(this.gridsterItem.$item.rows) - this.margin);
                return;
            }
            else {
                this.gridster.previewStyle();
            }
            this.pushResize.checkPushBack();
            this.push.checkPushBack();
        }
        this.setItemHeight(this.height);
    };
    /**
     * @param {?} e
     * @return {?}
     */
    GridsterResizable.prototype.handleE = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        this.width = e.clientX + this.offsetLeft - this.diffRight - this.left;
        if (this.minWidth > this.width) {
            this.width = this.minWidth;
        }
        if (this.maxWidth < this.width) {
            this.width = this.maxWidth;
        }
        this.right = this.left + this.width;
        this.newPosition = this.gridster.pixelsToPositionX(this.right, Math.ceil);
        if ((this.gridsterItem.$item.x + this.gridsterItem.$item.cols) !== this.newPosition) {
            this.itemBackup[2] = this.gridsterItem.$item.cols;
            this.gridsterItem.$item.cols = this.newPosition - this.gridsterItem.$item.x;
            this.pushResize.pushItems(this.pushResize.fromWest);
            this.push.pushItems(this.push.fromWest, this.gridster.$options.disablePushOnResize);
            if (this.gridster.checkCollision(this.gridsterItem.$item)) {
                this.gridsterItem.$item.cols = this.itemBackup[2];
                this.setItemWidth(this.gridster.positionXToPixels(this.gridsterItem.$item.cols) - this.margin);
                return;
            }
            else {
                this.gridster.previewStyle();
            }
            this.pushResize.checkPushBack();
            this.push.checkPushBack();
        }
        this.setItemWidth(this.width);
    };
    /**
     * @param {?} e
     * @return {?}
     */
    GridsterResizable.prototype.handleNW = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        this.handleN(e);
        this.handleW(e);
    };
    /**
     * @param {?} e
     * @return {?}
     */
    GridsterResizable.prototype.handleNE = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        this.handleN(e);
        this.handleE(e);
    };
    /**
     * @param {?} e
     * @return {?}
     */
    GridsterResizable.prototype.handleSW = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        this.handleS(e);
        this.handleW(e);
    };
    /**
     * @param {?} e
     * @return {?}
     */
    GridsterResizable.prototype.handleSE = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        this.handleS(e);
        this.handleE(e);
    };
    /**
     * @return {?}
     */
    GridsterResizable.prototype.toggle = /**
     * @return {?}
     */
    function () {
        this.resizeEnabled = this.gridsterItem.canBeResized();
    };
    /**
     * @param {?} e
     * @return {?}
     */
    GridsterResizable.prototype.dragStartDelay = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        var _this = this;
        GridsterUtils.checkTouchEvent(e);
        if (!this.gridster.$options.resizable.delayStart) {
            this.dragStart(e);
            return;
        }
        /** @type {?} */
        var timeout = setTimeout(function () {
            _this.dragStart(e);
            cancelDrag();
        }, this.gridster.$options.resizable.delayStart);
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
     * @param {?} top
     * @return {?}
     */
    GridsterResizable.prototype.setItemTop = /**
     * @param {?} top
     * @return {?}
     */
    function (top) {
        this.gridster.gridRenderer.setCellPosition(this.gridsterItem.renderer, this.gridsterItem.el, this.left, top);
    };
    /**
     * @param {?} left
     * @return {?}
     */
    GridsterResizable.prototype.setItemLeft = /**
     * @param {?} left
     * @return {?}
     */
    function (left) {
        this.gridster.gridRenderer.setCellPosition(this.gridsterItem.renderer, this.gridsterItem.el, left, this.top);
    };
    /**
     * @param {?} height
     * @return {?}
     */
    GridsterResizable.prototype.setItemHeight = /**
     * @param {?} height
     * @return {?}
     */
    function (height) {
        this.gridsterItem.renderer.setStyle(this.gridsterItem.el, 'height', height + 'px');
    };
    /**
     * @param {?} width
     * @return {?}
     */
    GridsterResizable.prototype.setItemWidth = /**
     * @param {?} width
     * @return {?}
     */
    function (width) {
        this.gridsterItem.renderer.setStyle(this.gridsterItem.el, 'width', width + 'px');
    };
    GridsterResizable.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    GridsterResizable.ctorParameters = function () { return [
        { type: GridsterItemComponentInterface },
        { type: GridsterComponentInterface },
        { type: NgZone }
    ]; };
    return GridsterResizable;
}());
export { GridsterResizable };
if (false) {
    /** @type {?} */
    GridsterResizable.prototype.gridsterItem;
    /** @type {?} */
    GridsterResizable.prototype.gridster;
    /** @type {?} */
    GridsterResizable.prototype.lastMouse;
    /** @type {?} */
    GridsterResizable.prototype.itemBackup;
    /** @type {?} */
    GridsterResizable.prototype.resizeEventScrollType;
    /** @type {?} */
    GridsterResizable.prototype.directionFunction;
    /** @type {?} */
    GridsterResizable.prototype.dragFunction;
    /** @type {?} */
    GridsterResizable.prototype.dragStopFunction;
    /** @type {?} */
    GridsterResizable.prototype.resizeEnabled;
    /** @type {?} */
    GridsterResizable.prototype.mousemove;
    /** @type {?} */
    GridsterResizable.prototype.mouseup;
    /** @type {?} */
    GridsterResizable.prototype.mouseleave;
    /** @type {?} */
    GridsterResizable.prototype.cancelOnBlur;
    /** @type {?} */
    GridsterResizable.prototype.touchmove;
    /** @type {?} */
    GridsterResizable.prototype.touchend;
    /** @type {?} */
    GridsterResizable.prototype.touchcancel;
    /** @type {?} */
    GridsterResizable.prototype.push;
    /** @type {?} */
    GridsterResizable.prototype.pushResize;
    /** @type {?} */
    GridsterResizable.prototype.minHeight;
    /** @type {?} */
    GridsterResizable.prototype.minWidth;
    /** @type {?} */
    GridsterResizable.prototype.maxHeight;
    /** @type {?} */
    GridsterResizable.prototype.maxWidth;
    /** @type {?} */
    GridsterResizable.prototype.offsetTop;
    /** @type {?} */
    GridsterResizable.prototype.offsetLeft;
    /** @type {?} */
    GridsterResizable.prototype.diffTop;
    /** @type {?} */
    GridsterResizable.prototype.diffLeft;
    /** @type {?} */
    GridsterResizable.prototype.diffRight;
    /** @type {?} */
    GridsterResizable.prototype.diffBottom;
    /** @type {?} */
    GridsterResizable.prototype.margin;
    /** @type {?} */
    GridsterResizable.prototype.top;
    /** @type {?} */
    GridsterResizable.prototype.left;
    /** @type {?} */
    GridsterResizable.prototype.bottom;
    /** @type {?} */
    GridsterResizable.prototype.right;
    /** @type {?} */
    GridsterResizable.prototype.width;
    /** @type {?} */
    GridsterResizable.prototype.height;
    /** @type {?} */
    GridsterResizable.prototype.newPosition;
    /**
     * @type {?}
     * @private
     */
    GridsterResizable.prototype.zone;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZHN0ZXJSZXNpemFibGUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItZ3JpZHN0ZXIyLyIsInNvdXJjZXMiOlsibGliL2dyaWRzdGVyUmVzaXphYmxlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxVQUFVLEVBQUUsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRWpELE9BQU8sRUFBQyxZQUFZLEVBQUUsTUFBTSxFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFFOUQsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQ3BELE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUN0RCxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSw4QkFBOEIsQ0FBQztBQUNoRSxPQUFPLEVBQUMsOEJBQThCLEVBQUMsTUFBTSxtQ0FBbUMsQ0FBQztBQUNqRixPQUFPLEVBQUMsMEJBQTBCLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUVoRTtJQTBDRSwyQkFBWSxZQUE0QyxFQUFFLFFBQW9DLEVBQVUsSUFBWTtRQUFaLFNBQUksR0FBSixJQUFJLENBQVE7UUFDbEgsSUFBSSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7UUFDakMsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDekIsSUFBSSxDQUFDLFNBQVMsR0FBRztZQUNmLE9BQU8sRUFBRSxDQUFDO1lBQ1YsT0FBTyxFQUFFLENBQUM7U0FDWCxDQUFDO1FBQ0YsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQy9CLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxFQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUMsQ0FBQztJ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LENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO1lBQy9HLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO1lBQ3BDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1NBQ3ZDO2FBQU0sSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO1lBQy9HLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO1lBQ3BDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1NBQ3ZDO2FBQU0sSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO1lBQ2hILElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO1lBQ3BDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO1lBQ3BDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1NBQ3hDO2FBQU0sSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLFdBQVcs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SUE4YTFCLHdCQUFDO0NBQUEsQUFwYUQsSUFvYUM7U0FuYVksaUJBQWlCOzs7SUFDNUIseUNBQTZDOztJQUM3QyxxQ0FBcUM7O0lBQ3JDLHNDQUdFOztJQUNGLHVDQUEwQjs7SUFDMUIsa0RBQStDOztJQUMvQyw4Q0FBNEI7O0lBQzVCLHlDQUFtQzs7SUFDbkMsNkNBQXVDOztJQUN2QywwQ0FBdUI7O0lBQ3ZCLHNDQUFvQjs7SUFDcEIsb0NBQWtCOztJQUNsQix1Q0FBcUI7O0lBQ3JCLHlDQUF1Qjs7SUFDdkIsc0NBQW9COztJQUNwQixxQ0FBbUI7O0lBQ25CLHdDQUFzQjs7SUFDdEIsaUNBQW1COztJQUNuQix1Q0FBK0I7O0lBQy9CLHNDQUFrQjs7SUFDbEIscUNBQWlCOztJQUNqQixzQ0FBa0I7O0lBQ2xCLHFDQUFpQjs7SUFDakIsc0NBQWtCOztJQUNsQix1Q0FBbUI7O0lBQ25CLG9DQUFnQjs7SUFDaEIscUNBQWlCOztJQUNqQixzQ0FBa0I7O0lBQ2xCLHVDQUFtQjs7SUFDbkIsbUNBQWU7O0lBQ2YsZ0NBQVk7O0lBQ1osaUNBQWE7O0lBQ2IsbUNBQWU7O0lBQ2Ysa0NBQWM7O0lBQ2Qsa0NBQWM7O0lBQ2QsbUNBQWU7O0lBQ2Ysd0NBQW9COzs7OztJQUU0RSxpQ0FBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGUsIE5nWm9uZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7Y2FuY2VsU2Nyb2xsLCBzY3JvbGx9IGZyb20gJy4vZ3JpZHN0ZXJTY3JvbGwuc2VydmljZSc7XG5pbXBvcnQge0dyaWRzdGVyUmVzaXplRXZlbnRUeXBlfSBmcm9tICcuL2dyaWRzdGVyUmVzaXplRXZlbnRUeXBlLmludGVyZmFjZSc7XG5pbXBvcnQge0dyaWRzdGVyUHVzaH0gZnJvbSAnLi9ncmlkc3RlclB1c2guc2VydmljZSc7XG5pbXBvcnQge0dyaWRzdGVyVXRpbHN9IGZyb20gJy4vZ3JpZHN0ZXJVdGlscy5zZXJ2aWNlJztcbmltcG9ydCB7R3JpZHN0ZXJQdXNoUmVzaXplfSBmcm9tICcuL2dyaWRzdGVyUHVzaFJlc2l6ZS5zZXJ2aWNlJztcbmltcG9ydCB7R3JpZHN0ZXJJdGVtQ29tcG9uZW50SW50ZXJmYWNlfSBmcm9tICcuL2dyaWRzdGVySXRlbUNvbXBvbmVudC5pbnRlcmZhY2UnO1xuaW1wb3J0IHtHcmlkc3RlckNvbXBvbmVudEludGVyZmFjZX0gZnJvbSAnLi9ncmlkc3Rlci5pbnRlcmZhY2UnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgR3JpZHN0ZXJSZXNpemFibGUge1xuICBncmlkc3Rlckl0ZW06IEdyaWRzdGVySXRlbUNvbXBvbmVudEludGVyZmFjZTtcbiAgZ3JpZHN0ZXI6IEdyaWRzdGVyQ29tcG9uZW50SW50ZXJmYWNlO1xuICBsYXN0TW91c2U6IHtcbiAgICBjbGllbnRYOiBudW1iZXIsXG4gICAgY2xpZW50WTogbnVtYmVyXG4gIH07XG4gIGl0ZW1CYWNrdXA6IEFycmF5PG51bWJlcj47XG4gIHJlc2l6ZUV2ZW50U2Nyb2xsVHlwZTogR3JpZHN0ZXJSZXNpemVFdmVudFR5cGU7XG4gIGRpcmVjdGlvbkZ1bmN0aW9uOiBGdW5jdGlvbjtcbiAgZHJhZ0Z1bmN0aW9uOiAoZXZlbnQ6IGFueSkgPT4gdm9pZDtcbiAgZHJhZ1N0b3BGdW5jdGlvbjogKGV2ZW50OiBhbnkpID0+IHZvaWQ7XG4gIHJlc2l6ZUVuYWJsZWQ6IGJvb2xlYW47XG4gIG1vdXNlbW92ZTogRnVuY3Rpb247XG4gIG1vdXNldXA6IEZ1bmN0aW9uO1xuICBtb3VzZWxlYXZlOiBGdW5jdGlvbjtcbiAgY2FuY2VsT25CbHVyOiBGdW5jdGlvbjtcbiAgdG91Y2htb3ZlOiBGdW5jdGlvbjtcbiAgdG91Y2hlbmQ6IEZ1bmN0aW9uO1xuICB0b3VjaGNhbmNlbDogRnVuY3Rpb247XG4gIHB1c2g6IEdyaWRzdGVyUHVzaDtcbiAgcHVzaFJlc2l6ZTogR3JpZHN0ZXJQdXNoUmVzaXplO1xuICBtaW5IZWlnaHQ6IG51bWJlcjtcbiAgbWluV2lkdGg6IG51bWJlcjtcbiAgbWF4SGVpZ2h0OiBudW1iZXI7XG4gIG1heFdpZHRoOiBudW1iZXI7XG4gIG9mZnNldFRvcDogbnVtYmVyO1xuICBvZmZzZXRMZWZ0OiBudW1iZXI7XG4gIGRpZmZUb3A6IG51bWJlcjtcbiAgZGlmZkxlZnQ6IG51bWJlcjtcbiAgZGlmZlJpZ2h0OiBudW1iZXI7XG4gIGRpZmZCb3R0b206IG51bWJlcjtcbiAgbWFyZ2luOiBudW1iZXI7XG4gIHRvcDogbnVtYmVyO1xuICBsZWZ0OiBudW1iZXI7XG4gIGJvdHRvbTogbnVtYmVyO1xuICByaWdodDogbnVtYmVyO1xuICB3aWR0aDogbnVtYmVyO1xuICBoZWlnaHQ6IG51bWJlcjtcbiAgbmV3UG9zaXRpb246IG51bWJlcjtcblxuICBjb25zdHJ1Y3Rvcihncmlkc3Rlckl0ZW06IEdyaWRzdGVySXRlbUNvbXBvbmVudEludGVyZmFjZSwgZ3JpZHN0ZXI6IEdyaWRzdGVyQ29tcG9uZW50SW50ZXJmYWNlLCBwcml2YXRlIHpvbmU6IE5nWm9uZSkge1xuICAgIHRoaXMuZ3JpZHN0ZXJJdGVtID0gZ3JpZHN0ZXJJdGVtO1xuICAgIHRoaXMuZ3JpZHN0ZXIgPSBncmlkc3RlcjtcbiAgICB0aGlzLmxhc3RNb3VzZSA9IHtcbiAgICAgIGNsaWVudFg6IDAsXG4gICAgICBjbGllbnRZOiAwXG4gICAgfTtcbiAgICB0aGlzLml0ZW1CYWNrdXAgPSBbMCwgMCwgMCwgMF07XG4gICAgdGhpcy5yZXNpemVFdmVudFNjcm9sbFR5cGUgPSB7dzogZmFsc2UsIGU6IGZhbHNlLCBuOiBmYWxzZSwgczogZmFsc2V9O1xuICB9XG5cbiAgZGVzdHJveSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5ncmlkc3Rlci5wcmV2aWV3U3R5bGUpIHtcbiAgICAgIHRoaXMuZ3JpZHN0ZXIucHJldmlld1N0eWxlKCk7XG4gICAgfVxuICAgIGRlbGV0ZSB0aGlzLmdyaWRzdGVySXRlbTtcbiAgICBkZWxldGUgdGhpcy5ncmlkc3RlcjtcbiAgfVxuXG4gIGRyYWdTdGFydChlOiBhbnkpOiB2b2lkIHtcbiAgICBzd2l0Y2ggKGUud2hpY2gpIHtcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgLy8gbGVmdCBtb3VzZSBidXR0b25cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDI6XG4gICAgICBjYXNlIDM6XG4gICAgICAgIC8vIHJpZ2h0IG9yIG1pZGRsZSBtb3VzZSBidXR0b25cbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodGhpcy5ncmlkc3Rlci5vcHRpb25zLnJlc2l6YWJsZSAmJiB0aGlzLmdyaWRzdGVyLm9wdGlvbnMucmVzaXphYmxlLnN0YXJ0KSB7XG4gICAgICB0aGlzLmdyaWRzdGVyLm9wdGlvbnMucmVzaXphYmxlLnN0YXJ0KHRoaXMuZ3JpZHN0ZXJJdGVtLml0ZW0sIHRoaXMuZ3JpZHN0ZXJJdGVtLCBlKTtcbiAgICB9XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgdGhpcy5kcmFnRnVuY3Rpb24gPSB0aGlzLmRyYWdNb3ZlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5kcmFnU3RvcEZ1bmN0aW9uID0gdGhpcy5kcmFnU3RvcC5iaW5kKHRoaXMpO1xuICAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICB0aGlzLm1vdXNlbW92ZSA9IHRoaXMuZ3JpZHN0ZXJJdGVtLnJlbmRlcmVyLmxpc3RlbignZG9jdW1lbnQnLCAnbW91c2Vtb3ZlJywgdGhpcy5kcmFnRnVuY3Rpb24pO1xuICAgICAgdGhpcy50b3VjaG1vdmUgPSB0aGlzLmdyaWRzdGVyLnJlbmRlcmVyLmxpc3Rlbih0aGlzLmdyaWRzdGVyLmVsLCAndG91Y2htb3ZlJywgdGhpcy5kcmFnRnVuY3Rpb24pO1xuICAgIH0pO1xuICAgIHRoaXMubW91c2V1cCA9IHRoaXMuZ3JpZHN0ZXJJdGVtLnJlbmRlcmVyLmxpc3RlbignZG9jdW1lbnQnLCAnbW91c2V1cCcsIHRoaXMuZHJhZ1N0b3BGdW5jdGlvbik7XG4gICAgdGhpcy5tb3VzZWxlYXZlID0gdGhpcy5ncmlkc3Rlckl0ZW0ucmVuZGVyZXIubGlzdGVuKCdkb2N1bWVudCcsICdtb3VzZWxlYXZlJywgdGhpcy5kcmFnU3RvcEZ1bmN0aW9uKTtcbiAgICB0aGlzLmNhbmNlbE9uQmx1ciA9IHRoaXMuZ3JpZHN0ZXJJdGVtLnJlbmRlcmVyLmxpc3Rlbignd2luZG93JywgJ2JsdXInLCB0aGlzLmRyYWdTdG9wRnVuY3Rpb24pO1xuICAgIHRoaXMudG91Y2hlbmQgPSB0aGlzLmdyaWRzdGVySXRlbS5yZW5kZXJlci5saXN0ZW4oJ2RvY3VtZW50JywgJ3RvdWNoZW5kJywgdGhpcy5kcmFnU3RvcEZ1bmN0aW9uKTtcbiAgICB0aGlzLnRvdWNoY2FuY2VsID0gdGhpcy5ncmlkc3Rlckl0ZW0ucmVuZGVyZXIubGlzdGVuKCdkb2N1bWVudCcsICd0b3VjaGNhbmNlbCcsIHRoaXMuZHJhZ1N0b3BGdW5jdGlvbik7XG5cbiAgICB0aGlzLmdyaWRzdGVySXRlbS5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmdyaWRzdGVySXRlbS5lbCwgJ2dyaWRzdGVyLWl0ZW0tcmVzaXppbmcnKTtcbiAgICB0aGlzLmxhc3RNb3VzZS5jbGllbnRYID0gZS5jbGllbnRYO1xuICAgIHRoaXMubGFzdE1vdXNlLmNsaWVudFkgPSBlLmNsaWVudFk7XG4gICAgdGhpcy5sZWZ0ID0gdGhpcy5ncmlkc3Rlckl0ZW0ubGVmdDtcbiAgICB0aGlzLnRvcCA9IHRoaXMuZ3JpZHN0ZXJJdGVtLnRvcDtcbiAgICB0aGlzLndpZHRoID0gdGhpcy5ncmlkc3Rlckl0ZW0ud2lkdGg7XG4gICAgdGhpcy5oZWlnaHQgPSB0aGlzLmdyaWRzdGVySXRlbS5oZWlnaHQ7XG4gICAgdGhpcy5ib3R0b20gPSB0aGlzLmdyaWRzdGVySXRlbS50b3AgKyB0aGlzLmdyaWRzdGVySXRlbS5oZWlnaHQ7XG4gICAgdGhpcy5yaWdodCA9IHRoaXMuZ3JpZHN0ZXJJdGVtLmxlZnQgKyB0aGlzLmdyaWRzdGVySXRlbS53aWR0aDtcbiAgICB0aGlzLm1hcmdpbiA9IHRoaXMuZ3JpZHN0ZXIuJG9wdGlvbnMubWFyZ2luO1xuICAgIHRoaXMub2Zmc2V0TGVmdCA9IHRoaXMuZ3JpZHN0ZXIuZWwuc2Nyb2xsTGVmdCAtIHRoaXMuZ3JpZHN0ZXIuZWwub2Zmc2V0TGVmdDtcbiAgICB0aGlzLm9mZnNldFRvcCA9IHRoaXMuZ3JpZHN0ZXIuZWwuc2Nyb2xsVG9wIC0gdGhpcy5ncmlkc3Rlci5lbC5vZmZzZXRUb3A7XG4gICAgdGhpcy5kaWZmTGVmdCA9IGUuY2xpZW50WCArIHRoaXMub2Zmc2V0TGVmdCAtIHRoaXMubGVmdDtcbiAgICB0aGlzLmRpZmZSaWdodCA9IGUuY2xpZW50WCArIHRoaXMub2Zmc2V0TGVmdCAtIHRoaXMucmlnaHQ7XG4gICAgdGhpcy5kaWZmVG9wID0gZS5jbGllbnRZICsgdGhpcy5vZmZzZXRUb3AgLSB0aGlzLnRvcDtcbiAgICB0aGlzLmRpZmZCb3R0b20gPSBlLmNsaWVudFkgKyB0aGlzLm9mZnNldFRvcCAtIHRoaXMuYm90dG9tO1xuICAgIHRoaXMubWluSGVpZ2h0ID0gdGhpcy5ncmlkc3Rlci5wb3NpdGlvbllUb1BpeGVscyh0aGlzLmdyaWRzdGVySXRlbS4kaXRlbS5taW5JdGVtUm93cyB8fCB0aGlzLmdyaWRzdGVyLiRvcHRpb25zLm1pbkl0ZW1Sb3dzKVxuICAgICAgLSB0aGlzLm1hcmdpbjtcbiAgICB0aGlzLm1pbldpZHRoID0gdGhpcy5ncmlkc3Rlci5wb3NpdGlvblhUb1BpeGVscyh0aGlzLmdyaWRzdGVySXRlbS4kaXRlbS5taW5JdGVtQ29scyB8fCB0aGlzLmdyaWRzdGVyLiRvcHRpb25zLm1pbkl0ZW1Db2xzKVxuICAgICAgLSB0aGlzLm1hcmdpbjtcbiAgICB0aGlzLm1heEhlaWdodCA9IHRoaXMuZ3JpZHN0ZXIucG9zaXRpb25ZVG9QaXhlbHModGhpcy5ncmlkc3Rlckl0ZW0uJGl0ZW0ubWF4SXRlbVJvd3MgfHwgdGhpcy5ncmlkc3Rlci4kb3B0aW9ucy5tYXhJdGVtUm93cylcbiAgICAgIC0gdGhpcy5tYXJnaW47XG4gICAgdGhpcy5tYXhXaWR0aCA9IHRoaXMuZ3JpZHN0ZXIucG9zaXRpb25YVG9QaXhlbHModGhpcy5ncmlkc3Rlckl0ZW0uJGl0ZW0ubWF4SXRlbUNvbHMgfHwgdGhpcy5ncmlkc3Rlci4kb3B0aW9ucy5tYXhJdGVtQ29scylcbiAgICAgIC0gdGhpcy5tYXJnaW47XG4gICAgdGhpcy5ncmlkc3Rlci5tb3ZpbmdJdGVtID0gdGhpcy5ncmlkc3Rlckl0ZW0uJGl0ZW07XG4gICAgdGhpcy5ncmlkc3Rlci5wcmV2aWV3U3R5bGUoKTtcbiAgICB0aGlzLnB1c2ggPSBuZXcgR3JpZHN0ZXJQdXNoKHRoaXMuZ3JpZHN0ZXJJdGVtKTtcbiAgICB0aGlzLnB1c2hSZXNpemUgPSBuZXcgR3JpZHN0ZXJQdXNoUmVzaXplKHRoaXMuZ3JpZHN0ZXJJdGVtKTtcbiAgICB0aGlzLmdyaWRzdGVyLmRyYWdJblByb2dyZXNzID0gdHJ1ZTtcbiAgICB0aGlzLmdyaWRzdGVyLnVwZGF0ZUdyaWQoKTtcblxuICAgIGlmIChlLnRhcmdldC5oYXNBdHRyaWJ1dGUoJ2NsYXNzJykgJiYgZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdjbGFzcycpLnNwbGl0KCcgJykuaW5kZXhPZignaGFuZGxlLW4nKSA+IC0xKSB7XG4gICAgICB0aGlzLnJlc2l6ZUV2ZW50U2Nyb2xsVHlwZS5uID0gdHJ1ZTtcbiAgICAgIHRoaXMuZGlyZWN0aW9uRnVuY3Rpb24gPSB0aGlzLmhhbmRsZU47XG4gICAgfSBlbHNlIGlmIChlLnRhcmdldC5oYXNBdHRyaWJ1dGUoJ2NsYXNzJykgJiYgZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdjbGFzcycpLnNwbGl0KCcgJykuaW5kZXhPZignaGFuZGxlLXcnKSA+IC0xKSB7XG4gICAgICB0aGlzLnJlc2l6ZUV2ZW50U2Nyb2xsVHlwZS53ID0gdHJ1ZTtcbiAgICAgIHRoaXMuZGlyZWN0aW9uRnVuY3Rpb24gPSB0aGlzLmhhbmRsZVc7XG4gICAgfSBlbHNlIGlmIChlLnRhcmdldC5oYXNBdHRyaWJ1dGUoJ2NsYXNzJykgJiYgZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdjbGFzcycpLnNwbGl0KCcgJykuaW5kZXhPZignaGFuZGxlLXMnKSA+IC0xKSB7XG4gICAgICB0aGlzLnJlc2l6ZUV2ZW50U2Nyb2xsVHlwZS5zID0gdHJ1ZTtcbiAgICAgIHRoaXMuZGlyZWN0aW9uRnVuY3Rpb24gPSB0aGlzLmhhbmRsZVM7XG4gICAgfSBlbHNlIGlmIChlLnRhcmdldC5oYXNBdHRyaWJ1dGUoJ2NsYXNzJykgJiYgZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdjbGFzcycpLnNwbGl0KCcgJykuaW5kZXhPZignaGFuZGxlLWUnKSA+IC0xKSB7XG4gICAgICB0aGlzLnJlc2l6ZUV2ZW50U2Nyb2xsVHlwZS5lID0gdHJ1ZTtcbiAgICAgIHRoaXMuZGlyZWN0aW9uRnVuY3Rpb24gPSB0aGlzLmhhbmRsZUU7XG4gICAgfSBlbHNlIGlmIChlLnRhcmdldC5oYXNBdHRyaWJ1dGUoJ2NsYXNzJykgJiYgZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdjbGFzcycpLnNwbGl0KCcgJykuaW5kZXhPZignaGFuZGxlLW53JykgPiAtMSkge1xuICAgICAgdGhpcy5yZXNpemVFdmVudFNjcm9sbFR5cGUubiA9IHRydWU7XG4gICAgICB0aGlzLnJlc2l6ZUV2ZW50U2Nyb2xsVHlwZS53ID0gdHJ1ZTtcbiAgICAgIHRoaXMuZGlyZWN0aW9uRnVuY3Rpb24gPSB0aGlzLmhhbmRsZU5XO1xuICAgIH0gZWxzZSBpZiAoZS50YXJnZXQuaGFzQXR0cmlidXRlKCdjbGFzcycpICYmIGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnY2xhc3MnKS5zcGxpdCgnICcpLmluZGV4T2YoJ2hhbmRsZS1uZScpID4gLTEpIHtcbiAgICAgIHRoaXMucmVzaXplRXZlbnRTY3JvbGxUeXBlLm4gPSB0cnVlO1xuICAgICAgdGhpcy5yZXNpemVFdmVudFNjcm9sbFR5cGUuZSA9IHRydWU7XG4gICAgICB0aGlzLmRpcmVjdGlvbkZ1bmN0aW9uID0gdGhpcy5oYW5kbGVORTtcbiAgICB9IGVsc2UgaWYgKGUudGFyZ2V0Lmhhc0F0dHJpYnV0ZSgnY2xhc3MnKSAmJiBlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2NsYXNzJykuc3BsaXQoJyAnKS5pbmRleE9mKCdoYW5kbGUtc3cnKSA+IC0xKSB7XG4gICAgICB0aGlzLnJlc2l6ZUV2ZW50U2Nyb2xsVHlwZS5zID0gdHJ1ZTtcbiAgICAgIHRoaXMucmVzaXplRXZlbnRTY3JvbGxUeXBlLncgPSB0cnVlO1xuICAgICAgdGhpcy5kaXJlY3Rpb25GdW5jdGlvbiA9IHRoaXMuaGFuZGxlU1c7XG4gICAgfSBlbHNlIGlmIChlLnRhcmdldC5oYXNBdHRyaWJ1dGUoJ2NsYXNzJykgJiYgZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdjbGFzcycpLnNwbGl0KCcgJykuaW5kZXhPZignaGFuZGxlLXNlJykgPiAtMSkge1xuICAgICAgdGhpcy5yZXNpemVFdmVudFNjcm9sbFR5cGUucyA9IHRydWU7XG4gICAgICB0aGlzLnJlc2l6ZUV2ZW50U2Nyb2xsVHlwZS5lID0gdHJ1ZTtcbiAgICAgIHRoaXMuZGlyZWN0aW9uRnVuY3Rpb24gPSB0aGlzLmhhbmRsZVNFO1xuICAgIH1cbiAgfVxuXG4gIGRyYWdNb3ZlKGU6IGFueSk6IHZvaWQge1xuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIEdyaWRzdGVyVXRpbHMuY2hlY2tUb3VjaEV2ZW50KGUpO1xuICAgIHRoaXMub2Zmc2V0VG9wID0gdGhpcy5ncmlkc3Rlci5lbC5zY3JvbGxUb3AgLSB0aGlzLmdyaWRzdGVyLmVsLm9mZnNldFRvcDtcbiAgICB0aGlzLm9mZnNldExlZnQgPSB0aGlzLmdyaWRzdGVyLmVsLnNjcm9sbExlZnQgLSB0aGlzLmdyaWRzdGVyLmVsLm9mZnNldExlZnQ7XG4gICAgc2Nyb2xsKHRoaXMuZ3JpZHN0ZXIsIHRoaXMubGVmdCwgdGhpcy50b3AsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0LCBlLCB0aGlzLmxhc3RNb3VzZSwgdGhpcy5kaXJlY3Rpb25GdW5jdGlvbi5iaW5kKHRoaXMpLCB0cnVlLFxuICAgICAgdGhpcy5yZXNpemVFdmVudFNjcm9sbFR5cGUpO1xuICAgIHRoaXMuZGlyZWN0aW9uRnVuY3Rpb24oZSk7XG5cbiAgICB0aGlzLmxhc3RNb3VzZS5jbGllbnRYID0gZS5jbGllbnRYO1xuICAgIHRoaXMubGFzdE1vdXNlLmNsaWVudFkgPSBlLmNsaWVudFk7XG4gICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XG4gICAgICB0aGlzLmdyaWRzdGVyLnVwZGF0ZUdyaWQoKTtcbiAgICB9KTtcbiAgfVxuXG4gIGRyYWdTdG9wKGU6IGFueSk6IHZvaWQge1xuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNhbmNlbFNjcm9sbCgpO1xuICAgIHRoaXMubW91c2Vtb3ZlKCk7XG4gICAgdGhpcy5tb3VzZXVwKCk7XG4gICAgdGhpcy5tb3VzZWxlYXZlKCk7XG4gICAgdGhpcy5jYW5jZWxPbkJsdXIoKTtcbiAgICB0aGlzLnRvdWNobW92ZSgpO1xuICAgIHRoaXMudG91Y2hlbmQoKTtcbiAgICB0aGlzLnRvdWNoY2FuY2VsKCk7XG4gICAgdGhpcy5ncmlkc3Rlci5kcmFnSW5Qcm9ncmVzcyA9IGZhbHNlO1xuICAgIHRoaXMuZ3JpZHN0ZXIudXBkYXRlR3JpZCgpO1xuICAgIGlmICh0aGlzLmdyaWRzdGVyLm9wdGlvbnMucmVzaXphYmxlICYmIHRoaXMuZ3JpZHN0ZXIub3B0aW9ucy5yZXNpemFibGUuc3RvcCkge1xuICAgICAgUHJvbWlzZS5yZXNvbHZlKHRoaXMuZ3JpZHN0ZXIub3B0aW9ucy5yZXNpemFibGUuc3RvcCh0aGlzLmdyaWRzdGVySXRlbS5pdGVtLCB0aGlzLmdyaWRzdGVySXRlbSwgZSkpXG4gICAgICAgIC50aGVuKHRoaXMubWFrZVJlc2l6ZS5iaW5kKHRoaXMpLCB0aGlzLmNhbmNlbFJlc2l6ZS5iaW5kKHRoaXMpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5tYWtlUmVzaXplKCk7XG4gICAgfVxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5ncmlkc3Rlckl0ZW0ucmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5ncmlkc3Rlckl0ZW0uZWwsICdncmlkc3Rlci1pdGVtLXJlc2l6aW5nJyk7XG4gICAgICBpZiAodGhpcy5ncmlkc3Rlcikge1xuICAgICAgICB0aGlzLmdyaWRzdGVyLm1vdmluZ0l0ZW0gPSBudWxsO1xuICAgICAgICB0aGlzLmdyaWRzdGVyLnByZXZpZXdTdHlsZSgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgY2FuY2VsUmVzaXplKCk6IHZvaWQge1xuICAgIHRoaXMuZ3JpZHN0ZXJJdGVtLiRpdGVtLmNvbHMgPSB0aGlzLmdyaWRzdGVySXRlbS5pdGVtLmNvbHMgfHwgMTtcbiAgICB0aGlzLmdyaWRzdGVySXRlbS4kaXRlbS5yb3dzID0gdGhpcy5ncmlkc3Rlckl0ZW0uaXRlbS5yb3dzIHx8IDE7XG4gICAgdGhpcy5ncmlkc3Rlckl0ZW0uJGl0ZW0ueCA9IHRoaXMuZ3JpZHN0ZXJJdGVtLml0ZW0ueCB8fCAwO1xuICAgIHRoaXMuZ3JpZHN0ZXJJdGVtLiRpdGVtLnkgPSB0aGlzLmdyaWRzdGVySXRlbS5pdGVtLnkgfHwgMDtcbiAgICB0aGlzLmdyaWRzdGVySXRlbS5zZXRTaXplKCk7XG4gICAgdGhpcy5wdXNoLnJlc3RvcmVJdGVtcygpO1xuICAgIHRoaXMucHVzaFJlc2l6ZS5yZXN0b3JlSXRlbXMoKTtcbiAgICB0aGlzLnB1c2guZGVzdHJveSgpO1xuICAgIGRlbGV0ZSB0aGlzLnB1c2g7XG4gICAgdGhpcy5wdXNoUmVzaXplLmRlc3Ryb3koKTtcbiAgICBkZWxldGUgdGhpcy5wdXNoUmVzaXplO1xuICB9XG5cbiAgbWFrZVJlc2l6ZSgpOiB2b2lkIHtcbiAgICB0aGlzLmdyaWRzdGVySXRlbS5zZXRTaXplKCk7XG4gICAgdGhpcy5ncmlkc3Rlckl0ZW0uY2hlY2tJdGVtQ2hhbmdlcyh0aGlzLmdyaWRzdGVySXRlbS4kaXRlbSwgdGhpcy5ncmlkc3Rlckl0ZW0uaXRlbSk7XG4gICAgdGhpcy5wdXNoLnNldFB1c2hlZEl0ZW1zKCk7XG4gICAgdGhpcy5wdXNoUmVzaXplLnNldFB1c2hlZEl0ZW1zKCk7XG4gICAgdGhpcy5wdXNoLmRlc3Ryb3koKTtcbiAgICBkZWxldGUgdGhpcy5wdXNoO1xuICAgIHRoaXMucHVzaFJlc2l6ZS5kZXN0cm95KCk7XG4gICAgZGVsZXRlIHRoaXMucHVzaFJlc2l6ZTtcbiAgfVxuXG4gIGhhbmRsZU4oZTogYW55KTogdm9pZCB7XG4gICAgdGhpcy50b3AgPSBlLmNsaWVudFkgKyB0aGlzLm9mZnNldFRvcCAtIHRoaXMuZGlmZlRvcDtcbiAgICB0aGlzLmhlaWdodCA9IHRoaXMuYm90dG9tIC0gdGhpcy50b3A7XG4gICAgaWYgKHRoaXMubWluSGVpZ2h0ID4gdGhpcy5oZWlnaHQpIHtcbiAgICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy5taW5IZWlnaHQ7XG4gICAgICB0aGlzLnRvcCA9IHRoaXMuYm90dG9tIC0gdGhpcy5taW5IZWlnaHQ7XG4gICAgfVxuXHRpZiAodGhpcy5tYXhIZWlnaHQgPCB0aGlzLmhlaWdodCkge1xuICAgICAgdGhpcy5oZWlnaHQgPSB0aGlzLm1heEhlaWdodDtcbiAgICAgIHRoaXMudG9wID0gdGhpcy5ib3R0b20gLSB0aGlzLm1heEhlaWdodDtcbiAgICB9XG4gICAgdGhpcy5uZXdQb3NpdGlvbiA9IHRoaXMuZ3JpZHN0ZXIucGl4ZWxzVG9Qb3NpdGlvblkodGhpcy50b3AgKyB0aGlzLm1hcmdpbiwgTWF0aC5mbG9vcik7XG4gICAgaWYgKHRoaXMuZ3JpZHN0ZXJJdGVtLiRpdGVtLnkgIT09IHRoaXMubmV3UG9zaXRpb24pIHtcbiAgICAgIHRoaXMuaXRlbUJhY2t1cFsxXSA9IHRoaXMuZ3JpZHN0ZXJJdGVtLiRpdGVtLnk7XG4gICAgICB0aGlzLml0ZW1CYWNrdXBbM10gPSB0aGlzLmdyaWRzdGVySXRlbS4kaXRlbS5yb3dzO1xuICAgICAgdGhpcy5ncmlkc3Rlckl0ZW0uJGl0ZW0ucm93cyArPSB0aGlzLmdyaWRzdGVySXRlbS4kaXRlbS55IC0gdGhpcy5uZXdQb3NpdGlvbjtcbiAgICAgIHRoaXMuZ3JpZHN0ZXJJdGVtLiRpdGVtLnkgPSB0aGlzLm5ld1Bvc2l0aW9uO1xuICAgICAgdGhpcy5wdXNoUmVzaXplLnB1c2hJdGVtcyh0aGlzLnB1c2hSZXNpemUuZnJvbVNvdXRoKTtcbiAgICAgIHRoaXMucHVzaC5wdXNoSXRlbXModGhpcy5wdXNoLmZyb21Tb3V0aCwgdGhpcy5ncmlkc3Rlci4kb3B0aW9ucy5kaXNhYmxlUHVzaE9uUmVzaXplKTtcbiAgICAgIGlmICh0aGlzLmdyaWRzdGVyLmNoZWNrQ29sbGlzaW9uKHRoaXMuZ3JpZHN0ZXJJdGVtLiRpdGVtKSkge1xuICAgICAgICB0aGlzLmdyaWRzdGVySXRlbS4kaXRlbS55ID0gdGhpcy5pdGVtQmFja3VwWzFdO1xuICAgICAgICB0aGlzLmdyaWRzdGVySXRlbS4kaXRlbS5yb3dzID0gdGhpcy5pdGVtQmFja3VwWzNdO1xuICAgICAgICB0aGlzLnNldEl0ZW1Ub3AodGhpcy5ncmlkc3Rlci5wb3NpdGlvbllUb1BpeGVscyh0aGlzLmdyaWRzdGVySXRlbS4kaXRlbS55KSk7XG4gICAgICAgIHRoaXMuc2V0SXRlbUhlaWdodCh0aGlzLmdyaWRzdGVyLnBvc2l0aW9uWVRvUGl4ZWxzKHRoaXMuZ3JpZHN0ZXJJdGVtLiRpdGVtLnJvd3MpIC0gdGhpcy5tYXJnaW4pO1xuICAgICAgICByZXR1cm47XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmdyaWRzdGVyLnByZXZpZXdTdHlsZSgpO1xuICAgICAgfVxuICAgICAgdGhpcy5wdXNoUmVzaXplLmNoZWNrUHVzaEJhY2soKTtcbiAgICAgIHRoaXMucHVzaC5jaGVja1B1c2hCYWNrKCk7XG4gICAgfVxuICAgIHRoaXMuc2V0SXRlbVRvcCh0aGlzLnRvcCk7XG4gICAgdGhpcy5zZXRJdGVtSGVpZ2h0KHRoaXMuaGVpZ2h0KTtcbiAgfVxuXG4gIGhhbmRsZVcoZTogYW55KTogdm9pZCB7XG4gICAgdGhpcy5sZWZ0ID0gZS5jbGllbnRYICsgdGhpcy5vZmZzZXRMZWZ0IC0gdGhpcy5kaWZmTGVmdDtcbiAgICB0aGlzLndpZHRoID0gdGhpcy5yaWdodCAtIHRoaXMubGVmdDtcbiAgICBpZiAodGhpcy5taW5XaWR0aCA+IHRoaXMud2lkdGgpIHtcbiAgICAgIHRoaXMud2lkdGggPSB0aGlzLm1pbldpZHRoO1xuICAgICAgdGhpcy5sZWZ0ID0gdGhpcy5yaWdodCAtIHRoaXMubWluV2lkdGg7XG4gICAgfVxuXHRpZiAodGhpcy5tYXhXaWR0aCA8IHRoaXMud2lkdGgpIHtcbiAgICAgIHRoaXMud2lkdGggPSB0aGlzLm1heFdpZHRoO1xuICAgICAgdGhpcy5sZWZ0ID0gdGhpcy5yaWdodCAtIHRoaXMubWF4V2lkdGg7XG4gICAgfVxuICAgIHRoaXMubmV3UG9zaXRpb24gPSB0aGlzLmdyaWRzdGVyLnBpeGVsc1RvUG9zaXRpb25YKHRoaXMubGVmdCArIHRoaXMubWFyZ2luLCBNYXRoLmZsb29yKTtcbiAgICBpZiAodGhpcy5ncmlkc3Rlckl0ZW0uJGl0ZW0ueCAhPT0gdGhpcy5uZXdQb3NpdGlvbikge1xuICAgICAgdGhpcy5pdGVtQmFja3VwWzBdID0gdGhpcy5ncmlkc3Rlckl0ZW0uJGl0ZW0ueDtcbiAgICAgIHRoaXMuaXRlbUJhY2t1cFsyXSA9IHRoaXMuZ3JpZHN0ZXJJdGVtLiRpdGVtLmNvbHM7XG4gICAgICB0aGlzLmdyaWRzdGVySXRlbS4kaXRlbS5jb2xzICs9IHRoaXMuZ3JpZHN0ZXJJdGVtLiRpdGVtLnggLSB0aGlzLm5ld1Bvc2l0aW9uO1xuICAgICAgdGhpcy5ncmlkc3Rlckl0ZW0uJGl0ZW0ueCA9IHRoaXMubmV3UG9zaXRpb247XG4gICAgICB0aGlzLnB1c2hSZXNpemUucHVzaEl0ZW1zKHRoaXMucHVzaFJlc2l6ZS5mcm9tRWFzdCk7XG4gICAgICB0aGlzLnB1c2gucHVzaEl0ZW1zKHRoaXMucHVzaC5mcm9tRWFzdCwgdGhpcy5ncmlkc3Rlci4kb3B0aW9ucy5kaXNhYmxlUHVzaE9uUmVzaXplKTtcbiAgICAgIGlmICh0aGlzLmdyaWRzdGVyLmNoZWNrQ29sbGlzaW9uKHRoaXMuZ3JpZHN0ZXJJdGVtLiRpdGVtKSkge1xuICAgICAgICB0aGlzLmdyaWRzdGVySXRlbS4kaXRlbS54ID0gdGhpcy5pdGVtQmFja3VwWzBdO1xuICAgICAgICB0aGlzLmdyaWRzdGVySXRlbS4kaXRlbS5jb2xzID0gdGhpcy5pdGVtQmFja3VwWzJdO1xuICAgICAgICB0aGlzLnNldEl0ZW1MZWZ0KHRoaXMuZ3JpZHN0ZXIucG9zaXRpb25YVG9QaXhlbHModGhpcy5ncmlkc3Rlckl0ZW0uJGl0ZW0ueCkpO1xuICAgICAgICB0aGlzLnNldEl0ZW1XaWR0aCh0aGlzLmdyaWRzdGVyLnBvc2l0aW9uWFRvUGl4ZWxzKHRoaXMuZ3JpZHN0ZXJJdGVtLiRpdGVtLmNvbHMpIC0gdGhpcy5tYXJnaW4pO1xuICAgICAgICByZXR1cm47XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmdyaWRzdGVyLnByZXZpZXdTdHlsZSgpO1xuICAgICAgfVxuICAgICAgdGhpcy5wdXNoUmVzaXplLmNoZWNrUHVzaEJhY2soKTtcbiAgICAgIHRoaXMucHVzaC5jaGVja1B1c2hCYWNrKCk7XG4gICAgfVxuICAgIHRoaXMuc2V0SXRlbUxlZnQodGhpcy5sZWZ0KTtcbiAgICB0aGlzLnNldEl0ZW1XaWR0aCh0aGlzLndpZHRoKTtcbiAgfVxuXG4gIGhhbmRsZVMoZTogYW55KTogdm9pZCB7XG4gICAgdGhpcy5oZWlnaHQgPSBlLmNsaWVudFkgKyB0aGlzLm9mZnNldFRvcCAtIHRoaXMuZGlmZkJvdHRvbSAtIHRoaXMudG9wO1xuICAgIGlmICh0aGlzLm1pbkhlaWdodCA+IHRoaXMuaGVpZ2h0KSB7XG4gICAgICB0aGlzLmhlaWdodCA9IHRoaXMubWluSGVpZ2h0O1xuICAgIH1cbiAgICBpZiAodGhpcy5tYXhIZWlnaHQgPCB0aGlzLmhlaWdodCkge1xuICAgICAgdGhpcy5oZWlnaHQgPSB0aGlzLm1heEhlaWdodDtcbiAgICB9XG4gICAgdGhpcy5ib3R0b20gPSB0aGlzLnRvcCArIHRoaXMuaGVpZ2h0O1xuICAgIHRoaXMubmV3UG9zaXRpb24gPSB0aGlzLmdyaWRzdGVyLnBpeGVsc1RvUG9zaXRpb25ZKHRoaXMuYm90dG9tLCBNYXRoLmNlaWwpO1xuICAgIGlmICgodGhpcy5ncmlkc3Rlckl0ZW0uJGl0ZW0ueSArIHRoaXMuZ3JpZHN0ZXJJdGVtLiRpdGVtLnJvd3MpICE9PSB0aGlzLm5ld1Bvc2l0aW9uKSB7XG4gICAgICB0aGlzLml0ZW1CYWNrdXBbM10gPSB0aGlzLmdyaWRzdGVySXRlbS4kaXRlbS5yb3dzO1xuICAgICAgdGhpcy5ncmlkc3Rlckl0ZW0uJGl0ZW0ucm93cyA9IHRoaXMubmV3UG9zaXRpb24gLSB0aGlzLmdyaWRzdGVySXRlbS4kaXRlbS55O1xuICAgICAgdGhpcy5wdXNoUmVzaXplLnB1c2hJdGVtcyh0aGlzLnB1c2hSZXNpemUuZnJvbU5vcnRoKTtcbiAgICAgIHRoaXMucHVzaC5wdXNoSXRlbXModGhpcy5wdXNoLmZyb21Ob3J0aCwgdGhpcy5ncmlkc3Rlci4kb3B0aW9ucy5kaXNhYmxlUHVzaE9uUmVzaXplKTtcbiAgICAgIGlmICh0aGlzLmdyaWRzdGVyLmNoZWNrQ29sbGlzaW9uKHRoaXMuZ3JpZHN0ZXJJdGVtLiRpdGVtKSkge1xuICAgICAgICB0aGlzLmdyaWRzdGVySXRlbS4kaXRlbS5yb3dzID0gdGhpcy5pdGVtQmFja3VwWzNdO1xuICAgICAgICB0aGlzLnNldEl0ZW1IZWlnaHQodGhpcy5ncmlkc3Rlci5wb3NpdGlvbllUb1BpeGVscyh0aGlzLmdyaWRzdGVySXRlbS4kaXRlbS5yb3dzKSAtIHRoaXMubWFyZ2luKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5ncmlkc3Rlci5wcmV2aWV3U3R5bGUoKTtcbiAgICAgIH1cbiAgICAgIHRoaXMucHVzaFJlc2l6ZS5jaGVja1B1c2hCYWNrKCk7XG4gICAgICB0aGlzLnB1c2guY2hlY2tQdXNoQmFjaygpO1xuICAgIH1cbiAgICB0aGlzLnNldEl0ZW1IZWlnaHQodGhpcy5oZWlnaHQpO1xuICB9XG5cbiAgaGFuZGxlRShlOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLndpZHRoID0gZS5jbGllbnRYICsgdGhpcy5vZmZzZXRMZWZ0IC0gdGhpcy5kaWZmUmlnaHQgLSB0aGlzLmxlZnQ7XG4gICAgaWYgKHRoaXMubWluV2lkdGggPiB0aGlzLndpZHRoKSB7XG4gICAgICB0aGlzLndpZHRoID0gdGhpcy5taW5XaWR0aDtcbiAgICB9XG5cdGlmICh0aGlzLm1heFdpZHRoIDwgdGhpcy53aWR0aCkge1xuICAgICAgdGhpcy53aWR0aCA9IHRoaXMubWF4V2lkdGg7XG4gICAgfVxuICAgIHRoaXMucmlnaHQgPSB0aGlzLmxlZnQgKyB0aGlzLndpZHRoO1xuICAgIHRoaXMubmV3UG9zaXRpb24gPSB0aGlzLmdyaWRzdGVyLnBpeGVsc1RvUG9zaXRpb25YKHRoaXMucmlnaHQsIE1hdGguY2VpbCk7XG4gICAgaWYgKCh0aGlzLmdyaWRzdGVySXRlbS4kaXRlbS54ICsgdGhpcy5ncmlkc3Rlckl0ZW0uJGl0ZW0uY29scykgIT09IHRoaXMubmV3UG9zaXRpb24pIHtcbiAgICAgIHRoaXMuaXRlbUJhY2t1cFsyXSA9IHRoaXMuZ3JpZHN0ZXJJdGVtLiRpdGVtLmNvbHM7XG4gICAgICB0aGlzLmdyaWRzdGVySXRlbS4kaXRlbS5jb2xzID0gdGhpcy5uZXdQb3NpdGlvbiAtIHRoaXMuZ3JpZHN0ZXJJdGVtLiRpdGVtLng7XG4gICAgICB0aGlzLnB1c2hSZXNpemUucHVzaEl0ZW1zKHRoaXMucHVzaFJlc2l6ZS5mcm9tV2VzdCk7XG4gICAgICB0aGlzLnB1c2gucHVzaEl0ZW1zKHRoaXMucHVzaC5mcm9tV2VzdCwgdGhpcy5ncmlkc3Rlci4kb3B0aW9ucy5kaXNhYmxlUHVzaE9uUmVzaXplKTtcbiAgICAgIGlmICh0aGlzLmdyaWRzdGVyLmNoZWNrQ29sbGlzaW9uKHRoaXMuZ3JpZHN0ZXJJdGVtLiRpdGVtKSkge1xuICAgICAgICB0aGlzLmdyaWRzdGVySXRlbS4kaXRlbS5jb2xzID0gdGhpcy5pdGVtQmFja3VwWzJdO1xuICAgICAgICB0aGlzLnNldEl0ZW1XaWR0aCh0aGlzLmdyaWRzdGVyLnBvc2l0aW9uWFRvUGl4ZWxzKHRoaXMuZ3JpZHN0ZXJJdGVtLiRpdGVtLmNvbHMpIC0gdGhpcy5tYXJnaW4pO1xuICAgICAgICByZXR1cm47XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmdyaWRzdGVyLnByZXZpZXdTdHlsZSgpO1xuICAgICAgfVxuICAgICAgdGhpcy5wdXNoUmVzaXplLmNoZWNrUHVzaEJhY2soKTtcbiAgICAgIHRoaXMucHVzaC5jaGVja1B1c2hCYWNrKCk7XG4gICAgfVxuICAgIHRoaXMuc2V0SXRlbVdpZHRoKHRoaXMud2lkdGgpO1xuICB9XG5cbiAgaGFuZGxlTlcoZTogYW55KTogdm9pZCB7XG4gICAgdGhpcy5oYW5kbGVOKGUpO1xuICAgIHRoaXMuaGFuZGxlVyhlKTtcbiAgfVxuXG4gIGhhbmRsZU5FKGU6IGFueSk6IHZvaWQge1xuICAgIHRoaXMuaGFuZGxlTihlKTtcbiAgICB0aGlzLmhhbmRsZUUoZSk7XG4gIH1cblxuICBoYW5kbGVTVyhlOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLmhhbmRsZVMoZSk7XG4gICAgdGhpcy5oYW5kbGVXKGUpO1xuICB9XG5cbiAgaGFuZGxlU0UoZTogYW55KTogdm9pZCB7XG4gICAgdGhpcy5oYW5kbGVTKGUpO1xuICAgIHRoaXMuaGFuZGxlRShlKTtcbiAgfVxuXG4gIHRvZ2dsZSgpOiB2b2lkIHtcbiAgICB0aGlzLnJlc2l6ZUVuYWJsZWQgPSB0aGlzLmdyaWRzdGVySXRlbS5jYW5CZVJlc2l6ZWQoKTtcbiAgfVxuXG4gIGRyYWdTdGFydERlbGF5KGU6IGFueSk6IHZvaWQge1xuICAgIEdyaWRzdGVyVXRpbHMuY2hlY2tUb3VjaEV2ZW50KGUpO1xuICAgIGlmICghdGhpcy5ncmlkc3Rlci4kb3B0aW9ucy5yZXNpemFibGUuZGVsYXlTdGFydCkge1xuICAgICAgdGhpcy5kcmFnU3RhcnQoZSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuZHJhZ1N0YXJ0KGUpO1xuICAgICAgY2FuY2VsRHJhZygpO1xuICAgIH0sIHRoaXMuZ3JpZHN0ZXIuJG9wdGlvbnMucmVzaXphYmxlLmRlbGF5U3RhcnQpO1xuICAgIGNvbnN0IGNhbmNlbE1vdXNlID0gdGhpcy5ncmlkc3Rlckl0ZW0ucmVuZGVyZXIubGlzdGVuKCdkb2N1bWVudCcsICdtb3VzZXVwJywgY2FuY2VsRHJhZyk7XG4gICAgY29uc3QgY2FuY2VsTW91c2VMZWF2ZSA9IHRoaXMuZ3JpZHN0ZXJJdGVtLnJlbmRlcmVyLmxpc3RlbignZG9jdW1lbnQnLCAnbW91c2VsZWF2ZScsIGNhbmNlbERyYWcpO1xuICAgIGNvbnN0IGNhbmNlbE9uQmx1ciA9IHRoaXMuZ3JpZHN0ZXJJdGVtLnJlbmRlcmVyLmxpc3Rlbignd2luZG93JywgJ2JsdXInLCBjYW5jZWxEcmFnKTtcbiAgICBjb25zdCBjYW5jZWxUb3VjaE1vdmUgPSB0aGlzLmdyaWRzdGVySXRlbS5yZW5kZXJlci5saXN0ZW4oJ2RvY3VtZW50JywgJ3RvdWNobW92ZScsIGNhbmNlbE1vdmUpO1xuICAgIGNvbnN0IGNhbmNlbFRvdWNoRW5kID0gdGhpcy5ncmlkc3Rlckl0ZW0ucmVuZGVyZXIubGlzdGVuKCdkb2N1bWVudCcsICd0b3VjaGVuZCcsIGNhbmNlbERyYWcpO1xuICAgIGNvbnN0IGNhbmNlbFRvdWNoQ2FuY2VsID0gdGhpcy5ncmlkc3Rlckl0ZW0ucmVuZGVyZXIubGlzdGVuKCdkb2N1bWVudCcsICd0b3VjaGNhbmNlbCcsIGNhbmNlbERyYWcpO1xuXG4gICAgZnVuY3Rpb24gY2FuY2VsTW92ZShldmVudE1vdmU6IGFueSkge1xuICAgICAgR3JpZHN0ZXJVdGlscy5jaGVja1RvdWNoRXZlbnQoZXZlbnRNb3ZlKTtcbiAgICAgIGlmIChNYXRoLmFicyhldmVudE1vdmUuY2xpZW50WCAtIGUuY2xpZW50WCkgPiA5IHx8IE1hdGguYWJzKGV2ZW50TW92ZS5jbGllbnRZIC0gZS5jbGllbnRZKSA+IDkpIHtcbiAgICAgICAgY2FuY2VsRHJhZygpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNhbmNlbERyYWcoKSB7XG4gICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gICAgICBjYW5jZWxPbkJsdXIoKTtcbiAgICAgIGNhbmNlbE1vdXNlKCk7XG4gICAgICBjYW5jZWxNb3VzZUxlYXZlKCk7XG4gICAgICBjYW5jZWxUb3VjaE1vdmUoKTtcbiAgICAgIGNhbmNlbFRvdWNoRW5kKCk7XG4gICAgICBjYW5jZWxUb3VjaENhbmNlbCgpO1xuICAgIH1cbiAgfVxuXG4gIHNldEl0ZW1Ub3AodG9wOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLmdyaWRzdGVyLmdyaWRSZW5kZXJlci5zZXRDZWxsUG9zaXRpb24odGhpcy5ncmlkc3Rlckl0ZW0ucmVuZGVyZXIsIHRoaXMuZ3JpZHN0ZXJJdGVtLmVsLCB0aGlzLmxlZnQsIHRvcCk7XG4gIH1cblxuICBzZXRJdGVtTGVmdChsZWZ0OiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLmdyaWRzdGVyLmdyaWRSZW5kZXJlci5zZXRDZWxsUG9zaXRpb24odGhpcy5ncmlkc3Rlckl0ZW0ucmVuZGVyZXIsIHRoaXMuZ3JpZHN0ZXJJdGVtLmVsLCBsZWZ0LCB0aGlzLnRvcCk7XG4gIH1cblxuICBzZXRJdGVtSGVpZ2h0KGhlaWdodDogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5ncmlkc3Rlckl0ZW0ucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5ncmlkc3Rlckl0ZW0uZWwsICdoZWlnaHQnLCBoZWlnaHQgKyAncHgnKTtcbiAgfVxuXG4gIHNldEl0ZW1XaWR0aCh3aWR0aDogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5ncmlkc3Rlckl0ZW0ucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5ncmlkc3Rlckl0ZW0uZWwsICd3aWR0aCcsIHdpZHRoICsgJ3B4Jyk7XG4gIH1cbn1cbiJdfQ==
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ChangeDetectorRef, Component, ElementRef, Input, NgZone, Renderer2, ViewEncapsulation } from '@angular/core';
import { GridsterConfigService } from './gridsterConfig.constant';
import { GridsterUtils } from './gridsterUtils.service';
import { GridsterEmptyCell } from './gridsterEmptyCell.service';
import { GridsterCompact } from './gridsterCompact.service';
import { GridsterRenderer } from './gridsterRenderer.service';
var GridsterComponent = /** @class */ (function () {
    function GridsterComponent(el, renderer, cdRef, zone) {
        this.renderer = renderer;
        this.cdRef = cdRef;
        this.zone = zone;
        this.gridColumns = [];
        this.gridRows = [];
        this.el = el.nativeElement;
        this.$options = JSON.parse(JSON.stringify(GridsterConfigService));
        this.calculateLayoutDebounce = GridsterUtils.debounce(this.calculateLayout.bind(this), 0);
        this.mobile = false;
        this.curWidth = 0;
        this.curHeight = 0;
        this.grid = [];
        this.curColWidth = 0;
        this.curRowHeight = 0;
        this.dragInProgress = false;
        this.emptyCell = new GridsterEmptyCell(this);
        this.compact = new GridsterCompact(this);
        this.gridRenderer = new GridsterRenderer(this);
    }
    /**
     * @param {?} item
     * @param {?} item2
     * @return {?}
     */
    GridsterComponent.checkCollisionTwoItems = /**
     * @param {?} item
     * @param {?} item2
     * @return {?}
     */
    function (item, item2) {
        return item.x < item2.x + item2.cols
            && item.x + item.cols > item2.x
            && item.y < item2.y + item2.rows
            && item.y + item.rows > item2.y;
    };
    /**
     * @return {?}
     */
    GridsterComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        if (this.options.initCallback) {
            this.options.initCallback(this);
        }
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    GridsterComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes.options) {
            this.setOptions();
            this.options.api = {
                optionsChanged: this.optionsChanged.bind(this),
                resize: this.onResize.bind(this),
                getNextPossiblePosition: this.getNextPossiblePosition.bind(this),
                getFirstPossiblePosition: this.getFirstPossiblePosition.bind(this),
                getLastPossiblePosition: this.getLastPossiblePosition.bind(this),
            };
            this.columns = this.$options.minCols;
            this.rows = this.$options.minRows;
            this.setGridSize();
            this.calculateLayout();
        }
    };
    /**
     * @return {?}
     */
    GridsterComponent.prototype.resize = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var height;
        /** @type {?} */
        var width;
        if (this.$options.gridType === 'fit' && !this.mobile) {
            width = this.el.offsetWidth;
            height = this.el.offsetHeight;
        }
        else {
            width = this.el.clientWidth;
            height = this.el.clientHeight;
        }
        if ((width !== this.curWidth || height !== this.curHeight) && this.checkIfToResize()) {
            this.onResize();
        }
    };
    /**
     * @return {?}
     */
    GridsterComponent.prototype.setOptions = /**
     * @return {?}
     */
    function () {
        this.$options = GridsterUtils.merge(this.$options, this.options, this.$options);
        if (!this.$options.disableWindowResize && !this.windowResize) {
            this.windowResize = this.renderer.listen('window', 'resize', this.onResize.bind(this));
        }
        else if (this.$options.disableWindowResize && this.windowResize) {
            this.windowResize();
            this.windowResize = null;
        }
        this.emptyCell.updateOptions();
    };
    /**
     * @return {?}
     */
    GridsterComponent.prototype.optionsChanged = /**
     * @return {?}
     */
    function () {
        this.setOptions();
        /** @type {?} */
        var widgetsIndex = this.grid.length - 1;
        /** @type {?} */
        var widget;
        for (; widgetsIndex >= 0; widgetsIndex--) {
            widget = this.grid[widgetsIndex];
            widget.updateOptions();
        }
        this.calculateLayout();
    };
    /**
     * @return {?}
     */
    GridsterComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this.windowResize) {
            this.windowResize();
        }
        if (this.options.destroyCallback) {
            this.options.destroyCallback(this);
        }
        if (this.options.api) {
            this.options.api.resize = undefined;
            this.options.api.optionsChanged = undefined;
            this.options.api.getNextPossiblePosition = undefined;
            this.options.api = undefined;
        }
        this.emptyCell.destroy();
        delete this.emptyCell;
        this.compact.destroy();
        delete this.compact;
    };
    /**
     * @return {?}
     */
    GridsterComponent.prototype.onResize = /**
     * @return {?}
     */
    function () {
        this.setGridSize();
        this.calculateLayout();
    };
    /**
     * @return {?}
     */
    GridsterComponent.prototype.checkIfToResize = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var clientWidth = this.el.clientWidth;
        /** @type {?} */
        var offsetWidth = this.el.offsetWidth;
        /** @type {?} */
        var scrollWidth = this.el.scrollWidth;
        /** @type {?} */
        var clientHeight = this.el.clientHeight;
        /** @type {?} */
        var offsetHeight = this.el.offsetHeight;
        /** @type {?} */
        var scrollHeight = this.el.scrollHeight;
        /** @type {?} */
        var verticalScrollPresent = clientWidth < offsetWidth && scrollHeight > offsetHeight
            && scrollHeight - offsetHeight < offsetWidth - clientWidth;
        /** @type {?} */
        var horizontalScrollPresent = clientHeight < offsetHeight
            && scrollWidth > offsetWidth && scrollWidth - offsetWidth < offsetHeight - clientHeight;
        if (verticalScrollPresent) {
            return false;
        }
        return !horizontalScrollPresent;
    };
    /**
     * @return {?}
     */
    GridsterComponent.prototype.setGridSize = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var el = this.el;
        /** @type {?} */
        var width = el.clientWidth;
        /** @type {?} */
        var height = el.clientHeight;
        if (this.$options.setGridSize || this.$options.gridType === 'fit' && !this.mobile) {
            width = el.offsetWidth;
            height = el.offsetHeight;
        }
        else {
            width = el.clientWidth;
            height = el.clientHeight;
        }
        this.curWidth = width;
        this.curHeight = height;
    };
    /**
     * @return {?}
     */
    GridsterComponent.prototype.setGridDimensions = /**
     * @return {?}
     */
    function () {
        this.setGridSize();
        if (!this.mobile && this.$options.mobileBreakpoint > this.curWidth) {
            this.mobile = !this.mobile;
            this.renderer.addClass(this.el, 'mobile');
        }
        else if (this.mobile && this.$options.mobileBreakpoint < this.curWidth) {
            this.mobile = !this.mobile;
            this.renderer.removeClass(this.el, 'mobile');
        }
        /** @type {?} */
        var rows = this.$options.minRows;
        /** @type {?} */
        var columns = this.$options.minCols;
        /** @type {?} */
        var widgetsIndex = this.grid.length - 1;
        /** @type {?} */
        var widget;
        for (; widgetsIndex >= 0; widgetsIndex--) {
            widget = this.grid[widgetsIndex];
            if (!widget.notPlaced) {
                rows = Math.max(rows, widget.$item.y + widget.$item.rows);
                columns = Math.max(columns, widget.$item.x + widget.$item.cols);
            }
        }
        if (this.columns !== columns || this.rows !== rows) {
            this.columns = columns;
            this.rows = rows;
            if (this.options.gridSizeChangedCallback) {
                this.options.gridSizeChangedCallback(this);
            }
        }
    };
    /**
     * @return {?}
     */
    GridsterComponent.prototype.calculateLayout = /**
     * @return {?}
     */
    function () {
        if (this.compact) {
            this.compact.checkCompact();
        }
        this.setGridDimensions();
        if (this.$options.outerMargin) {
            /** @type {?} */
            var marginWidth = -this.$options.margin;
            if (this.$options.outerMarginLeft !== null) {
                marginWidth += this.$options.outerMarginLeft;
                this.renderer.setStyle(this.el, 'padding-left', this.$options.outerMarginLeft + 'px');
            }
            else {
                marginWidth += this.$options.margin;
                this.renderer.setStyle(this.el, 'padding-left', this.$options.margin + 'px');
            }
            if (this.$options.outerMarginRight !== null) {
                marginWidth += this.$options.outerMarginRight;
                this.renderer.setStyle(this.el, 'padding-right', this.$options.outerMarginRight + 'px');
            }
            else {
                marginWidth += this.$options.margin;
                this.renderer.setStyle(this.el, 'padding-right', this.$options.margin + 'px');
            }
            this.curColWidth = (this.curWidth - marginWidth) / this.columns;
            /** @type {?} */
            var marginHeight = -this.$options.margin;
            if (this.$options.outerMarginTop !== null) {
                marginHeight += this.$options.outerMarginTop;
                this.renderer.setStyle(this.el, 'padding-top', this.$options.outerMarginTop + 'px');
            }
            else {
                marginHeight += this.$options.margin;
                this.renderer.setStyle(this.el, 'padding-top', this.$options.margin + 'px');
            }
            if (this.$options.outerMarginBottom !== null) {
                marginHeight += this.$options.outerMarginBottom;
                this.renderer.setStyle(this.el, 'padding-bottom', this.$options.outerMarginBottom + 'px');
            }
            else {
                marginHeight += this.$options.margin;
                this.renderer.setStyle(this.el, 'padding-bottom', this.$options.margin + 'px');
            }
            this.curRowHeight = (this.curHeight - marginHeight) / this.rows;
        }
        else {
            this.curColWidth = (this.curWidth + this.$options.margin) / this.columns;
            this.curRowHeight = (this.curHeight + this.$options.margin) / this.rows;
            this.renderer.setStyle(this.el, 'padding-left', 0 + 'px');
            this.renderer.setStyle(this.el, 'padding-right', 0 + 'px');
            this.renderer.setStyle(this.el, 'padding-top', 0 + 'px');
            this.renderer.setStyle(this.el, 'padding-bottom', 0 + 'px');
        }
        this.gridRenderer.updateGridster();
        this.updateGrid();
        if (this.$options.setGridSize) {
            this.renderer.setStyle(this.el, 'width', (this.columns * this.curColWidth + this.$options.margin) + 'px');
            this.renderer.setStyle(this.el, 'height', (this.rows * this.curRowHeight + this.$options.margin) + 'px');
        }
        else {
            this.renderer.setStyle(this.el, 'width', '');
            this.renderer.setStyle(this.el, 'height', '');
        }
        /** @type {?} */
        var widgetsIndex = this.grid.length - 1;
        /** @type {?} */
        var widget;
        for (; widgetsIndex >= 0; widgetsIndex--) {
            widget = this.grid[widgetsIndex];
            widget.setSize();
            widget.drag.toggle();
            widget.resize.toggle();
        }
        setTimeout(this.resize.bind(this), 100);
    };
    /**
     * @return {?}
     */
    GridsterComponent.prototype.updateGrid = /**
     * @return {?}
     */
    function () {
        if (this.$options.displayGrid === 'always' && !this.mobile) {
            this.renderer.addClass(this.el, 'display-grid');
        }
        else if (this.$options.displayGrid === 'onDrag&Resize' && this.dragInProgress) {
            this.renderer.addClass(this.el, 'display-grid');
        }
        else if (this.$options.displayGrid === 'none' || !this.dragInProgress || this.mobile) {
            this.renderer.removeClass(this.el, 'display-grid');
        }
        this.setGridDimensions();
        this.gridColumns.length = Math.max(this.columns, Math.floor(this.curWidth / this.curColWidth)) || 0;
        this.gridRows.length = Math.max(this.rows, Math.floor(this.curHeight / this.curRowHeight)) || 0;
        this.cdRef.markForCheck();
    };
    /**
     * @param {?} itemComponent
     * @return {?}
     */
    GridsterComponent.prototype.addItem = /**
     * @param {?} itemComponent
     * @return {?}
     */
    function (itemComponent) {
        if (itemComponent.$item.cols === undefined) {
            itemComponent.$item.cols = this.$options.defaultItemCols;
            itemComponent.item.cols = itemComponent.$item.cols;
            itemComponent.itemChanged();
        }
        if (itemComponent.$item.rows === undefined) {
            itemComponent.$item.rows = this.$options.defaultItemRows;
            itemComponent.item.rows = itemComponent.$item.rows;
            itemComponent.itemChanged();
        }
        if (itemComponent.$item.x === -1 || itemComponent.$item.y === -1) {
            this.autoPositionItem(itemComponent);
        }
        else if (this.checkCollision(itemComponent.$item)) {
            if (!this.$options.disableWarnings) {
                itemComponent.notPlaced = true;
                console.warn('Can\'t be placed in the bounds of the dashboard, trying to auto position!/n' +
                    JSON.stringify(itemComponent.item, ['cols', 'rows', 'x', 'y']));
            }
            if (!this.$options.disableAutoPositionOnConflict) {
                this.autoPositionItem(itemComponent);
            }
            else {
                itemComponent.notPlaced = true;
            }
        }
        this.grid.push(itemComponent);
        this.calculateLayoutDebounce();
    };
    /**
     * @param {?} itemComponent
     * @return {?}
     */
    GridsterComponent.prototype.removeItem = /**
     * @param {?} itemComponent
     * @return {?}
     */
    function (itemComponent) {
        this.grid.splice(this.grid.indexOf(itemComponent), 1);
        this.calculateLayoutDebounce();
        if (this.options.itemRemovedCallback) {
            this.options.itemRemovedCallback(itemComponent.item, itemComponent);
        }
    };
    /**
     * @param {?} item
     * @return {?}
     */
    GridsterComponent.prototype.checkCollision = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        /** @type {?} */
        var collision = false;
        if (this.options.itemValidateCallback) {
            collision = !this.options.itemValidateCallback(item);
        }
        if (!collision && this.checkGridCollision(item)) {
            collision = true;
        }
        if (!collision) {
            /** @type {?} */
            var c = this.findItemWithItem(item);
            if (c) {
                collision = c;
            }
        }
        return collision;
    };
    /**
     * @param {?} item
     * @return {?}
     */
    GridsterComponent.prototype.checkGridCollision = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        /** @type {?} */
        var noNegativePosition = item.y > -1 && item.x > -1;
        /** @type {?} */
        var maxGridCols = item.cols + item.x <= this.$options.maxCols;
        /** @type {?} */
        var maxGridRows = item.rows + item.y <= this.$options.maxRows;
        /** @type {?} */
        var maxItemCols = item.maxItemCols === undefined ? this.$options.maxItemCols : item.maxItemCols;
        /** @type {?} */
        var minItemCols = item.minItemCols === undefined ? this.$options.minItemCols : item.minItemCols;
        /** @type {?} */
        var maxItemRows = item.maxItemRows === undefined ? this.$options.maxItemRows : item.maxItemRows;
        /** @type {?} */
        var minItemRows = item.minItemRows === undefined ? this.$options.minItemRows : item.minItemRows;
        /** @type {?} */
        var inColsLimits = item.cols <= maxItemCols && item.cols >= minItemCols;
        /** @type {?} */
        var inRowsLimits = item.rows <= maxItemRows && item.rows >= minItemRows;
        /** @type {?} */
        var minAreaLimit = item.minItemArea === undefined ? this.$options.minItemArea : item.minItemArea;
        /** @type {?} */
        var maxAreaLimit = item.maxItemArea === undefined ? this.$options.maxItemArea : item.maxItemArea;
        /** @type {?} */
        var area = item.cols * item.rows;
        /** @type {?} */
        var inMinArea = minAreaLimit <= area;
        /** @type {?} */
        var inMaxArea = maxAreaLimit >= area;
        return !(noNegativePosition && maxGridCols && maxGridRows && inColsLimits && inRowsLimits && inMinArea && inMaxArea);
    };
    /**
     * @param {?} item
     * @return {?}
     */
    GridsterComponent.prototype.findItemWithItem = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        /** @type {?} */
        var widgetsIndex = this.grid.length - 1;
        /** @type {?} */
        var widget;
        for (; widgetsIndex > -1; widgetsIndex--) {
            widget = this.grid[widgetsIndex];
            if (widget.$item !== item && GridsterComponent.checkCollisionTwoItems(widget.$item, item)) {
                return widget;
            }
        }
        return false;
    };
    /**
     * @param {?} item
     * @return {?}
     */
    GridsterComponent.prototype.findItemsWithItem = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        /** @type {?} */
        var a = [];
        /** @type {?} */
        var widgetsIndex = this.grid.length - 1;
        /** @type {?} */
        var widget;
        for (; widgetsIndex > -1; widgetsIndex--) {
            widget = this.grid[widgetsIndex];
            if (widget.$item !== item && GridsterComponent.checkCollisionTwoItems(widget.$item, item)) {
                a.push(widget);
            }
        }
        return a;
    };
    /**
     * @param {?} itemComponent
     * @return {?}
     */
    GridsterComponent.prototype.autoPositionItem = /**
     * @param {?} itemComponent
     * @return {?}
     */
    function (itemComponent) {
        if (this.getNextPossiblePosition(itemComponent.$item)) {
            itemComponent.notPlaced = false;
            itemComponent.item.x = itemComponent.$item.x;
            itemComponent.item.y = itemComponent.$item.y;
            itemComponent.itemChanged();
        }
        else {
            itemComponent.notPlaced = true;
            if (!this.$options.disableWarnings) {
                console.warn('Can\'t be placed in the bounds of the dashboard!/n' +
                    JSON.stringify(itemComponent.item, ['cols', 'rows', 'x', 'y']));
            }
        }
    };
    /**
     * @param {?} newItem
     * @param {?=} startingFrom
     * @return {?}
     */
    GridsterComponent.prototype.getNextPossiblePosition = /**
     * @param {?} newItem
     * @param {?=} startingFrom
     * @return {?}
     */
    function (newItem, startingFrom) {
        if (startingFrom === void 0) { startingFrom = {}; }
        if (newItem.cols === -1) {
            newItem.cols = this.$options.defaultItemCols;
        }
        if (newItem.rows === -1) {
            newItem.rows = this.$options.defaultItemRows;
        }
        this.setGridDimensions();
        /** @type {?} */
        var rowsIndex = startingFrom.y || 0;
        /** @type {?} */
        var colsIndex;
        for (; rowsIndex < this.rows; rowsIndex++) {
            newItem.y = rowsIndex;
            colsIndex = startingFrom.x || 0;
            for (; colsIndex < this.columns; colsIndex++) {
                newItem.x = colsIndex;
                if (!this.checkCollision(newItem)) {
                    return true;
                }
            }
        }
        /** @type {?} */
        var canAddToRows = this.$options.maxRows >= this.rows + newItem.rows;
        /** @type {?} */
        var canAddToColumns = this.$options.maxCols >= this.columns + newItem.cols;
        /** @type {?} */
        var addToRows = this.rows <= this.columns && canAddToRows;
        if (!addToRows && canAddToColumns) {
            newItem.x = this.columns;
            newItem.y = 0;
            return true;
        }
        else if (canAddToRows) {
            newItem.y = this.rows;
            newItem.x = 0;
            return true;
        }
        return false;
    };
    /**
     * @param {?} item
     * @return {?}
     */
    GridsterComponent.prototype.getFirstPossiblePosition = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        /** @type {?} */
        var tmpItem = Object.assign({}, item);
        this.getNextPossiblePosition(tmpItem);
        return tmpItem;
    };
    /**
     * @param {?} item
     * @return {?}
     */
    GridsterComponent.prototype.getLastPossiblePosition = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        /** @type {?} */
        var farthestItem = { y: 0, x: 0 };
        farthestItem = this.grid.reduce(function (prev, curr) {
            /** @type {?} */
            var currCoords = { y: curr.$item.y + curr.$item.rows - 1, x: curr.$item.x + curr.$item.cols - 1 };
            if (GridsterUtils.compareItems(prev, currCoords) === 1) {
                return currCoords;
            }
            else {
                return prev;
            }
        }, farthestItem);
        /** @type {?} */
        var tmpItem = Object.assign({}, item);
        this.getNextPossiblePosition(tmpItem, farthestItem);
        return tmpItem;
    };
    /**
     * @param {?} x
     * @param {?} roundingMethod
     * @param {?=} noLimit
     * @return {?}
     */
    GridsterComponent.prototype.pixelsToPositionX = /**
     * @param {?} x
     * @param {?} roundingMethod
     * @param {?=} noLimit
     * @return {?}
     */
    function (x, roundingMethod, noLimit) {
        /** @type {?} */
        var position = roundingMethod(x / this.curColWidth);
        if (noLimit) {
            return position;
        }
        else {
            return Math.max(position, 0);
        }
    };
    /**
     * @param {?} y
     * @param {?} roundingMethod
     * @param {?=} noLimit
     * @return {?}
     */
    GridsterComponent.prototype.pixelsToPositionY = /**
     * @param {?} y
     * @param {?} roundingMethod
     * @param {?=} noLimit
     * @return {?}
     */
    function (y, roundingMethod, noLimit) {
        /** @type {?} */
        var position = roundingMethod(y / this.curRowHeight);
        if (noLimit) {
            return position;
        }
        else {
            return Math.max(position, 0);
        }
    };
    /**
     * @param {?} x
     * @return {?}
     */
    GridsterComponent.prototype.positionXToPixels = /**
     * @param {?} x
     * @return {?}
     */
    function (x) {
        return x * this.curColWidth;
    };
    /**
     * @param {?} y
     * @return {?}
     */
    GridsterComponent.prototype.positionYToPixels = /**
     * @param {?} y
     * @return {?}
     */
    function (y) {
        return y * this.curRowHeight;
    };
    GridsterComponent.decorators = [
        { type: Component, args: [{
                    selector: 'gridster',
                    template: "<div class=\"gridster-column\" *ngFor=\"let column of gridColumns; let i = index;\"\n     [ngStyle]=\"gridRenderer.getGridColumnStyle(i)\"></div>\n<div class=\"gridster-row\" *ngFor=\"let row of gridRows; let i = index;\"\n     [ngStyle]=\"gridRenderer.getGridRowStyle(i)\"></div>\n<ng-content></ng-content>\n<gridster-preview class=\"gridster-preview\"></gridster-preview>\n",
                    encapsulation: ViewEncapsulation.None,
                    styles: ["gridster{position:relative;box-sizing:border-box;background:grey;width:100%;height:100%;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;display:block}gridster.fit{overflow-x:hidden;overflow-y:hidden}gridster.scrollVertical{overflow-x:hidden;overflow-y:auto}gridster.scrollHorizontal{overflow-x:auto;overflow-y:hidden}gridster.fixed{overflow:auto}gridster.mobile{overflow-x:hidden;overflow-y:auto}gridster.mobile gridster-item{position:relative}gridster .gridster-column,gridster .gridster-row{position:absolute;display:none;transition:.3s;box-sizing:border-box}gridster.display-grid .gridster-column,gridster.display-grid .gridster-row{display:block}gridster .gridster-column{border-left:1px solid #fff;border-right:1px solid #fff}gridster .gridster-row{border-top:1px solid #fff;border-bottom:1px solid #fff}"]
                }] }
    ];
    /** @nocollapse */
    GridsterComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 },
        { type: ChangeDetectorRef },
        { type: NgZone }
    ]; };
    GridsterComponent.propDecorators = {
        options: [{ type: Input }]
    };
    return GridsterComponent;
}());
export { GridsterComponent };
if (false) {
    /** @type {?} */
    GridsterComponent.prototype.options;
    /** @type {?} */
    GridsterComponent.prototype.calculateLayoutDebounce;
    /** @type {?} */
    GridsterComponent.prototype.movingItem;
    /** @type {?} */
    GridsterComponent.prototype.previewStyle;
    /** @type {?} */
    GridsterComponent.prototype.el;
    /** @type {?} */
    GridsterComponent.prototype.$options;
    /** @type {?} */
    GridsterComponent.prototype.mobile;
    /** @type {?} */
    GridsterComponent.prototype.curWidth;
    /** @type {?} */
    GridsterComponent.prototype.curHeight;
    /** @type {?} */
    GridsterComponent.prototype.grid;
    /** @type {?} */
    GridsterComponent.prototype.columns;
    /** @type {?} */
    GridsterComponent.prototype.rows;
    /** @type {?} */
    GridsterComponent.prototype.curColWidth;
    /** @type {?} */
    GridsterComponent.prototype.curRowHeight;
    /** @type {?} */
    GridsterComponent.prototype.gridColumns;
    /** @type {?} */
    GridsterComponent.prototype.gridRows;
    /** @type {?} */
    GridsterComponent.prototype.windowResize;
    /** @type {?} */
    GridsterComponent.prototype.dragInProgress;
    /** @type {?} */
    GridsterComponent.prototype.emptyCell;
    /** @type {?} */
    GridsterComponent.prototype.compact;
    /** @type {?} */
    GridsterComponent.prototype.gridRenderer;
    /** @type {?} */
    GridsterComponent.prototype.renderer;
    /** @type {?} */
    GridsterComponent.prototype.cdRef;
    /** @type {?} */
    GridsterComponent.prototype.zone;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZHN0ZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1ncmlkc3RlcjIvIiwic291cmNlcyI6WyJsaWIvZ3JpZHN0ZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsS0FBSyxFQUNMLE1BQU0sRUFJTixTQUFTLEVBRVQsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBRWhFLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUN0RCxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSw2QkFBNkIsQ0FBQztBQUM5RCxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFJMUQsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sNEJBQTRCLENBQUM7QUFHNUQ7SUE2QkUsMkJBQVksRUFBYyxFQUFTLFFBQW1CLEVBQVMsS0FBd0IsRUFBUyxJQUFZO1FBQXpFLGFBQVEsR0FBUixRQUFRLENBQVc7UUFBUyxVQUFLLEdBQUwsS0FBSyxDQUFtQjtRQUFTLFNBQUksR0FBSixJQUFJLENBQVE7UUFSNUcsZ0JBQVcsR0FBRyxFQUFFLENBQUM7UUFDakIsYUFBUSxHQUFHLEVBQUUsQ0FBQztRQVFaLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLGFBQWEsQ0FBQztRQUMzQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUM7UUFDbEUsSUFBSSxDQUFDLHVCQUF1QixHQUFHLGFBQWEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENB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ZWYsXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgSW5wdXQsXG4gIE5nWm9uZSxcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgUmVuZGVyZXIyLFxuICBTaW1wbGVDaGFuZ2VzLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtHcmlkc3RlckNvbmZpZ1NlcnZpY2V9IGZyb20gJy4vZ3JpZHN0ZXJDb25maWcuY29uc3RhbnQnO1xuaW1wb3J0IHtHcmlkc3RlckNvbmZpZ30gZnJvbSAnLi9ncmlkc3RlckNvbmZpZy5pbnRlcmZhY2UnO1xuaW1wb3J0IHtHcmlkc3RlclV0aWxzfSBmcm9tICcuL2dyaWRzdGVyVXRpbHMuc2VydmljZSc7XG5pbXBvcnQge0dyaWRzdGVyRW1wdHlDZWxsfSBmcm9tICcuL2dyaWRzdGVyRW1wdHlDZWxsLnNlcnZpY2UnO1xuaW1wb3J0IHtHcmlkc3RlckNvbXBhY3R9IGZyb20gJy4vZ3JpZHN0ZXJDb21wYWN0LnNlcnZpY2UnO1xuaW1wb3J0IHtHcmlkc3RlckNvbmZpZ1N9IGZyb20gJy4vZ3JpZHN0ZXJDb25maWdTLmludGVyZmFjZSc7XG5pbXBvcnQge0dyaWRzdGVyQ29tcG9uZW50SW50ZXJmYWNlfSBmcm9tICcuL2dyaWRzdGVyLmludGVyZmFjZSc7XG5pbXBvcnQge0dyaWRzdGVySXRlbUNvbXBvbmVudEludGVyZmFjZX0gZnJvbSAnLi9ncmlkc3Rlckl0ZW1Db21wb25lbnQuaW50ZXJmYWNlJztcbmltcG9ydCB7R3JpZHN0ZXJSZW5kZXJlcn0gZnJvbSAnLi9ncmlkc3RlclJlbmRlcmVyLnNlcnZpY2UnO1xuaW1wb3J0IHtHcmlkc3Rlckl0ZW19IGZyb20gJy4vZ3JpZHN0ZXJJdGVtLmludGVyZmFjZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2dyaWRzdGVyJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2dyaWRzdGVyLmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9ncmlkc3Rlci5jc3MnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBHcmlkc3RlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIEdyaWRzdGVyQ29tcG9uZW50SW50ZXJmYWNlIHtcbiAgQElucHV0KCkgb3B0aW9uczogR3JpZHN0ZXJDb25maWc7XG4gIGNhbGN1bGF0ZUxheW91dERlYm91bmNlOiAoKSA9PiB2b2lkO1xuICBtb3ZpbmdJdGVtOiBHcmlkc3Rlckl0ZW0gfCBudWxsO1xuICBwcmV2aWV3U3R5bGU6ICgpID0+IHZvaWQ7XG4gIGVsOiBhbnk7XG4gICRvcHRpb25zOiBHcmlkc3RlckNvbmZpZ1M7XG4gIG1vYmlsZTogYm9vbGVhbjtcbiAgY3VyV2lkdGg6IG51bWJlcjtcbiAgY3VySGVpZ2h0OiBudW1iZXI7XG4gIGdyaWQ6IEFycmF5PEdyaWRzdGVySXRlbUNvbXBvbmVudEludGVyZmFjZT47XG4gIGNvbHVtbnM6IG51bWJlcjtcbiAgcm93czogbnVtYmVyO1xuICBjdXJDb2xXaWR0aDogbnVtYmVyO1xuICBjdXJSb3dIZWlnaHQ6IG51bWJlcjtcbiAgZ3JpZENvbHVtbnMgPSBbXTtcbiAgZ3JpZFJvd3MgPSBbXTtcbiAgd2luZG93UmVzaXplOiAoKCkgPT4gdm9pZCkgfCBudWxsO1xuICBkcmFnSW5Qcm9ncmVzczogYm9vbGVhbjtcbiAgZW1wdHlDZWxsOiBHcmlkc3RlckVtcHR5Q2VsbDtcbiAgY29tcGFjdDogR3JpZHN0ZXJDb21wYWN0O1xuICBncmlkUmVuZGVyZXI6IEdyaWRzdGVyUmVuZGVyZXI7XG5cbiAgY29uc3RydWN0b3IoZWw6IEVsZW1lbnRSZWYsIHB1YmxpYyByZW5kZXJlcjogUmVuZGVyZXIyLCBwdWJsaWMgY2RSZWY6IENoYW5nZURldGVjdG9yUmVmLCBwdWJsaWMgem9uZTogTmdab25lKSB7XG4gICAgdGhpcy5lbCA9IGVsLm5hdGl2ZUVsZW1lbnQ7XG4gICAgdGhpcy4kb3B0aW9ucyA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoR3JpZHN0ZXJDb25maWdTZXJ2aWNlKSk7XG4gICAgdGhpcy5jYWxjdWxhdGVMYXlvdXREZWJvdW5jZSA9IEdyaWRzdGVyVXRpbHMuZGVib3VuY2UodGhpcy5jYWxjdWxhdGVMYXlvdXQuYmluZCh0aGlzKSwgMCk7XG4gICAgdGhpcy5tb2JpbGUgPSBmYWxzZTtcbiAgICB0aGlzLmN1cldpZHRoID0gMDtcbiAgICB0aGlzLmN1ckhlaWdodCA9IDA7XG4gICAgdGhpcy5ncmlkID0gW107XG4gICAgdGhpcy5jdXJDb2xXaWR0aCA9IDA7XG4gICAgdGhpcy5jdXJSb3dIZWlnaHQgPSAwO1xuICAgIHRoaXMuZHJhZ0luUHJvZ3Jlc3MgPSBmYWxzZTtcbiAgICB0aGlzLmVtcHR5Q2VsbCA9IG5ldyBHcmlkc3RlckVtcHR5Q2VsbCh0aGlzKTtcbiAgICB0aGlzLmNvbXBhY3QgPSBuZXcgR3JpZHN0ZXJDb21wYWN0KHRoaXMpO1xuICAgIHRoaXMuZ3JpZFJlbmRlcmVyID0gbmV3IEdyaWRzdGVyUmVuZGVyZXIodGhpcyk7XG4gIH1cblxuICBzdGF0aWMgY2hlY2tDb2xsaXNpb25Ud29JdGVtcyhpdGVtOiBHcmlkc3Rlckl0ZW0sIGl0ZW0yOiBHcmlkc3Rlckl0ZW0pOiBib29sZWFuIHtcbiAgICByZXR1cm4gaXRlbS54IDwgaXRlbTIueCArIGl0ZW0yLmNvbHNcbiAgICAgICYmIGl0ZW0ueCArIGl0ZW0uY29scyA+IGl0ZW0yLnhcbiAgICAgICYmIGl0ZW0ueSA8IGl0ZW0yLnkgKyBpdGVtMi5yb3dzXG4gICAgICAmJiBpdGVtLnkgKyBpdGVtLnJvd3MgPiBpdGVtMi55O1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5pbml0Q2FsbGJhY2spIHtcbiAgICAgIHRoaXMub3B0aW9ucy5pbml0Q2FsbGJhY2sodGhpcyk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmIChjaGFuZ2VzLm9wdGlvbnMpIHtcbiAgICAgIHRoaXMuc2V0T3B0aW9ucygpO1xuICAgICAgdGhpcy5vcHRpb25zLmFwaSA9IHtcbiAgICAgICAgb3B0aW9uc0NoYW5nZWQ6IHRoaXMub3B0aW9uc0NoYW5nZWQuYmluZCh0aGlzKSxcbiAgICAgICAgcmVzaXplOiB0aGlzLm9uUmVzaXplLmJpbmQodGhpcyksXG4gICAgICAgIGdldE5leHRQb3NzaWJsZVBvc2l0aW9uOiB0aGlzLmdldE5leHRQb3NzaWJsZVBvc2l0aW9uLmJpbmQodGhpcyksXG4gICAgICAgIGdldEZpcnN0UG9zc2libGVQb3NpdGlvbjogdGhpcy5nZXRGaXJzdFBvc3NpYmxlUG9zaXRpb24uYmluZCh0aGlzKSxcbiAgICAgICAgZ2V0TGFzdFBvc3NpYmxlUG9zaXRpb246IHRoaXMuZ2V0TGFzdFBvc3NpYmxlUG9zaXRpb24uYmluZCh0aGlzKSxcbiAgICAgIH07XG4gICAgICB0aGlzLmNvbHVtbnMgPSB0aGlzLiRvcHRpb25zLm1pbkNvbHM7XG4gICAgICB0aGlzLnJvd3MgPSB0aGlzLiRvcHRpb25zLm1pblJvd3M7XG4gICAgICB0aGlzLnNldEdyaWRTaXplKCk7XG4gICAgICB0aGlzLmNhbGN1bGF0ZUxheW91dCgpO1xuICAgIH1cbiAgfVxuXG4gIHJlc2l6ZSgpOiB2b2lkIHtcbiAgICBsZXQgaGVpZ2h0O1xuICAgIGxldCB3aWR0aDtcbiAgICBpZiAodGhpcy4kb3B0aW9ucy5ncmlkVHlwZSA9PT0gJ2ZpdCcgJiYgIXRoaXMubW9iaWxlKSB7XG4gICAgICB3aWR0aCA9IHRoaXMuZWwub2Zmc2V0V2lkdGg7XG4gICAgICBoZWlnaHQgPSB0aGlzLmVsLm9mZnNldEhlaWdodDtcbiAgICB9IGVsc2Uge1xuICAgICAgd2lkdGggPSB0aGlzLmVsLmNsaWVudFdpZHRoO1xuICAgICAgaGVpZ2h0ID0gdGhpcy5lbC5jbGllbnRIZWlnaHQ7XG4gICAgfVxuICAgIGlmICgod2lkdGggIT09IHRoaXMuY3VyV2lkdGggfHwgaGVpZ2h0ICE9PSB0aGlzLmN1ckhlaWdodCkgJiYgdGhpcy5jaGVja0lmVG9SZXNpemUoKSkge1xuICAgICAgdGhpcy5vblJlc2l6ZSgpO1xuICAgIH1cbiAgfVxuXG4gIHNldE9wdGlvbnMoKTogdm9pZCB7XG4gICAgdGhpcy4kb3B0aW9ucyA9IEdyaWRzdGVyVXRpbHMubWVyZ2UodGhpcy4kb3B0aW9ucywgdGhpcy5vcHRpb25zLCB0aGlzLiRvcHRpb25zKTtcbiAgICBpZiAoIXRoaXMuJG9wdGlvbnMuZGlzYWJsZVdpbmRvd1Jlc2l6ZSAmJiAhdGhpcy53aW5kb3dSZXNpemUpIHtcbiAgICAgIHRoaXMud2luZG93UmVzaXplID0gdGhpcy5yZW5kZXJlci5saXN0ZW4oJ3dpbmRvdycsICdyZXNpemUnLCB0aGlzLm9uUmVzaXplLmJpbmQodGhpcykpO1xuICAgIH0gZWxzZSBpZiAodGhpcy4kb3B0aW9ucy5kaXNhYmxlV2luZG93UmVzaXplICYmIHRoaXMud2luZG93UmVzaXplKSB7XG4gICAgICB0aGlzLndpbmRvd1Jlc2l6ZSgpO1xuICAgICAgdGhpcy53aW5kb3dSZXNpemUgPSBudWxsO1xuICAgIH1cbiAgICB0aGlzLmVtcHR5Q2VsbC51cGRhdGVPcHRpb25zKCk7XG4gIH1cblxuICBvcHRpb25zQ2hhbmdlZCgpOiB2b2lkIHtcbiAgICB0aGlzLnNldE9wdGlvbnMoKTtcbiAgICBsZXQgd2lkZ2V0c0luZGV4OiBudW1iZXIgPSB0aGlzLmdyaWQubGVuZ3RoIC0gMSwgd2lkZ2V0OiBHcmlkc3Rlckl0ZW1Db21wb25lbnRJbnRlcmZhY2U7XG4gICAgZm9yICg7IHdpZGdldHNJbmRleCA+PSAwOyB3aWRnZXRzSW5kZXgtLSkge1xuICAgICAgd2lkZ2V0ID0gdGhpcy5ncmlkW3dpZGdldHNJbmRleF07XG4gICAgICB3aWRnZXQudXBkYXRlT3B0aW9ucygpO1xuICAgIH1cbiAgICB0aGlzLmNhbGN1bGF0ZUxheW91dCgpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgaWYgKHRoaXMud2luZG93UmVzaXplKSB7XG4gICAgICB0aGlzLndpbmRvd1Jlc2l6ZSgpO1xuICAgIH1cbiAgICBpZiAodGhpcy5vcHRpb25zLmRlc3Ryb3lDYWxsYmFjaykge1xuICAgICAgdGhpcy5vcHRpb25zLmRlc3Ryb3lDYWxsYmFjayh0aGlzKTtcbiAgICB9XG4gICAgaWYgKHRoaXMub3B0aW9ucy5hcGkpIHtcbiAgICAgIHRoaXMub3B0aW9ucy5hcGkucmVzaXplID0gdW5kZWZpbmVkO1xuICAgICAgdGhpcy5vcHRpb25zLmFwaS5vcHRpb25zQ2hhbmdlZCA9IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMub3B0aW9ucy5hcGkuZ2V0TmV4dFBvc3NpYmxlUG9zaXRpb24gPSB1bmRlZmluZWQ7XG4gICAgICB0aGlzLm9wdGlvbnMuYXBpID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgICB0aGlzLmVtcHR5Q2VsbC5kZXN0cm95KCk7XG4gICAgZGVsZXRlIHRoaXMuZW1wdHlDZWxsO1xuICAgIHRoaXMuY29tcGFjdC5kZXN0cm95KCk7XG4gICAgZGVsZXRlIHRoaXMuY29tcGFjdDtcbiAgfVxuXG4gIG9uUmVzaXplKCk6IHZvaWQge1xuICAgIHRoaXMuc2V0R3JpZFNpemUoKTtcbiAgICB0aGlzLmNhbGN1bGF0ZUxheW91dCgpO1xuICB9XG5cbiAgY2hlY2tJZlRvUmVzaXplKCk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGNsaWVudFdpZHRoID0gdGhpcy5lbC5jbGllbnRXaWR0aDtcbiAgICBjb25zdCBvZmZzZXRXaWR0aCA9IHRoaXMuZWwub2Zmc2V0V2lkdGg7XG4gICAgY29uc3Qgc2Nyb2xsV2lkdGggPSB0aGlzLmVsLnNjcm9sbFdpZHRoO1xuICAgIGNvbnN0IGNsaWVudEhlaWdodCA9IHRoaXMuZWwuY2xpZW50SGVpZ2h0O1xuICAgIGNvbnN0IG9mZnNldEhlaWdodCA9IHRoaXMuZWwub2Zmc2V0SGVpZ2h0O1xuICAgIGNvbnN0IHNjcm9sbEhlaWdodCA9IHRoaXMuZWwuc2Nyb2xsSGVpZ2h0O1xuICAgIGNvbnN0IHZlcnRpY2FsU2Nyb2xsUHJlc2VudCA9IGNsaWVudFdpZHRoIDwgb2Zmc2V0V2lkdGggJiYgc2Nyb2xsSGVpZ2h0ID4gb2Zmc2V0SGVpZ2h0XG4gICAgICAmJiBzY3JvbGxIZWlnaHQgLSBvZmZzZXRIZWlnaHQgPCBvZmZzZXRXaWR0aCAtIGNsaWVudFdpZHRoO1xuICAgIGNvbnN0IGhvcml6b250YWxTY3JvbGxQcmVzZW50ID0gY2xpZW50SGVpZ2h0IDwgb2Zmc2V0SGVpZ2h0XG4gICAgICAmJiBzY3JvbGxXaWR0aCA+IG9mZnNldFdpZHRoICYmIHNjcm9sbFdpZHRoIC0gb2Zmc2V0V2lkdGggPCBvZmZzZXRIZWlnaHQgLSBjbGllbnRIZWlnaHQ7XG4gICAgaWYgKHZlcnRpY2FsU2Nyb2xsUHJlc2VudCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gIWhvcml6b250YWxTY3JvbGxQcmVzZW50O1xuICB9XG5cbiAgc2V0R3JpZFNpemUoKTogdm9pZCB7XG4gICAgY29uc3QgZWwgPSB0aGlzLmVsO1xuICAgIGxldCB3aWR0aCA9IGVsLmNsaWVudFdpZHRoO1xuICAgIGxldCBoZWlnaHQgPSBlbC5jbGllbnRIZWlnaHQ7XG4gICAgaWYgKHRoaXMuJG9wdGlvbnMuc2V0R3JpZFNpemUgfHwgdGhpcy4kb3B0aW9ucy5ncmlkVHlwZSA9PT0gJ2ZpdCcgJiYgIXRoaXMubW9iaWxlKSB7XG4gICAgICB3aWR0aCA9IGVsLm9mZnNldFdpZHRoO1xuICAgICAgaGVpZ2h0ID0gZWwub2Zmc2V0SGVpZ2h0O1xuICAgIH0gZWxzZSB7XG4gICAgICB3aWR0aCA9IGVsLmNsaWVudFdpZHRoO1xuICAgICAgaGVpZ2h0ID0gZWwuY2xpZW50SGVpZ2h0O1xuICAgIH1cbiAgICB0aGlzLmN1cldpZHRoID0gd2lkdGg7XG4gICAgdGhpcy5jdXJIZWlnaHQgPSBoZWlnaHQ7XG4gIH1cblxuICBzZXRHcmlkRGltZW5zaW9ucygpOiB2b2lkIHtcbiAgICB0aGlzLnNldEdyaWRTaXplKCk7XG4gICAgaWYgKCF0aGlzLm1vYmlsZSAmJiB0aGlzLiRvcHRpb25zLm1vYmlsZUJyZWFrcG9pbnQgPiB0aGlzLmN1cldpZHRoKSB7XG4gICAgICB0aGlzLm1vYmlsZSA9ICF0aGlzLm1vYmlsZTtcbiAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5lbCwgJ21vYmlsZScpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5tb2JpbGUgJiYgdGhpcy4kb3B0aW9ucy5tb2JpbGVCcmVha3BvaW50IDwgdGhpcy5jdXJXaWR0aCkge1xuICAgICAgdGhpcy5tb2JpbGUgPSAhdGhpcy5tb2JpbGU7XG4gICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuZWwsICdtb2JpbGUnKTtcbiAgICB9XG4gICAgbGV0IHJvd3MgPSB0aGlzLiRvcHRpb25zLm1pblJvd3MsIGNvbHVtbnMgPSB0aGlzLiRvcHRpb25zLm1pbkNvbHM7XG5cbiAgICBsZXQgd2lkZ2V0c0luZGV4ID0gdGhpcy5ncmlkLmxlbmd0aCAtIDEsIHdpZGdldDtcbiAgICBmb3IgKDsgd2lkZ2V0c0luZGV4ID49IDA7IHdpZGdldHNJbmRleC0tKSB7XG4gICAgICB3aWRnZXQgPSB0aGlzLmdyaWRbd2lkZ2V0c0luZGV4XTtcbiAgICAgIGlmICghd2lkZ2V0Lm5vdFBsYWNlZCkge1xuICAgICAgICByb3dzID0gTWF0aC5tYXgocm93cywgd2lkZ2V0LiRpdGVtLnkgKyB3aWRnZXQuJGl0ZW0ucm93cyk7XG4gICAgICAgIGNvbHVtbnMgPSBNYXRoLm1heChjb2x1bW5zLCB3aWRnZXQuJGl0ZW0ueCArIHdpZGdldC4kaXRlbS5jb2xzKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGhpcy5jb2x1bW5zICE9PSBjb2x1bW5zIHx8IHRoaXMucm93cyAhPT0gcm93cykge1xuICAgICAgdGhpcy5jb2x1bW5zID0gY29sdW1ucztcbiAgICAgIHRoaXMucm93cyA9IHJvd3M7XG4gICAgICBpZiAodGhpcy5vcHRpb25zLmdyaWRTaXplQ2hhbmdlZENhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMub3B0aW9ucy5ncmlkU2l6ZUNoYW5nZWRDYWxsYmFjayh0aGlzKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBjYWxjdWxhdGVMYXlvdXQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuY29tcGFjdCkge1xuICAgICAgdGhpcy5jb21wYWN0LmNoZWNrQ29tcGFjdCgpO1xuICAgIH1cblxuICAgIHRoaXMuc2V0R3JpZERpbWVuc2lvbnMoKTtcbiAgICBpZiAodGhpcy4kb3B0aW9ucy5vdXRlck1hcmdpbikge1xuICAgICAgbGV0IG1hcmdpbldpZHRoID0gLXRoaXMuJG9wdGlvbnMubWFyZ2luO1xuICAgICAgaWYgKHRoaXMuJG9wdGlvbnMub3V0ZXJNYXJnaW5MZWZ0ICE9PSBudWxsKSB7XG4gICAgICAgIG1hcmdpbldpZHRoICs9IHRoaXMuJG9wdGlvbnMub3V0ZXJNYXJnaW5MZWZ0O1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWwsICdwYWRkaW5nLWxlZnQnLCB0aGlzLiRvcHRpb25zLm91dGVyTWFyZ2luTGVmdCArICdweCcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbWFyZ2luV2lkdGggKz0gdGhpcy4kb3B0aW9ucy5tYXJnaW47XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbCwgJ3BhZGRpbmctbGVmdCcsIHRoaXMuJG9wdGlvbnMubWFyZ2luICsgJ3B4Jyk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy4kb3B0aW9ucy5vdXRlck1hcmdpblJpZ2h0ICE9PSBudWxsKSB7XG4gICAgICAgIG1hcmdpbldpZHRoICs9IHRoaXMuJG9wdGlvbnMub3V0ZXJNYXJnaW5SaWdodDtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLCAncGFkZGluZy1yaWdodCcsIHRoaXMuJG9wdGlvbnMub3V0ZXJNYXJnaW5SaWdodCArICdweCcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbWFyZ2luV2lkdGggKz0gdGhpcy4kb3B0aW9ucy5tYXJnaW47XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbCwgJ3BhZGRpbmctcmlnaHQnLCB0aGlzLiRvcHRpb25zLm1hcmdpbiArICdweCcpO1xuICAgICAgfVxuICAgICAgdGhpcy5jdXJDb2xXaWR0aCA9ICh0aGlzLmN1cldpZHRoIC0gbWFyZ2luV2lkdGgpIC8gdGhpcy5jb2x1bW5zO1xuICAgICAgbGV0IG1hcmdpbkhlaWdodCA9IC10aGlzLiRvcHRpb25zLm1hcmdpbjtcbiAgICAgIGlmICh0aGlzLiRvcHRpb25zLm91dGVyTWFyZ2luVG9wICE9PSBudWxsKSB7XG4gICAgICAgIG1hcmdpbkhlaWdodCArPSB0aGlzLiRvcHRpb25zLm91dGVyTWFyZ2luVG9wO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWwsICdwYWRkaW5nLXRvcCcsIHRoaXMuJG9wdGlvbnMub3V0ZXJNYXJnaW5Ub3AgKyAncHgnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG1hcmdpbkhlaWdodCArPSB0aGlzLiRvcHRpb25zLm1hcmdpbjtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLCAncGFkZGluZy10b3AnLCB0aGlzLiRvcHRpb25zLm1hcmdpbiArICdweCcpO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuJG9wdGlvbnMub3V0ZXJNYXJnaW5Cb3R0b20gIT09IG51bGwpIHtcbiAgICAgICAgbWFyZ2luSGVpZ2h0ICs9IHRoaXMuJG9wdGlvbnMub3V0ZXJNYXJnaW5Cb3R0b207XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbCwgJ3BhZGRpbmctYm90dG9tJywgdGhpcy4kb3B0aW9ucy5vdXRlck1hcmdpbkJvdHRvbSArICdweCcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbWFyZ2luSGVpZ2h0ICs9IHRoaXMuJG9wdGlvbnMubWFyZ2luO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWwsICdwYWRkaW5nLWJvdHRvbScsIHRoaXMuJG9wdGlvbnMubWFyZ2luICsgJ3B4Jyk7XG4gICAgICB9XG4gICAgICB0aGlzLmN1clJvd0hlaWdodCA9ICh0aGlzLmN1ckhlaWdodCAtIG1hcmdpbkhlaWdodCkgLyB0aGlzLnJvd3M7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY3VyQ29sV2lkdGggPSAodGhpcy5jdXJXaWR0aCArIHRoaXMuJG9wdGlvbnMubWFyZ2luKSAvIHRoaXMuY29sdW1ucztcbiAgICAgIHRoaXMuY3VyUm93SGVpZ2h0ID0gKHRoaXMuY3VySGVpZ2h0ICsgdGhpcy4kb3B0aW9ucy5tYXJnaW4pIC8gdGhpcy5yb3dzO1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLCAncGFkZGluZy1sZWZ0JywgMCArICdweCcpO1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLCAncGFkZGluZy1yaWdodCcsIDAgKyAncHgnKTtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbCwgJ3BhZGRpbmctdG9wJywgMCArICdweCcpO1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLCAncGFkZGluZy1ib3R0b20nLCAwICsgJ3B4Jyk7XG4gICAgfVxuICAgIHRoaXMuZ3JpZFJlbmRlcmVyLnVwZGF0ZUdyaWRzdGVyKCk7XG5cbiAgICB0aGlzLnVwZGF0ZUdyaWQoKTtcblxuICAgIGlmICh0aGlzLiRvcHRpb25zLnNldEdyaWRTaXplKSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWwsICd3aWR0aCcsICh0aGlzLmNvbHVtbnMgKiB0aGlzLmN1ckNvbFdpZHRoICsgdGhpcy4kb3B0aW9ucy5tYXJnaW4pICsgJ3B4Jyk7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWwsICdoZWlnaHQnLCAodGhpcy5yb3dzICogdGhpcy5jdXJSb3dIZWlnaHQgKyB0aGlzLiRvcHRpb25zLm1hcmdpbikgKyAncHgnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLCAnd2lkdGgnLCAnJyk7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWwsICdoZWlnaHQnLCAnJyk7XG4gICAgfVxuXG4gICAgbGV0IHdpZGdldHNJbmRleDogbnVtYmVyID0gdGhpcy5ncmlkLmxlbmd0aCAtIDEsIHdpZGdldDogR3JpZHN0ZXJJdGVtQ29tcG9uZW50SW50ZXJmYWNlO1xuICAgIGZvciAoOyB3aWRnZXRzSW5kZXggPj0gMDsgd2lkZ2V0c0luZGV4LS0pIHtcbiAgICAgIHdpZGdldCA9IHRoaXMuZ3JpZFt3aWRnZXRzSW5kZXhdO1xuICAgICAgd2lkZ2V0LnNldFNpemUoKTtcbiAgICAgIHdpZGdldC5kcmFnLnRvZ2dsZSgpO1xuICAgICAgd2lkZ2V0LnJlc2l6ZS50b2dnbGUoKTtcbiAgICB9XG5cbiAgICBzZXRUaW1lb3V0KHRoaXMucmVzaXplLmJpbmQodGhpcyksIDEwMCk7XG4gIH1cblxuICB1cGRhdGVHcmlkKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLiRvcHRpb25zLmRpc3BsYXlHcmlkID09PSAnYWx3YXlzJyAmJiAhdGhpcy5tb2JpbGUpIHtcbiAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5lbCwgJ2Rpc3BsYXktZ3JpZCcpO1xuICAgIH0gZWxzZSBpZiAodGhpcy4kb3B0aW9ucy5kaXNwbGF5R3JpZCA9PT0gJ29uRHJhZyZSZXNpemUnICYmIHRoaXMuZHJhZ0luUHJvZ3Jlc3MpIHtcbiAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5lbCwgJ2Rpc3BsYXktZ3JpZCcpO1xuICAgIH0gZWxzZSBpZiAodGhpcy4kb3B0aW9ucy5kaXNwbGF5R3JpZCA9PT0gJ25vbmUnIHx8ICF0aGlzLmRyYWdJblByb2dyZXNzIHx8IHRoaXMubW9iaWxlKSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuZWwsICdkaXNwbGF5LWdyaWQnKTtcbiAgICB9XG4gICAgdGhpcy5zZXRHcmlkRGltZW5zaW9ucygpO1xuICAgIHRoaXMuZ3JpZENvbHVtbnMubGVuZ3RoID0gTWF0aC5tYXgodGhpcy5jb2x1bW5zLCBNYXRoLmZsb29yKHRoaXMuY3VyV2lkdGggLyB0aGlzLmN1ckNvbFdpZHRoKSkgfHwgMDtcbiAgICB0aGlzLmdyaWRSb3dzLmxlbmd0aCA9IE1hdGgubWF4KHRoaXMucm93cywgTWF0aC5mbG9vcih0aGlzLmN1ckhlaWdodCAvIHRoaXMuY3VyUm93SGVpZ2h0KSkgfHwgMDtcbiAgICB0aGlzLmNkUmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgYWRkSXRlbShpdGVtQ29tcG9uZW50OiBHcmlkc3Rlckl0ZW1Db21wb25lbnRJbnRlcmZhY2UpOiB2b2lkIHtcbiAgICBpZiAoaXRlbUNvbXBvbmVudC4kaXRlbS5jb2xzID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGl0ZW1Db21wb25lbnQuJGl0ZW0uY29scyA9IHRoaXMuJG9wdGlvbnMuZGVmYXVsdEl0ZW1Db2xzO1xuICAgICAgaXRlbUNvbXBvbmVudC5pdGVtLmNvbHMgPSBpdGVtQ29tcG9uZW50LiRpdGVtLmNvbHM7XG4gICAgICBpdGVtQ29tcG9uZW50Lml0ZW1DaGFuZ2VkKCk7XG4gICAgfVxuICAgIGlmIChpdGVtQ29tcG9uZW50LiRpdGVtLnJvd3MgPT09IHVuZGVmaW5lZCkge1xuICAgICAgaXRlbUNvbXBvbmVudC4kaXRlbS5yb3dzID0gdGhpcy4kb3B0aW9ucy5kZWZhdWx0SXRlbVJvd3M7XG4gICAgICBpdGVtQ29tcG9uZW50Lml0ZW0ucm93cyA9IGl0ZW1Db21wb25lbnQuJGl0ZW0ucm93cztcbiAgICAgIGl0ZW1Db21wb25lbnQuaXRlbUNoYW5nZWQoKTtcbiAgICB9XG4gICAgaWYgKGl0ZW1Db21wb25lbnQuJGl0ZW0ueCA9PT0gLTEgfHwgaXRlbUNvbXBvbmVudC4kaXRlbS55ID09PSAtMSkge1xuICAgICAgdGhpcy5hdXRvUG9zaXRpb25JdGVtKGl0ZW1Db21wb25lbnQpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5jaGVja0NvbGxpc2lvbihpdGVtQ29tcG9uZW50LiRpdGVtKSkge1xuICAgICAgaWYgKCF0aGlzLiRvcHRpb25zLmRpc2FibGVXYXJuaW5ncykge1xuICAgICAgICBpdGVtQ29tcG9uZW50Lm5vdFBsYWNlZCA9IHRydWU7XG4gICAgICAgIGNvbnNvbGUud2FybignQ2FuXFwndCBiZSBwbGFjZWQgaW4gdGhlIGJvdW5kcyBvZiB0aGUgZGFzaGJvYXJkLCB0cnlpbmcgdG8gYXV0byBwb3NpdGlvbiEvbicgK1xuICAgICAgICAgIEpTT04uc3RyaW5naWZ5KGl0ZW1Db21wb25lbnQuaXRlbSwgWydjb2xzJywgJ3Jvd3MnLCAneCcsICd5J10pKTtcbiAgICAgIH1cbiAgICAgIGlmICghdGhpcy4kb3B0aW9ucy5kaXNhYmxlQXV0b1Bvc2l0aW9uT25Db25mbGljdCkge1xuICAgICAgICB0aGlzLmF1dG9Qb3NpdGlvbkl0ZW0oaXRlbUNvbXBvbmVudCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpdGVtQ29tcG9uZW50Lm5vdFBsYWNlZCA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuZ3JpZC5wdXNoKGl0ZW1Db21wb25lbnQpO1xuICAgIHRoaXMuY2FsY3VsYXRlTGF5b3V0RGVib3VuY2UoKTtcbiAgfVxuXG4gIHJlbW92ZUl0ZW0oaXRlbUNvbXBvbmVudDogR3JpZHN0ZXJJdGVtQ29tcG9uZW50SW50ZXJmYWNlKTogdm9pZCB7XG4gICAgdGhpcy5ncmlkLnNwbGljZSh0aGlzLmdyaWQuaW5kZXhPZihpdGVtQ29tcG9uZW50KSwgMSk7XG4gICAgdGhpcy5jYWxjdWxhdGVMYXlvdXREZWJvdW5jZSgpO1xuICAgIGlmICh0aGlzLm9wdGlvbnMuaXRlbVJlbW92ZWRDYWxsYmFjaykge1xuICAgICAgdGhpcy5vcHRpb25zLml0ZW1SZW1vdmVkQ2FsbGJhY2soaXRlbUNvbXBvbmVudC5pdGVtLCBpdGVtQ29tcG9uZW50KTtcbiAgICB9XG4gIH1cblxuICBjaGVja0NvbGxpc2lvbihpdGVtOiBHcmlkc3Rlckl0ZW0pOiBHcmlkc3Rlckl0ZW1Db21wb25lbnRJbnRlcmZhY2UgfCBib29sZWFuIHtcbiAgICBsZXQgY29sbGlzaW9uOiBHcmlkc3Rlckl0ZW1Db21wb25lbnRJbnRlcmZhY2UgfCBib29sZWFuID0gZmFsc2U7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5pdGVtVmFsaWRhdGVDYWxsYmFjaykge1xuICAgICAgY29sbGlzaW9uID0gIXRoaXMub3B0aW9ucy5pdGVtVmFsaWRhdGVDYWxsYmFjayhpdGVtKTtcbiAgICB9XG4gICAgaWYgKCFjb2xsaXNpb24gJiYgdGhpcy5jaGVja0dyaWRDb2xsaXNpb24oaXRlbSkpIHtcbiAgICAgIGNvbGxpc2lvbiA9IHRydWU7XG4gICAgfVxuICAgIGlmICghY29sbGlzaW9uKSB7XG4gICAgICBjb25zdCBjID0gdGhpcy5maW5kSXRlbVdpdGhJdGVtKGl0ZW0pO1xuICAgICAgaWYgKGMpIHtcbiAgICAgICAgY29sbGlzaW9uID0gYztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGNvbGxpc2lvbjtcbiAgfVxuXG4gIGNoZWNrR3JpZENvbGxpc2lvbihpdGVtOiBHcmlkc3Rlckl0ZW0pOiBib29sZWFuIHtcbiAgICBjb25zdCBub05lZ2F0aXZlUG9zaXRpb24gPSBpdGVtLnkgPiAtMSAmJiBpdGVtLnggPiAtMTtcbiAgICBjb25zdCBtYXhHcmlkQ29scyA9IGl0ZW0uY29scyArIGl0ZW0ueCA8PSB0aGlzLiRvcHRpb25zLm1heENvbHM7XG4gICAgY29uc3QgbWF4R3JpZFJvd3MgPSBpdGVtLnJvd3MgKyBpdGVtLnkgPD0gdGhpcy4kb3B0aW9ucy5tYXhSb3dzO1xuICAgIGNvbnN0IG1heEl0ZW1Db2xzID0gaXRlbS5tYXhJdGVtQ29scyA9PT0gdW5kZWZpbmVkID8gdGhpcy4kb3B0aW9ucy5tYXhJdGVtQ29scyA6IGl0ZW0ubWF4SXRlbUNvbHM7XG4gICAgY29uc3QgbWluSXRlbUNvbHMgPSBpdGVtLm1pbkl0ZW1Db2xzID09PSB1bmRlZmluZWQgPyB0aGlzLiRvcHRpb25zLm1pbkl0ZW1Db2xzIDogaXRlbS5taW5JdGVtQ29scztcbiAgICBjb25zdCBtYXhJdGVtUm93cyA9IGl0ZW0ubWF4SXRlbVJvd3MgPT09IHVuZGVmaW5lZCA/IHRoaXMuJG9wdGlvbnMubWF4SXRlbVJvd3MgOiBpdGVtLm1heEl0ZW1Sb3dzO1xuICAgIGNvbnN0IG1pbkl0ZW1Sb3dzID0gaXRlbS5taW5JdGVtUm93cyA9PT0gdW5kZWZpbmVkID8gdGhpcy4kb3B0aW9ucy5taW5JdGVtUm93cyA6IGl0ZW0ubWluSXRlbVJvd3M7XG4gICAgY29uc3QgaW5Db2xzTGltaXRzID0gaXRlbS5jb2xzIDw9IG1heEl0ZW1Db2xzICYmIGl0ZW0uY29scyA+PSBtaW5JdGVtQ29scztcbiAgICBjb25zdCBpblJvd3NMaW1pdHMgPSBpdGVtLnJvd3MgPD0gbWF4SXRlbVJvd3MgJiYgaXRlbS5yb3dzID49IG1pbkl0ZW1Sb3dzO1xuICAgIGNvbnN0IG1pbkFyZWFMaW1pdCA9IGl0ZW0ubWluSXRlbUFyZWEgPT09IHVuZGVmaW5lZCA/IHRoaXMuJG9wdGlvbnMubWluSXRlbUFyZWEgOiBpdGVtLm1pbkl0ZW1BcmVhO1xuICAgIGNvbnN0IG1heEFyZWFMaW1pdCA9IGl0ZW0ubWF4SXRlbUFyZWEgPT09IHVuZGVmaW5lZCA/IHRoaXMuJG9wdGlvbnMubWF4SXRlbUFyZWEgOiBpdGVtLm1heEl0ZW1BcmVhO1xuICAgIGNvbnN0IGFyZWEgPSBpdGVtLmNvbHMgKiBpdGVtLnJvd3M7XG4gICAgY29uc3QgaW5NaW5BcmVhID0gbWluQXJlYUxpbWl0IDw9IGFyZWE7XG4gICAgY29uc3QgaW5NYXhBcmVhID0gbWF4QXJlYUxpbWl0ID49IGFyZWE7XG4gICAgcmV0dXJuICEobm9OZWdhdGl2ZVBvc2l0aW9uICYmIG1heEdyaWRDb2xzICYmIG1heEdyaWRSb3dzICYmIGluQ29sc0xpbWl0cyAmJiBpblJvd3NMaW1pdHMgJiYgaW5NaW5BcmVhICYmIGluTWF4QXJlYSk7XG4gIH1cblxuICBmaW5kSXRlbVdpdGhJdGVtKGl0ZW06IEdyaWRzdGVySXRlbSk6IEdyaWRzdGVySXRlbUNvbXBvbmVudEludGVyZmFjZSB8IGJvb2xlYW4ge1xuICAgIGxldCB3aWRnZXRzSW5kZXg6IG51bWJlciA9IHRoaXMuZ3JpZC5sZW5ndGggLSAxLCB3aWRnZXQ6IEdyaWRzdGVySXRlbUNvbXBvbmVudEludGVyZmFjZTtcbiAgICBmb3IgKDsgd2lkZ2V0c0luZGV4ID4gLTE7IHdpZGdldHNJbmRleC0tKSB7XG4gICAgICB3aWRnZXQgPSB0aGlzLmdyaWRbd2lkZ2V0c0luZGV4XTtcbiAgICAgIGlmICh3aWRnZXQuJGl0ZW0gIT09IGl0ZW0gJiYgR3JpZHN0ZXJDb21wb25lbnQuY2hlY2tDb2xsaXNpb25Ud29JdGVtcyh3aWRnZXQuJGl0ZW0sIGl0ZW0pKSB7XG4gICAgICAgIHJldHVybiB3aWRnZXQ7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGZpbmRJdGVtc1dpdGhJdGVtKGl0ZW06IEdyaWRzdGVySXRlbSk6IEFycmF5PEdyaWRzdGVySXRlbUNvbXBvbmVudEludGVyZmFjZT4ge1xuICAgIGNvbnN0IGE6IEFycmF5PEdyaWRzdGVySXRlbUNvbXBvbmVudEludGVyZmFjZT4gPSBbXTtcbiAgICBsZXQgd2lkZ2V0c0luZGV4OiBudW1iZXIgPSB0aGlzLmdyaWQubGVuZ3RoIC0gMSwgd2lkZ2V0OiBHcmlkc3Rlckl0ZW1Db21wb25lbnRJbnRlcmZhY2U7XG4gICAgZm9yICg7IHdpZGdldHNJbmRleCA+IC0xOyB3aWRnZXRzSW5kZXgtLSkge1xuICAgICAgd2lkZ2V0ID0gdGhpcy5ncmlkW3dpZGdldHNJbmRleF07XG4gICAgICBpZiAod2lkZ2V0LiRpdGVtICE9PSBpdGVtICYmIEdyaWRzdGVyQ29tcG9uZW50LmNoZWNrQ29sbGlzaW9uVHdvSXRlbXMod2lkZ2V0LiRpdGVtLCBpdGVtKSkge1xuICAgICAgICBhLnB1c2god2lkZ2V0KTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGE7XG4gIH1cblxuICBhdXRvUG9zaXRpb25JdGVtKGl0ZW1Db21wb25lbnQ6IEdyaWRzdGVySXRlbUNvbXBvbmVudEludGVyZmFjZSk6IHZvaWQge1xuICAgIGlmICh0aGlzLmdldE5leHRQb3NzaWJsZVBvc2l0aW9uKGl0ZW1Db21wb25lbnQuJGl0ZW0pKSB7XG4gICAgICBpdGVtQ29tcG9uZW50Lm5vdFBsYWNlZCA9IGZhbHNlO1xuICAgICAgaXRlbUNvbXBvbmVudC5pdGVtLnggPSBpdGVtQ29tcG9uZW50LiRpdGVtLng7XG4gICAgICBpdGVtQ29tcG9uZW50Lml0ZW0ueSA9IGl0ZW1Db21wb25lbnQuJGl0ZW0ueTtcbiAgICAgIGl0ZW1Db21wb25lbnQuaXRlbUNoYW5nZWQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaXRlbUNvbXBvbmVudC5ub3RQbGFjZWQgPSB0cnVlO1xuICAgICAgaWYgKCF0aGlzLiRvcHRpb25zLmRpc2FibGVXYXJuaW5ncykge1xuICAgICAgICBjb25zb2xlLndhcm4oJ0NhblxcJ3QgYmUgcGxhY2VkIGluIHRoZSBib3VuZHMgb2YgdGhlIGRhc2hib2FyZCEvbicgK1xuICAgICAgICAgIEpTT04uc3RyaW5naWZ5KGl0ZW1Db21wb25lbnQuaXRlbSwgWydjb2xzJywgJ3Jvd3MnLCAneCcsICd5J10pKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBnZXROZXh0UG9zc2libGVQb3NpdGlvbihuZXdJdGVtOiBHcmlkc3Rlckl0ZW0sIHN0YXJ0aW5nRnJvbTogeyB5PzogbnVtYmVyLCB4PzogbnVtYmVyIH0gPSB7fSk6IGJvb2xlYW4ge1xuICAgIGlmIChuZXdJdGVtLmNvbHMgPT09IC0xKSB7XG4gICAgICBuZXdJdGVtLmNvbHMgPSB0aGlzLiRvcHRpb25zLmRlZmF1bHRJdGVtQ29scztcbiAgICB9XG4gICAgaWYgKG5ld0l0ZW0ucm93cyA9PT0gLTEpIHtcbiAgICAgIG5ld0l0ZW0ucm93cyA9IHRoaXMuJG9wdGlvbnMuZGVmYXVsdEl0ZW1Sb3dzO1xuICAgIH1cbiAgICB0aGlzLnNldEdyaWREaW1lbnNpb25zKCk7XG4gICAgbGV0IHJvd3NJbmRleCA9IHN0YXJ0aW5nRnJvbS55IHx8IDAsIGNvbHNJbmRleDtcbiAgICBmb3IgKDsgcm93c0luZGV4IDwgdGhpcy5yb3dzOyByb3dzSW5kZXgrKykge1xuICAgICAgbmV3SXRlbS55ID0gcm93c0luZGV4O1xuICAgICAgY29sc0luZGV4ID0gc3RhcnRpbmdGcm9tLnggfHwgMDtcbiAgICAgIGZvciAoOyBjb2xzSW5kZXggPCB0aGlzLmNvbHVtbnM7IGNvbHNJbmRleCsrKSB7XG4gICAgICAgIG5ld0l0ZW0ueCA9IGNvbHNJbmRleDtcbiAgICAgICAgaWYgKCF0aGlzLmNoZWNrQ29sbGlzaW9uKG5ld0l0ZW0pKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgY2FuQWRkVG9Sb3dzID0gdGhpcy4kb3B0aW9ucy5tYXhSb3dzID49IHRoaXMucm93cyArIG5ld0l0ZW0ucm93cztcbiAgICBjb25zdCBjYW5BZGRUb0NvbHVtbnMgPSB0aGlzLiRvcHRpb25zLm1heENvbHMgPj0gdGhpcy5jb2x1bW5zICsgbmV3SXRlbS5jb2xzO1xuICAgIGNvbnN0IGFkZFRvUm93cyA9IHRoaXMucm93cyA8PSB0aGlzLmNvbHVtbnMgJiYgY2FuQWRkVG9Sb3dzO1xuICAgIGlmICghYWRkVG9Sb3dzICYmIGNhbkFkZFRvQ29sdW1ucykge1xuICAgICAgbmV3SXRlbS54ID0gdGhpcy5jb2x1bW5zO1xuICAgICAgbmV3SXRlbS55ID0gMDtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSBpZiAoY2FuQWRkVG9Sb3dzKSB7XG4gICAgICBuZXdJdGVtLnkgPSB0aGlzLnJvd3M7XG4gICAgICBuZXdJdGVtLnggPSAwO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGdldEZpcnN0UG9zc2libGVQb3NpdGlvbihpdGVtOiBHcmlkc3Rlckl0ZW0pOiBHcmlkc3Rlckl0ZW0ge1xuICAgIGNvbnN0IHRtcEl0ZW0gPSBPYmplY3QuYXNzaWduKHt9LCBpdGVtKTtcbiAgICB0aGlzLmdldE5leHRQb3NzaWJsZVBvc2l0aW9uKHRtcEl0ZW0pO1xuICAgIHJldHVybiB0bXBJdGVtO1xuICB9XG5cbiAgZ2V0TGFzdFBvc3NpYmxlUG9zaXRpb24oaXRlbTogR3JpZHN0ZXJJdGVtKTogR3JpZHN0ZXJJdGVtIHtcbiAgICBsZXQgZmFydGhlc3RJdGVtOiB7IHk6IG51bWJlciwgeDogbnVtYmVyIH0gPSB7eTogMCwgeDogMH07XG4gICAgZmFydGhlc3RJdGVtID0gdGhpcy5ncmlkLnJlZHVjZSgocHJldjogYW55LCBjdXJyOiBHcmlkc3Rlckl0ZW1Db21wb25lbnRJbnRlcmZhY2UpID0+IHtcbiAgICAgIGNvbnN0IGN1cnJDb29yZHMgPSB7eTogY3Vyci4kaXRlbS55ICsgY3Vyci4kaXRlbS5yb3dzIC0gMSwgeDogY3Vyci4kaXRlbS54ICsgY3Vyci4kaXRlbS5jb2xzIC0gMX07XG4gICAgICBpZiAoR3JpZHN0ZXJVdGlscy5jb21wYXJlSXRlbXMocHJldiwgY3VyckNvb3JkcykgPT09IDEpIHtcbiAgICAgICAgcmV0dXJuIGN1cnJDb29yZHM7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gcHJldjtcbiAgICAgIH1cbiAgICB9LCBmYXJ0aGVzdEl0ZW0pO1xuXG4gICAgY29uc3QgdG1wSXRlbSA9IE9iamVjdC5hc3NpZ24oe30sIGl0ZW0pO1xuICAgIHRoaXMuZ2V0TmV4dFBvc3NpYmxlUG9zaXRpb24odG1wSXRlbSwgZmFydGhlc3RJdGVtKTtcbiAgICByZXR1cm4gdG1wSXRlbTtcbiAgfVxuXG4gIHBpeGVsc1RvUG9zaXRpb25YKHg6IG51bWJlciwgcm91bmRpbmdNZXRob2Q6IEZ1bmN0aW9uLCBub0xpbWl0PzogYm9vbGVhbik6IG51bWJlciB7XG4gICAgY29uc3QgcG9zaXRpb24gPSByb3VuZGluZ01ldGhvZCh4IC8gdGhpcy5jdXJDb2xXaWR0aCk7XG4gICAgaWYgKG5vTGltaXQpIHtcbiAgICAgIHJldHVybiBwb3NpdGlvbjtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIE1hdGgubWF4KHBvc2l0aW9uLCAwKTtcbiAgICB9XG4gIH1cblxuICBwaXhlbHNUb1Bvc2l0aW9uWSh5OiBudW1iZXIsIHJvdW5kaW5nTWV0aG9kOiBGdW5jdGlvbiwgbm9MaW1pdD86IGJvb2xlYW4pOiBudW1iZXIge1xuICAgIGNvbnN0IHBvc2l0aW9uID0gcm91bmRpbmdNZXRob2QoeSAvIHRoaXMuY3VyUm93SGVpZ2h0KTtcbiAgICBpZiAobm9MaW1pdCkge1xuICAgICAgcmV0dXJuIHBvc2l0aW9uO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gTWF0aC5tYXgocG9zaXRpb24sIDApO1xuICAgIH1cbiAgfVxuXG4gIHBvc2l0aW9uWFRvUGl4ZWxzKHg6IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIHggKiB0aGlzLmN1ckNvbFdpZHRoO1xuICB9XG5cbiAgcG9zaXRpb25ZVG9QaXhlbHMoeTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4geSAqIHRoaXMuY3VyUm93SGVpZ2h0O1xuICB9XG59XG4iXX0=
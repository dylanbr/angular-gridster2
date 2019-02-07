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
export class GridsterComponent {
    /**
     * @param {?} el
     * @param {?} renderer
     * @param {?} cdRef
     * @param {?} zone
     */
    constructor(el, renderer, cdRef, zone) {
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
    static checkCollisionTwoItems(item, item2) {
        return item.x < item2.x + item2.cols
            && item.x + item.cols > item2.x
            && item.y < item2.y + item2.rows
            && item.y + item.rows > item2.y;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (this.options.initCallback) {
            this.options.initCallback(this);
        }
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
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
    }
    /**
     * @return {?}
     */
    resize() {
        /** @type {?} */
        let height;
        /** @type {?} */
        let width;
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
    }
    /**
     * @return {?}
     */
    setOptions() {
        this.$options = GridsterUtils.merge(this.$options, this.options, this.$options);
        if (!this.$options.disableWindowResize && !this.windowResize) {
            this.windowResize = this.renderer.listen('window', 'resize', this.onResize.bind(this));
        }
        else if (this.$options.disableWindowResize && this.windowResize) {
            this.windowResize();
            this.windowResize = null;
        }
        this.emptyCell.updateOptions();
    }
    /**
     * @return {?}
     */
    optionsChanged() {
        this.setOptions();
        /** @type {?} */
        let widgetsIndex = this.grid.length - 1;
        /** @type {?} */
        let widget;
        for (; widgetsIndex >= 0; widgetsIndex--) {
            widget = this.grid[widgetsIndex];
            widget.updateOptions();
        }
        this.calculateLayout();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
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
    }
    /**
     * @return {?}
     */
    onResize() {
        this.setGridSize();
        this.calculateLayout();
    }
    /**
     * @return {?}
     */
    checkIfToResize() {
        /** @type {?} */
        const clientWidth = this.el.clientWidth;
        /** @type {?} */
        const offsetWidth = this.el.offsetWidth;
        /** @type {?} */
        const scrollWidth = this.el.scrollWidth;
        /** @type {?} */
        const clientHeight = this.el.clientHeight;
        /** @type {?} */
        const offsetHeight = this.el.offsetHeight;
        /** @type {?} */
        const scrollHeight = this.el.scrollHeight;
        /** @type {?} */
        const verticalScrollPresent = clientWidth < offsetWidth && scrollHeight > offsetHeight
            && scrollHeight - offsetHeight < offsetWidth - clientWidth;
        /** @type {?} */
        const horizontalScrollPresent = clientHeight < offsetHeight
            && scrollWidth > offsetWidth && scrollWidth - offsetWidth < offsetHeight - clientHeight;
        if (verticalScrollPresent) {
            return false;
        }
        return !horizontalScrollPresent;
    }
    /**
     * @return {?}
     */
    setGridSize() {
        /** @type {?} */
        const el = this.el;
        /** @type {?} */
        let width = el.clientWidth;
        /** @type {?} */
        let height = el.clientHeight;
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
    }
    /**
     * @return {?}
     */
    setGridDimensions() {
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
        let rows = this.$options.minRows;
        /** @type {?} */
        let columns = this.$options.minCols;
        /** @type {?} */
        let widgetsIndex = this.grid.length - 1;
        /** @type {?} */
        let widget;
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
    }
    /**
     * @return {?}
     */
    calculateLayout() {
        if (this.compact) {
            this.compact.checkCompact();
        }
        this.setGridDimensions();
        if (this.$options.outerMargin) {
            /** @type {?} */
            let marginWidth = -this.$options.margin;
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
            let marginHeight = -this.$options.margin;
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
        let widgetsIndex = this.grid.length - 1;
        /** @type {?} */
        let widget;
        for (; widgetsIndex >= 0; widgetsIndex--) {
            widget = this.grid[widgetsIndex];
            widget.setSize();
            widget.drag.toggle();
            widget.resize.toggle();
        }
        setTimeout(this.resize.bind(this), 100);
    }
    /**
     * @return {?}
     */
    updateGrid() {
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
    }
    /**
     * @param {?} itemComponent
     * @return {?}
     */
    addItem(itemComponent) {
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
    }
    /**
     * @param {?} itemComponent
     * @return {?}
     */
    removeItem(itemComponent) {
        this.grid.splice(this.grid.indexOf(itemComponent), 1);
        this.calculateLayoutDebounce();
        if (this.options.itemRemovedCallback) {
            this.options.itemRemovedCallback(itemComponent.item, itemComponent);
        }
    }
    /**
     * @param {?} item
     * @return {?}
     */
    checkCollision(item) {
        /** @type {?} */
        let collision = false;
        if (this.options.itemValidateCallback) {
            collision = !this.options.itemValidateCallback(item);
        }
        if (!collision && this.checkGridCollision(item)) {
            collision = true;
        }
        if (!collision) {
            /** @type {?} */
            const c = this.findItemWithItem(item);
            if (c) {
                collision = c;
            }
        }
        return collision;
    }
    /**
     * @param {?} item
     * @return {?}
     */
    checkGridCollision(item) {
        /** @type {?} */
        const noNegativePosition = item.y > -1 && item.x > -1;
        /** @type {?} */
        const maxGridCols = item.cols + item.x <= this.$options.maxCols;
        /** @type {?} */
        const maxGridRows = item.rows + item.y <= this.$options.maxRows;
        /** @type {?} */
        const maxItemCols = item.maxItemCols === undefined ? this.$options.maxItemCols : item.maxItemCols;
        /** @type {?} */
        const minItemCols = item.minItemCols === undefined ? this.$options.minItemCols : item.minItemCols;
        /** @type {?} */
        const maxItemRows = item.maxItemRows === undefined ? this.$options.maxItemRows : item.maxItemRows;
        /** @type {?} */
        const minItemRows = item.minItemRows === undefined ? this.$options.minItemRows : item.minItemRows;
        /** @type {?} */
        const inColsLimits = item.cols <= maxItemCols && item.cols >= minItemCols;
        /** @type {?} */
        const inRowsLimits = item.rows <= maxItemRows && item.rows >= minItemRows;
        /** @type {?} */
        const minAreaLimit = item.minItemArea === undefined ? this.$options.minItemArea : item.minItemArea;
        /** @type {?} */
        const maxAreaLimit = item.maxItemArea === undefined ? this.$options.maxItemArea : item.maxItemArea;
        /** @type {?} */
        const area = item.cols * item.rows;
        /** @type {?} */
        const inMinArea = minAreaLimit <= area;
        /** @type {?} */
        const inMaxArea = maxAreaLimit >= area;
        return !(noNegativePosition && maxGridCols && maxGridRows && inColsLimits && inRowsLimits && inMinArea && inMaxArea);
    }
    /**
     * @param {?} item
     * @return {?}
     */
    findItemWithItem(item) {
        /** @type {?} */
        let widgetsIndex = this.grid.length - 1;
        /** @type {?} */
        let widget;
        for (; widgetsIndex > -1; widgetsIndex--) {
            widget = this.grid[widgetsIndex];
            if (widget.$item !== item && GridsterComponent.checkCollisionTwoItems(widget.$item, item)) {
                return widget;
            }
        }
        return false;
    }
    /**
     * @param {?} item
     * @return {?}
     */
    findItemsWithItem(item) {
        /** @type {?} */
        const a = [];
        /** @type {?} */
        let widgetsIndex = this.grid.length - 1;
        /** @type {?} */
        let widget;
        for (; widgetsIndex > -1; widgetsIndex--) {
            widget = this.grid[widgetsIndex];
            if (widget.$item !== item && GridsterComponent.checkCollisionTwoItems(widget.$item, item)) {
                a.push(widget);
            }
        }
        return a;
    }
    /**
     * @param {?} itemComponent
     * @return {?}
     */
    autoPositionItem(itemComponent) {
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
    }
    /**
     * @param {?} newItem
     * @param {?=} startingFrom
     * @return {?}
     */
    getNextPossiblePosition(newItem, startingFrom = {}) {
        if (newItem.cols === -1) {
            newItem.cols = this.$options.defaultItemCols;
        }
        if (newItem.rows === -1) {
            newItem.rows = this.$options.defaultItemRows;
        }
        this.setGridDimensions();
        /** @type {?} */
        let rowsIndex = startingFrom.y || 0;
        /** @type {?} */
        let colsIndex;
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
        const canAddToRows = this.$options.maxRows >= this.rows + newItem.rows;
        /** @type {?} */
        const canAddToColumns = this.$options.maxCols >= this.columns + newItem.cols;
        /** @type {?} */
        const addToRows = this.rows <= this.columns && canAddToRows;
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
    }
    /**
     * @param {?} item
     * @return {?}
     */
    getFirstPossiblePosition(item) {
        /** @type {?} */
        const tmpItem = Object.assign({}, item);
        this.getNextPossiblePosition(tmpItem);
        return tmpItem;
    }
    /**
     * @param {?} item
     * @return {?}
     */
    getLastPossiblePosition(item) {
        /** @type {?} */
        let farthestItem = { y: 0, x: 0 };
        farthestItem = this.grid.reduce((prev, curr) => {
            /** @type {?} */
            const currCoords = { y: curr.$item.y + curr.$item.rows - 1, x: curr.$item.x + curr.$item.cols - 1 };
            if (GridsterUtils.compareItems(prev, currCoords) === 1) {
                return currCoords;
            }
            else {
                return prev;
            }
        }, farthestItem);
        /** @type {?} */
        const tmpItem = Object.assign({}, item);
        this.getNextPossiblePosition(tmpItem, farthestItem);
        return tmpItem;
    }
    /**
     * @param {?} x
     * @param {?} roundingMethod
     * @param {?=} noLimit
     * @return {?}
     */
    pixelsToPositionX(x, roundingMethod, noLimit) {
        /** @type {?} */
        const position = roundingMethod(x / this.curColWidth);
        if (noLimit) {
            return position;
        }
        else {
            return Math.max(position, 0);
        }
    }
    /**
     * @param {?} y
     * @param {?} roundingMethod
     * @param {?=} noLimit
     * @return {?}
     */
    pixelsToPositionY(y, roundingMethod, noLimit) {
        /** @type {?} */
        const position = roundingMethod(y / this.curRowHeight);
        if (noLimit) {
            return position;
        }
        else {
            return Math.max(position, 0);
        }
    }
    /**
     * @param {?} x
     * @return {?}
     */
    positionXToPixels(x) {
        return x * this.curColWidth;
    }
    /**
     * @param {?} y
     * @return {?}
     */
    positionYToPixels(y) {
        return y * this.curRowHeight;
    }
}
GridsterComponent.decorators = [
    { type: Component, args: [{
                selector: 'gridster',
                template: "<div class=\"gridster-column\" *ngFor=\"let column of gridColumns; let i = index;\"\n     [ngStyle]=\"gridRenderer.getGridColumnStyle(i)\"></div>\n<div class=\"gridster-row\" *ngFor=\"let row of gridRows; let i = index;\"\n     [ngStyle]=\"gridRenderer.getGridRowStyle(i)\"></div>\n<ng-content></ng-content>\n<gridster-preview class=\"gridster-preview\"></gridster-preview>\n",
                encapsulation: ViewEncapsulation.None,
                styles: ["gridster{position:relative;box-sizing:border-box;background:grey;width:100%;height:100%;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;display:block}gridster.fit{overflow-x:hidden;overflow-y:hidden}gridster.scrollVertical{overflow-x:hidden;overflow-y:auto}gridster.scrollHorizontal{overflow-x:auto;overflow-y:hidden}gridster.fixed{overflow:auto}gridster.mobile{overflow-x:hidden;overflow-y:auto}gridster.mobile gridster-item{position:relative}gridster .gridster-column,gridster .gridster-row{position:absolute;display:none;transition:.3s;box-sizing:border-box}gridster.display-grid .gridster-column,gridster.display-grid .gridster-row{display:block}gridster .gridster-column{border-left:1px solid #fff;border-right:1px solid #fff}gridster .gridster-row{border-top:1px solid #fff;border-bottom:1px solid #fff}"]
            }] }
];
/** @nocollapse */
GridsterComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: ChangeDetectorRef },
    { type: NgZone }
];
GridsterComponent.propDecorators = {
    options: [{ type: Input }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZHN0ZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1ncmlkc3RlcjIvIiwic291cmNlcyI6WyJsaWIvZ3JpZHN0ZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsS0FBSyxFQUNMLE1BQU0sRUFJTixTQUFTLEVBRVQsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBRWhFLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUN0RCxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSw2QkFBNkIsQ0FBQztBQUM5RCxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFJMUQsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sNEJBQTRCLENBQUM7QUFTNUQsTUFBTSxPQUFPLGlCQUFpQjs7Ozs7OztJQXVCNUIsWUFBWSxFQUFjLEVBQVMsUUFBbUIsRUFBUyxLQUF3QixFQUFTLElBQVk7UUFBekUsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUFTLFVBQUssR0FBTCxLQUFLLENBQW1CO1FBQVMsU0FBSSxHQUFKLElBQUksQ0FBUTtRQVI1RyxnQkFBVyxHQUFHLEVBQUUsQ0FBQztRQUNqQixhQUFRLEdBQUcsRUFBRSxDQUFDO1FBUVosSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsYUFBYSxDQUFDO1FBQzNCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQztRQUNsRSxJQUFJLENBQUMsdUJBQXVCLEdBQUcsYUFBYSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJ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VyxDQUFDO0lBQzlCLENBQUM7Ozs7O0lBRUQsaUJBQWlCLENBQUMsQ0FBUztRQUN6QixPQUFPLENBQUMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQy9CLENBQUM7OztZQXRkRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLFVBQVU7Z0JBQ3BCLG1ZQUE4QjtnQkFFOUIsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7O2FBQ3RDOzs7O1lBM0JDLFVBQVU7WUFNVixTQUFTO1lBUlQsaUJBQWlCO1lBSWpCLE1BQU07OztzQkEyQkwsS0FBSzs7OztJQUFOLG9DQUFpQzs7SUFDakMsb0RBQW9DOztJQUNwQyx1Q0FBZ0M7O0lBQ2hDLHlDQUF5Qjs7SUFDekIsK0JBQVE7O0lBQ1IscUNBQTBCOztJQUMxQixtQ0FBZ0I7O0lBQ2hCLHFDQUFpQjs7SUFDakIsc0NBQWtCOztJQUNsQixpQ0FBNEM7O0lBQzVDLG9DQUFnQjs7SUFDaEIsaUNBQWE7O0lBQ2Isd0NBQW9COztJQUNwQix5Q0FBcUI7O0lBQ3JCLHdDQUFpQjs7SUFDakIscUNBQWM7O0lBQ2QseUNBQWtDOztJQUNsQywyQ0FBd0I7O0lBQ3hCLHNDQUE2Qjs7SUFDN0Isb0NBQXlCOztJQUN6Qix5Q0FBK0I7O0lBRUgscUNBQTBCOztJQUFFLGtDQUErQjs7SUFBRSxpQ0FBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBJbnB1dCxcbiAgTmdab25lLFxuICBPbkNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBSZW5kZXJlcjIsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge0dyaWRzdGVyQ29uZmlnU2VydmljZX0gZnJvbSAnLi9ncmlkc3RlckNvbmZpZy5jb25zdGFudCc7XG5pbXBvcnQge0dyaWRzdGVyQ29uZmlnfSBmcm9tICcuL2dyaWRzdGVyQ29uZmlnLmludGVyZmFjZSc7XG5pbXBvcnQge0dyaWRzdGVyVXRpbHN9IGZyb20gJy4vZ3JpZHN0ZXJVdGlscy5zZXJ2aWNlJztcbmltcG9ydCB7R3JpZHN0ZXJFbXB0eUNlbGx9IGZyb20gJy4vZ3JpZHN0ZXJFbXB0eUNlbGwuc2VydmljZSc7XG5pbXBvcnQge0dyaWRzdGVyQ29tcGFjdH0gZnJvbSAnLi9ncmlkc3RlckNvbXBhY3Quc2VydmljZSc7XG5pbXBvcnQge0dyaWRzdGVyQ29uZmlnU30gZnJvbSAnLi9ncmlkc3RlckNvbmZpZ1MuaW50ZXJmYWNlJztcbmltcG9ydCB7R3JpZHN0ZXJDb21wb25lbnRJbnRlcmZhY2V9IGZyb20gJy4vZ3JpZHN0ZXIuaW50ZXJmYWNlJztcbmltcG9ydCB7R3JpZHN0ZXJJdGVtQ29tcG9uZW50SW50ZXJmYWNlfSBmcm9tICcuL2dyaWRzdGVySXRlbUNvbXBvbmVudC5pbnRlcmZhY2UnO1xuaW1wb3J0IHtHcmlkc3RlclJlbmRlcmVyfSBmcm9tICcuL2dyaWRzdGVyUmVuZGVyZXIuc2VydmljZSc7XG5pbXBvcnQge0dyaWRzdGVySXRlbX0gZnJvbSAnLi9ncmlkc3Rlckl0ZW0uaW50ZXJmYWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZ3JpZHN0ZXInLFxuICB0ZW1wbGF0ZVVybDogJy4vZ3JpZHN0ZXIuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2dyaWRzdGVyLmNzcyddLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuZXhwb3J0IGNsYXNzIEdyaWRzdGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSwgR3JpZHN0ZXJDb21wb25lbnRJbnRlcmZhY2Uge1xuICBASW5wdXQoKSBvcHRpb25zOiBHcmlkc3RlckNvbmZpZztcbiAgY2FsY3VsYXRlTGF5b3V0RGVib3VuY2U6ICgpID0+IHZvaWQ7XG4gIG1vdmluZ0l0ZW06IEdyaWRzdGVySXRlbSB8IG51bGw7XG4gIHByZXZpZXdTdHlsZTogKCkgPT4gdm9pZDtcbiAgZWw6IGFueTtcbiAgJG9wdGlvbnM6IEdyaWRzdGVyQ29uZmlnUztcbiAgbW9iaWxlOiBib29sZWFuO1xuICBjdXJXaWR0aDogbnVtYmVyO1xuICBjdXJIZWlnaHQ6IG51bWJlcjtcbiAgZ3JpZDogQXJyYXk8R3JpZHN0ZXJJdGVtQ29tcG9uZW50SW50ZXJmYWNlPjtcbiAgY29sdW1uczogbnVtYmVyO1xuICByb3dzOiBudW1iZXI7XG4gIGN1ckNvbFdpZHRoOiBudW1iZXI7XG4gIGN1clJvd0hlaWdodDogbnVtYmVyO1xuICBncmlkQ29sdW1ucyA9IFtdO1xuICBncmlkUm93cyA9IFtdO1xuICB3aW5kb3dSZXNpemU6ICgoKSA9PiB2b2lkKSB8IG51bGw7XG4gIGRyYWdJblByb2dyZXNzOiBib29sZWFuO1xuICBlbXB0eUNlbGw6IEdyaWRzdGVyRW1wdHlDZWxsO1xuICBjb21wYWN0OiBHcmlkc3RlckNvbXBhY3Q7XG4gIGdyaWRSZW5kZXJlcjogR3JpZHN0ZXJSZW5kZXJlcjtcblxuICBjb25zdHJ1Y3RvcihlbDogRWxlbWVudFJlZiwgcHVibGljIHJlbmRlcmVyOiBSZW5kZXJlcjIsIHB1YmxpYyBjZFJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsIHB1YmxpYyB6b25lOiBOZ1pvbmUpIHtcbiAgICB0aGlzLmVsID0gZWwubmF0aXZlRWxlbWVudDtcbiAgICB0aGlzLiRvcHRpb25zID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShHcmlkc3RlckNvbmZpZ1NlcnZpY2UpKTtcbiAgICB0aGlzLmNhbGN1bGF0ZUxheW91dERlYm91bmNlID0gR3JpZHN0ZXJVdGlscy5kZWJvdW5jZSh0aGlzLmNhbGN1bGF0ZUxheW91dC5iaW5kKHRoaXMpLCAwKTtcbiAgICB0aGlzLm1vYmlsZSA9IGZhbHNlO1xuICAgIHRoaXMuY3VyV2lkdGggPSAwO1xuICAgIHRoaXMuY3VySGVpZ2h0ID0gMDtcbiAgICB0aGlzLmdyaWQgPSBbXTtcbiAgICB0aGlzLmN1ckNvbFdpZHRoID0gMDtcbiAgICB0aGlzLmN1clJvd0hlaWdodCA9IDA7XG4gICAgdGhpcy5kcmFnSW5Qcm9ncmVzcyA9IGZhbHNlO1xuICAgIHRoaXMuZW1wdHlDZWxsID0gbmV3IEdyaWRzdGVyRW1wdHlDZWxsKHRoaXMpO1xuICAgIHRoaXMuY29tcGFjdCA9IG5ldyBHcmlkc3RlckNvbXBhY3QodGhpcyk7XG4gICAgdGhpcy5ncmlkUmVuZGVyZXIgPSBuZXcgR3JpZHN0ZXJSZW5kZXJlcih0aGlzKTtcbiAgfVxuXG4gIHN0YXRpYyBjaGVja0NvbGxpc2lvblR3b0l0ZW1zKGl0ZW06IEdyaWRzdGVySXRlbSwgaXRlbTI6IEdyaWRzdGVySXRlbSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBpdGVtLnggPCBpdGVtMi54ICsgaXRlbTIuY29sc1xuICAgICAgJiYgaXRlbS54ICsgaXRlbS5jb2xzID4gaXRlbTIueFxuICAgICAgJiYgaXRlbS55IDwgaXRlbTIueSArIGl0ZW0yLnJvd3NcbiAgICAgICYmIGl0ZW0ueSArIGl0ZW0ucm93cyA+IGl0ZW0yLnk7XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5vcHRpb25zLmluaXRDYWxsYmFjaykge1xuICAgICAgdGhpcy5vcHRpb25zLmluaXRDYWxsYmFjayh0aGlzKTtcbiAgICB9XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYgKGNoYW5nZXMub3B0aW9ucykge1xuICAgICAgdGhpcy5zZXRPcHRpb25zKCk7XG4gICAgICB0aGlzLm9wdGlvbnMuYXBpID0ge1xuICAgICAgICBvcHRpb25zQ2hhbmdlZDogdGhpcy5vcHRpb25zQ2hhbmdlZC5iaW5kKHRoaXMpLFxuICAgICAgICByZXNpemU6IHRoaXMub25SZXNpemUuYmluZCh0aGlzKSxcbiAgICAgICAgZ2V0TmV4dFBvc3NpYmxlUG9zaXRpb246IHRoaXMuZ2V0TmV4dFBvc3NpYmxlUG9zaXRpb24uYmluZCh0aGlzKSxcbiAgICAgICAgZ2V0Rmlyc3RQb3NzaWJsZVBvc2l0aW9uOiB0aGlzLmdldEZpcnN0UG9zc2libGVQb3NpdGlvbi5iaW5kKHRoaXMpLFxuICAgICAgICBnZXRMYXN0UG9zc2libGVQb3NpdGlvbjogdGhpcy5nZXRMYXN0UG9zc2libGVQb3NpdGlvbi5iaW5kKHRoaXMpLFxuICAgICAgfTtcbiAgICAgIHRoaXMuY29sdW1ucyA9IHRoaXMuJG9wdGlvbnMubWluQ29scztcbiAgICAgIHRoaXMucm93cyA9IHRoaXMuJG9wdGlvbnMubWluUm93cztcbiAgICAgIHRoaXMuc2V0R3JpZFNpemUoKTtcbiAgICAgIHRoaXMuY2FsY3VsYXRlTGF5b3V0KCk7XG4gICAgfVxuICB9XG5cbiAgcmVzaXplKCk6IHZvaWQge1xuICAgIGxldCBoZWlnaHQ7XG4gICAgbGV0IHdpZHRoO1xuICAgIGlmICh0aGlzLiRvcHRpb25zLmdyaWRUeXBlID09PSAnZml0JyAmJiAhdGhpcy5tb2JpbGUpIHtcbiAgICAgIHdpZHRoID0gdGhpcy5lbC5vZmZzZXRXaWR0aDtcbiAgICAgIGhlaWdodCA9IHRoaXMuZWwub2Zmc2V0SGVpZ2h0O1xuICAgIH0gZWxzZSB7XG4gICAgICB3aWR0aCA9IHRoaXMuZWwuY2xpZW50V2lkdGg7XG4gICAgICBoZWlnaHQgPSB0aGlzLmVsLmNsaWVudEhlaWdodDtcbiAgICB9XG4gICAgaWYgKCh3aWR0aCAhPT0gdGhpcy5jdXJXaWR0aCB8fCBoZWlnaHQgIT09IHRoaXMuY3VySGVpZ2h0KSAmJiB0aGlzLmNoZWNrSWZUb1Jlc2l6ZSgpKSB7XG4gICAgICB0aGlzLm9uUmVzaXplKCk7XG4gICAgfVxuICB9XG5cbiAgc2V0T3B0aW9ucygpOiB2b2lkIHtcbiAgICB0aGlzLiRvcHRpb25zID0gR3JpZHN0ZXJVdGlscy5tZXJnZSh0aGlzLiRvcHRpb25zLCB0aGlzLm9wdGlvbnMsIHRoaXMuJG9wdGlvbnMpO1xuICAgIGlmICghdGhpcy4kb3B0aW9ucy5kaXNhYmxlV2luZG93UmVzaXplICYmICF0aGlzLndpbmRvd1Jlc2l6ZSkge1xuICAgICAgdGhpcy53aW5kb3dSZXNpemUgPSB0aGlzLnJlbmRlcmVyLmxpc3Rlbignd2luZG93JywgJ3Jlc2l6ZScsIHRoaXMub25SZXNpemUuYmluZCh0aGlzKSk7XG4gICAgfSBlbHNlIGlmICh0aGlzLiRvcHRpb25zLmRpc2FibGVXaW5kb3dSZXNpemUgJiYgdGhpcy53aW5kb3dSZXNpemUpIHtcbiAgICAgIHRoaXMud2luZG93UmVzaXplKCk7XG4gICAgICB0aGlzLndpbmRvd1Jlc2l6ZSA9IG51bGw7XG4gICAgfVxuICAgIHRoaXMuZW1wdHlDZWxsLnVwZGF0ZU9wdGlvbnMoKTtcbiAgfVxuXG4gIG9wdGlvbnNDaGFuZ2VkKCk6IHZvaWQge1xuICAgIHRoaXMuc2V0T3B0aW9ucygpO1xuICAgIGxldCB3aWRnZXRzSW5kZXg6IG51bWJlciA9IHRoaXMuZ3JpZC5sZW5ndGggLSAxLCB3aWRnZXQ6IEdyaWRzdGVySXRlbUNvbXBvbmVudEludGVyZmFjZTtcbiAgICBmb3IgKDsgd2lkZ2V0c0luZGV4ID49IDA7IHdpZGdldHNJbmRleC0tKSB7XG4gICAgICB3aWRnZXQgPSB0aGlzLmdyaWRbd2lkZ2V0c0luZGV4XTtcbiAgICAgIHdpZGdldC51cGRhdGVPcHRpb25zKCk7XG4gICAgfVxuICAgIHRoaXMuY2FsY3VsYXRlTGF5b3V0KCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy53aW5kb3dSZXNpemUpIHtcbiAgICAgIHRoaXMud2luZG93UmVzaXplKCk7XG4gICAgfVxuICAgIGlmICh0aGlzLm9wdGlvbnMuZGVzdHJveUNhbGxiYWNrKSB7XG4gICAgICB0aGlzLm9wdGlvbnMuZGVzdHJveUNhbGxiYWNrKHRoaXMpO1xuICAgIH1cbiAgICBpZiAodGhpcy5vcHRpb25zLmFwaSkge1xuICAgICAgdGhpcy5vcHRpb25zLmFwaS5yZXNpemUgPSB1bmRlZmluZWQ7XG4gICAgICB0aGlzLm9wdGlvbnMuYXBpLm9wdGlvbnNDaGFuZ2VkID0gdW5kZWZpbmVkO1xuICAgICAgdGhpcy5vcHRpb25zLmFwaS5nZXROZXh0UG9zc2libGVQb3NpdGlvbiA9IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMub3B0aW9ucy5hcGkgPSB1bmRlZmluZWQ7XG4gICAgfVxuICAgIHRoaXMuZW1wdHlDZWxsLmRlc3Ryb3koKTtcbiAgICBkZWxldGUgdGhpcy5lbXB0eUNlbGw7XG4gICAgdGhpcy5jb21wYWN0LmRlc3Ryb3koKTtcbiAgICBkZWxldGUgdGhpcy5jb21wYWN0O1xuICB9XG5cbiAgb25SZXNpemUoKTogdm9pZCB7XG4gICAgdGhpcy5zZXRHcmlkU2l6ZSgpO1xuICAgIHRoaXMuY2FsY3VsYXRlTGF5b3V0KCk7XG4gIH1cblxuICBjaGVja0lmVG9SZXNpemUoKTogYm9vbGVhbiB7XG4gICAgY29uc3QgY2xpZW50V2lkdGggPSB0aGlzLmVsLmNsaWVudFdpZHRoO1xuICAgIGNvbnN0IG9mZnNldFdpZHRoID0gdGhpcy5lbC5vZmZzZXRXaWR0aDtcbiAgICBjb25zdCBzY3JvbGxXaWR0aCA9IHRoaXMuZWwuc2Nyb2xsV2lkdGg7XG4gICAgY29uc3QgY2xpZW50SGVpZ2h0ID0gdGhpcy5lbC5jbGllbnRIZWlnaHQ7XG4gICAgY29uc3Qgb2Zmc2V0SGVpZ2h0ID0gdGhpcy5lbC5vZmZzZXRIZWlnaHQ7XG4gICAgY29uc3Qgc2Nyb2xsSGVpZ2h0ID0gdGhpcy5lbC5zY3JvbGxIZWlnaHQ7XG4gICAgY29uc3QgdmVydGljYWxTY3JvbGxQcmVzZW50ID0gY2xpZW50V2lkdGggPCBvZmZzZXRXaWR0aCAmJiBzY3JvbGxIZWlnaHQgPiBvZmZzZXRIZWlnaHRcbiAgICAgICYmIHNjcm9sbEhlaWdodCAtIG9mZnNldEhlaWdodCA8IG9mZnNldFdpZHRoIC0gY2xpZW50V2lkdGg7XG4gICAgY29uc3QgaG9yaXpvbnRhbFNjcm9sbFByZXNlbnQgPSBjbGllbnRIZWlnaHQgPCBvZmZzZXRIZWlnaHRcbiAgICAgICYmIHNjcm9sbFdpZHRoID4gb2Zmc2V0V2lkdGggJiYgc2Nyb2xsV2lkdGggLSBvZmZzZXRXaWR0aCA8IG9mZnNldEhlaWdodCAtIGNsaWVudEhlaWdodDtcbiAgICBpZiAodmVydGljYWxTY3JvbGxQcmVzZW50KSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiAhaG9yaXpvbnRhbFNjcm9sbFByZXNlbnQ7XG4gIH1cblxuICBzZXRHcmlkU2l6ZSgpOiB2b2lkIHtcbiAgICBjb25zdCBlbCA9IHRoaXMuZWw7XG4gICAgbGV0IHdpZHRoID0gZWwuY2xpZW50V2lkdGg7XG4gICAgbGV0IGhlaWdodCA9IGVsLmNsaWVudEhlaWdodDtcbiAgICBpZiAodGhpcy4kb3B0aW9ucy5zZXRHcmlkU2l6ZSB8fCB0aGlzLiRvcHRpb25zLmdyaWRUeXBlID09PSAnZml0JyAmJiAhdGhpcy5tb2JpbGUpIHtcbiAgICAgIHdpZHRoID0gZWwub2Zmc2V0V2lkdGg7XG4gICAgICBoZWlnaHQgPSBlbC5vZmZzZXRIZWlnaHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHdpZHRoID0gZWwuY2xpZW50V2lkdGg7XG4gICAgICBoZWlnaHQgPSBlbC5jbGllbnRIZWlnaHQ7XG4gICAgfVxuICAgIHRoaXMuY3VyV2lkdGggPSB3aWR0aDtcbiAgICB0aGlzLmN1ckhlaWdodCA9IGhlaWdodDtcbiAgfVxuXG4gIHNldEdyaWREaW1lbnNpb25zKCk6IHZvaWQge1xuICAgIHRoaXMuc2V0R3JpZFNpemUoKTtcbiAgICBpZiAoIXRoaXMubW9iaWxlICYmIHRoaXMuJG9wdGlvbnMubW9iaWxlQnJlYWtwb2ludCA+IHRoaXMuY3VyV2lkdGgpIHtcbiAgICAgIHRoaXMubW9iaWxlID0gIXRoaXMubW9iaWxlO1xuICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmVsLCAnbW9iaWxlJyk7XG4gICAgfSBlbHNlIGlmICh0aGlzLm1vYmlsZSAmJiB0aGlzLiRvcHRpb25zLm1vYmlsZUJyZWFrcG9pbnQgPCB0aGlzLmN1cldpZHRoKSB7XG4gICAgICB0aGlzLm1vYmlsZSA9ICF0aGlzLm1vYmlsZTtcbiAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5lbCwgJ21vYmlsZScpO1xuICAgIH1cbiAgICBsZXQgcm93cyA9IHRoaXMuJG9wdGlvbnMubWluUm93cywgY29sdW1ucyA9IHRoaXMuJG9wdGlvbnMubWluQ29scztcblxuICAgIGxldCB3aWRnZXRzSW5kZXggPSB0aGlzLmdyaWQubGVuZ3RoIC0gMSwgd2lkZ2V0O1xuICAgIGZvciAoOyB3aWRnZXRzSW5kZXggPj0gMDsgd2lkZ2V0c0luZGV4LS0pIHtcbiAgICAgIHdpZGdldCA9IHRoaXMuZ3JpZFt3aWRnZXRzSW5kZXhdO1xuICAgICAgaWYgKCF3aWRnZXQubm90UGxhY2VkKSB7XG4gICAgICAgIHJvd3MgPSBNYXRoLm1heChyb3dzLCB3aWRnZXQuJGl0ZW0ueSArIHdpZGdldC4kaXRlbS5yb3dzKTtcbiAgICAgICAgY29sdW1ucyA9IE1hdGgubWF4KGNvbHVtbnMsIHdpZGdldC4kaXRlbS54ICsgd2lkZ2V0LiRpdGVtLmNvbHMpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLmNvbHVtbnMgIT09IGNvbHVtbnMgfHwgdGhpcy5yb3dzICE9PSByb3dzKSB7XG4gICAgICB0aGlzLmNvbHVtbnMgPSBjb2x1bW5zO1xuICAgICAgdGhpcy5yb3dzID0gcm93cztcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMuZ3JpZFNpemVDaGFuZ2VkQ2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy5vcHRpb25zLmdyaWRTaXplQ2hhbmdlZENhbGxiYWNrKHRoaXMpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGNhbGN1bGF0ZUxheW91dCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5jb21wYWN0KSB7XG4gICAgICB0aGlzLmNvbXBhY3QuY2hlY2tDb21wYWN0KCk7XG4gICAgfVxuXG4gICAgdGhpcy5zZXRHcmlkRGltZW5zaW9ucygpO1xuICAgIGlmICh0aGlzLiRvcHRpb25zLm91dGVyTWFyZ2luKSB7XG4gICAgICBsZXQgbWFyZ2luV2lkdGggPSAtdGhpcy4kb3B0aW9ucy5tYXJnaW47XG4gICAgICBpZiAodGhpcy4kb3B0aW9ucy5vdXRlck1hcmdpbkxlZnQgIT09IG51bGwpIHtcbiAgICAgICAgbWFyZ2luV2lkdGggKz0gdGhpcy4kb3B0aW9ucy5vdXRlck1hcmdpbkxlZnQ7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbCwgJ3BhZGRpbmctbGVmdCcsIHRoaXMuJG9wdGlvbnMub3V0ZXJNYXJnaW5MZWZ0ICsgJ3B4Jyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBtYXJnaW5XaWR0aCArPSB0aGlzLiRvcHRpb25zLm1hcmdpbjtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLCAncGFkZGluZy1sZWZ0JywgdGhpcy4kb3B0aW9ucy5tYXJnaW4gKyAncHgnKTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLiRvcHRpb25zLm91dGVyTWFyZ2luUmlnaHQgIT09IG51bGwpIHtcbiAgICAgICAgbWFyZ2luV2lkdGggKz0gdGhpcy4kb3B0aW9ucy5vdXRlck1hcmdpblJpZ2h0O1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWwsICdwYWRkaW5nLXJpZ2h0JywgdGhpcy4kb3B0aW9ucy5vdXRlck1hcmdpblJpZ2h0ICsgJ3B4Jyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBtYXJnaW5XaWR0aCArPSB0aGlzLiRvcHRpb25zLm1hcmdpbjtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLCAncGFkZGluZy1yaWdodCcsIHRoaXMuJG9wdGlvbnMubWFyZ2luICsgJ3B4Jyk7XG4gICAgICB9XG4gICAgICB0aGlzLmN1ckNvbFdpZHRoID0gKHRoaXMuY3VyV2lkdGggLSBtYXJnaW5XaWR0aCkgLyB0aGlzLmNvbHVtbnM7XG4gICAgICBsZXQgbWFyZ2luSGVpZ2h0ID0gLXRoaXMuJG9wdGlvbnMubWFyZ2luO1xuICAgICAgaWYgKHRoaXMuJG9wdGlvbnMub3V0ZXJNYXJnaW5Ub3AgIT09IG51bGwpIHtcbiAgICAgICAgbWFyZ2luSGVpZ2h0ICs9IHRoaXMuJG9wdGlvbnMub3V0ZXJNYXJnaW5Ub3A7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbCwgJ3BhZGRpbmctdG9wJywgdGhpcy4kb3B0aW9ucy5vdXRlck1hcmdpblRvcCArICdweCcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbWFyZ2luSGVpZ2h0ICs9IHRoaXMuJG9wdGlvbnMubWFyZ2luO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWwsICdwYWRkaW5nLXRvcCcsIHRoaXMuJG9wdGlvbnMubWFyZ2luICsgJ3B4Jyk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy4kb3B0aW9ucy5vdXRlck1hcmdpbkJvdHRvbSAhPT0gbnVsbCkge1xuICAgICAgICBtYXJnaW5IZWlnaHQgKz0gdGhpcy4kb3B0aW9ucy5vdXRlck1hcmdpbkJvdHRvbTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLCAncGFkZGluZy1ib3R0b20nLCB0aGlzLiRvcHRpb25zLm91dGVyTWFyZ2luQm90dG9tICsgJ3B4Jyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBtYXJnaW5IZWlnaHQgKz0gdGhpcy4kb3B0aW9ucy5tYXJnaW47XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbCwgJ3BhZGRpbmctYm90dG9tJywgdGhpcy4kb3B0aW9ucy5tYXJnaW4gKyAncHgnKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuY3VyUm93SGVpZ2h0ID0gKHRoaXMuY3VySGVpZ2h0IC0gbWFyZ2luSGVpZ2h0KSAvIHRoaXMucm93cztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jdXJDb2xXaWR0aCA9ICh0aGlzLmN1cldpZHRoICsgdGhpcy4kb3B0aW9ucy5tYXJnaW4pIC8gdGhpcy5jb2x1bW5zO1xuICAgICAgdGhpcy5jdXJSb3dIZWlnaHQgPSAodGhpcy5jdXJIZWlnaHQgKyB0aGlzLiRvcHRpb25zLm1hcmdpbikgLyB0aGlzLnJvd3M7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWwsICdwYWRkaW5nLWxlZnQnLCAwICsgJ3B4Jyk7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWwsICdwYWRkaW5nLXJpZ2h0JywgMCArICdweCcpO1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLCAncGFkZGluZy10b3AnLCAwICsgJ3B4Jyk7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWwsICdwYWRkaW5nLWJvdHRvbScsIDAgKyAncHgnKTtcbiAgICB9XG4gICAgdGhpcy5ncmlkUmVuZGVyZXIudXBkYXRlR3JpZHN0ZXIoKTtcblxuICAgIHRoaXMudXBkYXRlR3JpZCgpO1xuXG4gICAgaWYgKHRoaXMuJG9wdGlvbnMuc2V0R3JpZFNpemUpIHtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbCwgJ3dpZHRoJywgKHRoaXMuY29sdW1ucyAqIHRoaXMuY3VyQ29sV2lkdGggKyB0aGlzLiRvcHRpb25zLm1hcmdpbikgKyAncHgnKTtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbCwgJ2hlaWdodCcsICh0aGlzLnJvd3MgKiB0aGlzLmN1clJvd0hlaWdodCArIHRoaXMuJG9wdGlvbnMubWFyZ2luKSArICdweCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWwsICd3aWR0aCcsICcnKTtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbCwgJ2hlaWdodCcsICcnKTtcbiAgICB9XG5cbiAgICBsZXQgd2lkZ2V0c0luZGV4OiBudW1iZXIgPSB0aGlzLmdyaWQubGVuZ3RoIC0gMSwgd2lkZ2V0OiBHcmlkc3Rlckl0ZW1Db21wb25lbnRJbnRlcmZhY2U7XG4gICAgZm9yICg7IHdpZGdldHNJbmRleCA+PSAwOyB3aWRnZXRzSW5kZXgtLSkge1xuICAgICAgd2lkZ2V0ID0gdGhpcy5ncmlkW3dpZGdldHNJbmRleF07XG4gICAgICB3aWRnZXQuc2V0U2l6ZSgpO1xuICAgICAgd2lkZ2V0LmRyYWcudG9nZ2xlKCk7XG4gICAgICB3aWRnZXQucmVzaXplLnRvZ2dsZSgpO1xuICAgIH1cblxuICAgIHNldFRpbWVvdXQodGhpcy5yZXNpemUuYmluZCh0aGlzKSwgMTAwKTtcbiAgfVxuXG4gIHVwZGF0ZUdyaWQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuJG9wdGlvbnMuZGlzcGxheUdyaWQgPT09ICdhbHdheXMnICYmICF0aGlzLm1vYmlsZSkge1xuICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmVsLCAnZGlzcGxheS1ncmlkJyk7XG4gICAgfSBlbHNlIGlmICh0aGlzLiRvcHRpb25zLmRpc3BsYXlHcmlkID09PSAnb25EcmFnJlJlc2l6ZScgJiYgdGhpcy5kcmFnSW5Qcm9ncmVzcykge1xuICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmVsLCAnZGlzcGxheS1ncmlkJyk7XG4gICAgfSBlbHNlIGlmICh0aGlzLiRvcHRpb25zLmRpc3BsYXlHcmlkID09PSAnbm9uZScgfHwgIXRoaXMuZHJhZ0luUHJvZ3Jlc3MgfHwgdGhpcy5tb2JpbGUpIHtcbiAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5lbCwgJ2Rpc3BsYXktZ3JpZCcpO1xuICAgIH1cbiAgICB0aGlzLnNldEdyaWREaW1lbnNpb25zKCk7XG4gICAgdGhpcy5ncmlkQ29sdW1ucy5sZW5ndGggPSBNYXRoLm1heCh0aGlzLmNvbHVtbnMsIE1hdGguZmxvb3IodGhpcy5jdXJXaWR0aCAvIHRoaXMuY3VyQ29sV2lkdGgpKSB8fCAwO1xuICAgIHRoaXMuZ3JpZFJvd3MubGVuZ3RoID0gTWF0aC5tYXgodGhpcy5yb3dzLCBNYXRoLmZsb29yKHRoaXMuY3VySGVpZ2h0IC8gdGhpcy5jdXJSb3dIZWlnaHQpKSB8fCAwO1xuICAgIHRoaXMuY2RSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBhZGRJdGVtKGl0ZW1Db21wb25lbnQ6IEdyaWRzdGVySXRlbUNvbXBvbmVudEludGVyZmFjZSk6IHZvaWQge1xuICAgIGlmIChpdGVtQ29tcG9uZW50LiRpdGVtLmNvbHMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgaXRlbUNvbXBvbmVudC4kaXRlbS5jb2xzID0gdGhpcy4kb3B0aW9ucy5kZWZhdWx0SXRlbUNvbHM7XG4gICAgICBpdGVtQ29tcG9uZW50Lml0ZW0uY29scyA9IGl0ZW1Db21wb25lbnQuJGl0ZW0uY29scztcbiAgICAgIGl0ZW1Db21wb25lbnQuaXRlbUNoYW5nZWQoKTtcbiAgICB9XG4gICAgaWYgKGl0ZW1Db21wb25lbnQuJGl0ZW0ucm93cyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBpdGVtQ29tcG9uZW50LiRpdGVtLnJvd3MgPSB0aGlzLiRvcHRpb25zLmRlZmF1bHRJdGVtUm93cztcbiAgICAgIGl0ZW1Db21wb25lbnQuaXRlbS5yb3dzID0gaXRlbUNvbXBvbmVudC4kaXRlbS5yb3dzO1xuICAgICAgaXRlbUNvbXBvbmVudC5pdGVtQ2hhbmdlZCgpO1xuICAgIH1cbiAgICBpZiAoaXRlbUNvbXBvbmVudC4kaXRlbS54ID09PSAtMSB8fCBpdGVtQ29tcG9uZW50LiRpdGVtLnkgPT09IC0xKSB7XG4gICAgICB0aGlzLmF1dG9Qb3NpdGlvbkl0ZW0oaXRlbUNvbXBvbmVudCk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmNoZWNrQ29sbGlzaW9uKGl0ZW1Db21wb25lbnQuJGl0ZW0pKSB7XG4gICAgICBpZiAoIXRoaXMuJG9wdGlvbnMuZGlzYWJsZVdhcm5pbmdzKSB7XG4gICAgICAgIGl0ZW1Db21wb25lbnQubm90UGxhY2VkID0gdHJ1ZTtcbiAgICAgICAgY29uc29sZS53YXJuKCdDYW5cXCd0IGJlIHBsYWNlZCBpbiB0aGUgYm91bmRzIG9mIHRoZSBkYXNoYm9hcmQsIHRyeWluZyB0byBhdXRvIHBvc2l0aW9uIS9uJyArXG4gICAgICAgICAgSlNPTi5zdHJpbmdpZnkoaXRlbUNvbXBvbmVudC5pdGVtLCBbJ2NvbHMnLCAncm93cycsICd4JywgJ3knXSkpO1xuICAgICAgfVxuICAgICAgaWYgKCF0aGlzLiRvcHRpb25zLmRpc2FibGVBdXRvUG9zaXRpb25PbkNvbmZsaWN0KSB7XG4gICAgICAgIHRoaXMuYXV0b1Bvc2l0aW9uSXRlbShpdGVtQ29tcG9uZW50KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGl0ZW1Db21wb25lbnQubm90UGxhY2VkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5ncmlkLnB1c2goaXRlbUNvbXBvbmVudCk7XG4gICAgdGhpcy5jYWxjdWxhdGVMYXlvdXREZWJvdW5jZSgpO1xuICB9XG5cbiAgcmVtb3ZlSXRlbShpdGVtQ29tcG9uZW50OiBHcmlkc3Rlckl0ZW1Db21wb25lbnRJbnRlcmZhY2UpOiB2b2lkIHtcbiAgICB0aGlzLmdyaWQuc3BsaWNlKHRoaXMuZ3JpZC5pbmRleE9mKGl0ZW1Db21wb25lbnQpLCAxKTtcbiAgICB0aGlzLmNhbGN1bGF0ZUxheW91dERlYm91bmNlKCk7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5pdGVtUmVtb3ZlZENhbGxiYWNrKSB7XG4gICAgICB0aGlzLm9wdGlvbnMuaXRlbVJlbW92ZWRDYWxsYmFjayhpdGVtQ29tcG9uZW50Lml0ZW0sIGl0ZW1Db21wb25lbnQpO1xuICAgIH1cbiAgfVxuXG4gIGNoZWNrQ29sbGlzaW9uKGl0ZW06IEdyaWRzdGVySXRlbSk6IEdyaWRzdGVySXRlbUNvbXBvbmVudEludGVyZmFjZSB8IGJvb2xlYW4ge1xuICAgIGxldCBjb2xsaXNpb246IEdyaWRzdGVySXRlbUNvbXBvbmVudEludGVyZmFjZSB8IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBpZiAodGhpcy5vcHRpb25zLml0ZW1WYWxpZGF0ZUNhbGxiYWNrKSB7XG4gICAgICBjb2xsaXNpb24gPSAhdGhpcy5vcHRpb25zLml0ZW1WYWxpZGF0ZUNhbGxiYWNrKGl0ZW0pO1xuICAgIH1cbiAgICBpZiAoIWNvbGxpc2lvbiAmJiB0aGlzLmNoZWNrR3JpZENvbGxpc2lvbihpdGVtKSkge1xuICAgICAgY29sbGlzaW9uID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKCFjb2xsaXNpb24pIHtcbiAgICAgIGNvbnN0IGMgPSB0aGlzLmZpbmRJdGVtV2l0aEl0ZW0oaXRlbSk7XG4gICAgICBpZiAoYykge1xuICAgICAgICBjb2xsaXNpb24gPSBjO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY29sbGlzaW9uO1xuICB9XG5cbiAgY2hlY2tHcmlkQ29sbGlzaW9uKGl0ZW06IEdyaWRzdGVySXRlbSk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IG5vTmVnYXRpdmVQb3NpdGlvbiA9IGl0ZW0ueSA+IC0xICYmIGl0ZW0ueCA+IC0xO1xuICAgIGNvbnN0IG1heEdyaWRDb2xzID0gaXRlbS5jb2xzICsgaXRlbS54IDw9IHRoaXMuJG9wdGlvbnMubWF4Q29scztcbiAgICBjb25zdCBtYXhHcmlkUm93cyA9IGl0ZW0ucm93cyArIGl0ZW0ueSA8PSB0aGlzLiRvcHRpb25zLm1heFJvd3M7XG4gICAgY29uc3QgbWF4SXRlbUNvbHMgPSBpdGVtLm1heEl0ZW1Db2xzID09PSB1bmRlZmluZWQgPyB0aGlzLiRvcHRpb25zLm1heEl0ZW1Db2xzIDogaXRlbS5tYXhJdGVtQ29scztcbiAgICBjb25zdCBtaW5JdGVtQ29scyA9IGl0ZW0ubWluSXRlbUNvbHMgPT09IHVuZGVmaW5lZCA/IHRoaXMuJG9wdGlvbnMubWluSXRlbUNvbHMgOiBpdGVtLm1pbkl0ZW1Db2xzO1xuICAgIGNvbnN0IG1heEl0ZW1Sb3dzID0gaXRlbS5tYXhJdGVtUm93cyA9PT0gdW5kZWZpbmVkID8gdGhpcy4kb3B0aW9ucy5tYXhJdGVtUm93cyA6IGl0ZW0ubWF4SXRlbVJvd3M7XG4gICAgY29uc3QgbWluSXRlbVJvd3MgPSBpdGVtLm1pbkl0ZW1Sb3dzID09PSB1bmRlZmluZWQgPyB0aGlzLiRvcHRpb25zLm1pbkl0ZW1Sb3dzIDogaXRlbS5taW5JdGVtUm93cztcbiAgICBjb25zdCBpbkNvbHNMaW1pdHMgPSBpdGVtLmNvbHMgPD0gbWF4SXRlbUNvbHMgJiYgaXRlbS5jb2xzID49IG1pbkl0ZW1Db2xzO1xuICAgIGNvbnN0IGluUm93c0xpbWl0cyA9IGl0ZW0ucm93cyA8PSBtYXhJdGVtUm93cyAmJiBpdGVtLnJvd3MgPj0gbWluSXRlbVJvd3M7XG4gICAgY29uc3QgbWluQXJlYUxpbWl0ID0gaXRlbS5taW5JdGVtQXJlYSA9PT0gdW5kZWZpbmVkID8gdGhpcy4kb3B0aW9ucy5taW5JdGVtQXJlYSA6IGl0ZW0ubWluSXRlbUFyZWE7XG4gICAgY29uc3QgbWF4QXJlYUxpbWl0ID0gaXRlbS5tYXhJdGVtQXJlYSA9PT0gdW5kZWZpbmVkID8gdGhpcy4kb3B0aW9ucy5tYXhJdGVtQXJlYSA6IGl0ZW0ubWF4SXRlbUFyZWE7XG4gICAgY29uc3QgYXJlYSA9IGl0ZW0uY29scyAqIGl0ZW0ucm93cztcbiAgICBjb25zdCBpbk1pbkFyZWEgPSBtaW5BcmVhTGltaXQgPD0gYXJlYTtcbiAgICBjb25zdCBpbk1heEFyZWEgPSBtYXhBcmVhTGltaXQgPj0gYXJlYTtcbiAgICByZXR1cm4gIShub05lZ2F0aXZlUG9zaXRpb24gJiYgbWF4R3JpZENvbHMgJiYgbWF4R3JpZFJvd3MgJiYgaW5Db2xzTGltaXRzICYmIGluUm93c0xpbWl0cyAmJiBpbk1pbkFyZWEgJiYgaW5NYXhBcmVhKTtcbiAgfVxuXG4gIGZpbmRJdGVtV2l0aEl0ZW0oaXRlbTogR3JpZHN0ZXJJdGVtKTogR3JpZHN0ZXJJdGVtQ29tcG9uZW50SW50ZXJmYWNlIHwgYm9vbGVhbiB7XG4gICAgbGV0IHdpZGdldHNJbmRleDogbnVtYmVyID0gdGhpcy5ncmlkLmxlbmd0aCAtIDEsIHdpZGdldDogR3JpZHN0ZXJJdGVtQ29tcG9uZW50SW50ZXJmYWNlO1xuICAgIGZvciAoOyB3aWRnZXRzSW5kZXggPiAtMTsgd2lkZ2V0c0luZGV4LS0pIHtcbiAgICAgIHdpZGdldCA9IHRoaXMuZ3JpZFt3aWRnZXRzSW5kZXhdO1xuICAgICAgaWYgKHdpZGdldC4kaXRlbSAhPT0gaXRlbSAmJiBHcmlkc3RlckNvbXBvbmVudC5jaGVja0NvbGxpc2lvblR3b0l0ZW1zKHdpZGdldC4kaXRlbSwgaXRlbSkpIHtcbiAgICAgICAgcmV0dXJuIHdpZGdldDtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgZmluZEl0ZW1zV2l0aEl0ZW0oaXRlbTogR3JpZHN0ZXJJdGVtKTogQXJyYXk8R3JpZHN0ZXJJdGVtQ29tcG9uZW50SW50ZXJmYWNlPiB7XG4gICAgY29uc3QgYTogQXJyYXk8R3JpZHN0ZXJJdGVtQ29tcG9uZW50SW50ZXJmYWNlPiA9IFtdO1xuICAgIGxldCB3aWRnZXRzSW5kZXg6IG51bWJlciA9IHRoaXMuZ3JpZC5sZW5ndGggLSAxLCB3aWRnZXQ6IEdyaWRzdGVySXRlbUNvbXBvbmVudEludGVyZmFjZTtcbiAgICBmb3IgKDsgd2lkZ2V0c0luZGV4ID4gLTE7IHdpZGdldHNJbmRleC0tKSB7XG4gICAgICB3aWRnZXQgPSB0aGlzLmdyaWRbd2lkZ2V0c0luZGV4XTtcbiAgICAgIGlmICh3aWRnZXQuJGl0ZW0gIT09IGl0ZW0gJiYgR3JpZHN0ZXJDb21wb25lbnQuY2hlY2tDb2xsaXNpb25Ud29JdGVtcyh3aWRnZXQuJGl0ZW0sIGl0ZW0pKSB7XG4gICAgICAgIGEucHVzaCh3aWRnZXQpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gYTtcbiAgfVxuXG4gIGF1dG9Qb3NpdGlvbkl0ZW0oaXRlbUNvbXBvbmVudDogR3JpZHN0ZXJJdGVtQ29tcG9uZW50SW50ZXJmYWNlKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZ2V0TmV4dFBvc3NpYmxlUG9zaXRpb24oaXRlbUNvbXBvbmVudC4kaXRlbSkpIHtcbiAgICAgIGl0ZW1Db21wb25lbnQubm90UGxhY2VkID0gZmFsc2U7XG4gICAgICBpdGVtQ29tcG9uZW50Lml0ZW0ueCA9IGl0ZW1Db21wb25lbnQuJGl0ZW0ueDtcbiAgICAgIGl0ZW1Db21wb25lbnQuaXRlbS55ID0gaXRlbUNvbXBvbmVudC4kaXRlbS55O1xuICAgICAgaXRlbUNvbXBvbmVudC5pdGVtQ2hhbmdlZCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpdGVtQ29tcG9uZW50Lm5vdFBsYWNlZCA9IHRydWU7XG4gICAgICBpZiAoIXRoaXMuJG9wdGlvbnMuZGlzYWJsZVdhcm5pbmdzKSB7XG4gICAgICAgIGNvbnNvbGUud2FybignQ2FuXFwndCBiZSBwbGFjZWQgaW4gdGhlIGJvdW5kcyBvZiB0aGUgZGFzaGJvYXJkIS9uJyArXG4gICAgICAgICAgSlNPTi5zdHJpbmdpZnkoaXRlbUNvbXBvbmVudC5pdGVtLCBbJ2NvbHMnLCAncm93cycsICd4JywgJ3knXSkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGdldE5leHRQb3NzaWJsZVBvc2l0aW9uKG5ld0l0ZW06IEdyaWRzdGVySXRlbSwgc3RhcnRpbmdGcm9tOiB7IHk/OiBudW1iZXIsIHg/OiBudW1iZXIgfSA9IHt9KTogYm9vbGVhbiB7XG4gICAgaWYgKG5ld0l0ZW0uY29scyA9PT0gLTEpIHtcbiAgICAgIG5ld0l0ZW0uY29scyA9IHRoaXMuJG9wdGlvbnMuZGVmYXVsdEl0ZW1Db2xzO1xuICAgIH1cbiAgICBpZiAobmV3SXRlbS5yb3dzID09PSAtMSkge1xuICAgICAgbmV3SXRlbS5yb3dzID0gdGhpcy4kb3B0aW9ucy5kZWZhdWx0SXRlbVJvd3M7XG4gICAgfVxuICAgIHRoaXMuc2V0R3JpZERpbWVuc2lvbnMoKTtcbiAgICBsZXQgcm93c0luZGV4ID0gc3RhcnRpbmdGcm9tLnkgfHwgMCwgY29sc0luZGV4O1xuICAgIGZvciAoOyByb3dzSW5kZXggPCB0aGlzLnJvd3M7IHJvd3NJbmRleCsrKSB7XG4gICAgICBuZXdJdGVtLnkgPSByb3dzSW5kZXg7XG4gICAgICBjb2xzSW5kZXggPSBzdGFydGluZ0Zyb20ueCB8fCAwO1xuICAgICAgZm9yICg7IGNvbHNJbmRleCA8IHRoaXMuY29sdW1uczsgY29sc0luZGV4KyspIHtcbiAgICAgICAgbmV3SXRlbS54ID0gY29sc0luZGV4O1xuICAgICAgICBpZiAoIXRoaXMuY2hlY2tDb2xsaXNpb24obmV3SXRlbSkpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBjb25zdCBjYW5BZGRUb1Jvd3MgPSB0aGlzLiRvcHRpb25zLm1heFJvd3MgPj0gdGhpcy5yb3dzICsgbmV3SXRlbS5yb3dzO1xuICAgIGNvbnN0IGNhbkFkZFRvQ29sdW1ucyA9IHRoaXMuJG9wdGlvbnMubWF4Q29scyA+PSB0aGlzLmNvbHVtbnMgKyBuZXdJdGVtLmNvbHM7XG4gICAgY29uc3QgYWRkVG9Sb3dzID0gdGhpcy5yb3dzIDw9IHRoaXMuY29sdW1ucyAmJiBjYW5BZGRUb1Jvd3M7XG4gICAgaWYgKCFhZGRUb1Jvd3MgJiYgY2FuQWRkVG9Db2x1bW5zKSB7XG4gICAgICBuZXdJdGVtLnggPSB0aGlzLmNvbHVtbnM7XG4gICAgICBuZXdJdGVtLnkgPSAwO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIGlmIChjYW5BZGRUb1Jvd3MpIHtcbiAgICAgIG5ld0l0ZW0ueSA9IHRoaXMucm93cztcbiAgICAgIG5ld0l0ZW0ueCA9IDA7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgZ2V0Rmlyc3RQb3NzaWJsZVBvc2l0aW9uKGl0ZW06IEdyaWRzdGVySXRlbSk6IEdyaWRzdGVySXRlbSB7XG4gICAgY29uc3QgdG1wSXRlbSA9IE9iamVjdC5hc3NpZ24oe30sIGl0ZW0pO1xuICAgIHRoaXMuZ2V0TmV4dFBvc3NpYmxlUG9zaXRpb24odG1wSXRlbSk7XG4gICAgcmV0dXJuIHRtcEl0ZW07XG4gIH1cblxuICBnZXRMYXN0UG9zc2libGVQb3NpdGlvbihpdGVtOiBHcmlkc3Rlckl0ZW0pOiBHcmlkc3Rlckl0ZW0ge1xuICAgIGxldCBmYXJ0aGVzdEl0ZW06IHsgeTogbnVtYmVyLCB4OiBudW1iZXIgfSA9IHt5OiAwLCB4OiAwfTtcbiAgICBmYXJ0aGVzdEl0ZW0gPSB0aGlzLmdyaWQucmVkdWNlKChwcmV2OiBhbnksIGN1cnI6IEdyaWRzdGVySXRlbUNvbXBvbmVudEludGVyZmFjZSkgPT4ge1xuICAgICAgY29uc3QgY3VyckNvb3JkcyA9IHt5OiBjdXJyLiRpdGVtLnkgKyBjdXJyLiRpdGVtLnJvd3MgLSAxLCB4OiBjdXJyLiRpdGVtLnggKyBjdXJyLiRpdGVtLmNvbHMgLSAxfTtcbiAgICAgIGlmIChHcmlkc3RlclV0aWxzLmNvbXBhcmVJdGVtcyhwcmV2LCBjdXJyQ29vcmRzKSA9PT0gMSkge1xuICAgICAgICByZXR1cm4gY3VyckNvb3JkcztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBwcmV2O1xuICAgICAgfVxuICAgIH0sIGZhcnRoZXN0SXRlbSk7XG5cbiAgICBjb25zdCB0bXBJdGVtID0gT2JqZWN0LmFzc2lnbih7fSwgaXRlbSk7XG4gICAgdGhpcy5nZXROZXh0UG9zc2libGVQb3NpdGlvbih0bXBJdGVtLCBmYXJ0aGVzdEl0ZW0pO1xuICAgIHJldHVybiB0bXBJdGVtO1xuICB9XG5cbiAgcGl4ZWxzVG9Qb3NpdGlvblgoeDogbnVtYmVyLCByb3VuZGluZ01ldGhvZDogRnVuY3Rpb24sIG5vTGltaXQ/OiBib29sZWFuKTogbnVtYmVyIHtcbiAgICBjb25zdCBwb3NpdGlvbiA9IHJvdW5kaW5nTWV0aG9kKHggLyB0aGlzLmN1ckNvbFdpZHRoKTtcbiAgICBpZiAobm9MaW1pdCkge1xuICAgICAgcmV0dXJuIHBvc2l0aW9uO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gTWF0aC5tYXgocG9zaXRpb24sIDApO1xuICAgIH1cbiAgfVxuXG4gIHBpeGVsc1RvUG9zaXRpb25ZKHk6IG51bWJlciwgcm91bmRpbmdNZXRob2Q6IEZ1bmN0aW9uLCBub0xpbWl0PzogYm9vbGVhbik6IG51bWJlciB7XG4gICAgY29uc3QgcG9zaXRpb24gPSByb3VuZGluZ01ldGhvZCh5IC8gdGhpcy5jdXJSb3dIZWlnaHQpO1xuICAgIGlmIChub0xpbWl0KSB7XG4gICAgICByZXR1cm4gcG9zaXRpb247XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBNYXRoLm1heChwb3NpdGlvbiwgMCk7XG4gICAgfVxuICB9XG5cbiAgcG9zaXRpb25YVG9QaXhlbHMoeDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4geCAqIHRoaXMuY3VyQ29sV2lkdGg7XG4gIH1cblxuICBwb3NpdGlvbllUb1BpeGVscyh5OiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiB5ICogdGhpcy5jdXJSb3dIZWlnaHQ7XG4gIH1cbn1cbiJdfQ==
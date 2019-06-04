/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
        if (this.options && this.options.destroyCallback) {
            this.options.destroyCallback(this);
        }
        if (this.options && this.options.api) {
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
            itemComponent.itemChanged(itemComponent.item);
        }
        if (itemComponent.$item.rows === undefined) {
            itemComponent.$item.rows = this.$options.defaultItemRows;
            itemComponent.item.rows = itemComponent.$item.rows;
            itemComponent.itemChanged(itemComponent.item);
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
            /** @type {?} */
            let oldItem = {
                x: itemComponent.item.x,
                y: itemComponent.item.y,
                rows: itemComponent.item.rows,
                cols: itemComponent.item.cols
            };
            itemComponent.notPlaced = false;
            itemComponent.item.x = itemComponent.$item.x;
            itemComponent.item.y = itemComponent.$item.y;
            itemComponent.itemChanged(oldItem);
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
        farthestItem = this.grid.reduce((/**
         * @param {?} prev
         * @param {?} curr
         * @return {?}
         */
        (prev, curr) => {
            /** @type {?} */
            const currCoords = { y: curr.$item.y + curr.$item.rows - 1, x: curr.$item.x + curr.$item.cols - 1 };
            if (GridsterUtils.compareItems(prev, currCoords) === 1) {
                return currCoords;
            }
            else {
                return prev;
            }
        }), farthestItem);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZHN0ZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1ncmlkc3RlcjIvIiwic291cmNlcyI6WyJsaWIvZ3JpZHN0ZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsS0FBSyxFQUNMLE1BQU0sRUFJTixTQUFTLEVBRVQsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBRWhFLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUN0RCxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSw2QkFBNkIsQ0FBQztBQUM5RCxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFJMUQsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sNEJBQTRCLENBQUM7QUFTNUQsTUFBTSxPQUFPLGlCQUFpQjs7Ozs7OztJQXVCNUIsWUFBWSxFQUFjLEVBQVMsUUFBbUIsRUFBUyxLQUF3QixFQUFTLElBQVk7UUFBekUsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUFTLFVBQUssR0FBTCxLQUFLLENBQW1CO1FBQVMsU0FBSSxHQUFKLElBQUksQ0FBUTtRQVI1RyxnQkFBVyxHQUFHLEVBQUUsQ0FBQztRQUNqQixhQUFRLEdBQUcsRUFBRSxDQUFDO1FBUVosSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsYUFBYSxDQUFDO1FBQzNCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQztRQUNsRSxJQUFJLENBQUMsdUJBQXVCLEdBQUcsYUFBYSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJ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ZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIElucHV0LFxuICBOZ1pvbmUsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIFJlbmRlcmVyMixcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7R3JpZHN0ZXJDb25maWdTZXJ2aWNlfSBmcm9tICcuL2dyaWRzdGVyQ29uZmlnLmNvbnN0YW50JztcbmltcG9ydCB7R3JpZHN0ZXJDb25maWd9IGZyb20gJy4vZ3JpZHN0ZXJDb25maWcuaW50ZXJmYWNlJztcbmltcG9ydCB7R3JpZHN0ZXJVdGlsc30gZnJvbSAnLi9ncmlkc3RlclV0aWxzLnNlcnZpY2UnO1xuaW1wb3J0IHtHcmlkc3RlckVtcHR5Q2VsbH0gZnJvbSAnLi9ncmlkc3RlckVtcHR5Q2VsbC5zZXJ2aWNlJztcbmltcG9ydCB7R3JpZHN0ZXJDb21wYWN0fSBmcm9tICcuL2dyaWRzdGVyQ29tcGFjdC5zZXJ2aWNlJztcbmltcG9ydCB7R3JpZHN0ZXJDb25maWdTfSBmcm9tICcuL2dyaWRzdGVyQ29uZmlnUy5pbnRlcmZhY2UnO1xuaW1wb3J0IHtHcmlkc3RlckNvbXBvbmVudEludGVyZmFjZX0gZnJvbSAnLi9ncmlkc3Rlci5pbnRlcmZhY2UnO1xuaW1wb3J0IHtHcmlkc3Rlckl0ZW1Db21wb25lbnRJbnRlcmZhY2V9IGZyb20gJy4vZ3JpZHN0ZXJJdGVtQ29tcG9uZW50LmludGVyZmFjZSc7XG5pbXBvcnQge0dyaWRzdGVyUmVuZGVyZXJ9IGZyb20gJy4vZ3JpZHN0ZXJSZW5kZXJlci5zZXJ2aWNlJztcbmltcG9ydCB7R3JpZHN0ZXJJdGVtfSBmcm9tICcuL2dyaWRzdGVySXRlbS5pbnRlcmZhY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdncmlkc3RlcicsXG4gIHRlbXBsYXRlVXJsOiAnLi9ncmlkc3Rlci5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vZ3JpZHN0ZXIuY3NzJ10sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5leHBvcnQgY2xhc3MgR3JpZHN0ZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95LCBHcmlkc3RlckNvbXBvbmVudEludGVyZmFjZSB7XG4gIEBJbnB1dCgpIG9wdGlvbnM6IEdyaWRzdGVyQ29uZmlnO1xuICBjYWxjdWxhdGVMYXlvdXREZWJvdW5jZTogKCkgPT4gdm9pZDtcbiAgbW92aW5nSXRlbTogR3JpZHN0ZXJJdGVtIHwgbnVsbDtcbiAgcHJldmlld1N0eWxlOiAoKSA9PiB2b2lkO1xuICBlbDogYW55O1xuICAkb3B0aW9uczogR3JpZHN0ZXJDb25maWdTO1xuICBtb2JpbGU6IGJvb2xlYW47XG4gIGN1cldpZHRoOiBudW1iZXI7XG4gIGN1ckhlaWdodDogbnVtYmVyO1xuICBncmlkOiBBcnJheTxHcmlkc3Rlckl0ZW1Db21wb25lbnRJbnRlcmZhY2U+O1xuICBjb2x1bW5zOiBudW1iZXI7XG4gIHJvd3M6IG51bWJlcjtcbiAgY3VyQ29sV2lkdGg6IG51bWJlcjtcbiAgY3VyUm93SGVpZ2h0OiBudW1iZXI7XG4gIGdyaWRDb2x1bW5zID0gW107XG4gIGdyaWRSb3dzID0gW107XG4gIHdpbmRvd1Jlc2l6ZTogKCgpID0+IHZvaWQpIHwgbnVsbDtcbiAgZHJhZ0luUHJvZ3Jlc3M6IGJvb2xlYW47XG4gIGVtcHR5Q2VsbDogR3JpZHN0ZXJFbXB0eUNlbGw7XG4gIGNvbXBhY3Q6IEdyaWRzdGVyQ29tcGFjdDtcbiAgZ3JpZFJlbmRlcmVyOiBHcmlkc3RlclJlbmRlcmVyO1xuXG4gIGNvbnN0cnVjdG9yKGVsOiBFbGVtZW50UmVmLCBwdWJsaWMgcmVuZGVyZXI6IFJlbmRlcmVyMiwgcHVibGljIGNkUmVmOiBDaGFuZ2VEZXRlY3RvclJlZiwgcHVibGljIHpvbmU6IE5nWm9uZSkge1xuICAgIHRoaXMuZWwgPSBlbC5uYXRpdmVFbGVtZW50O1xuICAgIHRoaXMuJG9wdGlvbnMgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KEdyaWRzdGVyQ29uZmlnU2VydmljZSkpO1xuICAgIHRoaXMuY2FsY3VsYXRlTGF5b3V0RGVib3VuY2UgPSBHcmlkc3RlclV0aWxzLmRlYm91bmNlKHRoaXMuY2FsY3VsYXRlTGF5b3V0LmJpbmQodGhpcyksIDApO1xuICAgIHRoaXMubW9iaWxlID0gZmFsc2U7XG4gICAgdGhpcy5jdXJXaWR0aCA9IDA7XG4gICAgdGhpcy5jdXJIZWlnaHQgPSAwO1xuICAgIHRoaXMuZ3JpZCA9IFtdO1xuICAgIHRoaXMuY3VyQ29sV2lkdGggPSAwO1xuICAgIHRoaXMuY3VyUm93SGVpZ2h0ID0gMDtcbiAgICB0aGlzLmRyYWdJblByb2dyZXNzID0gZmFsc2U7XG4gICAgdGhpcy5lbXB0eUNlbGwgPSBuZXcgR3JpZHN0ZXJFbXB0eUNlbGwodGhpcyk7XG4gICAgdGhpcy5jb21wYWN0ID0gbmV3IEdyaWRzdGVyQ29tcGFjdCh0aGlzKTtcbiAgICB0aGlzLmdyaWRSZW5kZXJlciA9IG5ldyBHcmlkc3RlclJlbmRlcmVyKHRoaXMpO1xuICB9XG5cbiAgc3RhdGljIGNoZWNrQ29sbGlzaW9uVHdvSXRlbXMoaXRlbTogR3JpZHN0ZXJJdGVtLCBpdGVtMjogR3JpZHN0ZXJJdGVtKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGl0ZW0ueCA8IGl0ZW0yLnggKyBpdGVtMi5jb2xzXG4gICAgICAmJiBpdGVtLnggKyBpdGVtLmNvbHMgPiBpdGVtMi54XG4gICAgICAmJiBpdGVtLnkgPCBpdGVtMi55ICsgaXRlbTIucm93c1xuICAgICAgJiYgaXRlbS55ICsgaXRlbS5yb3dzID4gaXRlbTIueTtcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLm9wdGlvbnMuaW5pdENhbGxiYWNrKSB7XG4gICAgICB0aGlzLm9wdGlvbnMuaW5pdENhbGxiYWNrKHRoaXMpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAoY2hhbmdlcy5vcHRpb25zKSB7XG4gICAgICB0aGlzLnNldE9wdGlvbnMoKTtcbiAgICAgIHRoaXMub3B0aW9ucy5hcGkgPSB7XG4gICAgICAgIG9wdGlvbnNDaGFuZ2VkOiB0aGlzLm9wdGlvbnNDaGFuZ2VkLmJpbmQodGhpcyksXG4gICAgICAgIHJlc2l6ZTogdGhpcy5vblJlc2l6ZS5iaW5kKHRoaXMpLFxuICAgICAgICBnZXROZXh0UG9zc2libGVQb3NpdGlvbjogdGhpcy5nZXROZXh0UG9zc2libGVQb3NpdGlvbi5iaW5kKHRoaXMpLFxuICAgICAgICBnZXRGaXJzdFBvc3NpYmxlUG9zaXRpb246IHRoaXMuZ2V0Rmlyc3RQb3NzaWJsZVBvc2l0aW9uLmJpbmQodGhpcyksXG4gICAgICAgIGdldExhc3RQb3NzaWJsZVBvc2l0aW9uOiB0aGlzLmdldExhc3RQb3NzaWJsZVBvc2l0aW9uLmJpbmQodGhpcyksXG4gICAgICB9O1xuICAgICAgdGhpcy5jb2x1bW5zID0gdGhpcy4kb3B0aW9ucy5taW5Db2xzO1xuICAgICAgdGhpcy5yb3dzID0gdGhpcy4kb3B0aW9ucy5taW5Sb3dzO1xuICAgICAgdGhpcy5zZXRHcmlkU2l6ZSgpO1xuICAgICAgdGhpcy5jYWxjdWxhdGVMYXlvdXQoKTtcbiAgICB9XG4gIH1cblxuICByZXNpemUoKTogdm9pZCB7XG4gICAgbGV0IGhlaWdodDtcbiAgICBsZXQgd2lkdGg7XG4gICAgaWYgKHRoaXMuJG9wdGlvbnMuZ3JpZFR5cGUgPT09ICdmaXQnICYmICF0aGlzLm1vYmlsZSkge1xuICAgICAgd2lkdGggPSB0aGlzLmVsLm9mZnNldFdpZHRoO1xuICAgICAgaGVpZ2h0ID0gdGhpcy5lbC5vZmZzZXRIZWlnaHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHdpZHRoID0gdGhpcy5lbC5jbGllbnRXaWR0aDtcbiAgICAgIGhlaWdodCA9IHRoaXMuZWwuY2xpZW50SGVpZ2h0O1xuICAgIH1cbiAgICBpZiAoKHdpZHRoICE9PSB0aGlzLmN1cldpZHRoIHx8IGhlaWdodCAhPT0gdGhpcy5jdXJIZWlnaHQpICYmIHRoaXMuY2hlY2tJZlRvUmVzaXplKCkpIHtcbiAgICAgIHRoaXMub25SZXNpemUoKTtcbiAgICB9XG4gIH1cblxuICBzZXRPcHRpb25zKCk6IHZvaWQge1xuICAgIHRoaXMuJG9wdGlvbnMgPSBHcmlkc3RlclV0aWxzLm1lcmdlKHRoaXMuJG9wdGlvbnMsIHRoaXMub3B0aW9ucywgdGhpcy4kb3B0aW9ucyk7XG4gICAgaWYgKCF0aGlzLiRvcHRpb25zLmRpc2FibGVXaW5kb3dSZXNpemUgJiYgIXRoaXMud2luZG93UmVzaXplKSB7XG4gICAgICB0aGlzLndpbmRvd1Jlc2l6ZSA9IHRoaXMucmVuZGVyZXIubGlzdGVuKCd3aW5kb3cnLCAncmVzaXplJywgdGhpcy5vblJlc2l6ZS5iaW5kKHRoaXMpKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuJG9wdGlvbnMuZGlzYWJsZVdpbmRvd1Jlc2l6ZSAmJiB0aGlzLndpbmRvd1Jlc2l6ZSkge1xuICAgICAgdGhpcy53aW5kb3dSZXNpemUoKTtcbiAgICAgIHRoaXMud2luZG93UmVzaXplID0gbnVsbDtcbiAgICB9XG4gICAgdGhpcy5lbXB0eUNlbGwudXBkYXRlT3B0aW9ucygpO1xuICB9XG5cbiAgb3B0aW9uc0NoYW5nZWQoKTogdm9pZCB7XG4gICAgdGhpcy5zZXRPcHRpb25zKCk7XG4gICAgbGV0IHdpZGdldHNJbmRleDogbnVtYmVyID0gdGhpcy5ncmlkLmxlbmd0aCAtIDEsIHdpZGdldDogR3JpZHN0ZXJJdGVtQ29tcG9uZW50SW50ZXJmYWNlO1xuICAgIGZvciAoOyB3aWRnZXRzSW5kZXggPj0gMDsgd2lkZ2V0c0luZGV4LS0pIHtcbiAgICAgIHdpZGdldCA9IHRoaXMuZ3JpZFt3aWRnZXRzSW5kZXhdO1xuICAgICAgd2lkZ2V0LnVwZGF0ZU9wdGlvbnMoKTtcbiAgICB9XG4gICAgdGhpcy5jYWxjdWxhdGVMYXlvdXQoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLndpbmRvd1Jlc2l6ZSkge1xuICAgICAgdGhpcy53aW5kb3dSZXNpemUoKTtcbiAgICB9XG4gICAgaWYgKHRoaXMub3B0aW9ucyAmJiB0aGlzLm9wdGlvbnMuZGVzdHJveUNhbGxiYWNrKSB7XG4gICAgICB0aGlzLm9wdGlvbnMuZGVzdHJveUNhbGxiYWNrKHRoaXMpO1xuICAgIH1cbiAgICBpZiAodGhpcy5vcHRpb25zICYmIHRoaXMub3B0aW9ucy5hcGkpIHtcbiAgICAgIHRoaXMub3B0aW9ucy5hcGkucmVzaXplID0gdW5kZWZpbmVkO1xuICAgICAgdGhpcy5vcHRpb25zLmFwaS5vcHRpb25zQ2hhbmdlZCA9IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMub3B0aW9ucy5hcGkuZ2V0TmV4dFBvc3NpYmxlUG9zaXRpb24gPSB1bmRlZmluZWQ7XG4gICAgICB0aGlzLm9wdGlvbnMuYXBpID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgICB0aGlzLmVtcHR5Q2VsbC5kZXN0cm95KCk7XG4gICAgZGVsZXRlIHRoaXMuZW1wdHlDZWxsO1xuICAgIHRoaXMuY29tcGFjdC5kZXN0cm95KCk7XG4gICAgZGVsZXRlIHRoaXMuY29tcGFjdDtcbiAgfVxuXG4gIG9uUmVzaXplKCk6IHZvaWQge1xuICAgIHRoaXMuc2V0R3JpZFNpemUoKTtcbiAgICB0aGlzLmNhbGN1bGF0ZUxheW91dCgpO1xuICB9XG5cbiAgY2hlY2tJZlRvUmVzaXplKCk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGNsaWVudFdpZHRoID0gdGhpcy5lbC5jbGllbnRXaWR0aDtcbiAgICBjb25zdCBvZmZzZXRXaWR0aCA9IHRoaXMuZWwub2Zmc2V0V2lkdGg7XG4gICAgY29uc3Qgc2Nyb2xsV2lkdGggPSB0aGlzLmVsLnNjcm9sbFdpZHRoO1xuICAgIGNvbnN0IGNsaWVudEhlaWdodCA9IHRoaXMuZWwuY2xpZW50SGVpZ2h0O1xuICAgIGNvbnN0IG9mZnNldEhlaWdodCA9IHRoaXMuZWwub2Zmc2V0SGVpZ2h0O1xuICAgIGNvbnN0IHNjcm9sbEhlaWdodCA9IHRoaXMuZWwuc2Nyb2xsSGVpZ2h0O1xuICAgIGNvbnN0IHZlcnRpY2FsU2Nyb2xsUHJlc2VudCA9IGNsaWVudFdpZHRoIDwgb2Zmc2V0V2lkdGggJiYgc2Nyb2xsSGVpZ2h0ID4gb2Zmc2V0SGVpZ2h0XG4gICAgICAmJiBzY3JvbGxIZWlnaHQgLSBvZmZzZXRIZWlnaHQgPCBvZmZzZXRXaWR0aCAtIGNsaWVudFdpZHRoO1xuICAgIGNvbnN0IGhvcml6b250YWxTY3JvbGxQcmVzZW50ID0gY2xpZW50SGVpZ2h0IDwgb2Zmc2V0SGVpZ2h0XG4gICAgICAmJiBzY3JvbGxXaWR0aCA+IG9mZnNldFdpZHRoICYmIHNjcm9sbFdpZHRoIC0gb2Zmc2V0V2lkdGggPCBvZmZzZXRIZWlnaHQgLSBjbGllbnRIZWlnaHQ7XG4gICAgaWYgKHZlcnRpY2FsU2Nyb2xsUHJlc2VudCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gIWhvcml6b250YWxTY3JvbGxQcmVzZW50O1xuICB9XG5cbiAgc2V0R3JpZFNpemUoKTogdm9pZCB7XG4gICAgY29uc3QgZWwgPSB0aGlzLmVsO1xuICAgIGxldCB3aWR0aCA9IGVsLmNsaWVudFdpZHRoO1xuICAgIGxldCBoZWlnaHQgPSBlbC5jbGllbnRIZWlnaHQ7XG4gICAgaWYgKHRoaXMuJG9wdGlvbnMuc2V0R3JpZFNpemUgfHwgdGhpcy4kb3B0aW9ucy5ncmlkVHlwZSA9PT0gJ2ZpdCcgJiYgIXRoaXMubW9iaWxlKSB7XG4gICAgICB3aWR0aCA9IGVsLm9mZnNldFdpZHRoO1xuICAgICAgaGVpZ2h0ID0gZWwub2Zmc2V0SGVpZ2h0O1xuICAgIH0gZWxzZSB7XG4gICAgICB3aWR0aCA9IGVsLmNsaWVudFdpZHRoO1xuICAgICAgaGVpZ2h0ID0gZWwuY2xpZW50SGVpZ2h0O1xuICAgIH1cbiAgICB0aGlzLmN1cldpZHRoID0gd2lkdGg7XG4gICAgdGhpcy5jdXJIZWlnaHQgPSBoZWlnaHQ7XG4gIH1cblxuICBzZXRHcmlkRGltZW5zaW9ucygpOiB2b2lkIHtcbiAgICB0aGlzLnNldEdyaWRTaXplKCk7XG4gICAgaWYgKCF0aGlzLm1vYmlsZSAmJiB0aGlzLiRvcHRpb25zLm1vYmlsZUJyZWFrcG9pbnQgPiB0aGlzLmN1cldpZHRoKSB7XG4gICAgICB0aGlzLm1vYmlsZSA9ICF0aGlzLm1vYmlsZTtcbiAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5lbCwgJ21vYmlsZScpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5tb2JpbGUgJiYgdGhpcy4kb3B0aW9ucy5tb2JpbGVCcmVha3BvaW50IDwgdGhpcy5jdXJXaWR0aCkge1xuICAgICAgdGhpcy5tb2JpbGUgPSAhdGhpcy5tb2JpbGU7XG4gICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuZWwsICdtb2JpbGUnKTtcbiAgICB9XG4gICAgbGV0IHJvd3MgPSB0aGlzLiRvcHRpb25zLm1pblJvd3MsIGNvbHVtbnMgPSB0aGlzLiRvcHRpb25zLm1pbkNvbHM7XG5cbiAgICBsZXQgd2lkZ2V0c0luZGV4ID0gdGhpcy5ncmlkLmxlbmd0aCAtIDEsIHdpZGdldDtcbiAgICBmb3IgKDsgd2lkZ2V0c0luZGV4ID49IDA7IHdpZGdldHNJbmRleC0tKSB7XG4gICAgICB3aWRnZXQgPSB0aGlzLmdyaWRbd2lkZ2V0c0luZGV4XTtcbiAgICAgIGlmICghd2lkZ2V0Lm5vdFBsYWNlZCkge1xuICAgICAgICByb3dzID0gTWF0aC5tYXgocm93cywgd2lkZ2V0LiRpdGVtLnkgKyB3aWRnZXQuJGl0ZW0ucm93cyk7XG4gICAgICAgIGNvbHVtbnMgPSBNYXRoLm1heChjb2x1bW5zLCB3aWRnZXQuJGl0ZW0ueCArIHdpZGdldC4kaXRlbS5jb2xzKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGhpcy5jb2x1bW5zICE9PSBjb2x1bW5zIHx8IHRoaXMucm93cyAhPT0gcm93cykge1xuICAgICAgdGhpcy5jb2x1bW5zID0gY29sdW1ucztcbiAgICAgIHRoaXMucm93cyA9IHJvd3M7XG4gICAgICBpZiAodGhpcy5vcHRpb25zLmdyaWRTaXplQ2hhbmdlZENhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMub3B0aW9ucy5ncmlkU2l6ZUNoYW5nZWRDYWxsYmFjayh0aGlzKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBjYWxjdWxhdGVMYXlvdXQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuY29tcGFjdCkge1xuICAgICAgdGhpcy5jb21wYWN0LmNoZWNrQ29tcGFjdCgpO1xuICAgIH1cblxuICAgIHRoaXMuc2V0R3JpZERpbWVuc2lvbnMoKTtcbiAgICBpZiAodGhpcy4kb3B0aW9ucy5vdXRlck1hcmdpbikge1xuICAgICAgbGV0IG1hcmdpbldpZHRoID0gLXRoaXMuJG9wdGlvbnMubWFyZ2luO1xuICAgICAgaWYgKHRoaXMuJG9wdGlvbnMub3V0ZXJNYXJnaW5MZWZ0ICE9PSBudWxsKSB7XG4gICAgICAgIG1hcmdpbldpZHRoICs9IHRoaXMuJG9wdGlvbnMub3V0ZXJNYXJnaW5MZWZ0O1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWwsICdwYWRkaW5nLWxlZnQnLCB0aGlzLiRvcHRpb25zLm91dGVyTWFyZ2luTGVmdCArICdweCcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbWFyZ2luV2lkdGggKz0gdGhpcy4kb3B0aW9ucy5tYXJnaW47XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbCwgJ3BhZGRpbmctbGVmdCcsIHRoaXMuJG9wdGlvbnMubWFyZ2luICsgJ3B4Jyk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy4kb3B0aW9ucy5vdXRlck1hcmdpblJpZ2h0ICE9PSBudWxsKSB7XG4gICAgICAgIG1hcmdpbldpZHRoICs9IHRoaXMuJG9wdGlvbnMub3V0ZXJNYXJnaW5SaWdodDtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLCAncGFkZGluZy1yaWdodCcsIHRoaXMuJG9wdGlvbnMub3V0ZXJNYXJnaW5SaWdodCArICdweCcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbWFyZ2luV2lkdGggKz0gdGhpcy4kb3B0aW9ucy5tYXJnaW47XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbCwgJ3BhZGRpbmctcmlnaHQnLCB0aGlzLiRvcHRpb25zLm1hcmdpbiArICdweCcpO1xuICAgICAgfVxuICAgICAgdGhpcy5jdXJDb2xXaWR0aCA9ICh0aGlzLmN1cldpZHRoIC0gbWFyZ2luV2lkdGgpIC8gdGhpcy5jb2x1bW5zO1xuICAgICAgbGV0IG1hcmdpbkhlaWdodCA9IC10aGlzLiRvcHRpb25zLm1hcmdpbjtcbiAgICAgIGlmICh0aGlzLiRvcHRpb25zLm91dGVyTWFyZ2luVG9wICE9PSBudWxsKSB7XG4gICAgICAgIG1hcmdpbkhlaWdodCArPSB0aGlzLiRvcHRpb25zLm91dGVyTWFyZ2luVG9wO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWwsICdwYWRkaW5nLXRvcCcsIHRoaXMuJG9wdGlvbnMub3V0ZXJNYXJnaW5Ub3AgKyAncHgnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG1hcmdpbkhlaWdodCArPSB0aGlzLiRvcHRpb25zLm1hcmdpbjtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLCAncGFkZGluZy10b3AnLCB0aGlzLiRvcHRpb25zLm1hcmdpbiArICdweCcpO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuJG9wdGlvbnMub3V0ZXJNYXJnaW5Cb3R0b20gIT09IG51bGwpIHtcbiAgICAgICAgbWFyZ2luSGVpZ2h0ICs9IHRoaXMuJG9wdGlvbnMub3V0ZXJNYXJnaW5Cb3R0b207XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbCwgJ3BhZGRpbmctYm90dG9tJywgdGhpcy4kb3B0aW9ucy5vdXRlck1hcmdpbkJvdHRvbSArICdweCcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbWFyZ2luSGVpZ2h0ICs9IHRoaXMuJG9wdGlvbnMubWFyZ2luO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWwsICdwYWRkaW5nLWJvdHRvbScsIHRoaXMuJG9wdGlvbnMubWFyZ2luICsgJ3B4Jyk7XG4gICAgICB9XG4gICAgICB0aGlzLmN1clJvd0hlaWdodCA9ICh0aGlzLmN1ckhlaWdodCAtIG1hcmdpbkhlaWdodCkgLyB0aGlzLnJvd3M7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY3VyQ29sV2lkdGggPSAodGhpcy5jdXJXaWR0aCArIHRoaXMuJG9wdGlvbnMubWFyZ2luKSAvIHRoaXMuY29sdW1ucztcbiAgICAgIHRoaXMuY3VyUm93SGVpZ2h0ID0gKHRoaXMuY3VySGVpZ2h0ICsgdGhpcy4kb3B0aW9ucy5tYXJnaW4pIC8gdGhpcy5yb3dzO1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLCAncGFkZGluZy1sZWZ0JywgMCArICdweCcpO1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLCAncGFkZGluZy1yaWdodCcsIDAgKyAncHgnKTtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbCwgJ3BhZGRpbmctdG9wJywgMCArICdweCcpO1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLCAncGFkZGluZy1ib3R0b20nLCAwICsgJ3B4Jyk7XG4gICAgfVxuICAgIHRoaXMuZ3JpZFJlbmRlcmVyLnVwZGF0ZUdyaWRzdGVyKCk7XG5cbiAgICB0aGlzLnVwZGF0ZUdyaWQoKTtcblxuICAgIGlmICh0aGlzLiRvcHRpb25zLnNldEdyaWRTaXplKSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWwsICd3aWR0aCcsICh0aGlzLmNvbHVtbnMgKiB0aGlzLmN1ckNvbFdpZHRoICsgdGhpcy4kb3B0aW9ucy5tYXJnaW4pICsgJ3B4Jyk7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWwsICdoZWlnaHQnLCAodGhpcy5yb3dzICogdGhpcy5jdXJSb3dIZWlnaHQgKyB0aGlzLiRvcHRpb25zLm1hcmdpbikgKyAncHgnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLCAnd2lkdGgnLCAnJyk7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWwsICdoZWlnaHQnLCAnJyk7XG4gICAgfVxuXG4gICAgbGV0IHdpZGdldHNJbmRleDogbnVtYmVyID0gdGhpcy5ncmlkLmxlbmd0aCAtIDEsIHdpZGdldDogR3JpZHN0ZXJJdGVtQ29tcG9uZW50SW50ZXJmYWNlO1xuICAgIGZvciAoOyB3aWRnZXRzSW5kZXggPj0gMDsgd2lkZ2V0c0luZGV4LS0pIHtcbiAgICAgIHdpZGdldCA9IHRoaXMuZ3JpZFt3aWRnZXRzSW5kZXhdO1xuICAgICAgd2lkZ2V0LnNldFNpemUoKTtcbiAgICAgIHdpZGdldC5kcmFnLnRvZ2dsZSgpO1xuICAgICAgd2lkZ2V0LnJlc2l6ZS50b2dnbGUoKTtcbiAgICB9XG5cbiAgICBzZXRUaW1lb3V0KHRoaXMucmVzaXplLmJpbmQodGhpcyksIDEwMCk7XG4gIH1cblxuICB1cGRhdGVHcmlkKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLiRvcHRpb25zLmRpc3BsYXlHcmlkID09PSAnYWx3YXlzJyAmJiAhdGhpcy5tb2JpbGUpIHtcbiAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5lbCwgJ2Rpc3BsYXktZ3JpZCcpO1xuICAgIH0gZWxzZSBpZiAodGhpcy4kb3B0aW9ucy5kaXNwbGF5R3JpZCA9PT0gJ29uRHJhZyZSZXNpemUnICYmIHRoaXMuZHJhZ0luUHJvZ3Jlc3MpIHtcbiAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5lbCwgJ2Rpc3BsYXktZ3JpZCcpO1xuICAgIH0gZWxzZSBpZiAodGhpcy4kb3B0aW9ucy5kaXNwbGF5R3JpZCA9PT0gJ25vbmUnIHx8ICF0aGlzLmRyYWdJblByb2dyZXNzIHx8IHRoaXMubW9iaWxlKSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuZWwsICdkaXNwbGF5LWdyaWQnKTtcbiAgICB9XG4gICAgdGhpcy5zZXRHcmlkRGltZW5zaW9ucygpO1xuICAgIHRoaXMuZ3JpZENvbHVtbnMubGVuZ3RoID0gTWF0aC5tYXgodGhpcy5jb2x1bW5zLCBNYXRoLmZsb29yKHRoaXMuY3VyV2lkdGggLyB0aGlzLmN1ckNvbFdpZHRoKSkgfHwgMDtcbiAgICB0aGlzLmdyaWRSb3dzLmxlbmd0aCA9IE1hdGgubWF4KHRoaXMucm93cywgTWF0aC5mbG9vcih0aGlzLmN1ckhlaWdodCAvIHRoaXMuY3VyUm93SGVpZ2h0KSkgfHwgMDtcbiAgICB0aGlzLmNkUmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgYWRkSXRlbShpdGVtQ29tcG9uZW50OiBHcmlkc3Rlckl0ZW1Db21wb25lbnRJbnRlcmZhY2UpOiB2b2lkIHtcbiAgICBpZiAoaXRlbUNvbXBvbmVudC4kaXRlbS5jb2xzID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGl0ZW1Db21wb25lbnQuJGl0ZW0uY29scyA9IHRoaXMuJG9wdGlvbnMuZGVmYXVsdEl0ZW1Db2xzO1xuICAgICAgaXRlbUNvbXBvbmVudC5pdGVtLmNvbHMgPSBpdGVtQ29tcG9uZW50LiRpdGVtLmNvbHM7XG4gICAgICBpdGVtQ29tcG9uZW50Lml0ZW1DaGFuZ2VkKGl0ZW1Db21wb25lbnQuaXRlbSk7XG4gICAgfVxuICAgIGlmIChpdGVtQ29tcG9uZW50LiRpdGVtLnJvd3MgPT09IHVuZGVmaW5lZCkge1xuICAgICAgaXRlbUNvbXBvbmVudC4kaXRlbS5yb3dzID0gdGhpcy4kb3B0aW9ucy5kZWZhdWx0SXRlbVJvd3M7XG4gICAgICBpdGVtQ29tcG9uZW50Lml0ZW0ucm93cyA9IGl0ZW1Db21wb25lbnQuJGl0ZW0ucm93cztcbiAgICAgIGl0ZW1Db21wb25lbnQuaXRlbUNoYW5nZWQoaXRlbUNvbXBvbmVudC5pdGVtKTtcbiAgICB9XG4gICAgaWYgKGl0ZW1Db21wb25lbnQuJGl0ZW0ueCA9PT0gLTEgfHwgaXRlbUNvbXBvbmVudC4kaXRlbS55ID09PSAtMSkge1xuICAgICAgdGhpcy5hdXRvUG9zaXRpb25JdGVtKGl0ZW1Db21wb25lbnQpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5jaGVja0NvbGxpc2lvbihpdGVtQ29tcG9uZW50LiRpdGVtKSkge1xuICAgICAgaWYgKCF0aGlzLiRvcHRpb25zLmRpc2FibGVXYXJuaW5ncykge1xuICAgICAgICBpdGVtQ29tcG9uZW50Lm5vdFBsYWNlZCA9IHRydWU7XG4gICAgICAgIGNvbnNvbGUud2FybignQ2FuXFwndCBiZSBwbGFjZWQgaW4gdGhlIGJvdW5kcyBvZiB0aGUgZGFzaGJvYXJkLCB0cnlpbmcgdG8gYXV0byBwb3NpdGlvbiEvbicgK1xuICAgICAgICAgIEpTT04uc3RyaW5naWZ5KGl0ZW1Db21wb25lbnQuaXRlbSwgWydjb2xzJywgJ3Jvd3MnLCAneCcsICd5J10pKTtcbiAgICAgIH1cbiAgICAgIGlmICghdGhpcy4kb3B0aW9ucy5kaXNhYmxlQXV0b1Bvc2l0aW9uT25Db25mbGljdCkge1xuICAgICAgICB0aGlzLmF1dG9Qb3NpdGlvbkl0ZW0oaXRlbUNvbXBvbmVudCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpdGVtQ29tcG9uZW50Lm5vdFBsYWNlZCA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuZ3JpZC5wdXNoKGl0ZW1Db21wb25lbnQpO1xuICAgIHRoaXMuY2FsY3VsYXRlTGF5b3V0RGVib3VuY2UoKTtcbiAgfVxuXG4gIHJlbW92ZUl0ZW0oaXRlbUNvbXBvbmVudDogR3JpZHN0ZXJJdGVtQ29tcG9uZW50SW50ZXJmYWNlKTogdm9pZCB7XG4gICAgdGhpcy5ncmlkLnNwbGljZSh0aGlzLmdyaWQuaW5kZXhPZihpdGVtQ29tcG9uZW50KSwgMSk7XG4gICAgdGhpcy5jYWxjdWxhdGVMYXlvdXREZWJvdW5jZSgpO1xuICAgIGlmICh0aGlzLm9wdGlvbnMuaXRlbVJlbW92ZWRDYWxsYmFjaykge1xuICAgICAgdGhpcy5vcHRpb25zLml0ZW1SZW1vdmVkQ2FsbGJhY2soaXRlbUNvbXBvbmVudC5pdGVtLCBpdGVtQ29tcG9uZW50KTtcbiAgICB9XG4gIH1cblxuICBjaGVja0NvbGxpc2lvbihpdGVtOiBHcmlkc3Rlckl0ZW0pOiBHcmlkc3Rlckl0ZW1Db21wb25lbnRJbnRlcmZhY2UgfCBib29sZWFuIHtcbiAgICBsZXQgY29sbGlzaW9uOiBHcmlkc3Rlckl0ZW1Db21wb25lbnRJbnRlcmZhY2UgfCBib29sZWFuID0gZmFsc2U7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5pdGVtVmFsaWRhdGVDYWxsYmFjaykge1xuICAgICAgY29sbGlzaW9uID0gIXRoaXMub3B0aW9ucy5pdGVtVmFsaWRhdGVDYWxsYmFjayhpdGVtKTtcbiAgICB9XG4gICAgaWYgKCFjb2xsaXNpb24gJiYgdGhpcy5jaGVja0dyaWRDb2xsaXNpb24oaXRlbSkpIHtcbiAgICAgIGNvbGxpc2lvbiA9IHRydWU7XG4gICAgfVxuICAgIGlmICghY29sbGlzaW9uKSB7XG4gICAgICBjb25zdCBjID0gdGhpcy5maW5kSXRlbVdpdGhJdGVtKGl0ZW0pO1xuICAgICAgaWYgKGMpIHtcbiAgICAgICAgY29sbGlzaW9uID0gYztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGNvbGxpc2lvbjtcbiAgfVxuXG4gIGNoZWNrR3JpZENvbGxpc2lvbihpdGVtOiBHcmlkc3Rlckl0ZW0pOiBib29sZWFuIHtcbiAgICBjb25zdCBub05lZ2F0aXZlUG9zaXRpb24gPSBpdGVtLnkgPiAtMSAmJiBpdGVtLnggPiAtMTtcbiAgICBjb25zdCBtYXhHcmlkQ29scyA9IGl0ZW0uY29scyArIGl0ZW0ueCA8PSB0aGlzLiRvcHRpb25zLm1heENvbHM7XG4gICAgY29uc3QgbWF4R3JpZFJvd3MgPSBpdGVtLnJvd3MgKyBpdGVtLnkgPD0gdGhpcy4kb3B0aW9ucy5tYXhSb3dzO1xuICAgIGNvbnN0IG1heEl0ZW1Db2xzID0gaXRlbS5tYXhJdGVtQ29scyA9PT0gdW5kZWZpbmVkID8gdGhpcy4kb3B0aW9ucy5tYXhJdGVtQ29scyA6IGl0ZW0ubWF4SXRlbUNvbHM7XG4gICAgY29uc3QgbWluSXRlbUNvbHMgPSBpdGVtLm1pbkl0ZW1Db2xzID09PSB1bmRlZmluZWQgPyB0aGlzLiRvcHRpb25zLm1pbkl0ZW1Db2xzIDogaXRlbS5taW5JdGVtQ29scztcbiAgICBjb25zdCBtYXhJdGVtUm93cyA9IGl0ZW0ubWF4SXRlbVJvd3MgPT09IHVuZGVmaW5lZCA/IHRoaXMuJG9wdGlvbnMubWF4SXRlbVJvd3MgOiBpdGVtLm1heEl0ZW1Sb3dzO1xuICAgIGNvbnN0IG1pbkl0ZW1Sb3dzID0gaXRlbS5taW5JdGVtUm93cyA9PT0gdW5kZWZpbmVkID8gdGhpcy4kb3B0aW9ucy5taW5JdGVtUm93cyA6IGl0ZW0ubWluSXRlbVJvd3M7XG4gICAgY29uc3QgaW5Db2xzTGltaXRzID0gaXRlbS5jb2xzIDw9IG1heEl0ZW1Db2xzICYmIGl0ZW0uY29scyA+PSBtaW5JdGVtQ29scztcbiAgICBjb25zdCBpblJvd3NMaW1pdHMgPSBpdGVtLnJvd3MgPD0gbWF4SXRlbVJvd3MgJiYgaXRlbS5yb3dzID49IG1pbkl0ZW1Sb3dzO1xuICAgIGNvbnN0IG1pbkFyZWFMaW1pdCA9IGl0ZW0ubWluSXRlbUFyZWEgPT09IHVuZGVmaW5lZCA/IHRoaXMuJG9wdGlvbnMubWluSXRlbUFyZWEgOiBpdGVtLm1pbkl0ZW1BcmVhO1xuICAgIGNvbnN0IG1heEFyZWFMaW1pdCA9IGl0ZW0ubWF4SXRlbUFyZWEgPT09IHVuZGVmaW5lZCA/IHRoaXMuJG9wdGlvbnMubWF4SXRlbUFyZWEgOiBpdGVtLm1heEl0ZW1BcmVhO1xuICAgIGNvbnN0IGFyZWEgPSBpdGVtLmNvbHMgKiBpdGVtLnJvd3M7XG4gICAgY29uc3QgaW5NaW5BcmVhID0gbWluQXJlYUxpbWl0IDw9IGFyZWE7XG4gICAgY29uc3QgaW5NYXhBcmVhID0gbWF4QXJlYUxpbWl0ID49IGFyZWE7XG4gICAgcmV0dXJuICEobm9OZWdhdGl2ZVBvc2l0aW9uICYmIG1heEdyaWRDb2xzICYmIG1heEdyaWRSb3dzICYmIGluQ29sc0xpbWl0cyAmJiBpblJvd3NMaW1pdHMgJiYgaW5NaW5BcmVhICYmIGluTWF4QXJlYSk7XG4gIH1cblxuICBmaW5kSXRlbVdpdGhJdGVtKGl0ZW06IEdyaWRzdGVySXRlbSk6IEdyaWRzdGVySXRlbUNvbXBvbmVudEludGVyZmFjZSB8IGJvb2xlYW4ge1xuICAgIGxldCB3aWRnZXRzSW5kZXg6IG51bWJlciA9IHRoaXMuZ3JpZC5sZW5ndGggLSAxLCB3aWRnZXQ6IEdyaWRzdGVySXRlbUNvbXBvbmVudEludGVyZmFjZTtcbiAgICBmb3IgKDsgd2lkZ2V0c0luZGV4ID4gLTE7IHdpZGdldHNJbmRleC0tKSB7XG4gICAgICB3aWRnZXQgPSB0aGlzLmdyaWRbd2lkZ2V0c0luZGV4XTtcbiAgICAgIGlmICh3aWRnZXQuJGl0ZW0gIT09IGl0ZW0gJiYgR3JpZHN0ZXJDb21wb25lbnQuY2hlY2tDb2xsaXNpb25Ud29JdGVtcyh3aWRnZXQuJGl0ZW0sIGl0ZW0pKSB7XG4gICAgICAgIHJldHVybiB3aWRnZXQ7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGZpbmRJdGVtc1dpdGhJdGVtKGl0ZW06IEdyaWRzdGVySXRlbSk6IEFycmF5PEdyaWRzdGVySXRlbUNvbXBvbmVudEludGVyZmFjZT4ge1xuICAgIGNvbnN0IGE6IEFycmF5PEdyaWRzdGVySXRlbUNvbXBvbmVudEludGVyZmFjZT4gPSBbXTtcbiAgICBsZXQgd2lkZ2V0c0luZGV4OiBudW1iZXIgPSB0aGlzLmdyaWQubGVuZ3RoIC0gMSwgd2lkZ2V0OiBHcmlkc3Rlckl0ZW1Db21wb25lbnRJbnRlcmZhY2U7XG4gICAgZm9yICg7IHdpZGdldHNJbmRleCA+IC0xOyB3aWRnZXRzSW5kZXgtLSkge1xuICAgICAgd2lkZ2V0ID0gdGhpcy5ncmlkW3dpZGdldHNJbmRleF07XG4gICAgICBpZiAod2lkZ2V0LiRpdGVtICE9PSBpdGVtICYmIEdyaWRzdGVyQ29tcG9uZW50LmNoZWNrQ29sbGlzaW9uVHdvSXRlbXMod2lkZ2V0LiRpdGVtLCBpdGVtKSkge1xuICAgICAgICBhLnB1c2god2lkZ2V0KTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGE7XG4gIH1cblxuICBhdXRvUG9zaXRpb25JdGVtKGl0ZW1Db21wb25lbnQ6IEdyaWRzdGVySXRlbUNvbXBvbmVudEludGVyZmFjZSk6IHZvaWQge1xuICAgIGlmICh0aGlzLmdldE5leHRQb3NzaWJsZVBvc2l0aW9uKGl0ZW1Db21wb25lbnQuJGl0ZW0pKSB7XG4gICAgICBsZXQgb2xkSXRlbSA9IHtcbiAgICAgICAgeDogaXRlbUNvbXBvbmVudC5pdGVtLngsXG4gICAgICAgIHk6IGl0ZW1Db21wb25lbnQuaXRlbS55LFxuICAgICAgICByb3dzOiBpdGVtQ29tcG9uZW50Lml0ZW0ucm93cyxcbiAgICAgICAgY29sczogaXRlbUNvbXBvbmVudC5pdGVtLmNvbHNcbiAgICAgIH07XG4gICAgICBpdGVtQ29tcG9uZW50Lm5vdFBsYWNlZCA9IGZhbHNlO1xuICAgICAgaXRlbUNvbXBvbmVudC5pdGVtLnggPSBpdGVtQ29tcG9uZW50LiRpdGVtLng7XG4gICAgICBpdGVtQ29tcG9uZW50Lml0ZW0ueSA9IGl0ZW1Db21wb25lbnQuJGl0ZW0ueTtcbiAgICAgIGl0ZW1Db21wb25lbnQuaXRlbUNoYW5nZWQob2xkSXRlbSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGl0ZW1Db21wb25lbnQubm90UGxhY2VkID0gdHJ1ZTtcbiAgICAgIGlmICghdGhpcy4kb3B0aW9ucy5kaXNhYmxlV2FybmluZ3MpIHtcbiAgICAgICAgY29uc29sZS53YXJuKCdDYW5cXCd0IGJlIHBsYWNlZCBpbiB0aGUgYm91bmRzIG9mIHRoZSBkYXNoYm9hcmQhL24nICtcbiAgICAgICAgICBKU09OLnN0cmluZ2lmeShpdGVtQ29tcG9uZW50Lml0ZW0sIFsnY29scycsICdyb3dzJywgJ3gnLCAneSddKSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZ2V0TmV4dFBvc3NpYmxlUG9zaXRpb24obmV3SXRlbTogR3JpZHN0ZXJJdGVtLCBzdGFydGluZ0Zyb206IHsgeT86IG51bWJlciwgeD86IG51bWJlciB9ID0ge30pOiBib29sZWFuIHtcbiAgICBpZiAobmV3SXRlbS5jb2xzID09PSAtMSkge1xuICAgICAgbmV3SXRlbS5jb2xzID0gdGhpcy4kb3B0aW9ucy5kZWZhdWx0SXRlbUNvbHM7XG4gICAgfVxuICAgIGlmIChuZXdJdGVtLnJvd3MgPT09IC0xKSB7XG4gICAgICBuZXdJdGVtLnJvd3MgPSB0aGlzLiRvcHRpb25zLmRlZmF1bHRJdGVtUm93cztcbiAgICB9XG4gICAgdGhpcy5zZXRHcmlkRGltZW5zaW9ucygpO1xuICAgIGxldCByb3dzSW5kZXggPSBzdGFydGluZ0Zyb20ueSB8fCAwLCBjb2xzSW5kZXg7XG4gICAgZm9yICg7IHJvd3NJbmRleCA8IHRoaXMucm93czsgcm93c0luZGV4KyspIHtcbiAgICAgIG5ld0l0ZW0ueSA9IHJvd3NJbmRleDtcbiAgICAgIGNvbHNJbmRleCA9IHN0YXJ0aW5nRnJvbS54IHx8IDA7XG4gICAgICBmb3IgKDsgY29sc0luZGV4IDwgdGhpcy5jb2x1bW5zOyBjb2xzSW5kZXgrKykge1xuICAgICAgICBuZXdJdGVtLnggPSBjb2xzSW5kZXg7XG4gICAgICAgIGlmICghdGhpcy5jaGVja0NvbGxpc2lvbihuZXdJdGVtKSkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGNvbnN0IGNhbkFkZFRvUm93cyA9IHRoaXMuJG9wdGlvbnMubWF4Um93cyA+PSB0aGlzLnJvd3MgKyBuZXdJdGVtLnJvd3M7XG4gICAgY29uc3QgY2FuQWRkVG9Db2x1bW5zID0gdGhpcy4kb3B0aW9ucy5tYXhDb2xzID49IHRoaXMuY29sdW1ucyArIG5ld0l0ZW0uY29scztcbiAgICBjb25zdCBhZGRUb1Jvd3MgPSB0aGlzLnJvd3MgPD0gdGhpcy5jb2x1bW5zICYmIGNhbkFkZFRvUm93cztcbiAgICBpZiAoIWFkZFRvUm93cyAmJiBjYW5BZGRUb0NvbHVtbnMpIHtcbiAgICAgIG5ld0l0ZW0ueCA9IHRoaXMuY29sdW1ucztcbiAgICAgIG5ld0l0ZW0ueSA9IDA7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2UgaWYgKGNhbkFkZFRvUm93cykge1xuICAgICAgbmV3SXRlbS55ID0gdGhpcy5yb3dzO1xuICAgICAgbmV3SXRlbS54ID0gMDtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBnZXRGaXJzdFBvc3NpYmxlUG9zaXRpb24oaXRlbTogR3JpZHN0ZXJJdGVtKTogR3JpZHN0ZXJJdGVtIHtcbiAgICBjb25zdCB0bXBJdGVtID0gT2JqZWN0LmFzc2lnbih7fSwgaXRlbSk7XG4gICAgdGhpcy5nZXROZXh0UG9zc2libGVQb3NpdGlvbih0bXBJdGVtKTtcbiAgICByZXR1cm4gdG1wSXRlbTtcbiAgfVxuXG4gIGdldExhc3RQb3NzaWJsZVBvc2l0aW9uKGl0ZW06IEdyaWRzdGVySXRlbSk6IEdyaWRzdGVySXRlbSB7XG4gICAgbGV0IGZhcnRoZXN0SXRlbTogeyB5OiBudW1iZXIsIHg6IG51bWJlciB9ID0ge3k6IDAsIHg6IDB9O1xuICAgIGZhcnRoZXN0SXRlbSA9IHRoaXMuZ3JpZC5yZWR1Y2UoKHByZXY6IGFueSwgY3VycjogR3JpZHN0ZXJJdGVtQ29tcG9uZW50SW50ZXJmYWNlKSA9PiB7XG4gICAgICBjb25zdCBjdXJyQ29vcmRzID0ge3k6IGN1cnIuJGl0ZW0ueSArIGN1cnIuJGl0ZW0ucm93cyAtIDEsIHg6IGN1cnIuJGl0ZW0ueCArIGN1cnIuJGl0ZW0uY29scyAtIDF9O1xuICAgICAgaWYgKEdyaWRzdGVyVXRpbHMuY29tcGFyZUl0ZW1zKHByZXYsIGN1cnJDb29yZHMpID09PSAxKSB7XG4gICAgICAgIHJldHVybiBjdXJyQ29vcmRzO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHByZXY7XG4gICAgICB9XG4gICAgfSwgZmFydGhlc3RJdGVtKTtcblxuICAgIGNvbnN0IHRtcEl0ZW0gPSBPYmplY3QuYXNzaWduKHt9LCBpdGVtKTtcbiAgICB0aGlzLmdldE5leHRQb3NzaWJsZVBvc2l0aW9uKHRtcEl0ZW0sIGZhcnRoZXN0SXRlbSk7XG4gICAgcmV0dXJuIHRtcEl0ZW07XG4gIH1cblxuICBwaXhlbHNUb1Bvc2l0aW9uWCh4OiBudW1iZXIsIHJvdW5kaW5nTWV0aG9kOiBGdW5jdGlvbiwgbm9MaW1pdD86IGJvb2xlYW4pOiBudW1iZXIge1xuICAgIGNvbnN0IHBvc2l0aW9uID0gcm91bmRpbmdNZXRob2QoeCAvIHRoaXMuY3VyQ29sV2lkdGgpO1xuICAgIGlmIChub0xpbWl0KSB7XG4gICAgICByZXR1cm4gcG9zaXRpb247XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBNYXRoLm1heChwb3NpdGlvbiwgMCk7XG4gICAgfVxuICB9XG5cbiAgcGl4ZWxzVG9Qb3NpdGlvblkoeTogbnVtYmVyLCByb3VuZGluZ01ldGhvZDogRnVuY3Rpb24sIG5vTGltaXQ/OiBib29sZWFuKTogbnVtYmVyIHtcbiAgICBjb25zdCBwb3NpdGlvbiA9IHJvdW5kaW5nTWV0aG9kKHkgLyB0aGlzLmN1clJvd0hlaWdodCk7XG4gICAgaWYgKG5vTGltaXQpIHtcbiAgICAgIHJldHVybiBwb3NpdGlvbjtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIE1hdGgubWF4KHBvc2l0aW9uLCAwKTtcbiAgICB9XG4gIH1cblxuICBwb3NpdGlvblhUb1BpeGVscyh4OiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiB4ICogdGhpcy5jdXJDb2xXaWR0aDtcbiAgfVxuXG4gIHBvc2l0aW9uWVRvUGl4ZWxzKHk6IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIHkgKiB0aGlzLmN1clJvd0hlaWdodDtcbiAgfVxufVxuIl19
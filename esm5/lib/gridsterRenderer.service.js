/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { GridsterComponentInterface } from './gridster.interface';
import { GridType } from './gridsterConfig.interface';
var GridsterRenderer = /** @class */ (function () {
    function GridsterRenderer(gridster) {
        this.gridster = gridster;
    }
    /**
     * @return {?}
     */
    GridsterRenderer.prototype.destroy = /**
     * @return {?}
     */
    function () {
        delete this.gridster;
    };
    /**
     * @param {?} el
     * @param {?} item
     * @param {?} renderer
     * @return {?}
     */
    GridsterRenderer.prototype.updateItem = /**
     * @param {?} el
     * @param {?} item
     * @param {?} renderer
     * @return {?}
     */
    function (el, item, renderer) {
        if (this.gridster.mobile) {
            this.clearCellPosition(renderer, el);
            if (this.gridster.$options.keepFixedHeightInMobile) {
                renderer.setStyle(el, 'height', (item.rows * this.gridster.$options.fixedRowHeight) + 'px');
            }
            else {
                renderer.setStyle(el, 'height', (this.gridster.curWidth / 2 * item.rows) + 'px');
            }
            if (this.gridster.$options.keepFixedWidthInMobile) {
                renderer.setStyle(el, 'width', this.gridster.$options.fixedColWidth + 'px');
            }
            else {
                renderer.setStyle(el, 'width', '');
            }
            renderer.setStyle(el, 'margin-bottom', this.gridster.$options.margin + 'px');
            renderer.setStyle(el, 'margin-right', '');
        }
        else {
            /** @type {?} */
            var x = Math.round(this.gridster.curColWidth * item.x);
            /** @type {?} */
            var y = Math.round(this.gridster.curRowHeight * item.y);
            /** @type {?} */
            var width = this.gridster.curColWidth * item.cols - this.gridster.$options.margin;
            /** @type {?} */
            var height = (this.gridster.curRowHeight * item.rows - this.gridster.$options.margin);
            // set the cell style
            this.setCellPosition(renderer, el, x, y);
            renderer.setStyle(el, 'width', width + 'px');
            renderer.setStyle(el, 'height', height + 'px');
            /** @type {?} */
            var marginBottom = null;
            /** @type {?} */
            var marginRight = null;
            if (this.gridster.$options.outerMargin) {
                if (this.gridster.rows === item.rows + item.y) {
                    if (this.gridster.$options.outerMarginBottom !== null) {
                        marginBottom = this.gridster.$options.outerMarginBottom + 'px';
                    }
                    else {
                        marginBottom = this.gridster.$options.margin + 'px';
                    }
                }
                if (this.gridster.columns === item.cols + item.x) {
                    if (this.gridster.$options.outerMarginBottom !== null) {
                        marginRight = this.gridster.$options.outerMarginRight + 'px';
                    }
                    else {
                        marginRight = this.gridster.$options.margin + 'px';
                    }
                }
            }
            renderer.setStyle(el, 'margin-bottom', marginBottom);
            renderer.setStyle(el, 'margin-right', marginRight);
        }
    };
    /**
     * @return {?}
     */
    GridsterRenderer.prototype.updateGridster = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var addClass = '';
        /** @type {?} */
        var removeClass1 = '';
        /** @type {?} */
        var removeClass2 = '';
        /** @type {?} */
        var removeClass3 = '';
        if (this.gridster.$options.gridType === GridType.Fit) {
            addClass = GridType.Fit;
            removeClass1 = GridType.ScrollVertical;
            removeClass2 = GridType.ScrollHorizontal;
            removeClass3 = GridType.Fixed;
        }
        else if (this.gridster.$options.gridType === GridType.ScrollVertical) {
            this.gridster.curRowHeight = this.gridster.curColWidth;
            addClass = GridType.ScrollVertical;
            removeClass1 = GridType.Fit;
            removeClass2 = GridType.ScrollHorizontal;
            removeClass3 = GridType.Fixed;
        }
        else if (this.gridster.$options.gridType === GridType.ScrollHorizontal) {
            this.gridster.curColWidth = this.gridster.curRowHeight;
            addClass = GridType.ScrollHorizontal;
            removeClass1 = GridType.Fit;
            removeClass2 = GridType.ScrollVertical;
            removeClass3 = GridType.Fixed;
        }
        else if (this.gridster.$options.gridType === GridType.Fixed) {
            this.gridster.curColWidth = this.gridster.$options.fixedColWidth +
                (this.gridster.$options.ignoreMarginInRow ? 0 : this.gridster.$options.margin);
            this.gridster.curRowHeight = this.gridster.$options.fixedRowHeight +
                (this.gridster.$options.ignoreMarginInRow ? 0 : this.gridster.$options.margin);
            addClass = GridType.Fixed;
            removeClass1 = GridType.Fit;
            removeClass2 = GridType.ScrollVertical;
            removeClass3 = GridType.ScrollHorizontal;
        }
        else if (this.gridster.$options.gridType === GridType.VerticalFixed) {
            this.gridster.curRowHeight = this.gridster.$options.fixedRowHeight +
                (this.gridster.$options.ignoreMarginInRow ? 0 : this.gridster.$options.margin);
            addClass = GridType.ScrollVertical;
            removeClass1 = GridType.Fit;
            removeClass2 = GridType.ScrollHorizontal;
            removeClass3 = GridType.Fixed;
        }
        else if (this.gridster.$options.gridType === GridType.HorizontalFixed) {
            this.gridster.curColWidth = this.gridster.$options.fixedColWidth +
                (this.gridster.$options.ignoreMarginInRow ? 0 : this.gridster.$options.margin);
            addClass = GridType.ScrollHorizontal;
            removeClass1 = GridType.Fit;
            removeClass2 = GridType.ScrollVertical;
            removeClass3 = GridType.Fixed;
        }
        if (this.gridster.mobile) {
            this.gridster.renderer.removeClass(this.gridster.el, addClass);
        }
        else {
            this.gridster.renderer.addClass(this.gridster.el, addClass);
        }
        this.gridster.renderer.removeClass(this.gridster.el, removeClass1);
        this.gridster.renderer.removeClass(this.gridster.el, removeClass2);
        this.gridster.renderer.removeClass(this.gridster.el, removeClass3);
    };
    /**
     * @param {?} i
     * @return {?}
     */
    GridsterRenderer.prototype.getGridColumnStyle = /**
     * @param {?} i
     * @return {?}
     */
    function (i) {
        return tslib_1.__assign({}, this.getLeftPosition(this.gridster.curColWidth * i), { width: this.gridster.curColWidth - this.gridster.$options.margin + 'px', height: this.gridster.gridRows.length * this.gridster.curRowHeight - this.gridster.$options.margin + 'px' });
    };
    /**
     * @param {?} i
     * @return {?}
     */
    GridsterRenderer.prototype.getGridRowStyle = /**
     * @param {?} i
     * @return {?}
     */
    function (i) {
        return tslib_1.__assign({}, this.getTopPosition(this.gridster.curRowHeight * i), { width: this.gridster.gridColumns.length * this.gridster.curColWidth - this.gridster.$options.margin + 'px', height: this.gridster.curRowHeight - this.gridster.$options.margin + 'px' });
    };
    /**
     * @param {?} d
     * @return {?}
     */
    GridsterRenderer.prototype.getLeftPosition = /**
     * @param {?} d
     * @return {?}
     */
    function (d) {
        if (this.gridster.$options.useTransformPositioning) {
            return {
                transform: 'translateX(' + d + 'px)',
            };
        }
        else {
            return {
                left: (this.getLeftMargin() + d) + 'px'
            };
        }
    };
    /**
     * @param {?} d
     * @return {?}
     */
    GridsterRenderer.prototype.getTopPosition = /**
     * @param {?} d
     * @return {?}
     */
    function (d) {
        if (this.gridster.$options.useTransformPositioning) {
            return {
                transform: 'translateY(' + d + 'px)',
            };
        }
        else {
            return {
                top: this.getTopMargin() + d + 'px'
            };
        }
    };
    /**
     * @param {?} renderer
     * @param {?} el
     * @return {?}
     */
    GridsterRenderer.prototype.clearCellPosition = /**
     * @param {?} renderer
     * @param {?} el
     * @return {?}
     */
    function (renderer, el) {
        if (this.gridster.$options.useTransformPositioning) {
            renderer.setStyle(el, 'transform', '');
        }
        else {
            renderer.setStyle(el, 'top', '');
            renderer.setStyle(el, 'left', '');
        }
    };
    /**
     * @param {?} renderer
     * @param {?} el
     * @param {?} x
     * @param {?} y
     * @return {?}
     */
    GridsterRenderer.prototype.setCellPosition = /**
     * @param {?} renderer
     * @param {?} el
     * @param {?} x
     * @param {?} y
     * @return {?}
     */
    function (renderer, el, x, y) {
        if (this.gridster.$options.useTransformPositioning) {
            /** @type {?} */
            var transform = 'translate3d(' + x + 'px, ' + y + 'px, 0)';
            renderer.setStyle(el, 'transform', transform);
        }
        else {
            renderer.setStyle(el, 'left', this.getLeftMargin() + x + 'px');
            renderer.setStyle(el, 'top', this.getTopMargin() + y + 'px');
        }
    };
    /**
     * @return {?}
     */
    GridsterRenderer.prototype.getLeftMargin = /**
     * @return {?}
     */
    function () {
        if (this.gridster.$options.outerMargin) {
            if (this.gridster.$options.outerMarginLeft !== null) {
                return this.gridster.$options.outerMarginLeft;
            }
            else {
                return this.gridster.$options.margin;
            }
        }
        else {
            return 0;
        }
    };
    /**
     * @return {?}
     */
    GridsterRenderer.prototype.getTopMargin = /**
     * @return {?}
     */
    function () {
        if (this.gridster.$options.outerMargin) {
            if (this.gridster.$options.outerMarginTop !== null) {
                return this.gridster.$options.outerMarginTop;
            }
            else {
                return this.gridster.$options.margin;
            }
        }
        else {
            return 0;
        }
    };
    GridsterRenderer.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    GridsterRenderer.ctorParameters = function () { return [
        { type: GridsterComponentInterface }
    ]; };
    return GridsterRenderer;
}());
export { GridsterRenderer };
if (false) {
    /**
     * @type {?}
     * @private
     */
    GridsterRenderer.prototype.gridster;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZHN0ZXJSZW5kZXJlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1ncmlkc3RlcjIvIiwic291cmNlcyI6WyJsaWIvZ3JpZHN0ZXJSZW5kZXJlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFDLFVBQVUsRUFBWSxNQUFNLGVBQWUsQ0FBQztBQUVwRCxPQUFPLEVBQUMsMEJBQTBCLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUNoRSxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sNEJBQTRCLENBQUM7QUFHcEQ7SUFHRSwwQkFBb0IsUUFBb0M7UUFBcEMsYUFBUSxHQUFSLFFBQVEsQ0FBNEI7SUFDeEQsQ0FBQzs7OztJQUVELGtDQUFPOzs7SUFBUDtRQUNFLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN2QixDQUFDOzs7Ozs7O0lBRUQscUNBQVU7Ozs7OztJQUFWLFVBQVcsRUFBTyxFQUFFLElBQWtCLEVBQUUsUUFBbUI7UUFDekQsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRTtZQUN4QixJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ3JDLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsdUJBQXVCLEVBQUU7Z0JBQ2xELFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRSxFQUFFLFFBQVEsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7YUFDN0Y7aUJBQU07Z0JBQ0wsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUUsUUFBUSxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQzthQUNs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Q0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQzthQUM5QztpQkFBTTtnQkFDTCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQzthQUN0QztTQUNGO2FBQU07WUFDTCxPQUFPLENBQUMsQ0FBQztTQUNWO0lBQ0gsQ0FBQzs7Z0JBck1GLFVBQVU7Ozs7Z0JBSkgsMEJBQTBCOztJQTBNbEMsdUJBQUM7Q0FBQSxBQXRNRCxJQXNNQztTQXJNWSxnQkFBZ0I7Ozs7OztJQUVmLG9DQUE0QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZSwgUmVuZGVyZXIyfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtHcmlkc3RlckNvbXBvbmVudEludGVyZmFjZX0gZnJvbSAnLi9ncmlkc3Rlci5pbnRlcmZhY2UnO1xuaW1wb3J0IHtHcmlkVHlwZX0gZnJvbSAnLi9ncmlkc3RlckNvbmZpZy5pbnRlcmZhY2UnO1xuaW1wb3J0IHtHcmlkc3Rlckl0ZW19IGZyb20gJy4vZ3JpZHN0ZXJJdGVtLmludGVyZmFjZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBHcmlkc3RlclJlbmRlcmVyIHtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGdyaWRzdGVyOiBHcmlkc3RlckNvbXBvbmVudEludGVyZmFjZSkge1xuICB9XG5cbiAgZGVzdHJveSgpOiB2b2lkIHtcbiAgICBkZWxldGUgdGhpcy5ncmlkc3RlcjtcbiAgfVxuXG4gIHVwZGF0ZUl0ZW0oZWw6IGFueSwgaXRlbTogR3JpZHN0ZXJJdGVtLCByZW5kZXJlcjogUmVuZGVyZXIyKSB7XG4gICAgaWYgKHRoaXMuZ3JpZHN0ZXIubW9iaWxlKSB7XG4gICAgICB0aGlzLmNsZWFyQ2VsbFBvc2l0aW9uKHJlbmRlcmVyLCBlbCk7XG4gICAgICBpZiAodGhpcy5ncmlkc3Rlci4kb3B0aW9ucy5rZWVwRml4ZWRIZWlnaHRJbk1vYmlsZSkge1xuICAgICAgICByZW5kZXJlci5zZXRTdHlsZShlbCwgJ2hlaWdodCcsIChpdGVtLnJvd3MgKiB0aGlzLmdyaWRzdGVyLiRvcHRpb25zLmZpeGVkUm93SGVpZ2h0KSArICdweCcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVuZGVyZXIuc2V0U3R5bGUoZWwsICdoZWlnaHQnLCAodGhpcy5ncmlkc3Rlci5jdXJXaWR0aCAvIDIgKiBpdGVtLnJvd3MpICsgJ3B4Jyk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5ncmlkc3Rlci4kb3B0aW9ucy5rZWVwRml4ZWRXaWR0aEluTW9iaWxlKSB7XG4gICAgICAgIHJlbmRlcmVyLnNldFN0eWxlKGVsLCAnd2lkdGgnLCB0aGlzLmdyaWRzdGVyLiRvcHRpb25zLmZpeGVkQ29sV2lkdGggKyAncHgnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlbmRlcmVyLnNldFN0eWxlKGVsLCAnd2lkdGgnLCAnJyk7XG4gICAgICB9XG5cbiAgICAgIHJlbmRlcmVyLnNldFN0eWxlKGVsLCAnbWFyZ2luLWJvdHRvbScsIHRoaXMuZ3JpZHN0ZXIuJG9wdGlvbnMubWFyZ2luICsgJ3B4Jyk7XG4gICAgICByZW5kZXJlci5zZXRTdHlsZShlbCwgJ21hcmdpbi1yaWdodCcsICcnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgeCA9IE1hdGgucm91bmQodGhpcy5ncmlkc3Rlci5jdXJDb2xXaWR0aCAqIGl0ZW0ueCk7XG4gICAgICBjb25zdCB5ID0gTWF0aC5yb3VuZCh0aGlzLmdyaWRzdGVyLmN1clJvd0hlaWdodCAqIGl0ZW0ueSk7XG4gICAgICBjb25zdCB3aWR0aCA9IHRoaXMuZ3JpZHN0ZXIuY3VyQ29sV2lkdGggKiBpdGVtLmNvbHMgLSB0aGlzLmdyaWRzdGVyLiRvcHRpb25zLm1hcmdpbjtcbiAgICAgIGNvbnN0IGhlaWdodCA9ICh0aGlzLmdyaWRzdGVyLmN1clJvd0hlaWdodCAqIGl0ZW0ucm93cyAtIHRoaXMuZ3JpZHN0ZXIuJG9wdGlvbnMubWFyZ2luKTtcbiAgICAgIC8vIHNldCB0aGUgY2VsbCBzdHlsZVxuICAgICAgdGhpcy5zZXRDZWxsUG9zaXRpb24ocmVuZGVyZXIsIGVsLCB4LCB5KTtcbiAgICAgIHJlbmRlcmVyLnNldFN0eWxlKGVsLCAnd2lkdGgnLCB3aWR0aCArICdweCcpO1xuICAgICAgcmVuZGVyZXIuc2V0U3R5bGUoZWwsICdoZWlnaHQnLCBoZWlnaHQgKyAncHgnKTtcbiAgICAgIGxldCBtYXJnaW5Cb3R0b206IHN0cmluZyB8IG51bGwgPSBudWxsO1xuICAgICAgbGV0IG1hcmdpblJpZ2h0OiBzdHJpbmcgfCBudWxsID0gbnVsbDtcbiAgICAgIGlmICh0aGlzLmdyaWRzdGVyLiRvcHRpb25zLm91dGVyTWFyZ2luKSB7XG4gICAgICAgIGlmICh0aGlzLmdyaWRzdGVyLnJvd3MgPT09IGl0ZW0ucm93cyArIGl0ZW0ueSkge1xuICAgICAgICAgIGlmICh0aGlzLmdyaWRzdGVyLiRvcHRpb25zLm91dGVyTWFyZ2luQm90dG9tICE9PSBudWxsKSB7XG4gICAgICAgICAgICBtYXJnaW5Cb3R0b20gPSB0aGlzLmdyaWRzdGVyLiRvcHRpb25zLm91dGVyTWFyZ2luQm90dG9tICsgJ3B4JztcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbWFyZ2luQm90dG9tID0gdGhpcy5ncmlkc3Rlci4kb3B0aW9ucy5tYXJnaW4gKyAncHgnO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5ncmlkc3Rlci5jb2x1bW5zID09PSBpdGVtLmNvbHMgKyBpdGVtLngpIHtcbiAgICAgICAgICBpZiAodGhpcy5ncmlkc3Rlci4kb3B0aW9ucy5vdXRlck1hcmdpbkJvdHRvbSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgbWFyZ2luUmlnaHQgPSB0aGlzLmdyaWRzdGVyLiRvcHRpb25zLm91dGVyTWFyZ2luUmlnaHQgKyAncHgnO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtYXJnaW5SaWdodCA9IHRoaXMuZ3JpZHN0ZXIuJG9wdGlvbnMubWFyZ2luICsgJ3B4JztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmVuZGVyZXIuc2V0U3R5bGUoZWwsICdtYXJnaW4tYm90dG9tJywgbWFyZ2luQm90dG9tKTtcbiAgICAgIHJlbmRlcmVyLnNldFN0eWxlKGVsLCAnbWFyZ2luLXJpZ2h0JywgbWFyZ2luUmlnaHQpO1xuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZUdyaWRzdGVyKCkge1xuICAgIGxldCBhZGRDbGFzcyA9ICcnO1xuICAgIGxldCByZW1vdmVDbGFzczEgPSAnJztcbiAgICBsZXQgcmVtb3ZlQ2xhc3MyID0gJyc7XG4gICAgbGV0IHJlbW92ZUNsYXNzMyA9ICcnO1xuICAgIGlmICh0aGlzLmdyaWRzdGVyLiRvcHRpb25zLmdyaWRUeXBlID09PSBHcmlkVHlwZS5GaXQpIHtcbiAgICAgIGFkZENsYXNzID0gR3JpZFR5cGUuRml0O1xuICAgICAgcmVtb3ZlQ2xhc3MxID0gR3JpZFR5cGUuU2Nyb2xsVmVydGljYWw7XG4gICAgICByZW1vdmVDbGFzczIgPSBHcmlkVHlwZS5TY3JvbGxIb3Jpem9udGFsO1xuICAgICAgcmVtb3ZlQ2xhc3MzID0gR3JpZFR5cGUuRml4ZWQ7XG4gICAgfSBlbHNlIGlmICh0aGlzLmdyaWRzdGVyLiRvcHRpb25zLmdyaWRUeXBlID09PSBHcmlkVHlwZS5TY3JvbGxWZXJ0aWNhbCkge1xuICAgICAgdGhpcy5ncmlkc3Rlci5jdXJSb3dIZWlnaHQgPSB0aGlzLmdyaWRzdGVyLmN1ckNvbFdpZHRoO1xuICAgICAgYWRkQ2xhc3MgPSBHcmlkVHlwZS5TY3JvbGxWZXJ0aWNhbDtcbiAgICAgIHJlbW92ZUNsYXNzMSA9IEdyaWRUeXBlLkZpdDtcbiAgICAgIHJlbW92ZUNsYXNzMiA9IEdyaWRUeXBlLlNjcm9sbEhvcml6b250YWw7XG4gICAgICByZW1vdmVDbGFzczMgPSBHcmlkVHlwZS5GaXhlZDtcbiAgICB9IGVsc2UgaWYgKHRoaXMuZ3JpZHN0ZXIuJG9wdGlvbnMuZ3JpZFR5cGUgPT09IEdyaWRUeXBlLlNjcm9sbEhvcml6b250YWwpIHtcbiAgICAgIHRoaXMuZ3JpZHN0ZXIuY3VyQ29sV2lkdGggPSB0aGlzLmdyaWRzdGVyLmN1clJvd0hlaWdodDtcbiAgICAgIGFkZENsYXNzID0gR3JpZFR5cGUuU2Nyb2xsSG9yaXpvbnRhbDtcbiAgICAgIHJlbW92ZUNsYXNzMSA9IEdyaWRUeXBlLkZpdDtcbiAgICAgIHJlbW92ZUNsYXNzMiA9IEdyaWRUeXBlLlNjcm9sbFZlcnRpY2FsO1xuICAgICAgcmVtb3ZlQ2xhc3MzID0gR3JpZFR5cGUuRml4ZWQ7XG4gICAgfSBlbHNlIGlmICh0aGlzLmdyaWRzdGVyLiRvcHRpb25zLmdyaWRUeXBlID09PSBHcmlkVHlwZS5GaXhlZCkge1xuICAgICAgdGhpcy5ncmlkc3Rlci5jdXJDb2xXaWR0aCA9IHRoaXMuZ3JpZHN0ZXIuJG9wdGlvbnMuZml4ZWRDb2xXaWR0aCArXG4gICAgICAgICh0aGlzLmdyaWRzdGVyLiRvcHRpb25zLmlnbm9yZU1hcmdpbkluUm93ID8gMCA6IHRoaXMuZ3JpZHN0ZXIuJG9wdGlvbnMubWFyZ2luKTtcbiAgICAgIHRoaXMuZ3JpZHN0ZXIuY3VyUm93SGVpZ2h0ID0gdGhpcy5ncmlkc3Rlci4kb3B0aW9ucy5maXhlZFJvd0hlaWdodCArXG4gICAgICAgICh0aGlzLmdyaWRzdGVyLiRvcHRpb25zLmlnbm9yZU1hcmdpbkluUm93ID8gMCA6IHRoaXMuZ3JpZHN0ZXIuJG9wdGlvbnMubWFyZ2luKTtcbiAgICAgIGFkZENsYXNzID0gR3JpZFR5cGUuRml4ZWQ7XG4gICAgICByZW1vdmVDbGFzczEgPSBHcmlkVHlwZS5GaXQ7XG4gICAgICByZW1vdmVDbGFzczIgPSBHcmlkVHlwZS5TY3JvbGxWZXJ0aWNhbDtcbiAgICAgIHJlbW92ZUNsYXNzMyA9IEdyaWRUeXBlLlNjcm9sbEhvcml6b250YWw7XG4gICAgfSBlbHNlIGlmICh0aGlzLmdyaWRzdGVyLiRvcHRpb25zLmdyaWRUeXBlID09PSBHcmlkVHlwZS5WZXJ0aWNhbEZpeGVkKSB7XG4gICAgICB0aGlzLmdyaWRzdGVyLmN1clJvd0hlaWdodCA9IHRoaXMuZ3JpZHN0ZXIuJG9wdGlvbnMuZml4ZWRSb3dIZWlnaHQgK1xuICAgICAgICAodGhpcy5ncmlkc3Rlci4kb3B0aW9ucy5pZ25vcmVNYXJnaW5JblJvdyA/IDAgOiB0aGlzLmdyaWRzdGVyLiRvcHRpb25zLm1hcmdpbik7XG4gICAgICBhZGRDbGFzcyA9IEdyaWRUeXBlLlNjcm9sbFZlcnRpY2FsO1xuICAgICAgcmVtb3ZlQ2xhc3MxID0gR3JpZFR5cGUuRml0O1xuICAgICAgcmVtb3ZlQ2xhc3MyID0gR3JpZFR5cGUuU2Nyb2xsSG9yaXpvbnRhbDtcbiAgICAgIHJlbW92ZUNsYXNzMyA9IEdyaWRUeXBlLkZpeGVkO1xuICAgIH0gZWxzZSBpZiAodGhpcy5ncmlkc3Rlci4kb3B0aW9ucy5ncmlkVHlwZSA9PT0gR3JpZFR5cGUuSG9yaXpvbnRhbEZpeGVkKSB7XG4gICAgICB0aGlzLmdyaWRzdGVyLmN1ckNvbFdpZHRoID0gdGhpcy5ncmlkc3Rlci4kb3B0aW9ucy5maXhlZENvbFdpZHRoICtcbiAgICAgICAgKHRoaXMuZ3JpZHN0ZXIuJG9wdGlvbnMuaWdub3JlTWFyZ2luSW5Sb3cgPyAwIDogdGhpcy5ncmlkc3Rlci4kb3B0aW9ucy5tYXJnaW4pO1xuICAgICAgYWRkQ2xhc3MgPSBHcmlkVHlwZS5TY3JvbGxIb3Jpem9udGFsO1xuICAgICAgcmVtb3ZlQ2xhc3MxID0gR3JpZFR5cGUuRml0O1xuICAgICAgcmVtb3ZlQ2xhc3MyID0gR3JpZFR5cGUuU2Nyb2xsVmVydGljYWw7XG4gICAgICByZW1vdmVDbGFzczMgPSBHcmlkVHlwZS5GaXhlZDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5ncmlkc3Rlci5tb2JpbGUpIHtcbiAgICAgIHRoaXMuZ3JpZHN0ZXIucmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5ncmlkc3Rlci5lbCwgYWRkQ2xhc3MpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmdyaWRzdGVyLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuZ3JpZHN0ZXIuZWwsIGFkZENsYXNzKTtcbiAgICB9XG4gICAgdGhpcy5ncmlkc3Rlci5yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLmdyaWRzdGVyLmVsLCByZW1vdmVDbGFzczEpO1xuICAgIHRoaXMuZ3JpZHN0ZXIucmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5ncmlkc3Rlci5lbCwgcmVtb3ZlQ2xhc3MyKTtcbiAgICB0aGlzLmdyaWRzdGVyLnJlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuZ3JpZHN0ZXIuZWwsIHJlbW92ZUNsYXNzMyk7XG4gIH1cblxuICBnZXRHcmlkQ29sdW1uU3R5bGUoaTogbnVtYmVyKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnRoaXMuZ2V0TGVmdFBvc2l0aW9uKHRoaXMuZ3JpZHN0ZXIuY3VyQ29sV2lkdGggKiBpKSxcbiAgICAgIHdpZHRoOiB0aGlzLmdyaWRzdGVyLmN1ckNvbFdpZHRoIC0gdGhpcy5ncmlkc3Rlci4kb3B0aW9ucy5tYXJnaW4gKyAncHgnLFxuICAgICAgaGVpZ2h0OiB0aGlzLmdyaWRzdGVyLmdyaWRSb3dzLmxlbmd0aCAqIHRoaXMuZ3JpZHN0ZXIuY3VyUm93SGVpZ2h0IC0gdGhpcy5ncmlkc3Rlci4kb3B0aW9ucy5tYXJnaW4gKyAncHgnXG4gICAgfTtcbiAgfVxuXG4gIGdldEdyaWRSb3dTdHlsZShpOiBudW1iZXIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgLi4udGhpcy5nZXRUb3BQb3NpdGlvbih0aGlzLmdyaWRzdGVyLmN1clJvd0hlaWdodCAqIGkpLFxuICAgICAgd2lkdGg6IHRoaXMuZ3JpZHN0ZXIuZ3JpZENvbHVtbnMubGVuZ3RoICogdGhpcy5ncmlkc3Rlci5jdXJDb2xXaWR0aCAtIHRoaXMuZ3JpZHN0ZXIuJG9wdGlvbnMubWFyZ2luICsgJ3B4JyxcbiAgICAgIGhlaWdodDogdGhpcy5ncmlkc3Rlci5jdXJSb3dIZWlnaHQgLSB0aGlzLmdyaWRzdGVyLiRvcHRpb25zLm1hcmdpbiArICdweCdcbiAgICB9O1xuICB9XG5cbiAgZ2V0TGVmdFBvc2l0aW9uKGQ6IG51bWJlcik6IE9iamVjdCB7XG4gICAgaWYgKHRoaXMuZ3JpZHN0ZXIuJG9wdGlvbnMudXNlVHJhbnNmb3JtUG9zaXRpb25pbmcpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVgoJyArIGQgKyAncHgpJyxcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGxlZnQ6ICh0aGlzLmdldExlZnRNYXJnaW4oKSArIGQpICsgJ3B4J1xuICAgICAgfTtcbiAgICB9XG4gIH1cblxuICBnZXRUb3BQb3NpdGlvbihkOiBudW1iZXIpOiBPYmplY3Qge1xuICAgIGlmICh0aGlzLmdyaWRzdGVyLiRvcHRpb25zLnVzZVRyYW5zZm9ybVBvc2l0aW9uaW5nKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVZKCcgKyBkICsgJ3B4KScsXG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0b3A6IHRoaXMuZ2V0VG9wTWFyZ2luKCkgKyBkICsgJ3B4J1xuICAgICAgfTtcbiAgICB9XG4gIH1cblxuICBjbGVhckNlbGxQb3NpdGlvbihyZW5kZXJlcjogUmVuZGVyZXIyLCBlbDogYW55KTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZ3JpZHN0ZXIuJG9wdGlvbnMudXNlVHJhbnNmb3JtUG9zaXRpb25pbmcpIHtcbiAgICAgIHJlbmRlcmVyLnNldFN0eWxlKGVsLCAndHJhbnNmb3JtJywgJycpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZW5kZXJlci5zZXRTdHlsZShlbCwgJ3RvcCcsICcnKTtcbiAgICAgIHJlbmRlcmVyLnNldFN0eWxlKGVsLCAnbGVmdCcsICcnKTtcbiAgICB9XG4gIH1cblxuICBzZXRDZWxsUG9zaXRpb24ocmVuZGVyZXI6IFJlbmRlcmVyMiwgZWw6IGFueSwgeDogbnVtYmVyLCB5OiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5ncmlkc3Rlci4kb3B0aW9ucy51c2VUcmFuc2Zvcm1Qb3NpdGlvbmluZykge1xuICAgICAgY29uc3QgdHJhbnNmb3JtID0gJ3RyYW5zbGF0ZTNkKCcgKyB4ICsgJ3B4LCAnICsgeSArICdweCwgMCknO1xuICAgICAgcmVuZGVyZXIuc2V0U3R5bGUoZWwsICd0cmFuc2Zvcm0nLCB0cmFuc2Zvcm0pO1xuICAgIH0gZWxzZSB7XG4gICAgICByZW5kZXJlci5zZXRTdHlsZShlbCwgJ2xlZnQnLCB0aGlzLmdldExlZnRNYXJnaW4oKSArIHggKyAncHgnKTtcbiAgICAgIHJlbmRlcmVyLnNldFN0eWxlKGVsLCAndG9wJywgdGhpcy5nZXRUb3BNYXJnaW4oKSArIHkgKyAncHgnKTtcbiAgICB9XG4gIH1cblxuICBnZXRMZWZ0TWFyZ2luKCk6IG51bWJlciB7XG4gICAgaWYgKHRoaXMuZ3JpZHN0ZXIuJG9wdGlvbnMub3V0ZXJNYXJnaW4pIHtcbiAgICAgIGlmICh0aGlzLmdyaWRzdGVyLiRvcHRpb25zLm91dGVyTWFyZ2luTGVmdCAhPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gdGhpcy5ncmlkc3Rlci4kb3B0aW9ucy5vdXRlck1hcmdpbkxlZnQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdGhpcy5ncmlkc3Rlci4kb3B0aW9ucy5tYXJnaW47XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgfVxuXG4gIGdldFRvcE1hcmdpbigpOiBudW1iZXIge1xuICAgIGlmICh0aGlzLmdyaWRzdGVyLiRvcHRpb25zLm91dGVyTWFyZ2luKSB7XG4gICAgICBpZiAodGhpcy5ncmlkc3Rlci4kb3B0aW9ucy5vdXRlck1hcmdpblRvcCAhPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gdGhpcy5ncmlkc3Rlci4kb3B0aW9ucy5vdXRlck1hcmdpblRvcDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdyaWRzdGVyLiRvcHRpb25zLm1hcmdpbjtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfVxuICB9XG59XG4iXX0=
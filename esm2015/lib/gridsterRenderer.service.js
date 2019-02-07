/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { GridsterComponentInterface } from './gridster.interface';
import { GridType } from './gridsterConfig.interface';
export class GridsterRenderer {
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
        delete this.gridster;
    }
    /**
     * @param {?} el
     * @param {?} item
     * @param {?} renderer
     * @return {?}
     */
    updateItem(el, item, renderer) {
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
            const x = Math.round(this.gridster.curColWidth * item.x);
            /** @type {?} */
            const y = Math.round(this.gridster.curRowHeight * item.y);
            /** @type {?} */
            const width = this.gridster.curColWidth * item.cols - this.gridster.$options.margin;
            /** @type {?} */
            const height = (this.gridster.curRowHeight * item.rows - this.gridster.$options.margin);
            // set the cell style
            this.setCellPosition(renderer, el, x, y);
            renderer.setStyle(el, 'width', width + 'px');
            renderer.setStyle(el, 'height', height + 'px');
            /** @type {?} */
            let marginBottom = null;
            /** @type {?} */
            let marginRight = null;
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
    }
    /**
     * @return {?}
     */
    updateGridster() {
        /** @type {?} */
        let addClass = '';
        /** @type {?} */
        let removeClass1 = '';
        /** @type {?} */
        let removeClass2 = '';
        /** @type {?} */
        let removeClass3 = '';
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
    }
    /**
     * @param {?} i
     * @return {?}
     */
    getGridColumnStyle(i) {
        return Object.assign({}, this.getLeftPosition(this.gridster.curColWidth * i), { width: this.gridster.curColWidth - this.gridster.$options.margin + 'px', height: this.gridster.gridRows.length * this.gridster.curRowHeight - this.gridster.$options.margin + 'px' });
    }
    /**
     * @param {?} i
     * @return {?}
     */
    getGridRowStyle(i) {
        return Object.assign({}, this.getTopPosition(this.gridster.curRowHeight * i), { width: this.gridster.gridColumns.length * this.gridster.curColWidth - this.gridster.$options.margin + 'px', height: this.gridster.curRowHeight - this.gridster.$options.margin + 'px' });
    }
    /**
     * @param {?} d
     * @return {?}
     */
    getLeftPosition(d) {
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
    }
    /**
     * @param {?} d
     * @return {?}
     */
    getTopPosition(d) {
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
    }
    /**
     * @param {?} renderer
     * @param {?} el
     * @return {?}
     */
    clearCellPosition(renderer, el) {
        if (this.gridster.$options.useTransformPositioning) {
            renderer.setStyle(el, 'transform', '');
        }
        else {
            renderer.setStyle(el, 'top', '');
            renderer.setStyle(el, 'left', '');
        }
    }
    /**
     * @param {?} renderer
     * @param {?} el
     * @param {?} x
     * @param {?} y
     * @return {?}
     */
    setCellPosition(renderer, el, x, y) {
        if (this.gridster.$options.useTransformPositioning) {
            /** @type {?} */
            const transform = 'translate3d(' + x + 'px, ' + y + 'px, 0)';
            renderer.setStyle(el, 'transform', transform);
        }
        else {
            renderer.setStyle(el, 'left', this.getLeftMargin() + x + 'px');
            renderer.setStyle(el, 'top', this.getTopMargin() + y + 'px');
        }
    }
    /**
     * @return {?}
     */
    getLeftMargin() {
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
    }
    /**
     * @return {?}
     */
    getTopMargin() {
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
    }
}
GridsterRenderer.decorators = [
    { type: Injectable }
];
/** @nocollapse */
GridsterRenderer.ctorParameters = () => [
    { type: GridsterComponentInterface }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    GridsterRenderer.prototype.gridster;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZHN0ZXJSZW5kZXJlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1ncmlkc3RlcjIvIiwic291cmNlcyI6WyJsaWIvZ3JpZHN0ZXJSZW5kZXJlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFZLE1BQU0sZUFBZSxDQUFDO0FBRXBELE9BQU8sRUFBQywwQkFBMEIsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQ2hFLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSw0QkFBNEIsQ0FBQztBQUlwRCxNQUFNLE9BQU8sZ0JBQWdCOzs7O0lBRTNCLFlBQW9CLFFBQW9DO1FBQXBDLGFBQVEsR0FBUixRQUFRLENBQTRCO0lBQ3hELENBQUM7Ozs7SUFFRCxPQUFPO1FBQ0wsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3ZCLENBQUM7Ozs7Ozs7SUFFRCxVQUFVLENBQUMsRUFBTyxFQUFFLElBQWtCLEVBQUUsUUFBbUI7UUFDekQsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRTtZQUN4QixJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ3JDLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsdUJBQXVCLEVBQUU7Z0JBQ2xELFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRSxFQUFFLFFBQVEsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7YUFDN0Y7aUJBQU07Z0JBQ0wsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUUsUUFBUSxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQzthQUNs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LE1BQU0sQ0FBQzthQUN0QztTQUNGO2FBQU07WUFDTCxPQUFPLENBQUMsQ0FBQztTQUNWO0lBQ0gsQ0FBQzs7O1lBck1GLFVBQVU7Ozs7WUFKSCwwQkFBMEI7Ozs7Ozs7SUFPcEIsb0NBQTRDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlLCBSZW5kZXJlcjJ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge0dyaWRzdGVyQ29tcG9uZW50SW50ZXJmYWNlfSBmcm9tICcuL2dyaWRzdGVyLmludGVyZmFjZSc7XG5pbXBvcnQge0dyaWRUeXBlfSBmcm9tICcuL2dyaWRzdGVyQ29uZmlnLmludGVyZmFjZSc7XG5pbXBvcnQge0dyaWRzdGVySXRlbX0gZnJvbSAnLi9ncmlkc3Rlckl0ZW0uaW50ZXJmYWNlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEdyaWRzdGVyUmVuZGVyZXIge1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZ3JpZHN0ZXI6IEdyaWRzdGVyQ29tcG9uZW50SW50ZXJmYWNlKSB7XG4gIH1cblxuICBkZXN0cm95KCk6IHZvaWQge1xuICAgIGRlbGV0ZSB0aGlzLmdyaWRzdGVyO1xuICB9XG5cbiAgdXBkYXRlSXRlbShlbDogYW55LCBpdGVtOiBHcmlkc3Rlckl0ZW0sIHJlbmRlcmVyOiBSZW5kZXJlcjIpIHtcbiAgICBpZiAodGhpcy5ncmlkc3Rlci5tb2JpbGUpIHtcbiAgICAgIHRoaXMuY2xlYXJDZWxsUG9zaXRpb24ocmVuZGVyZXIsIGVsKTtcbiAgICAgIGlmICh0aGlzLmdyaWRzdGVyLiRvcHRpb25zLmtlZXBGaXhlZEhlaWdodEluTW9iaWxlKSB7XG4gICAgICAgIHJlbmRlcmVyLnNldFN0eWxlKGVsLCAnaGVpZ2h0JywgKGl0ZW0ucm93cyAqIHRoaXMuZ3JpZHN0ZXIuJG9wdGlvbnMuZml4ZWRSb3dIZWlnaHQpICsgJ3B4Jyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZW5kZXJlci5zZXRTdHlsZShlbCwgJ2hlaWdodCcsICh0aGlzLmdyaWRzdGVyLmN1cldpZHRoIC8gMiAqIGl0ZW0ucm93cykgKyAncHgnKTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLmdyaWRzdGVyLiRvcHRpb25zLmtlZXBGaXhlZFdpZHRoSW5Nb2JpbGUpIHtcbiAgICAgICAgcmVuZGVyZXIuc2V0U3R5bGUoZWwsICd3aWR0aCcsIHRoaXMuZ3JpZHN0ZXIuJG9wdGlvbnMuZml4ZWRDb2xXaWR0aCArICdweCcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVuZGVyZXIuc2V0U3R5bGUoZWwsICd3aWR0aCcsICcnKTtcbiAgICAgIH1cblxuICAgICAgcmVuZGVyZXIuc2V0U3R5bGUoZWwsICdtYXJnaW4tYm90dG9tJywgdGhpcy5ncmlkc3Rlci4kb3B0aW9ucy5tYXJnaW4gKyAncHgnKTtcbiAgICAgIHJlbmRlcmVyLnNldFN0eWxlKGVsLCAnbWFyZ2luLXJpZ2h0JywgJycpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCB4ID0gTWF0aC5yb3VuZCh0aGlzLmdyaWRzdGVyLmN1ckNvbFdpZHRoICogaXRlbS54KTtcbiAgICAgIGNvbnN0IHkgPSBNYXRoLnJvdW5kKHRoaXMuZ3JpZHN0ZXIuY3VyUm93SGVpZ2h0ICogaXRlbS55KTtcbiAgICAgIGNvbnN0IHdpZHRoID0gdGhpcy5ncmlkc3Rlci5jdXJDb2xXaWR0aCAqIGl0ZW0uY29scyAtIHRoaXMuZ3JpZHN0ZXIuJG9wdGlvbnMubWFyZ2luO1xuICAgICAgY29uc3QgaGVpZ2h0ID0gKHRoaXMuZ3JpZHN0ZXIuY3VyUm93SGVpZ2h0ICogaXRlbS5yb3dzIC0gdGhpcy5ncmlkc3Rlci4kb3B0aW9ucy5tYXJnaW4pO1xuICAgICAgLy8gc2V0IHRoZSBjZWxsIHN0eWxlXG4gICAgICB0aGlzLnNldENlbGxQb3NpdGlvbihyZW5kZXJlciwgZWwsIHgsIHkpO1xuICAgICAgcmVuZGVyZXIuc2V0U3R5bGUoZWwsICd3aWR0aCcsIHdpZHRoICsgJ3B4Jyk7XG4gICAgICByZW5kZXJlci5zZXRTdHlsZShlbCwgJ2hlaWdodCcsIGhlaWdodCArICdweCcpO1xuICAgICAgbGV0IG1hcmdpbkJvdHRvbTogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG4gICAgICBsZXQgbWFyZ2luUmlnaHQ6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuICAgICAgaWYgKHRoaXMuZ3JpZHN0ZXIuJG9wdGlvbnMub3V0ZXJNYXJnaW4pIHtcbiAgICAgICAgaWYgKHRoaXMuZ3JpZHN0ZXIucm93cyA9PT0gaXRlbS5yb3dzICsgaXRlbS55KSB7XG4gICAgICAgICAgaWYgKHRoaXMuZ3JpZHN0ZXIuJG9wdGlvbnMub3V0ZXJNYXJnaW5Cb3R0b20gIT09IG51bGwpIHtcbiAgICAgICAgICAgIG1hcmdpbkJvdHRvbSA9IHRoaXMuZ3JpZHN0ZXIuJG9wdGlvbnMub3V0ZXJNYXJnaW5Cb3R0b20gKyAncHgnO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtYXJnaW5Cb3R0b20gPSB0aGlzLmdyaWRzdGVyLiRvcHRpb25zLm1hcmdpbiArICdweCc7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmdyaWRzdGVyLmNvbHVtbnMgPT09IGl0ZW0uY29scyArIGl0ZW0ueCkge1xuICAgICAgICAgIGlmICh0aGlzLmdyaWRzdGVyLiRvcHRpb25zLm91dGVyTWFyZ2luQm90dG9tICE9PSBudWxsKSB7XG4gICAgICAgICAgICBtYXJnaW5SaWdodCA9IHRoaXMuZ3JpZHN0ZXIuJG9wdGlvbnMub3V0ZXJNYXJnaW5SaWdodCArICdweCc7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1hcmdpblJpZ2h0ID0gdGhpcy5ncmlkc3Rlci4kb3B0aW9ucy5tYXJnaW4gKyAncHgnO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZW5kZXJlci5zZXRTdHlsZShlbCwgJ21hcmdpbi1ib3R0b20nLCBtYXJnaW5Cb3R0b20pO1xuICAgICAgcmVuZGVyZXIuc2V0U3R5bGUoZWwsICdtYXJnaW4tcmlnaHQnLCBtYXJnaW5SaWdodCk7XG4gICAgfVxuICB9XG5cbiAgdXBkYXRlR3JpZHN0ZXIoKSB7XG4gICAgbGV0IGFkZENsYXNzID0gJyc7XG4gICAgbGV0IHJlbW92ZUNsYXNzMSA9ICcnO1xuICAgIGxldCByZW1vdmVDbGFzczIgPSAnJztcbiAgICBsZXQgcmVtb3ZlQ2xhc3MzID0gJyc7XG4gICAgaWYgKHRoaXMuZ3JpZHN0ZXIuJG9wdGlvbnMuZ3JpZFR5cGUgPT09IEdyaWRUeXBlLkZpdCkge1xuICAgICAgYWRkQ2xhc3MgPSBHcmlkVHlwZS5GaXQ7XG4gICAgICByZW1vdmVDbGFzczEgPSBHcmlkVHlwZS5TY3JvbGxWZXJ0aWNhbDtcbiAgICAgIHJlbW92ZUNsYXNzMiA9IEdyaWRUeXBlLlNjcm9sbEhvcml6b250YWw7XG4gICAgICByZW1vdmVDbGFzczMgPSBHcmlkVHlwZS5GaXhlZDtcbiAgICB9IGVsc2UgaWYgKHRoaXMuZ3JpZHN0ZXIuJG9wdGlvbnMuZ3JpZFR5cGUgPT09IEdyaWRUeXBlLlNjcm9sbFZlcnRpY2FsKSB7XG4gICAgICB0aGlzLmdyaWRzdGVyLmN1clJvd0hlaWdodCA9IHRoaXMuZ3JpZHN0ZXIuY3VyQ29sV2lkdGg7XG4gICAgICBhZGRDbGFzcyA9IEdyaWRUeXBlLlNjcm9sbFZlcnRpY2FsO1xuICAgICAgcmVtb3ZlQ2xhc3MxID0gR3JpZFR5cGUuRml0O1xuICAgICAgcmVtb3ZlQ2xhc3MyID0gR3JpZFR5cGUuU2Nyb2xsSG9yaXpvbnRhbDtcbiAgICAgIHJlbW92ZUNsYXNzMyA9IEdyaWRUeXBlLkZpeGVkO1xuICAgIH0gZWxzZSBpZiAodGhpcy5ncmlkc3Rlci4kb3B0aW9ucy5ncmlkVHlwZSA9PT0gR3JpZFR5cGUuU2Nyb2xsSG9yaXpvbnRhbCkge1xuICAgICAgdGhpcy5ncmlkc3Rlci5jdXJDb2xXaWR0aCA9IHRoaXMuZ3JpZHN0ZXIuY3VyUm93SGVpZ2h0O1xuICAgICAgYWRkQ2xhc3MgPSBHcmlkVHlwZS5TY3JvbGxIb3Jpem9udGFsO1xuICAgICAgcmVtb3ZlQ2xhc3MxID0gR3JpZFR5cGUuRml0O1xuICAgICAgcmVtb3ZlQ2xhc3MyID0gR3JpZFR5cGUuU2Nyb2xsVmVydGljYWw7XG4gICAgICByZW1vdmVDbGFzczMgPSBHcmlkVHlwZS5GaXhlZDtcbiAgICB9IGVsc2UgaWYgKHRoaXMuZ3JpZHN0ZXIuJG9wdGlvbnMuZ3JpZFR5cGUgPT09IEdyaWRUeXBlLkZpeGVkKSB7XG4gICAgICB0aGlzLmdyaWRzdGVyLmN1ckNvbFdpZHRoID0gdGhpcy5ncmlkc3Rlci4kb3B0aW9ucy5maXhlZENvbFdpZHRoICtcbiAgICAgICAgKHRoaXMuZ3JpZHN0ZXIuJG9wdGlvbnMuaWdub3JlTWFyZ2luSW5Sb3cgPyAwIDogdGhpcy5ncmlkc3Rlci4kb3B0aW9ucy5tYXJnaW4pO1xuICAgICAgdGhpcy5ncmlkc3Rlci5jdXJSb3dIZWlnaHQgPSB0aGlzLmdyaWRzdGVyLiRvcHRpb25zLmZpeGVkUm93SGVpZ2h0ICtcbiAgICAgICAgKHRoaXMuZ3JpZHN0ZXIuJG9wdGlvbnMuaWdub3JlTWFyZ2luSW5Sb3cgPyAwIDogdGhpcy5ncmlkc3Rlci4kb3B0aW9ucy5tYXJnaW4pO1xuICAgICAgYWRkQ2xhc3MgPSBHcmlkVHlwZS5GaXhlZDtcbiAgICAgIHJlbW92ZUNsYXNzMSA9IEdyaWRUeXBlLkZpdDtcbiAgICAgIHJlbW92ZUNsYXNzMiA9IEdyaWRUeXBlLlNjcm9sbFZlcnRpY2FsO1xuICAgICAgcmVtb3ZlQ2xhc3MzID0gR3JpZFR5cGUuU2Nyb2xsSG9yaXpvbnRhbDtcbiAgICB9IGVsc2UgaWYgKHRoaXMuZ3JpZHN0ZXIuJG9wdGlvbnMuZ3JpZFR5cGUgPT09IEdyaWRUeXBlLlZlcnRpY2FsRml4ZWQpIHtcbiAgICAgIHRoaXMuZ3JpZHN0ZXIuY3VyUm93SGVpZ2h0ID0gdGhpcy5ncmlkc3Rlci4kb3B0aW9ucy5maXhlZFJvd0hlaWdodCArXG4gICAgICAgICh0aGlzLmdyaWRzdGVyLiRvcHRpb25zLmlnbm9yZU1hcmdpbkluUm93ID8gMCA6IHRoaXMuZ3JpZHN0ZXIuJG9wdGlvbnMubWFyZ2luKTtcbiAgICAgIGFkZENsYXNzID0gR3JpZFR5cGUuU2Nyb2xsVmVydGljYWw7XG4gICAgICByZW1vdmVDbGFzczEgPSBHcmlkVHlwZS5GaXQ7XG4gICAgICByZW1vdmVDbGFzczIgPSBHcmlkVHlwZS5TY3JvbGxIb3Jpem9udGFsO1xuICAgICAgcmVtb3ZlQ2xhc3MzID0gR3JpZFR5cGUuRml4ZWQ7XG4gICAgfSBlbHNlIGlmICh0aGlzLmdyaWRzdGVyLiRvcHRpb25zLmdyaWRUeXBlID09PSBHcmlkVHlwZS5Ib3Jpem9udGFsRml4ZWQpIHtcbiAgICAgIHRoaXMuZ3JpZHN0ZXIuY3VyQ29sV2lkdGggPSB0aGlzLmdyaWRzdGVyLiRvcHRpb25zLmZpeGVkQ29sV2lkdGggK1xuICAgICAgICAodGhpcy5ncmlkc3Rlci4kb3B0aW9ucy5pZ25vcmVNYXJnaW5JblJvdyA/IDAgOiB0aGlzLmdyaWRzdGVyLiRvcHRpb25zLm1hcmdpbik7XG4gICAgICBhZGRDbGFzcyA9IEdyaWRUeXBlLlNjcm9sbEhvcml6b250YWw7XG4gICAgICByZW1vdmVDbGFzczEgPSBHcmlkVHlwZS5GaXQ7XG4gICAgICByZW1vdmVDbGFzczIgPSBHcmlkVHlwZS5TY3JvbGxWZXJ0aWNhbDtcbiAgICAgIHJlbW92ZUNsYXNzMyA9IEdyaWRUeXBlLkZpeGVkO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmdyaWRzdGVyLm1vYmlsZSkge1xuICAgICAgdGhpcy5ncmlkc3Rlci5yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLmdyaWRzdGVyLmVsLCBhZGRDbGFzcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZ3JpZHN0ZXIucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5ncmlkc3Rlci5lbCwgYWRkQ2xhc3MpO1xuICAgIH1cbiAgICB0aGlzLmdyaWRzdGVyLnJlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuZ3JpZHN0ZXIuZWwsIHJlbW92ZUNsYXNzMSk7XG4gICAgdGhpcy5ncmlkc3Rlci5yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLmdyaWRzdGVyLmVsLCByZW1vdmVDbGFzczIpO1xuICAgIHRoaXMuZ3JpZHN0ZXIucmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5ncmlkc3Rlci5lbCwgcmVtb3ZlQ2xhc3MzKTtcbiAgfVxuXG4gIGdldEdyaWRDb2x1bW5TdHlsZShpOiBudW1iZXIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgLi4udGhpcy5nZXRMZWZ0UG9zaXRpb24odGhpcy5ncmlkc3Rlci5jdXJDb2xXaWR0aCAqIGkpLFxuICAgICAgd2lkdGg6IHRoaXMuZ3JpZHN0ZXIuY3VyQ29sV2lkdGggLSB0aGlzLmdyaWRzdGVyLiRvcHRpb25zLm1hcmdpbiArICdweCcsXG4gICAgICBoZWlnaHQ6IHRoaXMuZ3JpZHN0ZXIuZ3JpZFJvd3MubGVuZ3RoICogdGhpcy5ncmlkc3Rlci5jdXJSb3dIZWlnaHQgLSB0aGlzLmdyaWRzdGVyLiRvcHRpb25zLm1hcmdpbiArICdweCdcbiAgICB9O1xuICB9XG5cbiAgZ2V0R3JpZFJvd1N0eWxlKGk6IG51bWJlcikge1xuICAgIHJldHVybiB7XG4gICAgICAuLi50aGlzLmdldFRvcFBvc2l0aW9uKHRoaXMuZ3JpZHN0ZXIuY3VyUm93SGVpZ2h0ICogaSksXG4gICAgICB3aWR0aDogdGhpcy5ncmlkc3Rlci5ncmlkQ29sdW1ucy5sZW5ndGggKiB0aGlzLmdyaWRzdGVyLmN1ckNvbFdpZHRoIC0gdGhpcy5ncmlkc3Rlci4kb3B0aW9ucy5tYXJnaW4gKyAncHgnLFxuICAgICAgaGVpZ2h0OiB0aGlzLmdyaWRzdGVyLmN1clJvd0hlaWdodCAtIHRoaXMuZ3JpZHN0ZXIuJG9wdGlvbnMubWFyZ2luICsgJ3B4J1xuICAgIH07XG4gIH1cblxuICBnZXRMZWZ0UG9zaXRpb24oZDogbnVtYmVyKTogT2JqZWN0IHtcbiAgICBpZiAodGhpcy5ncmlkc3Rlci4kb3B0aW9ucy51c2VUcmFuc2Zvcm1Qb3NpdGlvbmluZykge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlWCgnICsgZCArICdweCknLFxuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbGVmdDogKHRoaXMuZ2V0TGVmdE1hcmdpbigpICsgZCkgKyAncHgnXG4gICAgICB9O1xuICAgIH1cbiAgfVxuXG4gIGdldFRvcFBvc2l0aW9uKGQ6IG51bWJlcik6IE9iamVjdCB7XG4gICAgaWYgKHRoaXMuZ3JpZHN0ZXIuJG9wdGlvbnMudXNlVHJhbnNmb3JtUG9zaXRpb25pbmcpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVkoJyArIGQgKyAncHgpJyxcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHRvcDogdGhpcy5nZXRUb3BNYXJnaW4oKSArIGQgKyAncHgnXG4gICAgICB9O1xuICAgIH1cbiAgfVxuXG4gIGNsZWFyQ2VsbFBvc2l0aW9uKHJlbmRlcmVyOiBSZW5kZXJlcjIsIGVsOiBhbnkpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5ncmlkc3Rlci4kb3B0aW9ucy51c2VUcmFuc2Zvcm1Qb3NpdGlvbmluZykge1xuICAgICAgcmVuZGVyZXIuc2V0U3R5bGUoZWwsICd0cmFuc2Zvcm0nLCAnJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlbmRlcmVyLnNldFN0eWxlKGVsLCAndG9wJywgJycpO1xuICAgICAgcmVuZGVyZXIuc2V0U3R5bGUoZWwsICdsZWZ0JywgJycpO1xuICAgIH1cbiAgfVxuXG4gIHNldENlbGxQb3NpdGlvbihyZW5kZXJlcjogUmVuZGVyZXIyLCBlbDogYW55LCB4OiBudW1iZXIsIHk6IG51bWJlcik6IHZvaWQge1xuICAgIGlmICh0aGlzLmdyaWRzdGVyLiRvcHRpb25zLnVzZVRyYW5zZm9ybVBvc2l0aW9uaW5nKSB7XG4gICAgICBjb25zdCB0cmFuc2Zvcm0gPSAndHJhbnNsYXRlM2QoJyArIHggKyAncHgsICcgKyB5ICsgJ3B4LCAwKSc7XG4gICAgICByZW5kZXJlci5zZXRTdHlsZShlbCwgJ3RyYW5zZm9ybScsIHRyYW5zZm9ybSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlbmRlcmVyLnNldFN0eWxlKGVsLCAnbGVmdCcsIHRoaXMuZ2V0TGVmdE1hcmdpbigpICsgeCArICdweCcpO1xuICAgICAgcmVuZGVyZXIuc2V0U3R5bGUoZWwsICd0b3AnLCB0aGlzLmdldFRvcE1hcmdpbigpICsgeSArICdweCcpO1xuICAgIH1cbiAgfVxuXG4gIGdldExlZnRNYXJnaW4oKTogbnVtYmVyIHtcbiAgICBpZiAodGhpcy5ncmlkc3Rlci4kb3B0aW9ucy5vdXRlck1hcmdpbikge1xuICAgICAgaWYgKHRoaXMuZ3JpZHN0ZXIuJG9wdGlvbnMub3V0ZXJNYXJnaW5MZWZ0ICE9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdyaWRzdGVyLiRvcHRpb25zLm91dGVyTWFyZ2luTGVmdDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdyaWRzdGVyLiRvcHRpb25zLm1hcmdpbjtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfVxuICB9XG5cbiAgZ2V0VG9wTWFyZ2luKCk6IG51bWJlciB7XG4gICAgaWYgKHRoaXMuZ3JpZHN0ZXIuJG9wdGlvbnMub3V0ZXJNYXJnaW4pIHtcbiAgICAgIGlmICh0aGlzLmdyaWRzdGVyLiRvcHRpb25zLm91dGVyTWFyZ2luVG9wICE9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdyaWRzdGVyLiRvcHRpb25zLm91dGVyTWFyZ2luVG9wO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ3JpZHN0ZXIuJG9wdGlvbnMubWFyZ2luO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG4gIH1cbn1cbiJdfQ==
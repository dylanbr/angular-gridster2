/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ElementRef, Host, Renderer2, ViewEncapsulation } from '@angular/core';
import { GridsterComponent } from './gridster.component';
export class GridsterPreviewComponent {
    /**
     * @param {?} el
     * @param {?} gridster
     * @param {?} renderer
     */
    constructor(el, gridster, renderer) {
        this.renderer = renderer;
        this.el = el.nativeElement;
        this.gridster = gridster;
        this.gridster.previewStyle = this.previewStyle.bind(this);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        delete this.el;
        delete this.gridster.previewStyle;
        delete this.gridster;
    }
    /**
     * @param {?=} drag
     * @return {?}
     */
    previewStyle(drag) {
        if (!this.gridster.movingItem) {
            this.renderer.setStyle(this.el, 'display', '');
        }
        else {
            if (this.gridster.compact && drag) {
                this.gridster.compact.checkCompactItem(this.gridster.movingItem);
            }
            this.renderer.setStyle(this.el, 'display', 'block');
            this.gridster.gridRenderer.updateItem(this.el, this.gridster.movingItem, this.renderer);
        }
    }
}
GridsterPreviewComponent.decorators = [
    { type: Component, args: [{
                selector: 'gridster-preview',
                template: '',
                encapsulation: ViewEncapsulation.None,
                styles: ["gridster-preview{position:absolute;display:none;background:rgba(0,0,0,.15)}"]
            }] }
];
/** @nocollapse */
GridsterPreviewComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: GridsterComponent, decorators: [{ type: Host }] },
    { type: Renderer2 }
];
if (false) {
    /** @type {?} */
    GridsterPreviewComponent.prototype.el;
    /** @type {?} */
    GridsterPreviewComponent.prototype.gridster;
    /** @type {?} */
    GridsterPreviewComponent.prototype.renderer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZHN0ZXJQcmV2aWV3LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItZ3JpZHN0ZXIyLyIsInNvdXJjZXMiOlsibGliL2dyaWRzdGVyUHJldmlldy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBYSxTQUFTLEVBQUUsaUJBQWlCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFbkcsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFRdkQsTUFBTSxPQUFPLHdCQUF3Qjs7Ozs7O0lBSW5DLFlBQVksRUFBYyxFQUFVLFFBQTJCLEVBQVMsUUFBbUI7UUFBbkIsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUN6RixJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxhQUFhLENBQUM7UUFDM0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDekIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDNUQsQ0FBQzs7OztJQUVELFdBQVc7UUFDVCxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUM7UUFDZixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDO1FBQ2xDLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN2QixDQUFDOzs7OztJQUVELFlBQVksQ0FBQyxJQUFjO1FBQ3pCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRTtZQUM3QixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLFNBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQztTQUNoRDthQUFNO1lBQ0wsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sSUFBSSxJQUFJLEVBQUU7Z0JBQ2pDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDbEU7WUFDRCxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztZQUNwRCxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDekY7SUFDSCxDQUFDOzs7WUFoQ0YsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxrQkFBa0I7Z0JBQzVCLFFBQVEsRUFBRSxFQUFFO2dCQUVaLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJOzthQUN0Qzs7OztZQVRrQixVQUFVO1lBRXJCLGlCQUFpQix1QkFZTSxJQUFJO1lBZGEsU0FBUzs7OztJQVd2RCxzQ0FBUTs7SUFDUiw0Q0FBNEI7O0lBRXFDLDRDQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBFbGVtZW50UmVmLCBIb3N0LCBPbkRlc3Ryb3ksIFJlbmRlcmVyMiwgVmlld0VuY2Fwc3VsYXRpb259IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge0dyaWRzdGVyQ29tcG9uZW50fSBmcm9tICcuL2dyaWRzdGVyLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2dyaWRzdGVyLXByZXZpZXcnLFxuICB0ZW1wbGF0ZTogJycsXG4gIHN0eWxlVXJsczogWycuL2dyaWRzdGVyUHJldmlldy5jc3MnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBHcmlkc3RlclByZXZpZXdDb21wb25lbnQgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBlbDogYW55O1xuICBncmlkc3RlcjogR3JpZHN0ZXJDb21wb25lbnQ7XG5cbiAgY29uc3RydWN0b3IoZWw6IEVsZW1lbnRSZWYsIEBIb3N0KCkgZ3JpZHN0ZXI6IEdyaWRzdGVyQ29tcG9uZW50LCBwdWJsaWMgcmVuZGVyZXI6IFJlbmRlcmVyMikge1xuICAgIHRoaXMuZWwgPSBlbC5uYXRpdmVFbGVtZW50O1xuICAgIHRoaXMuZ3JpZHN0ZXIgPSBncmlkc3RlcjtcbiAgICB0aGlzLmdyaWRzdGVyLnByZXZpZXdTdHlsZSA9IHRoaXMucHJldmlld1N0eWxlLmJpbmQodGhpcyk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICBkZWxldGUgdGhpcy5lbDtcbiAgICBkZWxldGUgdGhpcy5ncmlkc3Rlci5wcmV2aWV3U3R5bGU7XG4gICAgZGVsZXRlIHRoaXMuZ3JpZHN0ZXI7XG4gIH1cblxuICBwcmV2aWV3U3R5bGUoZHJhZz86IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuZ3JpZHN0ZXIubW92aW5nSXRlbSkge1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLCAnZGlzcGxheScsICcnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMuZ3JpZHN0ZXIuY29tcGFjdCAmJiBkcmFnKSB7XG4gICAgICAgIHRoaXMuZ3JpZHN0ZXIuY29tcGFjdC5jaGVja0NvbXBhY3RJdGVtKHRoaXMuZ3JpZHN0ZXIubW92aW5nSXRlbSk7XG4gICAgICB9XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWwsICdkaXNwbGF5JywgJ2Jsb2NrJyk7XG4gICAgICB0aGlzLmdyaWRzdGVyLmdyaWRSZW5kZXJlci51cGRhdGVJdGVtKHRoaXMuZWwsIHRoaXMuZ3JpZHN0ZXIubW92aW5nSXRlbSwgdGhpcy5yZW5kZXJlcik7XG4gICAgfVxuICB9XG59XG4iXX0=
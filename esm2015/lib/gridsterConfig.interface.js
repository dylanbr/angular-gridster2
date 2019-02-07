/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {string} */
const GridType = {
    Fit: 'fit',
    ScrollVertical: 'scrollVertical',
    ScrollHorizontal: 'scrollHorizontal',
    Fixed: 'fixed',
    VerticalFixed: 'verticalFixed',
    HorizontalFixed: 'horizontalFixed',
};
export { GridType };
/** @enum {string} */
const DisplayGrid = {
    Always: 'always',
    OnDragAndResize: 'onDrag&Resize',
    None: 'none',
};
export { DisplayGrid };
/** @enum {string} */
const CompactType = {
    None: 'none',
    CompactUp: 'compactUp',
    CompactLeft: 'compactLeft',
    CompactUpAndLeft: 'compactUp&Left',
    CompactLeftAndUp: 'compactLeft&Up',
    CompactRight: 'compactRight',
    CompactUpAndRight: 'compactUp&Right',
    CompactRightAndUp: 'compactRight&Up',
};
export { CompactType };
/**
 * @record
 */
export function GridsterConfig() { }
if (false) {
    /** @type {?|undefined} */
    GridsterConfig.prototype.gridType;
    /** @type {?|undefined} */
    GridsterConfig.prototype.fixedColWidth;
    /** @type {?|undefined} */
    GridsterConfig.prototype.fixedRowHeight;
    /** @type {?|undefined} */
    GridsterConfig.prototype.keepFixedHeightInMobile;
    /** @type {?|undefined} */
    GridsterConfig.prototype.keepFixedWidthInMobile;
    /** @type {?|undefined} */
    GridsterConfig.prototype.setGridSize;
    /** @type {?|undefined} */
    GridsterConfig.prototype.compactType;
    /** @type {?|undefined} */
    GridsterConfig.prototype.mobileBreakpoint;
    /** @type {?|undefined} */
    GridsterConfig.prototype.minCols;
    /** @type {?|undefined} */
    GridsterConfig.prototype.maxCols;
    /** @type {?|undefined} */
    GridsterConfig.prototype.minRows;
    /** @type {?|undefined} */
    GridsterConfig.prototype.maxRows;
    /** @type {?|undefined} */
    GridsterConfig.prototype.defaultItemCols;
    /** @type {?|undefined} */
    GridsterConfig.prototype.defaultItemRows;
    /** @type {?|undefined} */
    GridsterConfig.prototype.maxItemCols;
    /** @type {?|undefined} */
    GridsterConfig.prototype.maxItemRows;
    /** @type {?|undefined} */
    GridsterConfig.prototype.minItemCols;
    /** @type {?|undefined} */
    GridsterConfig.prototype.minItemRows;
    /** @type {?|undefined} */
    GridsterConfig.prototype.minItemArea;
    /** @type {?|undefined} */
    GridsterConfig.prototype.maxItemArea;
    /** @type {?|undefined} */
    GridsterConfig.prototype.margin;
    /** @type {?|undefined} */
    GridsterConfig.prototype.outerMargin;
    /** @type {?|undefined} */
    GridsterConfig.prototype.outerMarginTop;
    /** @type {?|undefined} */
    GridsterConfig.prototype.outerMarginRight;
    /** @type {?|undefined} */
    GridsterConfig.prototype.outerMarginBottom;
    /** @type {?|undefined} */
    GridsterConfig.prototype.outerMarginLeft;
    /** @type {?|undefined} */
    GridsterConfig.prototype.useTransformPositioning;
    /** @type {?|undefined} */
    GridsterConfig.prototype.scrollSensitivity;
    /** @type {?|undefined} */
    GridsterConfig.prototype.scrollSpeed;
    /** @type {?|undefined} */
    GridsterConfig.prototype.initCallback;
    /** @type {?|undefined} */
    GridsterConfig.prototype.destroyCallback;
    /** @type {?|undefined} */
    GridsterConfig.prototype.gridSizeChangedCallback;
    /** @type {?|undefined} */
    GridsterConfig.prototype.itemChangeCallback;
    /** @type {?|undefined} */
    GridsterConfig.prototype.itemResizeCallback;
    /** @type {?|undefined} */
    GridsterConfig.prototype.itemInitCallback;
    /** @type {?|undefined} */
    GridsterConfig.prototype.itemRemovedCallback;
    /** @type {?|undefined} */
    GridsterConfig.prototype.itemValidateCallback;
    /** @type {?|undefined} */
    GridsterConfig.prototype.draggable;
    /** @type {?|undefined} */
    GridsterConfig.prototype.resizable;
    /** @type {?|undefined} */
    GridsterConfig.prototype.swap;
    /** @type {?|undefined} */
    GridsterConfig.prototype.pushItems;
    /** @type {?|undefined} */
    GridsterConfig.prototype.disablePushOnDrag;
    /** @type {?|undefined} */
    GridsterConfig.prototype.disablePushOnResize;
    /** @type {?|undefined} */
    GridsterConfig.prototype.disableAutoPositionOnConflict;
    /** @type {?|undefined} */
    GridsterConfig.prototype.pushDirections;
    /** @type {?|undefined} */
    GridsterConfig.prototype.pushResizeItems;
    /** @type {?|undefined} */
    GridsterConfig.prototype.displayGrid;
    /** @type {?|undefined} */
    GridsterConfig.prototype.disableWindowResize;
    /** @type {?|undefined} */
    GridsterConfig.prototype.disableWarnings;
    /** @type {?|undefined} */
    GridsterConfig.prototype.scrollToNewItems;
    /** @type {?|undefined} */
    GridsterConfig.prototype.enableEmptyCellClick;
    /** @type {?|undefined} */
    GridsterConfig.prototype.enableEmptyCellContextMenu;
    /** @type {?|undefined} */
    GridsterConfig.prototype.enableEmptyCellDrop;
    /** @type {?|undefined} */
    GridsterConfig.prototype.enableEmptyCellDrag;
    /** @type {?|undefined} */
    GridsterConfig.prototype.emptyCellClickCallback;
    /** @type {?|undefined} */
    GridsterConfig.prototype.emptyCellContextMenuCallback;
    /** @type {?|undefined} */
    GridsterConfig.prototype.emptyCellDropCallback;
    /** @type {?|undefined} */
    GridsterConfig.prototype.emptyCellDragCallback;
    /** @type {?|undefined} */
    GridsterConfig.prototype.emptyCellDragMaxCols;
    /** @type {?|undefined} */
    GridsterConfig.prototype.emptyCellDragMaxRows;
    /** @type {?|undefined} */
    GridsterConfig.prototype.ignoreMarginInRow;
    /** @type {?|undefined} */
    GridsterConfig.prototype.api;
    /* Skipping unhandled member: [propName: string]: any;*/
}
/**
 * @record
 */
export function DragBase() { }
if (false) {
    /** @type {?|undefined} */
    DragBase.prototype.enabled;
    /** @type {?|undefined} */
    DragBase.prototype.stop;
    /** @type {?|undefined} */
    DragBase.prototype.start;
    /** @type {?|undefined} */
    DragBase.prototype.delayStart;
}
/**
 * @record
 */
export function Draggable() { }
if (false) {
    /** @type {?|undefined} */
    Draggable.prototype.ignoreContentClass;
    /** @type {?|undefined} */
    Draggable.prototype.ignoreContent;
    /** @type {?|undefined} */
    Draggable.prototype.dragHandleClass;
    /** @type {?|undefined} */
    Draggable.prototype.dropOverItems;
    /** @type {?|undefined} */
    Draggable.prototype.dropOverItemsCallback;
}
/**
 * @record
 */
export function Resizable() { }
if (false) {
    /** @type {?|undefined} */
    Resizable.prototype.handles;
}
/**
 * @record
 */
export function PushDirections() { }
if (false) {
    /** @type {?} */
    PushDirections.prototype.north;
    /** @type {?} */
    PushDirections.prototype.east;
    /** @type {?} */
    PushDirections.prototype.south;
    /** @type {?} */
    PushDirections.prototype.west;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZHN0ZXJDb25maWcuaW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1ncmlkc3RlcjIvIiwic291cmNlcyI6WyJsaWIvZ3JpZHN0ZXJDb25maWcuaW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztJQWlCRSxLQUFNLEtBQUs7SUFDWCxnQkFBaUIsZ0JBQWdCO0lBQ2pDLGtCQUFtQixrQkFBa0I7SUFDckMsT0FBUSxPQUFPO0lBQ2YsZUFBZ0IsZUFBZTtJQUMvQixpQkFBa0IsaUJBQWlCOzs7OztJQUluQyxRQUFTLFFBQVE7SUFDakIsaUJBQWtCLGVBQWU7SUFDakMsTUFBTyxNQUFNOzs7OztJQUliLE1BQU8sTUFBTTtJQUNiLFdBQVksV0FBVztJQUN2QixhQUFjLGFBQWE7SUFDM0Isa0JBQW1CLGdCQUFnQjtJQUNuQyxrQkFBbUIsZ0JBQWdCO0lBQ25DLGNBQWUsY0FBYztJQUM3QixtQkFBb0IsaUJBQWlCO0lBQ3JDLG1CQUFvQixpQkFBaUI7Ozs7OztBQUd2QyxvQ0F1RUM7OztJQXRFQyxrQ0FBcUI7O0lBQ3JCLHVDQUF1Qjs7SUFDdkIsd0NBQXdCOztJQUN4QixpREFBa0M7O0lBQ2xDLGdEQUFpQzs7SUFDakMscUNBQXNCOztJQUN0QixxQ0FBMkI7O0lBQzNCLDBDQUEwQjs7SUFDMUIsaUNBQWlCOztJQUNqQixpQ0FBaUI7O0lBQ2pCLGlDQUFpQjs7SUFDakIsaUNBQWlCOztJQUNqQix5Q0FBeUI7O0lBQ3pCLHlDQUF5Qjs7SUFDekIscUNBQXFCOztJQUNyQixxQ0FBcUI7O0lBQ3JCLHFDQUFxQjs7SUFDckIscUNBQXFCOztJQUNyQixxQ0FBcUI7O0lBQ3JCLHFDQUFxQjs7SUFDckIsZ0NBQWdCOztJQUNoQixxQ0FBc0I7O0lBQ3RCLHdDQUErQjs7SUFDL0IsMENBQWlDOztJQUNqQywyQ0FBa0M7O0lBQ2xDLHlDQUFnQzs7SUFDaEMsaURBQWtDOztJQUNsQywyQ0FBa0M7O0lBQ2xDLHFDQUFxQjs7SUFDckIsc0NBQThEOztJQUM5RCx5Q0FBaUU7O0lBQ2pFLGlEQUF5RTs7SUFDekUsNENBQWlHOztJQUNqRyw0Q0FBaUc7O0lBQ2pHLDBDQUErRjs7SUFDL0YsNkNBQWtHOztJQUNsRyw4Q0FBdUQ7O0lBQ3ZELG1DQUFzQjs7SUFDdEIsbUNBQXNCOztJQUN0Qiw4QkFBZTs7SUFDZixtQ0FBb0I7O0lBQ3BCLDJDQUE0Qjs7SUFDNUIsNkNBQThCOztJQUM5Qix1REFBd0M7O0lBQ3hDLHdDQUFnQzs7SUFDaEMseUNBQTBCOztJQUMxQixxQ0FBMkI7O0lBQzNCLDZDQUE4Qjs7SUFDOUIseUNBQTBCOztJQUMxQiwwQ0FBMkI7O0lBQzNCLDhDQUErQjs7SUFDL0Isb0RBQXFDOztJQUNyQyw2Q0FBOEI7O0lBQzlCLDZDQUE4Qjs7SUFDOUIsZ0RBQXlFOztJQUN6RSxzREFBK0U7O0lBQy9FLCtDQUF3RTs7SUFDeEUsK0NBQXdFOztJQUN4RSw4Q0FBOEI7O0lBQzlCLDhDQUE4Qjs7SUFDOUIsMkNBQTRCOztJQUM1Qiw2QkFNRTs7Ozs7O0FBS0osOEJBS0M7OztJQUpDLDJCQUFrQjs7SUFDbEIsd0JBQXFIOztJQUNySCx5QkFBdUc7O0lBQ3ZHLDhCQUFvQjs7Ozs7QUFHdEIsK0JBTUM7OztJQUxDLHVDQUE0Qjs7SUFDNUIsa0NBQXdCOztJQUN4QixvQ0FBeUI7O0lBQ3pCLGtDQUF3Qjs7SUFDeEIsMENBQWdIOzs7OztBQUdsSCwrQkFXQzs7O0lBVkMsNEJBU0U7Ozs7O0FBR0osb0NBS0M7OztJQUpDLCtCQUFlOztJQUNmLDhCQUFjOztJQUNkLCtCQUFlOztJQUNmLDhCQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtHcmlkc3Rlckl0ZW19IGZyb20gJy4vZ3JpZHN0ZXJJdGVtLmludGVyZmFjZSc7XG5pbXBvcnQge0dyaWRzdGVySXRlbUNvbXBvbmVudEludGVyZmFjZX0gZnJvbSAnLi9ncmlkc3Rlckl0ZW1Db21wb25lbnQuaW50ZXJmYWNlJztcbmltcG9ydCB7R3JpZHN0ZXJDb21wb25lbnRJbnRlcmZhY2V9IGZyb20gJy4vZ3JpZHN0ZXIuaW50ZXJmYWNlJztcblxuZXhwb3J0IHR5cGUgZ3JpZFR5cGVzID0gJ2ZpdCcgfCAnc2Nyb2xsVmVydGljYWwnIHwgJ3Njcm9sbEhvcml6b250YWwnIHwgJ2ZpeGVkJyB8ICd2ZXJ0aWNhbEZpeGVkJyB8ICdob3Jpem9udGFsRml4ZWQnO1xuZXhwb3J0IHR5cGUgZGlzcGxheUdyaWRzID0gJ2Fsd2F5cycgfCAnb25EcmFnJlJlc2l6ZScgfCAnbm9uZSc7XG5leHBvcnQgdHlwZSBjb21wYWN0VHlwZXMgPVxuICAnbm9uZSdcbiAgfCAnY29tcGFjdFVwJ1xuICB8ICdjb21wYWN0TGVmdCdcbiAgfCAnY29tcGFjdFVwJkxlZnQnXG4gIHwgJ2NvbXBhY3RMZWZ0JlVwJ1xuICB8ICdjb21wYWN0UmlnaHQnXG4gIHwgJ2NvbXBhY3RVcCZSaWdodCdcbiAgfCAnY29tcGFjdFJpZ2h0JlVwJztcblxuZXhwb3J0IGVudW0gR3JpZFR5cGUge1xuICBGaXQgPSAnZml0JyxcbiAgU2Nyb2xsVmVydGljYWwgPSAnc2Nyb2xsVmVydGljYWwnLFxuICBTY3JvbGxIb3Jpem9udGFsID0gJ3Njcm9sbEhvcml6b250YWwnLFxuICBGaXhlZCA9ICdmaXhlZCcsXG4gIFZlcnRpY2FsRml4ZWQgPSAndmVydGljYWxGaXhlZCcsXG4gIEhvcml6b250YWxGaXhlZCA9ICdob3Jpem9udGFsRml4ZWQnXG59XG5cbmV4cG9ydCBlbnVtIERpc3BsYXlHcmlkIHtcbiAgQWx3YXlzID0gJ2Fsd2F5cycsXG4gIE9uRHJhZ0FuZFJlc2l6ZSA9ICdvbkRyYWcmUmVzaXplJyxcbiAgTm9uZSA9ICdub25lJ1xufVxuXG5leHBvcnQgZW51bSBDb21wYWN0VHlwZSB7XG4gIE5vbmUgPSAnbm9uZScsXG4gIENvbXBhY3RVcCA9ICdjb21wYWN0VXAnLFxuICBDb21wYWN0TGVmdCA9ICdjb21wYWN0TGVmdCcsXG4gIENvbXBhY3RVcEFuZExlZnQgPSAnY29tcGFjdFVwJkxlZnQnLFxuICBDb21wYWN0TGVmdEFuZFVwID0gJ2NvbXBhY3RMZWZ0JlVwJyxcbiAgQ29tcGFjdFJpZ2h0ID0gJ2NvbXBhY3RSaWdodCcsXG4gIENvbXBhY3RVcEFuZFJpZ2h0ID0gJ2NvbXBhY3RVcCZSaWdodCcsXG4gIENvbXBhY3RSaWdodEFuZFVwID0gJ2NvbXBhY3RSaWdodCZVcCcsXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgR3JpZHN0ZXJDb25maWcge1xuICBncmlkVHlwZT86IGdyaWRUeXBlcztcbiAgZml4ZWRDb2xXaWR0aD86IG51bWJlcjtcbiAgZml4ZWRSb3dIZWlnaHQ/OiBudW1iZXI7XG4gIGtlZXBGaXhlZEhlaWdodEluTW9iaWxlPzogYm9vbGVhbjtcbiAga2VlcEZpeGVkV2lkdGhJbk1vYmlsZT86IGJvb2xlYW47XG4gIHNldEdyaWRTaXplPzogYm9vbGVhbjtcbiAgY29tcGFjdFR5cGU/OiBjb21wYWN0VHlwZXM7XG4gIG1vYmlsZUJyZWFrcG9pbnQ/OiBudW1iZXI7XG4gIG1pbkNvbHM/OiBudW1iZXI7XG4gIG1heENvbHM/OiBudW1iZXI7XG4gIG1pblJvd3M/OiBudW1iZXI7XG4gIG1heFJvd3M/OiBudW1iZXI7XG4gIGRlZmF1bHRJdGVtQ29scz86IG51bWJlcjtcbiAgZGVmYXVsdEl0ZW1Sb3dzPzogbnVtYmVyO1xuICBtYXhJdGVtQ29scz86IG51bWJlcjtcbiAgbWF4SXRlbVJvd3M/OiBudW1iZXI7XG4gIG1pbkl0ZW1Db2xzPzogbnVtYmVyO1xuICBtaW5JdGVtUm93cz86IG51bWJlcjtcbiAgbWluSXRlbUFyZWE/OiBudW1iZXI7XG4gIG1heEl0ZW1BcmVhPzogbnVtYmVyO1xuICBtYXJnaW4/OiBudW1iZXI7XG4gIG91dGVyTWFyZ2luPzogYm9vbGVhbjtcbiAgb3V0ZXJNYXJnaW5Ub3A/OiBudW1iZXIgfCBudWxsO1xuICBvdXRlck1hcmdpblJpZ2h0PzogbnVtYmVyIHwgbnVsbDtcbiAgb3V0ZXJNYXJnaW5Cb3R0b20/OiBudW1iZXIgfCBudWxsO1xuICBvdXRlck1hcmdpbkxlZnQ/OiBudW1iZXIgfCBudWxsO1xuICB1c2VUcmFuc2Zvcm1Qb3NpdGlvbmluZz86IGJvb2xlYW47XG4gIHNjcm9sbFNlbnNpdGl2aXR5PzogbnVtYmVyIHwgbnVsbDtcbiAgc2Nyb2xsU3BlZWQ/OiBudW1iZXI7XG4gIGluaXRDYWxsYmFjaz86IChncmlkc3RlcjogR3JpZHN0ZXJDb21wb25lbnRJbnRlcmZhY2UpID0+IHZvaWQ7XG4gIGRlc3Ryb3lDYWxsYmFjaz86IChncmlkc3RlcjogR3JpZHN0ZXJDb21wb25lbnRJbnRlcmZhY2UpID0+IHZvaWQ7XG4gIGdyaWRTaXplQ2hhbmdlZENhbGxiYWNrPzogKGdyaWRzdGVyOiBHcmlkc3RlckNvbXBvbmVudEludGVyZmFjZSkgPT4gdm9pZDtcbiAgaXRlbUNoYW5nZUNhbGxiYWNrPzogKGl0ZW06IEdyaWRzdGVySXRlbSwgaXRlbUNvbXBvbmVudDogR3JpZHN0ZXJJdGVtQ29tcG9uZW50SW50ZXJmYWNlKSA9PiB2b2lkO1xuICBpdGVtUmVzaXplQ2FsbGJhY2s/OiAoaXRlbTogR3JpZHN0ZXJJdGVtLCBpdGVtQ29tcG9uZW50OiBHcmlkc3Rlckl0ZW1Db21wb25lbnRJbnRlcmZhY2UpID0+IHZvaWQ7XG4gIGl0ZW1Jbml0Q2FsbGJhY2s/OiAoaXRlbTogR3JpZHN0ZXJJdGVtLCBpdGVtQ29tcG9uZW50OiBHcmlkc3Rlckl0ZW1Db21wb25lbnRJbnRlcmZhY2UpID0+IHZvaWQ7XG4gIGl0ZW1SZW1vdmVkQ2FsbGJhY2s/OiAoaXRlbTogR3JpZHN0ZXJJdGVtLCBpdGVtQ29tcG9uZW50OiBHcmlkc3Rlckl0ZW1Db21wb25lbnRJbnRlcmZhY2UpID0+IHZvaWQ7XG4gIGl0ZW1WYWxpZGF0ZUNhbGxiYWNrPzogKGl0ZW06IEdyaWRzdGVySXRlbSkgPT4gYm9vbGVhbjtcbiAgZHJhZ2dhYmxlPzogRHJhZ2dhYmxlO1xuICByZXNpemFibGU/OiBSZXNpemFibGU7XG4gIHN3YXA/OiBib29sZWFuO1xuICBwdXNoSXRlbXM/OiBib29sZWFuO1xuICBkaXNhYmxlUHVzaE9uRHJhZz86IGJvb2xlYW47XG4gIGRpc2FibGVQdXNoT25SZXNpemU/OiBib29sZWFuO1xuICBkaXNhYmxlQXV0b1Bvc2l0aW9uT25Db25mbGljdD86IGJvb2xlYW47XG4gIHB1c2hEaXJlY3Rpb25zPzogUHVzaERpcmVjdGlvbnM7XG4gIHB1c2hSZXNpemVJdGVtcz86IGJvb2xlYW47XG4gIGRpc3BsYXlHcmlkPzogZGlzcGxheUdyaWRzO1xuICBkaXNhYmxlV2luZG93UmVzaXplPzogYm9vbGVhbjtcbiAgZGlzYWJsZVdhcm5pbmdzPzogYm9vbGVhbjtcbiAgc2Nyb2xsVG9OZXdJdGVtcz86IGJvb2xlYW47XG4gIGVuYWJsZUVtcHR5Q2VsbENsaWNrPzogYm9vbGVhbjtcbiAgZW5hYmxlRW1wdHlDZWxsQ29udGV4dE1lbnU/OiBib29sZWFuO1xuICBlbmFibGVFbXB0eUNlbGxEcm9wPzogYm9vbGVhbjtcbiAgZW5hYmxlRW1wdHlDZWxsRHJhZz86IGJvb2xlYW47XG4gIGVtcHR5Q2VsbENsaWNrQ2FsbGJhY2s/OiAoZXZlbnQ6IE1vdXNlRXZlbnQsIGl0ZW06IEdyaWRzdGVySXRlbSkgPT4gdm9pZDtcbiAgZW1wdHlDZWxsQ29udGV4dE1lbnVDYWxsYmFjaz86IChldmVudDogTW91c2VFdmVudCwgaXRlbTogR3JpZHN0ZXJJdGVtKSA9PiB2b2lkO1xuICBlbXB0eUNlbGxEcm9wQ2FsbGJhY2s/OiAoZXZlbnQ6IE1vdXNlRXZlbnQsIGl0ZW06IEdyaWRzdGVySXRlbSkgPT4gdm9pZDtcbiAgZW1wdHlDZWxsRHJhZ0NhbGxiYWNrPzogKGV2ZW50OiBNb3VzZUV2ZW50LCBpdGVtOiBHcmlkc3Rlckl0ZW0pID0+IHZvaWQ7XG4gIGVtcHR5Q2VsbERyYWdNYXhDb2xzPzogbnVtYmVyO1xuICBlbXB0eUNlbGxEcmFnTWF4Um93cz86IG51bWJlcjtcbiAgaWdub3JlTWFyZ2luSW5Sb3c/OiBib29sZWFuO1xuICBhcGk/OiB7XG4gICAgcmVzaXplPzogKCkgPT4gdm9pZCxcbiAgICBvcHRpb25zQ2hhbmdlZD86ICgpID0+IHZvaWQsXG4gICAgZ2V0TmV4dFBvc3NpYmxlUG9zaXRpb24/OiAobmV3SXRlbTogR3JpZHN0ZXJJdGVtKSA9PiBib29sZWFuLFxuICAgIGdldEZpcnN0UG9zc2libGVQb3NpdGlvbj86IChpdGVtOiBHcmlkc3Rlckl0ZW0pID0+IEdyaWRzdGVySXRlbSxcbiAgICBnZXRMYXN0UG9zc2libGVQb3NpdGlvbj86IChpdGVtOiBHcmlkc3Rlckl0ZW0pID0+IEdyaWRzdGVySXRlbSxcbiAgfTtcblxuICBbcHJvcE5hbWU6IHN0cmluZ106IGFueTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBEcmFnQmFzZSB7XG4gIGVuYWJsZWQ/OiBib29sZWFuO1xuICBzdG9wPzogKGl0ZW06IEdyaWRzdGVySXRlbSwgaXRlbUNvbXBvbmVudDogR3JpZHN0ZXJJdGVtQ29tcG9uZW50SW50ZXJmYWNlLCBldmVudDogTW91c2VFdmVudCkgPT4gUHJvbWlzZTxhbnk+IHwgdm9pZDtcbiAgc3RhcnQ/OiAoaXRlbTogR3JpZHN0ZXJJdGVtLCBpdGVtQ29tcG9uZW50OiBHcmlkc3Rlckl0ZW1Db21wb25lbnRJbnRlcmZhY2UsIGV2ZW50OiBNb3VzZUV2ZW50KSA9PiB2b2lkO1xuICBkZWxheVN0YXJ0PzogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIERyYWdnYWJsZSBleHRlbmRzIERyYWdCYXNlIHtcbiAgaWdub3JlQ29udGVudENsYXNzPzogc3RyaW5nO1xuICBpZ25vcmVDb250ZW50PzogYm9vbGVhbjtcbiAgZHJhZ0hhbmRsZUNsYXNzPzogc3RyaW5nO1xuICBkcm9wT3Zlckl0ZW1zPzogYm9vbGVhbjtcbiAgZHJvcE92ZXJJdGVtc0NhbGxiYWNrPzogKHNvdXJjZTogR3JpZHN0ZXJJdGVtLCB0YXJnZXQ6IEdyaWRzdGVySXRlbSwgZ3JpZD86IEdyaWRzdGVyQ29tcG9uZW50SW50ZXJmYWNlKSA9PiB2b2lkO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFJlc2l6YWJsZSBleHRlbmRzIERyYWdCYXNlIHtcbiAgaGFuZGxlcz86IHtcbiAgICBzOiBib29sZWFuLFxuICAgIGU6IGJvb2xlYW4sXG4gICAgbjogYm9vbGVhbixcbiAgICB3OiBib29sZWFuLFxuICAgIHNlOiBib29sZWFuLFxuICAgIG5lOiBib29sZWFuLFxuICAgIHN3OiBib29sZWFuLFxuICAgIG53OiBib29sZWFuXG4gIH07XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUHVzaERpcmVjdGlvbnMge1xuICBub3J0aDogYm9vbGVhbjtcbiAgZWFzdDogYm9vbGVhbjtcbiAgc291dGg6IGJvb2xlYW47XG4gIHdlc3Q6IGJvb2xlYW47XG59XG4iXX0=
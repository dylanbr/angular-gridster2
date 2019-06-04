/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
    GridsterConfig.prototype.disableScrollHorizontal;
    /** @type {?|undefined} */
    GridsterConfig.prototype.disableScrollVertical;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZHN0ZXJDb25maWcuaW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1ncmlkc3RlcjIvIiwic291cmNlcyI6WyJsaWIvZ3JpZHN0ZXJDb25maWcuaW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztJQWlCRSxLQUFNLEtBQUs7SUFDWCxnQkFBaUIsZ0JBQWdCO0lBQ2pDLGtCQUFtQixrQkFBa0I7SUFDckMsT0FBUSxPQUFPO0lBQ2YsZUFBZ0IsZUFBZTtJQUMvQixpQkFBa0IsaUJBQWlCOzs7OztJQUluQyxRQUFTLFFBQVE7SUFDakIsaUJBQWtCLGVBQWU7SUFDakMsTUFBTyxNQUFNOzs7OztJQUliLE1BQU8sTUFBTTtJQUNiLFdBQVksV0FBVztJQUN2QixhQUFjLGFBQWE7SUFDM0Isa0JBQW1CLGdCQUFnQjtJQUNuQyxrQkFBbUIsZ0JBQWdCO0lBQ25DLGNBQWUsY0FBYztJQUM3QixtQkFBb0IsaUJBQWlCO0lBQ3JDLG1CQUFvQixpQkFBaUI7Ozs7OztBQUd2QyxvQ0F5RUM7OztJQXhFQyxrQ0FBcUI7O0lBQ3JCLHVDQUF1Qjs7SUFDdkIsd0NBQXdCOztJQUN4QixpREFBa0M7O0lBQ2xDLGdEQUFpQzs7SUFDakMscUNBQXNCOztJQUN0QixxQ0FBMkI7O0lBQzNCLDBDQUEwQjs7SUFDMUIsaUNBQWlCOztJQUNqQixpQ0FBaUI7O0lBQ2pCLGlDQUFpQjs7SUFDakIsaUNBQWlCOztJQUNqQix5Q0FBeUI7O0lBQ3pCLHlDQUF5Qjs7SUFDekIscUNBQXFCOztJQUNyQixxQ0FBcUI7O0lBQ3JCLHFDQUFxQjs7SUFDckIscUNBQXFCOztJQUNyQixxQ0FBcUI7O0lBQ3JCLHFDQUFxQjs7SUFDckIsZ0NBQWdCOztJQUNoQixxQ0FBc0I7O0lBQ3RCLHdDQUErQjs7SUFDL0IsMENBQWlDOztJQUNqQywyQ0FBa0M7O0lBQ2xDLHlDQUFnQzs7SUFDaEMsaURBQWtDOztJQUNsQywyQ0FBa0M7O0lBQ2xDLHFDQUFxQjs7SUFDckIsc0NBQThEOztJQUM5RCx5Q0FBaUU7O0lBQ2pFLGlEQUF5RTs7SUFDekUsNENBQXdIOztJQUN4SCw0Q0FBaUc7O0lBQ2pHLDBDQUErRjs7SUFDL0YsNkNBQWtHOztJQUNsRyw4Q0FBdUQ7O0lBQ3ZELG1DQUFzQjs7SUFDdEIsbUNBQXNCOztJQUN0Qiw4QkFBZTs7SUFDZixtQ0FBb0I7O0lBQ3BCLDJDQUE0Qjs7SUFDNUIsNkNBQThCOztJQUM5Qix1REFBd0M7O0lBQ3hDLHdDQUFnQzs7SUFDaEMseUNBQTBCOztJQUMxQixxQ0FBMkI7O0lBQzNCLDZDQUE4Qjs7SUFDOUIseUNBQTBCOztJQUMxQiwwQ0FBMkI7O0lBQzNCLGlEQUFrQzs7SUFDbEMsK0NBQWdDOztJQUNoQyw4Q0FBK0I7O0lBQy9CLG9EQUFxQzs7SUFDckMsNkNBQThCOztJQUM5Qiw2Q0FBOEI7O0lBQzlCLGdEQUF5RTs7SUFDekUsc0RBQStFOztJQUMvRSwrQ0FBd0U7O0lBQ3hFLCtDQUF3RTs7SUFDeEUsOENBQThCOztJQUM5Qiw4Q0FBOEI7O0lBQzlCLDJDQUE0Qjs7SUFDNUIsNkJBTUU7Ozs7OztBQUtKLDhCQUtDOzs7SUFKQywyQkFBa0I7O0lBQ2xCLHdCQUFxSDs7SUFDckgseUJBQXVHOztJQUN2Ryw4QkFBb0I7Ozs7O0FBR3RCLCtCQU1DOzs7SUFMQyx1Q0FBNEI7O0lBQzVCLGtDQUF3Qjs7SUFDeEIsb0NBQXlCOztJQUN6QixrQ0FBd0I7O0lBQ3hCLDBDQUFnSDs7Ozs7QUFHbEgsK0JBV0M7OztJQVZDLDRCQVNFOzs7OztBQUdKLG9DQUtDOzs7SUFKQywrQkFBZTs7SUFDZiw4QkFBYzs7SUFDZCwrQkFBZTs7SUFDZiw4QkFBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7R3JpZHN0ZXJJdGVtfSBmcm9tICcuL2dyaWRzdGVySXRlbS5pbnRlcmZhY2UnO1xuaW1wb3J0IHtHcmlkc3Rlckl0ZW1Db21wb25lbnRJbnRlcmZhY2V9IGZyb20gJy4vZ3JpZHN0ZXJJdGVtQ29tcG9uZW50LmludGVyZmFjZSc7XG5pbXBvcnQge0dyaWRzdGVyQ29tcG9uZW50SW50ZXJmYWNlfSBmcm9tICcuL2dyaWRzdGVyLmludGVyZmFjZSc7XG5cbmV4cG9ydCB0eXBlIGdyaWRUeXBlcyA9ICdmaXQnIHwgJ3Njcm9sbFZlcnRpY2FsJyB8ICdzY3JvbGxIb3Jpem9udGFsJyB8ICdmaXhlZCcgfCAndmVydGljYWxGaXhlZCcgfCAnaG9yaXpvbnRhbEZpeGVkJztcbmV4cG9ydCB0eXBlIGRpc3BsYXlHcmlkcyA9ICdhbHdheXMnIHwgJ29uRHJhZyZSZXNpemUnIHwgJ25vbmUnO1xuZXhwb3J0IHR5cGUgY29tcGFjdFR5cGVzID1cbiAgJ25vbmUnXG4gIHwgJ2NvbXBhY3RVcCdcbiAgfCAnY29tcGFjdExlZnQnXG4gIHwgJ2NvbXBhY3RVcCZMZWZ0J1xuICB8ICdjb21wYWN0TGVmdCZVcCdcbiAgfCAnY29tcGFjdFJpZ2h0J1xuICB8ICdjb21wYWN0VXAmUmlnaHQnXG4gIHwgJ2NvbXBhY3RSaWdodCZVcCc7XG5cbmV4cG9ydCBlbnVtIEdyaWRUeXBlIHtcbiAgRml0ID0gJ2ZpdCcsXG4gIFNjcm9sbFZlcnRpY2FsID0gJ3Njcm9sbFZlcnRpY2FsJyxcbiAgU2Nyb2xsSG9yaXpvbnRhbCA9ICdzY3JvbGxIb3Jpem9udGFsJyxcbiAgRml4ZWQgPSAnZml4ZWQnLFxuICBWZXJ0aWNhbEZpeGVkID0gJ3ZlcnRpY2FsRml4ZWQnLFxuICBIb3Jpem9udGFsRml4ZWQgPSAnaG9yaXpvbnRhbEZpeGVkJ1xufVxuXG5leHBvcnQgZW51bSBEaXNwbGF5R3JpZCB7XG4gIEFsd2F5cyA9ICdhbHdheXMnLFxuICBPbkRyYWdBbmRSZXNpemUgPSAnb25EcmFnJlJlc2l6ZScsXG4gIE5vbmUgPSAnbm9uZSdcbn1cblxuZXhwb3J0IGVudW0gQ29tcGFjdFR5cGUge1xuICBOb25lID0gJ25vbmUnLFxuICBDb21wYWN0VXAgPSAnY29tcGFjdFVwJyxcbiAgQ29tcGFjdExlZnQgPSAnY29tcGFjdExlZnQnLFxuICBDb21wYWN0VXBBbmRMZWZ0ID0gJ2NvbXBhY3RVcCZMZWZ0JyxcbiAgQ29tcGFjdExlZnRBbmRVcCA9ICdjb21wYWN0TGVmdCZVcCcsXG4gIENvbXBhY3RSaWdodCA9ICdjb21wYWN0UmlnaHQnLFxuICBDb21wYWN0VXBBbmRSaWdodCA9ICdjb21wYWN0VXAmUmlnaHQnLFxuICBDb21wYWN0UmlnaHRBbmRVcCA9ICdjb21wYWN0UmlnaHQmVXAnLFxufVxuXG5leHBvcnQgaW50ZXJmYWNlIEdyaWRzdGVyQ29uZmlnIHtcbiAgZ3JpZFR5cGU/OiBncmlkVHlwZXM7XG4gIGZpeGVkQ29sV2lkdGg/OiBudW1iZXI7XG4gIGZpeGVkUm93SGVpZ2h0PzogbnVtYmVyO1xuICBrZWVwRml4ZWRIZWlnaHRJbk1vYmlsZT86IGJvb2xlYW47XG4gIGtlZXBGaXhlZFdpZHRoSW5Nb2JpbGU/OiBib29sZWFuO1xuICBzZXRHcmlkU2l6ZT86IGJvb2xlYW47XG4gIGNvbXBhY3RUeXBlPzogY29tcGFjdFR5cGVzO1xuICBtb2JpbGVCcmVha3BvaW50PzogbnVtYmVyO1xuICBtaW5Db2xzPzogbnVtYmVyO1xuICBtYXhDb2xzPzogbnVtYmVyO1xuICBtaW5Sb3dzPzogbnVtYmVyO1xuICBtYXhSb3dzPzogbnVtYmVyO1xuICBkZWZhdWx0SXRlbUNvbHM/OiBudW1iZXI7XG4gIGRlZmF1bHRJdGVtUm93cz86IG51bWJlcjtcbiAgbWF4SXRlbUNvbHM/OiBudW1iZXI7XG4gIG1heEl0ZW1Sb3dzPzogbnVtYmVyO1xuICBtaW5JdGVtQ29scz86IG51bWJlcjtcbiAgbWluSXRlbVJvd3M/OiBudW1iZXI7XG4gIG1pbkl0ZW1BcmVhPzogbnVtYmVyO1xuICBtYXhJdGVtQXJlYT86IG51bWJlcjtcbiAgbWFyZ2luPzogbnVtYmVyO1xuICBvdXRlck1hcmdpbj86IGJvb2xlYW47XG4gIG91dGVyTWFyZ2luVG9wPzogbnVtYmVyIHwgbnVsbDtcbiAgb3V0ZXJNYXJnaW5SaWdodD86IG51bWJlciB8IG51bGw7XG4gIG91dGVyTWFyZ2luQm90dG9tPzogbnVtYmVyIHwgbnVsbDtcbiAgb3V0ZXJNYXJnaW5MZWZ0PzogbnVtYmVyIHwgbnVsbDtcbiAgdXNlVHJhbnNmb3JtUG9zaXRpb25pbmc/OiBib29sZWFuO1xuICBzY3JvbGxTZW5zaXRpdml0eT86IG51bWJlciB8IG51bGw7XG4gIHNjcm9sbFNwZWVkPzogbnVtYmVyO1xuICBpbml0Q2FsbGJhY2s/OiAoZ3JpZHN0ZXI6IEdyaWRzdGVyQ29tcG9uZW50SW50ZXJmYWNlKSA9PiB2b2lkO1xuICBkZXN0cm95Q2FsbGJhY2s/OiAoZ3JpZHN0ZXI6IEdyaWRzdGVyQ29tcG9uZW50SW50ZXJmYWNlKSA9PiB2b2lkO1xuICBncmlkU2l6ZUNoYW5nZWRDYWxsYmFjaz86IChncmlkc3RlcjogR3JpZHN0ZXJDb21wb25lbnRJbnRlcmZhY2UpID0+IHZvaWQ7XG4gIGl0ZW1DaGFuZ2VDYWxsYmFjaz86IChpdGVtOiBHcmlkc3Rlckl0ZW0sIGl0ZW1Db21wb25lbnQ6IEdyaWRzdGVySXRlbUNvbXBvbmVudEludGVyZmFjZSwgb2xkSXRlbTogR3JpZHN0ZXJJdGVtKSA9PiB2b2lkO1xuICBpdGVtUmVzaXplQ2FsbGJhY2s/OiAoaXRlbTogR3JpZHN0ZXJJdGVtLCBpdGVtQ29tcG9uZW50OiBHcmlkc3Rlckl0ZW1Db21wb25lbnRJbnRlcmZhY2UpID0+IHZvaWQ7XG4gIGl0ZW1Jbml0Q2FsbGJhY2s/OiAoaXRlbTogR3JpZHN0ZXJJdGVtLCBpdGVtQ29tcG9uZW50OiBHcmlkc3Rlckl0ZW1Db21wb25lbnRJbnRlcmZhY2UpID0+IHZvaWQ7XG4gIGl0ZW1SZW1vdmVkQ2FsbGJhY2s/OiAoaXRlbTogR3JpZHN0ZXJJdGVtLCBpdGVtQ29tcG9uZW50OiBHcmlkc3Rlckl0ZW1Db21wb25lbnRJbnRlcmZhY2UpID0+IHZvaWQ7XG4gIGl0ZW1WYWxpZGF0ZUNhbGxiYWNrPzogKGl0ZW06IEdyaWRzdGVySXRlbSkgPT4gYm9vbGVhbjtcbiAgZHJhZ2dhYmxlPzogRHJhZ2dhYmxlO1xuICByZXNpemFibGU/OiBSZXNpemFibGU7XG4gIHN3YXA/OiBib29sZWFuO1xuICBwdXNoSXRlbXM/OiBib29sZWFuO1xuICBkaXNhYmxlUHVzaE9uRHJhZz86IGJvb2xlYW47XG4gIGRpc2FibGVQdXNoT25SZXNpemU/OiBib29sZWFuO1xuICBkaXNhYmxlQXV0b1Bvc2l0aW9uT25Db25mbGljdD86IGJvb2xlYW47XG4gIHB1c2hEaXJlY3Rpb25zPzogUHVzaERpcmVjdGlvbnM7XG4gIHB1c2hSZXNpemVJdGVtcz86IGJvb2xlYW47XG4gIGRpc3BsYXlHcmlkPzogZGlzcGxheUdyaWRzO1xuICBkaXNhYmxlV2luZG93UmVzaXplPzogYm9vbGVhbjtcbiAgZGlzYWJsZVdhcm5pbmdzPzogYm9vbGVhbjtcbiAgc2Nyb2xsVG9OZXdJdGVtcz86IGJvb2xlYW47XG4gIGRpc2FibGVTY3JvbGxIb3Jpem9udGFsPzogYm9vbGVhbjtcbiAgZGlzYWJsZVNjcm9sbFZlcnRpY2FsPzogYm9vbGVhbjtcbiAgZW5hYmxlRW1wdHlDZWxsQ2xpY2s/OiBib29sZWFuO1xuICBlbmFibGVFbXB0eUNlbGxDb250ZXh0TWVudT86IGJvb2xlYW47XG4gIGVuYWJsZUVtcHR5Q2VsbERyb3A/OiBib29sZWFuO1xuICBlbmFibGVFbXB0eUNlbGxEcmFnPzogYm9vbGVhbjtcbiAgZW1wdHlDZWxsQ2xpY2tDYWxsYmFjaz86IChldmVudDogTW91c2VFdmVudCwgaXRlbTogR3JpZHN0ZXJJdGVtKSA9PiB2b2lkO1xuICBlbXB0eUNlbGxDb250ZXh0TWVudUNhbGxiYWNrPzogKGV2ZW50OiBNb3VzZUV2ZW50LCBpdGVtOiBHcmlkc3Rlckl0ZW0pID0+IHZvaWQ7XG4gIGVtcHR5Q2VsbERyb3BDYWxsYmFjaz86IChldmVudDogTW91c2VFdmVudCwgaXRlbTogR3JpZHN0ZXJJdGVtKSA9PiB2b2lkO1xuICBlbXB0eUNlbGxEcmFnQ2FsbGJhY2s/OiAoZXZlbnQ6IE1vdXNlRXZlbnQsIGl0ZW06IEdyaWRzdGVySXRlbSkgPT4gdm9pZDtcbiAgZW1wdHlDZWxsRHJhZ01heENvbHM/OiBudW1iZXI7XG4gIGVtcHR5Q2VsbERyYWdNYXhSb3dzPzogbnVtYmVyO1xuICBpZ25vcmVNYXJnaW5JblJvdz86IGJvb2xlYW47XG4gIGFwaT86IHtcbiAgICByZXNpemU/OiAoKSA9PiB2b2lkLFxuICAgIG9wdGlvbnNDaGFuZ2VkPzogKCkgPT4gdm9pZCxcbiAgICBnZXROZXh0UG9zc2libGVQb3NpdGlvbj86IChuZXdJdGVtOiBHcmlkc3Rlckl0ZW0pID0+IGJvb2xlYW4sXG4gICAgZ2V0Rmlyc3RQb3NzaWJsZVBvc2l0aW9uPzogKGl0ZW06IEdyaWRzdGVySXRlbSkgPT4gR3JpZHN0ZXJJdGVtLFxuICAgIGdldExhc3RQb3NzaWJsZVBvc2l0aW9uPzogKGl0ZW06IEdyaWRzdGVySXRlbSkgPT4gR3JpZHN0ZXJJdGVtLFxuICB9O1xuXG4gIFtwcm9wTmFtZTogc3RyaW5nXTogYW55O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIERyYWdCYXNlIHtcbiAgZW5hYmxlZD86IGJvb2xlYW47XG4gIHN0b3A/OiAoaXRlbTogR3JpZHN0ZXJJdGVtLCBpdGVtQ29tcG9uZW50OiBHcmlkc3Rlckl0ZW1Db21wb25lbnRJbnRlcmZhY2UsIGV2ZW50OiBNb3VzZUV2ZW50KSA9PiBQcm9taXNlPGFueT4gfCB2b2lkO1xuICBzdGFydD86IChpdGVtOiBHcmlkc3Rlckl0ZW0sIGl0ZW1Db21wb25lbnQ6IEdyaWRzdGVySXRlbUNvbXBvbmVudEludGVyZmFjZSwgZXZlbnQ6IE1vdXNlRXZlbnQpID0+IHZvaWQ7XG4gIGRlbGF5U3RhcnQ/OiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRHJhZ2dhYmxlIGV4dGVuZHMgRHJhZ0Jhc2Uge1xuICBpZ25vcmVDb250ZW50Q2xhc3M/OiBzdHJpbmc7XG4gIGlnbm9yZUNvbnRlbnQ/OiBib29sZWFuO1xuICBkcmFnSGFuZGxlQ2xhc3M/OiBzdHJpbmc7XG4gIGRyb3BPdmVySXRlbXM/OiBib29sZWFuO1xuICBkcm9wT3Zlckl0ZW1zQ2FsbGJhY2s/OiAoc291cmNlOiBHcmlkc3Rlckl0ZW0sIHRhcmdldDogR3JpZHN0ZXJJdGVtLCBncmlkPzogR3JpZHN0ZXJDb21wb25lbnRJbnRlcmZhY2UpID0+IHZvaWQ7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVzaXphYmxlIGV4dGVuZHMgRHJhZ0Jhc2Uge1xuICBoYW5kbGVzPzoge1xuICAgIHM6IGJvb2xlYW4sXG4gICAgZTogYm9vbGVhbixcbiAgICBuOiBib29sZWFuLFxuICAgIHc6IGJvb2xlYW4sXG4gICAgc2U6IGJvb2xlYW4sXG4gICAgbmU6IGJvb2xlYW4sXG4gICAgc3c6IGJvb2xlYW4sXG4gICAgbnc6IGJvb2xlYW5cbiAgfTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBQdXNoRGlyZWN0aW9ucyB7XG4gIG5vcnRoOiBib29sZWFuO1xuICBlYXN0OiBib29sZWFuO1xuICBzb3V0aDogYm9vbGVhbjtcbiAgd2VzdDogYm9vbGVhbjtcbn1cbiJdfQ==
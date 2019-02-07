/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @abstract
 */
var /**
 * @abstract
 */
GridsterComponentInterface = /** @class */ (function () {
    function GridsterComponentInterface() {
    }
    return GridsterComponentInterface;
}());
/**
 * @abstract
 */
export { GridsterComponentInterface };
if (false) {
    /** @type {?} */
    GridsterComponentInterface.prototype.$options;
    /** @type {?} */
    GridsterComponentInterface.prototype.grid;
    /** @type {?} */
    GridsterComponentInterface.prototype.checkCollision;
    /** @type {?} */
    GridsterComponentInterface.prototype.positionXToPixels;
    /** @type {?} */
    GridsterComponentInterface.prototype.pixelsToPositionX;
    /** @type {?} */
    GridsterComponentInterface.prototype.positionYToPixels;
    /** @type {?} */
    GridsterComponentInterface.prototype.pixelsToPositionY;
    /** @type {?} */
    GridsterComponentInterface.prototype.findItemWithItem;
    /** @type {?} */
    GridsterComponentInterface.prototype.findItemsWithItem;
    /** @type {?} */
    GridsterComponentInterface.prototype.checkGridCollision;
    /** @type {?} */
    GridsterComponentInterface.prototype.el;
    /** @type {?} */
    GridsterComponentInterface.prototype.renderer;
    /** @type {?} */
    GridsterComponentInterface.prototype.gridRenderer;
    /** @type {?} */
    GridsterComponentInterface.prototype.cdRef;
    /** @type {?} */
    GridsterComponentInterface.prototype.options;
    /** @type {?} */
    GridsterComponentInterface.prototype.calculateLayoutDebounce;
    /** @type {?} */
    GridsterComponentInterface.prototype.updateGrid;
    /** @type {?} */
    GridsterComponentInterface.prototype.movingItem;
    /** @type {?} */
    GridsterComponentInterface.prototype.addItem;
    /** @type {?} */
    GridsterComponentInterface.prototype.removeItem;
    /** @type {?} */
    GridsterComponentInterface.prototype.previewStyle;
    /** @type {?} */
    GridsterComponentInterface.prototype.mobile;
    /** @type {?} */
    GridsterComponentInterface.prototype.curWidth;
    /** @type {?} */
    GridsterComponentInterface.prototype.curHeight;
    /** @type {?} */
    GridsterComponentInterface.prototype.columns;
    /** @type {?} */
    GridsterComponentInterface.prototype.rows;
    /** @type {?} */
    GridsterComponentInterface.prototype.curColWidth;
    /** @type {?} */
    GridsterComponentInterface.prototype.curRowHeight;
    /** @type {?} */
    GridsterComponentInterface.prototype.windowResize;
    /** @type {?} */
    GridsterComponentInterface.prototype.setGridDimensions;
    /** @type {?} */
    GridsterComponentInterface.prototype.dragInProgress;
    /** @type {?} */
    GridsterComponentInterface.prototype.emptyCell;
    /** @type {?} */
    GridsterComponentInterface.prototype.compact;
    /** @type {?} */
    GridsterComponentInterface.prototype.zone;
    /** @type {?} */
    GridsterComponentInterface.prototype.gridRows;
    /** @type {?} */
    GridsterComponentInterface.prototype.gridColumns;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZHN0ZXIuaW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1ncmlkc3RlcjIvIiwic291cmNlcyI6WyJsaWIvZ3JpZHN0ZXIuaW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFTQTs7OztJQUFBO0lBcUNBLENBQUM7SUFBRCxpQ0FBQztBQUFELENBQUMsQUFyQ0QsSUFxQ0M7Ozs7Ozs7SUFwQ0MsOENBQTBCOztJQUMxQiwwQ0FBNEM7O0lBQzVDLG9EQUFpRjs7SUFDakYsdURBQXlDOztJQUN6Qyx1REFBbUc7O0lBQ25HLHVEQUF5Qzs7SUFDekMsdURBQW1HOztJQUNuRyxzREFBbUY7O0lBQ25GLHVEQUFpRjs7SUFDakYsd0RBQW9EOztJQUNwRCx3Q0FBUTs7SUFDUiw4Q0FBb0I7O0lBQ3BCLGtEQUErQjs7SUFDL0IsMkNBQXlCOztJQUN6Qiw2Q0FBd0I7O0lBQ3hCLDZEQUFvQzs7SUFDcEMsZ0RBQXVCOztJQUN2QixnREFBZ0M7O0lBQ2hDLDZDQUF3RDs7SUFDeEQsZ0RBQTJEOztJQUMzRCxrREFBdUM7O0lBQ3ZDLDRDQUFnQjs7SUFDaEIsOENBQWlCOztJQUNqQiwrQ0FBa0I7O0lBQ2xCLDZDQUFnQjs7SUFDaEIsMENBQWE7O0lBQ2IsaURBQW9COztJQUNwQixrREFBcUI7O0lBQ3JCLGtEQUFrQzs7SUFDbEMsdURBQWdDOztJQUNoQyxvREFBd0I7O0lBQ3hCLCtDQUE2Qjs7SUFDN0IsNkNBQXlCOztJQUN6QiwwQ0FBYTs7SUFDYiw4Q0FBd0I7O0lBQ3hCLGlEQUEyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7R3JpZHN0ZXJDb25maWdTfSBmcm9tICcuL2dyaWRzdGVyQ29uZmlnUy5pbnRlcmZhY2UnO1xuaW1wb3J0IHtDaGFuZ2VEZXRlY3RvclJlZiwgTmdab25lLCBSZW5kZXJlcjJ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtHcmlkc3RlckVtcHR5Q2VsbH0gZnJvbSAnLi9ncmlkc3RlckVtcHR5Q2VsbC5zZXJ2aWNlJztcbmltcG9ydCB7R3JpZHN0ZXJDb21wYWN0fSBmcm9tICcuL2dyaWRzdGVyQ29tcGFjdC5zZXJ2aWNlJztcbmltcG9ydCB7R3JpZHN0ZXJDb25maWd9IGZyb20gJy4vZ3JpZHN0ZXJDb25maWcuaW50ZXJmYWNlJztcbmltcG9ydCB7R3JpZHN0ZXJJdGVtfSBmcm9tICcuL2dyaWRzdGVySXRlbS5pbnRlcmZhY2UnO1xuaW1wb3J0IHtHcmlkc3Rlckl0ZW1Db21wb25lbnRJbnRlcmZhY2V9IGZyb20gJy4vZ3JpZHN0ZXJJdGVtQ29tcG9uZW50LmludGVyZmFjZSc7XG5pbXBvcnQge0dyaWRzdGVyUmVuZGVyZXJ9IGZyb20gJy4vZ3JpZHN0ZXJSZW5kZXJlci5zZXJ2aWNlJztcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEdyaWRzdGVyQ29tcG9uZW50SW50ZXJmYWNlIHtcbiAgJG9wdGlvbnM6IEdyaWRzdGVyQ29uZmlnUztcbiAgZ3JpZDogQXJyYXk8R3JpZHN0ZXJJdGVtQ29tcG9uZW50SW50ZXJmYWNlPjtcbiAgY2hlY2tDb2xsaXNpb246IChpdGVtOiBHcmlkc3Rlckl0ZW0pID0+IEdyaWRzdGVySXRlbUNvbXBvbmVudEludGVyZmFjZSB8IGJvb2xlYW47XG4gIHBvc2l0aW9uWFRvUGl4ZWxzOiAoeDogbnVtYmVyKSA9PiBudW1iZXI7XG4gIHBpeGVsc1RvUG9zaXRpb25YOiAoeDogbnVtYmVyLCByb3VuZGluZ01ldGhvZDogKHg6IG51bWJlcikgPT4gbnVtYmVyLCBub0xpbWl0PzogYm9vbGVhbikgPT4gbnVtYmVyO1xuICBwb3NpdGlvbllUb1BpeGVsczogKHk6IG51bWJlcikgPT4gbnVtYmVyO1xuICBwaXhlbHNUb1Bvc2l0aW9uWTogKHk6IG51bWJlciwgcm91bmRpbmdNZXRob2Q6ICh4OiBudW1iZXIpID0+IG51bWJlciwgbm9MaW1pdD86IGJvb2xlYW4pID0+IG51bWJlcjtcbiAgZmluZEl0ZW1XaXRoSXRlbTogKGl0ZW06IEdyaWRzdGVySXRlbSkgPT4gR3JpZHN0ZXJJdGVtQ29tcG9uZW50SW50ZXJmYWNlIHwgYm9vbGVhbjtcbiAgZmluZEl0ZW1zV2l0aEl0ZW06IChpdGVtOiBHcmlkc3Rlckl0ZW0pID0+IEFycmF5PEdyaWRzdGVySXRlbUNvbXBvbmVudEludGVyZmFjZT47XG4gIGNoZWNrR3JpZENvbGxpc2lvbjogKGl0ZW06IEdyaWRzdGVySXRlbSkgPT4gYm9vbGVhbjtcbiAgZWw6IGFueTtcbiAgcmVuZGVyZXI6IFJlbmRlcmVyMjtcbiAgZ3JpZFJlbmRlcmVyOiBHcmlkc3RlclJlbmRlcmVyO1xuICBjZFJlZjogQ2hhbmdlRGV0ZWN0b3JSZWY7XG4gIG9wdGlvbnM6IEdyaWRzdGVyQ29uZmlnO1xuICBjYWxjdWxhdGVMYXlvdXREZWJvdW5jZTogKCkgPT4gdm9pZDtcbiAgdXBkYXRlR3JpZDogKCkgPT4gdm9pZDtcbiAgbW92aW5nSXRlbTogR3JpZHN0ZXJJdGVtIHwgbnVsbDtcbiAgYWRkSXRlbTogKGl0ZW06IEdyaWRzdGVySXRlbUNvbXBvbmVudEludGVyZmFjZSkgPT4gdm9pZDtcbiAgcmVtb3ZlSXRlbTogKGl0ZW06IEdyaWRzdGVySXRlbUNvbXBvbmVudEludGVyZmFjZSkgPT4gdm9pZDtcbiAgcHJldmlld1N0eWxlOiAoZHJhZz86IGJvb2xlYW4pID0+IHZvaWQ7XG4gIG1vYmlsZTogYm9vbGVhbjtcbiAgY3VyV2lkdGg6IG51bWJlcjtcbiAgY3VySGVpZ2h0OiBudW1iZXI7XG4gIGNvbHVtbnM6IG51bWJlcjtcbiAgcm93czogbnVtYmVyO1xuICBjdXJDb2xXaWR0aDogbnVtYmVyO1xuICBjdXJSb3dIZWlnaHQ6IG51bWJlcjtcbiAgd2luZG93UmVzaXplOiAoKCkgPT4gdm9pZCkgfCBudWxsO1xuICBzZXRHcmlkRGltZW5zaW9uczogKCgpID0+IHZvaWQpO1xuICBkcmFnSW5Qcm9ncmVzczogYm9vbGVhbjtcbiAgZW1wdHlDZWxsOiBHcmlkc3RlckVtcHR5Q2VsbDtcbiAgY29tcGFjdDogR3JpZHN0ZXJDb21wYWN0O1xuICB6b25lOiBOZ1pvbmU7XG4gIGdyaWRSb3dzOiBBcnJheTxudW1iZXI+O1xuICBncmlkQ29sdW1uczogQXJyYXk8bnVtYmVyPjtcbn1cbiJdfQ==
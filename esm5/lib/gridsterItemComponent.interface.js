/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @abstract
 */
var /**
 * @abstract
 */
GridsterItemComponentInterface = /** @class */ (function () {
    function GridsterItemComponentInterface() {
    }
    return GridsterItemComponentInterface;
}());
/**
 * @abstract
 */
export { GridsterItemComponentInterface };
if (false) {
    /** @type {?} */
    GridsterItemComponentInterface.prototype.item;
    /** @type {?} */
    GridsterItemComponentInterface.prototype.$item;
    /** @type {?} */
    GridsterItemComponentInterface.prototype.top;
    /** @type {?} */
    GridsterItemComponentInterface.prototype.left;
    /** @type {?} */
    GridsterItemComponentInterface.prototype.width;
    /** @type {?} */
    GridsterItemComponentInterface.prototype.height;
    /** @type {?} */
    GridsterItemComponentInterface.prototype.drag;
    /** @type {?} */
    GridsterItemComponentInterface.prototype.resize;
    /** @type {?} */
    GridsterItemComponentInterface.prototype.notPlaced;
    /** @type {?} */
    GridsterItemComponentInterface.prototype.updateOptions;
    /** @type {?} */
    GridsterItemComponentInterface.prototype.itemChanged;
    /** @type {?} */
    GridsterItemComponentInterface.prototype.setSize;
    /** @type {?} */
    GridsterItemComponentInterface.prototype.checkItemChanges;
    /** @type {?} */
    GridsterItemComponentInterface.prototype.canBeDragged;
    /** @type {?} */
    GridsterItemComponentInterface.prototype.dragLimit;
    /** @type {?} */
    GridsterItemComponentInterface.prototype.canBeResized;
    /** @type {?} */
    GridsterItemComponentInterface.prototype.el;
    /** @type {?} */
    GridsterItemComponentInterface.prototype.gridster;
    /** @type {?} */
    GridsterItemComponentInterface.prototype.renderer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZHN0ZXJJdGVtQ29tcG9uZW50LmludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItZ3JpZHN0ZXIyLyIsInNvdXJjZXMiOlsibGliL2dyaWRzdGVySXRlbUNvbXBvbmVudC5pbnRlcmZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQU1BOzs7O0lBQUE7SUFvQkEsQ0FBQztJQUFELHFDQUFDO0FBQUQsQ0FBQyxBQXBCRCxJQW9CQzs7Ozs7OztJQW5CQyw4Q0FBbUI7O0lBQ25CLCtDQUFvQjs7SUFDcEIsNkNBQVk7O0lBQ1osOENBQWE7O0lBQ2IsK0NBQWM7O0lBQ2QsZ0RBQWU7O0lBQ2YsOENBQXdCOztJQUN4QixnREFBMEI7O0lBQzFCLG1EQUFtQjs7SUFDbkIsdURBQTBCOztJQUMxQixxREFBNkM7O0lBQzdDLGlEQUFvQjs7SUFDcEIsMERBQTJFOztJQUMzRSxzREFBNEI7O0lBQzVCLG1EQUFrQzs7SUFDbEMsc0RBQTRCOztJQUM1Qiw0Q0FBUTs7SUFDUixrREFBcUM7O0lBQ3JDLGtEQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7R3JpZHN0ZXJJdGVtfSBmcm9tICcuL2dyaWRzdGVySXRlbS5pbnRlcmZhY2UnO1xuaW1wb3J0IHtHcmlkc3RlckRyYWdnYWJsZX0gZnJvbSAnLi9ncmlkc3RlckRyYWdnYWJsZS5zZXJ2aWNlJztcbmltcG9ydCB7UmVuZGVyZXIyfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7R3JpZHN0ZXJSZXNpemFibGV9IGZyb20gJy4vZ3JpZHN0ZXJSZXNpemFibGUuc2VydmljZSc7XG5pbXBvcnQge0dyaWRzdGVyQ29tcG9uZW50SW50ZXJmYWNlfSBmcm9tICcuL2dyaWRzdGVyLmludGVyZmFjZSc7XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBHcmlkc3Rlckl0ZW1Db21wb25lbnRJbnRlcmZhY2Uge1xuICBpdGVtOiBHcmlkc3Rlckl0ZW07XG4gICRpdGVtOiBHcmlkc3Rlckl0ZW07XG4gIHRvcDogbnVtYmVyO1xuICBsZWZ0OiBudW1iZXI7XG4gIHdpZHRoOiBudW1iZXI7XG4gIGhlaWdodDogbnVtYmVyO1xuICBkcmFnOiBHcmlkc3RlckRyYWdnYWJsZTtcbiAgcmVzaXplOiBHcmlkc3RlclJlc2l6YWJsZTtcbiAgbm90UGxhY2VkOiBib29sZWFuO1xuICB1cGRhdGVPcHRpb25zOiAoKSA9PiB2b2lkO1xuICBpdGVtQ2hhbmdlZDogKG9sZEl0ZW06IEdyaWRzdGVySXRlbSkgPT4gdm9pZDtcbiAgc2V0U2l6ZTogKCkgPT4gdm9pZDtcbiAgY2hlY2tJdGVtQ2hhbmdlczogKG5ld1ZhbHVlOiBHcmlkc3Rlckl0ZW0sIG9sZFZhbHVlOiBHcmlkc3Rlckl0ZW0pID0+IHZvaWQ7XG4gIGNhbkJlRHJhZ2dlZDogKCkgPT4gYm9vbGVhbjtcbiAgZHJhZ0xpbWl0OiAoKSA9PiBib29sZWFuIHwgc3RyaW5nO1xuICBjYW5CZVJlc2l6ZWQ6ICgpID0+IGJvb2xlYW47XG4gIGVsOiBhbnk7XG4gIGdyaWRzdGVyOiBHcmlkc3RlckNvbXBvbmVudEludGVyZmFjZTtcbiAgcmVuZGVyZXI6IFJlbmRlcmVyMjtcbn1cbiJdfQ==
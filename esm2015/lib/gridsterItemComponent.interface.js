/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @abstract
 */
export class GridsterItemComponentInterface {
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZHN0ZXJJdGVtQ29tcG9uZW50LmludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItZ3JpZHN0ZXIyLyIsInNvdXJjZXMiOlsibGliL2dyaWRzdGVySXRlbUNvbXBvbmVudC5pbnRlcmZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQU1BLE1BQU0sT0FBZ0IsOEJBQThCO0NBb0JuRDs7O0lBbkJDLDhDQUFtQjs7SUFDbkIsK0NBQW9COztJQUNwQiw2Q0FBWTs7SUFDWiw4Q0FBYTs7SUFDYiwrQ0FBYzs7SUFDZCxnREFBZTs7SUFDZiw4Q0FBd0I7O0lBQ3hCLGdEQUEwQjs7SUFDMUIsbURBQW1COztJQUNuQix1REFBMEI7O0lBQzFCLHFEQUE2Qzs7SUFDN0MsaURBQW9COztJQUNwQiwwREFBMkU7O0lBQzNFLHNEQUE0Qjs7SUFDNUIsbURBQWtDOztJQUNsQyxzREFBNEI7O0lBQzVCLDRDQUFROztJQUNSLGtEQUFxQzs7SUFDckMsa0RBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtHcmlkc3Rlckl0ZW19IGZyb20gJy4vZ3JpZHN0ZXJJdGVtLmludGVyZmFjZSc7XG5pbXBvcnQge0dyaWRzdGVyRHJhZ2dhYmxlfSBmcm9tICcuL2dyaWRzdGVyRHJhZ2dhYmxlLnNlcnZpY2UnO1xuaW1wb3J0IHtSZW5kZXJlcjJ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtHcmlkc3RlclJlc2l6YWJsZX0gZnJvbSAnLi9ncmlkc3RlclJlc2l6YWJsZS5zZXJ2aWNlJztcbmltcG9ydCB7R3JpZHN0ZXJDb21wb25lbnRJbnRlcmZhY2V9IGZyb20gJy4vZ3JpZHN0ZXIuaW50ZXJmYWNlJztcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEdyaWRzdGVySXRlbUNvbXBvbmVudEludGVyZmFjZSB7XG4gIGl0ZW06IEdyaWRzdGVySXRlbTtcbiAgJGl0ZW06IEdyaWRzdGVySXRlbTtcbiAgdG9wOiBudW1iZXI7XG4gIGxlZnQ6IG51bWJlcjtcbiAgd2lkdGg6IG51bWJlcjtcbiAgaGVpZ2h0OiBudW1iZXI7XG4gIGRyYWc6IEdyaWRzdGVyRHJhZ2dhYmxlO1xuICByZXNpemU6IEdyaWRzdGVyUmVzaXphYmxlO1xuICBub3RQbGFjZWQ6IGJvb2xlYW47XG4gIHVwZGF0ZU9wdGlvbnM6ICgpID0+IHZvaWQ7XG4gIGl0ZW1DaGFuZ2VkOiAob2xkSXRlbTogR3JpZHN0ZXJJdGVtKSA9PiB2b2lkO1xuICBzZXRTaXplOiAoKSA9PiB2b2lkO1xuICBjaGVja0l0ZW1DaGFuZ2VzOiAobmV3VmFsdWU6IEdyaWRzdGVySXRlbSwgb2xkVmFsdWU6IEdyaWRzdGVySXRlbSkgPT4gdm9pZDtcbiAgY2FuQmVEcmFnZ2VkOiAoKSA9PiBib29sZWFuO1xuICBkcmFnTGltaXQ6ICgpID0+IGJvb2xlYW4gfCBzdHJpbmc7XG4gIGNhbkJlUmVzaXplZDogKCkgPT4gYm9vbGVhbjtcbiAgZWw6IGFueTtcbiAgZ3JpZHN0ZXI6IEdyaWRzdGVyQ29tcG9uZW50SW50ZXJmYWNlO1xuICByZW5kZXJlcjogUmVuZGVyZXIyO1xufVxuIl19
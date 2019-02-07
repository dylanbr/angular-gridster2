/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @abstract
 */
export class GridsterComponentInterface {
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZHN0ZXIuaW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1ncmlkc3RlcjIvIiwic291cmNlcyI6WyJsaWIvZ3JpZHN0ZXIuaW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFTQSxNQUFNLE9BQWdCLDBCQUEwQjtDQXFDL0M7OztJQXBDQyw4Q0FBMEI7O0lBQzFCLDBDQUE0Qzs7SUFDNUMsb0RBQWlGOztJQUNqRix1REFBeUM7O0lBQ3pDLHVEQUFtRzs7SUFDbkcsdURBQXlDOztJQUN6Qyx1REFBbUc7O0lBQ25HLHNEQUFtRjs7SUFDbkYsdURBQWlGOztJQUNqRix3REFBb0Q7O0lBQ3BELHdDQUFROztJQUNSLDhDQUFvQjs7SUFDcEIsa0RBQStCOztJQUMvQiwyQ0FBeUI7O0lBQ3pCLDZDQUF3Qjs7SUFDeEIsNkRBQW9DOztJQUNwQyxnREFBdUI7O0lBQ3ZCLGdEQUFnQzs7SUFDaEMsNkNBQXdEOztJQUN4RCxnREFBMkQ7O0lBQzNELGtEQUF1Qzs7SUFDdkMsNENBQWdCOztJQUNoQiw4Q0FBaUI7O0lBQ2pCLCtDQUFrQjs7SUFDbEIsNkNBQWdCOztJQUNoQiwwQ0FBYTs7SUFDYixpREFBb0I7O0lBQ3BCLGtEQUFxQjs7SUFDckIsa0RBQWtDOztJQUNsQyx1REFBZ0M7O0lBQ2hDLG9EQUF3Qjs7SUFDeEIsK0NBQTZCOztJQUM3Qiw2Q0FBeUI7O0lBQ3pCLDBDQUFhOztJQUNiLDhDQUF3Qjs7SUFDeEIsaURBQTJCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtHcmlkc3RlckNvbmZpZ1N9IGZyb20gJy4vZ3JpZHN0ZXJDb25maWdTLmludGVyZmFjZSc7XG5pbXBvcnQge0NoYW5nZURldGVjdG9yUmVmLCBOZ1pvbmUsIFJlbmRlcmVyMn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0dyaWRzdGVyRW1wdHlDZWxsfSBmcm9tICcuL2dyaWRzdGVyRW1wdHlDZWxsLnNlcnZpY2UnO1xuaW1wb3J0IHtHcmlkc3RlckNvbXBhY3R9IGZyb20gJy4vZ3JpZHN0ZXJDb21wYWN0LnNlcnZpY2UnO1xuaW1wb3J0IHtHcmlkc3RlckNvbmZpZ30gZnJvbSAnLi9ncmlkc3RlckNvbmZpZy5pbnRlcmZhY2UnO1xuaW1wb3J0IHtHcmlkc3Rlckl0ZW19IGZyb20gJy4vZ3JpZHN0ZXJJdGVtLmludGVyZmFjZSc7XG5pbXBvcnQge0dyaWRzdGVySXRlbUNvbXBvbmVudEludGVyZmFjZX0gZnJvbSAnLi9ncmlkc3Rlckl0ZW1Db21wb25lbnQuaW50ZXJmYWNlJztcbmltcG9ydCB7R3JpZHN0ZXJSZW5kZXJlcn0gZnJvbSAnLi9ncmlkc3RlclJlbmRlcmVyLnNlcnZpY2UnO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgR3JpZHN0ZXJDb21wb25lbnRJbnRlcmZhY2Uge1xuICAkb3B0aW9uczogR3JpZHN0ZXJDb25maWdTO1xuICBncmlkOiBBcnJheTxHcmlkc3Rlckl0ZW1Db21wb25lbnRJbnRlcmZhY2U+O1xuICBjaGVja0NvbGxpc2lvbjogKGl0ZW06IEdyaWRzdGVySXRlbSkgPT4gR3JpZHN0ZXJJdGVtQ29tcG9uZW50SW50ZXJmYWNlIHwgYm9vbGVhbjtcbiAgcG9zaXRpb25YVG9QaXhlbHM6ICh4OiBudW1iZXIpID0+IG51bWJlcjtcbiAgcGl4ZWxzVG9Qb3NpdGlvblg6ICh4OiBudW1iZXIsIHJvdW5kaW5nTWV0aG9kOiAoeDogbnVtYmVyKSA9PiBudW1iZXIsIG5vTGltaXQ/OiBib29sZWFuKSA9PiBudW1iZXI7XG4gIHBvc2l0aW9uWVRvUGl4ZWxzOiAoeTogbnVtYmVyKSA9PiBudW1iZXI7XG4gIHBpeGVsc1RvUG9zaXRpb25ZOiAoeTogbnVtYmVyLCByb3VuZGluZ01ldGhvZDogKHg6IG51bWJlcikgPT4gbnVtYmVyLCBub0xpbWl0PzogYm9vbGVhbikgPT4gbnVtYmVyO1xuICBmaW5kSXRlbVdpdGhJdGVtOiAoaXRlbTogR3JpZHN0ZXJJdGVtKSA9PiBHcmlkc3Rlckl0ZW1Db21wb25lbnRJbnRlcmZhY2UgfCBib29sZWFuO1xuICBmaW5kSXRlbXNXaXRoSXRlbTogKGl0ZW06IEdyaWRzdGVySXRlbSkgPT4gQXJyYXk8R3JpZHN0ZXJJdGVtQ29tcG9uZW50SW50ZXJmYWNlPjtcbiAgY2hlY2tHcmlkQ29sbGlzaW9uOiAoaXRlbTogR3JpZHN0ZXJJdGVtKSA9PiBib29sZWFuO1xuICBlbDogYW55O1xuICByZW5kZXJlcjogUmVuZGVyZXIyO1xuICBncmlkUmVuZGVyZXI6IEdyaWRzdGVyUmVuZGVyZXI7XG4gIGNkUmVmOiBDaGFuZ2VEZXRlY3RvclJlZjtcbiAgb3B0aW9uczogR3JpZHN0ZXJDb25maWc7XG4gIGNhbGN1bGF0ZUxheW91dERlYm91bmNlOiAoKSA9PiB2b2lkO1xuICB1cGRhdGVHcmlkOiAoKSA9PiB2b2lkO1xuICBtb3ZpbmdJdGVtOiBHcmlkc3Rlckl0ZW0gfCBudWxsO1xuICBhZGRJdGVtOiAoaXRlbTogR3JpZHN0ZXJJdGVtQ29tcG9uZW50SW50ZXJmYWNlKSA9PiB2b2lkO1xuICByZW1vdmVJdGVtOiAoaXRlbTogR3JpZHN0ZXJJdGVtQ29tcG9uZW50SW50ZXJmYWNlKSA9PiB2b2lkO1xuICBwcmV2aWV3U3R5bGU6IChkcmFnPzogYm9vbGVhbikgPT4gdm9pZDtcbiAgbW9iaWxlOiBib29sZWFuO1xuICBjdXJXaWR0aDogbnVtYmVyO1xuICBjdXJIZWlnaHQ6IG51bWJlcjtcbiAgY29sdW1uczogbnVtYmVyO1xuICByb3dzOiBudW1iZXI7XG4gIGN1ckNvbFdpZHRoOiBudW1iZXI7XG4gIGN1clJvd0hlaWdodDogbnVtYmVyO1xuICB3aW5kb3dSZXNpemU6ICgoKSA9PiB2b2lkKSB8IG51bGw7XG4gIHNldEdyaWREaW1lbnNpb25zOiAoKCkgPT4gdm9pZCk7XG4gIGRyYWdJblByb2dyZXNzOiBib29sZWFuO1xuICBlbXB0eUNlbGw6IEdyaWRzdGVyRW1wdHlDZWxsO1xuICBjb21wYWN0OiBHcmlkc3RlckNvbXBhY3Q7XG4gIHpvbmU6IE5nWm9uZTtcbiAgZ3JpZFJvd3M6IEFycmF5PG51bWJlcj47XG4gIGdyaWRDb2x1bW5zOiBBcnJheTxudW1iZXI+O1xufVxuIl19
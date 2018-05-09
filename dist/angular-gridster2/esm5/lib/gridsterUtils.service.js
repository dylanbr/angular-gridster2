/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
var GridsterUtils = /** @class */ (function () {
    function GridsterUtils() {
    }
    /**
     * @param {?} obj1
     * @param {?} obj2
     * @param {?} properties
     * @return {?}
     */
    GridsterUtils.merge = function (obj1, obj2, properties) {
        for (var /** @type {?} */ p in obj2) {
            if (obj2[p] !== void 0 && properties.hasOwnProperty(p)) {
                if (typeof obj2[p] === 'object') {
                    obj1[p] = GridsterUtils.merge(obj1[p], obj2[p], properties[p]);
                }
                else {
                    obj1[p] = obj2[p];
                }
            }
        }
        return obj1;
    };
    /**
     * @param {?} func
     * @param {?} wait
     * @return {?}
     */
    GridsterUtils.debounce = function (func, wait) {
        var /** @type {?} */ timeout;
        return function () {
            var /** @type {?} */ context = this, /** @type {?} */ args = arguments;
            var /** @type {?} */ later = function () {
                timeout = null;
                func.apply(context, args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    };
    /**
     * @param {?} e
     * @return {?}
     */
    GridsterUtils.checkTouchEvent = function (e) {
        if (e.clientX === undefined && e.touches) {
            if (e.touches && e.touches.length) {
                e.clientX = e.touches[0].clientX;
                e.clientY = e.touches[0].clientY;
            }
            else if (e.changedTouches && e.changedTouches.length) {
                e.clientX = e.changedTouches[0].clientX;
                e.clientY = e.changedTouches[0].clientY;
            }
        }
    };
    /**
     * @param {?} gridster
     * @param {?} e
     * @return {?}
     */
    GridsterUtils.checkContentClassForEvent = function (gridster, e) {
        if (gridster.$options.draggable.ignoreContent) {
            if (!GridsterUtils.checkContentClass(e.target, e.currentTarget, gridster.$options.draggable.dragHandleClass)) {
                return true;
            }
        }
        else {
            if (GridsterUtils.checkContentClass(e.target, e.currentTarget, gridster.$options.draggable.ignoreContentClass)) {
                return true;
            }
        }
        return false;
    };
    /**
     * @param {?} gridster
     * @param {?} e
     * @return {?}
     */
    GridsterUtils.checkContentClassForEmptyCellClickEvent = function (gridster, e) {
        return GridsterUtils.checkContentClass(e.target, e.currentTarget, gridster.$options.draggable.ignoreContentClass)
            || GridsterUtils.checkContentClass(e.target, e.currentTarget, gridster.$options.draggable.dragHandleClass);
    };
    /**
     * @param {?} target
     * @param {?} current
     * @param {?} contentClass
     * @return {?}
     */
    GridsterUtils.checkContentClass = function (target, current, contentClass) {
        if (!target || target === current) {
            return false;
        }
        if (target.hasAttribute('class') && target.getAttribute('class').split(' ').indexOf(contentClass) > -1) {
            return true;
        }
        else {
            return GridsterUtils.checkContentClass(target.parentNode, current, contentClass);
        }
    };
    /**
     * @param {?} a
     * @param {?} b
     * @return {?}
     */
    GridsterUtils.compareItems = function (a, b) {
        if (a.y > b.y) {
            return -1;
        }
        else if (a.y < b.y) {
            return 1;
        }
        else if (a.x > b.x) {
            return -1;
        }
        else {
            return 1;
        }
    };
    return GridsterUtils;
}());
export { GridsterUtils };
GridsterUtils.decorators = [
    { type: Injectable },
];
function GridsterUtils_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    GridsterUtils.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    GridsterUtils.ctorParameters;
}
//# sourceMappingURL=gridsterUtils.service.js.map

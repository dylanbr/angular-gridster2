/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
export class GridsterUtils {
    /**
     * @param {?} obj1
     * @param {?} obj2
     * @param {?} properties
     * @return {?}
     */
    static merge(obj1, obj2, properties) {
        for (const p in obj2) {
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
    }
    /**
     * @param {?} func
     * @param {?} wait
     * @return {?}
     */
    static debounce(func, wait) {
        /** @type {?} */
        let timeout;
        return function () {
            /** @type {?} */
            const context = this;
            /** @type {?} */
            const args = arguments;
            /** @type {?} */
            const later = function () {
                timeout = null;
                func.apply(context, args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    /**
     * @param {?} e
     * @return {?}
     */
    static checkTouchEvent(e) {
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
    }
    /**
     * @param {?} gridster
     * @param {?} e
     * @return {?}
     */
    static checkContentClassForEvent(gridster, e) {
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
    }
    /**
     * @param {?} gridster
     * @param {?} e
     * @return {?}
     */
    static checkContentClassForEmptyCellClickEvent(gridster, e) {
        return GridsterUtils.checkContentClass(e.target, e.currentTarget, gridster.$options.draggable.ignoreContentClass)
            || GridsterUtils.checkContentClass(e.target, e.currentTarget, gridster.$options.draggable.dragHandleClass);
    }
    /**
     * @param {?} target
     * @param {?} current
     * @param {?} contentClass
     * @return {?}
     */
    static checkContentClass(target, current, contentClass) {
        if (!target || target === current) {
            return false;
        }
        if (target.hasAttribute('class') && target.getAttribute('class').split(' ').indexOf(contentClass) > -1) {
            return true;
        }
        else {
            return GridsterUtils.checkContentClass(target.parentNode, current, contentClass);
        }
    }
    /**
     * @param {?} a
     * @param {?} b
     * @return {?}
     */
    static compareItems(a, b) {
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
    }
}
GridsterUtils.decorators = [
    { type: Injectable }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZHN0ZXJVdGlscy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1ncmlkc3RlcjIvIiwic291cmNlcyI6WyJsaWIvZ3JpZHN0ZXJVdGlscy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBS3pDLE1BQU0sT0FBTyxhQUFhOzs7Ozs7O0lBRXhCLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBUyxFQUFFLElBQVMsRUFBRSxVQUFlO1FBQ2hELEtBQUssTUFBTSxDQUFDLElBQUksSUFBSSxFQUFFO1lBQ3BCLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLEtBQUssQ0FBQyxJQUFJLFVBQVUsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQ3RELElBQUksT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssUUFBUSxFQUFFO29CQUMvQixJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsYUFBYSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUNoRTtxQkFBTTtvQkFDTCxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUNuQjthQUNGO1NBQ0Y7UUFFRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7Ozs7OztJQUVELE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBYyxFQUFFLElBQVk7O1lBQ3RDLE9BQVk7UUFDaEIsT0FBTzs7a0JBQ0MsT0FBTyxHQUFHLElBQUk7O2tCQUFFLElBQUksR0FBRyxTQUFTOztrQkFDaEMsS0FBSyxHQUFHO2dCQUNaLE9BQU8sR0FBRyxJQUFJLENBQUM7Z0JBQ2YsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENB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WUFBWSxDQUFDLENBQTJCLEVBQUUsQ0FBMkI7UUFDMUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDYixPQUFPLENBQUMsQ0FBQyxDQUFDO1NBQ1g7YUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUNwQixPQUFPLENBQUMsQ0FBQztTQUNWO2FBQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDcEIsT0FBTyxDQUFDLENBQUMsQ0FBQztTQUNYO2FBQU07WUFDTCxPQUFPLENBQUMsQ0FBQztTQUNWO0lBQ0gsQ0FBQzs7O1lBakZGLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge0dyaWRzdGVyQ29tcG9uZW50SW50ZXJmYWNlfSBmcm9tICcuL2dyaWRzdGVyLmludGVyZmFjZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBHcmlkc3RlclV0aWxzIHtcblxuICBzdGF0aWMgbWVyZ2Uob2JqMTogYW55LCBvYmoyOiBhbnksIHByb3BlcnRpZXM6IGFueSkge1xuICAgIGZvciAoY29uc3QgcCBpbiBvYmoyKSB7XG4gICAgICBpZiAob2JqMltwXSAhPT0gdm9pZCAwICYmIHByb3BlcnRpZXMuaGFzT3duUHJvcGVydHkocCkpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBvYmoyW3BdID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgIG9iajFbcF0gPSBHcmlkc3RlclV0aWxzLm1lcmdlKG9iajFbcF0sIG9iajJbcF0sIHByb3BlcnRpZXNbcF0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG9iajFbcF0gPSBvYmoyW3BdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG9iajE7XG4gIH1cblxuICBzdGF0aWMgZGVib3VuY2UoZnVuYzogRnVuY3Rpb24sIHdhaXQ6IG51bWJlcik6ICgpID0+IHZvaWQge1xuICAgIGxldCB0aW1lb3V0OiBhbnk7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIGNvbnN0IGNvbnRleHQgPSB0aGlzLCBhcmdzID0gYXJndW1lbnRzO1xuICAgICAgY29uc3QgbGF0ZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRpbWVvdXQgPSBudWxsO1xuICAgICAgICBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuICAgICAgfTtcbiAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGxhdGVyLCB3YWl0KTtcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGNoZWNrVG91Y2hFdmVudChlOiBhbnkpOiB2b2lkIHtcbiAgICBpZiAoZS5jbGllbnRYID09PSB1bmRlZmluZWQgJiYgZS50b3VjaGVzKSB7XG4gICAgICBpZiAoZS50b3VjaGVzICYmIGUudG91Y2hlcy5sZW5ndGgpIHtcbiAgICAgICAgZS5jbGllbnRYID0gZS50b3VjaGVzWzBdLmNsaWVudFg7XG4gICAgICAgIGUuY2xpZW50WSA9IGUudG91Y2hlc1swXS5jbGllbnRZO1xuICAgICAgfSBlbHNlIGlmIChlLmNoYW5nZWRUb3VjaGVzICYmIGUuY2hhbmdlZFRvdWNoZXMubGVuZ3RoKSB7XG4gICAgICAgIGUuY2xpZW50WCA9IGUuY2hhbmdlZFRvdWNoZXNbMF0uY2xpZW50WDtcbiAgICAgICAgZS5jbGllbnRZID0gZS5jaGFuZ2VkVG91Y2hlc1swXS5jbGllbnRZO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBjaGVja0NvbnRlbnRDbGFzc0ZvckV2ZW50KGdyaWRzdGVyOiBHcmlkc3RlckNvbXBvbmVudEludGVyZmFjZSwgZTogYW55KTogYm9vbGVhbiB7XG4gICAgaWYgKGdyaWRzdGVyLiRvcHRpb25zLmRyYWdnYWJsZS5pZ25vcmVDb250ZW50KSB7XG4gICAgICBpZiAoIUdyaWRzdGVyVXRpbHMuY2hlY2tDb250ZW50Q2xhc3MoZS50YXJnZXQsIGUuY3VycmVudFRhcmdldCwgZ3JpZHN0ZXIuJG9wdGlvbnMuZHJhZ2dhYmxlLmRyYWdIYW5kbGVDbGFzcykpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChHcmlkc3RlclV0aWxzLmNoZWNrQ29udGVudENsYXNzKGUudGFyZ2V0LCBlLmN1cnJlbnRUYXJnZXQsIGdyaWRzdGVyLiRvcHRpb25zLmRyYWdnYWJsZS5pZ25vcmVDb250ZW50Q2xhc3MpKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzdGF0aWMgY2hlY2tDb250ZW50Q2xhc3NGb3JFbXB0eUNlbGxDbGlja0V2ZW50KGdyaWRzdGVyOiBHcmlkc3RlckNvbXBvbmVudEludGVyZmFjZSwgZTogYW55KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIEdyaWRzdGVyVXRpbHMuY2hlY2tDb250ZW50Q2xhc3MoZS50YXJnZXQsIGUuY3VycmVudFRhcmdldCwgZ3JpZHN0ZXIuJG9wdGlvbnMuZHJhZ2dhYmxlLmlnbm9yZUNvbnRlbnRDbGFzcylcbiAgICAgIHx8IEdyaWRzdGVyVXRpbHMuY2hlY2tDb250ZW50Q2xhc3MoZS50YXJnZXQsIGUuY3VycmVudFRhcmdldCwgZ3JpZHN0ZXIuJG9wdGlvbnMuZHJhZ2dhYmxlLmRyYWdIYW5kbGVDbGFzcyk7XG4gIH1cblxuICBzdGF0aWMgY2hlY2tDb250ZW50Q2xhc3ModGFyZ2V0OiBhbnksIGN1cnJlbnQ6IGFueSwgY29udGVudENsYXNzOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICBpZiAoIXRhcmdldCB8fCB0YXJnZXQgPT09IGN1cnJlbnQpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKHRhcmdldC5oYXNBdHRyaWJ1dGUoJ2NsYXNzJykgJiYgdGFyZ2V0LmdldEF0dHJpYnV0ZSgnY2xhc3MnKS5zcGxpdCgnICcpLmluZGV4T2YoY29udGVudENsYXNzKSA+IC0xKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIEdyaWRzdGVyVXRpbHMuY2hlY2tDb250ZW50Q2xhc3ModGFyZ2V0LnBhcmVudE5vZGUsIGN1cnJlbnQsIGNvbnRlbnRDbGFzcyk7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGNvbXBhcmVJdGVtcyhhOiB7IHg6IG51bWJlciwgeTogbnVtYmVyIH0sIGI6IHsgeDogbnVtYmVyLCB5OiBudW1iZXIgfSk6IG51bWJlciB7XG4gICAgaWYgKGEueSA+IGIueSkge1xuICAgICAgcmV0dXJuIC0xO1xuICAgIH0gZWxzZSBpZiAoYS55IDwgYi55KSB7XG4gICAgICByZXR1cm4gMTtcbiAgICB9IGVsc2UgaWYgKGEueCA+IGIueCkge1xuICAgICAgcmV0dXJuIC0xO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gMTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==
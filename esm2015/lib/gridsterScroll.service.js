/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
let scrollSensitivity;
/** @type {?} */
let scrollSpeed;
/** @type {?} */
const intervalDuration = 50;
/** @type {?} */
let gridsterElement;
/** @type {?} */
let resizeEvent;
/** @type {?} */
let resizeEventType;
/** @type {?} */
let intervalE;
/** @type {?} */
let intervalW;
/** @type {?} */
let intervalN;
/** @type {?} */
let intervalS;
/**
 * @param {?} gridster
 * @param {?} left
 * @param {?} top
 * @param {?} width
 * @param {?} height
 * @param {?} e
 * @param {?} lastMouse
 * @param {?} calculateItemPosition
 * @param {?=} resize
 * @param {?=} resizeEventScrollType
 * @return {?}
 */
export function scroll(gridster, left, top, width, height, e, lastMouse, calculateItemPosition, resize, resizeEventScrollType) {
    scrollSensitivity = gridster.$options.scrollSensitivity;
    scrollSpeed = gridster.$options.scrollSpeed;
    gridsterElement = gridster.el;
    resizeEvent = resize;
    resizeEventType = resizeEventScrollType;
    /** @type {?} */
    const offsetWidth = gridsterElement.offsetWidth;
    /** @type {?} */
    const offsetHeight = gridsterElement.offsetHeight;
    /** @type {?} */
    const offsetLeft = gridsterElement.scrollLeft;
    /** @type {?} */
    const offsetTop = gridsterElement.scrollTop;
    /** @type {?} */
    const elemTopOffset = top - offsetTop;
    /** @type {?} */
    const elemBottomOffset = offsetHeight + offsetTop - top - height;
    if (lastMouse.clientY < e.clientY && elemBottomOffset < scrollSensitivity) {
        cancelN();
        if ((resizeEvent && resizeEventType && !resizeEventType.s) || intervalS) {
            return;
        }
        intervalS = startVertical(1, calculateItemPosition, lastMouse);
    }
    else if (lastMouse.clientY > e.clientY && offsetTop > 0 && elemTopOffset < scrollSensitivity) {
        cancelS();
        if ((resizeEvent && resizeEventType && !resizeEventType.n) || intervalN) {
            return;
        }
        intervalN = startVertical(-1, calculateItemPosition, lastMouse);
    }
    else if (lastMouse.clientY !== e.clientY) {
        cancelVertical();
    }
    /** @type {?} */
    const elemRightOffset = offsetLeft + offsetWidth - left - width;
    /** @type {?} */
    const elemLeftOffset = left - offsetLeft;
    if (lastMouse.clientX < e.clientX && elemRightOffset <= scrollSensitivity) {
        cancelW();
        if ((resizeEvent && resizeEventType && !resizeEventType.e) || intervalE) {
            return;
        }
        intervalE = startHorizontal(1, calculateItemPosition, lastMouse);
    }
    else if (lastMouse.clientX > e.clientX && offsetLeft > 0 && elemLeftOffset < scrollSensitivity) {
        cancelE();
        if ((resizeEvent && resizeEventType && !resizeEventType.w) || intervalW) {
            return;
        }
        intervalW = startHorizontal(-1, calculateItemPosition, lastMouse);
    }
    else if (lastMouse.clientX !== e.clientX) {
        cancelHorizontal();
    }
}
/**
 * @param {?} sign
 * @param {?} calculateItemPosition
 * @param {?} lastMouse
 * @return {?}
 */
function startVertical(sign, calculateItemPosition, lastMouse) {
    /** @type {?} */
    let clientY = lastMouse.clientY;
    return setInterval((/**
     * @return {?}
     */
    () => {
        if (!gridsterElement || sign === -1 && gridsterElement.scrollTop - scrollSpeed < 0) {
            cancelVertical();
        }
        gridsterElement.scrollTop += sign * scrollSpeed;
        clientY += sign * scrollSpeed;
        calculateItemPosition({ clientX: lastMouse.clientX, clientY: clientY });
    }), intervalDuration);
}
/**
 * @param {?} sign
 * @param {?} calculateItemPosition
 * @param {?} lastMouse
 * @return {?}
 */
function startHorizontal(sign, calculateItemPosition, lastMouse) {
    /** @type {?} */
    let clientX = lastMouse.clientX;
    return setInterval((/**
     * @return {?}
     */
    () => {
        if (!gridsterElement || sign === -1 && gridsterElement.scrollLeft - scrollSpeed < 0) {
            cancelHorizontal();
        }
        gridsterElement.scrollLeft += sign * scrollSpeed;
        clientX += sign * scrollSpeed;
        calculateItemPosition({ clientX: clientX, clientY: lastMouse.clientY });
    }), intervalDuration);
}
/**
 * @return {?}
 */
export function cancelScroll() {
    cancelHorizontal();
    cancelVertical();
    gridsterElement = undefined;
}
/**
 * @return {?}
 */
function cancelHorizontal() {
    cancelE();
    cancelW();
}
/**
 * @return {?}
 */
function cancelVertical() {
    cancelN();
    cancelS();
}
/**
 * @return {?}
 */
function cancelE() {
    if (intervalE) {
        clearInterval(intervalE);
        intervalE = 0;
    }
}
/**
 * @return {?}
 */
function cancelW() {
    if (intervalW) {
        clearInterval(intervalW);
        intervalW = 0;
    }
}
/**
 * @return {?}
 */
function cancelS() {
    if (intervalS) {
        clearInterval(intervalS);
        intervalS = 0;
    }
}
/**
 * @return {?}
 */
function cancelN() {
    if (intervalN) {
        clearInterval(intervalN);
        intervalN = 0;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZHN0ZXJTY3JvbGwuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItZ3JpZHN0ZXIyLyIsInNvdXJjZXMiOlsibGliL2dyaWRzdGVyU2Nyb2xsLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7SUFHSSxpQkFBeUI7O0lBQ3pCLFdBQW1COztNQUNqQixnQkFBZ0IsR0FBRyxFQUFFOztJQUN2QixlQUFvQjs7SUFDcEIsV0FBZ0M7O0lBQ2hDLGVBQW9EOztJQUNwRCxTQUFpQjs7SUFDakIsU0FBaUI7O0lBQ2pCLFNBQWlCOztJQUNqQixTQUFpQjs7Ozs7Ozs7Ozs7Ozs7QUFFckIsTUFBTSxVQUFVLE1BQU0sQ0FBQyxRQUFvQyxFQUFFLElBQVksRUFBRSxHQUFXLEVBQUUsS0FBYSxFQUFFLE1BQWMsRUFDOUYsQ0FBYSxFQUFFLFNBQWMsRUFDN0IscUJBQStCLEVBQUUsTUFBZ0IsRUFBRSxxQkFBK0M7SUFDdkgsaUJBQWlCLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQztJQUN4RCxXQUFXLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUM7SUFDNUMsZUFBZSxHQUFHLFFBQVEsQ0FBQyxFQUFFLENBQUM7SUFDOUIsV0FBVyxHQUFHLE1BQU0sQ0FBQztJQUNyQixlQUFlLEdBQUcscUJBQXFCLENBQUM7O1VBRWxDLFdBQVcsR0FBRyxlQUFlLENBQUMsV0FBVzs7VUFDekMsWUFBWSxHQUFHLGVBQWUsQ0FBQyxZQUFZOztVQUMzQyxVQUFVLEdBQUcsZUFBZSxDQUFDLFVBQVU7O1VBQ3ZDLFNBQVMsR0FBRyxlQUFlLENBQUMsU0FBUzs7VUFDckMsYUFBYSxHQUFHLEdBQUcsR0FBRyxTQUFTOztVQUMvQixnQkFBZ0IsR0FBRyxZQUFZLEdBQUcsU0FBUyxHQUFHLEdBQUcsR0FBRyxNQUFNO0lBQ2hFLElBQUksU0FBUyxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsT0FBTyxJQUFJLGdCQUFnQixHQUFHLGlCQUFpQixFQUFFO1FBQ3pFLE9BQU8sRUFBRSxDQUFDO1FBQ1YsSUFBSSxDQUFDLFdBQVcsSUFBSSxlQUFlLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLElBQUksU0FBUyxFQUFFO1lBQ3ZFLE9BQU87U0FDUjtRQUNELFNBQVMsR0FBRyxhQUFhLENBQUMsQ0FBQyxFQUFFLHFCQUFxQixFQUFFLFNBQVMsQ0FBQyxDQUFDO0tBQ2hFO1NBQU0sSUFBSSxTQUFTLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxPQUFPLElBQUksU0FBUyxHQUFHLENBQUMsSUFBSSxhQUFhLEdBQUcsaUJBQWlCLEVBQUU7UUFDOUYsT0FBTyxFQUFFLENBQUM7UUFDVixJQUFJLENBQUMsV0FBVyxJQUFJLGVBQWUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsSUFBSSxTQUFTLEVBQUU7WUFDdkUsT0FBTztTQUNSO1FBQ0QsU0FBUyxHQUFHLGFBQWEsQ0FBQyxDQUFDLENBQUMsRUFBRSxxQkFBcUIsRUFBRSxTQUFTLENBQUMsQ0FBQztLQUNqRTtTQUFNLElBQUksU0FBUyxDQUFDLE9BQU8sS0FBSyxDQUFDLENBQUMsT0FBTyxFQUFFO1FBQzFDLGNBQWMsRUFBRSxDQUFDO0tBQ2xCOztVQUVLLGVBQWUsR0FBRyxVQUFVLEdBQUcsV0FBVyxHQUFHLElBQUksR0FBRyxLQUFLOztVQUN6RCxjQUFjLEdBQUcsSUFBSSxHQUFHLFVBQVU7SUFDeEMsSUFBSSxTQUFTLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxPQUFPLElBQUksZUFBZSxJQUFJLGlCQUFpQixFQUFFO1FBQ3pFLE9BQU8sRUFBRSxDQUFDO1FBQ1YsSUFBSSxDQUFDLFdBQVcsSUFBSSxlQUFlLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLElBQUksU0FBUyxFQUFFO1lBQ3ZFLE9BQU87U0FDUjtRQUNELFNBQVMsR0FBRyxlQUFlLENBQUMsQ0FBQyxFQUFFLHFCQUFxQixFQUFFLFNBQVMsQ0FBQyxDQUFDO0tBQ2xFO1NBQU0sSUFBSSxTQUFTLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxPQUFPLElBQUksVUFBVSxHQUFHLENBQUMsSUFBSSxjQUFjLEdBQUcsaUJBQWlCLEVBQUU7UUFDaEcsT0FBTyxFQUFFLENBQUM7UUFDVixJQUFJLENBQUMsV0FBVyxJQUFJLGVBQWUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsSUFBSSxTQUFTLEVBQUU7WUFDdkUsT0FBTztTQUNSO1FBQ0QsU0FBUyxHQUFHLGVBQWUsQ0FBQyxDQUFDLENBQUMsRUFBRSxxQkFBcUIsRUFBRSxTQUFTLENBQUMsQ0FBQztLQUNuRTtTQUFNLElBQUksU0FBUyxDQUFDLE9BQU8sS0FBSyxDQUFDLENBQUMsT0FBTyxFQUFFO1FBQzFDLGdCQUFnQixFQUFFLENBQUM7S0FDcEI7QUFDSCxDQUFDOzs7Ozs7O0FBRUQsU0FBUyxhQUFhLENBQUMsSUFBWSxFQUFFLHFCQUErQixFQUFFLFNBQWM7O1FBQzlFLE9BQU8sR0FBRyxTQUFTLENBQUMsT0FBTztJQUMvQixPQUFPLFdBQVc7OztJQUFDLEdBQUcsRUFBRTtRQUN0QixJQUFJLENBQUMsZUFBZSxJQUFJLElBQUksS0FBSyxDQUFDLENBQUMsSUFBSSxlQUFlLENBQUMsU0FBUyxHQUFHLFdBQVcsR0FBRyxDQUFDLEVBQUU7WUFDbEYsY0FBYyxFQUFFLENBQUM7U0FDbEI7UUFDRCxlQUFlLENBQUMsU0FBUyxJQUFJLElBQUksR0FBRyxXQUFXLENBQUM7UUFDaEQsT0FBTyxJQUFJLElBQUksR0FBRyxXQUFXLENBQUM7UUFDOUIscUJBQXFCLENBQUMsRUFBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFDLENBQUMsQ0FBQztJQUN4RSxDQUFDLEdBQUUsZ0JBQWdCLENBQUMsQ0FBQztBQUN2QixDQUFDOzs7Ozs7O0FBRUQsU0FBUyxlQUFlLENBQUMsSUFBWSxFQUFFLHFCQUErQixFQUFFLFNBQWM7O1FBQ2hGLE9BQU8sR0FBRyxTQUFTLENBQUMsT0FBTztJQUMvQixPQUFPLFdBQVc7OztJQUFDLEdBQUcsRUFBRTtRQUN0QixJQUFJLENBQUMsZUFBZSxJQUFJLElBQUksS0FBSyxDQUFDLENBQUMsSUFBSSxlQUFlLENBQUMsVUFBVSxHQUFHLFdBQVcsR0FBRyxDQUFDLEVBQUU7WUFDbkYsZ0JBQWdCLEVBQUUsQ0FBQztTQUNwQjtRQUNELGVBQWUsQ0FBQyxVQUFVLElBQUksSUFBSSxHQUFHLFdBQVcsQ0FBQztRQUNqRCxPQUFPLElBQUksSUFBSSxHQUFHLFdBQVcsQ0FBQztRQUM5QixxQkFBcUIsQ0FBQyxFQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLFNBQVMsQ0FBQyxPQUFPLEVBQUMsQ0FBQyxDQUFDO0lBQ3hFLENBQUMsR0FBRSxnQkFBZ0IsQ0FBQyxDQUFDO0FBQ3ZCLENBQUM7Ozs7QUFFRCxNQUFNLFVBQVUsWUFBWTtJQUMxQixnQkFBZ0IsRUFBRSxDQUFDO0lBQ25CLGNBQWMsRUFBRSxDQUFDO0lBQ2pCLGVBQWUsR0FBRyxTQUFTLENBQUM7QUFDOUIsQ0FBQzs7OztBQUVELFNBQVMsZ0JBQWdCO0lBQ3ZCLE9BQU8sRUFBRSxDQUFDO0lBQ1YsT0FBTyxFQUFFLENBQUM7QUFDWixDQUFDOzs7O0FBRUQsU0FBUyxjQUFjO0lBQ3JCLE9BQU8sRUFBRSxDQUFDO0lBQ1YsT0FBTyxFQUFFLENBQUM7QUFDWixDQUFDOzs7O0FBRUQsU0FBUyxPQUFPO0lBQ2QsSUFBSSxTQUFTLEVBQUU7UUFDYixhQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDekIsU0FBUyxHQUFHLENBQUMsQ0FBQztLQUNmO0FBQ0gsQ0FBQzs7OztBQUVELFNBQVMsT0FBTztJQUNkLElBQUksU0FBUyxFQUFFO1FBQ2IsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3pCLFNBQVMsR0FBRyxDQUFDLENBQUM7S0FDZjtBQUNILENBQUM7Ozs7QUFFRCxTQUFTLE9BQU87SUFDZCxJQUFJLFNBQVMsRUFBRTtRQUNiLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN6QixTQUFTLEdBQUcsQ0FBQyxDQUFDO0tBQ2Y7QUFDSCxDQUFDOzs7O0FBRUQsU0FBUyxPQUFPO0lBQ2QsSUFBSSxTQUFTLEVBQUU7UUFDYixhQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDekIsU0FBUyxHQUFHLENBQUMsQ0FBQztLQUNmO0FBQ0gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7R3JpZHN0ZXJSZXNpemVFdmVudFR5cGV9IGZyb20gJy4vZ3JpZHN0ZXJSZXNpemVFdmVudFR5cGUuaW50ZXJmYWNlJztcbmltcG9ydCB7R3JpZHN0ZXJDb21wb25lbnRJbnRlcmZhY2V9IGZyb20gJy4vZ3JpZHN0ZXIuaW50ZXJmYWNlJztcblxubGV0IHNjcm9sbFNlbnNpdGl2aXR5OiBudW1iZXI7XG5sZXQgc2Nyb2xsU3BlZWQ6IG51bWJlcjtcbmNvbnN0IGludGVydmFsRHVyYXRpb24gPSA1MDtcbmxldCBncmlkc3RlckVsZW1lbnQ6IGFueTtcbmxldCByZXNpemVFdmVudDogYm9vbGVhbiB8IHVuZGVmaW5lZDtcbmxldCByZXNpemVFdmVudFR5cGU6IEdyaWRzdGVyUmVzaXplRXZlbnRUeXBlIHwgdW5kZWZpbmVkO1xubGV0IGludGVydmFsRTogbnVtYmVyO1xubGV0IGludGVydmFsVzogbnVtYmVyO1xubGV0IGludGVydmFsTjogbnVtYmVyO1xubGV0IGludGVydmFsUzogbnVtYmVyO1xuXG5leHBvcnQgZnVuY3Rpb24gc2Nyb2xsKGdyaWRzdGVyOiBHcmlkc3RlckNvbXBvbmVudEludGVyZmFjZSwgbGVmdDogbnVtYmVyLCB0b3A6IG51bWJlciwgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgIGU6IE1vdXNlRXZlbnQsIGxhc3RNb3VzZTogYW55LFxuICAgICAgICAgICAgICAgICAgICAgICBjYWxjdWxhdGVJdGVtUG9zaXRpb246IEZ1bmN0aW9uLCByZXNpemU/OiBib29sZWFuLCByZXNpemVFdmVudFNjcm9sbFR5cGU/OiBHcmlkc3RlclJlc2l6ZUV2ZW50VHlwZSkge1xuICBzY3JvbGxTZW5zaXRpdml0eSA9IGdyaWRzdGVyLiRvcHRpb25zLnNjcm9sbFNlbnNpdGl2aXR5O1xuICBzY3JvbGxTcGVlZCA9IGdyaWRzdGVyLiRvcHRpb25zLnNjcm9sbFNwZWVkO1xuICBncmlkc3RlckVsZW1lbnQgPSBncmlkc3Rlci5lbDtcbiAgcmVzaXplRXZlbnQgPSByZXNpemU7XG4gIHJlc2l6ZUV2ZW50VHlwZSA9IHJlc2l6ZUV2ZW50U2Nyb2xsVHlwZTtcblxuICBjb25zdCBvZmZzZXRXaWR0aCA9IGdyaWRzdGVyRWxlbWVudC5vZmZzZXRXaWR0aDtcbiAgY29uc3Qgb2Zmc2V0SGVpZ2h0ID0gZ3JpZHN0ZXJFbGVtZW50Lm9mZnNldEhlaWdodDtcbiAgY29uc3Qgb2Zmc2V0TGVmdCA9IGdyaWRzdGVyRWxlbWVudC5zY3JvbGxMZWZ0O1xuICBjb25zdCBvZmZzZXRUb3AgPSBncmlkc3RlckVsZW1lbnQuc2Nyb2xsVG9wO1xuICBjb25zdCBlbGVtVG9wT2Zmc2V0ID0gdG9wIC0gb2Zmc2V0VG9wO1xuICBjb25zdCBlbGVtQm90dG9tT2Zmc2V0ID0gb2Zmc2V0SGVpZ2h0ICsgb2Zmc2V0VG9wIC0gdG9wIC0gaGVpZ2h0O1xuICBpZiAobGFzdE1vdXNlLmNsaWVudFkgPCBlLmNsaWVudFkgJiYgZWxlbUJvdHRvbU9mZnNldCA8IHNjcm9sbFNlbnNpdGl2aXR5KSB7XG4gICAgY2FuY2VsTigpO1xuICAgIGlmICgocmVzaXplRXZlbnQgJiYgcmVzaXplRXZlbnRUeXBlICYmICFyZXNpemVFdmVudFR5cGUucykgfHwgaW50ZXJ2YWxTKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGludGVydmFsUyA9IHN0YXJ0VmVydGljYWwoMSwgY2FsY3VsYXRlSXRlbVBvc2l0aW9uLCBsYXN0TW91c2UpO1xuICB9IGVsc2UgaWYgKGxhc3RNb3VzZS5jbGllbnRZID4gZS5jbGllbnRZICYmIG9mZnNldFRvcCA+IDAgJiYgZWxlbVRvcE9mZnNldCA8IHNjcm9sbFNlbnNpdGl2aXR5KSB7XG4gICAgY2FuY2VsUygpO1xuICAgIGlmICgocmVzaXplRXZlbnQgJiYgcmVzaXplRXZlbnRUeXBlICYmICFyZXNpemVFdmVudFR5cGUubikgfHwgaW50ZXJ2YWxOKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGludGVydmFsTiA9IHN0YXJ0VmVydGljYWwoLTEsIGNhbGN1bGF0ZUl0ZW1Qb3NpdGlvbiwgbGFzdE1vdXNlKTtcbiAgfSBlbHNlIGlmIChsYXN0TW91c2UuY2xpZW50WSAhPT0gZS5jbGllbnRZKSB7XG4gICAgY2FuY2VsVmVydGljYWwoKTtcbiAgfVxuXG4gIGNvbnN0IGVsZW1SaWdodE9mZnNldCA9IG9mZnNldExlZnQgKyBvZmZzZXRXaWR0aCAtIGxlZnQgLSB3aWR0aDtcbiAgY29uc3QgZWxlbUxlZnRPZmZzZXQgPSBsZWZ0IC0gb2Zmc2V0TGVmdDtcbiAgaWYgKGxhc3RNb3VzZS5jbGllbnRYIDwgZS5jbGllbnRYICYmIGVsZW1SaWdodE9mZnNldCA8PSBzY3JvbGxTZW5zaXRpdml0eSkge1xuICAgIGNhbmNlbFcoKTtcbiAgICBpZiAoKHJlc2l6ZUV2ZW50ICYmIHJlc2l6ZUV2ZW50VHlwZSAmJiAhcmVzaXplRXZlbnRUeXBlLmUpIHx8IGludGVydmFsRSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpbnRlcnZhbEUgPSBzdGFydEhvcml6b250YWwoMSwgY2FsY3VsYXRlSXRlbVBvc2l0aW9uLCBsYXN0TW91c2UpO1xuICB9IGVsc2UgaWYgKGxhc3RNb3VzZS5jbGllbnRYID4gZS5jbGllbnRYICYmIG9mZnNldExlZnQgPiAwICYmIGVsZW1MZWZ0T2Zmc2V0IDwgc2Nyb2xsU2Vuc2l0aXZpdHkpIHtcbiAgICBjYW5jZWxFKCk7XG4gICAgaWYgKChyZXNpemVFdmVudCAmJiByZXNpemVFdmVudFR5cGUgJiYgIXJlc2l6ZUV2ZW50VHlwZS53KSB8fCBpbnRlcnZhbFcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaW50ZXJ2YWxXID0gc3RhcnRIb3Jpem9udGFsKC0xLCBjYWxjdWxhdGVJdGVtUG9zaXRpb24sIGxhc3RNb3VzZSk7XG4gIH0gZWxzZSBpZiAobGFzdE1vdXNlLmNsaWVudFggIT09IGUuY2xpZW50WCkge1xuICAgIGNhbmNlbEhvcml6b250YWwoKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBzdGFydFZlcnRpY2FsKHNpZ246IG51bWJlciwgY2FsY3VsYXRlSXRlbVBvc2l0aW9uOiBGdW5jdGlvbiwgbGFzdE1vdXNlOiBhbnkpOiBhbnkge1xuICBsZXQgY2xpZW50WSA9IGxhc3RNb3VzZS5jbGllbnRZO1xuICByZXR1cm4gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgIGlmICghZ3JpZHN0ZXJFbGVtZW50IHx8IHNpZ24gPT09IC0xICYmIGdyaWRzdGVyRWxlbWVudC5zY3JvbGxUb3AgLSBzY3JvbGxTcGVlZCA8IDApIHtcbiAgICAgIGNhbmNlbFZlcnRpY2FsKCk7XG4gICAgfVxuICAgIGdyaWRzdGVyRWxlbWVudC5zY3JvbGxUb3AgKz0gc2lnbiAqIHNjcm9sbFNwZWVkO1xuICAgIGNsaWVudFkgKz0gc2lnbiAqIHNjcm9sbFNwZWVkO1xuICAgIGNhbGN1bGF0ZUl0ZW1Qb3NpdGlvbih7Y2xpZW50WDogbGFzdE1vdXNlLmNsaWVudFgsIGNsaWVudFk6IGNsaWVudFl9KTtcbiAgfSwgaW50ZXJ2YWxEdXJhdGlvbik7XG59XG5cbmZ1bmN0aW9uIHN0YXJ0SG9yaXpvbnRhbChzaWduOiBudW1iZXIsIGNhbGN1bGF0ZUl0ZW1Qb3NpdGlvbjogRnVuY3Rpb24sIGxhc3RNb3VzZTogYW55KTogYW55IHtcbiAgbGV0IGNsaWVudFggPSBsYXN0TW91c2UuY2xpZW50WDtcbiAgcmV0dXJuIHNldEludGVydmFsKCgpID0+IHtcbiAgICBpZiAoIWdyaWRzdGVyRWxlbWVudCB8fCBzaWduID09PSAtMSAmJiBncmlkc3RlckVsZW1lbnQuc2Nyb2xsTGVmdCAtIHNjcm9sbFNwZWVkIDwgMCkge1xuICAgICAgY2FuY2VsSG9yaXpvbnRhbCgpO1xuICAgIH1cbiAgICBncmlkc3RlckVsZW1lbnQuc2Nyb2xsTGVmdCArPSBzaWduICogc2Nyb2xsU3BlZWQ7XG4gICAgY2xpZW50WCArPSBzaWduICogc2Nyb2xsU3BlZWQ7XG4gICAgY2FsY3VsYXRlSXRlbVBvc2l0aW9uKHtjbGllbnRYOiBjbGllbnRYLCBjbGllbnRZOiBsYXN0TW91c2UuY2xpZW50WX0pO1xuICB9LCBpbnRlcnZhbER1cmF0aW9uKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNhbmNlbFNjcm9sbCgpIHtcbiAgY2FuY2VsSG9yaXpvbnRhbCgpO1xuICBjYW5jZWxWZXJ0aWNhbCgpO1xuICBncmlkc3RlckVsZW1lbnQgPSB1bmRlZmluZWQ7XG59XG5cbmZ1bmN0aW9uIGNhbmNlbEhvcml6b250YWwoKSB7XG4gIGNhbmNlbEUoKTtcbiAgY2FuY2VsVygpO1xufVxuXG5mdW5jdGlvbiBjYW5jZWxWZXJ0aWNhbCgpIHtcbiAgY2FuY2VsTigpO1xuICBjYW5jZWxTKCk7XG59XG5cbmZ1bmN0aW9uIGNhbmNlbEUoKSB7XG4gIGlmIChpbnRlcnZhbEUpIHtcbiAgICBjbGVhckludGVydmFsKGludGVydmFsRSk7XG4gICAgaW50ZXJ2YWxFID0gMDtcbiAgfVxufVxuXG5mdW5jdGlvbiBjYW5jZWxXKCkge1xuICBpZiAoaW50ZXJ2YWxXKSB7XG4gICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbFcpO1xuICAgIGludGVydmFsVyA9IDA7XG4gIH1cbn1cblxuZnVuY3Rpb24gY2FuY2VsUygpIHtcbiAgaWYgKGludGVydmFsUykge1xuICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWxTKTtcbiAgICBpbnRlcnZhbFMgPSAwO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNhbmNlbE4oKSB7XG4gIGlmIChpbnRlcnZhbE4pIHtcbiAgICBjbGVhckludGVydmFsKGludGVydmFsTik7XG4gICAgaW50ZXJ2YWxOID0gMDtcbiAgfVxufVxuIl19
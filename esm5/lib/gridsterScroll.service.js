/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var scrollSensitivity;
/** @type {?} */
var scrollSpeed;
/** @type {?} */
var intervalDuration = 50;
/** @type {?} */
var gridsterElement;
/** @type {?} */
var resizeEvent;
/** @type {?} */
var resizeEventType;
/** @type {?} */
var intervalE;
/** @type {?} */
var intervalW;
/** @type {?} */
var intervalN;
/** @type {?} */
var intervalS;
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
    var offsetWidth = gridsterElement.offsetWidth;
    /** @type {?} */
    var offsetHeight = gridsterElement.offsetHeight;
    /** @type {?} */
    var offsetLeft = gridsterElement.scrollLeft;
    /** @type {?} */
    var offsetTop = gridsterElement.scrollTop;
    /** @type {?} */
    var elemTopOffset = top - offsetTop;
    /** @type {?} */
    var elemBottomOffset = offsetHeight + offsetTop - top - height;
    if (!gridster.$options.disableScrollVertical) {
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
    }
    /** @type {?} */
    var elemRightOffset = offsetLeft + offsetWidth - left - width;
    /** @type {?} */
    var elemLeftOffset = left - offsetLeft;
    if (!gridster.$options.disableScrollHorizontal) {
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
}
/**
 * @param {?} sign
 * @param {?} calculateItemPosition
 * @param {?} lastMouse
 * @return {?}
 */
function startVertical(sign, calculateItemPosition, lastMouse) {
    /** @type {?} */
    var clientY = lastMouse.clientY;
    return setInterval((/**
     * @return {?}
     */
    function () {
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
    var clientX = lastMouse.clientX;
    return setInterval((/**
     * @return {?}
     */
    function () {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZHN0ZXJTY3JvbGwuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItZ3JpZHN0ZXIyLyIsInNvdXJjZXMiOlsibGliL2dyaWRzdGVyU2Nyb2xsLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7SUFHSSxpQkFBeUI7O0lBQ3pCLFdBQW1COztJQUNqQixnQkFBZ0IsR0FBRyxFQUFFOztJQUN2QixlQUFvQjs7SUFDcEIsV0FBZ0M7O0lBQ2hDLGVBQW9EOztJQUNwRCxTQUFpQjs7SUFDakIsU0FBaUI7O0lBQ2pCLFNBQWlCOztJQUNqQixTQUFpQjs7Ozs7Ozs7Ozs7Ozs7QUFFckIsTUFBTSxVQUFVLE1BQU0sQ0FBQyxRQUFvQyxFQUFFLElBQVksRUFBRSxHQUFXLEVBQUUsS0FBYSxFQUFFLE1BQWMsRUFDOUYsQ0FBYSxFQUFFLFNBQWMsRUFDN0IscUJBQStCLEVBQUUsTUFBZ0IsRUFBRSxxQkFBK0M7SUFDdkgsaUJBQWlCLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQztJQUN4RCxXQUFXLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUM7SUFDNUMsZUFBZSxHQUFHLFFBQVEsQ0FBQyxFQUFFLENBQUM7SUFDOUIsV0FBVyxHQUFHLE1BQU0sQ0FBQztJQUNyQixlQUFlLEdBQUcscUJBQXFCLENBQUM7O1FBRWxDLFdBQVcsR0FBRyxlQUFlLENBQUMsV0FBVzs7UUFDekMsWUFBWSxHQUFHLGVBQWUsQ0FBQyxZQUFZOztRQUMzQyxVQUFVLEdBQUcsZUFBZSxDQUFDLFVBQVU7O1FBQ3ZDLFNBQVMsR0FBRyxlQUFlLENBQUMsU0FBUzs7UUFDckMsYUFBYSxHQUFHLEdBQUcsR0FBRyxTQUFTOztRQUMvQixnQkFBZ0IsR0FBRyxZQUFZLEdBQUcsU0FBUyxHQUFHLEdBQUcsR0FBRyxNQUFNO0lBRWhFLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLHFCQUFxQixFQUFFO1FBQzVDLElBQUks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RCxTQUFTLE9BQU87SUFDZCxJQUFJLFNBQVMsRUFBRTtRQUNiLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN6QixTQUFTLEdBQUcsQ0FBQyxDQUFDO0tBQ2Y7QUFDSCxDQUFDOzs7O0FBRUQsU0FBUyxPQUFPO0lBQ2QsSUFBSSxTQUFTLEVBQUU7UUFDYixhQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDekIsU0FBUyxHQUFHLENBQUMsQ0FBQztLQUNmO0FBQ0gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7R3JpZHN0ZXJSZXNpemVFdmVudFR5cGV9IGZyb20gJy4vZ3JpZHN0ZXJSZXNpemVFdmVudFR5cGUuaW50ZXJmYWNlJztcbmltcG9ydCB7R3JpZHN0ZXJDb21wb25lbnRJbnRlcmZhY2V9IGZyb20gJy4vZ3JpZHN0ZXIuaW50ZXJmYWNlJztcblxubGV0IHNjcm9sbFNlbnNpdGl2aXR5OiBudW1iZXI7XG5sZXQgc2Nyb2xsU3BlZWQ6IG51bWJlcjtcbmNvbnN0IGludGVydmFsRHVyYXRpb24gPSA1MDtcbmxldCBncmlkc3RlckVsZW1lbnQ6IGFueTtcbmxldCByZXNpemVFdmVudDogYm9vbGVhbiB8IHVuZGVmaW5lZDtcbmxldCByZXNpemVFdmVudFR5cGU6IEdyaWRzdGVyUmVzaXplRXZlbnRUeXBlIHwgdW5kZWZpbmVkO1xubGV0IGludGVydmFsRTogbnVtYmVyO1xubGV0IGludGVydmFsVzogbnVtYmVyO1xubGV0IGludGVydmFsTjogbnVtYmVyO1xubGV0IGludGVydmFsUzogbnVtYmVyO1xuXG5leHBvcnQgZnVuY3Rpb24gc2Nyb2xsKGdyaWRzdGVyOiBHcmlkc3RlckNvbXBvbmVudEludGVyZmFjZSwgbGVmdDogbnVtYmVyLCB0b3A6IG51bWJlciwgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgIGU6IE1vdXNlRXZlbnQsIGxhc3RNb3VzZTogYW55LFxuICAgICAgICAgICAgICAgICAgICAgICBjYWxjdWxhdGVJdGVtUG9zaXRpb246IEZ1bmN0aW9uLCByZXNpemU/OiBib29sZWFuLCByZXNpemVFdmVudFNjcm9sbFR5cGU/OiBHcmlkc3RlclJlc2l6ZUV2ZW50VHlwZSkge1xuICBzY3JvbGxTZW5zaXRpdml0eSA9IGdyaWRzdGVyLiRvcHRpb25zLnNjcm9sbFNlbnNpdGl2aXR5O1xuICBzY3JvbGxTcGVlZCA9IGdyaWRzdGVyLiRvcHRpb25zLnNjcm9sbFNwZWVkO1xuICBncmlkc3RlckVsZW1lbnQgPSBncmlkc3Rlci5lbDtcbiAgcmVzaXplRXZlbnQgPSByZXNpemU7XG4gIHJlc2l6ZUV2ZW50VHlwZSA9IHJlc2l6ZUV2ZW50U2Nyb2xsVHlwZTtcblxuICBjb25zdCBvZmZzZXRXaWR0aCA9IGdyaWRzdGVyRWxlbWVudC5vZmZzZXRXaWR0aDtcbiAgY29uc3Qgb2Zmc2V0SGVpZ2h0ID0gZ3JpZHN0ZXJFbGVtZW50Lm9mZnNldEhlaWdodDtcbiAgY29uc3Qgb2Zmc2V0TGVmdCA9IGdyaWRzdGVyRWxlbWVudC5zY3JvbGxMZWZ0O1xuICBjb25zdCBvZmZzZXRUb3AgPSBncmlkc3RlckVsZW1lbnQuc2Nyb2xsVG9wO1xuICBjb25zdCBlbGVtVG9wT2Zmc2V0ID0gdG9wIC0gb2Zmc2V0VG9wO1xuICBjb25zdCBlbGVtQm90dG9tT2Zmc2V0ID0gb2Zmc2V0SGVpZ2h0ICsgb2Zmc2V0VG9wIC0gdG9wIC0gaGVpZ2h0O1xuXG4gIGlmICghZ3JpZHN0ZXIuJG9wdGlvbnMuZGlzYWJsZVNjcm9sbFZlcnRpY2FsKSB7XG4gICAgaWYgKGxhc3RNb3VzZS5jbGllbnRZIDwgZS5jbGllbnRZICYmIGVsZW1Cb3R0b21PZmZzZXQgPCBzY3JvbGxTZW5zaXRpdml0eSkge1xuICAgICAgY2FuY2VsTigpO1xuICAgICAgaWYgKChyZXNpemVFdmVudCAmJiByZXNpemVFdmVudFR5cGUgJiYgIXJlc2l6ZUV2ZW50VHlwZS5zKSB8fCBpbnRlcnZhbFMpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaW50ZXJ2YWxTID0gc3RhcnRWZXJ0aWNhbCgxLCBjYWxjdWxhdGVJdGVtUG9zaXRpb24sIGxhc3RNb3VzZSk7XG4gICAgfSBlbHNlIGlmIChsYXN0TW91c2UuY2xpZW50WSA+IGUuY2xpZW50WSAmJiBvZmZzZXRUb3AgPiAwICYmIGVsZW1Ub3BPZmZzZXQgPCBzY3JvbGxTZW5zaXRpdml0eSkge1xuICAgICAgY2FuY2VsUygpO1xuICAgICAgaWYgKChyZXNpemVFdmVudCAmJiByZXNpemVFdmVudFR5cGUgJiYgIXJlc2l6ZUV2ZW50VHlwZS5uKSB8fCBpbnRlcnZhbE4pIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaW50ZXJ2YWxOID0gc3RhcnRWZXJ0aWNhbCgtMSwgY2FsY3VsYXRlSXRlbVBvc2l0aW9uLCBsYXN0TW91c2UpO1xuICAgIH0gZWxzZSBpZiAobGFzdE1vdXNlLmNsaWVudFkgIT09IGUuY2xpZW50WSkge1xuICAgICAgY2FuY2VsVmVydGljYWwoKTtcbiAgICB9XG4gIH1cblxuICBjb25zdCBlbGVtUmlnaHRPZmZzZXQgPSBvZmZzZXRMZWZ0ICsgb2Zmc2V0V2lkdGggLSBsZWZ0IC0gd2lkdGg7XG4gIGNvbnN0IGVsZW1MZWZ0T2Zmc2V0ID0gbGVmdCAtIG9mZnNldExlZnQ7XG5cbiAgaWYgKCFncmlkc3Rlci4kb3B0aW9ucy5kaXNhYmxlU2Nyb2xsSG9yaXpvbnRhbCkge1xuICAgIGlmIChsYXN0TW91c2UuY2xpZW50WCA8IGUuY2xpZW50WCAmJiBlbGVtUmlnaHRPZmZzZXQgPD0gc2Nyb2xsU2Vuc2l0aXZpdHkpIHtcbiAgICAgIGNhbmNlbFcoKTtcbiAgICAgIGlmICgocmVzaXplRXZlbnQgJiYgcmVzaXplRXZlbnRUeXBlICYmICFyZXNpemVFdmVudFR5cGUuZSkgfHwgaW50ZXJ2YWxFKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGludGVydmFsRSA9IHN0YXJ0SG9yaXpvbnRhbCgxLCBjYWxjdWxhdGVJdGVtUG9zaXRpb24sIGxhc3RNb3VzZSk7XG4gICAgfSBlbHNlIGlmIChsYXN0TW91c2UuY2xpZW50WCA+IGUuY2xpZW50WCAmJiBvZmZzZXRMZWZ0ID4gMCAmJiBlbGVtTGVmdE9mZnNldCA8IHNjcm9sbFNlbnNpdGl2aXR5KSB7XG4gICAgICBjYW5jZWxFKCk7XG4gICAgICBpZiAoKHJlc2l6ZUV2ZW50ICYmIHJlc2l6ZUV2ZW50VHlwZSAmJiAhcmVzaXplRXZlbnRUeXBlLncpIHx8IGludGVydmFsVykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpbnRlcnZhbFcgPSBzdGFydEhvcml6b250YWwoLTEsIGNhbGN1bGF0ZUl0ZW1Qb3NpdGlvbiwgbGFzdE1vdXNlKTtcbiAgICB9IGVsc2UgaWYgKGxhc3RNb3VzZS5jbGllbnRYICE9PSBlLmNsaWVudFgpIHtcbiAgICAgIGNhbmNlbEhvcml6b250YWwoKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gc3RhcnRWZXJ0aWNhbChzaWduOiBudW1iZXIsIGNhbGN1bGF0ZUl0ZW1Qb3NpdGlvbjogRnVuY3Rpb24sIGxhc3RNb3VzZTogYW55KTogYW55IHtcbiAgbGV0IGNsaWVudFkgPSBsYXN0TW91c2UuY2xpZW50WTtcbiAgcmV0dXJuIHNldEludGVydmFsKCgpID0+IHtcbiAgICBpZiAoIWdyaWRzdGVyRWxlbWVudCB8fCBzaWduID09PSAtMSAmJiBncmlkc3RlckVsZW1lbnQuc2Nyb2xsVG9wIC0gc2Nyb2xsU3BlZWQgPCAwKSB7XG4gICAgICBjYW5jZWxWZXJ0aWNhbCgpO1xuICAgIH1cbiAgICBncmlkc3RlckVsZW1lbnQuc2Nyb2xsVG9wICs9IHNpZ24gKiBzY3JvbGxTcGVlZDtcbiAgICBjbGllbnRZICs9IHNpZ24gKiBzY3JvbGxTcGVlZDtcbiAgICBjYWxjdWxhdGVJdGVtUG9zaXRpb24oe2NsaWVudFg6IGxhc3RNb3VzZS5jbGllbnRYLCBjbGllbnRZOiBjbGllbnRZfSk7XG4gIH0sIGludGVydmFsRHVyYXRpb24pO1xufVxuXG5mdW5jdGlvbiBzdGFydEhvcml6b250YWwoc2lnbjogbnVtYmVyLCBjYWxjdWxhdGVJdGVtUG9zaXRpb246IEZ1bmN0aW9uLCBsYXN0TW91c2U6IGFueSk6IGFueSB7XG4gIGxldCBjbGllbnRYID0gbGFzdE1vdXNlLmNsaWVudFg7XG4gIHJldHVybiBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgaWYgKCFncmlkc3RlckVsZW1lbnQgfHwgc2lnbiA9PT0gLTEgJiYgZ3JpZHN0ZXJFbGVtZW50LnNjcm9sbExlZnQgLSBzY3JvbGxTcGVlZCA8IDApIHtcbiAgICAgIGNhbmNlbEhvcml6b250YWwoKTtcbiAgICB9XG4gICAgZ3JpZHN0ZXJFbGVtZW50LnNjcm9sbExlZnQgKz0gc2lnbiAqIHNjcm9sbFNwZWVkO1xuICAgIGNsaWVudFggKz0gc2lnbiAqIHNjcm9sbFNwZWVkO1xuICAgIGNhbGN1bGF0ZUl0ZW1Qb3NpdGlvbih7Y2xpZW50WDogY2xpZW50WCwgY2xpZW50WTogbGFzdE1vdXNlLmNsaWVudFl9KTtcbiAgfSwgaW50ZXJ2YWxEdXJhdGlvbik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjYW5jZWxTY3JvbGwoKSB7XG4gIGNhbmNlbEhvcml6b250YWwoKTtcbiAgY2FuY2VsVmVydGljYWwoKTtcbiAgZ3JpZHN0ZXJFbGVtZW50ID0gdW5kZWZpbmVkO1xufVxuXG5mdW5jdGlvbiBjYW5jZWxIb3Jpem9udGFsKCkge1xuICBjYW5jZWxFKCk7XG4gIGNhbmNlbFcoKTtcbn1cblxuZnVuY3Rpb24gY2FuY2VsVmVydGljYWwoKSB7XG4gIGNhbmNlbE4oKTtcbiAgY2FuY2VsUygpO1xufVxuXG5mdW5jdGlvbiBjYW5jZWxFKCkge1xuICBpZiAoaW50ZXJ2YWxFKSB7XG4gICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbEUpO1xuICAgIGludGVydmFsRSA9IDA7XG4gIH1cbn1cblxuZnVuY3Rpb24gY2FuY2VsVygpIHtcbiAgaWYgKGludGVydmFsVykge1xuICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWxXKTtcbiAgICBpbnRlcnZhbFcgPSAwO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNhbmNlbFMoKSB7XG4gIGlmIChpbnRlcnZhbFMpIHtcbiAgICBjbGVhckludGVydmFsKGludGVydmFsUyk7XG4gICAgaW50ZXJ2YWxTID0gMDtcbiAgfVxufVxuXG5mdW5jdGlvbiBjYW5jZWxOKCkge1xuICBpZiAoaW50ZXJ2YWxOKSB7XG4gICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbE4pO1xuICAgIGludGVydmFsTiA9IDA7XG4gIH1cbn1cbiJdfQ==
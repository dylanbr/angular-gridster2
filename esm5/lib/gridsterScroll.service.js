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
    var elemRightOffset = offsetLeft + offsetWidth - left - width;
    /** @type {?} */
    var elemLeftOffset = left - offsetLeft;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZHN0ZXJTY3JvbGwuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItZ3JpZHN0ZXIyLyIsInNvdXJjZXMiOlsibGliL2dyaWRzdGVyU2Nyb2xsLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7SUFHSSxpQkFBeUI7O0lBQ3pCLFdBQW1COztJQUNqQixnQkFBZ0IsR0FBRyxFQUFFOztJQUN2QixlQUFvQjs7SUFDcEIsV0FBZ0M7O0lBQ2hDLGVBQW9EOztJQUNwRCxTQUFpQjs7SUFDakIsU0FBaUI7O0lBQ2pCLFNBQWlCOztJQUNqQixTQUFpQjs7Ozs7Ozs7Ozs7Ozs7QUFFckIsTUFBTSxVQUFVLE1BQU0sQ0FBQyxRQUFvQyxFQUFFLElBQVksRUFBRSxHQUFXLEVBQUUsS0FBYSxFQUFFLE1BQWMsRUFDOUYsQ0FBYSxFQUFFLFNBQWMsRUFDN0IscUJBQStCLEVBQUUsTUFBZ0IsRUFBRSxxQkFBK0M7SUFDdkgsaUJBQWlCLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQztJQUN4RCxXQUFXLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUM7SUFDNUMsZUFBZSxHQUFHLFFBQVEsQ0FBQyxFQUFFLENBQUM7SUFDOUIsV0FBVyxHQUFHLE1BQU0sQ0FBQztJQUNyQixlQUFlLEdBQUcscUJBQXFCLENBQUM7O1FBRWxDLFdBQVcsR0FBRyxlQUFlLENBQUMsV0FBVzs7UUFDekMsWUFBWSxHQUFHLGVBQWUsQ0FBQyxZQUFZOztRQUMzQyxVQUFVLEdBQUcsZUFBZSxDQUFDLFVBQVU7O1FBQ3ZDLFNBQVMsR0FBRyxlQUFlLENBQUMsU0FBUzs7UUFDckMsYUFBYSxHQUFHLEdBQUcsR0FBRyxTQUFTOztRQUMvQixnQkFBZ0IsR0FBRyxZQUFZLEdBQUcsU0FBUyxHQUFHLEdBQUcsR0FBRyxNQUFNO0lBQ2hFLElBQUksU0FBUyxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsT0FBTyxJQUFJLGdCQUFnQixH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LFNBQVMsT0FBTztJQUNkLElBQUksU0FBUyxFQUFFO1FBQ2IsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3pCLFNBQVMsR0FBRyxDQUFDLENBQUM7S0FDZjtBQUNILENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0dyaWRzdGVyUmVzaXplRXZlbnRUeXBlfSBmcm9tICcuL2dyaWRzdGVyUmVzaXplRXZlbnRUeXBlLmludGVyZmFjZSc7XG5pbXBvcnQge0dyaWRzdGVyQ29tcG9uZW50SW50ZXJmYWNlfSBmcm9tICcuL2dyaWRzdGVyLmludGVyZmFjZSc7XG5cbmxldCBzY3JvbGxTZW5zaXRpdml0eTogbnVtYmVyO1xubGV0IHNjcm9sbFNwZWVkOiBudW1iZXI7XG5jb25zdCBpbnRlcnZhbER1cmF0aW9uID0gNTA7XG5sZXQgZ3JpZHN0ZXJFbGVtZW50OiBhbnk7XG5sZXQgcmVzaXplRXZlbnQ6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG5sZXQgcmVzaXplRXZlbnRUeXBlOiBHcmlkc3RlclJlc2l6ZUV2ZW50VHlwZSB8IHVuZGVmaW5lZDtcbmxldCBpbnRlcnZhbEU6IG51bWJlcjtcbmxldCBpbnRlcnZhbFc6IG51bWJlcjtcbmxldCBpbnRlcnZhbE46IG51bWJlcjtcbmxldCBpbnRlcnZhbFM6IG51bWJlcjtcblxuZXhwb3J0IGZ1bmN0aW9uIHNjcm9sbChncmlkc3RlcjogR3JpZHN0ZXJDb21wb25lbnRJbnRlcmZhY2UsIGxlZnQ6IG51bWJlciwgdG9wOiBudW1iZXIsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICAgICBlOiBNb3VzZUV2ZW50LCBsYXN0TW91c2U6IGFueSxcbiAgICAgICAgICAgICAgICAgICAgICAgY2FsY3VsYXRlSXRlbVBvc2l0aW9uOiBGdW5jdGlvbiwgcmVzaXplPzogYm9vbGVhbiwgcmVzaXplRXZlbnRTY3JvbGxUeXBlPzogR3JpZHN0ZXJSZXNpemVFdmVudFR5cGUpIHtcbiAgc2Nyb2xsU2Vuc2l0aXZpdHkgPSBncmlkc3Rlci4kb3B0aW9ucy5zY3JvbGxTZW5zaXRpdml0eTtcbiAgc2Nyb2xsU3BlZWQgPSBncmlkc3Rlci4kb3B0aW9ucy5zY3JvbGxTcGVlZDtcbiAgZ3JpZHN0ZXJFbGVtZW50ID0gZ3JpZHN0ZXIuZWw7XG4gIHJlc2l6ZUV2ZW50ID0gcmVzaXplO1xuICByZXNpemVFdmVudFR5cGUgPSByZXNpemVFdmVudFNjcm9sbFR5cGU7XG5cbiAgY29uc3Qgb2Zmc2V0V2lkdGggPSBncmlkc3RlckVsZW1lbnQub2Zmc2V0V2lkdGg7XG4gIGNvbnN0IG9mZnNldEhlaWdodCA9IGdyaWRzdGVyRWxlbWVudC5vZmZzZXRIZWlnaHQ7XG4gIGNvbnN0IG9mZnNldExlZnQgPSBncmlkc3RlckVsZW1lbnQuc2Nyb2xsTGVmdDtcbiAgY29uc3Qgb2Zmc2V0VG9wID0gZ3JpZHN0ZXJFbGVtZW50LnNjcm9sbFRvcDtcbiAgY29uc3QgZWxlbVRvcE9mZnNldCA9IHRvcCAtIG9mZnNldFRvcDtcbiAgY29uc3QgZWxlbUJvdHRvbU9mZnNldCA9IG9mZnNldEhlaWdodCArIG9mZnNldFRvcCAtIHRvcCAtIGhlaWdodDtcbiAgaWYgKGxhc3RNb3VzZS5jbGllbnRZIDwgZS5jbGllbnRZICYmIGVsZW1Cb3R0b21PZmZzZXQgPCBzY3JvbGxTZW5zaXRpdml0eSkge1xuICAgIGNhbmNlbE4oKTtcbiAgICBpZiAoKHJlc2l6ZUV2ZW50ICYmIHJlc2l6ZUV2ZW50VHlwZSAmJiAhcmVzaXplRXZlbnRUeXBlLnMpIHx8IGludGVydmFsUykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpbnRlcnZhbFMgPSBzdGFydFZlcnRpY2FsKDEsIGNhbGN1bGF0ZUl0ZW1Qb3NpdGlvbiwgbGFzdE1vdXNlKTtcbiAgfSBlbHNlIGlmIChsYXN0TW91c2UuY2xpZW50WSA+IGUuY2xpZW50WSAmJiBvZmZzZXRUb3AgPiAwICYmIGVsZW1Ub3BPZmZzZXQgPCBzY3JvbGxTZW5zaXRpdml0eSkge1xuICAgIGNhbmNlbFMoKTtcbiAgICBpZiAoKHJlc2l6ZUV2ZW50ICYmIHJlc2l6ZUV2ZW50VHlwZSAmJiAhcmVzaXplRXZlbnRUeXBlLm4pIHx8IGludGVydmFsTikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpbnRlcnZhbE4gPSBzdGFydFZlcnRpY2FsKC0xLCBjYWxjdWxhdGVJdGVtUG9zaXRpb24sIGxhc3RNb3VzZSk7XG4gIH0gZWxzZSBpZiAobGFzdE1vdXNlLmNsaWVudFkgIT09IGUuY2xpZW50WSkge1xuICAgIGNhbmNlbFZlcnRpY2FsKCk7XG4gIH1cblxuICBjb25zdCBlbGVtUmlnaHRPZmZzZXQgPSBvZmZzZXRMZWZ0ICsgb2Zmc2V0V2lkdGggLSBsZWZ0IC0gd2lkdGg7XG4gIGNvbnN0IGVsZW1MZWZ0T2Zmc2V0ID0gbGVmdCAtIG9mZnNldExlZnQ7XG4gIGlmIChsYXN0TW91c2UuY2xpZW50WCA8IGUuY2xpZW50WCAmJiBlbGVtUmlnaHRPZmZzZXQgPD0gc2Nyb2xsU2Vuc2l0aXZpdHkpIHtcbiAgICBjYW5jZWxXKCk7XG4gICAgaWYgKChyZXNpemVFdmVudCAmJiByZXNpemVFdmVudFR5cGUgJiYgIXJlc2l6ZUV2ZW50VHlwZS5lKSB8fCBpbnRlcnZhbEUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaW50ZXJ2YWxFID0gc3RhcnRIb3Jpem9udGFsKDEsIGNhbGN1bGF0ZUl0ZW1Qb3NpdGlvbiwgbGFzdE1vdXNlKTtcbiAgfSBlbHNlIGlmIChsYXN0TW91c2UuY2xpZW50WCA+IGUuY2xpZW50WCAmJiBvZmZzZXRMZWZ0ID4gMCAmJiBlbGVtTGVmdE9mZnNldCA8IHNjcm9sbFNlbnNpdGl2aXR5KSB7XG4gICAgY2FuY2VsRSgpO1xuICAgIGlmICgocmVzaXplRXZlbnQgJiYgcmVzaXplRXZlbnRUeXBlICYmICFyZXNpemVFdmVudFR5cGUudykgfHwgaW50ZXJ2YWxXKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGludGVydmFsVyA9IHN0YXJ0SG9yaXpvbnRhbCgtMSwgY2FsY3VsYXRlSXRlbVBvc2l0aW9uLCBsYXN0TW91c2UpO1xuICB9IGVsc2UgaWYgKGxhc3RNb3VzZS5jbGllbnRYICE9PSBlLmNsaWVudFgpIHtcbiAgICBjYW5jZWxIb3Jpem9udGFsKCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gc3RhcnRWZXJ0aWNhbChzaWduOiBudW1iZXIsIGNhbGN1bGF0ZUl0ZW1Qb3NpdGlvbjogRnVuY3Rpb24sIGxhc3RNb3VzZTogYW55KTogYW55IHtcbiAgbGV0IGNsaWVudFkgPSBsYXN0TW91c2UuY2xpZW50WTtcbiAgcmV0dXJuIHNldEludGVydmFsKCgpID0+IHtcbiAgICBpZiAoIWdyaWRzdGVyRWxlbWVudCB8fCBzaWduID09PSAtMSAmJiBncmlkc3RlckVsZW1lbnQuc2Nyb2xsVG9wIC0gc2Nyb2xsU3BlZWQgPCAwKSB7XG4gICAgICBjYW5jZWxWZXJ0aWNhbCgpO1xuICAgIH1cbiAgICBncmlkc3RlckVsZW1lbnQuc2Nyb2xsVG9wICs9IHNpZ24gKiBzY3JvbGxTcGVlZDtcbiAgICBjbGllbnRZICs9IHNpZ24gKiBzY3JvbGxTcGVlZDtcbiAgICBjYWxjdWxhdGVJdGVtUG9zaXRpb24oe2NsaWVudFg6IGxhc3RNb3VzZS5jbGllbnRYLCBjbGllbnRZOiBjbGllbnRZfSk7XG4gIH0sIGludGVydmFsRHVyYXRpb24pO1xufVxuXG5mdW5jdGlvbiBzdGFydEhvcml6b250YWwoc2lnbjogbnVtYmVyLCBjYWxjdWxhdGVJdGVtUG9zaXRpb246IEZ1bmN0aW9uLCBsYXN0TW91c2U6IGFueSk6IGFueSB7XG4gIGxldCBjbGllbnRYID0gbGFzdE1vdXNlLmNsaWVudFg7XG4gIHJldHVybiBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgaWYgKCFncmlkc3RlckVsZW1lbnQgfHwgc2lnbiA9PT0gLTEgJiYgZ3JpZHN0ZXJFbGVtZW50LnNjcm9sbExlZnQgLSBzY3JvbGxTcGVlZCA8IDApIHtcbiAgICAgIGNhbmNlbEhvcml6b250YWwoKTtcbiAgICB9XG4gICAgZ3JpZHN0ZXJFbGVtZW50LnNjcm9sbExlZnQgKz0gc2lnbiAqIHNjcm9sbFNwZWVkO1xuICAgIGNsaWVudFggKz0gc2lnbiAqIHNjcm9sbFNwZWVkO1xuICAgIGNhbGN1bGF0ZUl0ZW1Qb3NpdGlvbih7Y2xpZW50WDogY2xpZW50WCwgY2xpZW50WTogbGFzdE1vdXNlLmNsaWVudFl9KTtcbiAgfSwgaW50ZXJ2YWxEdXJhdGlvbik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjYW5jZWxTY3JvbGwoKSB7XG4gIGNhbmNlbEhvcml6b250YWwoKTtcbiAgY2FuY2VsVmVydGljYWwoKTtcbiAgZ3JpZHN0ZXJFbGVtZW50ID0gdW5kZWZpbmVkO1xufVxuXG5mdW5jdGlvbiBjYW5jZWxIb3Jpem9udGFsKCkge1xuICBjYW5jZWxFKCk7XG4gIGNhbmNlbFcoKTtcbn1cblxuZnVuY3Rpb24gY2FuY2VsVmVydGljYWwoKSB7XG4gIGNhbmNlbE4oKTtcbiAgY2FuY2VsUygpO1xufVxuXG5mdW5jdGlvbiBjYW5jZWxFKCkge1xuICBpZiAoaW50ZXJ2YWxFKSB7XG4gICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbEUpO1xuICAgIGludGVydmFsRSA9IDA7XG4gIH1cbn1cblxuZnVuY3Rpb24gY2FuY2VsVygpIHtcbiAgaWYgKGludGVydmFsVykge1xuICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWxXKTtcbiAgICBpbnRlcnZhbFcgPSAwO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNhbmNlbFMoKSB7XG4gIGlmIChpbnRlcnZhbFMpIHtcbiAgICBjbGVhckludGVydmFsKGludGVydmFsUyk7XG4gICAgaW50ZXJ2YWxTID0gMDtcbiAgfVxufVxuXG5mdW5jdGlvbiBjYW5jZWxOKCkge1xuICBpZiAoaW50ZXJ2YWxOKSB7XG4gICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbE4pO1xuICAgIGludGVydmFsTiA9IDA7XG4gIH1cbn1cbiJdfQ==
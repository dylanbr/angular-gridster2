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
    const elemRightOffset = offsetLeft + offsetWidth - left - width;
    /** @type {?} */
    const elemLeftOffset = left - offsetLeft;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZHN0ZXJTY3JvbGwuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItZ3JpZHN0ZXIyLyIsInNvdXJjZXMiOlsibGliL2dyaWRzdGVyU2Nyb2xsLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7SUFHSSxpQkFBeUI7O0lBQ3pCLFdBQW1COztNQUNqQixnQkFBZ0IsR0FBRyxFQUFFOztJQUN2QixlQUFvQjs7SUFDcEIsV0FBZ0M7O0lBQ2hDLGVBQW9EOztJQUNwRCxTQUFpQjs7SUFDakIsU0FBaUI7O0lBQ2pCLFNBQWlCOztJQUNqQixTQUFpQjs7Ozs7Ozs7Ozs7Ozs7QUFFckIsTUFBTSxVQUFVLE1BQU0sQ0FBQyxRQUFvQyxFQUFFLElBQVksRUFBRSxHQUFXLEVBQUUsS0FBYSxFQUFFLE1BQWMsRUFDOUYsQ0FBYSxFQUFFLFNBQWMsRUFDN0IscUJBQStCLEVBQUUsTUFBZ0IsRUFBRSxxQkFBK0M7SUFDdkgsaUJBQWlCLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQztJQUN4RCxXQUFXLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUM7SUFDNUMsZUFBZSxHQUFHLFFBQVEsQ0FBQyxFQUFFLENBQUM7SUFDOUIsV0FBVyxHQUFHLE1BQU0sQ0FBQztJQUNyQixlQUFlLEdBQUcscUJBQXFCLENBQUM7O1VBRWxDLFdBQVcsR0FBRyxlQUFlLENBQUMsV0FBVzs7VUFDekMsWUFBWSxHQUFHLGVBQWUsQ0FBQyxZQUFZOztVQUMzQyxVQUFVLEdBQUcsZUFBZSxDQUFDLFVBQVU7O1VBQ3ZDLFNBQVMsR0FBRyxlQUFlLENBQUMsU0FBUzs7VUFDckMsYUFBYSxHQUFHLEdBQUcsR0FBRyxTQUFTOztVQUMvQixnQkFBZ0IsR0FBRyxZQUFZLEdBQUcsU0FBUyxHQUFHLEdBQUcsR0FBRyxNQUFNO0lBRWhFLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLHFCQUFxQixFQUFFO1FBQzVDLElBQUks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QUNmO0FBQ0gsQ0FBQzs7OztBQUVELFNBQVMsT0FBTztJQUNkLElBQUksU0FBUyxFQUFFO1FBQ2IsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3pCLFNBQVMsR0FBRyxDQUFDLENBQUM7S0FDZjtBQUNILENBQUM7Ozs7QUFFRCxTQUFTLE9BQU87SUFDZCxJQUFJLFNBQVMsRUFBRTtRQUNiLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN6QixTQUFTLEdBQUcsQ0FBQyxDQUFDO0tBQ2Y7QUFDSCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtHcmlkc3RlclJlc2l6ZUV2ZW50VHlwZX0gZnJvbSAnLi9ncmlkc3RlclJlc2l6ZUV2ZW50VHlwZS5pbnRlcmZhY2UnO1xuaW1wb3J0IHtHcmlkc3RlckNvbXBvbmVudEludGVyZmFjZX0gZnJvbSAnLi9ncmlkc3Rlci5pbnRlcmZhY2UnO1xuXG5sZXQgc2Nyb2xsU2Vuc2l0aXZpdHk6IG51bWJlcjtcbmxldCBzY3JvbGxTcGVlZDogbnVtYmVyO1xuY29uc3QgaW50ZXJ2YWxEdXJhdGlvbiA9IDUwO1xubGV0IGdyaWRzdGVyRWxlbWVudDogYW55O1xubGV0IHJlc2l6ZUV2ZW50OiBib29sZWFuIHwgdW5kZWZpbmVkO1xubGV0IHJlc2l6ZUV2ZW50VHlwZTogR3JpZHN0ZXJSZXNpemVFdmVudFR5cGUgfCB1bmRlZmluZWQ7XG5sZXQgaW50ZXJ2YWxFOiBudW1iZXI7XG5sZXQgaW50ZXJ2YWxXOiBudW1iZXI7XG5sZXQgaW50ZXJ2YWxOOiBudW1iZXI7XG5sZXQgaW50ZXJ2YWxTOiBudW1iZXI7XG5cbmV4cG9ydCBmdW5jdGlvbiBzY3JvbGwoZ3JpZHN0ZXI6IEdyaWRzdGVyQ29tcG9uZW50SW50ZXJmYWNlLCBsZWZ0OiBudW1iZXIsIHRvcDogbnVtYmVyLCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgICAgZTogTW91c2VFdmVudCwgbGFzdE1vdXNlOiBhbnksXG4gICAgICAgICAgICAgICAgICAgICAgIGNhbGN1bGF0ZUl0ZW1Qb3NpdGlvbjogRnVuY3Rpb24sIHJlc2l6ZT86IGJvb2xlYW4sIHJlc2l6ZUV2ZW50U2Nyb2xsVHlwZT86IEdyaWRzdGVyUmVzaXplRXZlbnRUeXBlKSB7XG4gIHNjcm9sbFNlbnNpdGl2aXR5ID0gZ3JpZHN0ZXIuJG9wdGlvbnMuc2Nyb2xsU2Vuc2l0aXZpdHk7XG4gIHNjcm9sbFNwZWVkID0gZ3JpZHN0ZXIuJG9wdGlvbnMuc2Nyb2xsU3BlZWQ7XG4gIGdyaWRzdGVyRWxlbWVudCA9IGdyaWRzdGVyLmVsO1xuICByZXNpemVFdmVudCA9IHJlc2l6ZTtcbiAgcmVzaXplRXZlbnRUeXBlID0gcmVzaXplRXZlbnRTY3JvbGxUeXBlO1xuXG4gIGNvbnN0IG9mZnNldFdpZHRoID0gZ3JpZHN0ZXJFbGVtZW50Lm9mZnNldFdpZHRoO1xuICBjb25zdCBvZmZzZXRIZWlnaHQgPSBncmlkc3RlckVsZW1lbnQub2Zmc2V0SGVpZ2h0O1xuICBjb25zdCBvZmZzZXRMZWZ0ID0gZ3JpZHN0ZXJFbGVtZW50LnNjcm9sbExlZnQ7XG4gIGNvbnN0IG9mZnNldFRvcCA9IGdyaWRzdGVyRWxlbWVudC5zY3JvbGxUb3A7XG4gIGNvbnN0IGVsZW1Ub3BPZmZzZXQgPSB0b3AgLSBvZmZzZXRUb3A7XG4gIGNvbnN0IGVsZW1Cb3R0b21PZmZzZXQgPSBvZmZzZXRIZWlnaHQgKyBvZmZzZXRUb3AgLSB0b3AgLSBoZWlnaHQ7XG5cbiAgaWYgKCFncmlkc3Rlci4kb3B0aW9ucy5kaXNhYmxlU2Nyb2xsVmVydGljYWwpIHtcbiAgICBpZiAobGFzdE1vdXNlLmNsaWVudFkgPCBlLmNsaWVudFkgJiYgZWxlbUJvdHRvbU9mZnNldCA8IHNjcm9sbFNlbnNpdGl2aXR5KSB7XG4gICAgICBjYW5jZWxOKCk7XG4gICAgICBpZiAoKHJlc2l6ZUV2ZW50ICYmIHJlc2l6ZUV2ZW50VHlwZSAmJiAhcmVzaXplRXZlbnRUeXBlLnMpIHx8IGludGVydmFsUykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpbnRlcnZhbFMgPSBzdGFydFZlcnRpY2FsKDEsIGNhbGN1bGF0ZUl0ZW1Qb3NpdGlvbiwgbGFzdE1vdXNlKTtcbiAgICB9IGVsc2UgaWYgKGxhc3RNb3VzZS5jbGllbnRZID4gZS5jbGllbnRZICYmIG9mZnNldFRvcCA+IDAgJiYgZWxlbVRvcE9mZnNldCA8IHNjcm9sbFNlbnNpdGl2aXR5KSB7XG4gICAgICBjYW5jZWxTKCk7XG4gICAgICBpZiAoKHJlc2l6ZUV2ZW50ICYmIHJlc2l6ZUV2ZW50VHlwZSAmJiAhcmVzaXplRXZlbnRUeXBlLm4pIHx8IGludGVydmFsTikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpbnRlcnZhbE4gPSBzdGFydFZlcnRpY2FsKC0xLCBjYWxjdWxhdGVJdGVtUG9zaXRpb24sIGxhc3RNb3VzZSk7XG4gICAgfSBlbHNlIGlmIChsYXN0TW91c2UuY2xpZW50WSAhPT0gZS5jbGllbnRZKSB7XG4gICAgICBjYW5jZWxWZXJ0aWNhbCgpO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGVsZW1SaWdodE9mZnNldCA9IG9mZnNldExlZnQgKyBvZmZzZXRXaWR0aCAtIGxlZnQgLSB3aWR0aDtcbiAgY29uc3QgZWxlbUxlZnRPZmZzZXQgPSBsZWZ0IC0gb2Zmc2V0TGVmdDtcblxuICBpZiAoIWdyaWRzdGVyLiRvcHRpb25zLmRpc2FibGVTY3JvbGxIb3Jpem9udGFsKSB7XG4gICAgaWYgKGxhc3RNb3VzZS5jbGllbnRYIDwgZS5jbGllbnRYICYmIGVsZW1SaWdodE9mZnNldCA8PSBzY3JvbGxTZW5zaXRpdml0eSkge1xuICAgICAgY2FuY2VsVygpO1xuICAgICAgaWYgKChyZXNpemVFdmVudCAmJiByZXNpemVFdmVudFR5cGUgJiYgIXJlc2l6ZUV2ZW50VHlwZS5lKSB8fCBpbnRlcnZhbEUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaW50ZXJ2YWxFID0gc3RhcnRIb3Jpem9udGFsKDEsIGNhbGN1bGF0ZUl0ZW1Qb3NpdGlvbiwgbGFzdE1vdXNlKTtcbiAgICB9IGVsc2UgaWYgKGxhc3RNb3VzZS5jbGllbnRYID4gZS5jbGllbnRYICYmIG9mZnNldExlZnQgPiAwICYmIGVsZW1MZWZ0T2Zmc2V0IDwgc2Nyb2xsU2Vuc2l0aXZpdHkpIHtcbiAgICAgIGNhbmNlbEUoKTtcbiAgICAgIGlmICgocmVzaXplRXZlbnQgJiYgcmVzaXplRXZlbnRUeXBlICYmICFyZXNpemVFdmVudFR5cGUudykgfHwgaW50ZXJ2YWxXKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGludGVydmFsVyA9IHN0YXJ0SG9yaXpvbnRhbCgtMSwgY2FsY3VsYXRlSXRlbVBvc2l0aW9uLCBsYXN0TW91c2UpO1xuICAgIH0gZWxzZSBpZiAobGFzdE1vdXNlLmNsaWVudFggIT09IGUuY2xpZW50WCkge1xuICAgICAgY2FuY2VsSG9yaXpvbnRhbCgpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBzdGFydFZlcnRpY2FsKHNpZ246IG51bWJlciwgY2FsY3VsYXRlSXRlbVBvc2l0aW9uOiBGdW5jdGlvbiwgbGFzdE1vdXNlOiBhbnkpOiBhbnkge1xuICBsZXQgY2xpZW50WSA9IGxhc3RNb3VzZS5jbGllbnRZO1xuICByZXR1cm4gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgIGlmICghZ3JpZHN0ZXJFbGVtZW50IHx8IHNpZ24gPT09IC0xICYmIGdyaWRzdGVyRWxlbWVudC5zY3JvbGxUb3AgLSBzY3JvbGxTcGVlZCA8IDApIHtcbiAgICAgIGNhbmNlbFZlcnRpY2FsKCk7XG4gICAgfVxuICAgIGdyaWRzdGVyRWxlbWVudC5zY3JvbGxUb3AgKz0gc2lnbiAqIHNjcm9sbFNwZWVkO1xuICAgIGNsaWVudFkgKz0gc2lnbiAqIHNjcm9sbFNwZWVkO1xuICAgIGNhbGN1bGF0ZUl0ZW1Qb3NpdGlvbih7Y2xpZW50WDogbGFzdE1vdXNlLmNsaWVudFgsIGNsaWVudFk6IGNsaWVudFl9KTtcbiAgfSwgaW50ZXJ2YWxEdXJhdGlvbik7XG59XG5cbmZ1bmN0aW9uIHN0YXJ0SG9yaXpvbnRhbChzaWduOiBudW1iZXIsIGNhbGN1bGF0ZUl0ZW1Qb3NpdGlvbjogRnVuY3Rpb24sIGxhc3RNb3VzZTogYW55KTogYW55IHtcbiAgbGV0IGNsaWVudFggPSBsYXN0TW91c2UuY2xpZW50WDtcbiAgcmV0dXJuIHNldEludGVydmFsKCgpID0+IHtcbiAgICBpZiAoIWdyaWRzdGVyRWxlbWVudCB8fCBzaWduID09PSAtMSAmJiBncmlkc3RlckVsZW1lbnQuc2Nyb2xsTGVmdCAtIHNjcm9sbFNwZWVkIDwgMCkge1xuICAgICAgY2FuY2VsSG9yaXpvbnRhbCgpO1xuICAgIH1cbiAgICBncmlkc3RlckVsZW1lbnQuc2Nyb2xsTGVmdCArPSBzaWduICogc2Nyb2xsU3BlZWQ7XG4gICAgY2xpZW50WCArPSBzaWduICogc2Nyb2xsU3BlZWQ7XG4gICAgY2FsY3VsYXRlSXRlbVBvc2l0aW9uKHtjbGllbnRYOiBjbGllbnRYLCBjbGllbnRZOiBsYXN0TW91c2UuY2xpZW50WX0pO1xuICB9LCBpbnRlcnZhbER1cmF0aW9uKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNhbmNlbFNjcm9sbCgpIHtcbiAgY2FuY2VsSG9yaXpvbnRhbCgpO1xuICBjYW5jZWxWZXJ0aWNhbCgpO1xuICBncmlkc3RlckVsZW1lbnQgPSB1bmRlZmluZWQ7XG59XG5cbmZ1bmN0aW9uIGNhbmNlbEhvcml6b250YWwoKSB7XG4gIGNhbmNlbEUoKTtcbiAgY2FuY2VsVygpO1xufVxuXG5mdW5jdGlvbiBjYW5jZWxWZXJ0aWNhbCgpIHtcbiAgY2FuY2VsTigpO1xuICBjYW5jZWxTKCk7XG59XG5cbmZ1bmN0aW9uIGNhbmNlbEUoKSB7XG4gIGlmIChpbnRlcnZhbEUpIHtcbiAgICBjbGVhckludGVydmFsKGludGVydmFsRSk7XG4gICAgaW50ZXJ2YWxFID0gMDtcbiAgfVxufVxuXG5mdW5jdGlvbiBjYW5jZWxXKCkge1xuICBpZiAoaW50ZXJ2YWxXKSB7XG4gICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbFcpO1xuICAgIGludGVydmFsVyA9IDA7XG4gIH1cbn1cblxuZnVuY3Rpb24gY2FuY2VsUygpIHtcbiAgaWYgKGludGVydmFsUykge1xuICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWxTKTtcbiAgICBpbnRlcnZhbFMgPSAwO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNhbmNlbE4oKSB7XG4gIGlmIChpbnRlcnZhbE4pIHtcbiAgICBjbGVhckludGVydmFsKGludGVydmFsTik7XG4gICAgaW50ZXJ2YWxOID0gMDtcbiAgfVxufVxuIl19
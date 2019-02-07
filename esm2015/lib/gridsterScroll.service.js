/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
    return setInterval(() => {
        if (!gridsterElement || sign === -1 && gridsterElement.scrollTop - scrollSpeed < 0) {
            cancelVertical();
        }
        gridsterElement.scrollTop += sign * scrollSpeed;
        clientY += sign * scrollSpeed;
        calculateItemPosition({ clientX: lastMouse.clientX, clientY: clientY });
    }, intervalDuration);
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
    return setInterval(() => {
        if (!gridsterElement || sign === -1 && gridsterElement.scrollLeft - scrollSpeed < 0) {
            cancelHorizontal();
        }
        gridsterElement.scrollLeft += sign * scrollSpeed;
        clientX += sign * scrollSpeed;
        calculateItemPosition({ clientX: clientX, clientY: lastMouse.clientY });
    }, intervalDuration);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZHN0ZXJTY3JvbGwuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItZ3JpZHN0ZXIyLyIsInNvdXJjZXMiOlsibGliL2dyaWRzdGVyU2Nyb2xsLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7SUFHSSxpQkFBeUI7O0lBQ3pCLFdBQW1COztNQUNqQixnQkFBZ0IsR0FBRyxFQUFFOztJQUN2QixlQUFvQjs7SUFDcEIsV0FBZ0M7O0lBQ2hDLGVBQW9EOztJQUNwRCxTQUFpQjs7SUFDakIsU0FBaUI7O0lBQ2pCLFNBQWlCOztJQUNqQixTQUFpQjs7Ozs7Ozs7Ozs7Ozs7QUFFckIsTUFBTSxVQUFVLE1BQU0sQ0FBQyxRQUFvQyxFQUFFLElBQVksRUFBRSxHQUFXLEVBQUUsS0FBYSxFQUFFLE1BQWMsRUFDOUYsQ0FBYSxFQUFFLFNBQWMsRUFDN0IscUJBQStCLEVBQUUsTUFBZ0IsRUFBRSxxQkFBK0M7SUFDdkgsaUJBQWlCLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQztJQUN4RCxXQUFXLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUM7SUFDNUMsZUFBZSxHQUFHLFFBQVEsQ0FBQyxFQUFFLENBQUM7SUFDOUIsV0FBVyxHQUFHLE1BQU0sQ0FBQztJQUNyQixlQUFlLEdBQUcscUJBQXFCLENBQUM7O1VBRWxDLFdBQVcsR0FBRyxlQUFlLENBQUMsV0FBVzs7VUFDekMsWUFBWSxHQUFHLGVBQWUsQ0FBQyxZQUFZOztVQUMzQyxVQUFVLEdBQUcsZUFBZSxDQUFDLFVBQVU7O1VBQ3ZDLFNBQVMsR0FBRyxlQUFlLENBQUMsU0FBUzs7VUFDckMsYUFBYSxHQUFHLEdBQUcsR0FBRyxTQUFTOztVQUMvQixnQkFBZ0IsR0FBRyxZQUFZLEdBQUcsU0FBUyxHQUFHLEdBQUcsR0FBRyxNQUFNO0lBQ2hFLElBQUksU0FBUyxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsT0FBTyxJQUFJLGdCQUFnQixH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QUNILENBQUM7Ozs7QUFFRCxTQUFTLE9BQU87SUFDZCxJQUFJLFNBQVMsRUFBRTtRQUNiLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN6QixTQUFTLEdBQUcsQ0FBQyxDQUFDO0tBQ2Y7QUFDSCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtHcmlkc3RlclJlc2l6ZUV2ZW50VHlwZX0gZnJvbSAnLi9ncmlkc3RlclJlc2l6ZUV2ZW50VHlwZS5pbnRlcmZhY2UnO1xuaW1wb3J0IHtHcmlkc3RlckNvbXBvbmVudEludGVyZmFjZX0gZnJvbSAnLi9ncmlkc3Rlci5pbnRlcmZhY2UnO1xuXG5sZXQgc2Nyb2xsU2Vuc2l0aXZpdHk6IG51bWJlcjtcbmxldCBzY3JvbGxTcGVlZDogbnVtYmVyO1xuY29uc3QgaW50ZXJ2YWxEdXJhdGlvbiA9IDUwO1xubGV0IGdyaWRzdGVyRWxlbWVudDogYW55O1xubGV0IHJlc2l6ZUV2ZW50OiBib29sZWFuIHwgdW5kZWZpbmVkO1xubGV0IHJlc2l6ZUV2ZW50VHlwZTogR3JpZHN0ZXJSZXNpemVFdmVudFR5cGUgfCB1bmRlZmluZWQ7XG5sZXQgaW50ZXJ2YWxFOiBudW1iZXI7XG5sZXQgaW50ZXJ2YWxXOiBudW1iZXI7XG5sZXQgaW50ZXJ2YWxOOiBudW1iZXI7XG5sZXQgaW50ZXJ2YWxTOiBudW1iZXI7XG5cbmV4cG9ydCBmdW5jdGlvbiBzY3JvbGwoZ3JpZHN0ZXI6IEdyaWRzdGVyQ29tcG9uZW50SW50ZXJmYWNlLCBsZWZ0OiBudW1iZXIsIHRvcDogbnVtYmVyLCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgICAgZTogTW91c2VFdmVudCwgbGFzdE1vdXNlOiBhbnksXG4gICAgICAgICAgICAgICAgICAgICAgIGNhbGN1bGF0ZUl0ZW1Qb3NpdGlvbjogRnVuY3Rpb24sIHJlc2l6ZT86IGJvb2xlYW4sIHJlc2l6ZUV2ZW50U2Nyb2xsVHlwZT86IEdyaWRzdGVyUmVzaXplRXZlbnRUeXBlKSB7XG4gIHNjcm9sbFNlbnNpdGl2aXR5ID0gZ3JpZHN0ZXIuJG9wdGlvbnMuc2Nyb2xsU2Vuc2l0aXZpdHk7XG4gIHNjcm9sbFNwZWVkID0gZ3JpZHN0ZXIuJG9wdGlvbnMuc2Nyb2xsU3BlZWQ7XG4gIGdyaWRzdGVyRWxlbWVudCA9IGdyaWRzdGVyLmVsO1xuICByZXNpemVFdmVudCA9IHJlc2l6ZTtcbiAgcmVzaXplRXZlbnRUeXBlID0gcmVzaXplRXZlbnRTY3JvbGxUeXBlO1xuXG4gIGNvbnN0IG9mZnNldFdpZHRoID0gZ3JpZHN0ZXJFbGVtZW50Lm9mZnNldFdpZHRoO1xuICBjb25zdCBvZmZzZXRIZWlnaHQgPSBncmlkc3RlckVsZW1lbnQub2Zmc2V0SGVpZ2h0O1xuICBjb25zdCBvZmZzZXRMZWZ0ID0gZ3JpZHN0ZXJFbGVtZW50LnNjcm9sbExlZnQ7XG4gIGNvbnN0IG9mZnNldFRvcCA9IGdyaWRzdGVyRWxlbWVudC5zY3JvbGxUb3A7XG4gIGNvbnN0IGVsZW1Ub3BPZmZzZXQgPSB0b3AgLSBvZmZzZXRUb3A7XG4gIGNvbnN0IGVsZW1Cb3R0b21PZmZzZXQgPSBvZmZzZXRIZWlnaHQgKyBvZmZzZXRUb3AgLSB0b3AgLSBoZWlnaHQ7XG4gIGlmIChsYXN0TW91c2UuY2xpZW50WSA8IGUuY2xpZW50WSAmJiBlbGVtQm90dG9tT2Zmc2V0IDwgc2Nyb2xsU2Vuc2l0aXZpdHkpIHtcbiAgICBjYW5jZWxOKCk7XG4gICAgaWYgKChyZXNpemVFdmVudCAmJiByZXNpemVFdmVudFR5cGUgJiYgIXJlc2l6ZUV2ZW50VHlwZS5zKSB8fCBpbnRlcnZhbFMpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaW50ZXJ2YWxTID0gc3RhcnRWZXJ0aWNhbCgxLCBjYWxjdWxhdGVJdGVtUG9zaXRpb24sIGxhc3RNb3VzZSk7XG4gIH0gZWxzZSBpZiAobGFzdE1vdXNlLmNsaWVudFkgPiBlLmNsaWVudFkgJiYgb2Zmc2V0VG9wID4gMCAmJiBlbGVtVG9wT2Zmc2V0IDwgc2Nyb2xsU2Vuc2l0aXZpdHkpIHtcbiAgICBjYW5jZWxTKCk7XG4gICAgaWYgKChyZXNpemVFdmVudCAmJiByZXNpemVFdmVudFR5cGUgJiYgIXJlc2l6ZUV2ZW50VHlwZS5uKSB8fCBpbnRlcnZhbE4pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaW50ZXJ2YWxOID0gc3RhcnRWZXJ0aWNhbCgtMSwgY2FsY3VsYXRlSXRlbVBvc2l0aW9uLCBsYXN0TW91c2UpO1xuICB9IGVsc2UgaWYgKGxhc3RNb3VzZS5jbGllbnRZICE9PSBlLmNsaWVudFkpIHtcbiAgICBjYW5jZWxWZXJ0aWNhbCgpO1xuICB9XG5cbiAgY29uc3QgZWxlbVJpZ2h0T2Zmc2V0ID0gb2Zmc2V0TGVmdCArIG9mZnNldFdpZHRoIC0gbGVmdCAtIHdpZHRoO1xuICBjb25zdCBlbGVtTGVmdE9mZnNldCA9IGxlZnQgLSBvZmZzZXRMZWZ0O1xuICBpZiAobGFzdE1vdXNlLmNsaWVudFggPCBlLmNsaWVudFggJiYgZWxlbVJpZ2h0T2Zmc2V0IDw9IHNjcm9sbFNlbnNpdGl2aXR5KSB7XG4gICAgY2FuY2VsVygpO1xuICAgIGlmICgocmVzaXplRXZlbnQgJiYgcmVzaXplRXZlbnRUeXBlICYmICFyZXNpemVFdmVudFR5cGUuZSkgfHwgaW50ZXJ2YWxFKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGludGVydmFsRSA9IHN0YXJ0SG9yaXpvbnRhbCgxLCBjYWxjdWxhdGVJdGVtUG9zaXRpb24sIGxhc3RNb3VzZSk7XG4gIH0gZWxzZSBpZiAobGFzdE1vdXNlLmNsaWVudFggPiBlLmNsaWVudFggJiYgb2Zmc2V0TGVmdCA+IDAgJiYgZWxlbUxlZnRPZmZzZXQgPCBzY3JvbGxTZW5zaXRpdml0eSkge1xuICAgIGNhbmNlbEUoKTtcbiAgICBpZiAoKHJlc2l6ZUV2ZW50ICYmIHJlc2l6ZUV2ZW50VHlwZSAmJiAhcmVzaXplRXZlbnRUeXBlLncpIHx8IGludGVydmFsVykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpbnRlcnZhbFcgPSBzdGFydEhvcml6b250YWwoLTEsIGNhbGN1bGF0ZUl0ZW1Qb3NpdGlvbiwgbGFzdE1vdXNlKTtcbiAgfSBlbHNlIGlmIChsYXN0TW91c2UuY2xpZW50WCAhPT0gZS5jbGllbnRYKSB7XG4gICAgY2FuY2VsSG9yaXpvbnRhbCgpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHN0YXJ0VmVydGljYWwoc2lnbjogbnVtYmVyLCBjYWxjdWxhdGVJdGVtUG9zaXRpb246IEZ1bmN0aW9uLCBsYXN0TW91c2U6IGFueSk6IGFueSB7XG4gIGxldCBjbGllbnRZID0gbGFzdE1vdXNlLmNsaWVudFk7XG4gIHJldHVybiBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgaWYgKCFncmlkc3RlckVsZW1lbnQgfHwgc2lnbiA9PT0gLTEgJiYgZ3JpZHN0ZXJFbGVtZW50LnNjcm9sbFRvcCAtIHNjcm9sbFNwZWVkIDwgMCkge1xuICAgICAgY2FuY2VsVmVydGljYWwoKTtcbiAgICB9XG4gICAgZ3JpZHN0ZXJFbGVtZW50LnNjcm9sbFRvcCArPSBzaWduICogc2Nyb2xsU3BlZWQ7XG4gICAgY2xpZW50WSArPSBzaWduICogc2Nyb2xsU3BlZWQ7XG4gICAgY2FsY3VsYXRlSXRlbVBvc2l0aW9uKHtjbGllbnRYOiBsYXN0TW91c2UuY2xpZW50WCwgY2xpZW50WTogY2xpZW50WX0pO1xuICB9LCBpbnRlcnZhbER1cmF0aW9uKTtcbn1cblxuZnVuY3Rpb24gc3RhcnRIb3Jpem9udGFsKHNpZ246IG51bWJlciwgY2FsY3VsYXRlSXRlbVBvc2l0aW9uOiBGdW5jdGlvbiwgbGFzdE1vdXNlOiBhbnkpOiBhbnkge1xuICBsZXQgY2xpZW50WCA9IGxhc3RNb3VzZS5jbGllbnRYO1xuICByZXR1cm4gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgIGlmICghZ3JpZHN0ZXJFbGVtZW50IHx8IHNpZ24gPT09IC0xICYmIGdyaWRzdGVyRWxlbWVudC5zY3JvbGxMZWZ0IC0gc2Nyb2xsU3BlZWQgPCAwKSB7XG4gICAgICBjYW5jZWxIb3Jpem9udGFsKCk7XG4gICAgfVxuICAgIGdyaWRzdGVyRWxlbWVudC5zY3JvbGxMZWZ0ICs9IHNpZ24gKiBzY3JvbGxTcGVlZDtcbiAgICBjbGllbnRYICs9IHNpZ24gKiBzY3JvbGxTcGVlZDtcbiAgICBjYWxjdWxhdGVJdGVtUG9zaXRpb24oe2NsaWVudFg6IGNsaWVudFgsIGNsaWVudFk6IGxhc3RNb3VzZS5jbGllbnRZfSk7XG4gIH0sIGludGVydmFsRHVyYXRpb24pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2FuY2VsU2Nyb2xsKCkge1xuICBjYW5jZWxIb3Jpem9udGFsKCk7XG4gIGNhbmNlbFZlcnRpY2FsKCk7XG4gIGdyaWRzdGVyRWxlbWVudCA9IHVuZGVmaW5lZDtcbn1cblxuZnVuY3Rpb24gY2FuY2VsSG9yaXpvbnRhbCgpIHtcbiAgY2FuY2VsRSgpO1xuICBjYW5jZWxXKCk7XG59XG5cbmZ1bmN0aW9uIGNhbmNlbFZlcnRpY2FsKCkge1xuICBjYW5jZWxOKCk7XG4gIGNhbmNlbFMoKTtcbn1cblxuZnVuY3Rpb24gY2FuY2VsRSgpIHtcbiAgaWYgKGludGVydmFsRSkge1xuICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWxFKTtcbiAgICBpbnRlcnZhbEUgPSAwO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNhbmNlbFcoKSB7XG4gIGlmIChpbnRlcnZhbFcpIHtcbiAgICBjbGVhckludGVydmFsKGludGVydmFsVyk7XG4gICAgaW50ZXJ2YWxXID0gMDtcbiAgfVxufVxuXG5mdW5jdGlvbiBjYW5jZWxTKCkge1xuICBpZiAoaW50ZXJ2YWxTKSB7XG4gICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbFMpO1xuICAgIGludGVydmFsUyA9IDA7XG4gIH1cbn1cblxuZnVuY3Rpb24gY2FuY2VsTigpIHtcbiAgaWYgKGludGVydmFsTikge1xuICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWxOKTtcbiAgICBpbnRlcnZhbE4gPSAwO1xuICB9XG59XG4iXX0=
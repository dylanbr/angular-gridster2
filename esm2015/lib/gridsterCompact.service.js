/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { GridsterComponentInterface } from './gridster.interface';
import { CompactType } from './gridsterConfig.interface';
export class GridsterCompact {
    /**
     * @param {?} gridster
     */
    constructor(gridster) {
        this.gridster = gridster;
    }
    /**
     * @return {?}
     */
    destroy() {
        delete this.gridster;
    }
    /**
     * @return {?}
     */
    checkCompact() {
        if (this.gridster.$options.compactType !== CompactType.None) {
            if (this.gridster.$options.compactType === CompactType.CompactUp) {
                this.checkCompactUp();
            }
            else if (this.gridster.$options.compactType === CompactType.CompactLeft) {
                this.checkCompactLeft();
            }
            else if (this.gridster.$options.compactType === CompactType.CompactUpAndLeft) {
                this.checkCompactUp();
                this.checkCompactLeft();
            }
            else if (this.gridster.$options.compactType === CompactType.CompactLeftAndUp) {
                this.checkCompactLeft();
                this.checkCompactUp();
            }
            else if (this.gridster.$options.compactType === CompactType.CompactRight) {
                this.checkCompactRight();
            }
            else if (this.gridster.$options.compactType === CompactType.CompactUpAndRight) {
                this.checkCompactUp();
                this.checkCompactRight();
            }
            else if (this.gridster.$options.compactType === CompactType.CompactRightAndUp) {
                this.checkCompactRight();
                this.checkCompactUp();
            }
        }
    }
    /**
     * @param {?} item
     * @return {?}
     */
    checkCompactItem(item) {
        if (this.gridster.$options.compactType !== CompactType.None) {
            if (this.gridster.$options.compactType === CompactType.CompactUp) {
                this.moveUpTillCollision(item);
            }
            else if (this.gridster.$options.compactType === CompactType.CompactLeft) {
                this.moveLeftTillCollision(item);
            }
            else if (this.gridster.$options.compactType === CompactType.CompactUpAndLeft) {
                this.moveUpTillCollision(item);
                this.moveLeftTillCollision(item);
            }
            else if (this.gridster.$options.compactType === CompactType.CompactLeftAndUp) {
                this.moveLeftTillCollision(item);
                this.moveUpTillCollision(item);
            }
            else if (this.gridster.$options.compactType === CompactType.CompactUpAndRight) {
                this.moveUpTillCollision(item);
                this.moveRightTillCollision(item);
            }
        }
    }
    /**
     * @return {?}
     */
    checkCompactUp() {
        /** @type {?} */
        let widgetMovedUp = false;
        /** @type {?} */
        let widget;
        /** @type {?} */
        let moved;
        /** @type {?} */
        const l = this.gridster.grid.length;
        for (let i = 0; i < l; i++) {
            widget = this.gridster.grid[i];
            if (widget.$item.compactEnabled === false) {
                continue;
            }
            moved = this.moveUpTillCollision(widget.$item);
            if (moved) {
                /** @type {?} */
                let oldItem = {
                    x: widget.item.x,
                    y: widget.item.y,
                    rows: widget.item.rows,
                    cols: widget.item.cols
                };
                widgetMovedUp = true;
                widget.item.y = widget.$item.y;
                widget.itemChanged(oldItem);
            }
        }
        if (widgetMovedUp) {
            this.checkCompact();
        }
    }
    /**
     * @param {?} item
     * @return {?}
     */
    moveUpTillCollision(item) {
        item.y -= 1;
        if (this.gridster.checkCollision(item)) {
            item.y += 1;
            return false;
        }
        else {
            this.moveUpTillCollision(item);
            return true;
        }
    }
    /**
     * @return {?}
     */
    checkCompactLeft() {
        /** @type {?} */
        let widgetMovedUp = false;
        /** @type {?} */
        let widget;
        /** @type {?} */
        let moved;
        /** @type {?} */
        const l = this.gridster.grid.length;
        for (let i = 0; i < l; i++) {
            widget = this.gridster.grid[i];
            if (widget.$item.compactEnabled === false) {
                continue;
            }
            moved = this.moveLeftTillCollision(widget.$item);
            if (moved) {
                /** @type {?} */
                let oldItem = {
                    x: widget.item.x,
                    y: widget.item.y,
                    rows: widget.item.rows,
                    cols: widget.item.cols
                };
                widgetMovedUp = true;
                widget.item.x = widget.$item.x;
                widget.itemChanged(oldItem);
            }
        }
        if (widgetMovedUp) {
            this.checkCompact();
        }
    }
    /**
     * @return {?}
     */
    checkCompactRight() {
        /** @type {?} */
        let widgetMovedUp = false;
        /** @type {?} */
        let widget;
        /** @type {?} */
        let moved;
        /** @type {?} */
        const l = this.gridster.grid.length;
        for (let i = 0; i < l; i++) {
            widget = this.gridster.grid[i];
            if (widget.$item.compactEnabled === false) {
                continue;
            }
            moved = this.moveRightTillCollision(widget.$item);
            if (moved) {
                /** @type {?} */
                let oldItem = {
                    x: widget.item.x,
                    y: widget.item.y,
                    rows: widget.item.rows,
                    cols: widget.item.cols
                };
                widgetMovedUp = true;
                widget.item.x = widget.$item.x;
                widget.itemChanged(oldItem);
            }
        }
        if (widgetMovedUp) {
            this.checkCompact();
        }
    }
    /**
     * @param {?} item
     * @return {?}
     */
    moveLeftTillCollision(item) {
        item.x -= 1;
        if (this.gridster.checkCollision(item)) {
            item.x += 1;
            return false;
        }
        else {
            this.moveLeftTillCollision(item);
            return true;
        }
    }
    /**
     * @param {?} item
     * @return {?}
     */
    moveRightTillCollision(item) {
        item.x += 1;
        if (this.gridster.checkCollision(item)) {
            item.x -= 1;
            return false;
        }
        else {
            this.moveRightTillCollision(item);
            return true;
        }
    }
}
GridsterCompact.decorators = [
    { type: Injectable }
];
/** @nocollapse */
GridsterCompact.ctorParameters = () => [
    { type: GridsterComponentInterface }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    GridsterCompact.prototype.gridster;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZHN0ZXJDb21wYWN0LnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWdyaWRzdGVyMi8iLCJzb3VyY2VzIjpbImxpYi9ncmlkc3RlckNvbXBhY3Quc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUV6QyxPQUFPLEVBQUMsMEJBQTBCLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUdoRSxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sNEJBQTRCLENBQUM7QUFHdkQsTUFBTSxPQUFPLGVBQWU7Ozs7SUFFMUIsWUFBb0IsUUFBb0M7UUFBcEMsYUFBUSxHQUFSLFFBQVEsQ0FBNEI7SUFDeEQsQ0FBQzs7OztJQUVELE9BQU87UUFDTCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQzs7OztJQUVELFlBQVk7UUFDVixJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFdBQVcsS0FBSyxXQUFXLENBQUMsSUFBSSxFQUFFO1lBQzNELElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsV0FBVyxLQUFLLFdBQVcsQ0FBQyxTQUFTLEVBQUU7Z0JBQ2hFLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQzthQUN2QjtpQkFBTSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFdBQVcsS0FBSyxXQUFXLENBQUMsV0FBVyxFQUFFO2dCQUN6RSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQzthQUN6QjtpQkFBTSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFdBQVcsS0FBSyxXQUFXLENBQUMsZ0JBQWdCLEVBQUU7Z0JBQzlFLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFDdEIsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7YUFDekI7aUJBQU0sSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFD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LHNCQUFzQixDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2xDLE9BQU8sSUFBSSxDQUFDO1NBQ2I7SUFDSCxDQUFDOzs7WUFsS0YsVUFBVTs7OztZQUxILDBCQUEwQjs7Ozs7OztJQVFwQixtQ0FBNEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge0dyaWRzdGVyQ29tcG9uZW50SW50ZXJmYWNlfSBmcm9tICcuL2dyaWRzdGVyLmludGVyZmFjZSc7XG5pbXBvcnQge0dyaWRzdGVySXRlbUNvbXBvbmVudEludGVyZmFjZX0gZnJvbSAnLi9ncmlkc3Rlckl0ZW1Db21wb25lbnQuaW50ZXJmYWNlJztcbmltcG9ydCB7R3JpZHN0ZXJJdGVtfSBmcm9tICcuL2dyaWRzdGVySXRlbS5pbnRlcmZhY2UnO1xuaW1wb3J0IHtDb21wYWN0VHlwZX0gZnJvbSAnLi9ncmlkc3RlckNvbmZpZy5pbnRlcmZhY2UnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgR3JpZHN0ZXJDb21wYWN0IHtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGdyaWRzdGVyOiBHcmlkc3RlckNvbXBvbmVudEludGVyZmFjZSkge1xuICB9XG5cbiAgZGVzdHJveSgpOiB2b2lkIHtcbiAgICBkZWxldGUgdGhpcy5ncmlkc3RlcjtcbiAgfVxuXG4gIGNoZWNrQ29tcGFjdCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5ncmlkc3Rlci4kb3B0aW9ucy5jb21wYWN0VHlwZSAhPT0gQ29tcGFjdFR5cGUuTm9uZSkge1xuICAgICAgaWYgKHRoaXMuZ3JpZHN0ZXIuJG9wdGlvbnMuY29tcGFjdFR5cGUgPT09IENvbXBhY3RUeXBlLkNvbXBhY3RVcCkge1xuICAgICAgICB0aGlzLmNoZWNrQ29tcGFjdFVwKCk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuZ3JpZHN0ZXIuJG9wdGlvbnMuY29tcGFjdFR5cGUgPT09IENvbXBhY3RUeXBlLkNvbXBhY3RMZWZ0KSB7XG4gICAgICAgIHRoaXMuY2hlY2tDb21wYWN0TGVmdCgpO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLmdyaWRzdGVyLiRvcHRpb25zLmNvbXBhY3RUeXBlID09PSBDb21wYWN0VHlwZS5Db21wYWN0VXBBbmRMZWZ0KSB7XG4gICAgICAgIHRoaXMuY2hlY2tDb21wYWN0VXAoKTtcbiAgICAgICAgdGhpcy5jaGVja0NvbXBhY3RMZWZ0KCk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuZ3JpZHN0ZXIuJG9wdGlvbnMuY29tcGFjdFR5cGUgPT09IENvbXBhY3RUeXBlLkNvbXBhY3RMZWZ0QW5kVXApIHtcbiAgICAgICAgdGhpcy5jaGVja0NvbXBhY3RMZWZ0KCk7XG4gICAgICAgIHRoaXMuY2hlY2tDb21wYWN0VXAoKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5ncmlkc3Rlci4kb3B0aW9ucy5jb21wYWN0VHlwZSA9PT0gQ29tcGFjdFR5cGUuQ29tcGFjdFJpZ2h0KSB7XG4gICAgICAgIHRoaXMuY2hlY2tDb21wYWN0UmlnaHQoKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5ncmlkc3Rlci4kb3B0aW9ucy5jb21wYWN0VHlwZSA9PT0gQ29tcGFjdFR5cGUuQ29tcGFjdFVwQW5kUmlnaHQpIHtcbiAgICAgICAgdGhpcy5jaGVja0NvbXBhY3RVcCgpO1xuICAgICAgICB0aGlzLmNoZWNrQ29tcGFjdFJpZ2h0KCk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuZ3JpZHN0ZXIuJG9wdGlvbnMuY29tcGFjdFR5cGUgPT09IENvbXBhY3RUeXBlLkNvbXBhY3RSaWdodEFuZFVwKSB7XG4gICAgICAgIHRoaXMuY2hlY2tDb21wYWN0UmlnaHQoKTtcbiAgICAgICAgdGhpcy5jaGVja0NvbXBhY3RVcCgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGNoZWNrQ29tcGFjdEl0ZW0oaXRlbTogR3JpZHN0ZXJJdGVtKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZ3JpZHN0ZXIuJG9wdGlvbnMuY29tcGFjdFR5cGUgIT09IENvbXBhY3RUeXBlLk5vbmUpIHtcbiAgICAgIGlmICh0aGlzLmdyaWRzdGVyLiRvcHRpb25zLmNvbXBhY3RUeXBlID09PSBDb21wYWN0VHlwZS5Db21wYWN0VXApIHtcbiAgICAgICAgdGhpcy5tb3ZlVXBUaWxsQ29sbGlzaW9uKGl0ZW0pO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLmdyaWRzdGVyLiRvcHRpb25zLmNvbXBhY3RUeXBlID09PSBDb21wYWN0VHlwZS5Db21wYWN0TGVmdCkge1xuICAgICAgICB0aGlzLm1vdmVMZWZ0VGlsbENvbGxpc2lvbihpdGVtKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5ncmlkc3Rlci4kb3B0aW9ucy5jb21wYWN0VHlwZSA9PT0gQ29tcGFjdFR5cGUuQ29tcGFjdFVwQW5kTGVmdCkge1xuICAgICAgICB0aGlzLm1vdmVVcFRpbGxDb2xsaXNpb24oaXRlbSk7XG4gICAgICAgIHRoaXMubW92ZUxlZnRUaWxsQ29sbGlzaW9uKGl0ZW0pO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLmdyaWRzdGVyLiRvcHRpb25zLmNvbXBhY3RUeXBlID09PSBDb21wYWN0VHlwZS5Db21wYWN0TGVmdEFuZFVwKSB7XG4gICAgICAgIHRoaXMubW92ZUxlZnRUaWxsQ29sbGlzaW9uKGl0ZW0pO1xuICAgICAgICB0aGlzLm1vdmVVcFRpbGxDb2xsaXNpb24oaXRlbSk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuZ3JpZHN0ZXIuJG9wdGlvbnMuY29tcGFjdFR5cGUgPT09IENvbXBhY3RUeXBlLkNvbXBhY3RVcEFuZFJpZ2h0KSB7XG4gICAgICAgIHRoaXMubW92ZVVwVGlsbENvbGxpc2lvbihpdGVtKTtcbiAgICAgICAgdGhpcy5tb3ZlUmlnaHRUaWxsQ29sbGlzaW9uKGl0ZW0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGNoZWNrQ29tcGFjdFVwKCk6IHZvaWQge1xuICAgIGxldCB3aWRnZXRNb3ZlZFVwID0gZmFsc2UsIHdpZGdldDogR3JpZHN0ZXJJdGVtQ29tcG9uZW50SW50ZXJmYWNlLCBtb3ZlZDogYm9vbGVhbjtcbiAgICBjb25zdCBsID0gdGhpcy5ncmlkc3Rlci5ncmlkLmxlbmd0aDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGw7IGkrKykge1xuICAgICAgd2lkZ2V0ID0gdGhpcy5ncmlkc3Rlci5ncmlkW2ldO1xuICAgICAgaWYgKHdpZGdldC4kaXRlbS5jb21wYWN0RW5hYmxlZCA9PT0gZmFsc2UpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBtb3ZlZCA9IHRoaXMubW92ZVVwVGlsbENvbGxpc2lvbih3aWRnZXQuJGl0ZW0pO1xuICAgICAgaWYgKG1vdmVkKSB7XG4gICAgICAgIGxldCBvbGRJdGVtID0ge1xuICAgICAgICAgIHg6IHdpZGdldC5pdGVtLngsXG4gICAgICAgICAgeTogd2lkZ2V0Lml0ZW0ueSxcbiAgICAgICAgICByb3dzOiB3aWRnZXQuaXRlbS5yb3dzLFxuICAgICAgICAgIGNvbHM6IHdpZGdldC5pdGVtLmNvbHNcbiAgICAgICAgfTtcbiAgICAgICAgd2lkZ2V0TW92ZWRVcCA9IHRydWU7XG4gICAgICAgIHdpZGdldC5pdGVtLnkgPSB3aWRnZXQuJGl0ZW0ueTtcbiAgICAgICAgd2lkZ2V0Lml0ZW1DaGFuZ2VkKG9sZEl0ZW0pO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAod2lkZ2V0TW92ZWRVcCkge1xuICAgICAgdGhpcy5jaGVja0NvbXBhY3QoKTtcbiAgICB9XG4gIH1cblxuICBtb3ZlVXBUaWxsQ29sbGlzaW9uKGl0ZW06IEdyaWRzdGVySXRlbSk6IGJvb2xlYW4ge1xuICAgIGl0ZW0ueSAtPSAxO1xuICAgIGlmICh0aGlzLmdyaWRzdGVyLmNoZWNrQ29sbGlzaW9uKGl0ZW0pKSB7XG4gICAgICBpdGVtLnkgKz0gMTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5tb3ZlVXBUaWxsQ29sbGlzaW9uKGl0ZW0pO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG5cbiAgY2hlY2tDb21wYWN0TGVmdCgpOiB2b2lkIHtcbiAgICBsZXQgd2lkZ2V0TW92ZWRVcCA9IGZhbHNlLCB3aWRnZXQ6IEdyaWRzdGVySXRlbUNvbXBvbmVudEludGVyZmFjZSwgbW92ZWQ6IGJvb2xlYW47XG4gICAgY29uc3QgbCA9IHRoaXMuZ3JpZHN0ZXIuZ3JpZC5sZW5ndGg7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsOyBpKyspIHtcbiAgICAgIHdpZGdldCA9IHRoaXMuZ3JpZHN0ZXIuZ3JpZFtpXTtcbiAgICAgIGlmICh3aWRnZXQuJGl0ZW0uY29tcGFjdEVuYWJsZWQgPT09IGZhbHNlKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgbW92ZWQgPSB0aGlzLm1vdmVMZWZ0VGlsbENvbGxpc2lvbih3aWRnZXQuJGl0ZW0pO1xuICAgICAgaWYgKG1vdmVkKSB7XG4gICAgICAgIGxldCBvbGRJdGVtID0ge1xuICAgICAgICAgIHg6IHdpZGdldC5pdGVtLngsXG4gICAgICAgICAgeTogd2lkZ2V0Lml0ZW0ueSxcbiAgICAgICAgICByb3dzOiB3aWRnZXQuaXRlbS5yb3dzLFxuICAgICAgICAgIGNvbHM6IHdpZGdldC5pdGVtLmNvbHNcbiAgICAgICAgfTtcbiAgICAgICAgd2lkZ2V0TW92ZWRVcCA9IHRydWU7XG4gICAgICAgIHdpZGdldC5pdGVtLnggPSB3aWRnZXQuJGl0ZW0ueDtcbiAgICAgICAgd2lkZ2V0Lml0ZW1DaGFuZ2VkKG9sZEl0ZW0pO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAod2lkZ2V0TW92ZWRVcCkge1xuICAgICAgdGhpcy5jaGVja0NvbXBhY3QoKTtcbiAgICB9XG4gIH1cblxuICBjaGVja0NvbXBhY3RSaWdodCgpOiB2b2lkIHtcbiAgICBsZXQgd2lkZ2V0TW92ZWRVcCA9IGZhbHNlLCB3aWRnZXQ6IEdyaWRzdGVySXRlbUNvbXBvbmVudEludGVyZmFjZSwgbW92ZWQ6IGJvb2xlYW47XG4gICAgY29uc3QgbCA9IHRoaXMuZ3JpZHN0ZXIuZ3JpZC5sZW5ndGg7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsOyBpKyspIHtcbiAgICAgIHdpZGdldCA9IHRoaXMuZ3JpZHN0ZXIuZ3JpZFtpXTtcbiAgICAgIGlmICh3aWRnZXQuJGl0ZW0uY29tcGFjdEVuYWJsZWQgPT09IGZhbHNlKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgbW92ZWQgPSB0aGlzLm1vdmVSaWdodFRpbGxDb2xsaXNpb24od2lkZ2V0LiRpdGVtKTtcbiAgICAgIGlmIChtb3ZlZCkge1xuICAgICAgICBsZXQgb2xkSXRlbSA9IHtcbiAgICAgICAgICB4OiB3aWRnZXQuaXRlbS54LFxuICAgICAgICAgIHk6IHdpZGdldC5pdGVtLnksXG4gICAgICAgICAgcm93czogd2lkZ2V0Lml0ZW0ucm93cyxcbiAgICAgICAgICBjb2xzOiB3aWRnZXQuaXRlbS5jb2xzXG4gICAgICAgIH07XG4gICAgICAgIHdpZGdldE1vdmVkVXAgPSB0cnVlO1xuICAgICAgICB3aWRnZXQuaXRlbS54ID0gd2lkZ2V0LiRpdGVtLng7XG4gICAgICAgIHdpZGdldC5pdGVtQ2hhbmdlZChvbGRJdGVtKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHdpZGdldE1vdmVkVXApIHtcbiAgICAgIHRoaXMuY2hlY2tDb21wYWN0KCk7XG4gICAgfVxuICB9XG5cbiAgbW92ZUxlZnRUaWxsQ29sbGlzaW9uKGl0ZW06IEdyaWRzdGVySXRlbSk6IGJvb2xlYW4ge1xuICAgIGl0ZW0ueCAtPSAxO1xuICAgIGlmICh0aGlzLmdyaWRzdGVyLmNoZWNrQ29sbGlzaW9uKGl0ZW0pKSB7XG4gICAgICBpdGVtLnggKz0gMTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5tb3ZlTGVmdFRpbGxDb2xsaXNpb24oaXRlbSk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBtb3ZlUmlnaHRUaWxsQ29sbGlzaW9uKGl0ZW0pIHtcbiAgICBpdGVtLnggKz0gMTtcbiAgICBpZiAodGhpcy5ncmlkc3Rlci5jaGVja0NvbGxpc2lvbihpdGVtKSkge1xuICAgICAgaXRlbS54IC09IDE7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubW92ZVJpZ2h0VGlsbENvbGxpc2lvbihpdGVtKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxufVxuIl19
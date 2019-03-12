/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { CompactType, DisplayGrid, GridType } from './gridsterConfig.interface';
/** @type {?} */
export var GridsterConfigService = {
    gridType: GridType.Fit,
    // 'fit' will fit the items in the container without scroll;
    // 'scrollVertical' will fit on width and height of the items will be the same as the width
    // 'scrollHorizontal' will fit on height and width of the items will be the same as the height
    // 'fixed' will set the rows and columns dimensions based on fixedColWidth and fixedRowHeight options
    // 'verticalFixed' will set the rows to fixedRowHeight and columns width will fit the space available
    // 'horizontalFixed' will set the columns to fixedColWidth and rows height will fit the space available
    fixedColWidth: 250,
    // fixed col width for gridType: 'fixed'
    fixedRowHeight: 250,
    // fixed row height for gridType: 'fixed'
    keepFixedHeightInMobile: false,
    // keep the height from fixed gridType in mobile layout
    keepFixedWidthInMobile: false,
    // keep the width from fixed gridType in mobile layout
    setGridSize: false,
    // sets grid size depending on content
    compactType: CompactType.None,
    // compact items: 'none' | 'compactUp' | 'compactLeft' | 'compactUp&Left' | 'compactLeft&Up'
    mobileBreakpoint: 640,
    // if the screen is not wider that this, remove the grid layout and stack the items
    minCols: 1,
    // minimum amount of columns in the grid
    maxCols: 100,
    // maximum amount of columns in the grid
    minRows: 1,
    // minimum amount of rows in the grid
    maxRows: 100,
    // maximum amount of rows in the grid
    defaultItemCols: 1,
    // default width of an item in columns
    defaultItemRows: 1,
    // default height of an item in rows
    maxItemCols: 50,
    // max item number of cols
    maxItemRows: 50,
    // max item number of rows
    minItemCols: 1,
    // min item number of columns
    minItemRows: 1,
    // min item number of rows
    minItemArea: 1,
    // min item area: cols * rows
    maxItemArea: 2500,
    // max item area: cols * rows
    margin: 10,
    // margin between grid items
    outerMargin: true,
    // if margins will apply to the sides of the container
    outerMarginTop: null,
    // override outer margin for grid
    outerMarginRight: null,
    // override outer margin for grid
    outerMarginBottom: null,
    // override outer margin for grid
    outerMarginLeft: null,
    // override outer margin for grid
    useTransformPositioning: true,
    // toggle between transform or top/left positioning of items
    scrollSensitivity: 10,
    // margin of the dashboard where to start scrolling
    scrollSpeed: 20,
    // how much to scroll each mouse move when in the scrollSensitivity zone
    initCallback: undefined,
    // callback to call after grid has initialized. Arguments: gridsterComponent
    destroyCallback: undefined,
    // callback to call after grid has destroyed. Arguments: gridsterComponent
    gridSizeChangedCallback: undefined,
    // callback to call after grid has changed size. Arguments: gridsterComponent
    itemChangeCallback: undefined,
    // callback to call for each item when is changes x, y, rows, cols.
    // Arguments: gridsterItem, gridsterItemComponent
    itemResizeCallback: undefined,
    // callback to call for each item when width/height changes.
    // Arguments: gridsterItem, gridsterItemComponent
    itemInitCallback: undefined,
    // callback to call for each item when is initialized.
    // Arguments: gridsterItem, gridsterItemComponent
    itemRemovedCallback: undefined,
    // callback to call for each item when is initialized.
    // Arguments: gridsterItem, gridsterItemComponent
    itemValidateCallback: undefined,
    // callback to call to validate item position/size. Return true if valid.
    // Arguments: gridsterItem
    enableEmptyCellClick: false,
    // enable empty cell click events
    enableEmptyCellContextMenu: false,
    // enable empty cell context menu (right click) events
    enableEmptyCellDrop: false,
    // enable empty cell drop events
    enableEmptyCellDrag: false,
    // enable empty cell drag events
    emptyCellClickCallback: undefined,
    // empty cell click callback
    emptyCellContextMenuCallback: undefined,
    // empty cell context menu (right click) callback
    emptyCellDropCallback: undefined,
    // empty cell drag drop callback. HTML5 Drag & Drop
    emptyCellDragCallback: undefined,
    // empty cell drag and create item like excel cell selection
    emptyCellDragMaxCols: 50,
    // limit empty cell drag max cols
    emptyCellDragMaxRows: 50,
    // limit empty cell drag max rows
    // Arguments: event, gridsterItem{x, y, rows: defaultItemRows, cols: defaultItemCols}
    ignoreMarginInRow: false,
    // ignore the gap between rows for items which span multiple rows (see #162, #224)
    draggable: {
        delayStart: 0,
        // milliseconds to delay the start of drag, useful for touch interaction
        enabled: false,
        // enable/disable draggable items
        ignoreContentClass: 'gridster-item-content',
        // default content class to ignore the drag event from
        ignoreContent: false,
        // if true drag will start only from elements from `dragHandleClass`
        dragHandleClass: 'drag-handler',
        // drag event only from this class. If `ignoreContent` is true.
        stop: undefined,
        // callback when dragging an item stops.  Accepts Promise return to cancel/approve drag.
        start: undefined,
        // callback when dragging an item starts.
        // Arguments: item, gridsterItem, event
        dropOverItems: false,
        // enable drop items on top other item
        dropOverItemsCallback: undefined // callback on drop over another item
        // Arguments: source, target, gridComponent
    },
    resizable: {
        delayStart: 0,
        // milliseconds to delay the start of resize, useful for touch interaction
        enabled: false,
        // enable/disable resizable items
        handles: {
            s: true,
            e: true,
            n: true,
            w: true,
            se: true,
            ne: true,
            sw: true,
            nw: true
        },
        // resizable edges of an item
        stop: undefined,
        // callback when resizing an item stops. Accepts Promise return to cancel/approve resize.
        start: undefined // callback when resizing an item starts.
        // Arguments: item, gridsterItem, event
    },
    swap: true,
    // allow items to switch position if drop on top of another
    pushItems: false,
    // push items when resizing and dragging
    disablePushOnDrag: false,
    // disable push on drag
    disablePushOnResize: false,
    // disable push on resize
    pushDirections: { north: true, east: true, south: true, west: true },
    // control the directions items are pushed
    pushResizeItems: false,
    // on resize of item will shrink adjacent items
    displayGrid: DisplayGrid.OnDragAndResize,
    // display background grid of rows and columns
    disableWindowResize: false,
    // disable the window on resize listener. This will stop grid to recalculate on window resize.
    disableWarnings: false,
    // disable console log warnings about misplacement of grid items
    scrollToNewItems: false,
    // scroll to new items placed in a scrollable view
    disableAutoPositionOnConflict: false // disable auto-position of items on conflict state
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZHN0ZXJDb25maWcuY29uc3RhbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWdyaWRzdGVyMi8iLCJzb3VyY2VzIjpbImxpYi9ncmlkc3RlckNvbmZpZy5jb25zdGFudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFdBQVcsRUFBRSxXQUFXLEVBQWtCLFFBQVEsRUFBQyxNQUFNLDRCQUE0QixDQUFDOztBQUU5RixNQUFNLEtBQU8scUJBQXFCLEdBQW1CO0lBQ25ELFFBQVEsRUFBRSxRQUFRLENBQUMsR0FBRzs7Ozs7OztJQU10QixhQUFhLEVBQUUsR0FBRzs7SUFDbEIsY0FBYyxFQUFFLEdBQUc7O0lBQ25CLHVCQUF1QixFQUFFLEtBQUs7O0lBQzlCLHNCQUFzQixFQUFFLEtBQUs7O0lBQzdCLFdBQVcsRUFBRSxLQUFLOztJQUNsQixXQUFXLEVBQUUsV0FBVyxDQUFDLElBQUk7O0lBQzdCLGdCQUFnQixFQUFFLEdBQUc7O0lBQ3JCLE9BQU8sRUFBRSxDQUFDOztJQUNWLE9BQU8sRUFBRSxHQUFHOztJQUNaLE9BQU8sRUFBRSxDQUFDOztJQUNWLE9BQU8sRUFBRSxHQUFHOztJQUNaLGVBQWUsRUFBRSxDQUFDOztJQUNsQixlQUFlLEVBQUUsQ0FBQzs7SUFDbEIsV0FBVyxFQUFFLEVBQUU7O0lBQ2YsV0FBVyxFQUFFLEVBQUU7O0lBQ2YsV0FBVyxFQUFFLENBQUM7O0lBQ2QsV0FBVyxFQUFFLENBQUM7O0lBQ2QsV0FBVyxFQUFFLENBQUM7O0lBQ2QsV0FBVyxFQUFFLElBQUk7O0lBQ2pCLE1BQU0sRUFBRSxFQUFFOztJQUNWLFdBQVcsRUFBRSxJQUFJOztJQUNqQixjQUFjLEVBQUUsSUFBSTs7SUFDcEIsZ0JBQWdCLEVBQUUsSUFBSTs7SUFDdEIsaUJBQWlCLEVBQUUsSUFBSTs7SUFDdkIsZUFBZSxFQUFFLElBQUk7O0lBQ3JCLHVCQUF1QixFQUFFLElBQUk7O0lBQzdCLGlCQUFpQixFQUFFLEVBQUU7O0lBQ3JCLFdBQVcsRUFBRSxFQUFFOztJQUNmLFlBQVksRUFBRSxTQUFTOztJQUN2QixlQUFlLEVBQUUsU0FBUzs7SUFDMUIsdUJBQXVCLEVBQUUsU0FBUzs7SUFDbEMsa0JBQWtCLEVBQUUsU0FBUzs7O0lBRTdCLGtCQUFrQixFQUFFLFNBQVM7OztJQUU3QixnQkFBZ0IsRUFBRSxTQUFTOzs7SUFFM0IsbUJBQW1CLEVBQUUsU0FBUzs7O0lBRTlCLG9CQUFvQixFQUFFLFNBQVM7OztJQUUvQixvQkFBb0IsRUFBRSxLQUFLOztJQUMzQiwwQkFBMEIsRUFBRSxLQUFLOztJQUNqQyxtQkFBbUIsRUFBRSxLQUFLOztJQUMxQixtQkFBbUIsRUFBRSxLQUFLOztJQUMxQixzQkFBc0IsRUFBRSxTQUFTOztJQUNqQyw0QkFBNEIsRUFBRSxTQUFTOztJQUN2QyxxQkFBcUIsRUFBRSxTQUFTOztJQUNoQyxxQkFBcUIsRUFBRSxTQUFTOztJQUNoQyxvQkFBb0IsRUFBRSxFQUFFOztJQUN4QixvQkFBb0IsRUFBRSxFQUFFOzs7SUFFeEIsaUJBQWlCLEVBQUUsS0FBSzs7SUFDeEIsU0FBUyxFQUFFO1FBQ1QsVUFBVSxFQUFFLENBQUM7O1FBQ2IsT0FBTyxFQUFFLEtBQUs7O1FBQ2Qsa0JBQWtCLEVBQUUsdUJBQXVCOztRQUMzQyxhQUFhLEVBQUUsS0FBSzs7UUFDcEIsZUFBZSxFQUFFLGNBQWM7O1FBQy9CLElBQUksRUFBRSxTQUFTOztRQUNmLEtBQUssRUFBRSxTQUFTOzs7UUFFaEIsYUFBYSxFQUFFLEtBQUs7O1FBQ3BCLHFCQUFxQixFQUFFLFNBQVMsQ0FBQyxxQ0FBcUM7UUFDdEUsMkNBQTJDO0tBQzVDO0lBQ0QsU0FBUyxFQUFFO1FBQ1QsVUFBVSxFQUFFLENBQUM7O1FBQ2IsT0FBTyxFQUFFLEtBQUs7O1FBQ2QsT0FBTyxFQUFFO1lBQ1AsQ0FBQyxFQUFFLElBQUk7WUFDUCxDQUFDLEVBQUUsSUFBSTtZQUNQLENBQUMsRUFBRSxJQUFJO1lBQ1AsQ0FBQyxFQUFFLElBQUk7WUFDUCxFQUFFLEVBQUUsSUFBSTtZQUNSLEVBQUUsRUFBRSxJQUFJO1lBQ1IsRUFBRSxFQUFFLElBQUk7WUFDUixFQUFFLEVBQUUsSUFBSTtTQUNUOztRQUNELElBQUksRUFBRSxTQUFTOztRQUNmLEtBQUssRUFBRSxTQUFTLENBQUMseUNBQXlDO1FBQzFELHVDQUF1QztLQUN4QztJQUNELElBQUksRUFBRSxJQUFJOztJQUNWLFNBQVMsRUFBRSxLQUFLOztJQUNoQixpQkFBaUIsRUFBRSxLQUFLOztJQUN4QixtQkFBbUIsRUFBRSxLQUFLOztJQUMxQixjQUFjLEVBQUUsRUFBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFDOztJQUNsRSxlQUFlLEVBQUUsS0FBSzs7SUFDdEIsV0FBVyxFQUFFLFdBQVcsQ0FBQyxlQUFlOztJQUN4QyxtQkFBbUIsRUFBRSxLQUFLOztJQUMxQixlQUFlLEVBQUUsS0FBSzs7SUFDdEIsZ0JBQWdCLEVBQUUsS0FBSzs7SUFDdkIsNkJBQTZCLEVBQUUsS0FBSyxDQUFFLG1EQUFtRDtDQUMxRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcGFjdFR5cGUsIERpc3BsYXlHcmlkLCBHcmlkc3RlckNvbmZpZywgR3JpZFR5cGV9IGZyb20gJy4vZ3JpZHN0ZXJDb25maWcuaW50ZXJmYWNlJztcblxuZXhwb3J0IGNvbnN0IEdyaWRzdGVyQ29uZmlnU2VydmljZTogR3JpZHN0ZXJDb25maWcgPSB7XG4gIGdyaWRUeXBlOiBHcmlkVHlwZS5GaXQsIC8vICdmaXQnIHdpbGwgZml0IHRoZSBpdGVtcyBpbiB0aGUgY29udGFpbmVyIHdpdGhvdXQgc2Nyb2xsO1xuICAvLyAnc2Nyb2xsVmVydGljYWwnIHdpbGwgZml0IG9uIHdpZHRoIGFuZCBoZWlnaHQgb2YgdGhlIGl0ZW1zIHdpbGwgYmUgdGhlIHNhbWUgYXMgdGhlIHdpZHRoXG4gIC8vICdzY3JvbGxIb3Jpem9udGFsJyB3aWxsIGZpdCBvbiBoZWlnaHQgYW5kIHdpZHRoIG9mIHRoZSBpdGVtcyB3aWxsIGJlIHRoZSBzYW1lIGFzIHRoZSBoZWlnaHRcbiAgLy8gJ2ZpeGVkJyB3aWxsIHNldCB0aGUgcm93cyBhbmQgY29sdW1ucyBkaW1lbnNpb25zIGJhc2VkIG9uIGZpeGVkQ29sV2lkdGggYW5kIGZpeGVkUm93SGVpZ2h0IG9wdGlvbnNcbiAgLy8gJ3ZlcnRpY2FsRml4ZWQnIHdpbGwgc2V0IHRoZSByb3dzIHRvIGZpeGVkUm93SGVpZ2h0IGFuZCBjb2x1bW5zIHdpZHRoIHdpbGwgZml0IHRoZSBzcGFjZSBhdmFpbGFibGVcbiAgLy8gJ2hvcml6b250YWxGaXhlZCcgd2lsbCBzZXQgdGhlIGNvbHVtbnMgdG8gZml4ZWRDb2xXaWR0aCBhbmQgcm93cyBoZWlnaHQgd2lsbCBmaXQgdGhlIHNwYWNlIGF2YWlsYWJsZVxuICBmaXhlZENvbFdpZHRoOiAyNTAsIC8vIGZpeGVkIGNvbCB3aWR0aCBmb3IgZ3JpZFR5cGU6ICdmaXhlZCdcbiAgZml4ZWRSb3dIZWlnaHQ6IDI1MCwgLy8gZml4ZWQgcm93IGhlaWdodCBmb3IgZ3JpZFR5cGU6ICdmaXhlZCdcbiAga2VlcEZpeGVkSGVpZ2h0SW5Nb2JpbGU6IGZhbHNlLCAvLyBrZWVwIHRoZSBoZWlnaHQgZnJvbSBmaXhlZCBncmlkVHlwZSBpbiBtb2JpbGUgbGF5b3V0XG4gIGtlZXBGaXhlZFdpZHRoSW5Nb2JpbGU6IGZhbHNlLCAvLyBrZWVwIHRoZSB3aWR0aCBmcm9tIGZpeGVkIGdyaWRUeXBlIGluIG1vYmlsZSBsYXlvdXRcbiAgc2V0R3JpZFNpemU6IGZhbHNlLCAvLyBzZXRzIGdyaWQgc2l6ZSBkZXBlbmRpbmcgb24gY29udGVudFxuICBjb21wYWN0VHlwZTogQ29tcGFjdFR5cGUuTm9uZSwgLy8gY29tcGFjdCBpdGVtczogJ25vbmUnIHwgJ2NvbXBhY3RVcCcgfCAnY29tcGFjdExlZnQnIHwgJ2NvbXBhY3RVcCZMZWZ0JyB8ICdjb21wYWN0TGVmdCZVcCdcbiAgbW9iaWxlQnJlYWtwb2ludDogNjQwLCAvLyBpZiB0aGUgc2NyZWVuIGlzIG5vdCB3aWRlciB0aGF0IHRoaXMsIHJlbW92ZSB0aGUgZ3JpZCBsYXlvdXQgYW5kIHN0YWNrIHRoZSBpdGVtc1xuICBtaW5Db2xzOiAxLCAvLyBtaW5pbXVtIGFtb3VudCBvZiBjb2x1bW5zIGluIHRoZSBncmlkXG4gIG1heENvbHM6IDEwMCwgLy8gbWF4aW11bSBhbW91bnQgb2YgY29sdW1ucyBpbiB0aGUgZ3JpZFxuICBtaW5Sb3dzOiAxLCAvLyBtaW5pbXVtIGFtb3VudCBvZiByb3dzIGluIHRoZSBncmlkXG4gIG1heFJvd3M6IDEwMCwgLy8gbWF4aW11bSBhbW91bnQgb2Ygcm93cyBpbiB0aGUgZ3JpZFxuICBkZWZhdWx0SXRlbUNvbHM6IDEsIC8vIGRlZmF1bHQgd2lkdGggb2YgYW4gaXRlbSBpbiBjb2x1bW5zXG4gIGRlZmF1bHRJdGVtUm93czogMSwgLy8gZGVmYXVsdCBoZWlnaHQgb2YgYW4gaXRlbSBpbiByb3dzXG4gIG1heEl0ZW1Db2xzOiA1MCwgLy8gbWF4IGl0ZW0gbnVtYmVyIG9mIGNvbHNcbiAgbWF4SXRlbVJvd3M6IDUwLCAvLyBtYXggaXRlbSBudW1iZXIgb2Ygcm93c1xuICBtaW5JdGVtQ29sczogMSwgLy8gbWluIGl0ZW0gbnVtYmVyIG9mIGNvbHVtbnNcbiAgbWluSXRlbVJvd3M6IDEsIC8vIG1pbiBpdGVtIG51bWJlciBvZiByb3dzXG4gIG1pbkl0ZW1BcmVhOiAxLCAvLyBtaW4gaXRlbSBhcmVhOiBjb2xzICogcm93c1xuICBtYXhJdGVtQXJlYTogMjUwMCwgLy8gbWF4IGl0ZW0gYXJlYTogY29scyAqIHJvd3NcbiAgbWFyZ2luOiAxMCwgIC8vIG1hcmdpbiBiZXR3ZWVuIGdyaWQgaXRlbXNcbiAgb3V0ZXJNYXJnaW46IHRydWUsICAvLyBpZiBtYXJnaW5zIHdpbGwgYXBwbHkgdG8gdGhlIHNpZGVzIG9mIHRoZSBjb250YWluZXJcbiAgb3V0ZXJNYXJnaW5Ub3A6IG51bGwsIC8vIG92ZXJyaWRlIG91dGVyIG1hcmdpbiBmb3IgZ3JpZFxuICBvdXRlck1hcmdpblJpZ2h0OiBudWxsLCAvLyBvdmVycmlkZSBvdXRlciBtYXJnaW4gZm9yIGdyaWRcbiAgb3V0ZXJNYXJnaW5Cb3R0b206IG51bGwsIC8vIG92ZXJyaWRlIG91dGVyIG1hcmdpbiBmb3IgZ3JpZFxuICBvdXRlck1hcmdpbkxlZnQ6IG51bGwsIC8vIG92ZXJyaWRlIG91dGVyIG1hcmdpbiBmb3IgZ3JpZFxuICB1c2VUcmFuc2Zvcm1Qb3NpdGlvbmluZzogdHJ1ZSwgLy8gdG9nZ2xlIGJldHdlZW4gdHJhbnNmb3JtIG9yIHRvcC9sZWZ0IHBvc2l0aW9uaW5nIG9mIGl0ZW1zXG4gIHNjcm9sbFNlbnNpdGl2aXR5OiAxMCwgIC8vIG1hcmdpbiBvZiB0aGUgZGFzaGJvYXJkIHdoZXJlIHRvIHN0YXJ0IHNjcm9sbGluZ1xuICBzY3JvbGxTcGVlZDogMjAsICAvLyBob3cgbXVjaCB0byBzY3JvbGwgZWFjaCBtb3VzZSBtb3ZlIHdoZW4gaW4gdGhlIHNjcm9sbFNlbnNpdGl2aXR5IHpvbmVcbiAgaW5pdENhbGxiYWNrOiB1bmRlZmluZWQsIC8vIGNhbGxiYWNrIHRvIGNhbGwgYWZ0ZXIgZ3JpZCBoYXMgaW5pdGlhbGl6ZWQuIEFyZ3VtZW50czogZ3JpZHN0ZXJDb21wb25lbnRcbiAgZGVzdHJveUNhbGxiYWNrOiB1bmRlZmluZWQsIC8vIGNhbGxiYWNrIHRvIGNhbGwgYWZ0ZXIgZ3JpZCBoYXMgZGVzdHJveWVkLiBBcmd1bWVudHM6IGdyaWRzdGVyQ29tcG9uZW50XG4gIGdyaWRTaXplQ2hhbmdlZENhbGxiYWNrOiB1bmRlZmluZWQsIC8vIGNhbGxiYWNrIHRvIGNhbGwgYWZ0ZXIgZ3JpZCBoYXMgY2hhbmdlZCBzaXplLiBBcmd1bWVudHM6IGdyaWRzdGVyQ29tcG9uZW50XG4gIGl0ZW1DaGFuZ2VDYWxsYmFjazogdW5kZWZpbmVkLCAgLy8gY2FsbGJhY2sgdG8gY2FsbCBmb3IgZWFjaCBpdGVtIHdoZW4gaXMgY2hhbmdlcyB4LCB5LCByb3dzLCBjb2xzLlxuICAvLyBBcmd1bWVudHM6IGdyaWRzdGVySXRlbSwgZ3JpZHN0ZXJJdGVtQ29tcG9uZW50XG4gIGl0ZW1SZXNpemVDYWxsYmFjazogdW5kZWZpbmVkLCAgLy8gY2FsbGJhY2sgdG8gY2FsbCBmb3IgZWFjaCBpdGVtIHdoZW4gd2lkdGgvaGVpZ2h0IGNoYW5nZXMuXG4gIC8vIEFyZ3VtZW50czogZ3JpZHN0ZXJJdGVtLCBncmlkc3Rlckl0ZW1Db21wb25lbnRcbiAgaXRlbUluaXRDYWxsYmFjazogdW5kZWZpbmVkLCAgLy8gY2FsbGJhY2sgdG8gY2FsbCBmb3IgZWFjaCBpdGVtIHdoZW4gaXMgaW5pdGlhbGl6ZWQuXG4gIC8vIEFyZ3VtZW50czogZ3JpZHN0ZXJJdGVtLCBncmlkc3Rlckl0ZW1Db21wb25lbnRcbiAgaXRlbVJlbW92ZWRDYWxsYmFjazogdW5kZWZpbmVkLCAgLy8gY2FsbGJhY2sgdG8gY2FsbCBmb3IgZWFjaCBpdGVtIHdoZW4gaXMgaW5pdGlhbGl6ZWQuXG4gIC8vIEFyZ3VtZW50czogZ3JpZHN0ZXJJdGVtLCBncmlkc3Rlckl0ZW1Db21wb25lbnRcbiAgaXRlbVZhbGlkYXRlQ2FsbGJhY2s6IHVuZGVmaW5lZCwgIC8vIGNhbGxiYWNrIHRvIGNhbGwgdG8gdmFsaWRhdGUgaXRlbSBwb3NpdGlvbi9zaXplLiBSZXR1cm4gdHJ1ZSBpZiB2YWxpZC5cbiAgLy8gQXJndW1lbnRzOiBncmlkc3Rlckl0ZW1cbiAgZW5hYmxlRW1wdHlDZWxsQ2xpY2s6IGZhbHNlLCAvLyBlbmFibGUgZW1wdHkgY2VsbCBjbGljayBldmVudHNcbiAgZW5hYmxlRW1wdHlDZWxsQ29udGV4dE1lbnU6IGZhbHNlLCAvLyBlbmFibGUgZW1wdHkgY2VsbCBjb250ZXh0IG1lbnUgKHJpZ2h0IGNsaWNrKSBldmVudHNcbiAgZW5hYmxlRW1wdHlDZWxsRHJvcDogZmFsc2UsIC8vIGVuYWJsZSBlbXB0eSBjZWxsIGRyb3AgZXZlbnRzXG4gIGVuYWJsZUVtcHR5Q2VsbERyYWc6IGZhbHNlLCAvLyBlbmFibGUgZW1wdHkgY2VsbCBkcmFnIGV2ZW50c1xuICBlbXB0eUNlbGxDbGlja0NhbGxiYWNrOiB1bmRlZmluZWQsIC8vIGVtcHR5IGNlbGwgY2xpY2sgY2FsbGJhY2tcbiAgZW1wdHlDZWxsQ29udGV4dE1lbnVDYWxsYmFjazogdW5kZWZpbmVkLCAvLyBlbXB0eSBjZWxsIGNvbnRleHQgbWVudSAocmlnaHQgY2xpY2spIGNhbGxiYWNrXG4gIGVtcHR5Q2VsbERyb3BDYWxsYmFjazogdW5kZWZpbmVkLCAvLyBlbXB0eSBjZWxsIGRyYWcgZHJvcCBjYWxsYmFjay4gSFRNTDUgRHJhZyAmIERyb3BcbiAgZW1wdHlDZWxsRHJhZ0NhbGxiYWNrOiB1bmRlZmluZWQsIC8vIGVtcHR5IGNlbGwgZHJhZyBhbmQgY3JlYXRlIGl0ZW0gbGlrZSBleGNlbCBjZWxsIHNlbGVjdGlvblxuICBlbXB0eUNlbGxEcmFnTWF4Q29sczogNTAsIC8vIGxpbWl0IGVtcHR5IGNlbGwgZHJhZyBtYXggY29sc1xuICBlbXB0eUNlbGxEcmFnTWF4Um93czogNTAsIC8vIGxpbWl0IGVtcHR5IGNlbGwgZHJhZyBtYXggcm93c1xuICAvLyBBcmd1bWVudHM6IGV2ZW50LCBncmlkc3Rlckl0ZW17eCwgeSwgcm93czogZGVmYXVsdEl0ZW1Sb3dzLCBjb2xzOiBkZWZhdWx0SXRlbUNvbHN9XG4gIGlnbm9yZU1hcmdpbkluUm93OiBmYWxzZSwgLy8gaWdub3JlIHRoZSBnYXAgYmV0d2VlbiByb3dzIGZvciBpdGVtcyB3aGljaCBzcGFuIG11bHRpcGxlIHJvd3MgKHNlZSAjMTYyLCAjMjI0KVxuICBkcmFnZ2FibGU6IHtcbiAgICBkZWxheVN0YXJ0OiAwLCAvLyBtaWxsaXNlY29uZHMgdG8gZGVsYXkgdGhlIHN0YXJ0IG9mIGRyYWcsIHVzZWZ1bCBmb3IgdG91Y2ggaW50ZXJhY3Rpb25cbiAgICBlbmFibGVkOiBmYWxzZSwgLy8gZW5hYmxlL2Rpc2FibGUgZHJhZ2dhYmxlIGl0ZW1zXG4gICAgaWdub3JlQ29udGVudENsYXNzOiAnZ3JpZHN0ZXItaXRlbS1jb250ZW50JywgLy8gZGVmYXVsdCBjb250ZW50IGNsYXNzIHRvIGlnbm9yZSB0aGUgZHJhZyBldmVudCBmcm9tXG4gICAgaWdub3JlQ29udGVudDogZmFsc2UsIC8vIGlmIHRydWUgZHJhZyB3aWxsIHN0YXJ0IG9ubHkgZnJvbSBlbGVtZW50cyBmcm9tIGBkcmFnSGFuZGxlQ2xhc3NgXG4gICAgZHJhZ0hhbmRsZUNsYXNzOiAnZHJhZy1oYW5kbGVyJywgLy8gZHJhZyBldmVudCBvbmx5IGZyb20gdGhpcyBjbGFzcy4gSWYgYGlnbm9yZUNvbnRlbnRgIGlzIHRydWUuXG4gICAgc3RvcDogdW5kZWZpbmVkLCAvLyBjYWxsYmFjayB3aGVuIGRyYWdnaW5nIGFuIGl0ZW0gc3RvcHMuICBBY2NlcHRzIFByb21pc2UgcmV0dXJuIHRvIGNhbmNlbC9hcHByb3ZlIGRyYWcuXG4gICAgc3RhcnQ6IHVuZGVmaW5lZCwgLy8gY2FsbGJhY2sgd2hlbiBkcmFnZ2luZyBhbiBpdGVtIHN0YXJ0cy5cbiAgICAvLyBBcmd1bWVudHM6IGl0ZW0sIGdyaWRzdGVySXRlbSwgZXZlbnRcbiAgICBkcm9wT3Zlckl0ZW1zOiBmYWxzZSwgLy8gZW5hYmxlIGRyb3AgaXRlbXMgb24gdG9wIG90aGVyIGl0ZW1cbiAgICBkcm9wT3Zlckl0ZW1zQ2FsbGJhY2s6IHVuZGVmaW5lZCAvLyBjYWxsYmFjayBvbiBkcm9wIG92ZXIgYW5vdGhlciBpdGVtXG4gICAgLy8gQXJndW1lbnRzOiBzb3VyY2UsIHRhcmdldCwgZ3JpZENvbXBvbmVudFxuICB9LFxuICByZXNpemFibGU6IHtcbiAgICBkZWxheVN0YXJ0OiAwLCAvLyBtaWxsaXNlY29uZHMgdG8gZGVsYXkgdGhlIHN0YXJ0IG9mIHJlc2l6ZSwgdXNlZnVsIGZvciB0b3VjaCBpbnRlcmFjdGlvblxuICAgIGVuYWJsZWQ6IGZhbHNlLCAvLyBlbmFibGUvZGlzYWJsZSByZXNpemFibGUgaXRlbXNcbiAgICBoYW5kbGVzOiB7XG4gICAgICBzOiB0cnVlLFxuICAgICAgZTogdHJ1ZSxcbiAgICAgIG46IHRydWUsXG4gICAgICB3OiB0cnVlLFxuICAgICAgc2U6IHRydWUsXG4gICAgICBuZTogdHJ1ZSxcbiAgICAgIHN3OiB0cnVlLFxuICAgICAgbnc6IHRydWVcbiAgICB9LCAvLyByZXNpemFibGUgZWRnZXMgb2YgYW4gaXRlbVxuICAgIHN0b3A6IHVuZGVmaW5lZCwgLy8gY2FsbGJhY2sgd2hlbiByZXNpemluZyBhbiBpdGVtIHN0b3BzLiBBY2NlcHRzIFByb21pc2UgcmV0dXJuIHRvIGNhbmNlbC9hcHByb3ZlIHJlc2l6ZS5cbiAgICBzdGFydDogdW5kZWZpbmVkIC8vIGNhbGxiYWNrIHdoZW4gcmVzaXppbmcgYW4gaXRlbSBzdGFydHMuXG4gICAgLy8gQXJndW1lbnRzOiBpdGVtLCBncmlkc3Rlckl0ZW0sIGV2ZW50XG4gIH0sXG4gIHN3YXA6IHRydWUsIC8vIGFsbG93IGl0ZW1zIHRvIHN3aXRjaCBwb3NpdGlvbiBpZiBkcm9wIG9uIHRvcCBvZiBhbm90aGVyXG4gIHB1c2hJdGVtczogZmFsc2UsIC8vIHB1c2ggaXRlbXMgd2hlbiByZXNpemluZyBhbmQgZHJhZ2dpbmdcbiAgZGlzYWJsZVB1c2hPbkRyYWc6IGZhbHNlLCAvLyBkaXNhYmxlIHB1c2ggb24gZHJhZ1xuICBkaXNhYmxlUHVzaE9uUmVzaXplOiBmYWxzZSwgLy8gZGlzYWJsZSBwdXNoIG9uIHJlc2l6ZVxuICBwdXNoRGlyZWN0aW9uczoge25vcnRoOiB0cnVlLCBlYXN0OiB0cnVlLCBzb3V0aDogdHJ1ZSwgd2VzdDogdHJ1ZX0sIC8vIGNvbnRyb2wgdGhlIGRpcmVjdGlvbnMgaXRlbXMgYXJlIHB1c2hlZFxuICBwdXNoUmVzaXplSXRlbXM6IGZhbHNlLCAvLyBvbiByZXNpemUgb2YgaXRlbSB3aWxsIHNocmluayBhZGphY2VudCBpdGVtc1xuICBkaXNwbGF5R3JpZDogRGlzcGxheUdyaWQuT25EcmFnQW5kUmVzaXplLCAvLyBkaXNwbGF5IGJhY2tncm91bmQgZ3JpZCBvZiByb3dzIGFuZCBjb2x1bW5zXG4gIGRpc2FibGVXaW5kb3dSZXNpemU6IGZhbHNlLCAvLyBkaXNhYmxlIHRoZSB3aW5kb3cgb24gcmVzaXplIGxpc3RlbmVyLiBUaGlzIHdpbGwgc3RvcCBncmlkIHRvIHJlY2FsY3VsYXRlIG9uIHdpbmRvdyByZXNpemUuXG4gIGRpc2FibGVXYXJuaW5nczogZmFsc2UsIC8vIGRpc2FibGUgY29uc29sZSBsb2cgd2FybmluZ3MgYWJvdXQgbWlzcGxhY2VtZW50IG9mIGdyaWQgaXRlbXNcbiAgc2Nyb2xsVG9OZXdJdGVtczogZmFsc2UsIC8vIHNjcm9sbCB0byBuZXcgaXRlbXMgcGxhY2VkIGluIGEgc2Nyb2xsYWJsZSB2aWV3XG4gIGRpc2FibGVBdXRvUG9zaXRpb25PbkNvbmZsaWN0OiBmYWxzZSAgLy8gZGlzYWJsZSBhdXRvLXBvc2l0aW9uIG9mIGl0ZW1zIG9uIGNvbmZsaWN0IHN0YXRlXG59O1xuIl19
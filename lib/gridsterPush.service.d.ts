import { GridsterItemComponentInterface } from './gridsterItemComponent.interface';
export declare class GridsterPush {
    fromSouth: string;
    fromNorth: string;
    fromEast: string;
    fromWest: string;
    private pushedItems;
    private pushedItemsTemp;
    private pushedItemsTempPath;
    private pushedItemsPath;
    private gridsterItem;
    private gridster;
    private pushedItemsOrder;
    private tryPattern;
    constructor(gridsterItem: GridsterItemComponentInterface);
    destroy(): void;
    pushItems(direction: string, disable?: boolean): boolean;
    restoreTempItems(): void;
    restoreItems(): void;
    setPushedItems(): void;
    checkPushBack(): void;
    private push;
    private trySouth;
    private tryNorth;
    private tryEast;
    private tryWest;
    private addToTempPushed;
    private removeFromTempPushed;
    private addToPushed;
    private removeFromPushed;
    private removeFromPushedItem;
    private checkPushedItem;
}

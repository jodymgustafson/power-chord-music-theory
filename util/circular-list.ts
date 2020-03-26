/**
 * Implements a list of items that wraps around so getting an item at a certain index
 * will wrap around
 */
export class CircularList<T>
{
    private length = 0;

    constructor(private list: T[] = []) {
        this.length = this.list.length;
    }

    push(...items: T[]): number {
        return this.length = this.list.push(...items);
    }

    indexOf(item: T): number {
        return this.list.indexOf(item);
    }

    itemAt(index: number): T {
        index %= this.length;
        if (index < 0) {
            index = this.length + index;
        }

        return this.list[index];
    }

    /**
     * Gets the list as an array
     */
    getList(): T[] {
        return this.list.slice();
    }
}
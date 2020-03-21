export class CircularList<T>
{
    private length = 0;

    constructor(private list: T[] = [])
    {
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

    getList(): T[]
    {
        return this.list.slice();
    }
}
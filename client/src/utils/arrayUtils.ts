export function updateAt<T>(arr: Array<T>, rowIndex: number, value: T): Array<T> {
    const update = [...arr];
    update[rowIndex] = value;
    return update;
}

export function update2dArrayAt<T>(arr: Array<Array<T>>, rowIndex: number, colIndex: number, value: T): Array<Array<T>> {
    const update = [...arr];
    update[rowIndex][colIndex] = value;
    return update;
}

export function update2dArrayRow<T>(arr: Array<Array<T>>, rowIndex: number, value: Array<T>): Array<Array<T>> {
    const update = [...arr];
    update[rowIndex] = value;
    return update;
}

export * as ArrayUtils from "./arrayUtils";
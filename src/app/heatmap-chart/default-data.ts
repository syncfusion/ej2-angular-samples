export function getDatasource(): any {
    let temp: any = {};
    temp.dataSource = [];
    temp.xAis = [];
    temp.yAis = [];
    for (let x: number = 0; x < 12; x++) {
        temp.dataSource.push([]);
        temp.xAis.push(x);
        temp.yAis.push(x);
        for (let y: number = 0; y < 6; y++) {
            temp.dataSource[x].push(getRndInteger(0, 100));
        }
    }
    return temp;
}
export function getRndInteger(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min)) + min;
}
export function getDatasource() {
    var temp = {};
    temp.dataSource = [];
    temp.xAis = [];
    temp.yAis = [];
    for (var x = 0; x < 12; x++) {
        temp.dataSource.push([]);
        temp.xAis.push(x);
        temp.yAis.push(x);
        for (var y = 0; y < 6; y++) {
            temp.dataSource[x].push(getRndInteger(0, 100));
        }
    }
    return temp;
}
export function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
//# sourceMappingURL=default-data.js.map
import * as fs from 'fs';
// 0. Define your map structure in TypeScript
export interface MyMap {
    [key: string]: any;
}


// 1. Read JSON File
const readMapFromJson = (): MyMap => {
    const jsonData = fs.readFileSync('cypress/fixtures/accessToken.json', 'utf8');
    return JSON.parse(jsonData) as MyMap;
};
// 2. Modify Data
export const addToMap = (key: string, value: any) => {
    const mapData = readMapFromJson();
    mapData[key] = value;
    return mapData;
};

// 3. Write Back to JSON File
export const writeMapToJson = (mapData: MyMap) => {
    fs.writeFileSync('cypress/fixtures/mapData.json', JSON.stringify(mapData, null, 4), 'utf8');
};




import * as XLSX from 'xlsx';

export class ExcelUtil {

    static readExcel(filePath: string, sheetName: string): Map<string, string> {

        const workbook = XLSX.readFile(filePath);

        const worksheet = workbook.Sheets[sheetName];

        const jsonData = XLSX.utils.sheet_to_json<any>(worksheet);

        console.log("========== JSON DATA ==========");
        console.log(jsonData);

        const dataMap = new Map<string, string>();

        jsonData.forEach((row, index) => {

            console.log("Row :", index);

            console.log(row);

            dataMap.set(row.FieldName, row.Value);
        });

        return dataMap;
    }

}
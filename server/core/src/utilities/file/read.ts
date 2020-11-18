import * as fs from "fs";

export function readFile(path: string): Promise<Buffer> {
    return new Promise((resolve, reject) => {
        fs.readFile(path, (err, data) => {
            if (err) {
                return reject(err);
            }

            return resolve(data);
        });
    });
}

import dotenv from "dotenv";
import Name from "../models/nameModel.js";
import connectDB from "../config/db.js";
import fs from "fs";


const saveData = async (jsonPath) => {
    fs.readFile(jsonPath, 'utf-8', (err, jsonString) => {
        if (err) {
            console.log('File read failed', err);
            return;
        }
        const data = JSON.parse(jsonString);
        dotenv.config({ path: '../../.env' });
        connectDB().then(() => {
            for (const [key, name] of Object.entries(data['name'])) {
                const newName = {
                    'name': name,
                    'classification': data['classification'][key],
                    'frequency': data['frequency'][key],
                    'meaning': data['meaning'][key],
                    'vector': data['w2v'][key],
                }
                Name.create(newName);
            }
        })
    })
    connectDB.close();
}

saveData('../../scripts/data/boys.json');
saveData('../../scripts/data/girls.json');

export default saveData;
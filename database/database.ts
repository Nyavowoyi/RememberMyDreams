import { Dream, IDream } from '@/models/dream';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('myDatabase.db');

enum Tables {
    dream = 'dream',
}

interface DreamData {
    title: string, 
    description: string, 
    date: string
}

const dbTriggers = [
    {
        trigger_name: `update_dream_updated_at`, 
        definition: `
        -- Drop the trigger if it exists
        DROP TRIGGER IF EXISTS update_dream_updated_at;
        
        -- Create the trigger
        CREATE TRIGGER update_dream_updated_at
        AFTER UPDATE ON dream
        FOR EACH ROW
        BEGIN
            UPDATE dream
            SET updated_at = CURRENT_TIMESTAMP
            WHERE id = OLD.id;
        END;
        `
    }
]


const initDb = async () => {
    const triggers = initTriggers();
    
    await db.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS dream 
            (
                id INTEGER PRIMARY KEY AUTOINCREMENT, 
                title TEXT NOT NULL, 
                description TEXT NOT NULL,
                date TIMESTAMP NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );

        ${triggers}
    `);
}


const initTriggers = () => {
    let statements = '';
    dbTriggers.forEach((triggerObj) => {
        statements += '\n' + triggerObj.definition;
    })
    console.log('The triggers are as below');
    console.log(statements);
    return statements;
}




const addDream = async ({ title, description, date }: DreamData) => {
    const result = await db.runAsync(`INSERT INTO ${Tables.dream} (title, description, date) VALUES (?, ?, ?)`, title, description, date);
    // console.debug(result.lastInsertRowId, result.changes);
    return result;
}

const updateDream = async ({ id, title, description, date} : {id: string, title: string, description: string, date: string} ) => {
    // Binding unnamed parameters from variadic arguments
    return await db.runAsync(
        `UPDATE ${Tables.dream} SET title = $title, description = $desc, date = $date WHERE id = $id`, 
        { $title: title, $desc: description, $date: date, $id: id }
    ); 
}

const fetchDreams = async () => {
    const allRows = await db.getAllAsync(`SELECT * FROM ${Tables.dream}`);
    // console.log('THESE ARE THE ROWS FROM THE DREAMS TABLE:::');
    // console.log(allRows);
    const dreamsList : Array<Dream> = [];
    allRows.forEach((row : any, index) => {
        // console.info('ROW🥹')
        // console.info({id: row.id, title: row.title, date: row.date, description: row.description} );
        let dream = new Dream({ id: row.id, title: row.title, date: row.date, description: row.description });
        dreamsList.push(dream);
    });

    // console.info('(^///^)(^///^)(^///^)', dreamsList);
    return dreamsList;
}


const deleteDream = async (id : number) => {
    return await db.runAsync(`DELETE FROM ${Tables.dream} WHERE id = $id`, { $id: id }); // Binding named parameters from object
}


export class LocalDb {
    tables = Tables;
    initDb = initDb;
    addDream = addDream;
    fetchDreams = fetchDreams;
    updateDream = updateDream;
    deleteDream = deleteDream;

}


export const useLocalDb = () => new LocalDb();
require('dotenv').config();
const { Pool } = require("pg");
const pool = new Pool({
    user: process.env.DB_USER,        
    host: process.env.DB_HOST,           
    database: process.env.DB_NAME, 
    password: process.env.DB_PASSWORD,    
    port: process.env.DB_PORT, 
});


const maleNames = ["James", "Michael", "Robert", "John", "David"];
const femaleNames = ["Mary", "Patricia", "Jennifer", "Linda", "Elizabeth"];
const surnames = ["Smith", "Johnson", "Williams", "Brown", "Jones"];
const rowCount = 50;


function generateUser() {
    let entryName;
    let entryGender;
    const genderRand = Math.floor(Math.random() * (1 - 0 + 1) + 0);
    if (genderRand) {
        entryGender = "male";
        entryName = maleNames[Math.floor(Math.random() * (4 - 0 + 1) + 0)]
    } else {
        entryGender = "female";
        entryName = femaleNames[Math.floor(Math.random() * (4 - 0 + 1) + 0)]
    }
    const entrySurname = surnames[Math.floor(Math.random() * (4 - 0 + 1) + 0)]
    const entryAge = Math.floor(Math.random() * (80 - 18 + 1) + 18);
    return (
        {entryName, entrySurname, entryGender, entryAge}
    );
}

async function fillDB() {
    const client = await pool.connect();
    try {
        for (let i = 0; i < rowCount; i++) {
            const {entryName, entrySurname, entryGender, entryAge} = generateUser();
            await client.query(
                "INSERT INTO users (name, surname, gender, age) values ($1, $2, $3, $4)",
                [entryName, entrySurname, entryGender, entryAge]
            );
        }
    } catch (err) {
        console.log(err);
        return;
    }
}

fillDB();


process.on('exit', () => {
    pool.end();
});
require('dotenv').config();
import { Controller, Patch, Param, Get } from '@nestjs/common';
import { Client } from 'pg';


@Controller('setflag')
export class SetflagController {
    private client: Client;

    constructor() {
        this.client = new Client({
            user: process.env.DB_USER,        
            host: process.env.DB_HOST,           
            database: process.env.DB_NAME, 
            password: process.env.DB_PASSWORD,    
            port: process.env.DB_PORT, 
        });
        this.client.connect().then(() => {
            console.log('Connected');
        }).catch((err) => {
            console.error('Connection error', err.stack);
        });
    }

    @Patch(':id')
    async setProblem(@Param('id') id: string) {
        console.log(id);
        try {
            await this.client.query('UPDATE users SET problem = TRUE WHERE id = $1', [id]);
            const result = await this.client.query('SELECT COUNT(*) FROM users WHERE problem = FALSE');
            return result.rows[0].count;
        } catch (err) {
            console.error('Error running query', err.stack);
            return { error: 'Database query failed' };
        }
    }

}
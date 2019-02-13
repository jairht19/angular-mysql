import { Request, Response } from 'express';
import db from '../database';

class GamesController {
    public async list(req: Request, res: Response) {
        const games = await db.query('SELECT * FROM games')
        res.json(games);
    }
    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const game = await db.query('SELECT * FROM games WHERE id= ?', [id]);
        if(game.length > 0){
            return res.json(game[0]);
        } 
        res.status(404).json({message: "The game doesn't exists"});
    }
    public async create(req: Request, res: Response): Promise<void> {
        await db.query('INSERT INTO games set ?', [req.body]);
        res.json({message: 'Game Saved'});
    }
    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await db.query('UPDATE games SET ? WHERE id = ?', [req.body, id]);
        res.json({message: 'The game was updated'});
    }
    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await db.query('DELETE FROM games WHERE id = ?', [id]);
        res.json({message: 'The game was deleted'});
    }
}

const gamesController = new GamesController();
export default gamesController;
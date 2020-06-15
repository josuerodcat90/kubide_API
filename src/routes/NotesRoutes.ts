import { Response, Request, Router } from 'express';

import Note from '../models/Note';

class NotesRoutes {
	router: Router;

	constructor() {
		this.router = Router();
		this.routes();
	}

	public async getNotes(req: Request, res: Response): Promise<void> {
		const notes = await Note.find().sort({ createdAt: -1 });
		res.json({ data: notes });
	}

	public async getNote(req: Request, res: Response): Promise<void> {
		const { id } = req.params;
		const note = await Note.findById(id);
		res.json({ data: note });
	}

	public async getLikedNotes(req: Request, res: Response): Promise<void> {
		const likedNotes = await Note.find({ liked: true });
		res.json({ data: likedNotes });
	}

	public async createNote(req: Request, res: Response): Promise<void> {
		const { title, description, username } = req.body;
		const newNote = new Note({ title, description, username });
		await newNote.save();
		res.json({ data: newNote });
	}

	public async updateNote(req: Request, res: Response): Promise<void> {
		const { title, description } = req.body;
		const { id } = req.params;
		const updatedNote = await Note.findOneAndUpdate(
			{ _id: id },
			{ title, description },
			{ new: true }
		);
		res.json({ data: updatedNote });
	}

	public async likeNote(req: Request, res: Response): Promise<void> {
		const { liked } = req.body;
		const { id } = req.params;
		const likedNote = await Note.findOneAndUpdate({ _id: id }, { liked }, { new: true });
		res.json({ data: likedNote });
	}

	public async deleteNote(req: Request, res: Response): Promise<void> {
		const { id } = req.params;
		await Note.findByIdAndDelete(id);
		res.json({ Mensaje: 'La nota fue eliminada con exito.' });
	}

	routes() {
		this.router.get('/', this.getNotes);
		this.router.get('/favoritas/', this.getLikedNotes);
		this.router.get('/:id', this.getNote);
		this.router.post('/', this.createNote);
		this.router.put('/editar/:id', this.updateNote);
		this.router.put('/megusta/:id', this.likeNote);
		this.router.delete('/:id', this.deleteNote);
	}
}

const notesRoutes = new NotesRoutes();

export default notesRoutes.router;

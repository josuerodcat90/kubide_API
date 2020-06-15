import { Schema, model } from 'mongoose';

const NoteSchema = new Schema({
	title: { type: String, required: true, trim: true },
	description: { type: String, required: true, trim: true },
	username: { type: String, required: true, trim: true },
	liked: { type: Boolean, default: false },
	createdAt: { type: Date, default: Date.now },
	updatedAt: Date,
});

export default model('Note', NoteSchema);

import { Note, NoteCreationAttributes } from '../models/Note';

class NoteRepository {
  async findById(id: number): Promise<Note | null> {
    return await Note.findByPk(id);
  }

  async findAll(): Promise<Note[]> {
    return await Note.findAll();
  }

  async create(data: NoteCreationAttributes): Promise<Note> {
    return await Note.create(data);
  }

  async update(id: number, data: Partial<Note>): Promise<Note | null> {
    const note = await Note.findByPk(id);
    if (!note) return null;
    return await note.update(data);
  }

  async delete(id: number): Promise<boolean> {
    const note = await Note.findByPk(id);
    if (!note) return false;
    await note.destroy();
    return true;
  }
}

export default new NoteRepository();

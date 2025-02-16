import { Document, DocumentCreationAttributes } from '../models/Document';

class DocumentRepository {
  async findById(id: number): Promise<Document | null> {
    return await Document.findByPk(id);
  }

  async findAll(): Promise<Document[]> {
    return await Document.findAll();
  }

  async create(data: DocumentCreationAttributes): Promise<Document> {
    return await Document.create(data);
  }

  async update(id: number, data: Partial<Document>): Promise<Document | null> {
    const document = await Document.findByPk(id);
    if (!document) return null;
    return await document.update(data);
  }

  async delete(id: number): Promise<boolean> {
    const document = await Document.findByPk(id);
    if (!document) return false;
    await document.destroy();
    return true;
  }
}

export default new DocumentRepository();
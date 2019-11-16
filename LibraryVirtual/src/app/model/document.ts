export class Document {
  public documentId: number;
  public title: string;
  public description: string;
  public imagenPath: string;
  public pdfPath: string;
  public privated: boolean;
  public userId: number;
  public categoryId: number;
  public authorId: number;
  public editorialId: number;
  public lenguajeId: number;
  public state: boolean;
  public publicationDate: Date;
  public createdOn: Date;
  public createdUser: string;
  public modifiedOn: Date;
  public modifiedUser: string;
}

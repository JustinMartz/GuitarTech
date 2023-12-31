import { Guitar } from "./guitar";

export class GuitarPicture {
  id: number;
  filename: string;
  guitar: Guitar;
  order: number;
  deleted: boolean;

  constructor(
    id: number = 0,
    filename: string = '',
    guitar: Guitar = new Guitar(),
    order: number = 0,
    deleted: boolean = false
  ) {
    this.id = id;
    this.filename = filename;
    this.guitar = guitar;
    this.order = order;
    this.deleted = deleted;
  }
}

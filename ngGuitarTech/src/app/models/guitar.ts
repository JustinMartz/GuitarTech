export class Guitar {
  id: number;
  make: string;
  model: string;
  year: number;
  color: string;
  deleted: boolean;
  owner: number;

  constructor(
    id: number = 0,
    make: string = "",
    model: string = "",
    year: number = 0,
    color: string = "",
    deleted: boolean = false,
    owner: number = 0
  ) {
    this.id = id;
    this.make = make;
    this.model = model;
    this.year = year;
    this.color = color;
    this.deleted = deleted;
    this.owner = owner;
  }
}

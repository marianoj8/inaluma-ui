
export abstract class AbstractEntityDTO {
  createdAt: string;
  lastModifiedAt: string;
  totalModified: number;

  constructor(public id?: number) {}
}

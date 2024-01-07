
export class ImageFile {
  id: number;
  fileName: string;
  contentType: string;
  fixedSize: string;
  fileType: string;
  size: number;

  constructor(public file: File) { }
}

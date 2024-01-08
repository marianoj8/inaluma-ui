import { Component, ViewChild, inject } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MatRadioChange } from "@angular/material/radio";
import { ActivatedRoute } from "@angular/router";
import { Item, ItemDTO } from "src/app/core/model/dto/ItemDTO";
import { ItemsService } from "../../services/items.service";
import { FilesService } from "../../services/files.service";
import { map, of, switchMap, tap } from "rxjs";
import { ImageFile } from "src/app/core/model/dto/ImageFile";

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html'
})
export class ItemFormComponent {
  /* DEPENDENCIES */
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _route = inject(ActivatedRoute);
  private _filesService = inject(FilesService);
  private _itemsService = inject(ItemsService);

  /* MEMBERS */
  public itemForm: FormGroup;
  private _selectedFile: File;
  private _imgSrc: string;
  private _item: Item;
  public imagePath: string;
  private readonly _chooseImageIcon = "../../../../assets/images/upload_image.svg";
  public showProgressBar: boolean;
  public hasFile: boolean;

  constructor() {
    this.imagePath = this._chooseImageIcon;
    this.showProgressBar = false;

    this._filesService.emitStatusUploader.subscribe(c => {
      console.log('saving the image');
    })

    const controls: { [key: string]:FormControl<any> } = {
      nome: new FormControl<string>(undefined, [Validators.required]),
      preco: new FormControl<number>(undefined, [Validators.required]),
      descricao: new FormControl<number>(undefined, [Validators.required]),
      imagem: new FormControl<File>(undefined)
    }

    this._route.data.subscribe((data: {isProduto: boolean}) => {
      this._item = new Item(new ItemDTO(), data.isProduto);

      // cria o formulário dinamicamente em função do item a ser cadastrado
      if(data.isProduto) {
        controls.stock = new FormControl<number>(undefined, [Validators.required, Validators.min(1)]);
        controls.tipo = new FormControl<string>(undefined, [Validators.required]);
        controls.code = new FormControl<number>(undefined, [Validators.required]);
      } else {
        controls.duracao = new FormControl<number>(undefined, [Validators.required]);
        controls.units = new FormControl('H', [Validators.required]);
      }

      this.itemForm = this._formBuilder.group(controls);
    });
  }

  public onFileSelected(event): void {
    this._selectedFile = event.target.files[0] as File;

    if (typeof FileReader !== 'undefined') {
      const previewReader = new FileReader();
      const uploadReader = new FileReader();

      previewReader.onloadend = (evt: any) => { this.imagePath = evt.currentTarget.result ?? this._chooseImageIcon };
      uploadReader.onload = (evt: any) => { this._imgSrc = evt.target.result; }

      if ((this.hasFile = !!this._selectedFile)) {
        uploadReader.readAsArrayBuffer(this._selectedFile);
        previewReader.readAsDataURL(this._selectedFile);
      } else {
        this._selectedFile = null;
        this.imagePath = this._chooseImageIcon;
      }
    }
  }

  saveItem() {
    // It's never too much to be sure!
    if(!this.canSave()) return;

    // Mostra a barra de progresso
    this.showProgressBar = true;

    Object.assign(this._item.item, this.itemForm.value);

    this._itemsService.registerItem(this._item.item, this._item.isProduto).pipe(
      switchMap(item => {
        if(this.hasFile) return this._filesService.uploadImage(new ImageFile(this._selectedFile), item.id, this._item.isProduto)
        else return of(null);
      })
    ).subscribe(() => {
      this.showProgressBar = false;
      this.itemForm.reset({emitEvent: false});
    })
  }

  unidadeChanged(evt: MatRadioChange) {
    this.itemForm.get('unidade').setValue(evt.value);
  }

  canSave(): boolean {
    return this.itemForm.valid;
  }

  get isProduto(): boolean {
    return this._item.isProduto;
  }
}

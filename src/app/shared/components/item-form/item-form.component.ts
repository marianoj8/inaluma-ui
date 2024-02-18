import { Component, OnInit, inject } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Item, ItemDTO } from "src/app/core/model/dto/ItemDTO";
import { ItemsService } from "../../services/items.service";
import { FilesService } from "../../services/files.service";
import { Observable, forkJoin, from, fromEvent, map, of, startWith, switchAll, switchMap } from "rxjs";
import { ImageFile } from "src/app/core/model/dto/ImageFile";
import { IDialogsResponses, TiposProdutos } from "src/app/core/model";
import { MatButtonToggleChange } from "@angular/material/button-toggle";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmDialogComponent } from "../dialogs/confirm-dialog/confirm-dialog.component";
import { APP_ROUTES, DIALOG_CONTROLS, DIALOG_RESPONSES, LOCAL_STORAGE } from "../../config";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html'
})
export class ItemFormComponent implements OnInit {
  /* DEPENDENCIES */
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _route = inject(ActivatedRoute);
  private readonly _filesService = inject(FilesService);
  private readonly _itemsService = inject(ItemsService);
  private readonly _router = inject(Router);
  private readonly _diagService = inject(MatDialog);
  private readonly _toastrService = inject(ToastrService);

  /* MEMBERS */
  public itemForm: FormGroup;
  private _file: File;
  private _item: Item;
  public imagePath: string;
  private readonly _chooseImageIcon = "../../../../assets/images/upload_image.svg";
  public showProgressBar: boolean;
  public hasFile: boolean;
  public filteredOptions: Observable<string[]>;
  public formActual: string;

  constructor() {
    this.imagePath = this._chooseImageIcon;
    this.showProgressBar = false;

    const controls: { [key: string]:FormControl<any> } = {
      nome: new FormControl<string>(undefined, [Validators.required]),
      preco: new FormControl<number>(undefined, [Validators.required]),
      descricao: new FormControl<number>(undefined, [Validators.minLength(20)]),
      imagem: new FormControl<File>(undefined)
    }

    const isProduto = this._route.snapshot.data.isProduto;
    this._item = new Item(new ItemDTO(), isProduto);
    this.formActual = isProduto ? 'produtos' : 'servicos';

    // cria o formulário dinamicamente em função do item a ser cadastrado
    if(this.isProduto) {
      controls.stock = new FormControl<number>(undefined, [Validators.required, Validators.min(1)]);
      controls.tipo = new FormControl<string>(undefined, [Validators.required]);
      controls.code = new FormControl<string>(undefined, [Validators.required]);
    } else {
      controls.duracao = new FormControl<number>(0, [Validators.required]);
      controls.units = new FormControl('H', [Validators.required]);
    }

    this.itemForm = this._formBuilder.group(controls);

    const currPath = this._route.routeConfig.path;
    if(currPath === 'edit') {
      fromEvent(window, 'beforeunload').subscribe(() => {
        localStorage.setItem(LOCAL_STORAGE.itemID, this._item.id.toString());
      });
    }

    if(currPath === 'edit') {
      this.showProgressBar = true;

      try {
        let itemID = +localStorage.getItem(LOCAL_STORAGE.itemID);

        if(!itemID) itemID = this._router.getCurrentNavigation().extras.state.itemID;
        else localStorage.removeItem(LOCAL_STORAGE.itemID);

        this._itemsService.getItemByID(itemID, this.isProduto).pipe(
          map(itm => {
            this._item = itm;

            const values: Values = {
              nome: itm.item.nome,
              preco: itm.item.preco,
              descricao: itm.item.descricao,
            }

            if(this.isProduto) {
              values.stock = itm.item.stock;
              values.tipo = itm.item.tipo;
              values.code = itm.item.code;
            } else {
              values.duracao = itm.item.duracao;
              values.units = itm.item.units;
            }

            this._patchData(values, this.itemForm);

            return from(this._filesService.getImage(itm.id, this.isProduto));
          }),
          switchAll()
        ).subscribe(blob => {
          const file = new File([blob], this._item.item.fileName, {type: blob.type});
          this._selectFile((this._file = file));
        });
      } catch(exc) {
        let msg = 'Erro ao buscar os dados do ' + (this.isProduto ? 'produto': 'serviço')
          + '! Por favor retorne à listagem para tentar outra vez.';
        this._toastrService.error(msg, 'Item não selecionado');
        this.showProgressBar = false;
        console.log(exc);
      }
    }
  }

  ngOnInit(): void {
    if(this.isProduto){
      this.filteredOptions = this.itemForm.get('tipo').valueChanges.pipe(
        startWith(''),
        map(val => this._filtrar(val || ''))
      );
    }
  }

  private _filtrar(value: string): string[] { return TiposProdutos.filtrar(value); }

  public onFileSelected(event): void {
    const potentialFile = event.target.files[0] as File;
    if(potentialFile) this._selectFile(this._file = potentialFile);
  }

  private _selectFile(file: File) {
    if (FileReader) {
      const previewReader = new FileReader();

      previewReader.onloadend = (evt: any) => {
        this.imagePath = evt.currentTarget.result ?? this._chooseImageIcon
        this.showProgressBar = false;
      };

      if ((this.hasFile = !!this._file)) previewReader.readAsDataURL(this._file);
      else {
        this._file = null;
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

    if(this._item.id) this._update();
    else this._save();
  }

  private _update(): void {
    this._itemsService.updateItem(this._item.item, this.isProduto).pipe(
      switchMap((itm) => {
        this._item = itm;

        return this._filesService.updateImage$(this._item, new ImageFile(this._file))
      }),
    ).subscribe(() => {
      const values: Values = {
        nome: this._item.item.nome,
        preco: this._item.item.preco,
        descricao: this._item.item.descricao,
      }

      if(this.isProduto) {
        values.stock = this._item.item.stock;
        values.tipo = this._item.item.tipo;
        values.code = this._item.item.code;
      } else {
        values.duracao = this._item.item.duracao;
        values.units = this._item.item.units;
      }

      this._patchData(values, this.itemForm);
      this.showProgressBar = false;
      history.back();
    });
  }

  private _save(): void {
    this._itemsService.registerItem(this._item.item, this._item.isProduto).pipe(
      switchMap(item => {
        let resp: {file: Observable<File>, id: Observable<number>};

        if(this.hasFile) resp = {file: of(this._file), id: of(item.id)};
        else resp = {file: this._itemsService.getNoImage(), id: of(item.id)}

        return forkJoin(resp);
      }),
      switchMap(data => this._filesService.uploadImage(new ImageFile(data.file), data.id, this.isProduto))
    ).subscribe(() => {
      this.showProgressBar = false;
      this.limparCampos();
    })
  }

  unidadeChanged(evt: MatButtonToggleChange) { this.itemForm.get('units').setValue(evt.value) }
  canSave(): boolean { return this.itemForm.valid && this.itemForm.dirty }
  get isProduto(): boolean { return this._item.isProduto }

  public get duracao(): string {
    let s = "";

    if(this.itemForm.value.duracao && this.itemForm.value.units) {
      s = this.itemForm.value.units === 'H' ? 'hora' : 'minuto';

      if(this.itemForm.value.duracao > 1) s += 's';

      s = this.itemForm.value.duracao + ' ' + s;
    }

    return s;
  }

  public handleButtonGroupChange(evt: MatButtonToggleChange) {
    const route = this.isProduto ? APP_ROUTES.servicos_add : APP_ROUTES.produtos_add;

    if(this.itemForm.touched) {
      this._diagService.open(
        ConfirmDialogComponent,
        {
          height: 'auto',
          width: 'auto',
          data: {
            controls: DIALOG_CONTROLS.confirm_cancel,
            isNegativeWarn: false,
            message: 'Deseja mudar de formulário? Qualquer alteração que tenha feito será perdida!',
            title: 'Mudar Formulário'
          }
        }
      ).afterClosed().subscribe((resp: IDialogsResponses) => {
        if(resp.response === DIALOG_RESPONSES.confirm) this._router.navigate([route]).then();
      })
    } else this._router.navigate([route]).then();
  }

  public limparCampos(): void {
    this.imagePath = this._chooseImageIcon;
    this._item = new Item(new ItemDTO(), this.isProduto);
    this._file = null;
    console.log(this.itemForm.controls)
    this.itemForm.reset(undefined, {emitEvent: false});
    console.log(this.itemForm.controls)
    this.filteredOptions = of(this._filtrar(''));
  }

  public cancelar(): void {
    if(this.itemForm.dirty) {
      this._diagService.open(
        ConfirmDialogComponent,
        {
          disableClose: true,
          data: {
            controls: DIALOG_CONTROLS.yes_no,
            isNegativeWarn: false,
            message: 'Se cancelar agora, qualquer alteração que tenha feito será ignorada! Deseja prosseguir?',
            title: 'Confirmar Cancelar'
          }
        }
      ).afterClosed().subscribe((resp: IDialogsResponses) => {
        if(resp.response === DIALOG_RESPONSES.yes) history.back();
      });
    } else this._router.navigate([this._router.url.includes(APP_ROUTES.produtos_add) ? APP_ROUTES.produtos : APP_ROUTES.servicos]);
  }

  private _patchData(data: Values, form: FormGroup): void { this.itemForm.patchValue({...data}) }
}

type Values = {
  nome: string,
  preco: number,
  descricao: string,
  stock?: number,
  tipo?: string,
  code?: string,
  duracao?: number,
  units?: string
}

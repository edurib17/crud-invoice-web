import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { EditItemScreenComponent } from '../edit-item-screen/edit-item-screen.component';


export interface InvoiceItemElement {
  id: string | null;
  name: string;
  quantity: number;
  unitPrice: number;
  isNew: boolean;
  invoice: any;
}

@Component({
  selector: 'app-edit-screen',
  templateUrl: './edit-screen.component.html',
  styleUrls: ['./edit-screen.component.css'],
})
export class EditScreenComponent implements OnInit {
  constructor(
    private api: ApiService,
    private toastr: ToastrService,
    private router: Router,
    public dialog: MatDialog,
    private routes: ActivatedRoute
  ) {}


  id: string | null = null;
  invoiceNumber: string = '';
  date: Date| null = new Date();
  client: string = '';
  description: string = '';
  items: InvoiceItemElement[] = [];
  displayedColumns: string[] = [
    'name',
    'quantity',
    'unitPrice',
    'total',
    'action',
  ];

  ngOnInit(): void {
    this.id = this.routes.snapshot.paramMap.get('id');
    if (this.id != null) {
      this.getOneInvoice(this.id);
    }
  }

  getOneInvoice(id: string) {
    this.api.getInvoice(id).subscribe((res) => {
      const newItems: InvoiceItemElement[] = [];
      this.invoiceNumber = res.invoiceNumber;
      this.client = res.client;
      this.description = res.description;
      this.date = res.date;

      if (res.items && res.items.length > 0) {
        res.items.forEach((i: InvoiceItemElement) => {
          newItems.push({ ...i, isNew: false });
        });
      }
      this.items = newItems;
    });
  }

  onSubmit() {
    if (this.validation()) return;
    this.saveInvoice();
    this.id = null;
    this.invoiceNumber = '';
    this.date = null;
    this.client = '';
    this.description = '';
    this.items = [];
  }

  openDialog(invoiceItem: InvoiceItemElement): void {
    const dialogRef = this.dialog.open(EditItemScreenComponent, {
      data: {
        item: invoiceItem,
        updateFunction: (updatedItem: InvoiceItemElement) => {
          const updatedItems = this.items.map(
            (item) =>
              item.id === updatedItem.id
                ? { ...item, ...updatedItem }
                : item
          );
          this.items = updatedItems;
          dialogRef.close();
        },
      },
    });
  }

  saveInvoice() {
    const invoiceData = {
      id: this.id ? this.id : null,
      invoiceNumber: this.invoiceNumber,
      date: this.date,
      client: this.client,
      description: this.description,
      items: this.items.map((i) => ({ ...i, id: i.isNew ? null : i.id })),
    };

    this.api.saveInvoice(invoiceData).subscribe(
      (_: any) => {
        this.router.navigate(['']);
        this.toastr.success('Nota salva com sucesso!', '', {
          timeOut: 1000,
        });
      },
      (error) => {
        this.toastr.error(
          'Ocorreu um erro ao salvar a nota. Tente novamente.',
          '',
          {
            timeOut: 5000,
          }
        );
        console.error(error);
      }
    );
  }

  addRecord() {
    const newItem = {
      id: (this.items.length + 1).toString(),
      name: 'Novo Item',
      quantity: 1,
      unitPrice: 0.0,
      isNew: true,
      invoice: this.id ? { id: this.id } : null,
    };
    this.items = [...this.items, newItem];
  }

  removeRecord(id: string) {
    const newItems: InvoiceItemElement[] = this.items.filter((i) => i.id != id);
    this.items = newItems;
  }

  validation() {
    if (this.invoiceNumber?.trim() === '') {
      this.toastr.info('Inclua número da nota corretamente', '', {
        timeOut: 2500,
      });
      return true;
    }
    if (this.client?.trim() === '') {
      this.toastr.info('Inclua o nome do cliente corretamente', '', {
        timeOut: 2500,
      });
      return true;
    }
    if (this.items.length === 0) {
      this.toastr.info('Inclua um item antes de salvar.', '', {
        timeOut: 2500,
      });
      return true;
    }

    return false;
  }
}

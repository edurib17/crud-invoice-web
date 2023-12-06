import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';

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
  constructor(private api: ApiService, private toastr: ToastrService) {}
  ngOnInit(): void {}

  errorMessage: string = 'Houve um erro ao salvar!';
  successMessage: string = 'Salvo com sucesso!';
  id: string | null = null;
  invoiceNumber: string = '';
  date: Date = new Date();
  client: string = '';
  description: string = '';
  items: InvoiceItemElement[] = [];
  displayedColumns: string[] = ['name', 'quantity', 'unitPrice', 'total'];

  onSubmit() {
    if (this.validation()) return;
    if (!this.id) {
      this.createInvoice();
    } else {
      this.updateInvoice();
    }

    this.id = null;
    this.invoiceNumber = '';
    this.date = new Date();
    this.client = '';
    this.description = '';
  }

  createInvoice() {
    this.api.createInvoice({
      id: null,
      invoiceNumber: this.invoiceNumber,
      date: new Date(),
      client: this.client,
      description: this.description,
      items: this.items.map((i) => {
        return { ...i, id: i.isNew ? null : i.id };
      }),
    });
  }

  updateInvoice() {
    this.api.createInvoice({
      id: null,
      invoiceNumber: this.invoiceNumber,
      date: new Date(),
      client: this.client,
      description: this.description,
      items: [],
    });
  }

  addRecord() {
    const newItem = {
      id: (this.items.length + 1).toString(),
      name: 'Novo Item',
      quantity: 1,
      unitPrice: 0.0,
      isNew: true,
      invoice: null,
    };
    this.items = [...this.items, newItem];
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

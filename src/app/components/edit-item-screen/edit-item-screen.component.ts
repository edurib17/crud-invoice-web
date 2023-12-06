import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-item-screen',
  templateUrl: './edit-item-screen.component.html',
  styleUrls: ['./edit-item-screen.component.css'],
})
export class EditItemScreenComponent implements OnInit {
  id: string | null = null;
  name: string = '';
  quantity: number = 0.0;
  unitPrice: number = 0.0;
  invoice: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
  ngOnInit(): void {
    if (this.data && this.data.item) {
      this.getInvoiceItem();
    }
  }
  getInvoiceItem() {
    this.id = this.data.item.id;
    this.quantity = this.data.item.quantity;
    this.unitPrice = this.data.item.unitPrice;
    this.name = this.data.item.name;
    this.invoice = this.data.item.invoice;
  }


  updateItem(){
    this.data.updateFunction({
      id: this.id,
      quantity: this.quantity,
      unitPrice: this.unitPrice,
      name: this.name,
      invoice: this.invoice
    });
  }
}

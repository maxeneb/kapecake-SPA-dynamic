import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  orderForm: FormGroup;
  cakeOptions = [
    "Devil's Delight, 190",
    "Smiley Cake, 150",
    "Waffle Chocolate, 170",
    "Pineapple Cake, 120",
    "Black Forest, 150",
    "Rosette Cake, 190",
    "Rainbow Deluxe, 100",
    "Banana Cake, 50",
    "Red Cherry, 200",
    "Ube Delight, 210",
  ];
  coffeeOptions = [
    "Espresso, 180",
    "Doppio, 170",
    "Espresso Macchiato, 190",
    "Americano, 190",
    "Cappuccino, 180",
    "Matcha Latte, 130",
    "Ristretto, 100",
    "Cortado, 190",
    "Lungo, 200",
    "Red Eye, 200",
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.orderForm = this.fb.group({
      orders: this.fb.array([]),
    });
  }

  get orders() {
    return this.orderForm.get('orders') as FormArray;
  }

  addOrder(selectedItem: string) {
    if (selectedItem) {
      const [itemName, itemPrice] = selectedItem.split(', ');
      const orderGroup = this.fb.group({
        name: itemName,
        price: +itemPrice,
        quantity: 1,
      });
      this.orders.push(orderGroup);
    }
  }

  updateTotal() {
    let totalAmount = 0;
    this.orders.controls.forEach((order) => {
      totalAmount += order.value.price * order.value.quantity;
    });
    return totalAmount;
  }

  removeOrder(index: number) {
    this.orders.removeAt(index);
    this.updateTotal();
  }
}

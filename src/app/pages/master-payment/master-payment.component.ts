import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-master-payment',
  templateUrl: './master-payment.component.html',
  styleUrls: ['./master-payment.component.scss']
})
export class MasterPaymentComponent implements OnInit {
  product_list: any = []
  monster_list: any = []

  loading = false

  card = {
    number: '',
    name: '',
    expiration_date: '',
    cvv2: ''
  }

  showModal = false
  modal_message = ''

  total_price = 0

  constructor(private api_service: ApiService, private router: Router) { }

  async ngOnInit() {
    let cart = this.api_service.getCart()
    /* if (!cart.length) {
      this.displayModal('There are no items on your cart. Returning to home page.')
    } */
    this.product_list = cart
    this.total_price = this.product_list.reduce((prev: number, current: any) => prev += current.price, 0)
  }

  payPretend() {
    this.loading = true
    setTimeout(() => {
      this.loading = false
      this.displayModal('Payment received successfully. Thank you for your patronage.')
    }, 1500);
  }


  displayModal(message: string) {
    this.showModal = true
    this.modal_message = message
  }

  hideModal() {
    this.showModal = false
    this.router.navigateByUrl('/')
  }

}

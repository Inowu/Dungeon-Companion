import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom, Observable, Subject } from 'rxjs';

interface Item {
  name: string,
  price: number
}
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  monsters: any
  cartObservable: Subject<any> = new Subject()
  cart: any = []

  httpOptions = {
    headers: new HttpHeaders({
      'Accept': 'application/JSON',
      'Prefer': 'return=representation',
      'Content-Type': 'application/JSON',
      'Access-Control-Allow-Origin': '*'
    })
  }

  constructor(private http: HttpClient) {
    this.monsters = firstValueFrom(this.http.get('https://www.dnd5eapi.co/api/monsters', this.httpOptions))
  }

  addItemToCart(item: Item) {
    this.cart.push(item)
    this.cartObservable.next(this.cart)
  }

  getCart() {
    return this.cart
  }

}

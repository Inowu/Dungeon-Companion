import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  cart: any = []

  constructor(private api_service: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.api_service.cartObservable.subscribe((res: any) => {
      this.cart = res
    })
  }

  scrollTo(index: any) {
    if (this.router.url == '/payment') this.router.navigate(['/'], { queryParams: { section: index } })
    document?.getElementById(index)?.scrollIntoView({ behavior: "smooth" });
  }

}

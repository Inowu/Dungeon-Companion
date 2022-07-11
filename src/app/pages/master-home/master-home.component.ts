import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';


interface Item {
  index: string,
  price: number
}

@Component({
  selector: 'app-master-home',
  templateUrl: './master-home.component.html',
  styleUrls: ['./master-home.component.scss']
})
export class MasterHomeComponent implements OnInit {

  search_word: string = ''
  selected_sort: string = 'alfa asc'

  monster_list: any = []
  monster_list_backup: any = []

  class_filter_list: string[] = []
  class_list = ['dragon', 'golem', 'vampire', 'rat']
  selected_page: number = 1
  pages: any = [1]
  total_pages = 1
  products_per_page = 12
  last_page = 1
  page_products: any = []


  showModal = false;
  modal_message = ''


  constructor(private api_service: ApiService, private router: Router, private route: ActivatedRoute) { }

  async ngOnInit() {
    let monsters = await this.api_service.monsters
    monsters.results.map((monster: any) => monster.price = Math.floor(Math.random() * 10000) / 100)
    this.monster_list_backup = monsters.results
    this.monster_list = monsters.results
    this.calculatePages()
    this.loadPage()
    this.route.queryParams.subscribe((res: any) => {
      setTimeout(() => {
        if (res.section) document?.getElementById(res.section)?.scrollIntoView({ behavior: "smooth" })
      }, 100);
    })
  }

  calculatePages() {
    this.total_pages = Math.floor(this.monster_list.length / this.products_per_page)
    if (this.monster_list.length % this.products_per_page > 0) this.total_pages++
    this.pages = []
    for (let i = 0; i < 5; i++) {
      if (this.selected_page - 2 + i > 0 && this.selected_page - 2 + i <= this.total_pages) this.pages.push(this.selected_page - 2 + i)
    }
    this.last_page = this.total_pages
  }

  selectPage(page: number) {
    this.selected_page = page
    this.pages = []
    for (let i = 0; i < 5; i++) {
      if (this.selected_page - 2 + i > 0 && this.selected_page - 2 + i <= this.total_pages) this.pages.push(this.selected_page - 2 + i)
    }
    this.loadPage()
  }

  movePage(direction: any) {
    if (direction == -1) {
      if (!(this.selected_page - 1 < 1)) { this.selected_page-- }
      else { this.selected_page = this.last_page }
      this.pages = []
      for (let i = 0; i < 5; i++) {
        if (this.selected_page - 2 + i > 0 && this.selected_page - 2 + i <= this.total_pages) this.pages.push(this.selected_page - 2 + i)
      }
    } else {
      if (!(this.selected_page + 1 > this.last_page)) { this.selected_page++ }
      else { this.selected_page = 1 }
      this.pages = []
      for (let i = 0; i < 5; i++) {
        if (this.selected_page - 2 + i > 0 && this.selected_page - 2 + i <= this.total_pages) this.pages.push(this.selected_page - 2 + i)
      }
    }
    this.loadPage()
  }

  loadPage() {
    if (this.selected_page == this.total_pages) return this.page_products = this.monster_list.slice(-(this.monster_list.length % this.products_per_page))
    return this.page_products = this.monster_list.slice(this.products_per_page * (this.selected_page - 1), this.products_per_page * (this.selected_page))
  }

  toggleClassFilter(item: string) {
    if (item != 'other' && this.class_filter_list.indexOf('other') != -1) this.class_filter_list.splice(this.class_filter_list.indexOf('other'), 1)
    let index = this.class_filter_list.indexOf(item)
    if (index > -1) this.class_filter_list.splice(index, 1)
    if (index == -1) this.class_filter_list.push(item)
    if (this.class_filter_list.includes('other')) this.class_filter_list = ['other']
    return this.filterProducts()
  }

  filterProducts() {
    this.monster_list = this.monster_list_backup
    if (this.search_word != '') this.monster_list = this.monster_list.filter((monster: any) => monster.name.toLowerCase().includes(this.search_word.toLowerCase()))
    if (this.class_filter_list.length && !this.class_filter_list.includes('other')) this.monster_list = this.monster_list.filter((monster: any) => this.class_filter_list.some(item => monster.index.includes(item)))
    if (this.class_filter_list.includes('other')) this.monster_list = this.monster_list.filter((monster: any) => !this.class_list.some(item => monster.index.includes(item)))
    switch (this.selected_sort) {
      case 'alfa asc':
        this.monster_list.sort((a: any, b: any) => a.name > b.name ? 1 : a.name < b.name ? -1 : 0)
        break
      case 'alfa desc':
        this.monster_list.sort((a: any, b: any) => a.name < b.name ? 1 : a.name > b.name ? -1 : 0)
        break
      case 'price asc':
        this.monster_list.sort((a: any, b: any) => a.price > b.price ? 1 : a.price < b.price ? -1 : 0)
        break
      case 'price desc':
        this.monster_list.sort((a: any, b: any) => a.price < b.price ? 1 : a.price > b.price ? -1 : 0)
        break
      default:
        this.monster_list.sort((a: any, b: any) => a.name > b.name ? 1 : a.name < b.name ? -1 : 0)
        break
    }
    this.selected_page = 1
    this.calculatePages()
    this.loadPage()
  }

  addItemToCart(item: any) {
    this.api_service.addItemToCart({ name: item.name, price: item.price })
    this.displayModal(`${item.name} added to cart. Please remember to pay before exiting the page.`)
  }

  addRandomItemToCart() {
    let index = Math.floor(Math.random() * this.monster_list_backup.length)
    this.api_service.addItemToCart({ name: this.monster_list_backup[index].name, price: this.monster_list_backup[index].price })
    this.displayModal(`${this.monster_list_backup[index].name} added to cart. Please remember to pay before exiting the page.`)
  }

  displayModal(message: string) {
    this.showModal = true
    this.modal_message = message
  }

  hideModal() {
    this.showModal = false
  }

}

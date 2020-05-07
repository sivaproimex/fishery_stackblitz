import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {
tab: string = "1";
  constructor(private route: Router) { }

  ngOnInit() {
  }

product_list() {
    this.route.navigate(['./item-list']);
  }
}
 
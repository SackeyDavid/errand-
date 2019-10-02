import { Component, OnInit } from '@angular/core';
import * as list from '../../assets/js/data.js';
// import { NewsService } from '../news.service';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  constructor() {}

  // private newsService: NewsService)
  ngOnInit() {
    //console.log(this.newsService.currentArticle);
    list();
  }

}

import { Component } from '@angular/core';
import { NewsService } from '../news.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(private newsService: NewsService) {}

  ngOnInit() {
    console.log(this.newsService.currentArticle);
  }

}

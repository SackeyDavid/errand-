import { Component } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { NewsService } from '../news.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  data: any;
  constructor(private splashScreen: SplashScreen, private newsService: NewsService, private router: Router) { 
    this.splashScreen.show();

    // this.splashScreen.hide();
  }

    ngOnInit() {
      this.newsService.getData('top-headlines?country=gh&category=business').subscribe(data => {
        console.log(data);
        this.data = data;
      });
    }
  
    onGoToNewsSinglePages(article) {
      this.newsService.currentArticle = article;
      this.router.navigate(['/news-single']);
    }

}

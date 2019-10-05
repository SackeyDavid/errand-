import { Component, ViewChild  } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { Router } from '@angular/router';
// import { NewsService } from '../news.service';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {



  // private newsService: NewsService)
  // ngOnInit() {
  //   //console.log(this.newsService.currentArticle);
    
  // }

  //@ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  
  @ViewChild(IonInfiniteScroll, {static: false}) infiniteScroll: IonInfiniteScroll;
 
 
  dataList:any;
  users =
  [{
    "name": "Fried rice, 2 packs",
    "created": "src hall",
    "photo": "person5.jpg"
  }, {
    "name": "Vaseline cream",
    "created": "psi",
    "photo": "person6.jpg"
  }, {
    "name": "Cabbage",
    "created": "superannuation",
    "photo": "person7.jpg"
  }, {
    "name": "Teachers Notebook",
    "created": "src",
    "photo": "person8.jpg"
  }, {
    "name": "Multi socket",
    "created": "celt",
    "photo": "person9.jpg"
  }, {
    "name": "Beans and Plantain",
    "created": "valco",
    "photo": "person10.jpg"
  }, {
    "name": "Boxer & singlet",
    "created": "psi",
    "photo": "person11.jpg"
  }, {
    "name": "Glass cup",
    "created": "independence",
    "photo": "person12.jpg"
  }, {
    "name": "Samsung Galaxy 8 case",
    "created": "casford",
    "photo": "person13.jpg"
  }, {
    "name": "Banku and okro",
    "created": "Amamona",
    "photo": "person14.jpg"
  }, {
    "name": "Fried rice, 2 packs",
    "created": "src hall",
    "photo": "person2.jpg"
  }, {
    "name": "Vaseline cream",
    "created": "psi",
    "photo": "person1.jpg"
  }, {
    "name": "Cabbage",
    "created": "superannuation",
    "photo": "person3.jpg"
  }, {
    "name": "Teachers Notebook",
    "created": "src",
    "photo": "person4.jpg"
  }, {
    "name": "Multi socket",
    "created": "celt",
    "photo": "person15.png"
  }, {
    "name": "Beans and Plantain",
    "created": "valco",
    "photo": "person5.jpg"
  }, {
    "name": "Boxer & singlet",
    "created": "psi",
    "photo": "person6.jpg"
  }, {
    "name": "Glass cup",
    "created": "independence",
    "photo": "person7.jpg"
  }, {
    "name": "Samsung Galaxy 8 case",
    "created": "casford",
    "photo": "person8.jpg"
  }, {
    "name": "Banku and okro",
    "created": "Amamona",
    "photo": "person9.jpg"
  }, {
    "name": "Fried rice, 2 packs",
    "created": "src hall",
    "photo": "person10.jpg"
  }, {
    "name": "Vaseline cream",
    "created": "psi",
    "photo": "person11.jpg"
  }, {
    "name": "Cabbage",
    "created": "superannuation",
    "photo": "person12.jpg"
  }, {
    "name": "Teachers Notebook",
    "created": "src",
    "photo": "person13.jpg"
  }, {
    "name": "Multi socket",
    "created": "celt",
    "photo": "person14.jpg"
  }, {
    "name": "Beans and Plantain",
    "created": "valco",
    "photo": "person15.png"
  }, {
    "name": "Boxer & singlet",
    "created": "psi",
    "photo": "person1.jpg"
  }, {
    "name": "Glass cup",
    "created": "independence",
    "photo": "person2.jpg"
  }, {
    "name": "Samsung Galaxy 8 case",
    "created": "casford",
    "photo": "person3.jpg"
  }, {
    "name": "Banku and okro",
    "created": "Amamona",
    "photo": "person4.jpg"
  }, {
    "name": "Fried rice, 2 packs",
    "created": "src hall",
    "photo": "person5.jpg"
  }, {
    "name": "Vaseline cream",
    "created": "psi",
    "photo": "person6.jpg"
  }, {
    "name": "Cabbage",
    "created": "superannuation",
    "photo": "person7.jpg"
  }, {
    "name": "Teachers Notebook",
    "created": "src",
    "photo": "person8.jpg"
  }, {
    "name": "Multi socket",
    "created": "celt",
    "photo": "person9.jpg"
  }, {
    "name": "Beans and Plantain",
    "created": "valco",
    "photo": "person11.jpg"
  }, {
    "name": "Boxer & singlet",
    "created": "psi",
    "photo": "person12.jpg"
  }, {
    "name": "Glass cup",
    "created": "independence",
    "photo": "person13.jpg"
  }, {
    "name": "Samsung Galaxy 8 case",
    "created": "casford",
    "photo": "person14.jpg"
  }, {
    "name": "Banku and okro",
    "created": "Amamona",
    "photo": "person15.png"
  }];
 
  constructor(private router: Router) {
    this.dataList = [];
    console.log(this.dataList.length);
    
    for (let i = 0; i < 10; i++) { 
      //this.dataList.push("name "+this.dataList.length);
      this.dataList.push(this.users[this.dataList.length]);
      
      // const el = document.createElement('ion-item');
      //   el.innerHTML = `
      //     <ion-avatar slot="start">
      //       <img src="https://www.gravatar.com/avatar/${i + this.dataList.length}?d=monsterid&f=y">
      //     </ion-avatar>
      //     <ion-label>
      //       <h2>${users[i + this.dataList.length].name}</h2>
      //       <p>Created ${users[i + this.dataList.length].created}</p>
      //     </ion-label>
      //   `;
      //   list.appendChild(el);
      //   length++;
    }
  }
 
 
 
  loadData(event) {
    
    setTimeout(() => {
      console.log('Done');
      for (let i = 0; i < 10; i++) { 
       // this.dataList.push("Item number "+this.dataList.length);
        this.dataList.push(this.users[this.dataList.length]);
      }
      event.target.complete();
      console.log(this.users.length);
      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      if (this.dataList.length == 40) {
        event.target.disabled = true;
      }
    }, 500);
  }
 
  onGoToChatsSinglePage() {
    //this.newsService.currentArticle = article;
    this.router.navigate(['/news']);
  }

  onGoToAddSinglePage() {
    //this.newsService.currentArticle = article;
    this.router.navigate(['/errand']);
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

}

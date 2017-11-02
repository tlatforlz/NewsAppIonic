import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NewsService } from '../../app/services/news.service';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private NewsService: NewsService) {

  }

  ngOnInit() {
    this.NewsService.getTop(1).subscribe(res => {
      console.log(res);
    });
  }
}

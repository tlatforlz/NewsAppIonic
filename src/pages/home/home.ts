import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NewsService } from '../../app/services/news.service';
import { NewsPage } from '../news/news';
import { CategoriesPage } from '../categories/categories';
import { HotPage } from '../hot/hot';
class News {
  Id: String;
  Title: String;
  Content: String;
  Views: Number;
  Author: String;
  Image: String;
  DateCreate: String;
}
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  styles: ['home.scss']
})

export class HomePage {
  public Top: any[] = [];
  public Top4: any[] = [];
  public First: any;
  public search: any = true;
  public isLoadMore: any = true;
  public visibleState = 'visible';
  isOn = true;
  isDisabled = false;
  Categories: any[] = [];
  public parseJsonToObject(object) {
    return new Promise(function (resolve, reject) {
      var news = new News();
      news.Id = object._id;
      news.Image = object.image;
      news.Content = object.content;
      news.Author = object.author;
      news.Title = object.title;
      news.DateCreate = object.createDate;
      news.Views = object.views;
      if (news != undefined) {
        return resolve(news);
      }
      return reject(null);
    })
  }
  constructor(public navCtrl: NavController, private NewsService: NewsService) {
    this.NewsService.getAllCategory().subscribe(res => {
      console.log(res);
      this.Categories = res.Archives;
    })
  }

  loadMore() {
    this.isLoadMore = !this.isLoadMore;
    if (this.isLoadMore == true) {
      this.isDisabled = true;
      this.isOn = false;
    } else {
      this.isDisabled = false;
      this.isOn = true;
    }
  }

  loadCategory(id) {
    this.navCtrl.push(CategoriesPage, {
      "NewsId": id
    });
  }

  loadSearchBar() {
    this.isLoadMore = true;
    this.search = !this.search;
  }

  loadNew() {
    this.navCtrl.push(HotPage);
  }

  loadHomePage() {
    window.location.reload()
  }

  gotoNews(Id) {
    this.navCtrl.push(NewsPage, {
      "NewsId": Id
    });
  }

  readMore(length) {
    this.NewsService.getReadMore(length).subscribe(res => {
      var list = res.news;
      this.Top = [];
      console.log(list);
      list.forEach(w => {
        this.parseJsonToObject(w).then(s => {
          if (s != undefined) {
            this.Top.push(s);
          }
        })
      })
    });
  }

  ngOnInit() {
    this.NewsService.getTop1().subscribe(res => {
      var list = res.news;
      list.forEach(w => {
        this.parseJsonToObject(w).then(s => {
          if (s != undefined)
            this.First = s;
        })
      })
    });

    this.NewsService.getTop4().subscribe(res => {
      var list = res.news;
      list.forEach(w => {
        this.parseJsonToObject(w).then(s => {
          if (s != undefined) {
            this.Top4.push(s);
          }
        })
      })
    });

    this.NewsService.getTop().subscribe(res => {
      var list = res.news;
      console.log(list);
      list.forEach(w => {
        this.parseJsonToObject(w).then(s => {
          if (s != undefined) {
            this.Top.push(s);
          }
        })
      })
    });
  }
}

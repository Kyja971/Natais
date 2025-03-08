import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: false
})
export class HeaderComponent  implements OnInit {
  
  @Input() className: string = '';

  currentPage = ''
  

  constructor(
    private navCtrl: NavController, 
    private route: Router 
  ) { }

  ngOnInit() {
    this.currentPage = this.route.url
  }

  goBack() {
    this.navCtrl.back();
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { Compte } from '../core/Types/compte/compte-class';
import { AuthService } from '../core/services/auth.service';
import { ModalController } from '@ionic/angular';
import { AddAccountComponent } from './components/add-account/add-account.component';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: false,
})
export class Tab3Page implements OnInit{

  @Input()
  comptes: Array<Compte> = []

  @Input()
  num!: number

  @Input()
  id!: number | undefined

  checkboxes: CheckboxData[] = [
    { isChecked: true, value: 'all' },
    { isChecked: false, value: 'super_admin' },
    { isChecked: false, value: 'admin' },
    { isChecked: false, value: 'production' },
    { isChecked: false, value: 'qualité' },
  ];

  constructor(
    private _authService : AuthService,
    private _modalController: ModalController,
  ) { }

  ngOnInit() {
    this._authService.findAll()
    this._authService.auths$.subscribe((auths: Compte[]) => {
      this.comptes = auths;
    })

  }

  toggleCheckbox(event:any) {
    const checkedCheckboxes = this.checkboxes.filter(checkbox => checkbox.isChecked);
    this.comptes = []
    if(this.checkboxes[0].isChecked){
      this._authService.findAll()
      this._authService.auths$.subscribe((auths: Compte[]) => {
        this.comptes = auths;
      })
    }else {
      checkedCheckboxes.forEach((checked: CheckboxData) => {
        this.comptes = this.comptes.concat(this._authService.findByRole(checked.value))
      })
    }
  }

  async onAddAuth() {
    const authModal = await this._modalController.create({
      component : AddAccountComponent,
      initialBreakpoint: 1,
      breakpoints: [0, 1]
    });
    authModal.present();
  }
  

}

interface CheckboxData {
  isChecked: boolean;
  value: string; 
}

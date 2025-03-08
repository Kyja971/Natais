import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/core/services/auth.service';
import { Compte } from 'src/app/core/Types/compte/compte-class';

@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.scss'],
  standalone: false
})
export class AddAccountComponent  implements OnInit {

  form: FormGroup = new FormGroup({});

  @Input()
  compte?: Compte;

  constructor(
    private _formBuilder: FormBuilder,
    private _modalController : ModalController,
    private _authService: AuthService
  ) { }

  ngOnInit() {
    this.form = this._formBuilder.group({
      email: [
        this.compte?.email, 
        [Validators.required],
      ],
      role: [this.compte?.role, [Validators.required]],
    });
  }

  onSubmit() {
    const payload = {
      email: this.form.value.email,
      role: this.form.value.role,
    };
    if(this.compte){
      this._authService.update(this.compte?.id, payload)
    }else{
      this._authService.add(payload)
    }
  }
}

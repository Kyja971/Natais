import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { take } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { SelfInformationService } from 'src/app/core/services/self-information.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { TokenType } from 'src/app/core/Types/token/token-type';

@Component({
  selector: 'app-signing',
  templateUrl: './signing.component.html',
  styleUrls: ['./signing.component.scss'],
  standalone: false,
})
export class SigningComponent implements OnInit {
  form: FormGroup = new FormGroup({});

  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _storage: StorageService,
    private _router: Router,
    private _toastController: ToastController,
    private _selfInformation: SelfInformationService
  ) {}

  ngOnInit() {
    this.form = this._formBuilder.group({
      login: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    const payload = {
      email: this.form.value.login,
      password: this.form.value.password,
    };
    this._authService
      .login(payload)
      .pipe(take(1))
      .subscribe({
        next: (response: TokenType) => {
          if (response) {
            this._storage.store('auth', response.token);
            this._authService.getProfileId(response).subscribe((data) => {
              this._selfInformation.setPersonnal(data);
            });
            this._router.navigate(['tabs']).then(() => {
              this.form.reset();
            });
          }
        },
        error: async (error: any) => {
          console.error(error);
          const toast = await this._toastController.create({
            message: 'Echec de connexion',
            duration: 5000,
            position: 'middle',
            buttons: [
              {
                text: 'Réessayer',
              },
            ],
          });
          toast.present();
          toast.onWillDismiss().then(() => this.form.reset());
        },
      });
  }
}

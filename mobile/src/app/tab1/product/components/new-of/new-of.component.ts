import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { timeValidator } from 'src/app/core/utils/timeValidators';

@Component({
  selector: 'app-new-of',
  templateUrl: './new-of.component.html',
  styleUrls: ['./new-of.component.scss'],
  standalone: false,
})
export class NewOfComponent implements OnInit {
  newOf: FormGroup = new FormGroup({});

  constructor(
    private _formBuilder: FormBuilder,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.newOf = this._formBuilder.group({
      debutProduction: this._formBuilder.array([]), // Ajout de debutProduction
      controleHoraireHeure: [''],
      controleHoraireValeur: [''],
      controle4h: this._formBuilder.array([]),
      etalonnageDate: [''],
      etalonnageResultat: [''],
      finDePosteCommentaires: [''],
    });
  }

  getFormGroup(control: AbstractControl): FormGroup {
    return control as FormGroup;
  }

  get debutProduction() {
    return this.newOf.get('debutProduction') as FormArray<FormGroup>;
  }

  createDebutProductionGroup() {
    return this._formBuilder.group({
      heure: ['', timeValidator],
      conforme: [false],
      nonconforme: [false],
      commentaires: [''],
    });
  }

  async addDebutProduction() {
    //console.log("j'arrive ici");
    if (this.debutProduction.length === 0 || this.isLastBlockValid()) {
      this.debutProduction.push(this.createDebutProductionGroup());
    } else {
      const toast = await this.toastController.create({
        message: 'Veuillez remplir le bloc précédent.',
        duration: 2000,
      });
      toast.present();
    }
  }

  onCheckboxChange(index: number, type: 'conforme' | 'nonconforme') {
    const control = this.debutProduction.at(index) as FormGroup;
    const conformeControl = control.get('conforme');
    const nonconformeControl = control.get('nonconforme');
    const commentairesControl = control.get('commentaires');

    if (type === 'conforme') {
      if (conformeControl?.value) {
        nonconformeControl?.setValue(false);
        commentairesControl?.clearValidators();
        commentairesControl?.setValue('');
      }
    } else {
      if (nonconformeControl?.value) {
        conformeControl?.setValue(false);
        commentairesControl?.setValidators([Validators.required]);
      } else {
        commentairesControl?.clearValidators();
        commentairesControl?.setValue('');
      }
    }

    commentairesControl?.updateValueAndValidity();
    this.debutProduction.updateValueAndValidity();
  }

  removeDebutProduction(index: number) {
    this.debutProduction.removeAt(index);
  }

  isLastBlockValid(): boolean {
    if (this.debutProduction.length === 0) {
      return true; // Si aucun bloc, alors c'est valide
    }
    
    const lastBlock = this.debutProduction.at(this.debutProduction.length - 1) as FormGroup;
    const heureControl = lastBlock.get('heure');
    const conformeControl = lastBlock.get('conforme');
    const nonconformeControl = lastBlock.get('nonconforme');
  
    return (
      lastBlock.valid &&
      heureControl?.value && 
      (conformeControl?.value || nonconformeControl?.value) // Au moins un des deux doit être coché
    );
  }
  

  async validateDebutProduction(index: number) {
    // Récupérer le form group du bloc spécifique
    const control = this.debutProduction.at(index) as FormGroup;
    
    // Cibler uniquement les champs du bloc spécifique pour la validation
    const heureControl = control.get('heure');
    const conformeControl = control.get('conforme');
    const nonconformeControl = control.get('nonconforme');

    // Vérifier que "conforme" et "nonconforme" ne sont pas cochés en même temps
    if (conformeControl?.value && nonconformeControl?.value) {
      const toast = await this.toastController.create({
        message: `Bloc ${index + 1} : Vous ne pouvez pas sélectionner "Conforme" et "Non Conforme" en même temps.`,
        duration: 2000,
        color: 'danger',
      });
      toast.present();
      return;
    }
    
    // Validation spécifique pour les champs de ce bloc
    if (heureControl?.valid && (conformeControl?.value || nonconformeControl?.value)) {
      const toast = await this.toastController.create({
        message: `Bloc ${index + 1} validé avec succès !`,
        duration: 2000,
        color: 'success',
      });
      toast.present();
    } else {
      const toast = await this.toastController.create({
        message: `Veuillez remplir tous les champs requis du bloc ${index + 1}.`,
        duration: 2000,
        color: 'danger',
      });
      toast.present();
    }
  }
  
  

  
  /**
   * third bloc
   */

// Getter pour accéder au FormArray des contrôles 4h
get controle4h() {
  return this.newOf.get('controle4h') as FormArray<FormGroup>;
}

// Création d'un groupe "Contrôle 4h"
createControle4hGroup() {
  return this._formBuilder.group({
    controleMetaux: ['',Validators.required],
    controleMetaux2: ['',Validators.required],
    ejectionSousPoids: ['',Validators.required],
    heureMetauxEjection: ['',Validators.required, timeValidator],
    etalonnage: [''],
    eclatement: [''],
    heureEtalonnageEclatement: ['', timeValidator],
  });
}

// Ajout d'un bloc "Contrôle 4h"
async addControle4h() {
  if (this.controle4h.length === 0 || this.isLastControle4hValid()) {
    this.controle4h.push(this.createControle4hGroup());
  } else {
    const toast = await this.toastController.create({
      message: 'Veuillez remplir le bloc précédent avant d’en ajouter un nouveau.',
      duration: 2000,
      color: 'warning',
    });
    toast.present();
  }
}

async validateControleMetauxEjection(index: number) {
  const control = this.controle4h.at(index) as FormGroup;
  const heure = control.get('heureMetauxEjection');
  const controleMetaux = control.get('controleMetaux');
  const ejectionSousPoids = control.get('ejectionSousPoids');

  if (heure?.valid && controleMetaux?.valid && ejectionSousPoids?.valid) {
    this.showToast(`Bloc ${index + 1} (Métaux & Éjection) validé avec succès !`, 'success');
  } else {
    let message = `Bloc ${index + 1} (Métaux & Éjection) : `;
    if (!heure?.valid) message += `Heure manquante. `;
    if (!controleMetaux?.valid) message += `Résultat Métaux manquant. `;
    if (!ejectionSousPoids?.valid) message += `Résultat Éjection manquant. `;
    
    this.showToast(message.trim(), 'danger');
  }
}

async validateEtalonnageEclatement(index: number) {
  const control = this.controle4h.at(index) as FormGroup;
  const heure = control.get('heureEtalonnageEclatement');
  const etalonnage = control.get('etalonnage');
  const eclatement = control.get('eclatement');

  if (heure?.valid && etalonnage?.valid && eclatement?.valid) {
    this.showToast(`Bloc ${index + 1} (Étalonnage & Éclatement) validé avec succès !`, 'success');
  } else {
    let message = `Bloc ${index + 1} (Étalonnage & Éclatement) : `;
    if (!heure?.valid) message += `Heure manquante. `;
    if (!etalonnage?.valid) message += `Résultat Étalonnage manquant. `;
    if (!eclatement?.valid) message += `Résultat Éclatement manquant. `;

    this.showToast(message.trim(), 'danger');
  }
}


// Suppression d'un bloc "Contrôle 4h"
removeControle4h(index: number) {
  this.controle4h.removeAt(index);
}

// Vérifie si le dernier bloc "Contrôle 4h" est valide avant d'en ajouter un nouveau
isLastControle4hValid(): boolean {
  if (this.controle4h.length === 0) {
    return true; // Si aucun bloc, c'est valide
  }

  const lastBlock = this.controle4h.at(this.controle4h.length - 1) as FormGroup;
  const heureControl = lastBlock.get('heure');
  const controleMetaux = lastBlock.get('controleMetaux');
  const ejectionSousPoids = lastBlock.get('ejectionSousPoids');
  const etalonnage = lastBlock.get('etalonnage');
  const eclatement = lastBlock.get('eclatement');

  return (
    lastBlock.valid &&
    heureControl?.value &&
    controleMetaux?.value &&
    ejectionSousPoids?.value &&
    etalonnage?.value &&
    eclatement?.value
  );
}

// Validation d'un bloc "Contrôle 4h"
async validateControle4h(index: number) {
  const control = this.controle4h.at(index) as FormGroup;
  const heureControl = control.get('heure');
  const controleMetaux = control.get('controleMetaux');
  const ejectionSousPoids = control.get('ejectionSousPoids');
  const etalonnage = control.get('etalonnage');
  const eclatement = control.get('eclatement');

  if (
    heureControl?.valid &&
    controleMetaux?.valid &&
    ejectionSousPoids?.valid &&
    etalonnage?.valid &&
    eclatement?.valid
  ) {
    const toast = await this.toastController.create({
      message: `Bloc ${index + 1} validé avec succès !`,
      duration: 2000,
      color: 'success',
    });
    toast.present();
  } else {
    const toast = await this.toastController.create({
      message: `Veuillez remplir tous les champs requis du bloc ${index + 1}.`,
      duration: 2000,
      color: 'danger',
    });
    toast.present();
  }
}

async showToast(message: string, color: string) {
  const toast = await this.toastController.create({
    message,
    duration: 2000,
    color,
    position: 'middle',
  });
  toast.present();
}

  




  onSubmit() {
    console.log(this.newOf.value);
    // Ajoutez ici la logique pour enregistrer les données
  }

  /**
   * checkFormat heure
   */
  checkTimeFormat(formArray: FormArray, index: number, controlName: string) {
    const control = formArray.at(index).get(controlName);
  
    if (control?.hasError('invalidTime')) {
      this.showInvalidTimeToast();
    }
  }
  
  
  /**
   * toast for invalid time
   */
  async showInvalidTimeToast() {
    const toast = await this.toastController.create({
      message: 'Format de l\'heure invalide. Utilisez HH:mm (ex: 14:30).',
      duration: 3000,
      position: 'middle',
      color: 'danger',
    });
    toast.present();
  }
  
}

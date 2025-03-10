import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { ProductOf } from 'src/app/core/Types/productOf-class.ts/productOf-class';
import { decimalValidator } from 'src/app/core/utils/decimalValidator';
import { timeValidator } from 'src/app/core/utils/timeValidators';

@Component({
  selector: 'app-new-of',
  templateUrl: './new-of.component.html',
  styleUrls: ['./new-of.component.scss'],
  standalone: false,
})
export class NewOfComponent implements OnInit {

  @Input()
  productOf!: ProductOf

  newOf: FormGroup = new FormGroup({});

  
  constructor(
    private _formBuilder: FormBuilder,
    private toastController: ToastController,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.newOf = this._formBuilder.group({
      numeroOf: [this.productOf?.numeroOf, [Validators.required],],
      numeroLot: [this.productOf?.numeroLot, [Validators.required],],
      article: [this.productOf?.article, [Validators.required],],
      ligne: [this.productOf?.ligne, [Validators.required],],
      debutProduction: this._formBuilder.array([]), // Ajout de debutProduction
      controleHoraire: this._formBuilder.array([]),
      controle4h: this._formBuilder.array([]),
      finPoste: this._formBuilder.array([]),
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

  removeDebutProduction(index: number) {
    this.debutProduction.removeAt(index);
  }

  isLastBlockValid(): boolean {
    if (this.debutProduction.length === 0) {
      return true; // Si aucun bloc, alors c'est valide
    }

    const lastBlock = this.debutProduction.at(
      this.debutProduction.length - 1
    ) as FormGroup;
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
    const commentairesControl = control.get('commentaires');

    // Vérifier que "conforme" et "nonconforme" ne sont pas cochés en même temps
    if (conformeControl?.value && nonconformeControl?.value) {
      const toast = await this.toastController.create({
        message: `Bloc ${
          index + 1
        } : Vous ne pouvez pas sélectionner "Conforme" et "Non Conforme" en même temps.`,
        duration: 2000,
        color: 'danger',
      });
      toast.present();
      return;
    }
    // Vérifier que si "Non Conforme" est sélectionné, le champ commentaires est rempli
    if (nonconformeControl?.value && !commentairesControl?.value?.trim()) {
      await this.showToast(
        `Bloc ${
          index + 1
        } : Veuillez remplir le champ "Commentaires" lorsque "Non Conforme" est sélectionné.`,
        'danger'
      );
      return;
    }

    // Validation spécifique pour les champs de ce bloc
    if (
      heureControl?.valid &&
      (conformeControl?.value || nonconformeControl?.value)
    ) {
      const toast = await this.toastController.create({
        message: `Bloc ${index + 1} validé avec succès !`,
        duration: 2000,
        color: 'success',
      });
      toast.present();
    } else {
      const toast = await this.toastController.create({
        message: `Veuillez remplir tous les champs requis du bloc ${
          index + 1
        }.`,
        duration: 2000,
        color: 'danger',
      });
      toast.present();
    }
  }

  /**
   * bloc controle horaire
   */

  get controleHoraire() {
    return this.newOf.get('controleHoraire') as FormArray<FormGroup>;
  }

  createcontroleHoraireGroup() {
    return this._formBuilder.group({
      heure: ['', timeValidator],
      conformeHoraire: [false],
      nonconformeHoraire: [false],
      commentsHoraire: [''],
    });
  }

  async addControleHoraire() {
    if (this.controleHoraire.length === 0 || this.isLastBlockValidControlHoraire()) {
      this.controleHoraire.push(this.createcontroleHoraireGroup());
    } else {
      const toast = await this.toastController.create({
        message: 'Veuillez remplir le bloc précédent.',
        duration: 3000,
      });
      toast.present();
    }
  }

  removeControlHoraire(index: number) {
    this.controleHoraire.removeAt(index);
  }

  isLastBlockValidControlHoraire(): boolean {
    if (this.controleHoraire.length === 0) {
      return true; // Si aucun bloc, alors c'est valide
    }

    const lastBlock = this.controleHoraire.at(
      this.controleHoraire.length - 1
    ) as FormGroup;
    const heureControl = lastBlock.get('heure');
    const conformeControl = lastBlock.get('conformeHoraire');
    const nonconformeControl = lastBlock.get('nonconformeHoraire');

    return (
      lastBlock.valid &&
      heureControl?.value &&
      (conformeControl?.value || nonconformeControl?.value) // Au moins un des deux doit être coché
    );
  }

  async validateControlHoraire(index: number) {
    // Récupérer le form group du bloc spécifique
    const control = this.controleHoraire.at(index) as FormGroup;

    // Cibler uniquement les champs du bloc spécifique pour la validation
    const heureControl = control.get('heure');
    const conformeControl = control.get('conformeHoraire');
    const nonconformeControl = control.get('nonconformeHoraire');
    const commentairesControl = control.get('commentsHoraire');

    // Vérifier que "conforme" et "nonconforme" ne sont pas cochés en même temps
    if (conformeControl?.value && nonconformeControl?.value) {
      const toast = await this.toastController.create({
        message: `Bloc ${
          index + 1
        } : Vous ne pouvez pas sélectionner "Conforme" et "Non Conforme" en même temps.`,
        duration: 2000,
        color: 'danger',
      });
      toast.present();
      return;
    }
    // Vérifier que si "Non Conforme" est sélectionné, le champ commentaires est rempli
    if (nonconformeControl?.value && !commentairesControl?.value?.trim()) {
      await this.showToast(
        `Bloc ${
          index + 1
        } : Veuillez remplir le champ "Commentaires" lorsque "Non Conforme" est sélectionné.`,
        'danger'
      );
      return;
    }

    // Validation spécifique pour les champs de ce bloc
    if (
      heureControl?.valid &&
      (conformeControl?.value || nonconformeControl?.value)
    ) {
      const toast = await this.toastController.create({
        message: `Bloc ${index + 1} validé avec succès !`,
        duration: 2000,
        color: 'success',
      });
      toast.present();
    } else {
      const toast = await this.toastController.create({
        message: `Veuillez remplir tous les champs requis du bloc ${
          index + 1
        }.`,
        duration: 2000,
        color: 'danger',
      });
      toast.present();
    }
  }


  /**
   *  bloc Contrôle 4h
   */

  // Getter pour accéder au FormArray des contrôles 4h
  get controle4h() {
    return this.newOf.get('controle4h') as FormArray<FormGroup>;
  }

  // Création d'un groupe "Contrôle 4h"
  createControle4hGroup() {
    return this._formBuilder.group({
      heureMetaux: ['', timeValidator],
      controleMetaux: ['', Validators.required],
      controleMetaux2: ['', Validators.required],
      ejectionConforme: [false],
      ejectionNonConforme: [false],
      commentEjecNonConforme: [''],
      heureEtalonnage: ['', timeValidator],
      heureEjection: ['', timeValidator],
      EtalonnageMais: ['', Validators.required],
      EtalonnageHuile: ['', Validators.required],
      EtalonnagePoudre: ['', Validators.required],
      prodAvecPoudre: [null],
      peseeMais_: this._formBuilder.array([]), // FormArray pour la première grille
      peseeHuile_: this._formBuilder.array([]),
      peseePoudre_: this._formBuilder.array([]),
      heureEclatement: ['', timeValidator],
      volumeEclatement: ['', Validators.required],
      maisNonEclates: ['', Validators.required],
    });
  }

  initializePesees(index: number): void {
    const control = this.controle4h.at(index);

    const pesee1Array = control.get('peseeMais_') as FormArray;
    const pesee2Array = control.get('peseeHuile_') as FormArray;
    const pesee3Array = control.get('peseePoudre_') as FormArray;

    for (let i = 0; i < 10; i++) {
      pesee1Array.push(this._formBuilder.control('', decimalValidator()));
      pesee2Array.push(this._formBuilder.control('', decimalValidator()));
      pesee3Array.push(this._formBuilder.control('', decimalValidator()));
    }
  }

  // Ajout d'un bloc "Contrôle 4h"
  async addControle4h() {
    if (this.controle4h.length === 0 || this.isLastControle4hValid()) {
      this.controle4h.push(this.createControle4hGroup());
      this.initializePesees(this.controle4h.length - 1);
    } else {
      const toast = await this.toastController.create({
        message:
          'Veuillez remplir le bloc précédent avant d’en ajouter un nouveau.',
        duration: 2000,
        color: 'warning',
      });
      toast.present();
    }
  }

  async validateControleMetaux(index: number) {
    const control = this.controle4h.at(index) as FormGroup;
    const heure = control.get('heureMetaux');
    const controleMetaux = control.get('controleMetaux');

    if (heure?.valid && controleMetaux?.valid) {
      this.showToast(`Bloc ${index + 1} Métaux  validé  !`, 'success');
    } else {
      let message = `Bloc ${index + 1} Métaux : `;
      if (!heure?.valid) message += `Heure manquante/mauvais format. `;
      if (!controleMetaux?.valid) message += `Résultat Métaux manquant. `;

      this.showToast(message.trim(), 'danger');
    }
  }

  async validateControleEjection(index: number) {
    const control = this.controle4h.at(index) as FormGroup;
    const heure = control.get('heureEjection');
    const conformeEjection = control.get('ejectionConforme');
    const nonconformeEjection = control.get('ejectionNonConforme');
    const commentEjection = control.get('commentEjecNonConforme');

    // Vérifier que "conforme" et "nonconforme" ne sont pas cochés en même temps
    if (conformeEjection?.value && nonconformeEjection?.value) {
      const toast = await this.toastController.create({
        message: `Bloc ${
          index + 1
        } : Vous ne pouvez pas sélectionner "Conforme" et "Non Conforme" en même temps.`,
        duration: 2000,
        color: 'danger',
      });
      toast.present();
      return;
    }
    // Vérifier que si "Non Conforme" est sélectionné, le champ commentaires est rempli
    if (nonconformeEjection?.value && !commentEjection?.value?.trim()) {
      await this.showToast(
        `Bloc ${
          index + 1
        } : Veuillez remplir le champ "Commentaires" lorsque "Non Conforme" est sélectionné.`,
        'danger'
      );
      return;
    }
    // Validation spécifique pour les champs de ce bloc
    if (
      heure?.valid &&
      (conformeEjection?.value || nonconformeEjection?.value)
    ) {
      const toast = await this.toastController.create({
        message: `Bloc ${index + 1} Etalonnage validé !`,
        duration: 2000,
        color: 'success',
      });
      toast.present();
    } else {
      const toast = await this.toastController.create({
        message: `Veuillez remplir tous les champs requis du bloc ${
          index + 1
        }.`,
        duration: 2000,
        color: 'danger',
      });
      toast.present();
    }
  }

  async validateEtalonnage(index: number) {
    const control = this.controle4h.at(index) as FormGroup;
    const heure = control.get('heureEtalonnage');
    const etalonnageMais = control.get('EtalonnageMais');
    const etalonnageHuile = control.get('EtalonnageHuile');
    const prodAvecPoudre = control.get('prodAvecPoudre')?.value;
    const etalonnagePoudre = control.get('EtalonnagePoudre');

    const peseeMais = control.get('peseeMais_') as FormArray;
    const peseeHuile = control.get('peseeHuile_') as FormArray;
    const peseePoudre = control.get('peseePoudre_') as FormArray;

    let message = `Bloc ${index + 1} Étalonnage : `;
    let isValid = true;

    // Vérifie si une valeur est 0 ou vide
    const isEmptyOrZero = (value: any) => !value || Number(value) === 0;

    // Vérifie si un tableau de FormControls contient une valeur égale à 0
    const isZeroInArray = (formArray: FormArray) =>
      formArray.controls.some((control) => isEmptyOrZero(control.value));

    // Vérifications stockées dans un tableau
    const checks = [
      {
        condition: isEmptyOrZero(heure?.value),
        errorMsg: 'Heure manquante ou invalide.',
      },
      { field: etalonnageMais, errorMsg: 'Résultat maïs manquant.' },
      { field: etalonnageHuile, errorMsg: 'Résultat huile manquant.' },
      {
        condition: isZeroInArray(peseeMais),
        errorMsg: 'Pesée maïs est à 0.',
      },
      {
        condition: isZeroInArray(peseeHuile),
        errorMsg: 'Pesée huile est à 0.',
      },
    ];

    // Vérification supplémentaire si production avec poudre activée
    if (prodAvecPoudre) {
      checks.push({
        field: etalonnagePoudre,
        errorMsg: 'Résultat poudre manquant.',
      });
      checks.push({
        condition: isZeroInArray(peseePoudre),
        errorMsg: 'Pesée poudre est à 0.',
      });
    }

    // Exécution des vérifications
    for (const check of checks) {
      if (check.field && !check.field.valid) {
        isValid = false;
        message += `${check.errorMsg} `;
      }
      if (check.condition) {
        isValid = false;
        message += `${check.errorMsg} `;
      }
    }

    // Affichage du résultat
    if (isValid) {
      this.showToast(`Bloc ${index + 1} Étalonnage validé !`, 'success');
    } else {
      this.showToast(message.trim(), 'danger');
    }
  }

  /**
   * renvoie true or false si poudre est cochée
   * @param index
   * @param value
   */
  setProdAvecPoudre(index: number, value: boolean) {
    this.controle4h.at(index).get('prodAvecPoudre')?.setValue(value);
  }

  async validateEclatement(index: number) {
    const control = this.controle4h.at(index) as FormGroup;
    const heure = control.get('heureEclatement');
    const volumeEclatement = control.get('volumeEclatement');
    const maisNonEclates = control.get('maisNonEclates');
  
    console.log('voici format de heure', heure);
  
    // Vérification de la valeur de heureEclatement
    const heureValue = heure?.value;
    const isHeureValid =
      heure?.valid &&
      heureValue !== null &&
      heureValue !== undefined &&
      heureValue !== '' &&
      heureValue != 0; // Optionnel : Vous pouvez vérifier que l'heure est un nombre positif
  
    if (isHeureValid && volumeEclatement?.valid && maisNonEclates?.valid) {
      this.showToast(`Bloc ${index + 1} Eclatement validé !`, 'success');
    } else {
      let message = `Bloc ${index + 1} Éclatement : `;
      if (!isHeureValid) message += `Heure manquante/mauvaise saisie. `;
      if (!volumeEclatement?.valid) message += `Volume manquant. `;
      if (!maisNonEclates?.valid) message += `Mais non éclatés manquant. `;
  
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

    const lastBlock = this.controle4h.at(
      this.controle4h.length - 1
    ) as FormGroup;
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
        message: `Veuillez remplir tous les champs requis du bloc ${
          index + 1
        }.`,
        duration: 2000,
        color: 'danger',
      });
      toast.present();
    }
  }

  /**
   *  bloc Contrôle 4h
   */

  async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 4000,
      color,
      position: 'middle',
    });
    toast.present();
  }

  /**
   * Bloc Fin de poste
   */
  get finPoste() {
    return this.newOf.get('finPoste') as FormArray<FormGroup>;
  }

  createFinPosteGroup() {
    return this._formBuilder.group({
      heure: ['', timeValidator],
      conformeMaterielFin: [false],
      nonconformeMaterielFin: [false],
      commentsMaterielFin: [''],
    });
  }

  async addFinPoste() {
    if (this.finPoste.length === 0 || this.isLastBlockValidFinPoste()) {
      this.finPoste.push(this.createFinPosteGroup());
    } else {
      const toast = await this.toastController.create({
        message: 'Veuillez remplir le bloc précédent.',
        duration: 2000,
      });
      toast.present();
    }
  }

  removeFinPoste(index: number) {
    this.finPoste.removeAt(index);
  }

  isLastBlockValidFinPoste(): boolean {
    if (this.finPoste.length === 0) {
      return true; // Si aucun bloc, alors c'est valide
    }

    const lastBlock = this.finPoste.at(
      this.finPoste.length - 1
    ) as FormGroup;
    const heureControl = lastBlock.get('heure');
    const conformeControl = lastBlock.get('conformeMaterielFin');
    const nonconformeControl = lastBlock.get('nonconformeMaterielFin');

    return (
      lastBlock.valid &&
      heureControl?.value &&
      (conformeControl?.value || nonconformeControl?.value) // Au moins un des deux doit être coché
    );
  }

  async validateFinPoste(index: number) {
    // Récupérer le form group du bloc spécifique
    const control = this.finPoste.at(index) as FormGroup;

    // Cibler uniquement les champs du bloc spécifique pour la validation
    const heureControl = control.get('heure');
    const conformeControl = control.get('conformeMaterielFin');
    const nonconformeControl = control.get('nonconformeMaterielFin');
    const commentairesControl = control.get('commentsMaterielFin');

    // Vérifier que "conforme" et "nonconforme" ne sont pas cochés en même temps
    if (conformeControl?.value && nonconformeControl?.value) {
      const toast = await this.toastController.create({
        message: `Bloc ${
          index + 1
        } : Vous ne pouvez pas sélectionner "Conforme" et "Non Conforme" en même temps.`,
        duration: 2000,
        color: 'danger',
      });
      toast.present();
      return;
    }
    // Vérifier que si "Non Conforme" est sélectionné, le champ commentaires est rempli
    if (nonconformeControl?.value && !commentairesControl?.value?.trim()) {
      await this.showToast(
        `Bloc ${
          index + 1
        } : Veuillez remplir le champ "Commentaires" lorsque "Non Conforme" est sélectionné.`,
        'danger'
      );
      return;
    }

    // Validation spécifique pour les champs de ce bloc
    if (
      heureControl?.valid &&
      (conformeControl?.value || nonconformeControl?.value)
    ) {
      const toast = await this.toastController.create({
        message: `Bloc ${index + 1} validé avec succès !`,
        duration: 2000,
        color: 'success',
      });
      toast.present();
    } else {
      const toast = await this.toastController.create({
        message: `Veuillez remplir tous les champs requis du bloc ${
          index + 1
        }.`,
        duration: 2000,
        color: 'danger',
      });
      toast.present();
    }
  }


  /**
   * disply immediatly numbers of grid
   */
  trackByFn(index: any, item: any) {
    return index;
  }

  shouldShowGrid(index: number): boolean {
    return (
      +this.controle4h.at(index).get('EtalonnageMais')?.value > 0 &&
      +this.controle4h.at(index).get('EtalonnageHuile')?.value > 0
    );
  }

  shouldShowPowder(index: number): boolean {
    return +this.controle4h.at(index).get('EtalonnagePoudre')?.value > 0;
  }

  generateRows(): any[] {
    return Array(10)
      .fill(0)
      .map((_, index) => index);
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
   * check checkbox checked
   */
  onCheckboxChangeGeneric(
    formArray: FormArray,
    index: number,
    checkbox1: string,
    checkbox2: string,
    commentField: string
  ) {
    const control = formArray.at(index) as FormGroup;
    const checkbox1Control = control.get(checkbox1);
    const checkbox2Control = control.get(checkbox2);
    const commentControl = control.get(commentField);

    if (checkbox1Control?.value) {
      checkbox2Control?.setValue(false);
      commentControl?.clearValidators();
      commentControl?.setValue('');
    } else if (checkbox2Control?.value) {
      checkbox1Control?.setValue(false);
      commentControl?.setValidators([Validators.required]);
    } else {
      commentControl?.clearValidators();
      commentControl?.setValue('');
    }

    commentControl?.updateValueAndValidity();
    formArray.updateValueAndValidity();
  }

  /**
   * toast for invalid time
   */
  async showInvalidTimeToast() {
    const toast = await this.toastController.create({
      message: "Format de l'heure invalide. Utilisez HH:mm (ex: 14:30).",
      duration: 3000,
      position: 'middle',
      color: 'danger',
    });
    toast.present();
  }
}

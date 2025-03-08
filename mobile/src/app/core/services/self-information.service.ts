import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class SelfInformationService {

  private _role?: string;

  constructor(
    private _storage: StorageService
  ) { }

  setPersonnal(compte: string) {
    this._storage.store('self', compte)
  }

  retrievePersonnal() {
    return this._storage.retrieve('self')
  }

  removePersonnal() {
    this._storage.remove('self')
  }

  isAdminOrSuperAdmin(): boolean {
    return (this._role==='admin' || this._role==='super_admin')
  }

  public get role(): string | undefined {
    return this._role;
  }
  
  public set role(value: string | undefined) {
    this._role = value;
  }

}

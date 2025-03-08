import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private _storageEngine = localStorage

  constructor() { }


  store(key: string, value: any): void { 
    const data: string = JSON.stringify(value)
    this._storageEngine.setItem(key, data)
  }

  retrieve(key: string): any | null {
    const rawData: string | null = this._storageEngine.getItem(key)

    return rawData ? JSON.parse(rawData) : rawData
  }

  remove(key: string): void {
    this._storageEngine.removeItem(key)
  }
}

import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private _storage: Storage | null = null;

  private squatPRSubject = new BehaviorSubject<number | null>(null);
  private benchPRSubject = new BehaviorSubject<number | null>(null);
  private deadliftPRSubject = new BehaviorSubject<number | null>(null);

  public squatPR$ = this.squatPRSubject.asObservable();
  public benchPR$ = this.benchPRSubject.asObservable();
  public deadliftPR$ = this.deadliftPRSubject.asObservable();

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
    this.squatPRSubject.next(await this.getItem('squatPRAdded'));
    this.benchPRSubject.next(await this.getItem('benchPRAdded'));
    this.deadliftPRSubject.next(await this.getItem('deadliftPRAdded'));
  }

  async setItem(key: string, value: any) {
    await this._storage?.set(key, value);
    if (key === 'squatPRAdded') {
      this.squatPRSubject.next(value);
    } else if (key === 'benchPRAdded') {
      this.benchPRSubject.next(value);
    } else if (key === 'deadliftPRAdded') {
      this.deadliftPRSubject.next(value);
    }
  }

  async getItem(key: string) {
    const value = await this.storage.get(key);
    return value || null;
  }

  async removeItem(key: string) {
    await this._storage?.remove(key);
    if (key === 'squatPRAdded') {
      this.squatPRSubject.next(null);
    } else if (key === 'benchPRAdded') {
      this.benchPRSubject.next(null);
    } else if (key === 'deadliftPRAdded') {
      this.deadliftPRSubject.next(null);
    }
  }

  async clear() {
    await this._storage?.clear();
    this.squatPRSubject.next(null);
    this.benchPRSubject.next(null);
    this.deadliftPRSubject.next(null);
  }
}

import { Component, OnInit, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { StorageService } from './storage-service.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  private router: Router = inject(Router);

  squatPR!: number;
  benchPR!: number;
  deadliftPR!: number;

  isButtonToggle: boolean = false;
  buttonContent: string = 'Update PRs';

  async ngOnInit() {
    this.storageService.init();

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isButtonToggle = false;
        this.buttonContent = 'Update PRs';
      }
    });

    const squatPRFromStorage = await this.storageService.getItem(
      'squatPRAdded'
    );
    const benchPRFromStorage = await this.storageService.getItem(
      'benchPRAdded'
    );
    const deadliftPRFromStorage = await this.storageService.getItem(
      'deadliftPRAdded'
    );

    this.squatPR = squatPRFromStorage;
    this.benchPR = benchPRFromStorage;
    this.deadliftPR = deadliftPRFromStorage;
  }

  constructor(private storageService: StorageService) {}

  async saveNewPRs() {
    this.isButtonToggle = !this.isButtonToggle;
    this.buttonContent = this.isButtonToggle ? 'Save New PRs' : 'Update PRs';

    await this.storageService.setItem('squatPRAdded', this.squatPR);
    await this.storageService.setItem('benchPRAdded', this.benchPR);
    await this.storageService.setItem('deadliftPRAdded', this.deadliftPR);
  }

  onKeyup(event: any) {
    const enteredValue = event.target.value;
    if (enteredValue.length > 3) {
      event.target.value = enteredValue.substring(0, 3);
    }
  }
}

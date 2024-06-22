import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from '../tab2/storage-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit, OnDestroy {
  private storageService: StorageService = inject(StorageService);
  private subscriptions: Subscription[] = [];

  topSet!: number;
  personalRecord!: number;
  formTopSet: FormGroup;
  topSetCalculated: boolean = false;
  customWeightToggle: boolean = true;

  squatPR!: number;
  benchPR!: number;
  deadliftPR!: number;
  buttonContent: string = 'Custom Weight';

  constructor(private fb: FormBuilder) {
    this.storageService.init();
    this.formTopSet = this.fb.group({
      percentage: [
        '',
        [
          Validators.required,
          Validators.max(100),
          Validators.pattern('^[0-9]*$'),
        ],
      ],
      personalRecord: ['', [Validators.required]],
    });
  }

  async ngOnInit(): Promise<void> {
    await this.loadPersonalRecords();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  async loadPersonalRecords(): Promise<void> {
    this.subscriptions.push(
      this.storageService.squatPR$.subscribe((value) => {
        this.squatPR = value ?? 0;
      }),
      this.storageService.benchPR$.subscribe((value) => {
        this.benchPR = value ?? 0;
      }),
      this.storageService.deadliftPR$.subscribe((value) => {
        this.deadliftPR = value ?? 0;
      })
    );
  }

  calculateTopSet() {
    this.customWeightToggle
      ? this.calculateTopSetPR()
      : this.calculateTopSetCustomWeight();
  }

  calculateTopSetPR() {
    const percentage = Number(this.formTopSet.get('percentage')?.value);
    const personalRecord = Number(this.formTopSet.get('personalRecord')?.value);
    this.topSetCalculated = true;
    this.topSet = (personalRecord / 100) * percentage;
  }

  calculateTopSetCustomWeight() {
    const percentage = Number(this.formTopSet.get('percentage')?.value);
    const personalRecord = Number(this.formTopSet.get('personalRecord')?.value);
    this.topSetCalculated = true;
    this.topSet = (personalRecord / 100) * percentage;
    this.topSet = personalRecord - this.topSet;
  }

  topSetReset() {
    this.topSetCalculated = false;
    this.customWeightToggle = !this.customWeightToggle;
  }

  toggleSelect() {
    this.customWeightToggle = !this.customWeightToggle;

    this.buttonContent = this.customWeightToggle ? 'Custom Weight' : 'Your PRs';
  }
}

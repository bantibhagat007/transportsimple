import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Trip } from '../../types/route.types';

@Component({
  selector: 'app-route-input',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <div class="route-input">
      <h3>Add New Route</h3>
      <form [formGroup]="tripForm" (ngSubmit)="onSubmit()">
        <mat-form-field appearance="outline">
          <mat-label>Start Point</mat-label>
          <input 
            matInput 
            formControlName="startPoint" 
            placeholder="Enter 3 letter code (e.g. BLR)"
            maxlength="3"
            style="text-transform: uppercase;"
          >
          <mat-error *ngIf="tripForm.get('startPoint')?.hasError('pattern')">
            Please enter a valid 3-letter code
          </mat-error>
          <mat-error *ngIf="tripForm.get('startPoint')?.hasError('required')">
            Start point is required
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>End Point</mat-label>
          <input 
            matInput 
            formControlName="endPoint" 
            placeholder="Enter 3 letter code (e.g. MAA)"
            maxlength="3"
            style="text-transform: uppercase;"
          >
          <mat-error *ngIf="tripForm.get('endPoint')?.hasError('pattern')">
            Please enter a valid 3-letter code
          </mat-error>
          <mat-error *ngIf="tripForm.get('endPoint')?.hasError('required')">
            End point is required
          </mat-error>
        </mat-form-field>

        <button mat-raised-button color="primary" type="submit" [disabled]="tripForm.invalid">
          <mat-icon>add</mat-icon>
          Add Trip
        </button>
      </form>
    </div>
  `,
  styles: [`
    .route-input {
      h3 {
        color: #0537ac;
        margin: 0 0 2rem;
        font-size: 1.5rem;
        font-weight: 600;
        letter-spacing: -0.5px;
      }

      form {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
      }

      mat-form-field {
        width: 100%;

        ::ng-deep {
          .mat-mdc-form-field-wrapper {
            margin: 0;
          }

          .mat-mdc-text-field-wrapper {
            background: #f8f9fa;
            border-radius: 8px;
          }

          .mat-mdc-form-field-outline {
            border-radius: 8px;
          }

          .mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-notched-outline__leading,
          .mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-notched-outline__notch,
          .mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-notched-outline__trailing {
            border-color: #dee2e6;
          }

          .mat-mdc-form-field-icon-prefix {
            color: #0537ac;
            opacity: 0.8;
          }
        }
      }

      button {
        margin-top: 1rem;
        height: 48px;
        background-color: #0537ac !important;
        color: white;
        border-radius: 8px;
        font-weight: 500;
        letter-spacing: 0.5px;
        box-shadow: 0 2px 4px rgba(5, 55, 172, 0.2);
        transition: all 0.2s ease;

        &:not(:disabled):hover {
          box-shadow: 0 4px 8px rgba(5, 55, 172, 0.3);
          transform: translateY(-1px);
        }

        &:disabled {
          background-color: #dee2e6 !important;
          box-shadow: none;
        }

        mat-icon {
          margin-right: 8px;
          font-size: 20px;
        }
      }
    }
  `]
})
export class RouteInputComponent {
    @Output() addTrip = new EventEmitter<Trip>();

    tripForm: FormGroup;
    tripCounter = 0;

    constructor(private fb: FormBuilder) {
        this.tripForm = this.fb.group({
            startPoint: ['', [
                Validators.required, 
                Validators.pattern(/^[A-Za-z]{3}$/)
            ]],
            endPoint: ['', [
                Validators.required, 
                Validators.pattern(/^[A-Za-z]{3}$/)
            ]]
        });
    }

    onSubmit(): void {
        if (this.tripForm.valid) {
            this.tripCounter++;
            const newTrip: Trip = {
                id: this.tripCounter,
                startPoint: this.tripForm.value.startPoint.toUpperCase(),
                endPoint: this.tripForm.value.endPoint.toUpperCase(),
            };

            this.addTrip.emit(newTrip);
            this.tripForm.reset();
        }
    }

    isFieldInvalid(fieldName: string): boolean {
        const field = this.tripForm.get(fieldName);
        return field ? field.invalid && field.touched : false;
    }

    getErrorMessage(fieldName: string): string {
        const field = this.tripForm.get(fieldName);
        if (!field) return '';
        
        if (field.hasError('required')) {
            return `${fieldName === 'startPoint' ? 'Start' : 'End'} point is required`;
        }
        
        if (field.hasError('minlength')) {
            return `${fieldName === 'startPoint' ? 'Start' : 'End'} point must be at least 3 characters`;
        }
        
        return '';
    }
}

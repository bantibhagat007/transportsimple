import { Component } from '@angular/core';
import { RouteInputComponent } from './components/route-input/route-input.component';
import { RouteVisualizationComponent } from './components/route-visualization/route-visualization.component';
import { Trip } from './types/route.types';
import { NgIf } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouteInputComponent, RouteVisualizationComponent, NgIf, MatToolbarModule, MatIconModule],
  template: `
    <div class="app-container">
      <mat-toolbar color="primary">
        <span>{{ title }}</span>
      </mat-toolbar>

      <div class="content-wrapper">
        <section class="input-section">
          <app-route-input (addTrip)="addNewTrip($event)"></app-route-input>
        </section>

        <section class="visualization-section">
          <div *ngIf="trips.length > 0" class="trips-wrapper">
            <h2>Your Travel Path</h2>
            <app-route-visualization [trips]="trips"></app-route-visualization>
          </div>

          <div *ngIf="trips.length === 0" class="no-trips">
            <div class="empty-state">
              <mat-icon>directions</mat-icon>
              <p>Add your first trip to visualize your travel path!</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    }

    mat-toolbar {
      background: #0537ac !important;
      color: white;
      box-shadow: 0 2px 4px rgba(5, 55, 172, 0.2);
    }

    .content-wrapper {
      max-width: 1400px;
      margin: 2rem auto;
      padding: 0 2rem;
      display: grid;
      grid-template-columns: 1fr;
      gap: 2rem;

      @media (min-width: 768px) {
        grid-template-columns: 350px 1fr;
      }
    }

    .input-section, .visualization-section {
      background: white;
      border-radius: 12px;
      padding: 2rem;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05), 
                  0 10px 15px rgba(0, 0, 0, 0.025);
      transition: box-shadow 0.3s ease;

      &:hover {
        box-shadow: 0 6px 8px rgba(0, 0, 0, 0.08), 
                    0 12px 18px rgba(0, 0, 0, 0.04);
      }
    }

    .visualization-section {
      min-height: 500px;
      position: relative;

      h2 {
        color: #0537ac;
        font-size: 1.75rem;
        margin: 0 0 2rem;
        font-weight: 600;
        letter-spacing: -0.5px;
      }
    }

    .empty-state {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      width: 100%;
      padding: 2rem;
      
      mat-icon {
        font-size: 64px;
        width: 64px;
        height: 64px;
        margin-bottom: 1.5rem;
        color: #0537ac;
        opacity: 0.9;
      }

      p {
        font-size: 1.25rem;
        color: #6c757d;
        line-height: 1.6;
      }
    }
  `],
})
export class AppComponent {
  title = 'Trip Planner';
  trips: Trip[] = [];

  addNewTrip(trip: Trip): void {
    this.trips = [...this.trips, trip];
  }
}

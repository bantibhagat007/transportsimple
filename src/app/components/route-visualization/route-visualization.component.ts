import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Trip } from '../../types/route.types';

@Component({
  selector: 'app-route-visualization',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="visualization-container">
      <div class="routes-container">
        <div class="routes-list">
          <ng-container *ngFor="let trip of processedTrips; let i = index; let last = last">
            <div class="route-segment" [class.level-2]="trip.level === 2">
              <div class="route-point">
                <div class="point-dot"></div>
                <span class="point-code">{{ getShortCode(trip.startPoint) }}</span>
              </div>

              <div class="route-line" [class.continued]="trip.continued">
                <div class="line-label">{{ getShortCode(trip.startPoint) }} - {{ getShortCode(trip.endPoint) }}</div>
                <div *ngIf="!trip.continued" class="arrow-head"></div>
              </div>

              <div class="route-point" *ngIf="last || !trip.continued">
                <div class="point-dot"></div>
                <span class="point-code">{{ getShortCode(trip.endPoint) }}</span>
              </div>
            </div>
          </ng-container>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .visualization-container {
      width: 100%;
      overflow-x: auto;
      padding: 20px 0;
    }

    .routes-container {
      min-width: min-content;
    }

    .routes-list {
      display: flex;
      flex-direction: column;
      gap: 30px;
      padding: 10px;
    }

    .route-segment {
      display: flex;
      align-items: center;
      min-width: 300px;
      height: 30px;
      position: relative;

      &.level-2 {
        margin-left: 40px;
        
        .route-line {
          background: #FFA726;
          
          &::before {
            content: '';
            position: absolute;
            left: -40px;
            top: 50%;
            width: 40px;
            height: 2px;
            background: #FFA726;
          }
        }
      }
    }

    .route-point {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 5px;
      z-index: 2;

      .point-dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: #0537ac;
      }

      .point-code {
        font-size: 12px;
        font-weight: 500;
        color: #0537ac;
      }
    }

    .route-line {
      flex: 1;
      height: 2px;
      background: #0537ac;
      margin: 0 15px;
      position: relative;
      min-width: 100px;

      .line-label {
        position: absolute;
        top: -18px;
        left: 50%;
        transform: translateX(-50%);
        font-size: 12px;
        color: #666;
        white-space: nowrap;
      }

      .arrow-head {
        position: absolute;
        right: -6px;
        top: -4px;
        width: 0;
        height: 0;
        border-top: 4px solid transparent;
        border-bottom: 4px solid transparent;
        border-left: 8px solid #0537ac;
      }
    }
  `]
})
export class RouteVisualizationComponent implements OnChanges {
    @Input() trips: Trip[] = [];
    processedTrips: Trip[] = [];

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['trips']) {
            this.processTrips();
        }
    }

    processTrips(): void {
        this.processedTrips = [...this.trips];
        for (let i = 0; i < this.processedTrips.length; i++) {
            this.processedTrips[i].level = 1;

            if (i > 0) {
                if (
                    this.processedTrips[i - 1].endPoint ===
                    this.processedTrips[i].startPoint
                ) {
                    this.processedTrips[i].continued = true;
                } else {
                    this.processedTrips[i].continued = false;
                }

                if (
                    this.processedTrips[i - 1].startPoint ===
                    this.processedTrips[i].startPoint &&
                    this.processedTrips[i - 1].endPoint ===
                    this.processedTrips[i].endPoint
                ) {
                    this.processedTrips[i].level = 2;
                }
            } else {
                this.processedTrips[i].continued = false;
            }
        }
    }

    getShortCode(text: string): string {
        return text.substring(0, 3);
    }
}

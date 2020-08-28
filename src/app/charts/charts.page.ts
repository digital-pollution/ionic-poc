import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { deliveryData } from './chart-sample-data';
import { DonutChartComponent } from './chart';

export class OrderState {
  state: string;
  stateDisplayValue: string;
  count: number;
}

@Component({
  selector: 'app-charts',
  templateUrl: './charts.page.html',
  styleUrls: ['./charts.page.scss'],
})
export class ChartsPage implements OnInit, OnDestroy {
  @ViewChild('ordersByStatusChart', { static: true }) chart: DonutChartComponent;
  orderStates: OrderState[];
  chartData: number[] = [];
  displayedColumns = ['legend', 'orderStatus', 'total'];
  refreshInterval;
  showData = false;

  constructor() {}

  ngOnInit() {}

  ngOnDestroy() {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }
  }

  ngAfterContentInit() {
    this.initializeChart();
  }

  initializeChart() {
    if (this.refreshInterval) { clearInterval(this.refreshInterval); }

    this.generateData();
    
    this.chart.data = [...this.chartData];
    
    this.refreshInterval = setInterval(() => {
      if (document.hasFocus()) {
        this.updateStates();
        this.chart.data = [...this.chartData];
      }
    }, 1000);

  }

  generateData() {
    this.orderStates = [];
    this.chartData = [];
    
    deliveryData.orderStates.forEach((state) => {
      const target = new OrderState();
      target.state = state.state;
      target.stateDisplayValue = state.stateDisplayValue;
      target.count = randomInt(0, 100);
      this.orderStates.push(target);
    });

    this.orderStates.forEach((state) => {
      this.chartData.push(state.count);
    });
  }

  updateStates() {
    const increment = (val, plus, minus) => { return val + plus - minus; }
    const newOrders = randomInt(0, 10);
    const newReady = randomInt(0, Math.min(10, this.orderStates[0].count));
    const newTransit = randomInt(0, Math.min(10, this.orderStates[1].count));
    const newDelivered = randomInt(0, Math.min(10, this.orderStates[2].count));
    
    this.orderStates[0].count = increment(this.orderStates[0].count, newOrders, newReady);
    this.orderStates[1].count = increment(this.orderStates[1].count, newReady, newTransit);
    this.orderStates[2].count = increment(this.orderStates[2].count, newTransit, newDelivered);
    this.orderStates[3].count = increment(this.orderStates[3].count, newDelivered, 0);
    
    this.chartData = [];
    
    this.orderStates.forEach((state) => {
      this.chartData.push(state.count);
    });
  }

  toggleData($event) {
    this.showData = $event.detail.checked;
  }
}


function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
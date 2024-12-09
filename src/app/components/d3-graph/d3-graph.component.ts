import { Component, ElementRef, Input, OnChanges, OnInit } from '@angular/core';
import * as d3 from 'd3';
@Component({
  selector: 'app-d3-graph',
  templateUrl: './d3-graph.component.html',
  styleUrls: ['./d3-graph.component.scss']
})
export class D3GraphComponent implements OnInit, OnChanges {

 
  @Input() data: { timestamp: number; partsPerMinute: number }[] = [];
  private svg: any; 
  private width = 700; 
  private height = 400; 
  private margin = { top: 20, right: 30, bottom: 30, left: 50 }; 

  constructor(private elRef: ElementRef) {}

  ngOnInit(): void {
    console.log('svgggg')
    this.createSvg();
  }

  ngOnChanges(): void {
    if (this.svg && this.data.length) {
      this.drawChart();
    }
  }

  private createSvg(): void {
    this.svg = d3
      .select(this.elRef.nativeElement.querySelector('.chart-container'))
      .append('svg')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
      .append('g')
      .attr('transform', `translate(${this.margin.left},${this.margin.top})`);
  }

  private drawChart(): void {
    this.svg.selectAll('*').remove();

    const x = d3
      .scaleTime()
      .domain(d3.extent(this.data, (d) => new Date(d.timestamp)) as [Date, Date])
      .range([0, this.width]);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(this.data, (d) => d.partsPerMinute) || 0])
      .nice()
      .range([this.height, 0]);

    this.svg
      .append('g')
      .attr('transform', `translate(0,${this.height})`)
      .call(d3.axisBottom(x));

   
    this.svg.append('g').call(d3.axisLeft(y));

    this.svg
      .append('path')
      .datum(this.data)
      .attr('stroke-width', 2)
      .attr(
        'd',
        d3
          .line<{ timestamp: number; partsPerMinute: number }>()
          .x((d) => x(new Date(d.timestamp)))
          .y((d) => y(d.partsPerMinute))
      );
  }
}


 
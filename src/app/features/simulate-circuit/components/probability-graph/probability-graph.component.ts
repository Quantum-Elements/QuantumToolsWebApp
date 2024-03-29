import { Component, ElementRef, Input } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'probability-graph',
  templateUrl: './probability-graph.component.html',
  styleUrl: './probability-graph.component.scss'
})
export class ProbabilityGraphComponent {
  @Input() data = []
  private svg: any;
  private width = 650;
  private height = 300;
  private margin = 20;
  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
    this.width = this.elementRef.nativeElement.offsetWidth
    this.height = this.elementRef.nativeElement.offsetHeight
  }
  ngAfterViewInit() {
    this.createSvg();
    this.drawGraph();
  }
  ngOnChanges(changes) {
    if (changes.data) {
      this.createSvg()
      this.drawGraph()
    }
  }

  private createSvg(): void {
    d3.select('figure > svg').remove()
    d3.selectAll('figure > .tooltip').remove()
    this.svg = d3
      .select('figure')
      .append('svg')
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr("style", "max-width: 100%; height: 100%; width: 100%")
      .append("g")
      .attr("transform", "translate(" + this.margin + ", 0)");
  }
  private drawGraph(): void {
    // Create the X-axis band scale
    const x = d3.scaleBand()
      .range([this.margin, this.width - this.margin])
      .domain(this.data.map(d => d.position))
      .padding(0.2);

    // Draw the X-axis on the DOM
    this.svg.append("g")
      .attr("transform", "translate(0," + (this.height) + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,5)rotate(-45)")
      .style("text-anchor", "end");

    // x axis label
    this.svg.append("text")
      .attr("x", this.width / 2)
      .attr("y", this.height + 2 * this.margin)
      .attr("text-anchor", "middle")
      .style('font-size', 11)
      .text("Computational basis states")
      .style('fill', '#F5F7FF')
      .style('font-weight', 'bold');

    // Create the Y-axis band scale
    const y = d3.scaleLinear()
      .domain([0, 100])
      .range([this.height, this.margin]);

    // Draw the Y-axis on the DOM
    this.svg.append("g")
      .call(d3.axisLeft(y).ticks(5))
      .attr("transform", "translate(20, 0)");

    this.svg.append("text") // y axis label
      .attr("transform", "rotate(-90)")
      .attr("y", -this.margin)
      .attr("x", -(this.height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .style('font-size', 11)
      .text("Probability (%)")
      .style('fill', '#F5F7FF')
      .style('font-weight', 'bold');

    // Tooltip label to show percentage
    let tooltip = d3.select("figure").append("div")
      .attr("class", "tooltip")
      .style("visibility", "hidden")
      .style("padding", "0.7rem")
      .style("background-color", 'var(--fillColorPrimary)')
      .style("z-index", "10")
      .style("position", "absolute")
      .style("border-radius", "0.5rem");

    // Create and fill the bars
    this.svg.selectAll("bars")
      .data(this.data)
      .enter()
      .append("rect")
      .attr("x", (d: any) => x(d.position))
      .attr("y", (d: any) => y(d.probability * 100))
      .attr("width", x.bandwidth())
      .attr("height", (d: any) => y(0) - y(d.probability * 100))
      .attr("fill", "#F5F7FF")
      .on("mouseover", (event, d) => { tooltip.text((d.probability * 100).toFixed(2) + '%'); return tooltip.style("visibility", "visible") })
      .on("mousemove", (event) => { return tooltip.style("top", (event.pageY - 10) + "px").style("left", (event.pageX + 10) + "px"); })
      .on("mouseout", () => { return tooltip.style("visibility", "hidden"); });;

  }
}

export default class ColumnChart {
    element;
    chartHeight = 50;
  
    constructor({
      data = [],
      label = "",
      value = 0,
      link = "",
      formatHeading = value => value
    } = {}) {
      this.data = data;
      this.label = label;
      this.value = value;
      this.link = link;
      this.formatHeading = formatHeading; // ✅ Correct assignment
      this.element = this.createElement(this.createTemplate());
    }

    createElement(template) {
      const element = document.createElement("div");
      element.innerHTML = template;
      return element.firstElementChild;
    }
  
    getColumnProps() {
      if (!this.data.length) return [];
      
      const maxValue = Math.max(...this.data);
      const scale = this.chartHeight / maxValue;
  
      return this.data.map(item => ({
        percent: ((item / maxValue) * 100).toFixed(0) + '%',
        value: String(Math.floor(item * scale))
      }));
    }
  
    createChartBodyTemplate() {
      return this.getColumnProps()
        .map(({ value, percent }) => `<div style="--value: ${value}" data-tooltip="${percent}"></div>`)
        .join('');
    }
  
    createLinkTemplate() {
      return this.link ? `<a href="${this.link}" class="column-chart__link">View all</a>` : "";
    }
  
    createChartClasses() {
      return `column-chart${this.data.length ? "" : " column-chart-loading"}`;
    }
  
    createTemplate() {
      return `
        <div class="${this.createChartClasses()}" style="--chart-height: ${this.chartHeight}">
          <div class="column-chart__title">
            ${this.label}
            ${this.createLinkTemplate()}
          </div>
          <div class="column-chart__container">
            <div data-element="header" class="column-chart__header">
              ${this.formatHeading(this.value)}
            </div>
            <div data-element="body" class="column-chart__chart">
              ${this.createChartBodyTemplate()}
            </div>
          </div>
        </div>
      `;
    }

    update(newData) {
      this.data = newData;
      this.element.querySelector('[data-element="body"]').innerHTML = this.createChartBodyTemplate();
    }

    remove() {
      if (this.element) {
        this.element.remove();
      }
    }

    destroy() {
      this.remove();
      this.element = null;
    }
  }
  
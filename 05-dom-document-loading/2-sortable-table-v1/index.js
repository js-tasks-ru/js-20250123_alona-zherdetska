export default class SortableTable {
  constructor(headerConfig = [], data = []) {
    this.headerConfig = headerConfig;
    this.data = data;
    this.render();
  }

  render() {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = this.createTable();
    this.element = wrapper.firstElementChild;
    this.subElements = this.getSubElements();
  }

  createTable() {
    return `
      <div class="sortable-table">
        <div class="sortable-table__header">
          ${this.createHeader()}
        </div>
        <div class="sortable-table__body">
          ${this.createBody()}
        </div>
      </div>
    `;
  }

  createHeader() {
    return this.headerConfig.map(({ id, title, sortable }) => `
      <div class="sortable-table__cell" data-id="${id}" data-sortable="${sortable}">
        ${title}
      </div>
    `).join('');
  }

  createBody() {
    return this.data.map(item => `
      <div class="sortable-table__row">
        ${this.headerConfig.map(({ id, template }) => `
          <div class="sortable-table__cell">
            ${template ? template(item[id]) : item[id]}
          </div>
        `).join('')}
      </div>
    `).join('');
  }

  sort(field, order = 'asc') {
    const column = this.headerConfig.find(item => item.id === field);
    if (!column || !column.sortable) return;

    const direction = order === 'asc' ? 1 : -1;
    const sortedData = [...this.data].sort((a, b) => 
      column.sortType === 'number'
        ? direction * (a[field] - b[field])
        : direction * a[field].localeCompare(b[field], ['ru', 'en'])
    );

    this.data = sortedData;
    this.subElements.body.innerHTML = this.createBody();
  }

  destroy() {
    this.element.remove();
  }
}

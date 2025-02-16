export default class NotificationMessage {
  static activeNotification;

  constructor(message = '', { duration = 2000, type = 'success' } = {}) {
    this.message = message;
    this.duration = duration;
    this.type = type;
    this.element = this.createElement();
  }

  createElement() {
    const element = document.createElement('div');
    element.className = `notification ${this.type}`;
    element.style.cssText = `--value:${this.duration / 1000}s`;
    element.innerHTML = `
      <div class="notification__content">
        ${this.message}
      </div>
    `;
    return element;
  }

  show(target = document.body) {
    if (NotificationMessage.activeNotification) {
      NotificationMessage.activeNotification.remove();
    }
    NotificationMessage.activeNotification = this;
    target.append(this.element);
    setTimeout(() => this.remove(), this.duration);
  }

  remove() {
    if (this.element) {
      this.element.remove();
    }
  }

  destroy() {
    this.remove();
    if (NotificationMessage.activeNotification === this) {
      NotificationMessage.activeNotification = null;
    }
  }
}

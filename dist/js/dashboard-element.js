export default class DashboardElement extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.classList.add("loaded");
  }
}

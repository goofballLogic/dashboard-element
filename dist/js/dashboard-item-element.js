export default class DashboardElementItem extends HTMLElement {

    connectedCallback() {
        this.details = this.innerHTML;
        this.render();
        this.classList.add("loaded");
    }

    static get observedAttributes() { return ["state"]; }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "state" && oldValue !== newValue) {
            this.state = newValue;
            this.render();
        }
    }

    render() {
        const states = this.getAttribute("states").split(",");
        const title = this.getAttribute("title");
        const state = this.getAttribute("state");
        if (states.length) {
            this.state = this.state || state || states[0];
            this.dataset.state = this.state;
            states.forEach(state => {
                if (state === this.state) {
                    while (!this.classList.contains(state)) this.classList.add(state);
                } else {
                    while (this.classList.contains(state)) this.classList.remove(state);
                }
            });
        }

        this.innerHTML = `

            <header>${title}</header>
            <section class="detail">${this.details}</section>

        `;
    }

}

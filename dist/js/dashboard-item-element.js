export default class DashboardElementItem extends HTMLElement {

    connectedCallback() {
        this.details = this.innerHTML;
        this.syncStateAttribute(this.getAttribute("state") || this.getStates()[0]);
        this.render();
        this.classList.add("loaded");
    }

    static get observedAttributes() { return ["state", "data-state"]; }

    attributeChangedCallback(name, oldValue, newValue) {
        if (["state", "data-state"].includes(name)) {
            this.syncStateAttribute(newValue);
            this.render();
        }
    }

    syncStateAttribute(value) {
        const states = this.getStates();
        if (states.length && states.includes(value)) {
            if (this.dataset.state !== value)
                this.dataset.state = value;
            if (this.getAttribute("state") !== value)
                this.setAttribute("state", value);
        }
    }

    render() {
        const states = this.getStates();
        const title = this.getAttribute("title");
        const state = this.getAttribute("state");
        if (states.length) {
            states.forEach(s => {
                if (s === state) {
                    while (!this.classList.contains(s)) this.classList.add(s);
                } else {
                    while (this.classList.contains(s)) this.classList.remove(s);
                }
            });
        }

        this.innerHTML = `

            <header>${title}</header>
            <section class="detail">${this.details}</section>

        `;
    }


    getStates() {
        return this.getAttribute("states").split(",");
    }
}

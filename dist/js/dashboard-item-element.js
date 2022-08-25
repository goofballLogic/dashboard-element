export default class DashboardElementItem extends HTMLElement {

    constructor() {
        super();
        this.details = this.innerHTML;
    }

    connectedCallback() {
        this.render();
        ensureClassAdded(this, "loaded");
    }

    get state() {
        return this.getAttribute("data-state") || "";
    }

    get title() {
        return this.getAttribute("data-title") || "";
    }

    get states() {
        return (this.getAttribute("data-states") || "").split(",");
    }

    get img() {
        return (this.getAttribute("data-img") || "");
    }

    get imgAlt() {
        return (this.getAttribute("data-img-alt") || "");
    }

    static get observedAttributes() { return ["data-state", "data-title", "data-states", "data-img", "data-img-alt"]; }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            if (name === "data-state") {
                if (this.states.length && !this.states.includes(newValue)) {
                    if (oldValue)
                        this.dataset.state = oldValue;
                    else
                        this.removeAttribute("data-state");
                }
            } else if (name === "data-states") {
                const states = this.states;
                if (states.length && !states.includes(this.state))
                    this.dataset.state = states[0];
            }
        }
        this.render();
    }

    render() {

        const state = this.state;
        this.states.filter(s => s !== state).forEach(s => {
            ensureClassRemoved(this, s);
        });
        ensureClassAdded(this, state);
        this.innerHTML = `

            <header>
                <div>${this.renderIcon()}</div>
                <div>${this.title}</div>
            </header>
            <section class="detail">${this.details}</section>

        `;
    }

    renderIcon() {

        const img = this.img;
        if (!img) return "";
        else {
            const style = `background-image: url(${img});`;
            return `
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=" class="icon" style="${style}">
            `;
        }
    }

}
function ensureClassAdded(el, value) {
    if (!value) return;
    while (!el.classList.contains(value))
        el.classList.add(value);
}

function ensureClassRemoved(el, value) {
    if (!value) return;
    while (el.classList.contains(value))
        el.classList.remove(value);
}


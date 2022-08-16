export default class DashboardElementItem extends HTMLElement {

    connectedCallback() {
        this.details = this.innerHTML;
        this.render();
        this.classList.add("loaded");
    }

    render() {
        const states = this.getAttribute("states").split(",");
        if (states.length) {
            this.state = this.state || states[0];
            states.forEach(state => {
                if (state === this.state) {
                    while (!this.classList.contains(state)) this.classList.add(state);
                } else {
                    while (this.classList.contains(state)) this.classList.remove(state);
                }
            });
        }
        const title = this.getAttribute("title");
        this.innerHTML = `

            <header>${title}</header>
            <section class="detail">${this.details}</section>

        `;
    }

}

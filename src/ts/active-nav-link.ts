import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("active-nav-link")
export class ActiveNavLink extends LitElement {
    protected createRenderRoot(): HTMLElement | DocumentFragment {
        return this;
    }

    @property()
    name = "no name";

    @property()
    href = "#no-href";

    protected render(): unknown {
        return html`
            <a class="nav-link active" aria-current="page" href=${this.href}
                >${this.name}</a
            >
        `;
    }
}

import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("active-nav-link")
export class ActiveNavLink extends LitElement {
    protected createRenderRoot(): HTMLElement | DocumentFragment {
        return this;
    }

    protected render(): unknown {
        return html`
            <a class="nav-link active" aria-current="page" href="#"
                >Dashboard</a
            >
        `;
    }
}

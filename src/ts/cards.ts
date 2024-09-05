import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { Story, data } from "./data";

@customElement("render-cards")
export class RenderCards extends LitElement {
    protected createRenderRoot(): HTMLElement | DocumentFragment {
        return this;
    }

    @property()
    cards: Story[] = [];

    constructor() {
        super();
        this.cards = data;
    }

    protected render(): unknown {
        return html`
            <div class="row">
                ${this.cards.map(
                    (v) => html`
                        <div class="col-3">
                            <div class="card" style="width: 18rem">
                                <img
                                    src=${v.photoUrl}
                                    class="card-img-top"
                                    alt=${v.name}
                                />
                                <div class="card-body">
                                    <p class="card-text">${v.description}</p>
                                    <p class="caption">
                                        ${v.name}<br />${v.createdAt}
                                    </p>
                                </div>
                            </div>
                        </div>
                    `,
                )}
            </div>
        `;
    }
}

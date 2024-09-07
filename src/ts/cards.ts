import { html, LitElement, PropertyValues } from "lit";
import { customElement, property } from "lit/decorators.js";
import { Story } from "./data";
import axios from "axios";
import { apiGetStories } from "./config";

@customElement("render-cards")
export class RenderCards extends LitElement {
    protected createRenderRoot(): HTMLElement | DocumentFragment {
        return this;
    }

    @property()
    cards: Story[] = [];

    constructor() {
        super();
    }
    protected firstUpdated(_changedProperties: PropertyValues): void {
        const token =
            "Bearer " + JSON.parse(localStorage.getItem("user") ?? "")?.token;
        axios
            .get(apiGetStories, {
                headers: {
                    Authorization: token,
                },
            })
            .then(({ data }) => {
                const stories = data.listStory;
                this.cards = stories;
            });
    }

    protected render(): unknown {
        return html`
            ${this.cards[0]
                ? html`
                      <div
                          id="loading"
                          class="alert alert-warning"
                          role="alert"
                          style="display: none"
                      >
                          Mohon menunggu respon server...
                      </div>
                  `
                : ""}
            ${this.cards[0]
                ? html`
                      <h2>Most liked story</h2>

                      <div id="carouselExample" class="carousel slide mb-3">
                          <div class="carousel-inner">
                              <div class="carousel-item active">
                                  <img
                                      src=${this.cards[0].photoUrl}
                                      class="d-block w-100"
                                  />
                              </div>
                              <div class="carousel-item">
                                  <img
                                      src=${this.cards[1].photoUrl}
                                      class="d-block w-100"
                                  />
                              </div>
                              <div class="carousel-item">
                                  <img
                                      src=${this.cards[2].photoUrl}
                                      class="d-block w-100"
                                  />
                              </div>
                          </div>
                          <button
                              class="carousel-control-prev"
                              type="button"
                              data-bs-target="#carouselExample"
                              data-bs-slide="prev"
                          >
                              <span
                                  class="carousel-control-prev-icon"
                                  aria-hidden="true"
                              ></span>
                              <span class="visually-hidden">Previous</span>
                          </button>
                          <button
                              class="carousel-control-next"
                              type="button"
                              data-bs-target="#carouselExample"
                              data-bs-slide="next"
                          >
                              <span
                                  class="carousel-control-next-icon"
                                  aria-hidden="true"
                              ></span>
                              <span class="visually-hidden">Next</span>
                          </button>
                      </div>
                  `
                : ""}
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

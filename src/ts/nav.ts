import { html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";

@customElement("nav-link")
export class NavLink extends LitElement {
    protected createRenderRoot(): HTMLElement | DocumentFragment {
        return this;
    }

    @property()
    name = "no name";

    @property()
    href = "#no-href";

    protected render(): unknown {
        return html` <a class="nav-link" href=${this.href}>${this.name}</a> `;
    }
}

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

@customElement("nav-group")
export class NavGroup extends LitElement {
    protected createRenderRoot(): HTMLElement | DocumentFragment {
        return this;
    }

    @property()
    activeLink = "no active";

    @state()
    navItems = [
        ["Dashboard", "/"],
        ["Tambah Story", "add-story"],
        ["Profile", "profile"],
        ["Register", "register"],
        ["Login", "login"],
    ];

    protected render(): unknown {
        return html`
            <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                ${this.navItems.map((link) => {
                    return this.activeLink === link[0]
                        ? html`
                              <li class="nav-item">
                                  <active-nav-link
                                      name=${link[0]}
                                      href=${link[1]}
                                  ></active-nav-link>
                              </li>
                          `
                        : html`
                              <li class="nav-item">
                                  <nav-link
                                      name=${link[0]}
                                      href=${link[1]}
                                  ></nav-link>
                              </li>
                          `;
                })}
            </ul>
        `;
    }
}

@customElement("nav-offcanvas")
export class NavOffcanvas extends LitElement {
    protected createRenderRoot(): HTMLElement | DocumentFragment {
        return this;
    }

    @property()
    activeLink = "no active link";

    protected render(): unknown {
        return html`
            <nav class="navbar bg-body-tertiary fixed-top">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">Story Abb</a>
                    <button
                        class="navbar-toggler"
                        type="button"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasNavbar"
                        aria-controls="offcanvasNavbar"
                        aria-label="Toggle navigation"
                    >
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div
                        class="offcanvas offcanvas-end"
                        tabindex="-1"
                        id="offcanvasNavbar"
                        aria-labelledby="offcanvasNavbarLabel"
                    >
                        <div class="offcanvas-body">
                            <nav-group
                                activeLink=${this.activeLink}
                            ></nav-group>
                        </div>
                    </div>
                </div>
            </nav>
        `;
    }
}

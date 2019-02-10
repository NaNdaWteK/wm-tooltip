class Tooltip extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' })
    this._container
    this._text = 'There is no more info'
    this._addTemplate()
  }

  connectedCallback() {
    this._addToggleEventsTo()
    if(this.hasAttribute('text')){
      this._addText()
    }
  }

  _addTemplate() {
    this.shadowRoot.innerHTML = `
      <style>
        slot {
          cursor:pointer;
          font-weight: bolder;
        }
        div {
          position: absolute;
          padding: 0.5em;
          background-color: var(--color-background, #000);
          color: var(--color-text, #fff);;
          border-radius: .5em;
          z-index: 2;
        }
        div::before {
          content: "";
          position:absolute;
          top: -6px;
          width: 0;
          height: 0;
          border-left: 6px solid transparent;
          border-right: 6px solid transparent;
          border-bottom: 6px solid black;
        }
      </style>
      <slot>Default slot text</slot>
    `
  }

  _addText() {
    this._text = this.getAttribute('text')
  }

  _addToggleEventsTo() {
    this.addEventListener('mouseenter', this._show.bind(this))
    this.addEventListener('mouseleave', this._hide.bind(this))
  }

  _show() {
    this._container = document.createElement('div')
    this._container.textContent = this._text
    this.shadowRoot.appendChild(this._container)
  }

  _hide() {
    this.shadowRoot.removeChild(this._container)
  }
}

customElements.define('wm-tooltip', Tooltip)

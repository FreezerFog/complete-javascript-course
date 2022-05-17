import icons from 'url:../../img/icons.svg'; // Parcel 2

export default class View {
  _data;

  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();

    if (!render) return markup;
    this._clear();
    this.insertMarkup(markup);
  }

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();
    // Creates an object, replicating a DOM, from a string
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    // All node elements, as an array, from the replicated 'virtual' DOM.
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    // All node elements, as an array, from the actual DOM in the browser
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));
    // Loop through each node element in 'virtual' DOM
    newElements.forEach((newEl, i) => {
      // Get node element from same position in actual DOM
      const curEl = curElements[i];

      // Updates changed TEXT
      // Compares node elements from real (browser) and virtual DOMs
      // If they are not the same AND if the node element has text, then...
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        // ... replace real DOM node element's text with 'virtual' node element's text
        curEl.textContent = newEl.textContent;
      }

      // Updates changed ATTRIBUTES
      if (!newEl.isEqualNode(curEl)) {
        // Loops through attributes of a virtual DOM node element, then updates the current DOM node element's attributes to the virtual DOM attribute's values
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  insertMarkup(markup) {
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderSpinner() {
    const markup = `
      <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>
    `;
    this._clear();
    this.insertMarkup(markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `
    <div class="error">
      <div>
        <svg>
          <use href="${icons}#icon-alert-triangle"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>
    `;
    this._clear();
    this.insertMarkup(markup);
  }

  renderMessage(message = this._message) {
    const markup = `
    <div class="message">
      <div>
        <svg>
          <use href="${icons}#icon-smile"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>
    `;
    this._clear();
    this.insertMarkup(markup);
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }
}

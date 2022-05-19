import View from './View';
import icons from 'url:../../img/icons.svg'; // Parcel 2

class PreviewView extends View {
  // PreviewView used as child class for resultsView & bookmarksView
  // _parentElement set to ''. Not needed here. We set in results/bookmark views
  // _generateMarkup() modified to return html for a single bookmark/result, then in those classes we join the individual strings together in their own _generateMarkup() methods.

  _parentElement = '';

  _generateMarkup() {
    const id = window.location.hash.slice(1);

    return `
      <li class="preview">
        <a class="preview__link ${
          this._data.id === id ? 'preview__link--active' : ''
        }" href="#${this._data.id}">
          <figure class="preview__fig">
            <img src="${this._data.image}" alt="${this._data.title}" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${this._data.title}</h4>
            <p class="preview__publisher">${this._data.publisher}</p>
            <div class="preview__user-generated ${
              this._data.key ? '' : 'hidden'
            }">
              <svg>
              <use href="${icons}#icon-user"></use>
              </svg>
            </div>
          </div>
        </a>
      </li>
    `;
  }
}

export default new PreviewView();

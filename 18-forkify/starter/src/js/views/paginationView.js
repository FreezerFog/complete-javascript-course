import View from './View';
import icons from 'url:../../img/icons.svg'; // Parcel 2

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const currentPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    // Page 1, there are other pages
    if (currentPage === 1 && numPages > 1) {
      return this._generateMarkupNextButton(currentPage);
    }

    // Last page
    if (currentPage === numPages && numPages > 1) {
      return this._generateMarkupPreviousButton(currentPage);
    }

    // Other page, both previous and next pages exist
    if (currentPage < numPages) {
      return `
        ${this._generateMarkupPreviousButton(currentPage)}
        ${this._generateMarkupNextButton(currentPage)}
      `;
    }

    // Page 1, no other pages
    return '';
  }

  _generateMarkupNextButton(page) {
    return `
      <button data-goto=${page + 1} class="btn--inline pagination__btn--next">
        <span>Page ${page + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>    
    `;
  }

  _generateMarkupPreviousButton(page) {
    return `
      <button data-goto=${page - 1} class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}.svg#icon-arrow-left"></use>
        </svg>
        <span>Page ${page - 1}</span>
      </button>
    `;
  }
}

export default new PaginationView();

import View from './View';
import icons from 'url:../../img/icons.svg'; // Parcel 2

class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _message = 'Recipe uploaded successfully!';
  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }

  _generateMarkup() {
    return `
      <div class="upload__column">
        <h3 class="upload__heading">Recipe data</h3>
        <label>Title</label>
        <input value="TESTING" required name="title" type="text" />
        <label>URL</label>
        <input value="TESTING" required name="sourceUrl" type="text" />
        <label>Image URL</label>
        <input value="TESTING" required name="image" type="text" />
        <label>Publisher</label>
        <input value="TESTING" required name="publisher" type="text" />
        <label>Prep time</label>
        <input value="23" required name="cookingTime" type="number" />
        <label>Servings</label>
        <input value="23" required name="servings" type="number" />
      </div>

      <div class="upload__column">
        <h3 class="upload__heading">Ingredients</h3>
        <label>Ingredient 1</label>
        <input
          value="0.5,kg,Rice"
          type="text"
          required
          name="ingredient-1"
          placeholder="Format: 'Quantity,Unit,Description'"
        />
        <label>Ingredient 2</label>
        <input
          value="1,,Avocado"
          type="text"
          name="ingredient-2"
          placeholder="Format: 'Quantity,Unit,Description'"
        />
        <label>Ingredient 3</label>
        <input
          value=",,salt"
          type="text"
          name="ingredient-3"
          placeholder="Format: 'Quantity,Unit,Description'"
        />
        <label>Ingredient 4</label>
        <input
          type="text"
          name="ingredient-4"
          placeholder="Format: 'Quantity,Unit,Description'"
        />
        <label>Ingredient 5</label>
        <input
          type="text"
          name="ingredient-5"
          placeholder="Format: 'Quantity,Unit,Description'"
        />
        <label>Ingredient 6</label>
        <input
          type="text"
          name="ingredient-6"
          placeholder="Format: 'Quantity,Unit,Description'"
        />
      </div>

      <button class="btn upload__btn">
        <svg>
          <use href="${icons}#icon-upload-cloud"></use>
        </svg>
        <span>Upload</span>
      </button>`;
  }

  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  ////// Handlers //////
  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      // FormData() web API allows us to place all element values of a form into it.
      // FormData() accepts a form as its argument
      // 'this' inside an event handler function refers to the element it is called upon, which allows us to pass 'this' as the argument because _parentElement is the form
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }

  // Controller handler method not needed for these handlers. They contain no business logic and are simply a way to add/remove a visual element
  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }

  _addHandlerHideWindow() {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }
}

export default new AddRecipeView();

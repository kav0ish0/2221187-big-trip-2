import AbstractView from '../framework/view/abstract-view';
import { SORTED_TYPE } from '../const';

const Sort_template = (sortType) => {
  const check_sorting = (sorting) => sorting === sortType ? 'checked' : '';

  const create_tab = (tab_id, sorting_name, sorting) => `
    <div class="trip-sort__item  trip-sort__item--${tab_id}">
      <input id="sort-${tab_id}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort"
      value="sort-${tab_id}" ${check_sorting(sorting)}>
      <label class="trip-sort__btn" for="sort-${tab_id}" data-sort-type="${sorting}">${sorting_name}</label>
    </div>`;

  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      ${create_tab('day', 'Day', SORTED_TYPE.DAY)}
      ${create_tab('event', 'Event', SORTED_TYPE.EVENT)}
      ${create_tab('time', 'Time', SORTED_TYPE.TIME)}
      ${create_tab('price', 'Price', SORTED_TYPE.PRICE)}
      ${create_tab('offer', 'Offers', SORTED_TYPE.OFFERS)}
    </form>`
  )
};

class SortView extends AbstractView {
  constructor(sortType) {
    super();
    this._sortType = sortType;
  }

  get template() {
    return Sort_template(this._sortType);
  }

  setSortTypeChangeHandler = (callback) => {
    this._callback.sortTypeChange = callback;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }

  #sortTypeChangeHandler = (evt) => {
    if (!evt.target.dataset.sortType) {
      return;
    }
    
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  };
}

export default SortView;

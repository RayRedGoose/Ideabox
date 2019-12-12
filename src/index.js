// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/index.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/light.svg'
import './images/light-full.svg'
import './images/delete.svg'
import './images/comment.svg'

document.querySelector('.content').addEventListener('click', chooseAction)
document.querySelector('.new-idea-form').addEventListener('keyup', removeError)

function chooseAction(event) {
  event.preventDefault()
  if (event.target.classList.contains('add-btn')) { putCardToBoard() }
  if (event.target.classList.contains('make-great')) { toggleGreat(event.target) }
  if (event.target.classList.contains('delete')) { deleteCard(event.target) }
  if (event.target.classList.contains('filter-btn')) { filterCards(event.target) }
  if (event.target.classList.contains('show-all-btn')) { showAll(event.target) }
  if (event.target.classList.contains('search-btn')) { searchCard() }
  if (event.target.classList.contains('add-comment')) { addCommentForm(event.target) }
  if (event.target.classList.contains('add-comment-btn')) { addCommentToCard(event.target) }
  if (event.target.classList.contains('remove-comment-btn')) { backCommentFooter(event.target) }
}

function putCardToBoard() {
  addNewIdea();
  document.querySelector('.new-idea-form').reset();
}

function addNewIdea() {
  const title = document.querySelector('.title-input').value;
  const desc = document.querySelector('.desc-input').value;
  const card = { title, desc };
  return (title !== '' && desc !== '')
    ? createCard(card)
    : showError(title, desc);
}

function createCard(card) {
  const parent = document.querySelector('.board');
  const cardUI = document.createElement('section');
  cardUI.classList.add('idea-card');
  parent.appendChild(cardUI);
  cardUI.innerHTML = `
    <header>
      <img class="make-great" src="./images/light.svg" alt="light">
      <img class="delete" src="./images/delete.svg" alt="delete">
    </header>
    <main>
      <h3>${card.title}</h3>
      <p class="desc-box">${card.desc}</p>
    </main>
    <section class="idea-card_comments">
      <p>comments:</p>
    </section>
    <footer>
      <img class="add-comment" src="./images/comment.svg" alt="comment">
      <p>comment</p>
    </footer>
  `;
}

function toggleGreat(target) {
  const cardUI = target.closest('.idea-card');
  return (!cardUI.classList.contains('great'))
    ? makeGreat(target, cardUI)
    : removeGreat(target, cardUI)
}

function makeGreat(target, card) {
  card.classList.add('great');
  target.setAttribute('src', './images/light-full.svg');
  document.querySelector('.filter-btn').disabled = false;
}

function removeGreat(target, card) {
  card.classList.remove('great');
  target.setAttribute('src', './images/light.svg');
  if (!document.querySelector('.great')) {
    document.querySelector('.filter-btn').disabled = true;
  }
}

function deleteCard(target) {
  target.closest('.idea-card').remove();
}

function filterCards(target) {
  document.querySelectorAll('.idea-card')
    .forEach(card => card.style.display = 'none');
  document.querySelectorAll('.great')
    .forEach(card => card.style.display = 'inline-block');
  document.querySelector('.show-all-btn').disabled = false;
  document.querySelector('.filter-btn').disabled = true;
}

function showAll(target) {
  target.classList.remove('clicked');
  document.querySelectorAll('.idea-card')
    .forEach(card => card.style.display = 'inline-block');
  document.querySelector('.show-all-btn').disabled = true;
  if (document.querySelector('.great')) {
    document.querySelector('.filter-btn').disabled = false;
  }
}

function searchCard() {
  const searchCondition = document.querySelector('.search-input').value.toLowerCase();
  document.querySelector('.search-form').reset();
  document.querySelectorAll('.idea-card')
    .forEach(card => makeValidation(card, searchCondition));
  document.querySelector('.show-all-btn').disabled = false;
}

function makeValidation(card, searchCondition) {
  const checkTitle = card
    .querySelector('h3')
    .innerText
    .toLowerCase()
    .includes(searchCondition);
  const checkDesc = card
    .querySelector('.desc-box')
    .innerText
    .toLowerCase()
    .includes(searchCondition);
  return (checkTitle || checkDesc)
    ? card.style.display = 'inline-block'
    : card.style.display = 'none';
}

function showError(title, desc) {
  document.querySelector('.error-ntf').style.display = 'block';

  if (title === '' && desc === '') {
    document.querySelector('.title-input').classList.add('error-input');
    document.querySelector('.desc-input').classList.add('error-input');
  }

  return (title === '')
    ? document.querySelector('.title-input').classList.add('error-input')
    : document.querySelector('.desc-input').classList.add('error-input');
}

function removeError(event) {
  document.querySelector('.error-ntf').style.display = 'none';
  event.target.classList.remove('error-input');
}

function addCommentForm(target) {
  target.closest('footer').innerHTML = `
    <form class="comment-form">
      <label for="comment">comment</label>
      <textarea class="comment-input" id="comment" rows="2" cols="18"></textarea>
      <div class="button-set">
        <button class="add-comment-btn">add</button>
        <button class="remove-comment-btn">cancel</button>
      </div>
    </form>
  `;
}

function addCommentToCard(target) {
  const text = target
    .closest('footer')
    .querySelector('textarea').value;
  const parent = target.closest('.idea-card')
    .querySelector('.idea-card_comments');
  parent.style.display = 'block';
  const elem = document.createElement('p');
  elem.classList.add('comment');
  parent.appendChild(elem);
  elem.innerText = text;
  backCommentFooter(target)
}

function backCommentFooter(target) {
  target.closest('footer').innerHTML = `
    <img class="add-comment" src="./images/comment.svg" alt="comment">
    <p>comment</p>
  `
}

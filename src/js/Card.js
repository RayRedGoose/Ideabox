class Card {
  constructor(id, title, desc) {
    this.id = id;
    this.title = title;
    this.desc = desc;
    this.isGreat = false;
  }

  toggleGreat() {
    this.isGreat = !this.isGreat;
  }
}

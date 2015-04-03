var app = app || {};

app.LibraryView = Backbone.View.extend({
  el: "#books",
  events: {
    'click #add': 'addBook'
  },
  initialize: function (initialBooks) {
    this.collection = new app.Library(initialBooks);

    this.render();

    this.listenTo(this.collection, 'add', this.renderBook);
  },
  render: function () {
    this.collection.each(function (item) {
      this.renderBook(item);
    }, this);
  },
  renderBook: function (item) {
    var bookView = new app.BookView({model: item});
    this.$el.append(bookView.render().el);
  },
  resetForm: function () {
    $('#addBook div').children('input').each(function () {
      this.value = '';
    });
  },
  addBook: function (e) {
    e.preventDefault();

    var formData = {};

    $('#addBook div').children('input').each(function (i, el) {
      if ($(el).val != '') {
        if(el.type === 'text') {
          formData[el.id] = $(el).val();
        } else {
          var image = new Image();
          image.onload = function (data) {
            console.log('image loaded!');
          };
          image.src = el.value;
        }
      }
    });

    this.resetForm();

    this.collection.add(new app.Book(formData));
  }
});

flatpickr("#datepicker", {
  mode: "range",
  "locale": "pt",
  dateFormat: "d-m-Y",
  onClose: function(selected) {
    updateCardsTotal(days_between(selected[0], selected[1]))
  }
});
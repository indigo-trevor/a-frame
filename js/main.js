// Component to change to random color on click.
AFRAME.registerComponent('toggle-modal-1', {
  init: function () {
    this.el.addEventListener('click', function (evt) {
      console.log("Modal 1 Opened")
      $(".modal--1").addClass("is-visable");
    });
  }
});
AFRAME.registerComponent('toggle-modal-2', {
  init: function () {
    this.el.addEventListener('click', function (evt) {
      console.log("Modal 2 Opened")
      $(".modal--2").addClass("is-visable");
    });
  }
});
AFRAME.registerComponent('toggle-modal-3', {
  init: function () {
    this.el.addEventListener('click', function (evt) {
      console.log("Modal 3 Opened")
      $(".modal--3").addClass("is-visable");
    });
  }
});

$( document ).ready(function() {
  $(".modal-close--1").click(function() {
    $(".modal--1").removeClass("is-visable");
  });
  $(".modal-close--2").click(function() {
    $(".modal--2").removeClass("is-visable");
  });
  $(".modal-close--3").click(function() {
    $(".modal--3").removeClass("is-visable");
  });
});

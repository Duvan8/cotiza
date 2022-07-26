$(document).ready(function () {
  $(".cotact").on("click", function () {
    let btn = $(".cotact").index(this);
    let codigo = $(".id").eq(btn);

    let cod = codigo.val();

    alert("llegan" + cod);

    $.ajax({
      type: "POST",
      url: "/actucot",
      data: {
        cc: cod,
      },
    });
  });
});

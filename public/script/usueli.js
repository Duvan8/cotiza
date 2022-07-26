$(document).ready(function () {
    $(".usueli").on("click", function () {
      let btn = $(".usueli").index(this);
      let usua = $(".usu").eq(btn);
  
      let usu = usua.val();
      alert(usu)
      $.ajax({
        type: "POST",
        url: "/usueli",
        data: {
          uu: usu,
        },
      });
    });
  });
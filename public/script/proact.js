$(document).ready(function () {
    $(".act").on("click", function () {
      let btn = $(".act").index(this);

      let i = $(".id").eq(btn);
      let u = $(".usu").eq(btn);
      let c = $(".cor").eq(btn);
      let p = $(".cla").eq(btn);
      let t = $(".tel").eq(btn);
      let d = $(".dir").eq(btn);
      let s = $(".des").eq(btn);
      let r = $(".rol").eq(btn);
  
      let id = i.val();
      let usu = u.val();
      let cor = c.val();
      let cla = p.val();
      let tel = t.val();
      let dir = d.val();
      let des = s.val();
      let rol = r.val();
      alert("datos para actualizar"+id+usu+cor+cla+tel+dir+des+rol);

      $.ajax({
        type: "POST",
        url: "/actualizar",
        data: {
          ii : id,
          uu: usu,
          cc: cor,
          pp: cla,
          tt: tel,
          dd: dir,
          ss: des,
          rr: rol
        },
      });
    });
  });
$(document).ready(function () {
  alert("hola mundo")
    $(".act").on("click", function () {
      let codigo = $(".id").eq(btn);
      let usuario = $(".usu").eq(btn);
      let producto = $(".product").eq(btn);
      let cantidad = $(".quantity").eq(btn);
      let puerta = $(".openingType").eq(btn);
      let jamba = $("jamb").eq(btn);
      let biselado = $(".beveling").eq(btn);
      let chapilla = $(".country").eq(btn);
      let acabado = $(".finishOptions").eq(btn);
      let ancho = $(".slabGrossWidthOptions").eq(btn);
      let espesor = $(".thickness").eq(btn);
      let resistencia = $(".fireRating").eq(btn);
      let mecanizado = $(".machiningPrep").eq(btn);
      let juego = $(".matchingTheDoor").eq(btn);
      let hojas = $(".leafCount").eq(btn);
      let entrega = $(".handing").eq(btn);
      let construccion = $(".doorConstruction").eq(btn);
      let biseladoport = $(".doorBeveling").eq(btn);
      let enrutado = $(".routedKerfWidth").eq(btn);
      let altura = $(".height").eq(btn);
      let preacabado = $(".prefinish").eq(btn);
  
      let cod = codigo.val();
      let usu = usuario.val();
      let pro = producto.val();
      let can = cantidad.val();
      let pur = puerta.val();
      let jam = jamba.val();
      let bis = biselado.val();
      let cha = chapilla.val();
      let acb = acabado.val();
      let anc = ancho.val();
      let esp = espesor.val();
      let res = resistencia.val();
      let mec = mecanizado.val();
      let jug = juego.val();
      let hoj = hojas.val();
      let ent = entrega.val();
      let con = construccion.val();
      let por = biseladoport.val();
      let enr = enrutado.val();
      let alt = altura.val();
      let pre = preacabado.val();


      alert("llegan"+cod+usu+pro+can+pur+jam+bis+cha+acb+anc+esp+res+mec+jug+hoj+ent+con+por+enr+alt+pre);
  
      $.ajax({
        type: "POST",
        url: "/cotact",
        data: {
          cc: cod,
          uu: usu,
          pp: pro,
          aa: can,
          uu: pur,
          jj: jam,
          bb: bis,
          hh: cha,
          dd: acb,
          ch: anc,
          ep: esp,
          re: res,
          me: mec,
          ju: jug,
          ho: hoj,
          en: ent,
          co: con,
          po: por,
          en: enr,
          al: alt,
          pr: pre
        },
      });
    });
  });
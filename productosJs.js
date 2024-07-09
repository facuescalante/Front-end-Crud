url="https://facumax.pythonanywhere.com/productos"

fetch(url )
  .then(resp => resp.json())
  .then(function(data) {
      console.log(data);
    cad=``
    for (dato of data ){
        cad=cad+ `
        <tr class="">
            <td scope="row">${dato.id}</td>
            <td>${dato.nombre}</td>
            <td>${dato.stock}</td>
            <td>${dato.tipoproducto}</td>
            <td>${dato.precio}</td>
            <td>
<td> 
            <img  width="200"
             src="${dato.imagen}" alt=${dato.nombre}
            </td>
            <td>
                
            </td>
        </tr>`

    }
    console.log(cad)
    document.querySelector("tbody").innerHTML=cad
      

  })
  .catch(function(error) {
    console.log(error);
  })
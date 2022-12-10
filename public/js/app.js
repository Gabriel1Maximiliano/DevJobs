//const { default: axios } = require("axios");
const { default: Swal } = require("sweetalert2");


document.addEventListener('DOMContentLoaded', () => {
    const skills = document.querySelector('.lista-conocimientos');
// clean alert errors

let alertas = document.querySelector('.alertas');
if(alertas){
   
    limpiarAlertas();
    }
    if( skills ){
        skills.addEventListener('click', agregarSkills);
        // when we are in edit , call function
        skillsSeleccionados();
    }
    const vacantesListado = document.querySelector('.panel-administracion');

    // if(vacantesListado){
    //     vacantesListado.addEventListener('click',accionesListado);
    // }
}) 

const skills = new Set();
const agregarSkills = (e) => {

    if( e.target.tagName === 'LI' ){
       if( e.target.classList.contains('activo') ){
        // remove from set and remove class
        skills.delete(e.target.textContent);
        e.target.classList.remove('activo');
       }else{
        // add to the set and add activo class
        skills.add(e.target.textContent);
        e.target.classList.add('activo');
       }
       
    }
    const skillsArray = [...skills];

   document.querySelector('#skills').value=skillsArray; 
}
const skillsSeleccionados = () => {

    const seleccionadas = Array.from(document.querySelectorAll('.lista-conocimientos .activo'));

  
   seleccionadas.forEach((sel)=>{
        skills.add(sel.textContent)
    })

    // put it in the hidden

    const skillsArray = [...skills];
 

    document.querySelector('#skills').value=skillsArray; 
    
}
const limpiarAlertas = () => {
    const alertas = document.querySelector('.alertas');
    

  const interval =  setInterval(() => {
        if(alertas.children.length > 0){
            alertas.removeChild(alertas.children[0]);

        }else if(alertas.children.length === 0){
            alertas.parentElement.removeChild(alertas);
            clearInterval(interval);
        }
    },1000)
   
}
// delete vacants

const accionesListado = (e) => {
  
    e.preventDefault()
    console.log(typeof e.target)
    console.log(e.target.dataset)
    // if(e.target.dataset.eliminar){
    //     // delete by axios
    //     const swalWithBootstrapButtons = Swal.mixin({
    //         customClass: {
    //           confirmButton: 'btn btn-success',
    //           cancelButton: 'btn btn-danger'
    //         },
    //         buttonsStyling: false
    //       })
          
    //       swalWithBootstrapButtons.fire({
    //         title: 'Are you sure?',
    //         text: "You won't be able to revert this!",
    //         icon: 'warning',
    //         showCancelButton: true,
    //         confirmButtonText: 'Yes, delete it!',
    //         cancelButtonText: 'No, cancel!',
    //         reverseButtons: true
    //       }).then((result) => {
    //         if (result.isConfirmed) {
    //           swalWithBootstrapButtons.fire(
    //             'Deleted!',
    //             'Your file has been deleted.',
    //             'success'
    //           )
    //         } else if (
    //           /* Read more about handling dismissals below */
    //           result.dismiss === Swal.DismissReason.cancel
    //         ) {
    //           swalWithBootstrapButtons.fire(
    //             'Cancelled',
    //             'Your imaginary file is safe :)',
    //             'error'
    //           )
    //         }
    //       })
    // }else{
    //     //window.location.href = e.target.href;
    //      const swalWithBootstrapButtons = Swal.mixin({
    //         customClass: {
    //           confirmButton: 'btn btn-success',
    //           cancelButton: 'btn btn-danger'
    //         },
    //         buttonsStyling: false
    //       })
          
    //       swalWithBootstrapButtons.fire({
    //         title: 'Are you sure?',
    //         text: "You won't be able to revert this!",
    //         icon: 'warning',
    //         showCancelButton: true,
    //         confirmButtonText: 'Yes, delete it!',
    //         cancelButtonText: 'No, cancel!',
    //         reverseButtons: true
    //       }).then((result) => {
    //         if (result.isConfirmed) {
    //           swalWithBootstrapButtons.fire(
    //             'Deleted!',
    //             'Your file has been deleted.',
    //             'success'
    //           )
    //         } else if (
    //           /* Read more about handling dismissals below */
    //           result.dismiss === Swal.DismissReason.cancel
    //         ) {
    //           swalWithBootstrapButtons.fire(
    //             'Cancelled',
    //             'Your imaginary file is safe :)',
    //             'error'
    //           )
    //         }
    //       })
    // }
}
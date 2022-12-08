

document.addEventListener('DOMContentLoaded', () => {
    const skills = document.querySelector('.lista-conocimientos');
    if( skills ){
        skills.addEventListener('click', agregarSkills);
    }
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
    console.log(skillsArray)
   document.querySelector('#skills').value=skillsArray; 
}
module.exports = {
    seleccionarSkills : (seleccionadas = [], opciones) => {

        const skills = ['HTML5', 'CSS3', 'CSSGrid', 'Flexbox', 'JavaScript', 'jQuery', 'Node', 'Angular', 'VueJS', 'ReactJS', 'React Hooks', 'Redux', 'Apollo', 'GraphQL', 'TypeScript', 'PHP', 'Laravel', 'Symfony', 'Python', 'Django', 'ORM', 'Sequelize', 'Mongoose', 'SQL', 'MVC', 'SASS', 'WordPress'];

        let html = '';
        skills.forEach(skill => {
            html += `
                <li ${seleccionadas.includes(skill) ? ' class="activo"' : ''}>${skill}</li>
            `;
        });

        return opciones.fn().html = html;
    },

    tipoContrato: (selected, opciones) => {
       return opciones.fn().replace(
        new RegExp(`value="${selected}"`), '&$ selected="selected"'
       )
    },
    mostrarAlertas:(errors={},alertas) => {
       const categoria = Object.keys(errors);
       let html='';
       if(categoria.length){

           errors[categoria].forEach(error=>{
            html+=`<div class="${categoria} alerta">
            ${error}
            </div>`
           })
       }
      
      return alertas.fn().html = html;
    }
}
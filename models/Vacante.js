const mongoose = require('mongoose');
const slug = require('slug');

const shortid = require('shortid');


const vacantesSchema = new mongoose.Schema(
    { 
        titulo:{
            type:String,
            required:'El nombre de la vacante es obliatorio',
            trim:true
        },
        empresa:{
            type:String,
            trim:true
        },
        ubicacion:{
            type:String,
            trim:true,
            required:'La ubicación es obligatoria'

        },
        salario:{
            type:String,
            default:0
        },
        contrato:{
            type:String
        },
        descripcion:{
            type:String,
            trim:true
        },
        url:{
            type:String,
            lowercase:true
        },
        skills:[String],
        candidatos:[{
            nombre:String,
            email:String,
            cv:String
        }],
        autor:{
            type: mongoose.Schema.ObjectId,
            ref:'Usuarios',
            required: 'El auto es obligatorio'
        }
       
    }
);

vacantesSchema.pre('save', function(next){
    const url = slug(this.titulo);
    this.url = `${url}-${shortid.generate()}`
    /**
     * React Devloper-->react-developer-1215487
     */
    next();
})

module.exports = mongoose.model('Vacante',vacantesSchema)
 
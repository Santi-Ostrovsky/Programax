const { Usuarios, Tecnologias, Lenguajes, Servicios, Paises } = require("../../db.js");
// const { Op } = require("sequelize");

const ERROR = "Error @ controllers/Usuarios";

// -----------------------------------------------


const getUsers = async () => {
  // try {

    let usuarios = await Usuarios.findAll({
      include:[{
        model: Tecnologias,
        attributes: ['name'],
        through:{
          attributes: []
      }
      },{
        model: Lenguajes,
        attributes: ['name'],
        through:{
          attributes: []
      }
      },{
        model: Servicios,
        attributes: ['name'],
        through:{
          attributes: []
      }
      }]
    })
    

    // usuarios.forEach(curr => curr.dataValues.tecnologias = curr.dataValues.tecnologias.map(cuuu => cuuu.dataValues.name))
    // usuarios.dataValues.tecnologias = usuarios.dataValues?.map(curr => curr)
    // usuarios.lenguajes = usuarios.lenguajes?.map(curr => curr.name)
    // usuarios.servicios = usuarios.servicios?.map(curr => curr.name)
    
    // console.log(usuarios)

    // return usuarios

    let users = usuarios.map(curr => {
      return{
        id: curr.id,
        profilePicture: curr.profilePicture,
      isAdmin: curr.isAdmin,
      name: curr.name,
      lastName: curr.lastName,
      email: curr.email,
      country: curr.country,
      city: curr.city,
      linkedIn: curr.linkedIn,
      gitHub: curr.gitHub,
      webSite: curr.webSite,
      yearsOfExperience: curr.yearsOfExperience,
      dailyBudget: curr.dailyBudget,
      englishLevel: curr.englishLevel,
      bio: curr.bio,
      paiseId: curr.paiseId,
      tecnologias: curr.tecnologias?.map(curr => curr.name),
      lenguajes: curr.lenguajes?.map(curr => curr.name),
      servicios: curr.servicios?.map(curr => curr.name),
      }
    })

    return users

  // } catch (e) {

  // }
};


const postUsers = async (name, lastName, profilePicture, isAdmin, email, linkedIn, gitHub, webSite, yearsOfExperience, dailyBudget, englishLevel, bio, country, city, tecnologias, lenguajes, servicios, paiseId) =>{

    
    const [row, created] = await Usuarios.findOrCreate({where: {
      email, 
      linkedIn,
      gitHub

    }, defaults:{
      name,
      lastName,
      profilePicture,
      isAdmin,
      webSite,
      yearsOfExperience,
      dailyBudget,
      englishLevel,
      bio,
      country,
      city,
      paiseId
    }})

    row.addTecnologias(tecnologias)
    row.addLenguajes(lenguajes)
    row.addServicios(servicios)

    if(!created){
      throw new Error("El usuario ya existe")
    }else{
    return "Usuario creado correctamente"
  }

}


module.exports = { getUsers, postUsers };

const {
  Usuarios,
  Tecnologias,
  Lenguajes,
  Servicios,
  Paises,
} = require("../../db.js");
const { Op } = require("sequelize");

const ERROR = "Error @ controllers/Usuarios";

// -----------------------------------------------

const getUsers = async () => {
  try {
    let usuarios = await Usuarios.findAll({
      include: [
        {
          model: Tecnologias,
          attributes: ["name"],
          through: { attributes: [] },
        },
        {
          model: Lenguajes,
          attributes: ["name"],
          through: { attributes: [] },
        },
        {
          model: Servicios,
          attributes: ["name"],
          through: { attributes: [] },
        },
      ],
    });

    let users = usuarios.map((curr) => {
      return {
        id: curr.id,
        profilePicture: curr.profilePicture ? curr.profilePicture : null,
        isAdmin: curr.isAdmin,
        name: curr.name,
        lastName: curr.lastName,
        email: curr.email,
        // country: curr.country,
        country: curr.paiseId,
        city: curr.city ? curr.city : null,
        linkedIn: curr.linkedIn ? curr.linkedIn : null,
        gitHub: curr.gitHub ? curr.gitHub : null,
        webSite: curr.webSite ? curr.webSite : null,
        yearsOfExperience: curr.yearsOfExperience,
        dailyBudget: curr.dailyBudget ? curr.dailyBudget : null,
        englishLevel: curr.englishLevel ? curr.englishLevel : null,
        bio: curr.bio ? curr.bio : null,
        tecnologias: curr.tecnologias?.map((curr) => curr.name),
        lenguajes: curr.lenguajes?.map((curr) => curr.name),
        servicios: curr.servicios?.map((curr) => curr.name),
      };
    });
    return users;
  } catch (e) {
    console.error(`ERROR @ controllers/getUsers --→ ${e}`);
  }
};

const postUsers = async (data) => {
  try {
    const {
      name,
      lastName,
      profilePicture,
      isAdmin,
      email,
      linkedIn,
      gitHub,
      webSite,
      yearsOfExperience,
      dailyBudget,
      englishLevel,
      bio,
      city,
      tecnologias,
      lenguajes,
      servicios,
      paiseId,
    } = data;

    const [row, created] = await Usuarios.findOrCreate({
      where: {
        email,
        linkedIn: linkedIn !== "" ? linkedIn : null,
        gitHub: gitHub !== "" ? gitHub : null,
      },
      defaults: {
        name,
        lastName,
        profilePicture: profilePicture !== "" ? profilePicture : null,
        isAdmin: false,
        webSite: webSite !== "" ? webSite : null,
        yearsOfExperience,
        dailyBudget: dailyBudget !== "" ? dailyBudget : null,
        englishLevel: englishLevel !== "" ? englishLevel : null,
        bio: bio !== "" ? bio : null,
        // country,
        paiseId,
        city: city !== "" ? city : null,
      },
    });

    row.addTecnologias(tecnologias);
    row.addLenguajes(lenguajes);
    row.addServicios(servicios);

    if (!created) {
      throw new Error("El usuario ya existe");
    } else {
      return "Usuario creado correctamente";
    }
  } catch (e) {
    console.error(`ERROR @ controllers/postUsers --→ ${e}`);
  }
};
const toUperCase=(nombre)=>{
  let nombree= nombre[0].toUpperCase()+nombre.slice(1);
  return nombree;
}

const getUserById = async (id) => {
  try {
    let User= await Usuarios.findByPk(id, {
      include: [
        {
          model: Tecnologias,
          attributes: ["name"],
          through: { attributes: [] },
        },
        {
          model: Lenguajes,
          attributes: ["name"],
          through: { attributes: [] },
        },
        {
          model: Servicios,
          attributes: ["name"],
          through: { attributes: [] },
        },
      ],
    });

    let userM=User.dataValues;
    let nombrePais= (await Paises.findByPk(userM.paiseId)).dataValues.name;
    userM.paiseId=nombrePais;
    userM.name= toUperCase(userM.name);
    userM.lastName= toUperCase(userM.lastName);
    
    return userM;

  } catch (e) {
    console.error(`ERROR @ controllers/getUserById --→ ${e}`);
  }
};

const deleteUser = async (id) => {
  try {
    let toDelete= await Usuarios.findByPk(id);
    await toDelete.destroy();
    console.log(`User (${id}) deleted successfully`);
    return `User (${id}) deleted successfully`;
  } catch (e) {
    console.error(`ERROR @ controllers/getUserById --→ ${e}`);
  }
};

const getUserByName = async (name) => {
  try {
    let userByName= await Usuarios.findAll({
      where:{
        name:{ [Op.iLike]: `%${name}%` }
      }
    });
    return userByName;
  } catch (e) {
    console.error(`ERROR @ controllers/getUserById --→ ${e}`);
  }
}

module.exports = { getUsers, postUsers, getUserById, deleteUser, getUserByName};

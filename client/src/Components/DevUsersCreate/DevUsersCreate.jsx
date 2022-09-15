import React, { useState } from "react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import s from "./DevUsersCreate.module.css";
import { useDispatch, useSelector } from "react-redux";

//actions
import { getCountries } from "../../Redux/Actions/Countries";
import { getTechnologies } from "../../Redux/Actions/Technologies";
import { getServices } from "../../Redux/Actions/Services";
import { getLanguajes } from "../../Redux/Actions/Languajes";
import { postDevUser } from "../../Redux/Actions/DevUser";

export default function DevUsersCreate() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCountries());
    dispatch(getTechnologies());
    dispatch(getServices());
    dispatch(getLanguajes());
  }, [dispatch]);

  const countries = useSelector((state) => state.countries.allCountries);

  const technologies = useSelector(
    (state) => state.technologies.allTechnologies
  );
  const services = useSelector((state) => state.services.allServices);
  const languajes = useSelector((state) => state.languajes.allLanguajes);

  const [input, setInput] = useState({
    name: "",
    lastName: "",
    // profilePicture: "",
    // isAdmin: "",
    email: "",
    linkedIn: "",
    gitHub: "",
    webSite: "",
    yearsOfExperience: "0",
    dailyBudget: "0",
    englishLevel: "Básico",
    // bio: "",
    // city: "",
    paiseId: [],
    tecnologias: [],
    lenguajes: [],
    servicios: [],
  });

  const handleChangeInput = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };
  const handleChangeEnglish = (e) => {
    const ingles = () => {
      if (e.target.value === "1") {
        return "Básico";
      }
      if (e.target.value === "2") {
        return "Intermedio";
      }
      if (e.target.value === "3") {
        return "Avanzado";
      }
      if (e.target.value === "4") {
        return "Profesional";
      } else {
        return "Nativo / Bilingüe";
      }
    };

    setInput({
      ...input,
      [e.target.name]: ingles(),
    });
  };
  const handleCreate = (e) => {
    e.preventDefault();
    dispatch(
      postDevUser({
        ...input,
        name: input.name.toLowerCase(),
      })
    );
    alert("Perfil Creado con exito... (alerta provisoria)");
    // setTimeout(() => {
    //   navigate("/work");
    // }, 350);
    setInput({
      name: "",
      lastName: "",
      profilePicture: "",
      // isAdmin: "",
      email: "",
      linkedIn: "",
      gitHub: "",
      webSite: "",
      yearsOfExperience: "0",
      dailyBudget: "0",
      englishLevel: "Básico",
      // bio: "",
      // city: "",
      paiseId: [],
      tecnologias: [],
      lenguajes: [],
      servicios: [],
    });
  };
  // const handleReset = () => {
  //   setInput({
  //     name: "",
  //     lastName: "",
  //     profilePicture: "",
  //     // isAdmin: "",
  //     email: "",
  //     linkedIn: "",
  //     gitHub: "",
  //     webSite: "",
  //     yearsOfExperience: "0",
  //     dailyBudget: "0",
  //     englishLevel: "1",
  //     // bio: "",
  //     // city: "",
  //     paiseId: [],
  //     tecnologias: [],
  //     lenguajes: [],
  //     servicios: [],
  //   });
  // };

  //OPCIONES DE LOS SELECTS:

  const optionsCountries = countries.map((e) => {
    return {
      value: e.id,
      label: e.name,
    };
  });

  const optionsTecnologias = technologies.map((e) => {
    return {
      value: e.id,
      label: e.name,
    };
  });
  const optionsServices = services.map((e) => {
    return {
      value: e.id,
      label: e.name,
    };
  });

  const optionsLanguajes = languajes.map((e) => {
    return {
      value: e.id,
      label: e.name,
    };
  });

  //

  return (
    /*  name, lastName, profilePicture, isAdmin, email, linkedIn, gitHub, webSite, yearsOfExperience, dailyBudget, englishLevel, bio, country, city, tecnologias, lenguajes, servicios, paiseId */
    <div>
      <form action="">
        <p>Nombre: </p>
        <input
          type="text"
          placeholder="Tu Nombre..."
          autoComplete="off"
          onChange={(e) => handleChangeInput(e)}
          value={input.name}
          name="name"
        />
        <p>Apellido: </p>
        <input
          type="text"
          placeholder="Tu Apellido..."
          autoComplete="off"
          onChange={(e) => handleChangeInput(e)}
          value={input.lastName}
          name="lastName"
        />
        <p>Imagen: </p>
        <input
          type="url"
          placeholder="Tu Imagen de perfil..."
          autoComplete="off"
          onChange={(e) => handleChangeInput(e)}
          value={input.profilePicture}
          name="profilePicture"
        />
        <p>Email: </p>
        <input
          type="email"
          placeholder="Tu Email..."
          autoComplete="off"
          onChange={(e) => handleChangeInput(e)}
          value={input.email}
          name="email"
        />
        <p>Linkedin: </p>
        <input
          type="url"
          placeholder="Tu LinkedIn..."
          autoComplete="off"
          onChange={(e) => handleChangeInput(e)}
          value={input.linkedIn}
          name="linkedIn"
        />
        <p>GitHub: </p>
        <input
          type="url"
          placeholder="Tu GitHub..."
          autoComplete="off"
          onChange={(e) => handleChangeInput(e)}
          value={input.gitHub}
          name="gitHub"
        />
        <p>Website: </p>
        <input
          type="url"
          placeholder="Tu webSite..."
          autoComplete="off"
          onChange={(e) => handleChangeInput(e)}
          value={input.webSite}
          name="webSite"
        />
        <p>Años de experiencia: </p>
        <input
          type="number"
          min="1"
          max="99"
          autoComplete="off"
          onChange={(e) => handleChangeInput(e)}
          value={input.yearsOfExperience}
          name="yearsOfExperience"
        />
        <p>Precio por hora: </p>
        <input
          type="number"
          min="1"
          max="999"
          autoComplete="off"
          onChange={(e) => handleChangeInput(e)}
          value={input.dailyBudget}
          name="dailyBudget"
        />
      </form>

      <p htmlFor="">Nivel de ingles: </p>
      <input
        type="range"
        min="1"
        max="5"
        onChange={(e) => handleChangeEnglish(e)}
        // value={input.englishLevel}
        name="englishLevel"
        defaultValue="1"
      />
      <label
        className={
           input.englishLevel === "Básico"
            ? s.ingles1
            : input.englishLevel === "Intermedio"
            ? s.ingles2
            : input.englishLevel === "Avanzado"
            ? s.ingles3
            : input.englishLevel === "Profesional"
            ? s.ingles4
            : s.ingles5
        }
      >
        {input.englishLevel}
      </label>

      <p htmlFor="pais">Pais: </p>
      <Select
        className={s.select}
        isDisabled={false}
        options={optionsCountries}
        isClearable={true}
        isSearchable={true}
        isMulti={false}
        placeholder="Selecciona un pais"
        onChange={(e) =>
          setInput({
            ...input,
            paiseId: e.value,
          })
        }
      />

      <p htmlFor="tecnologias">Tecnologias: </p>
      <Select
        className={s.select}
        isDisabled={false}
        options={optionsTecnologias}
        isClearable={true}
        isSearchable={true}
        isMulti={true}
        placeholder="Selecciona una tecnologia"
        onChange={(e) =>
          setInput({
            ...input,
            tecnologias: e.map((ele) => ele.value),
          })
        }
      />
      <p htmlFor="lenguajes">Lenguajes: </p>
      <Select
        className={s.select}
        isDisabled={false}
        options={optionsLanguajes}
        isClearable={true}
        isSearchable={true}
        isMulti={true}
        placeholder="Selecciona un lenguaje"
        onChange={(e) =>
          setInput({
            ...input,
            lenguajes: e.map((ele) => ele.value),
          })
        }
      />
      <p htmlFor="servicios">Servicios: </p>
      <Select
        className={s.select}
        isDisabled={false}
        options={optionsServices}
        isClearable={true}
        isSearchable={true}
        isMulti={true}
        placeholder="Selecciona un servicio"
        onChange={(e) =>
          setInput({
            ...input,
            servicios: e.map((ele) => ele.value),
          })
        }
      />
      <div className={s.buttons}>
        <button
          className={s.buttonCreated1}
          // disabled={disabledButton}
          onClick={(e) => handleCreate(e)}
        >
          <span className={s.button_top}> CREAR PERFIL</span>
        </button>
        <button
          className={s.buttonCreated2}
          // onClick={(e) => handleReset(e)}
        >
          <span className={s.button_top}>RESETEAR FORMULARIO</span>
        </button>
      </div>
    </div>
  );
}

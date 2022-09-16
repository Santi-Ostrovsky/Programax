import React from "react";
import { useSelector } from "react-redux";
import Select from "react-select";

import s from "./FIlterTecnologie.module.css";

export default function FIlterTecnologie({ setActualFilter, setOrder }) {
  const tecnologies = useSelector((state) => state.tecnologies.allTecnologies);
  console.log(tecnologies);

  const optionsTecnologias = tecnologies.map((e) => {
    return {
      value: e.id,
      label: e.name,
    };
  });

  const handleTecnologies = (e) => {
    setActualFilter((state) => {
      return {
        ...state,
        filterTecnologies: e.map((e) => e.label),
      };
    });
    setOrder(`Ordenado: ${e.map((e) => e.label)}`);
  };

  return (
    <div>
      <Select
        id="selectTecnologie"
        onChange={(e) => handleTecnologies(e)}
        className={s.select}
        isDisabled={false}
        options={optionsTecnologias}
        isClearable={true}
        isSearchable={true}
        isMulti={true}
        placeholder="Selecciona tecnologias"
      />
    </div>
  );
}
const { Router } = require("express");
const { Countries } = require("../db");
const { getCountries } = require("../../controllers/Countries");

const router = Router();

const PATH = "/countries";

// -----------------------------------------------

// Ejemplo 1
router.get(PATH, async (req, res) => {
  try {
  } catch (e) {
    console.error(`Error --→ ${e}`);
  }
});

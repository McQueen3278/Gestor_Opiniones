import { body, param} from "express-validator";
import {categoryExists} from "../helpers/db-validator.js";
import { validarCampos } from "./validar-campos.js";
import { handleErrors } from "./handleErrors.js";
import {validateJWT} from "./validate-jwt.js";
import {hasRoles} from "./role-validator.js";

export const createCategoryValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    body("name").notEmpty().withMessage("El nombre es requerido"),
    validarCampos,
    handleErrors
]

export const updateCategoryValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("cid").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("cid").custom(categoryExists),
    body("name").notEmpty().withMessage("El nombre es requerido"),
    validarCampos,
    handleErrors
]

export const deleteCategoryValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("cid").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("cid").custom(categoryExists),
    validarCampos,
    handleErrors
]
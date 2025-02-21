import {body, param} from 'express-validator';
import { validarCampos } from './validar-campos.js';
import { deleteFileOnError } from './delete-file-on-error.js';
import { handleErrors } from './handleErrors.js';
import { validateJWT } from './validate-jwt.js';
import { hasRoles } from './role-validator.js';
import { postExists } from '../helpers/db-validator.js';

export const createPostValidator = [
    validateJWT,
    hasRoles("USER_ROLE"),
    body("title").notEmpty().withMessage("El título es requerido"),
    body("content").notEmpty().withMessage("El contenido es requerido"),
    body("category").notEmpty().withMessage("La categoría es requerida"),
    validarCampos,
    deleteFileOnError,
    handleErrors
]

export const updatePostValidator = [
    validateJWT,
    hasRoles("USER_ROLE"),
    param("pid").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("pid").custom(postExists),
    validarCampos,
    deleteFileOnError,
    handleErrors
]

export const deletePostValidator = [
    validateJWT,
    hasRoles("USER_ROLE"),
    param("pid").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("pid").custom(postExists),
    validarCampos,
    handleErrors
]
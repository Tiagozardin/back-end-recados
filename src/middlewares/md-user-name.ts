import express from "express";
import {users} from "../data";

function validarNome(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const { username }: { username: string } = req.body;

  if (!username) {
    return res.status(400).json({
      msg: "Nome deve ser informado",
    });
  }

  if (username.trim().length < 3) {
    return res.status(400).json({
      msg: "O nome deve conter ao menos 3 caracteres",
    });
  }
  const existe = users.find((f: { username: string; }) => f.username === username);
  if (existe) {
    return res.status(400).json({
      msg: "Nome já cadastrado.",
    });
  }

  next();
}

export default validarNome;
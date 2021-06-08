import express from "express";

function validarPassword(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const { password }: { password: string } = req.body;

  if (!password) {
    return res.status(400).json({
      msg: "Password deve ser informado",
    });
  }

  next();
}

export default validarPassword;
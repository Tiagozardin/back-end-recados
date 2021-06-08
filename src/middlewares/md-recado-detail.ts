import express from "express";

function validarDetail(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const { detail }: { detail: string } = req.body;

  if (!detail) {
    return res.status(400).json({
      msg: "Detalhamento deve ser informado",
    });
 
  }
  next();
};

export default validarDetail;
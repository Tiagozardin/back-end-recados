import express, {json, Request, Response} from 'express';
import cors from 'cors';
import UserInterface from './interfaces/userInterface';
import User from './classes/user';
import validarNome from './middlewares/md-user-name';
import {users, recados } from "./data"
import validarPassword from './middlewares/md-user-password';
import reacadoInterface from './interfaces/recadoInterface';
import Recado from './classes/recado';
import validarTitle from './middlewares/md-recado-title';
import validarDetail from './middlewares/md-recado-detail';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())

app.get("/", (req: express.Request, res: express.Response) => {
  res.send(`
  <body style='margin:0;padding:0'>
      <div style='display: flex;justify-content: center;align-items: center; align-content: center;width:99vw;height:99vh'>
        <h1 style='font-size:60px;font-weigth:600'>🚀 API - Recados</h1>
      </div>
  </body>
  `);
});


// POST para criar um usuario
app.post("/user", validarNome, validarPassword, (request: Request, response: Response) => {
  const { username, password}: UserInterface = request.body;

  const user = new User (username, password);
 
  users.push(user);

  return response.status(200).json({ msg:"Cadastrado com sucesso"});
});

app.post("/login", (request: Request, response: Response) => {
  const { username, password}: UserInterface = request.body;

  const user = users.find((f) => {
    if (f.username === username && f.password === password) return f } );

  if (!user) {
    return response.status(404).json({
      msg: "Usuário e Senha estão errados",
    });
  }

  return response.status(200).json(true);
});


app.get("/recados", (request: Request, response: Response) => {
  
  return response.json({
    Lista: recados
  });
});


var id: number = 0;

app.post("/recado", validarTitle, validarDetail, (request: Request, response: Response) => {
  
  const { title, detail }: reacadoInterface = request.body;

  id += +1;
  const list = new Recado(id, title, detail);

  recados.push(list);
  return response.status(200).json({msg:"Recado cadastrado com sucesso"});
});

app.get("/recado/:id", (request: Request, response: Response) => {
  const { id }: { id?: string} = request.params;

  const idInt: number = parseInt(id);

  const ids = recados.find((f) => {
    return f.id === idInt;
    });

  if(!ids){
      return response.status(404).json({
        msg: "Usuário não encontrado"
      });
  }
 
  return response.status(200).json({
    success: true,
    data: ids});
});



// Atualizar um registro específico -- Insominia PUT
app.put("/recado/:id", validarTitle, validarDetail, (request: Request, response: Response) => {
  const { id }: { id?: string } = request.params;
  const {title, detail,}: reacadoInterface = request.body;

  const idInt: number = parseInt(id);

  const recado = recados.find((f) => {
    return f.id === idInt;
  });

  if (!recado) {
    return response.status(404).json({
      msg: "Recado não encontrado",
    });
  }

  recado.title = title;
  recado.detail = detail;

  return response.status(200).json({
    success:true,
    msg:"Recado atualizado com sucesso"
  });
});

// Excluir um recado a partir de um ID
app.delete("/recado/:id", (request: Request, response: Response) => {
  const { id }: { id?: string } = request.params;

  const idInt: number = parseInt(id);

  const indice = recados.findIndex((f) => {
    return f.id === idInt;
  });

  if (indice === -1) {
    return response.status(404).json({
      msg: "Recado não encontrado",
    });
  }

  recados.splice(indice, 1);
  return response.status(200).json({msg:"Recado Deletado"});
});


app.listen(process.env.PORT ||8080);
const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {

  response.json(repositories);

});

app.post("/repositories", (request, response) => {
  //validar campos recebendo na rota
  const { title, url, techs } = request.body

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  };

  repositories.push(repository);

  response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;
  const repositoryToUpdate = repositories.find(repo => repo.id === id);


  if (repositoryToUpdate) {

    repositoryToUpdate.title = title;
    repositoryToUpdate.url = url;
    repositoryToUpdate.techs = techs;

    response.json(repositoryToUpdate);

  } else {

    return response.status(400).json({ message: "Repository not found" })

  }
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const indexToRemove = repositories.findIndex(repos => repos.id === id);

  if (indexToRemove !== -1) {


    repositories.splice(indexToRemove, 1)

    response.status(204).send();

  } else {

    return response.status(400).json({ message: "Repository not found" })

  }

});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repository = repositories.find(repo => repo.id === id);

  if (repository) {

    repository.likes++;

    return response.json({ likes: repository.likes });

  } else {

    return response.status(400).json({ message: "Repository not found" })

  }


});

module.exports = app;

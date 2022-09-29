const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const routes = require("./src/routes");
if (process.env.NODE_ENV === "development") {
	require("dotenv").config(); // Habilita variáveis de ambiente
}

const app = express();
app.disable("etag"); // Ajusta o HTTP code

app.use(bodyParser.urlencoded({ extended: false })); // Declara qual biblioteca será utilizada para fazer o parsing
app.use(express.json()); // Transforma solicitações em JSON
app.use("/", routes);
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", ["GET", "POST", "PUT", "DELETE"]);

	app.use(cors());
	next();
}); // Habilita o CORS
app.use((error, req, res, next) => {
	res.status(error.status || 500);
	return res.json({ error: { message: error.message }});
}); // Tratamento de erros

app.listen(process.env.PORT || 8080, () => {
	console.log(`Express started at in ${process.env.PORT || 8080}`);
});
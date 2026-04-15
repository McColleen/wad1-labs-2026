'use strict';

import express from 'express';
import routes from "./routes.js";
import logger from "./utils/logger.js";
import { create } from 'express-handlebars';
import cookieParser from "cookie-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const handlebars = create({
	extname: '.hbs',
	helpers: {
		uppercase: (inputString) => {
			return String(inputString).toUpperCase();
		},
		formatDate: (date) => {
			const dateCreated = new Date(date);
			const options = {
				weekday: "long",
				year: "numeric",
				month: "long",
				day: "2-digit",
			};
			return `${dateCreated.toLocaleDateString("en-IE", options)}`;
		},
			highlightPopular: (rating) => {
				const message = rating >= 4 ? "Popular with listeners!" : "";
				return message;
			},
	},
});
app.engine(".hbs", handlebars.engine);
app.set("view engine", ".hbs");

app.use("/", routes);

app.listen(port, () => logger.info(`Your app is listening on port ${port}`));

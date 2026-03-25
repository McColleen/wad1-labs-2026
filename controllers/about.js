'use strict';
import logger from "../utils/logger.js";
import empStore from "../models/emp-store.js";

const about = {
  createView(request, response) {
    logger.info("About page loading!");
    const employees = empStore.getAllEmployees();
    const uniqueEmployees = employees.filter(
      (employee, index, self) => index === self.findIndex((e) => e.name === employee.name)
    );

      const viewData = {
      title: "Playlist App About",
      employees: uniqueEmployees
    };
    logger.info(viewData.employees);
    response.render('about', viewData); 
  },
};

export default about;

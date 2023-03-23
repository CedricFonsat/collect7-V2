import AdminJS from 'adminjs';
import AdminJSMongoose from '@adminjs/mongoose';
import AdminJSExpress from '@adminjs/express';
import express from 'express'

// Importez le modèle Mongoose que vous souhaitez gérer avec AdminJS
import userModel from './src/model/userModel.js';
import cardModel from './src/model/cardModel.js';
import collectionModel from './src/model/collectionModel.js';

// Configurez AdminJS pour utiliser Mongoose
AdminJS.registerAdapter(AdminJSMongoose);


// Connexion à la base de données MongoDB avec Mongoose

const usersNavigation = {
    name: 'Admin',
    icon: 'admin',
  }

// Créez une instance d'AdminJS en spécifiant les modèles à gérer et les options de configuration
const adminJs = new AdminJS({
  // Spécifiez les modèles à gérer

  resources: [
    {
    resource: userModel,
    options: {
         listProperties: ['username', 'email'],
        filterProperties: ['username', 'email'],
        editProperties: ['username', 'email', 'password'],
       // showProperties: ['id', 'name', 'bio', 'createdAt'],
       navigation: usersNavigation,
      },
  },{
    resource: cardModel,
    options: {
         listProperties: ['name', 'price', 'collections'],
        filterProperties: ['name', 'price','collections'],
        editProperties: ['name', 'price', 'price', 'collections'],
       // showProperties: ['id', 'name', 'bio', 'createdAt'],
       navigation: usersNavigation,
      },
  },{
    resource: collectionModel,
    options: {
         listProperties: ['name', 'category', 'description'],
        filterProperties: ['name', 'category','description'],
        editProperties: ['name', 'category', 'description'],
       // showProperties: ['id', 'name', 'bio', 'createdAt'],
       navigation: usersNavigation,
      },
  },
],
  // ... d'autres options de configuration
  locale: {
    language: 'de'
  },
});


const adminRoute = AdminJSExpress.buildRouter(adminJs);


export default adminRoute;
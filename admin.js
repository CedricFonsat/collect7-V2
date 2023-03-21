import AdminJS from 'adminjs';
import AdminJSMongoose from '@adminjs/mongoose';
import AdminJSExpress from '@adminjs/express';

// Importez le modèle Mongoose que vous souhaitez gérer avec AdminJS
import userModel from './src/model/userModel.js';
import cardModel from './src/model/cardModel.js';
import collectionModel from './src/model/collectionModel.js';

// Configurez AdminJS pour utiliser Mongoose
AdminJS.registerAdapter(AdminJSMongoose);


// Connexion à la base de données MongoDB avec Mongoose


// Créez une instance d'AdminJS en spécifiant les modèles à gérer et les options de configuration
const adminJs = new AdminJS({
  // Spécifiez les modèles à gérer
  resources: [userModel,cardModel,collectionModel],
  // ... d'autres options de configuration
});

const adminRoute = AdminJSExpress.buildRouter(adminJs);

export default adminRoute;
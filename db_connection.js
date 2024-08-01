const { Sequelize, DataTypes } = require('sequelize');

// Initialize Sequelize
const sequelize = new Sequelize('dialy_app', 'root', '2005', {
  host: 'localhost',
  dialect: 'mysql',
});

// Define the User model
const User = sequelize.define(
  'User',
  {
    email: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  },
);

// Initialize the database
const initializeDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    await sequelize.sync({ force: false }); // force: true will drop the table if it already exists
    console.log('Database & tables created!');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

// Initialize the database
initializeDatabase();

// Function to insert a user
async function insertUser(email, password, firstName, lastName) {
  try {
    // Check if user already exists
    const existingUser = await User.findOne({
      where: { email },
    });

    if (existingUser) {
      console.log('User already exists.');
      return false;
    }

    // Insert new user
    const newUser = await User.create({
      email,
      password,
      first_name: firstName,
      last_name: lastName,
    });

    console.log('User inserted successfully:');
    return true;
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      console.error('Duplicate entry error:', error.errors);
    } else if (error.original && error.original.errno === 1062) {
      console.error('Duplicate entry:', error.original.sqlMessage);
    } else {
      console.error('Insert failed:', error);
    }
    return false;
  }
}
async function changePassword(email, password) {
  try {
    await User.update(
      { password: password },
      {
        where: {
          email: email,
        },
      },
    );
  } catch (error) {
    console.log("dd")
  }
}

async function isUser(email,password){
  const userData = await User.findAll({
    where: {
      email: email,
    },
  });
  const dbEmail = userData[0].dataValues.email;
  const dbPassword = userData[0].dataValues.password;
  if(email==dbEmail && password == dbPassword){
    return true;
  }
  return false;
}
module.exports = { 
  insertUser, changePassword , isUser 
};

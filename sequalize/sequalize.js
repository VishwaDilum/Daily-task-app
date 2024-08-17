const { Sequelize, DataTypes } = require('sequelize');
const { genarateId } = require('../generateTaskId')
// Initialize Sequelize
const sequelize = new Sequelize('daily_app', 'root', '2005', {
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
// Define the pending_task model
const pending_task = sequelize.define('pending_task', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false
  },

  Category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Priority: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
},
  {
    timestamps: false,
  },
);

User.hasMany(pending_task, { foreignKey: 'email' });
pending_task.belongsTo(User, { foreignKey: 'email' })

// Define the onGoingTask model

const onGoingTask = sequelize.define('onGoingTask', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false
  },

  Category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Priority: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
},
  {
    timestamps: false,
  },
);
User.hasMany(onGoingTask, { foreignKey: 'email' });
onGoingTask.belongsTo(User, { foreignKey: 'email' })

// Define the complete_task model

const complete_task = sequelize.define('complete_task', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false
  },
  Category: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Priority: {
    allowNull: false,
    type: DataTypes.STRING
  },
  Description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: false,
}
);

User.hasMany(complete_task, { foreignKey: 'email' })
complete_task.belongsTo(User, { foreignKey: 'email' })

// Define the priority_01 model


const priority_01 = sequelize.define('priority_01', {
  id: {
    primaryKey: true,
    type: DataTypes.STRING,
    allowNull: false
  },
  Category: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Priority: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: false
})

User.hasMany(priority_01, { foreignKey: 'email' })
priority_01.belongsTo(User, { foreignKey: 'email' })

// Define the priority_02 model


const priority_02 = sequelize.define('priority_02', {
  id: {
    primaryKey: true,
    type: DataTypes.STRING,
    allowNull: false
  },
  Category: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Priority: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
},
  { timestamps: false });

User.hasMany(priority_02, { foreignKey: 'email' });
priority_02.belongsTo(User, { foreignKey: 'email' })

// Define the priority_03 model


const priority_03 = sequelize.define('priority_03', {
  id: {
    primaryKey: true,
    type: DataTypes.STRING,
    allowNull: false
  },
  Category: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Priority: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, { timestamps: false });

User.hasMany(priority_03, { foreignKey: 'email' });
priority_03.belongsTo(User, { foreignKey: 'email' })

// Define the all_task model

const all_task = sequelize.define('all_task', {
  Id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false
  },
  Category: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Priority: {
    allowNull: false,
    type: DataTypes.STRING
  },
  Description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  Email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: false,
}
);

User.hasMany(all_task, { foreignKey: 'Email' })
all_task.belongsTo(User, { foreignKey: 'Email' })

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

async function isUser(email, password) {
  const userData = await User.findAll({
    where: {
      email: email,
    },
  });
  const dbEmail = userData[0].dataValues.email;
  const dbPassword = userData[0].dataValues.password;
  if (email == dbEmail && password == dbPassword) {
    return true;
  }
  return false;
}
async function lastInsert() {
  try {
    const [results] = await sequelize.query(
      'SELECT * FROM all_tasks ORDER BY id DESC LIMIT 1',
      {
        type: Sequelize.QueryTypes.SELECT,
      }
    );
    console.log('Last row:' + results);
    return results;

  } catch (error) {
    console.error('Error retrieving last row:', error);
  }
}
async function addTask(setemail, setdate, setpriority, setcategory, setdescription) {
  try {
    const lastTask = await lastInsert();
    console.log('Last Task:' + lastTask); // Add this line to debug
    // Check if lastTask is null or undefined
    if (lastTask && Object.keys(lastTask).length > 0) {
      const { Id } = lastTask; // Destructure safely
      console.log('Last Task ID:', Id);
      const newId = generateNewId(Id);

      // Create a new task
      const newTask = await all_task.create({
        Id: newId,
        Email: setemail,
        Date: setdate,
        Priority: setpriority,
        Category: setcategory,
        Description: setdescription
      });

      const pendingNewTask = await pending_task.create({
        id: newId,
        email: setemail,
        Date: setdate,
        Priority: setpriority,
        Category: setcategory,
        Description: setdescription
      });

      console.log('New Task Added:');
    } else {
      console.log('No last task found. Adding new task with default ID.');
      const newTask = await all_task.create({
        Id: "D0001",
        Email: setemail,
        Date: setdate,
        Priority: setpriority,
        Category: setcategory,
        Description: setdescription
      });

      const pendingNewTask = await pending_task.create({
        id: "D0001",
        email: setemail,
        Date: setdate,
        Priority: setpriority,
        Category: setcategory,
        Description: setdescription
      });

      console.log('New Task Added:');
    }
  } catch (error) {
    console.error('Error adding task:', error);
  }
}

function generateNewId(lastId) {
  if (!lastId) {
    return 'D0001'; // Default ID if no last ID is provided
  }

  const lastIdNumber = parseInt(lastId.substring(1));
  const newIdNumber = lastIdNumber + 1;
  return 'D' + newIdNumber.toString().padStart(4, '0');
}

function updateOnGoing(id, status) {

}
function updateComplteTask(id, status) {

}
async function getAllTask(targetEmail) {
  try {
    const userData = await pending_task.findAll({
      where: {
        Email: targetEmail,
      },
    });
    return userData;
  } catch (error) {
    console.error('Error retrieving tasks:', userData); // Updated error message for clarity
  }
}
async function todayTask(targetEmail, targetDate) {
  try {
    const userData = await all_task.findAll({
      where: {
        Email: targetEmail,
        Date: targetDate
      },
    });
    return userData;
  } catch (error) {
    console.error('Error retrieving tasks:', userData); // Updated error message for clarity
  }
}
async function updateToOngoing(id, email, date, category, description, priority) {
  try {
    const isUpdate = await onGoingTask.create({
      id: id, Category: category, Priority: priority, Description: description
      , Date: date, email: email
    });

    await pending_task.destroy({
      where: {
        id: id
      },
      force: true
    });



    return isUpdate;
  } catch (error) {
    console.error('Error retrieving tasks:', error); // Updated error message for clarity
  }
}
async function updateToComplted(id, email, date, category, description, priority) {
  try {
    const isUpdate = await complete_task.create({
      id: id, Category: category, Priority: priority, Description: description
      , Date: date, email: email
    });

    await onGoingTask.destroy({
      where: {
        id: id
      },
      force: true
    });



    return isUpdate;
  } catch (error) {
    console.error('Error retrieving tasks:', error); // Updated error message for clarity
  }
}

async function allOngoingTask(targetEmail, targetDate) {
  try {
    const userData = await onGoingTask.findAll({
      where: {
        Email: targetEmail,
        Date: targetDate
      },
    });
    return userData;
  } catch (error) {
    console.error('Error retrieving tasks:', userData); // Updated error message for clarity
  }
}
async function allCompltedTask(targetEmail, targetDate) {
  try {
    const userData = await complete_task.findAll({
      where: {
        Email: targetEmail,
        Date: targetDate
      },
    });
    return userData;
  } catch (error) {
    console.error('Error retrieving tasks:', userData); // Updated error message for clarity
  }
}
module.exports = {
  insertUser, changePassword, isUser, lastInsert, addTask, updateOnGoing,
   updateComplteTask, getAllTask, todayTask, updateToOngoing, updateToComplted,
   allOngoingTask,allCompltedTask
};

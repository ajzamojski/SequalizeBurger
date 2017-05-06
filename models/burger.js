// // Export the database functions for the controller (burgers_Controller.js).
// module.exports = burger;

module.exports = function(sequelize, DataTypes) {
  var burgers = sequelize.define("burgers", 
  {
    burger_name: 
    {
      type: DataTypes.STRING,
      allowNull: false
    },
    devoured: 
    {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  },
  {    
      classMethods: 
      {
        associate: function(models) 
        {
          // Creates one-to-one association with `Customer` table.
          burgers.belongsTo(models.Customer);
        }
      }, 
	      freezeTableName: true,   //  prevents sequilize from making table name plural.
	      timestamps: false  
  }
           //  prevents sequilize from adding `updatedAt` and `createdAt` columns. 
 );
  return burgers;
};




module.exports = function(sequelize, DataTypes) {
  var Customer = sequelize.define("Customer", 
  {
    // Giving the Author model a name of type STRING
    customerName: DataTypes.STRING
  },

  {
    // prevents pluralization of the table and prevents 'createdAt' and 'updatedAt' columns.
    freezeTableName: true,
    timestamps: false
  }

  );
  return Customer;
};

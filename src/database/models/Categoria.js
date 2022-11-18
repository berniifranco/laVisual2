module.exports = (sequelize, dataTypes) => {
    let alias = 'Categoria';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        nombre: {
            type: dataTypes.STRING,
            allowNull: false
        }
    };
    let config = {
        tableName: 'categoria',
        timestamps: false
    };
    const Categoria = sequelize.define(alias, cols, config);
    Categoria.associate = function(modelos) {
        Categoria.hasMany(modelos.Producto, {
            as: 'productos',
            foreignKey: 'id_categoria'
        })
    }
    return Categoria;
}
module.exports = (sequelize, datatTypes) => {
    const alias = 'Carrito';
    const cols = {
        id: {
            type: datatTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        }
    };
    const config = {
        tableName: 'carrito',
        timestamps: false
    };

    const Carrito = sequelize.define(alias, cols, config);

    Carrito.associate = function(modelos) {
        Carrito.belongsTo(modelos.Persona, {
            as: 'persona',
            foreignKey: 'id_persona'
        });
        Carrito.belongsToMany(modelos.Producto, {
            as: 'productos',
            through: 'producto_carrito',
            foreignKey: 'id_carrito',
            otherKey: 'id_producto',
            timestamps: false
        })
    }

    return Carrito;

}
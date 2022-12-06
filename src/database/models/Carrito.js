module.exports = (sequelize, datatTypes) => {
    const alias = 'Carrito';
    const cols = {
        id: {
            type: datatTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        cantidad: {
            type: datatTypes.INTEGER,
            allowNull: false
        },
        total: {
            type: datatTypes.INTEGER,
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
        Carrito.belongsTo(modelos.Producto, {
            as: 'producto',
            foreignKey: 'id_producto'
        })
    }

    return Carrito;

}
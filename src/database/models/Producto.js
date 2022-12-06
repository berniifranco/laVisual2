module.exports = (sequelize, dataTypes) => {
    const alias = 'Producto';
    const cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        nombre: {
            type: dataTypes.STRING,
            allowNull: false
        },
        precio: {
            type: dataTypes.NUMBER,
            allowNull: false
        },
        cantidad: {
            type: dataTypes.NUMBER,
            allowNull: false
        }
    };
    const config = {
        tableName: 'producto',
        timestamps: false
    };
    const Producto = sequelize.define(alias, cols, config);
    Producto.associate = function(modelos) {
        Producto.belongsTo(modelos.Categoria, {
            as: 'categorias',
            foreignKey: 'id_categoria'
        });
        Producto.belongsTo(modelos.Persona, {
            as: 'persona',
            foreignKey: 'id_persona'
        });
        Producto.hasMany(modelos.Carrito, {
            as: 'carrito',
            foreignKey: 'id_producto'
        })
    }
    return Producto;
}
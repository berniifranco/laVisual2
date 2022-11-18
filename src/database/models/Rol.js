module.exports = (sequelize, dataTypes) => {
    const alias = 'Rol';
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
        }
    };
    const config = {
        tableName: 'rol',
        timestamps: false
    };
    const Rol = sequelize.define(alias, cols, config);
    Rol.associate = function(modelos) {
        Rol.hasMany(modelos.Persona, {
            as: 'personas',
            foreignKey: 'id_rol'
        })
    }
    return Rol;
}
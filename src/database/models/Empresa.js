module.exports = (sequelize, dataTypes) => {
    let alias = 'Empresa';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        nombre: {
            type: dataTypes.INTEGER,
            allowNull: false
        }
    };
    let config = {
        tableName: 'empresa',
        timestamps: false
    };

    const Empresa = sequelize.define(alias, cols, config);
    Empresa.associate = function(modelos) {
        Empresa.hasMany(modelos.Persona, {
            as: 'personas',
            foreignKey: 'id_empresa'
        })
    }
    return Empresa
}
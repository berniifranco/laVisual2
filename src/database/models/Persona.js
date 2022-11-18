module.exports = (sequelize, dataTypes) => {
    const alias = 'Persona';
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
        usuario: {
            type: dataTypes.STRING,
            allowNull: false
        },
        email: {
            type: dataTypes.STRING,
            allowNull: false
        },
        contrasena: {
            type: dataTypes.STRING,
            allowNull: false
        },
        direccion: {
            type: dataTypes.STRING,
            allowNull: false
        },
        ciudad: {
            type: dataTypes.STRING,
            allowNull: false
        },
        provincia: {
            type: dataTypes.STRING,
            allowNull: false
        },
        pais: {
            type: dataTypes.STRING,
            allowNull: false
        },
        piso: {
            type: dataTypes.INTEGER,
            allowNull: true
        },
        departamento: {
            type: dataTypes.STRING,
            allowNull: true
        },
        imagen: {
            type: dataTypes.STRING,
            allowNull: false
        }
    };
    let config = {
        tableName: 'persona',
        timestamps: false
    };

    const Persona = sequelize.define(alias, cols, config);
    Persona.associate = function(modelos) {
        Persona.belongsTo(modelos.Rol, {
            as: 'rol',
            foreignKey: 'id_rol'
        });
        Persona.hasMany(modelos.Producto, {
            as: 'productos',
            foreignKey: 'id_persona'
        });
        Persona.belongsTo(modelos.Empresa, {
            as: 'empresas',
            foreignKey: 'id_empresa'
        })
    }
    return Persona;
}
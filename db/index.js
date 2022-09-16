const { EmptyResultError } = require('sequelize');
const Sequelize = require('sequelize');
const { STRING, DECIMAL, TEXT } = Sequelize;
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_schools_db');


const Student = conn.define('student', {
    firstName: {
        type: STRING,
        allowNull: false
    },
    lastName: {
        type: STRING,
        allowNull: false
    },
    email: {
        type: STRING,
        allowNull: false,
        validate: { isEmail: true },
    },
    imageUrl: {
        type: STRING
    },
    gpa: {
        type: DECIMAL,
        defaultValue: 0.0,
        validate: {
            min: 0.0,
            max: 4.0 
        }
    }
});


Student.beforeCreate(async ( instance, options ) => {
    try{
        const result = await Student.findAll({
            where: {
                campusId: instance.campusId
            }
        });
        if (result.length === 10) {
            throw new Error(`Cannot create more instance for ${instance.campusId}`);
        }
    }
    catch(ex){
        throw(ex);
    }
});


const Campus = conn.define('campus', {
    name: {
        type: STRING,
        allowNull: false
    },
    imageUrl: {
        type: STRING
    },
    address: {
        type: STRING,
        allowNull: false
    },
    description: {
        type: TEXT
    }
});


Student.belongsTo(Campus);
Campus.hasMany(Student);

module.exports = {
    conn,
    Student,
    Campus
}
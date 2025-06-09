import { Model, DataTypes } from "sequelize";
import database from "../database/database";

class Todo extends Model {
  public id!: number;
  public userId!: string; // email dari google, ganti opsional jika ada data public
  public title!: string;
  public completed!: boolean;
  public description!: string;
  public imageUrl!:string;
}

Todo.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false // ganti true jika ada data public
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
  {
    sequelize: database,
    tableName: "todos"
  }
).sync()
.then(() => console.log("Todo model synced successfully."))
.catch((error: any) => console.error(`Error syncing Todo model: ${error.message}`));

export default Todo;
import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from "@db/connection";  

interface VarianteAttributes {
  id: number;
  color: string;
  price: number;
  productoId: number;
}

type VarianteCreationAttributes = Optional<VarianteAttributes, 'id'>;

export class Variante extends Model<VarianteAttributes, VarianteCreationAttributes>
  implements VarianteAttributes {
  public id!: number;
  public color!: string;
  public price!: number;
  public productoId!: number;
}

Variante.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    productoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'variantes',
    timestamps: true,
  }
);

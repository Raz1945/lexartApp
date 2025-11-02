import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from './index';
import { Variante } from './variante';

interface ProductoAttributes {
  id: number;
  name: string;
  brand: string;
  model: string;
  usuarioId: number;
}

type ProductoCreationAttributes = Optional<ProductoAttributes, 'id'>;

export class Producto extends Model<ProductoAttributes, ProductoCreationAttributes>
  implements ProductoAttributes {
  public id!: number;
  public name!: string;
  public brand!: string;
  public model!: string;
  public usuarioId!: number;
}

Producto.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    usuarioId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'productos',
    timestamps: true,
  }
);

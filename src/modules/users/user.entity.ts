import { Table, Column, Model, DataType, Default } from 'sequelize-typescript';

@Table
export class User extends Model<User> {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    firstName: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    lastName: string;

    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    email: string;

    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false, 
    })
    nickName: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    password: string;

    @Column({
        type: DataType.STRING,
    })
    avatar: any;

    @Default(999)
    @Column({
        type: DataType.NUMBER,
    })
    rating: number;

    @Default(false)
    @Column({
        type: DataType.BOOLEAN,
    })
    favorites: boolean
}
import sequelize from '../db.js'

import { DataTypes } from 'sequelize'

const User = sequelize.define('user', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userName: {
    type: DataTypes.STRING(50),
    unique: true,
  },
  email: {
    type: DataTypes.STRING(100),
    unique: true,
  },
  password: { type: DataTypes.STRING },
  avatarUrl: { type: DataTypes.STRING },
  status: {
    type: DataTypes.ENUM('online', 'offline'),
    defaultValue: 'offline',
  },
})

const Chat = sequelize.define('chat', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  type: {
    type: DataTypes.ENUM('private', 'group', 'channel'),
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  avatarUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
})
const ChatMember = sequelize.define('ChatMember', {
  chatId: {
    type: DataTypes.INTEGER,
    references: {
      model: Chat,
      key: 'id',
    },
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
    primaryKey: true,
  },
})

const ChatAdmin = sequelize.define('ChatAdmin', {
  chatId: {
    type: DataTypes.INTEGER,
    references: {
      model: Chat,
      key: 'id',
    },
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
    primaryKey: true,
  },
})
User.belongsToMany(Chat, {
  through: ChatMember,
  foreignKey: 'userId',
  otherKey: 'chatId',
})
Chat.belongsToMany(User, {
  through: ChatMember,
  foreignKey: 'chatId',
  otherKey: 'userId',
})

User.belongsToMany(Chat, {
  through: ChatAdmin,
  as: 'AdminChats',
  foreignKey: 'userId',
  otherKey: 'chatId',
})
Chat.belongsToMany(User, {
  through: ChatAdmin,
  as: 'Admins',
  foreignKey: 'chatId',
  otherKey: 'userId',
})

const models = {
  User,
  Chat,
  ChatMember,
  ChatAdmin,
}

export default models

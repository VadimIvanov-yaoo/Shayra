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

const Message = sequelize.define('message', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  text: { type: DataTypes.TEXT, allowNull: false },
  timestamp: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  senderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },

  chatId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Chat,
      key: 'id',
    },
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
User.hasMany(Message, { foreignKey: 'senderId', onDelete: 'CASCADE' })
Message.belongsTo(User, { foreignKey: 'senderId' })

Chat.hasMany(Message, { foreignKey: 'chatId', onDelete: 'CASCADE' })
Message.belongsTo(Chat, { foreignKey: 'chatId' })

const models = {
  User,
  Chat,
  ChatMember,
  ChatAdmin,
  Message,
}

export default models

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
    type: DataTypes.ENUM('private', 'group', 'channel', 'dialog'),
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
    allowNull: true,
    references: {
      model: User,
      key: 'id',
    },
  },

  chatId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Chat,
      key: 'id',
    },
  },

  dialogId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'dialog',
      key: 'id',
    },
  },
})

const Dialog = sequelize.define(
  'dialog',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    type: {
      type: DataTypes.ENUM('private', 'group', 'channel', 'dialog'),
      allowNull: false,
    },
    avatarUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    creatorName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    participantName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    tableName: 'dialog',
    freezeTableName: true,
  }
)

const DialogMember = sequelize.define('DialogMember', {
  dialogId: {
    type: DataTypes.INTEGER,
    references: {
      model: Dialog,
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
  as: 'MemberChats',
  foreignKey: 'userId',
  otherKey: 'chatId',
})
Chat.belongsToMany(User, {
  through: ChatMember,
  as: 'Members',
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

Chat.hasMany(Message, { foreignKey: 'chatId', onDelete: 'CASCADE' })
Message.belongsTo(Chat, { foreignKey: 'chatId' })

Dialog.belongsTo(User, { as: 'creator', foreignKey: 'creatorId' })
User.hasMany(Dialog, { as: 'createdDialogs', foreignKey: 'creatorId' })

Dialog.belongsTo(User, { as: 'participant', foreignKey: 'participantId' })
User.hasMany(Dialog, { as: 'participatedDialogs', foreignKey: 'participantId' })

Dialog.hasMany(Message, { foreignKey: 'dialogId', onDelete: 'CASCADE' })
Message.belongsTo(Dialog, { foreignKey: 'dialogId' })

User.hasMany(Message, { foreignKey: 'senderId', onDelete: 'CASCADE' })
Message.belongsTo(User, { foreignKey: 'senderId' })

const models = {
  DialogMember,
  Dialog,
  User,
  Chat,
  ChatMember,
  ChatAdmin,
  Message,
}

export default models

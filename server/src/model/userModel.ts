import { UserType } from 'types';

const users: Array<UserType> = [
  { id: '1', name: 'Ulbi TV', password: '23' }
];

class UserModel {
  create = (obj: { name: string; }): UserType | Error => {
    const newUser = {
      id: '3',
      name: obj.name
    };

    if(!users.find((el) => el.name === obj.name)) {
      users.push(newUser);
    } else {
      throw new Error('Пользователь уже существует');
    }

    return newUser;
  };

  // getById = ({ id: string }) => {
  //   const userIndex = users.findIndex((el) => el.id === String(id));

  //   if(userIndex === -1) {
  //     throw new Error('Пользователь не найден');
  //   }

  //   return users[userIndex];
  // };

  // removeById = ({ id: string }) => {
  //   const userIndex = users.findIndex((el) => el.id === String(id));

  //   if(userIndex === -1) {
  //     throw new Error('Пользователь не найден');
  //   }

  //   users.splice(userIndex, 1);

  //   return id;
  // };

  // removeByUsername: ({ id }) => {},
  // getAll: () => {
  //   return users;
  // },
  // getById: ({id}) => {
  //   return users.find(user => user.id === id);
  // },
}

export default new UserModel();

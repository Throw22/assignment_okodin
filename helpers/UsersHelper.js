var UsersHelper = {};

UsersHelper.usersPath = () => `/users`;
UsersHelper.userPath = (id) => `/user/${id}`;
module.exports = UsersHelper;
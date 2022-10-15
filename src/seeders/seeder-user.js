"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert("Users", [
            {
                email: "admin@gmail.com",
                password: "12345",
                firstName: "John",
                lastName: "Doe",
                phoneNumber: "0332638532",
                gender: "1",
                positionId: "",
                roleId: "R1",
                image: "",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    },
};

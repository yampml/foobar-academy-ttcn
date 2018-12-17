export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties,
    };
}

// export const isAllowed = (user, roles) =>
//   roles.some(role => user.role.includes(role));

// export const hasRole = (user, roles) =>
//   roles.some(role => user.roles.includes(role));


export const isAllowed = (user, role) => user.role === role; 
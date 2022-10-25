export const users = [
  {
    id: 1,
    name: `a`,
    lastName: `b`,
    dob: Date.now(),
    profile: 1
  },
  {
    id: 2,
    name: `b`,
    lastName: `b`,
    dob: Date.now() + 1,
    profile: 1
  }
];

const profiles = []

export const resolvers = {
  Query: {
    users: () => users,
    user: (id) => users.find(item => item.id == parseInt(id))
  },
};

const { authenticate } = require('feathers-authentication').hooks;
const { populate } = require('feathers-hooks-common');

const addArtistToUser = require('../../hooks/add-artist-to-user');

const addUserToArtistProfile = require('../../hooks/add-user-to-artist-profile');

const updateArtist = require('../../hooks/update-artist');

const eventSchema = {
  include: {
    service: 'events',
    nameAs: 'events',
    parentField: 'eventIds',
    childField: '_id',
  }
};



module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [authenticate('jwt'), addUserToArtistProfile()],
    update: [authenticate('jwt'), updateArtist()],
    patch: [authenticate('jwt'), updateArtist()],
    remove: [authenticate('jwt')]
  },

  after: {
    all: [
      populate({ schema: eventSchema })
    ],
    find: [],
    get: [],
    create: [addArtistToUser()],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};

// API CALLS FOR Members
import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getMembers = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/member.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

// TODO: DELETE MEMBER
const deleteMember = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/member/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

// TODO: GET SINGLE MEMBER
const getSingleMember = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/member/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// TODO: CREATE MEMBER
const createMember = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/member.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// TODO: UPDATE MEMBER
const updateMember = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/member/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getMemberDetails = async (firebaseKey) => {
  const member = await getSingleMember(firebaseKey);

  return { ...member };
};

export {
  getMembers,
  getMemberDetails,
  createMember,
  deleteMember,
  getSingleMember,
  updateMember,
};

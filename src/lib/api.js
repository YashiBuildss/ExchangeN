const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const getToken = () => localStorage.getItem('token');

export const signup = async (name, email, password) => {
  const res = await fetch(`${BASE_URL}/user/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Signup failed');
  return data;
};

export const login = async (email, password) => {
  const res = await fetch(`${BASE_URL}/user/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Login failed');
  return data;
};

export const getMe = async () => {
  const res = await fetch(`${BASE_URL}/user/me`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to fetch user');
  return data;
};

export const updateMe = async (updates) => {
  const res = await fetch(`${BASE_URL}/user/me`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(updates),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Update failed');
  return data;
};

export const addSkill = async (skillData) => {
  const res = await fetch(`${BASE_URL}/skill/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(skillData),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to add skill');
  return data;
};

export const deleteSkill = async (id) => {
  const res = await fetch(`${BASE_URL}/skill/delete/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to delete skill');
  return data;
};

export const getMySkills = async () => {
  const res = await fetch(`${BASE_URL}/skill/mine`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to fetch skills');
  return data;
};
export const getAllPosts = async () => {
  const res = await fetch(`${BASE_URL}/post/all`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to fetch posts');
  return data;
};

export const addPost = async (postData) => {
  const res = await fetch(`${BASE_URL}/post/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(postData),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to create post');
  return data;
};

export const deletePost = async (id) => {
  const res = await fetch(`${BASE_URL}/post/delete/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to delete post');
  return data;
};
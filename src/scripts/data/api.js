import { getAccessToken } from '../utils/auth';
import { BASE_URL } from '../config';

const ENDPOINTS = {
  // Auth
  REGISTER: `${BASE_URL}/register`,
  LOGIN: `${BASE_URL}/login`,
  MY_USER_INFO: `${BASE_URL}/users/me`,

  // Story
  STORY_LIST: `${BASE_URL}/stories`,
  STORY_DETAIL: (id) => `${BASE_URL}/stories/${id}`,
  STORE_NEW_STORY: `${BASE_URL}/stories`,
  SUBSCRIBE: `${BASE_URL}/notifications/subscribe`,
   
  SEND_STORY_TO_ME: (storiyId) => `${BASE_URL}/stories/${storiyId}/notify-me`,
  SEND_STORY_TO_USER: (storiyId) => `${BASE_URL}/stories/${storiyId}/notify`,
  SEND_STORY_TO_ALL_USER: (storiyId) => `${BASE_URL}/stories/${storiyId}/notify-all`
};

export async function getRegistered({ name, email, password }) {
  const data = JSON.stringify({ name, email, password });

  const fetchResponse = await fetch(ENDPOINTS.REGISTER, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: data,
  });
  const json = await fetchResponse.json();

  return {
    ...json,
    ok: fetchResponse.ok,
  };
}

export async function getLogin({ email, password }) {
  const data = JSON.stringify({ email, password });

  const fetchResponse = await fetch(ENDPOINTS.LOGIN, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: data,
  });
  const json = await fetchResponse.json();

  return {
    ...json.loginResult,
    ok: fetchResponse.ok,
  };
}

export async function getMyUserInfo() {
  const accessToken = getAccessToken();

  const fetchResponse = await fetch(ENDPOINTS.MY_USER_INFO, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const json = await fetchResponse.json();

  return {
    ...json,
    ok: fetchResponse.ok,
  };
}

export async function getAllStories() {
  const accessToken = getAccessToken();
  const fetchResponse = await fetch(ENDPOINTS.STORY_LIST, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const json = await fetchResponse.json();

  // Assuming json.data is the array containing objects with latitude and long 
  if (Array.isArray(json.listStory)) {
    json.listStory = json.listStory.map(item => ({
      ...item,
      latitude: item.lat ?? 0,
      longitude: item.lon ?? 0,
    }));
  }

  return {
    ...json,
    ok: fetchResponse.ok,
  };
}

export async function getStoryById(id) {
  const accessToken = getAccessToken();

  const fetchResponse = await fetch(ENDPOINTS.STORY_DETAIL(id), {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const json = await fetchResponse.json();

  json.story.latitude = json.story.lat;
  json.story.longitude = json.story.lon;

  return {
    ...json,
    ok: fetchResponse.ok,
  };
}

export async function storeNewStory({
  description,
  photo,
  latitude,
  longitude
}) {
  const accessToken = getAccessToken();

  const formData = new FormData();
  formData.set('description', description);
  formData.set('lat', latitude);
  formData.set('lon', longitude);
  photo.forEach((photo) => {
    formData.append('photo', photo);
  });

  const fetchResponse = await fetch(ENDPOINTS.STORE_NEW_STORY, {
    method: 'POST',
    headers: { Authorization: `Bearer ${accessToken}` },
    body: formData,
  });
  const json = await fetchResponse.json();

  return {
    ...json,
    ok: fetchResponse.ok,
  };
}


export async function subscribePushNotification({ endpoint, keys: { p256dh, auth } }) {
  const accessToken = getAccessToken();
  const data = JSON.stringify({
    endpoint,
    keys: { p256dh, auth },
  });
 
  const fetchResponse = await fetch(ENDPOINTS.SUBSCRIBE, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
    body: data,
  });
  const json = await fetchResponse.json();
 
  return {
    ...json,
    ok: fetchResponse.ok,
  };
}
 
export async function unsubscribePushNotification({ endpoint }) {
  const accessToken = getAccessToken();
  const data = JSON.stringify({ endpoint });
 
  const fetchResponse = await fetch(ENDPOINTS.SUBSCRIBE, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
    body: data,
  });
  const json = await fetchResponse.json();
 
  return {
    ...json,
    ok: fetchResponse.ok,
  };
}

/////

export async function sendStoryToMeViaNotification(storyId) {
  const accessToken = getAccessToken();

  const fetchResponse = await fetch(ENDPOINTS.SEND_STORY_TO_ME(storyId), {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const json = await fetchResponse.json();

  return {
    ...json,
    ok: fetchResponse.ok,
  };
}

export async function sendStoryToUserViaNotification(storyId, { userId }) {
  const accessToken = getAccessToken();
  const data = JSON.stringify({
    userId,
  });

  const fetchResponse = await fetch(ENDPOINTS.SEND_STORY_TO_USER(storyId), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
    body: data,
  });
  const json = await fetchResponse.json();

  return {
    ...json,
    ok: fetchResponse.ok,
  };
}

export async function sendStoryToAllUserViaNotification(storyId) {
  const accessToken = getAccessToken();

  const fetchResponse = await fetch(ENDPOINTS.SEND_STORY_TO_ALL_USER(storyId), {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const json = await fetchResponse.json();

  return {
    ...json,
    ok: fetchResponse.ok,
  };
}
 
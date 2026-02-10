import PocketBase from 'pocketbase'
import {
  type UsersResponse,
  type TypedPocketBase
} from "./pocketbase-types";
import { ref } from 'vue';

export const pb = new PocketBase(
  import.meta.env.VITE_URL_POCKETBASE
) as TypedPocketBase;

// Fonction pour récupérer toutes les entrées du journal
export const getAllEntries = async () => {
  try {
    return await pb.collection('journal').getFullList({
      sort: '-created', // du plus récent au plus ancien
    });
  } catch (err) {
    console.error(err);
    return [];
  }
};

// Fonction pour ajouter une entrée
export const addEntry = async (data: {
  text?: string;
  emoji?: string;
  file?: File;
}) => {
  const formData = new FormData();
  if (data.text) formData.append('text', data.text);
  if (data.emoji) formData.append('emoji', data.emoji);
  if (data.file) formData.append('media', data.file);

  try {
    return await pb.collection('journal').create(formData);
  } catch (err) {
    console.error(err);
    throw err;
  }
};
import { getTextureData } from 'idb';

export const fileToBase64 = file => {
  if (!file) {
    return null;
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
    reader.readAsDataURL(file);
  });
}

export const getImageBitmap = async name => {
  try {
    const fileData = await getTextureData(name);
    if (!fileData.file) {
      return null;
    }

    return createImageBitmap(fileData.file);
  } catch (err) {
    console.error(err);
    return null;
  }
}

//export const getFileName = (fullpath) => {
  //return fullpath.split('\\').pop().split('/').pop();
//}


//const base64ToFile = (data) => {
  //const raw = window.atob(data);
  //const rawLength = raw.length;
  //const bytes = new Uint8Array(rawLength);

  //for (let i = 0; i < rawLength; i++) {
    //bytes[i] = raw.charCodeAt(i);
  //}

  //return bytes;
//}


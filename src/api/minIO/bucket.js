import minioClient from './config';
import { sortByLastNumber, removeEndSlash } from '@/utils';

// Create a bucket
const createBucket = async (bucketName) => {
  try {
    await new Promise((resolve, reject) => {
      minioClient.makeBucket(bucketName, 'us-east-1', function (err) {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
    console.log(`Bucket ${bucketName} created successfully`);
    return { success: true };
  } catch (err) {
    console.error(`Error creating bucket ${bucketName}:`, err);
    return { success: false, error: err };
  }
};

// Listed buckets
const listBuckets = async () => {
  try {
    const buckets = await minioClient.listBuckets();
    return { success: true, buckets };
  } catch (err) {
    console.error('Error listing buckets:', err);
    return { success: false, error: err };
  }
};

// Check exists of a bucket
const bucketExists = async (bucketName) => {
  try {
    const exists = await minioClient.bucketExists(bucketName);
    return { exists };
  } catch (err) {
    console.error(`Error checking if bucket ${bucketName} exists:`, err);
    return { exists: false, error: err };
  }
};

// Remove a bucket
const removeBucket = async (bucketName) => {
  try {
    await minioClient.removeBucket(bucketName);
    return { success: true };
  } catch (err) {
    console.error(`Error removing bucket ${bucketName}:`, err);
    return { success: false, error: err };
  }
};

// List chapters in a bucket
const getListChapters = async (bucketName, prefix = '', recursive = false) => {
  try {
    const chapters = [];
    const stream = minioClient.listObjects(bucketName, prefix, recursive);

    for await (const obj of stream) {
      chapters.push(obj);
    }

    const chapterNames = chapters.map((object) =>
      removeEndSlash(object.prefix)
    );

    return { success: true, list: sortByLastNumber(chapterNames, true) };
  } catch (err) {
    console.error('Error listing chapters:', err);
    return { success: false, error: err };
  }
};

// List images in a bucket
const getListImages = async (bucketName, prefix = '', recursive = true) => {
  try {
    const images = [];
    const stream = minioClient.listObjects(bucketName, prefix, recursive);

    for await (const obj of stream) {
      images.push(obj);
    }

    const imageNames = sortByLastNumber(images.map((object) => object.name));

    const imageUrlPromises = imageNames.map(async (name) => {
      // Public URL
      // const minioHost = process.env.REACT_APP_MIO_END_POINT;
      // const minioPort = process.env.REACT_APP_MIO_PORT;
      // return `http://${minioHost}:${minioPort}/${bucketName}/${name}`;
      // Presigned URL
      const url = await minioClient.presignedGetObject(bucketName, name);
      return url;
    });

    // Wait for all promises to complete
    const imageUrls = await Promise.all(imageUrlPromises);

    return { success: true, list: imageUrls };
  } catch (err) {
    console.error('Error listing images:', err);
    return { success: false, error: err };
  }
};

// List objects in a bucket using listObjectsV2
const listObjectsV2 = async (bucketName, prefix = '', recursive = false) => {
  try {
    const objects = [];
    const stream = minioClient.listObjectsV2(bucketName, prefix, recursive);

    for await (const obj of stream) {
      objects.push(obj);
    }

    return { success: true, list: objects };
  } catch (err) {
    console.error('Error listing objects V2:', err);
    return { success: false, error: err };
  }
};

// List incomplete uploads in a bucket
const listIncompleteUploads = async (
  bucketName,
  prefix = '',
  recursive = false
) => {
  try {
    const uploads = [];
    const stream = minioClient.listIncompleteUploads(
      bucketName,
      prefix,
      recursive
    );

    for await (const upload of stream) {
      uploads.push(upload);
    }

    return { success: true, list: uploads };
  } catch (err) {
    console.error('Error listing incomplete uploads:', err);
    return { success: false, error: err };
  }
};

export {
  createBucket,
  listBuckets,
  bucketExists,
  removeBucket,
  getListChapters,
  getListImages,
  listObjectsV2,
  listIncompleteUploads,
};

import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { promisify } from "util";

dotenv.config();
const UPLOADS = process.env.UPLOADS_DIR;
const BOOK_COVERS_DIR = `${ UPLOADS }/books/`;
const readFile = promisify(fs.readFile);

export const createDirectory = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

export async function saveBookImage( image, bookTitle ) {
  try {
    const matches = image.match(/^data:image\/([A-Za-z-+\/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      throw new Error("Invalid image data");
    }

    const imageExtension = matches[1].split('/')[0];
    const imageData = Buffer.from(matches[2], 'base64');

    // Replace spaces in title with underscores
    const bookDir = path.join(BOOK_COVERS_DIR, bookTitle.replace(/\s/g, '_'));
    createDirectory(bookDir);

    // Save the image file to the book's directory with the correct extension
    const imageFileName = `${Date.now()}-${bookTitle.replace(/\s/g, '_')}.${imageExtension}`;
    const imagePath = path.join(bookDir, imageFileName);
    fs.writeFileSync(imagePath, imageData);

    return path.relative(BOOK_COVERS_DIR, imagePath);
  } catch (error) {
    console.error(`Error saving image file: ${error}`);
  }
}

export async function getBookImage( relativePath ) {
  try {
    const imagePath = path.join(process.cwd(), BOOK_COVERS_DIR ,relativePath);
    
    const image = await readFile(imagePath);
    const base64Image = image.toString("base64");

    // Obtener el tipo MIME de la imagen
    const imageExtension = path.extname(imagePath).slice(1);
    const mimeType = `image/${imageExtension}`;

    return { 
      serializedImage: `data:${ mimeType };base64,${ base64Image }`, 
      data: base64Image, 
      mimeType: mimeType 
    };
  } catch (error) {
    console.error(`Error reading image file: ${error}`);
  }
}

export async function deleteBookImage( imagePath ) {
  try {
    if (fs.existsSync( imagePath )) {
      fs.unlinkSync( imagePath );

      console.log(`
        Image deleted successfully: ${imagePath}
      `);

    } else {
      console.log(`
        Image does not exist: ${imagePath}
      `);
    }
  } catch (error) {
    console.error(`Error deleting image file: ${error}`);
  }
}

export async function deleteBookDirectory( bookDir ) {
  try {
    if (fs.existsSync( bookDir )) {
      fs.rmdirSync( bookDir, { recursive: true });

      console.log(`
        Directory deleted successfully: ${bookDir}
      `);

    } else {
      console.log(`
        Directory does not exist: ${bookDir}
      `);
    }
  } catch (error) {
    console.error(`Error deleting directory: ${error}`);
  }
}
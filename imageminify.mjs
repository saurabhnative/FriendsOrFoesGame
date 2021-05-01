// This file is used to reduce the file size of images to improve loading speeds
// You can change the location of files as per your image location
import imagemin from "imagemin";
import imageminJpegtran from "imagemin-jpegtran";
import imageminPngquant from "imagemin-pngquant";
async function minify() {
  const files = await imagemin(
    ["../pictures/QuestionsV2/originalSize/mouse.png"],
    {
      destination: "../pictures/QuestionsV2/compressed/",
      plugins: [
        imageminJpegtran(),
        imageminPngquant({
          quality: [0.2, 0.2],
        }),
      ],
    }
  );
  console.log(files);
}

minify();

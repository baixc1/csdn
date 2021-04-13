var isSupportWebp = function () {
  try {
    const cvs = document.createElement("canvas");
    console.log(cvs.toDataURL("image/webp", 0.5));
    console.log(cvs.toDataURL("image/webp1", 0.5));
    return cvs.toDataURL("image/webp", 0.5).indexOf("data:image/webp") === 0;
  } catch (err) {
    return false;
  }
};

console.log(isSupportWebp());

function check_webp_feature(feature, callback) {
  var kTestImages = {
    lossy: "UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",
    lossless: "UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==",
    alpha:
      "UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==",
    animation:
      "UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA",
  };
  var img = new Image();
  img.onload = function () {
    var result = img.width > 0 && img.height > 0;
    callback(feature, result);
  };
  img.onerror = function () {
    callback(feature, false);
  };
  img.src = "data:image/webp;base64," + kTestImages[feature];
}
["lossy", "lossless", "alpha", "animation"].forEach((item) => {
  check_webp_feature(item, (fea, ret) => console.log(fea, ret));
});

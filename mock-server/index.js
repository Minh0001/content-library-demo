const ASSET_TYPES = [
  "PRODUCT",
  "VIDEO",
  "IMAGE",
];

const IMAGE_SIZES = [
  [480, 640],
  [640, 480],
  [640, 640],
  [480, 960],
  [960, 480],
  [1080, 768],
  [1280, 720],
];

module.exports = () => {
  var faker = require('faker');

  const data = {
    users: [],
    clients: [],
    assets: [],
  }
  for (let i = 0; i < 10; i++) {
    data.users.push({
      id: i + 1,
      name: faker.name.findName(),
      email: faker.internet.email(),
    })
  }
  for (let i = 0; i < 5; i++) {
    data.clients.push({
      id: i + 1,
      name: faker.company.companyName(),
      address: faker.address.streetAddress(),
    });
  }
  for (let i = 0; i < 10000; i++) {
    const assetType = faker.helpers.randomize(ASSET_TYPES);
    const fileName = faker.system.commonFileName(assetType === "VIDEO" ? "mp4" : "jpeg");
    const size = faker.helpers.randomize(IMAGE_SIZES);
    const thumbnailUrl = faker.image.imageUrl(size[0], size[2]);
    const date = faker.date.past().getTime();
    data.assets.push({
      id: i + 1,
      user_id: faker.random.number(10),
      client_id: faker.random.number(5),
      asset_type: assetType,
      file_name: fileName,
      thumbnail_url: thumbnailUrl,
      created_at: date,
      updated_at: date,
    });
  }
  return data
}
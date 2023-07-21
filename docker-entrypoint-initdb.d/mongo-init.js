db.createUser({
  user: process.env.MONGODB_ROOT_USERNAME,
  pwd: process.env.MONGODB_ROOT_PASSWORD,
  roles: [
    {
      role: 'readWrite',
      db: 'pos',
    },
  ],
})

db = new Mongo().getDB("pos")

db.createCollection('users', { capped: false })
db.createCollection('logs', { capped: false })
db.createCollection('additional_cost', { capped: false })
db.createCollection('categories', { capped: false })
db.createCollection('optiongroups', { capped: false })
db.createCollection('item', { capped: false })
db.createCollection('recipes', { capped: false })

db.categories.insert([
  {
    "_id": ObjectId("5efb73b6e6c291823ae7a3b5"),
    "category": "串燒",
    "options": [
      "辣度"
    ]
  },
  {
    "_id": ObjectId("5efb73b6e6c291823ae7a3b8"),
    "category": "扒類",
    "options": [
      "辣度"
    ]
  },
  {
    "_id": ObjectId("5efb73b7e6c291823ae7a3bb"),
    "category": "炒飯",
    "options": [
      "辣度"
    ]
  },
  {
    "_id": ObjectId("5efb73b7e6c291823ae7a3be"),
    "category": "炒菜",
    "options": [
      "辣"
    ]
  },
  {
    "_id": ObjectId("5efb73b7e6c291823ae7a3c1"),
    "category": "飯類",
    "options": [
      "辣度",
      "附加",
      "汁",
      "飯走"
    ]
  },
  {
    "_id": ObjectId("5efb73b7e6c291823ae7a3c4"),
    "category": "炒麵",
    "options": [
      "辣度",
      "附加"
    ]
  },
  {
    "_id": ObjectId("5efb73b7e6c291823ae7a3c7"),
    "category": "其他",
    "options": [
      "辣度"
    ]
  },
  {
    "_id": ObjectId("5efb73b7e6c291823ae7a3ca"),
    "category": "飲品",
    "options": [
      "辣度",
      "飲品"
    ]
  }

])

db.getCollection('optiongroups').insert([
  {
    "_id": ObjectId("5efb7071e6c291823ae7a03f"),
    "title": "辣度",
    "type": "checkbox",
    "option": [
      "大辣",
      "中辣",
      "小辣",
      "不辣"
    ]
  },
  {
    "_id": ObjectId("5efb708be6c291823ae7a04d"),
    "title": "飯",
    "type": "checkbox",
    "option": [
      "多飯",
      "少飯",
      "走飯"
    ]
  },
  {
    "_id": ObjectId("5efb708be6c291823ae7a050"),
    "title": "菜",
    "type": "checkbox",
    "option": [
      "多菜",
      "少菜",
      "走菜"
    ]
  },
  {
    "_id": ObjectId("5efb71bae6c291823ae7a152"),
    "title": "炒法",
    "type": "radio",
    "option": [
      "蒜蓉",
      "蝦醬"
    ]
  },
  {
    "_id": ObjectId("5efc0e2fbb4dc00fa89ecbf2"),
    "title": "走籤",
    "type": "radio",
    "option": [
      "走籤"
    ]
  },
  {
    "_id": ObjectId("5efc0e2fbb4dc00fa89ecbf5"),
    "title": "沙爹汁",
    "type": "radio",
    "option": [
      "多沙爹汁",
      "少沙爹汁",
      "走沙爹汁",
      "分開汁"
    ]
  },
  {
    "_id": ObjectId("5efc0efabb4dc00fa89ecc89"),
    "title": "切",
    "type": "radio",
    "option": [
      "切",
      "不切"
    ]
  },
  {
    "_id": ObjectId("5efc0f81bb4dc00fa89eccdf"),
    "title": "花生",
    "type": "radio",
    "option": [
      "多花生",
      "走花生"
    ]
  },
  {
    "_id": ObjectId("5efc14a3bb4dc00fa89ed031"),
    "title": "加辣炒",
    "type": "radio",
    "option": [
      "加辣炒"
    ]
  },
  {
    "_id": ObjectId("5efc14bcbb4dc00fa89ed044"),
    "title": "加辣醬",
    "type": "radio",
    "option": [
      "加辣醬"
    ]
  },
  {
    "_id": ObjectId("5efd4f2c7a27366989acf838"),
    "title": "加沙爹汁",
    "type": "radio",
    "option": [
      "大辣沙爹汁",
      "小辣沙爹汁",
      "不辣沙爹汁"
    ]
  },
  {
    "_id": ObjectId("5efd51767a27366989acf96b"),
    "title": "炒飯走",
    "type": "checkbox",
    "option": [
      "走蝦",
      "走青",
      "走洋蔥",
      "走紅",
      "走豆",
      "走菜",
      "走雞",
      "走蛋",
      "走芹菜",
      "多味"
    ]
  },
  {
    "_id": ObjectId("5efd51767a27366989acf96e"),
    "title": "附加",
    "type": "radio",
    "option": [
      "炒底",
      "加底"
    ]
  },
  {
    "_id": ObjectId("5f111ad3270ab57c6f024d6b"),
    "title": "汁",
    "type": "checkbox",
    "option": [
      "咖喱"
    ]
  },
  {
    "_id": ObjectId("5f111b7d270ab57c6f024de3"),
    "title": "飲品",
    "type": "checkbox",
    "option": [
      "多冰",
      "少冰",
      "多甜",
      "少甜"
    ]
  },
  {
    "_id": ObjectId("5f111c4e270ab57c6f024ea3"),
    "title": "飯走",
    "type": "checkbox",
    "option": [
      "走雞",
      "走牛",
      "轉雞",
      "轉豬",
      "走花生",
      "走青瓜",
      "走粟米餅",
      "走薯仔餅",
      "轉粟米餅",
      "轉薯仔餅"
    ]
  },
  {
    "_id": ObjectId("620efe49f25df8d08adedc9b"),
    "title": "汽水",
    "type": "radio",
    "option": [
      "可樂",
      "cream",
      "雪碧",
      "雀檸"
    ]
  }

])

db.getCollection('additional_cost').insert([
  {
    "_id": ObjectId("5efd4ff67a27366989acf8a1"),
    "title": "加底",
    "extraCost": NumberInt(10)
  },
  {
    "_id": ObjectId("5efd4ff67a27366989acf8a4"),
    "title": "炒底",
    "extraCost": NumberInt(10)
  }

])

db.recipes.insert([
  {
    "_id": ObjectId("5efb7202e6c291823ae7a18b"),
    "itemCode": "S001",
    "displayName": "沙爹雞肉",
    "price": NumberInt(14),
    "category": "串燒",
    "imgSrcUrl": "http://menu.indonesiansatehouse.com/img/K.jpg",
    "options": [
      "沙爹汁",
      "辣度",
      "走籤"
    ]
  },
  {
    "_id": ObjectId("5efb7202e6c291823ae7a18f"),
    "itemCode": "S002",
    "displayName": "沙爹牛肉",
    "price": NumberInt(14),
    "category": "串燒",
    "imgSrcUrl": "http://menu.indonesiansatehouse.com/img/牛.jpg",
    "options": [
      "沙爹汁",
      "辣度",
      "走籤"
    ]
  },
  {
    "_id": ObjectId("5efb7202e6c291823ae7a193"),
    "itemCode": "S003",
    "displayName": "沙爹豬肉",
    "price": NumberInt(14),
    "category": "串燒",
    "imgSrcUrl": "http://menu.indonesiansatehouse.com/img/豬.jpg",
    "options": [
      "沙爹汁",
      "辣度",
      "走籤"
    ]
  },
  {
    "_id": ObjectId("5efb7202e6c291823ae7a196"),
    "itemCode": "S004",
    "displayName": "沙爹羊肉",
    "price": NumberInt(15),
    "category": "串燒",
    "imgSrcUrl": "http://menu.indonesiansatehouse.com/img/羊.jpg",
    "options": [
      "沙爹汁",
      "辣度",
      "走籤"
    ]
  },
  {
    "_id": ObjectId("5efb7202e6c291823ae7a199"),
    "itemCode": "S005",
    "displayName": "炭燒大魷魚",
    "price": NumberInt(35),
    "category": "串燒",
    "imgSrcUrl": "http://menu.indonesiansatehouse.com/img/魷魚鬚骨.jpg",
    "options": [
      "沙爹汁",
      "辣度",
      "走籤"
    ]
  },
  {
    "_id": ObjectId("5efb7202e6c291823ae7a19c"),
    "itemCode": "S006",
    "displayName": "炭燒魷魚鬚",
    "price": NumberInt(14),
    "category": "串燒",
    "imgSrcUrl": "http://menu.indonesiansatehouse.com/img/魷魚鬚.jpg",
    "options": [
      "沙爹汁",
      "辣度",
      "走籤"
    ]
  },
  {
    "_id": ObjectId("5efb7202e6c291823ae7a19f"),
    "itemCode": "S007",
    "displayName": "炭燒牛舌",
    "price": NumberInt(16),
    "category": "串燒",
    "imgSrcUrl": "http://menu.indonesiansatehouse.com/img/牛舌.jpg",
    "options": [
      "沙爹汁",
      "辣度",
      "走籤"
    ]
  },
  {
    "_id": ObjectId("5efb7202e6c291823ae7a1a2"),
    "itemCode": "S008",
    "displayName": "炭燒墨魚餅",
    "price": NumberInt(16),
    "category": "串燒",
    "imgSrcUrl": "http://menu.indonesiansatehouse.com/img/墨魚餅.jpg",
    "options": [
      "沙爹汁",
      "辣度",
      "走籤"
    ]
  },
  {
    "_id": ObjectId("5efb7202e6c291823ae7a1a5"),
    "itemCode": "S009",
    "displayName": "炭燒蝦餅",
    "price": NumberInt(16),
    "category": "串燒",
    "imgSrcUrl": "http://menu.indonesiansatehouse.com/img/蝦餅.jpg",
    "options": [
      "沙爹汁",
      "辣度",
      "走籤"
    ]
  },
  {
    "_id": ObjectId("5efb7202e6c291823ae7a1a8"),
    "itemCode": "S010",
    "displayName": "滋味燒海蝦",
    "price": NumberInt(14),
    "category": "串燒",
    "imgSrcUrl": "http://menu.indonesiansatehouse.com/img/虾.jpg",
    "options": [
      "沙爹汁",
      "辣度",
      "走籤"
    ]
  },
  {
    "_id": ObjectId("5efb7203e6c291823ae7a1ab"),
    "itemCode": "S011",
    "displayName": "美味雞軟骨",
    "price": NumberInt(14),
    "category": "串燒",
    "imgSrcUrl": "http://menu.indonesiansatehouse.com/img/軟.jpg",
    "options": [
      "沙爹汁",
      "辣度",
      "走籤"
    ]
  },
  {
    "_id": ObjectId("5efb7203e6c291823ae7a1ae"),
    "itemCode": "S012",
    "displayName": "秘製燒白鱔",
    "price": NumberInt(35),
    "category": "串燒",
    "imgSrcUrl": "http://menu.indonesiansatehouse.com/img/鱔.jpg",
    "options": [
      "沙爹汁",
      "辣度",
      "走籤"
    ]
  },
  {
    "_id": ObjectId("5efb7203e6c291823ae7a1b1"),
    "itemCode": "S013",
    "displayName": "魚蛋",
    "price": NumberInt(14),
    "category": "串燒",
    "imgSrcUrl": "http://menu.indonesiansatehouse.com/img/魚蛋.jpg",
    "options": [
      "沙爹汁",
      "辣度",
      "走籤"
    ]
  },
  {
    "_id": ObjectId("5efb7203e6c291823ae7a1b6"),
    "itemCode": "S014",
    "displayName": "紅腸",
    "price": NumberInt(14),
    "category": "串燒",
    "imgSrcUrl": "http://menu.indonesiansatehouse.com/img/紅.jpg",
    "options": [
      "沙爹汁",
      "辣度",
      "走籤"
    ]
  },
  {
    "_id": ObjectId("5efb7203e6c291823ae7a1b9"),
    "itemCode": "S015",
    "displayName": "雞腎",
    "price": NumberInt(14),
    "category": "串燒",
    "imgSrcUrl": "http://menu.indonesiansatehouse.com/img/臣.jpg",
    "options": [
      "沙爹汁",
      "辣度",
      "走籤"
    ]
  },
  {
    "_id": ObjectId("5efb7203e6c291823ae7a1bd"),
    "itemCode": "S016",
    "displayName": "鮮竹卷",
    "price": NumberInt(13),
    "category": "串燒",
    "imgSrcUrl": "http://menu.indonesiansatehouse.com/img/竹.jpg",
    "options": [
      "沙爹汁",
      "辣度",
      "走籤",
      "切"
    ]
  },
  {
    "_id": ObjectId("5efb7203e6c291823ae7a1c0"),
    "itemCode": "S017",
    "displayName": "雞肉腸",
    "price": NumberInt(11),
    "category": "串燒",
    "imgSrcUrl": "http://menu.indonesiansatehouse.com/img/小.jpg",
    "options": [
      "沙爹汁",
      "辣度",
      "走籤",
      "切"
    ]
  },
  {
    "_id": ObjectId("5efb7203e6c291823ae7a1c3"),
    "itemCode": "S018",
    "displayName": "燒雞翼尖",
    "price": NumberInt(13),
    "category": "串燒",
    "imgSrcUrl": "http://menu.indonesiansatehouse.com/img/尖.jpg",
    "options": [
      "沙爹汁",
      "辣度",
      "走籤"
    ]
  },
  {
    "_id": ObjectId("5efb7203e6c291823ae7a1c6"),
    "itemCode": "S019",
    "displayName": "燒雞翼",
    "price": NumberInt(16),
    "category": "串燒",
    "imgSrcUrl": "http://menu.indonesiansatehouse.com/img/亦.jpg",
    "options": [
      "沙爹汁",
      "辣度",
      "走籤"
    ]
  },
  {
    "_id": ObjectId("5efb7203e6c291823ae7a1c9"),
    "itemCode": "S020",
    "displayName": "珍寶腸",
    "price": NumberInt(22),
    "category": "串燒",
    "imgSrcUrl": "http://menu.indonesiansatehouse.com/img/大.jpg",
    "options": [
      "沙爹汁",
      "辣度",
      "走籤",
      "切"
    ]
  },
  {
    "_id": ObjectId("5efb7203e6c291823ae7a1cc"),
    "itemCode": "S021",
    "displayName": "魷魚",
    "price": NumberInt(26),
    "category": "串燒",
    "imgSrcUrl": "http://menu.indonesiansatehouse.com/img/尤.jpg",
    "options": [
      "沙爹汁",
      "辣度",
      "走籤"
    ]
  },
  {
    "_id": ObjectId("5efb7204e6c291823ae7a1cf"),
    "itemCode": "P001",
    "displayName": "雞脾",
    "price": NumberInt(30),
    "category": "扒類",
    "imgSrcUrl": "http://menu.indonesiansatehouse.com/img/脾.jpg",
    "options": [
      "辣度",
      "沙爹汁",
      "切"
    ]
  },
  {
    "_id": ObjectId("5efb7204e6c291823ae7a1d2"),
    "itemCode": "P002",
    "displayName": "沙爹豬扒",
    "price": NumberInt(30),
    "category": "扒類",
    "imgSrcUrl": "http://menu.indonesiansatehouse.com/img/豬扒.jpg",
    "options": [
      "辣度",
      "沙爹汁",
      "切"
    ]
  },
  {
    "_id": ObjectId("5efb7204e6c291823ae7a1d5"),
    "itemCode": "P003",
    "displayName": "沙爹牛扒",
    "price": NumberInt(30),
    "category": "扒類",
    "imgSrcUrl": "http://menu.indonesiansatehouse.com/img/牛扒.jpg",
    "options": [
      "辣度",
      "沙爹汁",
      "切"
    ]
  },
  {
    "_id": ObjectId("5efb7204e6c291823ae7a1d8"),
    "itemCode": "P004",
    "displayName": "沙爹雞扒",
    "price": NumberInt(30),
    "category": "扒類",
    "imgSrcUrl": "http://menu.indonesiansatehouse.com/img/K扒.jpg",
    "options": [
      "辣度",
      "沙爹汁",
      "切"
    ]
  },
  {
    "_id": ObjectId("5efb7204e6c291823ae7a1db"),
    "itemCode": "P005",
    "displayName": "沙爹豬頸肉",
    "price": NumberInt(32),
    "category": "扒類",
    "imgSrcUrl": "http://menu.indonesiansatehouse.com/img/勁.jpg",
    "options": [
      "辣度",
      "沙爹汁",
      "切"
    ]
  },
  {
    "_id": ObjectId("5efb7204e6c291823ae7a1df"),
    "itemCode": "V001",
    "displayName": "炒通菜",
    "price": NumberInt(45),
    "category": "炒菜",
    "imgSrcUrl": "http://menu.indonesiansatehouse.com/img/通.jpg",
    "options": [
      "炒法"
    ]
  },
  {
    "_id": ObjectId("5efb7204e6c291823ae7a1e2"),
    "itemCode": "V002",
    "displayName": "炒生菜",
    "price": NumberInt(42),
    "category": "炒菜",
    "imgSrcUrl": "http://menu.indonesiansatehouse.com/img/生.jpg",
    "options": [
      "炒法"
    ]
  },
  {
    "_id": ObjectId("5efb7204e6c291823ae7a1e5"),
    "itemCode": "V003",
    "displayName": "炒椰菜",
    "price": NumberInt(42),
    "category": "炒菜",
    "imgSrcUrl": "http://menu.indonesiansatehouse.com/img/椰.jpg",
    "options": [
      "炒法"
    ]
  },
  {
    "_id": ObjectId("5efb7204e6c291823ae7a1e8"),
    "itemCode": "V004",
    "displayName": "炒娃娃菜",
    "price": NumberInt(42),
    "category": "炒菜",
    "imgSrcUrl": "http://menu.indonesiansatehouse.com/img/娃.jpg",
    "options": [
      "炒法"
    ]
  },
  {
    "_id": ObjectId("5efb7204e6c291823ae7a1eb"),
    "itemCode": "V005",
    "displayName": "炒雜菜",
    "price": NumberInt(48),
    "category": "炒菜",
    "imgSrcUrl": "http://menu.indonesiansatehouse.com/img/雜才.jpg",
    "options": [
      "炒法"
    ]
  },
  {
    "_id": ObjectId("5efb7204e6c291823ae7a1ee"),
    "itemCode": "SR01",
    "displayName": "沙爹豬扒飯",
    "price": 48.0,
    "category": "飯",
    "imgSrcUrl": "http://menu.indonesiansatehouse.com/img/豬扒飯.jpg",
    "options": [
      "辣度",
      "汁",
      "飯",
      "菜",
      "加辣醬",
      "附加"
    ]
  },
  {
    "_id": ObjectId("5efb7205e6c291823ae7a1f1"),
    "itemCode": "SR02",
    "displayName": "沙爹牛扒飯",
    "price": 48.0,
    "category": "飯",
    "imgSrcUrl": "http://menu.indonesiansatehouse.com/img/牛扒飯.jpg",
    "options": [
      "辣度",
      "汁",
      "飯",
      "菜",
      "附加",
      "加辣醬"
    ]
  },
  {
    "_id": ObjectId("5efb7205e6c291823ae7a1f4"),
    "itemCode": "SR03",
    "displayName": "沙爹雞扒飯",
    "price": 48.0,
    "category": "飯",
    "imgSrcUrl": "http://menu.indonesiansatehouse.com/img/K扒飯.jpg",
    "options": [
      "辣度",
      "飯",
      "汁",
      "菜",
      "附加",
      "加辣醬"
    ]
  },
  {
    "_id": ObjectId("5efb7205e6c291823ae7a1f7"),
    "itemCode": "SR04",
    "displayName": "沙爹豬頸肉飯",
    "price": 50.0,
    "category": "飯",
    "imgSrcUrl": "http://menu.indonesiansatehouse.com/img/勁飯.jpg",
    "options": [
      "辣度",
      "汁",
      "飯",
      "菜",
      "附加",
      "加辣醬"
    ]
  },
  {
    "_id": ObjectId("5efb7205e6c291823ae7a1fa"),
    "itemCode": "SR05",
    "displayName": "咖喱雞飯",
    "price": NumberInt(48),
    "category": "飯",
    "imgSrcUrl": "http://menu.indonesiansatehouse.com/img/咖飯.jpg",
    "options": [
      "辣度",
      "飯",
      "菜",
      "加辣醬",
      "附加",
      "飯走"
    ]
  },
  {
    "_id": ObjectId("5efb7205e6c291823ae7a1fd"),
    "itemCode": "SR06",
    "displayName": "沙爹飯",
    "price": 48.0,
    "category": "飯",
    "imgSrcUrl": "http://menu.indonesiansatehouse.com/img/沙飯.jpg",
    "options": [
      "辣度",
      "飯",
      "菜",
      "走籤",
      "加辣醬",
      "附加"
    ]
  },
  {
    "_id": ObjectId("5efb7205e6c291823ae7a200"),
    "itemCode": "SR07",
    "displayName": "巴東牛肉飯",
    "price": NumberInt(50),
    "category": "飯",
    "imgSrcUrl": "http://menu.indonesiansatehouse.com/img/巴飯.jpg",
    "options": [
      "辣度",
      "飯",
      "菜",
      "加辣醬",
      "附加",
      "飯走"
    ]
  },
  {
    "_id": ObjectId("5efb7205e6c291823ae7a203"),
    "itemCode": "FR01",
    "displayName": "咸魚炒飯",
    "price": 45.0,
    "category": "炒飯",
    "imgSrcUrl": "http://menu.indonesiansatehouse.com/img/咸.jpg",
    "options": [
      "飯",
      "加辣醬",
      "加辣炒",
      "加沙爹汁",
      "附加",
      "炒飯走"
    ]
  },
  {
    "_id": ObjectId("5efb7205e6c291823ae7a206"),
    "itemCode": "FR02",
    "displayName": "XO醬炒飯",
    "price": 45.0,
    "category": "炒飯",
    "imgSrcUrl": "http://menu.indonesiansatehouse.com/img/XO.jpg",
    "options": [
      "飯",
      "加辣醬",
      "加辣炒",
      "加沙爹汁",
      "附加",
      "炒飯走"
    ]
  },
  {
    "_id": ObjectId("5efb7205e6c291823ae7a209"),
    "itemCode": "FR03",
    "displayName": "蝦醬炒飯",
    "price": 45.0,
    "category": "炒飯",
    "imgSrcUrl": "http://menu.indonesiansatehouse.com/img/虾.jpg",
    "options": [
      "飯",
      "加辣醬",
      "加辣炒",
      "加沙爹汁",
      "附加",
      "炒飯走"
    ]
  },
  {
    "_id": ObjectId("5efb7205e6c291823ae7a20c"),
    "itemCode": "FR04",
    "displayName": "印尼炒飯",
    "price": 45.0,
    "category": "炒飯",
    "imgSrcUrl": "http://menu.indonesiansatehouse.com/img/印.jpg",
    "options": [
      "飯",
      "加辣醬",
      "加辣炒",
      "加沙爹汁",
      "附加",
      "炒飯走"
    ]
  },
  {
    "_id": ObjectId("5efb7205e6c291823ae7a20f"),
    "itemCode": "FR05",
    "displayName": "老板娘炒飯",
    "price": 45.0,
    "category": "炒飯",
    "imgSrcUrl": "http://menu.indonesiansatehouse.com/img/老.jpg",
    "options": [
      "飯",
      "加辣醬",
      "加辣炒",
      "加沙爹汁",
      "附加",
      "炒飯走"
    ]
  },
  {
    "_id": ObjectId("5efb7206e6c291823ae7a212"),
    "itemCode": "SR08",
    "displayName": "印尼羊肉飯",
    "price": NumberInt(50),
    "category": "飯",
    "imgSrcUrl": "http://menu.indonesiansatehouse.com/img/羊飯.jpg",
    "options": [
      "辣度",
      "飯",
      "菜",
      "附加",
      "加辣醬"
    ]
  },
  {
    "_id": ObjectId("5efb7206e6c291823ae7a215"),
    "itemCode": "SR09",
    "displayName": "印尼黃薑飯",
    "price": NumberInt(52),
    "category": "飯",
    "imgSrcUrl": "http://menu.indonesiansatehouse.com/img/黃飯.jpg",
    "options": [
      "辣度",
      "飯",
      "菜",
      "加辣醬",
      "飯走"
    ]
  },
  {
    "_id": ObjectId("5efb7206e6c291823ae7a218"),
    "itemCode": "SR10",
    "displayName": "印尼雜錦飯",
    "price": NumberInt(52),
    "category": "飯",
    "imgSrcUrl": "http://menu.indonesiansatehouse.com/img/雜飯.jpg",
    "options": [
      "辣度",
      "飯",
      "菜",
      "加辣醬",
      "飯走"
    ]
  },
  {
    "_id": ObjectId("5efb7206e6c291823ae7a21b"),
    "itemCode": "SR11",
    "displayName": "白鱔飯",
    "price": NumberInt(75),
    "category": "飯",
    "imgSrcUrl": "http://menu.indonesiansatehouse.com/img/白鱔飯.jpg",
    "options": [
      "辣度",
      "飯",
      "菜",
      "附加",
      "走籤",
      "加辣醬"
    ]
  },
  {
    "_id": ObjectId("5efb7206e6c291823ae7a21e"),
    "itemCode": "SR12",
    "displayName": "魷魚飯",
    "price": NumberInt(48),
    "category": "飯",
    "imgSrcUrl": "http://menu.indonesiansatehouse.com/img/魷魚飯.jpg",
    "options": [
      "辣度",
      "飯",
      "菜",
      "附加",
      "走籤",
      "加辣醬"
    ]
  },
  {
    "_id": ObjectId("5efb7206e6c291823ae7a221"),
    "itemCode": "SR13",
    "displayName": "雞髀飯",
    "price": NumberInt(48),
    "category": "飯",
    "imgSrcUrl": "http://menu.indonesiansatehouse.com/img/雞髀飯.jpg",
    "options": [
      "辣度",
      "飯",
      "菜",
      "附加",
      "切",
      "加辣醬"
    ]
  },
  {
    "_id": ObjectId("5efb7206e6c291823ae7a224"),
    "itemCode": "RN01",
    "displayName": "印尼炒粉絲",
    "price": 45.0,
    "category": "炒麵",
    "imgSrcUrl": "http://menu.indonesiansatehouse.com/img/C.jpg",
    "options": [
      "飯",
      "加辣醬",
      "加辣炒",
      "加沙爹汁",
      "附加",
      "炒飯走"
    ]
  },
  {
    "_id": ObjectId("5efb7206e6c291823ae7a227"),
    "itemCode": "RN02",
    "displayName": "印尼炒米粉",
    "price": 45.0,
    "category": "炒麵",
    "imgSrcUrl": "http://menu.indonesiansatehouse.com/img/米.jpg",
    "options": [
      "飯",
      "加辣醬",
      "加辣炒",
      "加沙爹汁",
      "附加",
      "炒飯走"
    ]
  },
  {
    "_id": ObjectId("5efb7206e6c291823ae7a22a"),
    "itemCode": "RN03",
    "displayName": "印尼炒河",
    "price": 45.0,
    "category": "炒麵",
    "imgSrcUrl": "http://menu.indonesiansatehouse.com/img/河.jpg",
    "options": [
      "飯",
      "加辣醬",
      "加辣炒",
      "加沙爹汁",
      "附加",
      "炒飯走"
    ]
  },
  {
    "_id": ObjectId("5efb7206e6c291823ae7a22d"),
    "itemCode": "RN04",
    "displayName": "印尼炒麵",
    "price": 45.0,
    "category": "炒麵",
    "imgSrcUrl": "http://menu.indonesiansatehouse.com/img/面.jpg",
    "options": [
      "飯",
      "加辣醬",
      "加辣炒",
      "加沙爹汁",
      "附加",
      "炒飯走"
    ]
  },
  {
    "_id": ObjectId("5efb7206e6c291823ae7a230"),
    "itemCode": "RN05",
    "displayName": "印尼炒烏冬",
    "price": 45.0,
    "category": "炒麵",
    "imgSrcUrl": "http://menu.indonesiansatehouse.com/img/烏.jpg",
    "options": [
      "飯",
      "加辣醬",
      "加辣炒",
      "加沙爹汁",
      "附加",
      "炒飯走"
    ]
  },
  {
    "_id": ObjectId("5efb7207e6c291823ae7a233"),
    "itemCode": "O001",
    "displayName": "炸薯仔餅",
    "price": NumberInt(40),
    "category": "其他",
    "imgSrcUrl": "http://menu.indonesiansatehouse.com/img/薯.jpg",
    "options": [
      "飯"
    ]
  },
  {
    "_id": ObjectId("5efb7207e6c291823ae7a236"),
    "itemCode": "O002",
    "displayName": "淨巴東牛肉",
    "price": NumberInt(75),
    "category": "其他",
    "imgSrcUrl": "http://menu.indonesiansatehouse.com/img/淨巴.jpg",
    "options": [
      "飯"
    ]
  },
  {
    "_id": ObjectId("5efb7207e6c291823ae7a239"),
    "itemCode": "O003",
    "displayName": "淨咖喱雞",
    "price": NumberInt(56),
    "category": "其他",
    "imgSrcUrl": "http://menu.indonesiansatehouse.com/img/淨咖.jpg",
    "options": [
      "飯"
    ]
  },
  {
    "_id": ObjectId("5efb7207e6c291823ae7a23c"),
    "itemCode": "D001",
    "displayName": "水晶柑桔蜜",
    "price": NumberInt(18),
    "category": "飲品",
    "imgSrcUrl": "http://menu.indonesiansatehouse.com/img/柑.jpg",
    "options": [
      "飲品"
    ]
  },
  {
    "_id": ObjectId("5efb7207e6c291823ae7a23f"),
    "itemCode": "D002",
    "displayName": "印尼珍多冰",
    "price": NumberInt(18),
    "category": "飲品",
    "imgSrcUrl": "http://menu.indonesiansatehouse.com/img/珍多.jpg",
    "options": [
      "飲品"
    ]
  },
  {
    "_id": ObjectId("5efb7207e6c291823ae7a242"),
    "itemCode": "D003",
    "displayName": "印尼百香果汁",
    "price": NumberInt(18),
    "category": "飲品",
    "imgSrcUrl": "http://menu.indonesiansatehouse.com/img/果汁.jpg",
    "options": [
      "飲品"
    ]
  },
  {
    "_id": ObjectId("5efb7207e6c291823ae7a245"),
    "itemCode": "D004",
    "displayName": "可樂",
    "price": NumberInt(7),
    "category": "飲品",
    "imgSrcUrl": "http://menu.indonesiansatehouse.com/img/可樂.jpg",
    "options": [
      "飲品"
    ]
  },
  {
    "_id": ObjectId("5efb7207e6c291823ae7a248"),
    "itemCode": "O004",
    "displayName": "沙爹汁",
    "price": NumberInt(55),
    "category": "其他",
    "imgSrcUrl": "http://menu.indonesiansatehouse.com/img/沙爹汁.jpg",
    "options": [
      "辣度"
    ]
  },
  {
    "_id": ObjectId("5efb7207e6c291823ae7a24b"),
    "itemCode": "O005",
    "displayName": "靈芝猴頭菇湯",
    "price": NumberInt(25),
    "category": "其他",
    "imgSrcUrl": "http://menu.indonesiansatehouse.com/img/湯.jpg",
    "options": [
      "飯"
    ]
  },
  {
    "_id": ObjectId("5efb7207e6c291823ae7a24e"),
    "itemCode": "O006",
    "displayName": "蝦片",
    "price": NumberInt(13),
    "category": "其他",
    "imgSrcUrl": "http://menu.indonesiansatehouse.com/img/蝦片.jpg",
    "options": [
      "飯"
    ]
  },
  {
    "_id": ObjectId("5efb7207e6c291823ae7a251"),
    "itemCode": "O007",
    "displayName": "花生",
    "price": NumberInt(18),
    "category": "其他",
    "imgSrcUrl": "http://menu.indonesiansatehouse.com/img/花生.jpg",
    "options": [
      "飯"
    ]
  },
  {
    "_id": ObjectId("5efb7208e6c291823ae7a254"),
    "itemCode": "O006",
    "displayName": "另加沙爹汁",
    "price": NumberInt(5),
    "category": "其他",
    "imgSrcUrl": "http://menu.indonesiansatehouse.com/img/另加汁.jpg",
    "options": [
      "辣度"
    ]
  },
  {
    "_id": ObjectId("5efc0c44bb4dc00fa89eca91"),
    "itemCode": "D005",
    "displayName": "雀檸",
    "price": NumberInt(7),
    "category": "飲品",
    "imgSrcUrl": "http://menu.indonesiansatehouse.com/img/雀檸.jpg",
    "options": [
      "飲品"
    ]
  },
  {
    "_id": ObjectId("5efc0c5dbb4dc00fa89ecab3"),
    "itemCode": "D006",
    "displayName": "雪碧",
    "price": NumberInt(7),
    "category": "飲品",
    "imgSrcUrl": "http://menu.indonesiansatehouse.com/img/雪碧.jpg",
    "options": [
      "飲品"
    ]
  },
  {
    "_id": ObjectId("5efc0cb1bb4dc00fa89ecae1"),
    "itemCode": "D007",
    "displayName": "芬達",
    "price": NumberInt(7),
    "category": "飲品",
    "imgSrcUrl": "http://menu.indonesiansatehouse.com/img/芬達.jpg",
    "options": [
      "飲品"
    ]
  },
  {
    "_id": ObjectId("5efc0cb1bb4dc00fa89ecae4"),
    "itemCode": "D008",
    "displayName": "絲加",
    "price": NumberInt(7),
    "category": "飲品",
    "imgSrcUrl": "http://menu.indonesiansatehouse.com/img/絲加.jpg",
    "options": [
      "飲品"
    ]
  },
  {
    "_id": ObjectId("5efc0ccebb4dc00fa89ecaf7"),
    "itemCode": "D009",
    "displayName": "黑可樂",
    "price": NumberInt(7),
    "category": "飲品",
    "imgSrcUrl": "http://menu.indonesiansatehouse.com/img/黑可樂.jpg",
    "options": [
      "飲品"
    ]
  },
  {
    "_id": ObjectId("5efc1e8dbb4dc00fa89ed7b9"),
    "itemCode": "D010",
    "displayName": "cream",
    "price": NumberInt(7),
    "category": "飲品",
    "imgSrcUrl": "http://menu.indonesiansatehouse.com/img/cream.jpg",
    "options": [
      "飲品"
    ]
  },
  {
    "_id": ObjectId("5efd8e337a27366989ad0a12"),
    "itemCode": "H001",
    "displayName": "1蚊",
    "price": NumberInt(1),
    "category": "1蚊",
    "imgSrcUrl": "http://menu.indonesiansatehouse.com/img/1蚊.jpg",
    "options": [

    ]
  },
  {
    "_id": ObjectId("5f111a6c270ab57c6f024d07"),
    "itemCode": "O007",
    "displayName": "白飯",
    "price": NumberInt(15),
    "category": "其他",
    "imgSrcUrl": "http://menu.indonesiansatehouse.com/img/白飯.jpg",
    "options": [

    ]
  },
  {
    "_id": ObjectId("5f6ef1acc166f8c66267aef2"),
    "itemCode": "S022",
    "displayName": "鮑魚",
    "price": NumberInt(35),
    "category": "串燒",
    "imgSrcUrl": "http://menu.indonesiansatehouse.com/img/abalone.jpg",
    "options": [
      "沙爹汁",
      "辣度",
      "走籤"
    ]
  },
  {
    "_id": ObjectId("5f6ef1acc166f8c66267aef5"),
    "itemCode": "S023",
    "displayName": "鰻魚",
    "price": NumberInt(30),
    "category": "串燒",
    "imgSrcUrl": "http://menu.indonesiansatehouse.com/img/eel.jpg",
    "options": [
      "沙爹汁",
      "辣度",
      "走籤"
    ]
  },
  {
    "_id": ObjectId("5f6ef1acc166f8c66267aef8"),
    "itemCode": "S024",
    "displayName": "貝柱",
    "price": NumberInt(20),
    "category": "串燒",
    "imgSrcUrl": "http://menu.indonesiansatehouse.com/img/scallop.jpg",
    "options": [
      "沙爹汁",
      "辣度",
      "走籤"
    ]
  },
  {
    "_id": ObjectId("5fdde500c166f8c66284f920"),
    "itemCode": "D010",
    "displayName": "石榴汁",
    "price": NumberInt(8),
    "category": "飲品",
    "imgSrcUrl": "http://menu.indonesiansatehouse.com/img/青檸水.jpg",
    "options": [
      "飲品"
    ]
  },
  {
    "_id": ObjectId("5fdde500c166f8c66284f923"),
    "itemCode": "D010",
    "displayName": "好飲桔仔水",
    "price": NumberInt(8),
    "category": "飲品",
    "imgSrcUrl": "http://menu.indonesiansatehouse.com/img/桔仔水.jpg",
    "options": [
      "飲品"
    ]
  },
  {
    "_id": ObjectId("6040915de03cae41777a86c5"),
    "itemCode": "O007",
    "displayName": "秘製辣椒醬",
    "price": NumberInt(38),
    "category": "其他",
    "imgSrcUrl": "http://menu.indonesiansatehouse.com/img/辣椒醬.jpg",
    "options": [
      "辣度"
    ]
  },
  {
    "_id": ObjectId("610d10d2f45b16d29ac062e3"),
    "itemCode": "D011",
    "displayName": "椰青水",
    "price": NumberInt(17),
    "category": "飲品",
    "imgSrcUrl": "http://menu.indonesiansatehouse.com/img/椰青水",
    "options": [
      "飲品"
    ]
  },
  {
    "_id": ObjectId("610d10d2f45b16d29ac062e6"),
    "itemCode": "D010",
    "displayName": "跟餐椰青水",
    "price": NumberInt(14),
    "category": "飲品",
    "imgSrcUrl": "http://menu.indonesiansatehouse.com/img/椰青水",
    "options": [
      "飲品"
    ]
  },
  {
    "_id": ObjectId("615ed04e86ac652d7908300e"),
    "itemCode": "O010",
    "displayName": "醉雞卷",
    "price": NumberInt(42),
    "category": "其他",
    "imgSrcUrl": "http://menu.indonesiansatehouse.com/img/醉雞卷.jpg"
  },
  {
    "_id": ObjectId("620b0397f25df8d08add0b90"),
    "itemCode": "O011",
    "displayName": "麻辣牛筋",
    "price": NumberInt(42),
    "category": "其他",
    "imgSrcUrl": "http://menu.indonesiansatehouse.com/img/麻辣牛筋.jpg"
  },
  {
    "_id": ObjectId("620daf11f25df8d08ade2a50"),
    "itemCode": "O012",
    "displayName": "午市 巴東牛肉飯",
    "price": NumberInt(49),
    "category": "其他",
    "imgSrcUrl": "http://menu.indonesiansatehouse.com/img/午市巴東牛肉飯.jpg",
    "options": [
      "汽水"
    ]
  },
  {
    "_id": ObjectId("620daf11f25df8d08ade2a53"),
    "itemCode": "O013",
    "displayName": "午 沙爹飯",
    "price": NumberInt(46),
    "category": "其他",
    "imgSrcUrl": "http://menu.indonesiansatehouse.com/img/午沙爹飯.jpg",
    "options": [
      "汽水"
    ]
  },
  {
    "_id": ObjectId("620daf12f25df8d08ade2a56"),
    "itemCode": "O014",
    "displayName": "午 雞扒飯",
    "price": NumberInt(46),
    "category": "其他",
    "imgSrcUrl": "http://menu.indonesiansatehouse.com/img/午雞扒飯.jpg",
    "options": [
      "汽水"
    ]
  },
  {
    "_id": ObjectId("620daf12f25df8d08ade2a59"),
    "itemCode": "O014",
    "displayName": "午 咖雞飯",
    "price": NumberInt(46),
    "category": "其他",
    "imgSrcUrl": "http://menu.indonesiansatehouse.com/img/午咖雞飯.jpg",
    "options": [
      "汽水"
    ]
  },
  {
    "_id": ObjectId("620daf12f25df8d08ade2a5c"),
    "itemCode": "O015",
    "displayName": "午 麻牛肉飯",
    "price": NumberInt(46),
    "category": "其他",
    "imgSrcUrl": "http://menu.indonesiansatehouse.com/img/午麻牛肉飯.jpg",
    "options": [
      "汽水"
    ]
  },
  {
    "_id": ObjectId("620efddff25df8d08adedc60"),
    "itemCode": "O016",
    "displayName": "午 鰻飯",
    "price": NumberInt(52),
    "category": "其他",
    "imgSrcUrl": "http://menu.indonesiansatehouse.com/img/午鰻魚飯.jpg",
    "options": [
      "汽水"
    ]
  },
  {
    "_id": ObjectId("620efddff25df8d08adedc63"),
    "itemCode": "O017",
    "displayName": "午 豬頸飯",
    "price": NumberInt(48),
    "category": "其他",
    "imgSrcUrl": "http://menu.indonesiansatehouse.com/img/午豬頸飯.jpg",
    "options": [
      "汽水"
    ]
  },
  {
    "_id": ObjectId("6227f11bf25df8d08ae7d1b3"),
    "itemCode": "O018",
    "displayName": "午 牛扒飯",
    "price": NumberInt(46),
    "category": "其他",
    "imgSrcUrl": "http://menu.indonesiansatehouse.com/img/午牛扒飯.jpg",
    "options": [
      "汽水"
    ]
  },
  {
    "_id": ObjectId("6227f11bf25df8d08ae7d1b6"),
    "itemCode": "O019",
    "displayName": "午 豬扒飯",
    "price": NumberInt(46),
    "category": "其他",
    "imgSrcUrl": "http://menu.indonesiansatehouse.com/img/午豬扒飯.jpg",
    "options": [
      "汽水"
    ]
  },
  {
    "_id": ObjectId("624fdbbef25df8d08af434ca"),
    "itemCode": "SR14",
    "displayName": "麻辣牛筋飯",
    "price": 48.0,
    "category": "飯",
    "imgSrcUrl": "http://menu.indonesiansatehouse.com/img/牛筋飯.jpg",
    "options": [
      "辣度",
      "飯",
      "汁",
      "菜",
      "附加",
      "加辣醬"
    ]
  },
  {
    "_id": ObjectId("634a53ebcf2386a8bc0de041"),
    "itemCode": "O020",
    "displayName": "泰式鳳爪",
    "price": 45.0,
    "category": "其他",
    "imgSrcUrl": "http://menu.indonesiansatehouse.com/img/鳳爪.jpg"
  },
  {
    "_id": ObjectId("634a53fccf2386a8bc0de049"),
    "itemCode": "O021",
    "displayName": "醉雞翼",
    "price": 40.0,
    "category": "其他",
    "imgSrcUrl": "http://menu.indonesiansatehouse.com/img/醉雞翼.jpg"
  },
  {
    "_id": ObjectId("634f88d8cf2386a8bc0f0549"),
    "itemCode": "O021",
    "displayName": "午魷魚飯",
    "price": NumberInt(48),
    "category": "其他",
    "imgSrcUrl": "http://menu.indonesiansatehouse.com/img/午魷魚飯.jpg",
    "options": [
      "汽水"
    ]
  },
  {
    "_id": ObjectId("634f8b32cf2386a8bc0f05fa"),
    "itemCode": "H002",
    "displayName": "-5蚊",
    "price": NumberInt(-5),
    "category": "1蚊",
    "imgSrcUrl": "http://menu.indonesiansatehouse.com/img/減5蚊.jpg",
    "options": [

    ]
  },
  {
    "_id": ObjectId("634f8be8cf2386a8bc0f063f"),
    "itemCode": "L012",
    "displayName": "午市 巴東牛肉飯",
    "price": NumberInt(49),
    "category": "午餐",
    "imgSrcUrl": "http://menu.indonesiansatehouse.com/img/午市巴東牛肉飯.jpg",
    "options": [
      "汽水"
    ]
  },
  {
    "_id": ObjectId("634f8c20cf2386a8bc0f0658"),
    "itemCode": "L002",
    "displayName": "午 沙爹飯",
    "price": NumberInt(46),
    "category": "午餐",
    "imgSrcUrl": "http://menu.indonesiansatehouse.com/img/午沙爹飯.jpg",
    "options": [
      "汽水"
    ]
  },
  {
    "_id": ObjectId("634f8ce9cf2386a8bc0f0697"),
    "itemCode": "L003",
    "displayName": "午 雞扒飯",
    "price": NumberInt(46),
    "category": "午餐",
    "imgSrcUrl": "http://menu.indonesiansatehouse.com/img/午雞扒飯.jpg",
    "options": [
      "汽水"
    ]
  },
  {
    "_id": ObjectId("634f8ce9cf2386a8bc0f069a"),
    "itemCode": "L004",
    "displayName": "午 咖雞飯",
    "price": NumberInt(46),
    "category": "午餐",
    "imgSrcUrl": "http://menu.indonesiansatehouse.com/img/午咖雞飯.jpg",
    "options": [
      "汽水"
    ]
  },
  {
    "_id": ObjectId("634f8e3acf2386a8bc0f070e"),
    "itemCode": "O005",
    "displayName": "午 麻牛肉飯",
    "price": NumberInt(46),
    "category": "午餐",
    "imgSrcUrl": "http://menu.indonesiansatehouse.com/img/午麻牛肉飯.jpg",
    "options": [
      "汽水"
    ]
  },
  {
    "_id": ObjectId("634f8e3ccf2386a8bc0f0711"),
    "itemCode": "O006",
    "displayName": "午 鰻飯",
    "price": NumberInt(52),
    "category": "午餐",
    "imgSrcUrl": "http://menu.indonesiansatehouse.com/img/午鰻魚飯.jpg",
    "options": [
      "汽水",
      "辣度",
      "飯",
      "菜",
      "走籤",
      "加辣醬",
      "附加"
    ]
  },
  {
    "_id": ObjectId("634f8e3dcf2386a8bc0f0714"),
    "itemCode": "O007",
    "displayName": "午 豬頸飯",
    "price": NumberInt(48),
    "category": "午餐",
    "imgSrcUrl": "http://menu.indonesiansatehouse.com/img/午豬頸飯.jpg",
    "options": [
      "汽水",
      "辣度",
      "飯",
      "菜",
      "走籤",
      "加辣醬",
      "附加"
    ]
  },
  {
    "_id": ObjectId("634f8e40cf2386a8bc0f0718"),
    "itemCode": "O008",
    "displayName": "午 牛扒飯",
    "price": NumberInt(46),
    "category": "午餐",
    "imgSrcUrl": "http://menu.indonesiansatehouse.com/img/午牛扒飯.jpg",
    "options": [
      "汽水",
      "辣度",
      "飯",
      "菜",
      "走籤",
      "加辣醬",
      "附加"
    ]
  },
  {
    "_id": ObjectId("634f8e44cf2386a8bc0f0720"),
    "itemCode": "O009",
    "displayName": "午 豬扒飯",
    "price": NumberInt(46),
    "category": "午餐",
    "imgSrcUrl": "http://menu.indonesiansatehouse.com/img/午豬扒飯.jpg",
    "options": [
      "汽水",
      "辣度",
      "飯",
      "菜",
      "走籤",
      "加辣醬",
      "附加"
    ]
  },
  {
    "_id": ObjectId("648fcf7d5deaa44facdce947"),
    "itemCode": "SR14",
    "displayName": "雞翼飯",
    "price": NumberInt(48),
    "category": "飯",
    "imgSrcUrl": "http://menu.indonesiansatehouse.com/img/雞翼飯.jpg",
    "options": [
      "辣度",
      "飯",
      "菜",
      "附加",
      "切",
      "加辣醬"
    ]
  }

])
const products = [
  {
    id: "1",
    sku: "asdf123",
    name: "Lorem ipsum jacket",
    price: 12.45,
    discount: 10,
    new: false,
    category: ["fashion", "men"],
    tag: ["fashion", "men", "jacket", "full sleeve"],
    variation: [
      {
        color: "white",
        image: "/assets/img/product/fashion/1.jpg",
        size: [
          {
            name: "x",
            stock: 3,
          },
          {
            name: "m",
            stock: 2,
          },
          {
            name: "xl",
            stock: 5,
          },
        ],
      },
      {
        color: "black",
        image: "/assets/img/product/fashion/8.jpg",
        size: [
          {
            name: "x",
            stock: 4,
          },
          {
            name: "m",
            stock: 7,
          },
          {
            name: "xl",
            stock: 9,
          },
          {
            name: "xxl",
            stock: 1,
          },
        ],
      },
      {
        color: "brown",
        image: "/assets/img/product/fashion/3.jpg",
        size: [
          {
            name: "x",
            stock: 1,
          },
          {
            name: "m",
            stock: 2,
          },
          {
            name: "xl",
            stock: 4,
          },
          {
            name: "xxl",
            stock: 0,
          },
        ],
      },
    ],
    image: [
      "/assets/img/product/fashion/1.jpg",
      "/assets/img/product/fashion/3.jpg",
      "/assets/img/product/fashion/6.jpg",
      "/assets/img/product/fashion/8.jpg",
      "/assets/img/product/fashion/9.jpg",
    ],
    shortDescription:
      "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
    fullDescription:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?",
  },
];

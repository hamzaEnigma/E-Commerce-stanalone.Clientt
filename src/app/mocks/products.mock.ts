import { Product } from "../interfaces/product/product.model";

export const MOCK_PRODUCTS: Product[] = [
  {
    productId: 1,
    productName: "vin rouge",
    unitsInStock: 10,
    purchasePrice: 199.99,
    description: "Chaîne robuste pour usage industriel, adaptée aux machines lourdes et aux charges élevées.",
    category: {
      categoryId: 1,
      categoryName: "Boissons",
      description: "Boissons gazeuses, cafés, thés, bières et ales",
      picture: undefined
    }
  },
  {
    productId: 2,
    productName: "Chang",
    unitsInStock: 17,
    purchasePrice: 89.50,
    description: "Bière légère et rafraîchissante à base de malt doré, originaire d’Asie du Sud-Est.",
    category: {
      categoryId: 1,
      categoryName: "Boissons",
      description: "Boissons gazeuses, cafés, thés, bières et ales",
      picture: undefined
    }
  },
  {
    productId: 3,
    productName: "Sirop d'anis",
    unitsInStock: 13,
    purchasePrice: 72.30,
    description: "Sirop parfumé à l’anis, parfait pour agrémenter boissons chaudes ou desserts.",
    category: {
      categoryId: 2,
      categoryName: "Condiments",
      description: "Sauces sucrées et salées, condiments et assaisonnements",
      picture: undefined
    }
  },
  {
    productId: 4,
    productName: "Assaisonnement Cajun Chef Anton",
    unitsInStock: 53,
    purchasePrice: 128.80,
    description: "Mélange d’épices cajun relevé, idéal pour relever les plats de viande ou de poisson.",
    category: {
      categoryId: 2,
      categoryName: "Condiments",
      description: "Sauces sucrées et salées, condiments et assaisonnements",
      picture: undefined
    }
  },
  {
    productId: 5,
    productName: "Mélange Gumbo Chef Anton",
    unitsInStock: 0,
    purchasePrice: 99.00,
    description: "Base d'épices pour préparer un délicieux gumbo aux saveurs du Sud des États-Unis.",
    category: {
      categoryId: 2,
      categoryName: "Condiments",
      description: "Sauces sucrées et salées, condiments et assaisonnements",
      picture: undefined
    }
  },
  {
    productId: 6,
    productName: "Confiture de mûres de Grand-mère",
    unitsInStock: 120,
    purchasePrice: 45.50,
    description: "Confiture artisanale de mûres, parfaite pour les petits déjeuners gourmands.",
    category: {
      categoryId: 2,
      categoryName: "Condiments",
      description: "Sauces sucrées et salées, condiments et assaisonnements",
      picture: undefined
    }
  },
  {
    productId: 7,
    productName: "Poires séchées bio Uncle Bob",
    unitsInStock: 15,
    purchasePrice: 64.90,
    description: "Poires séchées lentement, sans sucre ajouté, riches en fibres et en goût.",
    category: {
      categoryId: 7,
      categoryName: "Fruits et Légumes",
      description: "Fruits secs et tofu",
      picture: undefined
    }
  },
  {
    productId: 8,
    productName: "Sauce aux canneberges Northwoods",
    unitsInStock: 6,
    purchasePrice: 53.20,
    description: "Sauce sucrée-acidulée aux canneberges, idéale avec les plats de volaille.",
    category: {
      categoryId: 2,
      categoryName: "Condiments",
      description: "Sauces sucrées et salées, condiments et assaisonnements",
      picture: undefined
    }
  },
  {
    productId: 9,
    productName: "Mishi Kobe Niku",
    unitsInStock: 29,
    purchasePrice: 199.99,
    description: "Viande de Kobe tranchée finement, prête à être cuisinée pour des repas gastronomiques.",
    category: {
      categoryId: 6,
      categoryName: "Viande/Volaille",
      description: "Viandes préparées",
      picture: undefined
    }
  },
  {
    productId: 10,
    productName: "Ikura",
    unitsInStock: 31,
    purchasePrice: 150.00,
    description: "Œufs de saumon frais, parfaits pour les sushis et plats japonais.",
    category: {
      categoryId: 8,
      categoryName: "Fruits de mer",
      description: "Algues et poissons",
      picture: undefined
    }
  },
  {
    productId: 11,
    productName: "Queso Cabrales",
    unitsInStock: 22,
    purchasePrice: 135.40,
    description: "Fromage bleu espagnol à pâte persillée, au goût puissant et authentique.",
    category: {
      categoryId: 4,
      categoryName: "Produits laitiers",
      description: "Fromages",
      picture: undefined
    }
  },
  {
    productId: 12,
    productName: "Queso Manchego La Pastora",
    unitsInStock: 86,
    purchasePrice: 108.90,
    description: "Fromage Manchego affiné, fabriqué à base de lait de brebis 100 % espagnol.",
    category: {
      categoryId: 4,
      categoryName: "Produits laitiers",
      description: "Fromages",
      picture: undefined
    }
  },
  {
    productId: 13,
    productName: "Konbu",
    unitsInStock: 24,
    purchasePrice: 85.00,
    description: "Algue séchée utilisée dans les bouillons japonais (dashi) et plats asiatiques.",
    category: {
      categoryId: 8,
      categoryName: "Fruits de mer",
      description: "Algues et poissons",
      picture: undefined
    }
  },
  {
    productId: 14,
    productName: "Tofu",
    unitsInStock: 35,
    purchasePrice: 47.70,
    description: "Tofu nature riche en protéines, parfait pour plats végétariens ou végétaliens.",
    category: {
      categoryId: 7,
      categoryName: "Fruits et Légumes",
      description: "Fruits secs et tofu",
      picture: undefined
    }
  },
  {
    productId: 15,
    productName: "Pain de campagne",
    unitsInStock: 40,
    purchasePrice: 74.99,
    description: "Un pain croustillant à la croûte dorée, idéal pour accompagner les plats chauds ou pour les sandwichs rustiques.",
    category: {
      categoryId: 5,
      categoryName: "Céréales",
      description: "Pains, biscuits, pâtes et céréales",
      picture: undefined
    }
  },
  {
    productId: 16,
    productName: "Huile d'olive vierge",
    unitsInStock: 75,
    purchasePrice: 89.00,
    description: "Huile d’olive de première pression à froid, parfaite pour assaisonner salades, pâtes et plats méditerranéens.",
    category: {
      categoryId: 9,
      categoryName: "Huiles",
      description: "Huiles d'olive",
      picture: undefined
    }
  },
  {
    productId: 17,
    productName: "Sardines grillées",
    unitsInStock: 60,
    purchasePrice: 49.45,
    description: "Sardines fraîches grillées et conservées à l’huile, à déguster en entrée ou avec du pain grillé.",
    category: {
      categoryId: 8,
      categoryName: "Fruits de mer",
      description: "Algues et poissons",
      picture: undefined
    }
  },
  {
    productId: 18,
    productName: "Yaourt nature bio",
    unitsInStock: 130,
    purchasePrice: 19.99,
    description: "Un yaourt onctueux fabriqué avec du lait bio, sans sucre ajouté, riche en probiotiques naturels.",
    category: {
      categoryId: 4,
      categoryName: "Produits laitiers",
      description: "Fromages",
      picture: undefined
    }
  },
  {
    productId: 19,
    productName: "Tablette de chocolat noir",
    unitsInStock: 95,
    purchasePrice: 22.50,
    description: "Chocolat noir intense à 70 %, idéal pour les amateurs de cacao pur et les desserts gourmands.",
    category: {
      categoryId: 3,
      categoryName: "Confiseries",
      description: "Desserts, bonbons et pains sucrés",
      picture: undefined
    }
  }
];

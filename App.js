import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Login from './src/Layout/Login';
import InventoryList from './src/Views/Inventory/InventoryList';
import CreateInventory from './src/Views/Inventory/CreateInventory';
import CreateRecipe from './src/Views/Recipe/CreateRecipe';
import UpdateRecipe from './src/Views/Recipe/UpdateRecipe';
import RecipeList from './src/Views/Recipe/RecipeList';
import AssociateIngredientToRecipe from './src/Views/Recipe/AssociateIngredientToRecipe';
import AssociatedIngredientList from './src/Views/Recipe/AssociatedIngredientList';
import UpdateInventory from './src/Views/Inventory/UpdateInventory';
import MaterialPurchase from './src/Views/cart/MaterialPurchase';
import Cart from './src/Views/cart/Cart';
import Scanner from './src/Views/BarCodeScanner/Scanner';
import UserProfile from './src/Views/User/UserProfile';

const navigator = createStackNavigator(
  {
    Login: Login,
    Scanner: {
      screen: Scanner,
      navigationOptions: {
        title: 'Scanner',
      },
    },
    UserProfile: {
      screen: UserProfile,
      navigationOptions: {
        title: 'Profile',
      },
    },
    AssociateIngredientToRecipe: {
      screen: AssociateIngredientToRecipe,
      navigationOptions: {
        title: 'Associate Ingredient',
        headerLeft: null
      },
    },
    AssociatedIngredientList: {
      screen: AssociatedIngredientList,
      navigationOptions: {
        title: 'Ingredients List',
        headerLeft: null
      },
    },
    MaterialPurchase: {
      screen: MaterialPurchase,
      navigationOptions: {
        title: 'Material Purchase',
      },
    },
    Cart: {
      screen: Cart,
      navigationOptions: {
        title: 'Cart',
        headerLeft: null
      },
    },
    CreateInventory: {
      screen: CreateInventory,
      navigationOptions: {
        title: 'Create Inventory',
      },
    },
    CreateRecipe: {
      screen: CreateRecipe,
      navigationOptions: {
        title: 'Create Recipe',
      },
    },
    UpdateRecipe: {
      screen: UpdateRecipe,
      navigationOptions: {
        title: 'Update Recipe',
      },
    },
    UpdateInventory: {
      screen: UpdateInventory,
      navigationOptions: {
        title: 'Inventory Details',
      },
    },
    InventoryList: {
      screen: InventoryList,
      navigationOptions: {
        title: 'Inventory List',
        headerLeft: null
      },
    },
    RecipeList: {
      screen: RecipeList,
      navigationOptions: {
        title: 'Recipe List',
      },
    }
  },
  {
    initialRouteName: 'Login',
    // defaultNavigationOptions: {
    //   title: 'Login',
    // },
  }
);

export default createAppContainer(navigator);


import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Login from './src/Layout/Login';
import InventoryList from './src/Views/Inventory/InventoryList';
import CreateInventory from './src/Views/Inventory/CreateInventory';
import CreateRecipe from './src/Views/Recipe/CreateRecipe';
import UpdateInventory from './src/Views/Inventory/UpdateInventory';
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


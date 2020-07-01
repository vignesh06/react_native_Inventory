import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Login from './src/Layout/Login';
import InventoryList from './src/Views/Inventory/InventoryList';
import CreateInventory from './src/Views/Inventory/CreateInventory';
import UpdateInventory from './src/Views/Inventory/UpdateInventory';

const navigator = createStackNavigator(
  {
    Login: Login,
    CreateInventory: {
      screen: CreateInventory,
      navigationOptions: {
        title: 'Create Inventory',
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
    defaultNavigationOptions: {
      title: 'Login',
    },
  }
);

export default createAppContainer(navigator);


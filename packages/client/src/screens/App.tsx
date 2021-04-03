import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ResourcesScreen from './resource/List';
import AddResourceScreen from './resource/Add';
import ResourceScreen from './resource/Details';
import TypesScreen from './type/List';
import AddTypeScreen from './type/Add';
import TypeDetailsScreen from './type/Details';
import SettingsOverviewScreen from './settings/Overview';
import Login from 'containers/Login';
import Api from 'containers/Api';

const options = {
  headerShown: false,
};

const RootStack = createStackNavigator();

const ResourceStack = createStackNavigator();
const ResourceNavigator = () => (
  <ResourceStack.Navigator> 
    <ResourceStack.Screen options={options} name="Details" component={ResourceScreen} />
  </ResourceStack.Navigator>
);

const Tab = createBottomTabNavigator();
const TabNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen name="Resources" component={ResourcesScreen} />
    <Tab.Screen name="Types" component={TypesScreen} />
    <Tab.Screen name="Settings" component={SettingsOverviewScreen} />
  </Tab.Navigator>
);

const App = () => (
  <Login>
    <Api>
      <NavigationContainer>
        <RootStack.Navigator mode="modal">
          <RootStack.Screen options={options} name="Main" component={TabNavigator} />
          <RootStack.Screen options={options} name="AddResource" component={AddResourceScreen} />
          <RootStack.Screen options={options} name="Resource" component={ResourceNavigator} />
          <RootStack.Screen options={options} name="AddType" component={AddTypeScreen} />
          <RootStack.Screen options={options} name="Type" component={TypeDetailsScreen} />
        </RootStack.Navigator>
      </NavigationContainer>
    </Api>
  </Login>
); 
export default App;

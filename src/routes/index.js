// @flow
// We only need to import the modules necessary for initial render
import Home from './Home'
import Personal from './Personal'
import Circle from './Circle'
import Detail from './Detail'
import Login from './Login'
import Register from './Register'
import EditUserInfo from './EditUserInfo'
import Good from './Good'
import myFav from './myFav'
import EditAddress from './EditAddress'
import GoodsCar from './GoodsCar'
import MyOrders from './MyOrders'

// Force import during development to enable Hot-Module Replacement
// not need ?

export default {
  editAddress: EditAddress,
  goodsCar: GoodsCar,
  myOrders: MyOrders,
  good: Good,
  myfav: myFav,
  editUserInfo: EditUserInfo,
  register: Register,
  login: Login,
  home: Home,
  circle: Circle,
  personal: Personal,
  detail: Detail
}

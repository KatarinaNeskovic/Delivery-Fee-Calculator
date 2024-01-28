
import './App.css';
import { DeliveryPriceCalculator } from './DeliveryPriceCalculator';

function App() {

  return <DeliveryPriceCalculator cartValue={0} amountOfItems={1} deliveryDistance={0} orderTime='2024-01-01T07:00' />

}

export default App;


/*
  const [cartValue, setCartValue] = useState(0);
  const [deliveryDistance, setDeliveryDistance] = useState(0);
  const [amountOfItems, setAmountOfItems] = useState(0);
  const [dateTime, setDateTime] = useState(new Date(2001, 0, 1)); //setting initial date to January 1st 2001
 
  const handleCartvalueChange = (e: any) => {
    setCartValue(e.target.value);
  }
 
  const handleDeliveryDistanceChange = (e: any) => {
    setDeliveryDistance(e.target.value);
  }
 
  const handleAmountOfItemsChange = (e: any) => {
    setAmountOfItems(e.target.value);
  }
 
  const handleDateTimeChange = (e: any) => {
    setDateTime(e.target.value);
  }
 */



/*   <header> { className="App-header" }
<img src={logo} className="App-logo" alt="logo" /> 
</header> */
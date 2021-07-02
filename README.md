# Blockchain dashboard

## Requirements

-  node.js
-  Yarn

## How to

Start for development:

-  Type `yarn start` to start the web and server.

-  Access `http://localhost:3000` on the browser.

### What app's haves: 

- Each time keeper put price to smart contract, smart contract emits event NewData(address keeper, int256 price, int256 _timestamp).
- Each time the keeper get paid, smart contract emits event Winner(address keeper, int256 reward, int256 _timestamp)
  Your task is to build "keeper dashboard" frontend on reactjs with the next functionality:
- the keeper should be able to select the range: last day, last week, last month (this is the period that affects data in the table, use _timestamp from events)
- then the user should be able to see stats about all keepers for this period in the table.
- For each keeper in the table the next metrics should be implemented (depends on time period selected):
    * keeper win rate = total winner events for keeper / total NewData events for keeper
    * keeper earn = sum of all amounts from Winner event for this keeper
    * estimated spent = amount of money the keeper spent on gas  (find idea how to calc this)
    * keeper;'s net profit = earn - cost

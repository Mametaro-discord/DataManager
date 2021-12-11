# Manager#valueArray
[Map#values](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Map/values)で得られるiterableオブジェクトを配列に変換しただけです。  
  
**Return**: *Array*\<*V*\>

#### 例を見てください
```js  
const manager = new Manager([  
		['key', 'value'],  
		['otherKey', 'otherValue']  
	]);  
console.log(manager.valueArray()); //outoput ['value', 'otherValue']  
```  
  
### [Overview](https://github.com/Mametaro-discord/DataManager/blob/docs/Manager/overview.md)
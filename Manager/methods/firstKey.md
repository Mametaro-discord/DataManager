# Manager#firstKey
一番初めの要素のキーを返します。(Manager#arrayで得られる配列のindex:0の要素です)  
  
**Return**: *K*

#### 例を見てください
```js  
const manager = new Manager([  
		['key', 'value'],  
		['otherKey', 'otherValue'],  
		['warosuKey', 'warosuValue'],  
		['powerfulKey', 'powerfulValue']  
	]);  
console.log(manager.firstKey()); //output 'key'
```    
  
### [Overview](https://github.com/Mametaro-discord/DataManager/blob/docs/Manager/overview.md)
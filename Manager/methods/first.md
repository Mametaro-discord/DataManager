# Manager#first
一番初めの要素の値を返します。([Manager#array](https://github.com/Mametaro-discord/DataManager/blob/docs/Manager/methods/array.md)で得られる配列のindex:0の要素です)  
  
**Return**: *V*

#### 例を見てください
```js  
const manager = new Manager([  
		['key', 'value'],  
		['otherKey', 'otherValue'],  
		['warosuKey', 'warosuValue'],  
		['powerfulKey', 'powerfulValue']  
	]);  
console.log(manager.first()); //output 'value'
```    
  
### [Overview](https://github.com/Mametaro-discord/DataManager/blob/docs/Manager/overview.md)
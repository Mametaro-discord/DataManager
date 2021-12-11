# Manager#clear
[Map#clear](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Map/clear)と全く同じですが返り値が違います、Managerを返します。
要素すべてを消し去ってみせます。  
  
**Return**: Manager\<*K*, *V*\>(=*this*)

#### 例を見てください
```js  
const manager = new Manager([  
		['key', 'value'],  
		['otherKey', 'otherValue']  
	]);   
console.log(manager.array()); //output [['key', 'value'], ['otherKey', 'otherValue']]  
manager.clear();  
console.log(manager.array()); //output []  
```  
  
### [Overview](https://github.com/Mametaro-discord/DataManager/blob/docs/Manager/overview.md)
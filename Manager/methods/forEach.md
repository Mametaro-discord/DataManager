# Manager#forEach
[Map#forEach](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)です。  
しかし、*undefined*ではなくManagerを返します。  
  
**param**|**type**|**description**|**default**  
---|---|---|---  
fn|[ManagerFn](https://github.com/Mametaro-discord/DataManager/blob/docs/Manager/ManagerFn.md)\<*undefined*\>|それぞれの要素に実行する関数|none  
thisArg?|*any*|fnの関数で*this*として使う値|none  
  
**Return**: Manager\<*K*, *V*\>(=*this*)

#### 例を見てください
```js  
const manager = new Manager([  
		['key', 'value'],  
		['otherKey', 'otherValue']  
	]);  
manager.forEach(val => console.log(val));  
/**  
 * output:  
 * 'value'  
 * 'otherValue'  
 */  
```    
  
### [Overview](https://github.com/Mametaro-discord/DataManager/blob/docs/Manager/overview.md)
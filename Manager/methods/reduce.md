# Manager#reduce
要素それぞれにフォーカスし一個あとの要素といろいろわちゃわちゃします。  
  
**param**|**type**|**description**|**default**  
---|---|---|---  
fn|[ManagerReduceFn](https://github.com/Mametaro-discord/DataManager/blob/docs/Manager/types/ManagerReduceFn.md)|要素達にする操作の関数|none  
init?|*any*|初期値|none  
  
**Return**: *any*

#### 例を見てください
```js  
const manager = new Manager([  
		['key', 'value'],  
		['otherKey', 'otherValue']  
	]);  
console.log(manager.reduce((acc, val) => acc + ' ' + val), 'VALUES'); //output 'VALUES value otherValue'  
```  
  
### [Overview](https://github.com/Mametaro-discord/DataManager/blob/docs/Manager/overview.md)
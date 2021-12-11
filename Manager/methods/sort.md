# Manager#sort
引数で渡された関数に従って要素をぐちゃぐちゃにします。  
詳しいsortの仕様、コールバック関数の構造なんかは[*Array*#sort](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)をご覧ください。  
  
**param**|**type**|**description**|**default**  
---|---|---|---  
fn|[ManagerSortFn](https://github.com/Mametaro-discord/DataManager/blob/docs/Manager/types/ManagerSortFn.md)|ソート用の関数|[ManagerSortDefaultFn](https://github.com/Mametaro-discord/DataManager/blob/docs/Manager/types/ManagerSortDefaultFn.md)  
  
**Return**: Manager\<*K*, *V*\>(=*this*)

#### 例を見てください
```js  
const manager = new Manager([  
		['key', 'value'],  
		['otherKey', 'otherValue']  
	]);  
manager.sort((fstv, secv) => fstv + secv); //もとのManagerは変更されます
```  
  
### [Overview](https://github.com/Mametaro-discord/DataManager/blob/docs/Manager/overview.md)
# Manager#sort
引数で渡された関数に従って要素をぐちゃぐちゃにした新しいManagerを返します。  
詳しいsort、コールバック関数の構造なんかは[*Array*#sort]()をご覧ください。  
  
**param**|**type**|**description**|**default**  
---|---|---|---  
fn|[ManagerSortFn](https://github.com/Mametaro-discord/DataManager/blob/docs/Manager/types/ManagerSortFn.md)|ソート用の関数|[ManagerSortDefaultFn](https://github.com/Mametaro-discord/DataManager/blob/docs/Manager/types/ManagerSortDefaultFn.md)  
  
**Return**: Manager\<*K*, *V*\>

#### 例を見てください
```js  
const manager = new Manager([  
		['key', 'value'],  
		['otherKey', 'otherValue']  
	]);  
manager.sorted((fstv, secv) => fstv + secv); //もとのManagerは変更されません  
```  
  
### [Overview](https://github.com/Mametaro-discord/DataManager/blob/docs/Manager/overview.md)
# Manager#mapValues
引数で渡された関数の返り値をセットした新しいManagerを返します。  
  
**param**|**type**|**description**|**default**  
---|---|---|---  
fn|[ManagerFn](https://github.com/Mametaro-discord/DataManager/blob/docs/Manager/types/ManagerFn.md)\<*V*\>|セットする値|none  
thisArg?|*any*|fnの関数の中で*this*として使う値|none  
  
**Return**: Manager\<*K*, *V*\>

#### 例を見てください
```js  
const manager = new Manager([  
		['key', 'value'],  
		['otherKey', 'otherValue']  
	]);  
manager.mapValues(val => `${val}plus`);  
```  
このとき'key' => 'valueplus'、'otherKey' => 'otherValueplus'を持つ新しいManagerを得られます。  
  
### [Overview](https://github.com/Mametaro-discord/DataManager/blob/docs/Manager/overview.md)
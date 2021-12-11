# Manager#filter
[*Array*#filter](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)風。  
引数で渡された関数を満たす要素だけが入った新しいManagerを返します。  
  
**param**|**type**|**description**|**default**  
---|---|---|---  
fn|[ManagerFn](https://github.com/Mametaro-discord/DataManager/blob/docs/Manager/types/ManagerFn.md)\<*boolean*\>|テスト関数|none  
thisArg?|*any*|テスト関数内で*this*として使う値|none  
  
**Return**: Manager\<*K*, *V*\>

#### 例を見てください
```js  
const manager = new Manager([  
		['key', 'value'],  
		['otherKey', 'otherValue']  
	]);  
manager.filter(val => val === 'value');  
```  
'key' => 'value'だけが入った新しいManagerが得られます。    
  
### [Overview](https://github.com/Mametaro-discord/DataManager/blob/docs/Manager/overview.md)
# Manager#every
[*Array*#every](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/every)風。  
引数で渡されたテスト関数をすべての要素が満たした場合*true*を、その他の場合*false*を返します。  
  
**param**|**type**|**description**|**default**  
---|---|---|---  
fn|[ManagerFn](https://github.com/Mametaro-discord/DataManager/blob/docs/Manager/types/ManagerFn.md)\<*boolean*\>|テスト関数|none  
thisArg?|*any*|テスト関数の中で*this*として使う値|none  
  
**Return**: *boolean*

#### 例を見てください
```js  
const manager = new Manager([  
		['key', 'value'],  
		['otherKey', 'otherValue'],  
		['warosuKey', 'warosuValue']  
	]);  
manager.every((val, key) => typeof val === 'string' && typeof key === 'string');  
```  
このときは３つの要素すべてがキー、値ともに*string*なので*true*が返ります。    
  
### [Overview](https://github.com/Mametaro-discord/DataManager/blob/docs/Manager/overview.md)
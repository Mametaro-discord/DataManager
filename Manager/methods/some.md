# Manager#some
[*Array*#some](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/some)
引数で渡されたテスト関数をManagerの要素のうち一つでも満たせば*true*を、満たさなければ*false*を返します。  
  
**param**|**type**|**description**|**default**  
---|---|---|---  
fn|[ManagerFn](https://github.com/Mametaro-discord/DataManager/blob/docs/Manager/types/ManagerFn)\<*boolean*\>|テスト関数|none  
thisArg?|*any*|テスト関数の中で*this*として使う値|none  
  
**Return**: *boolean*

#### 例を見てください
```js  
const manager = new Manager([  
		['key', 'value'],  
		['otherKey', 'otherValue']  
	]);  
manager.some(val => val === 'value'); //output true  
```  
  
### [Overview](https://github.com/Mametaro-discord/DataManager/blob/docs/Manager/overview.md)
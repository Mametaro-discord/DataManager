# Manager#partition
引数で渡されたテスト関数を満たす要素を持つ新しいManagerと満たさない要素を持つ新しいManagerを配列にして返します。  
  
**param**|**type**|**description**|**default**  
---|---|---|---  
fn|[ManagerFn](https://github.com/Mametaro-discord/DataManager/blob/docs/Manager/types/ManagerFn.md)|テスト関数|none  
thisArg?|*any*|テスト関数の中で*this*として使う値|none  
  
**Return**: [Manager\<*K*, *V*\>, Manager\<*K*, *V*\>]

#### 例を見てください
```js  
const manager = new Manager([  
		['key', 'value'],  
		['otherKey', 'otherValue'],  
		['warosuKey', 'warosuValue'],  
		['powerfulKey', 'powerfulValue']  
	]);    
manager.partition(val => val === 'value');  
```  
'key'の要素を持つManagerと、'otherKey'、'warosuKey'、'powerfulKey'の要素を持つManagerの配列が得られます。  
  
### [Overview](https://github.com/Mametaro-discord/DataManager/blob/docs/Manager/overview.md)
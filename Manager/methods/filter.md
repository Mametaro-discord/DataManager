# Manager#filter
引数で渡された関数を満たす要素だけが入った新しいManagerを返します。  
  
**param**|**type**|**description**|**default**  
---|---|---|---  
fn|ManagerFn<boolean>|テスト関数|none  
thisArg?|*any*|テスト関数内で*this*として使う値|none  
  
**Return**: Manager<*K*, *V*>

#### 例を見てください
```js  
manager.setAll([  
		['key', 'value'],  
		['otherKey', 'otherValue']  
	]);  
manager.filter(val => val === 'value');  
```  
'key' => 'value'だけが入った新しいManagerが得られます。
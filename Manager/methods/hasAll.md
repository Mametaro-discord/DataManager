# Manager#hasAll
引数で渡されたキー達が全てManagerに存在していたら*true*、その他は*false*を返します。  
  
**param**|**type**|**description**|**default**  
---|---|---|---  
keys|[Spread](https://github.com/Mametaro-discord/DataManager/blob/docs/Manager/types/Spread.md)\<*K*\>|キー達|none  
  
**Return**: *boolean*

#### 例を見てください
```js  
const manager = new Manager([  
		['key', 'value'],  
		['otherKey', 'otherValue']  
	]);  
manager.hasAll('key', 'otherKey'); //output true  
manager.hasAll(['key', 'warosuKey']) //output false   --配列もいけます  
```
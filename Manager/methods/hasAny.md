# Manager#hasAny
引数で渡されたキー達のうち一つでもManagerに存在していれば*true*、一つも存在していなければ*false*を返します。  
  
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
manager.hasAny('key', 'otherKey'); //output true  
manager.hasAll(['warosuKey', 'powerfulKey']) //output false   --配列もいけます  
```
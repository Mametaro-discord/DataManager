# Manager#intersect
２つのManagerに共通している要素を取り出してそれを入れた新しいManagerを返します。  
  
**param**|**type**|**description**|**default**  
---|---|---|---  
manager|Manager\<*K*, *V*\>|比較対象のManager|none  
  
**Return**: Manager\<*K*, *V*\>

#### 例を見てください
```js  
const manager1 = new Manager([  
		['key', 'value'],  
		['otherKey', 'otherValue'],  
		['warosuKey', 'warosuValue']  
	]);  
const manager2 = new Manager([  
		['key', 'value'],  
		['warosuKey', 'warosuValue'],  
		['powerfulKey', 'powerfulValue']  
	]);  
manager1.intersect(manager2);  
```  
このとき'key'の要素と'warosuKey'の要素２つの要素を持つManagerが得られます。
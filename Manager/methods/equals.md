# Manager#equals
２つのManagerがキー、値すべて同じかどうかを判別します。  
  
**param**|**type**|**description**|**default**  
---|---|---|---  
manager|Manager<*K*, *V*>|比較するManager|none  
  
**Return**: *boolean*

#### 例を見てください
```js  
manager.setAll([  
		['key', 'value'],  
		['otherKey', 'otherValue']  
	]);  
const otherManager = new Manager([  
		['key', 'value'],  
		['otherKey', 'otherValue']  
	]);  
manager.equals(otherManager);  
```  
このときは*true*が返ります。
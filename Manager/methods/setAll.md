# Manager#setAll
引数で渡されたキーと値の配列達をすべてセットします。  
  
**param**|**type**|**description**|**default**  
---|---|---|---  
data|*Array*\<*Array*\<*K*, *V*\>\>  
  
**Return**: Manager\<*K*, *V*\>(=*this*)

#### 例を見てください
```js  
const manager = new Manager();  
manager.setAll([  
		['key', 'value'],  
		['otherKey', 'otherValue']  
	]);  
```  
  
### [Overview](https://github.com/Mametaro-discord/DataManager/blob/docs/Manager/overview.md)
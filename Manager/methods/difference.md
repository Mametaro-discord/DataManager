# Manager#difference
もとのManager、引数で渡されたManager、どちらかにしかないものがセットされた新しいManagerを返します。  
つまり共通の要素意外をセットするってことです。  
もとのManagerは変更されません。  
  
**param**|**type**|**description**|**default**  
---|---|---|---  
manager|Manager\<*K*, *V*\>|比較するManager|none  
  
**Return**: Manager\<*K*, *V*\>

#### 例を見てください
```js  
const manager = new Manager([  
		['key', 'value'],  
		['otherKey', 'otherValue']  
	]);   
const otherManager = new Manager([  
		['key', 'value'],  
		['warosuKey', 'warosuValue']  
	]);  
manager.difference(otherManager);  
```
このときotherManagerには'otherKey'の要素と'warosuKey'の要素が入る感じです。  
共通の'key'の要素は入りません。  
  
### [Overview](https://github.com/Mametaro-discord/DataManager/blob/docs/Manager/overview.md)
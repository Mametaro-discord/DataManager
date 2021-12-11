# Manager#sealKeys
引数で渡されたキー達に対する要素達を封鎖します。封鎖すると要素の削除ができなくなります。  
封鎖を解除するときは[Manager#unsealKey](https://github.com/Mametaro-discord/DataManager/blob/docs/Manager/methods/unsealKey.md)[Manager#unsealKeys](https://github.com/Mametaro-discord/DataManager/blob/docs/Manager/methods/unsealKeys.md)を使います。    
封鎖の詳しい仕様については[topics-seal](https://github.com/Mametaro-discord/DataManager/blob/docs/Manager/topics/seal.md)  
  
**param**|**type**|**description**|**default**  
---|---|---|---  
keys|[Spread](https://github.com/Mametaro-discord/DataManager/blob/docs/Manager/types/Spread.md)  
  
**Return**: Manager\<*K*, *V*\>(=*this*)  
  
### [Overview](https://github.com/Mametaro-discord/DataManager/blob/docs/Manager/overview.md)